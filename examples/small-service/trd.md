---
doc_id: TRD-AUTH-001
doc_type: trd
feature_id: AUTH-001
status: draft
owner: engineering
related_docs:
  - PRD-AUTH-001
  - API-AUTH-001
  - ERD-AUTH-001
  - QA-AUTH-001
related_code: []
last_reviewed: 2026-07-02
version: 0.1.0
---

# Technical Requirements Document: Magic Link Login

## 1. Overview

Implement passwordless authentication using one-time email tokens and server-managed sessions.

## 2. Related Product Requirements

| Requirement | Technical Response |
|---|---|
| REQ-002 | Create login token and enqueue email send. |
| REQ-003 | Verify token and create session. |
| REQ-004 | Return recoverable errors for invalid tokens. |

## 3. Technical Goals

- Keep token verification server-side.
- Avoid account enumeration.
- Keep the implementation portable across email providers.

## 4. Non-goals

- OAuth provider integration.
- Device trust management.
- Admin session management.

## 5. System Context

```text
Browser -> Auth API -> Auth Service -> Database
                         |
                         v
                    Email Provider
```

## 6. Architecture Overview

The auth API creates and verifies login tokens. The database stores users, login tokens, and sessions.

## 7. Components

| Component | Responsibility | Owner |
|---|---|---|
| Auth API | Expose request and verify endpoints. | Backend |
| Auth Service | Generate, hash, verify, and consume tokens. | Backend |
| Email Adapter | Send magic link emails. | Backend |
| Login UI | Collect email and display verification states. | Frontend |

## 8. API Requirements

| API | Purpose | Related Requirement |
|---|---|---|
| `POST /api/auth/magic-link` | Request login email. | REQ-002 |
| `POST /api/auth/verify` | Verify token and create session. | REQ-003 |

## 9. Data Requirements

| Data | Storage | Notes |
|---|---|---|
| User | `users` table | Identified by email. |
| Token | `login_tokens` table | Store token hash, not raw token. |
| Session | `sessions` table | Created after successful verification. |

## 10. Security Requirements

- Store only hashed login tokens.
- Consume tokens on first successful verification.
- Use neutral response copy for login requests.
- Rate-limit repeated login requests by normalized email.

## 11. Performance Requirements

- Login request API should respond in under 500 ms excluding email provider latency.
- Token verification should complete in under 300 ms for normal database load.

## 12. Observability Requirements

- Log token request and verification outcomes without logging raw tokens.
- Track email provider send failures.
- Emit metrics for request, verify, expired, and invalid-token outcomes.

## 13. Infrastructure Requirements

- Transactional email provider credentials configured outside the repository.
- HTTPS base URL for generated links.

## 14. Migration Requirements

- Create `users`, `login_tokens`, and `sessions` tables.
- Add unique index on normalized user email.

## 15. Risks and Trade-offs

| Risk | Trade-off | Mitigation |
|---|---|---|
| Email provider downtime | MVP depends on email delivery. | Surface temporary error and retry later. |
| Token table growth | Simple token history can grow quickly. | Add scheduled cleanup of expired tokens. |

## 16. Assumptions

- The MVP uses server-side session cookies.
- Token cleanup can run as a scheduled maintenance task later.

## 17. Open Questions

- Should token verification auto-create users?
- Which email provider is selected for production?

## 18. Related Documents

- PRD-AUTH-001
- API-AUTH-001
- ERD-AUTH-001
- QA-AUTH-001
