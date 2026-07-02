---
doc_id: FLOW-AUTH-001
doc_type: user-flow
feature_id: AUTH-001
status: draft
owner: design
related_docs:
  - PRD-AUTH-001
  - IA-AUTH-001
  - API-AUTH-001
  - QA-AUTH-001
related_code: []
last_reviewed: 2026-07-02
version: 0.1.0
---

# User Flow: Magic Link Login

## 1. Flow Name

Magic Link Login

## 2. Actor

Guest or returning user.

## 3. Trigger

The user needs to access `/notes` without an active session.

## 4. Preconditions

- The service is reachable.
- Transactional email is configured.

## 5. Happy Path

```text
1. User opens /login
2. User enters email
3. System sends magic link
4. User opens email link
5. System verifies token
6. System creates session
7. User lands on /notes
```

## 6. Alternative Paths

| Case | Flow |
|---|---|
| Email delayed | User waits or requests resend after cooldown. |
| User already has session | User redirects from `/login` to `/notes`. |

## 7. Error Paths

| Error | Expected Behavior |
|---|---|
| Invalid email | Inline form error. |
| Expired token | Link error page with request-new-link action. |
| Email send failure | Temporary error copy and retry action. |

## 8. State Transitions

| From | Event | To |
|---|---|---|
| Guest | Login link requested | Link sent |
| Link sent | Token verified | Authenticated |
| Link sent | Token expired | Link error |

## 9. Related Screens

- PAGE-AUTH-001
- PAGE-AUTH-002
- PAGE-AUTH-003
- PAGE-NOTES-001

## 10. Related APIs

- `POST /api/auth/magic-link`
- `POST /api/auth/verify`

## 11. Analytics Events

| Event | Trigger | Properties |
|---|---|---|
| `auth_link_requested` | Login form submit succeeds | `email_domain`, `request_id` |
| `auth_link_verified` | Token verifies | `user_id` |
| `auth_link_failed` | Token verification fails | `reason` |

## 12. Assumptions

- Analytics event properties do not include raw email addresses.

## 13. Open Questions

- Should resend events be tracked separately?

## 14. Related Documents

- PRD-AUTH-001
- IA-AUTH-001
- API-AUTH-001
- QA-AUTH-001
