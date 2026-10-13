import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {
  splitSections, findProofDefinitions, expandProofRanges, findSourceDefinitions, parseBrandBrain, extractBrand,
} from '../src/extract-brand.mjs'
import { parseFrontmatter, extractVault, buildIndex } from '../src/extract-vault.mjs'
import { mergeGraphs, vaultSeeds, renderHtml } from '../src/build.mjs'

function tree(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'brain-graph-'))
  for (const [p, body] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true })
    fs.writeFileSync(path.join(root, p), body)
  }
  return root
}

const brand = {
  '10-brand-brain/BRAND-BRAIN.md': `# Brand Brain — Acme

## Status das camadas

| Camada | Arquivo | Status | Fonte provisória |
| --- | --- | --- | --- |
| 01 ICP | \`/01-icp/ICP.md\` | ✅ v1 | — |
| 01 Buyer | \`/01-icp/BUYER.md\` | ⬜ template | Resumo em ICP.md |
| 03 Visual | \`/03-visual/\` | ⬜ template | Obsidian \`Brand Guide\` |
| 08 Proof | \`/08-content/PROOF.md\` | ✅ v1 | — |

## Load order

1. \`/10-brand-brain/BRAND-BRAIN.md\` (este arquivo).
2. \`/01-icp/ICP.md\`.
3. Prova: \`/08-content/PROOF.md\`.
`,
  '01-icp/ICP.md': `# ICP — Acme

Last updated: 2026-10-11

- \`[PLAYBOOK]\` Obsidian \`Playbook de Vendas\` (v1). Fonte de verdade.

## Primary Persona: o dono ocupado [COMPROVADO]

Clientes como Clínica Aurora e Contábil Norte \`[PLAYBOOK §5]\`. Ver \`/01-icp/BUYER.md\` (pendente). Prova: CS-001 a CS-002, COL-12.

## Notas

\`\`\`text
## not a heading
\`\`\`
`,
  '01-icp/BUYER.md': `# Buyer committee

Last updated: [YYYY-MM-DD]
`,
  '05-offer/OFFER.md': `# Offer — Acme

## Offer 1: MVP Express

Prova: CS-001. ⚠️ preço diverge de /08-content/PROOF.md.
`,
  '08-content/PROOF.md': `# Proof — Acme

| ID | Cliente | Setor |
| --- | --- | --- |
| CS-001 | Clínica Aurora | Saúde |
| CS-002 | Contábil Norte | Tributário |

### CS-002 · Contábil Norte, calculadora

Texto.
`,
  '03-visual/VISUAL.md': `# Visual — Acme

Cores.
`,
  '04-design-system/DESIGN.md': `# Design — Acme

> ⚠️ Template upstream, ainda não adaptado ao Acme.
`,
}

test('splitSections ignores headings inside fences', () => {
  const { title, sections } = splitSections(brand['01-icp/ICP.md'])
  assert.equal(title, 'ICP — Acme')
  assert.deepEqual(sections.map((s) => s.heading), ['(intro)', 'Primary Persona: o dono ocupado [COMPROVADO]', 'Notas'])
})

test('proof definitions come from headings and table rows', () => {
  const defs = findProofDefinitions(brand['08-content/PROOF.md'])
  assert.equal(defs.get('CS-001').label, 'Clínica Aurora')
  assert.equal(defs.get('CS-002').label, 'Contábil Norte, calculadora') // heading wins over table
})

test('proof ranges expand', () => {
  assert.deepEqual(expandProofRanges('CS-001 a CS-003'), ['CS-001', 'CS-002', 'CS-003'])
  assert.deepEqual(expandProofRanges('D-101 to 103'), ['D-101', 'D-102', 'D-103'])
})

test('source definitions resolve to Obsidian notes', () => {
  const defs = findSourceDefinitions(brand['01-icp/ICP.md'])
  assert.equal(defs.get('PLAYBOOK').obsidian, 'Playbook de Vendas')
})

