# 테스트 흐름

VSeed는 엄격한 테스트 주도 개발 프로세스를 채택합니다. **모든 테스트 명령은 프로젝트 루트 디렉토리에서 실행해야 합니다.**

## 테스트 분류

### 1. 단위 테스트 (Unit Tests)
- **목적**: 독립적인 유틸리티 함수, Pipeline 노드 로직 테스트.
- **위치**: `packages/vseed/tests/unit`
- **실행**:
  ```bash
  pnpm --filter=@visactor/vseed run test:unit
  ```

### 2. 통합 테스트 (Integration Tests)
- **목적**: 전체 차트 생성 프로세스 테스트 (VSeed Spec -> VChart Spec).
- **메커니즘**: 데이터 기반. `packages/vseed/tests/integrations` 아래의 JSON 파일을 읽어 테스트 케이스를 자동 생성하고 스냅샷을 비교합니다.
- **실행**:
  ```bash
  pnpm --filter=@visactor/vseed run test:integration
  ```

## 핵심 워크플로 (Workflow)

### 1단계: 테스트 실행
개발 과정에서 관련 테스트를 자주 실행하여 로직을 검증합니다.
```bash
# 运行所有测试
pnpm --filter=@visactor/vseed run test
```

### 2단계: 스냅샷 변경 처리
코드를 수정하여 출력 Spec이 변경된 경우(예: Bug 수정 또는 Feature 추가):
1. 콘솔에 출력된 Diff를 확인하여 변경 사항이 예상과 일치하는지 확인합니다.
2. 예상과 일치하면 업데이트 명령을 실행합니다:
   ```bash
   pnpm --filter=@visactor/vseed run test:update
   ```

### 3단계: 커버리지 확인
코드를 제출하기 전에 테스트 커버리지를 확인하는 것이 좋습니다.
```bash
pnpm --filter=@visactor/vseed run test:coverage
```

## 주의사항
- **자동 생성**: 통합 테스트의 `.test.ts` 파일은 `g` 스크립트에 의해 생성됩니다. **수동으로 수정하지 마십시오**.
- **새 테스트 케이스 추가**: 통합 테스트를 추가하려면 `packages/vseed/tests/integrations` 아래 해당 카테고리 디렉토리에 새 JSON 구성 파일을 추가한 후 `pnpm run g`를 실행하기만 하면 됩니다.
