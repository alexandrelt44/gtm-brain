---
name: registrar-provas
description: 'Preenche e mantém o banco de provas da marca no GTM Brain (`08-conteudo/PROVAS.md`): controle de permissões, depoimentos, cases, avaliações, capturas, UGC, dados, capacidade, logos, selos, mapa afirmação → prova e lacunas de prova. Também registra uma prova que outro arquivo cita por ID e que ainda não existe. Use quando a pessoa disser "registrar case", "novo case", "depoimento", "pedir depoimento", "autorização de uso", "prova social", "provas", "mapa de provas", "de onde vem esse número", ou quando o relatório de lacunas mostrar "Provas citadas sem definição".'
---

# Registrar provas

Você monta o banco de provas da marca: cada afirmação pública ligada a uma prova com ID, fonte, data e permissão de uso. É deste arquivo que os agentes tiram o que podem afirmar em copy.

Leia antes: [`../gtm-brain/referencias/regras.md`](../gtm-brain/referencias/regras.md). Aqui está só o que é próprio das provas.

## O que preenche e quando acaba

Um arquivo: `08-conteudo/PROVAS.md`. O formato completo de um case escrito fica em `08-conteudo/modelos/estudo-de-caso.md`; este arquivo guarda o resumo e o índice.

O arquivo está pronto quando:

1. `node src/lacunas.mjs --marca <pasta>` não lista mais `08-conteudo/PROVAS.md` em "Arquivos ainda em template".
2. A seção "Provas citadas sem definição" do relatório está vazia, ou só lista IDs que a pessoa decidiu manter citados enquanto a prova é buscada, cada um com a linha dele em `## Lacunas de prova`.
3. Cada case e cada depoimento tem todos os campos (nenhum `faltam …` no relatório). Campo sem resposta fica como pendência honesta, com o que falta e onde conseguir; aparecer como `pendentes …` é esperado (regras, seção 6).
4. Cada case e cada depoimento tem uma linha no controle de permissões.
5. Cada afirmação pública da marca está no mapa afirmação → prova ou em lacunas de prova.

## Dois modos

- **Arquivo inteiro.** A marca ainda não tem provas registradas, ou a pessoa pediu uma auditoria. Siga as seções abaixo na ordem.
- **Registro rápido.** Outra skill citou um ID que não existe, o relatório mostrou "Provas citadas sem definição" ou chegou um depoimento novo. Para cada ID: abra o arquivo e a linha onde ele é citado, leia a afirmação, procure a prova nas fontes e registre com o mesmo ID. Se a prova não existir, não invente: registre a afirmação em `## Lacunas de prova` e avise a pessoa de que a citação, no outro arquivo, aponta para uma prova que ainda não existe. Só edite o outro arquivo (trocar o ID por `[PENDENTE: /08-conteudo/PROVAS.md]`) se ela concordar.

## Fontes

Comece pela lista `Fontes da marca:` do `10-cerebro/CEREBRO.md`. Ela é o registro de tags da marca: reutilize as tags de lá e acrescente ali cada fonte nova (regras, seção 4). A coluna "Tag sugerida" abaixo só vale para fonte que ainda não está lá. Depois procure nesta ordem. Defina cada fonte uma vez no topo do arquivo (regras, seção 4) e cite ao lado de cada item.

| Fonte | O que dá | Tag sugerida |
| --- | --- | --- |
| Pasta de termos de autorização, contratos com cláusula de uso de nome e logo | Controle de permissões, logos | `[TERMOS]` |
| Painel do produto, sistema de cobrança, CRM, planilhas financeiras | Números de antes e depois dos cases, dados `D-`, tempo de casa | `[PAINEL]`, `[CRM]`, `[FINANCEIRO]` |
| Transcrições de calls de venda, de sucesso do cliente e de entrevistas | Citações literais, histórias de case | `[ENTREVISTAS]`, `[CALLS]` |
| WhatsApp, e-mail, comentários de NPS, tickets de suporte | Depoimentos espontâneos | `[SUPORTE]`, `[NPS]` |
| Google, Reclame Aqui, G2, Capterra, App Store | Avaliações públicas | `[AVALIACOES]` |
| Cases já publicados no site, apresentações de venda | Índice de cases, capturas | `[SITE]` |
| Perfis da marca e de clientes nas redes | UGC | `[REDES]` |

