---
description: Audit Dreampia docs for drift, missing links, and unclear requirements.
---

# Dreampia Doc Audit Alias

Follow the Dreampia Dev Kit `doc-audit` skill workflow.

User request:

```text
$ARGUMENTS
```

Read first and report first. Inspect the requested docs, then compare PRD, TRD, IA, user-flow, API Spec, ERD, and QA coverage for mismatches.

Output a Markdown audit report using `templates/doc-audit-report.md` when a report file is requested. Otherwise, summarize findings by severity with file references and next actions.

Safety rules:

- Do not modify documents during the audit unless the user explicitly asks for edits.
- Do not inspect secrets, `.env`, keys, tokens, or credential files.
- Mark uncertain findings as assumptions or open questions.
