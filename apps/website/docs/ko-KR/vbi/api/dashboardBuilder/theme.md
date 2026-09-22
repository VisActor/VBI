# DashboardThemeBuilder

Dashboard 테마 빌더는 테마 이름을 저장하며 렌더링 계층이 스타일을 등록하고 해석합니다.

## 메서드

### constructor

**정의**:

```typescript
constructor(dsl: Y.Map<any>)
```

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `dsl` | Y.Map<any> | - |

### observe

로컬 변경, 실행 취소, 협업 동기화에 따른 테마 변경을 감시하고 구독 해제 함수를 반환합니다.

**정의**:

```typescript
observe(callback: ObserveCallback): () => void
```

**반환**: `() => void`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `callback` | ObserveCallback | - 테마 변경 콜백 |

### setTheme

참조하는 차트 리소스를 변경하지 않고 light, dark 또는 등록된 사용자 정의 테마를 설정합니다.

**정의**:

```typescript
setTheme(theme: string): void
```

**반환**: `void`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `theme` | string | - 비어 있지 않은 테마 이름 |

### getTheme

테마 이름을 가져옵니다. 기본값은 light입니다.

**정의**:

```typescript
getTheme(): string
```

**반환**: `string`

### toJSON

테마 이름을 내보냅니다.

**정의**:

```typescript
toJSON(): string
```

**반환**: `string`