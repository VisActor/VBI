# VBIInsightBuilder

## 속성

| 속성 | 타입 | 설명 |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |


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

### applyUpdate

**정의**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin: any): any
```

**반환**: `any`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `update` | `Uint8Array` | - |
| `transactionOrigin` | any | - |

### encodeStateAsUpdate

**정의**:

```typescript
encodeStateAsUpdate(targetStateVector: Uint8Array): any
```

**반환**: `any`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `targetStateVector` | `Uint8Array` | - |

### getUUID

**정의**:

```typescript
getUUID(): string
```

**반환**: `string`

### setContent

**정의**:

```typescript
setContent(content: string): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `content` | string | - |

### build

**정의**:

```typescript
build(): VBIInsightDSL
```

**반환**: `VBIInsightDSL`

### isEmpty

**정의**:

```typescript
isEmpty(): boolean
```

**반환**: `boolean`