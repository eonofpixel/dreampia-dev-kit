---
description: Audit Dreampia docs for drift, missing links, and unclear requirements.
---

# Dreampia Doc Audit Alias

Follow the Dreampia Dev Kit `doc-audit` skill workflow.

User request:

```text
$ARGUMENTS
```

Read first and report first. Inspect the requested docs, then compare PRD, TRD, IA, user-flow, API Spec, ERD, and QA coverage for mismatches.

Output a Markdown audit report using `templates/doc-audit-report.md` when a report file is requested. Otherwise, summarize findings by severity with file references and next actions.

Include content-risk checks for raw secret exposure, plaintext secret storage/indexing, conflicting policy wording, speculative auth scopes/rate limits, unresolved external references, and repeated open questions.

When creating an audit report file, include these exact `##` section headings:

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

Use this exact frontmatter shape when creating a file:

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

Safety rules:

- Do not modify documents during the audit unless the user explicitly asks for edits.
- Do not inspect secrets, `.env`, keys, tokens, or credential files.
- Mark uncertain findings as assumptions or open questions.
