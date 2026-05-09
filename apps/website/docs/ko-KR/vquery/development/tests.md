# 테스트 흐름

VQuery는 `rstest` 프레임워크를 사용하여 테스트합니다. **모든 명령은 루트 디렉토리에서 실행해야 합니다.**

## 테스트 메커니즘
VQuery의 테스트는 다음을 포함합니다:
- **Unit**: 유틸리티 함수 및 컴파일러 로직.
- **examples**: 완전한 SQL 생성 및 데이터 쿼리 흐름.

## 자주 사용하는 명령어

### 모든 테스트 실행
```bash
pnpm --filter=@visactor/vquery run test
```

### 스냅샷 업데이트
SQL 생성 로직 변경이 예상대로 작동하는 경우 스냅샷을 업데이트해야 합니다:
```bash
pnpm --filter=@visactor/vquery run test:update
```

### 커버리지 보고서
테스트 커버리지 생성 및 확인：
```bash
pnpm --filter=@visactor/vquery run test:coverage
```