Leia também os outros arquivos da marca. Eles dizem que afirmações a marca já faz e onde há candidatos a prova:

- `/05-oferta/OFERTA.md`: `## Promessas`, `## Provas para toda conversa de venda`, `### Resultados esperados` e `### Prova` de cada oferta.
- `/05-oferta/GANHOS-E-PERDAS.md`: negócios ganhos, com o motivo. Bons candidatos a case.
- `/01-icp/VOZ-DO-CLIENTE.md`: citações já transcritas. Uma citação dali só vira depoimento com permissão.
- `/02-voz/COMPLIANCE.md`: limites do que a marca pode afirmar.
- `/07-site/MAPA-DO-SITE.md`: onde cada afirmação aparece.

Antes de criar qualquer ID, liste os que já estão **definidos** em `08-conteudo/PROVAS.md` da marca: títulos `### CS-00N` e `### Depoimento T-00N` e a primeira célula das linhas de tabela. Rode dentro da pasta da marca:

```sh
grep -oE '^(#{2,4} (Depoimento )?|\| *)(CS|T|D|CAP)-[0-9]{3}' 08-conteudo/PROVAS.md | grep -oE '(CS|T|D|CAP)-[0-9]{3}' | sort -u
```

Não conte IDs citados em outros arquivos nem os de texto de template: arquivos ainda em template, blocos `## Exemplo` e o bloco do agente de `OFERTA.md` trazem `CS-001`, `T-001`, `D-001` de exemplo. Se `PROVAS.md` ainda está em "Arquivos ainda em template", os registros dele (`### Depoimento T-001`, `| CS-001 | [Cliente] |…`) são vagas vazias, não provas: a primeira prova de cada tipo é `001`.

## Perguntas

Pergunte só o que as fontes não deram, no máximo 3 ou 4 por rodada (regras, seção 2).

**Rodada 1, inventário.**

1. **Onde estão as autorizações?** (Recomendado) numa pasta com os termos assinados, informe o caminho; dadas por e-mail ou WhatsApp, sem termo; não há nenhuma, tudo entra como `uso interno` até alguém pedir.
2. **Quais clientes têm o resultado mais claro?** Ofereça os 3 a 5 candidatos que você achou no CRM, em `GANHOS-E-PERDAS.md` ou nas transcrições. (Recomendado) os que têm número medido antes e depois.
3. **Quem confirma os números?** (Recomendado) quem cuida do painel ou do financeiro; a própria pessoa; ninguém agora, os números entram como pendentes.

**Rodada 2, por prova que ficou incompleta.**

1. **Situação da permissão:** termo assinado em tal data (Recomendado, se você achou o termo); pedida e sem resposta; nunca pedida.
2. **Usos aprovados:** o que está no termo; ou, sem termo, nenhum (`uso interno`).
3. **O número do resultado:** de onde sai, de que período, sobre quantos clientes.

**Rodada 3, lacunas.** Para cada afirmação sem prova: quem vai buscar, como e até quando.

Para conseguir uma prova que não existe, use o roteiro de case e o pedido de depoimento em `referencias/`.

## Escrever

Mantenha os títulos do template. Onde o template não tem a seção que o GTM Brain lê, acrescente-a como abaixo.

| Seção | Formato | O GTM Brain lê |
| --- | --- | --- |
| `## Controle de permissões` | Uma linha por case e por depoimento: `ID do item`, origem, data da autorização, validade, local do termo | O ID na primeira coluna define a prova |
| `## Depoimentos` | `### Depoimento T-001` com os 10 bullets do template: Citação, Nome, Cargo, Empresa, Segmento, Casos de uso, Origem, Data da captura, Autorização, Usos aprovados | Um registro por depoimento |
| `## Índice de cases` | Tabela do template, e logo abaixo dela um `### CS-001 · Cliente, Cidade (UF)` por case com os bullets **Cliente**, **Antes**, **O que mudou**, **Resultado**, **Permissão**, **Depoimento ligado** | Um registro por case |
| `## Avaliações`, `## Capturas de tela`, `## Registro de UGC`, `## Logos`, `## Certificações e selos` | Tabelas do template, uma linha por item | Campos do documento de provas |
| `## Prova de capacidade` (acrescente antes de `## Dados e benchmarks`) | `\| ID \| O quê \| Prova \| Uso \|`, uma linha `CAP-001` por coisa que a marca já construiu ou opera | Um registro por linha; o título vem da coluna `O quê` |
| `## Dados e benchmarks` | Tabela do template (`ID`, `Dado`, `Valor`, `Fonte`, `Data`, `Link`). Acrescente a coluna `Uso` quando precisar marcar `uso interno` | Um registro por linha; o título vem da coluna `Dado` |
| `## Mapa afirmação → prova` e `## Lacunas de prova` | Tabelas do template | Documento "Afirmação → prova e lacunas" |

