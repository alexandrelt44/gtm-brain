> Adaptado de `keyword-research-and-clustering` do GTM Skills (github.com/manojbajaj95/claude-gtm-plugin), licença MIT, © 2025 mbajaj. Traduzido, resumido e ajustado aos arquivos do GTM Brain. Aviso completo em `AVISOS-DE-TERCEIROS.md`.

# Priorização: as quatro notas

Cada termo ganha quatro notas de 1 a 10, que vão para as colunas `demand`, `competition`, `fit` e `opportunity` do CSV. São notas para ordenar a lista, não medidas exatas. Quando você ajustar uma nota à mão, escreva o motivo no relato da pesquisa.

## Demanda (`demand`)

Com volume medido, use a faixa:

| Buscas por mês no Brasil | Nota |
| --- | --- |
| menos de 10 | 1 |
| 10 a 49 | 2 |
| 50 a 99 | 3 |
| 100 a 249 | 4 |
| 250 a 499 | 5 |
| 500 a 999 | 6 |
| 1.000 a 2.499 | 7 |
| 2.500 a 4.999 | 8 |
| 5.000 a 9.999 | 9 |
| 10.000 ou mais | 10 |

Some 1 se a tendência em 12 meses passa de +50%. Tire 1 se cai mais de 30%.

Sem volume, dê a nota pelos sinais, de 1 a 6 no máximo: o autocomplete completa o termo (+1); aparece em "As pessoas também perguntam" (+1); a pergunta se repete em comunidades ou no suporte (+1 a +2); o Google Trends mostra interesse estável ou crescente no Brasil (+1). Diga no relato que a demanda veio de sinais.

## Competição (`competition`)

Quanto maior, mais difícil (10 é o mais difícil).

Com dificuldade da ferramenta (`kd`, de 0 a 100): comece em `kd ÷ 10`, arredondado para cima, mínimo 1. Depois ajuste pela leitura da busca, abaixo.

Sem ferramenta, ou para ajustar: abra o Google em aba anônima, região Brasil, e olhe os 10 primeiros resultados.

| Sinal | Há oportunidade se… |
| --- | --- |
| Profundidade | Os primeiros resultados são rasos (menos de mil palavras) ou genéricos |
| Data | Os primeiros resultados têm dois anos ou mais sem atualização |
| Formato | O formato não serve à busca (lista de produtos para uma dúvida, artigo para quem quer preço) |
| Quem está no topo | Há sites pequenos, fóruns ou perfis de rede social no top 10, não só portais e marcas grandes |
| Perguntas sem resposta | As perguntas de "As pessoas também perguntam" não são respondidas pelos primeiros resultados |

Sem ferramenta, a nota sai da contagem de sinais: nenhum sinal = 9; um = 7; dois = 5; três = 4; quatro = 3; cinco = 2. Com ferramenta, tire 1 ou 2 pontos se houver três sinais ou mais, e some 1 ou 2 se o topo for só de portais, marketplaces ou governo.

## Fit (`fit`)

Quanto o termo traz quem compra o que a marca vende. Leia `/01-icp/ICP.md` e `/05-oferta/OFERTA.md`.

| Nota | Quando |
| --- | --- |
| 9 a 10 | O termo nomeia o problema que a oferta resolve, para a persona primária |
| 6 a 8 | Problema vizinho da persona primária, ou o problema certo para a persona secundária |
| 3 a 5 | A persona certa com um assunto que a marca não vende, ou o assunto certo com outro público |
| 1 a 2 | Outro público (estudante, vaga de emprego, quem quer revender) |

## Oportunidade (`opportunity`)

```
oportunidade = arredondar( (demanda + (11 − competição) + fit) ÷ 3 )
```

A média das três notas, com a competição invertida (competição 2 vira facilidade 9). Se o fit for 4 ou menos, a oportunidade fica em no máximo 4: termo que traz o público errado não sobe na lista por ter volume.

Exemplo: demanda 6, competição 5, fit 9 → (6 + 6 + 9) ÷ 3 = 7.

O GTM Brain ordena a cauda longa pela oportunidade e depois pelo volume, e mostra "oportunidade N/10" na ficha do termo.

## Da nota à prioridade da tabela

| Prioridade em `PALAVRAS-CHAVE.md` | Regra |
| --- | --- |
| Alta | Oportunidade 7 ou mais e fit 7 ou mais |
| Média | Oportunidade 5 ou 6, ou fit 5 ou 6 |
| Baixa | O resto. Fica na tabela só se tiver um motivo escrito na Nota (ex.: "volume alto, mas a busca é de sistemas grandes; não vale disputar agora") |

O termo de marca (navegacional) é sempre Alta, qualquer que seja a nota.

## Faixa de volume que vale disputar

| Idade do site | Volume por mês | Competição |
| --- | --- | --- |
| Novo (até 6 meses) | 100 a 500 | Baixa (até 4) |
| Crescendo (6 a 18 meses) | 500 a 2.000 | Baixa a média (até 6) |
| Estabelecido (mais de 18 meses) | 1.000 a 10.000 | Média (até 7) |

No Brasil, nichos B2B e serviços locais têm volumes bem menores que estes. Nesses casos, um termo de 50 buscas com fit 10 vale mais que um de 5.000 com fit 4. Ajuste a faixa ao nicho e diga isso no relato.

## Vitórias rápidas

Liste à parte, no relato da pesquisa, os termos com competição até 3, fit 8 ou mais e alguma demanda. São os primeiros satélites a escrever.
