# Identidade visual e design system

Camadas `03-visual/` e `04-design-system/`. Não têm skill própria: você preenche com o método de fechar lacunas, a partir do que a marca já usa. Você registra a identidade que existe; não desenha uma nova. Se a pessoa pedir uma proposta de identidade, tudo o que você criar entra como `[PROPOSTA]`.

## Ordem

1. `03-visual/IDENTIDADE-VISUAL.md`: logo, cores, tipografia, espaçamento, raio, sombra, movimento, acessibilidade.
2. `03-visual/IMAGENS.md`: direção de foto, ilustração, ícones, o que é proibido.
3. `03-visual/PROMPTS-DE-IMAGEM.md`: prompts montados a partir dos dois acima.
4. `04-design-system/theme.json` e `tokens.css`: os mesmos valores, em formato de máquina.
5. `04-design-system/DESIGN.md`: como os componentes usam os tokens.

## Fontes, da mais confiável para a menos

1. **Manual da marca ou brand kit** (PDF, Figma, kit de marca do Canva, se houver um conector do Canva no ambiente). Valor do manual é `[COMPROVADO]`.
2. **CSS do site no ar.** É o que a marca usa de fato. `[OBSERVADO]`, com a fonte `[SITE]`.
3. **Capturas de tela** do site e das peças publicadas (Instagram, anúncios).
4. **A pessoa**, para o que nenhuma fonte mostra (regras de uso, o que é proibido, a intenção).

Se o manual e o site discordam (o manual diz um azul, o site usa outro), é uma contradição: pergunte qual vale antes de escrever.

## Extrair do site

**Com um navegador controlável** (Chrome DevTools, Claude in Chrome, Playwright): abra a página inicial e uma página interna e rode na página:

