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

1. Overview
2. Entities
3. Tables
4. Columns
5. Relationships
6. Constraints
7. Indexes
8. Soft delete policy
9. Audit fields
10. Migration notes
11. Data risks
12. Assumptions
13. Open questions

## Quality Rules

- Use clear table names and column names.
- Identify primary keys and foreign keys.
- Include indexes based on query patterns.
- Include audit fields where appropriate.
- Mark uncertain data retention or compliance rules as assumptions.
- Recommend API spec and data dictionary updates.

## Document Output Requirements

- Start generated ERD documents with standard frontmatter from `DOC_SYSTEM.md` when creating a file.
- Use `doc_id` prefix `ERD`, `doc_type: erd`, `owner: backend`, and `version: 0.1.0`.
- Link related PRD, TRD, API, data dictionary, and QA documents by ID when known.

## Safety Rules

- Do not inspect production databases, credentials, dumps, or private data by default.
- Do not invent retention, deletion, privacy, or compliance rules as confirmed facts.
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
