---
doc_id: ERD-CHECKOUT-001
doc_type: erd
feature_id: CHECKOUT-001
status: draft
owner: backend
related_docs:
  - PRD-CHECKOUT-001
  - TRD-CHECKOUT-001
  - API-CHECKOUT-001
  - QA-CHECKOUT-001
related_code: []
last_reviewed: 2026-07-02
version: 0.1.0
---

# ERD: Guest Checkout

## 1. Overview

The checkout data model stores server-authoritative checkout state, inventory reservations, payment authorization references, and confirmed orders for PRD-CHECKOUT-001 and API-CHECKOUT-001.

## 2. Entities

| Entity | Purpose |
|---|---|
| `cart` | Existing shopper cart. |
| `checkout_session` | Checkout state derived from a cart. |
| `checkout_item` | Cart item snapshot used during checkout. |
| `inventory_reservation` | Reserved stock for a checkout or order. |
| `payment_authorization` | Payment provider authorization state. |
| `order` | Confirmed purchase record. |
| `order_item` | Item snapshot for fulfillment. |

## 3. Tables

### `checkout_session`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key. |
| `cart_id` | UUID | Foreign key references existing cart table. |
| `email` | text | Required before submit. |
| `shipping_address_json` | json | MVP address representation. |
| `status` | text | `started`, `shipping_validated`, `payment_failed`, `confirmed`, `blocked`. |
| `subtotal_amount` | integer | Minor units. |
| `shipping_amount` | integer | Minor units. |
| `tax_amount` | integer | Minor units. |
| `total_amount` | integer | Minor units. |
| `currency` | text | Default `USD`. |
| `created_at` | timestamp | Audit field. |
| `updated_at` | timestamp | Audit field. |

### `inventory_reservation`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key. |
| `checkout_session_id` | UUID | Foreign key references `checkout_session.id`. |
| `order_id` | UUID nullable | Foreign key references `order.id` after confirmation. |
| `sku` | text | Product variant identifier. |
| `quantity` | integer | Reserved quantity. |
| `status` | text | `reserved`, `released`, `converted`. |
| `expires_at` | timestamp | Reservation expiry. |

### `payment_authorization`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key. |
| `checkout_session_id` | UUID | Foreign key references `checkout_session.id`. |
| `provider` | text | Payment provider name. |
| `provider_reference` | text | Provider authorization ID. |
| `amount` | integer | Authorized amount. |
| `currency` | text | Currency. |
| `status` | text | `authorized`, `failed`, `voided`, `captured`. |
| `idempotency_key` | text | Unique per submit attempt. |

### `order`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key. |
| `order_number` | text | Human-facing identifier. |
| `checkout_session_id` | UUID | Foreign key references `checkout_session.id`. |
| `email` | text | Receipt and support contact. |
| `status` | text | `confirmed`, `cancelled`, `fulfilled`. |
| `payment_status` | text | Mirrors payment lifecycle. |
| `total_amount` | integer | Minor units. |
| `currency` | text | Currency. |
| `created_at` | timestamp | Audit field. |

## 4. Relationships

| Relationship | Cardinality |
|---|---|
| `cart` to `checkout_session` | One cart may have many checkout sessions. |
| `checkout_session` to `checkout_item` | One session has many item snapshots. |
| `checkout_session` to `inventory_reservation` | One session has many reservations. |
| `checkout_session` to `payment_authorization` | One session may have many attempts. |
| `checkout_session` to `order` | One successful session creates one order. |
| `order` to `order_item` | One order has many item snapshots. |

## 5. Indexes

| Index | Purpose |
|---|---|
| `idx_checkout_session_cart_id` | Find checkout sessions for a cart. |
| `idx_inventory_reservation_sku_status` | Find active reservations by SKU. |
| `idx_payment_authorization_provider_reference` | Reconcile provider events. |
| `idx_order_order_number` | Load confirmation and support view. |

## 6. Constraints

- `order.order_number` must be unique.
- `payment_authorization.idempotency_key` must be unique per checkout session.
- `inventory_reservation.quantity` must be greater than zero.
- `order.checkout_session_id` must be unique.

## 7. Soft Delete Policy

Checkout and order records are not soft-deleted in MVP. Expired reservations are marked `released`.

## 8. Audit Fields

Use `created_at` and `updated_at` on mutable checkout records. Store payment provider references but never raw card data.

## 9. Migration Notes

- Add reservation cleanup job before launch.
- Backfill is not required because checkout is a new feature.

## 10. Data Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Reservation leak | Stock remains unavailable after abandoned checkout. | Expire reservations and run cleanup job. |
| Provider reference mismatch | Payment reconciliation may be delayed. | Index provider references and store status transitions. |
| Address overexposure | Sensitive customer data appears in logs or support views. | Limit address logging and expose only required fields. |

## 11. Assumptions

- Existing cart and product tables already exist.
- Address is stored as JSON in MVP to avoid premature address normalization.

## 12. Open Questions

- Should `order` be renamed to `orders` in implementations where `order` is reserved?
- Should payment provider webhook events get a separate table in MVP?

## 13. Related Documents

- PRD-CHECKOUT-001
- TRD-CHECKOUT-001
- API-CHECKOUT-001
- QA-CHECKOUT-001
