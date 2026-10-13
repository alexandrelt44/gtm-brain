# Design system

> Exemplo fictício. A Cadência e todas as pessoas e empresas citadas não existem.

Fontes citadas neste arquivo:

- `[CSS]` export das variáveis e dos componentes do CSS do site (`src/styles/global.css`), feito por Tiago Ramos em 2026-10-02
- `[CONVERSA 2026-10-13]` respostas de Marina Duarte, CEO, sobre o design system

Design system da Cadência: os tokens que o site no ar já usa, em formato que um agente de código lê. As cores e as famílias vêm de `/03-visual/IDENTIDADE-VISUAL.md` e batem com o CSS do site; tamanhos, raios, sombras, movimento, breakpoints e componentes vêm do CSS do site `[CSS]`. Onde o CSS e a IDENTIDADE discordavam, vale o CSS: "registrar o que o site já usa" `[CONVERSA 2026-10-13]`. As diferenças que ficaram para corrigir na IDENTIDADE estão em `## Pendências deste design system`.

## Como usar este arquivo

- **O que entra:** a codificação da identidade visual em formato legível por máquina. Os tokens em Markdown espelham o JSON de `theme.json`. Este arquivo também documenta como os componentes devem ser construídos a partir desses tokens.
- **Como os agentes leem:** agentes de layout, de geração de código e montadores de tema de CMS carregam `DESIGN.md` e `theme.json` para montar componentes dentro da marca sem ler o guia de identidade visual.
- **Frequência de atualização:** atualize junto com `/03-visual/IDENTIDADE-VISUAL.md`. Toda mudança de token precisa aparecer nos dois arquivos e em `theme.json`.
- **Spec aberta relacionada:** o Google Labs [abriu um rascunho de especificação do DESIGN.md](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/) pela ferramenta de design Stitch em abril de 2026. Este modelo é compatível no espírito (tokens legíveis por máquina, atenção ao WCAG, intenção de cada componente por extenso). Adote as seções mais rígidas da spec do Stitch conforme ela se estabilizar, para ganhar portabilidade entre plataformas.
- **Arquivos irmãos nesta pasta:**
  - [`theme.json`](./theme.json): tokens em JSON, para ferramentas que preferem JSON.
  - [`tokens.css`](./tokens.css): o arquivo de variáveis CSS em três camadas que os componentes consomem.
  - [`MODELO-DE-SPEC.md`](./MODELO-DE-SPEC.md): o modelo de 8 seções que toda spec de componente segue.
  - [`specs/`](./specs/): fundamentos, tokens, átomos, moléculas, organismos, padrões.
  - [`REFERENCIAS.md`](./REFERENCIAS.md): design systems prontos para IA que valem o estudo.

## As quatro coisas de que um design system precisa para estar pronto para IA

Numa única sessão de programação com IA, o modelo toma centenas de decisões visuais em silêncio: qual espaçamento interno, qual tom de azul, qual raio de borda, qual peso de fonte. Cada decisão parece boa isolada. Depois de centenas delas, o protótipo está estranho e você não sabe dizer por quê. Na sessão seguinte, o modelo começa do zero, sem memória das escolhas de ontem, e escolhe tudo de novo. Na décima sessão, parece que três times que nunca se falaram fizeram três produtos.

Um design system está pronto para IA quando restringe cada uma dessas decisões:

