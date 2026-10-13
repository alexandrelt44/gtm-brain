# Convenções que o GTM Brain entende

O GTM Brain lê os arquivos da marca como um banco de dados. Um **título** vira um registro, e os **subtítulos** ou bullets com rótulo em negrito viram os campos desse registro. Linhas de tabela também viram registros (provas de dados, palavras-chave).

Os arquivos funcionam sem nada disto. As convenções só deixam as fichas, as ligações e o grafo mais completos.

## Registros e campos

| Onde | Título que vira registro | Campos |
| --- | --- | --- |
| `01-icp/ICP.md` | `## Persona primária: …`, `## Persona secundária: …`, `## Persona hipótese: …` | `### Firmografia`, `### Demografia`, `### Psicografia`, `### Jobs to be done`, `### Gatilhos`, `### Dores`, `### Objeções e respostas`, `### Comitê de compra (resumo)`, `### Desqualificadores`, `### Faixa de orçamento`, `### Critérios de decisão`, `### Consumo de conteúdo`, `### Onde encontrar` |
| `01-icp/COMITE-DE-COMPRA.md` | `### …` dentro de `## Papéis no comitê` | bullets com rótulo |
| `01-icp/VOZ-DO-CLIENTE.md` | `### Tema: …` em `## Índice de temas`; `### …` em `## Categorias de fonte` | citações |
| `02-voz/VOZ.md` | `### Atributo N: …` em `## Atributos de voz` | bullets com rótulo |
| `05-oferta/OFERTA.md` | `## Oferta N: …` | `### Para quem é`, `### O que inclui`, `### Prazo`, `### Preço`, `### Resultados esperados`, `### Prova`, `### Por que criamos esta oferta`, `### Como é vendida`, `### Como é entregue` |
| `05-oferta/CONCORRENCIA.md` | `## Concorrente: …`, `### Battle card: …` | `### Oferta`, `### Preço`, `### Pontos fortes`, `### Pontos fracos`, `### Mensagens públicas`, `### Cliente típico`, `### Como ganhamos`, `### Como perdemos` |
| `05-oferta/GANHOS-E-PERDAS.md` | `## Negócio: Cliente, Ganho` ou `, Perdido` | subtítulos do negócio |
| `08-conteudo/PROVAS.md` | `### CS-001 · …`, `### Depoimento T-001`, linhas `CAP-001` e `D-001` das tabelas | bullets com rótulo ou colunas |
| `06-seo/PALAVRAS-CHAVE.md` | linhas das tabelas em `## Palavras-chave primárias` e `## Palavras-chave secundárias` | colunas (`Palavra-chave`, `Intenção`, `Volume`, `Dificuldade`, `Tendência`, `Página alvo`, `Prioridade`) |
| `06-seo/pesquisa/*.csv` | cada linha de um CSV com coluna `keyword` | `volume`, `kd`, `intent`, `yoy`, `cluster`, `demand`, `competition`, `fit`, `opportunity` |
| `06-seo/CLUSTERS.md` | `## Cluster N: …` | `### Página pilar`, `### Satélites` |
| `11-plano/CANAIS.md` | `## Canal: …`, `## Teste: …`, `## Canal principal: …` | bullets com rótulo. Canal: `Entra como`, `Ideia`, `Custo por cliente`, `Volume`, `Qualidade`, `Tempo até fechar`, `Dono`, `Como medimos`. Teste: `Hipótese`, `Orçamento`, `Prazo`, `Critério de sucesso`, `Resultado`, `Decisão`. Canal principal: os de canal sem `Ideia`, mais `Por que é o principal`, `Sinais de saturação`, `Quando rever` |

O resto dos arquivos (voz, terminologia, compliance, GEO, calendário, mapa do site, visual, plano) aparece como **documentos**, um campo por seção.

**Bullet com rótulo** é assim: `- **Pontos fortes:** texto`. O rótulo vira o nome do campo.

## Completude

Personas, ofertas, concorrentes, canais e testes têm uma lista de campos esperados (as tabelas acima). A ficha mostra "N de M preenchidos" e lista o que falta. Um campo conta como **pendente** quando tem placeholder (`[AAAA-MM-DD]`, `[Nome da empresa]`…) ou uma marca de pendência: `(pendente)`, `⬜`, `em definição`, `a confirmar`.

## Selos de evidência

Use no começo da frase ou ao lado da afirmação:

| Selo | Quando usar |
| --- | --- |
| `[COMPROVADO]` | Aconteceu, tem cliente, número ou contrato |
| `[OBSERVADO]` | Padrão que se repete, sem medição |
| `[HIPÓTESE]` | Aposta em teste. Serve para decidir, não para afirmar |
| `[PROPOSTA]` | Inferência de quem escreveu, para validar |
| `[LITERAL]`, `[PARÁFRASE]` | Citação do cliente palavra por palavra, ou resumida |

A ficha conta quantas hipóteses e propostas cada registro carrega.

## Provas com ID

Cada prova tem um ID estável, usado em qualquer arquivo que a cite:

- `CS-001`: case de cliente
- `T-001`: depoimento
- `D-001`: dado (interno ou de terceiro)
- `CAP-001`: capacidade (o que a marca já construiu ou opera)

Faixas também funcionam: `CS-001 a CS-003`. Um ID citado e não definido aparece em vermelho.

O ID é bastidor: ele organiza o trabalho e não deve aparecer no texto publicado.

## Fontes

Defina cada fonte uma vez, numa lista no arquivo:

```md
- `[ENTREVISTAS]` Obsidian `Entrevistas com clientes 2026` (12 entrevistas, jan–mar)
```

Depois cite ao lado de cada afirmação, com um ponteiro opcional: `` `[ENTREVISTAS §2]` ``. A ficha da fonte mostra tudo o que deriva dela. Uma tag sem definição só conta como fonte se aparecer em três linhas ou mais.

## Pendência e contradição explícitas

```md
O preço do plano Rede ainda não foi validado [PENDENTE: /05-oferta/OFERTA.md]
Prazo de 2 semanas no site, 4 no contrato [CONTRADIZ: CS-002]
```

Sem essas marcações, o GTM Brain ainda acha tensões por palavra-chave ("diverge", "contradiz", "⚠️"), mas com falsos positivos.

## Caminhos entre arquivos

Cite outro arquivo pelo caminho: `` `/05-oferta/OFERTA.md` ``. Na ficha, o caminho aparece com o nome da categoria ("Ofertas"), e a ligação entra no grafo.

## Issues

Para ligar registros a issues de um tracker (Linear, Jira), passe os prefixos: `--issues COL,PRD`. Com `--linear-workspace <slug>`, as issues viram links.
