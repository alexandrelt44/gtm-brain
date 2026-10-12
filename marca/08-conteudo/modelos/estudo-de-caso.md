# Modelo de estudo de caso

Substitua todo `[colchete]`. Mantenha a ordem das seções. O case final deve ter de 700 a 1.200 palavras.

---

**Use o frontmatter abaixo no seu CMS.**

```yaml
title: "[Manchete com o resultado do cliente em primeiro lugar, ex.: 'Como o Estúdio Lírio Pilates parou de cobrar mensalidade pelo WhatsApp em 60 dias']"
slug: "[slug-do-cliente]"
customer: "[Razão social do cliente]"
vertical: "[Setor]"
service: "[Nome da oferta em /05-oferta/OFERTA.md]"
persona: "[Nome da persona primária em /01-icp/ICP.md]"
headline_metric: "[Número principal, ex.: 'inadimplência caiu de 18% para 6% em 90 dias']"
published: "[AAAA-MM-DD]"
updated: "[AAAA-MM-DD]"
cover_image: "/assets/cases/[slug]/capa.jpg"
author: "[Nome do autor]"
```

---

## [Manchete com o resultado do cliente]

Uma linha de apoio logo abaixo da manchete, numa frase, com menos de 20 palavras.

### O cliente em resumo

- **Empresa:** [Razão social]
- **Setor:** [Segmento]
- **Porte:** [Número de funcionários, faixa de faturamento]
- **Local:** [Cidade, UF]
- **Anos de mercado:** [Número]
- **Nosso trabalho:** [Nome da oferta, duração, data de início]
- **Nosso contato:** [Nome, cargo]

### O problema

Escreva dois parágrafos. O primeiro descreve a situação e o que estava em jogo. O segundo descreve o gatilho e o que o comprador já tinha tentado.

- [O que acontecia antes de entrarmos]
- [Quanto custava não fazer nada, em reais ou em tempo]
- [O que já tinham tentado e não funcionou]
- [O que finalmente levou à mudança]

### A abordagem

Um parágrafo e um plano em lista. Mostre a sequência, não a apresentação de slides.

1. [Passo 1 que demos]
2. [Passo 2 que demos]
3. [Passo 3 que demos]
4. [Passo 4 que demos]
5. [Passo 5 que demos]

### O que foi feito

Descreva o que foi de fato produzido. Nomeie os ativos, os canais e as entregas.

- [Ativo 1: o que era, onde foi usado]
- [Ativo 2]
- [Ativo 3]
- [Ativo 4]

### Os resultados

Comece pelos números. Use o mesmo período para todos, ou indique com clareza quando os períodos forem diferentes.

- [Número 1, com período]
- [Número 2, com período]
- [Número 3, com período]
- [Número 4, com período]

Inclua um parágrafo curto que coloque os números no contexto do negócio. Um aumento de 47% sobre uma base pequena não é o mesmo que 47% sobre uma base grande. Diga o que os números significam para quem lê.

### Citações em destaque

Duas ou três citações, cada uma com 1 a 3 frases, todas atribuídas.

> "[Citação 1, que mostra o problema ou o momento da mudança.]"
> [Nome], [Cargo], [Cliente]

> "[Citação 2, que mostra o resultado ou a sensação do resultado.]"
> [Nome], [Cargo], [Cliente]

### A lição

Um parágrafo. Não é a "moral da história". É um aprendizado que o leitor pode levar para o próprio negócio, contratando a gente ou não.

### Provas

Aponte para as provas guardadas em `/08-conteudo/PROVAS.md`.

- [ ] Captura de tela: [Caminho do arquivo]
- [ ] Painel compartilhado: [URL]
- [ ] Antes e depois: [Caminho do arquivo]
- [ ] Validação de terceiros: [Prêmio, avaliação, selo]

### Serviços usados

Aponte para `/05-oferta/OFERTA.md`.

