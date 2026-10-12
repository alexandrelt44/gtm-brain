# Estratégia de palavras-chave

> Exemplo fictício. A Cadência e todas as pessoas e empresas citadas não existem.

Fontes citadas neste arquivo:

- `[PESQUISA]` pesquisa de palavras-chave de setembro de 2026 (arquivo em `/06-seo/pesquisa/2026-09-pesquisa-palavras-chave.csv`). Volumes fictícios
- `[ENTREVISTAS]` 14 entrevistas com donas de estúdio e gestoras de rede, janeiro a março de 2026
- `[SUPORTE]` tickets e conversas de suporte no WhatsApp, 2025 e 2026

## Como usar este arquivo

- **O que entra:** as palavras-chave que você quer ganhar, em ordem de prioridade. Cada uma tem intenção de busca, página alvo, recurso da SERP que você quer ganhar e prioridade.
- **Como os agentes leem:** os agentes consultam este arquivo antes de escrever qualquer conteúdo, para escolher a palavra-chave principal, as secundárias e a estratégia de SERP.
- **Frequência de atualização:** audite todo mês. Refaça a cada trimestre. Inclua linhas quando surgirem palavras-chave novas que funcionam, vindas do Google Search Console, de avaliações de clientes e de entrevistas.

## Checklist para agentes de IA

- [x] Legível por máquina: palavras-chave em tabelas com colunas previsíveis.
- [x] Estruturado: intenção, prioridade, página alvo, recurso da SERP, marca ou genérico.
- [x] Fonte única da verdade: nenhuma lista paralela de palavras-chave na planilha de uma agência de SEO.
- [x] Versionado: data da última atualização.
- [x] Citável: os agentes citam `/06-seo/PALAVRAS-CHAVE.md` ao fazer o briefing de um conteúdo.

Última atualização: 2026-10-01

---

## Níveis de palavra-chave

Três níveis, bem separados.

- **Palavras-chave primárias:** os 5 termos genéricos que a Cadência precisa ganhar, mais o termo de marca. Intenção clara, valor comercial claro, página alvo clara.
- **Palavras-chave secundárias:** 10 termos que apoiam as primárias, quase todos ligados a cobrança, reposição e abertura de estúdio.
- **Palavras-chave de cauda longa:** agrupadas nos 4 clusters de `/06-seo/CLUSTERS.md`. Elas alimentam posts de blog e perguntas frequentes.

Como preencher as colunas das tabelas:

- **Volume:** buscas por mês no Brasil, em português, segundo a pesquisa de set. de 2026 `[PESQUISA]`. Números fictícios.
- **Dificuldade:** de 0 a 100, segundo a mesma pesquisa.
- **Tendência:** variação do volume em 12 meses, em porcentagem.
- **Nota:** qualquer contexto que mude a decisão (sazonalidade, termo ambíguo, concorrente forte na SERP).

## Palavras-chave primárias

| Palavra-chave | Intenção | Volume | Dificuldade | Tendência | Recurso da SERP | Página alvo | Prioridade | Posição atual | Nota |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| sistema para estúdio de pilates | Comercial | 1.900 | 38 | +15% | Top 3 orgânico | `/pilates` | Alta | 9 | Termo que mais traz teste grátis hoje. `[OBSERVADO]` A SERP mistura sistemas de academia grandes e apps de agenda genéricos |
| agenda para estúdio de pilates | Comercial | 720 | 29 | +8% | Citação em visão geral criada por IA | `/agenda` | Alta | 14 | Quem busca já usa planilha e quer sair dela `[ENTREVISTAS §2]` |
| app para estúdio de yoga | Comercial | 480 | 31 | +10% | Top 3 orgânico, As pessoas também perguntam | `/yoga` | Alta | 22 | A SERP tem poucos resultados feitos para yoga. `[PROPOSTA]` Dá para ganhar com a página `/yoga` e o case CS-002 |
| como diminuir inadimplência em academia | Informacional | 1.300 | 24 | +5% | Trecho em destaque | `/blog/como-diminuir-inadimplencia` | Média | 31 | Pilar do cluster 1. Topo de funil, mas a dor é a mesma do produto |
| controle de presença pilates | Informacional | 390 | 18 | 0% | As pessoas também perguntam | `/blog/controle-de-presenca-pilates` | Média | Fora do top 50 | Volume estável. Bom para FAQ da página `/presenca` |
| cadência sistema estúdio | Navegacional | 210 | 5 | +40% | Sitelinks | `/` | Alta | 1 | Termo de marca. Cresce junto com o Instagram da Marina `[OBSERVADO]` |

