# Medição e desempenho

> Exemplo fictício. A Cadência e todas as pessoas e empresas citadas não existem.

Fontes citadas neste arquivo:

- `[PAINEL]` dados de uso do produto (painel interno da Cadência)
- `[ENTREVISTAS]` 14 entrevistas com donas de estúdio e gestoras de rede, janeiro a março de 2026

## Como usar este arquivo

- **O que entra:** as ferramentas, os KPIs, os painéis, a frequência e os responsáveis que tornam o marketing mensurável.
- **Como os agentes leem:** os agentes carregam este arquivo para escrever relatórios, resumos, revisões trimestrais e atualizações de reunião. Também consultam este arquivo antes de afirmar um resultado.
- **Frequência de atualização:** audite duas vezes por ano. Atualize no dia em que uma ferramenta entrar, sair ou for trocada.

## Checklist para agentes de IA

- [x] Legível por máquina: ferramentas, KPIs, painéis e frequência em tabelas.
- [x] Estruturado: uma seção por assunto.
- [x] Fonte única da verdade.
- [x] Versionado.
- [x] Citável: os agentes citam `/09-dados/MEDICAO.md` em todo rascunho de relatório.

Última atualização: 2026-10-01

---

## Ferramentas de medição

Nomeie cada ferramenta, para que serve e quem é o responsável.

| Ferramenta | Função | Dados | Responsável | Status |
| --- | --- | --- | --- | --- |
| GA4 | Análise do site | Tráfego, aquisição, eventos de conversão | Bruna Alves | No ar |
| Google Tag Manager | Gerenciador de tags | Disparo dos eventos `teste_iniciado`, `demonstracao_agendada`, `clique_whatsapp`, `download_material`, `newsletter_inscricao` | Tiago Ramos | No ar |
| RD Station CRM | CRM | Leads, demonstrações, negócios, origem do lead | Rafael Nunes | No ar |
| RD Station Marketing | E-mail | Newsletter, sequências de nutrição, aberturas e cliques | Bruna Alves | No ar |
| Painel interno da Cadência | Produto e cobrança | Assinaturas, MRR, churn, inadimplência dos estúdios clientes, uso de recursos `[PAINEL]` | Tiago Ramos | No ar |
| Looker Studio | Painéis | Pulso semanal e receita mensal | Bruna Alves | No ar |
| Microsoft Clarity | Qualitativo | Gravação de sessões e mapas de calor em `/precos` e `/teste-gratis` | Bruna Alves | No ar |
| Google Search Console + Semrush | SEO | Posições, cliques, impressões, acompanhamento de palavras-chave | Bruna Alves | No ar |
| Gerenciador de Anúncios da Meta + Google Ads | Mídia paga | Investimento, cliques, custo por teste iniciado | Rafael Nunes | No ar |
| WhatsApp Business | Conversas | Demonstrações agendadas por WhatsApp, marcadas com etiqueta de origem | Lívia Moraes | No ar |
| CDP | Identidade e repasse de eventos | n/a | n/a | Não usamos. O volume não justifica |

## Árvore de KPIs

Escolha uma métrica norte. Desdobre em métricas menores. Associe cada uma a uma ferramenta.

### Métrica norte

- **KPI principal do negócio:** MRR novo vindo de estúdios gerados pelo marketing, por mês. Base atual: R$ 118 mil de MRR, cerca de 420 estúdios. `[COMPROVADO]` `[PAINEL]`
- **KPI principal do marketing:** leads dentro do ICP por mês (testes iniciados mais demonstrações agendadas). Meta: 84 por mês, conforme `/11-plano/PLANO-DE-UMA-PAGINA.md`.

### KPIs por etapa do funil

