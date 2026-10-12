---
name: preencher-icp
description: Preenche a camada 01-icp de uma marca no GTM Brain junto com a pessoa. Escreve o ICP.md (personas com firmografia, jobs to be done, gatilhos, dores, objeções, desqualificadores), o COMITE-DE-COMPRA.md e o VOZ-DO-CLIENTE.md, tirando o que der de calls, CRM, avaliações, suporte e entrevistas antes de perguntar. Use quando a pessoa disser "preencher o ICP", "definir persona", "quem é o meu cliente ideal", "montar o comitê de compra", "voz do cliente", "juntar citações de clientes", "organizar as dores do cliente", ou quando o relatório de lacunas apontar `preencher-icp`.
---

# Preencher o ICP

Você preenche `01-icp/`: para quem a marca escreve, o que essa pessoa quer resolver e com que palavras ela fala do problema. Todas as outras camadas leem daqui, então um campo inventado aqui contamina o resto.

Leia antes: [`../gtm-brain/referencias/regras.md`](../gtm-brain/referencias/regras.md). Pasta da marca, fontes primeiro, formato, marcações, gravação e cuidados estão lá. Esta skill só diz o que muda nesta camada.

Referências desta skill:

- [`referencias/extracao-de-fontes.md`](referencias/extracao-de-fontes.md): como tirar dado de transcrição, CRM, avaliação e suporte.
- [`referencias/pmf-por-segmento.md`](referencias/pmf-por-segmento.md): como escolher a persona primária pelo segmento que mais dá certo.
- [`referencias/roteiro-de-entrevista.md`](referencias/roteiro-de-entrevista.md): quando as fontes não bastam, como entrevistar clientes.

## 1. O que você preenche e quando acabou

| Arquivo | O que o GTM Brain lê | Pronto quando |
| --- | --- | --- |
| `ICP.md` | `## Persona primária: …`, `## Persona secundária: …`, `## Persona hipótese: …`, cada uma com 13 campos (`### Firmografia` até `### Onde encontrar`) | A persona primária tem os 13 campos presentes (nenhum `faltam …` no relatório), sem instrução entre colchetes; campo sem resposta está pendente com onde conseguir (regras, seção 6). O bloco de `## Como passar este arquivo para um agente de IA` está preenchido. |
| `VOZ-DO-CLIENTE.md` | `### …` dentro de `## Categorias de fonte` e `### Tema: …` dentro de `## Índice de temas` | Pelo menos 10 citações `[LITERAL]`, de duas origens ou mais, cada uma com fonte e data. Os cinco temas têm citação ou uma pendência que diz onde buscar. |
| `COMITE-DE-COMPRA.md` | `### …` dentro de `## Papéis no comitê`, com bullets de rótulo | Os oito papéis foram reescritos para a marca. A tabela `## Papéis por negócio` nomeia materiais reais ou pendentes. |

Rode `lacunas` antes de começar (regras, seção 1). Se `01-icp/` já tem arquivos preenchidos, trabalhe só nas fichas incompletas e nas pendências que o relatório lista.

## 2. Fontes: o que procurar e o que extrair

Comece pela lista `Fontes da marca:` no `10-cerebro/CEREBRO.md`. Ela é o registro de tags da marca: reutilize as tags de lá e acrescente ali cada fonte nova (regras, seção 4). Depois veja se outras camadas já têm resposta: `05-oferta/OFERTA.md` (para quem é cada oferta, preço), `05-oferta/GANHOS-E-PERDAS.md` (por que ganhou, por que perdeu, quem decidiu) e `08-conteudo/PROVAS.md` (IDs para a coluna Prova das objeções).

