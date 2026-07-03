---
doc_id: BRD-DOC-ORCHESTRATION-001
doc_type: strategy-proposal
feature_id: STRATEGY-002
status: draft
owner: product
related_docs:
  - PROJECT_SPEC.md
  - README.md
  - README.ko.md
  - ROADMAP.md
  - docs/COMPETITIVE_LANDSCAPE.md
  - docs/LAZYCODEX_STYLE_DIRECTION_PROPOSAL.ko.md
related_code:
  - bin/dreampia-dev-kit.js
  - lib/cli.js
  - lib/init.js
  - lib/doctor.js
  - lib/guide.js
  - lib/explain.js
last_reviewed: 2026-07-04
version: 0.1.0
---

# 문서 운영 검증 오케스트레이션 에이전트 전략

## 포지션 선언

Dreampia는 단순한 문서 템플릿 묶음이 아니다.

Dreampia의 목표 포지션은 다음이다.

```text
Documentation operations and verification orchestrator for AI coding agents.
```

한국어로는 다음처럼 설명한다.

```text
AI 코딩 전에 필요한 개발 문서를 만들고, 서로 맞추고, 검증하고, 다음 행동으로 연결하는 문서 운영 검증 오케스트레이션 에이전트.
```

핵심은 "구현을 대신 오케스트레이션하는 도구"가 아니라 "구현 전에 필요한 문서 운영과 검증을 오케스트레이션하는 도구"라는 점이다.

## 왜 오케스트레이션인가

초보자와 비개발자에게 어려운 지점은 PRD 하나를 쓰는 것이 아니다. 진짜 어려운 것은 다음 연결이다.

- PRD의 요구사항이 TRD의 구성요소로 연결되는가?
- IA의 화면과 user-flow의 단계가 맞는가?
- API spec의 endpoint가 PRD requirement와 연결되는가?
- ERD의 데이터 모델이 API와 TRD의 정책을 받쳐주는가?
- QA checklist가 acceptance criteria를 실제로 검증하는가?
- 문서가 구현 전에 위험한 토큰, 결제, 개인정보 정책을 드러내는가?
- 실패했을 때 무엇부터 고쳐야 하는가?

이 연결을 사람이 매번 숨은 지식으로 처리하면 개발 과정은 평등해지지 않는다. Dreampia는 이 연결을 명시적인 루프로 만든다.

```text
idea -> guide -> init/doc-pack -> validate -> explain -> doc-audit -> fix docs -> implement -> revalidate
```

## 오케스트레이션 범위

### 포함한다

- 문서팩 생성 순서 안내
- starter docs 생성
- PRD/TRD/IA/user-flow/API/ERD/QA/doc-audit 간 연결 확인
- structure scoring
- content-risk audit
- 실패 원인 설명
- 설치/환경 진단
- 다음 prompt와 다음 CLI 명령 제안
- 구현 전 read-only code-to-docs suggestion

### 포함하지 않는다

- 자동 구현 대행
- 장시간 autonomous coding loop
- model routing
- hook 기반 권한 상승
- secrets 접근
- 사용자의 승인 없는 문서 overwrite
- hosted SaaS workflow

## 사용자에게 보이는 핵심 루프

### 1. 시작

```bash
npx dreampia-dev-kit guide "workspace invitations"
```

역할:

- 사용자의 모호한 아이디어를 문서팩 요청으로 바꾼다.
- Codex와 Claude Code에 넣을 prompt를 보여준다.
- 기대 생성물과 검증 명령을 안내한다.

### 2. 문서팩 초기화

```bash
npx dreampia-dev-kit init docs/ --feature INVITE-001 --name "workspace invitations"
```

역할:

- 빈 프로젝트에도 문서 운영의 뼈대를 만든다.
- 표준 frontmatter, doc_id, related_docs, traceability signal을 채운다.
- 사용자가 무엇을 채워야 하는지 보이게 한다.

### 3. 검증

```bash
npx dreampia-dev-kit validate docs/
```

역할:

