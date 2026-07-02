# dreampia-dev-kit

<p align="center">
  <strong>Documentation-first workflow skills for AI coding agents.</strong>
</p>

<p align="center">
  Turn rough product ideas into linked PRD, TRD, IA, API, ERD, QA, release, and runbook documents that Codex and Claude Code can use before implementation starts.
</p>

<p align="center">
  <a href="https://github.com/eonofpixel/dreampia-dev-kit/releases/tag/v0.3.0"><img alt="Release v0.3.0" src="https://img.shields.io/badge/release-v0.3.0-2563eb"></a>
  <a href="LICENSE"><img alt="MIT license" src="https://img.shields.io/badge/license-MIT-111827"></a>
  <a href="docs/INSTALLATION.md"><img alt="Codex and Claude Code supported" src="https://img.shields.io/badge/agents-Codex%20%2B%20Claude%20Code-0f766e"></a>
  <a href="bin/dreampia-dev-kit.js"><img alt="No dependency CLI" src="https://img.shields.io/badge/CLI-no%20deps-7c3aed"></a>
</p>

## What This Is

`dreampia-dev-kit` is an open-source Markdown skill pack for agentic coding workflows.

It helps teams keep product, technical, UX, API, data, QA, and release documents aligned while working with Codex, Claude Code, or other AI coding agents.

It is not trying to replace full spec-driven implementation platforms. Dreampia is the documentation quality layer: linked development docs first, then structure scoring and content-risk auditing before those docs drive code.

## Why It Matters

AI coding should make development more accessible, not more mysterious.

Dreampia is designed for people who are new to vibe coding, still learning software development, or trying to build responsibly without a full product and engineering team. The goal is to make the development process visible: what to decide, what to document, what to test, what is risky, and what to do next.

Good output should help beginners and experienced developers work from the same shared map. It should not assume hidden senior-engineer knowledge, shame incomplete ideas, or turn AI-generated confidence into unreviewed implementation.

| You need | Use this |
|---|---|
| A clear product scope | `skills/prd/SKILL.md` and `templates/prd.md` |
| Technical implementation input | `skills/trd/SKILL.md` and `templates/trd.md` |
| Routes, pages, and flows | `skills/ia/SKILL.md`, `skills/user-flow/SKILL.md` |
| Backend contracts and data model | `skills/api-spec/SKILL.md`, `skills/erd/SKILL.md` |
| Testable release criteria | `skills/qa-checklist/SKILL.md` |
| A consistency review | `skills/doc-audit/SKILL.md` |

## How It Compares

