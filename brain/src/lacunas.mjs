#!/usr/bin/env node
// What is still missing in the brand folder, in the order an agent should fill it.
//
//   node src/lacunas.mjs --marca ../marca            # report in markdown
//   node src/lacunas.mjs --marca ../marca --json     # same report as JSON
//   --template <dir>   blank template to compare against (default: ../marca next to the app)
//
// The fill skills (skills/ at the repo root) run this first and after every
// layer, so the agent works from the gaps the GTM Brain sees, not from a guess.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { extractBrand, listMarkdown, RE_EXPLICIT, RE_PENDING, RE_PLACEHOLDER, RE_INSTRUCTION } from './extract-brand.mjs'
import { buildBrain } from './brain-model.mjs'
import { parseArgs } from './build.mjs'

// Which skill fills which file. First match wins; anything else goes to fechar-lacunas.
export const SKILL_FOR = [
  [/^01-[^/]+\//, 'preencher-icp'],
  [/^02-[^/]+\//, 'preencher-voz'],
  [/^05-[^/]+\/(OFFER|OFERTA)\.md$/, 'preencher-oferta'],
  [/^05-[^/]+\//, 'mapear-concorrencia'],
  [/^06-[^/]+\//, 'pesquisar-palavras-chave'],
  // The schema file is filled from the site and the offer, not from a keyword study.
  [/^07-[^/]+\/(SCHEMA|DADOS-ESTRUTURADOS)\.md$/, 'fechar-lacunas'],
  [/^07-[^/]+\//, 'pesquisar-palavras-chave'],
  [/^08-[^/]+\/(PROOF-CORPUS|PROVAS)\.md$/, 'registrar-provas'],
  [/^08-[^/]+\/(CALENDAR|CALENDARIO)\.md$/, 'montar-plano'],
  [/^09-[^/]+\//, 'montar-plano'],
  [/^11-[^/]+\//, 'montar-plano'],
  [/^10-[^/]+\/(BRAND-BRAIN|CEREBRO)\.md$/, 'gtm-brain'],
]
export const skillFor = (file) => (SKILL_FOR.find(([re]) => re.test(file)) || [null, 'fechar-lacunas'])[1]

// Fill order: the three files that change an agent's writing the most come first.
const ORDER = ['01-', '02-', '05-', '08-', '06-', '07-', '11-', '09-', '03-', '04-', '10-']
// Inside a layer, the main file first: ICP before the committee, the offer before the competition.
const RE_MAIN = /\/(ICP|VOICE|VOZ|OFFER|OFERTA|PROOF-CORPUS|PROVAS|KEYWORDS|PALAVRAS-CHAVE|SITEMAP|MAPA-DO-SITE|CUSTOMER-MATH|CONTA-DO-CLIENTE|ANALYTICS|MEDICAO|VISUAL-IDENTITY|IDENTIDADE-VISUAL|DESIGN)\.md$/
const rank = (file) => {
  const i = ORDER.findIndex((p) => file.startsWith(p))
  return (i < 0 ? ORDER.length : i) * 2 + (RE_MAIN.test(file) ? 0 : 1)
}
// Files the brand itself does not fill: playbooks, prompt and content templates, history.
const RE_SUPPORT = /^10-[^/]+\/(?!(BRAND-BRAIN|CEREBRO)\.md$)|\/(HISTORY|HISTORICO|PROMPTS|REVISAO-MENSAL|MONTHLY-REVIEW|MODELO-DE-SPEC|COMPONENT-SPEC-TEMPLATE|REFERENCIAS|REFERENCES)\.md$|\/(modelos|templates|campanhas|specs)\/|(^|\/)(AUDITORIAS|CONTRIBUINDO|HISTORICO)\.md$/

// The blank template illustrates every section with the fictional example brand
// (Cadência). A filled file that still carries one of these lines verbatim kept
// the example instead of the brand's own content.
export const EXAMPLE_NAMES = /\b(Cadência|Lírio|Renata|Ahimsa|Patrícia|Núcleo Funcional|Joana Prates|Marina Duarte|Bruna Alves|Rafael Nunes|Lívia Moraes|Tiago Ramos|AgendaFit|BarraFixa|[Ee]stúdios?|[Pp]ilates|[Yy]oga|alunas?|mensalidades?)\b/u
const RE_KEEP_SECTION = /^##\s+(Como usar este arquivo|Checklist para agentes|Como passar este arquivo|How to use this file|AI agent checklist|How to hand this file)/i

/** Lines of `text` identical to a template line that names the example brand. */
export function templateResidue(text, templateText) {
  const candidates = new Set(templateText.split('\n').map((l) => l.trim()).filter((l) => EXAMPLE_NAMES.test(l)))
  const hits = []
  let keep = false
  text.split('\n').forEach((line, i) => {
    if (/^##\s/.test(line)) keep = RE_KEEP_SECTION.test(line)
    if (!keep && candidates.has(line.trim())) hits.push({ line: i + 1, text: line.trim().slice(0, 120) })
  })
  return hits
}

const here = path.dirname(fileURLToPath(import.meta.url))
/** The blank template next to the app (repo/marca), unless it is the folder being checked. */
export function defaultTemplateDir(root) {
  const t = path.resolve(here, '..', '..', 'marca')
  return fs.existsSync(t) && path.resolve(root) !== t ? t : null
}

export function gapReport(root, opts = {}) {
  const graph = extractBrand(root, { issues: opts.issues })
  const brain = buildBrain(root, graph, { issues: opts.issues })
  const files = graph.nodes.filter((n) => n.type === 'file')
  const brandFiles = files.filter((f) => f.status !== 'meta' && !RE_SUPPORT.test(f.path))

  const layers = new Map()
  for (const f of brandFiles) {
    const layer = f.path.split('/')[0]
    const l = layers.get(layer) || { layer, files: 0, filled: 0, template: [] }
    l.files++
    if (f.status === 'filled') l.filled++
    else l.template.push(f.path)
    layers.set(layer, l)
  }

  const toFill = brandFiles
    .filter((f) => f.status !== 'filled')
    .sort((a, b) => rank(a.path) - rank(b.path) || a.path.localeCompare(b.path))
    .map((f) => ({ file: f.path, title: f.title, placeholders: f.placeholders, skill: skillFor(f.path) }))

  // Records in filled files that still miss expected fields or carry pending fields.
  const incomplete = []
  for (const r of brain.items) {
    if (!r.origin || r.status !== 'filled' || !r.fields) continue
    const pending = r.fields.filter((f) => f.status !== 'ok').map((f) => f.label)
    const missing = r.missing || []
    if (!pending.length && !missing.length) continue
    incomplete.push({ id: r.id, title: r.title, file: r.origin.file, line: r.origin.line, missing, pending, skill: skillFor(r.origin.file) })
  }
  incomplete.sort((a, b) => rank(a.file) - rank(b.file) || a.file.localeCompare(b.file) || a.line - b.line)

  const filled = new Set(brandFiles.filter((f) => f.status === 'filled').map((f) => f.path))
  // Citations in template files are the template's own examples, not the brand's.
  const undefinedProofs = graph.nodes
    .filter((n) => n.type === 'proof' && !n.defined)
    .map((n) => {
      const cited = graph.edges.filter((e) => e.target === n.id).flatMap((e) => e.evidence || []).filter((ev) => filled.has(ev.file)).map((ev) => `${ev.file}:${ev.line}`)
      return { id: n.label, citedAt: [...new Set(cited)].slice(0, 5) }
    })
    .filter((p) => p.citedAt.length)

  // Explicit marks and pending wording, line by line, in the filled files.
  const marks = []
  for (const file of listMarkdown(root).filter((f) => filled.has(f))) {
    const lines = fs.readFileSync(path.join(root, file), 'utf8').split('\n')
    let fence = false
    let section = ''
    lines.forEach((line, i) => {
      if (/^\s*```/.test(line)) fence = !fence
      if (/^##\s/.test(line)) section = line
      // The layer status table is reported above; the template's own guidance sections keep their brackets.
      if (/^##\s+(Status das camadas|Layer status)/i.test(section) || RE_KEEP_SECTION.test(section)) return
      if (!fence && (line.replace(/`[^`]*`/g, '').match(RE_INSTRUCTION) || []).length) {
        marks.push({ kind: 'instrução', file, line: i + 1, text: line.trim().slice(0, 160) })
        return
      }
      // The brand brain's master prompt lives in a code block and must be filled too.
      if (fence && !/^10-[^/]+\/(BRAND-BRAIN|CEREBRO)\.md$/.test(file)) return
      const explicit = [...line.matchAll(RE_EXPLICIT)]
      const kind = explicit.some((m) => m[1] === 'CONTRADIZ') ? 'contradiz'
        : explicit.some((m) => m[1] === 'PENDENTE') || (!fence && RE_PENDING.test(line)) || RE_PLACEHOLDER.test(line) || (fence && /\[[A-ZÁÉÍÓÚÂÊÔÃÕÇ][^\]\n]*[a-zà-ÿ][^\]\n]*\]/u.test(line)) ? 'pendente' : null
      RE_PLACEHOLDER.lastIndex = 0
      if (kind) marks.push({ kind, file, line: i + 1, text: line.trim().slice(0, 160) })
    })
  }

  // Example prose left over from the template in files that otherwise look filled.
  const residue = []
  const templateDir = opts.template === undefined ? defaultTemplateDir(root) : opts.template
  // The example brand itself is made of these lines.
  if (templateDir && !/\bCadência\b/u.test(graph.meta.brand || '')) {
    for (const file of filled) {
      const t = path.join(templateDir, file)
      if (!fs.existsSync(t)) continue
      const hits = templateResidue(fs.readFileSync(path.join(root, file), 'utf8'), fs.readFileSync(t, 'utf8'))
      if (hits.length) residue.push({ file, lines: hits.length, first: hits.slice(0, 3), skill: skillFor(file) })
    }
    residue.sort((a, b) => rank(a.file) - rank(b.file))
  }

  const hypotheses = new Map()
  for (const r of brain.items) {
    if (!r.origin || !r.flags || !r.flags.hypothesis || r.status !== 'filled') continue
    hypotheses.set(r.origin.file, (hypotheses.get(r.origin.file) || 0) + r.flags.hypothesis)
  }

  return {
    brand: graph.meta.brand,
    root,
    generatedAt: new Date().toISOString(),
    layers: [...layers.values()].sort((a, b) => a.layer.localeCompare(b.layer)),
    toFill,
    incomplete,
    undefinedProofs,
    marks,
    residue,
    hypotheses: [...hypotheses.entries()].map(([file, n]) => ({ file, n })).sort((a, b) => b.n - a.n),
    next: toFill[0] ? { skill: toFill[0].skill, file: toFill[0].file } : incomplete[0] ? { skill: incomplete[0].skill, file: incomplete[0].file } : null,
  }
}

export function renderReport(r) {
  const out = []
  out.push(`# Lacunas · ${r.brand || 'marca sem nome'}`, '')
  const done = r.layers.reduce((n, l) => n + l.filled, 0)
  const total = r.layers.reduce((n, l) => n + l.files, 0)
  out.push(`${done} de ${total} arquivos da marca preenchidos.`, '')
  out.push('| Camada | Preenchidos |', '| --- | --- |')
  for (const l of r.layers) out.push(`| ${l.layer} | ${l.filled} de ${l.files} |`)
  out.push('')
  if (r.next) out.push(`**Próximo passo:** \`${r.next.skill}\` em \`${r.next.file}\``, '')

  if (r.toFill.length) {
    out.push('## Arquivos ainda em template', '', 'Na ordem de preenchimento.', '')
    for (const f of r.toFill) out.push(`- \`${f.file}\` → ${f.skill}`)
    out.push('')
  }
  if (r.incomplete.length) {
    out.push('## Fichas incompletas', '')
    for (const i of r.incomplete) {
      const parts = []
      if (i.missing.length) parts.push(`faltam ${i.missing.join(', ')}`)
      if (i.pending.length) parts.push(`pendentes ${i.pending.join(', ')}`)
      out.push(`- ${i.title} (\`${i.file}:${i.line}\`): ${parts.join('; ')} → ${i.skill}`)
    }
    out.push('')
  }
  if (r.undefinedProofs.length) {
    out.push('## Provas citadas sem definição', '')
    for (const p of r.undefinedProofs) out.push(`- ${p.id}, citada em ${p.citedAt.map((c) => `\`${c}\``).join(', ')} → registrar-provas`)
    out.push('')
  }
  if (r.residue && r.residue.length) {
    out.push('## Exemplo do template que ficou no arquivo', '', 'Linhas copiadas do template que falam da Cadência, a marca fictícia dos exemplos. Reescreva com o conteúdo da marca ou apague.', '')
    for (const x of r.residue) out.push(`- \`${x.file}\`: ${x.lines} linha${x.lines > 1 ? 's' : ''}, a partir da ${x.first[0].line} ("${x.first[0].text.slice(0, 70)}…") → ${x.skill}`)
    out.push('')
  }
  const contra = r.marks.filter((m) => m.kind === 'contradiz')
  const pend = r.marks.filter((m) => m.kind === 'pendente')
  const instr = r.marks.filter((m) => m.kind === 'instrução')
  if (contra.length) {
    out.push('## Contradições', '')
    for (const m of contra) out.push(`- \`${m.file}:${m.line}\` ${m.text}`)
    out.push('')
  }
  if (instr.length) {
    out.push('## Instruções do template nos arquivos preenchidos', '', 'Colchetes com texto do template que ficaram para trás. Troque pelo conteúdo ou marque como pendente.', '')
    for (const m of instr) out.push(`- \`${m.file}:${m.line}\` ${m.text}`)
    out.push('')
  }
  if (pend.length) {
    out.push('## Pendências nos arquivos preenchidos', '')
    for (const m of pend) out.push(`- \`${m.file}:${m.line}\` ${m.text}`)
    out.push('')
  }
  if (r.hypotheses.length) {
    out.push('## Hipóteses e propostas em aberto', '', 'Não são lacunas: são apostas marcadas. Valide quando houver dado.', '')
    for (const h of r.hypotheses) out.push(`- \`${h.file}\`: ${h.n}`)
    out.push('')
  }
  if (!r.toFill.length && !r.incomplete.length && !r.undefinedProofs.length && !r.marks.length && !(r.residue && r.residue.length)) out.push('Nenhuma lacuna encontrada.', '')
  return out.join('\n')
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const argv = process.argv.slice(2)
  const json = argv.includes('--json')
  const ti = argv.indexOf('--template')
  const template = ti >= 0 ? path.resolve(argv[ti + 1]) : undefined
  const args = parseArgs(argv.filter((a, i) => a !== '--json' && (ti < 0 || (i !== ti && i !== ti + 1))))
  if (args.help) {
    console.log(fs.readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(1, 8).join('\n').replace(/^\/\/ ?/gm, ''))
  } else if (!fs.existsSync(args.marca)) {
    console.error(`Pasta da marca não encontrada: ${args.marca}. Use --marca <pasta> ou GTM_BRAIN_MARCA.`)
    process.exit(1)
  } else {
    const report = gapReport(args.marca, { issues: args.issues, template })
    console.log(json ? JSON.stringify(report, null, 1) : renderReport(report))
  }
}
