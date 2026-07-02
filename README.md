# dreampia-dev-kit

Dreampia Dev Kit is an AI-native development documentation toolkit for Codex, Claude Code, and agentic coding workflows.

`dreampia-dev-kit` helps teams create, audit, and keep software development documents in sync:

- PRD
- TRD
- IA
- User Flow
- API Spec
- ERD
- QA Checklist
- Test Case
- Release Note
- Runbook

## Why

AI coding agents can produce code quickly, but teams still need shared product requirements, technical decisions, API contracts, database design, QA criteria, release notes, and operating runbooks.

`dreampia-dev-kit` brings these documentation workflows into the agentic development loop.

## Project Status

Current target: `v0.1.0` Markdown-first MVP.

The first version focuses on:

- reusable `SKILL.md` workflows;
- development document templates;
- a complete small-service example;
- Codex-friendly `AGENTS.md` guidance;
- local install paths for Codex and Claude Code;
- a future path toward a TypeScript CLI.

## Core Skills

| Skill | Purpose |
|---|---|
| `prd` | Create implementation-ready Product Requirements Documents. |
| `trd` | Create Technical Requirements Documents. |
| `ia` | Create Information Architecture documents. |
| `user-flow` | Create user journey and feature flow documents. |
| `api-spec` | Create API specification documents. |
| `erd` | Draft database entity relationship documents. |
| `qa-checklist` | Create QA checklists and test criteria. |
| `doc-audit` | Find missing, ambiguous, or inconsistent documentation. |

## Quick Start for Codex Development

1. Copy this repository into a new GitHub project.
2. Open the repository with Codex.
3. Ask Codex to read `AGENTS.md` first.
4. Use the prompt in `CODEX_BOOTSTRAP_PROMPT.md`.

Example prompt:

```text
Read AGENTS.md and CODEX_BOOTSTRAP_PROMPT.md, then implement the v0.1 Markdown-first skill pack.
```

## Using the Markdown Skill Pack

No CLI or package install is required for v0.1. Use the repository directly as a set of agent-readable workflows and document templates.

1. Choose the workflow in `skills/<skill-name>/SKILL.md`.
2. Ask Codex or another coding agent to use that skill for your feature.
3. Copy the matching template from `templates/` into your project docs.
4. Fill or revise the document while preserving the frontmatter fields from `DOC_SYSTEM.md`.
5. Run the `doc-audit` skill before implementation or release to find missing links, unclear requirements, and drift candidates.

Example:

```text
Use skills/prd/SKILL.md and templates/prd.md to draft a PRD for workspace invitations.
```

## Try the Example

See [examples/small-service](examples/small-service) for an end-to-end documentation set for a magic link login feature.

It includes a project brief, PRD, TRD, IA, user flow, API spec, ERD, QA checklist, and doc audit report.

## Install in Codex or Claude Code

See [docs/INSTALLATION.md](docs/INSTALLATION.md) for complete installation options.

Quick personal skill install:

```bash
bash scripts/install-codex.sh
bash scripts/install-claude-code.sh
```

Local plugin install for namespaced skills:

```bash
codex plugin marketplace add .
codex plugin add dreampia-dev-kit@dreampia-dev-kit

claude plugin marketplace add .
claude plugin install dreampia-dev-kit@dreampia-dev-kit
```

After plugin installation, invoke namespaced skills such as:

```text
/dreampia-dev-kit:prd Draft a PRD for workspace invitations.
/dreampia-dev-kit:doc-audit Audit docs/ for missing links and drift.
```

## Validate the Pack

Run the built-in validation script before publishing changes:

```bash
node scripts/validate-skill-pack.js
```

The script checks core skill frontmatter, required sections, template metadata, plugin manifests, script permissions, and whether packaged plugin skills match the root `skills/` source of truth.

## Suggested Repository Structure

```text
skills/
  prd/SKILL.md
  trd/SKILL.md
  ia/SKILL.md
  user-flow/SKILL.md
  api-spec/SKILL.md
  erd/SKILL.md
  qa-checklist/SKILL.md
  doc-audit/SKILL.md

templates/
  prd.md
  trd.md
  ia.md
  user-flow.md
  api-spec.md
  erd.md
  qa-checklist.md
  doc-audit-report.md
  release-note.md
  runbook.md

plugins/
  dreampia-dev-kit/
    .codex-plugin/plugin.json
    .claude-plugin/plugin.json
    skills/

examples/
  small-service/
```

## v0.1 Validation Checklist

- Every core skill has `name` and `description` frontmatter.
- Every core skill defines inputs, output format, quality rules, and safety rules.
- Templates include standard frontmatter, assumptions, open questions, and related document sections.
- Generated documents use IDs and relationships from `DOC_SYSTEM.md`.
- Core workflows do not require network calls, runtime dependencies, or secret access.

## Agent Plugin Packaging

The v0.1 source layout includes a local plugin package:

```text
plugins/dreampia-dev-kit/
  .codex-plugin/plugin.json
  .claude-plugin/plugin.json
  skills/
```

Root `skills/` remains the source of truth. After editing skills, run:

```bash
bash scripts/sync-plugin-skills.sh
node scripts/validate-skill-pack.js
```

## Design Principles

- Documentation-first, not documentation-after.
- Useful before any CLI exists.
- Agent-readable and human-readable.
- Safe by default.
- No hidden network calls.
- No secret access.
- Clear templates over vague prompts.
- Assumptions must be labeled.
- Requirements must be testable.

## License

MIT
