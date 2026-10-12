# Fundamento: cor

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

1. **Toda cor tem uma função.** Marca, neutra, semântica ou superfície. Nunca decorativa.
2. **Tokens, não valores.** Os componentes referenciam apelidos da Camada 2 de `tokens.css`. Nunca hex bruto. Nunca OKLCH bruto.
3. **Cores semânticas são reservadas para status.** `--color-success`, `--color-warning`, `--color-danger`, `--color-info`. Não use `--color-danger` como vermelho decorativo.
4. **As neutras sustentam a página.** 80% de qualquer layout é neutro.
5. **Contraste é inegociável.** Toda combinação de texto sobre fundo passa no WCAG 2.2 nível AA. 4,5:1 para texto corrido, 3:1 para texto grande (18 pt regular / 14 pt negrito para cima).
6. **Nunca significado só pela cor.** Junte a cor a um ícone ou a um rótulo. Acessibilidade e os rastreadores de mecanismos de resposta (AEO) ganham com isso.

## 3. Mapa de funções (apelidos da Camada 2)

| Apelido | Função |
| --- | --- |
| `--color-surface` | Fundo padrão da página / do card |
| `--color-surface-subtle` | Superfície secundária (preenchimento de hover, zona discreta) |
| `--color-surface-muted` | Superfície terciária (quebras de seção, blocos de código) |
| `--color-border` | Divisórias de 1 px e bordas de campo |
| `--color-divider` | Linhas horizontais |
| `--color-text` | Texto corrido |
| `--color-text-heading` | Títulos |
| `--color-text-muted` | Legendas, metadados, placeholders |
| `--color-text-on-brand` | Texto sobre superfícies na cor da marca |
| `--color-text-link` | Links dentro do texto corrido |
| `--color-brand` | CTAs principais, estados principais da navegação |
| `--color-brand-hover` | Hover / ativo da primária |
| `--color-brand-secondary` | Ações secundárias |
| `--color-brand-secondary-hover` | Hover da secundária |
| `--color-accent-1` | Realce, etiqueta, chamada (primeiro destaque) |
| `--color-accent-2` | Série secundária de gráficos, segundo destaque |
| `--color-success` / `--color-warning` / `--color-danger` / `--color-info` | Só status |

## 4. Regras de uso

- Cor primária da marca nos elementos do topo da página e no CTA mais importante de cada tela.
- Cor secundária em CTAs secundários, etiquetas e momentos de destaque. Nunca empilhe a secundária contra a primária em saturação máxima.
- Cores de destaque em tratamentos decorativos e gráficos. Alterne entre elas nas séries de dados.
- Cores semânticas só em alertas, validações e indicadores de status.
- Cor de link no texto corrido: `--color-text-link`. Sublinhado no hover; sempre sublinhado quando o link está no meio de um parágrafo.

## 5. Modo escuro

O modo escuro é implementado reatribuindo os apelidos da Camada 2 dentro de uma media query ou de um atributo `data-theme`. Os componentes não mudam. Veja o bloco comentado no fim de `tokens.css` para o padrão.

Se você entrega só o modo claro, declare isso aqui para que os agentes não suponham que existem variantes escuras:

> Este projeto hoje só tem modo claro. Os apelidos de modo escuro estão reservados para uma versão futura.

## 6. Referências cruzadas

- Tokens: [`../tokens/tokens.md`](../tokens/tokens.md)
- Seção pareada da identidade visual: sistema de cores em `/03-visual/IDENTIDADE-VISUAL.md`
- Átomos que consomem: [`../atomos/botao.md`](../atomos/botao.md), [`../atomos/campo.md`](../atomos/campo.md)

---

## Histórico de mudanças

| Data | Versão | Mudança | Autor |
| --- | --- | --- | --- |
| `2026-04-24` | `1.0.0` | Spec inicial do fundamento. | `[Nome]` |
