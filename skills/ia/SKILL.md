---
name: ia
description: IA information architecture workflow. Use for IA, sitemap, menu structure, page hierarchy, screen list, routes, navigation, and access structure.
---

# IA Skill

Use this skill to create an Information Architecture document for a web app, mobile app, admin system, SaaS product, or internal tool.

## Inputs to Inspect or Ask For

- Product type
- Target users and roles
- Main features
- Existing PRD or screen list
- Public/private access rules
- Admin/user separation
- Navigation constraints
- Platform: web, mobile, desktop, or responsive

## Output Format

Use these exact `##` section headings for a full IA document:

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

## Quality Rules

- Use stable screen IDs such as `PAGE-AUTH-001`.
- Distinguish pages, modals, tabs, and states.
- Include role-based access.
- Identify missing screens implied by the PRD.
- Recommend user-flow and screen-spec documents.

## Document Output Requirements

- Start generated IA documents with this exact frontmatter shape when creating a file:

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

- Replace `FEATURE-001` with a concise feature ID when the feature is clear.
- Use `doc_id` prefix `IA`, `doc_type: ia`, `owner: design`, and `version: 0.1.0`.
- Link related PRD, user-flow, screen-spec, and QA documents by ID when known.
- Do not substitute ad hoc fields such as `title`, `product`, `date`, `created`, or `updated` for the standard fields.
- Use stable screen IDs such as `PAGE-AUTH-001` in the page list.
- Include route paths, access roles, entry points, exit points, and related user flows explicitly.

## Safety Rules

- Do not infer sensitive admin or internal routes as facts without source evidence.
- Do not expose private route names, unreleased features, or access rules unless they appear in provided context.
- Do not overwrite existing IA documents without first showing a diff or creating a separate revised draft.

## Example Invocation

```text
Use the ia skill to create an IA for a small ecommerce service.
```

## General Rules

- Separate confirmed facts from assumptions.
- Mark assumptions explicitly under `Assumptions`.
- Do not invent legal, payment, security, or compliance rules without marking them as assumptions.
- Prefer tables for requirements, edge cases, and checks.
- Include open questions when information is missing.
- Recommend related follow-up documents.
- Output Markdown only unless the user requests another format.
