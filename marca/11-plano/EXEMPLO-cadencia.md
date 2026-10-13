# Exemplo: Cadência

A Cadência é uma startup fictícia: um SaaS de agenda, cobrança recorrente (Pix automático e cartão) e controle de presença para estúdios de pilates, yoga e treino funcional, fundado em 2023 em Florianópolis (SC). Os números são inventados, mas coerentes entre si, e cada um volta a um passo da [`CONTA-DO-CLIENTE.md`](CONTA-DO-CLIENTE.md).

A empresa tem 16 pessoas e é tocada por Marina Duarte (CEO, ex-dona de estúdio) e Tiago Ramos (CTO). O marketing fica com Bruna Alves, as vendas e a mídia paga com Rafael Nunes e o sucesso do cliente com Lívia Moraes. Hoje são cerca de 420 estúdios clientes, MRR de R$ 118 mil e churn mensal de 2,1%. A meta de receita para os próximos 12 meses é R$ 1.920.000, e a base atual deve render cerca de R$ 1.260.000 nesse período, já descontado o churn. Sobram R$ 660.000 que o plano de marketing precisa trazer.

## O plano de uma página

| META | |
|---|---|
| Receita de clientes novos, próximos 12 meses | R$ 660.000 |
| Valor de um estúdio novo no primeiro ano | R$ 3.300 |
| Estúdios novos necessários | 200 |

| CONTA | |
|---|---|
| Taxa de fechamento (teste ou demonstração que vira assinatura) | 20%, então 1.000 leads |
| Leads que entram direto (eventos, parcerias e vendas para redes) | 10% dos leads, 100 por ano |
| Taxa de conversão (visita às páginas de planos e de modalidade que vira teste ou demonstração) | 2,5%, então (1.000 − 100) ÷ 2,5% = 36.000 visitas qualificadas, 3.000 por mês |

| CANAIS E DONOS | Entra como | Meta/mês | Dono | Como a Cadência mede |
|---|---|---:|---|---|
| Google (busca, Google Meu Negócio, respostas de IA) | visitas | 667 | Bruna | Cliques do Search Console para as páginas de modalidade e de planos, menções em respostas de IA conferidas todo mês |
| Indicações e avaliações | visitas | 500 | Lívia | Testes iniciados com código de indicação, avaliações novas por mês |
| E-mail e WhatsApp (nutrição de quem baixou material e retorno de testes parados) | visitas | 333 | Bruna | Sessões do GA4 vindas de e-mail e de links no WhatsApp com UTM |
| Mídia paga (anúncios no Instagram e Google Ads) | visitas | 667 | Rafael | Cliques para as landing pages por modalidade, custo por teste iniciado |
| Instagram orgânico (perfil da Cadência e da Marina) | visitas | 833 | Marina | Sessões do GA4 vindas do link da bio e dos stories, com UTM |
| Eventos de pilates e yoga | leads | 4 | Marina | Demonstrações agendadas no estande, origem "evento" no CRM |
| Parcerias com escolas de formação de instrutores (teste) | leads | 3 | Lívia | Demonstrações agendadas na aula, origem "parceria" no CRM |
| Vendas diretas para redes de estúdios (teste) | leads | 2 | Rafael | Demonstrações agendadas, origem "prospeccao" no CRM |
| **Total** | | **3.000 visitas + 9 leads** | | 3.000 × 2,5% = 75 leads do site, mais 9 diretos = 84 por mês |

| ORÇAMENTO | |
|---|---|
| Custo aceitável por estúdio | 25% de R$ 3.300 = R$ 825 |
| Teto de orçamento | R$ 165.000 no ano, R$ 13.750 por mês, dinheiro mais horas a um valor real |
| Custo planejado | R$ 13.150 por mês (96% do teto): apertado |

| PLACAR (mensal) | Meta |
|---|---|
| Visitas às páginas de planos, de modalidade e de teste grátis | 3.000 |
| Leads (testes iniciados e demonstrações agendadas) | 84 (1.000 ÷ 12, arredondado para cima): 75 do site e 9 diretos |
| Estúdios novos | 17 (200 ÷ 12, arredondado para cima) |
| Custo por estúdio | abaixo de R$ 825 |

