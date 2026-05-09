# HavingGroupBuilder

Having 그룹 빌더: 조건 집합의 논리 관계(AND/OR)를 구성하는 데 사용됩니다

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

### getConditions

**정의**:

```typescript
getConditions(): Y.Array<any>
```

**반환**: `Y.Array<any>`

### getId

그룹 ID 가져오기

**정의**:

```typescript
getId(): string
```

**반환**: `string`

### getOperator

논리 연산자 가져오기

**정의**:

```typescript
getOperator(): 'and' | 'or'
```

**반환**: `'and' \| 'or'`

### setOperator

논리 연산자 설정

**정의**:

```typescript
setOperator(op: 'and' | 'or'): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - 논리 연산자 |

### add

Having 필터 조건을 그룹에 추가

**정의**:

```typescript
add(field: string, callback: (node: HavingFilterNodeBuilder) => void): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `field` | string | - 필드명 |
| `callback` | (node: HavingFilterNodeBuilder) => void | - 콜백 함수 |

### addGroup

중첩 그룹을 현재 그룹에 추가

**정의**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: HavingGroupBuilder) => void): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - 논리 연산자 |
| `callback` | (group: HavingGroupBuilder) => void | - 콜백 함수 |

### remove

지정된 ID의 조건 또는 지정된 인덱스의 항목 삭제

**정의**:

```typescript
remove(idOrIndex: string | number): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID 또는 인덱스 |

### clear

그룹 내 모든 조건 지우기

**정의**:

```typescript
clear(): this
```

**반환**: `this`

### toJSON

JSON으로 내보내기

**정의**:

```typescript
toJSON(): VBIHavingGroup
```

**반환**: `VBIHavingGroup`