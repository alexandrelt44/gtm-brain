---
name: fechar-lacunas
description: 'Fecha as lacunas de qualquer arquivo de uma marca no GTM Brain. Lê o relatório de lacunas (fichas incompletas, provas citadas sem definição, exemplo do template que ficou, contradições, instruções esquecidas, pendências), agrupa por arquivo, pesquisa nas fontes, pergunta só o que falta e grava com selos e fontes. Resolve marcas [CONTRADIZ: …] perguntando qual lado vale. Também preenche as camadas sem skill própria: identidade visual, imagens e prompts de imagem (03-visual), design system com theme.json e tokens.css (04-design-system) e a biblioteca de conteúdo (08-conteudo/BIBLIOTECA.md). Use quando a pessoa disser "fechar lacunas", "o que falta", "campos pendentes", "completar fichas", "resolver contradição", "tirar as pendências", "identidade visual", "cores e fontes da marca", "design system", "biblioteca de conteúdo" ou quando o relatório de lacunas mandar para esta skill.'
---

# Fechar lacunas

Você pega o que o relatório de lacunas aponta e fecha, arquivo por arquivo: o que as fontes respondem entra com a fonte citada, o que só a pessoa sabe vira pergunta, e o que ainda não existe fica marcado como pendente, dizendo o que falta e onde conseguir.

Leia antes: [`../gtm-brain/referencias/regras.md`](../gtm-brain/referencias/regras.md). Aqui está só o que é específico de fechar lacunas.

O método é sempre o mesmo: **listar → pesquisar → perguntar o mínimo → escrever com selo e fonte → rodar `lacunas` de novo.**

## Quando esta skill, quando outra

| Situação | Quem faz |
| --- | --- |
| Arquivo inteiro em template, de uma camada com skill própria (ICP, voz, oferta, concorrência, provas, SEO, plano) | A skill da camada. Ela tem o método completo |
| Campo faltando ou pendente num arquivo já preenchido, de qualquer camada | Esta skill |
| Contradição `[CONTRADIZ: …]` | Esta skill |
| Prova citada sem definição | `registrar-provas`. Se a pessoa já tem o material da prova à mão, registre seguindo as regras daquela skill e volte |
| `03-visual/`, `04-design-system/`, `08-conteudo/BIBLIOTECA.md` | Esta skill, com as referências abaixo |

## 1. Ler o relatório

Dentro de `brain/`, rode `node src/lacunas.mjs --marca <pasta>`. Com `--json`, os mesmos dados saem com as chaves entre parênteses abaixo. Percorra o relatório seção por seção, na ordem em que ele aparece:

1. **Tabela de camadas e "Próximo passo"** (`layers`, `next`). Quantos arquivos de cada camada estão preenchidos e qual arquivo atacar primeiro. Situa a pessoa; não é lacuna.
2. **Arquivos ainda em template** (`toFill`). Arquivo de camada com skill própria vai para a skill indicada ao lado. Os que apontam para `fechar-lacunas` (visual, design system, biblioteca) são seus: seção 7.
3. **Fichas incompletas** (`incomplete`). Registro de arquivo preenchido com campo que falta (`missing`) ou pendente (`pending`), com arquivo e linha. Só registros com campos esperados aparecem aqui (personas, ofertas, concorrentes, provas, negócios). Arquivo de documento nunca aparece, por mais incompleto que esteja.
4. **Provas citadas sem definição** (`undefinedProofs`). ID citado num arquivo preenchido e não definido em `/08-conteudo/PROVAS.md`. Vai para `registrar-provas`.
5. **Exemplo do template que ficou no arquivo** (`residue`). Linhas copiadas do template que falam da Cadência, a marca fictícia dos exemplos. Reescreva com o conteúdo da marca, das fontes, ou apague. Só pega a linha idêntica à do template: exemplo editado pela metade não aparece.
6. **Contradições** (`marks` com `kind: 'contradiz'`). Linhas com `[CONTRADIZ: …]`. Seção 5.
7. **Instruções do template nos arquivos preenchidos** (`marks` com `kind: 'instrução'`). Colchete com instrução em minúsculas que ficou para trás. Troque pelo conteúdo ou por uma pendência explícita. Selos, tags de fonte, `[x]`, `[PENDENTE: …]`, `[CONTRADIZ: …]` e o que está entre crases não contam.
8. **Pendências nos arquivos preenchidos** (`marks` com `kind: 'pendente'`). `[PENDENTE: …]`, `(pendente)`, "a confirmar" e placeholders. Pendência de hipótese ("a confirmar com as primeiras 20 contas") espera dado que ainda não existe: não pergunte, deixe como está, a não ser que a pessoa traga o dado.
9. **Hipóteses e propostas em aberto** (`hypotheses`). Quantas cada arquivo carrega. Não são lacunas.

