# Plano de medição

> Exemplo fictício. A Cadência e todas as pessoas e empresas citadas não existem.

Plano de medição da Cadência para o plano de out. de 2026 a set. de 2027: os eventos que o site e o app disparam hoje, os três que contam como lead e as regras de UTM, atribuição e consentimento.

Fontes citadas neste arquivo:

- `[SITE]` levantamento técnico do site por Tiago Ramos em 2026-10-02: contêiner do Google Tag Manager GTM-CAD (versão 41, publicada em 2026-09-15) e notas técnicas do site
- `[GA4]` exports do GA4 da propriedade cadencia.example, 2026-04-01 a 2026-09-30
- `[VENDAS]` RD Station CRM, relatório de funil por origem do negócio, 2026-04-01 a 2026-09-30
- `[ANUNCIOS]` Google Ads e Gerenciador de Anúncios da Meta, 2026-04-01 a 2026-09-30
- `[CONVERSA 2026-10-13]` definição de lead e do clique no WhatsApp, por Marina Duarte

## Como usar este arquivo

- **O que entra:** cada nome de evento, cada propriedade, cada definição de conversão, cada convenção de UTM e o modelo de atribuição que a empresa usa.
- **Como os agentes leem:** os agentes usam este arquivo ao escrever briefings que incluem expectativas de medição. Os desenvolvedores usam este arquivo ao instrumentar páginas e fluxos novos.
- **Frequência de atualização:** audite sempre que uma página nova for ao ar. Revisão completa por trimestre.

## Checklist para agentes de IA

- [x] Legível por máquina: eventos e propriedades em tabelas.
- [x] Estruturado: taxonomia, eventos de conversão, convenções de UTM, atribuição, consentimento.
- [x] Fonte única da verdade: nenhum registro paralelo de eventos no Notion ou numa planilha.
- [x] Versionado.
- [x] Citável: os agentes citam `/09-dados/PLANO-DE-MEDICAO.md` ao descrever eventos.

Última atualização: 2026-10-13
Autor principal: Tiago Ramos (contêiner e site) e Marina Duarte (definição de lead)

---

## Regras de nomenclatura

- Nomes de eventos em `snake_case`.
- Propriedades em `snake_case`.
- Nomes de eventos e de propriedades são identificadores técnicos e ficam em inglês, como nos eventos recomendados do GA4. Os valores podem ficar em português.
- O evento descreve a ação, não a página (`form_submit`, não `contact_page_action`).
- Valores em minúsculas, a não ser que a propriedade seja número ou booleano.
- Nenhum dado pessoal (nome, e-mail, telefone, CPF) em nomes de eventos ou valores de propriedades.

## Taxonomia de eventos

Os eventos do contêiner GTM-CAD, versão 41 `[SITE]`. O site (`https://cadencia.example`) e o app (`https://app.cadencia.example`) usam a mesma propriedade do GA4, com domínio cruzado.

| Nome do evento | Gatilho | Propriedades | Quem dispara | Responsável | Onde está |
| --- | --- | --- | --- | --- | --- |
| `page_view` | Carregamento de qualquer página (automático) | `page_location`, `page_title` | GTM | Tiago Ramos | GA4 |
| `cta_click` | Clique num botão com `data-cta-id` | `cta_id`, `cta_label`, `cta_page`, `cta_position` | GTM | Tiago Ramos | GA4 |
| `whatsapp_click` | Clique em qualquer link `wa.me` | `cta_id`, `cta_page` | GTM | Tiago Ramos | GA4 |
| `trial_start` | Conta criada no app | `plan_interest`, `modality` | dataLayer do app, via GTM | Tiago Ramos | GA4, painel interno, RD Station CRM |
| `call_book_started` | Widget de agenda da demonstração aberto | `cta_id` | GTM | Tiago Ramos | GA4 |
| `call_booked` | Demonstração confirmada no widget | `cta_id`, `modality` | GTM | Tiago Ramos | GA4, RD Station CRM |
| `newsletter_subscribe` | Formulário da newsletter enviado | `form_id` | GTM | Tiago Ramos | GA4, RD Station Marketing |
| `lead_magnet_download` | Download de guia em `/guias/` | `asset_slug` | GTM | Tiago Ramos | GA4, RD Station Marketing |
| `pricing_toggle` | Troca entre mensal e anual em `/precos` | nenhuma | GTM | Tiago Ramos | (pendente) Tiago instala até 2026-11-15 |
| `case_read` | 75% de rolagem em `/cases/[slug]` | `case_id` | GTM | Bruna Alves | (pendente) Bruna instala até 2026-11-15 |

