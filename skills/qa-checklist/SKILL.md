---
name: qa-checklist
description: QA checklist and test criteria workflow. Use for QA checklist, acceptance checks, regression checks, UAT, test criteria, edge cases, permissions testing, and release verification.
---

# QA Checklist Skill

Use this skill to create a practical QA checklist from PRD, user flows, API specs, or feature descriptions.

## Inputs to Inspect or Ask For

- Related PRD requirements
- User flows
- Screen specs
- API specs
- User roles
- Supported browsers/devices
- Known risks
- Release scope

## Output Format

Use these exact `##` section headings for a full QA checklist:

1. `## 1. Scope`
2. `## 2. Preconditions`
3. `## 3. Test Environment`
4. `## 4. Functional Checklist`
5. `## 5. Permission Checklist`
6. `## 6. Edge Cases`
7. `## 7. Error Cases`
8. `## 8. Regression Checklist`
9. `## 9. Pass/Fail Criteria`
10. `## 10. Related Requirements`
11. `## 11. Assumptions`
12. `## 12. Open Questions`
13. `## 13. Related Documents`

## Quality Rules

- Every must-have requirement should have at least one QA check.
- Include negative tests and permission tests.
- Use `Pass`, `Fail`, `Blocked`, and `Not Run` statuses.
- Keep checks executable by a human tester.
- Recommend test-case documents for complex flows.

## Document Output Requirements

- Start generated QA checklists with this exact frontmatter shape when creating a file:

```yaml
---
doc_id: QA-FEATURE-001
doc_type: qa-checklist
feature_id: FEATURE-001
status: draft
owner: qa
related_docs: []
related_code: []
last_reviewed: YYYY-MM-DD
version: 0.1.0
---
```

- Replace `FEATURE-001` with a concise feature ID when the feature is clear.
- Use `doc_id` prefix `QA`, `doc_type: qa-checklist`, `owner: qa`, and `version: 0.1.0`.
- Link related PRD, user-flow, API, ERD, and release-note documents by ID when known.
- Do not substitute ad hoc fields such as `title`, `product`, `date`, `created`, or `updated` for the standard fields.
- Use `QA-###` IDs for checks, preserve related `REQ-###` references, and use `Pass`, `Fail`, `Blocked`, and `Not Run` statuses.

## Safety Rules

- Do not request real passwords, production credentials, payment cards, or private user data for testing.
- Do not mark unverified behavior as passed.
- Do not overwrite existing QA documents without first showing a diff or creating a separate revised draft.

## Example Invocation

```text
Use the qa-checklist skill to create a QA checklist for user invitation and role assignment.
```

## General Rules

- Separate confirmed facts from assumptions.
- Mark assumptions explicitly under `Assumptions`.
- Do not invent legal, payment, security, or compliance rules without marking them as assumptions.
- Prefer tables for requirements, edge cases, and checks.
- Include open questions when information is missing.
- Recommend related follow-up documents.
- Output Markdown only unless the user requests another format.
