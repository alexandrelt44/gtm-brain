# 04, Design system

A camada de identidade termina e a camada de sistema começa. Esta pasta traduz a identidade visual, escrita para gente, em tokens legíveis por máquina, que qualquer framework, agente ou ferramenta consome sem precisar adivinhar.

## O que esta camada faz

Esta pasta codifica `/03-visual/IDENTIDADE-VISUAL.md` em tokens. Dois arquivos fazem o trabalho.

- `DESIGN.md` é o guia prático. Regras em português simples sobre como construir componentes, mais exemplos de variáveis CSS e uma lista de receitas de componentes.
- `theme.json` é o arquivo de tokens que o software lê. Cores em OKLCH e hex, tokens de tipografia, espaçamento, raio, sombra, movimento e breakpoints.

Um agente que consome `theme.json` consegue montar uma interface dentro da marca sem nunca ler o guia de identidade. Um agente que lê `DESIGN.md` consegue escrever código e componentes dentro da marca.

## Arquivos desta pasta

- `DESIGN.md`: mapa de token para componente, regras de nomenclatura, exemplos de variáveis CSS, padrões de componente.
- `theme.json`: tokens de design em JSON.

## Ordem de preenchimento nesta camada

1. Termine `/03-visual/IDENTIDADE-VISUAL.md` primeiro.
2. Copie cada token para `theme.json` com os valores exatos.
3. Escreva `DESIGN.md` descrevendo como os componentes usam esses tokens.

## O que esta pasta alimenta

- `07-site` puxa os tokens direto para o tema do CMS.
- `10-cerebro` carrega os tokens nos agentes que geram trechos de interface.
- Qualquer ferramenta adiante (Figma, Webflow, WordPress, Framer, CMS próprio) importa `theme.json`.

## Próxima camada

Na ordem de leitura das camadas, a próxima é `05-oferta`, que define o que você vende. Na ordem de preenchimento recomendada (veja "Por onde começar" no `README.md` da marca), a oferta vem logo depois da voz, e o visual e o design system podem ficar para depois.
