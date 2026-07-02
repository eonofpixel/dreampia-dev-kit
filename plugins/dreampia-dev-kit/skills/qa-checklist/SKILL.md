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

1. Scope
2. Preconditions
3. Test environment
4. Functional checklist
5. Permission checklist
6. Edge cases
7. Error cases
8. Regression checklist
9. Pass/fail criteria
10. Related requirements
11. Assumptions
12. Open questions

## Quality Rules

- Every must-have requirement should have at least one QA check.
- Include negative tests and permission tests.
- Use `Pass`, `Fail`, `Blocked`, and `Not Run` statuses.
- Keep checks executable by a human tester.
- Recommend test-case documents for complex flows.

## Document Output Requirements

- Start generated QA checklists with standard frontmatter from `DOC_SYSTEM.md` when creating a file.
- Use `doc_id` prefix `QA`, `doc_type: qa-checklist`, `owner: qa`, and `version: 0.1.0`.
- Link related PRD, user-flow, API, ERD, and release-note documents by ID when known.

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
