#!/usr/bin/env bash
# deploy.sh — safe one-step deploy for pet-cost-calculator
# Usage: ./deploy.sh "commit message"
#
# What it does:
#   1. Clears any stale git *.lock files left behind by crashed processes
#   2. Stages ALL current changes and shows you exactly what's included
#   3. Commits with your message and pushes (Netlify auto-deploys on push)
#
# Note: this commits EVERYTHING currently changed. If you only want some
# files in a commit, stage them manually with `git add <file>` and use
# plain `git commit` / `git push` instead.

set -euo pipefail

# Always run from the repo root (the folder this script lives in)
cd "$(dirname "$0")"

MSG="${1:-}"
if [ -z "$MSG" ]; then
  echo "Usage: ./deploy.sh \"commit message\""
  exit 1
fi

GITDIR="$(git rev-parse --git-dir)"

# 1. Clear stale lock files (only safe when no editor is mid-git-operation)
LOCKS="$(find "$GITDIR" -name '*.lock' 2>/dev/null || true)"
if [ -n "$LOCKS" ]; then
  echo "Clearing stale git locks:"
  echo "$LOCKS"
  find "$GITDIR" -name '*.lock' -delete
fi

# 2. Stage everything and show what's included
git add -A
if git diff --cached --quiet; then
  echo "Nothing to commit — working tree clean. Nothing deployed."
  exit 0
fi

echo
echo "Files in this commit:"
git diff --cached --name-status
echo

# 3. Commit and push
git commit -m "$MSG"
git push

echo
echo "Deployed. Netlify will auto-build from this push."
