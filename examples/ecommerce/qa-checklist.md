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

## 1. Test Scope

Validate guest checkout from cart review through order confirmation, including stock and payment failure recovery.

## 2. Preconditions

- Product catalog has at least one in-stock product and one low-stock product.
- Payment sandbox supports success, failure, and timeout test tokens.
- Email sending can be observed through sandbox logs or test inbox.

## 3. Functional Checks

| ID | Check | Related Requirement | Status |
|---|---|---|---|
| QA-001 | Checkout starts from a cart with in-stock items. | REQ-001 | Not run |
| QA-002 | Server-calculated totals display on review page. | REQ-001 | Not run |
| QA-003 | Required shipping fields show inline validation. | REQ-002 | Not run |
| QA-004 | Successful payment creates one confirmed order. | REQ-004, REQ-005 | Not run |
| QA-005 | Confirmation page shows order number, total, and email. | REQ-005 | Not run |
| QA-006 | Confirmation email is attempted after order creation. | REQ-006 | Not run |

## 4. Edge Cases

| ID | Case | Expected Result | Status |
|---|---|---|---|
| QA-EDGE-001 | Item sells out after checkout starts. | Payment is blocked and cart can be refreshed. | Not run |
| QA-EDGE-002 | Shopper double-clicks submit. | Only one order is created. | Not run |
| QA-EDGE-003 | Shopper refreshes confirmation. | Existing order summary is shown. | Not run |
| QA-EDGE-004 | Email send fails. | Order remains confirmed and retry is visible to support. | Not run |

## 5. Error Cases

| ID | Error | Expected Result | Status |
|---|---|---|---|
| QA-ERR-001 | Payment authorization fails. | Cart and shipping details remain available. | Not run |
| QA-ERR-002 | Payment provider times out. | User sees temporary failure and can retry. | Not run |
| QA-ERR-003 | Invalid checkout session ID. | User sees recoverable not-found state. | Not run |

## 6. Permission Checks

Guest checkout does not require account permissions. Confirmation access still must not expose raw payment details or private provider metadata.

## 7. Compatibility Checks

| Surface | Check | Status |
|---|---|---|
| Mobile | Forms are usable at narrow width. | Not run |
| Desktop | Step navigation remains clear. | Not run |
| Keyboard | Form and payment step are keyboard navigable. | Not run |

## 8. Regression Checks

- Existing cart add/remove behavior still works.
- Existing product detail pages still show stock status.
- Existing email templates are not broken by checkout confirmation.

## 9. Pass/Fail Criteria

Pass only when:

- happy path order creation succeeds;
- inventory unavailable and payment failure paths are recoverable;
- duplicate submit does not create duplicate orders;
- confirmation email behavior is observable.

## 10. Assumptions

- QA can use payment sandbox tokens.
- Email sandbox can show whether confirmation was attempted.

## 11. Open Questions

- Should QA verify payment capture, or only authorization, in MVP?
- Should address validation use provider rules or only field-level validation?
