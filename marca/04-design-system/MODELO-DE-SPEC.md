# Modelo de spec de componente

Copie este arquivo ao escrever uma nova spec de componente em `specs/atomos/`, `specs/moleculas/` ou `specs/organismos/`. Toda spec de componente segue as mesmas oito seções. A consistência é o ponto: quando um agente de IA monta um formulário, ele lê `padroes/layout-de-formulario.md` para o espaçamento, `moleculas/formulario.md` para a estrutura, `atomos/campo.md` para os campos e `tokens/tokens.md` para os valores exatos. Cada escolha é uma consulta, não um chute.

Renomeie a cópia para `<nome-do-componente>.md`, preencha todas as seções, apague as notas de apoio do modelo (em itálico) e abra um pull request.

Veja `specs/atomos/botao.md` e `specs/atomos/campo.md` para exemplos prontos que usam este modelo.

---

<!-- markdownlint-disable-next-line MD025 -->
# Nome do componente

## 1. Metadados

| Campo | Valor |
| --- | --- |
| Nível | `átomo` / `molécula` / `organismo` |
| Status | `rascunho` / `beta` / `estável` / `descontinuado` |
| Versão | `1.0.0` |
| Última atualização | `AAAA-MM-DD` |
| Responsável | `[Nome, cargo]` |
| Componentes relacionados | Links para os arquivos de spec relacionados |
| Fonte da verdade | `specs/<nivel>/<componente>.md` |

## 2. Visão geral

### Quando usar

De uma a três frases descrevendo o trabalho que este componente faz. Que problema do usuário ele resolve, e em que contexto.

### Quando não usar

Liste os usos errados mais comuns. Se outro componente servir melhor, diga qual e coloque o link da spec.

## 3. Anatomia

*Descreva as partes do componente numa lista numerada. Se houver imagem, faça referência a ela. Todo elemento visível ganha um nome, para que conversa e código usem os mesmos termos.*

1. **Contêiner**: o invólucro externo.
2. **Elemento à esquerda**: ícone, avatar ou indicador opcional.
3. **Rótulo / conteúdo**: o texto principal.
4. **Elemento à direita**: ícone, badge ou indicação de ação opcional.
5. **Texto de apoio**: legenda opcional abaixo do conteúdo principal.

Opcional: inclua um esboço em ASCII ou um link para um frame do Figma.

## 4. Tokens usados

*Liste todos os tokens que o componente referencia. Se ele lê um token, o token entra aqui. O script de auditoria de tokens confere esta seção contra o CSS do componente.*

| Propriedade | Token | Notas |
| --- | --- | --- |
| Fundo | `--color-surface` | Estado padrão |
| Fundo (hover) | `--color-surface-subtle` |  |
| Texto | `--color-text` |  |
| Borda | `--color-border` | 1 px |
| Espaçamento interno (vertical) | `--space-300` |  |
| Espaçamento interno (horizontal) | `--space-500` |  |
| Raio | `--radius-md` |  |
| Movimento | `--duration-base` com `--easing-enter` | Transição do hover |

## 5. Props / API

*Para componentes com API programática. Para componentes só em CSS, descreva as classes modificadoras ou os atributos data.*

| Prop / classe / atributo | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `variant` | `primary` \| `secondary` \| `ghost` | `primary` | Variante visual |
| `size` | `sm` \| `md` \| `lg` | `md` | Degrau de tamanho |
| `disabled` | `boolean` | `false` | Bloqueia a interação, deixa acinzentado |
| `leadingIcon` | `ReactNode` | nenhum | Ícone opcional antes do rótulo |

## 6. Estados

*Todo componente interativo define todos os estados. Se um estado ficou de fora de propósito (por exemplo, um átomo só de exibição não tem hover), diga isso. Nunca deixe o leitor adivinhando.*

| Estado | Regras |
| --- | --- |
| Padrão | Descreva o visual de base. |
| Hover | Quais tokens mudam. |
| Ativo / pressionado | Quais tokens mudam. |
| Foco visível | Sempre use `--focus-ring`. Nunca remova o anel de foco. |
| Desabilitado | Mudanças de token + cursor de item não interativo. |
| Carregando | Opcional. Defina se o componente aceita ação assíncrona. |
| Erro | Opcional. Defina se o componente recebe entrada do usuário. |
| Selecionado | Opcional. Defina se o componente tem um estado de seleção persistente. |

## 7. Exemplo de código

```css
/* O CSS do componente só referencia apelidos da Camada 2 de tokens.css.
   Nunca hex bruto, nunca pixel bruto, nunca tokens `--ds-*` da Camada 1. */

.component-name {
  background-color: var(--color-surface);
  color:            var(--color-text);
  padding:          var(--space-300) var(--space-500);
  border:           1px solid var(--color-border);
  border-radius:    var(--radius-md);
  transition:       background-color var(--duration-base) var(--easing-enter);
}

.component-name:hover        { background-color: var(--color-surface-subtle); }
.component-name:focus-visible{ box-shadow: var(--focus-ring); outline: none; }
.component-name[disabled]    { opacity: 0.4; cursor: not-allowed; }
```

Opcional: trechos de framework (React, Vue, Web Component) que consomem os mesmos tokens.

## 8. Referências cruzadas

- Átomos, moléculas e organismos relacionados, com link para os arquivos de spec.
- Padrões que consomem este componente (por exemplo, `padroes/layout-de-formulario.md`).
- Componente do design system de origem ao qual este corresponde, se houver.
- Specs de fundamentos relevantes (`fundamentos/cor.md`, `fundamentos/espacamento.md` etc.).

---

## Histórico de mudanças

| Data | Versão | Mudança | Autor |
| --- | --- | --- | --- |
| `AAAA-MM-DD` | `1.0.0` | Spec inicial. | `[Nome]` |
