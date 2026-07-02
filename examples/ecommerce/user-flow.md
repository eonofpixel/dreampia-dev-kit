---
doc_id: FLOW-CHECKOUT-001
doc_type: user-flow
feature_id: CHECKOUT-001
status: draft
owner: design
related_docs:
  - PRD-CHECKOUT-001
  - IA-CHECKOUT-001
  - API-CHECKOUT-001
  - QA-CHECKOUT-001
related_code: []
last_reviewed: 2026-07-02
version: 0.1.0
---

# User Flow: Guest Checkout

## 1. Flow Name

Guest checkout from cart to order confirmation.

## 2. Actor

- Primary actor: Guest shopper
- Supporting systems: Checkout backend, payment provider, inventory module, email adapter
- Support actor: Store operator

## 3. Trigger

The shopper clicks checkout from a cart that contains at least one item.

## 4. Preconditions

- Cart contains at least one in-stock item.
- Checkout API can create a server-side checkout session.
- Payment provider sandbox or production integration is available.
- The shopper can provide a valid email and shipping address.

## 5. Happy Path

| Step | Actor | Action | System Response |
|---|---|---|---|
| 1 | Shopper | Opens PAGE-CHECKOUT-001 and clicks checkout. | Backend creates checkout session from cart. |
| 2 | Shopper | Reviews items on PAGE-CHECKOUT-002. | UI shows server-calculated subtotal, shipping, tax, and total. |
| 3 | Shopper | Enters contact and shipping details on PAGE-CHECKOUT-003. | Backend validates required fields. |
| 4 | Shopper | Submits payment details through provider UI on PAGE-CHECKOUT-004. | Backend authorizes payment with idempotency key. |
| 5 | Backend | Reserves inventory and creates order. | Order number and payment state are persisted. |
| 6 | Shopper | Lands on PAGE-CHECKOUT-005. | UI shows order number and confirmation summary. |

## 6. Alternative Paths

| Path | Condition | Behavior |
|---|---|---|
| A1 | Shopper edits cart during checkout. | Existing checkout session is refreshed or replaced. |
| A2 | Confirmation email fails. | Order remains confirmed and support-visible email retry is recorded. |
| A3 | Shopper refreshes submit page. | Idempotency key returns existing order or checkout state. |

## 7. Error Paths

| Error | User Message | Recovery |
|---|---|---|
| Invalid shipping details | Highlight invalid fields. | Shopper corrects fields and resubmits. |
| Inventory unavailable | Item is no longer available. | Shopper returns to cart review. |
| Payment authorization failed | Payment could not be authorized. | Shopper retries payment or chooses another card. |
| Provider unavailable | Checkout is temporarily unavailable. | Shopper keeps cart and tries later. |

## 8. State Transitions

```text
cart_ready
  -> checkout_started
  -> shipping_validated
  -> payment_authorized
  -> inventory_reserved
  -> order_confirmed

checkout_started
  -> checkout_blocked_inventory
  -> payment_failed
  -> checkout_abandoned
```

## 9. Related Screens

- PAGE-CHECKOUT-001: Cart
- PAGE-CHECKOUT-002: Checkout review
- PAGE-CHECKOUT-003: Shipping
- PAGE-CHECKOUT-004: Payment
- PAGE-CHECKOUT-005: Confirmation

## 10. Related APIs

- `POST /checkout/session`
- `GET /checkout/session/{sessionId}`
- `PATCH /checkout/session/{sessionId}/shipping`
- `POST /checkout/session/{sessionId}/submit`
- `GET /orders/{orderNumber}`

## 11. Analytics Events

| Event | Trigger |
|---|---|
| `checkout_started` | Checkout session created. |
| `shipping_submitted` | Shipping form passes client validation. |
| `payment_attempted` | Shopper starts authorization. |
| `payment_failed` | Provider returns failed authorization. |
| `order_confirmed` | Order is created. |

## 12. Assumptions

- Payment provider UI can return a provider token or authorization reference to the backend.
- The backend can distinguish retry from duplicate submit.

## 13. Open Questions

- Should shopper be able to go back from payment to shipping without reauthorizing?
- Should abandoned checkout sessions expire after a fixed time?

## 14. Related Documents

- PRD-CHECKOUT-001
- IA-CHECKOUT-001
- API-CHECKOUT-001
- QA-CHECKOUT-001
