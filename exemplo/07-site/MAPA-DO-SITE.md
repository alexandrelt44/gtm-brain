# Mapa do site e arquitetura da informação

> Exemplo fictício. A Cadência e todas as pessoas e empresas citadas não existem.

Fontes citadas neste arquivo:

- `[PAINEL]` dados de uso do produto (painel interno da Cadência)
- `[PESQUISA]` pesquisa de palavras-chave de setembro de 2026 (arquivo em `/06-seo/pesquisa/`). Volumes fictícios

## Como usar este arquivo

- **O que entra:** o inventário completo das páginas do site, o padrão de URL de cada uma, a lógica de navegação e os principais caminhos de conversão.
- **Como os agentes leem:** os agentes carregam este arquivo para apontar links corretamente, para propor uma página nova sem duplicar uma antiga e para levar o leitor ao ponto de conversão certo.
- **Frequência de atualização:** atualize sempre que uma página entrar no ar, mudar de endereço ou sair do ar. Auditoria completa duas vezes por ano.

## Checklist para agentes de IA

- [x] Legível por máquina: inventário numa tabela com colunas consistentes.
- [x] Estruturado: páginas institucionais, de serviço, de conteúdo, de prova e de conversão em seções separadas.
- [x] Fonte única da verdade: o único mapa de que um fornecedor ou um agente precisa.
- [x] Versionado: data da última atualização.
- [x] Citável: os agentes citam `/07-site/MAPA-DO-SITE.md` ao recomendar links.

Última atualização: 2026-10-01

---

## Inventário das páginas principais

O site da Cadência tem páginas por modalidade (pilates, yoga, funcional), por recurso (agenda, cobrança, presença) e uma página para redes. As páginas que vendem são as de modalidade, de planos e de teste grátis: são elas que entram na conta de visitas do plano em `/11-plano/PLANO-DE-UMA-PAGINA.md`.

| Página | Padrão de URL | Objetivo | CTA principal | Responsável | Status |
| --- | --- | --- | --- | --- | --- |
| Início | `/` | Apresentar a promessa e levar aos três caminhos de conversão | "Agende 20 minutos e veja a sua agenda rodando na Cadência" (CTA secundário: começar o teste grátis) | Bruna Alves | No ar |
| Sobre | `/sobre` | Contar a história da Marina (ex-dona de estúdio) e apresentar o time em Florianópolis | Conhecer o time | Bruna Alves | No ar |
| Bio da equipe | `/sobre/equipe/[pessoa]` | Página de autor com dados estruturados `Person` (Marina e Bruna) | Ler os posts da pessoa | Bruna Alves | No ar |
| Pilates | `/pilates` | Página de solução para estúdio de pilates. Alvo de "sistema para estúdio de pilates" | Começar o teste grátis | Bruna Alves | No ar |
| Yoga | `/yoga` | Página de solução para estúdio de yoga. Alvo de "app para estúdio de yoga" | Começar o teste grátis | Bruna Alves | No ar |
| Funcional | `/funcional` | Página de solução para estúdio de treino funcional | Agendar uma demonstração | Bruna Alves | No ar |
| Agenda | `/agenda` | Recurso de agenda, reposição pelo app e lista de espera | Começar o teste grátis | Bruna Alves | No ar |
| Cobrança | `/cobranca` | Recurso de cobrança recorrente por Pix automático e cartão (CAP-001) | Começar o teste grátis | Bruna Alves | No ar |
| Presença | `/presenca` | Recurso de controle de presença e check-in pelo app | Começar o teste grátis | Bruna Alves | No ar |
| Redes | `/rede` | Plano Rede e painel consolidado para 3 ou mais unidades | Agendar uma demonstração | Rafael Nunes | No ar |
| Preços | `/precos` | Planos Essencial (R$ 189/mês), Estúdio (R$ 289/mês) e Rede (R$ 449/mês por unidade), mais a implantação assistida (R$ 990, opcional) | Começar o teste grátis | Rafael Nunes | No ar |
| Teste grátis | `/teste-gratis` | Cadastro do teste de 14 dias | Criar a conta | Tiago Ramos | No ar |
| Central de provas | `/cases` | Reunir os cases, as avaliações e os logos de clientes | Ler um case | Lívia Moraes | No ar |
| Case | `/cases/[slug]` | Contar a história de um estúdio do começo ao fim (CS-001, CS-002) | Começar o teste grátis | Lívia Moraes | No ar |
| Central do blog | `/blog` | Índice de todo o conteúdo escrito, por cluster | Assinar a newsletter | Bruna Alves | No ar |
| Post de blog | `/blog/[slug]` | Uma ideia em profundidade | Ler um post relacionado ou começar o teste grátis | Bruna Alves | No ar |
| Materiais | `/materiais` e `/guias/[slug]` | Guias, modelos e calculadoras com cadastro | Baixar o material | Bruna Alves | No ar |
| Perguntas frequentes | Dentro de cada página de recurso e em `/precos` | Responder às dúvidas comuns (Pix automático, migração, contrato) | Falar no WhatsApp | Lívia Moraes | No ar |
| Contato | `/contato` | WhatsApp, formulário e horário de atendimento (seg. a sex., 8h às 19h) | Chamar no WhatsApp | Lívia Moraes | No ar |
| Jurídico | `/privacidade`, `/termos`, `/lgpd` | Política de privacidade, termos de uso e tratamento de dados dos alunos conforme a LGPD | n/a | Tiago Ramos | No ar |
| Trabalhe conosco | `/trabalhe-conosco` | Recrutar | Candidatar-se | Marina Duarte | No ar |
| Parceiros | `/parceiros` | Programa de indicação para instrutores e consultores de estúdio | Candidatar-se | Lívia Moraes | Planejado para 2027 |
| Comparativo | `/comparativo/agendafit` | Comparar a Cadência com um app genérico de agenda | Começar o teste grátis | Bruna Alves | Planejado. A aposta é ganhar citação em respostas de IA `[HIPÓTESE]` |

