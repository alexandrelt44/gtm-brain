import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { canonLine, mergeBack, lineDiff } from '../src/md-merge.mjs'
import { createEditor, parseArgs } from '../src/server.mjs'

// What Proof (Milkdown/remark) does to brand markdown on export, without any edit.
function remarkLike(md) {
  return md
    .split('\n')
    .filter((l) => !/^<!--.*-->$/.test(l))
    .map((l) => l
      .replace(/^(\s*)- /, '$1* ')
      .replace(/^---$/, '***')
      .replace(/\[(COMPROVADO|HIPÓTESE)\]/g, '\\[$1]')
      .replace(/~(\d)/g, '\\~$1')
      .replace(/(https:\/\/\S+)/g, '<$1>')
      .replace(/(^|\s)_([^_]+)_/g, '$1*$2*')
      .replace(/^\| (\w+) \| (\w+) \|$/, '| $1   | $2   |')
      .replace(/^\| --- \| --- \|$/, '| :---- | :---- |'))
    .join('\n')
    .replace(/(> .+)\n(\* )/, '$1\n\n$2')
    .replace(/\n+$/, '')
}

const ORIGINAL = `# ICP — Acme

<!-- markdownlint-disable MD025 -->
- **Antes:** planilha [COMPROVADO]
- Prazo ~5 semanas, ver https://acme.com
> nota
- item depois da citação

---

_Nenhum registrado._

| ID | Valor |
| --- | --- |
| CS | 28 |
`

test('canonLine ignores how remark spells the same markdown', () => {
  assert.equal(canonLine('* **Antes:** x \\[COMPROVADO]'), canonLine('- **Antes:** x [COMPROVADO]'))
  assert.equal(canonLine('***'), canonLine('---'))
  assert.equal(canonLine('| a   | b |'), canonLine('| a | b |'))
  assert.equal(canonLine('| :--- | ---: |'), canonLine('| --- | --- |'))
  assert.equal(canonLine('ver <https://x.io>'), canonLine('ver https://x.io'))
  assert.equal(canonLine('*nada*'), canonLine('_nada_'))
})

test('mergeBack returns the original byte for byte when nothing was edited', () => {
  const r = mergeBack(ORIGINAL, remarkLike(ORIGINAL))
  assert.equal(r.text, ORIGINAL)
  assert.equal(r.changed, 0)
})

test('an edited table row comes back with single-space cells', () => {
  const edited = remarkLike(ORIGINAL).replace('| CS   | 28   |', '| CS        | 30   |')
  const r = mergeBack(ORIGINAL, edited.includes('| CS        | 30   |') ? edited : edited.replace(/\| CS\s+\| 28\s+\|/, '| CS        | 30   |'))
  assert.match(r.text, /^\| CS \| 30 \|$/m)
})

test('mergeBack takes only edited lines, in the source style, and keeps hidden comments', () => {
  const edited = remarkLike(ORIGINAL).replace('planilha', 'planilha velha') + '\n\nNova linha da IA \\[HIPÓTESE].'
  const r = mergeBack(ORIGINAL, edited)
  assert.equal(r.changed, 2)
  assert.match(r.text, /^- \*\*Antes:\*\* planilha velha \[COMPROVADO\]$/m, 'bullet and seal keep the source spelling')
  assert.match(r.text, /^Nova linha da IA \[HIPÓTESE\]\.$/m)
  assert.match(r.text, /<!-- markdownlint-disable MD025 -->/, 'comment the editor never showed survives')
  assert.match(r.text, /^\| --- \| --- \|$/m, 'untouched table keeps its formatting')
  const rows = lineDiff(ORIGINAL, r.text, 0).filter((x) => x.type !== ' ' && x.type !== '…')
  assert.equal(rows.filter((x) => x.type === '-').length, 1, 'only the edited line leaves')
})