1. **Arquivos de spec que a IA lê em toda sessão.** Documentos Markdown estruturados para os fundamentos (cor, espaçamento, tipografia, movimento) e para cada componente. Resolve o problema da memória. Se a spec não existe, a IA chuta. Se existe, a IA consulta. A pasta `specs/` é a implementação dessa regra.
2. **Uma camada fechada de tokens da qual a IA escolhe.** Em vez de centenas de valores hex e medidas em pixel espalhados pelos arquivos, um `tokens.css` com variáveis nomeadas. A IA não consegue inventar um verde novo porque o único verde que ela pode referenciar é `var(--color-brand)`.
3. **Um script de auditoria que pega o que a IA erra.** Uma tarefa de lint que varre o código atrás de valores fixos e sugere o token certo para cada violação. Roda no CI. `scripts/auditar-tokens.sh` é a implementação de referência que acompanha o modelo.
4. **Detecção de desvios em design systems de terceiros.** Se você depende de uma biblioteca de componentes (Atlaskit, Carbon, MUI, Radix, shadcn), uma rotina de sincronização marca seus arquivos de spec quando a biblioteca muda, para que as specs fiquem atualizadas em vez de envelhecer em silêncio. A Cadência não usa biblioteca de terceiros: a origem dos tokens é o `global.css` do próprio site `[CSS]`.

