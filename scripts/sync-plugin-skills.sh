#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PLUGIN_SKILLS_DIR="$ROOT_DIR/plugins/dreampia-dev-kit/skills"

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

mkdir -p "$PLUGIN_SKILLS_DIR"

for skill in "${skills[@]}"; do
  source_dir="$ROOT_DIR/skills/$skill"
  target_dir="$PLUGIN_SKILLS_DIR/$skill"
  mkdir -p "$target_dir"
  cp -R "$source_dir/." "$target_dir/"
done

echo "Synced ${#skills[@]} skills into plugins/dreampia-dev-kit/skills"
