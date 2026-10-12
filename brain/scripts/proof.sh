#!/usr/bin/env bash
# Starts the local Proof SDK server for the GTM Brain (default port 4000).
set -euo pipefail
cd "$(dirname "$0")/.."
PORT="${PROOF_PORT:-4000}"
STATE="$PWD/.gtm-brain"
mkdir -p "$STATE"
[ -d .proof-sdk/node_modules ] || bash scripts/setup-proof.sh
[ -f "$STATE/proof-secret" ] || node -e "process.stdout.write(require('crypto').randomBytes(32).toString('hex'))" > "$STATE/proof-secret"
# GTM Brain skin (proof-skin/): PT-BR UI and the brain's look. Re-injected on every start, the SDK stays unmodified.
mkdir -p .proof-sdk/public/gtm-skin && cp proof-skin/* .proof-sdk/public/gtm-skin/
node -e '
const fs = require("fs"), f = ".proof-sdk/dist/index.html"
const tags = `<!--gtm-skin--><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"><link rel="stylesheet" href="/gtm-skin/gtm-skin.css?v=${Date.now()}"><script src="/gtm-skin/gtm-skin.js?v=${Date.now()}"></script><!--/gtm-skin-->`
let h = fs.readFileSync(f, "utf8").replace(/<!--gtm-skin-->[\s\S]*?<!--\/gtm-skin-->/, "")
fs.writeFileSync(f, h.replace("</head>", tags + "</head>"))
'
cd .proof-sdk
# On-demand projection repair: off by default in the SDK, without it agent ops fail with PROJECTION_STALE.
# Public base URL on 127.0.0.1: the editor's collab socket must use the same host as the page.
# Collab runs embedded on the main port; without COLLAB_EMBEDDED_WS the editor dials port+1 and hangs on "Connecting".
exec env PORT="$PORT" \
  COLLAB_EMBEDDED_WS=true \
  COLLAB_PUBLIC_BASE_URL="ws://127.0.0.1:$PORT/ws" \
  DATABASE_PATH="$STATE/proof-share.db" \
  COLLAB_ON_DEMAND_PROJECTION_REPAIR_ENABLED=true \
  PROOF_COLLAB_SIGNING_SECRET="$(cat "$STATE/proof-secret")" \
  PROOF_PUBLIC_BASE_URL="http://127.0.0.1:$PORT" \
  PROOF_CORS_ALLOW_ORIGINS="http://127.0.0.1:$PORT,http://127.0.0.1:${GTM_PORT:-3348},http://localhost:${GTM_PORT:-3348}" \
  npx tsx server/index.ts
