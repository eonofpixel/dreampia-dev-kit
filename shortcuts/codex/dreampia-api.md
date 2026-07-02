---
description: Create or improve an API Spec with Dreampia Dev Kit.
argument-hint: FEATURE="<feature, endpoint, or docs path>"
---

Use the Dreampia Dev Kit `api-spec` skill workflow and `templates/api-spec.md`.

User request:

```text
$ARGUMENTS
```

Produce Markdown with frontmatter, endpoint contracts, schemas, auth, error handling, assumptions, open questions, and related docs.

For a full API spec, include these exact `##` section headings:

1. `## 1. Overview`
2. `## 2. Authentication`
3. `## 3. Common Headers`
4. `## 4. Endpoint List`
5. `## 5. Endpoint Details`
6. `## 6. Pagination`
7. `## 7. Filtering and Sorting`
8. `## 8. Idempotency`
9. `## 9. Rate Limits`
10. `## 10. Examples`
11. `## 11. Assumptions`
12. `## 12. Open Questions`
13. `## 13. Related Documents`

Use this exact frontmatter shape when creating a file:

```yaml
---
doc_id: API-FEATURE-001
doc_type: api-spec
feature_id: FEATURE-001
status: draft
owner: backend
related_docs: []
related_code: []
last_reviewed: YYYY-MM-DD
version: 0.1.0
---
```

Do not replace the standard frontmatter with ad hoc fields. Include explicit HTTP methods and paths, status codes, and related `REQ-###` references.

Do not include raw tokens, credentials, API keys, session IDs, invitation links, reset links, or payment secrets in success responses or examples. Return stable IDs and status fields instead. Use `<redacted-token>` only when a sensitive request input is unavoidable, and put unsourced auth scopes or rate limits under assumptions/open questions.
