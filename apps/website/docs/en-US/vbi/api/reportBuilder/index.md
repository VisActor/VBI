# VBIReportBuilder

## Properties

| Properties | Type | Description |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |
| **page** | `ReportPageCollectionBuilder<TQueryDSL, TSeedDSL>` | - |


## Method

### constructor

**Definition**:

```typescript
constructor(doc: Y.Doc, options: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>, resourceRegistry: VBIResourceRegistry<TQueryDSL, TSeedDSL>)
```

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `options` | `VBIReportBuilderOptions<TQueryDSL, TSeedDSL>` | - |
| `resourceRegistry` | `VBIResourceRegistry<TQueryDSL, TSeedDSL>` | - |

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

### getChartBuilder

**Definition**:

```typescript
getChartBuilder(chartId: string): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `chartId` | string | - |

### getInsightBuilder

**Definition**:

```typescript
getInsightBuilder(insightId: string): VBIInsightBuilder | undefined
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `insightId` | string | - |

### build

**Definition**:

```typescript
build(): VBIReportDSL
```

**Return**: `() => void`

### snapshot

**Definition**:

```typescript
snapshot(): VBIReportSnapshotDSL
```

**Return**: `() => void`

### isEmpty

**Definition**:

```typescript
isEmpty(): boolean
```

**Return**: `() => void`