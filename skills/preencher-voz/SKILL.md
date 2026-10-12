---
name: preencher-voz
description: Preenche a camada 02-voz de uma marca no GTM Brain junto com a pessoa. Escreve o VOZ.md (ponto de vista, arquétipo, atributos de voz com faça e não faça, tom por canal, regras de escrita, CTAs), o TERMINOLOGIA.md (termos preferidos e proibidos, nome da empresa, categoria) e o COMPLIANCE.md (o que pode e o que não pode afirmar, avisos, setor regulado, transparência sobre IA). Parte dos textos que a marca já publicou e da voz do cliente antes de perguntar. Use quando a pessoa disser "voz da marca", "tom de voz", "definir a voz", "como a marca fala", "guia de estilo", "palavras proibidas", "terminologia", "o que posso afirmar", "compliance de marketing", ou quando o relatório de lacunas apontar `preencher-voz`.
---

# Preencher a voz

Você preenche `02-voz/`: como a marca fala com a pessoa descrita em `01-icp/`, que palavras usa e evita, e o que nunca afirma. Este é o arquivo que mais muda o texto que um agente escreve.

Leia antes: [`../gtm-brain/referencias/regras.md`](../gtm-brain/referencias/regras.md). Pasta da marca, fontes primeiro, formato, marcações, gravação e cuidados estão lá. Esta skill só diz o que muda nesta camada.

Referências desta skill:

- [`referencias/voz-atributos-e-exemplos.md`](referencias/voz-atributos-e-exemplos.md): como tirar atributos dos textos da marca, arquétipos e como escrever faça e não faça.
- [`referencias/palavras-simples.md`](referencias/palavras-simples.md): palavras pomposas e a troca simples, para a terminologia.
- [`referencias/compliance-por-setor.md`](referencias/compliance-por-setor.md): o que perguntar e onde conferir em cada setor.

## 1. O que você preenche e quando acabou

| Arquivo | O que o GTM Brain lê | Pronto quando |
| --- | --- | --- |
| `VOZ.md` | `### Atributo N: …` dentro de `## Atributos de voz` (bullets **Definição**, **Faça**, **Não faça**); documentos "Ponto de vista e arquétipo" e "Regras de escrita" | Ponto de vista escrito, arquétipo com os cinco bullets, de quatro a seis atributos com exemplos da própria marca, CTA principal e canal definidos, regra de emoji decidida |
| `TERMINOLOGIA.md` | O arquivo inteiro, uma seção por campo | Termos preferidos da marca no lugar dos de exemplo, termos proibidos revisados, nome da empresa e categoria definidos, primeira linha do histórico |
| `COMPLIANCE.md` | O arquivo inteiro, uma seção por campo | Datas de atualização e de revisão jurídica (ou pendência), afirmações permitidas com ID de prova, avisos sem colchetes, cada setor marcado como relevante ou não, política de IA decidida |

**Pré-requisito:** `01-icp/` preenchido, pelo menos o `ICP.md` e a `VOZ-DO-CLIENTE.md`. A terminologia sai das palavras do cliente. Se o ICP ainda está em template, avise e sugira `preencher-icp` primeiro. Se a pessoa quiser seguir assim mesmo, marque como `[PROPOSTA]` tudo o que dependeria do cliente.

**Atenção ao template:** os atributos 1 a 4, os CTAs e as afirmações permitidas do compliance vêm com exemplos de uma marca fictícia, sem colchetes. `lacunas` acusa, em "Exemplo do template que ficou no arquivo", só as linhas que citam a Cadência; as outras passam como preenchidas. Troque todos.

## 2. Fontes: o que procurar e o que extrair

Comece pela lista `Fontes da marca:` no `10-cerebro/CEREBRO.md`. Ela é o registro de tags da marca: reutilize as tags de lá e acrescente ali cada fonte nova (regras, seção 4).

