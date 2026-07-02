---
name: prd
description: PRD requirements workflow for Product Requirements Documents. Use for PRD, product requirements, feature requirements, MVP scope, user stories, acceptance criteria, and product planning.
---

# PRD Skill

Use this skill to create or improve a Product Requirements Document for a software product, service, or feature.

## Inputs to Inspect or Ask For

- Product or feature name
- Target users
- Problem statement
- Business goal
- MVP scope
- Functional requirements
- Non-functional requirements
- Policy constraints
- User scenarios
- Success metrics
- Release phase
- Existing docs or code paths

## Output Format

1. Overview
2. Background
3. Goals
4. Non-goals
5. Target users
6. User stories
7. Functional requirements
8. Policies and rules
9. Edge cases
10. Acceptance criteria
11. Analytics and success metrics
12. Dependencies
13. Risks
14. Assumptions
15. Open questions
16. Related documents

## Quality Rules

- Requirements must be testable.
- Use IDs such as `REQ-001` and `US-001`.
- Include acceptance criteria for each must-have requirement.
- Explicitly separate MVP scope from later scope.
- Recommend related IA, TRD, API, ERD, and QA documents.

## Document Output Requirements

- Start generated PRDs with standard frontmatter from `DOC_SYSTEM.md` when creating a file.
- Use `doc_id` prefix `PRD`, `doc_type: prd`, `owner: product`, and `version: 0.1.0`.
- Link related documents by ID when known; leave `related_docs: []` when unknown and list follow-ups.

## Safety Rules

- Do not read secrets or private credentials while gathering context.
- Do not invent legal, payment, security, or compliance requirements as facts.
- Do not overwrite an existing PRD without first showing a diff or creating a separate revised draft.

## Example Invocation

```text
Use the prd skill to create a PRD for workspace invitation in a B2B SaaS product.
```

## General Rules

- Separate confirmed facts from assumptions.
- Mark assumptions explicitly under `Assumptions`.
- Do not invent legal, payment, security, or compliance rules without marking them as assumptions.
- Prefer tables for requirements, edge cases, and checks.
- Include open questions when information is missing.
- Recommend related follow-up documents.
- Output Markdown only unless the user requests another format.
