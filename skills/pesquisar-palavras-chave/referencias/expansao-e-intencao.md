> Adaptado de `keyword-research-and-clustering` do GTM Skills (github.com/manojbajaj95/claude-gtm-plugin), licença MIT, © 2025 mbajaj. Traduzido, resumido e ajustado aos arquivos do GTM Brain. Aviso completo em `AVISOS-DE-TERCEIROS.md`.

# Expansão, intenção e clusters

## Modificadores do português

Aplique a cada semente. Fique só com as variações que mudam a intenção ou o público; as quase iguais se juntam.

**Pergunta:** o que é {termo} · como {fazer/usar/escolher} {termo} · quanto custa {termo} · vale a pena {termo} · {termo} é obrigatório · por que {problema} · quando {ação}

**Comparação:** {termo} ou {termo} · {concorrente} ou {concorrente} · alternativa ao {concorrente} · melhor {termo} · {termo} grátis · {termo} barato · {concorrente} é bom · {concorrente} reclame aqui

**Intenção de agir:** {termo} preço · {termo} valor · contratar {serviço} · {serviço} perto de mim · {serviço} em {cidade} · orçamento de {serviço} · {produto} teste grátis · {produto} login (navegacional)

**Formato:** modelo de {documento} · planilha de {tema} · {tema} pdf · checklist de {tema} · passo a passo {tema} · exemplo de {tema}

**Público:** {termo} para {profissão/segmento} · {termo} para MEI · {termo} para pequena empresa · {termo} para iniciantes · {termo} para autônomo

**Variações de escrita** que o brasileiro usa e a ferramenta mede separado: com e sem acento ("estúdio"/"estudio"), singular e plural, "app"/"aplicativo", "sistema"/"software"/"programa", sigla e nome por extenso ("NF"/"nota fiscal"), abreviações de região ("SP", "RJ", "BH").

## Como expandir sem perder o controle

1. Escreva o escopo: o que entra e o que fica fora (ex.: "fora: termos de franquia, de vaga de emprego, de curso para profissional").
2. Proponha a expansão: sinônimos, termos relacionados, siglas.
3. Liste as exclusões dos falsos positivos comuns. "Curso", "vaga", "salário", "grátis download" e "o que significa" costumam trazer outro público.
4. Escreva o porquê de cada inclusão ou exclusão no relato da pesquisa.
5. Junte as quase iguais em vez de multiplicar linhas. Na tabela fica a variação de maior volume; as outras vão para a coluna Nota.

## Intenção de busca

| Sinal no termo | Intenção | No CSV |
| --- | --- | --- |
| "o que é", "como", "por que", "passo a passo", "exemplo", "modelo" | Informacional | `info` |
| "melhor", "ou", "comparativo", "vale a pena", "é bom", "alternativa", "avaliação" | Comercial (investigação) | `comm` |
| "preço", "valor", "contratar", "orçamento", "comprar", "teste grátis", "perto de mim" | Transacional | `trans` |
| Nome da marca, nome do produto, "login", "contato", "site oficial" | Navegacional | `nav` |

Quando a ferramenta der uma intenção e a busca real mostrar outra, vale a busca real. Abra o Google, em aba anônima, com região Brasil: se o topo é de artigos, a intenção é informacional, mesmo que o termo tenha "melhor".

A intenção decide o tipo de página: informacional vai para post ou guia; comercial vai para comparação, página de solução ou case; transacional vai para página de preço, de oferta ou de contato; navegacional vai para a página inicial ou a página do produto.

## Agrupar em clusters

1. **Tire os temas** da lista expandida: cada dor ou cada trabalho da persona costuma virar um tema.
2. **Agrupe por sentido:** termos que uma mesma página responderia bem ficam juntos. Teste: se o top 10 de dois termos tem quase os mesmos resultados, eles são uma página só.
3. **Marque a intenção** de cada termo.
4. **Escolha o pilar:** o termo mais amplo do grupo que a marca consegue responder com autoridade. Nem sempre é o de maior volume: um termo amplo demais (ex.: "marketing") não tem dono pequeno.
5. **Distribua os satélites:** cada satélite tem uma palavra-chave principal só dele, e de duas a quatro secundárias.

Tamanho: de 6 a 12 satélites por cluster. Menos de 6 é um cluster incompleto (registre os que faltam em `## Lacunas de conteúdo`). Mais de 15 são dois clusters.

```
Cluster 1: [tema]                         ← ## Cluster 1: … em CLUSTERS.md
├── Pilar: [termo amplo]                  ← ### Página pilar
├── Satélite: [termo] (informacional)     ← ### Satélites, item 1
├── Satélite: [termo] (comercial)
└── Satélite: [termo] (informacional)
```

Numere os clusters na ordem de prioridade. O número é o que vai na coluna `cluster` do CSV.
