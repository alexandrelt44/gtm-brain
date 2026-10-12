> Adaptado de `product-market-fit-analysis` do GTM Skills (github.com/manojbajaj95/claude-gtm-plugin), licença MIT, © 2025 mbajaj. Traduzido, resumido e ajustado aos arquivos do GTM Brain. Aviso completo em `AVISOS-DE-TERCEIROS.md`.

# Escolher a persona primária pelo encaixe por segmento

A persona primária não é o cliente médio nem o cliente que a marca gostaria de ter. É o segmento em que o produto ou serviço já funciona melhor. O encaixe com o mercado acontece por segmento, não no mercado inteiro: uma marca pode ter encaixe forte com clínicas pequenas e fraco com redes, ao mesmo tempo.

## 1. Corte a base em segmentos

Use os cortes que fazem sentido para a marca, um ou dois de cada vez:

- porte (funcionários ou faturamento);
- setor ou nicho;
- caso de uso (para que compram);
- região;
- quem compra (dono, gerente, área).

Com menos de 10 clientes, não corte. Trate todos como um segmento e sele a persona como `[HIPÓTESE]` onde faltar dado.

Com muitos clientes e nenhum corte por segmento nas fontes (o painel dá o total, o CRM não tem campo de segmento), não invente o corte. Duas saídas, nesta ordem:

1. Peça um export do CRM ou da base com os campos de segmento (porte, nicho, região, plano) e com retenção ou cancelamento por cliente. (Recomendado.)
2. Se o export não existe agora, escolha o segmento com a pessoa e o que as fontes mostram (negócios ganhos, entrevistas), e sele a escolha como `[HIPÓTESE]`, com o motivo e o que a confirmaria: "`[HIPÓTESE]` estúdio único como primária: 2 de 3 ganhos e a escolha da dona; confirmar com retenção por segmento `[PENDENTE: export do CRM com segmento]`".

## 2. Compare os sinais de encaixe

Para cada segmento, veja quantos destes sinais aparecem. O segmento com mais sinais é a candidata a persona primária.

| Sinal | Como medir | Onde achar |
| --- | --- | --- |
| Ficam | Retenção que estabiliza depois de alguns meses, em vez de cair até zero. Veja 30, 90 e 180 dias, ou o equivalente para serviços (renovação de contrato). | Painel do produto, CRM, financeiro |
| Sentiriam falta | Pesquisa de Sean Ellis (abaixo): 40% ou mais respondem "muito decepcionado". | Pesquisa com clientes ativos |
| Indicam | Clientes que aceitam dar referência ou que trouxeram outro cliente. Para B2B, de seis a oito referências já é um bom sinal. | CRM (origem "indicação"), time de vendas |
| Puxam | O cliente conduz o próximo passo: pergunta preço, prazo, como começar. Não é só interesse educado. | Calls, e-mails de venda |
| Reclamam quando falha | Quando algo para, o cliente percebe rápido e reclama. Se ninguém nota, o problema resolvido não é central. | Suporte |
| Fecham rápido | Ciclo de venda menor que o dos outros segmentos. | CRM |

## 3. A pesquisa de Sean Ellis

Mande só para clientes ativos que usaram de verdade (por exemplo, há pelo menos um mês). Em português:

1. Como você se sentiria se não pudesse mais usar [produto ou serviço]? Opções: muito decepcionado; um pouco decepcionado; não faria diferença.
2. Que tipo de pessoa ou empresa você acha que mais aproveitaria [produto ou serviço]?
3. Qual é o principal benefício que você tem com [produto ou serviço]?
4. O que poderia ser melhor?

Como ler:

- Separe as respostas por segmento. A porcentagem de "muito decepcionado" por segmento importa mais que a geral.
- Leia com atenção quem respondeu "muito decepcionado". As respostas 2 e 3 desse grupo descrevem a persona primária e o resultado que ela valoriza, com as palavras dela. Copie para a biblioteca da voz do cliente como `[LITERAL]`.
- Não otimize para quem respondeu "um pouco decepcionado". É ali que a marca se perde tentando agradar a todos.
- Com menos de 30 respostas por segmento, trate o número como direção, não como prova: `[OBSERVADO]`, não `[COMPROVADO]`.

## 4. Perguntas de diagnóstico para a pessoa

Quando não houver dados para medir, faça estas perguntas. Elas viram opções na rodada 1 da skill.

1. Se os clientes não pudessem mais usar a marca, quais sentiriam mais falta?
2. Que clientes ficam mais tempo, e que clientes cancelam primeiro?
3. Quem aceitaria falar bem da marca para um colega, hoje, sem pedir nada em troca?
4. Em que tipo de cliente é o comprador que corre atrás do próximo passo, e em qual é a marca que precisa empurrar?
5. Em que segmento o encaixe é mais forte, e como você sabe?

## 5. Do diagnóstico para o ICP.md

| Situação | Como escrever |
| --- | --- |
| Um segmento com vários sinais medidos | `## Persona primária: …` com `[COMPROVADO]` nos campos que vêm da medição |
| Um segmento com sinais vistos, mas não medidos | `## Persona primária: …` com `[OBSERVADO]` e a fonte de cada observação |
| Segundo segmento com sinais próprios | `## Persona secundária: …` |
| Segmento que a marca quer atacar, sem sinal ainda | `## Persona hipótese: …`, com `[HIPÓTESE]` e o que confirmaria a aposta (por exemplo, "a confirmar com as primeiras 20 contas desse perfil") |
| Nenhum dado, marca nova | Persona primária com `[HIPÓTESE]` e plano de entrevistas (`roteiro-de-entrevista.md`) |

## 6. Erros comuns

- Confundir pico de lançamento com encaixe. O que conta é quem fica.
- Confundir tamanho de mercado com encaixe. Mercado grande não quer dizer que o produto serve para ele.
- Escolher o segmento que paga mais quando ele cancela mais. O que paga mais e fica é melhor; o que paga mais e sai custa caro.
- Ignorar a retenção porque as vendas vão bem.
- Fazer da persona primária uma soma de segmentos. Uma persona, um segmento.