test('BRAND-BRAIN status and load order parse', () => {
  const bb = parseBrandBrain(brand['10-brand-brain/BRAND-BRAIN.md'])
  assert.equal(bb.status.length, 4)
  assert.equal(bb.status[2].fallbackObsidian, 'Brand Guide')
  assert.deepEqual(bb.loadOrder.map((s) => s.step), [1, 2, 3])
})

test('extractBrand builds typed nodes and the five edge families', () => {
  const root = tree(brand)
  const g = extractBrand(root, { issues: ['COL'] })
  const node = (id) => g.nodes.find((n) => n.id === id)
  const edge = (s, t, type) => g.edges.find((e) => e.source === s && e.target === t && e.type === type)

  assert.equal(g.meta.brand, 'Acme')
  assert.equal(node('file:01-icp/BUYER.md').status, 'template')
  assert.equal(node('file:04-design-system/DESIGN.md').status, 'template', 'not-adapted banner beats the brand name')
  const persona = g.nodes.find((n) => n.type === 'persona')
  assert.ok(persona && persona.seals.COMPROVADO === 1)
  assert.ok(g.nodes.find((n) => n.type === 'offer' && /MVP Express/.test(n.label)))

  // cites / pending / proves / derives / tracks
  assert.ok(edge(persona.id, 'file:01-icp/BUYER.md', 'pending'))
  assert.ok(edge(persona.id, 'proof:CS-002', 'proves'), 'range expanded')
  assert.ok(edge(persona.id, 'src:PLAYBOOK', 'derives'))
  assert.equal(edge(persona.id, 'src:PLAYBOOK', 'derives').evidence[0].pointer, '§5')
  assert.ok(edge(persona.id, 'issue:COL-12', 'tracks'))
  // explicit id on the line suppresses the alias mention for the same id
  assert.equal(edge(persona.id, 'proof:CS-001', 'mentions'), undefined)

  // tension: "diverge" on a line with a file ref and a proof id
  const offer = g.nodes.find((n) => n.type === 'offer')
  assert.ok(edge(offer.id, 'file:08-content/PROOF.md', 'tension'))
  assert.ok(edge(offer.id, 'proof:CS-001', 'tension'))

  // load order keeps the step number
  const loads = g.edges.filter((e) => e.type === 'loads')
  assert.equal(loads.find((e) => e.target === 'file:08-content/PROOF.md').step, 3)

  // drift: 03 Visual declared template but VISUAL.md is filled
  assert.match(node('file:03-visual/VISUAL.md').drift, /declarado/)
  assert.ok(edge('file:10-brand-brain/BRAND-BRAIN.md', 'file:03-visual/VISUAL.md', 'tension'))
  // folder fallback to Obsidian becomes a pending edge
  assert.ok(g.edges.find((e) => e.source === 'layer:03-visual' && e.type === 'pending'))
})

test('alias mentions link bare client names to case ids', () => {
  const root = tree({ ...brand, '05-offer/WIN.md': '# Win — Acme\n\n## Deal: Clínica Aurora, Won\n\nA Clínica Aurora fechou.\n' })
  const g = extractBrand(root)
  const deal = g.nodes.find((n) => n.type === 'deal')
  assert.equal(deal.outcome, 'Won')
  assert.ok(g.edges.find((e) => e.source === deal.id && e.target === 'proof:CS-001' && e.type === 'mentions'))
})

const VAULT = {
  'Hub.md': '---\ntype: hub\ntags: [a, b]\n---\n# Hub\n[[Playbook de Vendas]] e [[03 Resources/Guia|guia]].\n',
  '03 Resources/Playbook de Vendas.md': '---\nstatus: active\nparent: "[[Hub]]"\n---\nTexto [[Pessoa]].\n',
  '03 Resources/Guia.md': 'Sem links.\n',
  '05 People/Pessoa.md': 'Oi [[Hub]].\n',
  '08 Daily/2026-10-11.md': 'Daily [[Playbook de Vendas]].\n',
}

