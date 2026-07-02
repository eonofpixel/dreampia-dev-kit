# Changelog

All notable changes to `dreampia-dev-kit` will be documented in this file.

## 0.1.4 - 2026-07-02

### Added

- Added `scripts/score-generated-docs.js` for scoring real agent-generated PRD, TRD, API spec, ERD, and QA checklist documents.

### Changed

- Hardened TRD, API spec, ERD, and QA checklist skill and shortcut output rules after live Claude Code mock-data chain testing.

## 0.1.3 - 2026-07-02

### Added

- Added GitHub Actions validation for skill-pack structure, shell syntax, and installer smoke tests.
- Added release process and marketplace verification runbooks.
- Added an ecommerce guest checkout example document set.

### Changed

- Hardened PRD skill and shortcut output rules after live Codex and Claude Code mock-data testing.

## 0.1.2 - 2026-07-02

### Added

- Added Claude Code personal command shortcuts under `shortcuts/claude-code/`.
- Added Claude Code plugin command aliases for short names such as `api`, `qa`, `audit`, and `doc-pack`.
- Added optional Codex prompt shortcuts under `shortcuts/codex/`.
- Extended installers to copy skills and shortcuts together.
- Added shortcut validation to `scripts/validate-skill-pack.js`.
- Expanded installation docs with canonical and optional invocation styles.

## 0.1.1 - 2026-07-02

### Added

- Added `install.sh` for terminal-first Codex and Claude Code installation.
- Documented GitHub URL-based marketplace installation for Codex and Claude Code.

## 0.1.0 - 2026-07-02

### Added

- Established the Markdown-first skill pack as the v0.1 release target.
- Added complete core skill workflows for PRD, TRD, IA, user-flow, API spec, ERD, QA checklist, and doc audit.
- Added reusable Markdown templates with standard frontmatter, assumptions, open questions, and related document sections.
- Added local Codex and Claude Code plugin manifests and marketplace examples.
- Documented Codex and Claude Code personal skill and plugin installation paths.
- Added a small-service example document set.
- Added `scripts/validate-skill-pack.js` for no-dependency local validation.

### Not Included

- No runtime CLI.
- No GitHub bot or hosted service.
- No automatic code parsing or network-dependent workflow.
