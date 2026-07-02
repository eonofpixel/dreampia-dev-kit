---
name: api-spec
description: API Spec contract workflow. Use for API spec, endpoint design, REST API, request/response schema, error codes, auth, pagination, filtering, idempotency, and API contracts.
---

# API Spec Skill

Use this skill to design API contracts for frontend/backend collaboration.

## Inputs to Inspect or Ask For

- Related PRD or TRD
- Feature name
- Client type
- Auth requirements
- Data entities
- Expected operations
- Error cases
- Pagination/filtering needs
- Existing API conventions

## Output Format

1. Overview
2. Authentication
3. Common headers
4. Endpoint list
5. Endpoint details
6. Request body schema
7. Response body schema
8. Error codes
9. Pagination/filtering/sorting
10. Idempotency
11. Rate limits
12. Examples
13. Related requirements
14. Assumptions
15. Open questions

## Quality Rules

- Use explicit HTTP methods and paths.
- Include request and response examples.
- Include error responses, not only success responses.
- Identify auth and permission requirements.
- Keep API contracts stable and testable.
- Recommend ERD and QA updates.

## Document Output Requirements

- Start generated API specs with standard frontmatter from `DOC_SYSTEM.md` when creating a file.
- Use `doc_id` prefix `API`, `doc_type: api-spec`, `owner: backend`, and `version: 0.1.0`.
- Link related PRD, TRD, ERD, user-flow, and QA documents by ID when known.

## Safety Rules

- Do not expose tokens, private headers, credentials, or live secret values in examples.
- Do not invent auth, payment, rate-limit, or compliance behavior as confirmed facts.
- Do not overwrite existing API specs without first showing a diff or creating a separate revised draft.

## Example Invocation

```text
Use the api-spec skill to design APIs for creating, listing, and cancelling orders.
```

## General Rules

- Separate confirmed facts from assumptions.
- Mark assumptions explicitly under `Assumptions`.
- Do not invent legal, payment, security, or compliance rules without marking them as assumptions.
- Prefer tables for requirements, edge cases, and checks.
- Include open questions when information is missing.
- Recommend related follow-up documents.
- Output Markdown only unless the user requests another format.
