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

When creating files, create separate Markdown documents that follow each target workflow's exact frontmatter and exact `##` section headings. Do not collapse the pack into one combined document unless the user explicitly asks for a single file.

Use these default filenames when the user asks for a docs pack and no paths are provided:

| File | `doc_id` prefix | `doc_type` | `owner` |
|---|---|---|---|
| `docs/prd.md` | `PRD` | `prd` | `product` |
| `docs/trd.md` | `TRD` | `trd` | `engineering` |
| `docs/ia.md` | `IA` | `ia` | `design` |
| `docs/user-flow.md` | `FLOW` | `user-flow` | `design` |
| `docs/api-spec.md` | `API` | `api-spec` | `backend` |
| `docs/erd.md` | `ERD` | `erd` | `backend` |
| `docs/qa-checklist.md` | `QA` | `qa-checklist` | `qa` |
| `docs/doc-audit-report.md` | `QA` | `doc-audit-report` | `documentation` |

When the pack includes `docs/ia.md`, use exactly these headings:

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

When the pack includes `docs/user-flow.md`, use exactly these headings:

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

When creating IA or user-flow documents in a pack, include stable screen IDs:

- In `docs/ia.md`, the `## 3. Page List` table must include at least one screen ID such as `PAGE-INVITES-001`.
- In `docs/user-flow.md`, the `## 9. Related Screens` section must reference at least one `PAGE-...` screen ID from the IA.

Keep `doc_id`, `feature_id`, `related_docs`, and requirement/check IDs consistent across the pack.

Every file in a pack must include `related_code: []` in frontmatter when no code paths are known. Do not omit `related_code`.

Never use doc type aliases such as `information_architecture`, `user_flow`, `doc_audit`, or `doc-audit`. Never use `UF-` for user-flow document IDs; use `FLOW-`.

Safety rules:

- Do not overwrite existing user documents without showing a diff or asking for confirmation.
- Do not invent external APIs, legal claims, or compliance status.
- Do not read or print secrets.
