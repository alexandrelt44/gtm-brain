#!/usr/bin/env bash
# Proof (port 4000) in the background + GTM Brain server (port 3348). Extra args go to the server,
# e.g. `npm run dev -- --write` to save edits into the brand files.
set -euo pipefail
cd "$(dirname "$0")/.."
bash scripts/proof.sh > .gtm-brain/proof-server.log 2>&1 &
PROOF_PID=$!
trap 'kill $PROOF_PID 2>/dev/null' EXIT
for i in $(seq 1 30); do curl -sf "http://127.0.0.1:${PROOF_PORT:-4000}/health" >/dev/null && break; sleep 1; done
node src/server.mjs --port "${GTM_PORT:-3348}" --proof "http://127.0.0.1:${PROOF_PORT:-4000}" "$@"
