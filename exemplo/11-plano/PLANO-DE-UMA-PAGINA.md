# Plano de marketing de uma página

> Exemplo fictício. A Cadência e todas as pessoas e empresas citadas não existem.

Fontes citadas neste arquivo:

- `[PAINEL]` dados de uso do produto (painel interno da Cadência), incluindo o sistema de cobrança
- `[VENDAS]` CRM da Cadência, negócios de abril a setembro de 2026
- `[FINANCEIRO]` orçamento de out. de 2026 a set. de 2027, aprovado pelos sócios em 2026-09-22
- `[GA4]` exports do GA4 da propriedade cadencia.example, 2026-04-01 a 2026-09-30
- `[CONVERSA 2026-10-13]` respostas de Marina Duarte sobre a divisão das visitas, as horas e a fatia aceitável

Plano da Cadência para out. de 2026 a set. de 2027. A conta passo a passo e a explicação de cada número estão em [`EXEMPLO-cadencia.md`](EXEMPLO-cadencia.md). Meta e base `[COMPROVADO]` `[FINANCEIRO]`. Taxa de fechamento `[COMPROVADO]` `[VENDAS]`. Taxa de conversão `[COMPROVADO]` `[GA4]`. Base, churn e valor do primeiro ano `[COMPROVADO]` `[PAINEL]`. Divisão entre canais: decisão da Marina, confirmada em 2026-10-13 `[CONVERSA 2026-10-13]`. A conta passo a passo com as fontes de cada número está em [`CONTA-DO-CLIENTE.md`](CONTA-DO-CLIENTE.md).

Copie o bloco abaixo para um documento, um app de notas ou o seu próprio repositório. Ele é o plano inteiro: meta, conta, canais, orçamento, placar e revisão.

## Como preencher

- **Cada linha vem do passo com o mesmo número.** As linhas de META vêm dos passos 1 e 2, as de CONTA dos passos 3 e 4, e assim por diante até o ORÇAMENTO, no passo 6. O PLACAR não é um passo novo: repete por mês as metas dos passos 2, 3, 4 e 6, arredondadas para cima. A [`CONTA-DO-CLIENTE.md`](CONTA-DO-CLIENTE.md) explica cada passo com a fórmula.
- **Preencha de cima para baixo.** Cada seção usa as respostas da seção anterior.
- **Marque os provisórios.** Se sua taxa de fechamento ou de conversão é um chute, marque a caixa de provisório e escreva a data em que vai trocar por um número medido. Um chute rotulado não tem problema. Um chute sem rótulo vira fato sem ninguém perceber.
- **Coloque um nome ao lado de cada canal.** Uma pessoa, não um departamento. Canal sem dono não é trabalhado.
- **O TOTAL dos canais tem que ser igual às visitas necessárias por mês.**
- **Travou numa linha?** Compare com o plano preenchido em [`EXEMPLO-cadencia.md`](EXEMPLO-cadencia.md).

## O plano

Plano da Cadência preenchido em 2026-10-01. Os números batem com `EXEMPLO-cadencia.md` e com as metas de `/09-dados/MEDICAO.md`.

```
PLANO DE MARKETING DE UMA PÁGINA  |  Empresa: Cadência  |  Período: out. 2026 a set. 2027  |  Última atualização: 2026-10-01

META (passos 1 e 2)
Receita de clientes novos necessária, próximos 12 meses:   R$ 660.000  (meta de R$ 1.920.000 menos R$ 1.260.000 da base)
Valor de um cliente novo no primeiro ano:                   R$ 3.300
Clientes novos necessários (receita ÷ valor):                 200 estúdios

CONTA (passos 3 e 4)
Taxa de fechamento (clientes ÷ leads):                        20%     → Leads necessários: 1.000
Taxa de conversão do site (leads ÷ visitas):                  2,5%    → Visitas necessárias: 40.000 por ano, 3.334 por mês
[x] Taxa de fechamento medida     [ ] Taxa de fechamento provisória até n/a
[x] Taxa de conversão medida      [ ] Taxa de conversão provisória até n/a

CANAIS E DONOS (passo 5)                             Visitas/mês    Dono         Como medimos
Google (busca, Google Meu Negócio, respostas de IA)  667            Bruna        Cliques do Search Console nas páginas de modalidade e de planos
Avaliações e indicações                              500            Lívia        Testes com código de indicação, avaliações novas por mês
E-mail e WhatsApp                                    333            Bruna        Sessões do GA4 vindas de e-mail e WhatsApp, com UTM
Mídia paga (busca e redes sociais)                   667            Rafael       Cliques nas landing pages por modalidade, custo por teste
Conteúdo e redes sociais (Instagram)                 1.000          Marina       Sessões do GA4 vindas da bio e dos stories, com UTM
Eventos de pilates e yoga                            167            Marina       Sessões da página do evento (QR code), cupom do evento
                                              TOTAL  3.334  (igual às visitas necessárias por mês)

ORÇAMENTO (passo 6)
Custo aceitável por cliente (25% do valor do primeiro ano):    R$ 825
Teto de orçamento (custo aceitável × clientes necessários):    R$ 165.000 por ano   R$ 13.750 por mês
Custo estimado dos canais (dinheiro + horas a R$ 50/h):        R$ 12.650 por mês   [x] cabe no teto (apertado: 92%)  [ ] precisa mudar
                                                               (horas da Marina a R$ 100/h)

PLACAR (passos 2, 3, 4 e 6)      Meta/mês        Real (M1)     Real (M2)     Real (M3)
Visitas às páginas que vendem    3.334           a medir       a medir       a medir
Leads                            84              a medir       a medir       a medir
Clientes novos                   17              a medir       a medir       a medir
Custo por cliente                R$ 825          a medir       a medir       a medir

REVISÃO
Revisão mensal: primeira terça-feira do mês às 9h, 30 minutos, dono: Marina (com Bruna e Rafael)
Refazer a conta no trimestre: jan. 2027, abr. 2027, jul. 2027, out. 2027
```

## Atualizado em

Mantenha esta caixa no fim do plano. A cada revisão trimestral, confira a caixa antes de conferir a conta, troque o que mudou e atualize a data.

```
ATUALIZADO EM: 2026-10-01

Referências usadas (valor, fonte, janela de dados):  Custo por teste iniciado R$ 120 (contas de anúncio próprias, abr. a set. 2026);
                                                     taxa de fechamento 20% (CRM próprio, abr. a set. 2026);
                                                     churn mensal 2,1% (painel interno, média de abr. a set. 2026)
Ferramentas de medição:                              GA4, Google Search Console, Google Meu Negócio, RD Station CRM, painel interno da Cadência
Canais no plano:                                     Google e Google Meu Negócio, indicações e avaliações, e-mail e WhatsApp, mídia paga, Instagram, eventos
```

## Histórico

Mantenha três linhas abaixo da caixa: as mudanças mais recentes do plano. Daqui a um ano, este registro mostra o que de fato mexeu nos seus quatro números.

```
Data: 2026-10-01   O que mudou: plano refeito para out. 2026 a set. 2027, meta de R$ 1.920.000   Por quê: revisão trimestral de outubro
Data: 2026-07-07   O que mudou: mídia paga subiu de 15% para 20% das visitas                  Por quê: custo por teste caiu para R$ 120 com as landing pages por modalidade
Data: 2026-04-07   O que mudou: linha de eventos de pilates e yoga incluída (5% das visitas)  Por quê: testes com cupom de evento fecharam acima da média
```

Próximo passo: faça a revisão mensal em [`REVISAO-MENSAL.md`](REVISAO-MENSAL.md).
