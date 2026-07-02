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

Use these exact `##` section headings for a full PRD:

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

## Quality Rules

- Requirements must be testable.
- Use IDs such as `US-001`, `REQ-001`, and `AC-001`.
- Include acceptance criteria for each must-have requirement.
- Explicitly separate MVP scope from later scope.
- Recommend related IA, TRD, API, ERD, and QA documents.

## Document Output Requirements

- Start generated PRDs with this exact frontmatter shape when creating a file:

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

- Replace `FEATURE-001` with a concise feature ID when the feature is clear.
- Use `doc_id` prefix `PRD`, `doc_type: prd`, `owner: product`, and `version: 0.1.0`.
- Link related documents by ID when known; leave `related_docs: []` when unknown and list follow-ups.
- Do not substitute ad hoc fields such as `title`, `product`, `date`, `created`, or `updated` for the standard fields.
- Use `US-###` for user stories, `REQ-###` for requirements, and `AC-###` for acceptance criteria.

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
