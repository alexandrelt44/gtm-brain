# Design system

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
2. **Uma camada fechada de tokens da qual a IA escolhe.** Em vez de centenas de valores hex e medidas em pixel espalhados pelos arquivos, um `tokens.css` com variáveis nomeadas. A IA não consegue inventar um azul novo porque o único azul que ela pode referenciar é `var(--color-brand)`.
3. **Um script de auditoria que pega o que a IA erra.** Uma tarefa de lint que varre o código atrás de valores fixos e sugere o token certo para cada violação. Roda no CI. `scripts/auditar-tokens.sh` é a implementação de referência que acompanha o modelo.
4. **Detecção de desvios em design systems de terceiros.** Se você depende de uma biblioteca de componentes (Atlaskit, Carbon, MUI, Radix, shadcn), uma rotina de sincronização marca seus arquivos de spec quando a biblioteca muda, para que as specs fiquem atualizadas em vez de envelhecer em silêncio.

Crédito do padrão: o estudo de Hardik Pandya, [Expose your design system to LLMs](https://hvpandya.com/llm-design-systems). Veja [`REFERENCIAS.md`](./REFERENCIAS.md) para os quatro design systems prontos para IA que valem o estudo.

## Arquitetura de tokens em três camadas

O formato que faz tudo isso funcionar é um arquivo de tokens com três camadas de indireção.

```css
/* Camada 1: tokens do design system de origem (valores brutos) */
--ds-text: #292A2E;
--ds-space-400: 16px;

/* Camada 2: apelidos do seu projeto, com o valor bruto como reserva */
--color-text: var(--ds-text, #292A2E);
--space-400:  var(--ds-space-400, 16px);

/* Camada 3: componentes só referenciam apelidos, nunca valores brutos */
color:   var(--color-text);
padding: var(--space-400);
```

A camada de apelidos é o que protege você. Se a biblioteca de origem renomeia um token, você atualiza um apelido. Modo escuro, alto contraste, temas futuros: a cadeia se resolve sozinha. Nenhum arquivo de componente toca num hex ou num pixel bruto.

O arquivo completo é o `tokens.css` desta pasta. Copie, troque os valores da Camada 1 pelos tokens do design system que você realmente usa (ou mantenha os valores brutos de reserva, se não usa nenhum) e mantenha os nomes dos apelidos da Camada 2, para que o resto da estrutura continue válido.

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

Veja [`specs/README.md`](./specs/README.md) para orientações de contribuição. O modelo já vem com exemplos prontos de `fundamentos/{cor,tipografia,espacamento,movimento}`, `tokens/tokens` e `atomos/{botao,campo}`. Siga o padrão e acrescente as specs dos componentes que o seu produto realmente usa.

## Checklist para agentes de IA

- [ ] `theme.json` é JSON válido, lido sem erros.
- [ ] `tokens.css` usa indireção em três camadas (tokens de origem, apelidos do projeto, componentes que só referenciam apelidos).
- [ ] `DESIGN.md` segue a spec aberta do Google Labs (ou uma estrutura equivalente documentada).
- [ ] A pasta `specs/` tem as specs de fundamentos e um arquivo por componente, cada um seguindo o modelo de 8 seções.
- [ ] Um script de auditoria de tokens roda no CI e reporta (ou bloqueia) qualquer valor fixo.
- [ ] As dependências de design systems de terceiros têm versão fixada e uma rotina de sincronização documentada.
- [ ] Os arquivos vivem no repositório de código, não presos dentro do Figma.
- [ ] O código em produção referencia os mesmos tokens (sem desvio entre a spec e o que foi publicado).
- [ ] Os agentes citam `/04-design-system/DESIGN.md`, `/04-design-system/theme.json` e `/04-design-system/tokens.css` ao gerar componentes.

A sua décima sessão com IA deve entregar a mesma qualidade visual da primeira. Se não entrega, o sistema está vazando em alguma dessas checagens.

Versão: 1.1.0
Última atualização: [AAAA-MM-DD]

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
- `--shadow-lg`
- `--motion-duration-base`

## Tokens de cor

### Marca

| Token | OKLCH | Hex |
| --- | --- | --- |
| `color.brand.primary` | `oklch(0.34 0.07 240)` | `#0B3A5B` |
| `color.brand.primary.hover` | `oklch(0.42 0.08 240)` | `#124D7A` |
| `color.brand.primary.fg` | `oklch(1.00 0 0)` | `#FFFFFF` |
| `color.brand.secondary` | `oklch(0.69 0.17 52)` | `#D97706` |
| `color.brand.secondary.hover` | `oklch(0.60 0.15 50)` | `#B45309` |
| `color.brand.secondary.fg` | `oklch(1.00 0 0)` | `#FFFFFF` |
| `color.accent.1` | `oklch(0.71 0.17 162)` | `#10B981` |
| `color.accent.2` | `oklch(0.60 0.20 270)` | `#6366F1` |

### Neutras

| Token | OKLCH | Hex |
| --- | --- | --- |
| `color.neutral.0` | `oklch(1.00 0 0)` | `#FFFFFF` |
| `color.neutral.50` | `oklch(0.98 0.01 240)` | `#F8FAFC` |
| `color.neutral.100` | `oklch(0.96 0.01 240)` | `#F1F5F9` |
| `color.neutral.200` | `oklch(0.92 0.02 240)` | `#E2E8F0` |
| `color.neutral.300` | `oklch(0.85 0.02 240)` | `#CBD5E1` |
| `color.neutral.400` | `oklch(0.72 0.03 240)` | `#94A3B8` |
| `color.neutral.500` | `oklch(0.55 0.03 240)` | `#64748B` |
| `color.neutral.700` | `oklch(0.35 0.03 240)` | `#334155` |
| `color.neutral.900` | `oklch(0.17 0.03 240)` | `#0F172A` |

### Semânticas

| Token | Hex |
| --- | --- |
| `color.semantic.success` | `#10B981` |
| `color.semantic.warning` | `#F59E0B` |
| `color.semantic.danger` | `#EF4444` |
| `color.semantic.info` | `#3B82F6` |

## Tokens de tipografia

| Token | Família | Tamanho (px) | Entrelinha | Peso | Espaçamento entre letras |
| --- | --- | --- | --- | --- | --- |
| `fs.display.xl` | Display | 72 | 1.05 | 700 | -0.02em |
| `fs.display.lg` | Display | 56 | 1.1 | 700 | -0.02em |
| `fs.h1` | Display | 44 | 1.15 | 700 | -0.01em |
| `fs.h2` | Display | 32 | 1.2 | 600 | 0 |
| `fs.h3` | Texto | 24 | 1.3 | 600 | 0 |
| `fs.h4` | Texto | 20 | 1.35 | 600 | 0 |
| `fs.body.lg` | Texto | 18 | 1.6 | 400 | 0 |
| `fs.body` | Texto | 16 | 1.6 | 400 | 0 |
| `fs.body.sm` | Texto | 14 | 1.55 | 400 | 0.005em |
| `fs.mono` | Mono | 14 | 1.55 | 400 | 0 |

## Tokens de espaçamento

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
| `space.10` | 40px |
| `space.12` | 48px |
| `space.16` | 64px |
| `space.20` | 80px |
| `space.24` | 96px |

## Tokens de raio

| Token | Valor |
| --- | --- |
| `radius.none` | 0 |
| `radius.sm` | 4px |
| `radius.md` | 8px |
| `radius.lg` | 16px |
| `radius.xl` | 24px |
| `radius.pill` | 9999px |

## Tokens de sombra

| Token | Valor |
| --- | --- |
| `shadow.sm` | `0 1px 2px 0 rgb(15 23 42 / 0.06)` |
| `shadow.md` | `0 4px 8px -2px rgb(15 23 42 / 0.08), 0 2px 4px -2px rgb(15 23 42 / 0.06)` |
| `shadow.lg` | `0 12px 24px -8px rgb(15 23 42 / 0.12), 0 4px 8px -4px rgb(15 23 42 / 0.08)` |
| `shadow.xl` | `0 24px 48px -12px rgb(15 23 42 / 0.18)` |

## Tokens de movimento

| Token | Valor |
| --- | --- |
| `motion.duration.fast` | 120ms |
| `motion.duration.base` | 180ms |
| `motion.duration.medium` | 240ms |
| `motion.duration.slow` | 320ms |
| `motion.easing.enter` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `motion.easing.exit` | `cubic-bezier(0.2, 0.8, 0.2, 1)` |

## Tokens de breakpoint

| Token | Largura mínima |
| --- | --- |
| `bp.sm` | 640px |
| `bp.md` | 768px |
| `bp.lg` | 1024px |
| `bp.xl` | 1280px |
| `bp.2xl` | 1536px |

## Referência de variáveis CSS

Cole na folha de estilo global de qualquer projeto web. Os nomes dos tokens correspondem um a um aos de `theme.json`.

```css
:root {
  --color-brand-primary: oklch(0.34 0.07 240);
  --color-brand-primary-hover: oklch(0.42 0.08 240);
  --color-brand-primary-fg: oklch(1.00 0 0);
  --color-brand-secondary: oklch(0.69 0.17 52);
  --color-accent-1: oklch(0.71 0.17 162);
  --color-accent-2: oklch(0.60 0.20 270);

  --color-neutral-0: oklch(1.00 0 0);
  --color-neutral-50: oklch(0.98 0.01 240);
  --color-neutral-100: oklch(0.96 0.01 240);
  --color-neutral-200: oklch(0.92 0.02 240);
  --color-neutral-500: oklch(0.55 0.03 240);
  --color-neutral-700: oklch(0.35 0.03 240);
  --color-neutral-900: oklch(0.17 0.03 240);

  --color-semantic-success: #10B981;
  --color-semantic-warning: #F59E0B;
  --color-semantic-danger: #EF4444;
  --color-semantic-info: #3B82F6;

  --fs-body: 16px;
  --fs-h1: 44px;
  --fs-h2: 32px;
  --fs-h3: 24px;

  --space-1: 4px;
  --space-2: 8px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;

  --radius-md: 8px;
  --radius-lg: 16px;

  --shadow-sm: 0 1px 2px 0 rgb(15 23 42 / 0.06);
  --shadow-md: 0 4px 8px -2px rgb(15 23 42 / 0.08), 0 2px 4px -2px rgb(15 23 42 / 0.06);

  --motion-duration-base: 180ms;
  --motion-easing-enter: cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Como os componentes devem ser construídos

### Botão

- Use `--color-brand-primary` como fundo padrão.
- O texto usa `--color-brand-primary-fg`.
- O espaçamento interno é `--space-3` na vertical e `--space-5` na horizontal.
- O raio é `--radius-md`.
- No hover, o fundo troca para `--color-brand-primary-hover`.
- Estado de foco: anel externo de 2 px com `--color-brand-primary`, afastado 2 px.
- Estado desabilitado: 40% de opacidade, cursor not-allowed.
- O botão secundário usa `--color-brand-secondary`. O botão fantasma usa fundo `transparent` e texto `--color-brand-primary`, com borda de 1 px.

### Campo de texto

- O fundo é `--color-neutral-0`.
- A borda é de 1 px com `--color-neutral-200`.
- O raio é `--radius-md`.
- O espaçamento interno é `--space-3` na vertical e `--space-4` na horizontal.
- O texto de placeholder usa `--color-neutral-500`.
- O anel de foco é de 2 px com `--color-brand-primary`, afastado 2 px.
- O estado de erro usa `--color-semantic-danger` na borda e no texto de ajuda.

### Card

- O fundo é `--color-neutral-0`.
- A borda é de 1 px com `--color-neutral-200`.
- O raio é `--radius-lg`.
- O espaçamento interno é `--space-6`.
- A sombra começa em `--shadow-sm` e sobe para `--shadow-md` no hover, se o card for interativo.

### Link

- A cor padrão é `--color-brand-primary`.
- Sublinhado no hover. Não sublinhe por padrão no texto corrido, a não ser que o link esteja dentro de um parágrafo que exija.
- Links visitados usam a mesma cor por padrão. Mude só em contextos editoriais.

### Badge

- O fundo é `--color-neutral-100`.
- O texto é `--color-neutral-700`.
- O raio é `--radius-pill`.
- O espaçamento interno é `--space-1` na vertical e `--space-3` na horizontal.
- A tipografia é `fs-body-sm`, peso 500.

### Alerta

- Sucesso usa `--color-semantic-success` com fundo suave e texto escuro.
- Aviso usa `--color-semantic-warning`.
- Perigo usa `--color-semantic-danger`.
- Informação usa `--color-semantic-info`.
- Cada alerta tem um ícone à esquerda, um título com peso 600 e uma descrição curta com peso 400.

### Navegação

- A cor padrão dos links é `--color-neutral-700`.
- O link ativo usa `--color-brand-primary`, com sublinhado de 2 px na mesma cor.
- A navegação no celular é um painel que desliza da direita, respeitando a redução de movimento.

## Componentes: faça e não faça

- **Faça** referência a tokens, não a valores.
- **Faça** uso das cores semânticas só para status.
- **Não** invente novos valores hex num arquivo de componente.
- **Não** use sombra para dar ênfase quando uma borda resolve.
- **Não** use mais de um token de sombra no mesmo componente.

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
| [AAAA-MM-DD] | 1.0.0 | Versão inicial. | [Nome] |

## Ferramentas recomendadas

- `theme.json` na raiz do repositório do seu projeto: um formato que ferramentas de código com IA (Cursor, v0, Lovable, Bolt) conseguem ler sem esforço.
- [`tokens.css`](./tokens.css) com indireção em três camadas: a fonte oficial dos apelidos da Camada 2 que os componentes consomem.
- [Google Stitch](https://stitch.withgoogle.com/) (gratuito, Google Labs) para gerar ou validar um `DESIGN.md` contra a spec aberta.
- **FigmaLint** (plugin gratuito do Figma, de TJ Pitre) para auditar a fonte da verdade no Figma em busca de valores fixos, instâncias desvinculadas, estados interativos faltando e tokens não aplicados, antes que cheguem ao código. Faz par com `scripts/auditar-tokens.sh` no lado do código.
- O seu próprio **script de auditoria de tokens**. O modelo traz [`scripts/auditar-tokens.sh`](../scripts/auditar-tokens.sh) como implementação de referência. Ligue no CI para que nenhum desvio entre no código.
- [Style Dictionary](https://amzn.github.io/style-dictionary/) (gratuito) se você compila tokens para várias plataformas.
- [Storybook](https://storybook.js.org/) (gratuito) se você mantém uma biblioteca de componentes.

Caminhos de referência: `/04-design-system/DESIGN.md`, `/04-design-system/theme.json`, `/04-design-system/tokens.css`, `/04-design-system/specs/`, `/04-design-system/REFERENCIAS.md`, `/03-visual/IDENTIDADE-VISUAL.md`, `/scripts/auditar-tokens.sh`.
