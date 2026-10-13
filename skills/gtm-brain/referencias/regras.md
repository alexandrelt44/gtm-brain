# Regras comuns das skills de preenchimento

Toda skill de preenchimento do GTM Brain segue estas regras. Cada skill diz o que muda para a camada dela; o resto vale como está aqui.

## 1. Achar a pasta da marca e o app

**Pasta da marca**, na ordem:

1. o que a pessoa disser;
2. a variável `GTM_BRAIN_MARCA`;
3. a pasta atual, se ela tiver `01-icp/` e `10-cerebro/` (ou `10-brand-brain/`);
4. `./marca` ou `./exemplo`, se a pasta atual for o repositório do GTM Brain.

Se nada disso existir, pergunte. Para começar uma marca nova, copie `marca/` do repositório do GTM Brain para onde a pessoa quiser, de preferência um repositório git próprio.

**App do GTM Brain:** fica em `brain/`, na raiz deste repositório. A partir da pasta desta skill, é `../../brain`. Os comandos abaixo rodam dentro dela:

```sh
node src/lacunas.mjs --marca <pasta>          # o que falta, em ordem, e qual skill preenche
node src/lacunas.mjs --marca <pasta> --json   # o mesmo em JSON
node src/build.mjs --marca <pasta>            # fichas e grafo em out/gtm-brain.html
```

Rode `lacunas` antes de começar e depois de cada arquivo. É o mesmo leitor que monta as fichas: se uma ficha não aparece completa ali, ela não está completa.

## 2. Fontes primeiro, perguntas depois

1. **Leia o que já existe.** Os outros arquivos da marca (o ICP informa a oferta, a oferta informa as palavras-chave), o site da marca, materiais que a pessoa apontar (transcrições de call, export de CRM, planilhas, pastas de notas, avaliações públicas, propostas enviadas).
2. **Extraia** tudo o que as fontes respondem. Guarde de onde veio cada coisa.
3. **Pergunte só o que as fontes não respondem.** No máximo 3 ou 4 perguntas por rodada. Cada pergunta traz opções concretas, já preenchidas com o que você inferiu, e a opção que você recomenda vem primeiro, marcada como "(Recomendado)". Se a ferramenta de perguntas do seu ambiente existir (no Claude Code, `AskUserQuestion`), use; senão, numere as perguntas e as opções no texto.
4. **Nunca invente** número, cliente, citação, preço, prazo, nome de pessoa ou resultado. O que faltar fica marcado como pendente (seção 4), com o que falta e onde conseguir.
   Se a própria fonte é aproximada ("uns 18%"), mantenha a aproximação como ela veio e cite a fonte. Não arredonde, não tire o "uns" e não transforme mediana em média.
5. Diferencie o que a pessoa **sabe** do que ela **acha**. Saber vira `[COMPROVADO]` ou `[OBSERVADO]`; achar vira `[HIPÓTESE]`; o que você deduziu vira `[PROPOSTA]` até a pessoa confirmar.

## 3. Escrever no formato que o GTM Brain lê

O GTM Brain lê os arquivos como um banco de dados: **títulos viram registros** e **subtítulos ou bullets com rótulo em negrito viram campos**. A tabela completa está em `docs/convencoes.md`. O essencial:

- **Mantenha os títulos do template exatamente como estão.** Troque só o que está entre colchetes. `## Persona primária: [Nome da persona…]` vira `## Persona primária: Renata, dona de um estúdio de pilates com 160 alunos`. Não renomeie `### Dores` para `### Principais dores`.
- **Um registro por título**, sempre com os mesmos campos: personas (`## Persona primária|secundária|hipótese: …`), ofertas (`## Oferta N: …`), concorrentes (`## Concorrente: …` e `## Alternativa: …`), negócios (`## Negócio: Cliente, Ganho|Perdido`), provas (`### CS-001 · …`, `### Depoimento T-001`), clusters (`## Cluster N: …`).
- **Troque as instruções entre colchetes pelo conteúdo.** Uma instrução esquecida (`[Promessa 1, …]`) faz o campo contar como pendente.
- **Apague os exemplos do template** quando o arquivo estiver preenchido: a seção `## Exemplo` e qualquer bloco "Exemplo de preenchimento:" dentro de outras seções. Eles mostram o formato e não são da marca.
- **Exemplo é formato, nunca fato.** Nunca copie data, número, nome de pessoa ou cliente, recurso do produto, preço ou status de `exemplo/` nem de um bloco `## Exemplo` ou "Exemplo de preenchimento". Nem quando a marca tem o mesmo nome, o mesmo setor ou clientes parecidos. Use o exemplo só para ver o formato; todo fato vem das fontes da marca ou da pessoa. Se a fonte não tem o dado, ele fica pendente.
- **Mantenha** `## Como usar este arquivo` e `## Checklist para agentes de IA`. Marque com `[x]` os itens do checklist que o arquivo cumpre.
- Preencha `Última atualização: AAAA-MM-DD` com a data de hoje e `Autor principal:` com quem respondeu.
- No `CEREBRO.md`, o título é `# Cérebro da marca — <Nome da marca>`. É daí que o GTM Brain tira o nome da marca.

