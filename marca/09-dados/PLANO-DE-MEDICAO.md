# Plano de medição

## Como usar este arquivo

- **O que entra:** cada nome de evento, cada propriedade, cada definição de conversão, cada convenção de UTM e o modelo de atribuição que a empresa usa.
- **Como os agentes leem:** os agentes usam este arquivo ao escrever briefings que incluem expectativas de medição. Os desenvolvedores usam este arquivo ao instrumentar páginas e fluxos novos.
- **Frequência de atualização:** audite sempre que uma página nova for ao ar. Revisão completa por trimestre.

## Checklist para agentes de IA

- [ ] Legível por máquina: eventos e propriedades em tabelas.
- [ ] Estruturado: taxonomia, eventos de conversão, convenções de UTM, atribuição, consentimento.
- [ ] Fonte única da verdade: nenhum registro paralelo de eventos no Notion ou numa planilha.
- [ ] Versionado.
- [ ] Citável: os agentes citam `/09-dados/PLANO-DE-MEDICAO.md` ao descrever eventos.

Última atualização: [AAAA-MM-DD]

---

## Regras de nomenclatura

- Nomes de eventos em `snake_case`.
- Propriedades em `snake_case`.
- Nomes de eventos e de propriedades são identificadores técnicos e ficam em inglês, como nos eventos recomendados do GA4. Os valores podem ficar em português.
- O evento descreve a ação, não a página (`form_submit`, não `contact_page_action`).
- Valores em minúsculas, a não ser que a propriedade seja número ou booleano.
- Nenhum dado pessoal (nome, e-mail, telefone, CPF) em nomes de eventos ou valores de propriedades.

## Taxonomia de eventos

| Nome do evento | Gatilho | Propriedades | Quem dispara | Responsável | Onde está |
| --- | --- | --- | --- | --- | --- |
| `page_view` | Carregamento de qualquer página | `page_path`, `page_title`, `page_type`, `cluster` | GTM | [Responsável] | GA4, CDP |
| `cta_click` | Clique num CTA rastreado | `cta_id`, `cta_label`, `cta_page`, `cta_position` | GTM | [Responsável] | GA4, CDP |
| `form_view` | Formulário aparece na tela | `form_id`, `form_name`, `form_page` | GTM | [Responsável] | GA4 |
| `form_start` | Pessoa interage com um campo do formulário | `form_id` | GTM | [Responsável] | GA4 |
| `form_submit` | Formulário enviado com sucesso | `form_id`, `form_name`, `form_source`, `lead_persona_guess` | GTM | [Responsável] | GA4, CRM |
| `form_error` | Formulário falha na validação | `form_id`, `error_code` | GTM | [Responsável] | GA4 |
| `call_book_started` | Widget de agenda aberto | `widget_id`, `page_source` | GTM | [Responsável] | GA4 |
| `call_booked` | Evento criado na agenda | `call_type`, `page_source`, `utm_source`, `utm_campaign` | Webhook da agenda | [Responsável] | CRM, GA4 |
| `newsletter_subscribe` | Formulário da newsletter enviado | `list_id`, `source_page` | Webhook da ferramenta de e-mail | [Responsável] | CRM, GA4 |
| `lead_magnet_download` | Download de material com cadastro | `asset_id`, `asset_name` | GTM | [Responsável] | CRM, GA4 |
| `pricing_view` | Página de preços vista | `tier_viewed` | GTM | [Responsável] | GA4 |
| `comparison_view` | Página de comparação vista | `competitor_slug` | GTM | [Responsável] | GA4 |
| `search_query` | Busca interna enviada | `query`, `results_count` | Ferramenta de busca | [Responsável] | GA4 |
| `video_play` | Vídeo rastreado começa a tocar | `video_id`, `video_title`, `percent_watched` | Player | [Responsável] | GA4 |
| `chat_started` | Widget de chat aberto | `chat_context` | Ferramenta de chat | [Responsável] | CRM, GA4 |
| `whatsapp_click` | Clique num botão ou link de WhatsApp | `cta_id`, `cta_page`, `whatsapp_context` | GTM | [Responsável] | GA4, CRM |

## Eventos de conversão