Projects such as [GitHub Spec Kit](https://github.com/github/spec-kit), [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD), [OpenSpec](https://github.com/Fission-AI/OpenSpec), and [Agent OS](https://github.com/buildermethods/agent-os) focus on broader spec-driven development and implementation workflows.

Dreampia focuses on reusable, agent-readable development documents and the quality checks around them: PRD, TRD, IA, user-flow, API spec, ERD, QA checklist, doc-audit, structure scoring, and content-risk auditing.

Read the fuller comparison in [Competitive Landscape](docs/COMPETITIVE_LANDSCAPE.md).

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
node bin/dreampia-dev-kit.js validate-skill-pack
```

For a guided first run:

```bash
node bin/dreampia-dev-kit.js guide "guest checkout for a small ecommerce shop"
```

Ask your agent to use a skill:

```text
Use skills/prd/SKILL.md and templates/prd.md to draft a PRD for workspace invitations.
```

## 30-Second Demo

If you are new to vibe coding, start with the guide:

```bash
npx github:eonofpixel/dreampia-dev-kit guide "workspace invitations"
```

Ask your agent for a document pack:

```text
/dreampia-dev-kit:doc-pack Draft PRD, TRD, IA, user-flow, API spec, ERD, QA checklist, and doc-audit docs for guest checkout.
```

Then score and audit the generated docs:

```bash
node bin/dreampia-dev-kit.js validate docs/
```

If the gate fails, ask Dreampia to explain the findings in plain language:

```bash
node bin/dreampia-dev-kit.js explain docs/
```

The curated [ecommerce example](examples/ecommerce) shows the target shape: linked PRD/TRD/IA/user-flow/API/ERD/QA/audit docs that score cleanly and pass the content-risk audit.

Run the same gate directly from GitHub:

```bash
npx github:eonofpixel/dreampia-dev-kit validate docs/
```

Read [Beginner Guide: From Idea to Reviewed Docs](docs/BEGINNER_GUIDE.md) for the full loop.

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
docs/COMPETITIVE_LANDSCAPE.md
                        Open-source competitive positioning
scripts/                Install, sync, and validate helpers
bin/dreampia-dev-kit.js Dependency-free CLI gate
install.sh              Terminal installer for Codex and Claude Code
```

Root `skills/` is the source of truth. After editing skills, run:

```bash
bash scripts/sync-plugin-skills.sh
node bin/dreampia-dev-kit.js validate-skill-pack
```

## Validation

The built-in CLI exposes the same checks for local use and CI:

```bash
node bin/dreampia-dev-kit.js validate-skill-pack
node bin/dreampia-dev-kit.js guide "workspace invitations"
node bin/dreampia-dev-kit.js score docs/
node bin/dreampia-dev-kit.js audit docs/
node bin/dreampia-dev-kit.js validate docs/
node bin/dreampia-dev-kit.js explain docs/
```

Or run it without a checkout:

```bash
npx github:eonofpixel/dreampia-dev-kit validate docs/
npx github:eonofpixel/dreampia-dev-kit explain docs/
```

`validate-skill-pack` checks:

- required core skills;
- `SKILL.md` frontmatter and required sections;
- template frontmatter and document metadata;
- example documents;
- Codex prompt shortcuts and Claude Code command shortcuts;
- Codex and Claude Code plugin manifests;
- packaged plugin skills matching root `skills/`.

Score generated documents from real agent runs:

```bash
node bin/dreampia-dev-kit.js score docs/
```

The scoring helper checks standard frontmatter, expected `##` sections, document owners, IDs, and document-specific signals such as `REQ-###`, `PAGE-###`, HTTP methods, primary keys, and `QA-###` checks.

Audit generated documents for content risks:

```bash
node bin/dreampia-dev-kit.js audit docs/
```

The content audit is stricter than the structure score. It fails on major findings by default and checks for token/API key/payment secret exposure, plaintext secret storage, raw payment card data, privacy retention gaps, policy conflicts, speculative implementation decisions, unresolved references, and repeated open questions. Use `--fail-on none` for review-only reports or `--json` for automation.

Explain findings in beginner-friendly language:

```bash
node bin/dreampia-dev-kit.js explain docs/
```

The explain report groups output into required fixes, recommended improvements, and learning notes so a non-expert builder can fix documents before implementation starts.

GitHub Actions also runs this validation, example content-risk audits, CLI smoke tests, shell syntax checks, and installer smoke tests on `main`, pull requests, and manual dispatch. Release maintainers can use [the release process](docs/RELEASE_PROCESS.md) and [marketplace verification checklist](docs/MARKETPLACE_VERIFICATION.md) before tagging.

## Design Principles

- Documentation-first, not documentation-after.
- Useful without requiring a CLI.
- Agent-readable and human-readable.
- Safe by default.
- No hidden network calls.
- No secret access.
- Clear templates over vague prompts.
- Assumptions must be labeled.
- Requirements must be testable.

## Status

Current release: [v0.3.0](https://github.com/eonofpixel/dreampia-dev-kit/releases/tag/v0.3.0)

The current release is a Markdown-first skill pack plus a dependency-free CLI gate and plain-language explanation reports for generated document quality.

## License

[MIT](LICENSE)
