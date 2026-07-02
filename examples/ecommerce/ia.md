---
doc_id: IA-CHECKOUT-001
doc_type: ia
feature_id: CHECKOUT-001
status: draft
owner: design
related_docs:
  - PRD-CHECKOUT-001
  - FLOW-CHECKOUT-001
  - QA-CHECKOUT-001
related_code: []
last_reviewed: 2026-07-02
version: 0.1.0
---

# Information Architecture: Guest Checkout

## 1. Overview

Guest checkout is a focused step-based path from cart review to order confirmation. It supports unauthenticated shoppers while keeping checkout state tied to a server-generated session.

## 2. Navigation Tree

```text
Shop
|-- Product Detail
|-- Cart
`-- Checkout
    |-- Review
    |-- Shipping
    |-- Payment
    `-- Confirmation
```

## 3. Page List

| Screen ID | Page | Route | Purpose |
|---|---|---|---|
| PAGE-CHECKOUT-001 | Cart | `/cart` | Review cart before checkout starts. |
| PAGE-CHECKOUT-002 | Checkout review | `/checkout/{sessionId}/review` | Confirm items, quantities, and totals. |
| PAGE-CHECKOUT-003 | Shipping | `/checkout/{sessionId}/shipping` | Collect contact and shipping details. |
| PAGE-CHECKOUT-004 | Payment | `/checkout/{sessionId}/payment` | Authorize payment for final total. |
| PAGE-CHECKOUT-005 | Confirmation | `/orders/{orderNumber}/confirmation` | Show order result and next steps. |

## 4. Access Rules

| Area | Access Rule |
|---|---|
| Cart | Public session with cart identifier. |
| Checkout session | Guest session with server-generated checkout session ID. |
| Confirmation | Accessible through order number and confirmation token or equivalent signed link. |

## 5. Entry Points

- Cart primary checkout button.
- Product page buy-now action if enabled later.
- Recoverable payment error returning to payment step.

## 6. Exit Points

- Back to cart when item availability changes.
- Confirmation page after successful order creation.
- Support contact link on repeated payment failure.

## 7. Related User Flows

- FLOW-CHECKOUT-001 guest checkout happy path.
- Payment failure path.
- Inventory unavailable path.

## 8. Missing Screens

- Detailed payment-provider iframe states are not specified in v0.1.
- Support reconciliation screens are outside the checkout MVP.

## 9. Assumptions

- Checkout is a step-based experience, not a single long page.
- Guest shoppers do not need a profile or account area.

## 10. Open Questions

- Should confirmation be accessible from email without an authenticated account?
- Should shipping and payment be separate routes or sections on one responsive page?

## 11. Related Documents

- PRD-CHECKOUT-001
- FLOW-CHECKOUT-001
- API-CHECKOUT-001
- QA-CHECKOUT-001
