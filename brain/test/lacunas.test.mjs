import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { gapReport, renderReport, skillFor, templateResidue } from '../src/lacunas.mjs'
import { extractBrand } from '../src/extract-brand.mjs'

function tree(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'gtm-brain-'))
  for (const [p, body] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true })
    fs.writeFileSync(path.join(root, p), body)
  }
  return root
}

test('skillFor maps each layer to the skill that fills it', () => {
  assert.equal(skillFor('01-icp/ICP.md'), 'preencher-icp')
  assert.equal(skillFor('05-oferta/OFERTA.md'), 'preencher-oferta')
  assert.equal(skillFor('05-oferta/CONCORRENCIA.md'), 'mapear-concorrencia')
  assert.equal(skillFor('08-conteudo/PROVAS.md'), 'registrar-provas')
  assert.equal(skillFor('06-seo/CLUSTERS.md'), 'pesquisar-palavras-chave')
  assert.equal(skillFor('11-plano/CONTA-DO-CLIENTE.md'), 'montar-plano')
  assert.equal(skillFor('03-visual/IMAGENS.md'), 'fechar-lacunas')
  assert.equal(skillFor('07-site/MAPA-DO-SITE.md'), 'pesquisar-palavras-chave')
  assert.equal(skillFor('07-site/DADOS-ESTRUTURADOS.md'), 'fechar-lacunas')
})

test('gap report lists template files first, then incomplete records, undefined proofs and marks', () => {
  const root = tree({
    '10-cerebro/CEREBRO.md': '# Cérebro da marca — Acme\n',
    '01-icp/ICP.md': '# ICP — Acme\n\n## Persona primária: o dono\n\n### Firmografia\n\nPequenas empresas.\n\n### Dores\n\nCobrança (pendente)\n',
    '01-icp/README.md': '# Como preencher\n',
    '05-oferta/OFERTA.md': '# Oferta — [Nome da empresa]\n\n## Oferta 1: [Nome da oferta]\n',
    '08-conteudo/PROVAS.md': '# Provas — Acme\n\nO case CS-009 sustenta a promessa. [CONTRADIZ: CS-009]\n',
  })
  const r = gapReport(root)
  assert.equal(r.brand, 'Acme')
  assert.deepEqual(r.toFill.map((f) => f.file), ['05-oferta/OFERTA.md'])
  assert.equal(r.next.skill, 'preencher-oferta')
  const persona = r.incomplete.find((i) => i.file === '01-icp/ICP.md')
  assert.ok(persona.missing.includes('Jobs to be done'))
  assert.ok(persona.pending.includes('Dores'))
  assert.deepEqual(r.undefinedProofs.map((p) => p.id), ['CS-009'])
  assert.ok(r.marks.some((m) => m.kind === 'contradiz' && m.file === '08-conteudo/PROVAS.md'))
  assert.ok(r.marks.some((m) => m.kind === 'pendente' && m.file === '01-icp/ICP.md'))
  assert.ok(!r.layers.some((l) => l.template.includes('01-icp/README.md')))
  const md = renderReport(r)
  assert.match(md, /Próximo passo:\*\* `preencher-oferta`/)
  assert.match(md, /CS-009/)
})

test('a filled file with a checked checklist and explicit pending marks still counts as filled', () => {
  const root = tree({
    '10-cerebro/CEREBRO.md': '# Cérebro da marca — Acme\n',
    '05-oferta/OFERTA.md': [
      '# Oferta, posicionamento e pacotes', '',
      '## Checklist para agentes de IA', '',
      '- [x] Legível por máquina', '- [x] Estruturado', '- [x] Fonte única', '- [x] Versionado', '- [x] Citável', '',
      '## Oferta 1: Plano Básico', '',
      '### Preço', '', 'R$ 100 por mês. Acima de 10 unidades a confirmar [PENDENTE: /05-oferta/GANHOS-E-PERDAS.md]', '',
      '### Para quem é', '', 'Pequenas empresas [PENDENTE: /01-icp/ICP.md] com equipe enxuta.', '',
    ].join('\n'),
  })
  const r = gapReport(root)
  assert.equal(r.toFill.length, 0)
  assert.equal(r.layers.find((l) => l.layer === '05-oferta').filled, 1)
  const offer = r.incomplete.find((i) => i.file === '05-oferta/OFERTA.md')
  assert.ok(offer.pending.includes('Preço'))
})

test('template residue: only verbatim template lines that talk about the example brand', () => {
  const template = '# Voz\n\n## Como usar este arquivo\n\n- Exemplo da Cadência para estúdios.\n\n## Atributos de voz\n\n- **Faça:** "A Cadência tira a cobrança do WhatsApp."\n- **Não faça:** jargão corporativo.\n'
  const filled = '# Voz — Acme\n\n## Como usar este arquivo\n\n- Exemplo da Cadência para estúdios.\n\n## Atributos de voz\n\n- **Faça:** "A Cadência tira a cobrança do WhatsApp."\n- **Não faça:** jargão corporativo.\n- **Faça:** "A Acme fecha o mês em um dia."\n'
  const hits = templateResidue(filled, template)
  assert.deepEqual(hits.map((h) => h.line), [9])
})

