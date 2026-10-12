# Identidade visual

## Como usar este arquivo

- **O que entra:** toda regra sobre como a marca aparece visualmente. Logo, cor, tipografia, espaçamento, raio, sombra, movimento, acessibilidade.
- **Como os agentes leem:** geradores de imagem, designers e agentes de layout tiram as regras daqui. Os tokens de design em `/04-design-system/theme.json` são derivados deste arquivo.
- **Frequência de atualização:** revise uma vez por ano. Registre toda mudança com data no histórico no fim do arquivo.

## Checklist para agentes de IA

- [ ] Legível por máquina: regras expressas em tabelas de tokens.
- [ ] Estruturado: um sistema por H2 (logo, cor, tipografia, espaçamento, raio, sombra, movimento, acessibilidade).
- [ ] Fonte única da verdade: pareado com `/04-design-system/theme.json`.
- [ ] Versionado: data da última atualização e histórico de mudanças.
- [ ] Citável: agentes citam `/03-visual/IDENTIDADE-VISUAL.md` ao produzir peças visuais.

Última atualização: [AAAA-MM-DD]

---

## Sistema de logo

### Logo principal

- **Arquivo:** `/03-visual/assets/logo-principal.svg`
- **Uso:** marca padrão no digital e no impresso, sempre que houver área de respiro e escala suficientes.
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
- **Uso:** favicon, avatares de redes sociais, ícones de app, telas de carregamento.
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
| `--color-brand-primary` | Elementos de destaque do topo, CTA principal | `#0B3A5B` | `11, 58, 91` | `207, 78%, 20%` | `oklch(0.34 0.07 240)` |
| `--color-brand-primary-hover` | Estado hover da primária | `#124D7A` | `18, 77, 122` | `209, 74%, 27%` | `oklch(0.42 0.08 240)` |
| `--color-brand-primary-fg` | Texto sobre a primária | `#FFFFFF` | `255, 255, 255` | `0, 0%, 100%` | `oklch(1.00 0 0)` |

### Secundária

| Token | Função | Hex | RGB | HSL | OKLCH |
| --- | --- | --- | --- | --- | --- |
| `--color-brand-secondary` | Elementos de apoio | `#D97706` | `217, 119, 6` | `31, 95%, 44%` | `oklch(0.69 0.17 52)` |
| `--color-brand-secondary-hover` | Estado hover da secundária | `#B45309` | `180, 83, 9` | `29, 91%, 37%` | `oklch(0.60 0.15 50)` |
| `--color-brand-secondary-fg` | Texto sobre a secundária | `#FFFFFF` | `255, 255, 255` | `0, 0%, 100%` | `oklch(1.00 0 0)` |

### Destaque

| Token | Função | Hex | RGB | HSL | OKLCH |
| --- | --- | --- | --- | --- | --- |
| `--color-accent-1` | Realce, etiqueta, chamada | `#10B981` | `16, 185, 129` | `160, 84%, 39%` | `oklch(0.71 0.17 162)` |
| `--color-accent-2` | Série secundária de gráficos | `#6366F1` | `99, 102, 241` | `239, 84%, 67%` | `oklch(0.60 0.20 270)` |

### Neutras

| Token | Função | Hex | RGB | OKLCH |
| --- | --- | --- | --- | --- |
| `--color-neutral-0` | Fundo da página | `#FFFFFF` | `255, 255, 255` | `oklch(1.00 0 0)` |
| `--color-neutral-50` | Fundo de card | `#F8FAFC` | `248, 250, 252` | `oklch(0.98 0.01 240)` |
| `--color-neutral-100` | Fundo de seção | `#F1F5F9` | `241, 245, 249` | `oklch(0.96 0.01 240)` |
| `--color-neutral-200` | Bordas, divisórias | `#E2E8F0` | `226, 232, 240` | `oklch(0.92 0.02 240)` |
| `--color-neutral-500` | Texto secundário | `#64748B` | `100, 116, 139` | `oklch(0.55 0.03 240)` |
| `--color-neutral-700` | Texto corrido | `#334155` | `51, 65, 85` | `oklch(0.35 0.03 240)` |
| `--color-neutral-900` | Títulos | `#0F172A` | `15, 23, 42` | `oklch(0.17 0.03 240)` |

### Semânticas

| Token | Função | Hex |
| --- | --- | --- |
| `--color-success` | Estados de sucesso | `#10B981` |
| `--color-warning` | Estados de alerta | `#F59E0B` |
| `--color-danger` | Estados de erro | `#EF4444` |
| `--color-info` | Faixas informativas | `#3B82F6` |

### Regras de uso das cores

- Cor primária da marca no topo da página, no CTA principal e na navegação principal.
- Cor secundária em CTAs secundários, etiquetas e momentos de destaque. Nunca empilhada contra a primária em saturação máxima.
- As neutras sustentam a página. 80% de qualquer layout é neutro.
- Cores semânticas são reservadas para status. Não use vermelho como destaque visual.

## Tipografia

### Display

- **Família:** [ex.: "Satoshi", "Inter Display" ou a fonte display licenciada da marca]
- **Pesos usados:** 600, 700.
- **Origem na web:** [auto-hospedada, Google Fonts, Adobe Fonts ou fornecedor licenciado]
- **Pilha de fallback:** `"Satoshi", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`

### Texto

- **Família:** [ex.: "Inter", "IBM Plex Sans"]
- **Pesos usados:** 400, 500, 600.
- **Pilha de fallback:** `"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`

### Mono

