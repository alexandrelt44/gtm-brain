# Fundamento: espaçamento

## 1. Metadados

| Campo | Valor |
| --- | --- |
| Nível | `fundamento` |
| Status | `estável` |
| Versão | `1.0.0` |
| Última atualização | `2026-04-24` |
| Responsável | `[Responsável por design, cargo]` |
| Arquivos pareados | `../../tokens.css`, `../../theme.json`, `../../../03-visual/IDENTIDADE-VISUAL.md` |

## 2. Princípios

1. **Unidade-base de 4 px.** Todo valor de layout é múltiplo de 4 px. Nada de espaçamentos de 5, 7, 13 ou 18 px.
2. **Escala de tokens, não degraus arbitrários.** Monte os layouts com o conjunto fixo de degraus. Se uma situação pede um valor entre dois tokens, pare e pergunte se a hierarquia está errada.
3. **O ritmo é produto do espaçamento.** Um ritmo vertical consistente vale mais que alinhar cada elemento ao pixel.
4. **Espaçamento interno do contêiner > margens dos elementos.** O contêiner é dono do seu espaçamento interno. Os filhos não definem margens externas para brigar com o contêiner.

## 3. Escala (apelidos da Camada 2)

| Apelido | Valor | Uso típico |
| --- | --- | --- |
| `--space-100` | 4 px | Ícone até o texto dentro de um chip ou botão |
| `--space-200` | 8 px | Espaços em linha, agrupamentos apertados |
| `--space-300` | 12 px | Espaçamento interno vertical do botão, espaçamento interno de card pequeno |
| `--space-400` | 16 px | Ritmo vertical padrão entre itens relacionados |
| `--space-500` | 20 px | Espaçamento interno horizontal do botão |
| `--space-600` | 24 px | Espaçamento interno do card, espaçamento interno da seção |
| `--space-800` | 32 px | Espaço entre grupos de campos num formulário |
| `--space-1200` | 48 px | Espaço entre seções numa página |
| `--space-1600` | 64 px | Espaço entre grandes regiões da página |

Os nomes indicam o degrau da escala (100, 200, 300…), não o valor em pixel, para que uma revisão de marca redimensione a escala inteira sem renomear tokens.

## 4. Regras de uso

- **Formulários:** `--space-400` entre campos empilhados, `--space-800` entre grupos de campos, `--space-600` entre o último campo e a linha de envio.
- **Cards:** espaçamento interno `--space-600`. Espaço entre cards `--space-600` em grades apertadas, `--space-800` em layouts de vitrine.
- **Seções:** espaçamento interno `--space-1200` em cima e embaixo no desktop, `--space-800` no celular.
- **Blocos de texto:** espaço entre parágrafos `--space-400`. Espaço entre um título e o parágrafo seguinte `--space-200`.

## 5. Breakpoints

Definidos aqui porque os breakpoints costumam comandar ajustes de espaçamento em cada tamanho de tela.

| Token | Largura mínima |
| --- | --- |
| `--bp-sm` | 640 px |
| `--bp-md` | 768 px |
| `--bp-lg` | 1024 px |
| `--bp-xl` | 1280 px |
| `--bp-2xl` | 1536 px |

Regra: abaixo de `--bp-md`, reduza o espaçamento interno das seções em um degrau (`--space-1200` → `--space-800`).

## 6. Referências cruzadas

- Tokens: [`../tokens/tokens.md`](../tokens/tokens.md)
- Seção pareada da identidade visual: espaçamento em `/03-visual/IDENTIDADE-VISUAL.md`
- Consumido pela maioria dos átomos e por todos os padrões.

---

## Histórico de mudanças

| Data | Versão | Mudança | Autor |
| --- | --- | --- | --- |
| `2026-04-24` | `1.0.0` | Spec inicial do fundamento. | `[Nome]` |
