# DataForSEO (caminho opcional)

Use só se o ambiente tiver um servidor MCP do DataForSEO (ferramenta `api_request`) ou se a pessoa tiver credenciais da API. Sem isso, siga o caminho manual da skill. Toda chamada é cobrada na conta da pessoa: avise antes de rodar listas grandes.

Valores para o Brasil: `"location_code": 2076`, `"language_code": "pt"`. Cada chamada leva um array com uma tarefa.

## 1. Medir uma lista fechada (o pedido principal)

`POST /v3/dataforseo_labs/google/keyword_overview/live`

```json
[{ "location_code": 2076, "language_code": "pt", "keywords": ["termo um", "termo dois"] }]
```

- Até 700 termos por chamada. Termo sem dado na base simplesmente não volta no resultado (e não é cobrado). Ele entra no CSV com volume vazio.
- Onde está cada coluna do CSV, dentro de `tasks[0].result[0].items[]`:

| Coluna | Campo |
| --- | --- |
| `keyword` | `keyword` |
| `volume` | `keyword_info.search_volume` |
| `kd` | `keyword_properties.keyword_difficulty` |
| `intent` | `search_intent_info.main_intent` (`informational` → `info`, `commercial` → `comm`, `transactional` → `trans`, `navigational` → `nav`) |
| `yoy` | `keyword_info.search_volume_trend.yearly` |

- `keyword_info.monthly_searches` traz os 12 meses: use para achar os termos sazonais.
- Com `"include_serp_info": true`, `serp_info.serp_item_types` diz se a busca tem `featured_snippet`, `people_also_ask`, `ai_overview`, `local_pack`, `video`. Serve para a coluna "Recurso da SERP".
- Ignore `detected_language`: é o palpite de idioma do termo, não o mercado.

## 2. Expandir uma semente específica

`POST /v3/dataforseo_labs/google/keyword_suggestions/live`: termos que contêm a semente.

```json
[{
  "keyword": "semente específica",
  "location_code": 2076,
  "language_code": "pt",
  "limit": 200,
  "filters": [["keyword_info.search_volume", ">", 10]],
  "order_by": ["keyword_info.search_volume,desc"]
}]
```

`POST /v3/dataforseo_labs/google/related_keywords/live`: termos de "pesquisas relacionadas", em profundidade.

```json
[{ "keyword": "semente específica", "location_code": 2076, "language_code": "pt", "depth": 2, "limit": 200 }]
```

`depth` vai de 0 a 4 (1 traz até 8 termos, 2 até 72, 3 até 584). Nesta, os dados ficam dentro de `items[].keyword_data` (o mesmo formato do pedido 1, um nível abaixo).

Sementes amplas ("quanto custa", "automação", "gestão") trazem ruído de outros mercados mesmo com filtro. Expanda sementes do nicho e depois meça a lista limpa com o pedido 1.

## 3. Só a dificuldade, para muitos termos

`POST /v3/dataforseo_labs/google/bulk_keyword_difficulty/live`

```json
[{ "location_code": 2076, "language_code": "pt", "keywords": ["termo um", "termo dois"] }]
```

Até mil termos. Volta `items[].keyword` e `items[].keyword_difficulty`.

## 4. Volume pelo Google Ads (alternativa)

`POST /v3/keywords_data/google_ads/search_volume/live`

```json
[{ "location_code": 2076, "language_code": "pt", "keywords": ["termo um", "termo dois"] }]
```

Até mil termos, no máximo 12 chamadas por minuto. O Google Ads soma termos parecidos num volume só: variações quase iguais podem voltar com o mesmo número. Não traz dificuldade nem intenção.

## Respostas grandes

Uma resposta com centenas de termos pode passar do limite da ferramenta e ser salva em arquivo. Leia esse arquivo com um script (Python ou Node), tire só as cinco colunas acima e monte o CSV a partir dele. Não copie números à mão de uma resposta longa.

## Registre

No relato da pesquisa e no `## Registro de pesquisa`, anote: data, endpoint, região, idioma e quantos termos voltaram com dado. A fonte nos arquivos é `[PESQUISA]`, com "DataForSEO, base de AAAA-MM" na definição.
