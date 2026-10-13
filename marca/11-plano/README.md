# Plano de marketing: plano de uma página, conta do cliente e revisão mensal

A 11ª camada da marca. As outras dez dizem para quem você vende, como fala, o que oferece e onde aparece. Esta transforma tudo isso num plano com números: quantos clientes você precisa, de onde eles vêm, quem cuida de cada canal e quanto dá para gastar.

## O que esta pasta faz

Esta pasta transforma um número, a receita que você precisa de clientes novos nos próximos 12 meses, num plano que cabe em uma página. Você trabalha de trás para frente a partir desse número:

1. Meta de receita total menos o que os clientes atuais já pagam = meta de receita de clientes novos.
2. Meta de receita de clientes novos ÷ quanto um cliente novo vale no primeiro ano = clientes de que você precisa.
3. Clientes ÷ sua taxa de fechamento = leads de que você precisa.
4. Leads que passam pelo site ÷ a taxa de conversão do seu site = visitas de que você precisa. Os leads que chegam direto, por venda direta, parceria ou evento, saem dessa conta.
5. Leads divididos entre poucos canais, cada um com meta mensal e uma pessoa responsável. Canal que gera visita tem meta em visitas; canal que gera lead direto tem meta em leads.
6. Um teto de orçamento definido pelo que um cliente vale, não por um percentual do faturamento.

Os números da lista são os passos da [`CONTA-DO-CLIENTE.md`](CONTA-DO-CLIENTE.md). Depois dos seis passos vem o placar: quatro números que você confere uma vez por mês (visitas, leads, clientes e custo por cliente), com as metas dos passos 4, 3, 2 e 6.

Cada linha da página pronta volta ao número da receita. Quando um canal falha, você sabe quantos clientes essa falha custa.

## Arquivos desta pasta

- [`CANAIS.md`](CANAIS.md): a escolha dos canais, inspirada na Bullseye Framework do livro *Traction*: fase e gargalo, uma ideia para cada canal possível, a classificação em três colunas, os três canais testados ao mesmo tempo, o registro dos testes e o canal principal com os sinais de saturação.
- [`PLANO-DE-UMA-PAGINA.md`](PLANO-DE-UMA-PAGINA.md): o plano de uma página em branco para copiar, com a caixa "atualizado em" e o histórico que mantêm o plano honesto.
- [`EXEMPLO-cadencia.md`](EXEMPLO-cadencia.md): o plano preenchido da Cadência, uma startup fictícia de software para estúdios de pilates e yoga, para você ver o formato final antes de preencher o seu.
- [`CONTA-DO-CLIENTE.md`](CONTA-DO-CLIENTE.md): os passos 1 a 6 como linhas para preencher, com as fórmulas, de onde vem cada número, a regra de arredondamento, os leads que entram direto, os valores provisórios e versões para pousada, imobiliária, restaurante e loja online.
- [`REVISAO-MENSAL.md`](REVISAO-MENSAL.md): a revisão mensal de 30 minutos em quatro passos, a revisão trimestral e um registro de 12 meses.
- [`PROMPTS.md`](PROMPTS.md): três prompts de uma linha para qualquer assistente de IA conferir sua conta, montar a lista de tarefas por canal e fazer a revisão mensal com você.
- [`HISTORICO.md`](HISTORICO.md): o que mudou nesta pasta e quando.

## Três jeitos de usar

**1. À mão, com estes arquivos.** Abra a conta do cliente, faça os passos 1 a 6 com uma calculadora e copie cada resposta para o plano de uma página. Olhe o exemplo da Cadência sempre que uma linha não estiver clara. Vale fazer à mão pelo menos uma vez, para a conta ser sua.

**2. Numa planilha sua.** Monte uma aba de entradas (meta, valor do primeiro ano, taxas) e uma aba de plano com as mesmas fórmulas. Use a regra de arredondamento da conta do cliente: no Google Planilhas em português, `=ARREDONDAR.PARA.CIMA(ARRED(A1/B1; 9); 0)`. Acrescente uma aba com uma linha por mês para o placar.

**3. Com um agente de IA.** Coloque o plano preenchido junto das outras camadas e use os prompts de [`PROMPTS.md`](PROMPTS.md). O agente confere a conta, monta as tarefas de cada canal e conduz a revisão mensal com você.

Os três jeitos usam as mesmas fórmulas e a mesma regra de arredondamento, então um plano feito de um jeito bate com o plano feito de outro.

## Ordem de preenchimento dentro desta pasta

1. Faça primeiro os passos 1 a 4 da `CONTA-DO-CLIENTE.md`. Se ainda não souber sua taxa de fechamento ou de conversão, use um valor provisório e marque.
2. Escolha os canais em `CANAIS.md`: quais vão para o plano, quais entram em teste e como cada um entra na conta, em visitas ou em leads.
3. Termine a conta (passos 4 a 6) com os canais escolhidos, copie as respostas para o `PLANO-DE-UMA-PAGINA.md` e coloque um nome ao lado de cada canal.
4. Marque a revisão mensal na agenda e comece o registro em `REVISAO-MENSAL.md` no mês seguinte.

## Como manter o plano atualizado

O método não muda. Os números que você coloca nele, sim.

- **Todo mês:** preencha os quatro números, encontre o primeiro que falhou e mude uma coisa.
- **Todo trimestre:** refaça a conta inteira com as taxas medidas no lugar dos provisórios e reequilibre a tabela de canais com o resultado dos testes de `CANAIS.md`.
- **Quando o canal principal saturar:** refaça `CANAIS.md` desde a fase e o gargalo, e depois a conta.
- **A cada revisão:** confira a caixa "atualizado em" no fim do plano antes de conferir a conta. Troque qualquer referência, ferramenta ou canal que mudou e atualize a data.
- **Registre:** acrescente uma linha ao histórico do plano (data, o que mudou, por quê). Se o plano mora no seu repositório, registre a mudança também no `HISTORICO.md` desta pasta.

## Como se liga ao resto das camadas

- `01-icp` diz para qual faixa de cliente você está planejando. Um plano mirado no cliente ideal tem valor de primeiro ano maior e taxa de fechamento melhor.
- `01-icp` também diz onde o cliente está (`### Onde encontrar`), que é de onde saem as ideias de canal em `CANAIS.md`.
- `06-seo/GEO-AEO.md` é o canal de busca e respostas de IA visto por dentro.
- `05-oferta` define os preços e pacotes que formam o valor do primeiro ano.
- `09-dados` guarda o plano de medição que torna confiáveis os quatro números do placar.
- `10-cerebro` é onde o plano pronto entra, para que toda ferramenta de IA que você usa trabalhe pelas mesmas metas.

## Quer uma segunda opinião?

Se a conta mostrar uma distância entre o orçamento que o plano pede e o que seus canais conseguem entregar, leve sua página para alguém de fora revisar: um sócio, um mentor, outra pessoa que toca negócio parecido. Uma página só é fácil de revisar em 30 minutos, e é exatamente para isso que ela existe.