| REVISÃO | |
|---|---|
| Mensal | Primeira terça-feira do mês, 30 minutos, Marina, Bruna e Rafael |
| Trimestral | Refazer a conta com as taxas medidas, em janeiro, abril, julho e outubro |

## De onde uma empresa real tira cada número

- **Receita de clientes novos (R$ 660.000):** a meta de receita dos próximos 12 meses menos o que a base atual deve pagar no período. Para a base, Tiago projetou o MRR de R$ 118 mil mês a mês descontando o churn de 2,1% e não contou expansão (estúdio que sobe de plano), para não inflar a conta.
- **Valor do primeiro ano (R$ 3.300):** Tiago puxa do sistema de cobrança os estúdios que entraram nos últimos 24 meses e soma o que cada um pagou nos primeiros 12: mensalidades, upgrades e a implantação assistida de R$ 990 para quem contratou. O número já embute os estúdios que cancelaram no primeiro ano, por isso fica abaixo de 12 mensalidades cheias.
- **Taxa de fechamento (20%):** o CRM, nos últimos seis meses, com a mesma definição de lead todo mês. A taxa é realista para quem chega por indicação ou pela busca "sistema para estúdio de pilates" e otimista para quem chega por anúncio de teste grátis, que traz muita gente só olhando.
- **Taxa de conversão (2,5%):** eventos principais do GA4 (`trial_start` e `call_booked`) divididos pelas sessões nas páginas de planos, de modalidade e de teste grátis. O blog fica de fora. Quem chama no WhatsApp e agenda demonstração por lá conta como demonstração agendada, então o clique no botão de WhatsApp (`whatsapp_click`) também é evento principal.
- **Leads diretos (100 por ano):** os canais que geram lead sem passar pelo site, escolhidos em [`CANAIS.md`](CANAIS.md): eventos de pilates e yoga, que já rodavam, e os dois testes do trimestre, parcerias com escolas de formação e vendas diretas para redes. Somam 10% dos leads, e esses 100 saem da conta das visitas.
- **Metas por canal:** a coluna "Como a Cadência mede" acima. Cada número sai de um relatório que a empresa já tem, e os canais de leads saem da origem do negócio no CRM.
- **Teto de orçamento (R$ 165.000):** 25% do valor do primeiro ano vezes 200 estúdios. Cobre a mídia paga, as ferramentas, os eventos e as horas da equipe a um valor real, que é a linha mais fácil de esquecer.

## A conta, passo a passo

```
Passo 1   R$ 1.920.000 − R$ 1.260.000                  = R$ 660.000 de clientes novos   (A)
Passo 2   R$ 660.000 ÷ R$ 3.300                        = 200 estúdios                    (C)
Passo 3   200 ÷ 0,20                                   = 1.000 leads                     (E)   [x] medida
Passo 4   1.000 × 10% de canais de leads               = 100 leads diretos por ano       (N)
          (1.000 − 100) ÷ 0,025                        = 36.000 visitas por ano          (G)   [x] medida
          36.000 ÷ 12                                  = 3.000 visitas por mês           (H)
Passo 5   3.000 × 2,5% = 75 leads do site + 9 diretos  = 84 leads por mês
Passo 6   R$ 3.300 × 25%                               = R$ 825 por estúdio              (J)
          R$ 825 × 200                                 = R$ 165.000 por ano              (K)
          R$ 165.000 ÷ 12                              = R$ 13.750 por mês               (L)
```

**Custo planejado por mês (M):**

```
Dinheiro:  mídia paga R$ 2.000 + ferramentas R$ 900 + eventos R$ 1.500     = R$  4.400
Horas:     Bruna 80 h + Rafael 40 h + Lívia 25 h = 145 h × R$ 50/h          = R$  7.250
           Marina 15 h × R$ 100/h                                           = R$  1.500
Total (M)                                                                   = R$ 13.150   → 96% de L: apertado
```

**Conferência da mídia paga:**

