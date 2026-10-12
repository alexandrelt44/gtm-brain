> Adaptado de `seo-and-aeo-strategy` do GTM Skills (github.com/manojbajaj95/claude-gtm-plugin), licença MIT, © 2025 mbajaj, incluindo `references/aeo-geo-patterns.md`, `references/geo-research.md`, `references/ai-crawlers.md` e `references/content-patterns.md`. Traduzido, resumido e ajustado aos arquivos do GTM Brain. Aviso completo em `AVISOS-DE-TERCEIROS.md`.

# GEO e AEO: o que é da marca

O template de `06-seo/GEO-AEO.md` já traz as regras gerais (clareza de entidade, bloco de definição, perguntas frequentes, citações, autoria, atualidade, dados estruturados por página). Mantenha essas seções. O seu trabalho é escrever, dentro delas, o que só vale para esta marca, e deixar a primeira medição registrada.

SEO ganha posição. GEO e AEO ganham citação: a marca aparece na resposta do ChatGPT, do Perplexity, do Gemini, do Copilot ou no resumo de IA do Google, de preferência com link.

## O que escrever em cada seção

**Por que isso importa:** um bullet com o que se sabe da própria marca. Pergunte (ou procure nas entrevistas e em `/01-icp/VOZ-DO-CLIENTE.md`) se clientes contaram que pesquisaram num assistente de IA antes de comprar. Se ninguém perguntou ainda, registre `[PENDENTE: perguntar "onde você pesquisou antes de nos procurar?" nas próximas conversas]`.

**Clareza de entidade:** a lista das entidades que a marca usa sempre do mesmo jeito: o nome da empresa, os nomes dos produtos, a categoria, os termos do nicho. Aponte para `/02-voz/TERMINOLOGIA.md` em vez de repetir os proibidos.

**Blocos de definição:** escreva o bloco do pilar do cluster 1, pronto para usar. Uma pergunta no H2, a resposta em 40 a 60 palavras, a entidade em negrito na primeira menção, e a diferença para o conceito vizinho.

**Pares de pergunta e resposta:** diga de onde saem as perguntas desta marca (suporte, entrevistas, "As pessoas também perguntam" das primárias) e dê dois exemplos escritos como o cliente escreve.

**Citações e fontes:** quais dados próprios podem ir para página pública (IDs de `/08-conteudo/PROVAS.md` com permissão) e quais não podem. Todo número publicado leva data e tamanho da amostra. O ID da prova não aparece no texto publicado.

**Autoria:** quem assina cada cluster, com cargo e a URL da bio. Nome real, confirmado pela pessoa. Sem autor confirmado, `[PENDENTE: quem assina o cluster N]`.

## O que mais ajuda a ser citado

O estudo "GEO: Generative Engine Optimization" (Aggarwal e outros, Princeton e outras instituições, KDD 2024, arXiv:2311.09735) testou formas de reescrever conteúdo e mediu a visibilidade nas respostas de motores generativos. O que mais ajudou: citar fontes, incluir números com fonte e incluir citações de pessoas com nome. Texto claro e fluente também ajudou. Repetir palavra-chave não ajudou. Use isso como direção, não como promessa de resultado.

Na prática, cada página pilar e cada página de oferta tem:

- **Resposta na abertura:** a resposta mais citável logo depois do H1, em uma ou duas frases.
- **Trechos que se sustentam sozinhos:** cada H2 abre com a resposta direta. O motor extrai trechos, não páginas.
- **Frases sem ambiguidade:** sujeito, verbo concreto, objeto. "O plano Básico inclui emissão de nota fiscal" em vez de "a solução ajuda em várias tarefas".
- **Número com fonte e data:** "segundo [fonte], [número] em [período]".
- **Citação com nome:** fala de cliente ou especialista com nome, cargo e empresa, com permissão.
- **Tabela para comparação, lista numerada para processo.**

Os formatos mais citados são comparações, guias completos, dados próprios e páginas de produto com detalhes concretos. Os menos citados são posts genéricos sem estrutura, conteúdo atrás de cadastro, páginas sem data e PDF.

## Estar onde a IA procura

A IA cita onde a marca aparece, não só o site. Para cada marca, liste em `GEO-AEO.md` onde ela já está e onde falta: perfis em sites de avaliação do nicho (Google, Reclame Aqui, App Store, Capterra, G2), menções em portais e associações do setor, vídeos no YouTube, respostas em comunidades. Uma linha por lugar, com status.

## Rastreadores de IA

Confira o `robots.txt` do site e escreva a decisão em `GEO-AEO.md`. Há dois tipos de robô:

- **Busca** (deixe entrar para ser citado): `OAI-SearchBot` e `ChatGPT-User` (OpenAI), `PerplexityBot`, `ClaudeBot` (Anthropic), `Googlebot`, `Bingbot`.
- **Treino** (decisão da marca): `GPTBot` (OpenAI), `Google-Extended` (Gemini), `CCBot` (Common Crawl), `Bytespider` (ByteDance), `FacebookBot` (Meta).

Se o `robots.txt` bloqueia robôs de busca de IA sem a pessoa saber, isso é a primeira lacuna a registrar. Os nomes mudam: confirme na documentação de cada empresa antes de recomendar uma configuração.

## Medição (obrigatória)

Troque `## Exemplo` por `## Onde a marca aparece hoje nas respostas de IA`. A seção tem quem mede, a cada quanto tempo, e a tabela:

```md
| Pergunta | Motor | A marca é citada? | Quem aparece no lugar | Data |
| --- | --- | --- | --- | --- |
| [pergunta de compra, escrita como o cliente] | ChatGPT | Não | [concorrentes ou páginas citadas] | AAAA-MM-DD |
```

- **Perguntas:** de 5 a 10, tiradas das primárias comerciais e das perguntas de comparação ("melhor [categoria] para [público]", "[marca] é bom", "[concorrente] ou [marca]"). Sempre escritas do mesmo jeito, para comparar mês a mês.
- **Motores:** ChatGPT, Perplexity, Gemini, resumo de IA do Google, Copilot. Use sessão sem histórico (aba anônima ou conta limpa).
- **Se você consegue rodar as buscas agora**, faça a primeira medição e preencha com a data de hoje. Se não consegue, deixe a tabela com as perguntas e `[PENDENTE: primeira medição]` na coluna da data.
- Depois da tabela, uma leitura de duas ou três linhas com selo: onde a marca ganha citação, onde perde, e a aposta para mudar isso (`[HIPÓTESE]`).

Outros sinais, quando houver acesso:

- **Visitas vindas de IA** no GA4: origem `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`.
- **Busca pela marca** no Search Console: cresce quando a marca é citada sem link.
- **"Como nos conheceu?"** no formulário de contato ou no cadastro, com a opção "ChatGPT ou outra IA".

Para ler a variação entre meses, olhe dois números: em quantas perguntas a marca aparece, e a parte da marca no total de citações (as dela dividido pelas de todas as marcas citadas nas mesmas respostas).

| Perguntas em que aparece | Parte nas citações | Leitura |
| --- | --- | --- |
| Cai | Cai | Mudança no motor, que afeta todo mundo |
| Cai | Estável | O conteúdo da marca piorou ou envelheceu |
| Estável | Cai | Os concorrentes melhoraram |
| Sobe | Sobe | O trabalho está funcionando |
