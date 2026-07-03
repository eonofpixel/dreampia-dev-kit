---
doc_id: BRD-LAZYCODEX-DIRECTION-001
doc_type: strategy-proposal
feature_id: STRATEGY-001
status: draft
owner: product
related_docs:
  - README.md
  - README.ko.md
  - ROADMAP.md
  - docs/COMPETITIVE_LANDSCAPE.md
  - docs/BEGINNER_GUIDE.ko.md
related_code:
  - bin/dreampia-dev-kit.js
  - lib/cli.js
  - lib/init.js
  - lib/doctor.js
  - lib/guide.js
  - lib/explain.js
last_reviewed: 2026-07-03
version: 0.1.0
---

# LazyCodex 스타일 방향성 제안서

## 결론

Dreampia는 LazyCodex처럼 "설치하면 바로 작동하는 개발 보조 레이어"의 감각을 가져가야 한다.

다만 LazyCodex를 그대로 따라가면 안 된다. LazyCodex는 Codex를 위한 agent harness다. 프로젝트 메모리, 계획, 실행, 검증, hooks, model routing, sub-agent role까지 다룬다. Dreampia가 코드 구현 오케스트레이션 영역에서 정면 경쟁하면 범위가 너무 커진다. 대신 Dreampia는 문서 운영과 검증 오케스트레이션에 집중해야 한다.

Dreampia의 더 좋은 방향은 다음이다.

```text
LazyCodex-like UX for documentation-first development.
```

즉, 사용자는 LazyCodex처럼 쉽게 설치하고, 명령 몇 개만 기억하고, 문제가 생기면 doctor/explain으로 고칠 수 있어야 한다. 하지만 Dreampia가 책임지는 것은 코드 구현 오케스트레이션이 아니라 PRD, TRD, IA, user-flow, API spec, ERD, QA, doc-audit가 연결된 문서 운영/검증 오케스트레이션이어야 한다.

## LazyCodex에서 배울 점

### 1. 하나의 기본 설치 경로

LazyCodex는 `npx lazycodex-ai install`을 전면에 둔다. 전역 설치 없이 한 줄로 시작하고, Codex marketplace 설치는 부가 경로로 둔다.

Dreampia도 지금의 `curl | bash`, `bash install.sh`, plugin marketplace, `npx github:...`가 모두 있지만 첫 화면에서 너무 많은 선택지를 주면 초보자는 멈춘다.

권장 방향:

```bash
npx dreampia-dev-kit install
```

또는 npm publish 전까지:

```bash
npx github:eonofpixel/dreampia-dev-kit install
```

이 명령 하나가 Codex와 Claude Code 환경을 감지하고, 가능한 설치 경로를 제안하거나 자동 설치해야 한다.

### 2. 설치 후 바로 확인하는 doctor

LazyCodex는 `npx lazycodex-ai doctor`로 plugin cache, hooks, MCP server, agent role, config 상태를 확인한다.

Dreampia도 설치 후 사용자가 제일 먼저 겪는 문제는 "설치된 것 같은데 어디서 어떻게 불러야 하지?"다. 그래서 `validate-skill-pack`은 개발자용이고, 사용자용 진단은 따로 있어야 한다.

권장 방향:

```bash
dreampia-dev-kit doctor
```

확인할 항목:

- Codex skill 설치 여부
- Codex prompt shortcut 설치 여부
- Claude Code skill 설치 여부
- Claude Code command shortcut 설치 여부
- plugin manifest 버전 일치
- 현재 repo에 `docs/` 문서팩이 있는지
- `validate docs/` 실행 가능 여부
- 다음에 입력할 실제 명령 예시

### 3. 명령 기둥을 단순하게 유지

LazyCodex는 `$init-deep`, `$ulw-plan`, `$start-work`, `$ulw-loop` 같은 command pillars를 앞에 세운다. 많은 skill이 있어도 사용자가 처음 기억할 것은 몇 개뿐이다.

Dreampia도 8개 core skill과 여러 shortcut을 전부 외우게 하면 안 된다. 초보자용 명령 기둥은 5개 이내가 좋다.

권장 Dreampia command pillars:

| Pillar | CLI | Agent command | 목적 |
|---|---|---|---|
| Start | `dreampia-dev-kit guide "idea"` | `/dreampia-dev-kit:doc-pack` | 모호한 아이디어를 문서팩 요청으로 바꿈 |
| Init | `dreampia-dev-kit init docs/` | `/dreampia-dev-kit:doc-pack` | 문서 폴더와 starter templates 생성 |
| Check | `dreampia-dev-kit validate docs/` | `/dreampia-dev-kit:doc-audit` | 구조 점수와 content-risk gate |
| Explain | `dreampia-dev-kit explain docs/` | `/dreampia-dev-kit:doc-audit` | 실패 원인을 사람이 고칠 수 있게 설명 |
| Doctor | `dreampia-dev-kit doctor` | `/dreampia-dev-kit:doctor` later | 설치, skill, shortcut, 문서 상태 진단 |

