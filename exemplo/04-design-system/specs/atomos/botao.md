# Botão

## 1. Metadados

| Campo | Valor |
| --- | --- |
| Nível | `átomo` |
| Status | `estável` |
| Versão | `1.0.0` |
| Última atualização | `2026-04-24` |
| Responsável | `[Responsável por design, cargo]` |
| Componentes relacionados | [`campo`](./campo.md), `link`, `botao-icone`, `badge` |
| Fonte da verdade | `specs/atomos/botao.md` |

## 2. Visão geral

### Quando usar

Para o usuário iniciar ou confirmar uma ação. Botões representam intenção: enviar um formulário, começar um pagamento, abrir uma janela, avançar uma etapa. Use a variante **primária** no máximo uma vez por tela, para marcar a ação mais importante.

### Quando não usar

- Use um `link` quando o destino é outra página ou endereço, e não uma ação.
- Use um `botao-icone` quando o controle é só ícone (sem rótulo de texto).
- Use `abas` ou um `alternador` para escolher um estado que persiste.
- Use um `menu` quando mais de cinco ações relacionadas partem do mesmo ponto.

## 3. Anatomia

1. **Contêiner**: a área clicável. Carrega fundo, borda e anel de foco.
2. **Ícone à esquerda** (opcional): ícone de 16 px antes do rótulo, separado por `--space-200`.
3. **Rótulo**: um verbo no infinitivo ou no imperativo. Só a primeira letra maiúscula, sem pontuação no fim. ("Salvar alterações", não "Salvar.")
4. **Ícone à direita** (opcional): ícone de 16 px depois do rótulo. Reservado para setas, link externo ou chevrons que indicam direção.
5. **Indicador de carregamento** (opcional): substitui o ícone à esquerda quando o botão está carregando.

## 4. Tokens usados

| Propriedade | Token | Notas |
| --- | --- | --- |
| Fundo (primário, padrão) | `--color-brand` |  |
| Fundo (primário, hover) | `--color-brand-hover` |  |
| Texto (primário) | `--color-text-on-brand` |  |
| Fundo (secundário, padrão) | `--color-brand-secondary` |  |
| Fundo (secundário, hover) | `--color-brand-secondary-hover` |  |
| Fundo (fantasma, padrão) | `transparent` | Só borda |
| Borda (fantasma) | `--color-border` | 1 px |
| Texto (fantasma) | `--color-text-link` |  |
| Espaçamento interno (vertical) | `--space-300` | 12 px em cima e embaixo no `md` |
| Espaçamento interno (horizontal) | `--space-500` | 20 px à esquerda e à direita no `md` |
| Raio | `--radius-md` |  |
| Anel de foco | `--focus-ring` |  |
| Movimento | `--duration-base` + `--easing-enter` | Transição do fundo |
| Tamanho da fonte | `--fs-body` | Peso 600 |

As variantes de tamanho ajustam só o espaçamento interno e o tamanho da fonte; todos os outros tokens ficam iguais.

## 5. Props / API

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `variant` | `primary` \| `secondary` \| `ghost` | `primary` | Ênfase visual |
| `size` | `sm` \| `md` \| `lg` | `md` | Tamanho do controle |
| `type` | `button` \| `submit` \| `reset` | `button` | Semântica de formulário do HTML |
| `disabled` | `boolean` | `false` | Desativa a interação |
| `loading` | `boolean` | `false` | Mostra o indicador, bloqueia o clique, mantém a largura |
| `leadingIcon` | `ReactNode` | `null` | Ícone antes do rótulo |
| `trailingIcon` | `ReactNode` | `null` | Ícone depois do rótulo |
| `fullWidth` | `boolean` | `false` | Estica até a largura do contêiner |
| `aria-label` | `string` | derivado do rótulo | Obrigatório se o rótulo for só visual |

## 6. Estados

| Estado | Regras |
| --- | --- |
| Padrão | Base de cada variante (veja a tabela de tokens). |
| Hover | O fundo troca para o token `*-hover`. Transição de 180 ms. |
| Ativo / pressionado | 5% mais escuro que o hover. Opcional: sombra interna de 1 px como resposta ao toque. |
| Foco visível | Sempre `--focus-ring`. Nunca remova. Visível só no foco pelo teclado. |
| Desabilitado | 40% de opacidade. `cursor: not-allowed`. As regras de hover não valem. |
| Carregando | O rótulo continua legível (para manter a largura). O indicador substitui o ícone à esquerda. `aria-busy="true"` no botão. O clique é ignorado. |

## 7. Exemplo de código

```css
/* Todo CSS de componente referencia só apelidos da Camada 2. Veja tokens.css. */

.button {
  display:            inline-flex;
  align-items:        center;
  gap:                var(--space-200);
  padding:            var(--space-300) var(--space-500);
  border:             1px solid transparent;
  border-radius:      var(--radius-md);
  font-size:          var(--fs-body);
  font-weight:        600;
  line-height:        1;
  cursor:             pointer;
  transition:         background-color var(--duration-base) var(--easing-enter),
                      color            var(--duration-base) var(--easing-enter),
                      box-shadow       var(--duration-fast) var(--easing-enter);
}

/* Variantes */
.button--primary   { background-color: var(--color-brand);           color: var(--color-text-on-brand); }
.button--primary:hover   { background-color: var(--color-brand-hover); }
.button--secondary { background-color: var(--color-brand-secondary); color: var(--color-text-on-brand); }
.button--secondary:hover { background-color: var(--color-brand-secondary-hover); }
.button--ghost     { background-color: transparent; color: var(--color-text-link); border-color: var(--color-border); }
.button--ghost:hover     { background-color: var(--color-surface-subtle); }

/* Tamanhos: só espaçamento interno + tamanho da fonte */
.button--sm { padding: var(--space-200) var(--space-400); font-size: var(--fs-body-sm); }
.button--lg { padding: var(--space-400) var(--space-600); font-size: var(--fs-body-lg); }

/* Estados */
.button:focus-visible { box-shadow: var(--focus-ring); outline: none; }
.button[disabled]     { opacity: 0.4; cursor: not-allowed; pointer-events: none; }
.button[aria-busy="true"] { cursor: progress; }
```

### Referência em React

```tsx
export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  leadingIcon,
  trailingIcon,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`button button--${variant} button--${size}`}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <Spinner size={16} aria-hidden /> : leadingIcon}
      <span>{children}</span>
      {!loading && trailingIcon}
    </button>
  );
}
```

## 8. Referências cruzadas

- Fundamentos: [`fundamentos/cor.md`](../fundamentos/cor.md), [`fundamentos/espacamento.md`](../fundamentos/espacamento.md), [`fundamentos/tipografia.md`](../fundamentos/tipografia.md), [`fundamentos/movimento.md`](../fundamentos/movimento.md)
- Tokens: [`tokens/tokens.md`](../tokens/tokens.md)
- Irmãos: [`campo`](./campo.md)
- Consumido por (padrões): layouts de formulário, rodapés de modal, CTAs do topo da página.

---

## Histórico de mudanças

| Data | Versão | Mudança | Autor |
| --- | --- | --- | --- |
| `2026-04-24` | `1.0.0` | Spec inicial. | `[Nome]` |
