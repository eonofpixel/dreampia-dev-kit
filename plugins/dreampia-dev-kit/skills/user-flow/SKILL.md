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

1. Flow name
2. Actor
3. Trigger
4. Preconditions
5. Happy path
6. Alternative paths
7. Error paths
8. State transitions
9. Related screens
10. Related APIs
11. Analytics events
12. Assumptions
13. Open questions

## Quality Rules

- Include both happy path and failure path.
- Identify validation points.
- Use step numbers or arrows for readability.
- Link steps to screens and APIs when possible.
- Recommend QA checklist updates.

## Document Output Requirements

- Start generated user-flow documents with standard frontmatter from `DOC_SYSTEM.md` when creating a file.
- Use `doc_id` prefix `FLOW`, `doc_type: user-flow`, `owner: design`, and `version: 0.1.0`.
- Link related PRD, IA, API, and QA documents by ID when known.

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
