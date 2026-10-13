---
name: montar-plano
description: 'Monta o plano de marketing da marca no GTM Brain a partir dos números reais dela: a conta do cliente (meta de receita → clientes novos → taxa de fechamento → leads → leads diretos e taxa de conversão → visitas → teto de orçamento), o plano de uma página com os canais escolhidos em `11-plano/CANAIS.md`, a medição (`09-dados/`) e o calendário editorial de 90 dias. Use quando a pessoa disser "plano de marketing", "conta do cliente", "meta de receita", "quantos clientes eu preciso", "funil", "orçamento de marketing", "medição", "KPIs", "plano de medição", "UTM", "calendário editorial", "destaques" ou quando o relatório de lacunas apontar `11-plano/`, `09-dados/` ou `08-conteudo/CALENDARIO.md`.'
---

# Montar o plano

Você transforma uma meta de receita num plano que cabe numa página, com a conta à vista, um dono por canal, a medição que confere os números e o calendário que executa o plano. Cada linha volta à meta de receita.

Leia antes: [`../gtm-brain/referencias/regras.md`](../gtm-brain/referencias/regras.md). Aqui está só o que é próprio do plano.

## O que preenche e quando acaba

Na ordem:

1. `11-plano/CONTA-DO-CLIENTE.md`: os passos 1 a 6, com os números da marca. Os passos 1 a 3 vêm antes da escolha de canais; os passos 4 a 6 usam os canais de `11-plano/CANAIS.md`, que a skill `escolher-canais` preenche entre a rodada 2 e a rodada 3.
2. `11-plano/PLANO-DE-UMA-PAGINA.md`: as respostas da conta, os canais com o jeito de cada um entrar (visitas ou leads), os donos, o placar e a revisão.
3. `09-dados/MEDICAO.md`: ferramentas, KPIs com as metas do plano, definições, painéis, donos.
4. `09-dados/PLANO-DE-MEDICAO.md`: eventos, conversões, UTM, atribuição, consentimento.
5. `08-conteudo/CALENDARIO.md`: frequência por canal e os próximos 90 dias.
6. `09-dados/DESTAQUES.md`: só com dados medidos. Marca nova fica com pendência honesta.

Não preencha `EXEMPLO-cadencia.md` nem `PROMPTS.md`: são material de apoio. Em `REVISAO-MENSAL.md`, preencha só a linha **Meta** do registro de 12 meses. Em `HISTORICO.md`, acrescente logo abaixo da introdução uma seção `## AAAA-MM-DD: plano da <Marca>` com o que entrou; a mais recente fica em cima.

O plano está pronto quando:

1. `lacunas` não lista mais esses arquivos em "Arquivos ainda em template".
2. **A conta fecha:** refazendo cada linha com a calculadora, o resultado é o mesmo; as visitas dos canais de visita somam H; H × F mais os leads diretos por mês alcançam E ÷ 12; as metas do placar, de `MEDICAO.md` e de `REVISAO-MENSAL.md` são as mesmas do plano.
3. Cada taxa está marcada como medida ou como provisória, com a data de troca.
4. Todo canal do calendário está no plano, com o mesmo dono.
5. Todo canal do plano está em `11-plano/CANAIS.md`, com o mesmo "Entra como".

## Antes de começar

O plano depende de outras camadas. Confira com `lacunas`:

- **`/05-oferta/OFERTA.md` preenchido:** os preços formam o valor do cliente no primeiro ano. Sem oferta, chame `preencher-oferta` primeiro.
- **`/01-icp/ICP.md` preenchido:** o plano mira a faixa de cliente do ICP, e os canais saem de `### Onde encontrar` e `### Consumo de conteúdo`.
- **`/11-plano/CANAIS.md` preenchido antes da rodada 3:** os canais, os testes e o jeito de cada canal entrar na conta saem de lá. Se estiver em template quando você chegar à rodada 3, chame `escolher-canais` e volte com o resultado.
- **`/06-seo/CLUSTERS.md` e `/08-conteudo/PROVAS.md`:** alimentam o calendário. Se faltarem, o calendário sai com temas `[PROPOSTA]` tirados das dores do ICP e das ofertas, e você sugere `pesquisar-palavras-chave` e `registrar-provas`.

## Fontes