Os eventos de formulário genérico (`form_view`, `form_start`, `form_submit`, `form_error`), `pricing_view`, `comparison_view`, `search_query`, `video_play` e `chat_started` não existem no contêiner e nenhum está planejado `[SITE]`. A página `/comparativo/agendafit`, planejada em `/07-site/MAPA-DO-SITE.md`, entra aqui com o evento dela quando for ao ar.

## Eventos de conversão

O subconjunto de eventos que importa para otimização e relatórios.

São exatamente as ações que o plano conta como lead: teste grátis iniciado ou demonstração agendada, pelo site ou pelo WhatsApp `[CONVERSA 2026-10-13]`. Os três estão marcados como eventos principais no GA4 `[GA4]`.

| Evento | Etapa | Dono do número |
| --- | --- | --- |
| `trial_start` | Decisão: teste grátis iniciado | Tiago Ramos |
| `call_booked` | Decisão: demonstração agendada pelo site | Rafael Nunes |
| `whatsapp_click` | Decisão: conversa no WhatsApp que pode virar demonstração | Lívia Moraes |

Regras de contagem:

- **Eventos não são pessoas.** De abr. a set. de 2026, as oito páginas que vendem tiveram 480 eventos principais (318 `trial_start`, 96 `call_booked`, 66 `whatsapp_click`), e o RD Station CRM, que deduplica por e-mail e telefone, contou 420 leads `[GA4]` `[VENDAS]`. A taxa de conversão do plano (2,5%) é eventos ÷ sessões; o lead do placar é o do CRM.
- **O clique no WhatsApp não é o lead.** Ele vira lead quando a conversa termina num teste ou numa demonstração, registrada no CRM com a etiqueta de origem do WhatsApp Business (`/09-dados/MEDICAO.md`).
- `newsletter_subscribe` e `lead_magnet_download` não são conversão. Contam na etapa de consideração de `/09-dados/MEDICAO.md`.
- O ganho (assinatura com o primeiro pagamento recebido) é registrado no painel interno e no CRM, não no GA4.

As páginas que vendem, as do denominador da taxa de conversão, são `/precos`, `/pilates`, `/yoga`, `/funcional`, `/cobranca`, `/agenda`, `/rede` e `/teste-gratis` `[GA4]`. O blog e as landing pages de anúncio (`/lp/…`) ficam fora.

## Convenções de UTM

Sempre use o conjunto completo de UTMs nos links de campanha. Nunca corte.

| Parâmetro | Regra | Exemplo |
| --- | --- | --- |
| `utm_source` | Origem do canal, minúsculas, sem espaços. Só os valores em uso: `instagram`, `google`, `meta`, `newsletter`, `whatsapp`, `evento` `[SITE]` | `instagram` |
| `utm_medium` | Meio de marketing. `[PROPOSTA]` o contêiner não registra uma lista; confirmar com Tiago na revisão de jan. de 2027 | `organic_social`, `paid_social`, `cpc`, `email`, `referral` |
| `utm_campaign` | Slug da campanha, aaaa-mm-nomedacampanha | `2026-10-link-na-bio` |
| `utm_content` | Variação do anúncio, do criativo ou do perfil | `bio-marina`, `bio-cadencia` |
| `utm_term` | Palavra-chave da busca paga | `sistema-estudio-pilates` |

URL canônica de exemplo:

```
https://cadencia.example/precos?utm_source=instagram&utm_medium=organic_social&utm_campaign=2026-10-link-na-bio&utm_content=bio-marina
```

Regras da Cadência:

- UTM em todo link de anúncio, newsletter, lista de transmissão do WhatsApp, link na bio, stories e QR code de evento. Nunca em link interno do site nem do site para o app: quebra a origem da sessão.
- O tráfego de `app.cadencia.example` para `cadencia.example` está excluído como referência no GA4 `[SITE]`.
- Problema achado: 18% das sessões do Instagram chegam com `utm_source=ig`, de um link antigo da bio, e caem em outra linha do GA4 `[SITE]`. Troca do link antigo da bio para `utm_source=instagram` [PENDENTE: dono a definir na próxima revisão mensal; o canal Instagram é da Marina Duarte no plano].

