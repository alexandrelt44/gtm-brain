import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { PassThrough } from 'node:stream'
import { proposalStore } from '../src/propostas.mjs'
import { createTools, serve, parseArgs } from '../src/mcp.mjs'

function tree(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'gtm-brain-'))
  for (const [p, body] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true })
    fs.writeFileSync(path.join(root, p), body)
  }
  return root
}

const BRAND = {
  '10-cerebro/CEREBRO.md': '# Cérebro da marca — Acme\n',
  '05-oferta/OFERTA.md': '# Oferta — Acme\n\n## Oferta 1: Plano Básico\n\n### Preço\n\nR$ 100 por mês.\n\n### Para quem é\n\nPequenas empresas.\n',
  '08-conteudo/PROVAS.md': '# Provas — Acme\n\n## Cases\n\n### CS-001: Padaria Sol\n\n- **Cliente:** Padaria Sol\n- **Resultado:** atrasos de 20% para 5% `[COMPROVADO]`\n',
}

test('a proposal leaves the file alone until a person accepts it', () => {
  const root = tree(BRAND)
  const s = proposalStore(root)
  const before = fs.readFileSync(path.join(root, '05-oferta/OFERTA.md'), 'utf8')
  const p = s.create({ file: '05-oferta/OFERTA.md', atual: 'R$ 100 por mês.', novo: 'R$ 120 por mês.', motivo: 'tabela nova', por: 'ai:teste' })
  assert.equal(p.status, 'pendente')
  assert.ok(p.aplicavel)
  assert.ok(p.diff.some((r) => r.type === '+' && r.text === 'R$ 120 por mês.'))
  assert.equal(fs.readFileSync(path.join(root, '05-oferta/OFERTA.md'), 'utf8'), before)
  assert.equal(fs.readFileSync(path.join(root, '.gtm-brain/.gitignore'), 'utf8'), '*\n')

  assert.throws(() => s.accept(p.id, { write: false }), /modo leitura/)
  const done = s.accept(p.id, { write: true, by: 'Ana' })
  assert.equal(done.status, 'aceita')
  assert.match(fs.readFileSync(path.join(root, '05-oferta/OFERTA.md'), 'utf8'), /R\$ 120 por mês\./)
  assert.throws(() => s.accept(p.id, { write: true }), /já aceita/)
})

test('a proposal needs an excerpt that appears exactly once, and stops applying if the file changes', () => {
  const root = tree(BRAND)
  const s = proposalStore(root)
  assert.throws(() => s.create({ file: '05-oferta/OFERTA.md', atual: 'R$ 99', novo: 'x', motivo: 'm' }), /não foi encontrado/)
  assert.throws(() => s.create({ file: '05-oferta/OFERTA.md', atual: '###', novo: 'x', motivo: 'm' }), /aparece 2 vezes/)
  assert.throws(() => s.create({ file: '../fora.md', atual: 'a', novo: 'b', motivo: 'm' }), /fora da pasta/)
  assert.throws(() => s.create({ file: '05-oferta/OFERTA.md', atual: 'R$ 100 por mês.', novo: 'R$ 120 por mês.', motivo: ' ' }), /motivo/)

  const p = s.create({ file: '05-oferta/OFERTA.md', atual: 'Pequenas empresas.', novo: 'Pequenas empresas com até 10 pessoas.', motivo: 'entrevistas' })
  fs.writeFileSync(path.join(root, '05-oferta/OFERTA.md'), BRAND['05-oferta/OFERTA.md'].replace('Pequenas empresas.', 'Médias empresas.'))
  const now = s.get(p.id)
  assert.equal(now.aplicavel, false)
  assert.match(now.problema, /não está mais lá/)
  assert.throws(() => s.accept(p.id, { write: true }), /Nada foi gravado/)

  const r = s.reject(p.id, { by: 'Ana', nota: 'já mudou' })
  assert.equal(r.status, 'recusada')
  assert.deepEqual(s.list({ status: 'pendente' }), [])
})

