# VBIInsightBuilder

## Thuộc tính

| Thuộc tính| loại| Giải thích |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |


## Phương pháp

### constructor

**Định nghĩa**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### applyUpdate

**Định nghĩa**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin: any): any
```

**Trở về**: `any`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `update` | `Uint8Array` | - |
| `transactionOrigin` | any | - |

### encodeStateAsUpdate

**Định nghĩa**:

```typescript
encodeStateAsUpdate(targetStateVector: Uint8Array): any
```

**Trở về**: `any`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `targetStateVector` | `Uint8Array` | - |

### getUUID

**Định nghĩa**:

```typescript
getUUID(): string
```

**Trở về**: `string`

### setContent

**Định nghĩa**:

```typescript
setContent(content: string): this
```

**Trở về**: `this`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `content` | string | - |

### build

**Định nghĩa**:

```typescript
build(): VBIInsightDSL
```

**Trở về**: `VBIInsightDSL`

### isEmpty

**Định nghĩa**:

```typescript
isEmpty(): boolean
```

**Trở về**: `boolean`