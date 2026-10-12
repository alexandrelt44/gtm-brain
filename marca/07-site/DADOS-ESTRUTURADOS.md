# Schema e dados estruturados

## Como usar este arquivo

- **O que entra:** os trechos de JSON-LD de cada tipo de página do site. Copie, cole e preencha as variáveis.
- **Como os agentes leem:** agentes e templates do CMS carregam o tipo de schema certo para cada página. Todo template novo já nasce com os dados estruturados ligados.
- **Frequência de atualização:** revise sempre que um grande buscador mudar as orientações. Passe toda página por um validador antes de colocar no ar.

## Checklist para agentes de IA

- [ ] Legível por máquina: trechos de JSON-LD em blocos de código.
- [ ] Estruturado: um tipo de schema por H2.
- [ ] Fonte única da verdade: nenhuma biblioteca de schema alternativa na pasta da agência.
- [ ] Versionado: data da última atualização.
- [ ] Citável: os agentes citam `/07-site/DADOS-ESTRUTURADOS.md` ao inserir dados estruturados.

Última atualização: [AAAA-MM-DD]

---

## Por que dados estruturados importam

Dados estruturados são o jeito educado de dizer aos buscadores e aos motores de resposta o que tem na sua página. Pessoas leem títulos. Motores leem schema. Páginas com schema limpo ganham mais citações, mais resultados enriquecidos e mais menções em visões gerais criadas por IA.

## Validação

Antes de toda publicação, passe a página por:

- Teste de pesquisa aprimorada do Google (Rich Results Test).
- Validador do Schema.org.
- Ferramenta de inspeção de URL do Bing.

## Organization (para a página inicial)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "[Nome da empresa]",
  "url": "https://www.exemplo.com.br",
  "logo": "https://www.exemplo.com.br/assets/logo-principal.png",
  "sameAs": [
    "https://www.linkedin.com/company/[perfil]",
    "https://www.instagram.com/[perfil]",
    "https://www.youtube.com/@[perfil]"
  ],
  "contactPoint": [{
    "@type": "ContactPoint",
    "telephone": "+55-48-0000-0000",
    "contactType": "atendimento ao cliente",
    "areaServed": "BR",
    "availableLanguage": "pt-BR"
  }]
}
```

## LocalBusiness (para um negócio local)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.exemplo.com.br/#negocio",
  "name": "[Nome da empresa]",
  "image": "https://www.exemplo.com.br/assets/fachada.jpg",
  "url": "https://www.exemplo.com.br",
  "telephone": "+55-48-0000-0000",
  "priceRange": "R$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Exemplo, 100",
    "addressLocality": "Florianópolis",
    "addressRegion": "SC",
    "postalCode": "88010-000",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -27.5954,
    "longitude": -48.5480
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "08:00",
    "closes": "18:00"
  }]
}
```

Os valores de `dayOfWeek` ficam em inglês: são nomes fixos do schema.org. Mantenha o endereço igual ao do perfil no Google Meu Negócio.

## Service (para uma página de serviço)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "[Nome do serviço]",
  "provider": {
    "@type": "Organization",
    "name": "[Nome da empresa]",
    "url": "https://www.exemplo.com.br"
  },
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "[Cidade ou região]"
  },
  "description": "[Descrição do serviço em uma frase]",
  "offers": {
    "@type": "Offer",
    "price": "[Preço ou faixa]",
    "priceCurrency": "BRL",
    "availability": "https://schema.org/InStock",
    "url": "https://www.exemplo.com.br/servicos/[slug]"
  }
}
```

## Product (para uma oferta empacotada)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[Nome da oferta]",
  "description": "[Descrição em uma frase]",
  "brand": {
    "@type": "Brand",
    "name": "[Nome da empresa]"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://www.exemplo.com.br/servicos/[slug]",
    "priceCurrency": "BRL",
    "price": "[Preço]",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[Nota]",
    "reviewCount": "[Quantidade]"
  }
}
```

