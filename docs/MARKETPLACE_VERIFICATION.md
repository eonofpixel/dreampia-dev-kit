---
doc_id: QA-MARKETPLACE-001
doc_type: qa
feature_id: MARKETPLACE-001
status: draft
owner: qa
related_docs:
  - docs/INSTALLATION.md
  - docs/INSTALLATION.ko.md
  - docs/RELEASE_PROCESS.md
related_code:
  - plugins/dreampia-dev-kit/.codex-plugin/plugin.json
  - plugins/dreampia-dev-kit/.claude-plugin/plugin.json
  - .agents/plugins/marketplace.json
  - .claude-plugin/marketplace.json
last_reviewed: 2026-07-02
version: 0.1.0
---

# Marketplace Verification

Use this checklist to verify Codex and Claude Code plugin installation behavior before a release.

## Scope

This checklist covers plugin marketplace install paths, personal installer paths, and command discovery.

It does not require modifying user projects. Use a temporary directory or disposable test project.

## Codex Checks

### Personal Installer

```bash
tmpdir="$(mktemp -d)"
CODEX_HOME="$tmpdir/codex" bash scripts/install-codex.sh
test -f "$tmpdir/codex/skills/prd/SKILL.md"
test -f "$tmpdir/codex/prompts/dreampia-prd.md"
rm -rf "$tmpdir"
```

Expected result:

- `skills/prd/SKILL.md` exists.
- `prompts/dreampia-prd.md` exists.
- A new Codex session can invoke Dreampia skills through the supported skill surface.

### Plugin Marketplace

From a local checkout:

```bash
codex plugin marketplace add .
codex plugin add dreampia-dev-kit@dreampia-dev-kit
```

From GitHub:

```bash
codex plugin marketplace add https://github.com/eonofpixel/dreampia-dev-kit
codex plugin add dreampia-dev-kit@dreampia-dev-kit
```

Expected result:

- `dreampia-dev-kit` appears as an installable plugin.
- Core skills are discoverable after restarting the Codex session.
- Canonical skill invocation works through Codex's skill surface, such as `$prd` or the slash skill list in the app.

## Claude Code Checks

### Personal Installer

```bash
tmpdir="$(mktemp -d)"
CLAUDE_SKILLS_DIR="$tmpdir/skills" \
  CLAUDE_COMMANDS_DIR="$tmpdir/commands" \
  bash scripts/install-claude-code.sh

test -f "$tmpdir/skills/prd/SKILL.md"
test -f "$tmpdir/commands/dreampia-prd.md"
rm -rf "$tmpdir"
```

Expected result:

- `skills/prd/SKILL.md` exists.
- `commands/dreampia-prd.md` exists.
- A new Claude Code session can invoke `/prd` and `/dreampia-prd`.

### Plugin Validation

```bash
claude plugin validate plugins/dreampia-dev-kit
claude plugin validate .
```

Expected result:

- Both validations pass.
- No manifest schema errors are reported.

### Plugin Marketplace

From a local checkout:

```bash
claude plugin marketplace add .
claude plugin install dreampia-dev-kit@dreampia-dev-kit
```

From GitHub:

```bash
claude plugin marketplace add https://github.com/eonofpixel/dreampia-dev-kit
claude plugin install dreampia-dev-kit@dreampia-dev-kit
```

Expected result:

- `dreampia-dev-kit` installs without schema errors.
- `/dreampia-dev-kit:prd` and `/dreampia-dev-kit:doc-audit` are available after restart.
- Alias commands such as `/dreampia-dev-kit:api`, `/dreampia-dev-kit:qa`, and `/dreampia-dev-kit:doc-pack` are available.

## Evidence to Capture

For a release, capture:

- command used;
- CLI version if available;
- pass/fail result;
- screenshots or terminal transcript for marketplace install;
- any command naming differences between local plugin install and marketplace install.

Do not capture secrets, tokens, private project paths, or user-specific configuration.

## Assumptions

- Codex and Claude Code CLI behavior may differ across app, CLI, and IDE surfaces.
- Codex custom prompt shortcuts are optional convenience commands; Dreampia skills remain the canonical workflow surface.
- Marketplace commands may require restarting the agent session before skills appear.

## Open Questions

- Should the project publish verified install screenshots for each release?
- Should aliases be expanded for every core skill in the Claude Code plugin package?
