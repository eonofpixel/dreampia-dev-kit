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

Safety rules:

- Do not treat guessed screens or routes as confirmed.
- Do not erase edge cases just because the happy path is clear.
- Do not overwrite existing documents without showing the intended change first.
