// Proposal queue: an agent proposes a change to one brand file, a person accepts or rejects it.
// The file only changes on accept. Proposals live in <marca>/.gtm-brain/propostas/<id>.json,
// outside git (the folder gets its own .gitignore), so the MCP server and the GTM Brain
// server see the same queue wherever each one runs from.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { lineDiff } from './md-merge.mjs'

const EDITABLE = /\.(md|json|css)$/

function fail(status, message) {
  const e = new Error(message)
  e.status = status
  return e
}

const count = (text, part) => {
  let n = 0
  for (let i = text.indexOf(part); i >= 0; i = text.indexOf(part, i + 1)) n++
  return n
}

export function proposalStore(marca) {
  const root = path.join(marca, '.gtm-brain')
  const dir = path.join(root, 'propostas')
  const ensure = () => {
    fs.mkdirSync(dir, { recursive: true })
    const ignore = path.join(root, '.gitignore')
    if (!fs.existsSync(ignore)) fs.writeFileSync(ignore, '*\n')
  }

  const resolveFile = (rel) => {
    if (typeof rel !== 'string' || !EDITABLE.test(rel)) throw fail(400, 'arquivo inválido: use o caminho relativo de um .md, .json ou .css da marca, como 05-oferta/OFERTA.md')
    const abs = path.resolve(marca, rel)
    if (!abs.startsWith(marca + path.sep) || abs.startsWith(root + path.sep)) throw fail(400, 'arquivo fora da pasta da marca')
    if (!fs.existsSync(abs)) throw fail(404, `arquivo não existe: ${rel}`)
    return abs
  }

  const read = (id) => {
    if (!/^p-[0-9a-z-]+$/.test(String(id))) throw fail(400, 'id de proposta inválido')
    const f = path.join(dir, `${id}.json`)
    if (!fs.existsSync(f)) throw fail(404, `proposta não existe: ${id}`)
    return JSON.parse(fs.readFileSync(f, 'utf8'))
  }
  const persist = (p) => {
    ensure()
    const f = path.join(dir, `${p.id}.json`)
    fs.writeFileSync(`${f}.tmp`, JSON.stringify(p, null, 1))
    fs.renameSync(`${f}.tmp`, f)
  }

  /** The proposal as it would apply now: diff against the current file, or why it no longer applies. */
  const withDiff = (p) => {
    if (p.status !== 'pendente') return p
    let text
    try {
      text = fs.readFileSync(resolveFile(p.file), 'utf8')
    } catch (e) {
      return { ...p, aplicavel: false, problema: e.message }
    }
    const n = count(text, p.atual)
    if (n !== 1) return { ...p, aplicavel: false, problema: n ? `o trecho atual aparece ${n} vezes no arquivo` : 'o arquivo mudou: o trecho atual não está mais lá' }
    const after = text.replace(p.atual, () => p.novo)
    const diff = lineDiff(text, after, 2)
    return { ...p, aplicavel: true, linhas: diff.filter((r) => r.type === '+' || r.type === '-').length, diff }
  }

  function create({ file, atual, novo, motivo, fontes = [], por = 'ai:desconhecido' }) {
    if (typeof atual !== 'string' || !atual.trim()) throw fail(400, 'trecho_atual é obrigatório: copie do arquivo, exatamente, o texto que muda')
    if (typeof novo !== 'string') throw fail(400, 'trecho_novo é obrigatório (texto vazio apaga o trecho)')
    if (atual === novo) throw fail(400, 'trecho_novo é igual ao trecho_atual')
    if (typeof motivo !== 'string' || !motivo.trim()) throw fail(400, 'motivo é obrigatório: diga por que a mudança e de onde ela vem')
    const text = fs.readFileSync(resolveFile(file), 'utf8')
    const n = count(text, atual)
    if (n === 0) throw fail(409, `trecho_atual não foi encontrado em ${file}. Copie o texto exato do arquivo (leia com brain_arquivo), com as mesmas quebras de linha.`)
    if (n > 1) throw fail(409, `trecho_atual aparece ${n} vezes em ${file}. Inclua mais contexto para ele aparecer uma vez só.`)
    const now = new Date()
    const id = `p-${now.toISOString().slice(0, 19).replace(/[-:T]/g, '').replace(/^(\d{8})/, '$1-')}-${crypto.randomBytes(2).toString('hex')}`
    const p = {
      id,
      file,
      atual,
      novo,
      motivo: motivo.trim(),
      fontes: (Array.isArray(fontes) ? fontes : [fontes]).map(String).filter(Boolean),
      por: String(por),
      criadaEm: now.toISOString(),
      status: 'pendente',
    }
    persist(p)
    return withDiff(p)
  }

  function list({ status } = {}) {
    if (!fs.existsSync(dir)) return []
    return fs.readdirSync(dir)
      .filter((f) => /^p-.*\.json$/.test(f))
      .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')))
      .filter((p) => !status || p.status === status)
      .sort((a, b) => a.criadaEm.localeCompare(b.criadaEm))
      .map(withDiff)
  }

  const get = (id) => withDiff(read(id))

  function accept(id, { write = false, commit = false, by = 'humano' } = {}) {
    if (!write) throw fail(403, 'Servidor em modo leitura. Reinicie com --write para aceitar propostas.')
    const p = read(id)
    if (p.status !== 'pendente') throw fail(409, `proposta já ${p.status}`)
    const abs = resolveFile(p.file)
    const text = fs.readFileSync(abs, 'utf8')
    const n = count(text, p.atual)
    if (n !== 1) throw fail(409, n ? `O trecho atual aparece ${n} vezes no arquivo. Nada foi gravado.` : 'O arquivo mudou desde a proposta e o trecho atual não está mais lá. Nada foi gravado.')
    const after = text.replace(p.atual, () => p.novo)
    fs.writeFileSync(`${abs}.gtm-brain-tmp`, after)
    fs.renameSync(`${abs}.gtm-brain-tmp`, abs)
    let committed = null
    if (commit) {
      const msg = `gtm-brain: ${p.file} (proposta ${p.id} de ${p.por}, aceita por ${by})\n\n${p.motivo}`
      // Commit only this path, so other staged work in the repo is left alone.
      execFileSync('git', ['-C', marca, 'add', '--', p.file])
      execFileSync('git', ['-C', marca, 'commit', '-q', '-m', msg, '--', p.file])
      committed = execFileSync('git', ['-C', marca, 'rev-parse', '--short', 'HEAD']).toString().trim()
    }
    Object.assign(p, { status: 'aceita', decididaEm: new Date().toISOString(), decididaPor: by, commit: committed })
    persist(p)
    return p
  }

  function reject(id, { by = 'humano', nota = '' } = {}) {
    const p = read(id)
    if (p.status !== 'pendente') throw fail(409, `proposta já ${p.status}`)
    Object.assign(p, { status: 'recusada', decididaEm: new Date().toISOString(), decididaPor: by, ...(nota ? { nota } : {}) })
    persist(p)
    return p
  }

  return { create, list, get, accept, reject, dir }
}
