# Conta do cliente, passo a passo

Como fazer a conta de `11-plano/CONTA-DO-CLIENTE.md` com os números da marca, mostrar cada linha para alguém conferir e espalhar o resultado pelos outros arquivos sem que um número diverja do outro.

Os números desta página são ilustrativos e não são de nenhuma marca.

## As entradas

Junte tudo antes de calcular. Cada entrada tem fonte e selo; se não tiver, ela ainda não é uma entrada.

| Letra | Entrada | Fonte | Pode ser provisória? |
| --- | --- | --- | --- |
| | Meta de receita total, 12 meses | Orçamento, sócios | Não. Sem meta, não há conta |
| | Receita esperada da base, 12 meses | Cobrança, contratos, churn medido | Não. Se não há base (marca nova), é zero |
| B | Valor do cliente no primeiro ano | Cobrança por cliente, coorte dos últimos 12 a 24 meses | Só derivada da oferta, como `[HIPÓTESE]` (veja o passo 2) |
| D | Taxa de fechamento | CRM ou contagem de 90 dias | Sim: 25%, com data de troca |
| F | Taxa de conversão | GA4, perfil da empresa no Google | Sim: 2%, com data de troca |
| | Fatias dos canais | Origem dos clientes no CRM, decisão da pessoa | É decisão, leva `[PROPOSTA]` até a pessoa confirmar |
| I | Fatia aceitável do valor do primeiro ano | Decisão do negócio | É decisão da pessoa |
| | Gasto em dinheiro e horas por canal, valor da hora | A pessoa, contas de anúncio, faturas de ferramentas | Estimativa, com a conta à vista |

## A regra do arredondamento

Clientes, leads e visitas: divida, arredonde o resultado para 9 casas decimais e depois para cima, até o próximo inteiro. Dinheiro: em reais, com centavos quando houver, sem arredondar para cima. Escreva o valor antes de arredondar quando ele não for inteiro: `20.000 ÷ 12 = 1.666,7 → para cima = 1.667`.

## Passo a passo

**Passo 1, receita de clientes novos (A).** A = meta total − receita esperada da base.

Para receita recorrente, a base não rende 12 vezes a receita de hoje: ela perde clientes todo mês. Com receita recorrente mensal R e churn mensal c:

```
Receita da base em 12 meses = R × [1 + (1 − c) + (1 − c)² + … + (1 − c)¹¹]
R$ 50.000 com churn de 3%: R$ 50.000 × 10,2053 = R$ 510.262,73
```

Não conte expansão (cliente que sobe de plano) na base, para não inflar a conta. Para contratos com prazo, some as parcelas que vencem nos 12 meses. Para compra única, use a recompra esperada da base, tirada do histórico.

**Passo 2, clientes necessários (C).** C = A ÷ B, para cima.

B vem da cobrança: o que cada cliente que entrou nos últimos 12 a 24 meses pagou nos primeiros 12 meses, somado e dividido pelo número de clientes. Já inclui quem cancelou no caminho.

Sem esse histórico (marca nova, sistema trocado), derive B da oferta e marque `[HIPÓTESE]` até a primeira coorte fechar:

```
B ≈ preço mensal da oferta principal × [1 + (1 − c) + … + (1 − c)¹¹] + implantação
R$ 300 por mês, churn de 3%, sem implantação: R$ 300 × 10,2053 = R$ 3.061,58
```

Confira B contra `/05-oferta/OFERTA.md`. Se B passa de 12 mensalidades da oferta principal mais a implantação, a diferença precisa de explicação (upgrade, adicional, segunda compra). Se fica mais de 20% abaixo, explique com o mix de planos, o churn do primeiro ano e quantos compraram a implantação.

**Passo 3, leads (E).** E = C ÷ D, para cima. Escreva a definição de lead ao lado; ela vai igual para `MEDICAO.md` e `PLANO-DE-MEDICAO.md`.

**Passo 4, visitas (G e H).** G = E ÷ F, para cima. H = G ÷ 12, para cima. Visitas são só as das páginas que vendem; o blog fica fora.

**Passo 5, canais.** Cada canal recebe uma fatia inteira em %, somando 100%. Multiplique H pela fatia, arredonde todos para baixo, some, e distribua o que faltar para chegar a H, uma visita por vez, aos canais com a maior parte decimal. Empate: vence o canal que vem antes na lista.

```
H = 1.667, fatias 40%, 25%, 20%, 15%
1.667 × 40% = 666,8  → 666     1.667 × 25% = 416,75 → 416
1.667 × 20% = 333,4  → 333     1.667 × 15% = 250,05 → 250
Soma 1.665, faltam 2 → maiores frações: 0,8 e 0,75
Resultado: 667 + 417 + 333 + 250 = 1.667
```

