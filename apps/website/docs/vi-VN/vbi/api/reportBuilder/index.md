# VBIReportBuilder

## Thuộc tính

| Thuộc tính| loại| Giải thích |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |
| **page** | `ReportPageCollectionBuilder<TQueryDSL, TSeedDSL>` | - |


## Phương pháp

### constructor

**Định nghĩa**:

```typescript
constructor(doc: Y.Doc, options: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>, resourceRegistry: VBIResourceRegistry<TQueryDSL, TSeedDSL>)
```

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `options` | `VBIReportBuilderOptions<TQueryDSL, TSeedDSL>` | - |
| `resourceRegistry` | `VBIResourceRegistry<TQueryDSL, TSeedDSL>` | - |

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

### getChartBuilder

**Định nghĩa**:

```typescript
getChartBuilder(chartId: string): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Trở về**: `VBIChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `chartId` | string | - |

### getInsightBuilder

**Định nghĩa**:

```typescript
getInsightBuilder(insightId: string): VBIInsightBuilder | undefined
```

**Trở về**: `VBIInsightBuilder \| undefined`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `insightId` | string | - |

### build

**Định nghĩa**:

```typescript
build(): VBIReportDSL
```

**Trở về**: `VBIReportDSL`

### snapshot

**Định nghĩa**:

```typescript
snapshot(): VBIReportSnapshotDSL
```

**Trở về**: `VBIReportSnapshotDSL`

### isEmpty

**Định nghĩa**:

```typescript
isEmpty(): boolean
```

**Trở về**: `boolean`