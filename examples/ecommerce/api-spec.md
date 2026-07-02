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

## 1. API Overview

The checkout API creates checkout sessions, validates server-side totals, submits payment authorization, and returns order confirmation data.

## 2. Auth Requirements

Guest checkout uses a server-issued checkout session ID. Account authentication is not required.

## 3. Endpoints

| Method | Path | Purpose |
|---|---|---|
| POST | `/checkout/session` | Create a checkout session from a cart. |
| GET | `/checkout/session/{sessionId}` | Read checkout session state. |
| PATCH | `/checkout/session/{sessionId}/shipping` | Save contact and shipping details. |
| POST | `/checkout/session/{sessionId}/submit` | Authorize payment, reserve inventory, and create order. |
| GET | `/orders/{orderNumber}` | Read confirmation-safe order summary. |

## 4. Request Schema

### POST `/checkout/session`

```json
{
  "cartId": "cart_123",
  "idempotencyKey": "checkout-start-123"
}
```

### PATCH `/checkout/session/{sessionId}/shipping`

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

### POST `/checkout/session/{sessionId}/submit`

```json
{
  "paymentToken": "provider_token_123",
  "idempotencyKey": "checkout-submit-123"
}
```

## 5. Response Schema

### Checkout Session

```json
{
  "sessionId": "chk_123",
  "status": "shipping_required",
  "items": [
    {
      "sku": "SKU-001",
      "name": "Linen Throw",
      "quantity": 1,
      "unitPrice": 6400
    }
  ],
  "totals": {
    "subtotal": 6400,
    "shipping": 700,
    "tax": 568,
    "total": 7668,
    "currency": "USD"
  }
}
```

### Order Confirmation

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

## 6. Error Codes

| Code | HTTP Status | Meaning | Recovery |
|---|---:|---|---|
| `CHECKOUT_CART_EMPTY` | 400 | Cart has no purchasable items. | Return to cart. |
| `CHECKOUT_SHIPPING_INVALID` | 422 | Shipping payload failed validation. | Correct fields. |
| `CHECKOUT_INVENTORY_UNAVAILABLE` | 409 | One or more items are not available. | Refresh cart. |
| `CHECKOUT_PAYMENT_FAILED` | 402 | Payment authorization failed. | Retry payment. |
| `CHECKOUT_DUPLICATE_SUBMIT` | 409 | Idempotency conflict or duplicate request. | Fetch current session state. |

## 7. Pagination and Filtering

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
- Payment provider token is short-lived and safe to pass to backend once.

## 12. Open Questions

- Should order confirmation require a signed token in addition to order number?
- Should API expose tax breakdown by jurisdiction in MVP?
