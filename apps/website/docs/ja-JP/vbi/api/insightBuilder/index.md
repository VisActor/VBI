# VBIInsightBuilder

## プロパティ

| プロパティ | 型 | 説明 |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |


## メソッド

### constructor

**定義**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### applyUpdate

**定義**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin: any): any
```

**戻り値**: `any`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `update` | `Uint8Array` | - |
| `transactionOrigin` | any | - |

### encodeStateAsUpdate

**定義**:

```typescript
encodeStateAsUpdate(targetStateVector: Uint8Array): any
```

**戻り値**: `any`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `targetStateVector` | `Uint8Array` | - |

### getUUID

**定義**:

```typescript
getUUID(): string
```

**戻り値**: `string`

### setContent

**定義**:

```typescript
setContent(content: string): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `content` | string | - |

### build

**定義**:

```typescript
build(): VBIInsightDSL
```

**戻り値**: `VBIInsightDSL`

### isEmpty

**定義**:

```typescript
isEmpty(): boolean
```

**戻り値**: `boolean`