Comece pela lista `Fontes da marca:` do `10-cerebro/CEREBRO.md`. Ela é o registro de tags da marca: reutilize as tags de lá e acrescente ali cada fonte nova (regras, seção 4).

| Número ou campo | Onde buscar | Tag sugerida, se a marca ainda não tem uma para a mesma fonte |
| --- | --- | --- |
| Meta de receita, 12 meses | Orçamento ou plano financeiro, sócios | `[FINANCEIRO]` |
| Receita esperada da base | Sistema de cobrança (receita recorrente, contratos ativos), churn medido | `[COBRANCA]` |
| Valor do cliente no primeiro ano | Cobrança ou notas fiscais dos clientes que entraram nos últimos 12 a 24 meses | `[COBRANCA]` |
| Taxa de fechamento | CRM: ganhos ÷ leads do mesmo período, 6 a 12 meses. Sem CRM: 90 dias de WhatsApp, e-mail e agenda | `[CRM]` |
| Taxa de conversão | Leads ÷ sessões das páginas que vendem. Os eventos principais do GA4 são a aproximação; confira contra os leads do CRM no mesmo período (armadilhas). Perfil da empresa no Google: ações ÷ visualizações | `[GA4]` |
| De onde vêm os clientes | Campo de origem no CRM, pergunta "como conheceu" no fechamento | `[CRM]` |
| Canais, testes e "Entra como" | `/11-plano/CANAIS.md` (skill `escolher-canais`) | as tags de lá |
| Custo por lead ou por clique | Contas de anúncio, últimos 6 meses, conferido contra os leads que o CRM atribui à mídia paga. Se divergirem, mostre os dois na conta | `[ANUNCIOS]` |
| Gasto mensal em dinheiro | Faturas das contas de anúncio, das ferramentas e dos eventos | `[ANUNCIOS]`, `[FINANCEIRO]` |
| Ferramentas, eventos, UTM | Contêiner do Tag Manager, administração do GA4, o próprio site | `[SITE]` |
| Vencedores do conteúdo | GA4, Search Console, insights das redes, ferramenta de e-mail | `[GA4]`, `[REDES]` |
| Donos, horas, valor da hora | A pessoa | `[CONVERSA AAAA-MM-DD]` |

Se o seu ambiente tem conector para GA4, Search Console, CRM ou sistema financeiro, use. Senão, peça o export. Referência de mercado nunca entra como número da marca: ela vai para a tabela `## Referências` da conta, com fonte, janela de dados e data.

## Perguntas

Pergunte só o que as fontes não deram, até 4 por rodada (regras, seção 2).

**Rodada 1, a meta.**

1. **Meta de receita dos próximos 12 meses.** (Recomendado) o número do orçamento, se você achou; a receita dos últimos 12 meses mais o crescimento que a pessoa quer (pergunte quanto); não existe meta. Sem meta, a conta para no passo 1: registre `(pendente)` e siga só para a medição.
2. **Receita esperada da base.** (Recomendado) a que você calculou, com a conta à vista; outro número do financeiro.
3. **Período.** (Recomendado) o do orçamento, se houver; senão, os 12 meses a partir do mês que vem; o ano fiscal da marca.
4. **Valor do primeiro ano de quem.** (Recomendado) da faixa de cliente que o ICP quer conquistar; da base inteira, se a marca quer todas as faixas. Mostre os dois números quando a cobrança separar.

**Rodada 2, as taxas.**

1. **O que conta como lead.** Opções tiradas das ações do site (formulário, WhatsApp, agendamento, teste grátis, pedido de orçamento). (Recomendado) a ação que o CRM já registra.
2. **Taxa de fechamento.** (Recomendado) a medida no CRM, com a conta; contar agora 90 dias de conversas; provisória de 25% até uma data.
3. **Taxa de conversão.** (Recomendado) a medida no GA4; provisória de 2% até uma data.

**Rodada 3, canais e orçamento.** Leia `11-plano/CANAIS.md` antes (veja "Antes de começar"). Os canais do plano são os que estão lá como "no plano" e os três do círculo central em teste; o "Entra como" de cada um também vem de lá.

