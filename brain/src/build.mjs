#!/usr/bin/env node
// Builds the GTM Brain: graph JSON plus a single-file HTML viewer.
//
//   node src/build.mjs                                  # brand only → out/gtm-brain.{json,html}
//                                                       #   (+ gtm-brain-graph.json, gtm-brain-explorer.html)
//   node src/build.mjs --vault ~/caminho/do/vault
//                                                       # brand + vault → out/private/gtm-brain.{json,html}
//
// Options:
//   --marca <dir>          brand folder (alias --marca; default: $GTM_BRAIN_MARCA or ../marca)
//   --issues <A,B>         issue key prefixes to track, e.g. COL,PRD (default: $GTM_BRAIN_ISSUES)
//   --vault <dir>          Obsidian vault to ingest as a second source (wikilinks become edges)
//   --vault-hops <n>       BFS depth from the seed notes (default 1)
//   --vault-max <n>        cap on vault notes (default 220)
//   --vault-include-all    do not skip Agent Memory / Daily / Tasks / Templates / Archive
//   --include-kit          also include brand READMEs, examples and upstream kit files
//   --linear-workspace <s> Linear workspace slug, so COL-123 becomes a link
//   --out <dir>            output directory (default: out/, or out/private/ with --vault)
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { extractBrand } from './extract-brand.mjs'
import { extractVault } from './extract-vault.mjs'
import { buildBrain } from './brain-model.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))

/** Brand folder: --marca, else $GTM_BRAIN_MARCA, else ../marca next to this folder. */
export function defaultBrandDir() {
  return process.env.GTM_BRAIN_MARCA || path.resolve(here, '..', '..', 'marca')
}
const splitList = (v) => (v ? String(v).split(',').map((x) => x.trim()).filter(Boolean) : [])

export function parseArgs(argv) {
  const args = { marca: defaultBrandDir(), issues: splitList(process.env.GTM_BRAIN_ISSUES) }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    const next = () => argv[++i]
    if (a === '--marca' || a === '--marca') args.marca = next()
    else if (a === '--issues') args.issues = splitList(next())
    else if (a === '--vault') args.vault = next()
    else if (a === '--vault-hops') args.vaultHops = Number(next())
    else if (a === '--vault-max') args.vaultMax = Number(next())
    else if (a === '--vault-include-all') args.vaultIncludeAll = true
    else if (a === '--include-kit') args.includeKit = true
    else if (a === '--linear-workspace') args.linearWorkspace = next()
    else if (a === '--out') args.out = next()
    else if (a === '-h' || a === '--help') args.help = true
    else throw new Error(`unknown argument: ${a}`)
  }
  const expand = (p) => (p && p.startsWith('~') ? path.join(os.homedir(), p.slice(1)) : p)
  args.marca = path.resolve(expand(args.marca))
  if (args.vault) args.vault = path.resolve(expand(args.vault))
  args.out = path.resolve(expand(args.out) || path.join(here, '..', args.vault ? 'out/private' : 'out'))
  return args
}

/** Merges the vault graph into the brand graph and adds source → note bridges. */
export function mergeGraphs(marca, vault) {
  const nodes = [...marca.nodes, ...vault.nodes]
  const edges = [...marca.edges, ...vault.edges]
  const ids = new Set(nodes.map((n) => n.id))
  let bridges = 0
  for (const n of marca.nodes) {
    if (n.type !== 'source' || !n.obsidian) continue
    const p = vault.resolve(n.obsidian)
    if (p && ids.has(`note:${p}`)) {
      edges.push({ source: n.id, target: `note:${p}`, type: 'resolves', weight: 1, evidence: [{ text: `${n.label} → Obsidian ${n.obsidian}` }] })
      n.notePath = p
      bridges++
    }
  }
  return { nodes, edges, meta: { ...marca.meta, vault: vault.meta, bridges } }
}

