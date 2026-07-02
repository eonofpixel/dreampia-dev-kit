# Changelog

All notable changes to `dreampia-dev-kit` will be documented in this file.

## Unreleased

### Added

- Added `dreampia-dev-kit init` for creating a starter document pack from the built-in templates.
- Added `dreampia-dev-kit doctor` for checking Codex/Claude Code install surfaces, plugin version alignment, and generated-doc validation readiness.
- Added a Korean LazyCodex-style direction proposal for the next onboarding and CLI surface.

## 0.3.0 - 2026-07-03

### Added

- Added `dreampia-dev-kit explain` to turn structure scores and content-risk findings into a plain-language Markdown report.
- Added automated CLI smoke tests for `guide`, `validate`, and `explain` behavior.

### Changed

- Updated GitHub Actions to run CLI smoke tests as part of repository validation.
- Documented the beginner-friendly validate-then-explain loop in the README and guides.

## 0.2.1 - 2026-07-03

### Added

- Added `dreampia-dev-kit guide` for first-time users moving from a rough idea to a reviewed doc pack.
- Added beginner guides in English and Korean.

### Changed

- Added plain-language next-action guidance after `dreampia-dev-kit validate` passes or fails.
- Split the CLI into small CommonJS modules under `lib/` to keep future workflow guidance maintainable.

## 0.2.0 - 2026-07-03

### Added

- Added a dependency-free `dreampia-dev-kit` Node CLI for `score`, `audit`, `validate`, and `validate-skill-pack` commands.
- Added directory input support so CI can run generated-document gates with `dreampia-dev-kit validate docs/`.
- Added npm package metadata and a CLI bin entry for future `npx dreampia-dev-kit ...` usage.

### Changed

- Updated GitHub Actions to use the public CLI surface for skill-pack validation and curated example document gates.
- Kept Codex and Claude Code plugin manifest versions aligned with `package.json` during validation.

## 0.1.9 - 2026-07-02

### Changed

- Added a 30-second README demo showing document-pack generation, structure scoring, and content-risk auditing.
- Raised both curated example sets to 100 structure scores across all generated document types.
- Expanded content-risk auditing beyond invitation tokens to cover live secret patterns, credential-like response examples, plaintext secret storage, raw payment card data, PII retention gaps, and guest/account policy conflicts.

## 0.1.8 - 2026-07-02

### Added

- Added `docs/COMPETITIVE_LANDSCAPE.md` covering direct and indirect open-source competitors.

### Changed

- Added README positioning against broader spec-driven development frameworks.

## 0.1.7 - 2026-07-02

### Changed

- Hardened PRD, TRD, API spec, ERD, QA checklist, doc-audit, shortcut, and document-pack rules against raw secret exposure, plaintext secret storage, speculative policies, and cross-document policy conflicts.
- Updated templates to model safer defaults for sensitive values, one-time secrets, rate limits, and QA expected results.
- Added example content-risk audits to GitHub Actions validation.
- Cleaned example PRDs so curated examples pass the content-risk audit with zero findings.

## 0.1.6 - 2026-07-02

### Added

- Added `scripts/audit-generated-doc-content.js` for content-risk auditing of real agent-generated documents.

### Changed

- Documented the difference between structure scoring and stricter content-risk auditing.
- Added content-audit helper syntax checks to GitHub Actions validation.

## 0.1.5 - 2026-07-02

### Added

- Extended generated-document scoring to IA, user-flow, and doc-audit report outputs.

### Changed

- Hardened IA, user-flow, doc-audit, and doc-pack output rules after live Claude Code mock-data testing.
- Added explicit document-pack mappings for filenames, `doc_type`, owners, document ID prefixes, required headings, screen IDs, and `related_code`.

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
