# VBIReportBuilder

## Eigenschaften

| Eigenschaften | Typ | Beschreibung |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |
| **page** | `ReportPageCollectionBuilder<TQueryDSL, TSeedDSL>` | - |


## Methoden

### constructor

**Definition**:

```typescript
constructor(doc: Y.Doc, options: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>, resourceRegistry: VBIResourceRegistry<TQueryDSL, TSeedDSL>)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `options` | `VBIReportBuilderOptions<TQueryDSL, TSeedDSL>` | - |
| `resourceRegistry` | `VBIResourceRegistry<TQueryDSL, TSeedDSL>` | - |

### applyUpdate

**Definition**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin: any): any
```

**Rückgabe**: `any`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `update` | `Uint8Array` | - |
| `transactionOrigin` | any | - |

### encodeStateAsUpdate

**Definition**:

```typescript
encodeStateAsUpdate(targetStateVector: Uint8Array): any
```

**Rückgabe**: `any`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `targetStateVector` | `Uint8Array` | - |

### getUUID

**Definition**:

```typescript
getUUID(): string
```

**Rückgabe**: `string`

### getChartBuilder

**Definition**:

```typescript
getChartBuilder(chartId: string): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Rückgabe**: `VBIChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `chartId` | string | - |

### getInsightBuilder

**Definition**:

```typescript
getInsightBuilder(insightId: string): VBIInsightBuilder | undefined
```

**Rückgabe**: `VBIInsightBuilder \| undefined`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `insightId` | string | - |

### build

**Definition**:

```typescript
build(): VBIReportDSL
```

**Rückgabe**: `VBIReportDSL`

### snapshot

**Definition**:

```typescript
snapshot(): VBIReportSnapshotDSL
```

**Rückgabe**: `VBIReportSnapshotDSL`

### isEmpty

**Definition**:

```typescript
isEmpty(): boolean
```

**Rückgabe**: `boolean`