O relatório não vê duas coisas. Confira à mão:

- **Arquivos que não são `.md`.** `theme.json`, `tokens.css` e `04-design-system/specs/` ficam fora.
- **Valores padrão do template.** As cores hex, as fontes das pilhas de fallback e todo o `theme.json` do template são exemplos e parecem reais. Veja `referencias/visual-e-design.md`.

## 2. Montar a lista de trabalho

Agrupe tudo por arquivo e classifique cada lacuna:

- **A. As fontes respondem.** Outro arquivo da marca, o site, um material da lista `Fontes da marca:` do `CEREBRO.md`. Preencha e cite.
- **B. Só a pessoa sabe.** Vira pergunta.
- **C. Depende de algo que ainda não existe** (um case em produção, uma medição futura, uma assinatura). Mantenha a marca e deixe-a específica: o que falta, quem tem, quando.
- **D. É de outra skill.** Passe adiante (tabela acima).

Ordem: contradições e exemplo do template primeiro (informação errada se espalha para os textos), depois fichas incompletas e instruções esquecidas, na ordem do relatório, depois pendências, depois os arquivos em template das camadas sem skill.

Mostre à pessoa a lista resumida, por arquivo, com a contagem de A, B, C e D. Pergunte por onde começar: a ordem do relatório (Recomendado) ou um arquivo que ela precisa agora.

## 3. Pesquisar

Antes de perguntar, procure nos lugares onde a resposta costuma estar:

- **Outros arquivos da marca.** O campo "Comitê de compra" de uma persona costuma estar em `/01-icp/COMITE-DE-COMPRA.md`; o preço que falta numa oferta pode estar num negócio de `/05-oferta/GANHOS-E-PERDAS.md`; a cor da marca pode estar no CSS do site. Busque o termo em toda a pasta antes.
- **O site da marca** e os perfis públicos (Instagram, LinkedIn, Google, Reclame Aqui).
- **Os materiais da pessoa:** transcrições, CRM, notas, propostas.

Guarde de onde veio cada resposta. Se a fonte é nova, defina a tag no topo do arquivo (regras, seção 4).

## 4. Perguntar o mínimo

Uma rodada por arquivo, ou por tema quando várias lacunas pedem a mesma resposta. No máximo 3 ou 4 perguntas por rodada.

- Cada pergunta diz **onde a lacuna está** e **o que já se sabe**: "Na persona secundária, falta o comitê de compra. O ICP diz que ela decide sozinha; o arquivo do comitê não fala dela."
- As opções vêm preenchidas com o que você inferiu, a recomendada primeiro, marcada "(Recomendado)".
- A última opção é sempre **"Ainda não sei"**: a lacuna fica pendente, com o que falta e onde conseguir.
- Não pergunte o que já está em outro arquivo. Se dois arquivos discordam, isso é uma contradição (seção 5), não uma pergunta aberta.

Formato de uma pergunta, quando não há ferramenta de perguntas:

```text
1. /05-oferta/OFERTA.md, Oferta 2, campo Preço: está "a confirmar". As duas últimas
   propostas ganhas em GANHOS-E-PERDAS.md foram fechadas por R$ 4.800.
   a) R$ 4.800 por projeto, preço de tabela (Recomendado)
   b) A partir de R$ 4.800, varia com o escopo
   c) Outro valor (diga qual)
   d) Ainda não sei: fica pendente, a definir na próxima proposta
```