| Fonte | Extraia | Vai para |
| --- | --- | --- |
| Textos publicados pela marca: site, posts, newsletter, e-mails de venda, propostas, respostas de WhatsApp | Tamanho médio de frase, tratamento (você, tu, a gente, nós), palavras que se repetem, uso de emoji por canal, pontuação (travessão, exclamação), CTAs usados | Atributos, Tom por canal, regras de escrita, CTAs, Emoji |
| Textos de que a pessoa gosta e textos de que ela não gosta | O que separa os dois grupos | Atributos ("isto, não aquilo"), Faça e Não faça |
| Textos do fundador ou porta-voz (LinkedIn, palestras, áudios transcritos) | Diferença entre a voz da pessoa e a da marca | Arquétipo, Ponto de vista, quem fala em cada canal |
| `01-icp/VOZ-DO-CLIENTE.md` | Os substantivos e verbos que o cliente usa, como ele chama a categoria, palavras que ofendem | Termos preferidos, Termos proibidos, Setor e categoria, Como chamar o público |
| `01-icp/ICP.md` | Psicografia, Consumo de conteúdo, redes que usam | Arquétipo, linhas do Tom por canal |
| `05-oferta/OFERTA.md` | Nomes de ofertas, planos e serviços | Nomes de produtos e serviços, CTA |
| `08-conteudo/PROVAS.md` | Provas com ID e permissões de uso | Afirmações que você pode fazer, logos autorizados |
| Termos de uso, política de privacidade, contratos, registro em conselho de classe | Obrigações e limites já assumidos | Compliance: setores, dados, avisos |
| Sites e anúncios de concorrentes | Clichês da categoria | Frases proibidas, Não faça |
| Manual de marca antigo, apresentação institucional | Atributos já declarados | Só como `[PROPOSTA]`, conferidos contra o que a marca publica de fato |

Como extrair (método em `referencias/voz-atributos-e-exemplos.md`):

1. **Junte uma amostra** de 10 a 20 textos publicados, de canais diferentes. Peça à pessoa para apontar os três que mais soam como a marca e os três que menos soam.
2. **Meça o que dá para medir:** palavras por frase, frases por parágrafo, exclamações, emojis, perguntas, primeira ou terceira pessoa.
3. **Liste os traços** que separam os textos bons dos ruins. Cada traço vira um candidato a atributo no formato "isto, não aquilo".
4. **Guarde frases reais.** Uma frase boa da marca vira **Faça**. Uma frase ruim da própria marca, ou um clichê do concorrente, vira **Não faça**. Cite a fonte.
5. **Passe a biblioteca da voz do cliente** atrás de substantivos e verbos que se repetem. São os candidatos a termo preferido.
6. **Varra o site e os anúncios** atrás de afirmações arriscadas: superlativo, garantia, número sem fonte, promessa de saúde ou de ganho. Liste para a rodada de compliance.

## 3. Rodadas de perguntas

Mostre antes o que a amostra revelou, em poucas linhas, com uma ou duas frases reais. Pergunte só o que faltou. As opções abaixo são modelos: preencha com o que você inferiu, a recomendada primeiro.

**Rodada 1, ponto de vista e arquétipo**

1. Em que a maioria da categoria erra, na sua opinião? Opções: duas ou três posições que aparecem nos textos da marca (Recomendado: a que mais se repete); "outra".
2. Que arquétipo descreve melhor a marca? Duas ou três opções, cada uma com uma frase de como soa. Recomende a que bate com os textos que a pessoa escolheu como bons.
3. Quem fala nos textos? Opções: a marca como "nós" (Recomendado para site e materiais); o fundador em primeira pessoa; depende do canal.

**Rodada 2, atributos**

1. Mostre de quatro a seis atributos propostos, cada um como "isto, não aquilo", com uma frase da marca. Pergunte quais ficam (múltipla escolha).
2. Qual destas duas versões soa como a marca? Mostre um parágrafo real reescrito de dois jeitos. Recomende a versão mais próxima dos textos bons.
3. Como tratar o leitor? Opções: "você" (Recomendado); "tu", se a marca é regional e o público usa; "o senhor" e "a senhora", em setores formais.

**Rodada 3, canais e regras**

1. Quais canais a marca usa de verdade? Múltipla escolha a partir do `ICP.md` (Consumo de conteúdo) e dos textos achados.
2. Emoji: nenhum em texto publicado (Recomendado, salvo se a amostra mostrar uso consistente); só em WhatsApp e Instagram; livre nas redes.
3. Qual é o CTA principal e o canal de conversa preferido? Opções com os CTAs achados no site.
4. As regras padrão do template (frases de 12 a 18 palavras, sem travessão, números de um a nove por extenso): manter (Recomendado) ou ajustar alguma.

