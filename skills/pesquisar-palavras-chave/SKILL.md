---
name: pesquisar-palavras-chave
description: Preenche as camadas 06-seo e 07-site do GTM Brain com a pessoa da marca. Pesquisa e mede palavras-chave no Brasil, em português, agrupa em clusters com página pilar e satélites, escreve as regras de GEO/AEO com medição e monta o mapa do site e os dados estruturados. Funciona com uma ferramenta de dados (DataForSEO, Search Console, Planejador do Google Ads) ou sem ela, sem inventar volume. Use quando a pessoa disser "pesquisa de palavras-chave", "keywords", "clusters", "SEO", "GEO", "AEO", "aparecer no ChatGPT", "mapa do site", "dados estruturados" ou quando o relatório de lacunas apontar um arquivo de 06-seo ou 07-site.
---

# Pesquisar palavras-chave

Você descobre o que o comprador da marca busca, mede o que dá para medir e transforma isso em páginas: palavras-chave com página alvo, clusters com pilar e satélites, regras para ser citado por IA e o mapa do site que carrega tudo.

Leia antes: [`../gtm-brain/referencias/regras.md`](../gtm-brain/referencias/regras.md). Fontes, perguntas, selos, gravação e verificação seguem essas regras. Aqui está só o que muda nesta camada.

## O que esta skill preenche

| Arquivo | Pronto quando |
| --- | --- |
| `06-seo/pesquisa/AAAA-MM-DD-palavras-chave.csv` | Uma linha por termo pesquisado, com as 10 colunas abaixo. Volume vazio quando não houver dado |
| `06-seo/pesquisa/AAAA-MM-DD-palavras-chave.md` | Método, fontes, o que os dados mostram e o que ficou de fora |
| `06-seo/PALAVRAS-CHAVE.md` | Primárias e secundárias com intenção, página alvo e prioridade; clusters de cauda longa; sazonais; registro de pesquisa |
| `06-seo/CLUSTERS.md` | Cada `## Cluster N:` tem `### Página pilar` com URL e `### Satélites` com palavra-chave principal |
| `06-seo/GEO-AEO.md` | Entidades da marca, bloco de definição do pilar principal, autoria real e uma tabela de medição com data |
| `07-site/MAPA-DO-SITE.md` | Toda página alvo das tabelas de palavras-chave existe no inventário, no ar ou planejada |
| `07-site/DADOS-ESTRUTURADOS.md` | Os valores fixos da marca (nome, URL, logo, perfis, contato, autores) trocados nos blocos JSON-LD |

## Antes de começar

1. Rode `lacunas` (regras, seção 1). Se ICP e oferta ainda estão em template, avise: sem eles a pesquisa vira lista de termos sem dono. Dá para seguir, mas a nota de fit fica fraca.
2. Leia, nesta ordem:
   - `/01-icp/ICP.md`: dores, gatilhos, "Onde encontrar", "Consumo de conteúdo".
   - `/01-icp/VOZ-DO-CLIENTE.md`: as frases do cliente, do jeito que ele escreve. São as melhores sementes.
   - `/05-oferta/OFERTA.md`: o que a marca vende, para quem, e as páginas de cada oferta.
   - `/05-oferta/CONCORRENCIA.md`: nomes de concorrentes e alternativas ("planilha", "fazer sozinho").
   - `/02-voz/TERMINOLOGIA.md`: termos preferidos e proibidos.
   - `/08-conteudo/PROVAS.md`: dados próprios que uma página pode citar.
   - A lista `Fontes da marca:` no `CEREBRO.md`. Ela é o registro de tags da marca: reutilize as tags de lá e acrescente ali cada fonte nova (regras, seção 4).
3. Leia o site da marca. Comece pelo `/sitemap.xml`; se não houver, pela navegação e pelo rodapé. Anote as páginas que existem: elas são a base do mapa do site e as páginas alvo possíveis.
4. Veja que ferramenta de dados existe no seu ambiente: um servidor MCP de palavras-chave (por exemplo DataForSEO, com a ferramenta `api_request`), um MCP do Search Console, ou exportações que a pessoa tenha (Search Console, Planejador de palavras-chave do Google Ads, Semrush, Ahrefs).

**Região e idioma:** Brasil e português, a não ser que a pessoa diga outra coisa. No DataForSEO, `location_code: 2076` e `language_code: "pt"`. No Search Console, filtre por país Brasil.

## Rodada de abertura

Pergunte só o que as fontes não responderam. No máximo quatro perguntas, com opções e a recomendada primeiro.

