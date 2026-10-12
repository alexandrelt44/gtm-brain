# Campo de texto

## 1. Metadados

| Campo | Valor |
| --- | --- |
| Nível | `átomo` |
| Status | `estável` |
| Versão | `1.0.0` |
| Última atualização | `2026-04-24` |
| Responsável | `[Responsável por design, cargo]` |
| Componentes relacionados | [`botao`](./botao.md), `area-de-texto`, `seletor`, `rotulo-de-campo`, `grupo-de-campos` |
| Fonte da verdade | `specs/atomos/campo.md` |

## 2. Visão geral

### Quando usar

Para entrada de texto em uma linha: nomes, e-mails, buscas, números, endereços web, respostas curtas livres.

### Quando não usar

- Use `area-de-texto` para entrada em várias linhas.
- Use `seletor` ou `combobox` para escolher dentro de um conjunto conhecido.
- Use um `seletor-de-data` ou um campo com máscara para datas, horários, valores em reais e formatos fixos (CPF, CNPJ, telefone, CEP).

## 3. Anatomia

1. **Contêiner**: o invólucro do campo. Carrega fundo, borda e anel de foco.
2. **Elemento à esquerda** (opcional): ícone de 16 px (busca, e-mail) ou prefixo (`R$`, `https://`).
3. **Elemento de entrada**: o `<input>` nativo. Carrega o cursor, o placeholder e o valor.
4. **Elemento à direita** (opcional): botão de limpar, chevron de lista, ícone de validação ou unidade (`px`, `%`).
5. **Texto de ajuda** (opcional): fica abaixo do contêiner. Usado para dicas de formato ou mensagens de erro.

## 4. Tokens usados

| Propriedade | Token | Notas |
| --- | --- | --- |
| Fundo (padrão) | `--color-surface` |  |
| Borda (padrão) | `--color-border` | 1 px |
| Borda (foco) | `--color-brand` | Via `--focus-ring` |
| Borda (erro) | `--color-danger` | 1 px, com o texto de ajuda na mesma cor |
| Texto | `--color-text` |  |
| Placeholder | `--color-text-muted` |  |
| Espaçamento interno (vertical) | `--space-300` | 12 px |
| Espaçamento interno (horizontal) | `--space-400` | 16 px |
| Raio | `--radius-md` |  |
| Anel de foco | `--focus-ring` |  |
| Tamanho da fonte | `--fs-body` |  |

## 5. Props / API

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `type` | `text` \| `email` \| `url` \| `tel` \| `number` \| `search` \| `password` | `text` | Tipo nativo do input |
| `size` | `sm` \| `md` \| `lg` | `md` | Tamanho do controle |
| `value` | `string` | `""` | Valor controlado |
| `onChange` | `(event) => void` | nenhum | Função chamada na mudança |
| `placeholder` | `string` | `""` | Texto de dica, não substitui o rótulo |
| `disabled` | `boolean` | `false` | Bloqueia a interação |
| `invalid` | `boolean` | `false` | Aplica o estilo de erro + `aria-invalid` |
| `leadingIcon` | `ReactNode` | `null` | Ícone antes do campo |
| `trailingIcon` | `ReactNode` | `null` | Ícone ou ação depois do campo |
| `helperText` | `string` | `""` | Abaixo do campo. Vira texto de erro quando `invalid`. |
| `aria-label` ou `aria-labelledby` | `string` | nenhum | Obrigatório se não houver `<label>` visível associado |

## 6. Estados

| Estado | Regras |
| --- | --- |
| Padrão | Base conforme os tokens acima. |
| Hover | A borda muda para `--color-text-muted`, para indicar que é clicável. Nada mais muda. |
| Foco visível | Sempre `--focus-ring`. A cor da borda não muda por conta própria; o anel é o sinal. |
| Preenchido | Nenhuma mudança visual em relação ao padrão. O valor aparece em `--color-text`. |
| Desabilitado | 40% de opacidade. `cursor: not-allowed`. O fundo muda para `--color-surface-subtle`. |
| Inválido | A borda vira `--color-danger`. O texto de ajuda também fica `--color-danger`. `aria-invalid="true"`. |
| Somente leitura | Fundo `--color-surface-subtle`. Cursor `default`. A cor da borda não muda. |

## 7. Exemplo de código

```css
.input {
  display:       block;
  width:         100%;
  padding:       var(--space-300) var(--space-400);
  background-color: var(--color-surface);
  color:         var(--color-text);
  border:        1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size:     var(--fs-body);
  line-height:   1.4;
  transition:    border-color var(--duration-base) var(--easing-enter),
                 box-shadow   var(--duration-fast) var(--easing-enter);
}

.input::placeholder       { color: var(--color-text-muted); }
.input:hover              { border-color: var(--color-text-muted); }
.input:focus-visible      { box-shadow: var(--focus-ring); border-color: transparent; outline: none; }
.input[disabled]          { opacity: 0.4; cursor: not-allowed; background-color: var(--color-surface-subtle); }
.input[aria-invalid="true"]{ border-color: var(--color-danger); }

.input--sm { padding: var(--space-200) var(--space-300); font-size: var(--fs-body-sm); }
.input--lg { padding: var(--space-400) var(--space-500); font-size: var(--fs-body-lg); }

.input-helper           { font-size: var(--fs-body-sm); color: var(--color-text-muted); margin-top: var(--space-200); }
.input-helper[data-error="true"] { color: var(--color-danger); }
```

## 8. Referências cruzadas

- Fundamentos: [`fundamentos/cor.md`](../fundamentos/cor.md), [`fundamentos/espacamento.md`](../fundamentos/espacamento.md), [`fundamentos/tipografia.md`](../fundamentos/tipografia.md)
- Tokens: [`tokens/tokens.md`](../tokens/tokens.md)
- Irmãos: [`botao`](./botao.md) (mesma escala de tamanho, mesmo raio, mesmo anel de foco)
- Consumido por (padrões): layouts de formulário, barras de busca, painéis de filtro.

---

## Histórico de mudanças

| Data | Versão | Mudança | Autor |
| --- | --- | --- | --- |
| `2026-04-24` | `1.0.0` | Spec inicial. | `[Nome]` |