## 5. Resolver contradições

1. Mostre os dois lados, com arquivo, linha e o trecho exato de cada um.
2. Pergunte qual vale:
   - o lado A (Recomendado, se ele tem prova `[COMPROVADO]` ou é o mais recente);
   - o lado B;
   - os dois, em contextos diferentes (aí cada arquivo diz o seu contexto, e não há mais contradição);
   - nenhum: há um dado novo.
3. Corrija o lado errado **em todos os lugares** onde ele aparece. Busque a frase e o número na pasta inteira, não só na linha marcada.
4. Tire a marca `[CONTRADIZ: …]`. Se a correção registrou um fato novo (a entrega leva dez dias, não sete), cite a fonte ao lado.
5. Se o lado certo é o menos favorável e uma promessa pública depende do errado (site, proposta, anúncio), avise a pessoa e deixe `[PENDENTE: corrigir a promessa em <página>]` no arquivo da oferta.

## 6. Escrever

- **Quase sempre o arquivo já está preenchido.** Então, com o servidor do GTM Brain rodando, proponha cada fechamento como sugestão no editor; sem servidor, edite direto e mostre o diff (regras, seção 5). Uma sugestão por registro.
- Troque só o trecho da lacuna. Mantenha os títulos e os rótulos dos campos.
- Selo e fonte em toda resposta: `[CONVERSA AAAA-MM-DD]` para o que a pessoa disse, `[PROPOSTA]` para o que você deduziu e ela não confirmou.
- **Tire a marca de pendência só quando a lacuna fechou.** Fechou em parte: reescreva a marca dizendo o que ainda falta.
- Atualize `Última atualização` do arquivo.

## 7. Camadas sem skill própria

- **`03-visual/` e `04-design-system/`:** [`referencias/visual-e-design.md`](referencias/visual-e-design.md). Do site ou do manual da marca para cores em hex, fontes, uso do logo, direção de imagem, prompts; depois os tokens.
- **`08-conteudo/BIBLIOTECA.md`:** [`referencias/biblioteca.md`](referencias/biblioteca.md). Inventário do que a marca já publicou.
- **Qualquer outro arquivo que o relatório mande para cá:** leia `## Como usar este arquivo` do próprio template, preencha das fontes, pergunte o resto, com o mesmo método.

## 8. Verificar

1. Rode `lacunas` de novo. Compare com a lista de trabalho: cada lacuna fechada sumiu do relatório; cada lacuna do tipo C continua lá, com o texto novo.
2. Nos arquivos que você mexeu, nenhuma linha sobra em "Exemplo do template que ficou no arquivo" nem em "Instruções do template nos arquivos preenchidos".
3. Se mexeu no `theme.json`, confira que ele abre: `node -e "JSON.parse(require('fs').readFileSync('<pasta>/04-design-system/theme.json','utf8'))"`.
4. Atualize `## Status das camadas` no `CEREBRO.md` se uma camada mudou de estado.
5. Diga à pessoa, em poucas linhas: quantas lacunas fechou, quais ficaram pendentes e por quê, e qual é o próximo arquivo.

## Armadilhas

- **Apagar a marca para limpar o relatório.** Pendência honesta vale mais que campo inventado. O relatório limpo não é o objetivo; a marca certa é.
- **Responder pela pessoa.** Uma resposta plausível que ninguém confirmou entra como `[PROPOSTA]`, nunca como fato.
- **Corrigir um lado da contradição num lugar só.** O número errado costuma estar repetido em três arquivos e numa página do site.
- **Deixar as cores e fontes do template** como se fossem da marca. Toda cor e toda fonte tem fonte citada ou fica pendente.
- **Tratar hipótese como lacuna.** `[HIPÓTESE]` é aposta marcada; só muda quando chega dado.
- **Perguntar demais.** Se a rodada passou de quatro perguntas, você não pesquisou o suficiente ou juntou arquivos demais.
- **Copiar o exemplo da Cadência.** Ele mostra o formato; o conteúdo é inventado. Nenhuma data, número, nome, recurso ou status do exemplo vai para a marca (regras, seção 3).
