# Modelo de post social

Um modelo de preencher lacunas para um único post em rede social. Serve para LinkedIn, X, Threads ou uma legenda curta de Instagram. A frequência de cada canal fica nos playbooks.

## Como os agentes usam este modelo

1. Carregue `/10-cerebro/playbooks/[canal].md` para as regras do canal.
2. Carregue `/01-icp/ICP.md` e `/01-icp/VOZ-DO-CLIENTE.md` para o público.
3. Carregue `/02-voz/VOZ.md` para as regras de frase.
4. Carregue `/09-dados/DESTAQUES.md` para os padrões de gancho que funcionam.

## Variáveis

| Variável | Fonte |
| --- | --- |
| `{{GANCHO}}` | Tirado de `/01-icp/VOZ-DO-CLIENTE.md` |
| `{{IDEIA}}` | Tirada de um post de destaque ou de uma nota de campo |
| `{{PROVA}}` | `/08-conteudo/PROVAS.md` |
| `{{CTA}}` | `/07-site/MAPA-DO-SITE.md` |

---

## Formato do post

A maioria dos posts de alto desempenho segue este formato em cinco partes.

1. **Gancho (1 a 2 frases):** para a rolagem. Em geral, uma afirmação, um número surpreendente ou o problema do leitor dito sem rodeio.
2. **Contexto (1 a 3 frases):** para quem é, o que acabou de acontecer ou por que isso importa agora.
3. **Ideia (3 a 6 frases):** a ideia. O ensino. O porquê.
4. **Prova (1 a 2 frases):** um exemplo com nome, um dado com fonte, uma frase de cliente.
5. **CTA (1 frase):** assinar, comentar, link no primeiro comentário.

## Variante LinkedIn (3 posts por semana)

- Tamanho: 120 a 180 palavras.
- Sem travessão, sem hashtag no corpo, no máximo 3 a 5 hashtags no final, ou nenhuma.
- Uma imagem ou vídeo nativo.
- A primeira linha prende o leitor antes do "ver mais".

```
{{GANCHO}}

{{FRASE_DE_CONTEXTO_1}}
{{FRASE_DE_CONTEXTO_2}}

O que eu aprendi:

{{FRASE_DA_IDEIA_1}}
{{FRASE_DA_IDEIA_2}}
{{FRASE_DA_IDEIA_3}}

{{PROVA}}

{{CTA}}
```

## Variante X: post curto

- 200 a 270 caracteres.
- Sem emojis.
- Ou se sustenta sozinho, ou é o primeiro post de um fio.

```
{{GANCHO}}

{{IDEIA_EM_UMA_LINHA}}

{{PROVA}}
```

## Variante X: fio (8 a 12 posts)

- Post 1: o gancho, 200 a 270 caracteres, termina prometendo o resto.
- Post 2: "Explico."
- Posts 3 a 9: uma ideia por post, numeradas.
- Post 10: a prova.
- Post 11: o CTA, para um link ou para "siga para ver mais assim".
- Post 12: opcional, um pedido leve para repostar o primeiro post.

## Variante legenda de Instagram

- 125 a 180 palavras para post de imagem única.
- Os primeiros 125 caracteres carregam o gancho, porque aparecem antes do "mais".
- Use quebras de linha simples entre parágrafos curtos.
- 3 a 5 hashtags específicas no final.

## Variante carrossel e Reels do Instagram

Carrossel, Reels, stories, bio e destaques têm formato próprio. Use `/10-cerebro/playbooks/instagram.md`, e não este modelo.

## Padrões de gancho que funcionam

Garimpe os vencedores atuais em `/09-dados/DESTAQUES.md`. Esta é a biblioteca inicial.

1. "Quase todo `{{PAPEL}}` que eu conheço tem este problema: `{{DOR}}`."
2. "`{{NUMERO}}`% dos `{{SEGMENTO}}` fazem `{{COISA}}` do jeito errado. A correção é esta."
3. "Eu achava que `{{CRENCA_ANTIGA}}`. Até que uma cliente me ligou e disse: `{{CITACAO}}`."
4. "O que ninguém te conta sobre `{{TEMA}}` é que `{{AFIRMACAO_CONTRARIA}}`."
5. "Este é um modelo que eu queria ter tido três anos atrás."
6. "Revisei `{{N}}` `{{ARTEFATOS}}` esta semana. Isto é o que estava quebrado."

## Padrões de gancho a evitar

- "Só queria compartilhar uma coisa que..."
- "10 formas de..."
- "É com humildade que anuncio..."
- "Muito feliz em compartilhar..."
- "No cenário em constante mudança de hoje..."

## Checklist antes de publicar

- [ ] O gancho passa no teste da rolagem quando lido no celular.
- [ ] Corpo dentro do limite de tamanho do canal.
- [ ] Um CTA claro.
- [ ] Prova citada.
- [ ] Regras de voz e terminologia seguidas.
- [ ] Imagem ou vídeo de acordo com `/03-visual/IMAGENS.md`.
- [ ] Link de medição com UTMs conforme `/09-dados/PLANO-DE-MEDICAO.md`.
- [ ] Registrado em `/08-conteudo/BIBLIOTECA.md`.

## Exemplo: post no LinkedIn

```
Quase toda gestora de rede de estúdios com quem eu converso tem a mesma frustração.

Ela fecha o mês juntando a planilha de cada unidade e ainda não sabe qual unidade dá lucro.

O que aprendi depois de implantar a Cadência em dezenas de redes:

Se você precisa de três dias para saber quanto entrou, você não está gerindo a rede. Está fazendo contabilidade atrasada.

Três coisas resolvem isso.

Um. Cobrança no mesmo sistema da agenda, em todas as unidades.
Dois. Presença e reposição ligadas ao aluno, não à planilha da recepção.
Três. Um painel que mostra receita, atraso e ocupação por unidade, sem ninguém montar.

Na Rede Núcleo Funcional, em Goiânia, com 4 unidades, o fechamento do mês caiu de 3 dias para meio dia.

Se você gere mais de uma unidade, comente "painel" que eu te mando o modelo de relatório que elas usam.
```

A Cadência, a Rede Núcleo Funcional e os números são fictícios.

## Como passar este arquivo para um agente de IA

```text
Carregue /10-cerebro/modelos/post-social.md e o /10-cerebro/playbooks/[canal].md correspondente.

Escreva o post em português do Brasil, seguindo o formato, o tamanho e as regras de voz do canal.

Rode o checklist antes de publicar. Entregue o post pronto para agendar.
```

Caminhos de referência: `/10-cerebro/modelos/post-social.md`, `/10-cerebro/playbooks/`, `/01-icp/ICP.md`, `/01-icp/VOZ-DO-CLIENTE.md`, `/02-voz/VOZ.md`, `/09-dados/DESTAQUES.md`.
