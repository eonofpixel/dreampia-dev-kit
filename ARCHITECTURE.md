# Architecture Plan

## v0.1 Architecture

v0.1 should be documentation-first and runtime-light.

```text
Markdown files
  ↓
Agent skills
  ↓
Templates
  ↓
Codex and Claude Code plugin package
```

No CLI is required for v0.1.

## Future Runtime Architecture

When a CLI is added, use this structure:

```text
packages/
├── core/
│   ├── skill-loader.ts
│   ├── template-loader.ts
│   ├── frontmatter.ts
│   └── ids.ts
├── validator/
│   ├── validate-skills.ts
│   ├── validate-frontmatter.ts
│   └── validate-doc-links.ts
└── cli/
    ├── commands/
    │   ├── init.ts
    │   ├── validate-skills.ts
    │   ├── audit-docs.ts
    │   └── scaffold-plugin.ts
    └── index.ts
```

## CLI Commands Later

| Command | Purpose | Version |
|---|---|---|
| `dreampia-dev-kit init` | Create docs directory structure and templates. | v0.2 |
| `dreampia-dev-kit validate-skills` | Validate `skills/*/SKILL.md`. | v0.2 |
| `dreampia-dev-kit validate-docs` | Validate document frontmatter and links. | v0.2 |
| `dreampia-dev-kit audit-docs` | Report document gaps and drift. | v0.3 |
| `dreampia-dev-kit scaffold-codex-plugin` | Create Codex plugin package structure. | v0.3 |

## Plugin Packaging Plan

Shared plugin layout:

```text
plugins/dreampia-dev-kit/
├── .codex-plugin/
│   └── plugin.json
├── .claude-plugin/
│   └── plugin.json
└── skills/
    ├── prd/
    │   └── SKILL.md
    ├── trd/
    │   └── SKILL.md
    └── ...
```

Codex local marketplace layout:

```text
.agents/
└── plugins/
    └── marketplace.json
```

Claude Code local marketplace layout:

```text
.claude-plugin/
└── marketplace.json
```

Root `skills/` is the source of truth. Run `scripts/sync-plugin-skills.sh` after editing root skills.

## Package Boundaries

| Package | Responsibility |
|---|---|
| `core` | Shared file loading, metadata parsing, ID helpers. |
| `validator` | Skill and document validation. |
| `cli` | User-facing commands. |

## Design Constraints

- Keep Markdown skills usable without the CLI.
- Do not require network access.
- Do not assume a specific product domain.
- Avoid destructive operations.
- Prefer clear text reports over complex generated artifacts.
