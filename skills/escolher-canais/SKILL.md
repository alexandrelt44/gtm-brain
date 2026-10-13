---
name: escolher-canais
description: 'Escolhe os canais de aquisição da marca no GTM Brain e preenche `11-plano/CANAIS.md`, com um método inspirado na Bullseye Framework do livro Traction (Weinberg e Mares). Passa por fase e gargalo, uma ideia concreta para cada um dos 24 canais, a classificação em três colunas, os três canais do círculo central testados ao mesmo tempo, o registro de testes e o canal principal com os sinais de saturação. Diz como cada canal entra na conta do plano: em visitas ao site ou em leads direto. Use quando a pessoa disser "canais", "quais canais", "onde achar clientes", "bullseye", "traction", "testar canal", "canal saturou", "nosso canal parou de funcionar", "venda direta", "parcerias", "eventos" ou quando o relatório de lacunas apontar `11-plano/CANAIS.md`.'
---

# Escolher canais

Você ajuda a marca a escolher onde procurar clientes. O resultado é `11-plano/CANAIS.md`: o gargalo de agora, uma ideia para cada canal possível, três canais em teste ao mesmo tempo, o registro de cada teste e o canal principal com os sinais de que ele está se esgotando. O plano de uma página usa esse resultado: cada canal entra na conta em **visitas** (passa pela taxa de conversão do site) ou em **leads** (entra direto).

O método é inspirado na Bullseye Framework do livro *Traction*, de Gabriel Weinberg e Justin Mares, com cinco canais que o livro não cobre. Os créditos estão em `AVISOS-DE-TERCEIROS.md`.

Leia antes: [`../gtm-brain/referencias/regras.md`](../gtm-brain/referencias/regras.md). Elas valem inteiras. Aqui está só o que muda nesta camada.

Método completo: [`referencias/metodo.md`](referencias/metodo.md). Os 24 canais, o que cada um costuma gerar e como testar: [`referencias/canais.md`](referencias/canais.md).

## O que esta skill preenche

| Seção de `11-plano/CANAIS.md` | Vira no GTM Brain | Pronto quando |
| --- | --- | --- |
| `## Fase e gargalo` | documento | Fase, gargalo, o dado que mostra o gargalo e a meta de tração, cada um com fonte |
| `## Brainstorm: uma ideia por canal` | documento | 24 linhas, cada uma com uma ideia concreta, "Entra como" e "Coluna" |
| `## Classificação em três colunas` | documento | Já no plano, círculo central (exatamente três), potencial e aposta longa |
| `## Canal: <nome>` | ficha "Canais" | Três fichas, uma por canal do círculo central, com os 8 campos: Entra como, Ideia, Custo por cliente, Volume, Qualidade, Tempo até fechar, Dono, Como medimos |
| `## Teste: <canal>, <período>` | ficha "Testes" | Uma por canal do círculo central, com Hipótese, Orçamento, Prazo, Critério de sucesso, Resultado e Decisão |
| `## Canal principal: <nome>` | ficha "Canal principal" | Um só, com os mesmos campos de canal mais Por que é o principal, Sinais de saturação e Quando rever |

O arquivo está pronto pelo critério de regras, seção 6. Teste em andamento ou por começar não é lacuna: o Resultado diz "em andamento" (ou "começa em AAAA-MM-DD") e a data da primeira leitura, e a Decisão diz quando sai. Número que nenhuma fonte dá fica `[HIPÓTESE]`, com a conta à vista, ou pendente com onde conseguir.

## Quando rodar

- **Na primeira vez:** depois dos passos 1 a 3 de `11-plano/CONTA-DO-CLIENTE.md` (rodadas 1 e 2 da `montar-plano`) e antes da rodada 3, a dos canais. A escolha usa a meta de clientes (C), a taxa de fechamento (D) e o custo aceitável por cliente (J). Se a conta ainda não existe, rode a `montar-plano` até o passo 3 e volte. Se os números estão em outra fonte (uma planilha, um resumo do financeiro), cite essa fonte e siga. Se a pessoa quer escolher canais antes, calcule J a partir da oferta e marque `[HIPÓTESE]`.
- **De novo:** quando o canal principal mostra dois sinais de saturação no mesmo mês, no fim dos testes (com o resultado e a decisão) e uma vez por ano. Uma rodada nova começa pela fase e pelo gargalo, que podem ter mudado.

