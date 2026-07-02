#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST_DIR="${CLAUDE_SKILLS_DIR:-"$HOME/.claude/skills"}"
FORCE=0

if [[ "${1:-}" == "--force" ]]; then
  FORCE=1
fi

skills=(
  prd
  trd
  ia
  user-flow
  api-spec
  erd
  qa-checklist
  doc-audit
)

mkdir -p "$DEST_DIR"

for skill in "${skills[@]}"; do
  source_dir="$ROOT_DIR/skills/$skill"
  target_dir="$DEST_DIR/$skill"

  if [[ -e "$target_dir/SKILL.md" && "$FORCE" != "1" ]]; then
    echo "Refusing to overwrite $target_dir. Re-run with --force to replace it."
    exit 1
  fi

  mkdir -p "$target_dir"
  cp -R "$source_dir/." "$target_dir/"
done

echo "Installed Dreampia Dev Kit skills to $DEST_DIR"
echo "Start a new Claude Code session and invoke a skill such as /prd or /doc-audit."
