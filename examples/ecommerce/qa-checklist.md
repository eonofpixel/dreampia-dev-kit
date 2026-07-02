---
doc_id: QA-CHECKOUT-001
doc_type: qa-checklist
feature_id: CHECKOUT-001
status: draft
owner: qa
related_docs:
  - PRD-CHECKOUT-001
  - FLOW-CHECKOUT-001
  - API-CHECKOUT-001
  - ERD-CHECKOUT-001
related_code: []
last_reviewed: 2026-07-02
version: 0.1.0
---

# QA Checklist: Guest Checkout

## 1. Scope

Validate guest checkout from cart review through order confirmation, including stock and payment failure recovery.

## 2. Preconditions

- Product catalog has at least one in-stock product and one low-stock product.
- Payment sandbox supports success, failure, and timeout test tokens.
- Email sending can be observed through sandbox logs or test inbox.

## 3. Test Environment

| Item | Value |
|---|---|
| App version | Guest checkout MVP build |
| Payment provider | Sandbox mode |
| Email provider | Test inbox or sandbox logs |
| Devices | Mobile and desktop browser |

## 4. Functional Checklist

| ID | Check | Expected Result | Related Requirement | Status |
|---|---|---|---|---|
| QA-001 | Checkout starts from a cart with in-stock items. | Checkout session is created and review page opens. | REQ-001 | Not Run |
| QA-002 | Server-calculated totals display on review page. | Totals match backend response, not client-only values. | REQ-001 | Not Run |
| QA-003 | Required shipping fields show inline validation. | Invalid fields block payment and show clear messages. | REQ-002 | Not Run |
| QA-004 | Successful payment creates one confirmed order. | Exactly one order is confirmed for the idempotency key. | REQ-004, REQ-005 | Not Run |
| QA-005 | Confirmation page shows order number, total, and email. | Confirmation does not expose raw payment details. | REQ-005 | Not Run |
| QA-006 | Confirmation email is attempted after order creation. | Email attempt is visible in sandbox logs. | REQ-006 | Not Run |

## 5. Permission Checklist

| Role | Check | Expected Result |
|---|---|---|
| Guest | Complete checkout without account login. | Guest can complete the happy path. |
| Guest | Open confirmation page. | Confirmation is available only through supported signed or equivalent access. |
| Support | Inspect failed payment state. | Support view does not expose raw provider secrets. |

## 6. Edge Cases

| ID | Case | Expected Result | Status |
|---|---|---|---|
| QA-007 | Item sells out after checkout starts. | Payment is blocked and cart can be refreshed. | Not Run |
| QA-008 | Shopper double-clicks submit. | Only one order is created. | Not Run |
| QA-009 | Shopper refreshes confirmation. | Existing order summary is shown. | Not Run |
| QA-010 | Email send fails. | Order remains confirmed and retry is visible to support. | Not Run |

## 7. Error Cases

| ID | Error | Expected Result | Status |
|---|---|---|---|
| QA-011 | Payment authorization fails. | Cart and shipping details remain available. | Not Run |
| QA-012 | Payment provider times out. | User sees temporary failure and can retry. | Not Run |
| QA-013 | Invalid checkout session ID. | User sees recoverable not-found state. | Not Run |

## 8. Regression Checklist

| ID | Check | Status |
|---|---|---|
| QA-014 | Existing cart add/remove behavior still works. | Not Run |
| QA-015 | Existing product detail pages still show stock status. | Not Run |
| QA-016 | Existing email templates are not broken by checkout confirmation. | Not Run |
| QA-017 | Mobile and desktop forms remain usable. | Not Run |
| QA-018 | Keyboard navigation works through shipping and payment steps. | Not Run |

## 9. Pass/Fail Criteria

Pass only when:

- happy path order creation succeeds;
- inventory unavailable and payment failure paths are recoverable;
- duplicate submit does not create duplicate orders;
- confirmation email behavior is observable.

## 10. Related Requirements

- REQ-001
- REQ-002
- REQ-003
- REQ-004
- REQ-005
- REQ-006

## 11. Assumptions

- QA can use payment sandbox tokens.
- Email sandbox can show whether confirmation was attempted.

## 12. Open Questions

- Should QA verify payment capture, or only authorization, in MVP?
- Should address validation use provider rules or only field-level validation?

## 13. Related Documents

- PRD-CHECKOUT-001
- FLOW-CHECKOUT-001
- API-CHECKOUT-001
- ERD-CHECKOUT-001