| Fonte | Extraia | Vai para |
| --- | --- | --- |
| Transcrições de call de venda ou descoberta | Cargo de quem fala, o que fez a pessoa procurar agora, dores com custo, objeções e quem levantou, alternativas citadas, quem mais decide, frases marcantes | Gatilhos, Dores, Objeções, Critérios, Comitê; VOC "Calls de venda" |
| Export do CRM (ganhos e perdidos) | Porte, segmento, cidade, ticket, ciclo de venda, origem do lead, motivo de perda | Firmografia, Faixa de orçamento, Desqualificadores, Onde encontrar; escolha da persona primária |
| Métricas da base (uso, retenção, cancelamento) | Retenção e cancelamento por segmento, quem indica | Escolha da persona primária, selos `[COMPROVADO]` |
| Suporte, chat, WhatsApp de atendimento | As duas primeiras frases de quem pede ajuda, o que trava no uso | VOC "Suporte e chat"; dores e medos do Usuário final |
| Avaliações públicas (da marca e dos concorrentes) | Notas 1 a 3 para dor e objeção, notas 4 e 5 para resultado, comparações | VOC "Avaliações", temas Resultado, Objeção e Comparação |
| Grupos, fóruns, comentários em redes | Como pedem ajuda aos pares, que ferramenta indicam | VOC "Fóruns" e "Comentários"; Consumo de conteúdo, Onde encontrar |
| Entrevistas de churn e de ganhos e perdas | Por que saiu, por que escolheu outro, quase não escolheu | VOC "Entrevistas de churn…"; Desqualificadores, Comparação |
| Entrevistas de pesquisa com clientes (antes e depois, descoberta) | Contexto, gatilho, rotina antes da marca, resultado nas palavras do cliente | VOC "Entrevistas de pesquisa com clientes" (veja abaixo); JTBD, Gatilhos, Dores |
| Propostas e contratos | Quem assina, prazo de aprovação, condições exigidas | Faixa de orçamento, Decisor econômico, Financeiro e Jurídico |
| Site da marca | Para quem a marca diz que vende | Só como `[PROPOSTA]`. O site diz quem a marca quer, não quem compra. |

Como extrair, em resumo (detalhe em `referencias/extracao-de-fontes.md`):

1. **Monte um inventário** antes de escrever: uma linha por achado, com o trecho, a fonte com ponteiro (`[CALLS §7]`), o campo de destino e o selo. Guarde na conversa ou num arquivo fora da pasta da marca.
2. **Citações:** copie as palavras exatas, com gíria e erro. Corte só em fim de frase. Tire telefone, CPF e sobrenome de quem não autorizou. Fique com as que nomeiam uma situação, um número, um sentimento ou uma alternativa. Elogio genérico ("atendimento ótimo") só entra se não houver outra.
3. **Classifique cada citação** por origem (uma das categorias de fonte) e por até dois temas (Problema, Gatilho, Resultado, Objeção, Comparação).
4. **Conte antes de selar.** Dor ou gatilho que aparece em três conversas independentes ou mais vira `[OBSERVADO]`. Com número medido (CRM, painel, contrato), `[COMPROVADO]`. Uma ou duas menções, ou só a opinião da pessoa, `[HIPÓTESE]`.
5. **Escolha a persona primária pelos dados**, não pela vontade: o segmento com mais retenção, indicação e venda mais rápida. Método em `referencias/pmf-por-segmento.md`.

Se não houver fonte nenhuma (marca nova, sem clientes), diga isso à pessoa. Preencha a persona primária com o que ela sabe, com selo `[HIPÓTESE]` em cada afirmação, e proponha de cinco a dez entrevistas com `referencias/roteiro-de-entrevista.md`. Registre a proposta como pendência no fim da persona.

## 3. Rodadas de perguntas

Antes de cada rodada, mostre em poucas linhas o que as fontes já responderam. Pergunte só o que faltou. Se a pessoa responder "não sei" duas vezes seguidas, pule o resto da rodada: marque os campos dela como pendentes, com onde conseguir, e siga para a próxima. Não force a pessoa a responder o que ela não tem. As opções abaixo são modelos: troque pelo que você inferiu das fontes, com a recomendada primeiro.

**Rodada 1, persona primária** (quando o CRM ou a base não decidem sozinhos)

