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
11. Client-visible examples or QA checks that expose raw tokens, credentials, API keys, session IDs, invitation links, reset links, or payment secrets.
12. ERD/TRD schemas that store or index raw secret values instead of hashes or verifiers.
13. Conflicting policy wording across documents, especially expiration, resend/retry, revocation, authorization, and rate-limit rules.
14. Auth scopes, rate limits, availability targets, or external service guarantees presented as facts without source support.

## Output Format

Use these exact `##` section headings for a full doc-audit report:

1. `## 1. Audit Scope`
2. `## 2. Summary`
3. `## 3. Critical Issues`
4. `## 4. Major Issues`
5. `## 5. Minor Issues`
6. `## 6. Missing Documents`
7. `## 7. Broken References`
8. `## 8. Ambiguous Requirements`
9. `## 9. Code/Docs Drift Candidates`
10. `## 10. Recommended Next Actions`
11. `## 11. Suggested Next Prompts for Codex`
12. `## 12. Assumptions`
13. `## 13. Open Questions`

## Document Output Requirements

- Start generated audit reports with this exact frontmatter shape when creating a file:

```yaml
---
doc_id: QA-DOCS-001
doc_type: doc-audit-report
feature_id: DOCS-001
status: draft
owner: documentation
related_docs: []
related_code: []
last_reviewed: YYYY-MM-DD
version: 0.1.0
---
```

- Replace `DOCS-001` with a concise feature or documentation-set ID when the audited scope is clear.
- Use `doc_id` prefix `QA`, `doc_type: doc-audit-report`, `owner: documentation`, and `version: 0.1.0`.
- Include enough file paths and document IDs for a human to reproduce each finding.
- Do not substitute ad hoc fields such as `audit_date`, `title`, `date`, `created`, or `updated` for the standard fields.
- Use severity labels `Critical`, `Major`, and `Minor`, and include affected document paths or IDs plus recommended fixes.

## Quality Rules

- Findings must cite the affected document path or document ID when available.
- Separate confirmed inconsistencies from assumptions and recommended follow-ups.
- Prioritize issues that block implementation, release, or human review.
- Do not report code/document drift unless there is observable evidence or a clearly labeled candidate.
- Treat raw secret exposure, plaintext secret storage, and conflicting security-sensitive policy wording as Major or Critical depending on release impact.
- Recommend `node scripts/audit-generated-doc-content.js <docs...>` when the repository includes the Dreampia content-audit helper.

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