1. **Divisão dos leads entre os canais.** Fatias inteiras de E, somando 100%. (Recomendado) a sua proposta, a partir da origem dos clientes no CRM, com fatia pequena para cada canal em teste; as fatias iniciais da conta; a divisão que a pessoa quiser.
2. **Dono de cada canal.** Uma pessoa por canal. Os donos dos testes vêm de `CANAIS.md`.
3. **Fatia aceitável do valor do primeiro ano.** (Recomendado) 20% a 30% se a relação é recorrente e a margem é saudável; 10% a 15% se a compra é única e a margem é baixa.
4. **Valor da hora** de quem toca os canais, e as horas por mês de cada pessoa.
5. **Gasto mensal em dinheiro por canal** (anúncios, ferramentas, eventos). (Recomendado) o gasto real das contas e faturas dos últimos meses; um valor novo, se a pessoa quer mudar o investimento (aí pergunte como o canal mantém as visitas com o gasto novo).

**Rodada 4, o calendário.** Canais e frequência que cabem nas horas do passo 6, o cluster ou a oferta que puxa o trimestre e a data de início.

## Escrever

Abra cada arquivo com uma linha que diga de quem é o plano e o período, e com a lista de fontes. O GTM Brain usa o nome da marca no topo para saber que o arquivo é da marca.

### `11-plano/CONTA-DO-CLIENTE.md`

- Mantenha o método: as duas regras, as explicações de cada passo, `## Valores provisórios` e `## Por tipo de negócio`.
- Troque a frase que apresenta a Cadência por uma que diga que cada passo mostra a conta da marca e que o exemplo fictício está em `EXEMPLO-cadencia.md`.
- Preencha cada bloco de código com os números da marca e marque `[x] medida` ou `[x] provisória até AAAA-MM-DD`.
- Troque cada linha "Cadência (fictícia): …" pela conta da marca: os números, o resultado em negrito, a fonte e o selo.
- Em `## Referências`, deixe só as linhas usadas, com valor, fonte, janela de dados e data. Dado próprio da marca usado na conta (custo por lead das contas de anúncio, taxa do CRM) também entra, porque a caixa `ATUALIZADO EM` do plano repete esta tabela. Se nenhuma referência de mercado foi usada, diga isso numa linha.
- Se uma fonte errou na conta e o número arredondado não muda (a planilha do financeiro dá R$ 52 a mais), registre o número da fonte e o refeito, lado a lado.
- O passo a passo, a conferência e a lista de onde cada número se repete estão em [`referencias/conta-do-cliente.md`](referencias/conta-do-cliente.md).

### `11-plano/PLANO-DE-UMA-PAGINA.md`

- Copie as respostas da conta para o bloco, com os mesmos números.
- Troque "Outro: ___" pelo canal de verdade e apague as linhas de canais que a marca não vai usar. Preencha Fatia, Entra como (visitas ou leads), Meta/mês e Leads/mês de cada canal. A linha TOTAL mostra as visitas, os leads do site (H × F), os leads diretos e a soma.
- Placar, meta por mês: visitas = H; leads = E ÷ 12, para cima, com quantos vêm do site e quantos diretos; clientes = C ÷ 12, para cima; custo por cliente = J. A coluna "Real" fica "a medir".
- Revisão: dia, hora e dono da revisão mensal; os quatro meses em que a conta é refeita.
- Preencha a caixa `## Atualizado em` e a primeira linha do `## Histórico`.

### `09-dados/MEDICAO.md`

- Ferramentas que a marca usa de fato. Ferramenta que não usa sai, ou vira linha "Não usamos" com o motivo.
- A árvore de KPIs leva as metas do plano nas etapas que o plano cobre (visitas, leads, clientes, custo por cliente). Se o plano tem canais de leads, uma linha para os leads diretos, com a meta por mês e a origem no CRM. As outras etapas ficam "Acompanhar, sem meta" até haver linha de base.
- Reescreva `## Definições dos KPIs` com a definição de lead e de ganho do plano e acrescente a taxa de fechamento e a taxa de conversão, com o valor e a fonte.
- Nomes reais em painéis e donos dos dados. Apague `## Exemplo: …`.

### `09-dados/PLANO-DE-MEDICAO.md`

- Mantenha na taxonomia só os eventos que o site tem ou vai ter. Evento que falta instalar leva `(pendente)` e quem instala.
- Os eventos de conversão são exatamente as ações que o plano conta como lead.
- Para cada canal que entra como leads, o valor de origem no CRM e quem registra, em `## Modelo de atribuição`. É o único registro desses canais: o GA4 não os vê.
- Troque a URL de exemplo pelo domínio da marca. Apague `## Exemplo: …`.

