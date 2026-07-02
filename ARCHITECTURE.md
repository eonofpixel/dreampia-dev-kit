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

## v0.2 CLI Gate

v0.2 keeps the runtime intentionally thin: one dependency-free Node CLI wraps the existing validation scripts so local users and CI can run the same checks.

```text
bin/dreampia-dev-kit.js
  ├── scripts/validate-skill-pack.js
  ├── scripts/score-generated-docs.js
  └── scripts/audit-generated-doc-content.js
```

The CLI accepts file or directory inputs. Directory inputs are scanned for generated Markdown documents with supported `doc_type` values.

## Future Runtime Architecture

If the CLI grows beyond wrappers and gates, use this structure:

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

## CLI Commands

| Command | Purpose | Version |
|---|---|---|
| `dreampia-dev-kit score` | Score generated document structure. | v0.2 |
| `dreampia-dev-kit audit` | Audit generated documents for content risks. | v0.2 |
| `dreampia-dev-kit validate` | Run score and audit as one CI gate. | v0.2 |
| `dreampia-dev-kit validate-skill-pack` | Validate repository skills, templates, plugins, and shortcuts. | v0.2 |
| `dreampia-dev-kit init` | Create docs directory structure and templates. | Later |
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

- Keep Markdown skills usable without requiring the CLI.
- Do not require network access.
- Do not assume a specific product domain.
- Avoid destructive operations.
- Prefer clear text reports over complex generated artifacts.
