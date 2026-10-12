# Conta do cliente

Seis passos, uma calculadora. Trabalhe de cima para baixo: cada resposta alimenta a linha seguinte. No fim, copie as respostas para o [`PLANO-DE-UMA-PAGINA.md`](PLANO-DE-UMA-PAGINA.md).

Cada passo mostra os números da Cadência, a startup fictícia de [`EXEMPLO-cadencia.md`](EXEMPLO-cadencia.md), para você conferir sua conta contra uma resposta pronta.

## Duas regras antes de começar

**A regra do arredondamento.** Arredonde clientes, leads e visitas **para cima**, até o próximo número inteiro. Meio cliente não paga, então 62,5 leads viram 63. Antes de arredondar para cima, arredonde o resultado da divisão para 9 casas decimais. Isso impede que uma calculadora ou planilha transforme uma resposta exata como 25,000000001 em 26. Numa planilha em português: `=ARREDONDAR.PARA.CIMA(ARRED(A1/B1; 9); 0)`. Com essa regra, o plano feito à mão bate com o plano feito na planilha.

**A regra do provisório.** Se ainda não sabe uma taxa, use um valor provisório, escreva "provisório" ao lado e a data em que vai trocar. Veja [Valores provisórios](#valores-provisórios) para saber qual número usar. Nunca invente sua meta de receita nem o valor do cliente no primeiro ano. Esses dois têm que ser seus.

## Passo 1: meta de receita de clientes novos

Receita de clientes novos, não receita total. Clientes que voltam, renovações e contratos já assinados são receita de verdade, mas não são para isso que o plano de marketing existe.

**De onde vem:** sua meta de receita para os próximos 12 meses (ou a receita do ano passado mais o crescimento que você quer), menos o que você espera dos clientes que já tem.

```
Meta de receita total, próximos 12 meses:                     R$__________
Menos a receita esperada dos clientes que você já tem:      - R$__________
= Meta de receita de clientes novos                    (A)    R$__________
```

Cadência (fictícia): R$ 1.920.000 − R$ 1.260.000 = **R$ 660.000**. A receita da base já desconta o churn de 2,1% ao mês.

## Passo 2: valor do primeiro ano e clientes necessários

Valor do primeiro ano, não valor do tempo de vida (LTV). O LTV infla o orçamento, a não ser que você tenha anos de dados limpos. O valor do primeiro ano é conservador, dá para conferir e é o dinheiro que paga o marketing do ano que vem.

**De onde vem:** seu sistema de cobrança ou de emissão de nota fiscal. Separe os clientes que entraram nos últimos 12 a 24 meses, some tudo o que cada um pagou nos primeiros 12 meses (compra inicial, implantação, mensalidades, pedidos seguintes, adicionais) e divida pelo número de clientes. Se seus clientes se dividem em faixas bem diferentes, faça a conta para a faixa que você quer conquistar. O seu ICP (veja [`../01-icp/`](../01-icp/)) diz qual é essa faixa.

```
Valor do cliente no primeiro ano                       (B)    R$__________
Clientes necessários = A ÷ B, arredondado para cima    (C)      __________
```

Cadência (fictícia): R$ 660.000 ÷ R$ 3.300 = **200 estúdios novos**.

## Passo 3: taxa de fechamento e leads necessários

Lead é qualquer pessoa que deu um passo real em direção à compra: preencheu um formulário, ligou, agendou uma conversa, chamou no WhatsApp pedindo preço, pediu um orçamento, começou um teste grátis. Escolha a definição que serve para o seu negócio e use a mesma todo mês. Uma loja online usa início de checkout no lugar de leads (veja [Por tipo de negócio](#por-tipo-de-negócio)).

**De onde vem:** negócios ganhos no seu CRM contra os leads criados no mesmo período, nos últimos 6 a 12 meses. Num CRM gratuito, o relatório do funil de negócios mostra isso por origem. Sem CRM? Seu WhatsApp, seu e-mail e sua agenda são o CRM: conte os contatos de uma janela de 90 dias e conte quantos pagaram.

```
Taxa de fechamento = clientes ÷ leads                  (D)     _______%    [ ] medida  [ ] provisória até ________
Leads necessários = C ÷ D, arredondado para cima       (E)     __________
```

Cadência (fictícia): um lead é um teste grátis iniciado ou uma demonstração agendada, e 20% deles viram assinatura. 200 ÷ 0,20 = **1.000 leads**.

## Passo 4: taxa de conversão e visitas necessárias

**De onde vem:** Google Analytics 4. Primeiro, garanta que suas ações de lead (envio de formulário, clique no telefone ou no WhatsApp, agendamento concluído, teste iniciado) estão configuradas como eventos principais. Depois abra **Relatórios > Engajamento > Página de destino** e divida os eventos principais pelas sessões das páginas onde as pessoas de fato convertem: páginas de serviço ou de produto, página de preços, página de contato, página de agendamento. Deixe o blog de fora. No Google Meu Negócio, o painel de desempenho mostra ligações, mensagens, pedidos de rota e cliques para o site, então dá para calcular uma taxa de visualização do perfil para ação do mesmo jeito.

```
Taxa de conversão = leads ÷ visitas                    (F)     _______%    [ ] medida  [ ] provisória até ________
Visitas necessárias por ano = E ÷ F, para cima         (G)     __________
Visitas necessárias por mês = G ÷ 12, para cima        (H)     __________
```

Cadência (fictícia): 2,5% das visitas às páginas de planos e de modalidade viram teste ou demonstração. 1.000 ÷ 0,025 = **40.000 visitas por ano**, e 40.000 ÷ 12 = 3.333,3, arredondado para cima: **3.334 por mês**.

## Passo 5: dividir as visitas entre os canais

Três a cinco canais é o limite para uma equipe pequena. Escolha pelo número de visitas qualificadas que cada um consegue entregar de verdade e coloque o nome de uma pessoa ao lado de cada um.

**Como dividir:** dê a cada canal uma fatia inteira das visitas mensais, somando 100%. Multiplique H por cada fatia. Para as metas dos canais somarem exatamente H, arredonde todos os canais **para baixo** primeiro e depois distribua as visitas que sobraram, uma de cada vez, para os canais com a maior fração restante. Se duas frações empatarem, a visita vai para o canal que aparece antes na lista.

```
Canal                                          Fatia    Visitas/mês (H × fatia)       Dono
Google (busca, Google Meu Negócio, IA)         ____%    __________                    __________
Avaliações e indicações                        ____%    __________                    __________
E-mail e WhatsApp                              ____%    __________                    __________
Mídia paga (busca e redes sociais)             ____%    __________                    __________
Conteúdo e redes sociais                       ____%    __________                    __________
Outro: ______________                          ____%    __________                    __________
                                       TOTAL   100%     __________  (tem que ser igual a H)
```

Fatias iniciais, se você não tiver ideia melhor: 45% Google, 15% avaliações e indicações, 15% e-mail e WhatsApp, 15% mídia paga, 10% conteúdo e redes sociais. Depois mova as fatias para onde seus clientes de fato vêm.

Cadência (fictícia): 667 Google (Bruna), 500 indicações (Lívia), 333 e-mail e WhatsApp (Bruna), 667 mídia paga (Rafael), 1.000 Instagram (Marina), 167 eventos de pilates (Marina) = **3.334**.

## Passo 6: teto de orçamento

Defina o orçamento pelo que um cliente vale, não por um percentual do faturamento.

**Escolhendo a fatia aceitável do valor do primeiro ano (I):**

- **20% a 30%** é uma faixa de trabalho comum para um negócio com margem saudável e relação recorrente.
- **10% a 15%** serve para compra única com margem baixa.
- Calcule a margem depois dos impostos: no Simples Nacional, a alíquota sai da receita antes de qualquer outra conta.
- Essa é uma decisão do negócio, não do marketing, e deve ser sua.

```
Fatia aceitável do valor do primeiro ano               (I)     _______%
Custo aceitável por cliente = B × I                    (J)    R$__________
Teto de orçamento por ano = J × C                      (K)    R$__________
Teto de orçamento por mês = K ÷ 12                     (L)    R$__________
```

Cadência (fictícia): R$ 3.300 × 25% = **R$ 825 por estúdio**. × 200 estúdios = **R$ 165.000 por ano**, ou **R$ 13.750 por mês**.

**Confira o teto contra o custo dos canais.** Estime quanto cada canal custa por mês em dinheiro e em horas. Coloque um valor na sua própria hora: se não souber, divida a retirada mensal que você quer ter por 160 horas.

```
Gasto mensal em dinheiro, todos os canais:                    R$__________
Horas mensais, todos os canais: ______ h × R$______/h =       R$__________
Custo mensal planejado (dinheiro + horas)              (M)    R$__________

M até 80% de L: cabe.  Entre 80% e 100% de L: apertado.  Acima de L: precisa mudar.
```

Se M passar de L, você precisa de uma combinação de canais mais barata, de uma taxa de conversão maior ou de uma meta menor. É uma conversa muito melhor de ter agora do que no mês nove.

**Conferência opcional da mídia paga.** Para um negócio que trabalha com leads:

```
Visitas pagas por ano = G × fatia da mídia paga               __________
Leads pagos por ano = visitas pagas × F                       __________
Custo pago estimado = leads pagos × custo por lead            R$__________
Compare com K × fatia da mídia paga                           R$__________
```

O custo por lead vem das suas próprias contas de anúncio (últimos 6 meses) ou, se você ainda não anuncia, da estimativa de custo por clique do Planejador de palavras-chave do Google Ads dividida pela sua taxa de conversão. Para uma loja online, multiplique as visitas pagas pelo custo por clique estimado.

**Confira o teto contra percentuais do faturamento, só como detector de fumaça.** Se K der 3% do faturamento, pergunte se você está sendo conservador demais para bater a meta. Se der 25%, pergunte se um cliente vale mesmo o que o passo 2 disse.

## Valores provisórios

- **Taxa de fechamento que você ainda não sabe:** use **25%**, rotule como provisória e troque depois de um trimestre contando. Não existe referência honesta de taxa de fechamento que valha para todos os setores, então chute mais baixo do que gostaria e deixe o primeiro trimestre corrigir.
- **Taxa de conversão que você ainda não sabe:** use **2%** como provisório conservador, rotule e troque quando o GA4 tiver um trimestre de eventos principais. Não é uma referência de mercado, é um chute baixo de propósito. Relatórios de mercado costumam medir landing pages dedicadas, que convertem mais que uma página de serviço comum. Se a sua converte bem abaixo disso, é na página que mora o ganho mais barato do plano.
- **Na revisão trimestral,** troque todo provisório que puder por um número medido e refaça os passos 3 a 6.

## Referências

Use referências para conferir seus números, não para substituí-los. Registre cada referência que usar com a fonte, a janela de dados e a data em que conferiu, e repita na caixa "atualizado em" do plano.

| Referência | Valor | Fonte | Janela de dados | Conferida em |
|---|---:|---|---|---|
| Taxa de conversão de landing page do seu setor | | | | [AAAA-MM-DD] |
| Custo por clique das suas palavras-chave (Google Ads) | | | | [AAAA-MM-DD] |
| Custo por lead nas suas contas de anúncio | | | | [AAAA-MM-DD] |

Prefira seus próprios dados (contas de anúncio, GA4, CRM) a relatórios de mercado. Quando usar um relatório, confira se ele mede o mesmo país, a mesma moeda e o mesmo tipo de página. Quando a fonte publicar uma edição nova, atualize esta tabela e o [`HISTORICO.md`](HISTORICO.md).

## Por tipo de negócio

As fórmulas nunca mudam. O que conta como cliente, lead e visita, sim.

| | Pousada | Imobiliária | Restaurante | Loja online |
|---|---|---|---|---|
| **Passo 1: receita de clientes novos** | Reservas diretas de hóspedes de primeira vez, não hóspedes que voltam nem estadias que viriam dos sites de reserva de qualquer jeito | Comissões de compradores e vendedores que você ainda não conhece, não negócios repetidos da sua rede de contatos | Receita de clientes de primeira vez; uma oferta de primeira visita ou um campo de origem na reserva serve de aproximação | Receita do primeiro pedido de clientes novos, que a plataforma da loja separa entre novos e recorrentes |
| **Passo 2: valor do primeiro ano** | Primeira estadia média mais a volta esperada: uma estadia de R$ 1.200 com 30% de chance de uma volta dá cerca de R$ 1.560 | Comissão média por negócio: R$ 18.000 | Gasto da primeira visita vezes as visitas esperadas no primeiro ano: R$ 90 × 4 visitas = R$ 360 | Primeiro pedido mais as recompras esperadas: R$ 150 com 1,5 recompra dá cerca de R$ 375 |
| **Passo 2: resultado** | Meta de R$ 468.000 ÷ R$ 1.560 = 300 hóspedes novos | Meta de R$ 900.000 ÷ R$ 18.000 = 50 negócios fechados | Meta de R$ 180.000 ÷ R$ 360 = 500 clientes novos | Meta de R$ 750.000 ÷ R$ 375 = 2.000 clientes novos |
| **Passo 3: taxa de fechamento** | Reservas diretas confirmadas ÷ pedidos de reserva (consultas de disponibilidade, ligações, WhatsApp); acompanhe à parte quem reserva direto pelo motor de reservas | Negócios fechados ÷ conversas com leads novos que chegaram a uma visita ou avaliação | Reservas de primeira vez cumpridas ÷ pedidos de reserva; quem chega sem reserva pula este passo | Conclusão de checkout: pedidos ÷ inícios de checkout |
| **Passo 4: taxa de conversão** | Visitas às páginas de quartos e de localização que viram reserva ou consulta de disponibilidade | Visitas às páginas de imóveis e de bairros que viram pedido de avaliação, de visita ou conversa com corretor | Visitas às páginas de cardápio e de endereço que viram reserva ou pedido online; seu perfil no Google Meu Negócio pode gerar mais disso que o site | Sessões nas páginas de produto e de categoria que viram início de checkout |

Para uma loja online, leia "leads" como "inícios de checkout" em toda esta conta.