Depois desta skill, a `montar-plano` termina a conta com os canais escolhidos: fatias, "Entra como", donos e custo.

## Antes de começar

1. Rode `lacunas` (regras, seção 1).
2. Confira as dependências:
   - **`/01-icp/ICP.md`**: `### Onde encontrar` e `### Consumo de conteúdo` de cada persona são a primeira fonte de ideias de canal.
   - **`/11-plano/CONTA-DO-CLIENTE.md`**: C, D e J (veja "Quando rodar").
   - **`/05-oferta/OFERTA.md`**: `### Como é vendida` de cada oferta diz se a venda já é direta, por indicação ou pelo site.
   - **`/05-oferta/GANHOS-E-PERDAS.md`**: origem, ciclo e tamanho dos negócios. É a melhor fonte de qualidade e de tempo até fechar por canal.
   - **`/06-seo/GEO-AEO.md`** e **`/06-seo/PALAVRAS-CHAVE.md`**: o tamanho da busca e se a marca já aparece nas respostas de IA.
   - **`/08-conteudo/PROVAS.md`**: canal de venda direta, parceria ou palestra precisa de prova para levar. Cite os IDs que existirem. Se não houver prova, diga qual ajudaria e sugira `registrar-provas` à pessoa; isso não deixa o campo pendente.
   - **`/09-dados/MEDICAO.md`** e **`/09-dados/PLANO-DE-MEDICAO.md`**: como a origem de cada lead é registrada hoje.
3. Leia a lista `Fontes da marca:` no `10-cerebro/CEREBRO.md` e reutilize as tags (regras, seção 4).

## Fontes: o que ler e o que tirar

| Fonte | O que tirar | Tag sugerida, se a marca ainda não tem uma |
| --- | --- | --- |
| CRM, relatório de funil por origem | Clientes, leads e taxa de fechamento por canal; ciclo de venda por origem | `[CRM]` |
| Cobrança, painel do produto | Churn e ticket por origem, para a qualidade; clientes por mês, para o ritmo | `[COBRANCA]`, `[PAINEL]` |
| Contas de anúncio | Gasto e custo por lead por canal pago | `[ANUNCIOS]` |
| GA4 e Search Console | Sessões e conversões por origem | `[GA4]` |
| Insights das redes | Alcance e tendência dos perfis | `[REDES]` |
| Planilha de eventos, parcerias, prospecção | Custo, horas e leads de cada ação fora do site | `[FINANCEIRO]`, `[CONVERSA AAAA-MM-DD]` |
| Testes anteriores (planilhas, notas) | O que já foi tentado, quanto custou e o que deu | a tag da fonte |
| A pessoa e o time | Horas disponíveis, canais já tentados, relações que a marca tem (escolas, fornecedores, associações) | `[CONVERSA AAAA-MM-DD]` |

Pesquise na web, se puder, o que existe no mercado da marca: eventos e feiras do setor, associações, newsletters e comunidades do público, diretórios e marketplaces, creators. Toda informação de fora entra com tag e data de leitura. Referência de mercado (custo por clique, taxa média) nunca vira número da marca: ela entra como `[HIPÓTESE]`, com a fonte.

## Passo a passo

1. **Fase e gargalo.** Leia os números e proponha a fase (I, II ou III) e o gargalo (produto, mercado, mensagem, distribuição ou preço), com o dado que mostra cada um. O churn decide entre fase I e fase II: se as fontes não têm, pergunte na rodada 1. O diagnóstico está em [`referencias/metodo.md`](referencias/metodo.md). Se o gargalo não é distribuição, diga isso à pessoa antes de seguir: escolher canal não resolve churn alto, mensagem confusa nem preço errado. Aponte a skill da camada certa e pergunte se ela quer seguir mesmo assim.
2. **Brainstorm.** Uma ideia concreta para cada um dos 24 canais de [`referencias/canais.md`](referencias/canais.md), tirada das fontes: o lugar, o público, a peça ou a ação. "Fazer SEO" não é ideia; "página comparando a marca com o concorrente que o CRM mais cita" é. Marque cada linha com "Entra como" (visitas ou leads) e uma coluna proposta. Os canais que a marca nunca tentou merecem a mesma atenção dos outros: é neles que costuma estar a surpresa.
3. **Rodada 1 de perguntas:** gargalo e classificação.
4. **Círculo central.** Para cada um dos três, estime custo por cliente, volume, qualidade e tempo até fechar, com a conta à vista. Compare o custo com J.
5. **Rodada 2:** testes.
6. **Testes.** Um registro por canal do círculo central, com hipótese, orçamento, prazo e critério antes de começar.
7. **Canal principal.** O que mais traz clientes hoje, pela origem no CRM. Marca sem clientes ainda não tem canal principal: escreva isso na seção e marque o primeiro teste que vencer como candidato. Se o principal já mostra sinais de saturação, ele continua principal até um teste ganhar; escreva os sinais acesos com o valor de hoje e diga à pessoa que a fatia dele no plano precisa ser revista na `montar-plano`.
8. **Quantos canais.** Três a cinco canais em produção é o limite de uma equipe pequena; os testes ficam fora dessa conta. Se os canais em produção já passam de cinco, mostre isso à pessoa e proponha juntar ou cortar antes de abrir testes.
9. **Rodada 3:** só se a marca tem canal principal e as fontes não dizem os limites dos sinais de saturação.
10. **Escrever, entregar à `montar-plano` e verificar.**

