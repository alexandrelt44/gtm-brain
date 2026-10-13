# Specs

> Exemplo fictício. A Cadência e todas as pessoas e empresas citadas não existem.

**Na Cadência, estas specs ainda são o modelo genérico** [PENDENTE: Marina Duarte decide se a Cadência vai usar as specs com um agente de código; as de tabela de preços e de cartão de depoimento estão com Bruna Alves até dezembro de 2026]. Até lá, tamanhos, raios, sombras, movimento e breakpoints valem de [`../DESIGN.md`](../DESIGN.md), [`../theme.json`](../theme.json) e [`../tokens.css`](../tokens.css), nunca daqui. Estes tokens aparecem nas specs e não existem na Cadência: `--fs-display-xl`, `--fs-display-lg`, `--fs-body-lg`, `--fs-body-sm`, `--radius-sm`, `--shadow-lg`, `--shadow-xl`, `--duration-fast`, `--duration-slow`, `--easing-exit`, `--bp-md`, `--bp-2xl`. Use o mais próximo que existe: `--fs-h1`, `--fs-body`, `--radius-md`, `--shadow-md`, `--duration-base`, `--duration-medium`, `--easing-enter`, `--bp-lg`, `--bp-xl`.

Documentação de componentes e fundamentos legível para a IA. Cada spec é um arquivo Markdown que um agente de IA lê antes de escrever ou alterar código de interface. Se não existe spec para um componente, o agente chuta. Se existe, o agente consulta.

## Hierarquia

```
specs/
├── fundamentos/   cor, tipografia, espaçamento, movimento: o inegociável
├── tokens/        mapa mestre de cada token e de quando usar
├── atomos/        botão, campo, ícone, avatar, badge
├── moleculas/     abas, menu suspenso, modal, formulário, tooltip
├── organismos/    navegação, tabela, cabeçalho de página, painel de conteúdo
└── padroes/       regras de layout, layout de formulário, três colunas, tratamento de erros
```

Os níveis vão de baixo para cima. Uma molécula combina átomos. Um organismo combina moléculas. Um padrão é uma regra que vale para muitos componentes (por exemplo, "todo formulário usa 16 px de ritmo vertical entre campos e 24 px entre grupos").

## Como um agente lê estas specs

Quando o agente monta um formulário:

1. Lê [`padroes/layout-de-formulario.md`](./padroes/) para as regras de espaçamento e agrupamento.
2. Lê [`moleculas/formulario.md`](./moleculas/) para a estrutura (título, campos, ajuda, ações).
3. Lê [`atomos/campo.md`](./atomos/campo.md) para a implementação dos campos.
4. Lê [`atomos/botao.md`](./atomos/botao.md) para os botões de enviar e cancelar.
5. Lê [`tokens/tokens.md`](./tokens/tokens.md) para os valores exatos dos tokens, quando precisar.
6. Lê [`fundamentos/*.md`](./fundamentos/) quando alguma regra acima for ambígua.

Cada escolha é uma consulta, não um chute. Esse é o ponto.

## Como acrescentar uma spec

1. Copie [`../MODELO-DE-SPEC.md`](../MODELO-DE-SPEC.md) para a pasta do nível certo.
2. Renomeie para `<nome-do-componente>.md`.
3. Preencha todas as seções. Se uma seção não se aplica, diga isso explicitamente ("Este átomo não tem estado de hover porque é só de exibição").
4. Faça referências cruzadas a partir das specs relacionadas (irmãs, consumidoras, padrões).
5. Abra um pull request. O CI confere a formatação e a validade dos links.

## Como manter as specs atualizadas

- Todo PR que muda o comportamento de um componente muda também a spec do componente, no mesmo commit.
- As specs de fundamentos (`fundamentos/*`) mudam pouco. Quando mudam, suba a versão de toda spec que referencia o fundamento alterado.
- Se você adota um design system de origem (Atlaskit, Carbon, MUI, Radix, shadcn), acrescente em cada spec de átomo uma nota apontando o componente de origem e a última versão sincronizada. A detecção de desvios começa aí.

## Cobertura atual

O modelo vem com exemplos prontos do padrão:

- Átomos: `botao`, `campo`
- Fundamentos: `cor`, `tipografia`, `espacamento`, `movimento`
- Tokens: `tokens`

Moléculas, organismos e padrões vêm como pastas vazias. Acrescente as specs dos componentes que você realmente usa. Uma camada de specs pequena e precisa vale mais que uma completa e desatualizada.
