# dreampia-dev-kit

Codex, Claude Code, AI 코딩 에이전트와 함께 쓰는 documentation-first 개발 문서 스킬팩입니다.

아이디어가 코드로 바로 흘러가기 전에 PRD, TRD, IA, API Spec, ERD, QA 문서를 먼저 정리하고 서로 연결되게 만드는 것이 목표입니다.

## 한눈에 보기

| 필요할 때 | 사용 문서 |
|---|---|
| 제품 범위와 요구사항 정리 | `skills/prd/SKILL.md`, `templates/prd.md` |
| 기술 구현 방향 정리 | `skills/trd/SKILL.md`, `templates/trd.md` |
| 화면, 라우트, 사용자 흐름 정리 | `skills/ia/SKILL.md`, `skills/user-flow/SKILL.md` |
| API와 데이터 모델 정리 | `skills/api-spec/SKILL.md`, `skills/erd/SKILL.md` |
| QA와 릴리즈 검증 정리 | `skills/qa-checklist/SKILL.md` |
| 문서 누락과 불일치 점검 | `skills/doc-audit/SKILL.md` |

## 60초 설치

```bash
git clone https://github.com/eonofpixel/dreampia-dev-kit.git
cd dreampia-dev-kit
bash install.sh
node scripts/validate-skill-pack.js
```

GitHub에서 바로 설치하려면:

```bash
curl -fsSL https://raw.githubusercontent.com/eonofpixel/dreampia-dev-kit/main/install.sh | bash
```

에이전트에게 이렇게 요청합니다.

```text
skills/prd/SKILL.md와 templates/prd.md를 사용해서 워크스페이스 초대 기능 PRD를 작성해줘.
```

## Codex / Claude Code 설치

| 에이전트 | 터미널 설치 | 에이전트 안에서 plugin 설치 |
|---|---|---|
| Codex | `bash install.sh --agent codex` | `/plugins`에서 `https://github.com/eonofpixel/dreampia-dev-kit` 추가 |
| Claude Code | `bash install.sh --agent claude-code` | `/plugin marketplace add https://github.com/eonofpixel/dreampia-dev-kit` 후 `/plugin install dreampia-dev-kit` |

CLI marketplace 설치도 지원합니다.

```bash
codex plugin marketplace add https://github.com/eonofpixel/dreampia-dev-kit
codex plugin add dreampia-dev-kit@dreampia-dev-kit

claude plugin marketplace add https://github.com/eonofpixel/dreampia-dev-kit
claude plugin install dreampia-dev-kit@dreampia-dev-kit
```

설치 후 새 세션에서 에이전트에 맞는 호출 방식을 사용합니다.

| 실행 환경 | 기본 호출 | 선택형 단축키 |
|---|---|---|
| Codex app | `/`를 입력해 Dreampia skill 선택, 또는 `$prd` | `/prompts:dreampia-prd FEATURE="워크스페이스 초대"` |
| Codex CLI/IDE | `$prd`, `$api-spec`, `$doc-audit` | `/prompts:dreampia-audit DOCS="docs/"` |
| Claude Code 개인 skills | `/prd`, `/api-spec`, `/doc-audit` | `/dreampia-prd`, `/dreampia-api`, `/dreampia-doc-pack` |
| Claude Code plugin | `/dreampia-dev-kit:prd`, `/dreampia-dev-kit:doc-audit` | `/dreampia-dev-kit:api`, `/dreampia-dev-kit:qa`, `/dreampia-dev-kit:doc-pack` |

Codex의 `/prompts:*` 단축키는 편의용으로 설치됩니다. Codex의 기본 재사용 워크플로는 skill입니다.

```text
/dreampia-dev-kit:prd 워크스페이스 초대 기능 PRD를 작성해줘.
/dreampia-dev-kit:doc-audit docs/의 문서 누락과 drift를 점검해줘.
/prompts:dreampia-api FEATURE="워크스페이스 초대"
```

자세한 설치법은 [Codex와 Claude Code 설치 가이드](docs/INSTALLATION.ko.md)를 참고하세요.

## 예제 보기