## 4. Marcações

**Fontes.** Logo depois do título do arquivo, liste as fontes usadas, uma por linha:

```md
Fontes citadas neste arquivo:

- `[ENTREVISTAS]` 14 entrevistas com donas de estúdio, jan–mar/2026
- `[SITE]` cadencia.example, páginas de preço e de recursos, lidas em 2026-10-12
```

Depois cite a fonte ao lado da afirmação: `` `[ENTREVISTAS §2]` ``, `` `[SITE]` ``. Resposta da pessoa no chat também é fonte: `[CONVERSA AAAA-MM-DD]`, com a data da conversa.

**Registro de tags: `Fontes da marca:` no `CEREBRO.md`.** É a lista de todas as fontes da marca, logo abaixo do título de `10-cerebro/CEREBRO.md`, no mesmo formato de linha:

```md
Fontes da marca:

- `[SITE]` cadencia.example, páginas de preço e de recursos, lidas em 2026-10-12
- `[CRM]` export do HubSpot, negócios de jan–set/2026
- `[ENTREVISTAS]` 14 entrevistas com donas de estúdio, jan–mar/2026
```

A tag nasce ali e vale para a marca inteira: a mesma fonte tem a mesma tag em todos os arquivos. Antes de citar uma fonte, procure a tag nessa lista e reutilize. Fonte nova (um export, uma pasta, uma página) entra primeiro em `Fontes da marca:` e depois no `Fontes citadas neste arquivo:` do arquivo que a usa. `[CONVERSA AAAA-MM-DD]` não precisa entrar na lista.

Se o `CEREBRO.md` ainda não tem a lista, crie-a logo abaixo do título antes de escrever o primeiro arquivo. Com mais de um agente trabalhando ao mesmo tempo, quem orquestra registra as tags de todas as fontes antes de dividir o trabalho, e cada agente só reutiliza.

**Selos** no começo da frase ou ao lado da afirmação:

| Selo | Quando |
| --- | --- |
| `[COMPROVADO]` | Aconteceu e dá para mostrar: cliente, número, contrato |
| `[OBSERVADO]` | Padrão que se repete, sem medição |
| `[HIPÓTESE]` | Aposta. Serve para decidir, não para afirmar em público |
| `[PROPOSTA]` | Dedução sua, para a pessoa validar |
| `[LITERAL]` | Citação do cliente, palavra por palavra |
| `[PARÁFRASE]` | Citação resumida |

**Provas com ID**: `CS-001` (case), `T-001` (depoimento), `D-001` (dado), `CAP-001` (capacidade). O ID é definido uma vez em `08-conteudo/PROVAS.md` e citado em qualquer outro arquivo da marca. Ele é bastidor: nunca aparece em texto publicado (site, post, proposta); lá a prova é citada pelo que ela é, por exemplo o nome do cliente com permissão. Antes de citar um ID, confira que ele existe; se não existir, registre a prova primeiro (skill `registrar-provas`).

**Pendência e contradição explícitas:**

```md
Preço para 10 unidades ou mais a confirmar [PENDENTE: /05-oferta/GANHOS-E-PERDAS.md]
A implantação levou sete dias, não cinco [CONTRADIZ: D-003]
```

`(pendente)` e `a confirmar` também contam como pendência. Use quando a resposta não existe ainda; não use para esconder trabalho que dá para fazer agora.

**Caminhos**: cite outro arquivo pelo caminho, `` `/05-oferta/OFERTA.md` ``. Vira ligação no grafo.

