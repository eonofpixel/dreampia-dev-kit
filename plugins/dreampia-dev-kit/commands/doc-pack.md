---
description: Draft a linked Dreampia document pack from a feature idea or rough brief.
---

# Dreampia Document Pack

Create or revise a linked Dreampia Dev Kit document pack from the user's request.

User request:

```text
$ARGUMENTS
```

Use the core Dreampia workflows in this order:

1. `prd`
2. `trd`
3. `ia`
4. `user-flow`
5. `api-spec`
6. `erd`
7. `qa-checklist`
8. `doc-audit`

Start from `templates/project-brief.md` only when the product context is missing or too vague. Keep documents aligned through `related_docs`, `related_code`, assumptions, open questions, and acceptance criteria.

Output either:

- a concise plan for the document pack when the scope is large; or
- the requested Markdown documents when the scope is narrow enough to complete safely.

Safety rules:

- Do not overwrite existing user documents without showing a diff or asking for confirmation.
- Do not invent external APIs, legal claims, or compliance status.
- Do not read or print secrets.
