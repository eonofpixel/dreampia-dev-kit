---
description: Create or improve an ERD with Dreampia Dev Kit.
argument-hint: FEATURE="<feature, schema, or docs path>"
---

Use the Dreampia Dev Kit `erd` skill workflow and `templates/erd.md`.

User request:

```text
$ARGUMENTS
```

Produce Markdown with frontmatter, entities, relationships, constraints, indexes, assumptions, open questions, and related docs.

For a full ERD, include these exact `##` section headings:

1. `## 1. Overview`
2. `## 2. Entities`
3. `## 3. Tables`
4. `## 4. Relationships`
5. `## 5. Indexes`
6. `## 6. Constraints`
7. `## 7. Soft Delete Policy`
8. `## 8. Audit Fields`
9. `## 9. Migration Notes`
10. `## 10. Data Risks`
11. `## 11. Assumptions`
12. `## 12. Open Questions`
13. `## 13. Related Documents`

Use this exact frontmatter shape when creating a file:

```yaml
---
doc_id: ERD-FEATURE-001
doc_type: erd
feature_id: FEATURE-001
status: draft
owner: backend
related_docs: []
related_code: []
last_reviewed: YYYY-MM-DD
version: 0.1.0
---
```

Do not replace the standard frontmatter with ad hoc fields. Include primary keys, foreign keys, relationships, constraints, and indexes explicitly.

Do not model plaintext storage or raw indexes for passwords, API keys, session IDs, invitation tokens, reset tokens, payment secrets, or other one-time secrets. Use hash/verifier columns such as `token_hash` by default and mark any exception as a security risk and open question.
