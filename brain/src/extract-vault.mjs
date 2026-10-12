// Extracts a scoped wikilink graph from an Obsidian vault, seeded by the notes
// the brand files cite as sources. Read-only.
import fs from 'node:fs'
import path from 'node:path'
import { GraphBuilder, listMarkdown, stripMd, slugify } from './extract-brand.mjs'

export const RE_WIKILINK = /!?\[\[([^\]|#^]+)(?:[#^][^\]|]*)?(?:\|[^\]]*)?\]\]/g

export const DEFAULT_EXCLUDE = ['07 Agent Memory/', '08 Daily/', '10 Tasks/', '90 Templates/', '04 Archive/', '.trash/']

/** Minimal frontmatter reader: scalars, inline arrays and dash lists. */
export function parseFrontmatter(text) {
  const m = /^---\n([\s\S]*?)\n---/.exec(text)
  if (!m) return { data: {}, body: text }
  const data = {}
  let lastKey = null
  for (const line of m[1].split('\n')) {
    const kv = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(line)
    if (kv) {
      lastKey = kv[1]
      let v = kv[2].trim()
      if (/^\[.*\]$/.test(v)) v = v.slice(1, -1).split(',').map((x) => x.trim().replace(/^["']|["']$/g, '')).filter(Boolean)
      else v = v.replace(/^["']|["']$/g, '')
      data[lastKey] = v === '' ? [] : v
    } else {
      const li = /^\s*-\s+(.*)$/.exec(line)
      if (li && lastKey) {
        if (!Array.isArray(data[lastKey])) data[lastKey] = data[lastKey] ? [data[lastKey]] : []
        data[lastKey].push(li[1].trim().replace(/^["']|["']$/g, ''))
      }
    }
  }
  return { data, body: text.slice(m[0].length) }
}

export function buildIndex(files) {
  const byName = new Map()
  for (const f of files) {
    const base = path.posix.basename(f, '.md').toLowerCase()
    byName.set(base, byName.has(base) ? [...byName.get(base), f] : [f])
  }
  const set = new Set(files)
  return (raw) => {
    const t = raw.trim().replace(/\.md$/, '')
    if (set.has(t + '.md')) return t + '.md'
    const hits = byName.get(path.posix.basename(t).toLowerCase())
    if (!hits) return null
    if (hits.length === 1) return hits[0]
    // Ambiguous: prefer the one whose path ends with the given partial path.
    return hits.find((h) => h.toLowerCase().endsWith(t.toLowerCase() + '.md')) || hits[0]
  }
}

/**
 * @param {string} root vault root
 * @param {object} opts
 * @param {string[]} opts.seeds note names or vault paths to start from
 * @param {number} [opts.hops=1]
 * @param {number} [opts.maxNodes=220]
 * @param {string[]} [opts.exclude] folder prefixes to skip (seeds are never skipped)
 */
export function extractVault(root, opts) {
  const hops = opts.hops ?? 1
  const maxNodes = opts.maxNodes ?? 220
  const exclude = opts.exclude ?? DEFAULT_EXCLUDE
  const all = listMarkdown(root)
  const resolve = buildIndex(all)

  // Parse every note's outgoing links once (cheap, ~4k files), so backlinks are known.
  const out = new Map()
  const back = new Map()
  const meta = new Map()
  for (const f of all) {
    const text = fs.readFileSync(path.join(root, f), 'utf8')
    const { data, body } = parseFrontmatter(text)
    const links = new Set()
    for (const m of body.matchAll(RE_WIKILINK)) {
      const t = resolve(m[1])
      if (t && t !== f) links.add(t)
    }
    // Frontmatter relations (parent, Relacionada…) often hold wikilinks too.
    for (const v of Object.values(data).flat()) {
      if (typeof v !== 'string') continue
      for (const m of v.matchAll(RE_WIKILINK)) {
        const t = resolve(m[1])
        if (t && t !== f) links.add(t)
      }
    }
    out.set(f, links)
    for (const t of links) back.set(t, (back.get(t) || new Set()).add(f))
    meta.set(f, { data, excerpt: stripMd(body).slice(0, 600), lines: text.split('\n').length })
  }

  const seedPaths = new Map()
  for (const s of opts.seeds) {
    const p = resolve(s)
    if (p) seedPaths.set(p, s)
  }
  const excluded = (f) => exclude.some((e) => f.startsWith(e)) && !seedPaths.has(f)

  // BFS, scoring candidates by how many already-kept notes touch them.
  const kept = new Map([...seedPaths.keys()].map((p) => [p, 0]))
  let frontier = [...seedPaths.keys()]
  for (let h = 1; h <= hops && kept.size < maxNodes; h++) {
    const score = new Map()
    for (const f of frontier) {
      for (const n of [...(out.get(f) || []), ...(back.get(f) || [])]) {
        if (kept.has(n) || excluded(n)) continue
        score.set(n, (score.get(n) || 0) + 1)
      }
    }
    const ranked = [...score].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    frontier = []
    for (const [n] of ranked) {
      if (kept.size >= maxNodes) break
      kept.set(n, h)
      frontier.push(n)
    }
  }

  const g = new GraphBuilder()
  for (const [f, hop] of kept) {
    const { data, excerpt, lines } = meta.get(f)
    g.node(`note:${f}`, {
      type: 'note',
      label: path.posix.basename(f, '.md'),
      path: f,
      folder: f.split('/')[0],
      noteType: typeof data.type === 'string' ? data.type : undefined,
      status: typeof data.status === 'string' ? data.status : undefined,
      tags: Array.isArray(data.tags) ? data.tags.slice(0, 8) : undefined,
      updated: typeof data.updated === 'string' ? data.updated : undefined,
      hop,
      seed: seedPaths.has(f) ? seedPaths.get(f) : undefined,
      excerpt,
      lines,
      backlinks: (back.get(f) || new Set()).size,
    })
  }
  for (const [f] of kept) {
    for (const t of out.get(f) || []) {
      if (kept.has(t)) g.edge(`note:${f}`, `note:${t}`, 'links')
    }
  }
  const graph = g.toJSON()
  graph.meta = { kind: 'vault', root, notesTotal: all.length, kept: kept.size, hops, maxNodes, exclude, seeds: Object.fromEntries([...seedPaths].map(([p, s]) => [s, p])), unresolvedSeeds: opts.seeds.filter((s) => !resolve(s)) }
  graph.resolve = resolve
  return graph
}

export { slugify }