test('frontmatter and wikilinks parse', () => {
  const { data } = parseFrontmatter(VAULT['Hub.md'])
  assert.deepEqual(data.tags, ['a', 'b'])
  const resolve = buildIndex(Object.keys(VAULT))
  assert.equal(resolve('Playbook de Vendas'), '03 Resources/Playbook de Vendas.md')
  assert.equal(resolve('03 Resources/Guia'), '03 Resources/Guia.md')
  assert.equal(resolve('Nope'), null)
})

test('extractVault walks from seeds and skips excluded folders', () => {
  const root = tree(VAULT)
  const v = extractVault(root, { seeds: ['Playbook de Vendas'], hops: 1 })
  const ids = v.nodes.map((n) => n.id).sort()
  assert.deepEqual(ids, ['note:03 Resources/Playbook de Vendas.md', 'note:05 People/Pessoa.md', 'note:Hub.md'])
  assert.ok(v.edges.find((e) => e.source === 'note:03 Resources/Playbook de Vendas.md' && e.target === 'note:Hub.md'), 'frontmatter parent link')
})

test('merge bridges brand sources to vault notes', () => {
  const marca = extractBrand(tree(brand))
  assert.deepEqual(vaultSeeds(marca).sort(), ['Acme', 'Brand Guide', 'Playbook de Vendas'])
  const v = extractVault(tree(VAULT), { seeds: vaultSeeds(marca), hops: 0 })
  const merged = mergeGraphs(marca, v)
  assert.ok(merged.edges.find((e) => e.source === 'src:PLAYBOOK' && e.target === 'note:03 Resources/Playbook de Vendas.md' && e.type === 'resolves'))
  assert.equal(merged.meta.bridges, 1)
})

test('renderHtml inlines data safely', () => {
  const html = renderHtml({ nodes: [{ id: 'x', label: '</script><b>' }], edges: [], meta: {} }, 'T')
  assert.ok(!html.includes('</script><b>'))
  assert.ok(html.includes('\\u003c/script>'))
  assert.ok(html.includes('<title>T</title>'))
})

test('explicit marks: free text creates no node; "sem conflito" is not a tension', () => {
  const root = tree({
    ...brand,
    '05-offer/PLANOS.md': '# Planos — Acme\n\n## Rede\n\nPreço para 10+ unidades [PENDENTE: preço a confirmar até novembro].\n\n## Essencial\n\nSem conflito com o plano Rede.\n',
  })
  const g = extractBrand(root)
  assert.ok(!g.nodes.some((n) => n.id === 'src:preço'), 'no source node from free text')
  const sec = g.nodes.find((n) => n.id.startsWith('sec:05-offer/PLANOS.md#essencial'))
  assert.ok(!g.edges.some((e) => e.source === sec.id && e.type === 'tension'))
})

test('a filled data file counts even without the brand in its header; "[Nome da marca]" is no brand', () => {
  const root = tree({
    '10-cerebro/CEREBRO.md': '# Cérebro da marca — [Nome da marca]\n',
    '01-icp/ICP.md': '# Perfil de cliente ideal (ICP)\n\n## Persona primária: dona de estúdio\n\n### Dores\n\n- Cobrança no WhatsApp\n',
    '02-voz/VOZ.md': '# Guia de voz\n\n## Ponto de vista\n\n[Escreva aqui o ponto de vista da marca em duas frases]\n\n[AAAA-MM-DD]\n',
    '10-cerebro/playbooks/blog.md': '# Playbook de blog\n\nTexto genérico.\n',
    '11-plano/CANAIS.md': '# Canais\n\n## Canal: Parcerias\n\n- **Entra como:** leads\n',
  })
  const g = extractBrand(root)
  assert.equal(g.meta.brand, null)
  const st = (p) => (g.nodes.find((n) => n.id === `file:${p}`) || {}).status
  assert.equal(st('01-icp/ICP.md'), 'filled')
  assert.equal(st('02-voz/VOZ.md'), 'template')
  assert.equal(st('11-plano/CANAIS.md'), 'filled', 'CANAIS.md is one of the brand data files')
  assert.equal(st('10-cerebro/playbooks/blog.md'), undefined, 'generic scaffold stays out of the graph')
})
