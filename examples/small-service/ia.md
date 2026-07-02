---
doc_id: IA-AUTH-001
doc_type: ia
feature_id: AUTH-001
status: draft
owner: design
related_docs:
  - PRD-AUTH-001
  - FLOW-AUTH-001
related_code: []
last_reviewed: 2026-07-02
version: 0.1.0
---

# Information Architecture: Magic Link Login

## 1. Overview

Define the screens and routes required for passwordless login.

## 2. Navigation Tree

```text
Public
├── Login
│   ├── Check Email
│   └── Link Error
└── Notes List
```

## 3. Page List

| Screen ID | Page Name | Path/Route | Access | Description |
|---|---|---|---|---|
| PAGE-AUTH-001 | Login | `/login` | Public | Email input for magic link request. |
| PAGE-AUTH-002 | Check Email | `/login/check-email` | Public | Confirmation after request. |
| PAGE-AUTH-003 | Link Error | `/login/error` | Public | Recoverable token error state. |
| PAGE-NOTES-001 | Notes List | `/notes` | Authenticated | Default destination after sign-in. |

## 4. Access Rules

| Role | Allowed Pages | Restricted Pages |
|---|---|---|
| Guest | Login, Check Email, Link Error | Notes List |
| User | Notes List | Login after active session redirect |

## 5. Entry Points

- Direct visit to `/login`.
- Expired session redirect to `/login`.
- Magic link from email.

## 6. Exit Points

- Successful verification redirects to `/notes`.
- Expired or invalid link redirects to `/login/error`.

## 7. Related User Flows

- FLOW-AUTH-001

## 8. Missing Screens

| Screen | Reason Needed | Source |
|---|---|---|
| Password reset | Not needed because there is no password. | Non-goal |

## 9. Assumptions

- The notes list page exists or will be created alongside authentication.

## 10. Open Questions

- Should logged-in users visiting `/login` redirect to `/notes` automatically?

## 11. Related Documents

- PRD-AUTH-001
- FLOW-AUTH-001
- QA-AUTH-001
