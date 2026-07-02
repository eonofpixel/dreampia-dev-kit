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

- [ ] Create `examples/small-service/`.
- [ ] Add PRD example.
- [ ] Add IA example.
- [ ] Add API spec example.
- [ ] Add QA checklist example.
- [ ] Add doc audit report example.

### Task 5: Add Validation CLI

- [ ] Create pnpm workspace.
- [ ] Add TypeScript packages.
- [ ] Implement `validate-skills`.
- [ ] Add tests.
- [ ] Document usage.