Apague `## Exemplo` e qualquer bloco "Exemplo de preenchimento:" (regras, seção 3). Mantenha `## Como usar este arquivo`, o checklist e `## Como passar este arquivo para um agente de IA`.

### IDs

- Três dígitos, em sequência por tipo: `CS-001`, `T-001`, `D-001`, `CAP-001`. O próximo ID é o maior já definido em `08-conteudo/PROVAS.md` mais um (o grep em Fontes). ID citado em outro arquivo e não definido não conta: registre a prova com esse mesmo ID (modo registro rápido).
- O ID é para sempre. Não reaproveite o ID de uma prova retirada; deixe o registro com `Revogada em AAAA-MM-DD. Não usar.` e siga a numeração.
- Uma prova, um ID. Se a mesma cliente deu depoimento e virou case, são dois registros (`T-` e `CS-`) que se apontam pelo campo **Depoimento ligado**.
- O título `### Depoimento T-001` e o `### CS-001 · …` já definem o ID. A linha no controle de permissões é onde mora a permissão: crie para todo case e todo depoimento, mesmo sem autorização (veja abaixo).

### Permissão

A permissão decide o que pode sair da empresa. Use sempre um destes estados, na coluna `Autorização registrada` e no campo **Autorização** ou **Permissão**:

| Estado | Escreva | Pode ir para peça publicada? |
| --- | --- | --- |
| Termo assinado | a data do termo, e a validade | Sim, só nos usos aprovados |
| Termo assinado, usos não confirmados | a data do termo e `Usos aprovados a confirmar [PENDENTE: ler o termo em <onde está>]` | Só no que a pessoa confirmar que o termo cobre |
| Autorização verbal, falta termo escrito | `Autorização verbal em AAAA-MM-DD, ouvida por <quem>; falta termo escrito. Uso interno` | Não, até o termo escrito |
| Pedida, sem resposta | `Pedida em AAAA-MM-DD, sem resposta`, validade `(pendente)` | Não |
| Nunca pedida | `Não pedida. Uso interno` | Não |
| Negada ou revogada | `Negada em AAAA-MM-DD. Uso interno` ou `Revogada em AAAA-MM-DD. Não usar` | Não |

- **Usos aprovados** repete o que o termo diz, nem mais nem menos. Termo que não fala de anúncio não aprova anúncio. Se ninguém leu o termo, registre só os usos que a pessoa confirmar e deixe o resto pendente.
- **Fontes que divergem.** Termo escrito vale mais que o que a pessoa diz agora, que vale mais que o cabeçalho ou a observação da fonte ("uso interno" no topo de uma transcrição). Escreva a divergência no campo **Autorização** (regras, seção 7).
- Avaliação pública pode ser citada com link para a plataforma, sem editar o texto. Nome ou foto de quem avaliou, fora da plataforma, pede autorização como depoimento.
- Dado interno sensível (receita, churn, margem, preço de custo) leva `Uso interno. Não publicar` na coluna `Uso`.

### Citações e números

- `[LITERAL]` só quando a frase está gravada ou escrita pelo cliente e você copiou palavra por palavra. Cite a origem com data. Frase resumida é `[PARÁFRASE]` e não vai entre aspas em peça publicada.
- Todo número leva período, base e fonte: "de 18% para 6% em 8 semanas, 1 estúdio, `[PAINEL]`". Não arredonde nem escreva "cerca de" se a fonte tem o número exato.
- Benchmark de terceiro entra em `## Dados e benchmarks` com o nome da publicação, a data e o link, e o texto diz que é dado de mercado. Nunca apresente benchmark como resultado da marca.
- Resultado ainda não medido fica `(pendente)` com o que falta medir, e a aposta, se houver, leva `[HIPÓTESE]`.

