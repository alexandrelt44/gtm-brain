> Adaptado de `pricing-strategy` do GTM Skills (github.com/manojbajaj95/claude-gtm-plugin), licença MIT, © 2025 mbajaj. Traduzido, resumido e ajustado aos arquivos do GTM Brain. Aviso completo em `AVISOS-DE-TERCEIROS.md`.

# Preço, pacotes e desconto

Use este método para preencher `### Preço` de cada oferta, `## Pacotes` e `## Princípios de preço` em `05-oferta/OFERTA.md`. O trabalho aqui é **documentar o preço que a marca pratica** e deixar claro o que é público e o que é interno. Se a pessoa quiser mudar o preço, o método ajuda a pensar, mas a decisão é dela, e o novo preço só entra no arquivo depois de decidido.

## Os três eixos

Todo preço tem três partes. Registre as três.

1. **Pacote:** o que entra em cada nível.
2. **Métrica de valor:** pelo que se cobra (por mês, por usuário, por unidade, por projeto, por transação).
3. **Valor:** quanto.

## Onde o preço deve ficar

Preço por valor fica entre duas linhas:

- **Piso:** a próxima melhor alternativa do cliente (o concorrente, a planilha, contratar alguém). Abaixo disso, a marca deixa dinheiro na mesa. O custo para servir também é piso, mas é dado interno e não entra no arquivo.
- **Teto:** o valor que o cliente percebe.

Para estimar o valor percebido, use a conta abaixo com números das provas e do ICP. Ela também serve para os "Resultados esperados" e para o battle card de "não fazer nada" em `CONCORRENCIA.md`.

```text
Tempo poupado:       horas por semana × custo da hora × 52
Receita a mais:      vendas a mais × valor médio × 12
Custo evitado:       erros evitados × custo de cada erro × 12
Valor anual:         soma das três
```

Número que não vem de prova ou de fonte entra como `[HIPÓTESE]`.

## Modelos de cobrança

| Modelo | Bom para | Cuidado |
| --- | --- | --- |
| Valor fixo | Oferta simples, escopo fechado | Deixa dinheiro na mesa com cliente grande |
| Assinatura em níveis | Públicos de tamanhos diferentes | O nível do meio precisa ser a escolha óbvia |
| Por uso ou por unidade | Valor que cresce com o uso | Conta imprevisível assusta o comprador |
| Híbrido (base + excedente) | Base previsível que cresce | Mais difícil de explicar |

Para serviço:

| Modelo | Como se calcula |
| --- | --- |
| Por hora | Valor da hora por senioridade. Evite como modelo principal: cobra esforço, não resultado |
| Por projeto | Horas estimadas, com margem para imprevisto, vezes o valor da hora. Sempre com processo para mudança de escopo |
| Mensalidade (retainer) | Pacote de horas ou de entregas por mês, com desconto sobre a hora avulsa |
| Por valor | Percentual do resultado medido. Exige resultado mensurável e contrato claro |
| Serviço produtizado | Entrega fixa, preço fixo, prazo fixo, capacidade máxima por mês |

**Métrica de valor:** escolha o que cresce junto com o valor que o cliente recebe. Se "mais X" significa "mais valor", X é a métrica. O cliente não deveria precisar de calculadora para entender a conta.

## Pacotes (bom, melhor, ótimo)

Se a marca vende a mesma oferta em níveis, a matriz de `## Pacotes` mostra todos.

| Nível | Papel | Preço |
| --- | --- | --- |
| Inicial | Tira a barreira de entrada | Baixo |
| Intermediário | Onde a maioria deve ficar | A âncora |
| Avançado | Captura o cliente de maior valor | Bem acima do intermediário |

- **Três níveis** costumam bastar. Mais que isso trava a decisão.
- **O que diferencia os níveis:** limites de escala (usuários, unidades, volume), recursos avançados (automação, integração, relatórios) e controle (permissões, suporte dedicado).
- **O que nunca se limita:** a função central, a segurança e a exportação dos dados do cliente.
- Cada linha "Ideal para" aponta para uma persona do ICP.

## Teste grátis e versão gratuita

| | Versão gratuita | Teste grátis |
| --- | --- | --- |
| Bom para | Produto que se vende sozinho, efeito de rede | Venda consultiva, produto que precisa de implantação |
| Risco | Usuário que nunca paga, custo de suporte | Pouco tempo para mostrar valor |

Se a marca oferece um dos dois, registre no `### Preço` da oferta, com a duração e se pede cartão.

## Desconto

| Tipo | Quando |
| --- | --- |
| Volume | Compromisso de escala (mais unidades, mais usuários) |
| Prazo | Pagamento anual ou contrato mais longo |
| Troca de concorrente | Cliente saindo de outro fornecedor com contrato vigente |
| Estratégico | Cliente que vira referência pública ou case |

**Não dê desconto quando:** o cliente ainda não disse o valor que vê; não há concorrente na mesa; a negociação acabou de começar; o negócio está abaixo do tamanho mínimo.

**Alternativas ao desconto:** prazo de pagamento maior, implantação ou treinamento incluídos, teste mais longo, piloto em uma unidade, preço travado por mais tempo.

A tabela de desconto e o desconto máximo são `uso interno`. No arquivo, `## Princípios de preço` pode dizer a regra pública ("desconto só no plano anual") e deixar os percentuais marcados `uso interno` ou fora.

## Quando o preço ainda não existe

Se a pessoa não sabe quanto cobrar, não preencha com chute. Marque `[PENDENTE: …]` e, se ela quiser pesquisar:

- **Van Westendorp:** quatro perguntas a clientes e prospects. "A que preço seria tão caro que você não compraria?", "a que preço seria tão barato que você duvidaria da qualidade?", "a que preço começa a ficar caro, mas ainda dá para pensar?" e "a que preço seria uma pechincha?". O cruzamento das respostas dá uma faixa aceitável. Precisa de dezenas de respostas para valer; com poucas, o resultado é `[HIPÓTESE]`.
- **Pergunta direta por preço (Gabor-Granger):** "você compraria por R$ X?", variando o valor entre as pessoas.
- **Propostas já enviadas:** o que foi aceito e o que foi recusado por preço, em `GANHOS-E-PERDAS.md`.

## Condições de pagamento no Brasil

Registre no `### Preço`: Pix, boleto, cartão, parcelamento (com ou sem juros), recorrência, emissão de nota fiscal, multa ou fidelidade, reajuste anual (índice). Copie dos contratos, não da memória.

São as condições de como **a marca cobra o cliente dela**: como o cliente paga a assinatura ou o projeto. Não confunda com recurso do produto. Se a marca vende um sistema de cobrança, "Pix automático e cartão" na página de preços pode ser como os clientes do cliente pagam, e isso vai em `### O que inclui`. Na dúvida, pergunte: "como vocês recebem do cliente?".

## Erros comuns

- Preço pelo custo, não pelo valor.
- Níveis demais.
- Limitar justo o que faz o produto valer a pena.
- Métrica de cobrança que o cliente não entende.
- Esconder o preço sem a categoria exigir. Esconder gera desconfiança.
- Preço do site diferente do preço do contrato. Se acontecer, registre os dois e marque `[CONTRADIZ: …]` até a pessoa decidir.
