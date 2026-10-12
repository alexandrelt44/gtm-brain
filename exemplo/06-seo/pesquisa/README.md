# Pesquisa de palavras-chave

> Exemplo fictício. A Cadência e todas as pessoas e empresas citadas não existem.

Esta pasta guarda as exportações de pesquisa de palavras-chave da Cadência. O GTM Brain lê o CSV mais recente que tem a coluna `keyword` e soma as notas dele às palavras-chave de `/06-seo/PALAVRAS-CHAVE.md`.

**Todos os números desta pasta são fictícios.** Volume, dificuldade, tendência e notas foram inventados para mostrar o formato. Não use nenhum deles para decidir nada fora do exemplo.

## Arquivo

- `2026-09-pesquisa-palavras-chave.csv`: pesquisa de set. de 2026, citada como `[PESQUISA]` nos arquivos da camada 06. Feita por Bruna Alves em 2026-09-22.

## Colunas

| Coluna | O que é |
| --- | --- |
| `keyword` | O termo buscado, em minúsculas |
| `volume` | Buscas por mês no Brasil, em português |
| `kd` | Dificuldade, de 0 a 100 |
| `intent` | Intenção: `info` (informacional), `comm` (comercial) ou `nav` (navegacional) |
| `yoy` | Variação do volume em 12 meses, em porcentagem |
| `cluster` | Número do cluster em `/06-seo/CLUSTERS.md` (1 a 4) |
| `demand` | Nota de demanda, de 1 a 10 |
| `competition` | Nota de competição na SERP, de 1 a 10 (10 é a mais difícil) |
| `fit` | Encaixe com o que a Cadência vende, de 1 a 10 |
| `opportunity` | Nota final de oportunidade, de 1 a 10, dada por Bruna depois de ler as três notas anteriores |
