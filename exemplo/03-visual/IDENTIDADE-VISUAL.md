# Identidade visual

> Exemplo fictício. A Cadência e todas as pessoas e empresas citadas não existem.

Fontes citadas neste arquivo:

- `[ENTREVISTAS]` 14 entrevistas com donas de estúdio e gestoras de rede, janeiro a março de 2026
- `[CSS]` export das variáveis e dos componentes do CSS do site (`src/styles/global.css`), feito por Tiago Ramos em 2026-10-02

## Como usar este arquivo

- **O que entra:** toda regra sobre como a marca aparece visualmente. Logo, cor, tipografia, espaçamento, raio, sombra, movimento, acessibilidade.
- **Como os agentes leem:** geradores de imagem, designers e agentes de layout tiram as regras daqui. Os tokens de design em `/04-design-system/theme.json` são derivados deste arquivo.
- **Frequência de atualização:** revise uma vez por ano. Registre toda mudança com data no histórico no fim do arquivo.

## Checklist para agentes de IA

- [x] Legível por máquina: regras expressas em tabelas de tokens.
- [x] Estruturado: um sistema por H2 (logo, cor, tipografia, espaçamento, raio, sombra, movimento, acessibilidade).
- [x] Fonte única da verdade: pareado com `/04-design-system/theme.json`.
- [x] Versionado: data da última atualização e histórico de mudanças.
- [x] Citável: agentes citam `/03-visual/IDENTIDADE-VISUAL.md` ao produzir peças visuais.

Última atualização: 2026-10-01

A Cadência é um SaaS de agenda, cobrança recorrente e controle de presença para estúdios de pilates, yoga e treino funcional. A marca visual quer parecer um estúdio bom numa manhã calma: verde musgo, terracota e areia, serifa com personalidade nos títulos e texto limpo. Nada de neon, nada de academia de musculação. `[PROPOSTA]`

Tamanhos, raios, sombras, movimento e breakpoints vêm do CSS do site no ar `[CSS]` e são os mesmos de `/04-design-system/DESIGN.md`, `theme.json` e `tokens.css`.

---

## Sistema de logo

### Logo principal

- **Arquivo:** `/03-visual/assets/logo-principal.svg`
- **Uso:** marca padrão no digital e no impresso, sempre que houver área de respiro e escala suficientes. É o logotipo "cadência" em Fraunces 600, minúsculo, em Musgo, com o símbolo à esquerda.
- **Largura mínima:** 120 px no digital, 3 cm no impresso.
- **Área de respiro:** igual à altura das maiúsculas do logotipo, em todos os lados.

### Logo secundário (horizontal ou empilhado)

- **Arquivo:** `/03-visual/assets/logo-secundario.svg`
- **Uso:** quando o logo principal não cabe na proporção do espaço.
- **Largura mínima:** 96 px no digital, 2,5 cm no impresso.

### Logo monocromático

- **Arquivo:** `/03-visual/assets/logo-monocromatico.svg`
- **Uso:** sobre fundos coloridos, cupons e recibos impressos, impressão em uma cor, gravação, bordado, avatares de redes sociais.

### Símbolo

- **Arquivo:** `/03-visual/assets/logo-simbolo.svg`
- **Uso:** favicon, avatares de redes sociais, ícone do app do aluno, telas de carregamento. O símbolo são três traços curtos em ritmo crescente, em Terracota sobre Areia.
- **Tamanho mínimo:** 24 x 24 px.

### Logo: faça e não faça

**Faça**

- Respeite a área de respiro.
- Use os SVGs fornecidos. Não redesenhe.
- Use a versão monocromática sobre fundos carregados.
- Use o símbolo em formatos pequenos.

**Não faça**

- Esticar ou achatar.
- Adicionar sombra, contorno ou brilho.
- Girar, exceto em animações aprovadas.
- Recolorir fora da paleta aprovada.
- Aplicar sobre fundo de baixo contraste.

## Sistema de cores

Use tokens. Toda cor tem uma função. Não invente novos valores hex.

### Primária

