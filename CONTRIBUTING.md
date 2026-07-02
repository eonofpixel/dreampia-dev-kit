# Contributing

Thanks for considering contributing to `dreampia-dev-kit`.

This project focuses on development documentation workflows for AI coding agents.

## Contribution Types

Good first contributions:

- improve a document template;
- improve a `SKILL.md` workflow;
- add examples;
- fix unclear terminology;
- add test prompts;
- improve README usage instructions.

Larger contributions:

- add a new skill;
- add validation CLI;
- add Codex plugin packaging;
- add documentation audit logic;
- add GitHub Actions.

## Skill Contribution Rules

Each skill must:

- have a clear `name` and `description` in frontmatter;
- explain when to use it;
- define inputs;
- define output format;
- include quality rules;
- avoid project-specific assumptions;
- be safe by default.

## Template Contribution Rules

Each template should:

- use the standard frontmatter where appropriate;
- be readable as plain Markdown;
- separate assumptions from confirmed facts;
- include open questions;
- be usable by both small and large teams.

## Pull Request Checklist

Before opening a PR:

- [ ] I updated or added relevant documentation.
- [ ] I checked that skills and templates are consistent.
- [ ] I avoided company-specific assumptions.
- [ ] I did not add unsafe shell or network behavior.
- [ ] I did not include secrets or private data.
- [ ] I included a short test prompt if I changed a skill.

## Commit Style

Prefer simple conventional commits:

```text
docs: improve PRD template
feat: add qa-checklist skill
fix: correct document ID convention
chore: reorganize templates
```
