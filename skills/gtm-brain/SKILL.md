---
name: gtm-brain
description: Orquestra o preenchimento do cérebro de go-to-market de uma marca no GTM Brain (as 11 camadas em markdown). Mostra o que já está preenchido e o que falta, escolhe a próxima camada e chama a skill certa. Use quando a pessoa disser "preencher a marca", "começar o GTM Brain", "o que falta na marca", "próximo passo do brain", "status das camadas", "atualizar o cérebro da marca" ou abrir uma pasta de marca do GTM Brain pela primeira vez.
---

# GTM Brain: orquestrador

Você conduz o preenchimento da marca de ponta a ponta. As skills de cada camada fazem o trabalho; esta decide a ordem, mantém o `CEREBRO.md` em dia e diz à pessoa onde ela está.

Leia antes: [`referencias/regras.md`](referencias/regras.md). Valem para todas as skills.

## As skills

| Skill | Preenche |
| --- | --- |
| `preencher-icp` | `01-icp/`: ICP, comitê de compra, voz do cliente |
| `preencher-voz` | `02-voz/`: voz, terminologia, compliance |
| `preencher-oferta` | `05-oferta/OFERTA.md`: posicionamento, promessas, ofertas, pacotes e preço |
| `mapear-concorrencia` | `05-oferta/CONCORRENCIA.md` e `GANHOS-E-PERDAS.md` |
| `registrar-provas` | `08-conteudo/PROVAS.md`: cases, depoimentos, dados, capacidade, permissões |
| `pesquisar-palavras-chave` | `06-seo/` e `07-site/`: palavras-chave, clusters, GEO/AEO, mapa do site |
| `escolher-canais` | `11-plano/CANAIS.md`: fase e gargalo, uma ideia por canal, três canais em teste, canal principal e sinais de saturação |
| `montar-plano` | `11-plano/`, `09-dados/` e o calendário: conta do cliente, plano de uma página, medição |
| `fechar-lacunas` | qualquer arquivo: fichas incompletas, pendências e contradições; também visual, design system e biblioteca de conteúdo |

## Fluxo

### 1. Situar

1. Ache a pasta da marca (regras, seção 1).
2. Rode `node src/lacunas.mjs --marca <pasta>` dentro de `brain/`.
3. Mostre à pessoa um resumo curto: quantos arquivos estão preenchidos, por camada, e o próximo passo que o relatório sugere.

### 2. Primeira conversa (só se a marca está em branco)

Se `10-cerebro/CEREBRO.md` ainda não tem o nome da marca, faça uma rodada de perguntas antes de qualquer camada. O objetivo é saber de onde tirar as respostas, para não perguntar o que já está escrito em algum lugar.

1. **Nome da marca e o que ela vende**, numa frase.
2. **Fontes disponíveis** (múltipla escolha): site da marca; transcrições ou gravações de calls de venda; export do CRM; pesquisa ou entrevistas com clientes; avaliações públicas (Google, Reclame Aqui, G2, App Store); pasta de notas (Obsidian, Notion, Drive); propostas e contratos; métricas do produto ou do site.
3. **Quem responde** as perguntas: a própria pessoa, ou ela vai consultar sócios, vendas, sucesso do cliente.
4. **Por onde começar**: a ordem recomendada (ICP → voz → oferta → provas → concorrência → palavras-chave → canais e plano) ou a camada que a pessoa precisa primeiro, por exemplo "vou lançar um site, comece pelo SEO".

Grave o nome no título do `CEREBRO.md` (`# Cérebro da marca — <Nome>`) e anote as fontes que a pessoa deu numa lista `Fontes da marca:` logo abaixo do título, uma por linha, no formato `` - `[TAG]` descrição, período `` (regras, seção 4). Essa lista é o registro de tags da marca: as skills de camada leem as fontes ali, reutilizam as tags e acrescentam ali cada fonte nova.

### 3. Uma camada por vez

1. Chame a skill da próxima camada (a do relatório, ou a que a pessoa escolheu).
2. Quando ela terminar, rode `lacunas` de novo.
3. Atualize `## Status das camadas` no `CEREBRO.md`: uma linha por camada; camada com parte dos arquivos feita fica `🟡 parcial (o que falta)` (regras, seção 6).
4. Pergunte se segue para a próxima ou se a pessoa quer revisar antes. Se ela quiser commitar, um commit por camada.

**No plano**, a ordem é: `montar-plano` até a rodada 2 (meta e taxas, passos 1 a 3 da conta), depois `escolher-canais` (`11-plano/CANAIS.md`), depois a `montar-plano` de novo, da rodada 3 em diante. A escolha de canais diz quais canais entram no plano e se cada um entra em visitas ou em leads. Quando o canal principal saturar, chame `escolher-canais` de novo, sem refazer a conta inteira.

**Depois de `registrar-provas`**, volte às promessas de `/05-oferta/OFERTA.md` e às objeções de `/01-icp/ICP.md`: o que estava `[HIPÓTESE]`, "sem prova" ou `[PENDENTE: /08-conteudo/PROVAS.md]` pode ter prova agora. A própria `registrar-provas` propõe essas mudanças no passo de verificar; confira que ela fez.

Sem pressa de cobrir tudo numa sessão. Três camadas bem preenchidas (ICP, voz e oferta) já mudam o que um agente escreve.

### 4. Fechar o cérebro

Quando ICP, voz, oferta e provas estiverem preenchidos, preencha o resto do `CEREBRO.md`:

- `## Status das camadas` em dia.
- `## Variáveis mínimas para personalizar`: preencha com o que está nas camadas.
- `## System prompt mestre` e `## Cartão de carga rápida para contextos pequenos`: troque os campos entre colchetes, nos blocos de código, pelo essencial de cada camada, apontando para o arquivo de detalhe em vez de copiar.
- `## Ordem de carga` e `## Índice de caminhos`: confira que os caminhos existem.

Depois rode `node src/build.mjs --marca <pasta>` e mostre `out/gtm-brain.html` à pessoa, ou sugira `npm run dev -- --marca <pasta> --write` para editar com o time no editor.

## Retomar uma marca em andamento

Rode `lacunas` e siga a ordem do relatório:

1. **Arquivos ainda em template** → a skill indicada ao lado.
2. **Fichas incompletas** → a skill indicada ao lado, ou `fechar-lacunas`. **Provas citadas sem definição** → `registrar-provas`.
3. **Exemplo do template que ficou no arquivo** → a skill indicada ao lado reescreve com o conteúdo da marca.
4. **Contradições** → `fechar-lacunas`: mostre à pessoa e pergunte qual lado vale; corrija o arquivo errado e tire a marca `[CONTRADIZ: …]`.
5. **Instruções do template** e **Pendências nos arquivos preenchidos** → `fechar-lacunas`.
6. **Hipóteses em aberto** não são lacunas. Só mexa quando a pessoa trouxer dado novo.

O passo a passo de cada seção está em `fechar-lacunas`.

## O que não fazer

- Não preencha várias camadas de uma vez sem mostrar nada à pessoa. Uma camada, um resumo, uma confirmação.
- Não copie o exemplo da Cadência, nem `exemplo/` nem os blocos de exemplo do template. Eles mostram o formato; datas, números, nomes e recursos são inventados (regras, seção 3).
- Não apague as marcações de pendência para o relatório ficar limpo. Pendência honesta vale mais que campo inventado.