1. **Para que serve a busca agora:** gerar contato ou venda (Recomendado se a oferta já está definida); ganhar autoridade num tema novo; apoiar o time de vendas com páginas de comparação e preço.
2. **Idade do site:** novo (até 6 meses); crescendo (6 a 18 meses); estabelecido (mais de 18 meses). Isso define a faixa de volume que vale disputar (`referencias/priorizacao.md`).
3. **Dados de volume:** usar a ferramenta que você encontrou (Recomendado, se existir); a pessoa exporta Search Console ou Planejador; seguir sem ferramenta, com volume em branco.
4. **Área:** Brasil inteiro (Recomendado para quem vende online); uma cidade ou região (entra pacote local e `LocalBusiness`); Brasil e outro país.

## Fluxo

### 1. Sementes

Monte de 50 a 100 termos candidatos com o método dos 6 círculos e a mineração de comunidades: [`referencias/metodo-6-circulos.md`](referencias/metodo-6-circulos.md). As sementes saem das fontes da marca, não da sua cabeça: frases da voz do cliente, dores do ICP, nomes das ofertas, nomes dos concorrentes.

### 2. Expandir e medir

- Expanda com os modificadores do português e classifique a intenção: [`referencias/expansao-e-intencao.md`](referencias/expansao-e-intencao.md).
- **Com ferramenta:** meça volume, dificuldade, intenção e tendência de todos os termos. Pedidos prontos em [`referencias/dataforseo.md`](referencias/dataforseo.md). Com Search Console, puxe as consultas dos últimos 90 dias: são termos que já trazem impressão.
- **Sem ferramenta:** use autocomplete, "As pessoas também perguntam", Google Trends, comunidades e as páginas dos concorrentes. O volume fica em branco. Faixas do Planejador do Google Ads (ex.: "100 a 1 mil") entram como texto na tabela, com a ferramenta citada, e ficam em branco no CSV.

### 3. Agrupar e priorizar

1. Agrupe por sentido e intenção. Cada grupo vira um cluster com um pilar (o termo mais amplo que a marca consegue responder bem) e de 6 a 12 satélites.
2. Dê as notas de demanda, competição, fit e oportunidade: [`referencias/priorizacao.md`](referencias/priorizacao.md).
3. Escolha de 10 a 20 primárias (marca pequena: de 5 a 10), de 20 a 40 secundárias e o resto vira cauda longa dentro dos clusters.

### 4. Rodada de confirmação

Mostre a lista curta antes de escrever. Pergunte:

1. **Primárias:** esta lista (Recomendado), com uma linha de motivo por termo; ou trocar termos (diga quais).
2. **Clusters:** os N clusters propostos, com o pilar de cada um; juntar dois; cortar um.
3. **Termos que trazem o público errado:** os que você marcou para descartar, com o motivo (ex.: quem busca "franquia de X" quer comprar franquia, não o produto).
4. **Páginas novas:** as páginas alvo que ainda não existem no site. Entram no mapa como "Planejado" (Recomendado) ou ficam fora até haver quem escreva.

### 5. Escrever

**CSV de pesquisa.** Crie `06-seo/pesquisa/` se não existir. O nome começa pela data: o GTM Brain lê o CSV de nome mais recente que tem a coluna `keyword`. Cabeçalho exato:

```csv
keyword,volume,kd,intent,yoy,cluster,demand,competition,fit,opportunity
contabilidade para clinica medica,320,28,comm,12,1,5,4,9,7
"mei ou simples nacional, qual escolher",,,info,,2,4,3,8,7
```

- `keyword`: em minúsculas, **igual, letra por letra, ao termo das tabelas** de `PALAVRAS-CHAVE.md`. É por ele que o GTM Brain junta a linha do CSV à linha da tabela.
- `volume`: número inteiro, sem ponto de milhar. Vazio se não houver dado.
- `kd`: de 0 a 100, da ferramenta. Vazio sem ferramenta.
- `intent`: `info`, `comm`, `trans` ou `nav`.
- `yoy`: variação em 12 meses, em porcentagem, sem o sinal `%` (`-12`, `40`). Vazio sem dado.
- `cluster`: só o número do cluster de `CLUSTERS.md`. Vazio se o termo ficou fora.
- `demand`, `competition`, `fit`, `opportunity`: de 1 a 10, como em `referencias/priorizacao.md`.
- Termo com vírgula vai entre aspas.

**Relato da pesquisa** (`AAAA-MM-DD-palavras-chave.md`): título `# Pesquisa de palavras-chave, AAAA-MM-DD`, lista de fontes, e as seções `## Método` (ferramenta, região, idioma, sementes, data), `## O que os dados mostram` (com selos), `## Termos descartados` (com o motivo) e `## Próximos passos`. Cite este par de arquivos nos outros como `[PESQUISA]`.

