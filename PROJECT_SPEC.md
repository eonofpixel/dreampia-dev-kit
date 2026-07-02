# Project Spec: dreampia-dev-kit

## 1. Overview

`dreampia-dev-kit` is an open-source toolkit for development documentation in agentic coding workflows.

It provides skills, templates, and lightweight CLI gates to help teams create, audit, and maintain development documents across the software lifecycle.

## 1.1 Social Mission

Development should become more legible and more accessible as AI coding tools improve.

`dreampia-dev-kit` should help people who are new to vibe coding, early in their development journey, or working without a full engineering team participate in the development process with more confidence and less hidden gatekeeping.

The project should make the process visible:

- what decisions are needed;
- what assumptions are being made;
- what risks must be checked before coding;
- what documents and tests are missing;
- what next action is reasonable.

This does not mean lowering the quality bar. It means making the quality bar understandable, repeatable, and reachable.

## 2. Problem

AI coding tools can speed up implementation, but many projects still fail or slow down because:

- requirements are vague;
- product decisions are not recorded;
- IA, API, ERD, and QA documents are disconnected;
- code changes without documentation updates;
- PR reviews find product and specification issues too late;
- onboarding new contributors is hard.

## 3. Product Goal

Create a reusable, open-source documentation workflow layer that:

- turns vague product ideas into structured development documents;
- lets Codex and other agents reuse consistent document workflows;
- helps detect documentation drift between docs and code;
- makes development decisions, risks, and next actions understandable to beginners;
- supports small MVPs and large-scale services;
- remains useful as plain Markdown.

## 4. Non-goals

The project should not initially become:

- a hosted SaaS;
- a full project management platform;
- a design tool;
- a code generation framework;
- a paid template marketplace;
- a tool that requires a specific AI vendor.

## 5. Target Users

| User | Needs |
|---|---|
| Solo developer | Turn ideas into specs and tasks quickly. |
| Beginner vibe coder | Understand what to ask an agent, what the output means, and what to verify next. |
| Non-expert builder | Follow a visible development process without needing hidden team knowledge. |
| Startup founder | Clarify product scope before building. |
| PM/PO | Produce PRDs, policies, and acceptance criteria. |
| Frontend developer | Understand IA, screen behavior, and API contracts. |
| Backend developer | Understand API, DB, auth, and integration requirements. |
| QA engineer | Get testable criteria and checklists. |
| Open-source maintainer | Keep documentation consistent with implementation. |
| Agency/SI team | Control scope and reduce handoff ambiguity. |

## 6. Core User Stories

| ID | User Story | Priority |
|---|---|---|
| US-001 | As a developer, I want Codex to create a PRD from a rough idea so that I can start with clear requirements. | Must |
| US-002 | As a developer, I want Codex to turn a PRD into TRD/API/ERD drafts so that implementation can start faster. | Must |
| US-003 | As a PM, I want assumptions and open questions separated so that stakeholders can review them. | Must |
| US-004 | As a QA engineer, I want acceptance criteria and checklists so that features can be tested. | Must |
| US-005 | As a maintainer, I want a doc audit to find missing or inconsistent documents. | Must |
| US-006 | As a team, we want a consistent doc ID system so that documents can reference one another. | Should |
| US-007 | As a contributor, I want templates so that I can create documents without learning the whole system. | Should |
| US-008 | As a plugin user, I want installable Codex and Claude Code support so that skills can be reused across projects. | Could |
| US-009 | As a beginner, I want generated docs and audit results to explain what to fix next so that I can improve safely without guessing. | Must for v0.3 |

## 7. MVP Requirements

### Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| REQ-001 | Provide root `AGENTS.md` with Codex development guidance. | Must |
| REQ-002 | Provide `SKILL.md` files for 8 core skills. | Must |
| REQ-003 | Provide reusable Markdown templates. | Must |
| REQ-004 | Provide document ID and metadata conventions. | Must |
| REQ-005 | Provide bootstrap prompts for Codex development. | Must |
| REQ-006 | Provide README and Korean README. | Should |
| REQ-007 | Provide security and contribution guidelines. | Should |
| REQ-008 | Provide Codex and Claude Code install/plugin scaffold. | Could |
| REQ-009 | Provide CLI validation. | Must for v0.2 |

### Non-functional Requirements

| ID | Requirement |
|---|---|
| NFR-001 | All documents must be readable as plain Markdown. |
| NFR-002 | Skills must be vendor-aware but not vendor-locked. |
| NFR-003 | Default workflows must not require network access. |
| NFR-004 | The project must not access secrets. |
| NFR-005 | Generated documents should be testable by humans. |
| NFR-006 | Templates should work for small and large services. |
| NFR-007 | Outputs should avoid gatekeeping language and explain next actions in plain, actionable terms. |
| NFR-008 | Validation failures should help users learn what is missing, not only report that something failed. |

## 8. Success Criteria

v0.1 is successful when:

- a user can clone the repository and ask Codex or Claude Code to generate usable PRD/TRD/IA/API/ERD/QA documents;
- the 8 core skills are complete enough to use directly;
- templates have consistent metadata;
- Codex and Claude Code users can install or test the skills with minimal restructuring;
- the README explains what the project does within 30 seconds.

## 9. Key Differentiation

Existing AI coding helpers focus on writing code, planning tasks, or orchestrating agents.

`dreampia-dev-kit` focuses on documentation quality and consistency across the development lifecycle.

Positioning line:

```text
Documentation-first workflow for AI coding agents.
```

## 10. Open Questions

| Question | Owner | Status |
|---|---|---|
| Final project name: `dreampia-dev-kit` | Maintainer | Decided |
| Should the first public README be English-only or bilingual? | Maintainer | Open |
| Should v0.1 include Codex and Claude Code plugin manifests or only Markdown skills? | Maintainer | Decided: include local manifests |
| Should v0.2 CLI be published to npm? | Maintainer | Open; GitHub `npx` is supported first |
