---
description: Create or improve a Dreampia API Spec using the api-spec skill workflow.
---

# Dreampia API Spec Alias

Follow the Dreampia Dev Kit `api-spec` skill workflow.

User request:

```text
$ARGUMENTS
```

Use `templates/api-spec.md` as the target structure. Inspect related PRD, TRD, ERD, IA, and QA documents when the user provides paths or when obvious files exist in the current workspace.

Output Markdown with standard Dreampia frontmatter, explicit assumptions, open questions, endpoint contracts, schema notes, auth rules, error handling, and QA links.

Safety rules:

- Do not invent production endpoints as confirmed facts.
- Do not print secrets or credential values.
- Do not include raw tokens, credentials, API keys, session IDs, invitation links, reset links, or payment secrets in success responses or examples.
- Return stable IDs and status fields instead of one-time secrets; use `<redacted-token>` only when a sensitive request input is unavoidable.
- Put unsourced auth scopes or rate limits under assumptions/open questions.
- Do not overwrite existing documents without showing the intended change first.
