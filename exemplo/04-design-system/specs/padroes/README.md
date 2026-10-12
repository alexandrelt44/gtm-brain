# Padrões

Regras transversais que valem para muitos componentes. Um padrão não é um componente; é uma regra que os componentes seguem.

## Vazia de propósito

Esta pasta vem vazia para você não cair na tentação de copiar specs velhas que talvez não batam com a sua interface. Acrescente os padrões que o seu produto realmente usa. Padrões são mais curtos que specs de componente: de duas a quatro páginas de Markdown é o comum.

## Padrões sugeridos para produtos de pequenas e médias empresas

1. `layout-de-formulario.md` (ritmo de espaçamento, posição do rótulo, posição do erro, marcação de campo obrigatório)
2. `estados-vazios.md` (ícone + título + descrição + ação principal)
3. `carregamento-e-skeletons.md` (quando usar indicador giratório, quando usar skeleton, quando não mostrar nada)
4. `tratamento-de-erros.md` (validação no campo vs erro na página vs toasts)
5. `layout-de-tres-colunas.md`
6. `dialogos-de-confirmacao.md` (destrutivos vs não destrutivos)
7. `notificacoes.md` (faixa, toast, em linha)

## Formato de uma spec de padrão

Padrões podem usar o mesmo modelo de oito seções dos componentes. As seções 5 (Props) e 7 (Código) podem ser mais curtas ou ficar de fora. As seções úteis são Visão geral, Tokens usados, Estados e Referências cruzadas.

## Referências cruzadas

- Fundamentos: [`../fundamentos/`](../fundamentos/)
- Átomos, moléculas, organismos: [`../atomos/`](../atomos/), [`../moleculas/`](../moleculas/), [`../organismos/`](../organismos/)