## Modelo de atribuição

- **No GA4:** modelo baseado em dados, com janela de 30 dias para eventos de aquisição e de 90 dias para os demais `[SITE]`. É o multitoque dos relatórios de receita e de pipeline.
- **Relatórios de descoberta:** primeiro toque, pelas dimensões de primeiro usuário do GA4.
- **Leads e demonstrações por canal:** a origem do negócio no RD Station CRM, que é a fonte do relatório de funil `[VENDAS]`.
- **Leads que não passam pelo site:** a demonstração agendada no estande de evento, na aula da escola de formação ou na prospecção de redes entra no CRM com a origem `evento`, `parceria` ou `prospeccao`, registrada por quem agendou (`/11-plano/CANAIS.md`). O GA4 não vê esses leads: eles são os 9 leads diretos do plano. O `utm_source=evento` continua para o QR code do estande que leva ao site.
- **Contas de anúncio:** último clique, com a janela de cada plataforma. De abr. a set. de 2026, Google Ads e Meta atribuíram 180 testes iniciados à mídia paga; o CRM atribuiu 84 leads `[ANUNCIOS]` `[VENDAS]`. O número das plataformas não entra no placar sem conciliar com o CRM.
- **Concilie com o CRM todo mês.** A receita que o marketing reivindica nunca passa da receita registrada no CRM.

## Consentimento e privacidade

- O consentimento do visitante é coletado antes de disparar tags de análise, de anúncios e de personalização que usam cookies não essenciais, conforme a LGPD.
- Banner próprio com o Consent Mode v2 do Google em modo básico: `analytics_storage` e `ad_storage` ficam negados até o aceite. O pixel da Meta só dispara depois do aceite `[SITE]`.
- A Cadência não usa CDP. O estado do consentimento fica no banner e é repassado ao GA4 e ao Google Ads pelo Consent Mode.
- No modo básico, o GA4 não recebe nada de quem recusa. Sessões e eventos ficam abaixo do real; o CRM conta todos os leads. Leve isso em conta na conciliação de GA4 e CRM.
- A tabela de classificação de cookies fica em `/02-voz/COMPLIANCE.md` e é atualizada a cada troca de ferramenta. Hoje o arquivo tem a regra de consentimento, mas não a tabela [PENDENTE: tabela de cookies em `/02-voz/COMPLIANCE.md`, Tiago Ramos, dono técnico dos dados em `/09-dados/MEDICAO.md`].

## Checklist de QA das tags

Antes de qualquer página ou funil novo ir ao ar.

- [ ] Todos os eventos da taxonomia disparam com as propriedades obrigatórias.
- [ ] Todo CTA tem `cta_id`, `cta_label` e `cta_page` preenchidos.
- [ ] UTMs de todos os links de campanha validadas com um clique de teste.
- [ ] Consentimento respeitado no modo de teste.
- [ ] Nenhum dado pessoal nos valores das propriedades.
- [ ] Evento de conversão verificado de ponta a ponta em pelo menos um ambiente.

Na Cadência, o checklist roda no modo de depuração do GA4 antes de cada versão nova do contêiner. Quem roda e quem confere seguem os donos dos dados de `/09-dados/MEDICAO.md`: Tiago Ramos é o dono técnico e Bruna Alves, a auditora.

## Como passar este arquivo para um agente de IA

```text
Carregue /09-dados/PLANO-DE-MEDICAO.md antes de lançar qualquer página, campanha ou funil novo.

Fluxo:
1. Identifique o evento de conversão que o novo ativo deve gerar.
2. Confirme que o evento existe na taxonomia.
3. Se precisar de um evento novo, proponha-o com exatamente as mesmas colunas da taxonomia.
4. Coloque os parâmetros UTM conforme as convenções acima.
5. Confirme o tratamento do consentimento.
6. Inclua o ativo no checklist de QA das tags antes do lançamento.

Cite /09-dados/PLANO-DE-MEDICAO.md no briefing de lançamento.
```

Caminhos de referência: `/09-dados/PLANO-DE-MEDICAO.md`, `/09-dados/MEDICAO.md`, `/09-dados/DESTAQUES.md`.
