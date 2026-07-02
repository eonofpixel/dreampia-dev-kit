# MVP Plan

## Version Target

`v0.1.0` should be a Markdown-first release.

Do not start with a heavy CLI or complex package architecture. The first public version should prove that the documentation workflows are useful.

## v0.1 Deliverables

| Area | Deliverable | Required |
|---|---|---|
| Guidance | `AGENTS.md` | Yes |
| Product docs | `PROJECT_SPEC.md` | Yes |
| Planning | `MVP_PLAN.md`, `ROADMAP.md` | Yes |
| Skills | 8 core `SKILL.md` files | Yes |
| Templates | reusable Markdown templates | Yes |
| Security | `SECURITY.md` | Yes |
| Contribution | `CONTRIBUTING.md` | Yes |
| Codex prompt | `CODEX_BOOTSTRAP_PROMPT.md` | Yes |
| Plugin scaffold | `plugins/dreampia-dev-kit` for Codex and Claude Code | Yes |
| CLI | Lightweight validation CLI | No for v0.1, added in v0.2 |

## Core Skills

1. `prd`
2. `trd`
3. `ia`
4. `user-flow`
5. `api-spec`
6. `erd`
7. `qa-checklist`
8. `doc-audit`

## Development Phases

### Phase 1: Markdown Foundation

- Confirm root docs.
- Confirm every skill has a complete `SKILL.md`.
- Confirm every template uses consistent metadata.
- Add examples only after base templates are stable.

### Phase 2: Agent Plugin Packaging

- Add `plugins/dreampia-dev-kit/.codex-plugin/plugin.json`.
- Add `plugins/dreampia-dev-kit/.claude-plugin/plugin.json`.
- Keep root `skills/` as source of truth and sync packaged plugin skills.
- Add repo-scoped local marketplace files.
- Document Codex and Claude Code install/test steps.

### Phase 3: Validation CLI

- Add dependency-free Node CLI first.
- Add `dreampia-dev-kit validate-skill-pack`.
- Add `dreampia-dev-kit score`.
- Add `dreampia-dev-kit audit`.
- Add `dreampia-dev-kit validate`.
- Validate that every skill has frontmatter `name` and `description`.
- Validate required templates exist.
- Add tests as the CLI grows.

### Phase 4: Doc Audit Engine

- Parse Markdown frontmatter.
- Extract `doc_id`, `feature_id`, `related_docs`, and `related_code`.
- Report missing links.
- Report orphan documents.
- Report mismatched feature IDs.

### Phase 5: Code-to-Docs Support

- Detect routes, API files, database schema, and migrations.
- Generate documentation suggestions.
- Never overwrite docs without confirmation.

## First 10 GitHub Issues

1. Create v0.1 repository structure.
2. Finalize root `AGENTS.md`.
3. Finalize 8 core `SKILL.md` files.
4. Finalize base document templates.
5. Add document metadata convention.
6. Add README and README.ko.md.
7. Add SECURITY.md and CONTRIBUTING.md.
8. Add Codex and Claude Code plugin scaffold.
9. Add example small-service docs.
10. Add skill validation CLI proposal.

## v0.1 Definition of Done

- All core docs exist.
- All core skills exist.
- Templates are internally consistent.
- README explains usage clearly.
- Security principles are documented.
- Codex and Claude Code can install and invoke the core skills without extra explanation.
