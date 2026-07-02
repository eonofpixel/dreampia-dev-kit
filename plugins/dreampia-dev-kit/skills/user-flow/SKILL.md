---
name: user-flow
description: User flow and journey workflow. Use for user flow, UX flow, journey, conversion flow, process flow, state transition, happy path, alternative path, and error path.
---

# User Flow Skill

Use this skill to map how a user moves through a feature or business process.

## Inputs to Inspect or Ask For

- Feature name
- Actor or role
- Trigger
- Entry screen
- Desired outcome
- Required validations
- Alternative paths
- Error cases
- Related IA or PRD

## Output Format

Use these exact `##` section headings for a full user-flow document:

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

## Quality Rules

- Include both happy path and failure path.
- Identify validation points.
- Use step numbers or arrows for readability.
- Link steps to screens and APIs when possible.
- Recommend QA checklist updates.

## Document Output Requirements

- Start generated user-flow documents with this exact frontmatter shape when creating a file:

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

- Replace `FEATURE-001` with a concise feature ID when the feature is clear.
- Use `doc_id` prefix `FLOW`, `doc_type: user-flow`, `owner: design`, and `version: 0.1.0`.
- Link related PRD, IA, API, and QA documents by ID when known.
- Do not substitute ad hoc fields such as `title`, `product`, `date`, `created`, or `updated` for the standard fields.
- Include step markers, related `PAGE-###` or `PAGE-AREA-###` screen IDs, state transitions, related APIs, and analytics events.

## Safety Rules

- Do not treat assumed user behavior, analytics events, or business policies as confirmed facts.
- Do not include private operational details unless they appear in provided context.
- Do not overwrite existing flow documents without first showing a diff or creating a separate revised draft.

## Example Invocation

```text
Use the user-flow skill to create a flow for email signup and verification.
```

## General Rules

- Separate confirmed facts from assumptions.
- Mark assumptions explicitly under `Assumptions`.
- Do not invent legal, payment, security, or compliance rules without marking them as assumptions.
- Prefer tables for requirements, edge cases, and checks.
- Include open questions when information is missing.
- Recommend related follow-up documents.
- Output Markdown only unless the user requests another format.
