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

### Task 6: Add Validation CLI Later

- [ ] Create pnpm workspace.
- [ ] Add TypeScript packages.
- [ ] Implement `validate-skills`.
- [ ] Add tests.
- [ ] Document usage.
