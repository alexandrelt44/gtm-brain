# Conta do cliente

> Exemplo fictício. A Cadência e todas as pessoas e empresas citadas não existem.

Conta do cliente da Cadência para o plano de out. de 2026 a set. de 2027, refeita em 2026-10-13 com os exports abaixo e as respostas de Marina Duarte (CEO).

Fontes citadas neste arquivo:

- `[FINANCEIRO]` orçamento de out. de 2026 a set. de 2027, aprovado pelos sócios em 2026-09-22
- `[PAINEL]` painel interno da Cadência (assinaturas e cobrança), export de valor do primeiro ano por coorte, 2026-09-30
- `[VENDAS]` RD Station CRM, relatório de funil por origem do negócio, 2026-04-01 a 2026-09-30
- `[GA4]` exports do GA4 da propriedade cadencia.example, 2026-04-01 a 2026-09-30
- `[ANUNCIOS]` Google Ads e Gerenciador de Anúncios da Meta, 2026-04-01 a 2026-09-30
- `[CONVERSA 2026-10-13]` respostas de Marina Duarte sobre período, valor do primeiro ano, fatia aceitável, horas e divisão das visitas

Seis passos, uma calculadora. Trabalhe de cima para baixo: cada resposta alimenta a linha seguinte. No fim, copie as respostas para o [`PLANO-DE-UMA-PAGINA.md`](PLANO-DE-UMA-PAGINA.md).

Cada passo mostra a conta da Cadência, com a fonte de cada número e o resultado em negrito. O plano preenchido, com as notas de onde vem cada número, está em [`EXEMPLO-cadencia.md`](EXEMPLO-cadencia.md).

## Duas regras antes de começar

**A regra do arredondamento.** Arredonde clientes, leads e visitas **para cima**, até o próximo número inteiro. Meio cliente não paga, então 62,5 leads viram 63. Antes de arredondar para cima, arredonde o resultado da divisão para 9 casas decimais. Isso impede que uma calculadora ou planilha transforme uma resposta exata como 25,000000001 em 26. Numa planilha em português: `=ARREDONDAR.PARA.CIMA(ARRED(A1/B1; 9); 0)`. Com essa regra, o plano feito à mão bate com o plano feito na planilha.

