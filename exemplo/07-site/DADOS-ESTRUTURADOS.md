# Schema e dados estruturados

> Exemplo fictício. A Cadência e todas as pessoas e empresas citadas não existem.

Fontes citadas neste arquivo:

- `[SITE]` levantamento técnico do site por Tiago Ramos em 2026-10-02: contêiner do Google Tag Manager GTM-CAD (versão 41, publicada em 2026-09-15) e notas técnicas do site (Astro, schema no ar, FAQ de `/precos`, perfis, autores)
- `[REDES]` insights do Instagram @cadencia.exemplo e @marinaduarte.exemplo, abr–set/2026
- `[CONVERSA 2026-10-13]` respostas de Marina Duarte, CEO, sobre os dados estruturados

Dados estruturados do site da Cadência (`https://cadencia.example`): os blocos JSON-LD de cada tipo de página, com os valores fixos da marca já trocados. O que muda a cada página fica entre chaves duplas dentro dos blocos de código, como `{{Título do post}}` e `{{AAAA-MM-DD}}`: troque a variável inteira, chaves incluídas. Preços iguais aos de `/05-oferta/OFERTA.md`; páginas iguais às de `/07-site/MAPA-DO-SITE.md`; autores iguais aos de `/06-seo/GEO-AEO.md`.

## Como usar este arquivo

- **O que entra:** os trechos de JSON-LD de cada tipo de página do site. Copie, cole e preencha as variáveis.
- **Como os agentes leem:** agentes e templates do CMS carregam o tipo de schema certo para cada página. Todo template novo já nasce com os dados estruturados ligados.
- **Frequência de atualização:** revise sempre que um grande buscador mudar as orientações. Passe toda página por um validador antes de colocar no ar.

## Checklist para agentes de IA

- [x] Legível por máquina: trechos de JSON-LD em blocos de código.
- [x] Estruturado: um tipo de schema por H2.
- [x] Fonte única da verdade: nenhuma biblioteca de schema alternativa na pasta da agência.
- [x] Versionado: data da última atualização.
- [x] Citável: os agentes citam `/07-site/DADOS-ESTRUTURADOS.md` ao inserir dados estruturados.

Última atualização: 2026-10-13
Autor principal: Marina Duarte (decisões), com as notas técnicas de Tiago Ramos

---

## Por que dados estruturados importam

Dados estruturados são o jeito educado de dizer aos buscadores e aos motores de resposta o que tem na sua página. Pessoas leem títulos. Motores leem schema. Páginas com schema limpo ganham mais citações, mais resultados enriquecidos e mais menções em visões gerais criadas por IA.

## Validação

Antes de toda publicação, passe a página por:

- Teste de pesquisa aprimorada do Google (Rich Results Test).
- Validador do Schema.org.
- Ferramenta de inspeção de URL do Bing.

Os blocos abaixo foram conferidos como JSON válido em 2026-10-13. Ainda não passaram pelo Teste de pesquisa aprimorada nem pelo validador do Schema.org: o domínio é de exemplo e não há página no ar para testar [PENDENTE: Tiago Ramos valida cada página ao implantar].

## O que está no ar e o que falta

Hoje o site tem só `Organization` na página inicial, sem logo e sem `sameAs`, e o `BreadcrumbList` automático do tema `[SITE]`. O resto foi decidido em 2026-10-13 `[CONVERSA 2026-10-13]`.

| Tipo | Páginas | Hoje | Responsável | Prazo |
| --- | --- | --- | --- | --- |
| `Organization` completa | `/` | No ar, incompleta | Tiago Ramos | 2026-11-30 |
| `Product` (três planos) | `/precos` | Não existe | Tiago Ramos | 2026-11-30 |
| `FAQPage` | `/precos` | Não existe | Tiago Ramos | 2026-11-30 |
| `BlogPosting` | `/blog/[slug]` | Não existe | Tiago Ramos | 2026-11-30 |
| `HowTo` | `/guias/[slug]` | Não existe | Tiago Ramos | 2026-11-30 |
| `Person` (Marina e Bruna) | `/sobre/equipe/marina-duarte`, `/sobre/equipe/bruna-alves` | Não existe | Tiago Ramos | 2026-11-30 |
| `BreadcrumbList` | Páginas de segundo e terceiro nível | No ar, automático do tema | Tiago Ramos | — |

Fora por decisão: `Review` e `AggregateRating` (a Cadência não tem perfil em plataforma de avaliação e os depoimentos do site não têm nota `[SITE]`) e `LocalBusiness` (sem endereço público nem atendimento presencial) `[CONVERSA 2026-10-13]`. `Service` também saiu: a Cadência vende planos, que já têm `Product`, e a implantação assistida não tem página própria em `/07-site/MAPA-DO-SITE.md` `[PROPOSTA]`. A tabela de `/06-seo/GEO-AEO.md` pede `Article` e `Review` nos cases; `Review` está fora, e `Article` nos cases não foi decidido [PENDENTE: Marina Duarte decide se `/cases/[slug]` ganha `Article`].

