# Plano de marketing de uma página

> Exemplo fictício. A Cadência e todas as pessoas e empresas citadas não existem.

Fontes citadas neste arquivo:

- `[PAINEL]` dados de uso do produto (painel interno da Cadência), incluindo o sistema de cobrança
- `[VENDAS]` CRM da Cadência, negócios de abril a setembro de 2026
- `[FINANCEIRO]` orçamento de out. de 2026 a set. de 2027, aprovado pelos sócios em 2026-09-22
- `[GA4]` exports do GA4 da propriedade cadencia.example, 2026-04-01 a 2026-09-30
- `[CONVERSA 2026-10-13]` respostas de Marina Duarte sobre a divisão dos leads entre os canais, as horas e a fatia aceitável

Plano da Cadência para out. de 2026 a set. de 2027. A conta passo a passo e a explicação de cada número estão em [`EXEMPLO-cadencia.md`](EXEMPLO-cadencia.md). Meta e base `[COMPROVADO]` `[FINANCEIRO]`. Taxa de fechamento `[COMPROVADO]` `[VENDAS]`. Taxa de conversão `[COMPROVADO]` `[GA4]`. Base, churn e valor do primeiro ano `[COMPROVADO]` `[PAINEL]`. Divisão entre canais: decisão da Marina, confirmada em 2026-10-13 `[CONVERSA 2026-10-13]`, com os testes escolhidos em [`CANAIS.md`](CANAIS.md). A conta passo a passo com as fontes de cada número está em [`CONTA-DO-CLIENTE.md`](CONTA-DO-CLIENTE.md).

Copie o bloco abaixo para um documento, um app de notas ou o seu próprio repositório. Ele é o plano inteiro: meta, conta, canais, orçamento, placar e revisão.

## Como preencher

- **Cada linha vem do passo com o mesmo número.** As linhas de META vêm dos passos 1 e 2, as de CONTA dos passos 3 e 4, e assim por diante até o ORÇAMENTO, no passo 6. O PLACAR não é um passo novo: repete por mês as metas dos passos 2, 3, 4 e 6, arredondadas para cima. A [`CONTA-DO-CLIENTE.md`](CONTA-DO-CLIENTE.md) explica cada passo com a fórmula.
- **Preencha de cima para baixo.** Cada seção usa as respostas da seção anterior.
- **Marque os provisórios.** Se sua taxa de fechamento ou de conversão é um chute, marque a caixa de provisório e escreva a data em que vai trocar por um número medido. Um chute rotulado não tem problema. Um chute sem rótulo vira fato sem ninguém perceber.
- **Coloque um nome ao lado de cada canal.** Uma pessoa, não um departamento. Canal sem dono não é trabalhado.
- **Diga como cada canal entra na conta.** Canal que gera visita ao site entra em visitas e passa pela taxa de conversão. Canal que gera lead direto (venda direta, prospecção, parceria, evento, feira, palestra) entra em leads. Os canais e o jeito de cada um entrar vêm de [`CANAIS.md`](CANAIS.md).
- **O TOTAL fecha em leads.** As visitas dos canais de visita somam as visitas necessárias por mês, e essas visitas vezes a taxa de conversão, mais os leads diretos, alcançam os leads necessários por mês.
- **Travou numa linha?** Compare com o plano preenchido em [`EXEMPLO-cadencia.md`](EXEMPLO-cadencia.md).

## O plano

Plano da Cadência preenchido em 2026-10-01 e refeito em 2026-10-13 com os canais de [`CANAIS.md`](CANAIS.md). Os números batem com `EXEMPLO-cadencia.md` e com as metas de `/09-dados/MEDICAO.md`.

