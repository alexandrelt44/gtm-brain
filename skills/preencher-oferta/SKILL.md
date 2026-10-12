---
name: preencher-oferta
description: 'Preenche `05-oferta/OFERTA.md` de uma marca no GTM Brain, com posicionamento, promessas, diferenciação, provas de venda, cada oferta (`## Oferta N: …`) com os nove campos, pacotes e princípios de preço. Lê site, página de preços, propostas, contratos, CRM e calls antes de perguntar. Use quando a pessoa disser "preencher a oferta", "o que a gente vende", "posicionamento", "proposta de valor", "promessas da marca", "diferenciação", "precificação", "preço dos planos", "pacotes", "tabela de preços" ou quando o relatório de lacunas apontar `05-oferta/OFERTA.md`.'
---

# Preencher a oferta

Você preenche o arquivo que diz o que a marca vende, para quem, por quanto e com que prova. Todo agente que escreve página de vendas, proposta ou e-mail comercial lê este arquivo primeiro. Uma promessa errada aqui vira uma promessa errada em todo lugar.

Leia antes: [`../gtm-brain/referencias/regras.md`](../gtm-brain/referencias/regras.md). Elas valem inteiras. Aqui está só o que muda nesta camada.

Método mais longo: [`referencias/posicionamento.md`](referencias/posicionamento.md) (posicionamento, promessas e diferenciação) e [`referencias/preco.md`](referencias/preco.md) (modelo de preço, pacotes, desconto).

## O que esta skill preenche

| Seção do template | Vira no GTM Brain | Pronto quando |
| --- | --- | --- |
| `## Posicionamento` | documento | Uma frase no formato do template, com a alternativa nomeada |
| `## Promessas` | documento | De 3 a 5 promessas, cada uma com selo e ID de prova ou `[HIPÓTESE]` |
| `## Diferenciação` | documento | Diferenciais concretos, cada um contra uma alternativa real |
| `## Provas para toda conversa de venda` | documento | Só IDs que existem em `/08-conteudo/PROVAS.md` |
| `## Oferta N: <Nome>` | registro "Ofertas" | Os 9 campos presentes (Para quem é, O que inclui, Prazo, Preço, Resultados esperados, Prova, Por que criamos esta oferta, Como é vendida, Como é entregue), cada um preenchido ou pendente com onde conseguir |
| `## Pacotes` e `## Princípios de preço` | documento "Pacotes e princípios de preço" | Matriz com preço por nível, ou uma linha dizendo que não se aplica; princípios que a marca segue de verdade |

O arquivo está pronto pelo critério de regras, seção 6: fora de "Arquivos ainda em template", sem linha em "Instruções do template" nem em "Exemplo do template", nenhuma oferta com `faltam …` em "Fichas incompletas", e nenhuma prova citada aqui em "Provas citadas sem definição". Oferta que aparece com `pendentes …` está certa se cada pendência diz onde conseguir o dado.

## Antes de começar

1. Rode `lacunas` (regras, seção 1) e confira o estado das camadas de que a oferta depende:
   - **`01-icp/ICP.md`**: persona, jobs, dores, desqualificadores e orçamento alimentam o posicionamento e o "Para quem é". Se estiver em template, sugira `preencher-icp` antes. Se a pessoa quiser seguir assim mesmo, o posicionamento sai como `[HIPÓTESE]`.
   - **`08-conteudo/PROVAS.md`**: promessas e resultados citam IDs de lá. Se estiver vazio, combine com a pessoa rodar `registrar-provas` junto ou logo depois. Até lá, promessa sem prova fica `[HIPÓTESE]`.
   - **`05-oferta/CONCORRENCIA.md`**: o posicionamento precisa de uma alternativa contra a qual a marca é comparada. Se ainda estiver em template, pergunte só a principal alternativa agora e deixe o resto para `mapear-concorrencia`.
2. Leia a lista `Fontes da marca:` no `10-cerebro/CEREBRO.md`. Ela diz onde procurar e é o registro de tags da marca: reutilize as tags de lá e acrescente ali cada fonte nova (regras, seção 4).

## Fontes: o que ler e o que tirar

Leia tudo o que existir antes da primeira pergunta. Anote de onde veio cada dado e, para páginas da web, a data em que você leu.

