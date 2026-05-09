# VBIInsightBuilder

## Properties

| Properties | Type | Description |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |


## Method

### constructor

**Definition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### applyUpdate

**Definition**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin: any): any
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `update` | `Uint8Array` | - |
| `transactionOrigin` | any | - |

### encodeStateAsUpdate

**Definition**:

```typescript
encodeStateAsUpdate(targetStateVector: Uint8Array): any
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `targetStateVector` | `Uint8Array` | - |

### getUUID

**Definition**:

```typescript
getUUID(): string
```

**Return**: `() => void`

### setContent

**Definition**:

```typescript
setContent(content: string): this
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `content` | string | - |

### build

**Definition**:

```typescript
build(): VBIInsightDSL
```

**Return**: `() => void`

### isEmpty

**Definition**:

```typescript
isEmpty(): boolean
```

**Return**: `() => void`