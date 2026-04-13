# VBIInsightBuilder

## Properties

| Property | Type | Description |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |

## Methods

### constructor

**Definition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### applyUpdate

**Definition**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin: any): any
```

**Returns**: `any`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `update` | Uint8Array | - |
| `transactionOrigin` | any | - |

### encodeStateAsUpdate

**Definition**:

```typescript
encodeStateAsUpdate(targetStateVector: Uint8Array): any
```

**Returns**: `any`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `targetStateVector` | Uint8Array | - |

### getUUID

**Definition**:

```typescript
getUUID(): string
```

**Returns**: `string`

### setContent

**Definition**:

```typescript
setContent(content: string): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `content` | string | - |

### build

**Definition**:

```typescript
build(): VBIInsightDSL
```

**Returns**: `VBIInsightDSL`

### isEmpty

**Definition**:

```typescript
isEmpty(): boolean
```

**Returns**: `boolean`
