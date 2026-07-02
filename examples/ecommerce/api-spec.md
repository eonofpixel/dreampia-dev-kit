---
doc_id: API-CHECKOUT-001
doc_type: api-spec
feature_id: CHECKOUT-001
status: draft
owner: backend
related_docs:
  - PRD-CHECKOUT-001
  - TRD-CHECKOUT-001
  - ERD-CHECKOUT-001
  - QA-CHECKOUT-001
related_code: []
last_reviewed: 2026-07-02
version: 0.1.0
---

# API Spec: Guest Checkout

## 1. Overview

The checkout API creates checkout sessions, validates server-side totals, submits payment authorization, and returns order confirmation data.

## 2. Authentication

Guest checkout uses a server-issued checkout session ID. Account authentication is not required.

## 3. Common Headers

| Header | Required | Description |
|---|---|---|
| `Content-Type: application/json` | Yes | Required for mutation requests. |
| `Idempotency-Key` | Yes for submit | Prevents duplicate checkout or order creation. |

## 4. Endpoint List

| Method | Path | Purpose | Related Requirement |
|---|---|---|---|
| POST | `/checkout/session` | Create a checkout session from a cart. | REQ-001 |
| GET | `/checkout/session/{sessionId}` | Read checkout session state. | REQ-001 |
| PATCH | `/checkout/session/{sessionId}/shipping` | Save contact and shipping details. | REQ-002 |
| POST | `/checkout/session/{sessionId}/submit` | Authorize payment, reserve inventory, and create order. | REQ-003, REQ-004, REQ-005 |
| GET | `/orders/{orderNumber}` | Read confirmation-safe order summary. | REQ-005 |

## 5. Endpoint Details

### 5.1 Create Checkout Session

```http
POST /checkout/session
```

#### Request Body

```json
{
  "cartId": "cart_123",
  "idempotencyKey": "checkout-start-123"
}
```

#### Response Body

```json
{
  "sessionId": "chk_123",
  "status": "shipping_required"
}
```

### 5.2 Save Shipping Details

```http
PATCH /checkout/session/{sessionId}/shipping
```

#### Request Body

```json
{
  "email": "buyer@example.com",
  "name": "Buyer Name",
  "phone": "+15555550123",
  "address": {
    "line1": "10 Market St",
    "line2": "",
    "city": "San Francisco",
    "region": "CA",
    "postalCode": "94105",
    "country": "US"
  }
}
```

#### Response Body

```json
{
  "sessionId": "chk_123",
  "status": "payment_required"
}
```

### 5.3 Submit Checkout

```http
POST /checkout/session/{sessionId}/submit
```

#### Request Body

```json
{
  "paymentMethodReference": "provider_reference_123",
  "idempotencyKey": "checkout-submit-123"
}
```

#### Response Body

```json
{
  "orderNumber": "ORD-10001",
  "status": "confirmed",
  "paymentStatus": "authorized"
}
```

### 5.4 Read Order Confirmation

```http
GET /orders/{orderNumber}
```

#### Response Body

```json
{
  "orderNumber": "ORD-10001",
  "status": "confirmed",
  "paymentStatus": "authorized",
  "email": "buyer@example.com",
  "total": 7668,
  "currency": "USD"
}
```

#### Error Codes

| Code | HTTP Status | Meaning | Recovery |
|---|---:|---|---|
| `CHECKOUT_CART_EMPTY` | 400 | Cart has no purchasable items. | Return to cart. |
| `CHECKOUT_SHIPPING_INVALID` | 422 | Shipping payload failed validation. | Correct fields. |
| `CHECKOUT_INVENTORY_UNAVAILABLE` | 409 | One or more items are not available. | Refresh cart. |
| `CHECKOUT_PAYMENT_FAILED` | 402 | Payment authorization failed. | Retry payment. |
| `CHECKOUT_DUPLICATE_SUBMIT` | 409 | Idempotency conflict or duplicate request. | Fetch current session state. |

## 6. Pagination

Not required for checkout session endpoints.

## 7. Filtering and Sorting

Not required for checkout session endpoints.

## 8. Idempotency

- `POST /checkout/session` accepts an idempotency key to avoid duplicate sessions.
- `POST /checkout/session/{sessionId}/submit` requires an idempotency key to avoid duplicate orders.
- Repeated submit with the same successful key should return the same order confirmation.

## 9. Rate Limits

| Endpoint | Limit |
|---|---|
| `POST /checkout/session` | 30 requests per IP per hour |
| `POST /checkout/session/{sessionId}/submit` | 10 attempts per session per hour |

## 10. Examples

```bash
curl -X POST /checkout/session \
  -H "Content-Type: application/json" \
  -d '{"cartId":"cart_123","idempotencyKey":"checkout-start-123"}'
```

## 11. Assumptions

- Prices are represented in minor currency units.
- Payment provider returns a short-lived reference that is safe to pass to backend once.

## 12. Open Questions

- Should order confirmation require a signed token in addition to order number?
- Should API expose tax breakdown by jurisdiction in MVP?

## 13. Related Documents

- PRD-CHECKOUT-001
- TRD-CHECKOUT-001
- ERD-CHECKOUT-001
- QA-CHECKOUT-001