**`PALAVRAS-CHAVE.md`.** Mantenha as colunas do template. Volume com ponto de milhar (`1.900`), tendência com sinal (`+15%`, `−5%`), `—` onde não há dado. Página alvo como caminho (`` `/agenda` ``). Logo depois das secundárias, inclua `## O que os dados mostram`, de três a cinco bullets com selo: o GTM Brain mostra essa seção junto da estratégia. Os `### Cluster: …` de cauda longa usam os mesmos temas de `CLUSTERS.md`. Preencha sazonais (picos que aparecem na série mensal ou no Trends) e uma linha do registro de pesquisa por sessão.

**`CLUSTERS.md`.** Um `## Cluster N: Tema` por cluster, com o mesmo número usado no CSV. Em `### Página pilar`, os bullets `**Título:**`, `**URL:**`, `**Palavra-chave principal:**`, `**Recurso da SERP:**`, `**Meta de tamanho:**`, `**Status:**`. Em `### Satélites`, lista numerada com os bullets do template. Apague as seções `## Cluster N` que sobrarem e preencha o inventário e as lacunas de conteúdo.

**`GEO-AEO.md`.** Mantenha as regras gerais e escreva o que é da marca: [`referencias/geo-aeo.md`](referencias/geo-aeo.md). Troque `## Exemplo` por `## Onde a marca aparece hoje nas respostas de IA`, com a tabela de medição.

**`MAPA-DO-SITE.md` e `DADOS-ESTRUTURADOS.md`:** [`referencias/site-e-dados-estruturados.md`](referencias/site-e-dados-estruturados.md). Se só falta `DADOS-ESTRUTURADOS.md`, o relatório manda para `fechar-lacunas`, que usa a mesma referência sem a rodada de palavras-chave.

Em todos: fontes no topo, `Última atualização`, checklist marcado, `## Exemplo` e blocos "Exemplo de preenchimento:" apagados (regras, seção 3).

## Verificar

1. Rode `lacunas`. Os cinco arquivos (e o relato da pesquisa) saem de "Arquivos ainda em template".
2. Trate o que o relatório listar de `06-seo/` e `07-site/` em "Instruções do template nos arquivos preenchidos" e em "Exemplo do template que ficou no arquivo". O modelo do bloco de definição de `GEO-AEO.md` (`**O que é [entidade]?**`) aparece ali: troque pelo bloco de definição do pilar da marca ou ponha o modelo dentro de um bloco de código. Os colchetes que mudam por página dentro dos blocos de código de `DADOS-ESTRUTURADOS.md` (`[Título do post]`) não contam e ficam.
3. Rode `node src/build.mjs --marca <pasta>` e abra a categoria Palavras-chave: as primárias mostram volume e dificuldade, e cada termo com cluster aponta para o cluster certo. Se um termo aparece duas vezes, o texto do CSV e o da tabela não batem.
4. Confira à mão: toda página alvo das tabelas está no mapa do site; todo número de cluster do CSV existe em `CLUSTERS.md`; todo cluster tem URL de pilar.
5. Atualize as linhas 06 e 07 em `## Status das camadas` do `CEREBRO.md` e diga à pessoa o que entrou, o que ficou pendente e o próximo arquivo (regras, seção 6).

## Armadilhas

- **Volume inventado.** Sem ferramenta, o volume fica em branco. Nunca escreva "cerca de 500" por intuição. A nota de demanda pode vir de sinais (autocomplete, perguntas, comunidade), mas isso fica dito no relato da pesquisa.
- **Lista em inglês traduzida.** "best CRM for small business" não vira "melhor CRM para pequena empresa" por tradução: confira como o brasileiro escreve. Ele usa "sistema", "app", "programa", "planilha", troca o singular, tira o acento ("estudio") e escreve "como fazer" mais que "guia". Toda semente sai das frases da voz do cliente ou de uma busca real.
- **Cluster sem página.** Todo cluster tem um pilar com URL e todo termo primário tem página alvo. Se a página não existe, ela entra no mapa do site como "Planejado". Um cluster sem casa é um tema solto.
- **Duas páginas para o mesmo termo.** Uma palavra-chave principal, uma página. Se dois satélites disputam o mesmo termo, junte ou troque o termo de um deles.
- **GEO sem medição.** Regra de GEO sem a tabela "onde aparecemos hoje" não diz se funcionou. Sempre deixe a primeira medição com data, mesmo que o resultado seja "não citada em nenhuma".
- **Sementes amplas demais.** "quanto custa" ou "automação" trazem ruído de outros mercados nas sugestões da ferramenta. Use sementes específicas do nicho e valide listas fechadas.
- **Dificuldade só pelo número.** A dificuldade da ferramenta mede links. Abra a busca e veja quem está no topo antes de dar a nota de competição.
- **CSV sem data no nome.** O GTM Brain pega o CSV de nome mais recente. `pesquisa-final.csv` pode passar na frente da pesquisa nova.
- **Nome de concorrente.** "Alternativa a X" e "X ou Y" são buscas legítimas, mas o que a página diz do concorrente segue `/02-voz/COMPLIANCE.md`.
