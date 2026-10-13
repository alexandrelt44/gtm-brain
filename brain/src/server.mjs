#!/usr/bin/env node
// GTM Brain live server: serves the brain built from the brand markdown, opens a
// record's source file in Proof (collaborative editor, human + AI) and writes
// the edits back to the file without reformatting it.
//
//   node src/server.mjs                        # read-only: edit in Proof, preview the diff
//   node src/server.mjs --write                # also save edits into the brand files
//   node src/server.mjs --write --commit       # and commit each save in the brand repo
//
// Options:
//   --marca <dir>   brand folder (alias --marca; default: $GTM_BRAIN_MARCA or ../marca)
//   --issues <A,B>  issue key prefixes to track, e.g. COL (default: $GTM_BRAIN_ISSUES)
//   --port <n>      default 3348
//   --proof <url>   Proof SDK server (default http://127.0.0.1:4000)
//   --state <dir>   sessions and base copies (default .gtm-brain/)
//   --name <s>      display name in the editor (default: git user.name of the brand repo)
import http from 'node:http'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import crypto from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { extractBrand, listMarkdown } from './extract-brand.mjs'
import { buildBrain } from './brain-model.mjs'
import { renderBrainHtml, renderHtml, defaultBrandDir } from './build.mjs'
import { mergeBack, lineDiff, wrapAuthored } from './md-merge.mjs'
import { proposalStore } from './propostas.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))

export function parseArgs(argv) {
  const a = {
    marca: defaultBrandDir(),
    issues: (process.env.GTM_BRAIN_ISSUES || '').split(',').map((x) => x.trim()).filter(Boolean),
    port: 3348,
    proof: 'http://127.0.0.1:4000',
    state: path.join(here, '..', '.gtm-brain'),
    write: false,
    commit: false,
    name: null,
  }
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i]
    if (k === '--write') a.write = true
    else if (k === '--commit') a.commit = true
    else if (k === '--marca' || k === '--marca') a.marca = argv[++i]
    else if (k === '--issues') a.issues = argv[++i].split(',').map((x) => x.trim()).filter(Boolean)
    else if (k === '--port') a.port = Number(argv[++i])
    else if (k === '--proof') a.proof = argv[++i].replace(/\/$/, '')
    else if (k === '--state') a.state = argv[++i]
    else if (k === '--name') a.name = argv[++i]
    else if (k === '--help' || k === '-h') a.help = true
    else throw new Error(`unknown option ${k}`)
  }
  if (a.commit) a.write = true
  a.marca = path.resolve(a.marca.replace(/^~/, os.homedir()))
  return a
}

const sha = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16)

/**
 * The editing workflow, independent of HTTP so tests can drive it.
 * A session ties one brand file to one Proof document:
 *   { file, slug, ownerSecret, accessToken, baseHash, createdAt, savedAt? }
 * `base/<slug>.md` keeps the file text the document was created from.
 */
