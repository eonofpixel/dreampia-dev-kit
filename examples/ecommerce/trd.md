---
doc_id: TRD-CHECKOUT-001
doc_type: trd
feature_id: CHECKOUT-001
status: draft
owner: engineering
related_docs:
  - PRD-CHECKOUT-001
  - API-CHECKOUT-001
  - ERD-CHECKOUT-001
  - QA-CHECKOUT-001
related_code: []
last_reviewed: 2026-07-02
version: 0.1.0
---

# Technical Requirements Document: Guest Checkout

## 1. Overview

Guest checkout coordinates cart, pricing, inventory, payment authorization, order creation, and confirmation email.

## 2. Related Product Requirements

| Requirement | Technical Response |
|---|---|
| REQ-001 | Server-calculated checkout totals are loaded from the checkout API. |
| REQ-002 | Shipping and contact validation run before payment authorization. |
| REQ-003 | Inventory is checked before payment and reserved before order confirmation. |
| REQ-004 | Payment authorization is idempotent and recoverable. |
| REQ-005 | Order creation is transactional with reservation conversion. |
| REQ-006 | Confirmation email is queued after order persistence. |

## 3. Technical Goals

- Keep pricing and inventory decisions server-authoritative.
- Make checkout submission idempotent.
- Store enough state to recover and audit failed checkout attempts.

## 4. Non-goals

- Account creation and customer profile management.
- Multi-shipping-address checkout.
- Payment capture, refund, and dispute management.
- International tax calculation beyond the configured MVP market.

## 5. System Context

- The frontend calls a backend API rather than talking directly to payment or inventory storage.
- Payment card collection is handled by a provider-hosted or provider-tokenized component.
- Order creation and inventory reservation happen in a database transaction where possible.

## 6. Architecture Overview

```text
Cart UI -> Checkout API -> Inventory module -> Payment adapter -> Order module -> Email adapter
                           |
                           `-> ERD-CHECKOUT-001 data model
```

## 7. Components

| Component | Responsibility |
|---|---|
| Checkout UI | Render cart review, shipping form, payment step, and confirmation. |
| Checkout API | Validate cart, calculate totals, create checkout session, submit order. |
| Inventory module | Check stock and create item reservations. |
| Payment adapter | Create payment intent or authorization with idempotency key. |
| Order module | Persist order, order items, and payment state. |
| Email adapter | Send confirmation email after order creation. |

## 8. API Requirements

- API-CHECKOUT-001 defines checkout session, shipping update, submit, and confirmation-safe order endpoints.
- `GET /checkout/session/{id}` returns server-calculated checkout state for REQ-001.
- `POST /checkout/session` creates or refreshes a checkout session from a cart for REQ-001.
- `PATCH /checkout/session/{id}/shipping` validates contact and shipping details for REQ-002.
- `POST /checkout/session/{id}/submit` validates shipping, inventory, and payment authorization for REQ-003 through REQ-005.
- `GET /orders/{orderNumber}` returns a confirmation-safe order summary for REQ-005.

## 9. Data Requirements

| Data | Requirement |
|---|---|
| Checkout session | Stores cart snapshot, contact details, shipping address, totals, and status. |
| Inventory reservation | Stores product variant, quantity, expiry, and order link when confirmed. |
| Order | Stores order number, customer email, totals, status, and payment status. |
| Payment authorization | Stores provider reference, status, amount, and idempotency key. |

Related data model: ERD-CHECKOUT-001.

## 10. Security Requirements

- Do not trust client-provided prices, totals, or stock availability.
- Do not store raw card data.
- Use idempotency keys for checkout submission.
- Return neutral errors for payment provider internals.
- Avoid logging payment tokens, provider secrets, or full addresses in plain logs.

## 11. Performance Requirements

| Requirement | Target |
|---|---|
| Load checkout session | p95 under 500 ms excluding payment provider UI |
| Submit checkout | p95 under 2.5 seconds for successful authorization |
| Email send | Async or non-blocking after order creation |

## 12. Observability Requirements

| Signal | Purpose |
|---|---|
| `checkout_started` | Track session creation and funnel entry. |
| `checkout_submit_failed` | Track payment, inventory, and validation failures. |
| `order_confirmed` | Track successful conversion from checkout to order. |
| Payment reconciliation logs | Support provider mismatch investigation without logging secrets. |

## 13. Infrastructure Requirements

- Transactional database for order and reservation state.
- Payment provider sandbox and production credentials managed outside source control.
- Email provider with retry or dead-letter visibility.

## 14. Migration Requirements

- Add checkout, reservation, payment authorization, order, and order item tables from ERD-CHECKOUT-001.
- Add reservation cleanup before launch.
- No backfill is required because guest checkout is a new feature.

## 15. Risks and Trade-offs

| Risk | Impact | Mitigation |
|---|---|
| Inventory unavailable | Shopper may reach payment with stale cart data. | Recheck inventory before payment and reserve before confirmation. |
| Payment succeeds but order creation fails | Financial reconciliation burden. | Store payment authorization before order transaction and reconcile by provider reference. |
| Stock reservation leaks | Inventory appears unavailable. | Add reservation expiry and cleanup job. |
| Duplicate submit under retry | Duplicate order risk. | Enforce idempotency key and unique checkout submission constraint. |
| Email failed | User may not receive confirmation email. | Keep order confirmed and queue support-visible retry. |

## 16. Assumptions

- Initial rollout uses flat-rate domestic shipping only.
- Payment provider supports idempotent authorization requests.
- Inventory reservation can be represented in the application database.
- Confirmation email can be sent after order persistence without blocking confirmation UI.

## 17. Open Questions

- What exact payment provider API will be used?
- What reservation timeout should apply before payment completion?
- Should the order confirmation page require signed access or only order number plus email?

## 18. Related Documents

- PRD-CHECKOUT-001
- API-CHECKOUT-001
- ERD-CHECKOUT-001
- QA-CHECKOUT-001