**Passo 6, teto (J, K, L) e custo planejado (M).** J = B × I. K = J × C. L = K ÷ 12. M = gasto mensal em dinheiro + horas × valor da hora. M até 80% de L: cabe. De 80% a 100%: apertado. Acima de L: precisa mudar (canais mais baratos, conversão maior ou meta menor). Mostre M por item, no formato de `EXEMPLO-cadencia.md` (só o formato; os números de lá são inventados), para a pessoa ver onde cortar.

## Como a conta aparece no arquivo

Cada passo leva o bloco de código preenchido e uma linha com a conta da marca no lugar da linha da Cadência:

```md
Marca X: R$ 900.000 − R$ 500.000 = **R$ 400.000**. Meta do orçamento 2027 `[FINANCEIRO]`; base calculada com churn de 3% ao mês `[COBRANCA]`. `[COMPROVADO]`
```

Um bloco ilustrativo completo, para comparar:

```
Passo 1   R$ 900.000 − R$ 500.000             = R$ 400.000 de clientes novos   (A)
Passo 2   R$ 400.000 ÷ R$ 4.000               = 100 clientes                   (C)
Passo 3   100 ÷ 0,25                          = 400 leads                      (E)   provisória até 2027-01-31
Passo 4   400 ÷ 0,02                          = 20.000 visitas por ano         (G)   provisória até 2027-01-31
          20.000 ÷ 12 = 1.666,7 → para cima   = 1.667 visitas por mês          (H)
Passo 6   R$ 4.000 × 25%                      = R$ 1.000 por cliente           (J)
          R$ 1.000 × 100                      = R$ 100.000 por ano             (K)
          R$ 100.000 ÷ 12                     = R$ 8.333,33 por mês            (L)
Placar    400 ÷ 12 = 33,3 → 34 leads por mês; 100 ÷ 12 = 8,3 → 9 clientes por mês
```

## Conferência

Refaça a conta num script temporário, fora da pasta da marca, com as entradas do arquivo. Se um número do script diferir do arquivo, corrija o arquivo.

```js
// node conferir.mjs
const up = (a, b) => Math.ceil(Math.round((a / b) * 1e9) / 1e9)
const meta = 900000, base = 500000, B = 4000, D = 0.25, F = 0.02, I = 0.25
const fatias = [40, 25, 20, 15] // na ordem do plano
const A = meta - base, C = up(A, B), E = up(C, D), G = up(E, F), H = up(G, 12)
const bruto = fatias.map((p) => (H * p) / 100), canais = bruto.map(Math.floor)
const resto = bruto.map((v, i) => [v - Math.floor(v), i]).sort((a, b) => b[0] - a[0] || a[1] - b[1])
const faltam = H - canais.reduce((s, v) => s + v, 0)
for (let k = 0; k < faltam; k++) canais[resto[k][1]]++
const J = B * I, K = J * C, L = K / 12
console.log({ A, C, E, G, H, canais, leadsMes: up(E, 12), clientesMes: up(C, 12), J, K, L })
```

## Onde cada número se repete

Mude um número aqui e mude em todos os lugares desta tabela no mesmo momento.

| Número | Aparece em |
| --- | --- |
| A, B, C | `PLANO-DE-UMA-PAGINA.md` (META) |
| D, E, definição de lead | `PLANO-DE-UMA-PAGINA.md` (CONTA), `09-dados/MEDICAO.md` (definições, KPI de leads), `09-dados/PLANO-DE-MEDICAO.md` (eventos de conversão) |
| F, H | `PLANO-DE-UMA-PAGINA.md` (CONTA e placar), `MEDICAO.md` (KPI de visitas) |
| Visitas por canal e donos | `PLANO-DE-UMA-PAGINA.md` (CANAIS E DONOS), `08-conteudo/CALENDARIO.md` (frequência por canal) |
| J, K, L, M | `PLANO-DE-UMA-PAGINA.md` (ORÇAMENTO e placar), `MEDICAO.md` (custo por cliente) |
| Metas por mês | `PLANO-DE-UMA-PAGINA.md` (PLACAR), `REVISAO-MENSAL.md` (linha **Meta**) |
| Referências usadas | `CONTA-DO-CLIENTE.md` (`## Referências`), caixa `## Atualizado em` do plano |

## Sensibilidade

Antes de apresentar o plano, refaça os passos 3 a 6 duas vezes: com a taxa de fechamento 25% menor e com a taxa de conversão 25% menor. Diga à pessoa quanto sobem os leads (E) e as visitas por mês (H) em cada cenário. M só muda se o gasto cresce com as visitas: se a mídia paga é comprada por clique ou por lead, refaça M com o gasto proporcional às visitas pagas a mais e diga se passa de L. Mostre também M com o custo por lead do CRM, se ele divergir do da plataforma. Essa é a premissa que ela precisa medir primeiro. Não grave os cenários no arquivo; eles servem para a conversa e para o primeiro prompt de `PROMPTS.md`.
