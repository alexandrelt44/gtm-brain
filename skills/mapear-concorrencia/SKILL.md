---
name: mapear-concorrencia
description: Preenche `05-oferta/CONCORRENCIA.md` (mapa competitivo, um registro por concorrente ou substituto, battle cards) e `05-oferta/GANHOS-E-PERDAS.md` (negócios ganhos e perdidos, padrões agregados e o roteiro de entrevista) de uma marca no GTM Brain. Pesquisa sites, páginas de preço, avaliações, vagas e bibliotecas de anúncios dos concorrentes e lê CRM e calls antes de perguntar. Use quando a pessoa disser "concorrentes", "concorrência", "mapear a concorrência", "mapa competitivo", "battle card", "comparar com <concorrente>", "por que perdemos", "ganhos e perdas", "win/loss", "entrevista de perda" ou quando o relatório de lacunas apontar um desses arquivos.
---

# Mapear concorrência e ganhos e perdas

Você preenche os dois arquivos que dizem contra o que a marca disputa cada venda e por que ganha ou perde. Os agentes leem `CONCORRENCIA.md` para escrever páginas comparativas e respostas a objeções, e `GANHOS-E-PERDAS.md` para saber quais objeções pesam de verdade.

Leia antes: [`../gtm-brain/referencias/regras.md`](../gtm-brain/referencias/regras.md). Elas valem inteiras. Aqui está só o que muda nesta camada.

Método mais longo: [`referencias/pesquisa-de-concorrente.md`](referencias/pesquisa-de-concorrente.md) (como pesquisar cada concorrente) e [`referencias/roteiro-ganhos-e-perdas.md`](referencias/roteiro-ganhos-e-perdas.md) (entrevista e registro de negócios).

## O que esta skill preenche

| Arquivo e seção | Vira no GTM Brain | Pronto quando |
| --- | --- | --- |
| `CONCORRENCIA.md`, `## Mapa competitivo` | documento | Uma linha por registro, com categoria, sobreposição, ameaça e data |
| `CONCORRENCIA.md`, `## Concorrente: <Nome>` | registro "Concorrentes" | Os 8 campos presentes (Oferta, Preço, Pontos fortes, Pontos fracos, Mensagens públicas, Cliente típico, Como ganhamos, Como perdemos), cada um preenchido ou pendente com onde conseguir |
| `CONCORRENCIA.md`, `### Battle card: <Nome>` | registro "Battle cards" | Um por concorrente que já tirou ao menos um negócio da marca, por concorrente de ameaça alta e por substituto principal |
| `GANHOS-E-PERDAS.md`, `## Negócio: <Cliente>, Ganho` ou `, Perdido` | registro "Ganhos e perdas" | Sem colchete de modelo sobrando; citações com selo e fonte |
| `GANHOS-E-PERDAS.md`, `## Padrões agregados` | documento | Contagens "X de Y negócios", ou a prévia marcada `[HIPÓTESE]` |

**Substitutos também são registros.** Planilha, fazer em casa, contratar alguém, agência e não fazer nada entram como `## Concorrente: <nome>`, com `**Categoria:** Substituto`, e com os mesmos oito campos. Em geral, eles ganham mais vendas do que qualquer concorrente com nome.

Os arquivos estão prontos pelo critério de regras, seção 6: fora de "Arquivos ainda em template", sem linha em "Instruções do template" nem em "Exemplo do template", e nenhum concorrente com `faltam …` em "Fichas incompletas". Concorrente com `pendentes …` está certo se cada pendência diz onde conseguir. Se a marca ainda não tem nenhum negócio fechado, `GANHOS-E-PERDAS.md` fica com o modelo, e isso é honesto (veja "Sem negócios ainda", abaixo).

## Antes de começar

1. Rode `lacunas` (regras, seção 1).
2. Confira as dependências:
   - **`05-oferta/OFERTA.md`**: "Como ganhamos" sai da diferenciação e das ofertas. Se estiver em template, sugira `preencher-oferta` antes.
   - **`01-icp/ICP.md`**: o "Cliente típico" de cada concorrente é comparado com a persona da marca.
   - **`08-conteudo/PROVAS.md`**: battle cards e "Como ganhamos" citam IDs de lá.
3. Leia a lista `Fontes da marca:` no `10-cerebro/CEREBRO.md`. Ela é o registro de tags da marca: reutilize as tags de lá e acrescente ali cada fonte nova (regras, seção 4).

