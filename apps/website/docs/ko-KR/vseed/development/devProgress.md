# 개발 프로세스

## 프로젝트 시작

```bash title=프로젝트 시작
pnpm install && pnpm dev
``` 

## 요구 사항 이해 및 코드 작성

이는 복잡한 과정이지만, 일반적으로는 세 가지 작업으로 구성됩니다:
1. 입력 정의, `vseed`
2. 출력 정의, `vseed`를 `advancedVSeed`로 변환하거나 `advancedVSeed`를 `spec`으로 변환
3. 코드 작성, 새로운 입력이 예상된 출력을 생성하는지 확인

:::tip
`playground(apps/website/docs/zh-CN/playground/index.mdx)`에서 디버깅 및 개발을 수행할 수 있습니다.

:::

## 새 테스트 케이스 생성

필요한 경우 새 테스트 케이스 생성을 고려할 수 있습니다.

:::tip
커버리지가 낮아진 경우 새 테스트 케이스를 생성해야 합니다.

:::

`packages/vseed/tests/*` 디렉토리 아래에 새 `testName.json`을 생성하고 vseed DSL을 작성합니다.

실행

```bash title=테스트 케이스 생성
pnpm build:canvasTest
```

## 단위 테스트 실행 및 커버리지 업데이트

```bash title=단위 테스트 실행 및 커버리지 업데이트
pnpm test:coverage
```

3가지 사항 확인
1. 모든 테스트 통과
2. 스냅샷 변경 사항이 예상과 일치
3. 커버리지 하락 없음

> 커버리지 변경 사항은 자동으로 README.md에 업데이트됩니다.

## 설정 항목 문서 업데이트

차트 유형의 TypeScript 정의를 수정한 경우 설정 항목 문서를 업데이트하세요.

:::tip
`packages/vseed/src/types/chartType`의 모든 타입 정의는 각 차트의 설정 항목 문서에 해당하므로, 변경 사항이 있으면 반드시 업데이트하세요.

:::

```bash title=설정 항목 문서 업데이트
pnpm build:docs
```

## 릴리스 및 커밋

```bash title=변경 내용 설명
pnpm changeset
```

`pnpm changeset` 명령을 실행한 후 프롬프트에 따라 다음 작업을 선택합니다.
1. 변경이 필요한 패키지를 선택합니다. 일반적으로 vseed만 해당됩니다.
2. 시맨틱 버전을 준수하여 변경 유형을 선택합니다. 대부분의 경우 Enter 키를 2번 연속 눌러 `major`와 `minor`를 건너뛴 후 `patch`를 선택하면 됩니다.
2. 변경 설명을 입력합니다. 예: `fix: chart render error caused by only one measure`

:::tip 권장 사항
하나의 기능 또는 버그픽스는 하나의 `changeset`과 하나의 `commit`에 대응됩니다.

하나의 `Pull Request`는 하나의 `issue`에 대응됩니다.

하나의 `Pull Request`가 여러 기능 또는 여러 버그픽스에 해당하는 경우, 여러 `changeset`과 여러 `commit`에 대응됩니다.

:::

## 커밋

```bash title=전체 내용 커밋
git add .
git commit -m "fix: chart render error caused by only one measure"
git push
```