## Árvore de arquitetura da informação

A árvore abaixo mostra as páginas no ar e as planejadas, com no máximo 3 níveis.

```
/
├── /sobre
│   └── /sobre/equipe/[pessoa]
├── /pilates
├── /yoga
├── /funcional
├── /agenda
├── /cobranca
├── /presenca
├── /rede
├── /precos
├── /teste-gratis
├── /cases
│   ├── /cases/estudio-lirio-pilates
│   └── /cases/casa-ahimsa-yoga
├── /blog
│   ├── /blog/[slug]
│   └── /blog/tema/[cluster]
├── /guias/[slug]
├── /materiais
│   ├── /materiais/modelos
│   └── /materiais/ferramentas
├── /newsletter
├── /contato
├── /trabalhe-conosco
└── /juridico
    ├── /privacidade
    ├── /termos
    └── /lgpd
```

## Regras de URL

- Tudo em minúsculas.
- Hífen entre as palavras, nunca sublinhado nem espaço.
- Sem acento nem cedilha (`/precos`, não `/preços`).
- Sem barra no final.
- Sem extensão de arquivo.
- Evite passar de 3 níveis.
- Prefira slugs curtos. Use a palavra-chave principal de `/06-seo/PALAVRAS-CHAVE.md`.
- Evite palavras vazias no slug ("o", "a", "de", "para") a não ser que tirá-las mude o sentido.

Exemplos:

- Bom: `/blog/como-diminuir-inadimplencia`
- Ruim: `/blog/Como_Diminuir_a_Inadimplência_no_Estúdio_2026/`

## Lógica de navegação

### Navegação principal

- No máximo de 5 a 7 itens.
- Na Cadência, em ordem de intenção: Para quem é (pilates, yoga, funcional, redes), Recursos (agenda, cobrança, presença), Preços, Cases, Materiais, Entrar.
- "Começar o teste grátis" é um CTA com cara de botão, não um link de texto. "Falar no WhatsApp" fica como botão flutuante.

### Navegação secundária

- O rodapé carrega o resto: mapa do site, jurídico, materiais, redes sociais, newsletter.
- O rodapé é organizado em colunas por público (Clientes, Parceiros, Trabalhe conosco).

### Navegação utilitária

- Reservada para login, troca de idioma ou troca de região.
- Mantenha a navegação utilitária fora da principal.

## Caminhos de conversão

Três caminhos principais na página inicial. Cada um termina no cadastro do teste grátis, no formulário de demonstração ou num botão de WhatsApp com mensagem pronta. Os eventos de conversão estão em `/09-dados/MEDICAO.md`.

### Caminho A: Começar o teste grátis

