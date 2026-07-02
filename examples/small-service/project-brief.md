---
doc_id: BRD-NOTES-001
doc_type: project-brief
feature_id: NOTES-001
status: draft
owner: product
related_docs:
  - PRD-AUTH-001
  - TRD-AUTH-001
related_code: []
last_reviewed: 2026-07-02
version: 0.1.0
---

# Project Brief: Tiny Team Notes

## 1. Project Name

Tiny Team Notes

## 2. Background

Small teams need a lightweight place to save shared notes without setting up a full workspace suite.

## 3. Problem Statement

Early users want fast access, but password setup creates friction for a low-risk notes MVP.

## 4. Goals

- Let users sign in with an email magic link.
- Keep the authentication flow simple enough for a small service MVP.
- Produce documentation that can guide frontend, backend, and QA work.

## 5. Non-goals

- Social login.
- Enterprise SSO.
- Organization-level role management.

## 6. Target Users

| User | Need | Priority |
|---|---|---|
| Solo operator | Capture team notes quickly. | Must |
| Small team member | Reopen shared notes without remembering a password. | Must |

## 7. MVP Scope

| Feature | Description | Priority |
|---|---|---|
| Magic link login | Send a short-lived sign-in link to a user email. | Must |
| Session creation | Create an authenticated session after token verification. | Must |

## 8. Success Metrics

| Metric | Target |
|---|---|
| Sign-in completion rate | 80% or higher in MVP testing |
| Median sign-in time | Under 2 minutes |

## 9. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Email delivery failure | Users cannot sign in. | Show resend and fallback support text. |

## 10. Assumptions

- The service can send transactional email through a configured provider.
- The MVP stores notes but does not yet require workspace administration.

## 11. Open Questions

- Should login links expire after 10 minutes or 15 minutes?
- Should existing users see recent notes immediately after sign-in?
