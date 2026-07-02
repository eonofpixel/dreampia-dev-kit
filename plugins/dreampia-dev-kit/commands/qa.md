---
description: Create or improve a Dreampia QA checklist using the qa-checklist skill workflow.
---

# Dreampia QA Checklist Alias

Follow the Dreampia Dev Kit `qa-checklist` skill workflow.

User request:

```text
$ARGUMENTS
```

Use `templates/qa-checklist.md` as the target structure. Derive checks from PRD acceptance criteria, TRD constraints, IA routes, user flows, API contracts, and ERD rules when those documents are available.

Output Markdown with standard Dreampia frontmatter, testable checks, regression coverage, release gates, owner notes, assumptions, and open questions.

Safety rules:

- Do not mark unchecked behavior as passed.
- Do not create vague checks that a human cannot verify.
- Do not inspect secrets or private credentials.
- Do not ask testers to see, copy, assert, screenshot, log, or store raw tokens, credentials, API keys, session IDs, invitation links, reset links, or payment secrets.
- If source documents disagree on security-sensitive behavior, mark the QA item `Blocked` and cite the conflicting docs instead of choosing a policy.