- CTA do topo da página → página da modalidade (`/pilates`, `/yoga` ou `/funcional`) → `/precos` → `/teste-gratis`.
- Tempo esperado da primeira visita ao cadastro: menos de 3 minutos.
- Para a dona de estúdio de uma unidade, que quer testar sozinha.

### Caminho B: Ler um case

- Seção de provas na página inicial → `/cases` → `/cases/estudio-lirio-pilates` → CTA dentro do case → teste grátis ou demonstração.
- Para quem quer ver prova primeiro. A página `/cobranca` também leva direto ao CS-001.

### Caminho C: Assinar a newsletter

- CTA da newsletter na posição secundária da página inicial e no rodapé de todo artigo → `/newsletter` → sequência de boas-vindas em `/10-cerebro/campanhas/nutricao.md`.
- Para quem ainda não está pronto, como o instrutor que vai abrir o próprio estúdio.

Gestoras de rede seguem um quarto caminho, sem teste grátis: `/rede` → formulário de demonstração com número de unidades → conversa com Rafael Nunes.

## Regras de links internos

- Toda página aponta para pelo menos uma outra página.
- Páginas de serviço apontam para os cases relacionados.
- Cases apontam de volta para a página do serviço que gerou o resultado.
- Posts de blog seguem as regras de `/06-seo/CLUSTERS.md`.
- A página inicial aponta para todos os destinos de primeiro nível da navegação principal. Topo, três modalidades, três recursos, um case, um post, contato.
- As páginas de recurso apontam para o pilar do cluster ligado: `/cobranca` para o cluster 1, `/agenda` e `/presenca` para o cluster 2, `/rede` para o cluster 4.

## Modelos de página

Cada tipo de página tem um componente de modelo em `/04-design-system/`. Os agentes usam esses modelos ao diagramar o conteúdo.

- `modelo-inicio`
- `modelo-central-de-servicos`
- `modelo-pagina-de-servico`
- `modelo-precos`
- `modelo-central-de-provas`
- `modelo-case`
- `modelo-post-de-blog`
- `modelo-perguntas-frequentes`
- `modelo-contato`

## Redirecionamentos

Registre todo redirecionamento numa única tabela. Mantenha aqui, não na planilha de uma agência.

| URL antiga | URL nova | Tipo (301/302) | Data | Motivo |
| --- | --- | --- | --- | --- |
| `/sistema-pilates` | `/pilates` | 301 | 2026-03-02 | Slug encurtado na reforma das páginas de modalidade |
| `/blog/inadimplencia-estudio` | `/blog/como-diminuir-inadimplencia` | 301 | 2026-05-12 | Post antigo fundido no pilar do cluster 1 |
| `/planos` | `/precos` | 301 | 2026-01-20 | Padronização do nome da página |

## Sitemap XML

- URL: `/sitemap.xml`
- Gerado de novo automaticamente a cada publicação.
- Enviado ao Google Search Console e ao Bing Webmaster Tools.
- Usa datas `lastmod` que refletem edições reais, não mudanças de template.

## Robots.txt

- Libere todos os rastreadores principais.
- Bloqueie só as áreas administrativas e as URLs de pré-visualização.
- Indique o sitemap no final do arquivo.

## Prazo de implantação no site

As páginas `/precos` e `/pilates` dizem que a implantação assistida leva 5 dias úteis, conforme o dado D-003 de `/08-conteudo/PROVAS.md`. `[COMPROVADO]` `[PAINEL]` A implantação da Casa Ahimsa Yoga levou 7 dias úteis, como registrado em `/05-oferta/GANHOS-E-PERDAS.md`. Antes de mudar o texto do site, decida com Lívia Moraes se o prazo publicado passa a ser "de 5 a 7 dias úteis".

## Como passar este arquivo para um agente de IA

```text
Carregue /07-site/MAPA-DO-SITE.md antes de rascunhar o texto de qualquer página, rótulos de navegação ou links internos.

Ao escrever:
1. Aponte para páginas existentes pelo slug, não por uma expressão vaga.
2. Proponha uma página nova só se o tema ainda não tiver casa.
3. Leve todo conteúdo para um dos três caminhos de conversão principais.
4. Siga as regras de URL nos slugs.

Cite /07-site/MAPA-DO-SITE.md em todo briefing de página.
```

Caminhos de referência: `/07-site/MAPA-DO-SITE.md`, `/07-site/DADOS-ESTRUTURADOS.md`, `/06-seo/PALAVRAS-CHAVE.md`, `/06-seo/CLUSTERS.md`.
