---
name: doc-audit
description: Audit documentation drift and consistency across PRD, TRD, IA, API Spec, ERD, QA, templates, and code references. Use for doc audit, documentation review, spec review, requirements gap, broken document IDs, and code/document drift candidates.
---

# Doc Audit Skill

Use this skill to review documentation consistency across a repository.

## Inputs to Inspect

- `AGENTS.md`
- `DOC_SYSTEM.md`
- `docs/`
- `templates/`
- `skills/`
- PRD/TRD/IA/API/ERD/QA documents
- Code paths only when needed and safe

## Audit Scope

Check for:

1. Missing required frontmatter.
2. Duplicate document IDs.
3. Invalid document status.
4. Broken `related_docs` references.
5. PRD requirements without QA coverage.
6. IA pages without user flows or screen specs.
7. API endpoints without related requirements.
8. ERD entities not referenced by APIs or TRDs.
9. Documents with assumptions that should become requirements.
10. Code/document drift candidates.

## Output Format

1. Audit summary
2. Critical issues
3. Major issues
4. Minor issues
5. Missing documents
6. Broken references
7. Ambiguous requirements
8. Code/document drift candidates
9. Recommended fixes
10. Suggested next prompts for Codex

## Document Output Requirements

- Start generated audit reports with standard frontmatter from `DOC_SYSTEM.md` when creating a file.
- Use `doc_id` prefix `QA`, `doc_type: doc-audit-report`, `owner: documentation`, and `version: 0.1.0`.
- Include enough file paths and document IDs for a human to reproduce each finding.

## Quality Rules

- Findings must cite the affected document path or document ID when available.
- Separate confirmed inconsistencies from assumptions and recommended follow-ups.
- Prioritize issues that block implementation, release, or human review.
- Do not report code/document drift unless there is observable evidence or a clearly labeled candidate.

## Severity Rules

| Severity | Meaning |
|---|---|
| Critical | Blocks implementation or release. |
| Major | Likely to cause rework or confusion. |
| Minor | Should be fixed but does not block progress. |

## Safety Rules

- Read first, report first.
- Do not rewrite documents unless the user asks.
- Do not inspect secrets.
- Do not run destructive commands.
- If code scanning is needed, inspect only relevant source files.

## Example Invocation

```text
Use the doc-audit skill to audit docs/ and report inconsistencies between PRD, API spec, ERD, and QA documents.
```

## General Rules

- Separate confirmed facts from assumptions.
- Mark assumptions explicitly under `Assumptions`.
- Do not invent legal, payment, security, or compliance rules without marking them as assumptions.
- Prefer tables for requirements, edge cases, and checks.
- Include open questions when information is missing.
- Recommend related follow-up documents.
- Output Markdown only unless the user requests another format.
