# Playbook de email

## Propósito

O email é o único canal que é seu de verdade. A entregabilidade é a nossa vantagem competitiva. Tratamos cada envio como um bilhete escrito à mão para uma pessoa com nome, nunca como um disparo em massa.

## Regras de formato

- **Remetente:** pessoa real, com nome e sobrenome, usando o email da empresa. Nada de `nao-responda`.
- **Assunto:** menos de 45 caracteres. Sem emoji. Só a primeira letra maiúscula.
- **Pré-cabeçalho (preheader):** menos de 85 caracteres. Continua o assunto, não repete.
- **Tamanho do corpo:** 60 a 120 palavras para email de venda. 200 a 400 palavras para newsletter. 400 a 700 para um editorial mais profundo.
- **Tom:** de uma pessoa para uma pessoa. Mesmo quando vai para 10 mil.
- **Links:** um CTA principal. Um link secundário opcional. Mais nada.
- **HTML:** mínimo. Texto escuro sobre fundo claro. Cor da marca com moderação.
- **Imagens:** opcionais. No máximo uma imagem em emails de nutrição e de venda. Texto alternativo obrigatório.

## Frequência

| Fluxo | Frequência | Responsável |
| --- | --- | --- |
| Sequência de boas-vindas | Disparada no cadastro, 4 emails em 14 dias | Ciclo de vida |
| Newsletter semanal | 1 por semana, mesmo dia, mesmo horário | Responsável pela newsletter |
| Carta mensal do fundador | 1 por mês | Fundador |
| Reengajamento | Disparado após 60 dias sem abertura | Ciclo de vida |
| Nutrição pós-venda | Disparada no fechamento do negócio | Sucesso do cliente |
| Transacional | Disparado conforme necessário | Engenharia |

Mantenha a frequência dos fluxos de marketing previsível. Se precisar mudar, avise a lista com uma semana de antecedência.

## Padrões de assunto

- Pergunta direta: "o que você faria com 14 mensalidades atrasadas?"
- Número específico: "de 14 atrasos para 2 em dois meses"
- Pessoal: "um recado da marina, terça de manhã"
- Nota de campo: "o que uma recepcionista me disse ontem"
- Valor primeiro: "o roteiro de aviso que usamos com 420 estúdios"

## Padrões de assunto a evitar

- "Newsletter #47" ou qualquer numeração sequencial.
- TUDO EM MAIÚSCULAS ou excesso de pontos de exclamação.
- "RE:" ou "ENC:" falsos.
- "Você não vai acreditar..."

## Formato do corpo por fluxo

### Sequência de boas-vindas

Email 1 (dia 0): boas-vindas, alinhar expectativas, entregar o material prometido.
Email 2 (dia 2): uma lição ou história específica ligada ao material.
Email 3 (dia 5): convite para responder com uma dúvida. Zero venda.
Email 4 (dia 14): CTA sem pressão para a página de conversão principal.

### Newsletter semanal

- Uma nota de campo ou lição curta (300 a 500 palavras).
- Um link para uma prova da semana (case, depoimento ou print).
- Um CTA para o caminho de conversão principal.
- Enviada às segundas ou às sextas, sempre no mesmo dia.

### Carta mensal do fundador

- 400 a 700 palavras.
- Uma reflexão, uma ideia de estratégia ou uma posição contrária ao senso comum que o fundador topa defender.
- Sem CTA, a não ser um convite ("se você está lidando com isso, responda este email").

### Reengajamento

- Email 1: "Ainda quer receber?" Reconheça o sumiço. Convide a responder.
- Email 2: entregue algo de valor pequeno, sem pedir nada.
- Email 3: aviso final de remoção da lista.

### Nutrição pós-venda

- Passos de onboarding.
- Aprofundamento sobre o produto ou serviço que a pessoa comprou.
- Pedidos de feedback e avaliações em datas-marco.
- Email de upsell só de vez em quando, e só depois que um marco de valor foi atingido.

### Transacional

- Funcional, limpo.
- Sem texto de marketing.
- Reforça a voz da marca nos microtextos.

## Regras de entregabilidade

