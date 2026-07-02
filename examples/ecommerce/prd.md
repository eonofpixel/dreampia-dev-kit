---
doc_id: PRD-CHECKOUT-001
doc_type: prd
feature_id: CHECKOUT-001
status: draft
owner: product
related_docs:
  - BRD-SHOP-001
  - IA-CHECKOUT-001
  - FLOW-CHECKOUT-001
  - TRD-CHECKOUT-001
  - API-CHECKOUT-001
  - ERD-CHECKOUT-001
  - QA-CHECKOUT-001
related_code: []
last_reviewed: 2026-07-02
version: 0.1.0
---

# Product Requirements Document: Guest Checkout

## 1. Overview

Provide a guest checkout flow that lets shoppers review a cart, enter shipping details, authorize payment, and receive an order confirmation.

## 2. Background

Small Shop needs a self-serve purchase path before investing in accounts, loyalty, or complex fulfillment automation.

## 3. Goals

- Convert existing cart intent into confirmed orders.
- Prevent overselling by checking and reserving inventory.
- Keep checkout recoverable when validation, stock, or payment errors occur.

## 4. Non-goals

- Registered customer accounts.
- Saved cards or wallets.
- Promo code management.
- International tax handling.

## 5. Target Users

| User | Goal | Pain Point |
|---|---|---|
| Guest shopper | Complete purchase quickly. | Does not want account setup before buying. |
| Store operator | Fulfill valid paid orders. | Manual invoice flow is slow and error-prone. |
| Support agent | Diagnose checkout failures. | Needs clear order and payment state. |

## 6. MVP Scope

| Item | Description | Priority |
|---|---|---|
| Cart review | Show items, quantities, subtotal, shipping estimate, taxes, and total. | Must |
| Contact and shipping form | Collect email, recipient name, phone, and shipping address. | Must |
| Inventory validation | Confirm cart items are purchasable before payment. | Must |
| Payment authorization | Authorize card payment through provider checkout. | Must |
| Order creation | Create order after successful authorization and inventory reservation. | Must |
| Confirmation | Show order number and send confirmation email. | Should |

## 7. Later Scope

| Item | Reason Deferred |
|---|---|
| Customer account creation | Checkout must work without accounts first. |
| Promo codes | Pricing rules need separate product definition. |
| Real-time carrier rates | MVP can use a flat shipping rule. |

## 8. User Stories

| ID | User Story | Priority |
|---|---|---|
| US-001 | As a guest shopper, I want to review my cart total so that I know what I will pay. | Must |
| US-002 | As a guest shopper, I want checkout errors to preserve my cart so that I can retry without starting over. | Must |
| US-003 | As a store operator, I want inventory reserved before order confirmation so that paid orders can be fulfilled. | Must |
| US-004 | As a support agent, I want checkout failures to have clear states so that I can explain what happened. | Should |

## 9. Functional Requirements

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| REQ-001 | The checkout page displays current cart items and totals. | Must | Totals update from server-calculated values, not client-only values. |
| REQ-002 | The shopper can submit contact and shipping details. | Must | Invalid email, phone, or address fields show inline errors. |
| REQ-003 | The system validates item availability before payment authorization. | Must | Out-of-stock items block payment and explain which item changed. |
| REQ-004 | The system authorizes payment before creating a confirmed order. | Must | Failed authorization returns a recoverable payment error. |
| REQ-005 | The system creates an order with reserved inventory after successful authorization. | Must | Confirmation includes order number, total, and email address. |
| REQ-006 | The system sends a confirmation email after order creation. | Should | Email send failure does not void the order but is logged for support. |

## 10. Policies and Rules

| Policy | Rule | Notes |
|---|---|---|
| Guest checkout | Account creation is not required. | Email is required for receipt and support. |
| Inventory reservation | Reserve each line item before final order confirmation. | Reservation timeout is a TRD open question. |
| Payment state | Orders cannot be confirmed without an authorized payment. | Capture timing is unresolved. |
| Pricing | Totals are calculated server-side. | Prevent client-side price tampering. |

## 11. Edge Cases

| Case | Expected Behavior |
|---|---|
| Item sells out during checkout | Show stock error and return to cart review. |
| Payment authorization fails | Keep cart and shipping details, then ask shopper to retry. |
| Email send fails after order creation | Show confirmation and flag email failure for support. |
| Shopper refreshes confirmation page | Show existing order summary without creating a duplicate order. |

## 12. Acceptance Criteria

| ID | Given | When | Then | Related Requirement |
|---|---|---|---|---|
| AC-001 | A cart contains in-stock items | Shopper opens checkout | Server-calculated totals are displayed | REQ-001 |
| AC-002 | A required shipping field is invalid | Shopper submits details | Inline validation blocks payment | REQ-002 |
| AC-003 | An item becomes unavailable | Shopper starts payment | Payment is blocked and stock error is shown | REQ-003 |
| AC-004 | Payment authorization succeeds | Order creation runs | Order is confirmed with reserved inventory | REQ-004, REQ-005 |
| AC-005 | Payment authorization fails | Shopper returns to checkout | Cart and entered details remain available | REQ-004 |

## 13. Analytics and Success Metrics

| Metric | Event/Source | Target |
|---|---|---|
| Checkout started | `checkout_started` | Baseline |
| Checkout completed | `order_confirmed` / `checkout_started` | 55% or higher |
| Payment failure rate | `payment_failed` / `payment_attempted` | Under 8% in QA sandbox |
| Stock error rate | `inventory_unavailable` / `checkout_started` | Baseline |

## 14. Dependencies

- Product catalog and cart service.
- Inventory service or stock table.
- Payment provider integration.
- Transactional email provider.

## 15. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Duplicate order creation | Customer may be charged or fulfilled twice. | Use idempotency key on checkout submission. |
| Inventory reservation deadlock | Valid carts may fail under load. | Keep reservation transaction narrow and time-bound. |
| Payment provider callback delay | Order state may be unclear. | Store explicit payment state and retry status updates. |

## 16. Assumptions

- Shipping uses a flat domestic shipping rule for MVP.
- Payment authorization happens synchronously enough to return a clear response.
- The system can send order confirmation email after order creation.

## 17. Open Questions

- Should payment be captured immediately after authorization?
- How long should inventory reservations remain valid if order creation partially fails?
- Should checkout support billing address separate from shipping address?

## 18. Related Documents

- IA-CHECKOUT-001
- FLOW-CHECKOUT-001
- TRD-CHECKOUT-001
- API-CHECKOUT-001
- ERD-CHECKOUT-001
- QA-CHECKOUT-001
