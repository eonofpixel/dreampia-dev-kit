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

Use these exact `##` section headings for a full API spec:

1. `## 1. Overview`
2. `## 2. Authentication`
3. `## 3. Common Headers`
4. `## 4. Endpoint List`
5. `## 5. Endpoint Details`
6. `## 6. Pagination`
7. `## 7. Filtering and Sorting`
8. `## 8. Idempotency`
9. `## 9. Rate Limits`
10. `## 10. Examples`
11. `## 11. Assumptions`
12. `## 12. Open Questions`
13. `## 13. Related Documents`

## Quality Rules

- Use explicit HTTP methods and paths.
- Include request and response examples.
- Include error responses, not only success responses.
- Identify auth and permission requirements.
- Keep API contracts stable and testable.
- Recommend ERD and QA updates.
- Client-visible create/list/detail responses must return stable IDs and status fields, not raw one-time tokens, passwords, API keys, session IDs, invitation links, reset links, or payment secrets.
- Include auth scopes and rate limits only when supplied by the source docs; otherwise put candidate values under `## 11. Assumptions` or `## 12. Open Questions`.
- Keep examples redacted with placeholders such as `<redacted-token>` when a sensitive request field is unavoidable.

## Document Output Requirements

- Start generated API specs with this exact frontmatter shape when creating a file:

```yaml
---
doc_id: API-FEATURE-001
doc_type: api-spec
feature_id: FEATURE-001
status: draft
owner: backend
related_docs: []
related_code: []
last_reviewed: YYYY-MM-DD
version: 0.1.0
---
```

- Replace `FEATURE-001` with a concise feature ID when the feature is clear.
- Use `doc_id` prefix `API`, `doc_type: api-spec`, `owner: backend`, and `version: 0.1.0`.
- Link related PRD, TRD, ERD, user-flow, and QA documents by ID when known.
- Do not substitute ad hoc fields such as `title`, `product`, `date`, `created`, or `updated` for the standard fields.
- Include explicit HTTP methods and paths, status codes, and related `REQ-###` references.

## Safety Rules

- Do not expose tokens, private headers, credentials, or live secret values in examples.
- Do not invent auth, payment, rate-limit, or compliance behavior as confirmed facts.
- Do not include raw token material in success responses or QA-oriented examples. A one-time secret may appear only as a redacted request input for the endpoint that consumes it.
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
