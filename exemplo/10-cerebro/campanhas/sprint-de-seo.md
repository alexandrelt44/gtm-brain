# Receita de campanha: sprint de SEO (90 dias)

Um sprint de 90 dias para tirar um cluster de tema da invisibilidade e colocá-lo para ranquear. Uma página pilar, de 6 a 10 páginas do cluster, uma passada de provas e citações e um esforço de link building. Roda uma vez por trimestre, em um cluster prioritário.

---

## Quando usar esta receita

- Você tem um cluster identificado em `06-seo/CLUSTERS.md` que quer dominar.
- O cluster tem 3 ou mais buscas por mês por palavra-chave e pelo menos 10 palavras-chave alvo.
- O calendário de conteúdo tem capacidade para publicar de 6 a 10 peças + 1 atualização da página pilar dentro dos 90 dias.

## Insumos necessários

| Arquivo | O que você puxa |
|---|---|
| `/01-icp/ICP.md` | Para quem estamos escrevendo. Toda peça precisa bater com a intenção da persona. |
| `/02-voz/VOZ.md` | Regras de voz. |
| `/06-seo/PALAVRAS-CHAVE.md` | Palavras-chave alvo do cluster. |
| `/06-seo/CLUSTERS.md` | Mapa hub-and-spoke deste cluster. |
| `/06-seo/GEO-AEO.md` | Táticas de GEO e AEO para aparecer na busca com IA. |
| `/07-site/DADOS-ESTRUTURADOS.md` | Tipos de dados estruturados por página. |
| `/08-conteudo/BIBLIOTECA.md` | Peças existentes que podem ser atualizadas ou receber links cruzados. |
| `/09-dados/MEDICAO.md` | Métricas de base, para medir o ganho. |

## Estrutura do sprint

### Semanas 1 e 2: base

- [ ] Audite o conteúdo que já existe sobre o tema do cluster. Marque cada peça como atualizar, juntar, manter ou aposentar.
- [ ] Defina o briefing da página pilar: título, palavras-chave alvo, intenção, estrutura, tamanho, dados estruturados.
- [ ] Monte o mapa de palavra-chave para URL. Cada peça do cluster sabe qual termo está mirando.
- [ ] Reescreva a página pilar. Publique.

### Semanas 3 a 6: cluster

- [ ] Publique de 3 a 5 páginas do cluster em ordem de prioridade (primeiro as de maior intenção ou com mais oportunidade na SERP).
- [ ] Cada peça aponta para a pilar e para 2 ou 3 outras peças do cluster.
- [ ] Adicione dados estruturados a todas as peças.
- [ ] Envie o sitemap atualizado no Google Search Console.

### Semanas 7 a 9: amplificação

- [ ] Publique as 2 a 5 peças restantes do cluster.
- [ ] Publique de 2 a 3 peças de apoio no LinkedIn (artigos) ou em outra plataforma de artigos, com link de volta para as páginas principais e canonical apontando para elas quando a plataforma permitir.
- [ ] Transforme de 5 a 10 perguntas de alta intenção do tema em posts ou carrosséis no Instagram, seguindo `/10-cerebro/playbooks/instagram.md`, com link para a página certa na bio ou nos stories.
- [ ] Atualize o conteúdo antigo relacionado que ficou marcado como "atualizar" na auditoria.

### Semanas 10 a 12: prova e iteração

- [ ] Puxe os dados de desempenho. Quais peças estão ranqueando? Quais não estão?
- [ ] Atualize as 3 peças de melhor desempenho com dados novos, links internos mais fortes e seções de FAQ.
- [ ] Atualize 3 peças de baixo desempenho com as lições das vencedoras.
- [ ] Registre os resultados no registro de pesquisa de `06-seo/PALAVRAS-CHAVE.md` e em `09-dados/DESTAQUES.md`.

## Regras de voz para este sprint

- Toda peça responde a uma pergunta específica que uma pessoa faria em voz alta.
- Comece a peça pela resposta (padrão AEO). Desenvolva embaixo.
- Seção de FAQ no fim, com 4 a 8 perguntas e respostas independentes.
- Blocos de definição para qualquer termo que um comprador possa buscar como "o que é X".

## Variáveis por peça

- `{{PALAVRA_CHAVE_ALVO}}`
- `{{INTENCAO}}` (informacional / comercial / transacional)
- `{{PERSONA}}`
- `{{META_DE_PALAVRAS}}`
- `{{LINKS_INTERNOS}}` (lista de 5 a 8 URLs relacionadas)
- `{{TIPO_DE_DADO_ESTRUTURADO}}`

## Instruções para o agente

Quando um agente redigir uma peça do sprint de SEO:

1. Ler `06-seo/PALAVRAS-CHAVE.md` para confirmar a palavra-chave alvo e a intenção.
2. Ler `06-seo/CLUSTERS.md` para identificar a página pilar e as páginas irmãs do cluster.
3. Ler `06-seo/GEO-AEO.md` para decidir quais estruturas de AEO incluir (definição, FAQ, passo a passo etc.).
4. Ler `07-site/DADOS-ESTRUTURADOS.md` para a marcação JSON-LD correta.
5. Ler `01-icp/ICP.md` e `02-voz/VOZ.md` para persona e voz.
6. Redigir a peça: bloco de definição, corpo, links internos (5 a 8), FAQ (4 a 8), marcação de dados estruturados.
7. Parar. Pedir revisão humana antes de publicar.

## Critérios de sucesso

- A página pilar entra no top 20 da palavra-chave primária em 60 dias e no top 10 em 90.
- As páginas do cluster somam de 500 a 2.000 sessões orgânicas novas por mês em 90 dias.
- Featured snippet conquistado em 1 a 3 palavras-chave do cluster.
- Pelo menos 2 citações em respostas de IA para termos do cluster (acompanhe no Perplexity, na busca do ChatGPT, no Gemini e nas visões gerais de IA do Google).
- Cadastros na newsletter vindos do tráfego orgânico do cluster sobem de 20% a 50%.

Se o sprint não entregar, não rode outro sprint no mesmo cluster. Volte a `06-seo/PALAVRAS-CHAVE.md` e reveja o mapa de intenção. Cluster errado não se salva com mais conteúdo.