## Palavras-chave secundárias

| Palavra-chave | Intenção | Volume | Dificuldade | Tendência | Página alvo | Prioridade | Nota |
| --- | --- | --- | --- | --- | --- | --- | --- |
| pix automático para academia | Informacional | 880 | 22 | +120% | `/blog/pix-automatico-para-estudios` | Alta | Termo novo, crescendo rápido `[PESQUISA]`. Liga direto à capacidade CAP-001 |
| cobrança recorrente estúdio de pilates | Comercial | 320 | 19 | +25% | `/cobranca` | Alta | Intenção de compra clara |
| como cobrar aluno inadimplente | Informacional | 590 | 15 | +6% | `/blog/cobrar-aluno-pelo-whatsapp` | Média | Frase muito parecida com o que as donas dizem nas entrevistas `[ENTREVISTAS §4]` |
| app de agendamento para pilates | Comercial | 590 | 33 | +18% | `/agenda` | Média | Disputa com apps genéricos de agenda |
| agenda online para estúdio de yoga | Comercial | 260 | 20 | +12% | `/yoga` | Média | Apoia a primária de yoga |
| reposição de aulas pilates regras | Informacional | 210 | 8 | +12% | `/guias/reposicao-de-aulas` | Média | Dúvida frequente no suporte `[SUPORTE]` |
| quanto custa abrir um estúdio de pilates | Informacional | 2.400 | 27 | +6% | `/blog/quanto-custa-abrir-estudio-de-pilates` | Média | Maior volume da lista, mas encaixe médio: atrai a persona hipótese (instrutor que vai abrir estúdio) |
| como abrir um estúdio de pilates | Informacional | 1.600 | 30 | +4% | `/blog/como-abrir-estudio-de-pilates` | Média | Pilar do cluster 3 |
| sistema para rede de academias | Comercial | 210 | 41 | +11% | `/rede` | Média | Pouco volume, ticket alto (plano Rede) |
| software para academia | Comercial | 2.900 | 55 | +3% | Nenhuma | Baixa | Volume alto, mas a SERP é de sistemas grandes de academia. Não vale disputar agora |

## O que os dados mostram

- O cluster de cobrança tem a melhor relação entre oportunidade e encaixe. "pix automático para academia" cresceu 120% em 12 meses `[PESQUISA]`. `[OBSERVADO]`
- Os termos de abrir estúdio têm muito volume e encaixe médio. Servem para a persona hipótese e para o plano Essencial. `[PROPOSTA]`
- Os termos de rede têm pouco volume. O canal principal para gestoras de rede é indicação e venda direta, não busca. `[HIPÓTESE]`
- "franquia de estúdio de pilates" tem volume, mas quem busca quer comprar uma franquia, não um sistema. Fica fora. `[PROPOSTA]`

## Clusters de cauda longa

Agrupe as palavras-chave de cauda longa sob uma frase principal. Cada cluster vira um plano de página pilar e satélites em `CLUSTERS.md`.

### Cluster: Cobrança e inadimplência no estúdio

- como diminuir inadimplência em academia
- pix automático para academia
- cobrança recorrente estúdio de pilates
- como cobrar aluno inadimplente
- régua de cobrança academia
- política de cancelamento estúdio de pilates

### Cluster: Agenda e reposição de aulas

- agenda para estúdio de pilates
- app de agendamento para pilates
- reposição de aulas pilates regras
- controle de presença pilates
- controle de frequência alunos academia
- como montar grade de horários estúdio

### Cluster: Abrir e gerir um estúdio de pilates

- como abrir um estúdio de pilates
- quanto custa abrir um estúdio de pilates
- quanto cobrar aula de pilates
- plano de negócios estúdio de pilates
- sistema para estúdio de pilates

### Cluster: Redes e franquias de estúdio

- sistema para rede de academias
- gestão de múltiplas unidades academia
- painel consolidado franquia academia
- como padronizar unidades de rede fitness

## Marca × genérico

Acompanhe a divisão a cada trimestre. Uma base saudável tem as duas.

| Tipo | Meta de participação no tráfego | Exemplos de palavra-chave |
| --- | --- | --- |
| Marca | 25% (hoje 41%) | cadência sistema estúdio, cadência app, cadência pilates, marina duarte cadência |
| Genérico | 75% (hoje 59%) | sistema para estúdio de pilates, agenda para estúdio de pilates, pix automático para academia |