```js
(() => {
  const vars = [...document.styleSheets]
    .flatMap((s) => { try { return [...s.cssRules] } catch { return [] } })
    .filter((r) => r.selectorText === ':root')
    .flatMap((r) => [...r.style].filter((p) => p.startsWith('--')).map((p) => `${p}: ${r.style.getPropertyValue(p).trim()}`))
  const pick = (sel) => {
    const el = document.querySelector(sel)
    if (!el) return null
    const s = getComputedStyle(el)
    return { sel, cor: s.color, fundo: s.backgroundColor, fonte: s.fontFamily, tamanho: s.fontSize, peso: s.fontWeight, raio: s.borderRadius, sombra: s.boxShadow }
  }
  const els = ['body', 'header', 'nav a', 'h1', 'h2', 'h3', 'p', 'a', 'button', '[class*="btn"]', '[class*="button"]', 'footer'].map(pick).filter(Boolean)
  const fontes = [...new Set([...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.weight}`))]
  return JSON.stringify({ vars, els, fontes }, null, 1)
})()
```

Isso traz as variáveis CSS da raiz, a cor, a fonte, o tamanho, o raio e a sombra dos elementos que importam, e as fontes de fato carregadas. Folhas de estilo de outro domínio não deixam ler as regras; nesse caso, use o caminho sem navegador para elas. Tire também uma captura do topo da página inicial e de uma página de oferta, para ver a cor no contexto. Em sites que montam a página com JavaScript, espere a página carregar por completo antes da captura.

**Sem navegador:** baixe o HTML e o CSS numa pasta temporária (fora da pasta da marca) e conte:

```sh
curl -sL https://<site> -o pagina.html
grep -oE 'href="[^"]+\.css[^"]*"' pagina.html                                   # folhas de estilo
grep -oE 'fonts\.googleapis\.com/css2?\?family=[^"&]+|use\.typekit\.net[^"]*' pagina.html
curl -sL <url-do-css> -o estilo.css
grep -oiE '#[0-9a-f]{6}\b|#[0-9a-f]{3}\b|rgba?\([^)]*\)|oklch\([^)]*\)' estilo.css | sort | uniq -c | sort -rn | head -30
grep -oE 'font-family:[^;}]+' estilo.css | sort | uniq -c | sort -rn | head
grep -oE -- '--[a-z0-9-]+:[^;]+' estilo.css | head -60                           # variáveis
```

**Cor de marca é a cor da interface, não a que ocupa mais tela.** A primária é a do topo, do botão principal e dos links; foto e vídeo ocupam muita área e não são marca. A contagem de ocorrências no CSS ajuda, mas o papel vem de onde a cor aparece.

**Logo:** procure o `<img>` ou `<svg>` do cabeçalho, o favicon, o `apple-touch-icon` e a `og:image`. Registre a URL de cada versão. Só baixe os arquivos para `03-visual/assets/` se a pessoa quiser, com os nomes do template (`logo-principal.svg`, `logo-simbolo.svg`…).

## Converter e checar contraste

Não converta cor de cabeça. Salve este script numa pasta temporária e rode com Node:

```js
// node cores.mjs '#1F4E79' '#FFFFFF'  → RGB, HSL e OKLCH de cada cor, e o contraste entre as duas
const hex = (h) => h.replace('#', '').match(/../g).map((x) => parseInt(x, 16))
const lin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
function hsl([r, g, b]) {
  ;[r, g, b] = [r / 255, g / 255, b / 255]
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min
  if (!d) return `0, 0%, ${Math.round(l * 100)}%`
  const s = d / (1 - Math.abs(2 * l - 1))
  const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4
  return `${Math.round((h * 60 + 360) % 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`
}
function oklch(rgb) {
  const [r, g, b] = rgb.map(lin)
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  const C = Math.hypot(A, B), H = C < 0.002 ? 0 : (Math.atan2(B, A) * 180 / Math.PI + 360) % 360
  return `oklch(${L.toFixed(2)} ${C.toFixed(2)} ${Math.round(H)})`
}
const lum = (rgb) => { const [r, g, b] = rgb.map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b }
const cores = process.argv.slice(2)
for (const c of cores) { const v = hex(c); console.log(`${c.toUpperCase()} | ${v.join(', ')} | ${hsl(v)} | ${oklch(v)}`) }
if (cores.length === 2) {
  const [a, b] = cores.map((c) => lum(hex(c))).sort((x, y) => y - x)
  console.log(`contraste ${((a + 0.05) / (b + 0.05)).toFixed(1).replace('.', ',')}:1`)
}
```

Contraste mínimo (WCAG AA): 4,5:1 para texto normal, 3:1 para texto grande (24 px, ou 18,5 px em negrito) e para ícones. Escreva em `### Regras de uso das cores` cada combinação que a marca usa e o contraste dela. Combinação abaixo do mínimo vira regra ("só em texto grande") ou lacuna para a pessoa decidir.

## `IDENTIDADE-VISUAL.md`

- **Todas as cores e fontes do template são exemplo.** Troque cada linha das tabelas pelo valor da marca, com RGB, HSL e OKLCH saídos do script. A coluna Função diz onde a cor aparece no site.
- Linha que a marca não tem (um segundo destaque, cores de estado): pergunte se ela quer uma proposta (marcada `[PROPOSTA]`) ou se a linha sai. Sites raramente mostram cores de erro e de alerta; não tire isso de um padrão de framework.
- Os tokens de neutras do `theme.json` incluem `300` e `400`, que a tabela do template não tem. Acrescente as duas linhas ou registre que a marca não usa.
- **Tipografia:** a família é a fonte carregada de fato (`document.fonts` ou o `@font-face`), não a primeira da pilha de fallback. Origem: Google Fonts, Adobe Fonts, arquivo próprio. Pesos: só os que aparecem. Escala: os tamanhos de `h1` a `h4` e do texto, medidos.
- **Espaçamento, raio, sombra, movimento, breakpoints:** dos valores do CSS (`border-radius` dos botões e cards, `box-shadow`, `transition`, `@media`). Se o site usa os valores padrão de um framework (Tailwind, Bootstrap), diga isso: é o valor real da marca, com selo `[OBSERVADO]`.
- **Modo escuro:** procure `prefers-color-scheme` no CSS. Se não existe, escreva que a marca não tem modo escuro.
- **Logo:** caminhos ou URLs reais de cada versão. Tamanho mínimo e área de respiro só do manual ou da pessoa; sem isso, `[PENDENTE: tamanho mínimo do logo, no manual da marca]`.
- Apague `## Exemplo` (regras, seção 3) e escreva a primeira linha do `## Histórico de mudanças`.