1. Que grupo de clientes você mais quer repetir? Opções: o que fica mais tempo e indica (Recomendado); o que fecha mais rápido; o que paga mais; ainda não há clientes suficientes para saber.
2. Porte típico desse grupo: a faixa que você inferiu (Recomendado); uma faixa acima; uma abaixo.
3. Quem assina a compra? Opções: o dono (Recomendado quando a empresa tem menos de 10 pessoas); um sócio ou diretor; um gerente com teto de gasto.
4. Quantas personas agora? Opções: só a primária (Recomendado); primária e secundária, se houver dados para as duas; primária e uma hipótese para testar.

**Rodada 2, gatilhos e dores**

1. O que costuma acontecer logo antes de alguém procurar a marca? Múltipla escolha com os gatilhos que você achou, mais "outro".
2. Qual dor custa mais, em reais ou em horas? Opções com as dores do inventário, a mais citada primeiro (Recomendado).
3. Como essa pessoa resolve hoje, sem a marca? Opções: planilha ou processo manual; um concorrente (qual); contrata alguém; não resolve.

**Rodada 3, objeções e desqualificadores**

1. Quais objeções você mais ouve, e quem levanta cada uma? Opções com as do inventário.
2. Para quem você já disse não, ou deveria ter dito? Opções com os perfis dos negócios perdidos ou cancelados.
3. Para cada objeção, existe prova? Opções: ID já registrado em `PROVAS.md` (Recomendado quando existir); prova existe mas não está registrada (chame `registrar-provas` depois); não há prova ainda (fica como lacuna).

**Rodada 4, orçamento, critérios e consumo** (só o que faltar)

1. Quanto essa pessoa gasta hoje com o problema, em ferramentas e horas? Faixas inferidas.
2. O que pesa mais na escolha? Ordene os critérios que apareceram nos negócios ganhos.
3. Onde ela se informa? Múltipla escolha: grupos de WhatsApp ou Telegram, Instagram, LinkedIn, YouTube, Google, ChatGPT ou similar, eventos do setor, indicação de colega.

**Rodada 5, comitê** (para `COMITE-DE-COMPRA.md`)

1. Quem mais participa da decisão além de quem assina? Múltipla escolha com os oito papéis do template.
2. Quem já travou ou vetou um negócio, e por quê?
3. Quem usa no dia a dia, e do que essa pessoa tem medo?
4. Que papéis não existem para esta persona? (Recomendado: marcar como inexistente, não apagar.) Se a pessoa não sabe, o papel é desconhecido, não inexistente: fica pendente com onde descobrir.

## 4. Escrever

Ordem: `ICP.md`, depois `VOZ-DO-CLIENTE.md`, depois `COMITE-DE-COMPRA.md`. No fim, volte ao `ICP.md` para alinhar `### Comitê de compra (resumo)` com o mapa do comitê e preencher `## Trechos da voz do cliente`.

Em todos os arquivos: lista de fontes logo depois do título, data em `Última atualização` ou `Última revisão`, checklist marcado, seção `## Exemplo` e blocos "Exemplo de preenchimento:" apagados (regras, seção 3).

### ICP.md, campo a campo

