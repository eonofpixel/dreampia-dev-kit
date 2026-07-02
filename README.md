# dreampia-dev-kit

<p align="center">
  <strong>Documentation-first workflow skills for AI coding agents.</strong>
</p>

<p align="center">
  Turn rough product ideas into linked PRD, TRD, IA, API, ERD, QA, release, and runbook documents that Codex and Claude Code can use before implementation starts.
</p>

<p align="center">
  <a href="https://github.com/eonofpixel/dreampia-dev-kit/releases/tag/v0.1.0"><img alt="Release v0.1.0" src="https://img.shields.io/badge/release-v0.1.0-2563eb"></a>
  <a href="LICENSE"><img alt="MIT license" src="https://img.shields.io/badge/license-MIT-111827"></a>
  <a href="docs/INSTALLATION.md"><img alt="Codex and Claude Code supported" src="https://img.shields.io/badge/agents-Codex%20%2B%20Claude%20Code-0f766e"></a>
  <a href="scripts/validate-skill-pack.js"><img alt="No runtime dependencies" src="https://img.shields.io/badge/runtime-none-7c3aed"></a>
</p>

## What This Is

`dreampia-dev-kit` is an open-source Markdown skill pack for agentic coding workflows.

It helps teams keep product, technical, UX, API, data, QA, and release documents aligned while working with Codex, Claude Code, or other AI coding agents.

| You need | Use this |
|---|---|
| A clear product scope | `skills/prd/SKILL.md` and `templates/prd.md` |
| Technical implementation input | `skills/trd/SKILL.md` and `templates/trd.md` |
| Routes, pages, and flows | `skills/ia/SKILL.md`, `skills/user-flow/SKILL.md` |
| Backend contracts and data model | `skills/api-spec/SKILL.md`, `skills/erd/SKILL.md` |
| Testable release criteria | `skills/qa-checklist/SKILL.md` |
| A consistency review | `skills/doc-audit/SKILL.md` |

## Start in 60 Seconds

Clone the repository:

```bash
git clone https://github.com/eonofpixel/dreampia-dev-kit.git
cd dreampia-dev-kit
```

Validate the pack:

```bash
node scripts/validate-skill-pack.js
```

Ask your agent to use a skill:

```text
Use skills/prd/SKILL.md and templates/prd.md to draft a PRD for workspace invitations.
```

## Install in Your Agent

Use the plain Markdown files directly, or install them into Codex or Claude Code.

| Agent | Quick install | Namespaced plugin install |
|---|---|---|
| Codex | `bash scripts/install-codex.sh` | `codex plugin marketplace add .` then `codex plugin add dreampia-dev-kit@dreampia-dev-kit` |
| Claude Code | `bash scripts/install-claude-code.sh` | `claude plugin marketplace add .` then `claude plugin install dreampia-dev-kit@dreampia-dev-kit` |

After plugin installation, start a new session and invoke:

```text
/dreampia-dev-kit:prd Draft a PRD for workspace invitations.
/dreampia-dev-kit:doc-audit Audit docs/ for missing links and drift.
```

Read the full guide in [Install dreampia-dev-kit for Codex and Claude Code](docs/INSTALLATION.md).

## Try the Example

See [the small service example](examples/small-service) for a complete feature documentation set.

Scenario: a tiny team notes service adds passwordless magic link login.

| Document | Purpose |
|---|---|
| [Project brief](examples/small-service/project-brief.md) | Product context and MVP scope |
| [PRD](examples/small-service/prd.md) | User stories, requirements, acceptance criteria |
| [TRD](examples/small-service/trd.md) | Architecture, components, risks |
| [IA](examples/small-service/ia.md) | Screens, routes, access rules |
| [User flow](examples/small-service/user-flow.md) | Happy path, alternatives, errors |
| [API spec](examples/small-service/api-spec.md) | Endpoints, schemas, error codes |
| [ERD](examples/small-service/erd.md) | Tables, relationships, indexes |
| [QA checklist](examples/small-service/qa-checklist.md) | Human-testable checks |
| [Doc audit report](examples/small-service/doc-audit-report.md) | Gaps, risks, next actions |

## Core Skills

| Skill | Trigger it when you need |
|---|---|
| `prd` | Product requirements, MVP scope, user stories, acceptance criteria |
| `trd` | Technical requirements, architecture constraints, security, performance |
| `ia` | Sitemap, page hierarchy, route structure, access rules |
| `user-flow` | Happy paths, alternative paths, error paths, state transitions |
| `api-spec` | Endpoint design, request/response schemas, auth, errors |
| `erd` | Entities, tables, relationships, indexes, constraints |
| `qa-checklist` | QA checks, regression checks, UAT, release verification |
| `doc-audit` | Documentation drift, broken links, ambiguous requirements |

## Repository Map

```text
skills/                 Core agent skills
templates/              Reusable Markdown document templates
examples/small-service/ Complete example documentation set
plugins/dreampia-dev-kit/
  .codex-plugin/        Codex plugin manifest
  .claude-plugin/       Claude Code plugin manifest
  skills/               Packaged skill copy
docs/INSTALLATION.md    Install guide for Codex and Claude Code
scripts/                Install, sync, and validate helpers
```

Root `skills/` is the source of truth. After editing skills, run:

```bash
bash scripts/sync-plugin-skills.sh
node scripts/validate-skill-pack.js
```

## Validation

The built-in validation script checks:

- required core skills;
- `SKILL.md` frontmatter and required sections;
- template frontmatter and document metadata;
- small-service example documents;
- Codex and Claude Code plugin manifests;
- packaged plugin skills matching root `skills/`.

Run:

```bash
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

## Status

Current release: [v0.1.0](https://github.com/eonofpixel/dreampia-dev-kit/releases/tag/v0.1.0)

The first release is a Markdown-first skill pack. A TypeScript CLI may be added later, after the skill and template system is stable.

## License

[MIT](LICENSE)
