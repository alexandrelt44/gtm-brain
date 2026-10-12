// Extracts a node/edge graph from a brand folder (the 11 layers in markdown).
// Read-only: only fs.readFileSync / readdirSync / statSync are used.
import fs from 'node:fs'
import path from 'node:path'

// ---------------------------------------------------------------------------
// Patterns. Everything the graph knows comes from these regexes, so they are
// the contract between the brand markdown conventions and the viewer.
// ---------------------------------------------------------------------------

// `/01-icp/ICP.md`, 08-content/PROOF-CORPUS.md, /03-visual/ (folder refs)
export const RE_PATH_REF = /\/?(\d{2}-[a-z0-9-]+)\/((?:[A-Za-z0-9_.-]+\/)*[A-Za-z0-9_.-]*\.(?:md|json|css))/g
export const RE_FOLDER_REF = /`\/(\d{2}-[a-z0-9-]+)\/`/g
// Markdown links to sibling files: [creative context](README.md)
export const RE_MD_LINK = /\]\(((?!https?:)[A-Za-z0-9_./-]+\.md)\)/g
// Bare backticked filenames: `audience.md`, `COMPETITORS.md`
export const RE_BARE_FILE = /`([A-Za-z0-9_-]+\.md)`/g
// Proof IDs defined in PROOF-CORPUS.md
export const RE_PROOF_ID = /\b(CS|CAP|D|T)-(\d{3})\b/g
// "CS-001 a CS-005" style ranges
export const RE_PROOF_RANGE = /\b(CS|CAP|D|T)-(\d{3})\s+(?:a|to|até|-|–)\s+(?:\1-)?(\d{3})\b/g
// Linear issues and projects
// Issue keys of a tracker (Linear, Jira…), e.g. COL-123, for the prefixes the user passes (--issues COL,PRD).
export function issueRe(prefixes) {
  const list = [].concat(prefixes || []).map((p) => String(p).trim().toUpperCase()).filter((p) => /^[A-Z][A-Z0-9]{1,9}$/.test(p))
  return list.length ? new RegExp(`\\b(${list.join('|')})-(\\d{1,6})\\b`, 'g') : null
}
// Source tags, optionally with a section pointer: [ENTREVISTAS §2], `[PESQUISA, tabela 3]`
export const RE_SOURCE_TAG = /\[([A-ZÁÉÍÓÚÂÊÔÃÕÇ][A-ZÁÉÍÓÚÂÊÔÃÕÇ0-9-]{1,20})(?:[ ,]+([^\]]{1,40}))?\]/g
// Evidence and quote-confidence seals
export const SEALS = {
  'COMPROVADO': 'evidence',
  'HIPÓTESE': 'evidence',
  'OBSERVADO': 'evidence',
  'PROPOSTA': 'evidence',
  'LITERAL': 'quote',
  'ASPAS EM RESUMO': 'quote',
  'PARÁFRASE': 'quote',
}
export const RE_SEAL = /\[(COMPROVADO|HIPÓTESE|OBSERVADO|PROPOSTA|LITERAL|ASPAS EM RESUMO|PARÁFRASE)\]/g
// Upstream template placeholders (same list as scripts/validate.sh, plus a few)
export const RE_PLACEHOLDER = /\[(YYYY-MM-DD[^\]]*|AAAA-MM-DD[^\]]*|Company Name|Persona Name|Offer Name|Name, Title|Brand Name|Product Name|Nome da empresa|Nome da persona|Nome da oferta|Nome, cargo|Nome da marca|Nome do produto)\]/g
// Words that flag tension between two pieces of knowledge. Heuristic: "não
// conflita" or "o conflito real" would be false positives, so only the verb
// forms that assert a clash are matched.
export const RE_TENSION = /(diverg|contradi|⚠️|inconsist|conflita com|\bem conflito)/i
// Proposed explicit conventions (see docs/research/brain-graph-schema in the
// research doc). Not used in the corpus yet; parsed so adopting them is free.
//   [CONTRADIZ: CS-002] [CONTRADIZ: /01-icp/ICP.md]
//   [PENDENTE: COL-586] [PENDENTE: /01-icp/BUYER-COMMITTEE.md]
//   [DERIVA: PLAYBOOK §5]
export const RE_EXPLICIT = /\[(CONTRADIZ|PENDENTE|DERIVA):\s*([^\]]+)\]/g
// Words that flag something still owed
export const RE_PENDING = /(\(pendente\)|\[PENDENTE:|⬜|\bem definição|a confirmar|não registrad|verificar antes|ainda não adaptad)/i
// A banner in the first lines saying the file is still the upstream template.
// A template instruction left in place: a bracket with lowercase text ("[1 a 9 funcionários]").
// Seals and source tags are all caps, even with a pointer ([CASES, Hypnos]); checklist marks ([x]) and explicit marks ([PENDENTE: /05-oferta/…]) are content.
export const RE_INSTRUCTION = /\[(?![xX]\]|(?:PENDENTE|CONTRADIZ|DERIVA):|[A-ZÁÉÍÓÚÂÊÔÃÕÇ][A-ZÁÉÍÓÚÂÊÔÃÕÇ0-9-]{1,20}[ ,§])[^\]\n]*[a-zà-ÿ][^\]\n]*\](?!\()/g
export const RE_NOT_ADAPTED = /(ainda não adaptad|não são da marca|not yet adapted)/i

// The brand's own data files, in the English template and in the GTM Brain template.
export const RE_CANONICAL = new RegExp('^\\d{2}-[^/]+/(' + [
  'ICP', 'BUYER-COMMITTEE', 'COMITE-DE-COMPRA', 'VOICE-OF-CUSTOMER', 'VOZ-DO-CLIENTE', 'VOICE', 'VOZ', 'TERMINOLOGY', 'TERMINOLOGIA', 'COMPLIANCE',
  'VISUAL-BRAND', 'IDENTIDADE-VISUAL', 'IMAGERY', 'IMAGENS', 'AI-IMAGE-PROMPTS', 'PROMPTS-DE-IMAGEM', 'DESIGN',
  'OFFER', 'OFERTA', 'COMPETITORS', 'CONCORRENCIA', 'WIN-LOSS', 'GANHOS-E-PERDAS',
  'KEYWORDS', 'PALAVRAS-CHAVE', 'TOPIC-CLUSTERS', 'CLUSTERS', 'GEO-AEO', 'SITE-MAP', 'MAPA-DO-SITE', 'SCHEMA', 'DADOS-ESTRUTURADOS',
  'CONTENT-LIBRARY', 'BIBLIOTECA', 'EDITORIAL-CALENDAR', 'CALENDARIO', 'PROOF-CORPUS', 'PROVAS',
  'ANALYTICS', 'MEDICAO', 'TRACKING-PLAN', 'PLANO-DE-MEDICAO', 'TOP-PERFORMERS', 'DESTAQUES',
  'ONE-PAGE-MARKETING-PLAN', 'PLANO-DE-UMA-PAGINA', 'BRAND-BRAIN', 'CEREBRO',
].join('|') + ')\\.md$|^06-seo/(research|pesquisa)/(?!README)[^/]+\\.md$')

// Tags that look like source tags but are not sources.
const NOT_SOURCES = new Set([
  ...Object.keys(SEALS),
  // a multi-word seal like [ASPAS EM RESUMO] reads as tag ASPAS + pointer
  ...Object.keys(SEALS).filter((k) => k.includes(' ')).map((k) => k.split(' ')[0]),
  'URL', 'SUBJECT', 'STYLE', 'LIGHTING', 'SETTING', 'MOOD', 'COMPOSITION', 'PALETTE',
  'PAA', 'MIT', 'GTM', 'GSC', 'DPA', 'CTA', 'YYYY-MM-DD', 'AAAA-MM-DD',
  'ASSUNTO', 'ESTILO', 'LUZ', 'CENÁRIO', 'CLIMA', 'COMPOSIÇÃO', 'PALETA', 'NOME', 'CARGO', 'EMPRESA', 'CLIENTE',
  'LGPD', 'CNPJ', 'PIX', 'SEO', 'GEO', 'AEO', 'FAQ', 'UTM', 'SAAS', 'B2B', 'B2C', 'KPI', 'ICP', 'TODO', 'OK',
])

// Proof id prefix → human kind
const PROOF_KIND = { CS: 'case', CAP: 'capability', D: 'data point', T: 'testimonial' }

export function slugify(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

export function stripMd(s) {
  return s
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*([^*]*)\*\*/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^\s*[|>#-]+/gm, '')
    .replace(/\|/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Walks a directory and returns repo-relative .md paths, sorted. */
export function listMarkdown(root) {
  const out = []
  const walk = (dir) => {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      if (ent.name.startsWith('.') || ent.name === 'node_modules') continue
      const abs = path.join(dir, ent.name)
      if (ent.isDirectory()) walk(abs)
      else if (ent.name.endsWith('.md')) out.push(path.relative(root, abs).split(path.sep).join('/'))
    }
  }
  walk(root)
  return out.sort()
}

/**
 * Splits markdown into H2 sections. Content before the first H2 becomes the
 * "intro" section. Fenced code blocks are kept as section text (the master
 * system prompt lives in one) but headings inside them are ignored.
 */
export function splitSections(text) {
  const lines = text.split('\n')
  const sections = []
  let title = null
  let cur = { heading: '(intro)', level: 1, startLine: 1, lines: [] }
  let inFence = false
  lines.forEach((line, i) => {
    if (/^```/.test(line)) inFence = !inFence
    const h1 = !inFence && /^# (.+)/.exec(line)
    if (h1 && title === null) title = h1[1].trim()
    const h2 = !inFence && /^## (.+)/.exec(line)
    if (h2) {
      sections.push(cur)
      cur = { heading: h2[1].trim(), level: 2, startLine: i + 1, lines: [] }
    }
    cur.lines.push(line)
  })
  sections.push(cur)
  return { title, sections: sections.filter((s) => s.lines.join('').trim().length > 0) }
}

/** Expands "CS-001 a CS-005" into the five ids. */
export function expandProofRanges(line) {
  const ids = []
  for (const m of line.matchAll(RE_PROOF_RANGE)) {
    const [, prefix, a, b] = m
    const from = Number(a)
    const to = Number(b)
    if (to > from && to - from < 50) {
      for (let n = from; n <= to; n++) ids.push(`${prefix}-${String(n).padStart(3, '0')}`)
    }
  }
  return ids
}

/** Finds where each proof id is defined (heading or first table cell). */
export function findProofDefinitions(text) {
  const defs = new Map()
  const lines = text.split('\n')
  lines.forEach((line, i) => {
    let m = /^#{2,4}\s+(?:(?:Depoimento|Testimonial|Case|Dado|Data)\s+)?((?:CS|CAP|D|T)-\d{3})\b\s*[·:-]?\s*(.*)$/.exec(line)
    if (m) {
      defs.set(m[1], { line: i + 1, label: m[2].trim() || m[1] })
      return
    }
    m = /^\|\s*((?:CS|CAP|D|T)-\d{3})\s*\|\s*([^|]*)\|/.exec(line)
    if (m && !defs.has(m[1])) defs.set(m[1], { line: i + 1, label: stripMd(m[2]).slice(0, 80) || m[1] })
  })
  return defs
}

/**
 * Finds source-tag definitions like
 *   - `[ENTREVISTAS]` Obsidian `Entrevistas com clientes` (v1 …)
 *   1. `[PESQUISA]` Obsidian `Pesquisa de mercado.md`, v2 …
 *   `[CASES]` = Banco de Cases.
 */
export function findSourceDefinitions(text) {
  const defs = new Map()
  for (const line of text.split('\n')) {
    for (const m of line.matchAll(/`\[([A-ZÁÉÍÓÚÂÊÔÃÕÇ][A-ZÁÉÍÓÚÂÊÔÃÕÇ0-9-]{1,20})\]`\s*(=\s*)?([^·`]*?)(?:Obsidian\s+`([^`]+)`)?(?=\s*(?:·|,|\(|\.|$|`))/g)) {
      const tag = m[1]
      if (NOT_SOURCES.has(tag)) continue
      const obsidian = m[4] ? m[4].trim() : null
      const desc = stripMd(line.slice(m.index + m[0].length).slice(0, 160))
      const prev = defs.get(tag)
      // Prefer the definition that resolves to an Obsidian note.
      if (!prev || (!prev.obsidian && obsidian)) {
        defs.set(tag, { obsidian, label: stripMd((m[3] || '') + (obsidian ? obsidian : '')).slice(0, 90) || tag, desc })
      }
    }
  }
  return defs
}

