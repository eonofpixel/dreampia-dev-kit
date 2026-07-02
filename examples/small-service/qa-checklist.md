---
doc_id: QA-AUTH-001
doc_type: qa-checklist
feature_id: AUTH-001
status: draft
owner: qa
related_docs:
  - PRD-AUTH-001
  - FLOW-AUTH-001
  - API-AUTH-001
  - ERD-AUTH-001
related_code: []
last_reviewed: 2026-07-02
version: 0.1.0
---

# QA Checklist: Magic Link Login

## 1. Scope

Validate email magic link request, token verification, session creation, and recoverable failure states.

## 2. Preconditions

- Test email delivery is available.
- Test user email can receive messages.
- Test environment has a configured app base URL.

## 3. Test Environment

| Item | Value |
|---|---|
| App version | v0.1.0 test build |
| Browser/OS | Latest Chrome on macOS |
| Test account | `qa@example.com` |

## 4. Functional Checklist

| ID | Check | Expected Result | Status |
|---|---|---|---|
| QA-001 | Submit a valid email. | Confirmation screen appears. | Not Run |
| QA-002 | Open a valid magic link. | User lands on `/notes`. | Not Run |
| QA-003 | Open the same link twice. | Second attempt shows invalid-link error. | Not Run |
| QA-004 | Open an expired link. | Expired-link error offers new-link action. | Not Run |

## 5. Permission Checklist

| Role | Check | Expected Result |
|---|---|---|
| Guest | Visit `/notes`. | Redirect to `/login`. |
| User | Visit `/notes` after verification. | Notes list is visible. |

## 6. Edge Cases

- Email address with uppercase letters.
- Email address with leading or trailing whitespace.
- Token verification after session already exists.

## 7. Error Cases

- Email provider unavailable.
- Rate limit reached.
- Invalid token format.

## 8. Regression Checklist

- Existing public routes remain accessible.
- Existing notes list route still requires authentication.

## 9. Pass/Fail Criteria

| Status | Meaning |
|---|---|
| Pass | Behavior matches expected result. |
| Fail | Behavior does not match expected result. |
| Blocked | Check cannot run because a dependency is unavailable. |
| Not Run | Check has not been executed. |

## 10. Related Requirements

- REQ-001
- REQ-002
- REQ-003
- REQ-004
- REQ-005

## 11. Assumptions

- QA can inspect sent test emails without using real user mailboxes.

## 12. Open Questions

- Should QA cover mobile email clients in v0.1?

## 13. Related Documents

- PRD-AUTH-001
- FLOW-AUTH-001
- API-AUTH-001
- ERD-AUTH-001
