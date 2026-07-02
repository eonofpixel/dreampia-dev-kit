---
doc_id: ERD-AUTH-001
doc_type: erd
feature_id: AUTH-001
status: draft
owner: backend
related_docs:
  - PRD-AUTH-001
  - TRD-AUTH-001
  - API-AUTH-001
  - QA-AUTH-001
related_code: []
last_reviewed: 2026-07-02
version: 0.1.0
---

# ERD / Data Model: Magic Link Login

## 1. Overview

Support users, one-time login tokens, and sessions for a small notes service.

## 2. Entities

| Entity | Description |
|---|---|
| User | Person identified by email. |
| Login Token | One-time token used to create a session. |
| Session | Authenticated browser session. |

## 3. Tables

### users

| Column | Type | Required | Default | Description |
|---|---|---|---|---|
| id | uuid | Yes | generated | Primary key. |
| email | text | Yes | none | Original email. |
| normalized_email | text | Yes | none | Lowercased email for uniqueness. |
| created_at | timestamp | Yes | now() | Creation time. |
| updated_at | timestamp | Yes | now() | Last update time. |

### login_tokens

| Column | Type | Required | Default | Description |
|---|---|---|---|---|
| id | uuid | Yes | generated | Primary key. |
| user_id | uuid | Yes | none | Related user. |
| token_hash | text | Yes | none | Hash of raw login token. |
| expires_at | timestamp | Yes | none | Expiration time. |
| consumed_at | timestamp | No | null | Set after successful verification. |
| created_at | timestamp | Yes | now() | Creation time. |

### sessions

| Column | Type | Required | Default | Description |
|---|---|---|---|---|
| id | uuid | Yes | generated | Primary key. |
| user_id | uuid | Yes | none | Related user. |
| expires_at | timestamp | Yes | none | Session expiration time. |
| created_at | timestamp | Yes | now() | Creation time. |
| revoked_at | timestamp | No | null | Optional manual revocation time. |

## 4. Relationships

| From | Relationship | To | Notes |
|---|---|---|---|
| users | 1:N | login_tokens | User can request multiple tokens over time. |
| users | 1:N | sessions | User can have multiple active sessions. |

## 5. Indexes

| Table | Index | Columns | Purpose |
|---|---|---|---|
| users | `users_normalized_email_key` | `normalized_email` | Prevent duplicate accounts. |
| login_tokens | `login_tokens_token_hash_idx` | `token_hash` | Verify token quickly. |
| sessions | `sessions_user_id_idx` | `user_id` | List user sessions later. |

## 6. Constraints

- `users.normalized_email` must be unique.
- `login_tokens.expires_at` must be after `created_at`.
- `sessions.expires_at` must be after `created_at`.

## 7. Soft Delete Policy

No soft delete in the MVP. Account deletion policy is deferred.

## 8. Audit Fields

Use `created_at` and `updated_at` on long-lived records. Use `consumed_at` and `revoked_at` for lifecycle events.

## 9. Migration Notes

- Create auth tables before API endpoints are released.
- Backfill is not required for the initial MVP.

## 10. Data Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Raw token storage | Account takeover risk if leaked. | Store token hash only. |
| Email normalization mismatch | Duplicate users. | Use one normalization function at write boundary. |

## 11. Assumptions

- Email addresses are case-insensitive for sign-in.

## 12. Open Questions

- What is the session lifetime?

## 13. Related Documents

- PRD-AUTH-001
- TRD-AUTH-001
- API-AUTH-001
- QA-AUTH-001