| Fonte | O que tirar | Vai para |
| --- | --- | --- |
| Site da marca: home, serviços ou produto, preços, sobre, FAQ | Nome das ofertas, título principal, entregas, preço publicado, condições, garantias | Oferta N, Pacotes, posicionamento atual (para comparar, não para copiar) |
| Propostas e contratos enviados | Escopo real, prazos, preço praticado, condições de pagamento, cláusula de saída, descontos dados | O que inclui, Prazo, Preço, Princípios de preço |
| Export do CRM (negócios ganhos) | Valor médio por oferta, origem do lead, duração do ciclo, quem vendeu | Como é vendida, Preço (o que se cobra de fato) |
| Transcrições de calls de venda | Como o vendedor explica a oferta, objeções de preço, palavras que o cliente usa | Posicionamento, Diferenciação, Princípios de preço |
| `01-icp/ICP.md` e `01-icp/VOZ-DO-CLIENTE.md` | Persona, jobs, dores, desqualificadores, faixa de orçamento | Posicionamento, Para quem é |
| `08-conteudo/PROVAS.md` | IDs de cases, depoimentos, dados e capacidades, com permissão de uso | Promessas, Resultados esperados, Prova, Provas para toda conversa |
| `05-oferta/CONCORRENCIA.md` e `GANHOS-E-PERDAS.md` | Principal alternativa, motivos de ganho, objeções que mais pesam | "Diferente de…" no posicionamento, Diferenciação |
| Playbook de implantação, onboarding, organograma | Quem entrega, etapas, tempo até a primeira entrega | Prazo, Como é entregue |
| Notas de fundação, posts antigos, histórico do produto | Quando e por que a oferta nasceu | Por que criamos esta oferta |
| Planilha de preços interna | Preço de tabela, preço mínimo, desconto permitido | Preço e Pacotes, com o que for interno marcado `uso interno` |

O que o site afirma não está comprovado só por estar no site. Uma promessa de **resultado** ("reduz a inadimplência", "pronto em 5 dias") sem ID de prova entra como `[HIPÓTESE]` e vira pergunta.

Termo de contrato é diferente: "sem fidelidade", "cancele quando quiser", "implantação inclusa", publicados na página de preços ou no contrato da própria marca, são `[COMPROVADO]` com a tag da fonte (`[SITE]`, `[CONTRATO]`). A marca define os próprios termos; a fonte é a prova. Se o contrato diz outra coisa que o site, marque `[CONTRADIZ: …]`.

## Passo a passo

1. **Inventário.** Liste tudo o que a marca vende, com a fonte de cada item. Separe oferta (o cliente compra sozinha), complemento (só se compra junto, como implantação ou suporte extra) e nível de pacote (a mesma oferta em tamanhos diferentes). Complemento entra no "Preço" da oferta.

   **Planos de um mesmo produto.** Se a marca vende planos ou níveis (Essencial, Estúdio, Rede) e cada plano é comprado sozinho, cada plano é um registro `## Oferta N: <Plano>`, com os nove campos. `## Pacotes` compara os planos lado a lado. **Um preço, um lugar:** o valor mora no `### Preço` de cada oferta; a matriz de `## Pacotes` repete o valor e aponta para a oferta ("R$ 249/mês, ver Oferta 1"). Ao mudar um preço, mude na oferta e depois na matriz, na mesma edição. A Oferta 1 é a principal, que a pessoa escolhe (pode ser um dos planos).
2. **Posicionamento.** Monte os cinco componentes (alternativas, atributos únicos, valor, cliente-alvo, categoria) com o que as fontes deram e escreva duas versões da frase. Método em [`referencias/posicionamento.md`](referencias/posicionamento.md).
3. **Promessas e provas.** Para cada promessa candidata, ache o ID que a sustenta. Sem ID, promessa de resultado é `[HIPÓTESE]` ou sai. Depois de `registrar-provas`, essas hipóteses são revisadas e promovidas quando a prova sustenta a frase.
4. **Perguntas.** Uma rodada por vez, só sobre o que as fontes não responderam (próxima seção).
5. **Escrever** no arquivo, campo a campo.
6. **Verificar** e atualizar o `CEREBRO.md`.

## Rodadas de perguntas

No máximo 3 ou 4 perguntas por rodada, com opções já preenchidas pelo que você inferiu e a recomendada primeiro. Pule a pergunta que as fontes já responderam. Exemplos de perguntas que costumam sobrar:

**Rodada 1: catálogo e posicionamento**

1. "Estas são as ofertas separadas que encontrei. Confere?" Opções: a lista inferida (Recomendado); juntar duas delas; incluir uma que não está no site.
2. "Qual é a Oferta 1, a principal?" Opções: a que mais fecha no CRM (Recomendado); a de maior margem; a que vocês querem fazer crescer. Se a marca vende planos, a principal pode ser um dos planos.
3. "Na decisão real, o cliente compara vocês com o quê?" Opções: o substituto que aparece no ICP, como planilha ou fazer em casa (Recomendado); o concorrente direto mais citado nas calls; não fazer nada.
4. "Qual destas frases de posicionamento é mais verdadeira?" Opções: as duas versões que você escreveu, a mais específica primeiro (Recomendado); "nenhuma, ajusto eu".

