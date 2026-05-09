# HavingFilterNodeBuilder

Having 필터 노드 빌더: 단일 Having 필터 조건을 구성하는 데 사용됩니다

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

### getOperator

필터 연산자 가져오기

**정의**:

```typescript
getOperator(): string | undefined
```

**반환**: `string \| undefined`

### getAggregate

집계 구성 가져오기

**정의**:

```typescript
getAggregate(): VBIHavingAggregate | undefined
```

**반환**: `VBIHavingAggregate \| undefined`

### setValue

필터 조건의 값 설정

**정의**:

```typescript
setValue(value: unknown): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `value` | unknown | - 필터 값 |

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

### setAggregate

집계 구성 설정

**정의**:

```typescript
setAggregate(aggregate: VBIHavingAggregate): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `aggregate` | `VBIHavingAggregate` | - 집계 구성 |

### toJSON

JSON으로 내보내기

**정의**:

```typescript
toJSON(): VBIHavingFilter
```

**반환**: `VBIHavingFilter`