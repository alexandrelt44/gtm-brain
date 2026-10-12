// Markdown as data: a heading tree, labeled fields, table rows and a small HTML
// renderer. The GTM Brain model (brain-model.mjs) reads brand files through this
// module, so the front end gets typed records instead of files.

/**
 * Parses markdown into a heading tree. Every node keeps its own body lines
 * (with 1-based line numbers) and its children. Headings inside fenced code
 * are ignored.
 */
export function parseTree(text) {
  const lines = text.split('\n')
  const root = { level: 0, title: '', line: 0, end: lines.length, body: [], children: [], parent: null }
  let cur = root
  let inFence = false
  lines.forEach((raw, i) => {
    if (/^\s*```/.test(raw)) inFence = !inFence
    const m = !inFence && /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(raw)
    if (m) {
      const level = m[1].length
      while (cur.level >= level) {
        cur.end = i
        cur = cur.parent
      }
      const node = { level, title: m[2].trim(), line: i + 1, end: lines.length, body: [], children: [], parent: cur }
      cur.children.push(node)
      cur = node
      return
    }
    cur.body.push({ text: raw, line: i + 1 })
  })
  return root
}

/** Depth-first list of every heading node under `node`. */
export function descendants(node) {
  const out = []
  const walk = (n) => {
    for (const c of n.children) {
      out.push(c)
      walk(c)
    }
  }
  walk(node)
  return out
}

/** Body of a node including its sub-headings (rendered as headings), as {text, line}. */
export function fullLines(node) {
  const out = [...node.body]
  for (const c of node.children) {
    out.push({ text: `${'#'.repeat(c.level)} ${c.title}`, line: c.line })
    out.push(...fullLines(c))
  }
  return out
}

const RE_LABELED = /^[-*]\s+\*\*(.+?)\*\*\s*(:?)\s*(.*)$/

/**
 * Splits an entity into an intro and named fields. Fields come from
 *   - top-level bullets with a bold label: `- **Antes:** texto`
 *   - child headings: `### Pain Points`
 * Unlabeled content after the first field goes to a "Detalhes" field so
 * nothing is dropped (tables between bullets, loose paragraphs).
 */
export function parseFields(node) {
  const intro = []
  const fields = []
  let cur = null
  let details = null
  for (const l of node.body) {
    const m = RE_LABELED.exec(l.text)
    const labeled = m && (/:$/.test(m[1].trim()) || m[2] === ':')
    if (labeled) {
      cur = { label: m[1].trim().replace(/:$/, '').trim(), lines: m[3] ? [m[3]] : [], line: l.line }
      fields.push(cur)
      continue
    }
    if (!l.text.trim()) {
      if (cur) cur.lines.push('')
      else if (details) details.lines.push('')
      else intro.push(l)
      continue
    }
    if (cur && /^\s{2,}\S/.test(l.text)) {
      cur.lines.push(l.text.replace(/^\s{2}/, ''))
      continue
    }
    if (!fields.length) {
      intro.push(l)
      continue
    }
    if (!details || fields[fields.length - 1] !== details) {
      details = { label: 'Detalhes', lines: [], line: l.line, unlabeled: true }
      fields.push(details)
    }
    cur = null
    details.lines.push(l.text)
  }
  for (const c of node.children) {
    const t = splitHeadingTitle(c.title)
    const lines = fullLines(c).map((x) => x.text)
    if (t.rest) lines.unshift(t.rest, '')
    fields.push({ label: t.label, lines, line: c.line, end: c.end, heading: true })
  }
  for (const f of fields) {
    while (f.lines.length && !f.lines[f.lines.length - 1].trim()) f.lines.pop()
  }
  while (intro.length && !intro[intro.length - 1].text.trim()) intro.pop()
  while (intro.length && !intro[0].text.trim()) intro.shift()
  return { intro: intro.map((l) => l.text), fields }
}

/** "Pricing: **em definição** (x)" → { label: "Pricing", rest: "**em definição** (x)" } */
export function splitHeadingTitle(title) {
  const m = /^([^:`*[]{2,60}?):\s+(.+)$/.exec(title)
  return m ? { label: m[1].trim(), rest: m[2].trim() } : { label: title.trim(), rest: '' }
}

/** Markdown tables in a list of {text, line} → [{ header, rows: [{ cells, line }] }]. */
export function parseTables(lines) {
  const tables = []
  let t = null
  for (const l of lines) {
    if (!/^\s*\|/.test(l.text)) {
      t = null
      continue
    }
    const cells = splitRow(l.text)
    if (!t) {
      t = { header: cells, rows: [], line: l.line }
      tables.push(t)
    } else if (cells.every((c) => /^:?-{2,}:?$/.test(c))) continue
    else t.rows.push({ cells, line: l.line })
  }
  return tables
}

export function splitRow(text) {
  return text.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map((c) => c.trim())
}

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

/**
 * Renders a list of markdown lines to HTML. Covers what the brand files use:
 * paragraphs, nested lists, tables, quotes, fenced code and sub-headings.
 * `inline(text)` turns inline markdown into HTML (it must escape).
 */
export function renderMd(lines, inline = esc) {
  const out = []
  let para = []
  const listStack = [] // indents of open lists
  const flushPara = () => {
    if (para.length) out.push(`<p>${inline(para.join(' '))}</p>`)
    para = []
  }
  const closeLists = (toIndent = -1) => {
    while (listStack.length && listStack[listStack.length - 1].indent > toIndent) {
      out.push(`</li></${listStack.pop().tag}>`)
    }
  }
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (/^\s*```/.test(line)) {
      flushPara()
      closeLists()
      const code = []
      for (i++; i < lines.length && !/^\s*```/.test(lines[i]); i++) code.push(lines[i])
      out.push(`<pre>${esc(code.join('\n'))}</pre>`)
      continue
    }
    if (!line.trim()) {
      flushPara()
      continue
    }
    if (/^\s*\|/.test(line)) {
      flushPara()
      closeLists()
      const rows = []
      for (; i < lines.length && /^\s*\|/.test(lines[i]); i++) rows.push(splitRow(lines[i]))
      i--
      const [head, ...rest] = rows
      const body = rest.filter((r) => !r.every((c) => /^:?-{2,}:?$/.test(c)))
      out.push(`<div class="tbl"><table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`)
      continue
    }
    const h = /^(#{1,6})\s+(.+)$/.exec(line)
    if (h) {
      flushPara()
      closeLists()
      out.push(`<h5>${inline(h[2])}</h5>`)
      continue
    }
    if (/^\s*(---+|\*\*\*+)\s*$/.test(line)) {
      flushPara()
      closeLists()
      continue
    }
    const q = /^\s*>\s?(.*)$/.exec(line)
    if (q) {
      flushPara()
      closeLists()
      const ql = [q[1]]
      for (i++; i < lines.length && /^\s*>/.test(lines[i]); i++) ql.push(lines[i].replace(/^\s*>\s?/, ''))
      i--
      out.push(`<blockquote>${inline(ql.join(' '))}</blockquote>`)
      continue
    }
    const li = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/.exec(line)
    if (li) {
      flushPara()
      const indent = li[1].replace(/\t/g, '  ').length
      const tag = /\d/.test(li[2]) ? 'ol' : 'ul'
      const top = listStack[listStack.length - 1]
      if (!top || indent > top.indent) {
        out.push(`<${tag}><li>`)
        listStack.push({ indent, tag })
      } else {
        closeLists(indent)
        const t2 = listStack[listStack.length - 1]
        if (t2 && t2.indent === indent) out.push('</li><li>')
        else {
          out.push(`<${tag}><li>`)
          listStack.push({ indent, tag })
        }
      }
      out.push(inline(li[3]))
      continue
    }
    if (listStack.length && /^\s+\S/.test(line)) {
      out.push(' ' + inline(line.trim()))
      continue
    }
    closeLists()
    para.push(line.trim())
  }
  flushPara()
  closeLists()
  return out.join('')
}