Crédito do padrão: o estudo de Hardik Pandya, [Expose your design system to LLMs](https://hvpandya.com/llm-design-systems). Veja [`REFERENCIAS.md`](./REFERENCIAS.md) para os quatro design systems prontos para IA que valem o estudo.

## Arquitetura de tokens em três camadas

O formato que faz tudo isso funcionar é um arquivo de tokens com três camadas de indireção.

```css
/* Camada 1: tokens do design system de origem (valores brutos) */
--ds-color-neutral-700: oklch(0.34 0.01 72);
--ds-space-400: 16px;

/* Camada 2: apelidos do seu projeto, com o valor bruto como reserva */
--color-text: var(--ds-color-neutral-700, #3D3832);
--space-400:  var(--ds-space-400, 16px);

/* Camada 3: componentes só referenciam apelidos, nunca valores brutos */
color:   var(--color-text);
padding: var(--space-400);
```

A camada de apelidos é o que protege você. Se a origem renomeia um token, você atualiza um apelido. Alto contraste e temas futuros: a cadeia se resolve sozinha. Nenhum arquivo de componente toca num hex ou num pixel bruto.

O arquivo completo é o `tokens.css` desta pasta. Na Cadência, a Camada 1 traz os valores brutos do `global.css` do site, e a reserva de cada apelido da Camada 2 é o mesmo valor.

## Hierarquia dos arquivos de spec

As specs são organizadas em seis níveis, para que a IA encontre o que precisa num lugar previsível.

```
specs/
├── fundamentos/        cor, tipografia, espaçamento, movimento
├── tokens/             mapa mestre de cada variável CSS e de quando usar
├── atomos/             botão, campo, ícone, avatar, badge
├── moleculas/          abas, menu suspenso, modal, formulário, tooltip
├── organismos/         navegação, tabela, cabeçalho de página, painel de conteúdo
└── padroes/            regras de layout, layout de formulário, três colunas, tratamento de erros
```

Toda spec de componente segue o mesmo modelo de 8 seções: metadados, visão geral, anatomia, tokens usados, props, estados, exemplo de código, referências cruzadas. A consistência é o ponto. Quando uma IA monta um formulário, ela lê `padroes/layout-de-formulario.md` para o espaçamento, `moleculas/formulario.md` para a estrutura, `atomos/campo.md` para os campos e `tokens/tokens.md` para os valores exatos. Cada escolha é uma consulta, não um chute.

Na Cadência, a pasta `specs/` ainda é a do modelo, com valores genéricos que não são da marca: até ela ser ajustada, os valores valem deste arquivo e de `theme.json`, nunca de `specs/`. Faltam as specs de tabela de preços e de cartão de depoimento, que o site usa sem spec escrita `[CSS]`; ficam com Bruna Alves até dezembro de 2026 `[CONVERSA 2026-10-13]` [PENDENTE: Bruna Alves, specs de tabela de preços e cartão de depoimento, até dezembro de 2026]. Ajustar `fundamentos/cor.md` e `fundamentos/tipografia.md` aos valores da Cadência não foi decidido [PENDENTE: Marina Duarte decide se as specs vão ser usadas com um agente de código].

## Checklist para agentes de IA

- [x] `theme.json` é JSON válido, lido sem erros.
- [x] `tokens.css` usa indireção em três camadas (tokens de origem, apelidos do projeto, componentes que só referenciam apelidos).
- [x] `DESIGN.md` segue a spec aberta do Google Labs (ou uma estrutura equivalente documentada).
- [ ] A pasta `specs/` tem as specs de fundamentos e um arquivo por componente, cada um seguindo o modelo de 8 seções.
- [ ] Um script de auditoria de tokens roda no CI e reporta (ou bloqueia) qualquer valor fixo.
- [ ] As dependências de design systems de terceiros têm versão fixada e uma rotina de sincronização documentada.
- [ ] Os arquivos vivem no repositório de código, não presos dentro do Figma.
- [ ] O código em produção referencia os mesmos tokens (sem desvio entre a spec e o que foi publicado).
- [ ] Os agentes citam `/04-design-system/DESIGN.md`, `/04-design-system/theme.json` e `/04-design-system/tokens.css` ao gerar componentes.

A sua décima sessão com IA deve entregar a mesma qualidade visual da primeira. Se não entrega, o sistema está vazando em alguma dessas checagens.

Versão: 1.0.0
Última atualização: 2026-10-13
Autor principal: Marina Duarte (decisões), com o export do CSS de Tiago Ramos

---

## Nomenclatura de tokens

- Os tokens usam um nome de três partes separadas por hífen: `[categoria]-[função]-[modificador]`.
- Categorias: `color`, `fs`, `space`, `radius`, `shadow`, `motion`, `bp`.
- Funções descrevem a intenção: `brand`, `neutral`, `semantic`.
- Modificadores descrevem escala ou estado: `primary`, `hover`, `fg`, `50`, `100`.

Os nomes dos tokens ficam em inglês, como no código. Exemplos:

- `--color-brand-primary`
- `--color-brand-primary-hover`
- `--color-brand-primary-fg`
- `--color-neutral-500`
- `--fs-body`
- `--space-4`
- `--radius-md`
- `--shadow-md`
- `--motion-duration-base`

## Tokens de cor

Mesmos valores de `/03-visual/IDENTIDADE-VISUAL.md`; OKLCH conferido com o script de `visual-e-design.md`. O CSS do site usa essas cores `[CSS]`.

### Marca

| Token | OKLCH | Hex |
| --- | --- | --- |
| `color.brand.primary` | `oklch(0.38 0.04 158)` | `#2F4A3A` |
| `color.brand.primary.hover` | `oklch(0.33 0.04 158)` | `#243A2D` |
| `color.brand.primary.fg` | `oklch(1.00 0 0)` | `#FFFFFF` |
| `color.brand.secondary` | `oklch(0.61 0.13 41)` | `#C4643F` |
| `color.brand.secondary.hover` | `oklch(0.54 0.12 42)` | `#A85331` |
| `color.brand.secondary.fg` | `oklch(1.00 0 0)` | `#FFFFFF` |
| `color.accent.1` | `oklch(0.94 0.02 80)` | `#F1E9DC` |
| `color.accent.2` | `oklch(0.65 0.07 136)` | `#7C9A6E` |

### Neutras

A Cadência não usa as neutras 300 e 400 `[CSS]` `[CONVERSA 2026-10-13]`.

| Token | OKLCH | Hex |
| --- | --- | --- |
| `color.neutral.0` | `oklch(0.98 0.01 81)` | `#FBF8F3` |
| `color.neutral.50` | `oklch(1.00 0 0)` | `#FFFFFF` |
| `color.neutral.100` | `oklch(0.94 0.02 80)` | `#F1E9DC` |
| `color.neutral.200` | `oklch(0.89 0.02 78)` | `#E4DACB` |
| `color.neutral.500` | `oklch(0.50 0.02 67)` | `#6B6259` |
| `color.neutral.700` | `oklch(0.34 0.01 72)` | `#3D3832` |
| `color.neutral.900` | `oklch(0.23 0.01 67)` | `#211D19` |

### Semânticas

| Token | Hex |
| --- | --- |
| `color.semantic.success` | `#3F7A57` |
| `color.semantic.warning` | `#C98A1B` |
| `color.semantic.danger` | `#B23A2E` |
| `color.semantic.info` | `#3B6E8F` |

### Contraste das combinações que o site usa

Calculado com o script de `visual-e-design.md`. Mínimo WCAG AA: 4,5:1 para texto, 3:1 para texto grande (24 px, ou 18,7 px, que é 14 pt, em negrito) e para contorno de componente.

| Combinação | Onde | Contraste | Passa |
| --- | --- | --- | --- |
| Branco sobre Musgo `#2F4A3A` | Botão primário | 9,7:1 | Sim |
| Branco sobre `#243A2D` | Hover do botão primário | 12,2:1 | Sim |
| Branco sobre Terracota `#C4643F` | Botão de destaque | 4,0:1 | Só texto grande. Ver pendências |
| Terracota escuro `#A85331` sobre `#FBF8F3` | Anel de foco na página | 5,0:1 | Sim |
| Terracota escuro `#A85331` sobre branco | Anel de foco no card | 5,3:1 | Sim |
| Musgo sobre `#FBF8F3` | Borda do botão secundário | 9,2:1 | Sim |
| `#3D3832` sobre `#FBF8F3` | Texto corrido | 11,0:1 | Sim |
| `#211D19` sobre `#FBF8F3` | Títulos | 15,8:1 | Sim |
| `#6B6259` sobre `#FBF8F3` | Texto secundário | 5,6:1 | Sim |
| `#3D3832` sobre Areia `#F1E9DC` | Badge | 9,6:1 | Sim |
| `#B23A2E` sobre branco | Borda e mensagem de erro do campo | 5,9:1 | Sim |
| Borda `#E4DACB` sobre branco | Borda do campo | 1,4:1 | Não. Ver pendências |
| Borda `#E4DACB` sobre `#FBF8F3` | Borda do card | 1,3:1 | Decorativa: o card não é controle |

## Tokens de tipografia

Fraunces 600 nos títulos, Inter 400, 500 e 600 no texto, JetBrains Mono 14 px só no código de UTM e nas tabelas de preço `[CSS]`. Pilhas de fallback de `/03-visual/IDENTIDADE-VISUAL.md`. O site não tem tamanhos de destaque acima do `h1` nem texto de abertura maior que o corpo `[CSS]`.

| Token | Família | Tamanho (px) | Entrelinha | Peso | Espaçamento entre letras |
| --- | --- | --- | --- | --- | --- |
| `fs.h1` | Fraunces | 48 (celular 34) | a confirmar | 600 | a confirmar |
| `fs.h2` | Fraunces | 36 (celular 28) | a confirmar | 600 | a confirmar |
| `fs.h3` | Fraunces | 28 (celular 24) | a confirmar | 600 | a confirmar |
| `fs.h4` | Fraunces | 22 (celular 20) | a confirmar | 600 | a confirmar |
| `fs.body` | Inter | 17 | 1.6 | 400 | a confirmar |
| `fs.button` | Inter | 16 | a confirmar | 600 | a confirmar |
| `fs.badge` | Inter | 13 | a confirmar | 500 | a confirmar |
| `fs.mono` | JetBrains Mono | 14 | a confirmar | 400 | a confirmar |

Entrelinha e espaçamento entre letras ficam fora do export do CSS [PENDENTE: Tiago Ramos, tirar de `src/styles/global.css`]. Em `theme.json` eles estão como `null`. O breakpoint em que os títulos trocam para o tamanho de celular também não está no export [PENDENTE: Tiago Ramos, `src/styles/global.css`].

## Tokens de espaçamento

Base de 4 px `[CSS]`. A escala do site é 4, 8, 12, 16, 24, 32, 48, 64 e 96; o botão usa ainda 20 px de espaçamento lateral, por isso `space.5` existe `[CSS]`.

| Token | Valor |
| --- | --- |
| `space.0` | 0 |
| `space.1` | 4px |
| `space.2` | 8px |
| `space.3` | 12px |
| `space.4` | 16px |
| `space.5` | 20px |
| `space.6` | 24px |
| `space.8` | 32px |
| `space.12` | 48px |
| `space.16` | 64px |
| `space.24` | 96px |

Layout: conteúdo até 1200 px de largura; texto corrido até 68 caracteres por linha `[CSS]`.

## Tokens de raio

| Token | Valor | Uso no site `[CSS]` |
| --- | --- | --- |
| `radius.md` | 8px | Botão, campo |
| `radius.lg` | 12px | Card |
| `radius.xl` | 16px | Imagem de case |
| `radius.pill` | 999px | Badge |

## Tokens de sombra

Sombras no tom do `#211D19`, não em cinza azulado `[CSS]`.

| Token | Valor | Uso no site `[CSS]` |
| --- | --- | --- |
| `shadow.sm` | `0 1px 2px rgba(33,29,25,.06), 0 2px 8px rgba(33,29,25,.06)` | Card |
| `shadow.md` | `0 8px 24px rgba(33,29,25,.12)` | Menu e modal |

## Tokens de movimento

Respeita `prefers-reduced-motion` `[CSS]`.

| Token | Valor | Uso no site `[CSS]` |
| --- | --- | --- |
| `motion.duration.base` | 150ms | Hover e foco |
| `motion.duration.medium` | 250ms | Abrir menu e modal |
| `motion.easing.enter` | `ease-out` | As duas durações |

## Tokens de breakpoint

| Token | Largura mínima |
| --- | --- |
| `bp.sm` | 640px |
| `bp.lg` | 1024px |
| `bp.xl` | 1280px |

O site usa só esses três `[CSS]`.

## Referência de variáveis CSS

Cole na folha de estilo global de qualquer projeto web. Os nomes dos tokens correspondem um a um aos de `theme.json`; a versão em três camadas é o `tokens.css`.

```css
:root {
  --color-brand-primary: oklch(0.38 0.04 158);
  --color-brand-primary-hover: oklch(0.33 0.04 158);
  --color-brand-primary-fg: oklch(1.00 0 0);
  --color-brand-secondary: oklch(0.61 0.13 41);
  --color-brand-secondary-hover: oklch(0.54 0.12 42);
  --color-accent-1: oklch(0.94 0.02 80);
  --color-accent-2: oklch(0.65 0.07 136);

  --color-neutral-0: oklch(0.98 0.01 81);
  --color-neutral-50: oklch(1.00 0 0);
  --color-neutral-100: oklch(0.94 0.02 80);
  --color-neutral-200: oklch(0.89 0.02 78);
  --color-neutral-500: oklch(0.50 0.02 67);
  --color-neutral-700: oklch(0.34 0.01 72);
  --color-neutral-900: oklch(0.23 0.01 67);

  --color-semantic-success: #3F7A57;
  --color-semantic-warning: #C98A1B;
  --color-semantic-danger: #B23A2E;
  --color-semantic-info: #3B6E8F;

  --fs-body: 17px;
  --fs-h1: 48px;
  --fs-h2: 36px;
  --fs-h3: 28px;
  --fs-h4: 22px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;

  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-pill: 999px;

  --shadow-sm: 0 1px 2px rgba(33,29,25,.06), 0 2px 8px rgba(33,29,25,.06);
  --shadow-md: 0 8px 24px rgba(33,29,25,.12);

  --motion-duration-base: 150ms;
  --motion-easing-enter: ease-out;
}
```

## Como os componentes devem ser construídos

Tudo nesta seção está no site hoje `[CSS]`, salvo o que está marcado como pendente.

### Botão

- **Primário:** fundo `--color-brand-primary` (Musgo), texto `--color-brand-primary-fg`, Inter 600 16 px (`--fs-button`).
- Altura de 44 px; espaçamento interno 0 na vertical e `--space-5` (20 px) na horizontal.
- O raio é `--radius-md`.
- No hover, o fundo troca para `--color-brand-primary-hover`, em `--motion-duration-base` com `ease-out`.
- Estado de foco: anel de 2 px em Terracota escuro (`--color-brand-secondary-hover`), afastado 2 px.
- **Secundário:** borda de 1,5 px em Musgo, fundo `transparent`. Cor do texto fora do export [PENDENTE: Tiago Ramos, `src/styles/global.css`].
- **Destaque:** fundo `--color-brand-secondary` (Terracota), texto branco. Só no "Começar o teste grátis" do topo da página e só em texto grande. Ver pendências: 18 px negrito não basta.
- Estado desabilitado: fora do export [PENDENTE: Tiago Ramos, `src/styles/global.css`].

### Campo de texto

- Altura de 44 px.
- A borda é de 1 px com `--color-neutral-200` (`#E4DACB`). Ver pendências: 1,4:1 contra o branco.
- O raio é `--radius-md`.
- O anel de foco é de 2 px em Terracota escuro, afastado 2 px.
- O estado de erro usa `--color-semantic-danger` (`#B23A2E`) na borda e no texto, com a mensagem abaixo do campo.
- Fundo, espaçamento interno e cor do placeholder ficam fora do export [PENDENTE: Tiago Ramos, `src/styles/global.css`].

### Card

- O fundo é `--color-neutral-50` (branco), sobre a página em `--color-neutral-0` (`#FBF8F3`).
- A borda é de 1 px com `--color-neutral-200`.
- O raio é `--radius-lg` (12 px).
- O espaçamento interno é `--space-6` (24 px).
- A sombra é `--shadow-sm`.

### Link

- Estilo do link (cor, sublinhado, hover) fora do export [PENDENTE: Tiago Ramos, `src/styles/global.css`].

### Badge

- Pílula: raio `--radius-pill`.
- O fundo é Areia (`--color-accent-1`).
- O texto é `--color-neutral-700` (`#3D3832`), Inter 500 13 px (`--fs-badge`).
- Espaçamento interno fora do export [PENDENTE: Tiago Ramos, `src/styles/global.css`].

### Alerta

- Faixa com borda esquerda de 4 px na cor semântica e fundo na mesma cor a 10%.
- Sucesso usa `--color-semantic-success`, aviso `--color-semantic-warning`, perigo `--color-semantic-danger`, informação `--color-semantic-info`.
- Cor nunca sozinha: junte a cor a um ícone ou a um rótulo (`/03-visual/IDENTIDADE-VISUAL.md`, Acessibilidade).

### Navegação

- Barra fixa branca, logo à esquerda, cinco links e o botão "Começar o teste grátis" à direita.
- No celular, menu em gaveta.
- Cor dos links e do link ativo fora do export [PENDENTE: Tiago Ramos, `src/styles/global.css`].

### Menu e modal

- Sombra `--shadow-md`; abrem em `--motion-duration-medium` (250 ms) com `ease-out`.
- Raio fora do export [PENDENTE: Tiago Ramos, `src/styles/global.css`].

### Tabela de preços e cartão de depoimento

- Existem no site, sem spec escrita `[CSS]` [PENDENTE: Bruna Alves, até dezembro de 2026].

## Componentes: faça e não faça

- **Faça** referência a tokens, não a valores.
- **Faça** uso das cores semânticas só para status.
- **Não** invente novos valores hex num arquivo de componente.
- **Não** use sombra para dar ênfase quando uma borda resolve.
- **Não** use mais de um token de sombra no mesmo componente.
- **Não** crie modo escuro. A Cadência não tem, nem no site nem no app `[CSS]` `[CONVERSA 2026-10-13]`.
- **Não** use a Terracota de fundo com texto branco pequeno. Para texto pequeno, use `#A85331`.

## Pendências deste design system

- **Botão de destaque abaixo do contraste.** Branco sobre Terracota dá 4,0:1. Isso só passa como texto grande, que é 24 px, ou 18,7 px (14 pt) em negrito; o site libera a partir de 18 px negrito `[CSS]`. Opções: subir para 19 px negrito ou trocar o fundo para `#A85331` (5,3:1) [PENDENTE: Bruna Alves e Tiago Ramos decidem].
- **Borda do campo abaixo do contraste.** `#E4DACB` sobre branco dá 1,4:1; o contorno que identifica um campo pede 3:1. `[PROPOSTA]` usar `#6B6259` na borda do campo (6,0:1 sobre branco) [PENDENTE: Bruna Alves e Tiago Ramos decidem].
- **Valores fora do export do CSS:** entrelinha e espaçamento entre letras, breakpoint dos títulos de celular, cor do texto do botão secundário, estado desabilitado, fundo e placeholder do campo, estilo do link e da navegação, raio do modal, espaçamento do badge [PENDENTE: Tiago Ramos, `src/styles/global.css`].
- **Specs:** tabela de preços e cartão de depoimento com Bruna Alves até dezembro de 2026; ajuste de `specs/fundamentos/` sem decisão [PENDENTE: Marina Duarte].
- **`/03-visual/IDENTIDADE-VISUAL.md`** foi alinhada a este arquivo em 2026-10-13: escala tipográfica, raios, sombras, movimento, breakpoints, anel de foco e uso do mono agora são os do site `[CSS]`.

## Como passar este arquivo para um agente de IA

```text
Carregue /04-design-system/DESIGN.md e /04-design-system/theme.json antes de gerar qualquer código de interface.

Ao escrever um componente:
1. Use variáveis CSS que correspondam aos nomes dos tokens em theme.json.
2. Não fixe no código cores, tamanhos de fonte nem valores de espaçamento.
3. Todo componente interativo tem estado de foco e estado desabilitado.
4. Toda cor de texto forma par com uma cor de fundo que passa no WCAG 2.2 nível AA.
5. Respeite os tokens de movimento e o prefers-reduced-motion.

Cite /04-design-system/DESIGN.md no comentário de cabeçalho de todo arquivo de componente gerado.
```

## Histórico de mudanças

| Data | Versão | Mudança | Autor |
| --- | --- | --- | --- |
| 2026-10-13 | 1.0.0 | Primeira versão da Cadência: tokens tirados do CSS do site no ar e cores da identidade visual; sem modo escuro; pendências de contraste e de valores fora do export. | Marina Duarte, com o export do CSS de Tiago Ramos |

## Ferramentas recomendadas

- `theme.json` na raiz do repositório do seu projeto: um formato que ferramentas de código com IA (Cursor, v0, Lovable, Bolt) conseguem ler sem esforço.
- [`tokens.css`](./tokens.css) com indireção em três camadas: a fonte oficial dos apelidos da Camada 2 que os componentes consomem.
- [Google Stitch](https://stitch.withgoogle.com/) (gratuito, Google Labs) para gerar ou validar um `DESIGN.md` contra a spec aberta.
- **FigmaLint** (plugin gratuito do Figma, de TJ Pitre) para auditar a fonte da verdade no Figma em busca de valores fixos, instâncias desvinculadas, estados interativos faltando e tokens não aplicados, antes que cheguem ao código. Faz par com `scripts/auditar-tokens.sh` no lado do código.
- O seu próprio **script de auditoria de tokens**. O modelo traz [`scripts/auditar-tokens.sh`](../scripts/auditar-tokens.sh) como implementação de referência. Ligue no CI para que nenhum desvio entre no código.
- [Style Dictionary](https://amzn.github.io/style-dictionary/) (gratuito) se você compila tokens para várias plataformas.
- [Storybook](https://storybook.js.org/) (gratuito) se você mantém uma biblioteca de componentes.

Caminhos de referência: `/04-design-system/DESIGN.md`, `/04-design-system/theme.json`, `/04-design-system/tokens.css`, `/04-design-system/specs/`, `/04-design-system/REFERENCIAS.md`, `/03-visual/IDENTIDADE-VISUAL.md`, `/scripts/auditar-tokens.sh`.
