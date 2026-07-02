#!/usr/bin/env bash
set -euo pipefail

REPO_URL="https://github.com/eonofpixel/dreampia-dev-kit"
REF="${DREAMPIA_DEV_KIT_REF:-main}"
AGENT="both"
FORCE=0
TEMP_DIR=""

usage() {
  cat <<'USAGE'
Install dreampia-dev-kit skills for Codex and/or Claude Code.

Usage:
  bash install.sh [--agent codex|claude|claude-code|both] [--force]

Examples:
  bash install.sh
  bash install.sh --agent codex
  bash install.sh --agent claude-code --force

Environment:
  DREAMPIA_DEV_KIT_REF         Git branch, tag, or SHA to download. Default: main
  DREAMPIA_DEV_KIT_SOURCE_DIR  Use a local checkout instead of downloading from GitHub.
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --agent)
      AGENT="${2:-}"
      shift 2
      ;;
    --force)
      FORCE=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

case "$AGENT" in
  codex|claude|claude-code|both) ;;
  *)
    echo "Invalid --agent value: $AGENT" >&2
    usage >&2
    exit 1
    ;;
esac

cleanup() {
  if [[ -n "$TEMP_DIR" && -d "$TEMP_DIR" ]]; then
    rm -rf "$TEMP_DIR"
  fi
}
trap cleanup EXIT

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

resolve_source_dir() {
  if [[ -n "${DREAMPIA_DEV_KIT_SOURCE_DIR:-}" ]]; then
    SOURCE_DIR="$(cd "$DREAMPIA_DEV_KIT_SOURCE_DIR" && pwd)"
    return
  fi

  require_command curl
  require_command tar
  require_command mktemp

  TEMP_DIR="$(mktemp -d)"
  ARCHIVE_PATH="$TEMP_DIR/dreampia-dev-kit.tar.gz"
  ARCHIVE_URL="https://codeload.github.com/eonofpixel/dreampia-dev-kit/tar.gz/$REF"

  echo "Downloading dreampia-dev-kit from $ARCHIVE_URL"
  curl -fsSL "$ARCHIVE_URL" -o "$ARCHIVE_PATH"
  tar -xzf "$ARCHIVE_PATH" -C "$TEMP_DIR"

  SOURCE_DIR="$(find "$TEMP_DIR" -maxdepth 1 -type d -name 'dreampia-dev-kit-*' | head -n 1)"
  if [[ -z "$SOURCE_DIR" ]]; then
    echo "Could not find extracted dreampia-dev-kit archive." >&2
    exit 1
  fi
}

run_installer() {
  local installer="$1"

  if [[ "$FORCE" == "1" ]]; then
    bash "$SOURCE_DIR/$installer" --force
  else
    bash "$SOURCE_DIR/$installer"
  fi
}

resolve_source_dir

case "$AGENT" in
  codex)
    run_installer "scripts/install-codex.sh"
    ;;
  claude|claude-code)
    run_installer "scripts/install-claude-code.sh"
    ;;
  both)
    run_installer "scripts/install-codex.sh"
    run_installer "scripts/install-claude-code.sh"
    ;;
esac

echo "dreampia-dev-kit install complete."
echo "Start a new agent session before invoking /prd or /doc-audit."
