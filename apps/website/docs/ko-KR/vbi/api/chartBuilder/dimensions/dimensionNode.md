# DimensionNodeBuilder

차원 노드 빌더로, 단일 차원을 구성하는 데 사용됩니다.

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

### getEncoding

차트 인코딩 위치 가져오기

**정의**:

```typescript
getEncoding(): VBIDimension['encoding'] | undefined
```

**반환**: `VBIDimension['encoding'] \| undefined`

### getSort

정렬 구성 가져오기

**정의**:

```typescript
getSort(): VBISort | undefined
```

**반환**: `VBISort \| undefined`

### setAlias

표시 이름 설정

**정의**:

```typescript
setAlias(alias: string): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `alias` | string | - 표시 이름 |

### setEncoding

차트 인코딩 위치 설정

**정의**:

```typescript
setEncoding(encoding: NonNullable<VBIDimension['encoding']>): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `encoding` | `NonNullable<VBIDimension['encoding']>` | - 차원 인코딩 위치 |

### setSort

정렬 구성 설정

**정의**:

```typescript
setSort(sort: VBISort): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `sort` | `VBISort` | - 정렬 구성 |

### setAggregate

날짜 집계 함수 설정

**정의**:

```typescript
setAggregate(aggregate: NonNullable<VBIDimension['aggregate']>): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `aggregate` | `NonNullable<VBIDimension['aggregate']>` | - 날짜 집계 구성 |

### clearAggregate

날짜 집계 함수 지우기

**정의**:

```typescript
clearAggregate(): this
```

**반환**: `this`

### clearSort

정렬 구성 지우기

**정의**:

```typescript
clearSort(): this
```

**반환**: `this`

### toJSON

JSON으로 내보내기

**정의**:

```typescript
toJSON(): VBIDimension
```

**반환**: `VBIDimension`