## `IMAGENS.md`

Olhe as fotos do site e as últimas 12 a 30 publicações das redes. Descreva o que se repete: tema, composição, luz, tratamento de cor, quem aparece, objetos de cena. Isso é `[OBSERVADO]`. O que a marca não quer (estilos proibidos, banco de imagem genérico) e a autorização de uso de imagem de clientes vêm da pessoa. Se você não consegue ver as imagens, peça à pessoa três peças que ela acha certas e três que ela nunca publicaria.

## `PROMPTS-DE-IMAGEM.md`

- **O template traz exemplos de outra marca fora da seção `## Exemplo`** (os `### Exemplo 1…`, `### Exemplo: …` de cada ferramenta, e a coluna de exemplo do glossário). Troque todos pelos da marca, ou apague. `lacunas` só acusa, em "Exemplo do template que ficou no arquivo", as linhas que citam a Cadência; o resto passa como preenchido com o conteúdo errado.
- `## Modificadores universais` sai de `IDENTIDADE-VISUAL.md` e `IMAGENS.md`: paleta em hex, luz, estilo, o que nunca aparece.
- Mantenha só as ferramentas que a marca usa (pergunte). Ferramentas que escrevem texto na imagem (a geração de imagem do ChatGPT, Nano Banana) aceitam título, logotipo e paleta no prompt; nas outras, peça só a cena e ponha o texto no design depois. Evite listas numeradas longas dentro da imagem: o texto costuma sair trocado. Confira o texto de toda imagem gerada.
- Prompt que ninguém rodou é `[HIPÓTESE]`. Se houver uma ferramenta de geração no ambiente, rode um prompt por ferramenta, mostre o resultado à pessoa e só então marque como testado.

## `theme.json` e `tokens.css`

- **`theme.json`:** mantenha a estrutura e os nomes das chaves. Troque `name` ("Tema da <Marca>"), `description`, `meta.author`, `meta.lastUpdated` e cada valor: `value` em OKLCH, `hex`, `role`, famílias, pilhas, pesos, escala. Os valores são os mesmos de `IDENTIDADE-VISUAL.md`, sem arredondar diferente. Confira que o JSON abre (SKILL.md, seção 8).
- **`tokens.css`:** troque os valores da Camada 1 (`--ds-*`) **e** a reserva dentro de cada `var(--ds-…, <reserva>)` da Camada 2. As duas precisam bater.
- **Sobrou valor do template?** Rode nos três arquivos (identidade, theme, tokens) e no `DESIGN.md`:

```sh
grep -n -i -E '#(0B3A5B|124D7A|D97706|B45309|10B981|6366F1|F8FAFC|F1F5F9|E2E8F0|64748B|334155|0F172A|F59E0B|EF4444|3B82F6)|oklch\([0-9.]+ [0-9.]+ 240\)|Satoshi' <arquivos>
```

Cada linha que aparecer é um valor do template. Se a marca usa por acaso o mesmo valor (branco, por exemplo, não está na lista), deixe e cite a fonte.

## `DESIGN.md`

- Logo abaixo do título, a lista de fontes e uma frase com o nome da marca. É assim que o GTM Brain reconhece o arquivo como preenchido.
- As tabelas de tokens repetem os nomes e valores do `theme.json`. A referência de variáveis CSS repete o `tokens.css`.
- `## Como os componentes devem ser construídos`: descreva os componentes como estão no site (raio, altura, espaçamento interno, estados de hover e foco, ícone). O que o site não mostra, a pessoa decide ou fica pendente.
- No checklist, marque só o que é verdade. "Script de auditoria no CI" e "código em produção usa os tokens" quase nunca são, no começo.
- As specs em `specs/` são modelos genéricos e não entram no relatório de lacunas. Ajuste `fundamentos/cor.md` e `fundamentos/tipografia.md` aos valores da marca só se a pessoa for usar as specs com um agente de código.

## Sem site e sem manual

Peça os arquivos do logo e, se existirem, as peças já publicadas. Se não houver nada, a camada fica "a decidir": registre isso no `CEREBRO.md` como `🟡 parcial (identidade visual ainda não definida)` e não invente uma paleta.