## Organization (para a página inicial)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://cadencia.example/#organizacao",
  "name": "Cadência",
  "legalName": "Cadência Tecnologia para Estúdios Ltda.",
  "url": "https://cadencia.example",
  "logo": "https://cadencia.example/logo-cadencia.png",
  "foundingDate": "2023",
  "founder": [
    { "@type": "Person", "name": "Marina Duarte", "jobTitle": "CEO" },
    { "@type": "Person", "name": "Tiago Ramos", "jobTitle": "CTO" }
  ],
  "sameAs": [
    "https://www.instagram.com/cadencia.exemplo",
    "https://www.linkedin.com/company/cadencia-exemplo",
    "https://www.youtube.com/@cadencia.exemplo"
  ],
  "contactPoint": [{
    "@type": "ContactPoint",
    "contactType": "atendimento ao cliente",
    "url": "https://cadencia.example/contato",
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "19:00"
    },
    "areaServed": "BR",
    "availableLanguage": "pt-BR"
  }]
}
```

Valores: razão social, fundação, fundadores, domínio, logo (512×512), perfis e horário do WhatsApp `[SITE]`. O perfil do LinkedIn existe e não tem posts; o do YouTube só tem tutoriais do produto `[SITE]`. Sem `address`: a Cadência não tem endereço público `[CONVERSA 2026-10-13]`. O número do WhatsApp não está em nenhuma fonte; o `contactPoint` aponta para `/contato` até ele entrar como `telephone` [PENDENTE: número do WhatsApp de atendimento, com Lívia Moraes]. Os valores de `dayOfWeek` ficam em inglês: são nomes fixos do schema.org.

## Product (para uma oferta empacotada)

Um bloco por plano, na página `/precos`. Preços de `/05-oferta/OFERTA.md`, iguais aos publicados em `/precos` (`/07-site/MAPA-DO-SITE.md`). Sem `aggregateRating`: a Cadência não publica avaliações com nota `[SITE]` `[CONVERSA 2026-10-13]`.

**Plano Essencial**

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Cadência Plano Essencial",
  "description": "Agenda, cobrança recorrente por Pix automático e cartão e controle de presença para o estúdio de uma unidade com até 150 alunos.",
  "brand": {
    "@type": "Brand",
    "name": "Cadência"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://cadencia.example/precos",
    "priceCurrency": "BRL",
    "price": "189",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "189",
      "priceCurrency": "BRL",
      "referenceQuantity": { "@type": "QuantitativeValue", "value": 1, "unitCode": "MON" }
    },
    "availability": "https://schema.org/InStock"
  }
}
```

**Plano Estúdio**

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Cadência Plano Estúdio",
  "description": "Agenda, cobrança recorrente por Pix automático e cartão, controle de presença e app do aluno para estúdios de até 400 alunos.",
  "brand": {
    "@type": "Brand",
    "name": "Cadência"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://cadencia.example/precos",
    "priceCurrency": "BRL",
    "price": "289",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "289",
      "priceCurrency": "BRL",
      "referenceQuantity": { "@type": "QuantitativeValue", "value": 1, "unitCode": "MON" }
    },
    "availability": "https://schema.org/InStock"
  }
}
```

**Plano Rede**

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Cadência Plano Rede",
  "description": "Tudo do Plano Estúdio em cada unidade, mais painel consolidado de todas as unidades, para redes a partir de três unidades.",
  "brand": {
    "@type": "Brand",
    "name": "Cadência"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://cadencia.example/precos",
    "priceCurrency": "BRL",
    "price": "449",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "449",
      "priceCurrency": "BRL",
      "unitText": "por unidade, por mês, a partir de três unidades",
      "referenceQuantity": { "@type": "QuantitativeValue", "value": 1, "unitCode": "MON" }
    },
    "availability": "https://schema.org/InStock"
  }
}
```

O preço do Plano Rede para 10 unidades ou mais não está definido (`/05-oferta/OFERTA.md`); o bloco não fala dele. As descrições saem da "Descrição em uma frase" de cada oferta em `/05-oferta/OFERTA.md`; o texto de `/precos` não está nas fontes [PENDENTE: Tiago Ramos confere que cada `description` diz o mesmo que a página `/precos`]. A implantação assistida (R$ 990, opcional) aparece em `/precos` e não tem bloco próprio.

## BlogPosting (para um post de blog)

