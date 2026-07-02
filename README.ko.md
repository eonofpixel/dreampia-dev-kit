# dreampia-dev-kit

Codex, Claude Code, AI 코딩 에이전트와 함께 쓰는 documentation-first 개발 문서 스킬팩입니다.

아이디어가 코드로 바로 흘러가기 전에 PRD, TRD, IA, API Spec, ERD, QA 문서를 먼저 정리하고 서로 연결되게 만드는 것이 목표입니다.

Spec-driven implementation platform을 대체하려는 프로젝트는 아닙니다. Dreampia의 포지션은 문서 품질 레이어입니다. 먼저 연결된 개발 문서를 만들고, 그 문서가 코드로 넘어가기 전에 구조 점수와 content-risk audit으로 위험을 잡습니다.

## 왜 중요한가

AI 코딩은 개발을 더 어려운 블랙박스로 만들면 안 됩니다. 오히려 개발 과정을 더 많은 사람에게 열어줘야 합니다.

Dreampia는 바이브코딩을 처음 하는 사람, 개발을 잘 모르는 사람, 혼자 제품을 만들고 싶은 사람도 같은 출발선에서 개발 과정을 따라갈 수 있게 돕는 것을 목표로 합니다. 무엇을 결정해야 하는지, 무엇을 문서화해야 하는지, 무엇을 테스트해야 하는지, 어디가 위험한지, 다음 행동이 무엇인지 보이게 만드는 도구입니다.

좋은 생성물은 초보자와 숙련자가 같은 지도를 보고 일하게 해야 합니다. 숨은 시니어 지식을 당연하게 요구하거나, 덜 정리된 아이디어를 부끄럽게 만들거나, AI의 자신감을 검토되지 않은 구현으로 밀어붙이면 안 됩니다.

## 한눈에 보기

| 필요할 때 | 사용 문서 |
|---|---|
| 제품 범위와 요구사항 정리 | `skills/prd/SKILL.md`, `templates/prd.md` |
| 기술 구현 방향 정리 | `skills/trd/SKILL.md`, `templates/trd.md` |
| 화면, 라우트, 사용자 흐름 정리 | `skills/ia/SKILL.md`, `skills/user-flow/SKILL.md` |
| API와 데이터 모델 정리 | `skills/api-spec/SKILL.md`, `skills/erd/SKILL.md` |
| QA와 릴리즈 검증 정리 | `skills/qa-checklist/SKILL.md` |
| 문서 누락과 불일치 점검 | `skills/doc-audit/SKILL.md` |

## 경쟁 프로젝트와의 차이

