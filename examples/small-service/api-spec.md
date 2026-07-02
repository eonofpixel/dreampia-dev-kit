---
doc_id: API-AUTH-001
doc_type: api-spec
feature_id: AUTH-001
status: draft
owner: backend
related_docs:
  - PRD-AUTH-001
  - TRD-AUTH-001
  - ERD-AUTH-001
  - QA-AUTH-001
related_code: []
last_reviewed: 2026-07-02
version: 0.1.0
---

# API Specification: Magic Link Login

## 1. Overview

Define API contracts for requesting and verifying passwordless login links.

## 2. Authentication

The request endpoint is public. The verify endpoint is public but creates an authenticated session on success.

## 3. Common Headers

| Header | Required | Description |
|---|---|---|
| `Content-Type: application/json` | Yes | JSON request payload. |

## 4. Endpoint List

| Method | Path | Purpose | Auth | Related Requirement |
|---|---|---|---|---|
| POST | `/api/auth/magic-link` | Request a login email. | Public | REQ-002 |
| POST | `/api/auth/verify` | Verify login token. | Public | REQ-003 |

## 5. Endpoint Details

### 5.1 Request Magic Link

```http
POST /api/auth/magic-link
```

#### Purpose

Create a login token and send a magic link email.

#### Request Body

```json
{
  "email": "user@example.com"
}
```

#### Response Body

```json
{
  "status": "accepted",
  "message": "If the email can receive a login link, one will be sent."
}
```

#### Error Codes

| Status | Code | Message | Notes |
|---|---|---|---|
| 400 | `INVALID_EMAIL` | Email is invalid. | Validation error. |
| 429 | `RATE_LIMITED` | Please wait before requesting another link. | Cooldown active. |
| 503 | `EMAIL_UNAVAILABLE` | Email delivery is temporarily unavailable. | Provider failure. |

#### Related Requirements

- REQ-001
- REQ-002
- REQ-005

### 5.2 Verify Token

```http
POST /api/auth/verify
```

#### Purpose

Verify a one-time token and create a user session.

#### Request Body

```json
{
  "token": "opaque-token-from-email-link"
}
```

#### Response Body

```json
{
  "status": "verified",
  "redirectTo": "/notes"
}
```

#### Error Codes

| Status | Code | Message | Notes |
|---|---|---|---|
| 400 | `INVALID_TOKEN` | Link is invalid. | Includes consumed tokens. |
| 410 | `EXPIRED_TOKEN` | Link has expired. | User can request a new link. |

#### Related Requirements

- REQ-003
- REQ-004

## 6. Pagination

Not applicable.

## 7. Filtering and Sorting

Not applicable.

## 8. Idempotency

Token verification is not idempotent. A token is consumed on first successful verification.

## 9. Rate Limits

| Scope | Limit |
|---|---|
| Email address | 1 request per 60 seconds |
| IP address | 10 requests per 10 minutes |

## 10. Examples

### Request

```http
POST /api/auth/magic-link
Content-Type: application/json
```

### Response

```http
HTTP/1.1 202 Accepted
```

## 11. Assumptions

- Session cookies are set by the verify endpoint.
- Raw tokens are never logged.

## 12. Open Questions

- Should the request endpoint always return `202` for valid email format, even for unknown users?

## 13. Related Documents

- PRD-AUTH-001
- TRD-AUTH-001
- ERD-AUTH-001
- QA-AUTH-001
