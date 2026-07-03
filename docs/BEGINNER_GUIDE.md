# Beginner Guide: From Idea to Reviewed Docs

Use this guide when you are new to vibe coding or when you want a safer path before asking an agent to implement code.

## 1. Start With One Idea

You do not need a perfect specification. Start with one sentence:

```text
I want guest checkout for a small ecommerce shop.
```

Then run:

```bash
dreampia-dev-kit guide "guest checkout for a small ecommerce shop"
```

The guide shows the prompt to give Codex or Claude Code, the documents to expect, and the validation command to run next.

If you want the files on disk before asking the agent to write details, initialize a starter docs folder:

```bash
dreampia-dev-kit init docs/ --feature CHECKOUT-001 --name "guest checkout"
```

## 2. Ask for a Doc Pack

Copy the guide prompt into your agent. The expected document pack is:

- PRD: what problem is solved, for whom, and what is out of scope;
- TRD: how the implementation should be shaped;
- IA: which pages, routes, and access rules exist;
- user-flow: what the user does, including errors and alternatives;
- API spec: request, response, auth, errors, and examples;
- ERD: tables, relationships, indexes, and sensitive data handling;
- QA checklist: checks with pass/fail criteria;
- doc-audit report: gaps, conflicts, and next actions.

## 3. Validate Before Coding

Run:

```bash
dreampia-dev-kit validate docs/
```

If you are not sure Dreampia is installed correctly, run:

```bash
dreampia-dev-kit doctor --docs docs/
```

If the gate passes, the docs are structurally complete and have no major content-risk findings.

If the gate fails, do not treat that as personal failure. It means part of the development process is still hidden.

When you are unsure what to do next, ask Dreampia to choose the next documentation operation:

```bash
dreampia-dev-kit orchestrate docs/
```

This read-only report shows required operations, recommended improvements, the next validation command, and a prompt you can give to Codex or Claude Code.

Ask for a plain-language report:

```bash
dreampia-dev-kit explain docs/
```

The explain report separates required fixes, recommended improvements, and learning notes.

## 4. Fix in the Right Order

Required fixes first:

- missing frontmatter or required sections;
- unsafe token, secret, payment, or privacy handling;
- contradictory policies across PRD, API, ERD, IA, flow, or QA;
- untestable QA criteria.

Recommended improvements next:

- unclear related documents;
- missing traceability signals such as requirement IDs or screen IDs;
- repeated open questions that should become one decision.

## 5. Implement the Smallest Safe Slice

After the docs pass, ask the agent to implement only the smallest safe slice.

Use this prompt shape:

```text
Use docs/ as the source of truth. Implement the smallest safe slice for this feature.
Keep PRD, TRD, API spec, ERD, and QA checklist aligned.
Stop and ask if a new product decision appears.
```

## 6. Repeat

Good development is not one perfect prompt. It is a loop:

```text
idea -> docs -> validation -> fix docs -> implement small slice -> test -> update docs
```

Dreampia exists to make that loop visible.
