#!/usr/bin/env bash
#
# auditar-tokens.sh - checagem de disciplina de tokens do design system
#
# Varre os arquivos CSS do repositório procurando padrões que violam a
# arquitetura de tokens em três camadas descrita em 04-design-system/DESIGN.md:
#
#   1. Cores hex fixas (#rrggbb, #rrggbbaa, #rgb) fora do tokens.css.
#   2. Literais oklch(...) fixos fora do tokens.css.
#   3. Valores em pixel fixos em padding, margin, border-radius, font-size
#      ou gap, onde deveria entrar um alias --space-*, --radius-* ou --fs-*.
#   4. Referências diretas a tokens da camada 1 (--ds-*) fora do tokens.css.
#
# Para cada ocorrência, mostra arquivo, linha, o trecho problemático e uma dica.
#
# Códigos de saída:
#   Padrão:        sempre 0 (só relatório), para não bloquear quem ainda
#                  não preencheu os próprios tokens.
#   STRICT=1:      sai com 1 se encontrar qualquer violação. Use no CI quando
#                  o código estiver limpo e você quiser que desvios bloqueiem merges.
#
# Uso:
#   bash scripts/auditar-tokens.sh             # só relatório (padrão)
#   STRICT=1 bash scripts/auditar-tokens.sh    # falha com violações
#
# Sem dependências além de grep, find e sed.

set -u

RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
CYAN="\033[0;36m"
BOLD="\033[1m"
RESET="\033[0m"

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"

STRICT="${STRICT:-0}"

echo -e "${BOLD}Auditoria de tokens${RESET}"
echo "  modo: $( [[ "$STRICT" == "1" ]] && echo "ESTRITO (violações reprovam esta execução)" || echo "só relatório (sai com 0 de qualquer jeito)" )"
echo ""

# Encontra todo arquivo CSS, menos o arquivo canônico de tokens e node_modules.
css_files=$(find . -type f -name '*.css' \
  -not -path './.git/*' \
  -not -path './node_modules/*' \
  -not -path './**/node_modules/*' \
  -not -name 'tokens.css' 2>/dev/null || true)

if [[ -z "$css_files" ]]; then
  echo -e "  ${GREEN}Nenhum CSS de componente fora do tokens.css. Nada para auditar.${RESET}"
  echo "  (É o esperado no repositório inicial, até você acrescentar o CSS dos seus componentes.)"
  exit 0
fi

violation_count=0

report() {
  local kind="$1"
  local file="$2"
  local line="$3"
  local match="$4"
  local hint="$5"
  printf "  ${RED}%-12s${RESET} ${CYAN}%s${RESET}:${BOLD}%s${RESET}\n" "$kind" "$file" "$line"
  printf "               %s\n" "$match"
  printf "               ${YELLOW}dica:${RESET} %s\n\n" "$hint"
  violation_count=$((violation_count + 1))
}

echo -e "${BOLD}1. Cores hex fixas${RESET}"
echo "   Esperado: var(--color-*) dos aliases da camada 2 no tokens.css."
echo ""

while IFS=: read -r file line match; do
  [[ -z "$file" ]] && continue
  report "HEX FIXO" "$file" "$line" "$(echo "$match" | sed 's/^[[:space:]]*//')" \
    "Troque por um alias --color-*. Veja o mapa em 04-design-system/specs/tokens/tokens.md."
done < <(grep -nE '#[0-9A-Fa-f]{3,8}\b' $css_files 2>/dev/null || true)

echo -e "${BOLD}2. Literais oklch() fixos${RESET}"
echo "   Esperado: var(--color-*) do tokens.css."
echo ""

while IFS=: read -r file line match; do
  [[ -z "$file" ]] && continue
  report "OKLCH FIXO" "$file" "$line" "$(echo "$match" | sed 's/^[[:space:]]*//')" \
    "Troque por um alias --color-*. OKLCH fixo só existe na camada 1 do tokens.css."
done < <(grep -nE 'oklch\(' $css_files 2>/dev/null || true)

echo -e "${BOLD}3. Pixels fixos em espaçamento, raio, tamanho de fonte e gap${RESET}"
echo "   Esperado: var(--space-*), var(--radius-*), var(--fs-*)."
echo ""

while IFS=: read -r file line match; do
  [[ -z "$file" ]] && continue
  # Pula linhas que já usam var(); já têm alias, só casaram "px" dentro de um valor reserva.
  if echo "$match" | grep -q 'var('; then
    continue
  fi
  report "PX FIXO" "$file" "$line" "$(echo "$match" | sed 's/^[[:space:]]*//')" \
    "Troque por um alias --space-*, --radius-* ou --fs-*."
done < <(grep -nE '(padding|margin|border-radius|font-size|gap)[^:]*:[^;]*[0-9]+px' $css_files 2>/dev/null || true)

echo -e "${BOLD}4. Referências diretas à camada 1 (--ds-*) fora do tokens.css${RESET}"
echo "   Esperado: sempre passar pelos aliases da camada 2. A camada 1 é privada do tokens.css."
echo ""

while IFS=: read -r file line match; do
  [[ -z "$file" ]] && continue
  report "CAMADA 1" "$file" "$line" "$(echo "$match" | sed 's/^[[:space:]]*//')" \
    "Não referencie --ds-* direto. Crie ou use um alias da camada 2 no tokens.css."
done < <(grep -nE 'var\(--ds-' $css_files 2>/dev/null || true)

echo ""
echo -e "${BOLD}Resumo${RESET}"
if [[ "$violation_count" -eq 0 ]]; then
  echo -e "  ${GREEN}Limpo. Nenhuma violação de tokens em $(echo "$css_files" | wc -l | tr -d ' ') arquivo(s).${RESET}"
else
  echo -e "  ${RED}${violation_count} violação(ões) encontrada(s).${RESET}"
  echo -e "  Veja a arquitetura de tokens em três camadas em 04-design-system/DESIGN.md e"
  echo -e "  o mapa de aliases em 04-design-system/specs/tokens/tokens.md."
fi
echo ""

if [[ "$STRICT" == "1" && "$violation_count" -gt 0 ]]; then
  exit 1
fi
exit 0