export function createEditor({ marca, proof, state, write = false, commit = false, name = null, fetchImpl = fetch }) {
  fs.mkdirSync(path.join(state, 'base'), { recursive: true })
  const sessionsPath = path.join(state, 'sessions.json')
  const load = () => {
    try {
      return JSON.parse(fs.readFileSync(sessionsPath, 'utf8'))
    } catch {
      return {}
    }
  }
  const sessions = load()
  const persist = () => fs.writeFileSync(sessionsPath, JSON.stringify(sessions, null, 1))

  const resolveFile = (rel) => {
    if (typeof rel !== 'string' || !rel.endsWith('.md')) throw httpError(400, 'arquivo inválido')
    const abs = path.resolve(marca, rel)
    if (!abs.startsWith(marca + path.sep)) throw httpError(400, 'arquivo fora da pasta da marca')
    if (!fs.existsSync(abs)) throw httpError(404, 'arquivo não existe')
    return abs
  }
  const proofJson = async (p, opts = {}) => {
    const res = await fetchImpl(proof + p, opts)
    const body = await res.json().catch(() => ({}))
    if (!res.ok || body.success === false) throw httpError(502, `Proof ${p}: ${body.error || res.status}`)
    return body
  }
  const proofMarkdown = async (s) => {
    const st = await proofJson(`/documents/${s.slug}/state`, { headers: { authorization: `Bearer ${s.ownerSecret}` } })
    return st.markdown ?? st.content ?? ''
  }
  // gtm_name is read by proof-skin/gtm-skin.js so people don't have to type their name.
  const editorUrl = (s) => `${proof}/d/${s.slug}?token=${s.accessToken}${name ? `&gtm_name=${encodeURIComponent(name)}` : ''}`
  const view = (s, extra = {}) => ({
    file: s.file,
    slug: s.slug,
    editorUrl: editorUrl(s),
    write,
    agent: {
      docUrl: `${proof}/d/${s.slug}?token=${s.accessToken}`,
      state: `${proof}/documents/${s.slug}/state`,
      snapshot: `${proof}/documents/${s.slug}/snapshot`,
      ops: `${proof}/documents/${s.slug}/ops`,
      editV2: `${proof}/documents/${s.slug}/edit/v2`,
      token: s.accessToken,
      docs: `${proof}/agent-docs`,
    },
    ...extra,
  })

  async function create(rel, text, title) {
    const make = async (markdown) => {
      const doc = await proofJson('/documents', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ markdown, title: title || rel, role: 'editor', ownerId: 'human:marca' }),
      })
      return { file: rel, slug: doc.slug, ownerSecret: doc.ownerSecret, accessToken: doc.accessToken, baseHash: sha(text), createdAt: new Date().toISOString() }
    }
    // The file's text is people's work: mark it as human-authored so only new AI text shows as AI.
    // If the marked version does not survive the round trip, fall back to the plain text.
    let s = await make(wrapAuthored(text, 'human:brand'))
    let back = mergeBack(text, await proofMarkdown(s))
    if (back.text !== text) {
      s = await make(text)
      back = mergeBack(text, await proofMarkdown(s))
    } else s.humanBase = true
    // Guard: the file must survive the trip through the editor untouched.
    if (back.text !== text) {
      throw httpError(422, `Este arquivo não sobrevive à ida e volta pelo editor (${back.changed} linhas mudariam sem edição). Edite direto no arquivo.`)
    }
    fs.writeFileSync(path.join(state, 'base', `${s.slug}.md`), text)
    sessions[rel] = s
    persist()
    return s
  }

  async function open(rel, title) {
    const abs = resolveFile(rel)
    const text = fs.readFileSync(abs, 'utf8')
    const s = sessions[rel]
    if (s) {
      let md = null
      try {
        md = await proofMarkdown(s)
      } catch {
        md = null // document gone (Proof database reset): start over
      }
      if (md !== null) {
        if (s.baseHash === sha(text)) return view(s, { reused: true })
        // The file changed outside the editor. Safe only if the document has no edits.
        const base = readBase(s)
        if (base !== null && mergeBack(base, md).text !== base) {
          throw httpError(409, 'O arquivo mudou fora do editor e o documento no Proof tem edições não salvas. Salve ou descarte antes.')
        }
      }
    }
    return view(await create(rel, text, title), { reused: false })
  }

  const readBase = (s) => {
    try {
      return fs.readFileSync(path.join(state, 'base', `${s.slug}.md`), 'utf8')
    } catch {
      return null
    }
  }

  async function status(rel) {
    const s = sessions[rel]
    if (!s) return { file: rel, open: false }
    const abs = resolveFile(rel)
    const text = fs.readFileSync(abs, 'utf8')
    const merged = mergeBack(text, await proofMarkdown(s))
    return view(s, { open: true, dirty: merged.text !== text, changed: merged.changed, conflict: sha(text) !== s.baseHash })
  }

  async function diff(rel) {
    const s = sessions[rel]
    if (!s) throw httpError(404, 'documento não está aberto no editor')
    const text = fs.readFileSync(resolveFile(rel), 'utf8')
    const merged = mergeBack(text, await proofMarkdown(s))
    return { file: rel, changed: merged.changed, rows: lineDiff(text, merged.text, 2) }
  }

  async function save(rel, { by = 'gtm-brain' } = {}) {
    if (!write) throw httpError(403, 'Servidor em modo leitura. Reinicie com --write para gravar nos arquivos.')
    const s = sessions[rel]
    if (!s) throw httpError(404, 'documento não está aberto no editor')
    const abs = resolveFile(rel)
    const text = fs.readFileSync(abs, 'utf8')
    if (sha(text) !== s.baseHash) throw httpError(409, 'O arquivo mudou fora do editor desde que foi aberto. Nada foi gravado.')
    const merged = mergeBack(text, await proofMarkdown(s))
    if (merged.text === text) return { file: rel, changed: 0, saved: false }
    const tmp = `${abs}.gtm-brain-tmp`
    fs.writeFileSync(tmp, merged.text)
    fs.renameSync(tmp, abs)
    s.baseHash = sha(merged.text)
    s.savedAt = new Date().toISOString()
    fs.writeFileSync(path.join(state, 'base', `${s.slug}.md`), merged.text)
    persist()
    let committed = null
    if (commit) {
      const msg = `gtm-brain: ${rel} (${merged.changed} linha${merged.changed > 1 ? 's' : ''}, editado no Proof por ${by})`
      // Commit only this path, so other staged work in the repo is left alone.
      execFileSync('git', ['-C', marca, 'add', '--', rel])
      execFileSync('git', ['-C', marca, 'commit', '-q', '-m', msg, '--', rel])
      committed = execFileSync('git', ['-C', marca, 'rev-parse', '--short', 'HEAD']).toString().trim()
    }
    return { file: rel, changed: merged.changed, saved: true, commit: committed }
  }

  return { open, status, diff, save, sessions }
}

