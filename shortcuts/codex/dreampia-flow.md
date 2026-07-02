---
description: Create or improve a user flow with Dreampia Dev Kit.
argument-hint: FEATURE="<feature, journey, or docs path>"
---

Use the Dreampia Dev Kit `user-flow` skill workflow and `templates/user-flow.md`.

User request:

```text
$ARGUMENTS
```

Produce Markdown with frontmatter, actors, entry points, happy paths, alternate paths, error paths, state transitions, assumptions, and open questions.

For a full user-flow document, include these exact `##` section headings:

1. `## 1. Flow Name`
2. `## 2. Actor`
3. `## 3. Trigger`
4. `## 4. Preconditions`
5. `## 5. Happy Path`
6. `## 6. Alternative Paths`
7. `## 7. Error Paths`
8. `## 8. State Transitions`
9. `## 9. Related Screens`
10. `## 10. Related APIs`
11. `## 11. Analytics Events`
12. `## 12. Assumptions`
13. `## 13. Open Questions`
14. `## 14. Related Documents`

Use this exact frontmatter shape when creating a file:

```yaml
---
doc_id: FLOW-FEATURE-001
doc_type: user-flow
feature_id: FEATURE-001
status: draft
owner: design
related_docs: []
related_code: []
last_reviewed: YYYY-MM-DD
version: 0.1.0
---
```

Do not replace the standard frontmatter with ad hoc fields. Include step markers, related `PAGE-###` or `PAGE-AREA-###` screen IDs, state transitions, related APIs, and analytics events.
