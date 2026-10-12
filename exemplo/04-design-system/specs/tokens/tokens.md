# Tokens

## 1. Metadados

| Campo | Valor |
| --- | --- |
| Nível | `fundamento` |
| Status | `estável` |
| Versão | `1.0.0` |
| Última atualização | `2026-04-24` |
| Responsável | `[Responsável por design, cargo]` |
| Arquivos pareados | `../../tokens.css` (oficial), `../../theme.json`, `../../DESIGN.md` |

## 2. Propósito

Este arquivo é o mapa mestre de todos os tokens da Camada 2 do sistema e de quando usar cada um. `tokens.css` é a fonte da verdade legível por máquina. Este arquivo é o índice legível por gente que um agente de IA ou uma pessoa nova no time consulta para entender qual apelido vale para qual propriedade.

Se um token existe em `tokens.css` mas não neste mapa, acrescente aqui. Se existe aqui mas não em `tokens.css`, apague a linha. Os dois arquivos precisam concordar.

## 3. Modelo de camadas (resumo)

```
Camada 1  var(--ds-*, reserva)         origem / valores brutos
Camada 2  var(--color-*, --space-*, …) apelidos (este arquivo documenta estes)
Camada 3  CSS dos componentes          referencia só apelidos da Camada 2
```

Veja [`../../DESIGN.md`](../../DESIGN.md), seção "Arquitetura de tokens em três camadas", para o raciocínio completo. O script de auditoria em `scripts/auditar-tokens.sh` garante a regra de que o código de componente nunca toca na Camada 1 nem em valores brutos.

## 4. Tokens de cor

### Superfícies

| Apelido | Usar em |
| --- | --- |
| `--color-surface` | Fundo padrão da página, fundo padrão do card |
| `--color-surface-subtle` | Hover do botão fantasma, zonas discretas, campos desabilitados |
| `--color-surface-muted` | Faixas de seção, blocos de código, fundo de código em linha |
| `--color-border` | Bordas de campo, bordas de card, divisórias de 1 px |
| `--color-divider` | Linhas horizontais, separadores de linha em tabelas |

### Texto

| Apelido | Usar em |
| --- | --- |
| `--color-text` | Texto corrido padrão |
| `--color-text-heading` | Títulos (h1 a h4) |
| `--color-text-muted` | Legendas, metadados, placeholder, texto de ajuda |
| `--color-text-on-brand` | Texto de rótulo sobre superfícies na cor da marca |
| `--color-text-link` | Links dentro do texto corrido |

### Marca + destaque

| Apelido | Usar em |
| --- | --- |
| `--color-brand` | Fundo do CTA principal, item ativo da navegação |
| `--color-brand-hover` | Hover / ativo do CTA principal |
| `--color-brand-secondary` | Fundo do CTA secundário |
| `--color-brand-secondary-hover` | Hover do CTA secundário |
| `--color-accent-1` | Realce decorativo, preenchimento de etiqueta |
| `--color-accent-2` | Série secundária de gráficos |

### Semânticas (só status)

| Apelido | Usar em |
| --- | --- |
| `--color-success` | Alertas de sucesso, estados confirmados |
| `--color-warning` | Alertas de aviso, estados pendentes |
| `--color-danger` | Bordas de erro, botões destrutivos, campos inválidos |
| `--color-info` | Faixas informativas |

## 5. Tokens de espaçamento

| Apelido | Valor | Uso |
| --- | --- | --- |
| `--space-100` | 4 px | Ícone até o texto dentro de um chip |
| `--space-200` | 8 px | Espaços em linha |
| `--space-300` | 12 px | Espaçamento interno vertical do botão (md) |
| `--space-400` | 16 px | Ritmo vertical padrão |
| `--space-500` | 20 px | Espaçamento interno horizontal do botão (md) |
| `--space-600` | 24 px | Espaçamento interno do card |
| `--space-800` | 32 px | Grupos de campos de formulário |
| `--space-1200` | 48 px | Espaçamento interno de seção |
| `--space-1600` | 64 px | Espaço entre grandes regiões da página |

## 6. Tokens de raio

| Apelido | Valor | Uso |
| --- | --- | --- |
| `--radius-sm` | 4 px | Etiquetas, campos pequenos |
| `--radius-md` | 8 px | Botões, campos, cards |
| `--radius-lg` | 16 px | Modais, cards de destaque |
| `--radius-xl` | 24 px | Blocos do topo da página |
| `--radius-pill` | 9999 px | Pílulas, badges, avatares |

## 7. Tokens de sombra

| Apelido | Uso |
| --- | --- |
| `--shadow-sm` | Cards em repouso |
| `--shadow-md` | Cards em hover, menus suspensos |
| `--shadow-lg` | Modais |
| `--shadow-xl` | Sobreposições de tela inteira |

## 8. Tokens de tipografia

Veja [`../fundamentos/tipografia.md`](../fundamentos/tipografia.md) para a escala completa. Apelidos: `--fs-display-xl`, `--fs-display-lg`, `--fs-h1` a `--fs-h4`, `--fs-body-lg`, `--fs-body`, `--fs-body-sm`, `--fs-mono`.

## 9. Tokens de movimento

Veja [`../fundamentos/movimento.md`](../fundamentos/movimento.md). Apelidos: `--duration-fast`, `--duration-base`, `--duration-medium`, `--duration-slow`, `--easing-enter`, `--easing-exit`.

## 10. Token de foco

| Apelido | Valor | Uso |
| --- | --- | --- |
| `--focus-ring` | `0 0 0 2px var(--color-surface), 0 0 0 4px var(--color-brand)` | Todo elemento que recebe foco. Nunca remova. |

## 11. Regras que o script de auditoria garante

1. O CSS de componente não pode conter valores brutos `#xxxxxx` ou `oklch(...)`. Use um apelido `--color-*`.
2. O CSS de componente não pode conter valores brutos em pixel para espaçamento, raio ou tamanho de fonte. Use um apelido `--space-*`, `--radius-*` ou `--fs-*`.
3. O CSS de componente não pode referenciar tokens da Camada 1 (`--ds-*`) direto. Passe sempre pela Camada 2.
4. Todo elemento interativo usa `--focus-ring` no foco visível.

Rode `bash scripts/auditar-tokens.sh` para conferir na sua máquina. O CI roda o mesmo script em todo PR.

---

## Histórico de mudanças

| Data | Versão | Mudança | Autor |
| --- | --- | --- | --- |
| `2026-04-24` | `1.0.0` | Mapa inicial de tokens. | `[Nome]` |
