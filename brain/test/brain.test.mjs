import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { parseTree, parseFields, parseTables, renderMd } from '../src/md.mjs'
import { buildBrain } from '../src/brain-model.mjs'
import { extractBrand } from '../src/extract-brand.mjs'
import { renderBrainHtml } from '../src/build.mjs'

function tree(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'gtm-brain-'))
  for (const [p, body] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true })
    fs.writeFileSync(path.join(root, p), body)
  }
  return root
}

const brand = {
  '10-brand-brain/BRAND-BRAIN.md': '# Brand Brain — Acme\n',
  '01-icp/ICP.md': `# ICP — Acme

- \`[PLAYBOOK]\` Obsidian \`Playbook de Vendas\` (v1).

## How to use this file

Boilerplate.

## Primary Persona: o dono ocupado (Perfil 1) [COMPROVADO]

Dono que opera. Casos: Clínica Aurora \`[PLAYBOOK §5]\`.

### Firmographics

- **Company size:** 11 a 50 [HIPÓTESE]

### Pain Points

1. Planilha que ninguém entende. Prova: CS-001.

### Budget Range

Preço **em definição**.

## Secondary Persona: fundador sem time (Perfil 2) [HIPÓTESE]

- **Sinais:** produto no Lovable
- **Linha natural:** MVP Express
`,
  '05-offer/OFFER.md': `# Offer — Acme

## Positioning statement

Para donos ocupados.

## Offer 1: MVP Express

### Who it is for

Perfil 1, ver \`/01-icp/ICP.md\`.

### Proof

CS-001 e CAP-001.
`,
  '08-content/PROOF-CORPUS.md': `# Proof — Acme

### CS-001 · Clínica Aurora, faturamento

- **Antes:** planilha \`[PLAYBOOK]\`.
- **Construído:** sistema.

| Número | Valor |
| --- | --- |
| Prazo | 28 dias |

- **Fora de escopo:** glosa.

## Prova de capacidade

| ID | O quê | Prova |
| --- | --- | --- |
| CAP-001 | Agentes internos | 5 agentes |
`,
  '06-seo/KEYWORDS.md': `# Keywords — Acme

## Primary keywords

| Palavra | Intenção | Volume | Dific. | Página alvo | Prioridade |
| --- | --- | --- | --- | --- | --- |
| agenda online | Informacional | 33.100 | 22 | Guia de agenda | **Alta** |
`,
  '06-seo/research/2026-10-12-expansao-priorizada.csv': 'keyword,volume,kd,intent,yoy,cluster,demand,competition,fit,opportunity\nagenda online,33100,22,info,83,1,10,3,9,7\n"agente de ia, whatsapp",720,7,nav,-23,4,6,1,9,5\n',
  '05-offer/COMPETITORS.md': `# Competitors — Acme

## Alternativa: freelancer

- **Pontos fortes:** barato.
- **Como ganhamos:** método.
`,
}

test('parseTree nests headings, keeps line numbers and skips fenced headings', () => {
  const t = parseTree('# A\n\n## B\ntext\n```\n## not\n```\n### C\nx\n## D\n')
  const a = t.children[0]
  assert.equal(a.title, 'A')
  assert.deepEqual(a.children.map((c) => c.title), ['B', 'D'])
  assert.equal(a.children[0].children[0].title, 'C')
  assert.equal(a.children[0].line, 3)
  assert.equal(a.children[0].end, 9)
})

test('parseFields reads labeled bullets, sub-headings and keeps unlabeled content', () => {
  const t = parseTree('## X\n\nIntro line.\n\n- **Antes:** a\n  continua\n- **Depois**: b\n\n| h |\n| --- |\n| v |\n\n### Pricing: **em definição**\n\nTexto.\n')
  const { intro, fields } = parseFields(t.children[0])
  assert.deepEqual(intro, ['Intro line.'])
  assert.deepEqual(fields.map((f) => f.label), ['Antes', 'Depois', 'Detalhes', 'Pricing'])
  assert.deepEqual(fields[0].lines, ['a', 'continua'])
  assert.equal(fields[3].lines[0], '**em definição**')
})

test('parseTables and renderMd cover tables, lists and quotes', () => {
  const rows = parseTables([{ text: '| ID | O quê |', line: 1 }, { text: '| --- | --- |', line: 2 }, { text: '| CAP-001 | x |', line: 3 }])
  assert.deepEqual(rows[0].rows[0], { cells: ['CAP-001', 'x'], line: 3 })
  const html = renderMd(['- a', '  - b', '- c', '', '> q', '', '| h |', '| --- |', '| v |'])
  assert.match(html, /<ul><li>a<ul><li>b<\/li><\/ul><\/li><li>c<\/li><\/ul>/)
  assert.match(html, /<blockquote>q<\/blockquote>/)
  assert.match(html, /<th>h<\/th>.*<td>v<\/td>/)
})