export function httpError(status, message) {
  const e = new Error(message)
  e.status = status
  return e
}

function listCsv(root) {
  const out = []
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue
      const abs = path.join(dir, e.name)
      if (e.isDirectory()) walk(abs)
      else if (e.name.endsWith('.csv')) out.push(path.relative(root, abs))
    }
  }
  walk(root)
  return out
}

/** Builds the brain once per change of the brand files. */
export function brainCache(marca, opts = {}) {
  let key = null
  let cached = null
  return () => {
    // markdown plus the research CSVs the brain reads (e.g. 06-seo/research/*.csv)
    const files = [...listMarkdown(marca), ...listCsv(marca)]
    const k = files.map((f) => f + ':' + fs.statSync(path.join(marca, f)).mtimeMs).join('|')
    if (k !== key) {
      const graph = extractBrand(marca, opts)
      cached = { graph, brain: buildBrain(marca, graph, opts) }
      key = k
    }
    return cached
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) {
    console.log(fs.readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(1, 15).join('\n').replace(/^\/\/ ?/gm, ''))
    return
  }
  if (!fs.existsSync(args.marca)) throw new Error(`Pasta da marca não encontrada: ${args.marca}. Use --marca <pasta> ou GTM_BRAIN_MARCA.`)
  if (!args.name) {
    try {
      args.name = execFileSync('git', ['-C', args.marca, 'config', 'user.name']).toString().trim() || null
    } catch {
      args.name = null
    }
  }
  const editor = createEditor(args)
  const proposals = proposalStore(args.marca)
  const get = brainCache(args.marca, { issues: args.issues })
  const live = { api: '/api', proof: args.proof, write: args.write, commit: args.commit }

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://x')
    const send = (status, body, type = 'application/json; charset=utf-8') => {
      res.writeHead(status, { 'content-type': type, 'cache-control': 'no-store' })
      res.end(typeof body === 'string' ? body : JSON.stringify(body))
    }
    const body = async () => {
      let raw = ''
      for await (const chunk of req) raw += chunk
      return raw ? JSON.parse(raw) : {}
    }
    try {
      const p = url.pathname
      if (req.method === 'GET' && (p === '/' || p === '/index.html')) {
        const { brain } = get()
        return send(200, renderBrainHtml(brain, `GTM Brain · ${brain.meta.brand || 'brand'}`, live), 'text/html; charset=utf-8')
      }
      if (req.method === 'GET' && p === '/explorer') {
        const { graph } = get()
        return send(200, renderHtml(graph, `GTM Brain · explorador técnico`), 'text/html; charset=utf-8')
      }
      if (req.method === 'GET' && p === '/api/brain') return send(200, get().brain)
      if (req.method === 'GET' && p.startsWith('/api/records/')) {
        const id = decodeURIComponent(p.slice('/api/records/'.length))
        const r = get().brain.items.find((i) => i.id === id)
        return r ? send(200, r) : send(404, { error: 'registro não existe' })
      }
      if (req.method === 'POST' && p === '/api/docs/open') {
        const b = await body()
        return send(200, await editor.open(b.file, b.title))
      }
      if (req.method === 'GET' && p === '/api/docs/status') return send(200, await editor.status(url.searchParams.get('file')))
      if (req.method === 'GET' && p === '/api/docs/diff') return send(200, await editor.diff(url.searchParams.get('file')))
      if (req.method === 'POST' && p === '/api/docs/save') {
        const b = await body()
        return send(200, await editor.save(b.file, { by: b.by || 'humano' }))
      }
      if (req.method === 'GET' && p === '/api/propostas') return send(200, proposals.list({ status: url.searchParams.get('status') || undefined }))
      const pm = p.match(/^\/api\/propostas\/([^/]+)\/(aceitar|recusar)$/)
      if (req.method === 'POST' && pm) {
        const b = await body()
        const by = b.by || args.name || 'humano'
        return send(200, pm[2] === 'aceitar' ? proposals.accept(pm[1], { write: args.write, commit: args.commit, by }) : proposals.reject(pm[1], { by, nota: b.nota }))
      }
      if (req.method === 'GET' && p === '/api/docs') return send(200, Object.values(editor.sessions).map((s) => ({ file: s.file, slug: s.slug, savedAt: s.savedAt || null })))
      send(404, { error: 'not found' })
    } catch (e) {
      send(e.status || 500, { error: e.message })
      if (!e.status) console.error(e)
    }
  })
  server.listen(args.port, '127.0.0.1', () => {
    console.log(`GTM Brain on http://127.0.0.1:${args.port}  (brand: ${args.marca})`)
    console.log(`Proof: ${args.proof} · ${args.write ? (args.commit ? 'grava e commita' : 'grava nos arquivos') : 'modo leitura (use --write para gravar)'}`)
  })
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) main()