## Rodadas de perguntas

Até 4 perguntas por rodada, cada uma com opções concretas e a recomendada primeiro, marcada "(Recomendado)" (regras, seção 2). Não pergunte o que as fontes responderam.

**Rodada 1, gargalo e classificação.**

1. **Gargalo principal.** (Recomendado) o que os números mostram, com o dado: "distribuição: 30 clientes em seis meses, e a meta pede 50"; as outras quatro opções.
2. **Círculo central.** (Recomendado) os três que você propõe, com uma frase de por que cada um; dois trios alternativos montados com outros canais do brainstorm. Mostre a tabela do brainstorm antes.
3. **Canais que a marca já tentou e largou.** (Recomendado) nenhum, se as fontes não mostram; os que você achou nas fontes. Para cada um, pergunte o que aconteceu: canal largado sem teste honesto volta para a lista.
4. **Horas por mês para os testes, por pessoa.** (Recomendado) o que cabe entre o custo atual dos canais e o teto (L) da conta; um número que a pessoa diga. Se as fontes não têm o churn, troque esta pergunta por ele e pergunte as horas na rodada 2.

**Rodada 2, testes.**

1. **Prazo.** (Recomendado) quatro a oito semanas, conforme o tempo até fechar do canal; duas semanas, para canal pago com resposta rápida.
2. **Critério de sucesso de cada teste.** (Recomendado) a conta de [`referencias/metodo.md`](referencias/metodo.md), seção 5: custo por lead até J × a taxa de fechamento esperada da origem, e o volume de leads da hipótese; um número da pessoa.
3. **Dono de cada teste e do canal principal.** Uma pessoa por canal.
4. **Para onde vai a fatia se o teste falhar.** (Recomendado) para o canal principal; para outro canal que a pessoa escolher. Se a fatia de um canal de leads vai para um canal de visitas, N, G e H mudam: avise que a conta é refeita na revisão.

**Rodada 3, saturação** (só se faltar). Os limites de cada sinal: (Recomendado) os cinco sinais de [`referencias/metodo.md`](referencias/metodo.md), seção 7, com os limites de lá; os limites que a pessoa já usa.

## Escrever

