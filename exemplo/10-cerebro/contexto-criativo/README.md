# Contexto criativo: criador, audiência e gosto

O resto do cérebro da marca diz a um agente de IA quem é a sua marca e o que ela vende. Estes três arquivos dizem como o seu melhor trabalho é feito: como você pensa quando escreve bem, quem de fato está lendo e o que "bom" significa para você.

Toda empresa que usa IA para escrever deveria ter os três. Eles fazem parte da camada 10, não são um extra opcional, e o `scripts/validar.sh` confere se eles existem.

A ideia vem do texto [The Creative Context OS](https://www.kieranflanagan.io/p/the-creative-context-os-how-to-stop), de Kieran Flanagan. O argumento, em resumo: um modelo de IA sem contexto entrega a média de tudo o que já leu. O texto sai polido e intercambiável. Um prompt melhor não resolve isso. O que resolve é um contexto que o modelo não encontra em nenhum outro lugar.

## Os três arquivos

| Arquivo | A pergunta que ele responde | De onde você tira o material | O arquivo que ele complementa |
|---|---|---|---|
| [`criador.md`](criador.md) | Como você pensa e escreve quando está indo bem? | 5 a 10 peças que mais parecem com você | `/02-voz/VOZ.md` diz como a marca soa. `criador.md` diz como a pessoa por trás dela monta um argumento. |
| [`audiencia.md`](audiencia.md) | O que o seu leitor já sabe, o que o entedia e o que conquista a confiança dele? | Cinco leitores reais, as pessoas que interagem e pesquisa fora dos seus próprios canais | `/01-icp/ICP.md` diz quem compra. `audiencia.md` diz ao que essas pessoas reagem quando leem. |
| [`gosto.md`](gosto.md) | O que separa o bom do esquecível, e por quê? | Trabalhos que você admira, mais os rascunhos que você recusou e o que disse sobre eles | A régua de qualidade contra a qual todo rascunho é conferido. |

Mantenha cada arquivo com uma ou duas páginas. Um arquivo curto que o agente lê de verdade vale mais que um longo que ele só passa o olho.

## Como usar

Use os arquivos antes de escrever e depois do rascunho. Não use os arquivos para terceirizar a escrita em si. A ideia, a opinião e a experiência continuam vindo de você.

- **Antes de escrever:** carregue os três e peça a um assistente de IA para testar a sua ideia bruta. O que este leitor já acredita? O que seria novo para ele? Quais ângulos combinam com o seu jeito de pensar?
- **Depois do rascunho:** carregue `gosto.md` e `audiencia.md` e peça uma crítica com base nas suas próprias regras. A reescrita é sua.
- **Para agentes e automações:** inclua estes três arquivos na ordem de carga de [`CEREBRO.md`](../CEREBRO.md), logo depois de `VOZ.md` e `TERMINOLOGIA.md` (passos 6 a 8), em qualquer tarefa que produza texto.

## Ordem de construção

1. `criador.md` primeiro. É o mais rápido de montar porque a evidência é o seu próprio trabalho.
2. `audiencia.md` em segundo. Comece com cinco pessoas reais, não com uma persona.
3. `gosto.md` por último. Ele fica mais afiado quando os outros dois já existem, porque você enxerga quais regras são sobre você e quais são sobre o seu leitor.

Reserve cerca de uma hora para a primeira versão de cada um. Eles melhoram toda vez que você usa.

## Como manter atualizados

- Toda vez que recusar um rascunho, escreva uma linha no registro de recusas de `gosto.md`. Uma recusa é uma regra de gosto que você ainda não escreveu.
- Toda vez que um leitor responder, comentar ou fizer uma pergunta que surpreenda você, acrescente em `audiencia.md`.
- Releia `criador.md` a cada trimestre comparando com o seu trabalho mais recente. O estilo muda com o tempo.
- Se você publica como empresa, e não com o nome de uma pessoa, monte `criador.md` para quem define o padrão de escrita, geralmente quem fundou a empresa ou quem lidera a escrita.
- Se mais de uma pessoa publica pela marca, dê a cada assinatura o próprio arquivo (`criador-marina.md`, `criador-tiago.md`) e compartilhe um único `audiencia.md` e um único `gosto.md`.

## Prompts para montar as primeiras versões

Cole estes prompts no assistente de IA que você usa. Cada um se preenche com o material que você colar depois dele.

Montar `criador.md`:

```text
Leia as peças que vou colar abaixo. Escolhi essas peças porque são as que mais parecem comigo, não porque foram as que tiveram melhor desempenho. Preencha o modelo de criador.md usando só padrões que você consiga apontar nessas peças: como eu monto um argumento, como apresento uma ideia, as explicações e distinções às quais sempre volto, o ritmo e o tom das minhas frases, os formatos que mais uso e como meu estilo muda de um canal para outro. Para cada padrão, cite uma frase curta como evidência e marque tudo o que for suposição sua.
```

Montar `audiencia.md`:

```text
Abaixo estão anotações sobre cinco pessoas reais que leem o meu trabalho, mais comentários, respostas e perguntas que meus leitores me mandaram. Preencha o modelo de audiencia.md: o que eles já entendem, o que estão cansados de ouvir, os problemas que sempre aparecem, o que conquista a confiança deles e o que soaria óbvio ou novo para eles. Use as palavras deles sempre que puder e marque tudo o que as anotações não sustentam.
```

Montar `gosto.md`:

```text
Abaixo estão trabalhos que eu admiro, cada um com uma frase sobre o porquê, mais rascunhos que eu recusei e o que eu disse sobre eles. Transforme isso no modelo de gosto.md: uma lista curta das regras que eu de fato aplico, cada uma com o motivo por trás e um teste que alguém possa rodar em um rascunho. Não acrescente regras que eu não mostrei.
```

## Prompts para usar os arquivos

Antes de escrever:

```text
Carregue criador.md, audiencia.md e gosto.md. Esta é a minha ideia bruta: [sua ideia]. Diga o que este leitor já acredita sobre o assunto, o que seria novo para ele e três ângulos que combinam com o meu jeito de pensar. Não escreva a peça.
```

Depois do rascunho:

```text
Carregue gosto.md e audiencia.md. Revise o rascunho abaixo contra cada regra de gosto.md e cada teste do fim do arquivo. Cite cada trecho que falha e diga qual regra ele quebra. Depois, liste o que este leitor acharia óbvio. Não reescreva o rascunho.
```

## Créditos

Ideia original: Kieran Flanagan, [The Creative Context OS](https://www.kieranflanagan.io/p/the-creative-context-os-how-to-stop).