test('buildBrain turns brand files into typed records with completeness and links', () => {
  const root = tree(brand)
  const graph = extractBrand(root)
  const brain = buildBrain(root, graph)
  const cat = (id) => brain.categories.find((c) => c.id === id)
  const item = (id) => brain.items.find((i) => i.id === id)

  assert.ok(cat('personas') && cat('offers') && cat('proofs') && cat('competition') && cat('sources'))
  const p1 = brain.items.find((i) => i.kind === 'persona' && i.code === 'Perfil 1')
  assert.equal(p1.title, 'O dono ocupado')
  assert.deepEqual(p1.pills.map((p) => p.t), ['primária', 'comprovado'])
  assert.deepEqual(p1.fields.slice(0, 3).map((f) => f.label), ['Firmografia', 'Dores', 'Orçamento'])
  assert.equal(p1.total, 13)
  assert.equal(p1.filled, 2, 'budget is pending, so it does not count')
  assert.equal(p1.fields.find((f) => f.label === 'Orçamento').status, 'pending')
  assert.ok(p1.missing.includes('Psicografia'))
  assert.ok(p1.refs.some((r) => r.to === 'proof:CS-001' && r.type === 'proves'))
  assert.ok(p1.refs.some((r) => r.to === 'source:PLAYBOOK' && r.type === 'derives'))

  const p2 = brain.items.find((i) => i.code === 'Perfil 2')
  assert.equal(p2.fields[0].label, 'Gatilhos e sinais', 'Sinais maps onto the schema field')
  assert.ok(p2.refs.some((r) => r.to === 'offers:mvp-express' && r.type === 'cites'), 'offer named in prose becomes a link')

  const offer = item('offers:mvp-express')
  assert.equal(offer.code, 'Oferta 1')
  assert.ok(offer.refs.some((r) => r.to === 'proof:CAP-001'))
  assert.ok(offer.refs.some((r) => r.to === 'cat:personas' && r.type === 'cites'), 'a file path points at the category it feeds')
  const who = offer.fields.find((f) => f.label === 'Para quem')
  assert.match(who.html, /data-go="cat:personas">Personas</)
  assert.doesNotMatch(who.html, /ICP\.md/, 'files are named by what they hold')

  const cs = item('proof:CS-001')
  assert.equal(cs.title, 'Clínica Aurora, faturamento')
  assert.deepEqual(cs.fields.map((f) => f.label), ['Antes', 'Construído', 'Detalhes', 'Fora de escopo'])
  assert.match(cs.fields[0].html, /data-go="source:PLAYBOOK"/)
  const cap = item('proof:CAP-001')
  assert.equal(cap.title, 'Agentes internos')
  assert.equal(cap.fields[0].label, 'Prova')

  const alt = item('competition:freelancer')
  assert.equal(alt.title, 'Freelancer')
  assert.equal(alt.total, 6)
  assert.equal(alt.filled, 2)

  assert.ok(item('doc:posicionamento'), 'documents are built from whole sections')
  assert.ok(!brain.items.some((i) => i.fields.some((f) => /How to use/i.test(f.label))), 'boilerplate is dropped')
  assert.ok(item('source:PLAYBOOK').title.includes('Playbook de Vendas'))
})

test('keywords: table rows become records and the research CSV enriches them', () => {
  const root = tree(brand)
  const brain = buildBrain(root, extractBrand(root))
  const kw = brain.items.find((i) => i.id === 'kw:agenda-online')
  assert.ok(kw, 'primary keyword is a record')
  assert.equal(kw.sub, '33.100/mês · dif. 22 · +83% ano · oportunidade 7/10')
  assert.deepEqual(kw.pills.map((p) => p.t), ['alta', 'informacional'])
  assert.ok(kw.fields.some((f) => f.label === 'Página alvo'), 'from KEYWORDS.md')
  assert.ok(kw.fields.some((f) => f.label === 'Oportunidade'), 'from the CSV')
  const lt = brain.items.find((i) => i.id === 'kw:agente-de-ia-whatsapp')
  assert.equal(lt.group, 'Cauda longa validada')
  assert.match(lt.sub, /−23% ano/, 'negative trend keeps its sign')
  assert.equal(brain.items.filter((i) => i.id.startsWith('kw:agenda-online')).length, 1, 'no duplicate from the CSV')
})

test('renderBrainHtml inlines the records safely', () => {
  const html = renderBrainHtml({ meta: { brand: 'A' }, categories: [], items: [{ id: 'x', title: '</script><b>' }] }, 'GTM Brain · A')
  assert.ok(!html.includes('</script><b>'))
  assert.ok(html.includes('<title>GTM Brain · A</title>'))
})
