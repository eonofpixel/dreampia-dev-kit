---
description: Create or improve IA with Dreampia Dev Kit.
---

# Dreampia IA

Use the Dreampia Dev Kit `ia` skill workflow and `templates/ia.md`.

User request:

```text
$ARGUMENTS
```

Produce Markdown with frontmatter, sitemap, routes, page hierarchy, access rules, assumptions, open questions, and related docs.

For a full IA document, include these exact `##` section headings:

1. `## 1. Overview`
2. `## 2. Navigation Tree`
3. `## 3. Page List`
4. `## 4. Access Rules`
5. `## 5. Entry Points`
6. `## 6. Exit Points`
7. `## 7. Related User Flows`
8. `## 8. Missing Screens`
9. `## 9. Assumptions`
10. `## 10. Open Questions`
11. `## 11. Related Documents`

Use this exact frontmatter shape when creating a file:

```yaml
---
doc_id: IA-FEATURE-001
doc_type: ia
feature_id: FEATURE-001
status: draft
owner: design
related_docs: []
related_code: []
last_reviewed: YYYY-MM-DD
version: 0.1.0
---
```

Do not replace the standard frontmatter with ad hoc fields. Use stable screen IDs such as `PAGE-AUTH-001`, route paths, and role-based access rules.