## Fontes: o que ler e o que tirar

**Da marca (internas):**

| Fonte | O que tirar |
| --- | --- |
| Export do CRM | Negócios ganhos e perdidos, valor, origem, ciclo, motivo da perda, para quem perdeu |
| Transcrições de calls de venda | Que concorrentes o comprador cita, o que diz deles, que objeção trava |
| Entrevistas de ganhos e perdas, pesquisas de cancelamento | Motivos nas palavras do comprador |
| Propostas perdidas e e-mails de recusa | Preço, escopo e prazo comparados |
| Suporte e cancelamentos | Para onde vai quem sai, e por quê |
| `01-icp/ICP.md` e `01-icp/VOZ-DO-CLIENTE.md` | Gatilhos, jobs e o jeito que o cliente resolve hoje (os substitutos) |
| Notas do time de vendas | Opinião do vendedor. Útil para achar pistas, fraca como prova |

**Dos concorrentes (públicas).** Se você tem busca e leitura de páginas na web, use. Senão, peça os links à pessoa.

**Confira a entidade antes de usar um resultado.** Nome de concorrente colide fácil ("AgendaFit" pode ser três empresas). Antes de tirar qualquer dado de uma página, confirme que é a mesma empresa que o cliente citou: domínio, segmento e país batem com o que aparece no CRM, nas calls ou na fala da pessoa. Se não der para confirmar, não use: peça o link à pessoa e deixe o campo pendente.

| Fonte | O que tirar |
| --- | --- |
| Site: home, produto, preços, clientes, sobre | Título principal, oferta, preço publicado, cliente típico, porte |
| Arquivo da internet (archive.org) | Preço antigo, mudanças de posicionamento |
| Avaliações: G2, Capterra, Reclame Aqui, Google, App Store, Google Play | O que elogiam, do que reclamam, por que trocam |
| Vagas: LinkedIn, sites de vaga | Onde estão investindo, porte do time |
| Bibliotecas de anúncios: Meta Ad Library, Central de Transparência do Google Ads | Mensagens que estão pagando para mostrar |
| LinkedIn da empresa, imprensa, rodadas de investimento | Sinal de porte |
| Comunidades: grupos, fóruns, Reddit | Preço comentado, reclamação sem filtro |

Toda informação de fora entra com tag de fonte e data de leitura: `` `[SITE-CONCORRENTE-A]` páginas de preço e produto, lidas em 2026-10-12 ``. Concorrente muda preço sem avisar; dado sem data perde valor rápido.

**Preço contado pela pessoa** ("R$ 99/mês, segundo o site deles") entra como `[CONVERSA AAAA-MM-DD]`, com a data da conversa. Isso cumpre "data e fonte". Selo: `[OBSERVADO]` se a pessoa leu no site do concorrente; `[PARÁFRASE]` se ouviu de um prospect ou do vendedor; `[HIPÓTESE]` se é lembrança ou estimativa. Se depois você ler o site, troque pela tag do site e a data da leitura.

## Passo a passo

1. **Lista de candidatos.** Junte os nomes do CRM (para quem perdeu), das calls, do ICP e de buscas como "alternativas a <marca>", "<categoria> para <público>". Inclua os substitutos. Classifique cada um em direto, indireto ou substituto.
2. **Rodada 1 de perguntas** (abaixo): quem entra no mapa.
3. **Pesquisa por concorrente**, das fontes para os oito campos. Método em [`referencias/pesquisa-de-concorrente.md`](referencias/pesquisa-de-concorrente.md).
4. **Rodada 2:** o que só o time sabe.
5. **Battle cards.**
6. **Ganhos e perdas:** importe os negócios, rodada 3, escreva os registros e os padrões.
7. **Verificar.**

## Rodadas de perguntas

No máximo 3 ou 4 perguntas por rodada, com opções já preenchidas e a recomendada primeiro. Pule o que as fontes já responderam.

**Rodada 1: o mapa**

1. "Quem entra no mapa?" Opções: os 3 a 5 diretos mais citados no CRM e nas calls, mais os 2 substitutos principais (Recomendado); só os diretos; uma lista que a pessoa ditar.
2. "Qual o nível de ameaça de cada um?" Opções: a classificação pela contagem de perdas no CRM (Recomendado); ajustar à mão.
3. "Quem é dono das atualizações deste arquivo?" Opções: quem responde por vendas (Recomendado); outra pessoa.

**Rodada 2: o que só o time sabe**