| Título do template | De onde vem | Cuidado |
| --- | --- | --- |
| `## Persona primária: …` | Rodada 1 e CRM | Um primeiro nome e um contexto concreto: "Ana, dona de uma clínica de fisioterapia com 3 salas". Cliente real só com permissão (regras, seção 7). |
| Frase logo abaixo do título | Inventário | Quem é e por que importa, com selo e fonte. |
| `### Firmografia` (8 bullets) | CRM, contratos, base | Mantenha os rótulos em negrito. Use faixas reais, não as do template, se os dados mostrarem outras. |
| `### Demografia` (5 bullets) | Quem aparece nas calls, cargo no CRM | Cargos com as variações que o cliente usa. |
| `### Psicografia` (5 bullets) | Entrevistas e calls | Descreva comportamento visto, não adjetivo solto. Sem fonte, `[PROPOSTA]`. |
| `### Jobs to be done` (3 itens) | Calls e entrevistas | Formato "Quando…, quero…, para que eu possa…", com as palavras do cliente. Mantenha `**JTBD principal:**` e os outros rótulos. |
| `### Gatilhos` | Calls, rodada 2 | A lista do template é um cardápio. Apague o que não vale e escreva o gatilho concreto. |
| `### Dores` | Inventário, rodada 2 | Em ordem de prioridade, com custo em reais ou em tempo. Escreva a dor como o cliente diz, não como falta de uma função do produto. |
| `### Objeções e respostas` | Calls, perdidos, rodada 3 | Objeção entre aspas, nas palavras do comprador. Coluna Prova: ID que existe em `PROVAS.md`, ou "Sem prova ainda (lacuna)". Depois de `registrar-provas`, essa coluna é revisada. |
| `### Comitê de compra (resumo)` | `COMITE-DE-COMPRA.md` | Os seis rótulos do template. Escreva por último. |
| `### Desqualificadores` | Perdidos, cancelados, rodada 3 | Corte os itens do cardápio que não valem. Cada um com o motivo. |
| `### Faixa de orçamento` (4 bullets) | Resposta da pessoa, CRM, contratos, `/05-oferta/OFERTA.md` | Se a pessoa respondeu, use a resposta com `[CONVERSA AAAA-MM-DD]`, mesmo com a oferta em template. Se o rótulo pede anual e a resposta veio mensal (ou o contrário), converta e diga que converteu: "R$ 3.600/ano (R$ 300/mês × 12)". `[PENDENTE: /05-oferta/OFERTA.md]` só quando não há resposta nem fonte. |
| `### Critérios de decisão` | Negócios ganhos e perdidos | Em ordem de peso, de três a cinco. |
| `### Consumo de conteúdo` (7 bullets) | Rodada 4, comunidades | Nome do grupo, podcast ou evento quando souber. "a confirmar" conta como pendência, e tudo bem. |
| `### Onde encontrar` (3 bullets) | Origem dos leads, rodada 4 | Lugares concretos, não "redes sociais". |
| `## Trechos da voz do cliente` | `VOZ-DO-CLIENTE.md` | De três a cinco citações que já estão na biblioteca, com o mesmo selo e a mesma fonte. |
| `## Como passar este arquivo para um agente de IA` | O próprio arquivo | Troque todos os colchetes do bloco de código: nome da marca, persona, três JTBD, três dores. O GTM Brain conta `[Nome da empresa]` ali como placeholder. |

Persona secundária só com dados que a sustentem. Sem dados, use `## Persona hipótese: …`, comece com `[HIPÓTESE]` e diga o que confirmaria a aposta. As duas levam os mesmos 13 campos.

### VOZ-DO-CLIENTE.md

- Reescreva `## Por que isso importa` em duas ou três frases sobre os clientes desta marca, ou mantenha o texto do template.
- Em `## Categorias de fonte`, mantenha os sete títulos `###`. Se as fontes da marca incluem entrevistas de pesquisa com clientes, que não são de churn nem de ganhos e perdas, acrescente um oitavo título no fim da seção, `### Entrevistas de pesquisa com clientes`. O GTM Brain lê qualquer `###` dessa seção como uma origem. Não jogue essas citações em "Entrevistas de churn…". Troque os bullets de exemplo pelas citações, neste formato. O parágrafo de explicação abaixo de cada título pode sair.

  ```md
  - "Eu fecho o caixa no domingo porque durante a semana não dá." `[LITERAL]` `[CALLS §3]`, dona, loja de bairro com 4 funcionários, março de 2026
  ```
- Categoria sem citação: mantenha o título e escreva uma linha com `(pendente)` e onde buscar, por exemplo "pedir ao time de suporte os chamados de março".
- Em `## Índice de temas`, mantenha os cinco `### Tema: …`. Repita ali as citações da biblioteca, de duas a cinco por tema. Pode encurtar cortando, nunca trocando palavras.
- Citação de depoimento registrado em `PROVAS.md` leva o ID (`T-001`). Depoimento sem permissão leva `uso interno`.

### COMITE-DE-COMPRA.md

