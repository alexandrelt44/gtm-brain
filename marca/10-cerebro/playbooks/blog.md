# Playbook de blog

## Propósito

O blog é o ativo que rende juros. Cada post traz tráfego de busca, alimenta as redes sociais, alimenta o email e treina as respostas de IA que hoje fazem a mediação da pesquisa do comprador. Tratamos cada post como um produto.

## Regras de formato

- **Post pilar:** 2.500 a 4.500 palavras.
- **Post satélite:** 1.000 a 2.000 palavras.
- **Abertura:** menos de 100 palavras. Nada de "nos dias de hoje".
- **Bloco de definição:** obrigatório nos pilares, dentro das primeiras 300 palavras.
- **Parágrafos:** menos de 4 frases.
- **Listas:** pelo menos uma por post.
- **FAQ:** pelo menos 3 perguntas por pilar, visíveis na página.
- **Imagens:** pelo menos uma imagem ou diagrama original a cada 800 palavras.
- **Autor:** pessoa real, com nome, e bio com schema `Person`.

## Frequência

- 1 pilar por cluster por trimestre.
- 4 a 6 satélites por cluster por trimestre.
- Toda peça nasce de um briefing tirado de `/06-seo/PALAVRAS-CHAVE.md` e é ligada em `/06-seo/CLUSTERS.md`.

## Briefing

Todo post começa com um briefing. Não pule esta etapa.

- Palavra-chave principal, de `/06-seo/PALAVRAS-CHAVE.md`.
- Nome do cluster e pilar ao qual o post pertence.
- Persona, de `/01-icp/ICP.md`.
- Etapa do funil.
- Recurso da SERP que queremos conquistar.
- Faixa de número de palavras.
- Plano de links internos.
- Plano de provas, de `/08-conteudo/PROVAS.md`.

## Estrutura

Siga `/10-cerebro/modelos/post-de-blog.md`. Este playbook acrescenta as decisões de estrutura que variam.

- Pilares são enciclopédicos. Satélites são pontuais.
- Pilares linkam para baixo. Satélites linkam para cima.
- Pilares têm sumário. Satélites não precisam.
- Pilares têm um bloco de "capítulos" no meio da página. Satélites têm um único bloco de "leia também" no final.

## Imagens e diagramas

- Todo pilar tem pelo menos um diagrama próprio que nenhum concorrente tem.
- Diagramas em SVG ou PNG de alta resolução.
- Estilo de acordo com `/03-visual/IMAGENS.md`.
- O texto alternativo descreve o que o diagrama mostra, não o nome do arquivo.

## Voz

- Modo professor.
- Frases de 12 a 18 palavras.
- Nível de leitura: quem tem ensino médio completo entende na primeira leitura.
- Nada de "alavancar", "sem atrito", "revolucionário", "disruptivo".
- Exemplos com nome, nunca genéricos.

## Publicação

- Para público B2B, publique na terça ou na quarta, a menos que os dados digam outra coisa.
- Publique de manhã, no fuso horário principal da sua audiência (no Brasil, em geral o de Brasília).
- Divulgue nas redes em até 2 horas.
- Inclua na próxima newsletter.
- Coloque as variações de reaproveitamento na fila em `/08-conteudo/BIBLIOTECA.md`.

## Ciclo de atualização

- Todo pilar é revisado a cada 6 meses.
- Todo satélite é revisado a cada 12 meses.
- Antecipe a atualização se o tráfego cair 25% de um mês para o outro, se houver mudança grande na SERP ou se um dado citado ficar desatualizado.

## Padrões proibidos

- Parágrafos de abertura que começam com "nos dias de hoje", "em uma era" ou "em um mundo".
- Listas de 10 a 15 itens que diluem o argumento.
- Título "Conclusão" no final. Só termine.
- Posts rasos de "guia definitivo" com menos de 1.500 palavras.
- Imagem de capa genérica de banco de imagens.
- Excesso de palavra-chave.

## Critérios de qualidade antes de publicar

- [ ] Briefing aprovado.
- [ ] Estrutura (outline) aprovada.
- [ ] Rascunho passa nas regras de voz e terminologia.
- [ ] Rascunho passa no checklist de GEO/AEO de `/06-seo/GEO-AEO.md`.
- [ ] Schema aplicado conforme `/07-site/DADOS-ESTRUTURADOS.md`.
- [ ] Links internos ligados.
- [ ] Imagem OG gerada.
- [ ] Registrado em `/08-conteudo/BIBLIOTECA.md`.

## Exemplo: briefing de pilar

### Pilar da Cadência

- Palavra-chave principal: "sistema para estúdio de pilates"
- Cluster: gestão de estúdio de pilates
- Persona: dona de estúdio que dá aula e administra, 1 unidade, de 80 a 200 alunos
- Etapa do funil: descoberta para consideração
- Recurso da SERP: citação na visão geral criada por IA do Google + bloco "As pessoas também perguntam"
- Tamanho: 3.200 a 3.800 palavras
- Links internos: 6 satélites ("agenda para estúdio de pilates", "controle de presença pilates", "como diminuir inadimplência em academia" e outros 3) + página do plano Estúdio + página de demonstração
- Provas: 1 case (`CS-001`, Estúdio Lírio Pilates), 1 depoimento (`T-001`), 3 dados próprios da base de clientes (`D-001` a `D-003`)

A Cadência, o estúdio e os IDs são fictícios.

## Como passar este arquivo para um agente de IA

```text
Carregue /10-cerebro/playbooks/blog.md, /10-cerebro/modelos/post-de-blog.md, /06-seo/PALAVRAS-CHAVE.md, /06-seo/CLUSTERS.md, /06-seo/GEO-AEO.md e /08-conteudo/PROVAS.md.

Produza um briefing de uma página. Peça aprovação humana. Depois faça a estrutura (outline). Peça aprovação humana. Só então escreva o rascunho.

Não pule o briefing nem a estrutura, nem mesmo para um satélite.

Escreva em português do Brasil. Entregue o rascunho com o checklist de GEO/AEO preenchido e uma nota sobre o que falta para publicar.
```

Caminhos de referência: `/10-cerebro/playbooks/blog.md`, `/10-cerebro/modelos/post-de-blog.md`, `/06-seo/CLUSTERS.md`, `/08-conteudo/BIBLIOTECA.md`.
