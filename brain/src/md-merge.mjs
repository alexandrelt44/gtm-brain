// Writes an edited markdown back into the original file without reformatting
// it. Proof (Milkdown/remark) normalizes markdown on export: `-` bullets become
// `*`, `---` becomes `***`, `[SELO]` becomes `\[SELO]`, tables get re-padded
// and blank lines move. The brand conventions the brain reads depend on the
// original spelling, so we only take from the editor the lines whose meaning
// changed and keep every other line byte for byte.

/**
 * Marks the existing text as written by people before it goes into Proof. Proof
 * treats any text without an "authored" mark as AI-written, so a file imported
 * through the API would show up entirely as AI. Each line's inline content gets
 * a `<span data-proof="authored" data-by="…">`, which Proof turns into marks
 * and strips from its markdown export.
 */
export function wrapAuthored(md, by) {
  const open = `<span data-proof="authored" data-by="${by.replace(/"/g, '')}">`
  const wrap = (s) => (s.trim() && /[\p{L}\p{N}]/u.test(s) ? open + s + '</span>' : s)
  let fence = false
  return md.split('\n').map((line) => {
    if (/^\s*```/.test(line)) {
      fence = !fence
      return line
    }
    if (fence || !line.trim() || isHidden(line) || /^\s*(---+|\*\*\*+)\s*$/.test(line) || /^\s*\[[^\]]+\]:\s/.test(line)) return line
    if (/^\s*\|/.test(line)) {
      if (/^\s*\|(\s*:?-{2,}:?\s*\|)+\s*$/.test(line)) return line
      return line.replace(/\|([^|]*)(?=\|)/g, (m, cell) => '|' + cell.replace(/^(\s*)(.*?)(\s*)$/, (x, a, b, c) => a + wrap(b) + c))
    }
    let m = /^(#{1,6}\s+)(.*)$/.exec(line)
    if (m) return m[1] + wrap(m[2])
    m = /^(\s*(?:>\s?)*\s*(?:(?:[-*+]|\d+[.)])\s+(?:\[[ xX]\]\s+)?)?)(.*?)(\s*)$/.exec(line)
    return m[1] + wrap(m[2]) + m[3]
  }).join('\n')
}

/** Canonical form of a line: what it means, ignoring how remark spells it. */
export function canonLine(line) {
  let l = line.replace(/<span\b[^>]*data-proof[^>]*>|<\/span>/g, '').replace(/\s+$/, '')
  if (/^\s*\|/.test(l)) {
    const cells = l.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map((c) => c.trim())
    if (cells.every((c) => /^:?-{2,}:?$/.test(c))) return '|' + cells.map(() => '---').join('|') + '|'
    l = '|' + cells.join('|') + '|'
  }
  l = l.replace(/^(\s*)[*+](\s+)/, '$1-$2')
  l = l.replace(/^(\s*)(\d+)\)(\s+)/, '$1$2.$3')
  if (/^\s*(\*\s*){3,}$|^\s*(_\s*){3,}$|^\s*(-\s*){3,}$/.test(l)) return '---'
  l = unescapeMd(l)
  l = stripAutolinks(l)
  // `_x_` and `*x*` are the same emphasis; remark always writes `*`.
  l = l.replace(/(^|[^\w*])_([^_\s][^_]*?)_(?=[^\w]|$)/g, '$1*$2*')
  return l.replace(/\s+/g, ' ').trim()
}

/** `<https://x>` and `<a@b.c>` are how remark writes bare URLs and emails. */
export function stripAutolinks(s) {
  return s.replace(/<((?:https?:\/\/|mailto:)[^>\s]+|[^<>\s@]+@[^<>\s]+\.[a-z]{2,})>/gi, '$1')
}

/** Removes the backslash escapes remark adds that the source never had. */
export function unescapeMd(s) {
  return s.replace(/\\([[\]~_*#>|`!.()+:=&-])/g, '$1').replace(/&#x20;/g, ' ').replace(/&#x([0-9a-f]+);/gi, (m, h) => String.fromCodePoint(parseInt(h, 16)))
}

/** Puts a line the editor produced back in the source's style. */
export function denormalizeLine(line) {
  let l = line.replace(/<span\b[^>]*data-proof[^>]*>|<\/span>/g, '').replace(/\s+$/, '')
  if (/^\s*(\*\s*){3,}$/.test(l)) return '---'
  l = l.replace(/^(\s*)\*(\s+)/, '$1-$2')
  // remark pads table cells to align columns; the brand files use single spaces
  if (/^\s*\|/.test(l)) {
    const cells = l.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map((c) => c.trim())
    l = cells.every((c) => /^:?-{2,}:?$/.test(c)) ? '| ' + cells.map(() => '---').join(' | ') + ' |' : '| ' + cells.join(' | ') + ' |'
  }
  return stripAutolinks(unescapeMd(l))
}

/** Lines the editor drops on import (HTML comments): invisible, so never "deleted" by a person. */
export const isHidden = (line) => /^\s*<!--.*-->\s*$/.test(line)

/** Longest common subsequence over two arrays of strings → list of [i, j] pairs. */
function lcs(a, b) {
  const n = a.length
  const m = b.length
  // Trim the common head and tail first: edits are local, files are long.
  let head = 0
  while (head < n && head < m && a[head] === b[head]) head++
  let tail = 0
  while (tail < n - head && tail < m - head && a[n - 1 - tail] === b[m - 1 - tail]) tail++
  const A = a.slice(head, n - tail)
  const B = b.slice(head, m - tail)
  const W = B.length + 1
  const dp = new Uint32Array((A.length + 1) * W)
  for (let i = A.length - 1; i >= 0; i--) {
    for (let j = B.length - 1; j >= 0; j--) {
      dp[i * W + j] = A[i] === B[j] ? dp[(i + 1) * W + j + 1] + 1 : Math.max(dp[(i + 1) * W + j], dp[i * W + j + 1])
    }
  }
  const pairs = []
  for (let k = 0; k < head; k++) pairs.push([k, k])
  let i = 0
  let j = 0
  while (i < A.length && j < B.length) {
    if (A[i] === B[j]) {
      pairs.push([head + i, head + j])
      i++
      j++
    } else if (dp[(i + 1) * W + j] >= dp[i * W + j + 1]) i++
    else j++
  }
  for (let k = 0; k < tail; k++) pairs.push([n - tail + k, m - tail + k])
  return pairs
}

/**
 * Merges `edited` (editor export) into `original` (file on disk).
 * Returns { text, changed } where `changed` counts the lines that differ.
 * Unchanged meaning ⇒ original bytes. If nothing changed, text === original.
 */
export function mergeBack(original, edited) {
  const O = original.split('\n')
  const E = edited.replace(/\n+$/, '').split('\n')
  const cO = O.map(canonLine)
  const cE = E.map(canonLine)
  const pairs = lcs(cO, cE)
  const out = []
  let changed = 0
  let i = 0
  let j = 0
  const isBlank = (s) => s.trim() === ''
  const flush = (iEnd, jEnd) => {
    // Lines between two anchors: deletions from the original, insertions from the editor.
    const del = O.slice(i, iEnd)
    const ins = E.slice(j, jEnd)
    const realDel = del.filter((l) => !isBlank(l) && !isHidden(l))
    const realIns = ins.filter((l) => !isBlank(l))
    if (!realDel.length && !realIns.length) {
      // Only blank lines moved, or lines the editor cannot show: keep ours.
      out.push(...del)
    } else {
      // HTML comments never reach the editor, so nobody could have deleted them.
      out.push(...del.filter(isHidden), ...ins.map(denormalizeLine))
      changed += Math.max(realDel.length, realIns.length)
    }
    i = iEnd
    j = jEnd
  }
  for (const [pi, pj] of pairs) {
    flush(pi, pj)
    out.push(O[pi])
    i = pi + 1
    j = pj + 1
  }
  // The editor drops the trailing newline; keep the original ending.
  const restO = O.slice(i)
  const trailing = restO.length && restO.every(isBlank)
  if (trailing && E.slice(j).every(isBlank)) out.push(...restO)
  else flush(O.length, E.length)
  return { text: out.join('\n'), changed }
}

/** Unified-style line diff for previews: [{ type: ' ' | '-' | '+', text, line }]. */
export function lineDiff(before, after, context = 2) {
  const a = before.split('\n')
  const b = after.split('\n')
  const pairs = lcs(a, b)
  const rows = []
  let i = 0
  let j = 0
  for (const [pi, pj] of [...pairs, [a.length, b.length]]) {
    while (i < pi) rows.push({ type: '-', text: a[i], line: ++i })
    while (j < pj) rows.push({ type: '+', text: b[j++], line: j })
    if (pi < a.length) rows.push({ type: ' ', text: a[pi], line: pi + 1 })
    i = pi + 1
    j = pj + 1
  }
  // keep only changed rows plus context
  const keep = new Set()
  rows.forEach((r, k) => {
    if (r.type !== ' ') for (let d = -context; d <= context; d++) keep.add(k + d)
  })
  const out = []
  let last = -2
  rows.forEach((r, k) => {
    if (!keep.has(k)) return
    if (k !== last + 1 && out.length) out.push({ type: '…', text: '', line: null })
    out.push(r)
    last = k
  })
  return out
}
