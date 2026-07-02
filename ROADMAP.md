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

## v0.3.0 — CLI Foundation Expansion

Goal: Expand the CLI beyond gates while keeping the Markdown-first workflow.

- `dreampia-dev-kit init`
- `dreampia-dev-kit scaffold-codex-plugin`
- Unit tests
- Optional TypeScript migration if the CLI surface grows

## v0.4.0 — Documentation Audit Engine

Goal: Detect documentation gaps and inconsistencies.

- Parse document frontmatter
- Detect broken `related_docs`
- Detect missing QA coverage
- Detect orphan documents
- Produce audit report

## v0.5.0 — Code-to-Docs Drafting

Goal: Generate document suggestions from codebase structure.

- Route discovery
- API discovery
- Database schema discovery
- Generated doc suggestions
- Safe write mode with confirmation

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
