---
name: trd
description: TRD technical requirements workflow for Technical Requirements Documents. Use for TRD, architecture constraints, implementation requirements, security, performance, infrastructure, and integration planning.
---

# TRD Skill

Use this skill to create a Technical Requirements Document from product requirements, existing code, or a high-level feature idea.

## Inputs to Inspect or Ask For

- Related PRD or requirements
- Target architecture
- Frontend stack
- Backend stack
- Database
- Authentication and authorization model
- External integrations
- Performance expectations
- Security requirements
- Deployment environment
- Observability requirements

## Output Format

Use these exact `##` section headings for a full TRD:

1. `## 1. Overview`
2. `## 2. Related Product Requirements`
3. `## 3. Technical Goals`
4. `## 4. Non-goals`
5. `## 5. System Context`
6. `## 6. Architecture Overview`
7. `## 7. Components`
8. `## 8. API Requirements`
9. `## 9. Data Requirements`
10. `## 10. Security Requirements`
11. `## 11. Performance Requirements`
12. `## 12. Observability Requirements`
13. `## 13. Infrastructure Requirements`
14. `## 14. Migration Requirements`
15. `## 15. Risks and Trade-offs`
16. `## 16. Assumptions`
17. `## 17. Open Questions`
18. `## 18. Related Documents`

## Quality Rules

- Keep product behavior and implementation details separate.
- Identify technical risks and trade-offs.
- Include authentication, authorization, logging, and failure handling.
- Recommend API spec, ERD, and runbook documents when relevant.

## Document Output Requirements

- Start generated TRDs with this exact frontmatter shape when creating a file:

```yaml
---
doc_id: TRD-FEATURE-001
doc_type: trd
feature_id: FEATURE-001
status: draft
owner: engineering
related_docs: []
related_code: []
last_reviewed: YYYY-MM-DD
version: 0.1.0
---
```

- Replace `FEATURE-001` with a concise feature ID when the feature is clear.
- Use `doc_id` prefix `TRD`, `doc_type: trd`, `owner: engineering`, and `version: 0.1.0`.
- Link related PRD, API, ERD, QA, and runbook documents by ID when known.
- Do not substitute ad hoc fields such as `title`, `product`, `date`, `created`, or `updated` for the standard fields.
- Preserve related `REQ-###` references from PRDs when available.

## Safety Rules

- Do not inspect secrets, environment files, tokens, or cloud credentials by default.
- Do not require new dependencies, services, or network access unless the user explicitly approves.
- Do not overwrite existing technical documents without first showing a diff or creating a separate revised draft.

## Example Invocation

```text
Use the trd skill to create a TRD for subscription billing using Next.js, Supabase, and Stripe.
```

## General Rules

- Separate confirmed facts from assumptions.
- Mark assumptions explicitly under `Assumptions`.
- Do not invent legal, payment, security, or compliance rules without marking them as assumptions.
- Prefer tables for requirements, edge cases, and checks.
- Include open questions when information is missing.
- Recommend related follow-up documents.
- Output Markdown only unless the user requests another format.