O subconjunto de eventos que importa para otimização e relatórios. Os que contam como lead são exatamente as ações que o plano conta como lead em `/11-plano/PLANO-DE-UMA-PAGINA.md` e em `/09-dados/MEDICAO.md`: marque esses como evento principal no GA4. Os outros são micro-conversões ou eventos do CRM, acompanhados sem entrar na taxa de conversão.

| Evento | Etapa | Conta como lead | Dono do número |
| --- | --- | --- | --- |
| `form_submit` (formulário de lead) | Topo do funil | Sim | Marketing |
| `whatsapp_click` | Topo do funil | Sim, se o plano conta conversa no WhatsApp | Marketing |
| `call_booked` | Decisão | Sim | Vendas + Marketing |
| `newsletter_subscribe` | Topo do funil | Não (micro-conversão) | Marketing |
| `lead_magnet_download` | Consideração | Não (micro-conversão) | Marketing |
| `deal_opened` (evento do CRM) | Decisão | Não (etapa do CRM) | Vendas |
| `deal_closed_won` (evento do CRM) | Fechamento | Não (é o ganho) | Vendas |

## Convenções de UTM

Sempre use o conjunto completo de UTMs nos links de campanha. Nunca corte.

| Parâmetro | Regra | Exemplo |
| --- | --- | --- |
| `utm_source` | Origem do canal, minúsculas, sem espaços | `instagram`, `linkedin`, `newsletter`, `whatsapp`, `google` |
| `utm_medium` | Meio de marketing | `organic_social`, `paid_social`, `email`, `cpc`, `referral` |
| `utm_campaign` | Slug da campanha, aaaa-mm-nomedacampanha | `2026-04-lancamento-app-aluno` |
| `utm_content` | Variação do anúncio ou do criativo | `variante-a`, `variante-b`, `link-na-bio` |
| `utm_term` | Palavra-chave da busca paga | `sistema-estudio-pilates` |

URL canônica de exemplo:

```
https://www.exemplo.com.br/planos?utm_source=instagram&utm_medium=organic_social&utm_campaign=2026-04-lancamento-app-aluno&utm_content=link-na-bio
```

## Modelo de atribuição

- **Relatórios de descoberta:** primeiro toque.
- **Relatórios de pipeline:** último toque não direto, validado por vendas.
- **Relatórios de receita:** multitoque (40% primeiro toque, 40% último toque, 20% toques intermediários).
- **Concilie com o CRM todo mês.** A receita que o marketing reivindica nunca passa da receita registrada no CRM.

## Consentimento e privacidade

- O consentimento do visitante é coletado antes de disparar tags de análise, de anúncios e de personalização que usam cookies não essenciais, conforme a LGPD.
- O estado do consentimento fica guardado no CDP (ou na plataforma de consentimento) e é repassado às ferramentas seguintes, inclusive via Consent Mode do Google.
- A tabela de classificação de cookies fica em `/02-voz/COMPLIANCE.md` e é atualizada a cada troca de ferramenta.

## Checklist de QA das tags

Antes de qualquer página ou funil novo ir ao ar.

- [ ] Todos os eventos da taxonomia disparam com as propriedades obrigatórias.
- [ ] Todo CTA tem `cta_id`, `cta_label` e `cta_page` preenchidos.
- [ ] UTMs de todos os links de campanha validadas com um clique de teste.
- [ ] Consentimento respeitado no modo de teste.
- [ ] Nenhum dado pessoal nos valores das propriedades.
- [ ] Evento de conversão verificado de ponta a ponta em pelo menos um ambiente.

## Exemplo: evento de conversão da demonstração da Cadência

- **Página:** `/planos`
- **CTA:** botão "Agende uma demonstração de 30 minutos".
- **Atributos do CTA:** `cta_id="demo-hero"`, `cta_label="agende uma demonstração de 30 minutos"`, `cta_page="/planos"`, `cta_position="hero"`.
- **Eventos:** `cta_click` no botão, `call_book_started` ao abrir o widget, `call_booked` quando o evento é aceito.
- **Alternativa:** o botão "Falar no WhatsApp" na mesma página dispara `whatsapp_click` com `cta_id="whatsapp-planos"`.
- **Destino:** `call_booked` cria no CRM um negócio novo com a tag `source=planos-demo-hero`.
- **Atribuição:** primeiro toque pelo início da sessão no GA4, último toque pelas UTMs do `call_booked`.

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