| Token | Função | Hex | RGB | HSL | OKLCH |
| --- | --- | --- | --- | --- | --- |
| `--color-brand-primary` | Musgo. Topo da página, CTA principal, navegação | `#2F4A3A` | `47, 74, 58` | `144, 22%, 24%` | `oklch(0.38 0.04 158)` |
| `--color-brand-primary-hover` | Estado hover da primária | `#243A2D` | `36, 58, 45` | `145, 23%, 18%` | `oklch(0.33 0.04 158)` |
| `--color-brand-primary-fg` | Texto sobre a primária | `#FFFFFF` | `255, 255, 255` | `0, 0%, 100%` | `oklch(1.00 0 0)` |

### Secundária

| Token | Função | Hex | RGB | HSL | OKLCH |
| --- | --- | --- | --- | --- | --- |
| `--color-brand-secondary` | Terracota. CTA secundário, etiquetas, destaques | `#C4643F` | `196, 100, 63` | `17, 53%, 51%` | `oklch(0.61 0.13 41)` |
| `--color-brand-secondary-hover` | Estado hover da secundária. Também a versão para texto pequeno | `#A85331` | `168, 83, 49` | `17, 55%, 43%` | `oklch(0.54 0.12 42)` |
| `--color-brand-secondary-fg` | Texto sobre a secundária | `#FFFFFF` | `255, 255, 255` | `0, 0%, 100%` | `oklch(1.00 0 0)` |

### Destaque

| Token | Função | Hex | RGB | HSL | OKLCH |
| --- | --- | --- | --- | --- | --- |
| `--color-accent-1` | Areia. Fundo de seção de destaque, cards de depoimento | `#F1E9DC` | `241, 233, 220` | `37, 43%, 90%` | `oklch(0.94 0.02 80)` |
| `--color-accent-2` | Sálvia. Série secundária de gráficos | `#7C9A6E` | `124, 154, 110` | `101, 18%, 52%` | `oklch(0.65 0.07 136)` |

### Neutras

Neutras quentes, puxadas para a areia. Nada de cinza azulado.

| Token | Função | Hex | RGB | OKLCH |
| --- | --- | --- | --- | --- |
| `--color-neutral-0` | Fundo da página | `#FBF8F3` | `251, 248, 243` | `oklch(0.98 0.01 81)` |
| `--color-neutral-50` | Fundo de card | `#FFFFFF` | `255, 255, 255` | `oklch(1.00 0 0)` |
| `--color-neutral-100` | Fundo de seção (igual à Areia) | `#F1E9DC` | `241, 233, 220` | `oklch(0.94 0.02 80)` |
| `--color-neutral-200` | Bordas, divisórias | `#E4DACB` | `228, 218, 203` | `oklch(0.89 0.02 78)` |
| `--color-neutral-500` | Texto secundário | `#6B6259` | `107, 98, 89` | `oklch(0.50 0.02 67)` |
| `--color-neutral-700` | Texto corrido | `#3D3832` | `61, 56, 50` | `oklch(0.34 0.01 72)` |
| `--color-neutral-900` | Títulos | `#211D19` | `33, 29, 25` | `oklch(0.23 0.01 67)` |

A Cadência não usa as neutras 300 e 400 `[CSS]`.

### Semânticas

| Token | Função | Hex |
| --- | --- | --- |
| `--color-success` | Pagamento confirmado, check-in feito | `#3F7A57` |
| `--color-warning` | Mensalidade perto do vencimento | `#C98A1B` |
| `--color-danger` | Pagamento atrasado, erro | `#B23A2E` |
| `--color-info` | Faixas informativas | `#3B6E8F` |

### Regras de uso das cores

- Cor primária da marca no topo da página, no CTA principal e na navegação principal.
- Cor secundária em CTAs secundários, etiquetas e momentos de destaque. Nunca empilhada contra a primária em saturação máxima.
- As neutras sustentam a página. 80% de qualquer layout é neutro.
- Cores semânticas são reservadas para status. Não use vermelho como destaque visual.
- Texto branco sobre Terracota `#C4643F` tem contraste de 4,0:1. Só vale para texto grande: 24 px, ou 18,7 px (14 pt) em negrito. O site hoje libera a partir de 18 px negrito, abaixo do limite [PENDENTE: Bruna Alves e Tiago Ramos decidem entre 19 px negrito e fundo `#A85331`, ver `/04-design-system/DESIGN.md`]. Em texto pequeno, use `#A85331` (5,3:1).
- Musgo sobre Areia tem contraste de 8,1:1 e é a combinação padrão de card de depoimento.

