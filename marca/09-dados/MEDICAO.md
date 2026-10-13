# Medição e desempenho

## Como usar este arquivo

- **O que entra:** as ferramentas, os KPIs, os painéis, a frequência e os responsáveis que tornam o marketing mensurável.
- **Como os agentes leem:** os agentes carregam este arquivo para escrever relatórios, resumos, revisões trimestrais e atualizações de reunião. Também consultam este arquivo antes de afirmar um resultado.
- **Frequência de atualização:** audite duas vezes por ano. Atualize no dia em que uma ferramenta entrar, sair ou for trocada.

## Checklist para agentes de IA

- [ ] Legível por máquina: ferramentas, KPIs, painéis e frequência em tabelas.
- [ ] Estruturado: uma seção por assunto.
- [ ] Fonte única da verdade.
- [ ] Versionado.
- [ ] Citável: os agentes citam `/09-dados/MEDICAO.md` em todo rascunho de relatório.

Última atualização: [AAAA-MM-DD]

---

## Ferramentas de medição

Nomeie cada ferramenta, para que serve e quem é o responsável.

| Ferramenta | Função | Dados | Responsável | Status |
| --- | --- | --- | --- | --- |
| [GA4] | Análise do site | Tráfego, aquisição, conversões | [Responsável] | [No ar] |
| [Google Tag Manager] | Gerenciador de tags | Disparo de eventos | [Responsável] | [No ar] |
| [RD Station CRM / HubSpot / Pipedrive] | CRM | Negócios, contatos, pipeline | [Responsável] | [No ar] |
| [RD Station Marketing / Mailchimp / Brevo] | E-mail | Envios, aberturas, cliques, conversões | [Responsável] | [No ar] |
| [Segment / RudderStack] | CDP | Identidade, repasse de eventos | [Responsável] | [Opcional] |
| [Looker Studio / Databox] | Painéis | Painéis da diretoria e de marketing | [Responsável] | [No ar] |
| [Hotjar / Microsoft Clarity / PostHog] | Qualitativo | Gravação de sessões, mapas de calor, análise de produto | [Responsável] | [No ar] |
| [Google Search Console / Ahrefs / Semrush] | SEO | Posições, backlinks, acompanhamento de palavras-chave | [Responsável] | [No ar] |
| [Gerenciador de Anúncios da Meta / Google Ads] | Mídia paga | Investimento, alcance, conversões de anúncios | [Responsável] | [Se houver] |
| [WhatsApp Business / rastreamento de ligações] | Conversas e ligações | Conversões que acontecem fora do site | [Responsável] | [Se houver] |

## Árvore de KPIs

Escolha uma métrica norte. Desdobre em métricas menores. Associe cada uma a uma ferramenta.

### Métrica norte

- **KPI principal do negócio:** [ex.: receita de contratos ganhos que vieram de leads gerados pelo marketing]
- **KPI principal do marketing:** [ex.: oportunidades qualificadas por marketing (MQOs) por trimestre]

### KPIs por etapa do funil

| Etapa | Métrica | Meta | Ferramenta | Responsável |
| --- | --- | --- | --- | --- |
| Descoberta | Sessões orgânicas | [Meta] | [GA4] | [Responsável] |
| Descoberta | Impressões de buscas pela marca | [Meta] | [Google Search Console] | [Responsável] |
| Descoberta | Alcance nas redes sociais | [Meta] | [Nativo da rede + ferramenta de agendamento] | [Responsável] |
| Consideração | Inscritos na newsletter | [Meta] | [Ferramenta de e-mail] | [Responsável] |
| Consideração | Downloads de guias | [Meta] | [CRM] | [Responsável] |
| Consideração | Tempo nas páginas pilar | [Meta] | [GA4] | [Responsável] |
| Decisão | Pedidos de demonstração | [Meta] | [CRM] | [Responsável] |
| Decisão | Reuniões agendadas | [Meta] | [Ferramenta de agenda] | [Responsável] |
| Decisão | Leads diretos (venda direta, parceria, evento), dos canais que não passam pelo site | [Meta] | [CRM, campo de origem] | [Responsável] |
| Fechamento | MQOs | [Meta] | [CRM] | [Responsável] |
| Fechamento | Valor anual dos contratos ganhos (ACV) | [Meta] | [CRM] | [Responsável] |
| Retenção | Retenção líquida de receita (NRR) | [Meta] | [CRM + financeiro] | [Responsável] |
| Retenção | Indicações | [Meta] | [CRM] | [Responsável] |

## Definições dos KPIs

Escreva a definição uma vez. Proteja-a.

