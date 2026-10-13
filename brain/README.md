# brain

O app do GTM Brain: lê a pasta da marca, monta fichas, ligações e grafo, e abre os arquivos num editor colaborativo para pessoas e agentes.

Sem dependências além do Node (20 ou mais novo). O editor colaborativo (Proof SDK) é baixado à parte por `npm run setup:proof`.

## Comandos

```sh
npm run build -- --marca ../exemplo       # gera out/gtm-brain.html (abre por file://) e out/gtm-brain.json
npm run dev -- --marca ../marca           # editor (porta 4000) + GTM Brain ao vivo (porta 3348), modo leitura
npm run dev -- --marca ../marca --write   # grava as edições nos arquivos
npm run dev -- --marca ../marca --commit  # grava e faz um commit por salvamento (a pasta precisa ser um repo git)
npm run lacunas -- --marca ../marca       # o que falta preencher, em ordem, e qual skill usar
npm run mcp -- --marca ../marca           # servidor MCP (stdio) para clientes de LLM: ler a marca e propor mudanças
npm run setup:proof                       # uma vez: baixa o Proof SDK numa versão fixa e prepara o editor
npm test                                  # testes com fixtures sintéticas
```

Opções do build e do servidor:

| Opção | O que faz |
| --- | --- |
| `--marca <pasta>` | Pasta da marca. Padrão: `$GTM_BRAIN_MARCA` ou `../marca` |
| `--issues COL,PRD` | Prefixos de issues para ligar registros a um tracker (padrão: `$GTM_BRAIN_ISSUES`) |
| `--linear-workspace <slug>` | Transforma as issues em links do Linear |
| `--vault <pasta>` | (build) Lê também um vault do Obsidian e liga as fontes às notas. A saída vai para `out/private/` |
| `--port`, `--proof`, `--name` | (servidor) Porta, endereço do editor e nome de exibição no editor (padrão: `git config user.name` da pasta da marca) |

## Saídas do build

- `out/gtm-brain.html`: o GTM Brain num arquivo só
- `out/gtm-brain.json`: as fichas (categorias, registros com campos, completude, ligações e origem). É o que um agente leria
- `out/gtm-brain-explorer.html` e `out/gtm-brain-graph.json`: o grafo bruto de arquivos, seções e referências, útil para depurar a leitura

## API do servidor

| Rota | O que devolve |
| --- | --- |
| `GET /api/brain` | Todas as fichas |
| `GET /api/records/:id` | Uma ficha |
| `POST /api/docs/open {file}` | Abre o arquivo no editor; devolve a URL e os endpoints para agentes |
| `GET /api/docs/status?file=` | Se há mudanças não salvas e quantas linhas |
| `GET /api/docs/diff?file=` | O diff contra o arquivo |
| `POST /api/docs/save {file}` | Grava (só com `--write`) |
| `GET /api/propostas?status=` | As propostas de mudança dos agentes, com o diff das pendentes |
| `POST /api/propostas/:id/aceitar` | Aplica a proposta no arquivo (só com `--write`; com `--commit`, faz um commit) |
| `POST /api/propostas/:id/recusar {nota}` | Recusa a proposta |

## MCP

`src/mcp.mjs` é um servidor MCP por stdio, sem dependências. Ferramentas: `brain_visao_geral`, `brain_buscar`, `brain_registro`, `brain_arquivo`, `brain_lacunas`, `brain_propor` e `brain_propostas`. Ele lê a pasta da marca a cada chamada, então vê as mudanças sem reiniciar.

Os agentes não gravam direto. `brain_propor` guarda a proposta em `<marca>/.gtm-brain/propostas/<id>.json`, uma pasta com o próprio `.gitignore`. A pessoa decide em **Propostas**, no servidor ao vivo. O trecho atual precisa aparecer uma vez só no arquivo. Se o arquivo mudar e o trecho sumir, a proposta para de aplicar e nada é gravado.

## Garantias da gravação

- **Sem reformatação.** O editor reescreve o markdown ao exportar (bullets, escapes, tabelas). A gravação compara linha a linha numa forma canônica e mantém o texto original de toda linha que não mudou de sentido. Abrir e salvar sem editar devolve o arquivo idêntico.
- **Trava de ida e volta.** Se um arquivo não sobrevive ao editor sem edição, ele não abre.
- **Conflito.** Se o arquivo mudou fora do editor desde que foi aberto, nada é gravado.
- **Autoria.** O conteúdo do arquivo entra no editor marcado como humano. Só o que um agente escrever aparece como IA.

## Arquivos

- `src/extract-brand.mjs`: lê os markdowns e monta o grafo de arquivos, seções, provas, fontes e referências
- `src/brain-model.mjs`: a camada de interpretação: o esquema das categorias, os registros, a completude e os links
- `src/md.mjs`, `src/md-merge.mjs`: markdown como dados, e a gravação sem reformatar
- `src/lacunas.mjs`: o relatório de lacunas que as skills de `../skills/` usam
- `src/server.mjs`: servidor ao vivo e sessões arquivo ↔ documento do editor
- `src/mcp.mjs`, `src/propostas.mjs`: o servidor MCP e a fila de propostas
- `src/brain.html`, `src/viewer.html`: o GTM Brain e o explorador técnico
- `proof-skin/`: tradução e visual do editor, injetados por `scripts/proof.sh`
- `scripts/`: instalação e inicialização do editor e do ambiente de desenvolvimento