Autores: Marina Duarte nos pilares de cobrança e de abrir estúdio; Bruna Alves nos de agenda e de rede (`/06-seo/GEO-AEO.md`). O `author` aponta para o `@id` do bloco `Person` da pessoa.

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{{Título do post}}",
  "description": "{{Meta description}}",
  "image": "{{URL da imagem de capa do post}}",
  "datePublished": "{{AAAA-MM-DD}}",
  "dateModified": "{{AAAA-MM-DD}}",
  "mainEntityOfPage": "https://cadencia.example/blog/{{slug}}",
  "author": {
    "@type": "Person",
    "@id": "https://cadencia.example/sobre/equipe/{{marina-duarte ou bruna-alves}}#pessoa",
    "name": "{{Marina Duarte ou Bruna Alves}}",
    "url": "https://cadencia.example/sobre/equipe/{{marina-duarte ou bruna-alves}}"
  },
  "publisher": {
    "@type": "Organization",
    "@id": "https://cadencia.example/#organizacao",
    "name": "Cadência",
    "logo": {
      "@type": "ImageObject",
      "url": "https://cadencia.example/logo-cadencia.png"
    }
  }
}
```

## HowTo (para conteúdo passo a passo)

Para os guias em `/guias/[slug]`, que são passo a passo; por exemplo, `/guias/reposicao-de-aulas` tem 6 passos `[SITE]`. Um `HowToStep` por passo visível na página. `totalTime`, `supply` e `tool` só entram se a página disser.

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "{{Título do guia}}",
  "description": "{{Descrição em uma frase}}",
  "step": [
    {
      "@type": "HowToStep",
      "name": "{{Título do passo 1}}",
      "text": "{{Descrição do passo 1}}",
      "url": "https://cadencia.example/guias/{{slug}}#passo-1"
    },
    {
      "@type": "HowToStep",
      "name": "{{Título do passo 2}}",
      "text": "{{Descrição do passo 2}}",
      "url": "https://cadencia.example/guias/{{slug}}#passo-2"
    }
  ]
}
```

## FAQPage (para um bloco de perguntas frequentes)

Em `/precos`, com as quatro perguntas que estão visíveis na página, palavra por palavra `[SITE]`. As respostas ficam do tamanho que têm na página: o schema não pode dizer mais que a página.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Preciso de cartão para começar o teste?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. O teste dura 14 dias e não pede cartão."
      }
    },
    {
      "@type": "Question",
      "name": "Tem fidelidade?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. O plano é mensal e você cancela quando quiser."
      }
    },
    {
      "@type": "Question",
      "name": "O que é Pix automático?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É a cobrança recorrente por Pix: a aluna autoriza uma vez no banco e a mensalidade é paga sozinha todo mês."
      }
    },
    {
      "@type": "Question",
      "name": "Vocês importam meus alunos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. Na implantação assistida (R$ 990), a gente importa alunos, planos e pacotes em até 5 dias úteis."
      }
    }
  ]
}
```

A quarta resposta repete o prazo de 5 dias úteis (D-003), que está em contradição com uma implantação de 7 dias registrada em `/05-oferta/GANHOS-E-PERDAS.md`. Se o texto de `/precos` mudar para "de 5 a 7 dias úteis", este bloco muda junto, no mesmo dia [PENDENTE: decisão sobre o prazo publicado, com Lívia Moraes, `/07-site/MAPA-DO-SITE.md`].

## BreadcrumbList

Gerado automaticamente pelo tema do site e já no ar `[SITE]`. Formato esperado, por exemplo num post:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://cadencia.example" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://cadencia.example/blog" },
    { "@type": "ListItem", "position": 3, "name": "{{Título do post}}", "item": "https://cadencia.example/blog/{{slug}}" }
  ]
}
```

## Person (para a página de bio do autor)

Um bloco por autor do blog `[SITE]` `[CONVERSA 2026-10-13]`.

**Marina Duarte**

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://cadencia.example/sobre/equipe/marina-duarte#pessoa",
  "name": "Marina Duarte",
  "jobTitle": "CEO",
  "url": "https://cadencia.example/sobre/equipe/marina-duarte",
  "sameAs": [
    "https://www.instagram.com/marinaduarte.exemplo"
  ],
  "worksFor": {
    "@type": "Organization",
    "@id": "https://cadencia.example/#organizacao",
    "name": "Cadência"
  },
  "description": "CEO e cofundadora da Cadência, ex-dona de estúdio."
}
```

**Bruna Alves**

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://cadencia.example/sobre/equipe/bruna-alves#pessoa",
  "name": "Bruna Alves",
  "jobTitle": "Marketing",
  "url": "https://cadencia.example/sobre/equipe/bruna-alves",
  "worksFor": {
    "@type": "Organization",
    "@id": "https://cadencia.example/#organizacao",
    "name": "Cadência"
  }
}
```

Perfil de Instagram da Marina `[REDES]`; cargo e páginas de bio `[SITE]`. Foto, bio por extenso e perfis da Bruna (LinkedIn ou outro) não estão nas fontes [PENDENTE: Bruna Alves e Marina Duarte mandam foto, bio e perfis; `description` e `image` entram com o texto da página de bio].

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
- Na Cadência: `Review`, `AggregateRating` ou `LocalBusiness` sem nova decisão da Marina.

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

Caminhos de referência: `/07-site/DADOS-ESTRUTURADOS.md`, `/07-site/MAPA-DO-SITE.md`, `/06-seo/GEO-AEO.md`, `/05-oferta/OFERTA.md`.
