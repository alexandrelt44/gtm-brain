# Modelo de post de blog

Um modelo de preencher lacunas para conteúdo editorial longo. Serve para posts pilares (2.500 a 4.500 palavras) e satélites (1.000 a 2.000 palavras).

## Como os agentes usam este modelo

1. Carregue `/06-seo/PALAVRAS-CHAVE.md` para escolher `{{PALAVRA_CHAVE_PRINCIPAL}}` e as palavras-chave secundárias.
2. Carregue `/06-seo/CLUSTERS.md` para confirmar o cluster.
3. Carregue `/06-seo/GEO-AEO.md` para as regras de entidade e de definição.
4. Carregue `/01-icp/ICP.md` e `/01-icp/VOZ-DO-CLIENTE.md` para o público e a linguagem.
5. Carregue `/02-voz/VOZ.md` para as regras de frase e de formato.
6. Carregue `/08-conteudo/PROVAS.md` para as provas.
7. Carregue `/07-site/DADOS-ESTRUTURADOS.md` para o schema obrigatório.

## Variáveis

| Variável | Fonte |
| --- | --- |
| `{{H1}}` | Palavra-chave principal escrita como a busca real do comprador |
| `{{PALAVRA_CHAVE_PRINCIPAL}}` | `/06-seo/PALAVRAS-CHAVE.md` |
| `{{PALAVRAS_CHAVE_SECUNDARIAS}}` | `/06-seo/PALAVRAS-CHAVE.md` |
| `{{ENTIDADE}}` | A entidade principal de que o post trata |
| `{{DEFINICAO}}` | Definição de 40 a 60 palavras |
| `{{SECAO_1}}` a `{{SECAO_N}}` | Estrutura das seções |
| `{{PROVA_1}}` a `{{PROVA_N}}` | `/08-conteudo/PROVAS.md` |
| `{{FAQ_P_1}}` a `{{FAQ_P_5}}` | Perguntas comuns do leitor |
| `{{NOME_DO_AUTOR}}` | Autor real |
| `{{TEXTO_DO_CTA}}` | `/07-site/MAPA-DO-SITE.md` |
| `{{URL_DO_CTA}}` | `/07-site/MAPA-DO-SITE.md` |

---

## Front matter (para um CMS em Markdown)

```yaml
titulo: "{{H1}}"
slug: "{{SLUG}}"
descricao: "{{META_DESCRIPTION}}"
palavra_chave_principal: "{{PALAVRA_CHAVE_PRINCIPAL}}"
palavras_chave_secundarias: [{{PALAVRAS_CHAVE_SECUNDARIAS}}]
cluster: "{{CLUSTER}}"
persona: "{{NOME_DA_PERSONA}}"
etapa: "{{ETAPA_DO_FUNIL}}"
autor: "{{NOME_DO_AUTOR}}"
publicado: "{{DATA_DE_PUBLICACAO}}"
atualizado: "{{DATA_DE_ATUALIZACAO}}"
imagem_de_capa: "/assets/blog/{{SLUG}}.jpg"
```

Se o seu CMS espera os nomes dos campos em inglês (`title`, `description`, `author` etc.), troque só as chaves e mantenha os valores.

## Estrutura

### H1

`{{H1}}` escrito como uma busca real do comprador. Menos de 70 caracteres.

### Abertura (primeiras 100 palavras)

- Frase 1: nomeie o leitor. Nomeie o problema.
- Frase 2: diga o que o artigo promete.
- Frases 3 a 5: antecipe a recompensa.

Não comece com "nos dias de hoje", "em uma era", "em um mundo" nem nenhuma variação.

### Bloco de definição

Nos posts pilares, inclua dentro das primeiras 300 palavras.

```
### O que é {{ENTIDADE}}?

{{DEFINICAO}} em 40 a 60 palavras. Linguagem simples. Uma frase que nomeia a entidade. Uma frase que liga a entidade ao problema do leitor. Uma frase que a diferencia de conceitos vizinhos.
```

### Sumário (para pilares com mais de 2.000 palavras)

Um sumário visível. De três a sete seções.

### Seções do corpo

Para pilar:

- Seção 1: o problema, nomeado com detalhes.
- Seção 2: o conceito, explicado de forma simples.
- Seção 3: o método, passo a passo.
- Seção 4: a prova, com clientes nomeados.
- Seção 5: o contra-argumento, enfrentado de frente.
- Seção 6: o checklist ou método que o leitor leva embora.

Para satélite:

- Seção 1: a pergunta, reformulada e mais específica.
- Seção 2: a resposta, direta.
- Seção 3: os três motivos pelos quais a resposta importa.
- Seção 4: o exemplo, específico e com fonte.

Cada seção:

