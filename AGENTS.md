# AGENTS.md

## Project Identity

This repository is an open-source, AI-native development documentation toolkit.

Project name: `dreampia-dev-kit`

Goal: provide reusable documentation workflows for Codex, Claude Code, and other agentic coding tools. The project helps developers create, audit, and keep the following development documents in sync:

- PRD: Product Requirements Document
- TRD: Technical Requirements Document
- IA: Information Architecture
- User Flow
- Screen Spec
- API Spec
- ERD
- Data Dictionary
- QA Checklist
- Test Case
- Release Note
- Runbook

The first version must be useful even without a CLI. Start with high-quality Markdown skills, templates, examples, and repository guidance.

## Source of Truth Priority

When files disagree, follow this order:

1. `AGENTS.md`
2. `PROJECT_SPEC.md`
3. `MVP_PLAN.md`
4. `SKILL_CATALOG.md`
5. `DOC_SYSTEM.md`
6. `README.md`
7. Existing generated examples

When implementing code later, keep these documents updated.

## Product Positioning

`dreampia-dev-kit` is not just a prompt collection.

It is a documentation-first workflow layer for AI coding agents:

- before coding: turn vague ideas into implementation-ready specs;
- during coding: keep PRD, TRD, IA, API, ERD, and QA aligned;
- before release: generate release notes, deployment plans, rollback plans, and runbooks;
- during review: audit documentation drift between code and docs.

## MVP Scope

Build v0.1 as a Markdown-first skill pack.

Required v0.1 deliverables:

- root documentation files;
- `skills/*/SKILL.md` files for core skills;
- reusable document templates under `templates/`;
- a sample document system under `examples/` if requested later;
- clear instructions for Codex and Claude Code installation and plugin packaging;
- no mandatory runtime dependency for the first version.

Core skills for v0.1:

1. `prd`
2. `trd`
3. `ia`
4. `user-flow`
5. `api-spec`
6. `erd`
7. `qa-checklist`
8. `doc-audit`

Out of scope for v0.1:

- fully automated source code parsing;
- GitHub bot integration;
- remote network calls;
- database visualization rendering;
- hosted SaaS features;
- destructive file rewriting without user confirmation.

## Preferred Tech Direction

Use this direction when implementation begins:

- Language: TypeScript
- Runtime: Node.js LTS
- Package manager: pnpm
- CLI package name: `dreampia-dev-kit`
- Monorepo: pnpm workspace
- Test runner: Vitest
- Linter/formatter: ESLint + Prettier
- Markdown linting: markdownlint-cli2
- Schema validation later: Zod or JSON Schema

The first implementation should not require a complex framework.

## Expected Repository Structure

Create or preserve this structure:

```text
dreampia-dev-kit/
├── AGENTS.md
├── README.md
├── README.ko.md
├── PROJECT_SPEC.md
├── MVP_PLAN.md
├── SKILL_CATALOG.md
├── DOC_SYSTEM.md
├── ARCHITECTURE.md
├── ROADMAP.md
├── CONTRIBUTING.md
├── SECURITY.md
├── CODEX_BOOTSTRAP_PROMPT.md
│
├── skills/
│   ├── prd/
│   │   └── SKILL.md
│   ├── trd/
│   │   └── SKILL.md
│   ├── ia/
│   │   └── SKILL.md
│   ├── user-flow/
│   │   └── SKILL.md
│   ├── api-spec/
│   │   └── SKILL.md
│   ├── erd/
│   │   └── SKILL.md
│   ├── qa-checklist/
│   │   └── SKILL.md
│   └── doc-audit/
│       └── SKILL.md
│
├── templates/
│   ├── project-brief.md
│   ├── prd.md
│   ├── trd.md
│   ├── ia.md
│   ├── user-flow.md
│   ├── api-spec.md
│   ├── erd.md
│   ├── qa-checklist.md
│   ├── doc-audit-report.md
│   ├── release-note.md
│   └── runbook.md
│
├── packages/
│   ├── core/
│   ├── cli/
│   └── validator/
│
├── plugins/
│   └── dreampia-dev-kit/
│       ├── .codex-plugin/
│       ├── .claude-plugin/
│       └── skills/
│
├── examples/
│   ├── small-service/
│   ├── ecommerce/
│   └── b2b-saas/
│
└── .github/
    ├── workflows/
    └── ISSUE_TEMPLATE/
```

