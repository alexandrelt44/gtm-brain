#!/usr/bin/env bash
#
# validar.sh - validador das 11 camadas da marca
#
# Rode a partir da raiz do repositório depois de copiar e começar a preencher os modelos:
#
#     bash scripts/validar.sh
#
# Ele vai:
#   1. Aprovar ou reprovar a presença de cada arquivo canônico (checagem obrigatória).
#   2. Avisar sobre placeholders não preenchidos, como [Nome da empresa], [AAAA-MM-DD],
#      [Nome da persona], para você ver quais modelos ainda precisam do seu conteúdo.
#
# Códigos de saída:
#   0  Todos os arquivos canônicos presentes. (Placeholders são avisos, não falhas.)
#   1  Um ou mais arquivos canônicos faltando.
#
# O script é bash puro de propósito, sem dependências além de grep, find e sed,
# para rodar em qualquer lugar.

set -u

RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
BOLD="\033[1m"
RESET="\033[0m"

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"

CANONICAL_FILES=(
  "README.md"
  "CONTRIBUINDO.md"
  "HISTORICO.md"
  "AUDITORIAS.md"
  "01-icp/ICP.md"
  "01-icp/VOZ-DO-CLIENTE.md"
  "01-icp/COMITE-DE-COMPRA.md"
  "02-voz/VOZ.md"
  "02-voz/TERMINOLOGIA.md"
  "02-voz/COMPLIANCE.md"
  "03-visual/IDENTIDADE-VISUAL.md"
  "03-visual/IMAGENS.md"
  "03-visual/PROMPTS-DE-IMAGEM.md"
  "04-design-system/DESIGN.md"
  "04-design-system/theme.json"
  "04-design-system/tokens.css"
  "04-design-system/MODELO-DE-SPEC.md"
  "04-design-system/REFERENCIAS.md"
  "04-design-system/specs/README.md"
  "04-design-system/specs/fundamentos/cor.md"
  "04-design-system/specs/fundamentos/tipografia.md"
  "04-design-system/specs/fundamentos/espacamento.md"
  "04-design-system/specs/fundamentos/movimento.md"
  "04-design-system/specs/tokens/tokens.md"
  "04-design-system/specs/atomos/botao.md"
  "04-design-system/specs/atomos/campo.md"
  "05-oferta/OFERTA.md"
  "05-oferta/CONCORRENCIA.md"
  "05-oferta/GANHOS-E-PERDAS.md"
  "06-seo/PALAVRAS-CHAVE.md"
  "06-seo/CLUSTERS.md"
  "06-seo/GEO-AEO.md"
  "07-site/MAPA-DO-SITE.md"
  "07-site/DADOS-ESTRUTURADOS.md"
  "08-conteudo/BIBLIOTECA.md"
  "08-conteudo/CALENDARIO.md"
  "08-conteudo/PROVAS.md"
  "09-dados/MEDICAO.md"
  "09-dados/PLANO-DE-MEDICAO.md"
  "09-dados/DESTAQUES.md"
  "10-cerebro/CEREBRO.md"
  "10-cerebro/contexto-criativo/README.md"
  "10-cerebro/contexto-criativo/criador.md"
  "10-cerebro/contexto-criativo/audiencia.md"
  "10-cerebro/contexto-criativo/gosto.md"
  "11-plano/README.md"
  "11-plano/PLANO-DE-UMA-PAGINA.md"
  "11-plano/EXEMPLO-cadencia.md"
  "11-plano/CONTA-DO-CLIENTE.md"
  "11-plano/REVISAO-MENSAL.md"
  "11-plano/PROMPTS.md"
  "11-plano/HISTORICO.md"
)

PLACEHOLDER_PATTERNS=(
  '\[Nome da empresa\]'
  '\[Nome da marca\]'
  '\[Nome do produto\]'
  '\[Nome da persona\]'
  '\[Nome da oferta\]'
  '\[AAAA-MM-DD\]'
  '\[Nome, cargo\]'
)

echo -e "${BOLD}Validador das 11 camadas da marca${RESET}"
echo ""

echo -e "${BOLD}1. Presença dos arquivos canônicos${RESET}"
missing=0
for f in "${CANONICAL_FILES[@]}"; do
  if [[ -f "$f" ]]; then
    echo -e "  ${GREEN}ok${RESET}       $f"
  else
    echo -e "  ${RED}FALTANDO${RESET} $f"
    missing=$((missing + 1))
  fi
done
echo ""

echo -e "${BOLD}2. Placeholders não preenchidos (avisos)${RESET}"
echo "   Se você acabou de copiar o repositório, espere muitos. Conforme preenche os modelos, esta lista diminui."
echo ""

total_placeholders=0
for pattern in "${PLACEHOLDER_PATTERNS[@]}"; do
  count=$(grep -r -E --include='*.md' --include='*.json' "$pattern" . 2>/dev/null | grep -v '^\./\.git/' | wc -l | tr -d ' ')
  total_placeholders=$((total_placeholders + count))
  if [[ "$count" -gt 0 ]]; then
    printf "  ${YELLOW}%4d${RESET}  ocorrências de  ${BOLD}%s${RESET}\n" "$count" "$pattern"
  fi
done

if [[ "$total_placeholders" -eq 0 ]]; then
  echo -e "  ${GREEN}Nenhum placeholder encontrado. As camadas parecem totalmente preenchidas.${RESET}"
fi
echo ""

echo -e "${BOLD}Resumo${RESET}"
if [[ "$missing" -eq 0 ]]; then
  echo -e "  ${GREEN}Todos os ${#CANONICAL_FILES[@]} arquivos canônicos presentes.${RESET}"
else
  echo -e "  ${RED}${missing} arquivo(s) canônico(s) faltando. Corrija antes de publicar.${RESET}"
fi
echo -e "  ${YELLOW}${total_placeholders} ocorrência(s) de placeholder restante(s) no repositório.${RESET}"
echo ""

if [[ "$missing" -gt 0 ]]; then
  exit 1
fi
exit 0