1. "Em que situação vocês perdem para <concorrente>?" Opções: os cenários que aparecem nos negócios perdidos (Recomendado); outro.
2. "Um prospect mostrou a proposta de <concorrente>. Pode registrar o preço?" Opções: sim, marcado `uso interno` e com a data (Recomendado); não registrar.
3. "Que prova vocês usam quando <concorrente> aparece?" Opções: o ID que mais aparece nos ganhos contra ele (Recomendado); outra.

**Rodada 3: ganhos e perdas**

1. "Quais negócios registrar primeiro?" Opções: os últimos cinco fechados, misturando ganhos e perdas (Recomendado); só perdas do último trimestre; os maiores.
2. "Pode usar o nome do cliente?" Opções: nome no arquivo, que é interno, e nunca em conteúdo público sem autorização escrita (Recomendado); descrição sem nome ("clínica com 3 unidades, Curitiba").
3. "Existem gravações ou entrevistas desses negócios?" Opções: sim, mando as transcrições (Recomendado); não, só o CRM e o vendedor.

## Escrever `CONCORRENCIA.md`

Mantenha os títulos do template. Os subtítulos `### Oferta` e `### Preço` precisam estar escritos assim, sem nada a mais, para o GTM Brain reconhecer o campo.

**Topo.** Lista `Fontes citadas neste arquivo:` logo depois do título, com o nome da marca numa das linhas (o GTM Brain usa isso para saber que o arquivo foi preenchido). `Última atualização:`, uma linha `Dono das atualizações:` e o checklist marcado com `[x]` no que o arquivo cumpre.

**`## Mapa competitivo`.** Uma linha por registro `## Concorrente:`, com o mesmo nome. Troque `[Fazer em casa]` e `[Não fazer nada]` pelo substituto real da marca ("Planilha + WhatsApp", "Contratar um assistente"). Apague linhas que sobrarem.

**`## Concorrente: <Nome>`**, um por linha do mapa:

| Campo | O que entra | Cuidado |
| --- | --- | --- |
| `**Categoria:**`, `**URL:**`, `**Sede:**`, `**Sinal de porte:**` | Dados de identificação | Substituto: "não se aplica" em URL e sede |
| `**Posicionamento nas palavras deles:**` | O título principal do site, entre aspas | Literal, com a data em que leu |
| `### Oferta` | O que vendem na linguagem deles; depois, em linguagem simples | |
| `### Preço` | Preço ou faixa com data e fonte; planos; condições | Preço não publicado: escreva isso e o sinal indireto. Preço de proposta: `uso interno`. Preço contado pela pessoa: `[CONVERSA AAAA-MM-DD]` com selo (acima). Nunca estime como se fosse fato |
| `### Pontos fortes` | O que um cliente deles elogiaria | Pontos fortes reais. Sem eles, ninguém confia no resto |
| `### Pontos fracos` | Com evidência: avaliação, entrevista, negócio | Cada um com tag de fonte |
| `### Mensagens públicas` | Tema e um título literal | Do site e dos anúncios, com data |
| `### Cliente típico` | Persona, segmentos, região | De cases, logos, avaliações e anúncios |
| `### Como ganhamos` | Diferencial, prova com ID, cenário | Ligue à `## Diferenciação` de `/05-oferta/OFERTA.md` |
| `### Como perdemos` | Cenário, recurso que falta, sensibilidade a preço | Honesto. Aponte para o negócio em `/05-oferta/GANHOS-E-PERDAS.md` |
| `### Última atualização` | `AAAA-MM-DD, autor` | |

Para substitutos, "Preço" é o custo escondido (horas, erros, dinheiro perdido) e "Mensagens públicas" é o que as pessoas dizem para justificar ("sempre fiz assim").

**`## Battle cards`.** Um `### Battle card: <Nome>` por concorrente que já tirou ao menos um negócio da marca (mesmo com ameaça média ou baixa numa amostra pequena), por concorrente de ameaça alta e por substituto principal, com o mesmo nome do registro. Mantenha os cinco passos do template (reconheça, pergunte, reenquadre, prove, feche) e troque o texto genérico por frases da marca. "Prove" cita uma prova com ID; "Prova preferida" lista os IDs. "Não diga" tem itens específicos daquele concorrente, além dos três do template. Apague `### Battle card: [Concorrente B]` e os battle cards de "Fazer em casa" e "Não fazer nada" que não correspondem a nenhum registro.

