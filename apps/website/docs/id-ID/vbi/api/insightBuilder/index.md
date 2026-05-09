# VBIInsightBuilder

## Properti

| Properti | Ketik | Deskripsi |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |


## metode

### constructor

**definisi**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### applyUpdate

**definisi**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin: any): any
```

**Pengembalian**: `any`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `update` | `Uint8Array` | - |
| `transactionOrigin` | any | - |

### encodeStateAsUpdate

**definisi**:

```typescript
encodeStateAsUpdate(targetStateVector: Uint8Array): any
```

**Pengembalian**: `any`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `targetStateVector` | `Uint8Array` | - |

### getUUID

**definisi**:

```typescript
getUUID(): string
```

**Pengembalian**: `string`

### setContent

**definisi**:

```typescript
setContent(content: string): this
```

**Pengembalian**: `this`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `content` | string | - |

### build

**definisi**:

```typescript
build(): VBIInsightDSL
```

**Pengembalian**: `VBIInsightDSL`

### isEmpty

**definisi**:

```typescript
isEmpty(): boolean
```

**Pengembalian**: `boolean`