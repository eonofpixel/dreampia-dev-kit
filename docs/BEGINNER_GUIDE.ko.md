# 초보자 가이드: 아이디어에서 검토된 문서까지

바이브코딩을 처음 하거나, 에이전트에게 코드 구현을 맡기기 전에 안전한 과정을 만들고 싶을 때 이 가이드를 사용합니다.

## 1. 아이디어 한 문장으로 시작하기

완벽한 기획서가 없어도 됩니다. 한 문장으로 시작하세요.

```text
작은 쇼핑몰에 guest checkout을 만들고 싶다.
```

그다음 실행합니다.

```bash
dreampia-dev-kit guide "작은 쇼핑몰 guest checkout"
```

`guide`는 Codex나 Claude Code에 넣을 프롬프트, 기대해야 할 문서 목록, 다음 검증 명령을 보여줍니다.

에이전트에게 세부 작성을 맡기기 전에 파일부터 만들고 싶다면 starter docs 폴더를 생성합니다.

```bash
dreampia-dev-kit init docs/ --feature CHECKOUT-001 --name "guest checkout"
```

## 2. 문서팩 요청하기

가이드가 보여준 프롬프트를 에이전트에 복사합니다. 기대하는 문서팩은 다음입니다.

- PRD: 누구의 어떤 문제를 풀고, 무엇은 범위 밖인지
- TRD: 구현이 어떤 구조여야 하는지
- IA: 어떤 페이지, 라우트, 접근 규칙이 있는지
- user-flow: 사용자가 무엇을 하고, 에러/대안 흐름은 무엇인지
- API spec: request, response, auth, error, example
- ERD: table, 관계, index, 민감 데이터 처리
- QA checklist: pass/fail이 가능한 검증 항목
- doc-audit report: 누락, 충돌, 다음 행동

## 3. 코딩 전에 검증하기

실행합니다.

```bash
dreampia-dev-kit validate docs/
```

Dreampia가 제대로 설치됐는지 헷갈리면 먼저 확인합니다.

```bash
dreampia-dev-kit doctor --docs docs/
```

통과하면 문서 구조가 갖춰졌고 major content-risk finding이 없다는 뜻입니다.

실패해도 개인의 실패가 아닙니다. 아직 보이지 않는 개발 단계가 남아 있다는 뜻입니다.

다음에 무엇을 해야 할지 헷갈리면 Dreampia에게 다음 문서 운영 작업을 고르게 합니다.

```bash
dreampia-dev-kit orchestrate docs/
```

이 읽기 전용 리포트는 반드시 할 작업, 권장 개선, 다음 검증 명령, Codex나 Claude Code에 줄 프롬프트를 보여줍니다.

사람이 이해하기 쉬운 리포트를 확인합니다.

```bash
dreampia-dev-kit explain docs/
```

설명 리포트는 반드시 고칠 것, 권장 개선, learning note를 나누어 보여줍니다.

## 4. 순서대로 고치기

먼저 반드시 고칠 것:

- frontmatter 또는 필수 섹션 누락
- token, secret, payment, privacy 처리 위험
- PRD, API, ERD, IA, flow, QA 사이의 정책 충돌
- 테스트할 수 없는 QA 기준

그다음 개선할 것:

- 관련 문서가 불명확함
- requirement ID, screen ID 같은 추적 신호 누락
- 여러 문서에 반복되는 open question

## 5. 가장 작은 안전한 조각부터 구현하기

문서가 통과하면 에이전트에게 가장 작은 안전한 단위만 구현하라고 요청합니다.

프롬프트 형태:

```text
docs/를 source of truth로 사용해줘. 이 기능의 가장 작은 안전한 slice만 구현해줘.
PRD, TRD, API spec, ERD, QA checklist를 계속 맞춰줘.
새로운 제품 결정이 필요하면 멈추고 질문해줘.
```

## 6. 반복하기

좋은 개발은 완벽한 한 번의 프롬프트가 아니라 반복입니다.

```text
아이디어 -> 문서 -> 검증 -> 문서 수정 -> 작은 구현 -> 테스트 -> 문서 갱신
```

Dreampia는 이 반복을 보이게 만들기 위해 존재합니다.
