# Installation

`dreampia-dev-kit` can be used in two ways:

- as plain Markdown skills copied into an agent's skills directory;
- as a local plugin marketplace for Codex or Claude Code.

The root `skills/` directory is the source of truth. The packaged plugin copy lives in `plugins/dreampia-dev-kit/skills/`.

## Recommended Terminal Install

Install for both Codex and Claude Code:

```bash
curl -fsSL https://raw.githubusercontent.com/eonofpixel/dreampia-dev-kit/main/install.sh | bash
```

Install for one agent:

```bash
curl -fsSL https://raw.githubusercontent.com/eonofpixel/dreampia-dev-kit/main/install.sh | bash -s -- --agent codex
curl -fsSL https://raw.githubusercontent.com/eonofpixel/dreampia-dev-kit/main/install.sh | bash -s -- --agent claude-code
```

From a local checkout:

```bash
bash install.sh
bash install.sh --agent codex
bash install.sh --agent claude-code
```

After installation, check the available surfaces:

```bash
dreampia-dev-kit doctor --docs docs/
```

## Invocation Quick Reference

| Agent surface | Canonical invocation | Optional shortcut |
|---|---|---|
| Codex app | Type `/` and choose an enabled Dreampia skill, or type `$prd` | `/prompts:dreampia-prd FEATURE="workspace invitations"` |
| Codex CLI/IDE | `$prd`, `$api-spec`, `$doc-audit` | `/prompts:dreampia-audit DOCS="docs/"` |
| Claude Code personal skills | `/prd`, `/api-spec`, `/doc-audit` | `/dreampia-prd`, `/dreampia-api`, `/dreampia-doc-pack` |
| Claude Code plugin | `/dreampia-dev-kit:prd`, `/dreampia-dev-kit:doc-audit` | `/dreampia-dev-kit:api`, `/dreampia-dev-kit:qa`, `/dreampia-dev-kit:doc-pack` |

Codex prompt shortcuts are installed for convenience because they still work as slash commands, but Codex marks custom prompts as deprecated. Prefer Dreampia skills for reusable workflows.

## Install for Codex

### Option A: Personal skills

Install the skills into your Codex skills directory and optional prompt shortcuts into your Codex prompts directory:

```bash
bash scripts/install-codex.sh
```

If you already have skills with the same names and want to replace them:

```bash
bash scripts/install-codex.sh --force
```

Start a new Codex session, then invoke a skill such as:

```text
/prd Draft a PRD for workspace invitations.
/doc-audit Audit docs/ for missing links and drift.
$prd Draft a PRD for workspace invitations.
/prompts:dreampia-prd FEATURE="workspace invitations"
```

### Option B: Local Codex plugin marketplace

Use this when installing from a GitHub repository:

```bash
codex plugin marketplace add https://github.com/eonofpixel/dreampia-dev-kit
codex plugin add dreampia-dev-kit@dreampia-dev-kit
```

For a local checkout, replace the GitHub URL with `.`.

Then start a new Codex session and invoke namespaced skills:

```text
/dreampia-dev-kit:prd Draft a PRD for workspace invitations.
/dreampia-dev-kit:doc-audit Audit docs/ for missing links and drift.
$dreampia-dev-kit:prd Draft a PRD for workspace invitations.
```

## Install for Claude Code

### Option A: Personal skills

Install the skills into your Claude Code skills directory and personal command shortcuts into your Claude commands directory:

```bash
bash scripts/install-claude-code.sh
```

If you already have skills with the same names and want to replace them:

```bash
bash scripts/install-claude-code.sh --force
```

Start a new Claude Code session, then invoke a skill such as:

```text
/prd Draft a PRD for workspace invitations.
/doc-audit Audit docs/ for missing links and drift.
/dreampia-prd Draft a PRD for workspace invitations.
/dreampia-doc-pack Draft the initial docs for workspace invitations.
```

### Option B: Local Claude Code plugin

For one-off local testing:

```bash
claude --plugin-dir ./plugins/dreampia-dev-kit
```

Inside Claude Code, invoke:

```text
/dreampia-dev-kit:prd Draft a PRD for workspace invitations.
/dreampia-dev-kit:api Draft the API spec for workspace invitations.
```

### Option C: Local Claude Code marketplace

For marketplace-style testing:

```bash
claude plugin marketplace add https://github.com/eonofpixel/dreampia-dev-kit
claude plugin install dreampia-dev-kit@dreampia-dev-kit
```

For a local checkout, replace the GitHub URL with `.`.

Then restart Claude Code and invoke namespaced skills:

```text
/dreampia-dev-kit:doc-audit Audit docs/ for missing links and drift.
/dreampia-dev-kit:qa Create QA checks for workspace invitations.
```

## Maintain the Packaged Plugin Copy

After changing files under `skills/`, sync the plugin copy:

```bash
bash scripts/sync-plugin-skills.sh
```

Then validate:

```bash
node bin/dreampia-dev-kit.js validate-skill-pack
claude plugin validate plugins/dreampia-dev-kit
claude plugin validate .
```

## Validate Generated Docs

Create starter docs when you want a local document pack before agent drafting:

```bash
dreampia-dev-kit init docs/ --feature INVITE-001 --name "workspace invitations"
```

After Codex or Claude Code generates a document pack, run the CLI gate from the local checkout:

```bash
node bin/dreampia-dev-kit.js validate docs/
```

The same command can run directly from GitHub:

```bash
npx github:eonofpixel/dreampia-dev-kit validate docs/
```

Use individual commands when you want separate output:

```bash
node bin/dreampia-dev-kit.js score docs/
node bin/dreampia-dev-kit.js audit docs/
node bin/dreampia-dev-kit.js explain docs/
node bin/dreampia-dev-kit.js doctor --docs docs/
```
