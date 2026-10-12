# 07, Site e arquitetura das páginas principais

A camada de superfície começa aqui. Tudo o que as camadas de identidade e de mercado definiram agora ganha forma visível. Esta pasta é a fonte da verdade sobre as páginas, as URLs e os dados estruturados que carregam o seu marketing.

## O que esta camada faz

Dois arquivos. Um para arquitetura da informação e inventário de páginas. Outro para dados estruturados.

- `MAPA-DO-SITE.md` cobre as páginas principais, os padrões de URL, a lógica de navegação e os caminhos de conversão. É a planta que quem monta o site no CMS, um designer ou um agente usa para construir ou auditar o site.
- `DADOS-ESTRUTURADOS.md` é a referência de JSON-LD para cada tipo de página. É a camada de dados estruturados que torna o site legível para o Google, o Bing, o ChatGPT, o Perplexity e o Gemini.

## Arquivos desta pasta

- `MAPA-DO-SITE.md`: inventário de páginas, árvore de arquitetura da informação, regras de URL, lógica de navegação e caminhos de conversão.
- `DADOS-ESTRUTURADOS.md`: trechos de JSON-LD por tipo de página, prontos para copiar e colar.

## Ordem de preenchimento nesta camada

1. Escreva `MAPA-DO-SITE.md` primeiro. O mapa conduz todo o resto.
2. Escreva `DADOS-ESTRUTURADOS.md` quando os tipos de página estiverem definidos.

## O que esta pasta alimenta

- `08-conteudo` preenche as páginas com o material editorial.
- `09-dados` é configurado para medir cada URL do mapa.
- `10-cerebro` carrega o mapa do site para os agentes sempre apontarem para a página certa.

## Próxima camada

Depois de preencher esta pasta, siga para `08-conteudo` para preencher as páginas com material.
