# Skill Catalog

This document defines the initial skills for `dreampia-dev-kit`.

Each skill must be usable as a standalone workflow and also as part of a documentation chain.

## Skill Design Rules

- One skill should do one documentation job well.
- Every skill must produce structured Markdown.
- Every skill must separate facts, assumptions, risks, and open questions.
- Every skill should include acceptance criteria or validation rules where relevant.
- Every skill should recommend follow-up documents.

## Core Skills

### 1. `prd`

Creates a Product Requirements Document.

Use when the user asks for:

- PRD
- product requirements
- feature requirements
- MVP scope
- user stories
- acceptance criteria
- product planning

Primary output:

- Overview
- Goals
- Non-goals
- Users
- User stories
- Functional requirements
- Policies
- Edge cases
- Acceptance criteria
- Success metrics
- Risks
- Open questions

### 2. `trd`

Creates a Technical Requirements Document.

Use when the user asks for:

- TRD
- technical requirements
- tech design input
- implementation constraints
- stack decisions
- auth/performance/security requirements

Primary output:

- System context
- Technical goals
- Architecture assumptions
- Components
- Data requirements
- API requirements
- Security requirements
- Performance requirements
- Infrastructure requirements
- Risks

### 3. `ia`

Creates an Information Architecture document.

Use when the user asks for:

- IA
- sitemap
- menu structure
- page hierarchy
- screen list
- navigation structure

Primary output:

- Navigation tree
- Page list
- Screen IDs
- Access control
- Entry points
- Exit points
- Related flows

### 4. `user-flow`

Creates a user flow or journey document.

Use when the user asks for:

- user flow
- UX flow
- journey
- process flow
- conversion flow
- state transition

Primary output:

- Actors
- Trigger
- Happy path
- Alternative paths
- Error paths
- State transitions
- Analytics events
- Related screens and APIs

### 5. `api-spec`

Creates an API specification document.

Use when the user asks for:

- API spec
- endpoint design
- request/response
- error codes
- API contract
- OpenAPI draft

Primary output:

- API overview
- Auth requirements
- Endpoints
- Request schema
- Response schema
- Error codes
- Pagination/filtering
- Idempotency
- Rate limits
- Examples

### 6. `erd`

Creates an ERD/data model document.

Use when the user asks for:

- ERD
- database design
- table design
- entity relationship
- data model
- schema draft

Primary output:

- Entities
- Tables
- Columns
- Relationships
- Constraints
- Indexes
- Soft delete policy
- Audit fields
- Migration notes

### 7. `qa-checklist`

Creates a QA checklist and test criteria.

Use when the user asks for:

- QA checklist
- test checklist
- acceptance test
- regression checklist
- UAT checklist

Primary output:

- Test scope
- Preconditions
- Functional checks
- Edge cases
- Error cases
- Permission checks
- Compatibility checks
- Regression checks
- Pass/fail criteria

### 8. `doc-audit`

Audits development documents for omissions and inconsistencies.

Use when the user asks for:

- doc audit
- documentation review
- spec review
- requirements gap
- doc drift
- consistency check

Primary output:

- Critical issues
- Major issues
- Minor issues
- Missing documents
- Mismatched IDs
- Ambiguous requirements
- Code/document drift candidates
- Recommended fixes

## Future Skills

| Skill | Description | Target Version |
|---|---|---|
| `screen-spec` | Detailed screen behavior specification. | v0.2 |
| `data-dictionary` | Column-level data dictionary. | v0.2 |
| `test-case` | Detailed test cases. | v0.2 |
| `deploy-plan` | Deployment plan. | v0.2 |
| `rollback-plan` | Rollback plan. | v0.2 |
| `runbook` | Operations runbook. | v0.2 |
| `release-note` | Release note generator. | v0.2 |
| `code-to-docs` | Generate docs from existing codebase. | v0.3 |
| `docs-to-tasks` | Convert docs into GitHub issues or WBS. | v0.3 |
| `pr-doc-review` | Review PR for documentation changes. | v0.4 |