- Reescreva `## Por que o comitê importa` com o tamanho real do comitê de cada persona.
- **Um mapa só para a marca**, não um por persona. Quando um papel muda de uma persona para outra, escreva a diferença dentro do bullet: "No estúdio único, a dona decide sozinha. Na rede, o sócio financeiro aprova acima de R$ 1.000/mês." O resumo por persona fica em `### Comitê de compra (resumo)` de cada persona em `ICP.md`.
- Mantenha os oito títulos `###` e os sete rótulos de cada papel. **Reescreva todos os bullets.** O texto do template é genérico e não tem colchetes, então o GTM Brain conta como preenchido mesmo sem você mexer. Esse é o erro mais comum desta camada.
- **Papel inexistente** (a pessoa sabe que não há): mantenha o título e diga no `**Cargo típico:**` que não existe para tal persona e por quê, ou em que caso aparece. Os outros rótulos podem dizer só "não se aplica a <persona>".
- **Papel desconhecido** (ninguém sabe ainda): é diferente de inexistente. Mantenha o título e escreva no `**Cargo típico:**` `[PENDENTE: <onde descobrir>]`, por exemplo "perguntar nas próximas 3 calls de rede". Não escreva que o papel não existe.
- Se um negócio real ilustra o papel e a pessoa autorizou, acrescente um bullet `- **Em <cliente>:** …`.
- Na tabela `## Papéis por negócio`, troque cada célula pelo material que a marca tem. Material que ainda não existe: nome dele e `(pendente)`. A tabela vira a lista de conteúdo a produzir.

## 5. Verificar

1. Rode `lacunas` e confira o critério de pronto (regras, seção 6). Os três arquivos saem de "Arquivos ainda em template". A persona primária não aparece em "Fichas incompletas" com `faltam …`. Aparecer com `pendentes …` é esperado quando a resposta não existe ainda: a pendência diz onde conseguir. Não apague uma ressalva honesta para a ficha fechar.
2. Confira que nenhum ID citado em Objeções aparece em "Provas citadas sem definição".
3. Rode `build` e abra as categorias Personas, Comitê de compra e Voz do cliente. Cada persona mostra seus 13 campos, preenchidos ou pendentes, cada papel do comitê seus bullets, cada tema suas citações.
4. Confira à mão: o resumo do comitê no ICP bate com o mapa; toda citação de `## Trechos da voz do cliente` existe na biblioteca.
5. Trate o que o relatório listar de `01-icp/` em "Exemplo do template que ficou no arquivo" e em "Instruções do template nos arquivos preenchidos".
6. Atualize a linha `01 ICP` em `## Status das camadas` do `CEREBRO.md` e faça o resumo para a pessoa (regras, seção 6). O próximo passo costuma ser `preencher-voz`.

## 6. Armadilhas desta camada

- **Persona de imaginação.** Sem fonte, a persona é hipótese, mesmo que o fundador tenha certeza. Selo `[HIPÓTESE]` e plano de entrevista.
- **Persona média.** Juntar todos os clientes numa persona só produz alguém que não existe. Escolha o segmento com o encaixe mais forte.
- **Misturar as palavras do cliente com as da marca.** A biblioteca só guarda o que o cliente disse. Slogan, texto do site e frase do vendedor ficam fora. Nas dores, "não tenho tempo de cobrar ninguém", não "falta de automação de cobrança".
- **Paráfrase vestida de citação.** Se você reescreveu, é `[PARÁFRASE]`. Se só tem a anotação de alguém, também.
- **Dor sem custo.** Sem reais ou horas, a dor não ajuda a vender. Pergunte ou marque a pendência.
- **Cardápio do template mantido.** Gatilhos, desqualificadores e papéis do comitê vêm com exemplos genéricos. Ficar com eles deixa o arquivo "preenchido" e inútil.
- **Avaliação de concorrente tratada como cliente da marca.** Use para o tema Comparação e para dores, sempre dizendo de onde veio.
- **Objeção com prova que não existe.** Cite só ID registrado. Prova nova vai para `registrar-provas` primeiro.