- **Lead:** qualquer pessoa que envia um formulário ou agenda uma reunião com e-mail verificado.
- **Lead qualificado por marketing (MQL):** lead que se encaixa no ICP e interagiu com pelo menos dois conteúdos, ou com um conteúdo de alta intenção (preços, demonstração, página de comparação).
- **Lead aceito por vendas (SAL):** lead que vendas revisou e confirmou que está pronto para ser trabalhado.
- **Oportunidade qualificada por marketing (MQO):** negócio que entrou na etapa 2 do pipeline e tem origem atribuída ao marketing.
- **Reunião agendada:** evento de agenda aceito pelas duas partes, não apenas um pedido.
- **Fonte de atribuição:** primeiro toque para métricas de descoberta, último toque para reuniões agendadas, multitoque nas revisões de pipeline.
- **Ganho:** contrato assinado e primeiro pagamento recebido.

## Painéis

| Painel | Público | Frequência | Responsável | Fonte |
| --- | --- | --- | --- | --- |
| Pulso semanal | Time de marketing | Reunião de segunda-feira | [Responsável] | [Ferramenta] |
| Receita mensal | Liderança | Dia 5 de cada mês | [Responsável] | [Ferramenta] |
| Revisão trimestral | Conselho ou diretoria | Primeira semana do trimestre | [Responsável] | [Ferramenta] |
| Mergulho por canal | Responsáveis por canal | Mensal | [Responsável] | [Ferramenta] |
| Relatório de SEO | Responsável por SEO e diretoria | Mensal | [Responsável] | [Ahrefs + Google Search Console] |

## Frequência de relatórios

- **Diário:** volume de leads, ritmo de gasto em anúncios, anomalias no topo do funil.
- **Semanal:** desempenho por canal, placar de conteúdo, avanço do pipeline.
- **Mensal:** revisão do funil completo, revisão da atribuição, atualização dos destaques.
- **Trimestral:** revisão da árvore de KPIs, novas metas, retrospectiva.

## Donos dos dados

- **Dono de negócio:** a pessoa que mais se importa se o número estiver errado.
- **Dono técnico:** a pessoa que mantém o evento, o painel ou a integração.
- **Auditor:** a pessoa que confere os números antes de a liderança ver.

Todo painel mostra os três nomes no topo.

## Checagens de qualidade dos dados

Rode as checagens abaixo todo mês.

- Contagem de eventos dentro de 2% da linha de base esperada.
- Nenhuma conversão duplicada vinda da mesma sessão.
- Cobertura de UTM acima de 98% no tráfego de campanhas.
- Taxa de correspondência entre GA4 e CRM acima de 85%.
- Formulários vazios removidos ou deduplicados.

## Privacidade e consentimento

- Todo formulário coleta só os campos que a etapa exige.
- O banner de cookies pede consentimento antes de ativar cookies não essenciais, conforme a LGPD.
- Os requisitos da LGPD (base legal, finalidade, direitos do titular) ficam registrados em `/02-voz/COMPLIANCE.md`.
- Modo de consentimento do Google (Consent Mode) configurado nas ferramentas de análise e de anúncios, e o equivalente na Meta.

## Exemplo: árvore de KPIs da Cadência

- **Métrica norte:** MRR novo vindo de estúdios gerados pelo marketing, por mês (base atual de R$ 118 mil de MRR).
- **KPI principal do marketing:** demonstrações agendadas por estúdios dentro do ICP, por mês.
- **KPIs do funil:**
  - Descoberta: alcance no Instagram e sessões orgânicas no post pilar "sistema para estúdio de pilates".
  - Consideração: downloads do guia de reposição de aulas.
  - Decisão: demonstrações agendadas pela página de planos.
  - Fechamento: assinaturas pagas (Pix automático ou cartão) nos planos Essencial, Estúdio e Rede.
  - Retenção: churn mensal abaixo dos 2,1% atuais e indicações entre donas de estúdio.

Números fictícios, só para o exemplo.

## Como passar este arquivo para um agente de IA

```text
Carregue /09-dados/MEDICAO.md antes de escrever qualquer relatório, resumo por e-mail ou atualização para a liderança.

Regras:
1. Use as definições de KPI exatamente como estão escritas. Não redefina.
2. Cite o painel ou a ferramenta ao mencionar um número.
3. Sinalize anomalias acima de 2% de variação.
4. Nunca invente números. Se o número não estiver disponível, diga isso.

Cite /09-dados/MEDICAO.md em todo rascunho de relatório.
```

Caminhos de referência: `/09-dados/MEDICAO.md`, `/09-dados/PLANO-DE-MEDICAO.md`, `/09-dados/DESTAQUES.md`.
