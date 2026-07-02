#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILL_DEST_DIR="${CLAUDE_SKILLS_DIR:-"$HOME/.claude/skills"}"
COMMAND_DEST_DIR="${CLAUDE_COMMANDS_DIR:-"$HOME/.claude/commands"}"
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

mkdir -p "$SKILL_DEST_DIR" "$COMMAND_DEST_DIR"

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

for command_file in "$ROOT_DIR"/shortcuts/claude-code/*.md; do
  target_file="$COMMAND_DEST_DIR/$(basename "$command_file")"

  if [[ -e "$target_file" && "$FORCE" != "1" ]]; then
    echo "Refusing to overwrite $target_file. Re-run with --force to replace it."
    exit 1
  fi

  cp "$command_file" "$target_file"
done

echo "Installed Dreampia Dev Kit skills to $SKILL_DEST_DIR"
echo "Installed Claude Code slash command shortcuts to $COMMAND_DEST_DIR"
echo "Start a new Claude Code session and invoke /prd, /doc-audit, or /dreampia-prd."