```
Leads pagos por ano       1.000 × 20%                  = 200
Visitas pagas por ano     200 ÷ 2,5%                   = 8.000
Custo pago estimado       200 × R$ 120 por lead        = R$ 24.000   (R$ 2.000 por mês)
Teto da fatia paga        R$ 165.000 × 20%             = R$ 33.000   → cabe
```

O custo de R$ 120 por teste iniciado vem das próprias contas de anúncio da Cadência nos últimos seis meses, não de um relatório de mercado.

## Sobre a divisão entre canais

A divisão não é igual, nem deveria ser. Ela segue de onde vêm as visitas qualificadas para uma empresa como esta: donas de estúdio que acompanham a Marina no Instagram, donas que recebem indicação de outra dona e quem procura no Google "sistema para estúdio de pilates" ou "agenda para estúdio de pilates". E de onde vêm os leads que não passam pelo site: o estande num congresso de pilates, a aula numa escola de formação, a conversa direta com a gestora de uma rede.

A divisão é uma decisão de julgamento. As fatias iniciais da conta do cliente (45% Google, 15% avaliações e indicações, 15% e-mail e WhatsApp, 15% mídia paga, 10% conteúdo e redes sociais) dariam a esta empresa 1.500, 500, 500, 500 e 334 visitas por mês. A Marina tirou visitas do Google e do e-mail e colocou no Instagram, porque é de lá que vem a maior parte dos testes que viram assinatura, e abriu uma linha para eventos de pilates, onde ela é conhecida. Em outubro, com a escolha de canais de [`CANAIS.md`](CANAIS.md), as fatias passaram a ser dos leads, não das visitas, e eventos virou canal de leads. As fatias finais são 20% Google, 15% indicações, 10% e-mail e WhatsApp, 20% mídia paga e 25% Instagram, em visitas, e 5% eventos, 3% parcerias com escolas de formação e 2% vendas diretas para redes, em leads. Os dois últimos são testes: pagos com horas da Lívia e do Rafael e com os 5 pontos que saíram do Instagram. Trate as fatias iniciais como ponto de partida e mova para onde seus clientes de fato vêm.

## O que o plano diz para a Marina

Olhe a coluna de donos. O nome da Marina está na maior linha de visitas e na de eventos, e cada hora que ela passa gravando stories ou num estande de evento é uma hora fora da gestão da empresa. Por isso o teste de vendas diretas para redes ficou com o Rafael, e o Instagram caiu de 30% para 25% dos leads. O plano conta 15 horas dela por mês. Se forem 40, o custo planejado vai a R$ 15.650 e estoura o teto de R$ 13.750. A restrição real do plano é o tempo dela, e é para isso que serve o passo do orçamento: dizer se a saída mais barata é passar parte do Instagram para a Bruna, cortar um evento ou aceitar um custo por estúdio maior.

Repare também no que o plano não cobre. O churn de 2,1% entra só no passo 1, reduzindo a receita da base. Segurar cliente é trabalho do sucesso do cliente, não deste plano, mas cada ponto de churn a menos diminui a meta de clientes novos no ano seguinte.

Toda linha deste plano vai estar errada de algum jeito no fim do primeiro trimestre. Tudo bem, e é por isso que vale escrever. O plano dá à Marina algo específico para errar, e é assim que ela aprende o que de fato traz estúdios para a Cadência.

## A caixa "atualizado em", preenchida

```
ATUALIZADO EM: 2026-10-13

Referências usadas (valor, fonte, janela de dados):  Custo por teste iniciado R$ 120 (contas de anúncio próprias, abr. a set. 2026);
                                                     taxa de fechamento 20% (CRM próprio, abr. a set. 2026);
                                                     churn mensal 2,1% (painel interno, média de abr. a set. 2026)
Ferramentas de medição:                              GA4, Google Search Console, Google Meu Negócio, RD Station CRM, painel interno da Cadência
Canais no plano:                                     Google e Google Meu Negócio, indicações e avaliações, e-mail e WhatsApp, mídia paga, Instagram (visitas);
                                                     eventos, parcerias com escolas de formação (teste), vendas diretas para redes (teste) (leads)
```

Sua vez: copie o plano em branco de [`PLANO-DE-UMA-PAGINA.md`](PLANO-DE-UMA-PAGINA.md).