### 4. CLI와 in-session skill의 역할 구분

oh-my-claudecode 문서는 terminal CLI와 in-session skill을 분명히 나눈다. CLI는 setup/update/CI-safe checks, slash command는 Claude Code 세션 안의 interactive workflow로 설명한다.

Dreampia도 이 구분을 더 강하게 해야 한다.

권장 원칙:

- CLI는 파일 시스템에 있는 문서를 만들고 검사하는 deterministic surface다.
- Agent skill은 사용자의 아이디어를 문서로 풀어내는 conversational surface다.
- README에서는 이 둘을 같은 기능처럼 말하지 말고, "언제 CLI를 쓰고 언제 agent command를 쓰는지"를 먼저 보여준다.

### 5. 명령이 없거나 다르게 작동하는 문제를 피하기

LazyCodex issue #36은 설치는 된 것처럼 보이지만 문서화된 command와 실제 Codex command surface가 어긋날 수 있음을 보여준다.

Dreampia는 이 실수를 피해야 한다.

규칙:

- README에 쓰는 모든 명령은 CI나 smoke test에서 확인한다.
- Codex, Claude Code, CLI 각각에서 실제 호출명이 다르면 표로 분리한다.
- "optional shortcut"은 primary path처럼 보이게 쓰지 않는다.
- 설치 후 `doctor`가 "지금 이 환경에서 실제로 가능한 호출"을 출력한다.

## Dreampia의 포지션

### 하지 말아야 할 것

- LazyCodex처럼 full code agent harness가 되려고 하지 않는다.
- hooks, model routing, autonomous permission mode를 v0.x 핵심으로 삼지 않는다.
- "개발을 대신 끝내는 도구"라고 말하지 않는다.
- slash command 수를 늘리는 것으로 성능이 좋아진다고 착각하지 않는다.

### 해야 할 것

- 문서 생성 전 과정을 보이게 만든다.
- 초보자가 무엇을 결정해야 하는지 알 수 있게 만든다.
- AI가 만든 문서를 구현 전에 검증한다.
- 실패를 수치가 아니라 다음 행동으로 번역한다.
- Codex와 Claude Code 모두에서 같은 문서 시스템을 쓴다.
- 문서 생성, 정렬, 검증, 설명, 다음 행동을 하나의 운영 루프로 오케스트레이션한다.

추천 포지셔닝:

```text
Dreampia is the documentation operations and verification orchestrator for vibe coding.
```

한국어 메시지:

```text
바이브코딩을 처음 하는 사람도 PRD, 기술 설계, API, 데이터, QA를 같은 지도 위에서 만들고, 맞추고, 검증하고, 고칠 수 있게 만드는 문서 운영 검증 오케스트레이션 에이전트.
```

## 제안하는 사용자 경험

### 30초 루프

```bash
npx dreampia-dev-kit guide "workspace invitations"
```

출력:

```text
1. Paste this into Codex or Claude Code:
   /dreampia-dev-kit:doc-pack ...

2. After the agent writes docs, run:
   dreampia-dev-kit validate docs/

3. If it fails, run:
   dreampia-dev-kit explain docs/
```

### 첫 프로젝트 초기화

```bash
dreampia-dev-kit init docs/ --feature FEATURE-001 --name "workspace invitations"
```

생성물:

```text
docs/
├── project-brief.md
├── prd.md
├── trd.md
├── ia.md
├── user-flow.md
├── api-spec.md
├── erd.md
├── qa-checklist.md
└── doc-audit-report.md
```

초보자에게 중요한 점은 빈 파일이 아니라 "무엇을 채워야 하는지"가 보이는 starter 문서다.

### 설치 진단

```bash
dreampia-dev-kit doctor
```

예상 출력:

```text
Dreampia doctor

Codex skills: installed
Codex shortcuts: installed
Claude Code skills: missing
Claude Code commands: installed
Current docs folder: docs/ found
Validation: passed

Try next:
- In Codex: $prd Draft a PRD for workspace invitations.
- In Claude Code plugin: /dreampia-dev-kit:doc-pack ...
- In terminal: dreampia-dev-kit validate docs/
```

## 제품 구조 제안

### Surface 1: CLI

CLI는 사용자가 복붙해서 실행할 수 있어야 한다.

우선순위:

1. `guide`
2. `init`
3. `validate`
4. `explain`
5. `doctor`
6. `install`
7. `update`
8. `uninstall`

`install`, `update`, `uninstall`은 실제 파일을 만지므로 dry-run과 명확한 출력이 필요하다.

향후 상위 명령:

```bash
dreampia-dev-kit orchestrate docs/
dreampia-dev-kit doc-ops docs/
```