## Tipografia

### Display

- **Família:** "Fraunces"
- **Pesos usados:** 600 `[CSS]`.
- **Origem na web:** Google Fonts, auto-hospedada no site e no app.
- **Pilha de fallback:** `"Fraunces", Georgia, "Times New Roman", serif`

### Texto

- **Família:** "Inter"
- **Pesos usados:** 400, 500, 600.
- **Pilha de fallback:** `"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`

### Mono

- **Família:** "JetBrains Mono"
- **Pesos usados:** 400. Só no código de UTM e nas tabelas de preço do site, em 14 px `[CSS]`.
- **Pilha de fallback:** `"JetBrains Mono", "IBM Plex Mono", "Menlo", "Consolas", monospace`

### Escala tipográfica

Tamanhos do site `[CSS]`. Entrelinha e espaçamento entre letras dos títulos ficam fora do export do CSS [PENDENTE: Tiago Ramos, `src/styles/global.css`].

| Token | Função | Desktop (px) | Celular (px) | Entrelinha | Peso |
| --- | --- | --- | --- | --- | --- |
| `--fs-h1` | Título da página | 48 | 34 | a confirmar | Fraunces 600 |
| `--fs-h2` | Seção | 36 | 28 | a confirmar | Fraunces 600 |
| `--fs-h3` | Subseção | 28 | 24 | a confirmar | Fraunces 600 |
| `--fs-h4` | Título pequeno | 22 | 20 | a confirmar | Fraunces 600 |
| `--fs-body` | Texto corrido | 17 | 17 | 1.6 | Inter 400 |
| `--fs-button` | Texto do botão | 16 | 16 | a confirmar | Inter 600 |
| `--fs-badge` | Badge | 13 | 13 | a confirmar | Inter 500 |
| `--fs-mono` | Código de UTM, tabela de preços | 14 | 14 | a confirmar | JetBrains Mono 400 |

### Escala para impresso

- H1: 36 pt.
- H2: 24 pt.
- Texto: 10,5 a 11 pt, entrelinha 1,45.
- Legendas: 8,5 pt.

## Espaçamento

O espaçamento segue uma unidade-base de 4 px `[CSS]`. Monte os layouts a partir do conjunto de tokens.

| Token | Valor |
| --- | --- |
| `--space-0` | 0 |
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px (só o espaçamento lateral do botão) |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-12` | 48px |
| `--space-16` | 64px |
| `--space-24` | 96px |

Conteúdo até 1200 px de largura; texto corrido até 68 caracteres por linha `[CSS]`.

## Raio

| Token | Valor | Uso `[CSS]` |
| --- | --- | --- |
| `--radius-md` | 8px | Botões, campos |
| `--radius-lg` | 12px | Cards |
| `--radius-xl` | 16px | Imagem de case |
| `--radius-pill` | 999px | Badges |

## Sombra

Sombras no tom do `#211D19`, nunca em cinza azulado `[CSS]`.

| Token | Valor | Uso |
| --- | --- | --- |
| `--shadow-sm` | `0 1px 2px rgba(33,29,25,.06), 0 2px 8px rgba(33,29,25,.06)` | Cards |
| `--shadow-md` | `0 8px 24px rgba(33,29,25,.12)` | Menu e modal |

## Movimento

- **Duração:** 150 ms em hover e foco, 250 ms para abrir menu e modal `[CSS]`.
- **Curva de aceleração:** `ease-out` nas duas `[CSS]`.
- **Redução de movimento:** respeite `prefers-reduced-motion`. Só fade, sem parallax nem deslizamento.

## Breakpoints

| Token | Largura mínima |
| --- | --- |
| `--bp-sm` | 640px |
| `--bp-lg` | 1024px |
| `--bp-xl` | 1280px |

O site usa só esses três `[CSS]`.

## Acessibilidade

