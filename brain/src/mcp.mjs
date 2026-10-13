#!/usr/bin/env node
// GTM Brain MCP server (stdio): any LLM client (Claude Code, Claude Desktop, Cursor, Codex…)
// reads the brand brain and proposes changes. A proposal never touches the file: a person
// accepts or rejects it in the GTM Brain (Propostas), the same rule as the editor.
//
//   node src/mcp.mjs                  # brand folder: --marca, $GTM_BRAIN_MARCA, the current folder, ./marca
//   node src/mcp.mjs --marca ../exemplo
//
// Options:
//   --marca <dir>   brand folder
//   --issues <A,B>  issue key prefixes to track, e.g. COL (default: $GTM_BRAIN_ISSUES)
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import readline from 'node:readline'
import { fileURLToPath } from 'node:url'
import { brainCache } from './server.mjs'
import { defaultBrandDir } from './build.mjs'
import { gapReport, renderReport } from './lacunas.mjs'
import { proposalStore } from './propostas.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const VERSION = JSON.parse(fs.readFileSync(path.join(here, '..', 'package.json'), 'utf8')).version
const PROTOCOLS = ['2025-06-18', '2025-03-26', '2024-11-05']
const MAX_FILE_CHARS = 60000

const isBrand = (dir) => fs.existsSync(path.join(dir, '10-cerebro')) || fs.existsSync(path.join(dir, '10-brand-brain'))

export function parseArgs(argv, cwd = process.cwd()) {
  const a = { marca: null, issues: (process.env.GTM_BRAIN_ISSUES || '').split(',').map((x) => x.trim()).filter(Boolean) }
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i]
    if (k === '--marca') a.marca = argv[++i]
    else if (k === '--issues') a.issues = argv[++i].split(',').map((x) => x.trim()).filter(Boolean)
    else if (k === '--help' || k === '-h') a.help = true
    else throw new Error(`unknown option ${k}`)
  }
  // As a plugin the server starts in the person's folder: use it when it is a brand, or its ./marca.
  a.marca = a.marca || process.env.GTM_BRAIN_MARCA || (isBrand(cwd) ? cwd : isBrand(path.join(cwd, 'marca')) ? path.join(cwd, 'marca') : defaultBrandDir())
  a.marca = path.resolve(cwd, a.marca.replace(/^~/, os.homedir()))
  return a
}

const fold = (s) => String(s ?? '').normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

