# LocaleBuilder

언어 빌더: 현재 언어를 설정하고 가져오는 데 사용됩니다

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

언어 변경을 모니터링하고, 모니터링 취소 함수를 반환합니다

**정의**:

```typescript
observe(callback: ObserveCallback): () => void
```

**반환**: `() => void`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `callback` | ObserveCallback | - 콜백 함수 |

### setLocale

언어 설정

**정의**:

```typescript
setLocale(locale: string)
```

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `locale` | string | - 언어 이름 |

### getLocale

현재 언어 가져오기

**정의**:

```typescript
getLocale(): string
```

**반환**: `string`

### toJSON

JSON으로 내보내기

**정의**:

```typescript
toJSON(): string
```

**반환**: `string`