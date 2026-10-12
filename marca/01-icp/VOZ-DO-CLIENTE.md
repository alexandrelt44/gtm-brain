# Biblioteca da voz do cliente

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

Última revisão: [AAAA-MM-DD]

---

## Por que isso importa

Seus clientes já sabem vender o seu produto. Eles fazem isso nas calls de venda, nas avaliações, nos grupos com outros donos de negócio e nas duas primeiras frases da mensagem ao suporte quando algo quebra. O seu trabalho é pegar essas palavras e guardar num arquivo.

Agentes que escrevem a partir de uma biblioteca da voz do cliente produzem texto que soa natural. Agentes que escrevem sem ela produzem texto igual ao de qualquer outro fornecedor.

## Categorias de fonte

Organize as citações pela origem. A fonte importa porque indica intenção e estado emocional.

### Calls de venda

O que o comprador disse na call de descoberta ou de demonstração, capturado por gravador de reunião (Google Meet, Zoom, tl;dv, Fathom) ou por anotações.

- "[Citação exata]", [Papel do comprador], [Tipo de empresa], [Data]
- "[Citação exata]", [Papel do comprador], [Tipo de empresa], [Data]

### Sucesso do cliente e onboarding

O que os clientes atuais dizem em reuniões de acompanhamento, conversas de rotina e calls de onboarding.

- "[Citação exata]", [Nome do cliente ou apelido], [Caso de uso], [Data]
- "[Citação exata]", [Nome do cliente ou apelido], [Caso de uso], [Data]

### Suporte e chat

O que os clientes dizem quando algo quebra, no chamado, no chat ou no WhatsApp. Carregado de emoção. Muitas vezes é a expressão mais clara do job to be done.

- "[Citação exata]", [Número do chamado ou dado ocultado], [Data]
- "[Citação exata]", [Número do chamado ou dado ocultado], [Data]

### Avaliações

Google, Reclame Aqui, App Store e Google Play, G2, Capterra, diretórios do setor.

- "[Citação exata]", [Plataforma], [Nota], [Data], [Link]
- "[Citação exata]", [Plataforma], [Nota], [Data], [Link]

### Fóruns e comunidades

Onde os compradores perguntam aos pares, não aos fornecedores: grupos de WhatsApp e Telegram, grupos no Facebook, Reddit, fóruns do setor. Costuma ser a linguagem mais honesta.

- "[Citação exata]", [Grupo ou fórum], [Título da conversa], [Data], [Link]
- "[Citação exata]", [Grupo ou fórum], [Título da conversa], [Data], [Link]

### Comentários no LinkedIn e Instagram

O que os compradores dizem em público, para os pares.

- "[Citação exata]", [Papel de quem postou], [Contexto do post], [Data], [Link]
- "[Citação exata]", [Papel de quem postou], [Contexto do post], [Data], [Link]

### Entrevistas de churn e de ganhos e perdas

As citações mais difíceis de conseguir e as mais valiosas. Por que saíram. Por que escolheram outro. Por que quase não escolheram você.

- "[Citação exata]", [Tipo de entrevista], [Contexto], [Data]
- "[Citação exata]", [Tipo de entrevista], [Contexto], [Data]

## Índice de temas

Agrupe as citações por tema para que os agentes puxem a linguagem certa para cada peça.

### Tema: Problema

Citações que descrevem o problema com as palavras do comprador. Use em títulos de página, primeiras frases e anúncios.

- "[Citação]"
- "[Citação]"

### Tema: Gatilho

Citações que descrevem o que fez o comprador agir. Use em assuntos de e-mail e primeiros parágrafos.

- "[Citação]"
- "[Citação]"

### Tema: Resultado

Citações que descrevem a vitória. Use em blocos de prova social, destaques de case e na seção de promessa da landing page.

- "[Citação]"
- "[Citação]"

### Tema: Objeção

Citações que descrevem hesitação. Use em perguntas frequentes, material de apoio a vendas e e-mails que respondem objeções.

- "[Citação]"
- "[Citação]"

### Tema: Comparação

Citações que descrevem como o comprador comparou você com as alternativas. Use em páginas de comparação e battle cards.

- "[Citação]"
- "[Citação]"

## Exemplo

### Citações coletadas pela Cadência

**Call de venda, fevereiro de 2026, dona de estúdio de pilates com 3 instrutoras** `[LITERAL]`

> Eu passo o domingo à noite mandando mensagem de cobrança. Odeio cobrar aluna, parece que eu tô pedindo favor. Já tentei dois apps de agenda e nenhum resolveu isso. Eu não quero mais uma agenda, quero parar de cobrar.

**Avaliação no Google, 5 estrelas, março de 2026** `[LITERAL]`

> Antes eu tinha umas 20 alunas atrasadas todo mês. Com o Pix automático fechei março com três. E as alunas remarcam sozinhas pelo app, minha recepção respira.

**Grupo de WhatsApp de donas de estúdio, conversa "como vocês controlam reposição?"** `[LITERAL]`

> Se você ainda controla reposição em caderno, você tá perdendo aula paga toda semana. Eu perdia e nem sabia quanto.

### Temas extraídos

- **Problema:** "Odeio cobrar aluna, parece que eu tô pedindo favor."
- **Gatilho:** "A recepcionista saiu e a cobrança voltou toda para mim."
- **Resultado:** "Com o Pix automático fechei março com três."
- **Objeção:** "Já tentei dois apps de agenda e nenhum resolveu isso."

Pessoas, citações e números deste exemplo são fictícios.

## Como passar este arquivo para um agente de IA

```text
Carregue /01-icp/VOZ-DO-CLIENTE.md antes de escrever.

Ao escrever um título, um assunto de e-mail ou um gancho, use expressões dos temas Problema e Gatilho. Não invente linguagem. Repita o que o comprador disse.

Ao escrever um bloco de depoimento ou um destaque de citação, use o tema Resultado e cite a fonte.

Ao escrever uma pergunta frequente ou responder uma objeção, use o tema Objeção.

Se não encontrar neste arquivo uma citação que combine com o ângulo que você está escrevendo, pare e peça para uma pessoa da equipe incluir uma antes de continuar.
```

Caminhos de referência: `/01-icp/VOZ-DO-CLIENTE.md`, `/01-icp/ICP.md`.