- Abre com uma afirmação.
- Usa parágrafos curtos (menos de 4 frases).
- Tem pelo menos uma lista com marcadores ou numerada.
- Tem pelo menos uma prova citada.
- Tem pelo menos um link interno para cima (pilar) ou para o lado (satélite irmão).

### Seção de provas

Tire de `/08-conteudo/PROVAS.md`. Cite pelo nome.

- Depoimento de cliente com atribuição completa.
- Referência a case, com ID e link.
- Dado do setor com fonte e data.

### Seção de perguntas frequentes

Cinco perguntas. Respostas de 40 a 80 palavras. Ligue ao schema `FAQPage`.

### Bloco do autor

Autor com nome, foto e link para a bio com schema `Person`.

### Bloco de CTA

Um CTA principal. Link para o caminho de conversão de `/07-site/MAPA-DO-SITE.md`.

### Leia também

Três links. Um para o pilar. Dois para satélites irmãos do mesmo cluster.

## Metadados

- **Title tag:** 50 a 60 caracteres, palavra-chave principal perto do começo.
- **Meta description:** 140 a 155 caracteres.
- **Imagem OG:** 1200x630, gerada a partir de `/03-visual/PROMPTS-DE-IMAGEM.md`.
- **URL canônica:** a única URL publicada, sem parâmetros.

## Schema

Inclua `Article` ou `BlogPosting`, mais `FAQPage` quando houver a seção de perguntas frequentes, mais `BreadcrumbList`.

## Checklist de GEO/AEO

- [ ] O H1 nomeia a entidade.
- [ ] Bloco de definição de 40 a 60 palavras nas primeiras 300 palavras.
- [ ] Pelo menos uma resposta direta posicionada para ser extraída pelas visões gerais de IA.
- [ ] Pelo menos uma lista numerada.
- [ ] Pelo menos três perguntas frequentes respondidas.
- [ ] Todo dado cita a fonte no próprio texto.
- [ ] Autor com nome e schema `Person` verificado.
- [ ] Data da última atualização visível.

## Checklist antes de publicar

- [ ] Palavra-chave principal no H1, nas primeiras 100 palavras e na meta description.
- [ ] Dois links internos para satélites irmãos.
- [ ] Link para o pilar, no caso de satélites.
- [ ] Pelo menos uma prova citada.
- [ ] Regras de voz e terminologia seguidas.
- [ ] Pontos de compliance conferidos.
- [ ] Schema validado.
- [ ] Marcação de medição nos CTAs.
- [ ] Registrado em `/08-conteudo/BIBLIOTECA.md`.
- [ ] Revisado por um editor humano.

## Exemplo

Começo de um pilar da Cadência, com as variáveis preenchidas. Para outros exemplos preenchidos, veja `/08-conteudo/BIBLIOTECA.md`.

```yaml
titulo: "Sistema para estúdio de pilates: como escolher o certo"
slug: "sistema-para-estudio-de-pilates"
descricao: "Como escolher um sistema para estúdio de pilates: agenda, cobrança recorrente, reposição de aulas e números para decidir. Com checklist e exemplos."
palavra_chave_principal: "sistema para estúdio de pilates"
palavras_chave_secundarias: ["agenda para estúdio de pilates", "controle de presença pilates"]
cluster: "gestão de estúdio de pilates"
persona: "Dona de estúdio que dá aula e administra"
etapa: "consideração"
autor: "Marina Duarte"
```

Abertura:

> Se você dá aula de manhã e cobra aluna pelo WhatsApp à tarde, este guia é para você. Ele mostra o que um sistema para estúdio de pilates precisa resolver, em que ordem olhar cada recurso e como comparar opções sem cair em demonstração bonita. No fim, tem um checklist de 12 itens para levar para qualquer conversa com fornecedor.

Bloco de definição:

> **O que é um sistema para estúdio de pilates?** É um software que reúne agenda de aulas, cobrança recorrente e controle de presença num lugar só. Ele tira da recepção o trabalho de marcar, cobrar e repor aula. É diferente de um app genérico de agenda, que marca horário mas não cobra nem acompanha falta e reposição.

A Cadência, a Marina e o conteúdo do exemplo são fictícios.

## Como passar este arquivo para um agente de IA

```text
Carregue /10-cerebro/modelos/post-de-blog.md e os arquivos de apoio listados no início.

Escolha o tamanho de pilar ou de satélite.
Preencha toda {{VARIÁVEL}}.
Escreva em português do Brasil, de cima para baixo.
Rode os checklists de GEO/AEO e de antes de publicar.
Entregue um rascunho pronto para a revisão do editor.
```

Caminhos de referência: `/10-cerebro/modelos/post-de-blog.md`, `/06-seo/PALAVRAS-CHAVE.md`, `/06-seo/CLUSTERS.md`, `/06-seo/GEO-AEO.md`, `/08-conteudo/PROVAS.md`, `/07-site/DADOS-ESTRUTURADOS.md`.
