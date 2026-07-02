---
description: Create or improve a PRD with Dreampia Dev Kit.
argument-hint: FEATURE="<feature idea or docs path>"
---

Use the Dreampia Dev Kit `prd` skill workflow and `templates/prd.md`.

User request:

```text
$ARGUMENTS
```

Produce Markdown with frontmatter, scope, goals, non-goals, user stories, requirements, acceptance criteria, assumptions, and open questions.

For a full PRD, include these exact `##` section headings:

1. `## Overview`
2. `## Background`
3. `## Goals`
4. `## Non-goals`
5. `## Target Users`
6. `## User Stories`
7. `## Functional Requirements`
8. `## Policies and Rules`
9. `## Edge Cases`
10. `## Acceptance Criteria`
11. `## Analytics and Success Metrics`
12. `## Dependencies`
13. `## Risks`
14. `## Assumptions`
15. `## Open Questions`
16. `## Related Documents`

When creating a file, use this exact Dreampia frontmatter shape:

```yaml
---
doc_id: PRD-FEATURE-001
doc_type: prd
feature_id: FEATURE-001
status: draft
owner: product
related_docs: []
related_code: []
last_reviewed: YYYY-MM-DD
version: 0.1.0
---
```

Use `US-###` for user stories, `REQ-###` for functional requirements, and `AC-###` for acceptance criteria. Do not replace the standard frontmatter with ad hoc fields like `title`, `product`, `date`, `created`, or `updated`.
