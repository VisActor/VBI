# VBIReportBuilder

## Properti

| Properti | Ketik | Deskripsi |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |
| **page** | `ReportPageCollectionBuilder<TQueryDSL, TSeedDSL>` | - |


## metode

### constructor

**definisi**:

```typescript
constructor(doc: Y.Doc, options: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>, resourceRegistry: VBIResourceRegistry<TQueryDSL, TSeedDSL>)
```

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `options` | `VBIReportBuilderOptions<TQueryDSL, TSeedDSL>` | - |
| `resourceRegistry` | `VBIResourceRegistry<TQueryDSL, TSeedDSL>` | - |

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

### getChartBuilder

**definisi**:

```typescript
getChartBuilder(chartId: string): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Pengembalian**: `VBIChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `chartId` | string | - |

### getInsightBuilder

**definisi**:

```typescript
getInsightBuilder(insightId: string): VBIInsightBuilder | undefined
```

**Pengembalian**: `VBIInsightBuilder \| undefined`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `insightId` | string | - |

### build

**definisi**:

```typescript
build(): VBIReportDSL
```

**Pengembalian**: `VBIReportDSL`

### snapshot

**definisi**:

```typescript
snapshot(): VBIReportSnapshotDSL
```

**Pengembalian**: `VBIReportSnapshotDSL`

### isEmpty

**definisi**:

```typescript
isEmpty(): boolean
```

**Pengembalian**: `boolean`