O tráfego de marca alto mostra que o Instagram funciona, mas também que a busca genérica ainda traz pouco. `[OBSERVADO]`

## Intenção de busca

Toda palavra-chave cai em um de quatro grupos.

- **Informacional:** o comprador está pesquisando. Quer entender um conceito, um método ou uma opção. Ex.: "como diminuir inadimplência em academia".
- **Navegacional:** o comprador procura um site ou uma marca específica. Ex.: "cadência sistema estúdio".
- **Investigação comercial:** o comprador está comparando soluções. Quer avaliações, comparativos e cases. Ex.: "sistema para estúdio de pilates".
- **Transacional:** o comprador está pronto para agir. Quer um preço, uma demonstração, um cadastro ou uma conversa. Ex.: "cadência preço", "teste grátis sistema pilates".

Associe cada palavra-chave ao seu grupo antes de escolher a página.

## Recursos da SERP

Diga, para cada palavra-chave, qual recurso da SERP você quer ganhar.

- **Trecho em destaque (featured snippet):** responda à pergunta em 40 a 60 palavras logo abaixo de um H2 escrito como a própria pergunta. Alvo: "como diminuir inadimplência em academia".
- **As pessoas também perguntam (PAA):** responda de 3 a 5 subperguntas no post. Cada subpergunta ganha o seu H2 ou H3. Alvo: "app para estúdio de yoga", "controle de presença pilates".
- **Citação em visão geral criada por IA (AI Overview):** use linguagem com entidades claras. Defina o termo numa única frase, logo no começo. Alvo: "agenda para estúdio de pilates".
- **Pacote local:** fora do escopo. A Cadência vende para o Brasil todo e não tem atendimento presencial.
- **Pacote de imagens:** use capturas próprias da agenda e do app, com texto alternativo descritivo.
- **Carrossel de vídeos:** junte o pilar do cluster 2 a um vídeo de 90 segundos mostrando a reposição pelo app.

## Termos sazonais

Termos com pico em épocas previsíveis. Planeje o conteúdo com 8 a 12 semanas de antecedência.

| Termo | Janela de pico | Publicar até | Responsável |
| --- | --- | --- | --- |
| como abrir um estúdio de pilates | Janeiro (planos de ano novo) | Novembro | Bruna Alves |
| como diminuir inadimplência em academia | Fevereiro e julho (volta das férias) | Dezembro e maio | Bruna Alves |
| política de cancelamento estúdio de pilates | Dezembro (férias de fim de ano) | Outubro | Bruna Alves |

## Registro de pesquisa

Uma linha por sessão de pesquisa. Mantém a trilha de auditoria honesta.

| Data | Ferramenta | Busca | O que descobrimos | Ação |
| --- | --- | --- | --- | --- |
| 2026-09-22 | Planejador de palavras-chave do Google Ads + Semrush | Sementes: pilates, yoga, funcional, inadimplência, pix automático | 26 termos com volume e notas, salvos em `/06-seo/pesquisa/2026-09-pesquisa-palavras-chave.csv` | Incluir nas primárias e secundárias acima |
| 2026-09-25 | Google Search Console | Consultas dos últimos 90 dias | "pix automático para academia" já traz impressões sem página própria | Incluir nas secundárias, satélite novo no cluster 1 |
| 2026-09-26 | Perplexity | "melhor sistema para estúdio de pilates" | A resposta cita só sistemas grandes de academia e um app genérico de agenda | Guardar para `/06-seo/GEO-AEO.md` |

## Como passar este arquivo para um agente de IA

```text
Carregue /06-seo/PALAVRAS-CHAVE.md antes de fazer o briefing de qualquer conteúdo.

Antes de escrever, decida:
1. A palavra-chave principal da peça (das tabelas de primárias ou de cauda longa).
2. De duas a quatro palavras-chave secundárias.
3. O recurso da SERP que a peça quer ganhar.
4. A página alvo ou o slug da URL.

Use a palavra-chave principal no H1, uma vez nas primeiras 100 palavras e uma vez numa meta description com menos de 155 caracteres. Não force repetição de palavra-chave.

Caminhos de referência: /06-seo/PALAVRAS-CHAVE.md, /06-seo/CLUSTERS.md, /06-seo/GEO-AEO.md.
```
