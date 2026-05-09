# MeasuresBuilder

측정값 빌더: 측정값 구성을 추가, 수정, 삭제하는 데 사용됩니다. 측정값은 데이터의 숫자 필드입니다(예: 매출액, 이익, 수량)

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

### add

측정값 추가

**정의**:

```typescript
add(field: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**반환**: `MeasuresBuilder`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `field` | string | - 필드명 |
| `callback` | (node: MeasureNodeBuilder) => void | - 콜백 함수 |

### remove

지정된 ID의 측정값 삭제

**정의**:

```typescript
remove(id: string): MeasuresBuilder
```

**반환**: `MeasuresBuilder`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `id` | string | - 측정값 ID |

### update

측정값 구성 업데이트

**정의**:

```typescript
update(id: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**반환**: `MeasuresBuilder`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `id` | string | - 측정값 ID |
| `callback` | (node: MeasureNodeBuilder) => void | - 콜백 함수 |

### find

콜백 조건으로 첫 번째 측정값을 찾습니다. 동작은 Array.find와 같습니다

**정의**:

```typescript
find(predicate: (node: MeasureNodeBuilder, index: number) => boolean): MeasureNodeBuilder | undefined
```

**반환**: `MeasureNodeBuilder \| undefined`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `predicate` | (node: MeasureNodeBuilder, index: number) => boolean | - 검색 조건 |

### findAll

모든 측정값 가져오기

**정의**:

```typescript
findAll(): MeasureNodeBuilder[]
```

**반환**: `MeasureNodeBuilder[]`

### toJSON

모든 측정값을 JSON 배열로 내보내기

**정의**:

```typescript
toJSON(): VBIMeasure[]
```

**반환**: `VBIMeasure[]`

### observe

측정값 변경 모니터링

**정의**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**반환**: `() => void`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - 콜백 함수 |

### static isMeasureNode

**정의**:

```typescript
static isMeasureNode(node: VBIMeasureTree[0]): node is VBIMeasure
```

**반환**: `node is VBIMeasure`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `node` | `VBIMeasureTree[0]` | - |

### static isMeasureGroup

**정의**:

```typescript
static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup
```

**반환**: `node is VBIMeasureGroup`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `node` | `VBIMeasureTree[0]` | - |