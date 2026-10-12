# Auditorias

Toda camada da marca foi pensada para ser auditável. Sem auditoria, as camadas apodrecem em silêncio e seus agentes de IA continuam lendo arquivos que já foram verdade. Com auditoria, o sistema diz exatamente qual arquivo deixou de ser verdade.

Este documento lista a auditoria de cada camada, a frequência em que ela deve rodar e a ferramenta que já vem pronta (quando existe).

O padrão tem o mesmo formato em todas as 11 camadas:

> Uma **camada legível por máquina**, um **conjunto de regras que a camada implica** e uma **checagem agendada que falha alto quando a realidade e a camada discordam.**

---

## A matriz de auditoria

| Camada | O que auditar | Frequência | Ferramenta pronta |
| --- | --- | --- | --- |
| **01 ICP** | Campos das personas com números atuais (porte da empresa, ticket médio, ferramentas usadas). Trechos da voz do cliente com menos de 18 meses. | Trimestral | `scripts/validar.sh` (checagem de placeholders) |
| **02 Voz e terminologia** | Nenhuma palavra proibida nos rascunhos. Exceções do `TERMINOLOGIA.md` em dia. Regras de compliance alinhadas com a regulação atual (LGPD, CDC, regras do conselho profissional, quando houver). | A cada PR de conteúdo | Nenhuma ainda. Próximo passo: `scripts/auditar-voz.sh`, checagem de vocabulário sobre `02-voz/TERMINOLOGIA.md`. |
| **03 Identidade visual** | Arquivo-fonte no Figma sem valores fixos, sem instâncias desconectadas, sem estados faltando. Tabelas de cor, tipografia e espaçamento do `IDENTIDADE-VISUAL.md` batem com o `theme.json`. | Mensal | Plugin de lint do Figma. Veja [`04-design-system/REFERENCIAS.md`](./04-design-system/REFERENCIAS.md). |
| **04 Design system** | Nenhum hex ou px fixo no CSS dos componentes. Componentes só referenciam aliases da camada 2 de tokens. `theme.json` e `tokens.css` concordam. Design system de origem com versão fixada. | A cada PR (CI) | [`scripts/auditar-tokens.sh`](./scripts/auditar-tokens.sh) (só relatório; vire para bloqueante quando seus tokens forem a fonte da verdade). |
| **05 Oferta e concorrência** | Fichas de concorrentes atuais. Preços em `CONCORRENCIA.md` batem com o que está no site deles. Registro de ganhos e perdas com negócios dos últimos 90 dias. | Trimestral | Nenhuma ainda. Próximo passo: checagem de diferenças nas URLs dos concorrentes. |
| **06 SEO** | Palavras-chave alvo ainda no briefing. Mapas de cluster em dia. Páginas órfãs sinalizadas. Citações em GEO e AEO confirmadas por consulta semanal. | Mensal | Nenhuma ainda. Próximo passo: `scripts/checar-orfas.sh` sobre `06-seo/CLUSTERS.md`. |
| **07 Site** | Dados estruturados válidos em toda URL canônica. Teste de pesquisa aprimorada do Google passa. Sitemap bate com `07-site/MAPA-DO-SITE.md`. Auditoria de cadeias de redirecionamento 301. | Mensal | Teste de pesquisa aprimorada do Google (manual ou agendado). |
| **08 Conteúdo** | URLs perenes sem atualização há 12 meses sinalizadas. Clusters de tema duplicados sinalizados. Citações do corpus de provas ainda resolvem. | Trimestral | Nenhuma ainda. Próximo passo: verificador de atualidade sobre `08-conteudo/BIBLIOTECA.md`. |
| **09 Dados** | Eventos do plano de medição ainda disparam. `DESTAQUES.md` reflete os últimos 90 dias. Painéis funcionando. | Mensal | Nenhuma ainda. Depende da plataforma (GA4, Looker Studio). |
| **10 Cérebro da marca** | Caminhos citados em `CEREBRO.md` apontam para arquivos que existem. Versões fixadas das camadas de origem ainda atuais. Contexto criativo: `criador.md` ainda bate com o seu trabalho publicado mais recente, `audiencia.md` tem entradas de leitores reais dos últimos 90 dias e todo rascunho rejeitado desde a última auditoria tem uma linha no registro de rejeições do `gosto.md`. | A cada versão (contexto criativo: trimestral) | `scripts/validar.sh` (checagem de presença dos arquivos canônicos). |
| **11 Plano** | Os quatro números do placar preenchidos todo mês. Caixa "atualizado em" conferida no trimestre. Taxas provisórias trocadas por medidas depois do primeiro trimestre. Total da tabela de canais igual às visitas necessárias por mês. | Mensal (conta completa: trimestral) | `scripts/validar.sh` (checagem de presença dos arquivos canônicos). |

As frequências são metas. Escolha as que você consegue rodar de verdade e automatize o resto.

---

