#!/bin/bash
# Project initialization and smoke test script
# Run at the start of each agent session to verify the environment is healthy

set -e

echo "=== Initializing Dialed Intelligence website ==="

if [ ! -f "CLAUDE.md" ]; then
  echo "ERROR: Not in project root. CLAUDE.md not found."
  exit 1
fi

node -v
[ -d node_modules ] || npm ci

echo "=== Running smoke test ==="
npm run lint
npm run typecheck
npm run build

echo "=== Environment ready. Dev server: npm run dev (http://localhost:3000) ==="
