---
name: erd
description: ERD data model workflow. Use for ERD, database design, table design, entities, relationships, indexes, constraints, migrations, and data dictionary drafts.
---

# ERD Skill

Use this skill to design a database model for a feature or service.

## Inputs to Inspect or Ask For

- Product requirements
- API requirements
- Main entities
- User roles
- Data lifecycle
- Retention requirements
- Query patterns
- Existing schema or migrations
- Database type

## Output Format

Use these exact `##` section headings for a full ERD:

1. `## 1. Overview`
2. `## 2. Entities`
3. `## 3. Tables`
4. `## 4. Relationships`
5. `## 5. Indexes`
6. `## 6. Constraints`
7. `## 7. Soft Delete Policy`
8. `## 8. Audit Fields`
9. `## 9. Migration Notes`
10. `## 10. Data Risks`
11. `## 11. Assumptions`
12. `## 12. Open Questions`
13. `## 13. Related Documents`

## Quality Rules

- Use clear table names and column names.
- Identify primary keys and foreign keys.
- Include indexes based on query patterns.
- Include audit fields where appropriate.
- Mark uncertain data retention or compliance rules as assumptions.
- Recommend API spec and data dictionary updates.
- Store sensitive one-time values as hashes, digests, or verifiers by default; prefer column names such as `token_hash` over `token`.
- Index sensitive lookup material by hash/verifier, not by raw secret values.

## Document Output Requirements

- Start generated ERD documents with this exact frontmatter shape when creating a file:

```yaml
---
doc_id: ERD-FEATURE-001
doc_type: erd
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
- Use `doc_id` prefix `ERD`, `doc_type: erd`, `owner: backend`, and `version: 0.1.0`.
- Link related PRD, TRD, API, data dictionary, and QA documents by ID when known.
- Do not substitute ad hoc fields such as `title`, `product`, `date`, `created`, or `updated` for the standard fields.
- Include primary keys, foreign keys, relationships, constraints, and indexes explicitly.

## Safety Rules

- Do not inspect production databases, credentials, dumps, or private data by default.
- Do not invent retention, deletion, privacy, or compliance rules as confirmed facts.
- Do not model plaintext storage for passwords, API keys, invitation tokens, reset tokens, payment secrets, or session identifiers unless the document clearly marks it as a security risk and unresolved decision.
- Do not overwrite existing ERD documents without first showing a diff or creating a separate revised draft.

## Example Invocation

```text
Use the erd skill to draft an ERD for team workspaces, members, invitations, and roles.
```

## General Rules

- Separate confirmed facts from assumptions.
- Mark assumptions explicitly under `Assumptions`.
- Do not invent legal, payment, security, or compliance rules without marking them as assumptions.
- Prefer tables for requirements, edge cases, and checks.
- Include open questions when information is missing.
- Recommend related follow-up documents.
- Output Markdown only unless the user requests another format.