// A fake Proof server: documents are markdown strings, exported through remarkLike.
function fakeProof() {
  const docs = new Map()
  let n = 0
  const fetchImpl = async (url, opts = {}) => {
    const u = new URL(url)
    const json = (body, status = 200) => ({ ok: status < 400, status, json: async () => body })
    if (u.pathname === '/documents' && opts.method === 'POST') {
      const slug = 'doc' + ++n
      docs.set(slug, JSON.parse(opts.body).markdown)
      return json({ success: true, slug, ownerSecret: 'own', accessToken: 'acc' })
    }
    const m = /^\/documents\/([^/]+)\/state$/.exec(u.pathname)
    if (m) return docs.has(m[1]) ? json({ success: true, markdown: remarkLike(docs.get(m[1])) }) : json({ success: false, error: 'not found' }, 404)
    return json({ success: false, error: 'unexpected ' + u.pathname }, 500)
  }
  return { docs, fetchImpl }
}

function setup(opts = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'gtm-proof-'))
  const marca = path.join(root, 'marca')
  fs.mkdirSync(path.join(marca, '01-icp'), { recursive: true })
  fs.writeFileSync(path.join(marca, '01-icp/ICP.md'), ORIGINAL)
  fs.writeFileSync(path.join(marca, '01-icp/BROKEN.md'), '# T\n\n## [Unreleased]\n')
  const proof = fakeProof()
  const editor = createEditor({ marca, proof: 'http://proof.test', state: path.join(root, 'state'), fetchImpl: proof.fetchImpl, ...opts })
  return { marca, proof, editor }
}

test('editor: open, reuse, status, diff and save write only the edited line', async () => {
  const { marca, proof, editor } = setup({ write: true })
  const o = await editor.open('01-icp/ICP.md', 'ICP')
  assert.equal(o.editorUrl, `http://proof.test/d/${o.slug}?token=acc`)
  assert.equal(o.agent.ops, `http://proof.test/documents/${o.slug}/ops`)
  assert.equal((await editor.open('01-icp/ICP.md')).reused, true)
  assert.equal((await editor.status('01-icp/ICP.md')).dirty, false)

  proof.docs.set(o.slug, proof.docs.get(o.slug).replace('planilha', 'planilha velha'))
  const st = await editor.status('01-icp/ICP.md')
  assert.equal(st.dirty, true)
  assert.equal(st.changed, 1)
  const d = await editor.diff('01-icp/ICP.md')
  assert.ok(d.rows.some((r) => r.type === '+' && r.text.includes('planilha velha')))

  const saved = await editor.save('01-icp/ICP.md')
  assert.equal(saved.changed, 1)
  const disk = fs.readFileSync(path.join(marca, '01-icp/ICP.md'), 'utf8')
  assert.equal(disk, ORIGINAL.replace('planilha', 'planilha velha'))
  assert.equal((await editor.status('01-icp/ICP.md')).dirty, false)
})

test('editor: refuses to save over outside changes, in read-only mode and for lossy files', async () => {
  const { marca, proof, editor } = setup({ write: true })
  const o = await editor.open('01-icp/ICP.md')
  proof.docs.set(o.slug, proof.docs.get(o.slug).replace('planilha', 'x'))
  fs.appendFileSync(path.join(marca, '01-icp/ICP.md'), '\nmudança de outra sessão\n')
  await assert.rejects(editor.save('01-icp/ICP.md'), (e) => e.status === 409)
  await assert.rejects(editor.open('01-icp/ICP.md'), (e) => e.status === 409, 'edits pending + file changed → no silent reset')

  const ro = setup()
  await ro.editor.open('01-icp/ICP.md')
  await assert.rejects(ro.editor.save('01-icp/ICP.md'), (e) => e.status === 403)
  await assert.rejects(ro.editor.open('../../etc/passwd.md'), (e) => e.status === 400)

  // a file the editor cannot round-trip is refused before anyone edits it
  const lossy = setup()
  const real = lossy.proof.fetchImpl
  const breaking = async (url, opts) => {
    const res = await real(url, opts)
    if (/\/state$/.test(url)) return { ...res, json: async () => ({ success: true, markdown: '# T' }) }
    return res
  }
  const e2 = createEditor({ marca: lossy.marca, proof: 'http://proof.test', state: fs.mkdtempSync(path.join(os.tmpdir(), 'st-')), fetchImpl: breaking })
  await assert.rejects(e2.open('01-icp/BROKEN.md'), (e) => e.status === 422)
})

test('server args: --commit implies --write', () => {
  const a = parseArgs(['--marca', '/tmp/x', '--commit', '--port', '4567'])
  assert.equal(a.write, true)
  assert.equal(a.port, 4567)
})
