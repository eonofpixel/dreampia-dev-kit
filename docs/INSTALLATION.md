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

## Install for Codex

### Option A: Personal skills

Install the skills into your Codex skills directory:

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
```

## Install for Claude Code

### Option A: Personal skills

Install the skills into your Claude Code skills directory:

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
```

### Option B: Local Claude Code plugin

For one-off local testing:

```bash
claude --plugin-dir ./plugins/dreampia-dev-kit
```

Inside Claude Code, invoke:

```text
/dreampia-dev-kit:prd Draft a PRD for workspace invitations.
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
```

## Maintain the Packaged Plugin Copy

After changing files under `skills/`, sync the plugin copy:

```bash
bash scripts/sync-plugin-skills.sh
```

Then validate:

```bash
node scripts/validate-skill-pack.js
claude plugin validate plugins/dreampia-dev-kit
claude plugin validate .
```