- **Família:** [ex.: "JetBrains Mono", "IBM Plex Mono"]
- **Pesos usados:** 400, 500.
- **Pilha de fallback:** `"JetBrains Mono", "IBM Plex Mono", "Menlo", "Consolas", monospace`

### Escala tipográfica

| Token | Função | Tamanho (px) | Entrelinha | Peso | Espaçamento entre letras |
| --- | --- | --- | --- | --- | --- |
| `--fs-display-xl` | Destaque do topo | 72 | 1.05 | 700 | -0.02em |
| `--fs-display-lg` | Destaque secundário | 56 | 1.1 | 700 | -0.02em |
| `--fs-h1` | Título da página | 44 | 1.15 | 700 | -0.01em |
| `--fs-h2` | Seção | 32 | 1.2 | 600 | 0 |
| `--fs-h3` | Subseção | 24 | 1.3 | 600 | 0 |
| `--fs-h4` | Título pequeno | 20 | 1.35 | 600 | 0 |
| `--fs-body-lg` | Parágrafo de abertura | 18 | 1.6 | 400 | 0 |
| `--fs-body` | Texto padrão | 16 | 1.6 | 400 | 0 |
| `--fs-body-sm` | Legendas, metadados | 14 | 1.55 | 400 | 0.005em |
| `--fs-mono` | Código | 14 | 1.55 | 400 | 0 |

### Escala para impresso

- H1: 36 pt.
- H2: 24 pt.
- Texto: 10,5 a 11 pt, entrelinha 1,45.
- Legendas: 8,5 pt.

## Espaçamento

O espaçamento segue uma unidade-base de 4 px. Monte os layouts a partir do conjunto de tokens.

| Token | Valor |
| --- | --- |
| `--space-0` | 0 |
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |
| `--space-20` | 80px |
| `--space-24` | 96px |

## Raio

| Token | Valor | Uso |
| --- | --- | --- |
| `--radius-none` | 0 | Tabelas de dados, faixas |
| `--radius-sm` | 4px | Etiquetas, campos pequenos |
| `--radius-md` | 8px | Botões, campos, cards |
| `--radius-lg` | 16px | Cards, modais |
| `--radius-xl` | 24px | Blocos de destaque |
| `--radius-pill` | 9999px | Pílulas, badges, avatares |

## Sombra

| Token | Valor |
| --- | --- |
| `--shadow-sm` | `0 1px 2px 0 rgb(15 23 42 / 0.06)` |
| `--shadow-md` | `0 4px 8px -2px rgb(15 23 42 / 0.08), 0 2px 4px -2px rgb(15 23 42 / 0.06)` |
| `--shadow-lg` | `0 12px 24px -8px rgb(15 23 42 / 0.12), 0 4px 8px -4px rgb(15 23 42 / 0.08)` |
| `--shadow-xl` | `0 24px 48px -12px rgb(15 23 42 / 0.18)` |

## Movimento

- **Duração-base:** 180 ms para microinterações, 240 ms para sobreposições, 320 ms para transições de página.
- **Curva de aceleração:** `cubic-bezier(0.2, 0.8, 0.2, 1)` para saídas, `cubic-bezier(0.4, 0, 0.2, 1)` para entradas.
- **Redução de movimento:** respeite `prefers-reduced-motion`. Só fade, sem parallax nem deslizamento.

## Breakpoints

| Token | Largura mínima |
| --- | --- |
| `--bp-sm` | 640px |
| `--bp-md` | 768px |
| `--bp-lg` | 1024px |
| `--bp-xl` | 1280px |
| `--bp-2xl` | 1536px |

## Acessibilidade

- Contraste mínimo: WCAG 2.2 nível AA. Isso significa 4,5:1 para texto corrido e 3:1 para texto grande (18 pt regular ou 14 pt negrito para cima).
- Botões precisam de 3:1 contra o fundo no estado padrão.
- Estados de foco precisam ser visíveis. Anel mínimo de 2 px, com afastamento de 2 px, usando `--color-brand-primary` sobre fundos claros e `--color-brand-primary-hover` sobre fundos escuros.
- Áreas de toque têm no mínimo 44 x 44 px.
- Nunca transmita significado só pela cor. Junte a cor a um ícone ou a um rótulo.
- Texto alternativo de imagem é campo obrigatório em todo modelo do CMS.

## Modo escuro

Decida uma vez. Se a marca oferece modo escuro, defina a paleta espelhada com os mesmos tokens e documente aqui. Se não oferece, diga isso nesta seção para que os agentes não suponham que existem variantes escuras.

## Exemplo

### Identidade visual da Cadência

A Cadência é um SaaS fictício de agenda, cobrança recorrente e controle de presença para estúdios de pilates, yoga e treino funcional.

- Cor primária: Musgo `#2F4A3A`.
- Cor secundária: Terracota `#C4643F`.
- Destaque: Areia `#F1E9DC`.
- Tipografia: "Fraunces" para display, "Inter" para texto, "JetBrains Mono" para código.
- Imagens: fotos de estúdios clientes com luz natural da manhã, mãos ajustando as molas do reformer, a tela da agenda no celular da recepção. Nada de modelo posando de roupa fitness em fundo branco.
- Movimento: fades curtos. Sem parallax. No app do aluno, a confirmação de check-in usa uma transição de 180 ms e nada mais.

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
| [AAAA-MM-DD] | Versão inicial. | [Nome] |

Caminhos de referência: `/03-visual/IDENTIDADE-VISUAL.md`, `/03-visual/IMAGENS.md`, `/03-visual/PROMPTS-DE-IMAGEM.md`, `/04-design-system/DESIGN.md`, `/04-design-system/theme.json`.
