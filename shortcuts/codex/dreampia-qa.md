---
description: Create or improve a QA checklist with Dreampia Dev Kit.
argument-hint: FEATURE="<feature or docs path>"
---

Use the Dreampia Dev Kit `qa-checklist` skill workflow and `templates/qa-checklist.md`.

User request:

```text
$ARGUMENTS
```

Produce Markdown with frontmatter, testable checks, regression coverage, release gates, assumptions, open questions, and related docs.

For a full QA checklist, include these exact `##` section headings:

1. `## 1. Scope`
2. `## 2. Preconditions`
3. `## 3. Test Environment`
4. `## 4. Functional Checklist`
5. `## 5. Permission Checklist`
6. `## 6. Edge Cases`
7. `## 7. Error Cases`
8. `## 8. Regression Checklist`
9. `## 9. Pass/Fail Criteria`
10. `## 10. Related Requirements`
11. `## 11. Assumptions`
12. `## 12. Open Questions`
13. `## 13. Related Documents`

Use this exact frontmatter shape when creating a file:

```yaml
---
doc_id: QA-FEATURE-001
doc_type: qa-checklist
feature_id: FEATURE-001
status: draft
owner: qa
related_docs: []
related_code: []
last_reviewed: YYYY-MM-DD
version: 0.1.0
---
```

Do not replace the standard frontmatter with ad hoc fields. Use `QA-###` IDs for checks, preserve related `REQ-###` references, and use `Pass`, `Fail`, `Blocked`, and `Not Run` statuses.