## 5. Gravar

Há dois jeitos, e a regra é simples:

- **Arquivo em template (preenchimento do zero):** escreva direto no arquivo. A revisão é pelo git: mostre à pessoa um resumo do que entrou e o que ficou pendente, e sugira `git diff`.
- **Arquivo já preenchido, com o servidor do GTM Brain rodando** (`npm run dev`, porta 3348): proponha as mudanças como **sugestões** no editor, para a pessoa aceitar ou recusar.
  1. `POST http://127.0.0.1:3348/api/docs/open` com `{"file": "<caminho relativo>"}` devolve `agent.state`, `agent.ops` e `agent.token`.
  2. `GET <agent.state>` com `Authorization: Bearer <token>` traz o markdown atual.
  3. Para cada mudança, `POST <agent.ops>` com `{"type":"suggestion.add","by":"ai:<seu-nome>","kind":"replace","quote":"<trecho atual exato>","content":"<texto novo>"}`.
  4. Mande uma sugestão por registro (uma persona, uma oferta). Sugestões gigantes, com dezenas de blocos e títulos repetidos, são recusadas pelo editor.
  5. Avise a pessoa que as sugestões estão no editor e que o arquivo só muda quando ela clicar em **Salvar no arquivo**.
- **Arquivo já preenchido, sem servidor:** edite direto, mudança por mudança, e mostre o diff.

**Nunca faça commit sem a pessoa pedir.** Quando ela pedir, um commit por camada, com a mensagem dizendo o que entrou.

## 6. Depois de cada arquivo

1. Rode `lacunas` de novo e confira o critério de pronto abaixo.
2. Atualize a tabela `## Status das camadas` em `10-cerebro/CEREBRO.md`: uma linha por camada, com `✅ preenchido`, `🟡 parcial (o que falta)` ou `⬜ template`. Camada com parte dos arquivos feita é parcial e diz o que falta, por exemplo `🟡 parcial (OFERTA pronta; CONCORRENCIA e GANHOS-E-PERDAS em template)` ou `🟡 parcial (ICP pronto; orçamento e churn por segmento pendentes)`.

**Critério de pronto de um arquivo:**

- o arquivo saiu de "Arquivos ainda em template";
- nenhuma linha dele em "Instruções do template nos arquivos preenchidos" nem em "Exemplo do template que ficou no arquivo";
- em "Fichas incompletas", nenhum registro dele com `faltam …`: todo registro tem todos os campos esperados;
- o que está pendente está pendente de verdade, com `[PENDENTE: onde conseguir]` ou "a confirmar" mais onde conseguir.

Não conte "N de N campos preenchidos". O app marca o campo inteiro como pendente se uma linha dele diz "a confirmar" ou `[PENDENTE: …]`. Uma ficha bem documentada com uma ressalva honesta aparece como `pendentes …` no relatório, e isso é esperado. Campo pendente com o motivo vale mais que pendência apagada para o número fechar.
3. Diga à pessoa, em poucas linhas: o que entrou, o que ficou pendente e por quê, e qual é o próximo arquivo.

## 7. Cuidados

- **Dado interno não vira texto público.** Preço de custo, margem, nome de cliente sem permissão e chaves de acesso ficam fora dos arquivos ou marcados como `uso interno`. Em `PROVAS.md`, o controle de permissões diz o que pode sair.
- **Depoimento só com permissão.** Sem permissão, registre como `uso interno` e não cite em copy.
- **Estados de permissão que pedem cuidado:**
  - *Autorização verbal, falta termo escrito.* Não dá para usar em público: trate como `uso interno` até o termo chegar. Registre a data e quem ouviu a autorização.
  - *Termo assinado, usos não confirmados.* Use só para o que a pessoa confirmar que o termo cobre. A lista de usos fica pendente até alguém ler o termo.
- **Quando as fontes divergem sobre permissão**, vale nesta ordem: termo escrito > o que a pessoa afirma agora > cabeçalho ou observação da fonte (por exemplo "uso interno" no topo de uma transcrição). Registre a divergência.
- **Cliente com nome real** só entra se a pessoa confirmar que pode.
- O texto é em português do Brasil, frases curtas, sem jargão de agência. Siga `02-voz/VOZ.md` quando já estiver preenchido.
