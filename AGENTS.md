# Instruções para agentes

Este repositório é o GTM Brain: o cérebro de go-to-market de uma marca em markdown (`marca/`, um template em 11 camadas), um exemplo preenchido (`exemplo/`) e o app que lê os arquivos como um banco de dados (`brain/`).

## Preencher uma marca

Se a pessoa quer preencher, completar ou revisar a marca, use as skills de `skills/`. Cada uma é um `SKILL.md` com o método e uma pasta `referencias/`.

1. Comece por [`skills/gtm-brain/SKILL.md`](skills/gtm-brain/SKILL.md), o orquestrador.
2. Leia [`skills/gtm-brain/referencias/regras.md`](skills/gtm-brain/referencias/regras.md). Valem para todas as skills.
3. Para saber o que falta e qual skill usar: `cd brain && node src/lacunas.mjs --marca <pasta da marca>`.
4. Se o MCP do GTM Brain estiver conectado (ferramentas `brain_*`), use-o para ler a marca. Para mudar um arquivo que a pessoa não pediu para você editar, use `brain_propor`: a mudança entra na fila e a pessoa aceita ou recusa no GTM Brain.

| Skill | Preenche |
| --- | --- |
| `gtm-brain` | Orquestra: situa, escolhe a próxima camada, mantém `10-cerebro/CEREBRO.md` |
| `preencher-icp` | `01-icp/` |
| `preencher-voz` | `02-voz/` |
| `preencher-oferta` | `05-oferta/OFERTA.md` |
| `mapear-concorrencia` | `05-oferta/CONCORRENCIA.md`, `05-oferta/GANHOS-E-PERDAS.md` |
| `registrar-provas` | `08-conteudo/PROVAS.md` |
| `pesquisar-palavras-chave` | `06-seo/`, `07-site/` |
| `escolher-canais` | `11-plano/CANAIS.md` (roda antes da rodada 3 da `montar-plano`) |
| `montar-plano` | `11-plano/`, `09-dados/`, `08-conteudo/CALENDARIO.md` |
| `fechar-lacunas` | Qualquer arquivo: pendências, contradições, fichas incompletas, visual, design system e `08-conteudo/BIBLIOTECA.md` |

## Mudar o código do app

O app fica em `brain/` (Node 20+, sem dependências). Rode `npm test` dentro de `brain/` antes de propor mudanças. As convenções de leitura dos arquivos estão em `docs/convencoes.md`.

## Não fazer

- Não edite `exemplo/` para preencher uma marca real. Copie `marca/`.
- Não faça commit sem a pessoa pedir.