- Abra o arquivo com uma linha que diga de quem é a escolha e quando foi feita, e com a lista `Fontes citadas neste arquivo:`. O título é `# Canais — <Marca>`.
- Mantenha os títulos do template exatamente como estão. As fichas são `## Canal: <nome>`, `## Teste: <canal>, <período>` e `## Canal principal: <nome>`, com bullets de rótulo em negrito (`- **Custo por cliente:** …`).
- A tabela do brainstorm tem as 24 linhas, mesmo as de aposta longa. Coluna é `no plano`, `central`, `potencial` ou `aposta longa`.
- O título do teste começa com o nome do canal, igual ao da ficha `## Canal:` (ou com o começo dele), seguido de vírgula e do período sem vírgula: `## Teste: Parcerias com contadores, nov. a dez. de 2026`. É assim que o GTM Brain liga o teste ao canal.
- Selo vai sem dois-pontos nem texto dentro: `[HIPÓTESE]`, e o motivo fora dele. `[HIPÓTESE: motivo]` conta como instrução do template.
- Toda ideia é `[PROPOSTA]` até entrar num teste. Custo, volume, qualidade e tempo até fechar sem fonte ficam `[HIPÓTESE]`, com a conta à vista. Os de origem medida no CRM ficam `[COMPROVADO]` ou `[OBSERVADO]`, com a tag.
- Cite os arquivos da marca pelo caminho (`/05-oferta/GANHOS-E-PERDAS.md`, `/06-seo/GEO-AEO.md`, `/09-dados/MEDICAO.md`) e as provas pelo ID. Viram ligações no grafo.
- O teste em andamento leva "em andamento" e a data da primeira leitura no Resultado, e a data em que a decisão sai na Decisão.
- **Exemplo é formato, nunca fato.** Não copie canal, ideia, número, nome, escola, evento nem teste de `exemplo/11-plano/CANAIS.md` nem da seção `## Exemplo` do template. Nem quando a marca é do mesmo setor. Apague `## Exemplo` quando o arquivo estiver preenchido.
- Mantenha `## Como usar este arquivo`, `## Checklist para agentes de IA` (marque `[x]`) e `## Como passar este arquivo para um agente de IA`.

## Entregar à `montar-plano`

A escolha muda a conta. Diga à pessoa, e à `montar-plano` se ela roda em seguida:

- quais canais vão para o plano e como cada um entra: **visitas** ou **leads**;
- a fatia dos leads (E) que você propõe para cada canal, inclusive os testes. Canal em teste leva fatia pequena, que volta para o canal principal se o teste falhar;
- as horas e o dinheiro de cada teste, que entram no custo planejado (M);
- o valor de origem de cada canal de leads no CRM, para `/09-dados/PLANO-DE-MEDICAO.md`.

A conta com canais de leads está no passo 4 e no passo 5 de `11-plano/CONTA-DO-CLIENTE.md`: N = E × soma das fatias de leads, para baixo; G = (E − N) ÷ F; e o total do plano fecha em leads.

## Verificar

1. Rode `lacunas`. `11-plano/CANAIS.md` sai de "Arquivos ainda em template", sem instruções nem exemplo do template sobrando, e nenhuma ficha de canal ou de teste com `faltam …`.
2. São exatamente três fichas `## Canal:` e três `## Teste:` na rodada atual, e um `## Canal principal:` (ou a frase que diz que ainda não há).
3. Se o plano de uma página e a conta do cliente já estão preenchidos, o "Entra como" de cada canal é o mesmo nos três. Se não estão, a `montar-plano` confere quando preencher.
4. Todo canal de leads tem o valor de origem no CRM em `Como medimos`. Quem escreve esse valor em `/09-dados/PLANO-DE-MEDICAO.md` é a `montar-plano`.
5. Atualize a linha `11 Plano` em `## Status das camadas` do `CEREBRO.md`.
6. Diga à pessoa, em poucas linhas: o gargalo, os três testes com prazo e critério, o canal principal e o sinal de saturação mais perto do limite, e o que ficou pendente.

## Armadilhas

- **Escolher canal com gargalo errado.** Churn alto ou taxa de fechamento baixa não se resolvem com mais canal: mais gente entra e sai do mesmo jeito.
- **Só os canais conhecidos.** A pessoa propõe os três que já usa. Pergunte pelos que ela nunca tentou e mostre a ideia concreta de cada um.
- **Testar cinco canais.** São três, ao mesmo tempo. Mais que isso divide a atenção e nenhum teste chega a uma resposta.
- **Teste sem critério.** Sem um número decidido antes, todo resultado parece promissor. O critério entra no registro antes de o teste começar.
- **Otimizar antes de testar.** O teste pergunta se o canal pode funcionar. Variações de anúncio, página nova e roteiro afinado vêm depois.
- **Prazo de teste menor que o ciclo de venda.** Se o canal leva 40 dias para fechar, um teste de duas semanas mede leads e demonstrações, não clientes. Diga isso no critério.
- **Canal de leads contado como visita.** Evento, parceria e venda direta não passam pelo site. Contados como visita, eles inflam a meta de visitas e somem do placar.
- **Lead direto sem origem no CRM.** Sem o campo de origem preenchido na hora, o canal some do relatório e o teste não tem resultado.
- **Canal principal sem sinais de saturação.** Todo canal se esgota. Sem os sinais escritos, a marca percebe quando o custo por cliente já dobrou.