**Rodada 4, terminologia**

1. Estes termos do cliente viram termo preferido? Múltipla escolha com os do levantamento.
2. Que palavras o time vive corrigindo, ou se recusa a usar?
3. Como escrever o nome da empresa, e quais grafias estão erradas?

**Rodada 5, compliance**

1. A marca está em setor regulado? Opções: não (Recomendado só se nada na oferta toca saúde, dinheiro, direito, imóveis, educação, alimentos ou cosméticos); saúde; financeiro; jurídico; imóveis; educação; alimentos, suplementos ou cosméticos; outro.
2. Algum advogado revisou os textos da marca? Opções: sim (data e nome); não, fica pendente (Recomendado se não houver).
3. Mostre as afirmações arriscadas achadas no site e pergunte: tirar, reescrever com prova, ou levar ao advogado.
4. Transparência sobre IA: avisar em textos longos, como artigos e guias (Recomendado); avisar sempre; não avisar.

## 4. Escrever

Ordem: `VOZ.md`, depois `TERMINOLOGIA.md`, depois `COMPLIANCE.md`. Em todos: lista de fontes logo depois do título, data, checklist marcado, `## Exemplo` e blocos "Exemplo de preenchimento:" apagados (regras, seção 3). Troque todo `[Nome da empresa]` e `[Nome do produto]` pelo nome real.

### VOZ.md

| Título | O que escrever |
| --- | --- |
| `## Ponto de vista` | Troque a explicação, o "Modelo" e o "Exemplo de preenchimento" pelo parágrafo da marca, em citação (`>`), com no máximo 80 palavras. Abaixo, uma linha com selo e fonte. |
| `## Arquétipo da marca` | Os cinco bullets. Em "Como este arquétipo não soa", nomeie a voz que a marca recusa. |
| `## Atributos de voz` | De quatro a seis `### Atributo N: <Nome>`, numerados em sequência. **Definição** em uma frase, no formato "isto, não aquilo". **Faça** e **Não faça** no contexto real da marca. Apague os títulos de atributo que sobrarem, não deixe colchete. |
| `## Tom por canal` | Só as linhas dos canais que a marca usa. Ajuste tamanhos e energia ao que funciona nela. Acrescente canal que falte. |
| `## Nível de leitura`, `## Tamanho de frase`, `## Pontuação`, `## Formatação` | São padrões razoáveis. Mantenha se a pessoa concordou. Mude só o que a marca faz diferente de propósito. |
| `## CTAs` | CTA principal, canal de conversa e um par Faça e Não faça da marca. |
| `## Emoji, gíria e jargão` | A decisão da rodada 3, por canal. |
| `## Frases proibidas` | Troque os colchetes por formas concretas ("Na <Marca>, acreditamos que"). Acrescente os clichês da categoria e as palavras que ofendem o cliente, com o motivo entre parênteses. |

### TERMINOLOGIA.md

- **Termos preferidos:** apague as 12 linhas de exemplo. Escreva de 8 a 15 termos da marca: as palavras do cliente, os nomes das ofertas, a categoria. Na coluna "Por que usamos", diga a origem, com selo e fonte quando vier da voz do cliente.
- **Termos proibidos:** mantenha as linhas genéricas que valem para a marca. Troque `No mundo [X] de hoje` por `No mundo de hoje` e o nome da empresa na linha "acreditamos". Acrescente o jargão da categoria que o cliente não usa e as palavras que ofendem o cliente. Mantenha a ordem alfabética. A lista de `referencias/palavras-simples.md` ajuda.
- **Nomes de produtos e serviços:** acrescente as regras dos nomes reais e aponte `/05-oferta/OFERTA.md`.
- **Como chamar o público:** troque os segmentos de exemplo pelos da marca.
- **Como chamar a empresa:** os quatro bullets, mais um `- **Nunca:**` com as grafias erradas. Apague o "Modelo de exemplo".
- **Setor e categoria:** os quatro bullets. O substantivo da categoria é o que o cliente busca, não o que a marca gostaria de ser chamada.
- **Regionalismos, Abreviações, Números:** padrões; ajuste se preciso.
- **Histórico de mudanças:** a primeira linha com a data de hoje e o autor.

