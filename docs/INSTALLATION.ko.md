# 설치 방법

`dreampia-dev-kit`은 두 가지 방식으로 사용할 수 있습니다.

- 각 에이전트의 skills 디렉터리에 Markdown skill을 복사해서 사용
- Codex 또는 Claude Code의 로컬 plugin marketplace로 설치해서 사용

원본은 루트 `skills/`입니다. 배포용 plugin 복사본은 `plugins/dreampia-dev-kit/skills/`에 둡니다.

## 추천 터미널 설치

Codex와 Claude Code 둘 다 설치:

```bash
curl -fsSL https://raw.githubusercontent.com/eonofpixel/dreampia-dev-kit/main/install.sh | bash
```

하나만 설치:

```bash
curl -fsSL https://raw.githubusercontent.com/eonofpixel/dreampia-dev-kit/main/install.sh | bash -s -- --agent codex
curl -fsSL https://raw.githubusercontent.com/eonofpixel/dreampia-dev-kit/main/install.sh | bash -s -- --agent claude-code
```

로컬 checkout에서 설치:

```bash
bash install.sh
bash install.sh --agent codex
bash install.sh --agent claude-code
```

## 호출 방식 빠른 참고

| 실행 환경 | 기본 호출 | 선택형 단축키 |
|---|---|---|
| Codex app | `/`를 입력해 Dreampia skill 선택, 또는 `$prd` | `/prompts:dreampia-prd FEATURE="워크스페이스 초대"` |
| Codex CLI/IDE | `$prd`, `$api-spec`, `$doc-audit` | `/prompts:dreampia-audit DOCS="docs/"` |
| Claude Code 개인 skills | `/prd`, `/api-spec`, `/doc-audit` | `/dreampia-prd`, `/dreampia-api`, `/dreampia-doc-pack` |
| Claude Code plugin | `/dreampia-dev-kit:prd`, `/dreampia-dev-kit:doc-audit` | `/dreampia-dev-kit:api`, `/dreampia-dev-kit:qa`, `/dreampia-dev-kit:doc-pack` |

Codex의 prompt shortcut은 slash command로 여전히 동작해서 편의용으로 설치합니다. 다만 Codex 공식 문서에서는 custom prompt를 deprecated로 표시하므로, 재사용 워크플로의 기본은 Dreampia skill로 봅니다.

## Codex 설치

### 방법 A: 개인 skills로 설치

Codex skills 디렉터리에 skill을 설치하고, Codex prompts 디렉터리에 선택형 shortcut을 설치합니다.

```bash
bash scripts/install-codex.sh
```

같은 이름의 skill이 이미 있고 교체하려면:

```bash
bash scripts/install-codex.sh --force
```

새 Codex 세션을 시작한 뒤 이렇게 호출합니다.

```text
/prd 워크스페이스 초대 기능 PRD를 작성해줘.
/doc-audit docs/의 문서 누락과 drift를 점검해줘.
$prd 워크스페이스 초대 기능 PRD를 작성해줘.
/prompts:dreampia-prd FEATURE="워크스페이스 초대"
```

### 방법 B: 로컬 Codex plugin marketplace로 설치

GitHub 저장소에서 plugin으로 설치할 때 사용합니다.

```bash
codex plugin marketplace add https://github.com/eonofpixel/dreampia-dev-kit
codex plugin add dreampia-dev-kit@dreampia-dev-kit
```

로컬 checkout을 검증할 때는 GitHub URL 대신 `.`을 사용합니다.

새 Codex 세션을 시작한 뒤 namespaced skill을 호출합니다.

```text
/dreampia-dev-kit:prd 워크스페이스 초대 기능 PRD를 작성해줘.
/dreampia-dev-kit:doc-audit docs/의 문서 누락과 drift를 점검해줘.
$dreampia-dev-kit:prd 워크스페이스 초대 기능 PRD를 작성해줘.
```

## Claude Code 설치

### 방법 A: 개인 skills로 설치

Claude Code skills 디렉터리에 skill을 설치하고, commands 디렉터리에 `/dreampia-*` shortcut을 설치합니다.

```bash
bash scripts/install-claude-code.sh
```

같은 이름의 skill이 이미 있고 교체하려면:

```bash
bash scripts/install-claude-code.sh --force
```

새 Claude Code 세션을 시작한 뒤 이렇게 호출합니다.

```text
/prd 워크스페이스 초대 기능 PRD를 작성해줘.
/doc-audit docs/의 문서 누락과 drift를 점검해줘.
/dreampia-prd 워크스페이스 초대 기능 PRD를 작성해줘.
/dreampia-doc-pack 워크스페이스 초대 기능 문서팩을 초안 작성해줘.
```

### 방법 B: 로컬 Claude Code plugin으로 테스트

```bash
claude --plugin-dir ./plugins/dreampia-dev-kit
```

Claude Code 안에서 다음처럼 호출합니다.

```text
/dreampia-dev-kit:prd 워크스페이스 초대 기능 PRD를 작성해줘.
/dreampia-dev-kit:api 워크스페이스 초대 기능 API spec을 작성해줘.
```

### 방법 C: 로컬 Claude Code marketplace로 설치

```bash
claude plugin marketplace add https://github.com/eonofpixel/dreampia-dev-kit
claude plugin install dreampia-dev-kit@dreampia-dev-kit
```

로컬 checkout을 검증할 때는 GitHub URL 대신 `.`을 사용합니다.

Claude Code를 재시작한 뒤 namespaced skill을 호출합니다.

```text
/dreampia-dev-kit:doc-audit docs/의 문서 누락과 drift를 점검해줘.
/dreampia-dev-kit:qa 워크스페이스 초대 기능 QA checklist를 작성해줘.
```

## Plugin 복사본 갱신

루트 `skills/`를 수정한 뒤에는 배포용 plugin 복사본을 동기화합니다.

```bash
bash scripts/sync-plugin-skills.sh
```

검증:

```bash
node bin/dreampia-dev-kit.js validate-skill-pack
claude plugin validate plugins/dreampia-dev-kit
claude plugin validate .
```

## 생성 문서 검증

Codex 또는 Claude Code가 문서팩을 생성한 뒤 로컬 checkout에서 CLI gate를 실행합니다.

```bash
node bin/dreampia-dev-kit.js validate docs/
```

checkout 없이 GitHub에서 바로 실행할 수도 있습니다.

```bash
npx github:eonofpixel/dreampia-dev-kit validate docs/
```

출력을 나눠 보고 싶으면 개별 명령을 사용합니다.

```bash
node bin/dreampia-dev-kit.js score docs/
node bin/dreampia-dev-kit.js audit docs/
```
