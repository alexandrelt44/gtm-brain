# Mapa do site e arquitetura da informação

## Como usar este arquivo

- **O que entra:** o inventário completo das páginas do site, o padrão de URL de cada uma, a lógica de navegação e os principais caminhos de conversão.
- **Como os agentes leem:** os agentes carregam este arquivo para apontar links corretamente, para propor uma página nova sem duplicar uma antiga e para levar o leitor ao ponto de conversão certo.
- **Frequência de atualização:** atualize sempre que uma página entrar no ar, mudar de endereço ou sair do ar. Auditoria completa duas vezes por ano.

## Checklist para agentes de IA

- [ ] Legível por máquina: inventário numa tabela com colunas consistentes.
- [ ] Estruturado: páginas institucionais, de serviço, de conteúdo, de prova e de conversão em seções separadas.
- [ ] Fonte única da verdade: o único mapa de que um fornecedor ou um agente precisa.
- [ ] Versionado: data da última atualização.
- [ ] Citável: os agentes citam `/07-site/MAPA-DO-SITE.md` ao recomendar links.

Última atualização: [AAAA-MM-DD]

---

## Inventário das páginas principais

Todo site de base precisa destas.

| Página | Padrão de URL | Objetivo | CTA principal | Responsável | Status |
| --- | --- | --- | --- | --- | --- |
| Início | `/` | Apresentar a promessa e levar aos três principais caminhos de conversão | Agendar uma conversa | [Nome] | No ar |
| Sobre | `/sobre` | Apresentar o time, a história e o ponto de vista | Conhecer o time | [Nome] | No ar |
| Central de serviços | `/servicos` | Listar todas as ofertas, com link para cada página de serviço | Ver os serviços | [Nome] | No ar |
| Página de serviço | `/servicos/[nome-do-servico]` | Descrever uma oferta em profundidade | Pedir uma demonstração | [Nome] | No ar |
| Preços | `/precos` | Publicar preços e planos | Agendar uma conversa | [Nome] | No ar |
| Central de provas | `/provas` ou `/cases` | Reunir todos os cases, avaliações e logos de clientes | Ler um case | [Nome] | No ar |
| Case | `/cases/[slug]` | Contar a história de um cliente do começo ao fim | Agendar uma conversa | [Nome] | No ar |
| Central do blog | `/blog` | Índice de todo o conteúdo escrito | Assinar a newsletter | [Nome] | No ar |
| Post de blog | `/blog/[slug]` | Uma ideia em profundidade | Ler um post relacionado ou agendar uma conversa | [Nome] | No ar |
| Perguntas frequentes | `/perguntas-frequentes` ou dentro das páginas | Responder às dúvidas comuns | Falar com a gente | [Nome] | No ar |
| Contato | `/contato` | Principal ponto de conversão | Enviar formulário, chamar no WhatsApp ou agendar | [Nome] | No ar |
| Jurídico | `/privacidade`, `/termos`, `/lgpd` | Política de privacidade, termos de uso e tratamento de dados conforme a LGPD | n/a | [Nome] | No ar |
| Trabalhe conosco | `/trabalhe-conosco` | Recrutar | Candidatar-se | [Nome] | Opcional |
| Parceiros | `/parceiros` | Programa de parcerias | Candidatar-se | [Nome] | Opcional |

## Árvore de arquitetura da informação

```
/
├── /sobre
│   └── /sobre/equipe/[pessoa]
├── /servicos
│   ├── /servicos/[nome-do-servico]
│   └── /servicos/[nome-do-servico]/[subservico]
├── /precos
├── /provas
│   ├── /cases/[slug]
│   ├── /avaliacoes
│   └── /clientes
├── /blog
│   ├── /blog/[slug]
│   └── /blog/tema/[cluster]
├── /perguntas-frequentes
├── /contato
├── /agendar (página de agenda)
├── /newsletter
├── /materiais
│   ├── /materiais/modelos
│   ├── /materiais/guias
│   └── /materiais/ferramentas
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
- Em ordem de intenção do usuário: Serviços, Preços, Provas, Materiais, Sobre, Contato.
- Contato é um CTA com cara de botão, não um link de texto.

### Navegação secundária

- O rodapé carrega o resto: mapa do site, jurídico, materiais, redes sociais, newsletter.
- O rodapé é organizado em colunas por público (Clientes, Parceiros, Trabalhe conosco).

### Navegação utilitária

- Reservada para login, troca de idioma ou troca de região.
- Mantenha a navegação utilitária fora da principal.

## Caminhos de conversão

Três caminhos principais na página inicial. Cada um termina num formulário de agendamento ou num botão de WhatsApp com mensagem pronta.

### Caminho A: Agendar uma demonstração

- CTA do topo da página → `/servicos/[oferta-principal]` → explicação da oferta → formulário de agendamento.
- Tempo esperado da primeira visita ao agendamento: menos de 3 minutos.

### Caminho B: Ler um case

- Seção de provas na página inicial → `/provas` → um `/cases/[slug]` → CTA dentro do case → agendar uma conversa.
- Para o comprador que quer ver prova primeiro.

### Caminho C: Assinar a newsletter

- CTA da newsletter na posição secundária da página inicial e no rodapé de todo artigo → `/newsletter` → sequência de boas-vindas em `/10-cerebro/campanhas/nutricao.md`.
- Para o comprador que não está pronto hoje, mas vale a pena nutrir.

## Regras de links internos

- Toda página aponta para pelo menos uma outra página.
- Páginas de serviço apontam para os cases relacionados.
- Cases apontam de volta para a página do serviço que gerou o resultado.
- Posts de blog seguem as regras de `/06-seo/CLUSTERS.md`.
- A página inicial aponta para todos os destinos de primeiro nível da navegação principal. Topo, três serviços, um case, um post, contato.

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
| [/antiga] | [/nova] | 301 | [AAAA-MM-DD] | [Motivo] |

## Sitemap XML

- URL: `/sitemap.xml`
- Gerado de novo automaticamente a cada publicação.
- Enviado ao Google Search Console e ao Bing Webmaster Tools.
- Usa datas `lastmod` que refletem edições reais, não mudanças de template.

## Robots.txt

- Libere todos os rastreadores principais.
- Bloqueie só as áreas administrativas e as URLs de pré-visualização.
- Indique o sitemap no final do arquivo.

## Exemplo: mapa do site da Cadência

- `/`, promessa no topo e três caminhos: Agendar uma demonstração, Ler um case, Assinar a newsletter para donas de estúdio.
- `/sobre`, a história da Marina (ex-dona de estúdio), o time em Florianópolis.
- `/pilates`, página de solução para estúdio de pilates, com dados estruturados.
- `/yoga`, página de solução para estúdio de yoga, com dados estruturados.
- `/funcional`, página de solução para estúdio de treino funcional.
- `/agenda`, `/cobranca`, `/presenca`, uma página por recurso (agenda, cobrança por Pix automático e cartão, controle de presença).
- `/precos`, planos Essencial, Estúdio e Rede, mais a implantação assistida.
- `/cases/estudio-lirio-pilates`, exemplo de case.
- `/blog/...`, satélites do pilar "como diminuir a inadimplência em academia e estúdio".
- `/contato`, WhatsApp, formulário e horário de atendimento.

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