test('MCP tools read records and files, and brain_propor only queues', async () => {
  const root = tree(BRAND)
  const t = createTools({ marca: root })
  const text = async (name, args) => {
    const r = await t.call(name, args)
    return { text: r.content[0].text, error: !!r.isError }
  }
  assert.match((await text('brain_visao_geral')).text, /# Acme/)
  assert.match((await text('brain_buscar', { consulta: 'padaria' })).text, /proof:CS-001/)
  const rec = await text('brain_registro', { id: 'proof:CS-001' })
  assert.match(rec.text, /08-conteudo\/PROVAS\.md:\d+/)
  assert.match(rec.text, /atrasos de 20% para 5%/)
  assert.ok((await text('brain_registro', { id: 'proof:CS-999' })).error)
  assert.match((await text('brain_arquivo', { arquivo: '05-oferta/OFERTA.md', de: 7, ate: 7 })).text, /R\$ 100 por mês\./)
  assert.ok((await text('brain_arquivo', { arquivo: '../../etc/passwd' })).error)
  assert.match((await text('brain_arquivo', {})).text, /05-oferta\/OFERTA\.md/)

  const prop = await text('brain_propor', { arquivo: '05-oferta/OFERTA.md', trecho_atual: 'R$ 100 por mês.', trecho_novo: 'R$ 120 por mês.', motivo: 'tabela nova' })
  assert.match(prop.text, /O arquivo NÃO mudou/)
  assert.match(fs.readFileSync(path.join(root, '05-oferta/OFERTA.md'), 'utf8'), /R\$ 100 por mês\./)
  assert.match((await text('brain_propostas', { status: 'pendente' })).text, /\+R\$ 120 por mês\./)
  assert.ok((await text('brain_propor', { arquivo: '05-oferta/OFERTA.md', trecho_atual: 'não existe', trecho_novo: 'x', motivo: 'm' })).error)
})

test('MCP stdio: initialize, tools/list and tools/call as JSON-RPC lines', async () => {
  const root = tree(BRAND)
  const input = new PassThrough()
  const output = new PassThrough()
  const lines = []
  output.on('data', (d) => lines.push(...String(d).trim().split('\n').map((l) => JSON.parse(l))))
  serve({ marca: root, issues: [], input, output })
  const send = (m) => input.write(JSON.stringify({ jsonrpc: '2.0', ...m }) + '\n')
  send({ id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 't', version: '0' } } })
  send({ method: 'notifications/initialized' })
  send({ id: 2, method: 'tools/list' })
  send({ id: 3, method: 'tools/call', params: { name: 'brain_buscar', arguments: { consulta: 'padaria' } } })
  send({ id: 4, method: 'resources/list' })
  for (let i = 0; i < 50 && lines.length < 4; i++) await new Promise((r) => setTimeout(r, 20))
  const by = new Map(lines.map((l) => [l.id, l]))
  assert.equal(lines.length, 4)
  assert.equal(by.get(1).result.protocolVersion, '2025-06-18')
  assert.equal(by.get(1).result.serverInfo.name, 'gtm-brain')
  assert.ok(by.get(2).result.tools.some((x) => x.name === 'brain_propor'))
  assert.match(by.get(3).result.content[0].text, /proof:CS-001/)
  assert.equal(by.get(4).error.code, -32601)
  input.end()
})

test('MCP brand folder: --marca, else the current folder when it is a brand, else its ./marca', () => {
  const root = tree(BRAND)
  const parent = tree({ 'marca/10-cerebro/CEREBRO.md': '# Cérebro da marca — Acme\n' })
  const saved = process.env.GTM_BRAIN_MARCA
  delete process.env.GTM_BRAIN_MARCA
  try {
    assert.equal(parseArgs([], root).marca, root)
    assert.equal(parseArgs([], parent).marca, path.join(parent, 'marca'))
    assert.equal(parseArgs(['--marca', 'x'], root).marca, path.join(root, 'x'))
  } finally {
    if (saved !== undefined) process.env.GTM_BRAIN_MARCA = saved
  }
})