- Aqueça IPs e domínios aos poucos ao trocar de provedor.
- Honre o descadastro na hora, não em dias. Ofereça descadastro em um clique (cabeçalho `List-Unsubscribe`), como Gmail e Yahoo exigem de quem envia em volume.
- Limpe a lista todo trimestre. Remova hard bounces e inativos há 90 dias.
- Nunca compre lista.
- Nunca inclua ninguém sem consentimento explícito.
- Autentique o domínio de envio com SPF, DKIM e DMARC.

## LGPD e consentimento

- Para email de marketing, a base legal mais segura é o consentimento. Legítimo interesse (por exemplo, para quem já é cliente) só com avaliação do jurídico ou do encarregado de dados (DPO).
- Registre a prova do consentimento: data, origem (página ou evento), texto exato do aceite.
- Caixa de consentimento nunca vem marcada.
- Todo email de marketing diz por que a pessoa está recebendo, tem link de descadastro visível e identifica a empresa (razão social e CNPJ).
- Pedidos de acesso, correção ou exclusão de dados são atendidos dentro do prazo da lei. Quem pediu exclusão sai de todas as listas, inclusive das de ferramentas conectadas.

## Segmentação

Segmente por poucos traços estáveis. Não complique demais.

- Estágio (assinante, MQL, cliente, cliente que saiu).
- Segmento de mercado (se você atende mais de um).
- Papel (dono, operação, marketing).
- Engajamento (ativo, inativo, reengajado).

## Acessibilidade

- Use texto de verdade, não imagem de texto.
- Corpo com fonte de no mínimo 16 px.
- Texto do link descritivo, nunca "clique aqui".
- Contraste de cor passa no WCAG 2.2 AA.

## Medição

- UTM em todo link de CTA, conforme `/09-dados/PLANO-DE-MEDICAO.md`.
- Registre as conversões (`call_booked`, `lead_magnet_download`) ligadas ao email de origem.
- Em email de venda, trate respostas como métrica principal.

## Padrões proibidos

- "Um favorzinho rápido"
- "Só passando para relembrar"
- "Sei que você é ocupado, mas..."
- "Espero que este email te encontre bem"
- "Infelizmente"
- Pedido de desculpas de vários parágrafos antes de um pedido
- Três ou mais links em um único email
- Urgência falsa ("última chance", "fecha hoje à noite") quando não é verdade

## Exemplo: newsletter

```
Assunto: de 14 atrasos para 2, passo a passo

Oi, [primeiro nome],

Em março, o Estúdio Lírio Pilates, em Joinville, tinha 14 mensalidades atrasadas em 160 alunas. Em maio, eram 2.

O preço não mudou. Ninguém novo entrou na recepção.

O que mudou foi a forma de cobrar.

Fizemos três coisas.

1. Trocamos a cobrança pelo WhatsApp pelo Pix automático. A aluna autoriza uma vez e o pagamento cai todo mês na data combinada.
2. Unificamos o vencimento. Todo mundo paga no dia 5, e o lembrete sai sozinho no dia 3.
3. Ligamos falta à reposição. Quem falta recebe no mesmo dia, pelo app, a oferta de outro horário. Aluna que repõe não sente que pagou à toa.

Se a sua recepção passa a manhã mandando "oi, tudo bem? vi que a mensalidade...", ela está fazendo o trabalho de um banco de graça.

Responda este email se quiser o roteiro que a Andreia, dona do Lírio, usou para avisar as alunas da mudança.

Marina
CEO e cofundadora, Cadência
```

A Cadência, o Estúdio Lírio Pilates, a Andreia e os números são fictícios.

## Como passar este arquivo para um agente de IA

```text
Carregue /10-cerebro/playbooks/email.md, /10-cerebro/modelos/email-de-nutricao.md, /02-voz/VOZ.md, /01-icp/ICP.md e /08-conteudo/PROVAS.md.

Escreva o email em português do Brasil, seguindo o formato do corpo do fluxo pedido. Escreva 3 opções de assunto. Confira as regras de LGPD e consentimento. Rode o checklist antes do envio que está no modelo. Entregue o email pronto para agendar.
```

Caminhos de referência: `/10-cerebro/playbooks/email.md`, `/10-cerebro/modelos/email-de-nutricao.md`, `/02-voz/VOZ.md`, `/09-dados/PLANO-DE-MEDICAO.md`.
