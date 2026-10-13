> Adaptado de `seo-and-aeo-strategy` do GTM Skills (github.com/manojbajaj95/claude-gtm-plugin), licença MIT, © 2025 mbajaj, incluindo `references/site-architecture-site-type-templates.md` e `references/site-architecture-navigation-patterns.md`. Traduzido, resumido e ajustado aos arquivos do GTM Brain. Aviso completo em `AVISOS-DE-TERCEIROS.md`.

# Mapa do site e dados estruturados

## `07-site/MAPA-DO-SITE.md`

### Levantar o que existe

1. Baixe `/sitemap.xml` (ou `/sitemap_index.xml`, ou o sitemap indicado no fim de `/robots.txt`). Cada URL é uma página no ar.
2. Sem sitemap, percorra a navegação principal, o rodapé e o índice do blog.
3. Para cada página, anote: título, URL, objetivo (o que ela quer que o visitante faça) e o CTA principal, do jeito que está escrito no botão.
4. Se a pessoa tiver Search Console ou GA4, marque as páginas que mais recebem entrada. Elas pesam mais no mapa.

### Escrever o inventário

- Troque as linhas genéricas do template pelas páginas reais. Uma linha por tipo de página que se repete (`/blog/[slug]`, `/cases/[slug]`); uma linha por página única.
- Inclua as páginas planejadas que saíram da pesquisa (páginas alvo e pilares que ainda não existem), com Status "Planejado" e a palavra-chave entre parênteses no objetivo.
- Status: No ar, Planejado, Atualizar, Sair do ar. Página sem responsável conhecido fica com `[PENDENTE: responsável]`.
- A linha "Preços" usa os preços de `/05-oferta/OFERTA.md`. Se a marca não publica preço, diga isso na linha.
- Apague as linhas do template que a marca não tem (ex.: "Parceiros"), em vez de deixar "Opcional".

### Árvore, URLs e navegação

Ponto de partida por tipo de negócio. Ajuste à marca; o template já traz as regras de URL.

| Tipo | Páginas de primeiro nível que costumam carregar a busca |
| --- | --- |
| Software (SaaS) | Recursos (uma página por recurso), soluções por segmento, preços, clientes e cases, comparativos (`/comparativo/[concorrente]`), blog, materiais, integrações |
| Serviço B2B | Serviços (uma página por oferta), segmentos atendidos, cases, preços ou "como funciona a contratação", blog, sobre |
| Negócio local | Serviços, páginas por cidade ou bairro (só se o atendimento for real lá), avaliações, contato com mapa e horário |
| Conteúdo | Temas (um por cluster), artigos, newsletter, sobre o autor |
| Loja | Categorias, produtos, guias de compra, trocas e devoluções |

Regras de estrutura:

- Toda página importante a até três cliques da página inicial. Nenhuma página órfã (sem link chegando).
- Navegação principal com 4 a 7 itens, na ordem de intenção do visitante. Contato ou o CTA principal com cara de botão.
- Rodapé em colunas, com o resto: jurídico (privacidade, termos, LGPD), materiais, redes, mapa do site.
- Migalhas de pão (breadcrumbs) nas páginas de segundo e terceiro nível, com `BreadcrumbList`.
- Cada pilar de `CLUSTERS.md` tem uma URL no mapa, e o índice do blog agrupa por cluster.

### Caminhos de conversão

Troque os três caminhos do template pelos da marca: o que leva à oferta principal, o que leva à prova e o que nutre quem não está pronto. Use os CTAs reais e o destino real (formulário, WhatsApp com mensagem pronta, teste grátis, agenda). Se a marca só tem um caminho hoje, escreva só esse e registre os outros como lacuna.

### Redirecionamentos

Se a pesquisa mudou o endereço de alguma página, ou se duas páginas vão virar uma, registre na tabela de redirecionamentos (301, data, motivo). Mudança de URL sem redirecionamento perde a posição da página antiga.

## `07-site/DADOS-ESTRUTURADOS.md`

O arquivo é uma biblioteca de blocos JSON-LD. Você preenche o que é fixo da marca e deixa o que muda por página.

1. **Nome da marca no topo.** Escreva a lista de fontes logo abaixo do título e uma frase dizendo de quem é o arquivo ("Dados estruturados do site da [marca]"). O GTM Brain só considera o arquivo preenchido quando o nome da marca aparece nas primeiras linhas.
2. **Troque os valores fixos** em todos os blocos: `"name"` da empresa, `"url"` (o domínio real, não `exemplo.com.br`), `"logo"`, `"sameAs"` (só perfis que existem e são da marca), `"contactPoint"` (telefone, WhatsApp, e-mail de atendimento, horário), `"areaServed"`.
3. **Autores:** um bloco `Person` por autor confirmado em `GEO-AEO.md`, com cargo, URL da bio e perfis.
4. **Apague os blocos que a marca não usa.** `LocalBusiness` só se houver atendimento presencial; `Product` só se houver oferta empacotada; `AggregateRating` e `Review` só com avaliações reais publicadas na página (o bloco `Product` do template traz `aggregateRating`: tire se não for o caso). Para planos de software, `Product` com `Offer` serve; `SoftwareApplication` é mais específico. Mensalidade vai em `UnitPriceSpecification` com `"unitCode": "MON"`.
5. **Deixe as variáveis de página** dentro dos blocos de código: `[Título do post]`, `[AAAA-MM-DD]` de publicação, `[slug]`. Elas são preenchidas a cada página, e o GTM Brain não conta colchetes dentro de blocos de código como pendência.
6. **Preço no schema** igual ao preço da página e de `/05-oferta/OFERTA.md`. Se o preço não é público, tire `price` do bloco. **Perguntas e respostas do `FAQPage`** são as da página, palavra por palavra, mesmo que sejam mais curtas que as 40 a 80 palavras do template: aquele tamanho é conselho para escrever a página, não para o schema.
7. **O que está no ar e o que falta.** Registre numa tabela, por tipo: páginas, o que está no ar hoje, responsável e prazo da implantação.
8. **Valide.** Primeiro confira que cada bloco é JSON válido:

   ```sh
   node -e "const t=require('fs').readFileSync(process.argv[1],'utf8');for(const m of t.matchAll(/\x60\x60\x60json\n([\s\S]*?)\x60\x60\x60/g))JSON.parse(m[1]);console.log('ok')" <pasta>/07-site/DADOS-ESTRUTURADOS.md
   ```

   Depois, com a página no ar, rode o Teste de pesquisa aprimorada do Google e o validador do Schema.org. Se você não consegue validar daqui, diga isso à pessoa.

Prioridade de tipos para quem quer ser citado por IA: `Organization` na página inicial, `Article` ou `BlogPosting` com autor nos textos, `FAQPage` onde houver perguntas frequentes visíveis, `Product` ou `Service` nas páginas de oferta, `BreadcrumbList` em tudo que tem segundo nível. Nunca descreva no schema o que a página não mostra.

Não prometa resultado enriquecido no Google para todo tipo. Desde 2023 o Google não mostra mais o resultado enriquecido de `HowTo` e só mostra o de `FAQPage` para sites de governo e de saúde. Os dois continuam úteis para quem lê a página por máquina, inclusive as IAs.
