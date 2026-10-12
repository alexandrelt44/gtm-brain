# Fundamento: movimento

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

1. **Movimento é comunicação, não enfeite.** Toda animação precisa merecer seus quadros: confirmar uma ação, mostrar a passagem entre estados ou dirigir a atenção.
2. **Curto por padrão.** 180 ms é a base. Sobreposições ganham 240 ms. Transições de página ganham 320 ms. Nada além disso deve parecer mais lento.
3. **Respeite `prefers-reduced-motion`.** Quando a pessoa desativa animações, só fades. Sem deslizamento, sem parallax, sem quique.
4. **Entrada e saída têm curvas diferentes.** Entradas parecem intencionais (`cubic-bezier(0.4, 0, 0.2, 1)`). Saídas parecem soltas (`cubic-bezier(0.2, 0.8, 0.2, 1)`).
5. **Uma propriedade por vez, quando der.** Animar opacidade + transform tem bom desempenho. Animar altura, largura ou `filter` não tem. Prefira transições que não mexem no layout.

## 3. Escala (apelidos da Camada 2)

| Apelido | Valor | Uso típico |
| --- | --- | --- |
| `--duration-fast` | 120 ms | Resposta ao hover, microinterações em links de texto |
| `--duration-base` | 180 ms | Hover de botão, transições de foco em campos |
| `--duration-medium` | 240 ms | Abertura de modal, exibição de popover, fade de tooltip |
| `--duration-slow` | 320 ms | Transições de página, revelação da seção do topo |

| Apelido | Valor | Uso típico |
| --- | --- | --- |
| `--easing-enter` | `cubic-bezier(0.4, 0, 0.2, 1)` | O que está chegando na tela |
| `--easing-exit` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | O que está saindo |

## 4. Regras de uso

- Hover / mudanças de estado: `--duration-base` + `--easing-enter`.
- Sobreposições (modal, popover, tooltip): `--duration-medium`; entrada com a curva de entrada, saída com a curva de saída.
- Transições de página: `--duration-slow` com fade. Sem deslizamento, a menos que a navegação seja naturalmente lateral (carrossel, fluxo em etapas).
- Skeleton loaders: `--duration-slow` num brilho de duas paradas. Não repita mais rápido que isso.
- `prefers-reduced-motion`: troque qualquer animação baseada em transform por fades só de opacidade, com a mesma duração.

## 5. Acessibilidade

Envolva todo movimento não essencial em:

```css
@media (prefers-reduced-motion: reduce) {
  .animated-thing { transition: none; animation: none; }
}
```

Movimento essencial (um indicador de carregamento mostrando progresso) pode ficar, mas deixe mais lento e com curva suave, para não desorientar quem tem sensibilidade vestibular.

## 6. Referências cruzadas

- Tokens: [`../tokens/tokens.md`](../tokens/tokens.md)
- Seção pareada da identidade visual: movimento em `/03-visual/IDENTIDADE-VISUAL.md`
- Átomos que consomem: [`../atomos/botao.md`](../atomos/botao.md), [`../atomos/campo.md`](../atomos/campo.md)

---

## Histórico de mudanças

| Data | Versão | Mudança | Autor |
| --- | --- | --- | --- |
| `2026-04-24` | `1.0.0` | Spec inicial do fundamento. | `[Nome]` |
