# dreampia-dev-kit

<p align="center">
  <strong>Documentation-first workflow skills for AI coding agents.</strong>
</p>

<p align="center">
  Turn rough product ideas into linked PRD, TRD, IA, API, ERD, QA, release, and runbook documents that Codex and Claude Code can use before implementation starts.
</p>

<p align="center">
  <a href="https://github.com/eonofpixel/dreampia-dev-kit/releases/tag/v0.1.6"><img alt="Release v0.1.6" src="https://img.shields.io/badge/release-v0.1.6-2563eb"></a>
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

## Install in 60 Seconds

Clone the repository:

```bash
git clone https://github.com/eonofpixel/dreampia-dev-kit.git
cd dreampia-dev-kit
```

Install for both Codex and Claude Code:

```bash
bash install.sh
```

Or install from GitHub in one terminal command:

```bash
curl -fsSL https://raw.githubusercontent.com/eonofpixel/dreampia-dev-kit/main/install.sh | bash
```

Validate the local checkout:

```bash
node scripts/validate-skill-pack.js
```

Ask your agent to use a skill:

```text
Use skills/prd/SKILL.md and templates/prd.md to draft a PRD for workspace invitations.
```

## Install in Your Agent

Use the terminal installer for personal skills, or install the plugin marketplace from inside your agent.

| Agent | Terminal install | In-agent plugin install |
|---|---|---|
| Codex | `bash install.sh --agent codex` | `/plugins` then add `https://github.com/eonofpixel/dreampia-dev-kit` |
| Claude Code | `bash install.sh --agent claude-code` | `/plugin marketplace add https://github.com/eonofpixel/dreampia-dev-kit` then `/plugin install dreampia-dev-kit` |

CLI marketplace install is also supported:

```bash
codex plugin marketplace add https://github.com/eonofpixel/dreampia-dev-kit
codex plugin add dreampia-dev-kit@dreampia-dev-kit

claude plugin marketplace add https://github.com/eonofpixel/dreampia-dev-kit
claude plugin install dreampia-dev-kit@dreampia-dev-kit
```

After installation, start a new session and use the shortcut style that matches your agent:

| Agent surface | Canonical invocation | Optional shortcut |
|---|---|---|
| Codex app | Type `/` and choose an enabled Dreampia skill, or type `$prd` | `/prompts:dreampia-prd FEATURE="workspace invitations"` |
| Codex CLI/IDE | `$prd`, `$api-spec`, `$doc-audit` | `/prompts:dreampia-audit DOCS="docs/"` |
| Claude Code personal skills | `/prd`, `/api-spec`, `/doc-audit` | `/dreampia-prd`, `/dreampia-api`, `/dreampia-doc-pack` |
| Claude Code plugin | `/dreampia-dev-kit:prd`, `/dreampia-dev-kit:doc-audit` | `/dreampia-dev-kit:api`, `/dreampia-dev-kit:qa`, `/dreampia-dev-kit:doc-pack` |

Codex prompt shortcuts are installed for convenience, but Codex skills remain the primary reusable workflow format.

Examples:

```text
/dreampia-dev-kit:prd Draft a PRD for workspace invitations.
/dreampia-dev-kit:doc-audit Audit docs/ for missing links and drift.
/prompts:dreampia-api FEATURE="workspace invitations"
```

Read the full guide in [Install dreampia-dev-kit for Codex and Claude Code](docs/INSTALLATION.md).

## Try the Examples

See these example document sets to understand how Dreampia docs link product, technical, UX, API, data, QA, and audit work.

| Example | Scenario | Best for |
|---|---|---|
| [Small service](examples/small-service) | A tiny team notes service adds passwordless magic link login. | Simple end-to-end feature docs |
| [Ecommerce](examples/ecommerce) | A small shop adds guest checkout with inventory reservation and payment authorization. | Cross-document dependencies and audit findings |

Small service documents:

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

Ecommerce documents:

| Document | Purpose |
|---|---|
| [Project brief](examples/ecommerce/project-brief.md) | Product context and MVP scope |
| [PRD](examples/ecommerce/prd.md) | Requirements, policies, acceptance criteria |
| [TRD](examples/ecommerce/trd.md) | Checkout architecture and failure handling |
| [IA](examples/ecommerce/ia.md) | Checkout routes, screens, and access rules |
| [User flow](examples/ecommerce/user-flow.md) | Happy path, alternatives, errors, states |
| [API spec](examples/ecommerce/api-spec.md) | Checkout endpoints and idempotency rules |
| [ERD](examples/ecommerce/erd.md) | Checkout, reservation, payment, and order data |
| [QA checklist](examples/ecommerce/qa-checklist.md) | Checkout verification and regression checks |
| [Doc audit report](examples/ecommerce/doc-audit-report.md) | Deliberate unresolved decisions and next actions |

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
examples/               Complete example documentation sets
plugins/dreampia-dev-kit/
  .codex-plugin/        Codex plugin manifest
  .claude-plugin/       Claude Code plugin manifest
  commands/             Claude Code plugin command aliases
  skills/               Packaged skill copy
shortcuts/              Personal Codex prompt and Claude command shortcuts
docs/INSTALLATION.md    Install guide for Codex and Claude Code
scripts/                Install, sync, and validate helpers
install.sh              Terminal installer for Codex and Claude Code
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
- example documents;
- Codex prompt shortcuts and Claude Code command shortcuts;
- Codex and Claude Code plugin manifests;
- packaged plugin skills matching root `skills/`.

Run:

```bash
node scripts/validate-skill-pack.js
```

Score generated documents from real agent runs:

```bash
node scripts/score-generated-docs.js docs/prd.md docs/trd.md docs/ia.md docs/user-flow.md docs/api-spec.md docs/erd.md docs/qa-checklist.md docs/doc-audit-report.md
```

The scoring helper checks standard frontmatter, expected `##` sections, document owners, IDs, and document-specific signals such as `REQ-###`, `PAGE-###`, HTTP methods, primary keys, and `QA-###` checks.

Audit generated documents for content risks:

```bash
node scripts/audit-generated-doc-content.js docs/prd.md docs/trd.md docs/ia.md docs/user-flow.md docs/api-spec.md docs/erd.md docs/qa-checklist.md docs/doc-audit-report.md
```

The content audit is stricter than the structure score. It fails on major findings by default and checks for token exposure, plaintext token storage, policy conflicts, speculative implementation decisions, unresolved references, and repeated open questions. Use `--fail-on none` for review-only reports or `--json` for automation.

GitHub Actions also runs this validation, shell syntax checks, and installer smoke tests on `main`, pull requests, and manual dispatch. Release maintainers can use [the release process](docs/RELEASE_PROCESS.md) and [marketplace verification checklist](docs/MARKETPLACE_VERIFICATION.md) before tagging.

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

Current release: [v0.1.6](https://github.com/eonofpixel/dreampia-dev-kit/releases/tag/v0.1.6)

The first release is a Markdown-first skill pack. A TypeScript CLI may be added later, after the skill and template system is stable.

## License

[MIT](LICENSE)
