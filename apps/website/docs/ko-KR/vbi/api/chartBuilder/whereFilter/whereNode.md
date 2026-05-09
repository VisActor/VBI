# WhereFilterNodeBuilder

Where 필터 노드 빌더, 단일 Where 필터 조건을 구성하는 데 사용

## 속성

## 메서드

### constructor

**정의**:

```typescript
constructor(yMap: Y.Map<any>)
```

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `yMap` | `Y.Map<any>` | - |

### getId

노드 ID 가져오기

**정의**:

```typescript
getId(): string
```

**반환**: `string`

### getField

필드명 가져오기

**정의**:

```typescript
getField(): string
```

**반환**: `string`

### setField

필드명 설정

**정의**:

```typescript
setField(field: string): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `field` | string | - 필드명 |

### getOperator

필터 연산자 가져오기

**정의**:

```typescript
getOperator(): string | undefined
```

**반환**: `string \| undefined`

### setOperator

필터 연산자 설정

**정의**:

```typescript
setOperator(operator: string): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `operator` | string | - 연산자 |

### setValue

필터 값 설정

**정의**:

```typescript
setValue(value: unknown): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `value` | unknown | - 필터 값 |

### setDate

날짜 필터 조건 설정

**정의**:

```typescript
setDate(predicate: VBIWhereDatePredicate): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `predicate` | `VBIWhereDatePredicate` | - 날짜 조건자 |

### getDate

날짜 필터 조건 가져오기, 날짜 필터가 아닌 경우 undefined 반환

**정의**:

```typescript
getDate(): VBIWhereDatePredicate | undefined
```

**반환**: `VBIWhereDatePredicate \| undefined`

### toJSON

JSON으로 내보내기

**정의**:

```typescript
toJSON(): VBIWhereFilter
```

**반환**: `VBIWhereFilter`