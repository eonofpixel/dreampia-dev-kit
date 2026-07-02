#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CODEX_ROOT="${CODEX_HOME:-"$HOME/.codex"}"
SKILL_DEST_DIR="$CODEX_ROOT/skills"
PROMPT_DEST_DIR="$CODEX_ROOT/prompts"
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

mkdir -p "$SKILL_DEST_DIR" "$PROMPT_DEST_DIR"

for skill in "${skills[@]}"; do
  source_dir="$ROOT_DIR/skills/$skill"
  target_dir="$SKILL_DEST_DIR/$skill"

  if [[ -e "$target_dir/SKILL.md" && "$FORCE" != "1" ]]; then
    echo "Refusing to overwrite $target_dir. Re-run with --force to replace it."
    exit 1
  fi

  mkdir -p "$target_dir"
  cp -R "$source_dir/." "$target_dir/"
done

for prompt_file in "$ROOT_DIR"/shortcuts/codex/*.md; do
  target_file="$PROMPT_DEST_DIR/$(basename "$prompt_file")"

  if [[ -e "$target_file" && "$FORCE" != "1" ]]; then
    echo "Refusing to overwrite $target_file. Re-run with --force to replace it."
    exit 1
  fi

  cp "$prompt_file" "$target_file"
done

echo "Installed Dreampia Dev Kit skills to $SKILL_DEST_DIR"
echo "Installed optional Codex prompt shortcuts to $PROMPT_DEST_DIR"
echo "Start a new Codex session and invoke a skill such as /prd, \$prd, or /prompts:dreampia-prd."
