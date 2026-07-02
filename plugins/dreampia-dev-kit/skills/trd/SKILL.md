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

1. Overview
2. Related product requirements
3. Technical goals
4. Non-goals
5. System context
6. Architecture overview
7. Components
8. API requirements
9. Data requirements
10. Security requirements
11. Performance requirements
12. Observability requirements
13. Infrastructure requirements
14. Migration requirements
15. Risks and trade-offs
16. Assumptions
17. Open questions

## Quality Rules

- Keep product behavior and implementation details separate.
- Identify technical risks and trade-offs.
- Include authentication, authorization, logging, and failure handling.
- Recommend API spec, ERD, and runbook documents when relevant.

## Document Output Requirements

- Start generated TRDs with standard frontmatter from `DOC_SYSTEM.md` when creating a file.
- Use `doc_id` prefix `TRD`, `doc_type: trd`, `owner: engineering`, and `version: 0.1.0`.
- Link related PRD, API, ERD, QA, and runbook documents by ID when known.

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