**Rodada 2: preço**

1. "O preço é publicado?" Opções: sim, como está no site (Recomendado, se estiver lá); faixa pública e valor exato só na proposta; só sob consulta.
2. "O que do preço é só uso interno?" Opções: desconto máximo e preço mínimo (Recomendado); preço para clientes grandes; nada.
3. "Vocês cobram por quê?" Opções: a métrica que aparece nos contratos, por mês, por unidade, por projeto (Recomendado); outra.
4. "Quais condições de pagamento valem para o cliente pagar vocês?" Opções: as dos contratos lidos (Recomendado); outras.

**Rodada 3: promessas, prazo e entrega**

1. "Esta promessa não tem prova registrada. O que fazemos?" Opções: registrar a prova agora com `registrar-provas` (Recomendado, se existe número); manter como `[HIPÓTESE]` e não usar em copy pública; tirar.
2. "O site diz X dias até a primeira entrega; os contratos dizem Y. Qual vale?" Opções: o prazo medido, escrito como média (Recomendado); o do site, com a divergência marcada `[CONTRADIZ: …]`.
3. "Quem vende e quem entrega cada oferta?" Opções: os nomes ou papéis do CRM e do playbook (Recomendado); só o papel, sem nome.

Resposta no chat é fonte: cite como `[CONVERSA AAAA-MM-DD]`.

## Escrever: campo a campo

Mantenha os títulos do template exatamente como estão. O GTM Brain reconhece os campos da oferta pelo nome do subtítulo.

**Topo do arquivo.** Logo depois do título, a lista `Fontes citadas neste arquivo:`. Ponha o nome da marca numa dessas linhas, por exemplo `` `[SITE]` site da <Marca>, páginas de serviços e de preços, lidas em AAAA-MM-DD ``. O GTM Brain usa o nome da marca no começo do arquivo para reconhecer que ele foi preenchido. Preencha `Última atualização:` e marque com `[x]` os itens do checklist que o arquivo cumpre.

**`## Posicionamento`.** Uma frase no formato do bloco de citação do template: para quem, qual job, categoria, valor único, "Diferente de <alternativa>, nós <diferencial>". Apague a linha "Exemplo de preenchimento:" e a citação da Cadência que vem depois dela. Abaixo da frase, aponte a persona: `Persona primária e jobs to be done em /01-icp/ICP.md`.

**`## Promessas`.** De três a cinco itens numerados, nos cinco tipos do template: resultado, processo, diferenciação, prazo, garantia. Cada um começa pelo selo e termina na prova:

```md
1. `[COMPROVADO]` Primeira entrega em até 10 dias úteis, em média (D-002).
2. `[HIPÓTESE]` Metade do retrabalho some no primeiro trimestre. Sem medição ainda [PENDENTE: /08-conteudo/PROVAS.md]
```

Média é média, não garantia: escreva "em média" quando o dado for uma média.

**`## Diferenciação`.** De três a cinco diferenciais. Cada um diz o que a marca faz, contra quem e como se sabe (`CAP-`, `CS-` ou tag de fonte). Se um concorrente pode dizer a mesma frase, ela não é diferencial.

**`## Provas para toda conversa de venda`.** Uma linha por prova: ID, cliente, número, selo. Só entra o que tem permissão de uso externo em `PROVAS.md`; o resto fica fora ou marcado `uso interno`.

**`## Oferta N: <Nome>`**, uma por oferta, numeradas a partir de 1, com todos os campos:

| Campo | O que entra | Cuidado |
| --- | --- | --- |
| `**Categoria:**` e `**Descrição em uma frase:**` | Que tipo de coisa é; o que faz, para quem, com qual resultado | Categoria que o comprador reconhece, não nome inventado |
| `### Para quem é` | Persona com o caminho `/01-icp/ICP.md`; uma linha "Não é para: …" com os desqualificadores | Sem "Não é para", o posicionamento fica genérico |
| `### O que inclui` | Entregas concretas, uma por linha, com substantivo | Nada de "soluções completas" |
| `### Prazo` | Mantenha `**Do início à primeira entrega:**` e `**Duração total:**` | Prazo medido com ID de dado; prazo prometido sem medição é `[HIPÓTESE]` |
| `### Preço` | Modelo de cobrança; valor ou faixa; condições de como **a marca cobra o cliente dela** (Pix, boleto, cartão, parcelamento, nota fiscal, fidelidade, reajuste) | Nunca invente valor; desconto e preço mínimo marcados `uso interno`. Não confunda com recurso do produto: num produto de cobrança, "seus alunos pagam por Pix automático" é o que a oferta faz (vai em `### O que inclui`), não como o cliente paga a marca |
| `### Resultados esperados` | Resultado com número, selo e ID | Resultado sem número vira `[OBSERVADO]` com fonte, ou `[HIPÓTESE]` |
| `### Prova` | IDs com uma linha de descrição cada | Todo ID precisa existir em `PROVAS.md` |
| `### Por que criamos esta oferta` | Um parágrafo: o pedido do cliente, o que falhava antes | Com tag de fonte |
| `### Como é vendida` | Canal, ciclo de venda (do CRM), quem apresenta | Ciclo real, não o desejado |
| `### Como é entregue` | Papel ou nome de quem lidera, time de apoio, playbook interno | Nome de pessoa só se ela concordar |