### Mapa afirmação → prova

1. Liste as afirmações que a marca já faz ou quer fazer: promessas e resultados esperados de `OFERTA.md`, frases do site, a tese de `VOZ.md`.
2. Para cada uma, escolha a prova mais forte que tenha permissão para o canal onde a afirmação aparece.
3. Afirmação sem prova vai para `## Lacunas de prova`, com o tipo de prova que falta, como conseguir, quem busca e o prazo. Enquanto estiver lá, não aparece em peça publicada.

### Seção sem nenhum item

Troque a linha de placeholder por uma linha honesta. Veja `exemplo/08-conteudo/PROVAS.md`, em selos, só para ver o formato (nada de lá é da marca): `| Nenhum selo registrado | n/a | n/a | n/a |` e uma frase dizendo o que isso proíbe ("não use selo nem 'certificado' em nenhuma peça").

## Verificar

1. Rode `lacunas` (regras, seção 6). Confira: arquivo fora da lista de template, nenhuma prova citada sem definição, fichas de case e depoimento sem campo faltando, nenhuma linha em "Exemplo do template que ficou no arquivo".
2. Releia o mapa: cada ID do mapa existe e tem permissão para o uso listado na coluna "Onde é usada".
3. **Volte aos arquivos que esperavam as provas.** Procure na marca o que uma prova nova pode sustentar agora:

   ```sh
   grep -rnE 'PENDENTE: /08-conteudo/PROVAS.md|[Ss]em prova|\[HIPÓTESE\]' 01-icp 05-oferta
   ```

   Olhe em especial as promessas e a `### Prova` de cada oferta em `/05-oferta/OFERTA.md` e a coluna Prova das objeções em `/01-icp/ICP.md`. Para cada uma que uma prova nova sustenta, proponha a mudança: cite o ID novo no lugar da pendência e troque `[HIPÓTESE]` por `[COMPROVADO]` só se a prova sustenta a afirmação como ela está escrita (mesmo número, mesmo período, mesma base). Prova parcial cita o ID e mantém o selo. Se o servidor estiver rodando, mande como sugestões no editor; senão, edite direto e mostre o diff (regras, seção 5).
4. Atualize a linha `08 Conteúdo` em `## Status das camadas` do `CEREBRO.md`.
5. Diga à pessoa, em poucas linhas: quantas provas entraram por tipo, quantas são públicas e quantas são `uso interno`, quais permissões falta pedir e quais lacunas ficaram, com dono e prazo.

## Armadilhas

- **Prova sem permissão em copy pública.** Uma citação boa num print de WhatsApp não é depoimento autorizado. Registre como `uso interno` e peça a autorização.
- **Número sem fonte, arredondado ou "aproximado".** "Reduz a inadimplência pela metade" sem período nem base não é prova. Traga o número exato da fonte ou registre como lacuna.
- **Citação reescrita.** Corrigir a gramática do cliente muda o `[LITERAL]`. Se precisar cortar, corte com `[…]` e mantenha o resto.
- **ID reaproveitado ou renumerado.** Outros arquivos citam o ID antigo. Renumerar quebra as ligações no grafo.
- **Prova da marca que é do concorrente ou do mercado.** Dado de relatório setorial prova o problema, não o resultado da marca.
- **Case inteiro dentro de `PROVAS.md`.** Aqui fica o resumo de seis campos. O texto longo segue `modelos/estudo-de-caso.md` e mora onde o site guarda os cases.

## Referências

- [`referencias/roteiro-de-case.md`](referencias/roteiro-de-case.md): convite e roteiro da entrevista de case, e como transformar a gravação em registro.
- [`referencias/pedido-de-depoimento.md`](referencias/pedido-de-depoimento.md): mensagens para pedir depoimento e autorização, e o que o termo precisa dizer.
- [`referencias/quando-pedir-prova.md`](referencias/quando-pedir-prova.md): em que momento do cliente pedir, quem não abordar e quantas referências buscar.
