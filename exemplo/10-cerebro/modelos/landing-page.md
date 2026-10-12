# Modelo de landing page

Um modelo de preencher lacunas para uma landing page focada em conversão. Serve para uma oferta de serviço ou produto, um material rico ou uma campanha.

## Como os agentes usam este modelo

1. Carregue `/01-icp/ICP.md` e `/01-icp/COMITE-DE-COMPRA.md` para o público.
2. Carregue `/05-oferta/OFERTA.md` para a promessa e a prova.
3. Carregue `/07-site/MAPA-DO-SITE.md` para a estrutura de URL.
4. Carregue `/07-site/DADOS-ESTRUTURADOS.md` para as exigências de schema.
5. Carregue `/08-conteudo/PROVAS.md` para depoimentos, cases e dados.
6. Carregue `/09-dados/PLANO-DE-MEDICAO.md` para a medição dos CTAs.

## Variáveis

| Variável | Fonte |
| --- | --- |
| `{{PROMESSA_PRINCIPAL}}` | `/05-oferta/OFERTA.md` |
| `{{NOME_DA_PERSONA}}` | `/01-icp/ICP.md` |
| `{{PAPEL_DA_PERSONA}}` | `/01-icp/ICP.md` |
| `{{DOR}}` | `/01-icp/ICP.md` |
| `{{NOME_DA_OFERTA}}` | `/05-oferta/OFERTA.md` |
| `{{DESCRICAO_DA_OFERTA}}` | `/05-oferta/OFERTA.md` |
| `{{ENTREGAS}}` | `/05-oferta/OFERTA.md` |
| `{{PRAZO}}` | `/05-oferta/OFERTA.md` |
| `{{FAIXA_DE_PRECO}}` | `/05-oferta/OFERTA.md` |
| `{{PROVA_A}}`, `{{PROVA_B}}`, `{{PROVA_C}}` | `/08-conteudo/PROVAS.md` |
| `{{FAQ_P1}}` a `{{FAQ_P5}}` | Entrevistas com clientes e `/01-icp/VOZ-DO-CLIENTE.md` |
| `{{TEXTO_DO_CTA_PRINCIPAL}}` | Caminho de conversão de `/07-site/MAPA-DO-SITE.md` |
| `{{URL_DO_CTA_PRINCIPAL}}` | `/07-site/MAPA-DO-SITE.md` |

---

## Estrutura da página

### Primeira dobra

- **H1 (8 a 14 palavras):** `{{PROMESSA_PRINCIPAL}} escrita na voz do leitor.`
- **Subtítulo (1 a 2 frases):** explique para quem é e o que acontece quando a pessoa clica.
- **CTA principal:** `{{TEXTO_DO_CTA_PRINCIPAL}}` com link para `{{URL_DO_CTA_PRINCIPAL}}`, com UTMs conforme `/09-dados/PLANO-DE-MEDICAO.md`.
- **CTA secundário:** ler um case. Se a venda acontece em conversa, pode ser "Falar no WhatsApp".
- **Visual de apoio:** uma imagem de `/03-visual/` ou um print de `/08-conteudo/`.

### Faixa de prova social

Uma única linha abaixo da primeira dobra.

- Três logos de clientes + a métrica principal do melhor case.
- Exemplo: "Usado por [Logo] [Logo] [Logo]. [Métrica principal do melhor case, com o ID da prova]."

### Seção do problema

Dois ou três parágrafos. Fale direto com `{{NOME_DA_PERSONA}}`.

- Abra com a dor dita como alguém do ramo diria: "Quase toda `{{PAPEL_DA_PERSONA}}` que eu conheço está travada numa coisa: `{{DOR}}`."
- Duas frases de apoio que validam a dor com as palavras do leitor, tiradas de `/01-icp/VOZ-DO-CLIENTE.md`.

### Seção da promessa

Diga o que você faz, em linguagem simples.

- **H2:** "O que você recebe"
- Três itens tirados de `{{ENTREGAS}}`.
- Uma imagem ou diagrama.

### Detalhe da oferta

Resumo do que está incluído.

| Incluído | Detalhe |
| --- | --- |
| Entrega 1 | [Uma frase] |
| Entrega 2 | [Uma frase] |
| Entrega 3 | [Uma frase] |
| Entrega 4 | [Uma frase] |

### Prazo