**`## Exemplo`.** Apague a seção inteira. Mantenha `## Como passar este arquivo para um agente de IA`.

## Escrever `GANHOS-E-PERDAS.md`

**`## Como fazemos as entrevistas`.** Mantenha o roteiro de cinco perguntas. Ajuste quem entrevista e quando, com o que a pessoa disse. Roteiro completo, com perguntas de aprofundamento, em [`referencias/roteiro-ganhos-e-perdas.md`](referencias/roteiro-ganhos-e-perdas.md).

**`## Modelo de registro de negócio`.** Troque "Copie o modelo abaixo." por "Um registro por negócio, sempre com os mesmos campos." e troque o registro de modelo pelos negócios reais.

**`## Negócio: <Cliente>, Ganho`** (ou `, Perdido`), um por negócio:

- Os rótulos em negrito do topo vêm do CRM. Sem entrevista, escreva `**Data da entrevista:** não houve` e `**Entrevistador:** não houve`.
- `### O que quase fez perder` e `### O que fez ganhar (ou perder)`: palavras do comprador, com `[LITERAL]` ou `[PARÁFRASE]`, quem disse e a fonte. Opinião do vendedor entra como `[HIPÓTESE]`, dizendo que é do vendedor.
- `### Provas que fecharam` só em ganho; `### Motivos da perda` só em perda. No outro caso, escreva "Não se aplica (negócio ganho)" ou "(negócio perdido)". Não apague o subtítulo.
- `### Lições e mudanças`: a mudança, o dono e a data. Se a lição muda a oferta, o ICP ou um concorrente, cite o caminho (`/05-oferta/OFERTA.md`) e proponha a mudança à pessoa. Não edite outra camada sem ela concordar.
- Se o negócio desmente uma promessa ou uma prova, marque `[CONTRADIZ: <ID>]` na frase.
- **Cliente entrevistado sem negócio no CRM.** A entrevista ainda é fonte: cite-a nos padrões, nos pontos fracos e no "Como ganhamos". Mas não crie `## Negócio:` sem desfecho de negócio (ganho ou perdido) registrado. Avise a pessoa de que o CRM não tem o negócio dela.

**`## Padrões agregados`.** Conte, não opine: "2 de 3 negócios". Com menos de 10 registros, abra a seção com "Prévia com N registros. Refazer quando chegarmos a 10." e marque `[HIPÓTESE]`. Cada objeção da tabela leva a melhor resposta e o ID de prova.

**`## Exemplo`.** Apague.

**Sem negócios ainda.** Não invente negócio. Preencha `## Como fazemos as entrevistas`, deixe o modelo de registro como está e marque a camada como `🟡 parcial` no `CEREBRO.md`, dizendo que falta o primeiro negócio fechado. O arquivo continua em "Arquivos ainda em template", e está certo.

## Verificar

1. Rode `lacunas` e confira o critério de pronto (regras, seção 6). Nenhum concorrente com `faltam …`; os battle cards aparecem com o mesmo nome dos registros.
2. Prova citada sem definição: registre com `registrar-provas` ou troque por `[PENDENTE: /08-conteudo/PROVAS.md]`.
3. Confira que todo preço de concorrente tem data e fonte, e que nada marcado `uso interno` foi parar num battle card.
4. Atualize `## Status das camadas` no `CEREBRO.md` e diga à pessoa o que entrou, o que ficou pendente e o próximo passo.

## Armadilhas

- **Inventar ou estimar o preço do concorrente.** Sem fonte, escreva "preço não publicado" e o sinal que existe.
- **Concorrente trocado.** Resultado de busca com o mesmo nome e outra empresa. Domínio, segmento e país antes de qualquer dado.
- **Comparação só de recursos.** Recurso sem cenário não ajuda ninguém a decidir. Diga em que situação cada um ganha.
- **Battle card que fala mal.** O comprador desconfia de quem ataca. Reconheça a força do outro e ganhe no cenário certo.
- **Ganhos e perdas pela voz do vendedor.** O vendedor lembra da própria versão. O que vale é o que o comprador disse.
- **Esquecer os substitutos.** O mapa só com concorrentes de nome esconde a alternativa que mais vence: não fazer nada.
- **Concorrentes demais.** De três a cinco diretos. O resto é ruído até aparecer num negócio.
- **Um negócio virar padrão.** Um caso é história. Padrão exige contagem.
- **Nome de cliente perdido em conteúdo público.** Nunca, sem autorização escrita.