Se a marca tem uma oferta só, apague os blocos `## Oferta 2: [Nome da oferta]` e `## Oferta 3: [Nome da oferta]`. Se tem mais de três, copie o modelo completo. Bloco de oferta esquecido vira ficha vazia.

**`## Pacotes`.** Preencha a matriz só se a mesma oferta é vendida em níveis ou planos. Cada célula de preço repete o `### Preço` da oferta e aponta para ela ("um preço, um lugar", no passo 1). Se não houver níveis, troque a tabela por uma linha: "Não se aplica: cada oferta tem preço próprio." Mantenha o título.

**`## Princípios de preço`.** Os quatro do template são sugestões. Confirme cada um com a pessoa, apague o que a marca não segue e inclua o que ela segue de fato (por exemplo, "sem fidelidade").

**`## Exemplo: Plano Estúdio (oferta da Cadência)`.** Apague a seção inteira, sem levar nada dela para as ofertas: recursos, preços e prazos do exemplo são inventados (regras, seção 3). Mantenha `## Como usar este arquivo`, `## Checklist para agentes de IA` e `## Como passar este arquivo para um agente de IA`.

**`## Como passar este arquivo para um agente de IA`.** Troque os colchetes do bloco. Se o bloco do template diz para citar provas "pelo nome ou pelo ID", corrija na cópia da marca: em texto para publicação (página, proposta, e-mail), a prova é citada pelo que ela é, por exemplo o nome do cliente com permissão, nunca pelo ID (regras, seção 4). O ID serve para o agente achar a prova em `PROVAS.md`.

## Verificar

1. Rode `lacunas` e confira o critério de pronto (regras, seção 6). Nenhuma oferta com `faltam …`; as que aparecem com `pendentes …` têm, em cada pendência, onde conseguir o dado.
2. Se aparecer "Provas citadas sem definição", registre a prova com `registrar-provas` ou troque a citação por `[PENDENTE: /08-conteudo/PROVAS.md]`. Não deixe ID solto.
3. Confira a coerência: preço da matriz igual ao da oferta; prazo da promessa igual ao do dado em `PROVAS.md`; persona do posicionamento igual à do ICP.
4. Atualize `## Status das camadas` no `CEREBRO.md` (regras, seção 6) e diga à pessoa o que entrou, o que ficou pendente e o próximo arquivo. Em geral, `mapear-concorrencia` ou `registrar-provas`.

## Armadilhas

- **Posicionamento como lista de recursos.** "Agenda, cobrança, relatórios e app" não diz por que comprar. Comece pelo cliente e pela alternativa.
- **Adjetivo no lugar de fato.** "Melhor", "completo", "inovador", "de ponta". Troque por um número ou uma entrega.
- **Copiar a promessa do site como comprovada.** Promessa de resultado sem ID é `[HIPÓTESE]`, por mais antiga que seja no site. Termo de contrato publicado pela marca ("sem fidelidade") é `[COMPROVADO]` com a tag da fonte.
- **Recurso do produto no lugar da condição de pagamento.** Como o cliente paga a marca vai em `### Preço`; o que o produto faz pelo cliente vai em `### O que inclui`.
- **Inventar preço, faixa ou prazo** para o campo não ficar vazio. Use `[PENDENTE: …]` dizendo onde conseguir o dado.
- **Preço interno em campo público.** Desconto máximo, margem e preço de exceção ficam marcados `uso interno` ou fora do arquivo.
- **Níveis demais.** Mais de três pacotes costuma confundir o comprador. Pergunte antes de documentar o quarto.
- **Copiar o exemplo da Cadência.** Ele mostra o formato. O conteúdo é inventado: nenhum recurso, preço, prazo ou nome dele vai para a marca.