test('"### Depoimento T-001" defines T-001', () => {
  const root = tree({
    '10-cerebro/CEREBRO.md': '# Cérebro da marca — Acme\n',
    '08-conteudo/PROVAS.md': '# Provas — Acme\n\n## Depoimentos\n\n### Depoimento T-001\n\n- **Quem:** Ana\n',
    '05-oferta/OFERTA.md': '# Oferta — Acme\n\nA Ana elogiou o atendimento (T-001).\n',
  })
  assert.deepEqual(gapReport(root).undefinedProofs, [])
})

test('lacunas: leftover instructions are reported; source tags, code and template proofs are not', () => {
  const root = tree({
    '10-cerebro/CEREBRO.md': '# Cérebro da marca — Acme\n\n## Status das camadas\n\n| 01 ICP | ⬜ template |\n',
    '01-icp/ICP.md': '# ICP — Acme\n\n## Persona primária: o dono\n\n### Dores\n\nCusto alto `[CASES, Hypnos]` e [descreva a segunda dor].\n\nVeja `/blog/[slug]`.\n',
    '05-oferta/OFERTA.md': '# Oferta — [Nome da empresa]\n\nDepoimento T-009 no template.\n',
  })
  const r = gapReport(root)
  assert.deepEqual(r.marks.filter((m) => m.kind === 'instrução').map((m) => m.line), [7])
  assert.ok(!r.marks.some((m) => m.file === '10-cerebro/CEREBRO.md'))
  assert.deepEqual(r.undefinedProofs, [])
})

test('naming the brand in a template title does not fill it; template example sources are not sources', () => {
  const root = tree({
    '10-cerebro/CEREBRO.md': '# Cérebro da marca — Acme\n\nÚltima atualização: [AAAA-MM-DD]\n',
    '01-icp/ICP.md': '# ICP — Acme\n\n## Persona primária: [Nome da persona]\n\n- **Porte:** [1 a 9 / 10 a 49]\n- **Segmento:** [lista de segmentos]\n- **Cargo:** [cargos exatos]\n- **Dor:** [dor principal]\n- **Gatilho:** [o que dispara a compra]\n- **Objeção:** [objeção mais comum]\n- **Canal:** [onde encontrar]\n',
    '03-visual/IMAGENS.md': '# Imagens\n\nÚltima atualização: [AAAA-MM-DD]\n\n- `[PROPORÇÃO]` 4:5 no feed\n\nUse [PROPORÇÃO] e [PROPORÇÃO] e [PROPORÇÃO].\n',
  })
  const r = gapReport(root)
  assert.ok(r.toFill.some((f) => f.file === '01-icp/ICP.md'))
  assert.ok(r.toFill.some((f) => f.file === '10-cerebro/CEREBRO.md'))
  const graph = extractBrand(root)
  assert.ok(!graph.nodes.some((n) => n.type === 'source'))
})

test('page variables inside code fences do not keep a file in template; blank form fields do', () => {
  const fence = '```'
  const root = tree({
    '10-cerebro/CEREBRO.md': '# Cérebro da marca — Acme\n\n' + fence + 'text\nVocê é o agente da Acme.\n' + fence + '\n',
    '07-site/DADOS-ESTRUTURADOS.md': [
      '# Dados estruturados da Acme', '',
      fence + 'json',
      '{ "@type": "BlogPosting", "headline": "[Título do post]", "datePublished": "[AAAA-MM-DD]",',
      '  "author": "[nome do autor]", "image": "[url da imagem]", "url": "[url do post]",',
      '  "description": "[resumo do post]", "keywords": "[palavras-chave]", "section": "[cluster do post]",',
      '  "dayOfWeek": ["Monday", "Tuesday"] }',
      fence,
    ].join('\n'),
    '11-plano/CONTA-DO-CLIENTE.md': '# Conta do cliente da Acme\n\n' + fence + '\nMeta de receita:   R$__________\n' + fence + '\n',
  })
  const r = gapReport(root)
  assert.ok(!r.toFill.some((f) => f.file === '07-site/DADOS-ESTRUTURADOS.md'))
  assert.ok(r.toFill.some((f) => f.file === '11-plano/CONTA-DO-CLIENTE.md'))
})

test('the "Fontes da marca:" registry in the brain file is where a source tag is defined; "para confirmar" is not pending', () => {
  const root = tree({
    '10-cerebro/CEREBRO.md': '# Cérebro da marca — Acme\n\nFontes da marca:\n\n- `[CRM]` export do CRM, jan–set/2026\n',
    '01-icp/ICP.md': '# ICP da Acme\n\nFontes citadas neste arquivo:\n\n- `[CRM]` export do CRM, janeiro a setembro de 2026\n\nCompra quem tem equipe `[CRM]`.\n',
    '09-dados/DESTAQUES.md': '# Destaques da Acme\n\n`[PROPOSTA]` Corte de 2 vezes a média, para confirmar na revisão.\n',
  })
  const graph = extractBrand(root)
  assert.equal(graph.meta.sources.CRM.file, '10-cerebro/CEREBRO.md')
  const r = gapReport(root)
  assert.ok(!r.marks.some((m) => m.file === '09-dados/DESTAQUES.md' && m.kind === 'pendente'))
})
