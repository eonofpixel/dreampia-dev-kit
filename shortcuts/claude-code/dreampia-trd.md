---
description: Create or improve a TRD with Dreampia Dev Kit.
---

# Dreampia TRD

Use the Dreampia Dev Kit `trd` skill workflow and `templates/trd.md`.

User request:

```text
$ARGUMENTS
```

Produce Markdown with frontmatter, architecture context, implementation requirements, security, performance, risks, assumptions, and open questions.

For a full TRD, include these exact `##` section headings:

1. `## 1. Overview`
2. `## 2. Related Product Requirements`
3. `## 3. Technical Goals`
4. `## 4. Non-goals`
5. `## 5. System Context`
6. `## 6. Architecture Overview`
7. `## 7. Components`
8. `## 8. API Requirements`
9. `## 9. Data Requirements`
10. `## 10. Security Requirements`
11. `## 11. Performance Requirements`
12. `## 12. Observability Requirements`
13. `## 13. Infrastructure Requirements`
14. `## 14. Migration Requirements`
15. `## 15. Risks and Trade-offs`
16. `## 16. Assumptions`
17. `## 17. Open Questions`
18. `## 18. Related Documents`

Use this exact frontmatter shape when creating a file:

```yaml
---
doc_id: TRD-FEATURE-001
doc_type: trd
feature_id: FEATURE-001
status: draft
owner: engineering
related_docs: []
related_code: []
last_reviewed: YYYY-MM-DD
version: 0.1.0
---
```

Do not replace the standard frontmatter with ad hoc fields. Preserve related `REQ-###` references when available.