**A regra do provisório.** Se ainda não sabe uma taxa, use um valor provisório, escreva "provisório" ao lado e a data em que vai trocar. Veja [Valores provisórios](#valores-provisórios) para saber qual número usar. Nunca invente sua meta de receita nem o valor do cliente no primeiro ano. Esses dois têm que ser seus.

## Passo 1: meta de receita de clientes novos

Receita de clientes novos, não receita total. Clientes que voltam, renovações e contratos já assinados são receita de verdade, mas não são para isso que o plano de marketing existe.

**De onde vem:** sua meta de receita para os próximos 12 meses (ou a receita do ano passado mais o crescimento que você quer), menos o que você espera dos clientes que já tem.

```
Meta de receita total, próximos 12 meses:                     R$ 1.920.000
Menos a receita esperada dos clientes que você já tem:      - R$ 1.260.000
= Meta de receita de clientes novos                    (A)    R$   660.000
```

Cadência: R$ 1.920.000 − R$ 1.260.000 = **R$ 660.000**. Meta e base são as do orçamento aprovado `[FINANCEIRO]` `[CONVERSA 2026-10-13]`. A base parte do MRR de R$ 118.000 em 2026-09-30 e desconta o churn de 2,1% ao mês, média de abr. a set. de 2026 no painel `[PAINEL]`. A conta não soma expansão: R$ 118.000 × [1 + 0,979 + … + 0,979¹¹] = R$ 118.000 × 10,7066 = R$ 1.263.377,16. O financeiro arredondou para baixo, por conservadorismo, para R$ 1.260.000. `[COMPROVADO]`

A planilha do financeiro registra R$ 1.263.430 para a mesma conta, R$ 52,84 acima do valor refeito aqui. A diferença some no arredondamento para R$ 1.260.000 e não muda A.

## Passo 2: valor do primeiro ano e clientes necessários

Valor do primeiro ano, não valor do tempo de vida (LTV). O LTV infla o orçamento, a não ser que você tenha anos de dados limpos. O valor do primeiro ano é conservador, dá para conferir e é o dinheiro que paga o marketing do ano que vem.

**De onde vem:** seu sistema de cobrança ou de emissão de nota fiscal. Separe os clientes que entraram nos últimos 12 a 24 meses, some tudo o que cada um pagou nos primeiros 12 meses (compra inicial, implantação, mensalidades, pedidos seguintes, adicionais) e divida pelo número de clientes. Se seus clientes se dividem em faixas bem diferentes, faça a conta para a faixa que você quer conquistar. O seu ICP (veja [`../01-icp/`](../01-icp/)) diz qual é essa faixa.

```
Valor do cliente no primeiro ano                       (B)    R$ 3.300
Clientes necessários = A ÷ B, arredondado para cima    (C)      200
```

Cadência: R$ 660.000 ÷ R$ 3.300 = **200 estúdios novos**. B é a coorte de estúdios que assinaram entre 2024-10-01 e 2025-09-30: 152 estúdios pagaram R$ 501.600 nos primeiros 12 meses (R$ 440.220 de mensalidades mais R$ 61.380 de implantação assistida, 62 × R$ 990), e R$ 501.600 ÷ 152 = R$ 3.300 `[PAINEL]`. Os 19 estúdios que cancelaram antes do 12º mês entram com o que pagaram. `[COMPROVADO]`

A faixa do ICP (estúdio de uma unidade, 60 a 400 alunos, 138 estúdios) vale R$ 3.240 no primeiro ano, e as redes, R$ 3.890 (14 estúdios) `[PAINEL]`. A Marina escolheu a coorte inteira porque o plano quer as redes também `[CONVERSA 2026-10-13]`. Com o valor da faixa do ICP, seriam R$ 660.000 ÷ R$ 3.240 = 203,7, para cima 204 estúdios.

Conferência contra `/05-oferta/OFERTA.md`: 12 mensalidades do Plano Estúdio mais a implantação dão 12 × R$ 289 + R$ 990 = R$ 4.458. B fica abaixo disso porque 41% da coorte assinou o Essencial (R$ 189), só 62 dos 152 estúdios contrataram a implantação e 19 cancelaram no primeiro ano `[PAINEL]`.

## Passo 3: taxa de fechamento e leads necessários

Lead é qualquer pessoa que deu um passo real em direção à compra: preencheu um formulário, ligou, agendou uma conversa, chamou no WhatsApp pedindo preço, pediu um orçamento, começou um teste grátis. Escolha a definição que serve para o seu negócio e use a mesma todo mês. Uma loja online usa início de checkout no lugar de leads (veja [Por tipo de negócio](#por-tipo-de-negócio)).

**De onde vem:** negócios ganhos no seu CRM contra os leads criados no mesmo período, nos últimos 6 a 12 meses. Num CRM gratuito, o relatório do funil de negócios mostra isso por origem. Sem CRM? Seu WhatsApp, seu e-mail e sua agenda são o CRM: conte os contatos de uma janela de 90 dias e conte quantos pagaram.

```
Taxa de fechamento = clientes ÷ leads                  (D)     20%    [x] medida  [ ] provisória até n/a
Leads necessários = C ÷ D, arredondado para cima       (E)     1.000
```

Cadência: um lead é um teste grátis iniciado ou uma demonstração agendada, pelo site ou pelo WhatsApp, deduplicado por e-mail e telefone no CRM `[VENDAS]` `[CONVERSA 2026-10-13]`. Inscrição na newsletter e download de material não contam. De abr. a set. de 2026, 84 de 420 leads viraram assinatura: 84 ÷ 420 = 20% `[VENDAS]`. 200 ÷ 0,20 = **1.000 leads**. `[COMPROVADO]` Medida de novo na revisão trimestral de jan. de 2027.

Os 20% são uma média: indicação de cliente fecha 30%, Instagram 23%, Google orgânico 18%, e-mail e WhatsApp 16%, mídia paga 14% e eventos 11% `[VENDAS]`. Se a mistura de leads pender para mídia paga, a taxa cai.

## Passo 4: taxa de conversão e visitas necessárias

**De onde vem:** Google Analytics 4. Primeiro, garanta que suas ações de lead (envio de formulário, clique no telefone ou no WhatsApp, agendamento concluído, teste iniciado) estão configuradas como eventos principais. Depois abra **Relatórios > Engajamento > Página de destino** e divida os eventos principais pelas sessões das páginas onde as pessoas de fato convertem: páginas de serviço ou de produto, página de preços, página de contato, página de agendamento. Deixe o blog de fora. No Google Meu Negócio, o painel de desempenho mostra ligações, mensagens, pedidos de rota e cliques para o site, então dá para calcular uma taxa de visualização do perfil para ação do mesmo jeito.

```
Taxa de conversão = leads ÷ visitas                    (F)     2,5%    [x] medida  [ ] provisória até n/a
Visitas necessárias por ano = E ÷ F, para cima         (G)     40.000
Visitas necessárias por mês = G ÷ 12, para cima        (H)     3.334
```

Cadência: 480 eventos principais (318 `trial_start`, 96 `call_booked`, 66 `whatsapp_click`) ÷ 19.200 sessões nas oito páginas que vendem (`/precos`, `/pilates`, `/yoga`, `/funcional`, `/cobranca`, `/agenda`, `/rede`, `/teste-gratis`) = 2,5%, de abr. a set. de 2026, com o blog de fora `[GA4]`. `[COMPROVADO]` 1.000 ÷ 0,025 = **40.000 visitas por ano**, e 40.000 ÷ 12 = 3.333,3, arredondado para cima: **3.334 por mês**. Medida de novo na revisão trimestral de jan. de 2027.

Os 2,5% contam eventos, não pessoas. No mesmo período, o CRM deduplicou e contou 420 leads `[VENDAS]`. A taxa por pessoa seria 420 ÷ 19.200 = 2,19%, mas o CRM também conta leads que não passaram por essas páginas (direct do Instagram, WhatsApp, eventos), então nenhum dos dois números é a taxa limpa. Com 2,19%, as visitas necessárias subiriam para 3.810 por mês. Conciliação de GA4 e CRM por origem, para separar a taxa por pessoa [PENDENTE: Bruna Alves, auditora dos dados em `/09-dados/MEDICAO.md`, até a revisão trimestral de jan. de 2027].

## Passo 5: dividir as visitas entre os canais

Três a cinco canais é o limite para uma equipe pequena. Escolha pelo número de visitas qualificadas que cada um consegue entregar de verdade e coloque o nome de uma pessoa ao lado de cada um.

**Como dividir:** dê a cada canal uma fatia inteira das visitas mensais, somando 100%. Multiplique H por cada fatia. Para as metas dos canais somarem exatamente H, arredonde todos os canais **para baixo** primeiro e depois distribua as visitas que sobraram, uma de cada vez, para os canais com a maior fração restante. Se duas frações empatarem, a visita vai para o canal que aparece antes na lista.

```
Canal                                          Fatia    Visitas/mês (H × fatia)       Dono
Google (busca, Google Meu Negócio, IA)          20%     666,8   → 666 + 1 = 667       Bruna Alves
Avaliações e indicações                         15%     500,1   → 500                 Lívia Moraes
E-mail e WhatsApp                               10%     333,4   → 333                 Bruna Alves
Mídia paga (busca e redes sociais)              20%     666,8   → 666 + 1 = 667       Rafael Nunes
Conteúdo e redes sociais (Instagram)            30%     1.000,2 → 1.000               Marina Duarte
Eventos de pilates e yoga                        5%     166,7   → 166 + 1 = 167       Marina Duarte
                                       TOTAL   100%     3.334  (igual a H)
```

Fatias iniciais, se você não tiver ideia melhor: 45% Google, 15% avaliações e indicações, 15% e-mail e WhatsApp, 15% mídia paga, 10% conteúdo e redes sociais. Depois mova as fatias para onde seus clientes de fato vêm.

Cadência: 667 Google (Bruna), 500 indicações (Lívia), 333 e-mail e WhatsApp (Bruna), 667 mídia paga (Rafael), 1.000 Instagram (Marina), 167 eventos de pilates (Marina) = **3.334**. Arredondados para baixo, os canais somam 3.331; as 3 visitas que faltam vão para as maiores frações, 0,8 do Google, 0,8 da mídia paga e 0,7 dos eventos. As fatias são decisão da Marina, as mesmas do plano de uma página `[CONVERSA 2026-10-13]`.

Para comparar na revisão: de abr. a set. de 2026, os 84 estúdios ganhos vieram 34 do Instagram, 17 do Google orgânico, 14 de indicação, 12 da mídia paga, 5 de e-mail e WhatsApp e 2 de eventos `[VENDAS]`.

## Passo 6: teto de orçamento

Defina o orçamento pelo que um cliente vale, não por um percentual do faturamento.

**Escolhendo a fatia aceitável do valor do primeiro ano (I):**

- **20% a 30%** é uma faixa de trabalho comum para um negócio com margem saudável e relação recorrente.
- **10% a 15%** serve para compra única com margem baixa.
- Calcule a margem depois dos impostos: no Simples Nacional, a alíquota sai da receita antes de qualquer outra conta.
- Essa é uma decisão do negócio, não do marketing, e deve ser sua.

```
Fatia aceitável do valor do primeiro ano               (I)     25%
Custo aceitável por cliente = B × I                    (J)    R$ 825,00
Teto de orçamento por ano = J × C                      (K)    R$ 165.000,00
Teto de orçamento por mês = K ÷ 12                     (L)    R$ 13.750,00
```

Cadência: R$ 3.300 × 25% = **R$ 825 por estúdio**. × 200 estúdios = **R$ 165.000 por ano**, ou **R$ 13.750 por mês**. Os 25% são decisão dos sócios no orçamento, com margem bruta de 71% depois de impostos e infraestrutura, no Lucro Presumido `[FINANCEIRO]`, confirmada pela Marina sobre o valor da coorte inteira `[CONVERSA 2026-10-13]`.

**Confira o teto contra o custo dos canais.** Estime quanto cada canal custa por mês em dinheiro e em horas. Coloque um valor na sua própria hora: se não souber, divida a retirada mensal que você quer ter por 160 horas.

```
Gasto mensal em dinheiro, todos os canais:                    R$ 4.400,00
Horas mensais, todos os canais: 125 h × R$ 50/h =             R$ 6.250,00
                                 20 h × R$ 100/h =            R$ 2.000,00
Custo mensal planejado (dinheiro + horas)              (M)    R$ 12.650,00

M até 80% de L: cabe.  Entre 80% e 100% de L: apertado.  Acima de L: precisa mudar.
```

Cadência, item por item:

```
Dinheiro:  mídia paga R$ 2.000 + ferramentas R$ 900 + eventos R$ 1.500     = R$  4.400
Horas:     Bruna 80 h + Rafael 30 h + Lívia 15 h = 125 h × R$ 50/h          = R$  6.250
           Marina 20 h × R$ 100/h                                           = R$  2.000
Total (M)                                                                   = R$ 12.650   → 92% de L: apertado
```

Horas e valor da hora são da Marina `[CONVERSA 2026-10-13]`. O dinheiro é a estimativa do plano em `/11-plano/EXEMPLO-cadencia.md`: a mídia paga sai da conferência abaixo (R$ 24.000 por ano ÷ 12). Ferramentas e eventos não têm fatura nos exports deste plano. Em abr. a set. de 2026, a mídia paga gastou R$ 21.600, R$ 3.600 por mês `[ANUNCIOS]`, então o plano prevê gastar menos em anúncios do que no semestre passado. R$ 12.650 ÷ R$ 13.750 = 92%: **apertado**.

Se M passar de L, você precisa de uma combinação de canais mais barata, de uma taxa de conversão maior ou de uma meta menor. É uma conversa muito melhor de ter agora do que no mês nove.

**Conferência opcional da mídia paga.** Para um negócio que trabalha com leads:

```
Visitas pagas por ano = G × fatia da mídia paga               40.000 × 20% = 8.000
Leads pagos por ano = visitas pagas × F                       8.000 × 2,5% = 200
Custo pago estimado = leads pagos × custo por lead            200 × R$ 120 = R$ 24.000
Compare com K × fatia da mídia paga                           R$ 165.000 × 20% = R$ 33.000   → cabe
```

O custo por lead vem das suas próprias contas de anúncio (últimos 6 meses) ou, se você ainda não anuncia, da estimativa de custo por clique do Planejador de palavras-chave do Google Ads dividida pela sua taxa de conversão. Para uma loja online, multiplique as visitas pagas pelo custo por clique estimado.

Cadência: R$ 120 é o custo por teste iniciado nas contas de anúncio, R$ 21.600 ÷ 180 testes atribuídos por último clique, abr. a set. de 2026 `[ANUNCIOS]`. O CRM atribui à mídia paga só 84 leads no mesmo período `[VENDAS]`, o que dá R$ 21.600 ÷ 84 = R$ 257,14 por lead. Com esse custo, a mídia paga do plano custaria 200 × R$ 257,14 = R$ 51.428,57 por ano (R$ 4.285,71 por mês), acima dos R$ 33.000 da fatia, e M iria a R$ 14.935,71, 109% de L. Qual dos dois custos vale para o plano depende de conciliar a origem dos leads entre as contas de anúncio e o CRM [PENDENTE: Rafael Nunes, dono do canal, até a revisão trimestral de jan. de 2027].

**Confira o teto contra percentuais do faturamento, só como detector de fumaça.** Se K der 3% do faturamento, pergunte se você está sendo conservador demais para bater a meta. Se der 25%, pergunte se um cliente vale mesmo o que o passo 2 disse.

Cadência: R$ 165.000 ÷ R$ 1.920.000 = 8,6% da meta de receita total.

## Valores provisórios

- **Taxa de fechamento que você ainda não sabe:** use **25%**, rotule como provisória e troque depois de um trimestre contando. Não existe referência honesta de taxa de fechamento que valha para todos os setores, então chute mais baixo do que gostaria e deixe o primeiro trimestre corrigir.
- **Taxa de conversão que você ainda não sabe:** use **2%** como provisório conservador, rotule e troque quando o GA4 tiver um trimestre de eventos principais. Não é uma referência de mercado, é um chute baixo de propósito. Relatórios de mercado costumam medir landing pages dedicadas, que convertem mais que uma página de serviço comum. Se a sua converte bem abaixo disso, é na página que mora o ganho mais barato do plano.
- **Na revisão trimestral,** troque todo provisório que puder por um número medido e refaça os passos 3 a 6.

Na Cadência, nenhuma taxa é provisória: a de fechamento e a de conversão foram medidas de abr. a set. de 2026 e são medidas de novo em jan. de 2027.

## Referências

Use referências para conferir seus números, não para substituí-los. Registre cada referência que usar com a fonte, a janela de dados e a data em que conferiu, e repita na caixa "atualizado em" do plano.

| Referência | Valor | Fonte | Janela de dados | Conferida em |
|---|---:|---|---|---|
| Custo por teste iniciado nas contas de anúncio | R$ 120 | Google Ads e Meta, último clique `[ANUNCIOS]` | 2026-04-01 a 2026-09-30 | 2026-10-13 |
| Taxa de fechamento | 20% | RD Station CRM `[VENDAS]` | 2026-04-01 a 2026-09-30 | 2026-10-13 |
| Churn mensal | 2,1% | Painel interno, via orçamento `[PAINEL]` `[FINANCEIRO]` | média de abr. a set. de 2026 | 2026-10-13 |

As três são dados próprios da Cadência, os mesmos da caixa "atualizado em" do plano. Nenhuma referência de mercado foi usada.

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