- Contraste mínimo: WCAG 2.2 nível AA. Isso significa 4,5:1 para texto corrido e 3:1 para texto grande (18 pt regular ou 14 pt negrito para cima).
- Botões e contornos de campo precisam de 3:1 contra o fundo no estado padrão. A borda de campo `#E4DACB` dá 1,4:1 sobre branco [PENDENTE: Bruna Alves e Tiago Ramos decidem; proposta em `/04-design-system/DESIGN.md`].
- Estados de foco precisam ser visíveis. Anel mínimo de 2 px, com afastamento de 2 px, em Terracota escuro `#A85331` (`--color-focus`) `[CSS]`.
- Áreas de toque têm no mínimo 44 x 44 px.
- Nunca transmita significado só pela cor. Junte a cor a um ícone ou a um rótulo.
- Texto alternativo de imagem é campo obrigatório em todo modelo do CMS.

## Modo escuro

A Cadência não oferece modo escuro, nem no site nem no app do aluno. Não crie variantes escuras das cores. Peças para fundo escuro usam Musgo `#2F4A3A` como fundo e Areia `#F1E9DC` como texto.

## Direção de imagem e movimento

- **Imagens:** fotos de estúdios clientes com luz natural da manhã, mãos ajustando as molas do reformer, a tela da agenda no celular da recepção. Nada de modelo posando de roupa fitness em fundo branco. As donas de estúdio dizem que não se reconhecem nas fotos de banco de imagem de academia. `[OBSERVADO]` `[ENTREVISTAS §7]`
- **Pessoas:** donas e instrutoras reais, com autorização registrada em `/08-conteudo/PROVAS.md`. Alunas de todas as idades e corpos.
- **Movimento:** fades curtos. Sem parallax. No app do aluno, a confirmação de check-in usa uma transição de 180 ms e nada mais.
- **Detalhes completos:** `/03-visual/IMAGENS.md` e `/03-visual/PROMPTS-DE-IMAGEM.md`.

## Ferramentas recomendadas

- [Figma](https://www.figma.com/) (tem plano gratuito): a fonte da verdade do design.
- **FigmaLint**, de TJ Pitre (plugin gratuito do Figma): audita o arquivo do Figma em busca de valores fixos no código, instâncias desvinculadas, estados interativos faltando e tokens não aplicados, antes que esses problemas cheguem ao código. Rode antes de entregar uma tela para a engenharia e antes de cada lançamento. Confirme o endereço do plugin em `figma.com/community` e consulte `/04-design-system/REFERENCIAS.md` para entender o padrão.
- [Adobe Express](https://www.adobe.com/express/) ou [Canva Pro](https://www.canva.com/pro/) para a produção do time.
- Midjourney, Nano Banana ou Firefly para geração de imagem com IA (prompts em `/03-visual/PROMPTS-DE-IMAGEM.md`).
- [Eagle](https://eagle.cool/) (pago, licença única) ou Notion para bibliotecas de assets.
- Para o equivalente do FigmaLint no lado do código, veja `/04-design-system/tokens.css` e `/scripts/auditar-tokens.sh`: o mesmo padrão em outra superfície.

## Como passar este arquivo para um agente de IA

```text
Carregue /03-visual/IDENTIDADE-VISUAL.md e /04-design-system/theme.json antes de produzir qualquer peça visual.

Ao gerar ou montar uma imagem:
1. Use apenas as cores listadas nas tabelas do Sistema de cores.
2. Use apenas as fontes listadas nas tabelas de Tipografia, ou um substituto licenciado próximo indicado nessa seção.
3. Respeite os tokens de espaçamento, raio e sombra em qualquer interface.
4. Respeite as regras de movimento e de redução de movimento em qualquer peça animada.
5. Faça a checagem de acessibilidade antes de finalizar.

Se o pedido exigir cores, fontes ou movimento fora destes sistemas, pare e peça uma exceção a uma pessoa.
```

## Histórico de mudanças

| Data | Mudança | Autor |
| --- | --- | --- |
| 2026-02-10 | Versão inicial: Musgo, Terracota e Areia, Fraunces e Inter. | Bruna Alves |
| 2026-10-01 | Regra de contraste para texto branco sobre Terracota e neutras quentes. | Bruna Alves |
| 2026-10-13 | Escala tipográfica, espaçamento, raios, sombras, movimento, breakpoints, foco e uso do mono alinhados ao CSS do site. | Tiago Ramos |

Caminhos de referência: `/03-visual/IDENTIDADE-VISUAL.md`, `/03-visual/IMAGENS.md`, `/03-visual/PROMPTS-DE-IMAGEM.md`, `/04-design-system/DESIGN.md`, `/04-design-system/theme.json`.