| Etapa | Métrica | Meta | Ferramenta | Responsável |
| --- | --- | --- | --- | --- |
| Descoberta | Visitas às páginas que vendem (modalidade, planos e teste grátis) | 3.334 por mês | GA4 | Bruna Alves |
| Descoberta | Sessões orgânicas no blog | 6.000 por mês | GA4 | Bruna Alves |
| Descoberta | Impressões de buscas pela marca | Acompanhar, sem meta | Google Search Console | Bruna Alves |
| Descoberta | Alcance no Instagram (Cadência e Marina) | 120 mil contas por mês | Instagram | Marina Duarte |
| Consideração | Inscritos na newsletter | +250 por mês | RD Station Marketing | Bruna Alves |
| Consideração | Downloads de materiais (guia de reposição, calculadora, modelos) | 400 por mês | RD Station CRM | Bruna Alves |
| Consideração | Tempo nas páginas pilar | 3 minutos ou mais | GA4 | Bruna Alves |
| Decisão | Testes iniciados | 60 por mês | GA4 + painel interno | Tiago Ramos |
| Decisão | Demonstrações agendadas (site e WhatsApp) | 24 por mês | RD Station CRM | Rafael Nunes |
| Fechamento | Estúdios novos (assinatura paga) | 16 a 17 por mês | Painel interno | Rafael Nunes |
| Fechamento | Custo por estúdio novo | Abaixo de R$ 825 | Planilha de custos + painel interno | Rafael Nunes |
| Retenção | Churn mensal | Abaixo de 2,1% (D-002) | Painel interno | Lívia Moraes |
| Retenção | Indicações | 500 visitas por mês com código de indicação | Painel interno | Lívia Moraes |

## Definições dos KPIs

Escreva a definição uma vez. Proteja-a.

- **Lead:** estúdio que inicia um teste grátis ou agenda uma demonstração (pelo site ou pelo WhatsApp), com e-mail ou telefone verificado. Download de material não conta como lead.
- **Lead qualificado por marketing (MQL):** lead que se encaixa no ICP e interagiu com pelo menos dois conteúdos, ou com um conteúdo de alta intenção (preços, demonstração, página de comparação).
- **Lead aceito por vendas (SAL):** lead que vendas revisou e confirmou que está pronto para ser trabalhado.
- **Oportunidade qualificada por marketing (MQO):** negócio que entrou na etapa 2 do pipeline e tem origem atribuída ao marketing.
- **Reunião agendada:** evento de agenda aceito pelas duas partes, não apenas um pedido.
- **Fonte de atribuição:** primeiro toque para métricas de descoberta, último toque para reuniões agendadas, multitoque nas revisões de pipeline.
- **Ganho:** assinatura ativa nos planos Essencial, Estúdio ou Rede, com o primeiro pagamento recebido (Pix automático ou cartão).
- **Taxa de fechamento:** estúdios ganhos ÷ leads do mesmo período. Hoje 20%, medida no CRM de abr. a set. de 2026.
- **Taxa de conversão:** leads ÷ visitas às páginas que vendem. Hoje 2,5%, medida no GA4. O blog fica fora da conta.

## Painéis

| Painel | Público | Frequência | Responsável | Fonte |
| --- | --- | --- | --- | --- |
| Pulso semanal | Bruna, Rafael e Lívia | Reunião de segunda-feira | Bruna Alves | Looker Studio (GA4 + RD Station CRM) |
| Receita mensal | Marina e Tiago | Dia 5 de cada mês | Tiago Ramos | Painel interno |
| Revisão do plano | Marina, Bruna e Rafael | Primeira terça-feira do mês | Marina Duarte | `/11-plano/REVISAO-MENSAL.md` |
| Revisão trimestral | Sócios e conselho consultivo | Primeira semana do trimestre | Marina Duarte | Looker Studio + painel interno |
| Mergulho por canal | Responsáveis por canal | Mensal | Bruna Alves | GA4, Instagram, Meta e Google Ads |
| Relatório de SEO | Bruna e Marina | Mensal | Bruna Alves | Semrush + Google Search Console |

## Frequência de relatórios

- **Diário:** volume de leads, ritmo de gasto em anúncios, anomalias no topo do funil.
- **Semanal:** desempenho por canal, placar de conteúdo, avanço do pipeline.
- **Mensal:** revisão do funil completo, revisão da atribuição, atualização dos destaques.
- **Trimestral:** revisão da árvore de KPIs, novas metas, retrospectiva.

## Donos dos dados

- **Dono de negócio:** a pessoa que mais se importa se o número estiver errado.
- **Dono técnico:** a pessoa que mantém o evento, o painel ou a integração.
- **Auditor:** a pessoa que confere os números antes de a liderança ver.
- Na Cadência: dono de negócio é Marina, dono técnico é Tiago, auditora é Bruna. No painel de vendas, Rafael é o dono de negócio.

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
