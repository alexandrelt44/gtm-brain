#!/usr/bin/env bash
# Installs Proof SDK (EveryInc/proof-sdk, MIT) pinned to a known commit into
# brain-graph/.proof-sdk (gitignored) and builds the editor bundle.
set -euo pipefail
cd "$(dirname "$0")/.."
PIN=fb2578758f1c62776301209131181643c5f4a19a
if [ ! -d .proof-sdk/.git ]; then
  git clone -q https://github.com/EveryInc/proof-sdk.git .proof-sdk
fi
git -C .proof-sdk fetch -q --depth 1 origin "$PIN" 2>/dev/null || true
git -C .proof-sdk checkout -q "$PIN"
cd .proof-sdk
npm install --no-audit --no-fund
npx vite build
node scripts/finalize-web-build.mjs
# The SDK server only serves public/; the hosted product serves the bundle elsewhere.
rm -rf public/assets && cp -R dist/assets public/assets
mkdir -p public/d && cp dist/assets/*.png public/d/  # avatars are requested relative to /d/
echo "Proof SDK $(git rev-parse --short HEAD) ready in brain-graph/.proof-sdk"