Do not create every directory at once unless the task asks for it. Prefer small, reviewable commits.

## Codex Working Rules

Before coding:

1. Inspect the repository tree.
2. Read this `AGENTS.md`.
3. Read `PROJECT_SPEC.md`, `MVP_PLAN.md`, and `SKILL_CATALOG.md`.
4. Summarize the task in 3 to 7 bullets.
5. Propose a short implementation plan.
6. Then implement.

During coding:

- Prefer small focused changes.
- Keep Markdown documents, templates, and skill descriptions consistent.
- Do not invent external APIs or package names without verifying locally.
- Do not add production dependencies unless the task requires it.
- Add TODO comments only when they identify a real follow-up task.
- Avoid hidden behavior. Keep commands, scripts, and outputs explicit.

After coding:

- Run the relevant test or validation command when available.
- If no validation exists yet, run a lightweight sanity check such as file listing or Markdown structure review.
- Summarize changed files.
- Mention follow-up tasks.

## Documentation Rules

Every generated document should use frontmatter unless the file type makes that awkward.

Required frontmatter fields for project documents:

```yaml
doc_id: DOC-TYPE-FEATURE-001
doc_type: prd
feature_id: FEATURE-001
status: draft
owner: product
related_docs: []
related_code: []
last_reviewed: YYYY-MM-DD
version: 0.1.0
```

Allowed `status` values:

- `draft`
- `review`
- `approved`
- `deprecated`

Core document ID prefixes:

- `BRD`
- `PRD`
- `REQ`
- `POL`
- `IA`
- `FLOW`
- `SCREEN`
- `TRD`
- `TSD`
- `ARCH`
- `API`
- `ERD`
- `DATA`
- `QA`
- `TC`
- `REL`
- `RUNBOOK`

## Skill Authoring Rules

Each skill directory must contain a `SKILL.md` file.

Each `SKILL.md` should include:

- frontmatter with `name` and `description`;
- when to use the skill;
- inputs to inspect or ask for;
- output format;
- quality rules;
- safety rules;
- examples where helpful.

Skill descriptions must be concise and trigger-oriented. Front-load keywords such as PRD, TRD, IA, API Spec, ERD, QA, audit, requirements, and documentation drift.

## Security Rules

This project must be safe by default.

- Do not read, print, copy, or export secrets.
- Do not inspect `.env`, private keys, tokens, credentials, or cloud config unless the user explicitly asks and the task is safe.
- Do not add telemetry.
- Do not make network calls in core workflows by default.
- Do not run destructive shell commands by default.
- Do not overwrite user documents without first showing a diff or asking for confirmation.
- Treat `doc-audit` as read-first and report-first.

## Quality Bar

A feature is done only when:

- it has a clear user-facing purpose;
- it has documentation;
- templates and skills remain consistent;
- examples still make sense;
- generated outputs are testable by a human;
- no company-specific assumptions are baked into generic templates;
- security rules are respected.

## Initial Development Task

When asked to start implementation, do this first:

1. Keep the existing Markdown files.
2. Create minimal repository scaffolding.
3. Keep the shared agent plugin scaffold under `plugins/dreampia-dev-kit/`.
4. Add a simple CLI only after the Markdown skill pack is stable.
5. Validate that every core skill has a `SKILL.md` with `name` and `description`.
6. Create a short changelog entry for v0.1.0.

## Preferred Response Style for Codex

Use Korean when discussing product direction with the repository owner.
Use English for public README, package metadata, code comments, and exported templates unless a `.ko.md` file is being edited.

Keep final summaries practical:

- what changed;
- how to test;
- what remains.