```
PLANO DE MARKETING DE UMA PÁGINA  |  Empresa: Cadência  |  Período: out. 2026 a set. 2027  |  Última atualização: 2026-10-13

META (passos 1 e 2)
Receita de clientes novos necessária, próximos 12 meses:   R$ 660.000  (meta de R$ 1.920.000 menos R$ 1.260.000 da base)
Valor de um cliente novo no primeiro ano:                   R$ 3.300
Clientes novos necessários (receita ÷ valor):                 200 estúdios

CONTA (passos 3 e 4)
Taxa de fechamento (clientes ÷ leads):                        20%     → Leads necessários: 1.000 por ano
Leads que entram direto, sem passar pelo site (10% de 1.000):          100 por ano
Taxa de conversão do site (leads ÷ visitas):                  2,5%    → Visitas necessárias: (1.000 − 100) ÷ 2,5% = 36.000 por ano, 3.000 por mês
[x] Taxa de fechamento medida     [ ] Taxa de fechamento provisória até n/a
[x] Taxa de conversão medida      [ ] Taxa de conversão provisória até n/a

CANAIS E DONOS (passo 5)                    Fatia  Entra como  Meta/mês      Leads/mês  Dono     Como medimos
Google (busca, Google Meu Negócio, IA)      20%    visitas     667 visitas   16,7       Bruna    Cliques do Search Console nas páginas de modalidade e de planos
Avaliações e indicações                     15%    visitas     500 visitas   12,5       Lívia    Testes com código de indicação, avaliações novas por mês
E-mail e WhatsApp                           10%    visitas     333 visitas   8,3        Bruna    Sessões do GA4 vindas de e-mail e WhatsApp, com UTM
Mídia paga (busca e redes sociais)          20%    visitas     667 visitas   16,7       Rafael   Cliques nas landing pages por modalidade, custo por teste
Conteúdo e redes sociais (Instagram)        25%    visitas     833 visitas   20,8       Marina   Sessões do GA4 vindas da bio e dos stories, com UTM
Eventos de pilates e yoga                   5%     leads       4 leads       4          Marina   Origem "evento" no CRM, cupom do evento
Parcerias com escolas de formação (teste)   3%     leads       3 leads       3          Lívia    Origem "parceria" no CRM, com o nome da escola
Vendas diretas para redes (teste)           2%     leads       2 leads       2          Rafael   Origem "prospeccao" no CRM
                                     TOTAL  100%   3.000 visitas × 2,5% = 75 leads + 9 leads diretos = 84 leads por mês (1.000 ÷ 12, para cima)

ORÇAMENTO (passo 6)
Custo aceitável por cliente (25% do valor do primeiro ano):    R$ 825
Teto de orçamento (custo aceitável × clientes necessários):    R$ 165.000 por ano   R$ 13.750 por mês
Custo estimado dos canais (dinheiro + horas a R$ 50/h):        R$ 13.150 por mês   [x] cabe no teto (apertado: 96%)  [ ] precisa mudar
                                                               (horas da Marina a R$ 100/h)

PLACAR (passos 2, 3, 4 e 6)      Meta/mês        Real (M1)     Real (M2)     Real (M3)
Visitas às páginas que vendem    3.000           a medir       a medir       a medir
Leads (75 do site + 9 diretos)   84              a medir       a medir       a medir
Clientes novos                   17              a medir       a medir       a medir
Custo por cliente                R$ 825          a medir       a medir       a medir

REVISÃO
Revisão mensal: primeira terça-feira do mês às 9h, 30 minutos, dono: Marina (com Bruna e Rafael)
Refazer a conta no trimestre: jan. 2027, abr. 2027, jul. 2027, out. 2027
```

## Atualizado em

Mantenha esta caixa no fim do plano. A cada revisão trimestral, confira a caixa antes de conferir a conta, troque o que mudou e atualize a data.

```
ATUALIZADO EM: 2026-10-13

Referências usadas (valor, fonte, janela de dados):  Custo por teste iniciado R$ 120 (contas de anúncio próprias, abr. a set. 2026);
                                                     taxa de fechamento 20% (CRM próprio, abr. a set. 2026);
                                                     churn mensal 2,1% (painel interno, média de abr. a set. 2026)
Ferramentas de medição:                              GA4, Google Search Console, Google Meu Negócio, RD Station CRM, painel interno da Cadência
Canais no plano:                                     Google e Google Meu Negócio, indicações e avaliações, e-mail e WhatsApp, mídia paga, Instagram (visitas);
                                                     eventos, parcerias com escolas de formação (teste), vendas diretas para redes (teste) (leads)
```

## Histórico

Mantenha três linhas abaixo da caixa: as mudanças mais recentes do plano. Daqui a um ano, este registro mostra o que de fato mexeu nos seus quatro números.

```
Data: 2026-10-13   O que mudou: canais entram como visitas ou leads; eventos vira canal de leads; parcerias (3%) e vendas para redes (2%) entram em teste; Instagram cai de 30% para 25%   Por quê: escolha de canais em CANAIS.md e horas da Marina
Data: 2026-10-01   O que mudou: plano refeito para out. 2026 a set. 2027, meta de R$ 1.920.000   Por quê: revisão trimestral de outubro
Data: 2026-07-07   O que mudou: mídia paga subiu de 15% para 20% das visitas                  Por quê: custo por teste caiu para R$ 120 com as landing pages por modalidade
```

Próximo passo: faça a revisão mensal em [`REVISAO-MENSAL.md`](REVISAO-MENSAL.md).