이 명령은 현재 문서팩 상태를 읽고 다음 문서 운영 작업, 검증 명령, 에이전트 prompt를 제안한다. 기본값은 read-only여야 한다.

### Surface 2: Agent skills

Agent skill은 문서 작성과 사고 정리에 집중한다.

우선순위:

1. `doc-pack`
2. `prd`
3. `trd`
4. `api-spec`
5. `erd`
6. `qa-checklist`
7. `doc-audit`

IA와 user-flow는 doc-pack 안에 자연스럽게 포함하고, 고급 사용자에게만 개별 호출을 노출해도 된다.

### Surface 3: Examples

LazyCodex류 도구는 "설치하면 뭔가 강력해 보이는" 인상이 있다. Dreampia는 그 대신 "생성물이 진짜 쓸만해 보이는" 인상이 필요하다.

필수 예제:

- `examples/ecommerce`: 이미 좋음
- `examples/b2b-saas`: workspace, role, billing, invitation
- `examples/fix-before-after`: 나쁜 문서와 `explain` 후 수정된 문서 비교

`fix-before-after`가 특히 중요하다. 초보자는 좋은 예제보다 "틀렸을 때 어떻게 고치는지"에서 더 많이 배운다.

## 단계별 구현 계획

### v0.3.x

- `dreampia-dev-kit init docs/` 추가
- `dreampia-dev-kit doctor` 추가
- README 첫 화면을 "guide -> doc-pack -> validate -> explain" 중심으로 재배치
- `docs/fix-before-after/` 예제 추가
- CLI smoke test에 README 명령 검증 추가

### v0.4

- doc-audit engine 확장
- `related_docs` 깨진 링크 탐지
- PRD acceptance criteria와 QA checklist 연결 탐지
- API spec endpoint와 TRD component 연결 탐지
- `explain`에서 "고칠 순서" 자동 정렬

### v0.5

- code-to-docs suggestion 추가
- 안전한 read-only 분석 먼저 제공
- 사용자가 승인하기 전에는 문서 overwrite 금지
- framework별 adapter는 나중에 추가

### v1.0

- npm package 정식 publish
- `npx dreampia-dev-kit install`을 primary install로 전환
- Codex/Claude Code marketplace install 문서와 terminal install 문서를 하나의 decision table로 정리
- Korean/English README 모두 같은 온보딩 흐름 유지

## 리스크와 대응

| 리스크 | 설명 | 대응 |
|---|---|---|
| 범위 과확장 | LazyCodex처럼 code agent harness가 되려 하면 구현/검증 범위가 폭발함 | documentation operations and verification orchestrator로 제한 |
| 설치 혼란 | Codex, Claude Code, CLI 호출명이 다름 | `doctor`와 invocation matrix 유지 |
| 데모 약함 | 문서 도구는 orchestration 도구보다 덜 화려해 보임 | before/after 예제와 explain 리포트로 가치 증명 |
| 초보자 과부하 | PRD/TRD/API/ERD 용어가 많음 | `guide`, `init`, `doc-pack`으로 첫 선택을 단순화 |
| 신뢰 부족 | AI 생성 문서가 그럴듯하지만 틀릴 수 있음 | validate/explain/doc-audit를 구현 전 gate로 고정 |

## 성공 기준

단기 성공 기준:

- 새 사용자가 README만 보고 5분 안에 문서팩 생성 요청을 할 수 있다.
- 설치 후 `doctor`가 현재 사용 가능한 호출 방식을 알려준다.
- 실패한 문서를 `explain`으로 보고 무엇을 고쳐야 하는지 알 수 있다.
- README의 모든 명령이 smoke test 또는 CI에서 검증된다.

중기 성공 기준:

- "Dreampia는 LazyCodex의 문서 운영/검증 버전"이라는 설명이 통한다.
- 하지만 "Dreampia는 코드 구현 오케스트레이터가 아니라 문서 운영 검증 오케스트레이터"라는 차이가 분명하다.
- 초보자도 PRD, API, ERD, QA가 왜 필요한지 결과물 속에서 배운다.

## 참고한 자료

- LazyCodex README: <https://github.com/code-yeongyu/lazycodex>
- LazyCodex configuration docs: <https://github.com/code-yeongyu/lazycodex/blob/main/packages/web/content/docs/configuration.md>
- LazyCodex skills docs: <https://github.com/code-yeongyu/lazycodex/blob/main/packages/web/content/docs/skills.md>
- LazyCodex macOS install issue: <https://github.com/code-yeongyu/lazycodex/issues/36>
- oh-my-claudecode README: <https://github.com/Yeachan-Heo/oh-my-claudecode>
- oh-my-claudecode reference docs: <https://github.com/Yeachan-Heo/oh-my-claudecode/blob/main/docs/REFERENCE.md>