## Article (para conteúdo editorial longo)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Título do artigo]",
  "image": ["https://www.exemplo.com.br/assets/og/[slug].jpg"],
  "datePublished": "[AAAA-MM-DD]",
  "dateModified": "[AAAA-MM-DD]",
  "author": [{
    "@type": "Person",
    "name": "[Nome do autor]",
    "url": "https://www.exemplo.com.br/sobre/equipe/[slug-do-autor]"
  }],
  "publisher": {
    "@type": "Organization",
    "name": "[Nome da empresa]",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.exemplo.com.br/assets/logo-principal.png"
    }
  },
  "description": "[Meta description]",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.exemplo.com.br/blog/[slug]"
  }
}
```

## BlogPosting (para um post de blog)

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "[Título do post]",
  "description": "[Meta description]",
  "image": "https://www.exemplo.com.br/assets/og/[slug].jpg",
  "datePublished": "[AAAA-MM-DD]",
  "dateModified": "[AAAA-MM-DD]",
  "author": {
    "@type": "Person",
    "name": "[Nome do autor]",
    "url": "https://www.exemplo.com.br/sobre/equipe/[slug-do-autor]"
  },
  "publisher": {
    "@type": "Organization",
    "name": "[Nome da empresa]",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.exemplo.com.br/assets/logo-principal.png"
    }
  }
}
```

## HowTo (para conteúdo passo a passo)

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "[Título do passo a passo]",
  "description": "[Descrição em uma frase]",
  "image": "https://www.exemplo.com.br/assets/passo-a-passo/[slug].jpg",
  "totalTime": "PT30M",
  "supply": [
    { "@type": "HowToSupply", "name": "[Material 1]" }
  ],
  "tool": [
    { "@type": "HowToTool", "name": "[Ferramenta 1]" }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "[Título do passo 1]",
      "text": "[Descrição do passo 1]",
      "url": "https://www.exemplo.com.br/blog/[slug]#passo-1"
    },
    {
      "@type": "HowToStep",
      "name": "[Título do passo 2]",
      "text": "[Descrição do passo 2]",
      "url": "https://www.exemplo.com.br/blog/[slug]#passo-2"
    }
  ]
}
```

## FAQPage (para um bloco de perguntas frequentes)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Pergunta 1]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Resposta 1, de 40 a 80 palavras]"
      }
    },
    {
      "@type": "Question",
      "name": "[Pergunta 2]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Resposta 2, de 40 a 80 palavras]"
      }
    }
  ]
}
```

## Review (para a avaliação de um cliente)

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Service",
    "name": "[Nome do serviço]"
  },
  "author": {
    "@type": "Person",
    "name": "[Nome de quem avaliou]"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "reviewBody": "[Fala de quem avaliou]",
  "datePublished": "[AAAA-MM-DD]"
}
```

## BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://www.exemplo.com.br" },
    { "@type": "ListItem", "position": 2, "name": "Serviços", "item": "https://www.exemplo.com.br/servicos" },
    { "@type": "ListItem", "position": 3, "name": "[Nome do serviço]", "item": "https://www.exemplo.com.br/servicos/[slug]" }
  ]
}
```

## Person (para a página de bio do autor)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "[Nome do autor]",
  "jobTitle": "[Cargo]",
  "url": "https://www.exemplo.com.br/sobre/equipe/[slug]",
  "image": "https://www.exemplo.com.br/assets/equipe/[slug].jpg",
  "sameAs": [
    "https://www.linkedin.com/in/[perfil]",
    "https://www.instagram.com/[perfil]"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "[Nome da empresa]"
  },
  "description": "[Parágrafo de bio]"
}
```

## Faça e não faça com schema

**Faça**

- Valide todo trecho antes de publicar.
- Mantenha o schema em sincronia com o conteúdo da página. Nunca descreva no schema o que a página não diz.
- Atualize `dateModified` a cada edição real.
- Inclua links `sameAs` para todo perfil verificável.

**Não faça**

- Usar schema para afirmar o que a página não prova.
- Publicar schema `FAQPage` numa página que esconde as respostas em acordeões fechados por padrão, se isso prejudica a clareza. Alguns motores já dão preferência a perguntas frequentes visíveis.
- Empilhar tipos de schema irrelevantes para tentar ganhar um recurso da SERP.

## Como passar este arquivo para um agente de IA

```text
Carregue /07-site/DADOS-ESTRUTURADOS.md antes de inserir qualquer dado estruturado.

Fluxo:
1. Identifique o tipo de página.
2. Copie o trecho de JSON-LD correspondente.
3. Troque cada variável pelo valor exato do conteúdo da página.
4. Valide no Teste de pesquisa aprimorada do Google e no validador do Schema.org.
5. Se a página tiver um bloco de perguntas frequentes, inclua o schema FAQPage com as mesmas perguntas e respostas visíveis na página.

Cite /07-site/DADOS-ESTRUTURADOS.md nas notas de publicação da página.
```

Caminhos de referência: `/07-site/DADOS-ESTRUTURADOS.md`, `/07-site/MAPA-DO-SITE.md`, `/06-seo/GEO-AEO.md`.