- 구조가 충분한지 확인한다.
- 민감정보, 정책 충돌, 위험한 생성물 패턴을 확인한다.
- 구현으로 넘어갈 수 있는 최소 문서 상태인지 판정한다.

### 4. 설명

```bash
npx dreampia-dev-kit explain docs/
```

역할:

- 실패를 사람이 고칠 수 있는 순서로 바꾼다.
- required fix, recommended improvement, learning note로 나눈다.
- 초보자가 "내가 뭘 모르는지"를 알 수 있게 한다.

### 5. 진단

```bash
npx dreampia-dev-kit doctor --docs docs/
```

역할:

- Codex와 Claude Code 설치 상태를 보여준다.
- 현재 docs 폴더를 읽고 generated docs 개수와 validation 상태를 보여준다.
- 다음에 입력할 실제 명령을 제안한다.

## Agent Skill 오케스트레이션

CLI는 deterministic surface다. Agent skill은 conversational surface다.

권장 in-session command pillar:

| Command | 역할 |
|---|---|
| `/dreampia-dev-kit:doc-pack` | 전체 문서팩 초안 작성 |
| `/dreampia-dev-kit:prd` | 제품 요구사항 정리 |
| `/dreampia-dev-kit:api` | API contract 작성 |
| `/dreampia-dev-kit:qa` | QA checklist 작성 |
| `/dreampia-dev-kit:doc-audit` | 문서 간 누락과 drift 점검 |

다음 단계에서는 `/dreampia-dev-kit:orchestrate-docs` 또는 `/dreampia-dev-kit:doc-ops` 같은 상위 skill을 고려한다.

이 skill은 직접 코드를 작성하지 않는다. 대신 다음을 조율한다.

1. 현재 docs 상태 읽기
2. 빠진 문서 파악
3. 문서 간 링크와 ID 확인
4. 필요한 하위 skill 호출 순서 제안
5. 생성 후 `validate`와 `explain` 실행 제안
6. 구현 전 남은 open question 정리

## 제품 메시지

짧은 문구:

```text
Docs before code. Verification before implementation.
```

README headline 후보:

```text
Documentation operations and verification for AI coding agents.
```

한국어 headline 후보:

```text
AI 코딩을 위한 문서 운영과 검증 오케스트레이션.
```

설명문:

```text
Dreampia helps Codex, Claude Code, and other coding agents create linked development documents, validate them for structure and content risks, explain what to fix, and keep implementation grounded in reviewed docs.
```

## 구현 로드맵

### v0.3.x

- `init`, `doctor`, `guide`, `validate`, `explain`을 README의 핵심 루프로 정렬
- npm `npx dreampia-dev-kit ...` 배포 준비
- README 명령 smoke test 강화

### v0.4

- `doc-audit` engine 고도화
- `related_docs` 깨진 링크 탐지
- PRD acceptance criteria와 QA checklist 연결 탐지
- API endpoint와 TRD component 연결 탐지
- ERD table과 API payload 연결 탐지

### v0.5

- read-only code-to-docs suggestion
- route/API/schema discovery
- 문서 갱신 patch proposal 생성
- 사용자 승인 전 overwrite 금지

### v0.6

- `dreampia-dev-kit orchestrate docs/` 또는 `dreampia-dev-kit doc-ops docs/`
- 현재 문서팩 상태를 읽고 다음 작업 큐 생성
- "다음에 에이전트에게 줄 prompt" 자동 생성
- beginner/expert 출력 모드 분리

## 성공 기준

- 사용자가 "Dreampia는 문서 버전의 OMC/LazyCodex"라고 이해할 수 있다.
- 하지만 Dreampia가 구현 자동화가 아니라 문서 운영과 검증을 맡는다는 경계도 분명하다.
- 초보자가 `guide -> init/doc-pack -> validate -> explain -> fix` 루프를 혼자 돌릴 수 있다.
- 검증 실패가 좌절이 아니라 학습 가능한 다음 행동으로 보인다.
- 문서팩이 구현의 source of truth 역할을 한다.
