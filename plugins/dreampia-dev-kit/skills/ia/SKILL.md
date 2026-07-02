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

1. Overview
2. Navigation tree
3. Page list
4. Screen IDs
5. Route/path suggestions
6. Access rules
7. Entry points
8. Exit points
9. Related user flows
10. Missing screens
11. Assumptions
12. Open questions

## Quality Rules

- Use stable screen IDs such as `PAGE-AUTH-001`.
- Distinguish pages, modals, tabs, and states.
- Include role-based access.
- Identify missing screens implied by the PRD.
- Recommend user-flow and screen-spec documents.

## Document Output Requirements

- Start generated IA documents with standard frontmatter from `DOC_SYSTEM.md` when creating a file.
- Use `doc_id` prefix `IA`, `doc_type: ia`, `owner: design`, and `version: 0.1.0`.
- Link related PRD, user-flow, screen-spec, and QA documents by ID when known.

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