- [Serviço 1]
- [Serviço 2]
- [Serviço 3]

### O que faríamos diferente

Um parágrafo honesto. O que subestimamos. O que tentaríamos primeiro se fizéssemos o trabalho de novo. Este parágrafo gera mais confiança do que qualquer número.

### Sobre [Cliente]

Duas ou três frases que descrevem o negócio do cliente com as palavras dele, tiradas da página "Sobre" ou de uma descrição confirmada.

### Sobre [Nome da empresa]

Texto institucional padrão de duas ou três frases. Igual em todos os cases.

### Quer ver como isso ficaria no seu negócio?

- [Botão de CTA: "Agende uma conversa de 30 minutos"]
- [Link secundário: "Leia o próximo case"]

---

## Checklist de imagens

- [ ] Imagem de capa, 2560x1440, comprimida.
- [ ] Foto da equipe ou do produto, 1600x1000.
- [ ] Par de capturas de antes e depois, com as mesmas dimensões.
- [ ] Miniatura para a página de cases, 1200x800.

## Dados estruturados

- `Article`, conforme `/07-site/DADOS-ESTRUTURADOS.md`.
- `Review`, se o case tiver uma citação de avaliação que funcione sozinha.

## Lembretes de voz

- Abra cada parágrafo com o sujeito ou com a afirmação, nunca com "nos dias de hoje...".
- Dê nome a pessoas, empresas, ferramentas e números.
- Siga as regras de pontuação de `/02-voz/VOZ.md`. Na dúvida, sem travessão.
- Linguagem simples: frases curtas e vocabulário do dia a dia do cliente, no nível de leitura definido em `/02-voz/VOZ.md`.

## Exemplo

Esboço de case da Cadência (fictício), mostrando como as primeiras seções ficam preenchidas.

- **Manchete:** "Como o Estúdio Lírio Pilates parou de cobrar mensalidade pelo WhatsApp em 60 dias"
- **Linha de apoio:** "Cobrança no Pix automático, reposição pelo app e a dona de volta à sala de aula."
- **O cliente em resumo:** Estúdio Lírio Pilates, pilates, 6 instrutoras e cerca de 180 alunos, Joinville (SC), 7 anos de mercado. Plano Estúdio da Cadência com implantação assistida, desde 2026-02-03. Contato: Renata Vieira, dona.
- **O problema:** a dona dava aula de manhã e passava a tarde no WhatsApp cobrando mensalidade atrasada e remarcando reposição numa planilha. Já tinha testado um app genérico de agenda (AgendaFit), que não fazia cobrança. O gatilho foi um mês em que a inadimplência passou de 15%.
- **Os resultados (90 dias após a ativação):** inadimplência de 18% para 6%; cerca de 10 horas por semana de recepção liberadas; reposições pelo app em vez de mensagem. `[prova: CS-001, T-001, D-001]`
- **O que faríamos diferente:** teríamos migrado os alunos para o Pix automático em duas levas, e não de uma vez, para a recepção não receber todas as dúvidas na mesma semana.

Nomes e números fictícios, só para o exemplo.

## Como passar este arquivo para um agente de IA

```text
Carregue /08-conteudo/modelos/estudo-de-caso.md, /05-oferta/OFERTA.md, /08-conteudo/PROVAS.md e /02-voz/VOZ.md antes de escrever um case.

Fluxo:
1. Reúna a matéria-prima: uma entrevista de 45 minutos com o cliente, o painel compartilhado e uma métrica principal verificada.
2. Escreva cada seção na ordem. Não pule etapas.
3. Ligue cada afirmação a uma prova, pelo ID.
4. Mantenha as citações literais.
5. Envie a versão final para o cliente revisar antes de publicar.
```

Caminhos de referência: `/08-conteudo/modelos/estudo-de-caso.md`, `/08-conteudo/PROVAS.md`, `/05-oferta/OFERTA.md`, `/02-voz/VOZ.md`.
