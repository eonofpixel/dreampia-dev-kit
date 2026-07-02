---
description: Audit Dreampia docs for drift and missing coverage.
---

# Dreampia Doc Audit

Use the Dreampia Dev Kit `doc-audit` skill workflow and `templates/doc-audit-report.md` when a report is requested.

User request:

```text
$ARGUMENTS
```

Read first and report first. Do not edit files unless the user explicitly asks for edits.

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

Do not replace the standard frontmatter with ad hoc fields like `audit_date`. Use `Critical`, `Major`, and `Minor` severity labels with affected document paths or IDs and recommended fixes.
