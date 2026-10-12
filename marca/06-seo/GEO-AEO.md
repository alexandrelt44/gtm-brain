# Otimização para motores generativos e motores de resposta (GEO e AEO)

## Como usar este arquivo

- **O que entra:** as regras que fazem o seu conteúdo ser citado pelo ChatGPT, pelo Perplexity, pelo Gemini, pelas visões gerais criadas por IA do Google, pelo Copilot e por outros motores de resposta.
- **Como os agentes leem:** os agentes carregam este arquivo no fim de um briefing de conteúdo. Todo artigo passa por uma checagem de GEO e AEO antes de ser publicado.
- **Frequência de atualização:** atualize sempre que uma grande superfície de busca com IA mudar de forma visível o jeito de citar fontes.

## Checklist para agentes de IA

- [ ] Legível por máquina: regras escritas como checagens curtas.
- [ ] Estruturado: seções separadas para entidades, dados estruturados, definições e citações.
- [ ] Fonte única da verdade.
- [ ] Versionado.
- [ ] Citável: os agentes citam `/06-seo/GEO-AEO.md` ao finalizar um conteúdo.

Última atualização: [AAAA-MM-DD]

---

## O que são GEO e AEO, em linguagem simples

Otimização para motores generativos (GEO, do inglês Generative Engine Optimization) é a prática de moldar o conteúdo para que os grandes modelos de linguagem o reconheçam como fonte confiável e o repitam nas respostas.

Otimização para motores de resposta (AEO, do inglês Answer Engine Optimization) é a prática de moldar o conteúdo para que motores de resposta (Perplexity, visões gerais criadas por IA do Google, ChatGPT, Gemini, Copilot) consigam extrair uma resposta clara e dar o crédito à sua página com uma citação.

SEO clássico ganha posição. GEO e AEO ganham citação. As disciplinas se sobrepõem, mas não são a mesma coisa.

## Por que isso importa para empresas pequenas e em crescimento

- As visões gerais criadas por IA do Google aparecem em cada vez mais buscas informacionais, inclusive em português.
- O Perplexity e o ChatGPT citam as fontes pelo nome e pela URL nas respostas.
- O Gemini e o Copilot puxam trechos literais das páginas que usam como fonte.
- Cada vez mais compradores fazem a primeira pesquisa sobre uma categoria num assistente de IA, antes de abrir a busca clássica. Pergunte aos seus clientes onde eles pesquisaram e registre a resposta em `/01-icp/VOZ-DO-CLIENTE.md`.
- Um conteúdo que está em oitavo lugar no SEO clássico ainda pode ser a fonte citada numa visão geral criada por IA, se for a versão mais clara e mais rica em entidades daquela resposta.

## Clareza de entidade

Os motores de resposta organizam o mundo em entidades. Pessoas, empresas, produtos, lugares, conceitos. Se a página não deixa claro do que trata, o motor não dá o crédito a você.

Todo conteúdo precisa passar neste teste.

- O H1 nomeia a entidade.
- O primeiro parágrafo define a entidade numa frase.
- O primeiro parágrafo liga a entidade ao problema do leitor.
- O slug da URL contém a entidade como expressão.
- A página recebe link do pilar correspondente, para o motor saber que ela é o satélite canônico.

## Blocos de definição

Todo pilar e todo satélite têm um bloco de definição bem formatado perto do topo. Os motores de resposta gostam muito deles.

Modelo:

> **O que é [entidade]?**
>
> [Entidade] é [definição em uma ou duas frases]. Importa porque [motivo simples]. Diferente de [conceito relacionado], [entidade] é [distinção clara].

Use um H2 escrito como a pergunta. Use negrito na entidade na primeira menção. Mantenha a resposta entre 40 e 60 palavras.

## Pares de pergunta e resposta

Monte pelo menos um bloco de perguntas frequentes em todo pilar e em toda página de serviço.

- Faça de três a seis perguntas.
- Escreva cada pergunta exatamente como o comprador digitaria.
- Responda cada uma em 40 a 80 palavras.
- Ligue o bloco de perguntas frequentes aos dados estruturados `FAQPage` de `/07-site/DADOS-ESTRUTURADOS.md`.

## Citações e fontes

Os motores de resposta preferem páginas que citam fontes. Páginas que citam reduzem o risco de alucinação e ganham mais sinais de confiança.

Regras:

- Todo número cita a fonte no próprio texto.
- Toda citação traz pessoa, data e lugar.
- Links externos abrem na mesma aba, a não ser que sejam referências longas.
- Citações internas apontam para `/01-icp/VOZ-DO-CLIENTE.md` (falas de clientes) e para `/08-conteudo/PROVAS.md` (cases).

## Autoria e experiência

Os motores de resposta procuram um autor com nome e que dá para verificar.

- Todo artigo tem assinatura com nome completo do autor, cargo e link para uma página de bio.
- A página de bio tem os dados estruturados do autor (tipo `Person`).
- Os autores listam formação, experiência e links externos (LinkedIn, palestras, publicações).
- O site tem uma página "Sobre" visível, com nomes e fotos de quem lidera a empresa.

## Sinais de atualidade

Os motores de resposta favorecem conteúdo recente em buscas comerciais e informacionais.

