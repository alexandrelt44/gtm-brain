# Fundamento: tipografia

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

1. **Uma escala, em todo lugar.** Todo tamanho usado em produção corresponde a um token `--fs-*`. Nada de valores intermediários.
2. **Tokens são funções, não tamanhos.** `--fs-h1` é "título da página", não "44 px". Para mudar o visual da marca, mude a escala uma vez; os componentes não mudam.
3. **A entrelinha anda junto com o tamanho.** Fontes display ganham entrelinha apertada. O texto corrido ganha uma folgada de 1,6. Código ganha 1,55.
4. **O peso é o outro eixo da hierarquia.** Não use mudança de tamanho e de peso para resolver o mesmo problema de hierarquia. Escolha uma.
5. **O espaçamento entre letras fica sutil.** Texto display fica levemente apertado, texto corrido fica em 0, caixa-alta ganha um pequeno espaçamento positivo.

## 3. Escala tipográfica (apelidos da Camada 2)

| Apelido | Função | Tamanho | Entrelinha | Peso | Espaçamento entre letras |
| --- | --- | --- | --- | --- | --- |
| `--fs-display-xl` | Destaque do topo | 72 px | 1.05 | 700 | -0.02em |
| `--fs-display-lg` | Destaque secundário | 56 px | 1.10 | 700 | -0.02em |
| `--fs-h1` | Título da página | 44 px | 1.15 | 700 | -0.01em |
| `--fs-h2` | Título de seção | 32 px | 1.20 | 600 | 0 |
| `--fs-h3` | Subseção | 24 px | 1.30 | 600 | 0 |
| `--fs-h4` | Título pequeno | 20 px | 1.35 | 600 | 0 |
| `--fs-body-lg` | Parágrafo de abertura | 18 px | 1.60 | 400 | 0 |
| `--fs-body` | Texto padrão | 16 px | 1.60 | 400 | 0 |
| `--fs-body-sm` | Legenda, metadados | 14 px | 1.55 | 400 | 0.005em |
| `--fs-mono` | Código | 14 px | 1.55 | 400 | 0 |

## 4. Pilhas de fontes

As famílias são declaradas em `../../../03-visual/IDENTIDADE-VISUAL.md`. Use as pilhas de fallback de lá; não declare de novo aqui. A separação existe para que um designer troque as fontes uma vez, sem caçar cada spec de componente.

## 5. Regras de uso

- Títulos: use os tokens de título em ordem decrescente. Não pule níveis para dar ênfase visual. Use peso ou cor para nuances.
- Texto corrido: padrão `--fs-body`. Use `--fs-body-lg` só para parágrafos de abertura logo abaixo do topo da página.
- Legendas e metadados: `--fs-body-sm` com `--color-text-muted`.
- Código: `--fs-mono` com `--color-text` sobre `--color-surface-muted`.
- Impresso: uma escala paralela fica em `../../../03-visual/IDENTIDADE-VISUAL.md`, em "Escala para impresso". Não misture tokens de impresso e de tela.

## 6. Referências cruzadas

- Tokens: [`../tokens/tokens.md`](../tokens/tokens.md)
- Seção pareada da identidade visual: tipografia em `/03-visual/IDENTIDADE-VISUAL.md`
- Átomos que consomem: [`../atomos/botao.md`](../atomos/botao.md), [`../atomos/campo.md`](../atomos/campo.md)

---

## Histórico de mudanças

| Data | Versão | Mudança | Autor |
| --- | --- | --- | --- |
| `2026-04-24` | `1.0.0` | Spec inicial do fundamento. | `[Nome]` |
