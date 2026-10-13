> Adaptado de `data-and-funnel-analytics`, `go-to-market-strategy` e `growth-strategy` do GTM Skills (github.com/manojbajaj95/claude-gtm-plugin), licença MIT, © 2025 mbajaj. Traduzido, resumido e ajustado aos arquivos do GTM Brain. Aviso completo em `AVISOS-DE-TERCEIROS.md`.

# Métricas, eventos e destaques

Como preencher `09-dados/MEDICAO.md`, `09-dados/PLANO-DE-MEDICAO.md` e `09-dados/DESTAQUES.md` de forma que os quatro números do plano possam ser conferidos todo mês.

Princípio: meça para decidir. Uma métrica que não muda nenhuma decisão não entra na árvore.

## Métrica norte

Uma por marca, em `### Métrica norte`. Uma boa métrica norte:

- mostra o valor que o cliente recebe, não só o que a marca vende;
- anda junto com a receita;
- dá para medir toda semana ou todo mês;
- o time consegue mexer nela.

O **KPI principal do marketing** costuma ser os leads do plano, com a meta de `PLANO-DE-UMA-PAGINA.md`.

## Árvore de KPIs

As etapas do template seguem o caminho do cliente. Ligue cada uma ao plano:

| Etapa do template | O que mede | Meta |
| --- | --- | --- |
| Descoberta | Visitas às páginas que vendem; sessões orgânicas; alcance | Visitas: H do plano. O resto: "Acompanhar, sem meta" até ter linha de base |
| Consideração | Inscritos, downloads, tempo nas páginas pilar | Acompanhar, ou a meta que a pessoa definir com base no histórico |
| Decisão | As ações que contam como lead | Leads por mês do plano, divididos por ação se o CRM separa |
| Fechamento | Clientes novos, custo por cliente | Clientes por mês do plano; custo abaixo de J |
| Retenção | Churn, indicações, recomendação | Churn medido como teto; o resto, acompanhar |

Fórmulas para escrever ao lado, se a marca usar:

```
Custo por cliente = (gasto em dinheiro + horas × valor da hora) ÷ clientes novos do mês
Churn mensal      = clientes que cancelaram no mês ÷ clientes no início do mês
NPS               = % de notas 9 e 10 − % de notas de 0 a 6
```

**Métricas de vaidade** (seguidores, curtidas, cadastros totais, impressões soltas) só entram como apoio de uma etapa, nunca como meta. O que conta é quem age: visita que vira lead, lead que vira cliente, cliente que fica.

## Definições

Escreva em `## Definições dos KPIs`, uma vez, e use as mesmas palavras em todos os arquivos:

- **Lead:** a definição do passo 3 da conta, com as ações que contam e as que não contam (download de material costuma não contar).
- **Ganho:** contrato assinado, primeiro pagamento recebido, ou o que a marca usa. Tem que ser algo que o sistema de cobrança ou o CRM registra.
- **Taxa de fechamento:** ganhos ÷ leads do mesmo período, com o valor atual e a fonte.
- **Taxa de conversão:** leads ÷ visitas às páginas que vendem, com o valor atual e a fonte. Diga quais páginas entram.
- **Custo por cliente:** como acima, com o valor da hora usado no plano.

As definições de MQL, SAL e MQO do template só ficam se a marca usa essas etapas no CRM. Se não usa, apague.

## Eventos

- Nomes em `snake_case`, em inglês, como os eventos recomendados do GA4 (`form_submit`, `whatsapp_click`). A regra está em `PLANO-DE-MEDICAO.md`; siga-a mesmo que outro arquivo use nomes em português.
- Nome específico: o evento diz a ação, as propriedades dizem o contexto (`cta_click` com `cta_id`, não um evento por botão).
- Nenhum dado pessoal em evento ou propriedade: nome, e-mail, telefone, CPF.
- Os eventos de conversão são as ações que contam como lead. Marque-os como eventos principais no GA4. Formulário conta uma vez por sessão; compra conta toda vez.
- Conversão que acontece fora do site (WhatsApp, ligação) precisa de um registro: clique rastreado no botão e etiqueta de origem na conversa ou no CRM.

## UTM

- Em todo link de campanha: anúncio, e-mail, WhatsApp, link na bio, QR code de evento.
- Nunca em link interno do próprio site: quebra a origem da sessão.
- Minúsculas, sem espaço, hífen entre palavras. `utm_campaign` com a data na frente, como no template.
- Um registro das campanhas ativas, para ninguém inventar um `utm_source` novo para a mesma origem.

## Consentimento

Pela LGPD, tags de análise, anúncios e personalização que usam cookies não essenciais só disparam depois do consentimento. Configure o modo de consentimento do Google e o equivalente da Meta. A tabela de cookies fica em `/02-voz/COMPLIANCE.md`.

## Conferência da medição

- **Antes de uma página ou campanha ir ao ar:** cada evento dispara no modo de depuração do GA4, com as propriedades esperadas, sem duplicar; as conversões estão marcadas; as UTMs chegam na sessão.
- **Toda semana:** um evento de conversão que cai mais de 20% de uma semana para outra é investigado primeiro como problema de medição, depois como problema de canal.
- **Todo mês:** páginas e campanhas novas sem medição; conciliação entre GA4 e CRM.
- **Todo trimestre:** revise a taxonomia. Tire eventos que ninguém usa e acrescente os que faltam.

Se a marca ainda não mede, escreva o que existe e marque o resto como `(pendente)` com quem instala e até quando. Não preencha a tabela de ferramentas com as do template só para ficar completa.

## Destaques

Um ativo entra em `DESTAQUES.md` quando cumpre o critério da marca, sempre com o número, o período e a fonte. Sem critério da pessoa, use dois ou mais critérios do template. Se o export só traz os primeiros de cada canal e a média (sem a lista inteira, "10% melhores" não se calcula), use um múltiplo da média do canal com um mínimo absoluto, por exemplo o dobro da média e pelo menos 5 leads, e marque a regra como `[PROPOSTA]`. Na prática:

- Compare dentro do mesmo canal. Um post do blog compete com posts do blog, não com anúncios.
- Espere um ciclo completo: 90 dias para conteúdo orgânico, o tempo de uma campanha para anúncios.
- Prefira números que andam perto da receita: leads e reuniões atribuídos antes de alcance e cliques.
- Para cada vencedor, escreva por que funciona em termos que outro agente consiga repetir: o gancho, a estrutura, a prova usada, o CTA.
- `## Padrões entre os vencedores` só depois de três ou mais vencedores no mesmo canal, ou do mesmo gancho vencendo em três canais. Antes disso, um padrão é um caso, registrado como `[OBSERVADO]`.
- As colunas das tabelas podem mudar para as métricas que o export traz (testes com UTM no lugar de taxa de resposta, custo por teste no lugar de custo por cliente). Os títulos das seções ficam.
- Canal que a marca não usa: "Nenhum vencedor registrado: a marca não publica em <canal>", sem pendência.
- Peça que rodou sem a permissão de `PROVAS.md` (depoimento em anúncio sem "Anúncios" aprovado) não entra como vencedora, por melhor que seja o número. Registre e avise a pessoa.

Marca sem histórico: as seções ficam com "Nenhum vencedor registrado ainda (pendente: primeira seleção em AAAA-MM-DD)". É o estado certo, não uma falha.