- Toda página mostra a data da "Última atualização".
- Conteúdos perenes são atualizados a cada 6 a 12 meses.
- A data de atualização também fica nos dados estruturados (`dateModified`).

## Dados estruturados por tipo de página

| Tipo de página | Dados estruturados obrigatórios |
| --- | --- |
| Página inicial | `Organization` |
| Sobre | `AboutPage`, `Person` para a liderança |
| Serviços | `Service`, opcionalmente `Product` |
| Página de produto | `Product`, `Offer`, `AggregateRating` se houver avaliações |
| Preços | `Offer` |
| Case | `Article`, `Review` |
| Post de blog | `BlogPosting` ou `Article` |
| Passo a passo | `HowTo` |
| Bloco de perguntas frequentes | `FAQPage` |
| Negócio local | `LocalBusiness` |
| Avaliações | `Review`, `AggregateRating` |

Os trechos completos de JSON-LD ficam em `/07-site/DADOS-ESTRUTURADOS.md`.

## Padrões que ganham citação em respostas de IA

Técnicas que fazem o conteúdo ser citado em respostas de IA.

- **Parágrafo de resposta na abertura:** coloque a resposta mais citável no primeiro parágrafo, logo depois do H1 e do bloco de definição.
- **Listas numeradas:** listas curtas e numeradas são mais fáceis para os modelos extraírem e atribuírem.
- **Exemplos com nome:** exemplos específicos e reais, com nomes e números, são citados com mais frequência que exemplos genéricos.
- **Subtítulos que repetem a busca:** subtítulos escritos do jeito que a pessoa provavelmente busca sinalizam relevância.
- **Sumário:** um sumário visível ajuda os motores a entender a estrutura e indexa mais links.

## Bing e Copilot

- O Copilot se apoia no índice do Bing. Cadastre o site no Bing Webmaster Tools.
- O Copilot tende a dar mais peso a conteúdo recente. Atualize as páginas críticas a cada 90 dias.
- Use `lastmod` no sitemap XML, com datas corretas.

## ChatGPT e Perplexity

- Os dois usam índices da web em tempo real, além dos próprios rastreadores.
- Os dois citam pela URL exata, então URLs canônicas importam.
- Os dois dependem de clareza de entidade e de autoria com nome.
- Os dois punem conteúdo raso com mais rigor que o Google clássico.

## Gemini e visões gerais criadas por IA do Google

- Os dois dependem do índice do Google.
- Os dois preferem conteúdo com estrutura clara, dados estruturados e autoria.
- Os dois puxam conteúdo de páginas que equilibram profundidade (mais de 1.000 palavras) e clareza (estrutura fácil de escanear).

## Faça e não faça

**Faça**

- Escreva definições em linguagem simples.
- Chame as entidades pelo nome formal.
- Use dados estruturados em todo tipo de página.
- Coloque perguntas frequentes em todo pilar.
- Cite as fontes no próprio texto.

**Não faça**

- Forçar repetição de palavra-chave.
- Esconder definições em acordeões fechados no primeiro carregamento.
- Usar assinaturas genéricas como "a equipe".
- Publicar uma página sem nenhum link interno ou externo.
- Publicar páginas sem data de última atualização visível.

## Exemplo

### Pilar da Cadência: "Como diminuir a inadimplência em academia e estúdio"

- O H1 nomeia a entidade ("inadimplência em academia e estúdio").
- O primeiro parágrafo define a entidade numa frase.
- Um H2 chamado "O que é inadimplência em estúdio de pilates" aparece nas primeiras 400 palavras, com uma resposta de 40 a 60 palavras.
- Um bloco de perguntas frequentes, por volta de 70% da página, responde a seis perguntas comuns de donas de estúdio.
- Todo número cita a fonte: regras do Pix automático publicadas pelo Banco Central, e dados da própria base da Cadência com data e tamanho da amostra (D-001).
- A assinatura é de Marina Duarte, CEO e ex-dona de estúdio, com página de bio com dados estruturados `Person`.
- Os dados estruturados `BlogPosting` + `FAQPage` estão presentes.

## Como passar este arquivo para um agente de IA

```text
Carregue /06-seo/GEO-AEO.md no fim de todo briefing de conteúdo.

Faça esta checagem antes de publicar:
1. O H1 nomeia a entidade com clareza?
2. Há um bloco de definição de 40 a 60 palavras perto do topo?
3. O primeiro parágrafo traz uma resposta direta e citável para a busca principal?
4. Há pelo menos três perguntas frequentes, respondidas em 40 a 80 palavras cada?
5. Todos os números citam a fonte no próprio texto?
6. A assinatura é de uma pessoa real, com página de bio com dados estruturados Person?
7. O tipo certo de dados estruturados está aplicado para este tipo de página (veja /07-site/DADOS-ESTRUTURADOS.md)?
8. A data de última atualização está visível e correta?

Se falhar em qualquer item, a peça não está pronta para publicar.
```

Caminhos de referência: `/06-seo/GEO-AEO.md`, `/06-seo/PALAVRAS-CHAVE.md`, `/06-seo/CLUSTERS.md`, `/07-site/DADOS-ESTRUTURADOS.md`.