De três a cinco passos, cada um em uma frase. Exemplo com a implantação assistida da Cadência (troque pelos passos da sua oferta):

1. Dia 0: chamada de início e acesso ao sistema.
2. Dias 1 a 3: importação de alunos, planos e horários.
3. Dias 4 a 7: ativação do Pix automático e do cartão.
4. Semana 2: treinamento da recepção e dos instrutores.
5. Semana 3: revisão dos primeiros números e ajustes finais.

### Faixa de preço

- **A partir de:** `{{FAIXA_DE_PRECO}}`.
- Uma frase explicando o que muda o preço (escopo, número de unidades, setor regulado).
- Formas de pagamento aceitas (Pix, boleto, cartão) e se há nota fiscal.

### Seção de provas

Três depoimentos e a miniatura de um case.

- Depoimento 1: `{{PROVA_A}}` com nome completo, cargo, empresa e permissão registrada.
- Depoimento 2: `{{PROVA_B}}`.
- Depoimento 3: `{{PROVA_C}}`.
- Link para um case completo de `/08-conteudo/PROVAS.md`.

### Perguntas frequentes

Cinco perguntas, cada uma respondida em 40 a 80 palavras.

1. **P: `{{FAQ_P1}}`** R: [Resposta]
2. **P: `{{FAQ_P2}}`** R: [Resposta]
3. **P: `{{FAQ_P3}}`** R: [Resposta]
4. **P: `{{FAQ_P4}}`** R: [Resposta]
5. **P: `{{FAQ_P5}}`** R: [Resposta]

Ligue ao schema `FAQPage` descrito em `/07-site/DADOS-ESTRUTURADOS.md`.

### Bloco de CTA secundário

- **H2:** "Ainda não é a hora?"
- Assine a newsletter.
- Baixe um material relacionado.

Formulários de captura têm caixa de consentimento desmarcada e link para a política de privacidade, conforme a LGPD.

### CTA do rodapé

Repita o CTA principal no fim da página.

## Schema a incluir

- `Service` (se a página descreve um serviço) ou `SoftwareApplication` (se descreve um software).
- `Offer` (dentro de `Service` ou `SoftwareApplication`).
- `FAQPage` (do bloco de perguntas frequentes).
- `BreadcrumbList`.

## Metadados

- **Title tag:** 50 a 60 caracteres. Palavra-chave principal + valor.
- **Meta description:** 140 a 155 caracteres. Promessa + resultado + CTA.
- **Imagem OG:** gerada conforme `/03-visual/PROMPTS-DE-IMAGEM.md`.

## Checklist de acessibilidade

- Todas as imagens têm texto alternativo.
- Botões atingem o contraste do WCAG 2.2 AA.
- Estados de foco visíveis em todo elemento interativo.
- Títulos seguem uma árvore lógica H1 → H2 → H3.

## Medição

Todo CTA tem `cta_id`, `cta_label`, `cta_page`, `cta_position`. Todo formulário tem `form_id` e `form_source`. Todos os CTAs levam UTMs conforme `/09-dados/PLANO-DE-MEDICAO.md`.

## Exemplo

Landing page do plano Estúdio da Cadência. H1: "Cobre, agende e controle a presença sem abrir o WhatsApp da recepção." Subtítulo: "Sistema para estúdios de pilates, yoga e funcional com até 400 alunos. A aluna marca e repõe aula pelo app, e a mensalidade cai no Pix automático." CTA principal: "Agendar demonstração". Faixa de preço: "A partir de R$ 189/mês. Implantação assistida opcional de R$ 990." Prova principal: "Estúdio Lírio Pilates: de 14 mensalidades atrasadas para 2 em dois meses (CS-001)."

A Cadência, o estúdio e os números são fictícios.

## Como passar este arquivo para um agente de IA

```text
Carregue /10-cerebro/modelos/landing-page.md.

Preencha toda {{VARIÁVEL}}. Tire os dados dos arquivos listados. Não invente.

Escreva a página de cima para baixo, em português do Brasil. Confira schema, medição, acessibilidade, LGPD nos formulários e voz antes de entregar. Entregue um bloco pronto para o CMS.
```

Caminhos de referência: `/10-cerebro/modelos/landing-page.md`, `/05-oferta/OFERTA.md`, `/07-site/MAPA-DO-SITE.md`, `/07-site/DADOS-ESTRUTURADOS.md`, `/08-conteudo/PROVAS.md`.
