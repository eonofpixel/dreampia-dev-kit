# Security Policy

`dreampia-dev-kit` is designed to be safe by default.

This project provides documentation workflows for AI coding agents. Because agent skills may influence file reads, writes, scripts, and future automation, security must be treated as a core feature.

## Security Principles

- Prefer instruction-only workflows before executable scripts.
- Do not read, print, copy, upload, or export secrets.
- Do not inspect `.env`, private keys, tokens, credentials, or cloud config by default.
- Do not make network calls by default.
- Do not run destructive shell commands by default.
- Do not install dependencies without explicit user approval.
- Do not overwrite user documents without confirmation or a clear diff.
- Treat `doc-audit` as read-first and report-first.

## Sensitive Files

Agents and scripts should avoid these files unless the user explicitly requests a safe review:

```text
.env
.env.*
*.pem
*.key
id_rsa
id_ed25519
.aws/
.gcp/
.azure/
.npmrc
.pypirc
```

## Reporting a Vulnerability

Please report security issues privately through GitHub Security Advisories when available.

Do not open a public issue for secrets exposure, command injection, prompt injection, or data exfiltration issues.

## Maintainer Response Goals

- Confirm receipt.
- Reproduce or assess the issue.
- Patch or document mitigation.
- Credit the reporter if desired.