/** Seeds for the vault: every Obsidian note a source points at, plus the note named after the brand. */
export function vaultSeeds(marca) {
  const seeds = new Set(marca.meta && marca.meta.brand ? [marca.meta.brand] : [])
  for (const n of marca.nodes) if (n.type === 'source' && n.obsidian) seeds.add(n.obsidian)
  return [...seeds]
}

export function renderHtml(graph, title) {
  const tpl = fs.readFileSync(path.join(here, 'viewer.html'), 'utf8')
  // Inline the data: file:// pages cannot fetch() a sibling JSON.
  const json = JSON.stringify(graph).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')
  return tpl.replace('/*__GRAPH__*/null', () => json).replace('__TITLE__', () => title)
}

/** The GTM Brain page: typed records from brain-model.mjs, inlined like the graph. */
export function renderBrainHtml(brain, title, live = null) {
  const tpl = fs.readFileSync(path.join(here, 'brain.html'), 'utf8')
  const inline = (v) => JSON.stringify(v).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')
  // `live` is set by the server (src/server.mjs): it turns on editing through Proof.
  return tpl.replace('/*__BRAIN__*/null', () => inline(brain)).replace('/*__LIVE__*/null', () => inline(live)).replace('__TITLE__', () => title)
}

function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) {
    console.log(fs.readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(1, 19).join('\n').replace(/^\/\/ ?/gm, ''))
    return
  }
  if (!fs.existsSync(args.marca)) throw new Error(`Pasta da marca não encontrada: ${args.marca}. Use --marca <pasta> ou GTM_BRAIN_MARCA.`)
  let graph = extractBrand(args.marca, { includeKit: args.includeKit, linearWorkspace: args.linearWorkspace, issues: args.issues })
  const name = 'gtm-brain'
  if (args.vault) {
    const vault = extractVault(args.vault, {
      seeds: vaultSeeds(graph),
      hops: args.vaultHops ?? 1,
      maxNodes: args.vaultMax ?? 220,
      exclude: args.vaultIncludeAll ? ['.trash/'] : undefined,
    })
    graph = mergeGraphs(graph, vault)
  }
  const brain = buildBrain(args.marca, graph, { linearWorkspace: args.linearWorkspace, issues: args.issues })
  const title = graph.meta.brand ? `GTM Brain · ${graph.meta.brand}` : 'GTM Brain'
  fs.mkdirSync(args.out, { recursive: true })
  const outputs = [
    // records: what the front end and agents read
    [`${name}.json`, JSON.stringify(brain, null, 1)],
    [`${name}.html`, renderBrainHtml(brain, title)],
    // raw extraction graph: files, sections and regex edges, for debugging
    [`${name}-graph.json`, JSON.stringify(graph, null, 1)],
    [`${name}-explorer.html`, renderHtml(graph, `${title} · explorador técnico`)],
  ]
  for (const [file, body] of outputs) fs.writeFileSync(path.join(args.out, file), body)

  const count = (arr, k) => Object.entries(arr.reduce((m, x) => ((m[x[k]] = (m[x[k]] || 0) + 1), m), {})).map(([a, b]) => `${a} ${b}`).join(', ')
  console.log(`nodes ${graph.nodes.length} (${count(graph.nodes, 'type')})`)
  console.log(`edges ${graph.edges.length} (${count(graph.edges, 'type')})`)
  if (graph.meta.vault) {
    console.log(`vault: ${graph.meta.vault.kept}/${graph.meta.vault.notesTotal} notes, ${graph.meta.bridges} source→note bridges`)
    if (graph.meta.vault.unresolvedSeeds.length) console.log(`  unresolved seeds: ${graph.meta.vault.unresolvedSeeds.join(' | ')}`)
  }
  console.log(`brain: ${brain.categories.length} categories, ${brain.items.length} records`)
  for (const [file] of outputs) console.log(`wrote ${path.relative(process.cwd(), path.join(args.out, file))}`)
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) main()
