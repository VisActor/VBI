# WhereFilterBuilder

Where 필터 빌더, 행 수준 필터 조건을 추가, 수정, 삭제하는 데 사용됩니다. Where 필터는 데이터 쿼리 전에 적용되어 원시 데이터를 필터링합니다.

## 속성

## 메서드

### constructor

**정의**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### getConditions

**정의**:

```typescript
getConditions(): Y.Array<any>
```

**반환**: `Y.Array<any>`

### add

Where 필터 조건 추가

**정의**:

```typescript
add(field: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**반환**: `WhereFilterBuilder`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `field` | string | - 필드명 |
| `callback` | (node: WhereFilterNodeBuilder) => void | - 콜백 함수 |

### addGroup

Where 그룹 추가

**정의**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**반환**: `WhereFilterBuilder`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - 논리 연산자 |
| `callback` | (group: WhereGroupBuilder) => void | - 콜백 함수 |

### update

지정된 ID의 필터 조건 업데이트

**정의**:

```typescript
update(id: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**반환**: `WhereFilterBuilder`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `id` | string | - 필터 조건 ID |
| `callback` | (node: WhereFilterNodeBuilder) => void | - 콜백 함수 |

### updateGroup

지정된 ID의 그룹 업데이트

**정의**:

```typescript
updateGroup(id: string, callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**반환**: `WhereFilterBuilder`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `id` | string | - 그룹 ID |
| `callback` | (group: WhereGroupBuilder) => void | - 콜백 함수 |

### remove

지정된 ID의 조건 또는 지정된 인덱스의 항목 삭제

**정의**:

```typescript
remove(idOrIndex: string | number): WhereFilterBuilder
```

**반환**: `WhereFilterBuilder`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID 또는 인덱스 |

### find

콜백 조건으로 첫 번째 조건(필터 또는 그룹)을 찾습니다. 동작은 Array.find와 같습니다

**정의**:

```typescript
find(predicate: (entry: WhereFilterNodeBuilder | WhereGroupBuilder, index: number) => boolean): WhereFilterNodeBuilder | WhereGroupBuilder | undefined
```

**반환**: `WhereFilterNodeBuilder \| WhereGroupBuilder \| undefined`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `predicate` | (entry: WhereFilterNodeBuilder \| WhereGroupBuilder, index: number) => boolean | - 검색 조건 |

### clear

모든 Where 필터 조건 지우기

**정의**:

```typescript
clear()
```

### toJSON

전체 Where 필터 구성 내보내기

**정의**:

```typescript
toJSON(): VBIWhereGroup
```

**반환**: `VBIWhereGroup`

### observe

필터 조건 변경을 모니터링하고, 모니터링 취소 함수를 반환합니다

**정의**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**반환**: `() => void`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - 콜백 함수 |

### static isGroup

그룹 노드인지 확인

**정의**:

```typescript
static isGroup(yMap: Y.Map<any>): boolean
```

**반환**: `boolean`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `yMap` | `Y.Map<any>` | - |

### static isNode

리프 노드인지 확인

**정의**:

```typescript
static isNode(yMap: Y.Map<any>): boolean
```

**반환**: `boolean`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `yMap` | `Y.Map<any>` | - |