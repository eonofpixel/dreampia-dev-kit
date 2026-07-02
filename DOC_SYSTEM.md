# Documentation System

This file defines the document structure, metadata, and ID conventions for `dreampia-dev-kit`.

## Directory Structure for Generated Docs

Recommended project documentation structure:

```text
docs/
├── 00-project/
│   ├── project-brief.md
│   ├── scope.md
│   └── glossary.md
├── 01-product/
│   ├── prd/
│   ├── requirements/
│   └── policies/
├── 02-ux/
│   ├── ia/
│   ├── user-flows/
│   └── screen-specs/
├── 03-technical/
│   ├── trd/
│   ├── architecture/
│   ├── api/
│   ├── erd/
│   └── data-dictionary/
├── 04-project-management/
│   ├── wbs/
│   ├── decisions/
│   ├── risks/
│   └── issues/
├── 05-qa/
│   ├── test-plans/
│   ├── test-cases/
│   └── checklists/
└── 06-operations/
    ├── deploy-plans/
    ├── release-notes/
    ├── runbooks/
    └── incidents/
```

## Frontmatter Standard

Use this frontmatter for generated documents:

```yaml
doc_id: PRD-AUTH-001
doc_type: prd
feature_id: AUTH-001
status: draft
owner: product
related_docs:
  - IA-AUTH-001
  - API-AUTH-001
related_code:
  - src/features/auth
last_reviewed: 2026-07-02
version: 0.1.0
```

## Required Fields

| Field | Description |
|---|---|
| `doc_id` | Unique document identifier. |
| `doc_type` | Document type, such as `prd`, `trd`, `ia`, `api`, `erd`, `qa`. |
| `feature_id` | Shared feature identifier. |
| `status` | `draft`, `review`, `approved`, or `deprecated`. |
| `owner` | Primary owner: `product`, `design`, `engineering`, `frontend`, `backend`, `qa`, `devops`, `security`, `documentation`, or `release`. |
| `related_docs` | Linked document IDs. |
| `related_code` | Code paths related to the document. |
| `last_reviewed` | Date of last human or agent review. |
| `version` | Document version. |

## Document ID Prefixes

| Prefix | Document Type |
|---|---|
| `BRD` | Business Requirements Document |
| `PRD` | Product Requirements Document |
| `REQ` | Requirements Definition |
| `POL` | Policy Document |
| `IA` | Information Architecture |
| `FLOW` | User Flow |
| `SCREEN` | Screen Specification |
| `TRD` | Technical Requirements Document |
| `TSD` | Technical Specification Document |
| `ARCH` | Architecture Document |
| `API` | API Specification |
| `ERD` | Entity Relationship Diagram |
| `DATA` | Data Dictionary |
| `QA` | QA Checklist |
| `TC` | Test Case |
| `REL` | Release Note |
| `RUNBOOK` | Runbook |
| `INC` | Incident Report |

## Feature ID Convention

Use concise domain-based IDs:

```text
AUTH-001
BILLING-001
ORDER-001
INVITE-001
NOTIFICATION-001
ADMIN-001
```

## Status Workflow

```text
draft → review → approved → deprecated
```

## Document Relationship Rules

- A PRD should link to related IA, TRD, API, ERD, and QA documents when they exist.
- An IA should link to related PRDs and User Flows.
- An API spec should link to related PRDs, TRDs, ERDs, and QA documents.
- An ERD should link to related API and TRD documents.
- A QA document should link back to PRD requirements and API endpoints.

## Doc Audit Rules

The `doc-audit` workflow should check:

1. Missing required frontmatter.
2. Duplicate `doc_id` values.
3. Invalid `status` values.
4. Broken `related_docs` references.
5. PRD requirements without QA coverage.
6. IA screens without screen specs or user flows.
7. API endpoints without related requirements.
8. ERD entities not referenced by any API or TRD.
9. Documents marked `approved` but not recently reviewed.
10. Assumptions that should be converted into decisions or requirements.
