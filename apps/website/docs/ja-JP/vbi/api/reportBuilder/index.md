# VBIReportBuilder

## プロパティ

| プロパティ | 型 | 説明 |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |
| **page** | `ReportPageCollectionBuilder<TQueryDSL, TSeedDSL>` | - |


## メソッド

### constructor

**定義**:

```typescript
constructor(doc: Y.Doc, options: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>, resourceRegistry: VBIResourceRegistry<TQueryDSL, TSeedDSL>)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `options` | `VBIReportBuilderOptions<TQueryDSL, TSeedDSL>` | - |
| `resourceRegistry` | `VBIResourceRegistry<TQueryDSL, TSeedDSL>` | - |

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

### getChartBuilder

**定義**:

```typescript
getChartBuilder(chartId: string): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**戻り値**: `VBIChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `chartId` | string | - |

### getInsightBuilder

**定義**:

```typescript
getInsightBuilder(insightId: string): VBIInsightBuilder | undefined
```

**戻り値**: `VBIInsightBuilder \| undefined`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `insightId` | string | - |

### build

**定義**:

```typescript
build(): VBIReportDSL
```

**戻り値**: `VBIReportDSL`

### snapshot

**定義**:

```typescript
snapshot(): VBIReportSnapshotDSL
```

**戻り値**: `VBIReportSnapshotDSL`

### isEmpty

**定義**:

```typescript
isEmpty(): boolean
```

**戻り値**: `boolean`