/** Parses the brand brain file (BRAND-BRAIN.md or CEREBRO.md): "Status das camadas" and "Load order" / "Ordem de carga". */
export function parseBrandBrain(text) {
  const status = []
  const loadOrder = []
  const { sections } = splitSections(text)
  for (const s of sections) {
    if (/status das camadas|layer status/i.test(s.heading)) {
      for (const line of s.lines) {
        const cells = line.split('|').map((c) => c.trim())
        if (cells.length < 5 || /^-+$/.test(cells[1]) || /camada|layer/i.test(cells[1])) continue
        const [, layer, file, st, fallback] = cells
        const ref = /`([^`]+)`/.exec(file)
        status.push({
          layer,
          target: ref ? ref[1].replace(/^\//, '') : file,
          filled: /✅/.test(st),
          status: stripMd(st),
          fallback: fallback && fallback !== '—' ? stripMd(fallback) : null,
          fallbackObsidian: (/Obsidian\s+`([^`]+)`/.exec(fallback || '') || [])[1] || null,
        })
      }
    }
    if (/load order|ordem de carga/i.test(s.heading)) {
      for (const line of s.lines) {
        const m = /^(\d+)\.\s+(.*)$/.exec(line)
        if (!m) continue
        const refs = [...m[2].matchAll(/`([^`]+\.md)`/g)].map((r) => r[1])
        loadOrder.push({ step: Number(m[1]), refs, text: stripMd(m[2]) })
      }
    }
  }
  return { status, loadOrder }
}

// ---------------------------------------------------------------------------
// Graph builder
// ---------------------------------------------------------------------------

export class GraphBuilder {
  constructor() {
    this.nodes = new Map()
    this.edges = new Map()
  }

  node(id, props) {
    const prev = this.nodes.get(id)
    if (prev) Object.assign(prev, Object.fromEntries(Object.entries(props).filter(([, v]) => v !== undefined)))
    else this.nodes.set(id, { id, ...props })
    return this.nodes.get(id)
  }

  edge(source, target, type, evidence) {
    if (source === target) return
    const key = `${source}→${target}→${type}`
    let e = this.edges.get(key)
    if (!e) {
      e = { source, target, type, weight: 0, evidence: [] }
      this.edges.set(key, e)
    }
    e.weight++
    if (evidence && e.evidence.length < 3) e.evidence.push(evidence)
    return e
  }

  toJSON() {
    // Drop edges whose endpoints never became nodes.
    const edges = [...this.edges.values()].filter((e) => this.nodes.has(e.source) && this.nodes.has(e.target))
    const degree = new Map()
    for (const e of edges) {
      degree.set(e.source, (degree.get(e.source) || 0) + 1)
      degree.set(e.target, (degree.get(e.target) || 0) + 1)
    }
    const nodes = [...this.nodes.values()].map((n) => ({ ...n, degree: degree.get(n.id) || 0 }))
    return { nodes, edges }
  }
}

/**
 * Builds the brand graph.
 * @param {string} root absolute path to the brand folder
 * @param {object} [opts]
 * @param {boolean} [opts.includeKit] include README / examples / framework kit files
 * @param {string[]} [opts.issues] issue key prefixes to track, e.g. ['COL'] for COL-123
 * @param {string} [opts.linearWorkspace] Linear workspace slug, to turn issue keys into links
 */
export function extractBrand(root, opts = {}) {
  const g = new GraphBuilder()
  const files = listMarkdown(root).filter((f) => !f.startsWith('scripts/'))
  const fileSet = new Set(files)
  const byBasename = new Map()
  for (const f of files) {
    const b = path.posix.basename(f)
    byBasename.set(b, byBasename.has(b) ? null : f) // null = ambiguous
  }
  const texts = new Map(files.map((f) => [f, fs.readFileSync(path.join(root, f), 'utf8')]))

  // Brand name from the brand brain H1 ("Brand Brain — Acme" or "Cérebro da marca — Acme").
  const bbPath = files.find((f) => /^10-[^/]+\/(BRAND-BRAIN|CEREBRO)\.md$/.test(f))
  const bbText = bbPath ? texts.get(bbPath) : ''
  const brandRaw = (/^# .*?—\s*(.+)$/m.exec(bbText) || [])[1]?.trim() || null
  // "[Nome da marca]" in the H1 means the brand is not named yet
  const brand = brandRaw && !/^\[.*\]$/.test(brandRaw) ? brandRaw : null
  const brandBrain = bbPath ? parseBrandBrain(bbText) : { status: [], loadOrder: [] }

  // Global definitions first, so mentions can resolve.
  const proofDefs = new Map()
  const sourceDefs = new Map()
  for (const [f, text] of texts) {
    for (const [id, d] of findProofDefinitions(text)) if (!proofDefs.has(id)) proofDefs.set(id, { ...d, file: f })
    for (const [tag, d] of findSourceDefinitions(text)) {
      const prev = sourceDefs.get(tag)
      if (!prev || (!prev.obsidian && d.obsidian)) sourceDefs.set(tag, { ...d, file: f })
    }
  }

  // An undefined [TAG] counts as a source only when the corpus uses it on 3+ lines;
  // one-off capitals in brackets are usually prompt slots, not sources.
  const RE_ISSUE = issueRe(opts.issues)

  // Implicit aliases: "CS-001 · Acme, …" lets a bare "Acme" point at CS-001.
  const aliases = []
  for (const [id, d] of proofDefs) {
    if (!id.startsWith('CS-')) continue
    for (const a of d.label.split(',')[0].split('/')) {
      const name = a.replace(/\(.*?\)/g, '').trim()
      if (name.length >= 3) aliases.push({ id, name, re: new RegExp(`(^|[^\\p{L}])${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}])`, 'u') })
    }
  }

  const classify = (f, text) => {
    const head = text.split('\n').slice(0, 15).join('\n')
    const placeholders = (text.match(RE_PLACEHOLDER) || []).length
    const isReadme = /(^|\/)README\.md$/.test(f) || /(^|\/)(examples|exemplos)\//.test(f) || /(EXAMPLE|EXEMPLO)-/.test(f)
    const isRepoMeta = !/^\d{2}-/.test(f)
    // Filled: names the brand near the top or is one of the brand's own data files (not a README,
    // scaffold or example), AND has no placeholder and (almost) no bracketed instruction left.
    // Naming the brand in the title alone does not fill a template.
    const instructions = (text.replace(/`[^`\n]*`/g, '').match(RE_INSTRUCTION) || []).length
    const clean = placeholders === 0 && instructions <= 6
    const filled = ((brand && head.includes(brand)) || RE_CANONICAL.test(f)) && clean && !RE_NOT_ADAPTED.test(head)
    let status
    // READMEs and worked examples never count as brand data, even when they name the brand.
    if (isReadme || isRepoMeta) status = 'meta'
    else if (filled) status = 'filled'
    else if (RE_NOT_ADAPTED.test(head)) status = 'template'
    else if (placeholders > 0) status = 'template'
    else status = 'kit' // upstream scaffold without placeholders (playbooks, prompts, specs)
    return { status, placeholders }
  }

  const resolveRef = (fromFile, raw) => {
    let p = raw.replace(/^\//, '')
    if (fileSet.has(p)) return p
    const rel = path.posix.normalize(path.posix.join(path.posix.dirname(fromFile), p))
    if (fileSet.has(rel)) return rel
    const b = byBasename.get(path.posix.basename(p))
    return b || null
  }

  // Layers
  const layerOf = (f) => (/^(\d{2}-[a-z0-9-]+)\//.exec(f) || [])[1] || null
  const fileInfo = new Map()
  for (const [f, text] of texts) {
    const info = classify(f, text)
    fileInfo.set(f, info)
  }
  // Sources come from the brand's filled files only: the template's own examples are not sources.
  for (const [tag, d] of [...sourceDefs]) if (fileInfo.get(d.file)?.status !== 'filled') sourceDefs.delete(tag)
  const tagLines = new Map()
  for (const [f, text] of texts) {
    if (fileInfo.get(f).status !== 'filled') continue
    for (const line of text.split('\n')) {
      for (const t of new Set([...line.matchAll(RE_SOURCE_TAG)].map((m) => m[1]))) tagLines.set(t, (tagLines.get(t) || 0) + 1)
    }
  }
  const keep = (f) => opts.includeKit || ['filled', 'template'].includes(fileInfo.get(f).status) || f === bbPath

  for (const f of files) {
    if (!keep(f)) continue
    const layer = layerOf(f)
    if (!layer) continue
    g.node(`layer:${layer}`, { type: 'layer', label: layer, path: layer + '/' })
  }
  // Layer status: ✅ if any BRAND-BRAIN row for that folder is filled.
  for (const s of brandBrain.status) {
    const layer = (/^(\d{2}-[a-z0-9-]+)/.exec(s.target) || [])[1]
    const n = layer && g.nodes.get(`layer:${layer}`)
    if (!n) continue
    n.rows = n.rows || []
    n.rows.push({ layer: s.layer, target: s.target, status: s.status, fallback: s.fallback })
    n.status = n.status === 'filled' || s.filled ? 'filled' : 'template'
  }

  // Files + sections + mentions
  for (const f of files) {
    if (!keep(f)) continue
    const text = texts.get(f)
    const { title, sections } = splitSections(text)
    const info = fileInfo.get(f)
    const fid = `file:${f}`
    const updated = (/Last updated:\s*(\d{4}-\d{2}-\d{2})/.exec(text) || [])[1] || null
    g.node(fid, {
      type: 'file',
      label: path.posix.basename(f),
      title: title || f,
      path: f,
      status: info.status,
      placeholders: info.placeholders,
      updated,
      lines: text.split('\n').length,
    })
    const layer = layerOf(f)
    if (layer) g.edge(`layer:${layer}`, fid, 'contains')

    const seenSlugs = new Map()
    for (const s of sections) {
      let slug = slugify(s.heading) || 'section'
      seenSlugs.set(slug, (seenSlugs.get(slug) || 0) + 1)
      if (seenSlugs.get(slug) > 1) slug += `-${seenSlugs.get(slug)}`
      const sid = `sec:${f}#${slug}`
      const body = s.lines.slice(1).join('\n')
      const seals = {}
      for (const m of body.matchAll(RE_SEAL)) seals[m[1]] = (seals[m[1]] || 0) + 1
      for (const m of s.heading.matchAll(RE_SEAL)) seals[m[1]] = (seals[m[1]] || 0) + 1
      const headingClean = s.heading.replace(RE_SEAL, '').trim()

      // Typed entity sections: persona, offer, deal, alternative (competitor).
      let type = 'section'
      let entity = null
      let m
      if ((m = /^(Primary|Secondary|Hypothesis|Tertiary)?\s*Persona:\s*(.+)$/i.exec(headingClean))) {
        type = 'persona'
        entity = { tier: (m[1] || '').toLowerCase() || null }
      } else if ((m = /^Offer\s+\d+:\s*(.+)$/i.exec(headingClean))) {
        type = 'offer'
      } else if ((m = /^Deal:\s*(.+?),\s*(.+)$/i.exec(headingClean))) {
        type = 'deal'
        entity = { outcome: m[2] }
      } else if ((m = /^(Alternativa|Alternative|Competitor):\s*(.+)$/i.exec(headingClean))) {
        type = 'alternative'
      }
      if (s.level === 1) type = 'intro'

      g.node(sid, {
        type,
        label: headingClean === '(intro)' ? `${path.posix.basename(f)} · intro` : headingClean,
        path: f,
        line: s.startLine,
        seals: Object.keys(seals).length ? seals : undefined,
        excerpt: stripMd(body).slice(0, 700),
        ...(entity || {}),
      })
      g.edge(fid, sid, 'contains')

      // Line-level mentions → edges
      const sLines = s.lines
      sLines.forEach((line, i) => {
        const at = { file: f, line: s.startLine + i, text: stripMd(line).slice(0, 220) }
        const pending = RE_PENDING.test(line)
        const tension = RE_TENSION.test(line) && !pending
        const targets = []

        // file references
        const refs = new Set()
        for (const r of line.matchAll(RE_PATH_REF)) refs.add(`${r[1]}/${r[2]}`)
        for (const r of line.matchAll(RE_MD_LINK)) refs.add(r[1])
        for (const r of line.matchAll(RE_BARE_FILE)) refs.add(r[1])
        for (const r of refs) {
          const target = resolveRef(f, r)
          if (!target || target === f || !keep(target)) continue
          const tStatus = fileInfo.get(target).status
          const type = tStatus === 'template' || pending ? 'pending' : 'cites'
          g.edge(sid, `file:${target}`, type, at)
          targets.push(`file:${target}`)
        }
        for (const r of line.matchAll(RE_FOLDER_REF)) {
          if (g.nodes.has(`layer:${r[1]}`) && r[1] !== layer) {
            g.edge(sid, `layer:${r[1]}`, pending ? 'pending' : 'cites', at)
          }
        }

        // proof ids
        const ids = new Set([...line.matchAll(RE_PROOF_ID)].map((p) => `${p[1]}-${p[2]}`))
        for (const id of expandProofRanges(line)) ids.add(id)
        for (const id of ids) {
          const def = proofDefs.get(id)
          const pid = `proof:${id}`
          g.node(pid, {
            type: 'proof',
            label: id,
            kind: PROOF_KIND[id.split('-')[0]],
            title: def ? def.label : undefined,
            path: def ? def.file : undefined,
            line: def ? def.line : undefined,
            defined: !!def,
          })
          const isDef = def && def.file === f && def.line === s.startLine + i
          g.edge(sid, pid, isDef ? 'defines' : 'proves', at)
          targets.push(pid)
        }

        // issues
        if (RE_ISSUE) for (const m2 of line.matchAll(RE_ISSUE)) {
          const key = `${m2[1]}-${m2[2]}`
          const iid = `issue:${key}`
          g.node(iid, { type: 'issue', label: key, url: opts.linearWorkspace ? `https://linear.app/${opts.linearWorkspace}/issue/${key}` : undefined })
          g.edge(sid, iid, 'tracks', at)
          targets.push(iid)
        }

        // source tags
        for (const m2 of line.matchAll(RE_SOURCE_TAG)) {
          const tag = m2[1]
          if (NOT_SOURCES.has(tag) || /^\d/.test(tag)) continue
          const def = sourceDefs.get(tag)
          // Undefined all-caps brackets are usually prompt slots, not sources.
          if (!def && (tagLines.get(tag) || 0) < 3) continue
          const srcId = `src:${tag}`
          g.node(srcId, {
            type: 'source',
            label: `[${tag}]`,
            title: def ? def.label : tag,
            obsidian: def ? def.obsidian : null,
            desc: def ? def.desc : undefined,
            path: def ? def.file : undefined,
          })
          g.edge(sid, srcId, 'derives', { ...at, pointer: m2[2] || undefined })
          targets.push(srcId)
        }

        // implicit mentions via aliases (only when the id itself is absent)
        for (const a of aliases) {
          if (ids.has(a.id) || !a.re.test(line)) continue
          const def = proofDefs.get(a.id)
          g.node(`proof:${a.id}`, { type: 'proof', label: a.id, kind: 'case', title: def.label, path: def.file, line: def.line, defined: true })
          g.edge(sid, `proof:${a.id}`, 'mentions', { ...at, alias: a.name })
          targets.push(`proof:${a.id}`)
        }

        // explicit conventions (proposed): [CONTRADIZ: x] [PENDENTE: x] [DERIVA: x]
        for (const m2 of line.matchAll(RE_EXPLICIT)) {
          const kind = { CONTRADIZ: 'tension', PENDENTE: 'pending', DERIVA: 'derives' }[m2[1]]
          const ref = m2[2].trim()
          let tid = null
          // Only link to something that exists; free text ("preço a confirmar") stays as a pending
          // mark on the line, with no node of its own.
          const head = ref.split(/[ ,§]/)[0]
          if (/^(CS|CAP|D|T)-\d{3}$/.test(ref)) tid = `proof:${ref}`
          else if (RE_ISSUE && new RegExp(`^${RE_ISSUE.source}$`).test(ref)) tid = `issue:${ref}`
          else if (/\.md$/.test(ref)) tid = resolveRef(f, ref) && `file:${resolveRef(f, ref)}`
          else if (sourceDefs.has(head) || (tagLines.get(head) || 0) >= 3) tid = `src:${head}`
          if (tid) g.edge(sid, tid, kind, { ...at, explicit: true })
        }

        if (tension && targets.length) {
          for (const t of targets) g.edge(sid, t, 'tension', at)
        }
      })
    }
  }

  // BRAND-BRAIN load order → "loads" edges, with step number.
  if (bbPath) {
    const bbId = `file:${bbPath}`
    for (const step of brandBrain.loadOrder) {
      for (const r of step.refs) {
        const target = resolveRef(bbPath, r)
        if (target && g.nodes.has(`file:${target}`)) {
          const e = g.edge(bbId, `file:${target}`, 'loads', { file: bbPath, text: step.text.slice(0, 160) })
          if (e) e.step = Math.min(e.step ?? Infinity, step.step)
        }
      }
    }
    // Layer fallbacks pointing at Obsidian → pending edges to a source-like node.
    for (const s of brandBrain.status) {
      if (!s.fallbackObsidian) continue
      const layer = (/^(\d{2}-[a-z0-9-]+)/.exec(s.target) || [])[1]
      if (!layer || !g.nodes.has(`layer:${layer}`)) continue
      const fid = `fallback:${slugify(s.fallbackObsidian)}`
      g.node(fid, { type: 'source', label: s.fallbackObsidian.replace(/\.md$/, '').split('/').pop(), obsidian: s.fallbackObsidian, title: `Fonte provisória: ${s.fallback}` })
      g.edge(`layer:${layer}`, fid, 'pending', { file: bbPath, text: `${s.layer}: ${s.status}. Provisório: ${s.fallback}` })
    }
  }

  // Status drift: BRAND-BRAIN declares a layer ⬜ template but a file in it is
  // filled (or ✅ but every file is still template). Surfaces a stale index.
  if (bbPath) {
    for (const row of brandBrain.status) {
      const prefix = row.target.replace(/\/$/, '')
      // A folder row ("/08-content/") does not own files that another row names explicitly.
      const explicit = new Set(brandBrain.status.filter((r) => r !== row).map((r) => r.target))
      const inRow = files.filter((f) => (f === prefix || f.startsWith(prefix + '/')) && (f === prefix || !explicit.has(f)))
      const filledHere = inRow.filter((f) => fileInfo.get(f).status === 'filled')
      const drift = (!row.filled && filledHere.length) ? `declarado "${row.status}", mas ${filledHere.length} arquivo(s) já preenchido(s)` :
        (row.filled && inRow.length && !filledHere.length) ? `declarado "${row.status}", mas nenhum arquivo preenchido` : null
      if (!drift) continue
      for (const f of (filledHere.length ? filledHere : inRow)) {
        const n = g.nodes.get(`file:${f}`)
        if (!n) continue
        n.drift = drift
        g.edge(`file:${bbPath}`, `file:${f}`, 'tension', { file: bbPath, text: `${row.layer}: ${drift}` })
      }
    }
  }

  const out = g.toJSON()
  out.meta = {
    kind: 'marca',
    root,
    brand,
    generatedAt: new Date().toISOString(),
    files: files.length,
    filesKept: files.filter(keep).length,
    proofDefined: [...proofDefs.keys()].sort(),
    sources: Object.fromEntries([...sourceDefs].map(([k, v]) => [k, { obsidian: v.obsidian, label: v.label, file: v.file }])),
  }
  return out
}
