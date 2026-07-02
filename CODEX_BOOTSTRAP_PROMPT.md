# Codex Bootstrap Prompt

Copy and paste this prompt into Codex from the repository root.

```text
이 저장소는 `dreampia-dev-kit`이라는 오픈소스 프로젝트다.
목표는 Codex, Claude Code, 기타 AI 코딩 에이전트에서 사용할 수 있는 개발 문서 자동화 스킬/플러그인 키트를 만드는 것이다.

먼저 루트의 `AGENTS.md`, `PROJECT_SPEC.md`, `MVP_PLAN.md`, `SKILL_CATALOG.md`, `DOC_SYSTEM.md`를 읽고 v0.1 개발 계획을 세워줘.

v0.1 목표:
- Markdown-first skill pack
- 핵심 스킬 8개: prd, trd, ia, user-flow, api-spec, erd, qa-checklist, doc-audit
- templates/ 문서 템플릿 정리
- Codex와 Claude Code에서 설치 가능한 구조 준비
- 아직 복잡한 CLI나 GitHub Action은 만들지 말고, 필요한 최소 스캐폴딩만 생성

작업 순서:
1. 현재 파일 구조를 확인한다.
2. 문서 간 불일치나 누락을 먼저 지적한다.
3. 필요한 최소 디렉터리와 파일만 만든다.
4. 각 `skills/*/SKILL.md`에 `name`, `description`, 사용 조건, 출력 형식, 품질 기준을 갖추도록 정리한다.
5. README.md에 설치/사용 방법 초안을 작성한다.
6. 마지막에 변경 파일, 검증 방법, 다음 작업을 요약한다.

보안 기준:
- 외부 네트워크 호출 금지
- secret, .env, token 읽기 금지
- destructive command 금지
- 기존 문서를 덮어쓸 때는 변경 요약을 먼저 제공

먼저 계획을 세우고, 그다음 구현해줘.
```

## Follow-up Prompt: Add Codex and Claude Code Install Scaffold

```text
이제 v0.1 문서 스킬팩을 Codex와 Claude Code에서 설치할 수 있도록 최소 구조를 만들어줘.

요구사항:
- `plugins/dreampia-dev-kit/.codex-plugin/plugin.json` 생성
- `plugins/dreampia-dev-kit/.claude-plugin/plugin.json` 생성
- `plugins/dreampia-dev-kit/skills/`에 루트 `skills/` 복사본 생성
- `.agents/plugins/marketplace.json` Codex 로컬 마켓플레이스 초안 생성
- `.claude-plugin/marketplace.json` Claude Code 로컬 마켓플레이스 초안 생성
- README에 Codex와 Claude Code 설치/테스트 방법 추가
- 실제 npm CLI는 아직 만들지 않음
```

## Follow-up Prompt: Add CLI Later

```text
이제 Markdown skill pack이 안정화되었다고 가정하고, TypeScript 기반 최소 CLI를 추가해줘.

요구사항:
- pnpm workspace
- packages/cli
- `dreampia-dev-kit init`
- `dreampia-dev-kit validate-skills`
- `dreampia-dev-kit audit-docs`는 v0.2 placeholder만
- Vitest 기반 최소 테스트
- README 업데이트
```
