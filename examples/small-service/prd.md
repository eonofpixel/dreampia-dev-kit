---
doc_id: PRD-AUTH-001
doc_type: prd
feature_id: AUTH-001
status: draft
owner: product
related_docs:
  - BRD-NOTES-001
  - IA-AUTH-001
  - FLOW-AUTH-001
  - TRD-AUTH-001
  - API-AUTH-001
  - ERD-AUTH-001
  - QA-AUTH-001
related_code: []
last_reviewed: 2026-07-02
version: 0.1.0
---

# Product Requirements Document: Magic Link Login

## 1. Overview

Provide passwordless sign-in for Tiny Team Notes using an email magic link.

## 2. Background

The MVP needs low-friction authentication before notes can be associated with a user.

## 3. Goals

- Allow users to request a sign-in link by email.
- Verify a one-time token from the link.
- Start a session after successful verification.

## 4. Non-goals

- Password login.
- Multi-factor authentication.
- Organization SSO.

## 5. Target Users

| User | Goal | Pain Point |
|---|---|---|
| Returning user | Open team notes quickly. | Does not want to manage another password. |
| First-time user | Enter the product with only an email address. | May abandon setup if asked for too much information. |

## 6. MVP Scope

| Item | Description | Priority |
|---|---|---|
| Email entry | User submits an email address. | Must |
| Magic link send | System sends a one-time login link. | Must |
| Token verification | System verifies the token and creates a session. | Must |
| Resend link | User can request another link after a short cooldown. | Should |

## 7. Later Scope

| Item | Reason Deferred |
|---|---|
| Social login | Not required for MVP validation. |
| Workspace roles | Belongs to a later collaboration feature. |

## 8. User Stories

| ID | User Story | Priority |
|---|---|---|
| US-001 | As a user, I want to request a sign-in link so that I can access my notes without a password. | Must |
| US-002 | As a user, I want expired links to fail clearly so that I know to request a new link. | Must |
| US-003 | As a user, I want to resend a login email so that delivery delays do not block me. | Should |

## 9. Functional Requirements

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| REQ-001 | The login form accepts a valid email address. | Must | Invalid emails show an inline error and do not send a request. |
| REQ-002 | The system sends a one-time login link to the submitted email. | Must | A confirmation screen appears after a successful send request. |
| REQ-003 | A valid unexpired token creates an authenticated session. | Must | The user lands on the notes list after verification. |
| REQ-004 | An expired or invalid token shows a recoverable error. | Must | The user can return to email entry and request a new link. |
| REQ-005 | Resend requests are rate-limited by email. | Should | Repeated requests inside the cooldown window show a wait message. |

## 10. Policies and Rules

| Policy | Rule | Notes |
|---|---|---|
| Token lifetime | Login tokens expire after 15 minutes. | Assumption until product confirms. |
| Token reuse | Tokens can be used once. | Required for session safety. |
| Email enumeration | The UI uses neutral success copy after send requests. | Avoid revealing account existence. |

## 11. Edge Cases

| Case | Expected Behavior |
|---|---|
| User clicks expired link | Show expired-link error with request-new-link action. |
| User opens link twice | Second verification fails and asks for a new link. |
| Email provider is unavailable | Show a temporary error and do not claim the email was sent. |

## 12. Acceptance Criteria

| ID | Given | When | Then | Related Requirement |
|---|---|---|---|---|
| AC-001 | A user enters a valid email | They submit the login form | A magic link request is created | REQ-002 |
| AC-002 | A user opens a valid link | The token has not expired | A session is created | REQ-003 |
| AC-003 | A user opens an expired link | The token is older than the lifetime | The UI offers a new-link action | REQ-004 |

## 13. Analytics and Success Metrics

| Metric | Event/Source | Target |
|---|---|---|
| Login request rate | `auth_link_requested` | Baseline |
| Login completion rate | `auth_link_verified` / `auth_link_requested` | 80% or higher |

## 14. Dependencies

- Transactional email provider.
- Session storage.
- Notes list route.

## 15. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Email delay | User cannot complete sign-in quickly. | Provide resend and clear copy. |
| Token leakage | Unauthorized access risk. | One-time token and short expiry. |

## 16. Assumptions

- Email is the only user identifier in v0.1.
- Login links expire after 15 minutes.

## 17. Open Questions

- Should new users be auto-created when they verify a link?
- Should the app support multiple active sessions per email?

## 18. Related Documents

- IA-AUTH-001
- FLOW-AUTH-001
- TRD-AUTH-001
- API-AUTH-001
- ERD-AUTH-001
- QA-AUTH-001