### `08-conteudo/CALENDARIO.md`

- Os canais e os donos são os do plano.
- Cada linha dos 90 dias liga a um cluster, a uma oferta ou a uma prova.
- Troque `## Exemplo: uma semana na Cadência` por `### Uma semana típica` da marca, dentro de `## Frequência por canal`.
- Detalhes em [`referencias/calendario.md`](referencias/calendario.md).

### `09-dados/DESTAQUES.md`

- Só ativo com número medido, com a fonte e o período.
- Sem dados ainda, troque as linhas de cada tabela por "Nenhum vencedor registrado ainda (pendente: primeira seleção em AAAA-MM-DD)", 90 dias depois de a medição entrar no ar.
- Apague `## Exemplo`.

KPIs, eventos, UTM e critérios de vencedor estão em [`referencias/metricas.md`](referencias/metricas.md).

## Verificar

1. **Refaça a conta** com o roteiro de conferência de [`referencias/conta-do-cliente.md`](referencias/conta-do-cliente.md). Qualquer diferença de uma unidade é erro, não arredondamento.
2. **Confira as repetições:** cada número aparece igual em todos os lugares da tabela de repetições da mesma referência.
3. **Rode `lacunas`** (regras, seção 6). Nenhuma linha destes arquivos pode aparecer em "Exemplo do template que ficou no arquivo": as linhas da Cadência na conta saem todas. Atualize as linhas `09 Dados` e `11 Plano` em `## Status das camadas` do `CEREBRO.md`.
4. **Diga à pessoa**, em poucas linhas: clientes, leads e visitas por mês; se o custo planejado cabe no teto; as duas premissas que mais mexem no plano (a conta de sensibilidade da referência); que taxas são provisórias e até quando; o que ficou pendente.

## Armadilhas

- **Benchmark no lugar do número da marca.** Taxa de conversão de relatório de mercado não é a taxa do site da marca. Use o provisório rotulado e troque no trimestre.
- **Conta que não fecha.** Visitas dos canais diferentes de H, H × F mais os leads diretos abaixo de E ÷ 12, leads por mês arredondados para baixo, meta de `MEDICAO.md` diferente da do plano.
- **Canal de leads contado como visita.** Venda direta, prospecção, parceria, evento, feira e palestra geram o lead sem passar pelo site. Na coluna de visitas, eles inflam G e H e somem do placar. Eles entram como leads, com N no passo 4 e a origem no CRM em `PLANO-DE-MEDICAO.md`.
- **Receita total no passo 1.** O plano cobre a receita de clientes novos. Renovação e contrato assinado ficam fora.
- **Valor do tempo de vida no passo 2.** Use o valor do primeiro ano.
- **Valor do primeiro ano que a oferta não explica.** Se B passa de 12 mensalidades da oferta principal mais a implantação, pergunte de onde vem a diferença antes de seguir. Se fica mais de 20% abaixo, explique com o mix de planos, o churn do primeiro ano e quantos compraram a implantação.
- **Eventos não são leads.** O GA4 conta eventos; a mesma pessoa clica no WhatsApp e começa um teste. Compare os eventos principais com os leads do CRM no mesmo período. Se divergirem, diga a taxa por pessoa ao lado da taxa por evento e marque a conciliação como pendente.
- **Custo por lead da plataforma.** A conta de anúncio atribui por último clique e costuma contar mais leads que o CRM. Se o custo pelo CRM leva M acima de L, diga isso à pessoa: o plano só cabe no número mais otimista.
- **Gasto que cai sem explicação.** Se o plano põe menos dinheiro num canal do que ele gastou nos últimos meses e pede mais visitas dele, pergunte como.
- **Três definições de lead.** O lead do plano, o de `MEDICAO.md` e os eventos de conversão de `PLANO-DE-MEDICAO.md` têm que ser o mesmo.
- **Hora da equipe a zero.** O teto de orçamento cobre dinheiro e horas. Sem as horas, o plano parece caber e não cabe.
- **Calendário solto.** Peça sem cluster, oferta ou prova; canal fora do plano; mais peças do que as horas do passo 6 pagam; depoimento em anúncio sem "Anúncios" nos usos aprovados de `PROVAS.md`.
- **Destaque inventado.** Sem número medido, não há vencedor. Alcance e curtidas sozinhos não bastam.