Dreampia 문서가 product, technical, UX, API, data, QA, audit 작업을 어떻게 연결하는지 보려면 아래 예제를 참고합니다.

| 예제 | 시나리오 | 보기 좋은 지점 |
|---|---|---|
| [Small service](examples/small-service) | 작은 팀 노트 서비스에 매직 링크 로그인을 추가합니다. | 단순한 end-to-end feature docs |
| [Ecommerce](examples/ecommerce) | 작은 쇼핑몰에 guest checkout, inventory reservation, payment authorization을 추가합니다. | 문서 간 dependency와 audit finding |

Small service 포함 문서:

- [Project brief](examples/small-service/project-brief.md)
- [PRD](examples/small-service/prd.md)
- [TRD](examples/small-service/trd.md)
- [IA](examples/small-service/ia.md)
- [User flow](examples/small-service/user-flow.md)
- [API spec](examples/small-service/api-spec.md)
- [ERD](examples/small-service/erd.md)
- [QA checklist](examples/small-service/qa-checklist.md)
- [Doc audit report](examples/small-service/doc-audit-report.md)

Ecommerce 포함 문서:

- [Project brief](examples/ecommerce/project-brief.md)
- [PRD](examples/ecommerce/prd.md)
- [TRD](examples/ecommerce/trd.md)
- [IA](examples/ecommerce/ia.md)
- [User flow](examples/ecommerce/user-flow.md)
- [API spec](examples/ecommerce/api-spec.md)
- [ERD](examples/ecommerce/erd.md)
- [QA checklist](examples/ecommerce/qa-checklist.md)
- [Doc audit report](examples/ecommerce/doc-audit-report.md)

## 핵심 스킬

| 스킬 | 사용 시점 |
|---|---|
| `prd` | 제품 요구사항, MVP 범위, user story, acceptance criteria |
| `trd` | 기술 요구사항, 아키텍처 제약, 보안, 성능 |
| `ia` | 사이트맵, 페이지 계층, 라우트, 접근 권한 |
| `user-flow` | happy path, alternative path, error path, 상태 전이 |
| `api-spec` | endpoint, request/response schema, auth, error code |
| `erd` | entity, table, relationship, index, constraint |
| `qa-checklist` | QA check, regression check, UAT, release verification |
| `doc-audit` | 문서 drift, 깨진 참조, 모호한 요구사항 |

## 저장소 구조

```text
skills/                 핵심 agent skill
templates/              재사용 가능한 Markdown 템플릿
examples/               전체 문서 예제
plugins/dreampia-dev-kit/
  .codex-plugin/        Codex plugin manifest
  .claude-plugin/       Claude Code plugin manifest
  commands/             Claude Code plugin command alias
  skills/               패키징용 skill 복사본
shortcuts/              개인 설치용 Codex prompt, Claude command shortcut
docs/INSTALLATION.ko.md 설치 가이드
scripts/                설치, 동기화, 검증 스크립트
install.sh              Codex와 Claude Code용 터미널 설치 스크립트
```

루트 `skills/`가 원본입니다. skill을 수정한 뒤에는 아래 명령을 실행합니다.

```bash
bash scripts/sync-plugin-skills.sh
node scripts/validate-skill-pack.js
```

## 검증

```bash
node scripts/validate-skill-pack.js
```

이 명령은 core skill, template frontmatter, 예제 문서, shortcut, plugin manifest, plugin skill 복사본 동기화를 확인합니다.

GitHub Actions도 `main`, pull request, manual dispatch에서 validation, shell syntax check, installer smoke test를 실행합니다. 릴리즈 전에는 [release process](docs/RELEASE_PROCESS.md)와 [marketplace verification checklist](docs/MARKETPLACE_VERIFICATION.md)를 사용합니다.

## 현재 상태

현재 릴리즈: [v0.1.3](https://github.com/eonofpixel/dreampia-dev-kit/releases/tag/v0.1.3)

v0.1은 CLI 없이 쓸 수 있는 Markdown-first skill pack입니다. TypeScript CLI는 skill과 template 시스템이 안정화된 뒤 추가할 예정입니다.

## 라이선스

[MIT](LICENSE)
