# 설치 방법

`dreampia-dev-kit`은 두 가지 방식으로 사용할 수 있습니다.

- 각 에이전트의 skills 디렉터리에 Markdown skill을 복사해서 사용
- Codex 또는 Claude Code의 로컬 plugin marketplace로 설치해서 사용

원본은 루트 `skills/`입니다. 배포용 plugin 복사본은 `plugins/dreampia-dev-kit/skills/`에 둡니다.

## Codex 설치

### 방법 A: 개인 skills로 설치

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
```

### 방법 B: 로컬 Codex plugin marketplace로 설치

plugin 패키징을 로컬에서 검증할 때 사용합니다.

```bash
codex plugin marketplace add .
codex plugin add dreampia-dev-kit@dreampia-dev-kit
```

새 Codex 세션을 시작한 뒤 namespaced skill을 호출합니다.

```text
/dreampia-dev-kit:prd 워크스페이스 초대 기능 PRD를 작성해줘.
/dreampia-dev-kit:doc-audit docs/의 문서 누락과 drift를 점검해줘.
```

## Claude Code 설치

### 방법 A: 개인 skills로 설치

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
```

### 방법 B: 로컬 Claude Code plugin으로 테스트

```bash
claude --plugin-dir ./plugins/dreampia-dev-kit
```

Claude Code 안에서 다음처럼 호출합니다.

```text
/dreampia-dev-kit:prd 워크스페이스 초대 기능 PRD를 작성해줘.
```

### 방법 C: 로컬 Claude Code marketplace로 설치

```bash
claude plugin marketplace add .
claude plugin install dreampia-dev-kit@dreampia-dev-kit
```

Claude Code를 재시작한 뒤 namespaced skill을 호출합니다.

```text
/dreampia-dev-kit:doc-audit docs/의 문서 누락과 drift를 점검해줘.
```

## Plugin 복사본 갱신

루트 `skills/`를 수정한 뒤에는 배포용 plugin 복사본을 동기화합니다.

```bash
bash scripts/sync-plugin-skills.sh
```

검증:

```bash
node scripts/validate-skill-pack.js
claude plugin validate plugins/dreampia-dev-kit
claude plugin validate .
```
