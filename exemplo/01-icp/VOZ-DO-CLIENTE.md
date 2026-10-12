# Biblioteca da voz do cliente

> Exemplo fictício. A Cadência e todas as pessoas e empresas citadas não existem.

Fontes citadas neste arquivo:

- `[ENTREVISTAS]` 14 entrevistas com donas de estúdio e gestoras de rede, jan–mar/2026
- `[SUPORTE]` tickets e conversas de suporte no WhatsApp, 2025–2026

## Como usar este arquivo

- **O que entra:** Citações literais de compradores e clientes reais. Não parafraseie. Copie as palavras exatas, com erro de digitação e tudo. Marque cada citação com `[LITERAL]`. Se só tiver a ideia e não as palavras, marque `[PARÁFRASE]` e trate como provisória.
- **Como os agentes leem:** Os agentes de IA procuram neste arquivo expressões, objeções e linguagem emocional e devolvem essa linguagem nos rascunhos. É assim que o conteúdo para de soar como folheto.
- **Frequência de atualização:** Inclua três citações novas por mês. Vendas, sucesso do cliente e suporte respondem por uma contribuição cada.

## Checklist para agentes de IA

- [ ] Legível por máquina: toda citação sob um título de fonte identificado.
- [ ] Estruturado: uma citação por item, com fonte, data e contexto.
- [ ] Fonte única: toda a voz do cliente mora aqui, não em conversa de WhatsApp ou documento solto.
- [ ] Versionado: data da revisão trimestral registrada no topo.
- [ ] Citável: os agentes citam `/01-icp/VOZ-DO-CLIENTE.md` quando aproveitam uma expressão.

Última revisão: 2026-10-01

---

## Por que isso importa

As donas de estúdio já sabem vender a Cadência. Elas fazem isso nas demonstrações, nas avaliações, nos grupos de WhatsApp com outras donas e nas duas primeiras frases da mensagem ao suporte quando algo trava. O nosso trabalho é pegar essas palavras e guardar aqui.

Agentes que escrevem a partir desta biblioteca produzem texto que soa como uma dona de estúdio falando com outra. Agentes que escrevem sem ela produzem texto igual ao de qualquer sistema de academia.

## Categorias de fonte

### Calls de venda

- "Eu passo o domingo à noite mandando mensagem de cobrança. Odeio cobrar aluna, parece que eu tô pedindo favor." `[LITERAL]` `[ENTREVISTAS §4]`, dona de estúdio de pilates com três instrutoras, fevereiro de 2026
- "Já tentei dois apps de agenda e nenhum resolveu isso. Eu não quero mais uma agenda, quero parar de cobrar." `[LITERAL]` `[ENTREVISTAS §4]`, mesma entrevista, fevereiro de 2026
- "Fecho o mês em dois dias de planilha e ainda não confio no número." `[LITERAL]` `[ENTREVISTAS §9]`, Carla Mendes, gerente de operações da Rede Núcleo Funcional, março de 2026

### Sucesso do cliente e onboarding

- "Eu passava a segunda-feira inteira mandando mensagem no WhatsApp cobrando aluna. Hoje a cobrança sai sozinha e eu volto a dar aula." `[LITERAL]` Renata Vieira, Estúdio Lírio Pilates, cobrança por Pix automático, T-001
- "A aluna remarca sozinha pelo celular e a turma não fica com buraco." `[LITERAL]` Joana Prates, Casa Ahimsa Yoga, reposição pelo app, T-002

### Suporte e chat

- "Socorro, a aluna diz que pagou e no sistema aparece em aberto." `[LITERAL]` `[SUPORTE]`, conversa de março de 2026 (resolvida: Pix pago fora do Pix automático)
- "Como eu faço pra aluna não conseguir remarcar no mesmo dia? Tá bagunçando a turma das 7h." `[LITERAL]` `[SUPORTE]`, conversa de maio de 2026

### Avaliações

- "Antes eu tinha umas 20 alunas atrasadas todo mês. Com o Pix automático fechei março com três." `[LITERAL]` Google, 5 estrelas, março de 2026
- "Bom sistema, mas o app do aluno podia ter mais opção de pacote." `[LITERAL]` Google, 4 estrelas, julho de 2026

### Fóruns e comunidades

- "Se você ainda controla reposição em caderno, você tá perdendo aula paga toda semana. Eu perdia e nem sabia quanto." `[LITERAL]` grupo de WhatsApp de donas de estúdio, conversa "como vocês controlam reposição?", janeiro de 2026
- "Sistema de academia não serve pra pilates, é tudo pensado em catraca." `[LITERAL]` grupo de WhatsApp de donas de estúdio, conversa "qual sistema vocês usam?", abril de 2026

### Comentários no LinkedIn e Instagram

- "Cobrar aluna é a pior parte de ter estúdio. Ninguém conta isso na formação." `[LITERAL]` dona de estúdio de yoga, comentário num post da Marina Duarte no Instagram, junho de 2026

### Entrevistas de churn e de ganhos e perdas

- "Assim dá para testar sem arriscar as outras três." `[LITERAL]` Carla Mendes, entrevista de ganho da Rede Núcleo Funcional, abril de 2026
- "A gente precisava de catraca e de musculação no mesmo sistema. Vocês não têm." `[LITERAL]` entrevista de perda, rede de treino funcional com 12 unidades, julho de 2026. Ver `/05-oferta/GANHOS-E-PERDAS.md`.

## Índice de temas

### Tema: Problema

- "Odeio cobrar aluna, parece que eu tô pedindo favor." `[LITERAL]`
- "Eu passava a segunda-feira inteira mandando mensagem no WhatsApp cobrando aluna." `[LITERAL]` (T-001)
- "Você tá perdendo aula paga toda semana. Eu perdia e nem sabia quanto." `[LITERAL]`

### Tema: Gatilho

- "A recepcionista saiu e a cobrança voltou toda para mim." `[PARÁFRASE]` `[ENTREVISTAS §3]`
- "Fecho o mês em dois dias de planilha e ainda não confio no número." `[LITERAL]`

### Tema: Resultado

- "Hoje a cobrança sai sozinha e eu volto a dar aula." `[LITERAL]` (T-001)
- "A aluna remarca sozinha pelo celular e a turma não fica com buraco." `[LITERAL]` (T-002)
- "Com o Pix automático fechei março com três." `[LITERAL]`

### Tema: Objeção

- "Já tentei dois apps de agenda e nenhum resolveu isso." `[LITERAL]`
- "Não vou fazer ninguém baixar mais um aplicativo." `[PARÁFRASE]` `[ENTREVISTAS §3]`

### Tema: Comparação

- "Sistema de academia não serve pra pilates, é tudo pensado em catraca." `[LITERAL]`
- "Eu não quero mais uma agenda, quero parar de cobrar." `[LITERAL]`

## Como passar este arquivo para um agente de IA

```text
Carregue /01-icp/VOZ-DO-CLIENTE.md antes de escrever.

Ao escrever um título, um assunto de e-mail ou um gancho, use expressões dos temas Problema e Gatilho. Não invente linguagem. Repita o que o comprador disse.

Ao escrever um bloco de depoimento ou um destaque de citação, use o tema Resultado e cite a fonte.

Ao escrever uma pergunta frequente ou responder uma objeção, use o tema Objeção.

Se não encontrar neste arquivo uma citação que combine com o ângulo que você está escrevendo, pare e peça para uma pessoa da equipe incluir uma antes de continuar.
```

Caminhos de referência: `/01-icp/VOZ-DO-CLIENTE.md`, `/01-icp/ICP.md`.
