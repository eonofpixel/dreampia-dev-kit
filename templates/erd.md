---
doc_id: ERD-FEATURE-001
doc_type: erd
feature_id: FEATURE-001
status: draft
owner: backend
related_docs: []
related_code: []
last_reviewed: YYYY-MM-DD
version: 0.1.0
---

# ERD / Data Model

## 1. Overview

## 2. Entities

| Entity | Description |
|---|---|
| TBD | TBD |

## 3. Tables

### table_name

| Column | Type | Required | Default | Description |
|---|---|---|---|---|
| id | uuid | Yes | generated | Primary key |
| created_at | timestamp | Yes | now() | Creation time |
| updated_at | timestamp | Yes | now() | Last update time |

## 4. Relationships

| From | Relationship | To | Notes |
|---|---|---|---|
| TBD | 1:N | TBD | TBD |

## 5. Indexes

| Table | Index | Columns | Purpose |
|---|---|---|---|
| TBD | TBD | TBD | TBD |

## 6. Constraints

- Sensitive one-time values should be stored as hashes/verifiers, for example `token_hash`, not raw `token` values.
- Index sensitive lookup material by hash/verifier rather than plaintext secret values.

## 7. Soft Delete Policy

## 8. Audit Fields

## 9. Migration Notes

## 10. Data Risks

| Risk | Impact | Mitigation |
|---|---|---|
| TBD | TBD | TBD |
| Plaintext secret storage | Credential or token leakage if data is exposed. | Use hashes/verifiers and never persist raw one-time secrets by default. |

## 11. Assumptions

- TBD

## 12. Open Questions

- TBD

## 13. Related Documents

- TBD