## Por que cada auditoria tem esse formato

### Voz e terminologia (camada 2)

Um guia de estilo num PDF diz a quem escreve como a marca soa. Um `TERMINOLOGIA.md` com um passo de lint impede que a palavra "sinergia" saia dos rascunhos. Ferramentas comerciais de revisão fazem isso por assinatura. Um `grep` em shell sobre o seu próprio arquivo de terminologia faz de graça.

### Design system (camada 4)

Um `tokens.css` com 230 cores nomeadas não adianta nada se alguém ainda consegue escrever `color: #2563EB` num componente e publicar. A solução é um script de auditoria no CI que sinaliza (ou reprova) o build em qualquer valor fixo. Veja `scripts/auditar-tokens.sh` como implementação de referência.

### Oferta e concorrência (camada 5)

A página de preços de um concorrente muda sem aviso. Se ele lança um plano novo e o seu battle card ainda mostra a tabela antiga de três planos, toda call de venda que usa esse card está mal informada. Uma checagem trimestral de diferenças nas URLs das fichas de concorrentes (ou um conjunto de chamadas `curl | diff` guardado em `scripts/diff-concorrentes.sh`) mostra a mudança antes que alguém da equipe descubra no meio de uma call.

### SEO e palavras-chave (camada 6)

Páginas dentro de um cluster de palavras-chave precisam de links internos apontando para elas. Páginas órfãs são invisíveis para o Google e para a busca generativa. Um rastreamento mensal comparando as páginas do mapa de clusters com o grafo real de links mostra quais precisam de trabalho.

### Site e dados estruturados (camada 7)

Dados estruturados quebram em silêncio quando o modelo do CMS muda. O teste de pesquisa aprimorada em toda URL canônica, agendado todo mês, pega a quebra em 30 dias, e não dois trimestres depois, quando o tráfego orgânico caiu e ninguém sabe por quê.

### Conteúdo (camada 8)

Conteúdo perene só continua perene se for mantido. Uma auditoria de atualidade sinaliza toda URL perene sem atualização há 12 meses e todo cluster de tema duplicado. Rode antes de planejar o calendário do próximo trimestre, para atualizar em vez de escrever do zero sobre um tema em que você já ranqueia.

### Plano (camada 11)

Um plano só vale enquanto os números dele são verdade. Se o placar fica três meses sem preencher, ou se a taxa provisória do primeiro mês continua lá no décimo, os agentes que leem o plano trabalham por metas que ninguém confere. A revisão mensal em `11-plano/REVISAO-MENSAL.md` é a própria auditoria.

---

## Ferramentas de auditoria que já vêm prontas

### `scripts/validar.sh`: presença dos arquivos canônicos

Confere que todo arquivo da árvore das 11 camadas existe (falha se faltar) e sinaliza placeholders não preenchidos (só aviso). Rode localmente antes de abrir um PR; também pode rodar no CI a cada push.

```bash
bash scripts/validar.sh
```

### `scripts/auditar-tokens.sh`: disciplina de tokens

Varre os arquivos CSS do repositório (menos o próprio `tokens.css`) procurando:

1. Cores hex fixas (`#rrggbb` ou `#rgb`)
2. Literais de cor `oklch(...)` fixos
3. Valores em pixel fixos em `padding`, `margin`, `border-radius`, `font-size`, `gap`
4. Referências diretas a tokens da camada 1 (`--ds-*`) fora do `tokens.css`

Para cada ocorrência, mostra arquivo, linha, violação e o alias da camada 2 sugerido. Por padrão sai com 0 (só relatório), para não bloquear quem ainda não adotou o padrão de tokens. Defina a variável de ambiente `STRICT=1` quando quiser que o CI reprove violações.

```bash
bash scripts/auditar-tokens.sh           # só relatório
STRICT=1 bash scripts/auditar-tokens.sh  # bloqueante
```

---

## Como acrescentar uma auditoria

1. Escreva a auditoria como um script shell em `scripts/auditar-<camada>.sh`.
2. Mantenha em bash puro, sem dependências além de `grep`, `find`, `sed` e utilitários POSIX padrão. A meta é "roda em qualquer CI, em qualquer notebook, em qualquer cópia do repositório".
3. Mostre arquivo, linha, violação e sugestão para cada ocorrência.
4. Use só relatório como padrão (`exit 0`), para que cada pessoa adote aos poucos. Deixe o modo estrito atrás de uma variável de ambiente.
5. Ligue o script ao seu workflow de CI (por exemplo, `.github/workflows/lint.yml`) como um job separado, para que uma auditoria que falha não esconda outra.
6. Acrescente uma linha na matriz de auditoria no topo deste arquivo.

A disciplina importa mais que qualquer script isolado. Com o padrão rodando nas 11 camadas, os agentes de IA leem camadas que continuam verdadeiras com o tempo, e quem copia o repositório herda um exemplo funcionando de como manter a marca em dia.
