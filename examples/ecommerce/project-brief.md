---
doc_id: BRD-SHOP-001
doc_type: project-brief
feature_id: SHOP-001
status: draft
owner: product
related_docs:
  - PRD-CHECKOUT-001
  - TRD-CHECKOUT-001
related_code: []
last_reviewed: 2026-07-02
version: 0.1.0
---

# Project Brief: Small Shop Checkout

## 1. Project Name

Small Shop

## 2. Background

Small Shop sells curated home goods and currently receives orders through manual invoice requests.

## 3. Problem Statement

Customers abandon purchases because checkout requires manual follow-up and does not confirm price, shipping, or availability immediately.

## 4. Goals

- Let shoppers complete guest checkout without creating an account.
- Reserve inventory during payment authorization.
- Produce an order record that support staff can fulfill.

## 5. Non-goals

- Marketplace seller onboarding.
- Subscription products.
- Multi-currency pricing.

## 6. Target Users

| User | Need | Priority |
|---|---|---|
| Guest shopper | Buy one or more items without account setup. | Must |
| Store operator | Receive orders with enough details to fulfill. | Must |
| Support agent | Understand why checkout failed when users ask for help. | Should |

## 7. MVP Scope

| Feature | Description | Priority |
|---|---|---|
| Cart review | Shopper reviews items, totals, and stock status. | Must |
| Shipping details | Shopper enters name, email, address, and phone. | Must |
| Payment authorization | System authorizes card payment before order creation. | Must |
| Order confirmation | Shopper receives a confirmation screen and email. | Must |

## 8. Success Metrics

| Metric | Target |
|---|---|
| Checkout completion rate | 55% or higher from cart review |
| Order creation support tickets | Under 2% of completed orders |

## 9. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Inventory oversell | Store cannot fulfill paid orders. | Reserve stock before payment capture. |
| Payment provider outage | Shoppers cannot complete checkout. | Show recoverable error and keep cart intact. |

## 10. Assumptions

- Product catalog and cart already exist.
- Prices are stored in a single default currency.
- A payment provider sandbox is available for implementation and QA.

## 11. Open Questions

- Should payment be captured immediately or only authorized before fulfillment?
- Which shipping carriers are in scope for tax and delivery estimates?