const TOOLS = [
  {
    name: 'brain_visao_geral',
    title: 'Visão geral da marca',
    description: 'Comece por aqui. Mostra a marca, as categorias do brain com quantos registros cada uma tem, o estado das 11 camadas (preenchidas ou template), as propostas pendentes e o próximo passo.',
    inputSchema: { type: 'object', properties: {} },
    annotations: { readOnlyHint: true },
  },
  {
    name: 'brain_buscar',
    title: 'Buscar no brain',
    description: 'Busca registros (personas, ofertas, provas, concorrentes, palavras-chave, voz do cliente, documentos…) por palavras. Devolve o id de cada um, para abrir com brain_registro.',
    inputSchema: {
      type: 'object',
      properties: {
        consulta: { type: 'string', description: 'Palavras a buscar, como "inadimplência", "CS-001" ou "concorrente"' },
        categoria: { type: 'string', description: 'Opcional: id da categoria (personas, offers, proofs, competition, deals, voc, voice, keywords, clusters…)' },
        limite: { type: 'number', description: 'Máximo de resultados (padrão 20)' },
      },
      required: ['consulta'],
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: 'brain_registro',
    title: 'Abrir registro',
    description: 'Abre um registro pelo id (como proof:CS-001 ou doc:posicionamento): o markdown de origem com arquivo e linhas, o que está preenchido ou pendente, as ligações (provas, fontes) e quem cita este registro. Para listar os registros de uma categoria, passe cat:<id>.',
    inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
    annotations: { readOnlyHint: true },
  },
  {
    name: 'brain_arquivo',
    title: 'Ler arquivo da marca',
    description: 'Lê um arquivo da marca exatamente como está no disco (use antes de propor uma mudança, para copiar o trecho atual). Sem arquivo, lista os arquivos por camada com o estado de cada um.',
    inputSchema: {
      type: 'object',
      properties: {
        arquivo: { type: 'string', description: 'Caminho relativo à pasta da marca, como 05-oferta/OFERTA.md' },
        de: { type: 'number', description: 'Opcional: primeira linha' },
        ate: { type: 'number', description: 'Opcional: última linha' },
      },
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: 'brain_lacunas',
    title: 'O que falta',
    description: 'Relatório do que falta na marca: arquivos ainda em template, registros incompletos, provas citadas e não definidas, marcas de pendente e contradição, e qual skill preenche cada coisa.',
    inputSchema: { type: 'object', properties: {} },
    annotations: { readOnlyHint: true },
  },
  {
    name: 'brain_propor',
    title: 'Propor mudança',
    description: 'Propõe trocar um trecho de um arquivo da marca. Não grava nada: a proposta entra na fila do GTM Brain e uma pessoa aceita ou recusa. O trecho_atual precisa aparecer exatamente uma vez no arquivo (leia com brain_arquivo e copie). Para inserir, inclua uma linha vizinha no trecho_atual e repita-a no trecho_novo. Preserve selos ([COMPROVADO], [HIPÓTESE], [PROPOSTA]…), tags de fonte e IDs de prova; não invente número nem prova.',
    inputSchema: {
      type: 'object',
      properties: {
        arquivo: { type: 'string', description: 'Caminho relativo, como 05-oferta/OFERTA.md' },
        trecho_atual: { type: 'string', description: 'Texto exato do arquivo que muda, com as quebras de linha' },
        trecho_novo: { type: 'string', description: 'Texto que entra no lugar (vazio apaga o trecho)' },
        motivo: { type: 'string', description: 'Por que mudar e de onde vem a informação' },
        fontes: { type: 'array', items: { type: 'string' }, description: 'Opcional: fontes que sustentam a mudança (tag de fonte, link, ID de prova)' },
        por: { type: 'string', description: 'Opcional: quem propõe, como ai:claude' },
      },
      required: ['arquivo', 'trecho_atual', 'trecho_novo', 'motivo'],
    },
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false },
  },
  {
    name: 'brain_propostas',
    title: 'Propostas',
    description: 'Lista as propostas de mudança e o estado de cada uma (pendente, aceita, recusada), com o diff das pendentes.',
    inputSchema: {
      type: 'object',
      properties: { status: { type: 'string', enum: ['pendente', 'aceita', 'recusada'], description: 'Opcional: filtra por estado' } },
    },
    annotations: { readOnlyHint: true },
  },
]

const INSTRUCTIONS = `GTM Brain: o cérebro de go-to-market de uma marca, em arquivos markdown (11 camadas: ICP, voz, visual, design, oferta, SEO, site, conteúdo e provas, dados, cérebro, plano).
Comece com brain_visao_geral. Para responder sobre a marca, busque (brain_buscar) e abra os registros (brain_registro); cite o arquivo e a linha de onde veio cada afirmação.
O prompt-mestre da marca está em 10-cerebro/CEREBRO.md (leia com brain_arquivo para escrever como a marca).
Respeite os selos: [COMPROVADO] é fato com fonte; [HIPÓTESE] e [PROPOSTA] não são fatos. Não invente número, cliente nem prova.
Para mudar algo, use brain_propor: nada é gravado até uma pessoa aceitar no GTM Brain. Nunca diga que um arquivo mudou só porque a proposta foi criada.`

export function createTools({ marca, issues = [] }) {
  const get = brainCache(marca, { issues })
  const store = proposalStore(marca)
  const brain = () => get().brain
  const byId = () => new Map(brain().items.map((i) => [i.id, i]))
  const catLabel = (id) => (brain().categories.find((c) => c.id === id) || {}).label || id
  const loc = (i) => (i.origin ? `${i.origin.file}:${i.origin.line}${i.origin.end && i.origin.end !== i.origin.line ? '-' + i.origin.end : ''}` : '')
  const row = (i) => `- \`${i.id}\` · ${catLabel(i.cat)} · **${i.title}**${i.code && !i.title.includes(i.code) ? ` (${i.code})` : ''}${i.origin ? ` · ${loc(i)}` : ''}${i.status === 'template' ? ' · template' : ''}`

  const handlers = {
    brain_visao_geral() {
      const b = brain()
      const r = gapReport(marca, { issues })
      const pend = store.list({ status: 'pendente' })
      const out = [`# ${b.meta.brand || 'Marca sem nome'}`, '', `Pasta: ${marca}`, '']
      if (path.resolve(marca) === path.resolve(defaultBrandDir())) out.push('Atenção: esta é a pasta modelo que vem com o GTM Brain, não a sua marca. Abra o agente na pasta da sua marca (ou na pasta que tem `marca/`), ou defina GTM_BRAIN_MARCA.', '')
      out.push('## Categorias', '')
      for (const c of b.categories) {
        const n = c.groups.reduce((a, g) => a + g.items.length, 0)
        out.push(`- ${c.parent ? '  ' : ''}\`cat:${c.id}\` ${c.label}: ${n} ${n === 1 ? 'registro' : 'registros'}`)
      }
      out.push('', '## Camadas', '')
      for (const l of r.layers) out.push(`- ${l.layer}: ${l.filled} de ${l.files} arquivos preenchidos${l.template.length ? ` (template: ${l.template.map((f) => f.split('/').pop()).join(', ')})` : ''}`)
      const flags = b.items.reduce((a, i) => ({ pending: a.pending + i.flags.pending, hypothesis: a.hypothesis + i.flags.hypothesis, tension: a.tension + i.flags.tension }), { pending: 0, hypothesis: 0, tension: 0 })
      out.push('', `Pendências: ${flags.pending} · hipóteses e propostas: ${flags.hypothesis} · tensões: ${flags.tension}`)
      out.push(`Propostas de mudança pendentes: ${pend.length}`)
      if (r.next) out.push(`Próximo passo: preencher \`${r.next.file}\` com a skill ${r.next.skill} (detalhes em brain_lacunas)`)
      return out.join('\n')
    },

    brain_buscar({ consulta, categoria, limite = 20 }) {
      const terms = fold(consulta).split(/\s+/).filter(Boolean)
      if (!terms.length) throw new Error('consulta vazia')
      const hits = []
      for (const i of brain().items) {
        if (categoria && i.cat !== categoria && i.cat !== categoria.replace(/^cat:/, '')) continue
        const title = fold(`${i.title} ${i.code || ''}`)
        const all = `${title} ${fold(i.text)}`
        if (!terms.every((t) => all.includes(t))) continue
        hits.push({ i, score: terms.filter((t) => title.includes(t)).length * 10 + (i.kind === 'doc' ? 0 : 1) })
      }
      hits.sort((a, b) => b.score - a.score)
      const top = hits.slice(0, Math.max(1, Math.min(Number(limite) || 20, 100)))
      if (!top.length) return `Nada encontrado para "${consulta}". Tente outras palavras ou veja as categorias em brain_visao_geral.`
      return [`${hits.length} resultado(s) para "${consulta}"${hits.length > top.length ? `, mostrando ${top.length}` : ''}:`, '', ...top.map(({ i }) => {
        const t = String(i.text || '')
        const k = fold(t).indexOf(terms[0])
        const snip = k >= 0 ? t.slice(Math.max(0, k - 60), k + 140).replace(/\s+/g, ' ').trim() : t.slice(0, 160)
        return `${row(i)}\n  ${snip ? '…' + snip + '…' : ''}`
      })].join('\n')
    },

    brain_registro({ id }) {
      const b = brain()
      const items = byId()
      if (String(id).startsWith('cat:')) {
        const c = b.categories.find((x) => x.id === id.slice(4))
        if (!c) throw new Error(`categoria não existe: ${id}. Veja as categorias em brain_visao_geral.`)
        const subs = b.categories.filter((x) => x.parent === c.id)
        const out = [`# ${c.label}`, '', c.desc || '', '']
        if (subs.length) out.push('Subcategorias: ' + subs.map((s) => `\`cat:${s.id}\` ${s.label}`).join(', '), '')
        for (const g of c.groups) {
          if (g.label) out.push(`## ${g.label}`, '')
          out.push(...g.items.map((x) => row(items.get(x))), '')
        }
        return out.join('\n')
      }
      const i = items.get(id)
      if (!i) throw new Error(`registro não existe: ${id}. Use brain_buscar para achar o id.`)
      const out = [`# ${i.title}`, '', `- id: \`${i.id}\` · categoria: ${catLabel(i.cat)}${i.code ? ` · código: ${i.code}` : ''}`]
      if (i.origin) out.push(`- origem: ${loc(i)}`)
      if (i.total) out.push(`- campos: ${i.filled} de ${i.total} preenchidos${(i.missing || []).length ? ` · faltam: ${i.missing.join(', ')}` : ''}`)
      const pend = (i.fields || []).filter((f) => f.status !== 'ok').map((f) => f.label)
      if (pend.length) out.push(`- pendentes: ${pend.join(', ')}`)
      const f = i.flags
      if (f.proven || f.hypothesis || f.tension) out.push(`- selos: ${f.proven} comprovado(s), ${f.hypothesis} hipótese(s)/proposta(s), ${f.tension} tensão(ões)`)
      if (i.status === 'template') out.push('- este arquivo ainda é template: o conteúdo é exemplo, não fato da marca')
      const REF = { proves: 'prova', derives: 'fonte', cites: 'cita', mentions: 'menciona', pending: 'depende de (pendente)' }
      if ((i.refs || []).length) {
        out.push('', '## Ligações', '')
        for (const r of i.refs) {
          const t = items.get(r.to)
          out.push(`- ${REF[r.type] || r.type}: \`${r.to}\`${t ? ` ${t.title}` : ''}`)
        }
      }
      const back = b.items.filter((x) => x.id !== i.id && (x.refs || []).some((r) => r.to === i.id))
      if (back.length) out.push('', '## Citado por', '', ...back.slice(0, 30).map(row))
      if (i.origin) {
        const abs = path.join(marca, i.origin.file)
        if (fs.existsSync(abs)) {
          const lines = fs.readFileSync(abs, 'utf8').split('\n')
          const end = Math.min(i.origin.end || lines.length, i.origin.line + 400)
          out.push('', `## Markdown de origem (${i.origin.file}, linhas ${i.origin.line}–${end})`, '', '````markdown', ...lines.slice(i.origin.line - 1, end), '````')
        }
      }
      return out.join('\n')
    },

    brain_arquivo({ arquivo, de, ate }) {
      if (!arquivo) {
        const r = gapReport(marca, { issues })
        const template = new Set(r.toFill.map((f) => f.file))
        const files = []
        const walk = (dir) => {
          for (const e of fs.readdirSync(path.join(marca, dir), { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
            if (e.name.startsWith('.') || e.name === 'node_modules') continue
            const rel = dir ? `${dir}/${e.name}` : e.name
            if (e.isDirectory()) walk(rel)
            else if (/\.(md|json|css|csv)$/.test(e.name)) files.push(rel)
          }
        }
        walk('')
        return [`${files.length} arquivos em ${marca}:`, '', ...files.map((f) => `- ${f}${template.has(f) ? ' · template' : ''}`)].join('\n')
      }
      const abs = path.resolve(marca, arquivo)
      if (!abs.startsWith(marca + path.sep) || abs.includes(`${path.sep}.gtm-brain${path.sep}`)) throw new Error('arquivo fora da pasta da marca')
      if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) throw new Error(`arquivo não existe: ${arquivo}. Chame brain_arquivo sem argumentos para listar.`)
      const text = fs.readFileSync(abs, 'utf8')
      const lines = text.split('\n')
      const a = Math.max(1, Number(de) || 1)
      const z = Math.min(lines.length, Number(ate) || lines.length)
      const part = lines.slice(a - 1, z).join('\n')
      if (!de && !ate && part.length > MAX_FILE_CHARS) {
        const heads = lines.map((l, k) => (/^#{1,3}\s/.test(l) ? `- linha ${k + 1}: ${l}` : null)).filter(Boolean)
        return [`${arquivo} tem ${lines.length} linhas (${text.length} caracteres), grande demais para ler de uma vez. Leia por partes com de/ate. Seções:`, '', ...heads].join('\n')
      }
      return `${arquivo}, linhas ${a}–${z} de ${lines.length}:\n\n${part}`
    },

    brain_lacunas() {
      return renderReport(gapReport(marca, { issues }))
    },

    brain_propor({ arquivo, trecho_atual, trecho_novo, motivo, fontes, por }) {
      const p = store.create({ file: arquivo, atual: trecho_atual, novo: trecho_novo, motivo, fontes, por: por || 'ai:mcp' })
      return [
        `Proposta ${p.id} criada para ${p.file} (${p.linhas} linha(s) mudam). O arquivo NÃO mudou.`,
        'Uma pessoa precisa aceitar ou recusar na aba Propostas do GTM Brain (npm run dev, com --write para gravar).',
        '',
        '```diff',
        ...p.diff.map((r) => (r.type === '…' ? '@@' : `${r.type}${r.text}`)),
        '```',
      ].join('\n')
    },

    brain_propostas({ status } = {}) {
      const all = store.list({ status })
      if (!all.length) return status ? `Nenhuma proposta ${status}.` : 'Nenhuma proposta ainda.'
      return all.map((p) => {
        const head = `## ${p.id} · ${p.status}${p.status === 'pendente' && !p.aplicavel ? ' · não aplica mais' : ''}\n\n- arquivo: ${p.file}\n- por: ${p.por} em ${p.criadaEm.slice(0, 16).replace('T', ' ')}\n- motivo: ${p.motivo}${p.fontes.length ? `\n- fontes: ${p.fontes.join(', ')}` : ''}${p.decididaPor ? `\n- decidida por: ${p.decididaPor} em ${p.decididaEm.slice(0, 16).replace('T', ' ')}${p.nota ? ` (${p.nota})` : ''}` : ''}`
        if (p.status !== 'pendente') return head
        if (!p.aplicavel) return `${head}\n- problema: ${p.problema}`
        return `${head}\n\n\`\`\`diff\n${p.diff.map((r) => (r.type === '…' ? '@@' : `${r.type}${r.text}`)).join('\n')}\n\`\`\``
      }).join('\n\n')
    },
  }

  async function call(name, args = {}) {
    const h = handlers[name]
    if (!h) return { content: [{ type: 'text', text: `ferramenta desconhecida: ${name}` }], isError: true }
    try {
      return { content: [{ type: 'text', text: await h(args || {}) }] }
    } catch (e) {
      return { content: [{ type: 'text', text: e.message }], isError: true }
    }
  }

  return { tools: TOOLS, call, store }
}

/** JSON-RPC over newline-delimited stdio, the MCP stdio transport. */
export function serve({ marca, issues, input = process.stdin, output = process.stdout }) {
  const t = createTools({ marca, issues })
  const send = (msg) => output.write(JSON.stringify({ jsonrpc: '2.0', ...msg }) + '\n')
  const handle = async (m) => {
    if (m.id === undefined || m.id === null) return // notification
    try {
      if (m.method === 'initialize') {
        const want = m.params && m.params.protocolVersion
        return send({ id: m.id, result: {
          protocolVersion: PROTOCOLS.includes(want) ? want : PROTOCOLS[0],
          capabilities: { tools: { listChanged: false } },
          serverInfo: { name: 'gtm-brain', title: 'GTM Brain', version: VERSION },
          instructions: INSTRUCTIONS,
        } })
      }
      if (m.method === 'ping') return send({ id: m.id, result: {} })
      if (m.method === 'tools/list') return send({ id: m.id, result: { tools: t.tools } })
      if (m.method === 'tools/call') return send({ id: m.id, result: await t.call(m.params && m.params.name, m.params && m.params.arguments) })
      send({ id: m.id, error: { code: -32601, message: `método não suportado: ${m.method}` } })
    } catch (e) {
      send({ id: m.id, error: { code: -32603, message: e.message } })
    }
  }
  const rl = readline.createInterface({ input, crlfDelay: Infinity })
  rl.on('line', (line) => {
    if (!line.trim()) return
    let m
    try {
      m = JSON.parse(line)
    } catch {
      return send({ id: null, error: { code: -32700, message: 'JSON inválido' } })
    }
    for (const x of Array.isArray(m) ? m : [m]) handle(x)
  })
  return rl
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) {
    console.log(fs.readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(1, 11).join('\n').replace(/^\/\/ ?/gm, ''))
  } else if (!fs.existsSync(args.marca)) {
    console.error(`Pasta da marca não encontrada: ${args.marca}. Use --marca <pasta> ou GTM_BRAIN_MARCA.`)
    process.exit(1)
  } else {
    console.error(`GTM Brain MCP · marca: ${args.marca}`)
    serve(args)
  }
}
