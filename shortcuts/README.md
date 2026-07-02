# Agent Shortcuts

This directory contains personal-install shortcuts that wrap Dreampia Dev Kit skills.

## Codex

Files in `shortcuts/codex/` are optional custom prompts copied to:

```text
$CODEX_HOME/prompts
```

Codex custom prompts still work as `/prompts:*` slash commands, but Codex marks custom prompts as deprecated. Dreampia skills are the canonical reusable workflow format.

## Claude Code

Files in `shortcuts/claude-code/` are custom commands copied to:

```text
$CLAUDE_COMMANDS_DIR
```

These create personal slash commands such as `/dreampia-prd`, `/dreampia-api`, and `/dreampia-doc-pack`.

## Plugin Aliases

Claude Code plugin command aliases live in:

```text
plugins/dreampia-dev-kit/commands/
```

Those aliases provide short plugin commands such as `/dreampia-dev-kit:api`, `/dreampia-dev-kit:qa`, and `/dreampia-dev-kit:doc-pack`.