[GitHub Spec Kit](https://github.com/github/spec-kit), [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD), [OpenSpec](https://github.com/Fission-AI/OpenSpec), [Agent OS](https://github.com/buildermethods/agent-os)는 더 넓은 spec-driven development와 구현 워크플로에 강합니다.

Dreampia는 PRD, TRD, IA, user-flow, API spec, ERD, QA checklist, doc-audit 같은 agent-readable 개발 문서와 그 문서의 품질 검증에 집중합니다.

자세한 비교는 [Competitive Landscape](docs/COMPETITIVE_LANDSCAPE.md)를 참고하세요.

## 60초 설치

```bash
git clone https://github.com/eonofpixel/dreampia-dev-kit.git
cd dreampia-dev-kit
bash install.sh
node bin/dreampia-dev-kit.js validate-skill-pack
```

처음 시작하는 경우:

```bash
node bin/dreampia-dev-kit.js guide "작은 쇼핑몰 guest checkout"
```

starter docs 폴더를 바로 만들려면:

```bash
node bin/dreampia-dev-kit.js init docs/ --feature CHECKOUT-001 --name "guest checkout"
```

설치와 문서 상태를 확인하려면:

```bash
node bin/dreampia-dev-kit.js doctor --docs docs/
```

GitHub에서 바로 설치하려면:

```bash
curl -fsSL https://raw.githubusercontent.com/eonofpixel/dreampia-dev-kit/main/install.sh | bash
```

에이전트에게 이렇게 요청합니다.

```text
skills/prd/SKILL.md와 templates/prd.md를 사용해서 워크스페이스 초대 기능 PRD를 작성해줘.
```

## 30초 데모

바이브코딩이 처음이라면 guide부터 시작합니다.

```bash
npx github:eonofpixel/dreampia-dev-kit guide "워크스페이스 초대"
```

에이전트와 대화하기 전에 파일 구조부터 만들고 싶다면 starter docs를 생성합니다.

```bash
npx github:eonofpixel/dreampia-dev-kit init docs/ --feature INVITE-001 --name "워크스페이스 초대"
```

에이전트에게 문서팩을 요청합니다.

```text
/dreampia-dev-kit:doc-pack guest checkout 기능의 PRD, TRD, IA, user-flow, API spec, ERD, QA checklist, doc-audit 문서를 작성해줘.
```

생성된 문서를 점수화하고 내용 위험을 감사합니다.

```bash
node bin/dreampia-dev-kit.js validate docs/
```

실패했다면 사람이 이해하기 쉬운 설명 리포트를 확인합니다.

```bash
node bin/dreampia-dev-kit.js explain docs/
```

[Ecommerce 예제](examples/ecommerce)는 목표 형태를 보여줍니다. 연결된 PRD/TRD/IA/user-flow/API/ERD/QA/audit 문서가 구조 점수와 content-risk audit을 모두 통과합니다.

checkout 없이 GitHub에서 바로 실행할 수도 있습니다.

```bash
npx github:eonofpixel/dreampia-dev-kit init docs/ --feature INVITE-001 --name "워크스페이스 초대"
npx github:eonofpixel/dreampia-dev-kit doctor --docs docs/
npx github:eonofpixel/dreampia-dev-kit validate docs/
npx github:eonofpixel/dreampia-dev-kit explain docs/
```

전체 흐름은 [초보자 가이드](docs/BEGINNER_GUIDE.ko.md)를 참고하세요.

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
docs/COMPETITIVE_LANDSCAPE.md
                        오픈소스 경쟁/포지셔닝 정리
scripts/                설치, 동기화, 검증 스크립트
bin/dreampia-dev-kit.js dependency-free CLI gate
install.sh              Codex와 Claude Code용 터미널 설치 스크립트
```

루트 `skills/`가 원본입니다. skill을 수정한 뒤에는 아래 명령을 실행합니다.

```bash
bash scripts/sync-plugin-skills.sh
node bin/dreampia-dev-kit.js validate-skill-pack
```

## 검증

```bash
node bin/dreampia-dev-kit.js validate-skill-pack
node bin/dreampia-dev-kit.js guide "워크스페이스 초대"
node bin/dreampia-dev-kit.js init docs/ --feature INVITE-001 --name "워크스페이스 초대"
node bin/dreampia-dev-kit.js doctor --docs docs/
node bin/dreampia-dev-kit.js score docs/
node bin/dreampia-dev-kit.js audit docs/
node bin/dreampia-dev-kit.js validate docs/
node bin/dreampia-dev-kit.js explain docs/
```

`init`은 표준 frontmatter와 추적 신호가 들어간 PRD, TRD, IA, user-flow, API spec, ERD, QA checklist, doc-audit starter 파일을 생성합니다.

`doctor`는 로컬 Codex/Claude Code 설치 위치, plugin manifest 버전 정렬, generated docs 개수, 선택한 docs 폴더의 `validate` 통과 여부를 확인합니다.

`validate-skill-pack`은 core skill, template frontmatter, 예제 문서, shortcut, plugin manifest, plugin skill 복사본 동기화를 확인합니다.

실제 agent가 생성한 문서는 아래처럼 점수화할 수 있습니다.

```bash
node bin/dreampia-dev-kit.js score docs/
```

이 스크립트는 표준 frontmatter, 예상 `##` 섹션, 문서 owner, ID, `REQ-###`, `PAGE-###`, HTTP method, primary key, `QA-###` 같은 문서별 신호를 확인합니다.

생성물의 내용 위험은 별도 감사 명령으로 확인합니다.

```bash
node bin/dreampia-dev-kit.js audit docs/
```

내용 감사는 기본적으로 major finding에서 실패합니다. 토큰/API key/payment secret 노출, 원문 secret 저장, raw payment card data, 개인정보 보존 정책 누락, 정책 충돌, 근거 없는 구현 결정, 깨진 참조, 반복되는 open question을 확인합니다. 리포트만 보고 싶으면 `--fail-on none`, 자동화에 붙이려면 `--json`을 사용합니다.

검증 결과를 초보자도 고칠 수 있는 형태로 풀어보려면 아래 명령을 사용합니다.

```bash
node bin/dreampia-dev-kit.js explain docs/
```

설명 리포트는 반드시 고칠 것, 권장 개선, learning note로 결과를 나누어 구현 전에 무엇을 정리해야 하는지 보여줍니다.

GitHub Actions도 `main`, pull request, manual dispatch에서 validation, 예제 content-risk audit, CLI smoke test, shell syntax check, installer smoke test를 실행합니다. 릴리즈 전에는 [release process](docs/RELEASE_PROCESS.md)와 [marketplace verification checklist](docs/MARKETPLACE_VERIFICATION.md)를 사용합니다.

## 현재 상태

현재 릴리즈: [v0.3.0](https://github.com/eonofpixel/dreampia-dev-kit/releases/tag/v0.3.0)

현재 릴리즈는 Markdown-first skill pack에 generated docs 품질을 확인하는 dependency-free CLI gate와 쉬운 설명 리포트를 더한 버전입니다.

## 라이선스

[MIT](LICENSE)
