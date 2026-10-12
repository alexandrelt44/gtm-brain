# Extração de fontes para o ICP

Receitas por tipo de fonte. O objetivo é sempre o mesmo: chegar a um inventário de achados, cada um com trecho, fonte, campo de destino e selo, antes de escrever qualquer arquivo.

## O inventário

Uma linha por achado. Pode ficar na conversa ou num arquivo de rascunho fora da pasta da marca.

```md
| # | Trecho ou dado | Fonte | Campo | Selo |
| --- | --- | --- | --- | --- |
| 1 | "a gente perde uma tarde por semana conferindo pedido" | [CALLS §4] | Dores; VOC Calls | LITERAL |
| 2 | 31 de 44 clientes ativos têm de 5 a 20 funcionários | [CRM] | Firmografia | COMPROVADO |
| 3 | Procurou depois que o sócio saiu e o financeiro ficou com ela | [CALLS §2, §6, §9] | Gatilhos | OBSERVADO |
```

Regras do inventário:

- Uma tag por fonte, em maiúsculas, a mesma nos três arquivos da camada. O ponteiro `§n` diz qual call, entrevista ou chamado.
- Conte as repetições. Três fontes independentes dizendo a mesma coisa valem mais que uma frase forte.
- Separe o que o cliente disse do que o vendedor disse na mesma call. Só o primeiro vai para a voz do cliente.

## Transcrições de call

Leia a transcrição inteira uma vez. Depois procure trechos com estas marcas, que costumam esconder um campo:

| O cliente diz algo como | Campo provável |
| --- | --- |
| "o que fez a gente procurar foi…", "desde que…", "agora que…" | Gatilhos |
| "hoje a gente usa…", "a gente faz na mão", "tentamos…" | Comparação, Sinais de ferramentas |
| "o problema é…", "o que mais me irrita…", "eu perco…" | Dores |
| "quanto custa…", "está caro", "não tenho orçamento agora" | Objeções, Faixa de orçamento |
| "preciso ver com…", "meu sócio…", "o contador…" | Comitê de compra |
| "e se não funcionar…", "já me queimei com…" | Objeções, Cético |
| "o que eu queria mesmo era…", "se isso resolvesse…" | Jobs to be done, Aspirações |

Anote o cargo e o tipo de empresa de quem fala. Anote o mês e o ano da call. Ignore o discurso do vendedor, a não ser para entender a pergunta que gerou a resposta.

## Export do CRM

Peça uma planilha com os negócios ganhos e perdidos dos últimos 12 a 24 meses. As colunas que mais ajudam: segmento, porte, cidade, origem do lead, valor, data de criação, data de fechamento, motivo de perda, e se o cliente ainda está ativo.

Faça estas contas por segmento (e por porte, se houver variação):

1. Negócios ganhos e taxa de ganho.
2. Ciclo de venda mediano, em dias.
3. Valor mediano.
4. Clientes que cancelaram, e em quanto tempo.
5. Origem mais comum dos ganhos.

O segmento que ganha mais, fecha mais rápido e cancela menos é a primeira candidata a persona primária. Os motivos de perda viram desqualificadores e objeções. A origem dos ganhos alimenta `### Onde encontrar`.

Números calculados assim levam `[COMPROVADO]` e a tag do CRM. Diga o período e o tamanho da amostra: "31 de 44 clientes ativos, jan/2025 a set/2026".

## Avaliações públicas

- **Da marca:** notas 1 a 3 mostram dor e objeção; notas 4 e 5 mostram resultado e a linguagem de quem gostou. Guarde plataforma, nota, data e link.
- **Dos concorrentes:** as reclamações mostram dores que o mercado não resolve e critérios de escolha. Use no tema Comparação e nas dores, sempre dizendo que a citação é de cliente de outra empresa.
- Não cite o nome de quem avaliou em texto público sem permissão. Na biblioteca, use o papel e o tipo de empresa.

## Suporte, chat e WhatsApp

Leia as duas primeiras frases de cada pedido de ajuda. Ali está o problema dito sem filtro, muitas vezes o job to be done mais claro. Agrupe por assunto e conte. Os assuntos que mais se repetem mostram dores e medos do usuário final, que vão para o comitê.

Tire dado pessoal antes de copiar: telefone, e-mail, CPF, nome completo. Use o número do chamado ou "dado ocultado".

## Grupos, fóruns e comentários

Procure perguntas do tipo "alguém indica…", "como vocês fazem…", "qual sistema vocês usam…". Elas mostram como o comprador pede ajuda aos pares, que palavras usa para a categoria e que alternativas considera. O nome do grupo vai para `### Onde encontrar` e `### Consumo de conteúdo`.

Grupo fechado: só cite se a pessoa que trouxe o material tem acesso legítimo, e nunca com nome de quem escreveu.

## Entrevistas de churn e de ganhos e perdas

São as citações mais valiosas. Para cada uma, anote o motivo principal com as palavras do cliente e classifique: preço, encaixe, concorrente, momento, implantação, atendimento. Motivos de encaixe viram desqualificadores. Motivos de concorrente vão para o tema Comparação e para `mapear-concorrencia` depois.

## Quando a fonte é a própria pessoa

Resposta da pessoa no chat é fonte, com a tag `[CONVERSA AAAA-MM-DD]`. Pergunte de onde ela sabe: "você viu isso acontecer ou é o que você acha?". Visto e repetido vira `[OBSERVADO]`. Achado vira `[HIPÓTESE]`.