### COMPLIANCE.md

- **Datas:** `Última revisão jurídica:` com data e nome, ou `sem revisão jurídica (pendente)`.
- **Afirmações que você pode fazer:** troque os exemplos da marca fictícia pelos da marca, cada um com o ID da prova. Sem provas registradas, fique com afirmações de categoria e de processo e marque os resultados como pendentes.
- **Afirmações que você não pode fazer:** mantenha a lista e acrescente as promessas que a marca precisa evitar, em especial as que achou no site.
- **Avisos obrigatórios:** troque o texto entre colchetes (`[fonte]`, `[ano]`, `[URL]`, `[parceiro]`) por parênteses, como "(nome da fonte)", ou pelo valor real. Colchete com instrução conta como campo não preenchido. Acrescente linhas próprias da marca.
- **Setores regulados:** mantenha as subseções. Em cada uma, uma linha "Relevante para a <Marca>: …" ou "Não se aplica à <Marca> hoje. Mantido para referência." Setor da marca fora da lista ganha um `### <setor>` novo, a partir de `referencias/compliance-por-setor.md`, terminando com "Revisão jurídica (pendente)".
- **Política de transparência sobre IA:** os três bullets decididos e o texto final com o nome da marca.
- **Dados, privacidade e consentimento:** ajuste ao tipo de dado que a marca trata, em especial dado sensível.

Você não dá parecer jurídico. Escreva o que a marca decidiu e marque para revisão o que precisa de advogado.

## 5. Verificar

1. Rode `lacunas`. Os três arquivos saem de "Arquivos ainda em template".
2. Trate o que o relatório listar de `02-voz/` em "Instruções do template nos arquivos preenchidos" e em "Exemplo do template que ficou no arquivo".
3. O relatório só pega a linha do exemplo copiada igual. Para achar exemplo editado pela metade: `grep -n -i "cadência\|lírio\|estúdio" 02-voz/*.md`, a não ser que a marca seja mesmo desse setor.
4. Rode `build` e abra a categoria Voz. Cada atributo mostra Definição, Faça e Não faça. "Regras de escrita", "Terminologia" e "Compliance" aparecem como documentos.
5. **Teste de ouvido:** pegue um texto real e fraco da marca, reescreva seguindo `VOZ.md` e `TERMINOLOGIA.md`, e mostre à pessoa. Se ela não reconhecer a marca, volte aos atributos.
6. Atualize a linha `02 Voz` em `## Status das camadas` do `CEREBRO.md` e faça o resumo para a pessoa (regras, seção 6). O próximo passo costuma ser `preencher-oferta`.

## 6. Armadilhas desta camada

- **Atributo que toda marca diria.** "Profissional", "humana", "inovadora" não orientam ninguém. Sem o "não aquilo", o atributo não decide nada.
- **Faça e Não faça inventados.** Os melhores pares saem de frases reais da marca, antes e depois. Exemplo inventado ensina uma voz que a marca não tem.
- **Exemplos do template mantidos.** Atributos 1 a 4, CTAs e compliance vêm com uma marca fictícia. Trocar só o nome do atributo deixa o exemplo errado no arquivo.
- **Voz do fundador no lugar da voz da marca.** Às vezes coincidem. Quando não, decida com a pessoa quem fala em cada canal e escreva isso.
- **Imitar o cliente.** A marca usa as palavras do cliente para nomear as coisas. Não copia gíria nem erro, que ficam só nas citações.
- **Proibir a palavra que o cliente usa.** Antes de proibir um termo, veja se ele aparece na voz do cliente. Se aparece, talvez seja o termo preferido.
- **Tom para canal que a marca não usa.** A tabela do template tem 13 canais. Linha sobrando vira instrução para um canal que ninguém opera.
- **Compliance como parecer.** O arquivo registra decisões e limites. Afirmação regulatória ("em conformidade com…") só com atestado, e o que for dúvida fica para o advogado.
