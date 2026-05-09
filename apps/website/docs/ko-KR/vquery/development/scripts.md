# 자주 사용하는 스크립트

Monorepo의 일관성을 유지하려면 **모든 스크립트는 프로젝트 루트 디렉토리에서 실행해야 합니다**.

## 핵심 스크립트 (g)

```bash
pnpm run g
```
**기능 설명**: VQuery의 `g` 스크립트는 다음을 담당합니다:
1. `build:test`: 테스트 리소스 컴파일.
2. `build:docs`: API 문서 생성.

## 개발 및 빌드

### 빌드
```bash
pnpm --filter=@visactor/vquery run build
```

## 테스트

### 테스트 실행
VQuery는 Rstest를 사용하여 테스트합니다.
```bash
pnpm --filter=@visactor/vquery run test
```

### 스냅샷 업데이트
```bash
pnpm --filter=@visactor/vquery run test:update
```

### 커버리지
```bash
pnpm --filter=@visactor/vquery run test:coverage
```
