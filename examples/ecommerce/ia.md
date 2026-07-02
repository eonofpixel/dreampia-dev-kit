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

## 1. Navigation Tree

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

## 2. Page List

| Page | Route | Purpose |
|---|---|---|
| Cart | `/cart` | Review cart before checkout starts. |
| Checkout review | `/checkout/{sessionId}/review` | Confirm items, quantities, and totals. |
| Shipping | `/checkout/{sessionId}/shipping` | Collect contact and shipping details. |
| Payment | `/checkout/{sessionId}/payment` | Authorize payment for final total. |
| Confirmation | `/orders/{orderNumber}/confirmation` | Show order result and next steps. |

## 3. Screen IDs

| Screen ID | Screen | Related Flow Step |
|---|---|---|
| SCREEN-CHECKOUT-001 | Checkout review | FLOW-CHECKOUT-001 step 2 |
| SCREEN-CHECKOUT-002 | Shipping details | FLOW-CHECKOUT-001 step 3 |
| SCREEN-CHECKOUT-003 | Payment authorization | FLOW-CHECKOUT-001 step 4 |
| SCREEN-CHECKOUT-004 | Order confirmation | FLOW-CHECKOUT-001 step 6 |

## 4. Access Control

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

## 7. Related Flows

- FLOW-CHECKOUT-001 guest checkout happy path.
- Payment failure path.
- Inventory unavailable path.

## 8. Assumptions

- Checkout is a step-based experience, not a single long page.
- Guest shoppers do not need a profile or account area.

## 9. Open Questions

- Should confirmation be accessible from email without an authenticated account?
- Should shipping and payment be separate routes or sections on one responsive page?
