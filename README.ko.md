# dreampia-dev-kit

Codex, Claude Code, AI 코딩 에이전트와 함께 사용하는 개발 문서 자동화 스킬/플러그인 키트입니다.

## 목표

AI가 코드를 빠르게 작성하더라도 개발팀에는 여전히 다음 문서가 필요합니다.

- PRD
- TRD
- IA
- User Flow
- API 명세서
- ERD
- QA 체크리스트
- 테스트 케이스
- 릴리즈노트
- Runbook

`dreampia-dev-kit`은 이 문서들을 AI 개발 플로우 안에서 생성, 검토, 동기화하기 위한 오픈소스 프로젝트입니다.

## v0.1 목표

처음 버전은 복잡한 CLI보다 Markdown-first 스킬팩에 집중합니다.

포함 항목:

- `AGENTS.md`
- 핵심 `skills/*/SKILL.md`
- `templates/*.md`
- `examples/small-service/` 예제 문서 세트
- Codex 개발용 부트스트랩 프롬프트
- Codex와 Claude Code 설치 경로
- 향후 CLI로 확장 가능한 구조

## 먼저 Codex에게 시킬 일

Codex에서 저장소를 열고 아래처럼 요청하세요.

```text
AGENTS.md와 CODEX_BOOTSTRAP_PROMPT.md를 읽고, v0.1 Markdown-first skill pack을 구현해줘.
```

## v0.1 사용 방법

v0.1은 CLI 설치 없이 Markdown 파일만으로 사용할 수 있습니다.

1. 만들 문서에 맞는 `skills/<skill-name>/SKILL.md`를 고릅니다.
2. Codex에게 해당 skill과 관련 template을 사용하라고 요청합니다.
3. `templates/`의 문서를 프로젝트의 `docs/` 구조에 복사해 작성합니다.
4. `DOC_SYSTEM.md`의 frontmatter와 문서 ID 규칙을 유지합니다.
5. 구현 전이나 릴리즈 전에 `doc-audit`으로 문서 누락과 불일치를 점검합니다.

예시:

```text
skills/prd/SKILL.md와 templates/prd.md를 사용해서 워크스페이스 초대 기능 PRD를 작성해줘.
```

## 예제 보기

[examples/small-service](examples/small-service)는 매직 링크 로그인 기능을 PRD, TRD, IA, user-flow, API spec, ERD, QA checklist, doc-audit report까지 연결한 예제입니다.

## Codex / Claude Code 설치

자세한 설치법은 [docs/INSTALLATION.ko.md](docs/INSTALLATION.ko.md)를 참고하세요.

개인 skills로 빠르게 설치:

```bash
bash scripts/install-codex.sh
bash scripts/install-claude-code.sh
```

로컬 plugin marketplace로 설치:

```bash
codex plugin marketplace add .
codex plugin add dreampia-dev-kit@dreampia-dev-kit

claude plugin marketplace add .
claude plugin install dreampia-dev-kit@dreampia-dev-kit
```

plugin 설치 후에는 namespaced skill을 호출합니다.

```text
/dreampia-dev-kit:prd 워크스페이스 초대 기능 PRD를 작성해줘.
/dreampia-dev-kit:doc-audit docs/의 문서 누락과 drift를 점검해줘.
```

## 검증

변경 후에는 아래 명령으로 스킬팩 구조를 검증합니다.

```bash
node scripts/validate-skill-pack.js
```

## 핵심 스킬

| 스킬 | 설명 |
|---|---|
| `prd` | 제품 요구사항 정의서 작성 |
| `trd` | 기술 요구사항 정의서 작성 |
| `ia` | 정보구조도 작성 |
| `user-flow` | 사용자 흐름 작성 |
| `api-spec` | API 명세서 작성 |
| `erd` | DB/ERD 문서 작성 |
| `qa-checklist` | QA 체크리스트 작성 |
| `doc-audit` | 문서 간 누락/모순/불일치 검사 |

## 핵심 방향

```text
빠르게 개발하되, 문서가 무너지지 않게 한다.
```

## 이후 확장

- v0.2: marketplace 배포 정리와 TypeScript CLI 검증
- v0.3: TypeScript CLI와 `validate-skills`
- v0.4: 문서 간 drift를 찾는 audit engine
