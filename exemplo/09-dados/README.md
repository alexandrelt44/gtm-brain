# 09, Dados, medição e biblioteca de desempenho

Aqui começa a parte de inteligência da marca. Você já escreveu quem, como, o quê, onde e por quê. Agora escreve como sabe que está funcionando.

## O que esta camada faz

Esta pasta é a camada de medição. Ela nomeia as ferramentas, os eventos, os KPIs e os ativos que rendem cada vez mais. Ela dá a todo agente a definição exata de "convertido", "agendado", "qualificado" e "ganho".

## Arquivos desta pasta

- `MEDICAO.md`: inventário das ferramentas de medição, KPIs por etapa do funil, definição dos painéis, frequência de relatórios e donos dos dados.
- `PLANO-DE-MEDICAO.md`: taxonomia de eventos, definição dos eventos de conversão, convenções de UTM, modelo de atribuição e regras de consentimento.
- `DESTAQUES.md`: seleção dos ativos com melhor desempenho, com os números anexados. Material de referência para os agentes.

## Ordem de construção nesta camada

1. Defina as ferramentas e os KPIs em `MEDICAO.md` primeiro. Se o time não concorda sobre o que é um lead, nenhum painel vai ganhar confiança.
2. Monte o `PLANO-DE-MEDICAO.md` quando os KPIs estiverem estáveis. Cada nome de evento, cada convenção de UTM.
3. Atualize `DESTAQUES.md` todo mês. Leve os padrões de volta para `10-cerebro`, para que os agentes escrevam a partir do que de fato funciona.

## O que esta pasta alimenta

- `10-cerebro` carrega exemplos dos destaques nos prompts de geração de conteúdo.

## Próxima camada

Depois de preencher esta pasta, siga para `10-cerebro` para juntar tudo num sistema pronto para agentes.
