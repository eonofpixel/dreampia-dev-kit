# Roadmap

## v0.1.0 — Markdown-first Skill Pack

Goal: Make the project immediately useful in Codex as a documentation workflow repository.

- Root documentation
- Core skill files
- Core templates
- Security/contribution docs
- Codex bootstrap prompt
- Codex and Claude Code local install docs
- Shared local plugin package

## v0.2.0 — CLI + CI Quality Gate

Goal: Make Dreampia useful after AI-generated docs exist by giving teams one fast local/CI gate.

- `dreampia-dev-kit score <docs>` for structure scoring
- `dreampia-dev-kit audit <docs>` for content-risk auditing
- `dreampia-dev-kit validate <docs>` for the combined CI gate
- `dreampia-dev-kit validate-skill-pack` for repository/package validation
- Directory input support for generated doc folders

## v0.2.1 — Accessible Guided Workflow

Goal: Turn the accessibility philosophy into a visible first-run workflow.

- `dreampia-dev-kit guide <idea>` for first-time users who need a step-by-step doc-pack workflow
- Plain-language validation next steps after pass or fail
- Beginner guides in English and Korean
- CLI module split for maintainable future guidance

## v0.3.0 — Explainable CLI Foundation

Goal: Turn validation output into actionable guidance while keeping the Markdown-first workflow beginner-friendly.

- `dreampia-dev-kit explain <docs>` for plain-language required fixes, recommended improvements, and learning notes
- automated CLI smoke tests for guide, validate, and explain output
- richer failure explanations with specific doc paths and suggested fixes

## v0.3.x — CLI Foundation Expansion

Goal: Expand the CLI beyond guidance reports without making Markdown skills depend on a runtime.

- `dreampia-dev-kit init`
- `dreampia-dev-kit doctor`
- LazyCodex-style onboarding direction proposal
- Documentation operations and verification orchestrator positioning
- `dreampia-dev-kit scaffold-codex-plugin`
- Unit tests
- Optional TypeScript migration if the CLI surface grows

## v0.4.0 — Documentation Audit Engine

Goal: Detect documentation gaps and inconsistencies so Dreampia can orchestrate document operations before implementation.

- Parse document frontmatter
- Detect broken `related_docs`
- Detect missing QA coverage
- Detect orphan documents
- Produce audit report
- Explain audit findings in plain language with next actions for non-expert builders

## v0.5.0 — Code-to-Docs Drafting

Goal: Generate document suggestions from codebase structure.

- Route discovery
- API discovery
- Database schema discovery
- Generated doc suggestions
- Safe write mode with confirmation
- beginner-safe review prompts before generated suggestions drive code

## v0.6.0 — Documentation Operations Orchestrator

Goal: Read a docs folder, decide the next documentation operation, and produce the next CLI command or agent prompt.

- `dreampia-dev-kit orchestrate docs/` or `dreampia-dev-kit doc-ops docs/`
- document operation queue
- beginner and expert explanation modes
- next prompt generation for Codex and Claude Code
- no implementation writes by default

## v1.0.0 — Stable Open-source Release

Goal: Provide a stable, documented, reusable system.

- Stable core skills
- Stable templates
- CLI validation
- Plugin packaging docs
- Multiple examples
- Contribution guide
- Security policy
- Release process
- beginner-friendly learning path from idea to validated docs to implementation
