---
description: Create or improve a Dreampia user flow using the user-flow skill workflow.
---

# Dreampia User Flow Alias

Follow the Dreampia Dev Kit `user-flow` skill workflow.

User request:

```text
$ARGUMENTS
```

Use `templates/user-flow.md` as the target structure. Link the flow to PRD requirements, IA routes, screens, API dependencies, data dependencies, and QA checks when those documents are available.

Output Markdown with standard Dreampia frontmatter, actors, entry points, happy paths, alternate paths, error paths, state transitions, assumptions, and open questions.

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

Safety rules:

- Do not treat guessed screens or routes as confirmed.
- Do not erase edge cases just because the happy path is clear.
- Do not overwrite existing documents without showing the intended change first.
