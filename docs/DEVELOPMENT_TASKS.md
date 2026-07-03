# Development Tasks

Use this file as a lightweight backlog for Codex.

## Backlog

### Task 1: Normalize Skill Files

- [x] Check all `skills/*/SKILL.md` files.
- [x] Confirm each has `name` and `description` frontmatter.
- [x] Confirm each has input guidance.
- [x] Confirm each has output format.
- [x] Confirm each has quality rules.
- [x] Confirm each has safety rules.

### Task 2: Normalize Templates

- [x] Check all files in `templates/`.
- [x] Confirm frontmatter is consistent.
- [x] Confirm headings match the related skill.
- [x] Confirm assumptions/open questions are included.

### Task 3: Add Agent Plugin Scaffold

- [x] Create `plugins/dreampia-dev-kit/.codex-plugin/plugin.json`.
- [x] Create `plugins/dreampia-dev-kit/.claude-plugin/plugin.json`.
- [x] Decide sync strategy for `skills/`.
- [x] Add local marketplace examples.
- [x] Update README.

### Task 4: Add Example Project

- [x] Create `examples/small-service/`.
- [x] Add PRD example.
- [x] Add IA example.
- [x] Add API spec example.
- [x] Add QA checklist example.
- [x] Add doc audit report example.

### Task 5: Add Lightweight Validation Script

- [x] Validate core skill frontmatter and required sections.
- [x] Validate template frontmatter.
- [x] Validate plugin manifests.
- [x] Validate plugin skill copies match root `skills/`.

### Task 6: Add Agent Shortcuts

- [x] Add Claude Code personal command shortcuts.
- [x] Add Claude Code plugin command aliases for short names.
- [x] Add optional Codex prompt shortcuts for slash-command convenience.
- [x] Update installers to copy skills and shortcuts.
- [x] Validate shortcut frontmatter and `$ARGUMENTS` placeholders.
- [x] Document canonical and optional invocation styles.

### Task 7: Add CI Validation

- [x] Add a GitHub Actions workflow for `node scripts/validate-skill-pack.js`.
- [x] Add Claude plugin validation to CI when the CLI is available.
- [x] Add shell syntax checks for install scripts.
- [x] Add installer smoke tests to CI.
- [x] Add a manual `workflow_dispatch` validation path.

### Task 8: Expand Examples

- [x] Add `examples/ecommerce/` with checkout or order-management docs.
- [ ] Add `examples/b2b-saas/` with workspace, role, and billing docs.
- [x] Add example doc-audit reports that show common drift findings.
- [ ] Add Korean example snippets in `.ko.md` files if needed.

### Task 9: Improve Marketplace Packaging

- [ ] Confirm Codex plugin install behavior across app, CLI, and IDE extension.
- [ ] Confirm Claude Code plugin command names after marketplace install.
- [ ] Add screenshots or terminal transcripts for install verification.
- [x] Write a maintainer release process for tags and GitHub releases.

### Task 10: Add Validation CLI

- [x] Add dependency-free `dreampia-dev-kit` CLI entrypoint.
- [x] Add `score`, `audit`, `validate`, and `validate-skill-pack` commands.
- [x] Add directory input support for generated doc folders.
- [x] Document local and GitHub `npx` usage.
- [x] Add automated CLI tests.
- [ ] Consider pnpm/TypeScript packages only when the CLI surface grows.

### Task 11: Add Beginner-Friendly Guided Workflow

- [x] Add `dreampia-dev-kit guide` or equivalent first-run workflow.
- [x] Generate a minimal doc-pack checklist from a short idea.
- [x] Explain validation failures as "required fix", "recommended improvement", or "learning note".
- [x] Add `dreampia-dev-kit explain` for plain-language validation reports.
- [x] Add examples showing how a beginner moves from vague idea to PRD/TRD/API/ERD/QA.
- [x] Add Korean beginner workflow snippets if needed.
- [x] Add automated CLI tests for guide output.

### Task 12: Expand CLI Setup Helpers

- [x] Add `dreampia-dev-kit init` for creating a starter docs folder.
- [x] Add `dreampia-dev-kit doctor` for install and generated-doc readiness checks.
- [x] Add a LazyCodex-style direction proposal for onboarding and CLI priorities.
- [x] Reposition Dreampia as a documentation operations and verification orchestrator.
- [ ] Add `dreampia-dev-kit scaffold-codex-plugin` only if plugin packaging needs more automation.
- [ ] Add focused unit tests if CLI logic grows beyond smoke-test coverage.

### Task 13: Add Documentation Operations Orchestrator

- [ ] Add `dreampia-dev-kit orchestrate docs/` or `dreampia-dev-kit doc-ops docs/`.
- [ ] Produce a read-only documentation operation queue.
- [ ] Generate next prompts for Codex and Claude Code.
- [ ] Add beginner and expert explanation modes.

### Task 14: Add Documentation Audit Engine Later

- [ ] Parse Dreampia document frontmatter.
- [ ] Detect broken `related_docs` references.
- [ ] Detect missing QA coverage for PRD acceptance criteria.
- [ ] Detect API, ERD, and TRD mismatch candidates.
- [ ] Generate a safe report without rewriting user docs by default.
- [ ] Include plain-language next actions for each finding.
