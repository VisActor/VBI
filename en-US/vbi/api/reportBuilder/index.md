# VBIReportBuilder

## Properties

| Property        | Type                                               | Description |
| --------------- | -------------------------------------------------- | ----------- |
| **doc**         | `Y.Doc`                                            | -           |
| **dsl**         | `Y.Map<any>`                                       | -           |
| **undoManager** | `UndoManager`                                      | -           |
| **page**        | `ReportPageCollectionBuilder<TQueryDSL, TSeedDSL>` | -           |

## Methods

### constructor

**Definition**:

```typescript
constructor(doc: Y.Doc, options: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>)
```

**Parameters**:

| Parameter | Type                                          | Description |
| --------- | --------------------------------------------- | ----------- |
| `doc`     | Y.Doc                                         | -           |
| `options` | VBIReportBuilderOptions\<TQueryDSL, TSeedDSL> | -           |

### applyUpdate

**Definition**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin: any): any
```

**Returns**: `any`

**Parameters**:

| Parameter           | Type       | Description |
| ------------------- | ---------- | ----------- |
| `update`            | Uint8Array | -           |
| `transactionOrigin` | any        | -           |

### encodeStateAsUpdate

**Definition**:

```typescript
encodeStateAsUpdate(targetStateVector: Uint8Array): any
```

**Returns**: `any`

**Parameters**:

| Parameter           | Type       | Description |
| ------------------- | ---------- | ----------- |
| `targetStateVector` | Uint8Array | -           |

### build

**Definition**:

```typescript
build(): VBIReportDSL
```

**Returns**: `VBIReportDSL`

### isEmpty

**Definition**:

```typescript
isEmpty(): boolean
```

**Returns**: `boolean`
