# LimitBuilder

데이터 양 제한 빌더: 현재 limit을 설정하고 가져오는 데 사용됩니다

## 속성

## 메서드

### constructor

생성자

**정의**:

```typescript
constructor(_doc: Y.Doc, dsl: Y.Map<any>)
```

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `_doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### observe

limit 변경을 모니터링하고, 모니터링 취소 함수를 반환합니다

**정의**:

```typescript
observe(callback: ObserveCallback): () => void
```

**반환**: `() => void`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `callback` | ObserveCallback | - 콜백 함수 |

### setLimit

limit 설정

**정의**:

```typescript
setLimit(limit: number)
```

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `limit` | number | - 데이터 양 제한 |

### getLimit

현재 limit 가져오기

**정의**:

```typescript
getLimit(): number | undefined
```

**반환**: `number \| undefined`

### toJSON

JSON으로 내보내기

**정의**:

```typescript
toJSON(): number | undefined
```

**반환**: `number \| undefined`