# VBIReportBuilder

## 属性

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |
| **page** | `ReportPageCollectionBuilder<TQueryDSL, TSeedDSL>` | - |


## 方法

### constructor

**定义**:

```typescript
constructor(doc: Y.Doc, options: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>, resourceRegistry: VBIResourceRegistry<TQueryDSL, TSeedDSL>)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `options` | VBIReportBuilderOptions<TQueryDSL, TSeedDSL> | - |
| `resourceRegistry` | VBIResourceRegistry<TQueryDSL, TSeedDSL> | - |

### applyUpdate

**定义**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin: any): any
```

**返回**: `any`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `update` | Uint8Array | - |
| `transactionOrigin` | any | - |

### encodeStateAsUpdate

**定义**:

```typescript
encodeStateAsUpdate(targetStateVector: Uint8Array): any
```

**返回**: `any`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `targetStateVector` | Uint8Array | - |

### getUUID

**定义**:

```typescript
getUUID(): string
```

**返回**: `string`

### getChartBuilder

**定义**:

```typescript
getChartBuilder(chartId: string): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**返回**: `VBIChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `chartId` | string | - |

### getInsightBuilder

**定义**:

```typescript
getInsightBuilder(insightId: string): VBIInsightBuilder | undefined
```

**返回**: `VBIInsightBuilder \| undefined`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `insightId` | string | - |

### build

**定义**:

```typescript
build(): VBIReportDSL
```

**返回**: `VBIReportDSL`

### snapshot

**定义**:

```typescript
snapshot(): VBIReportSnapshotDSL
```

**返回**: `VBIReportSnapshotDSL`

### isEmpty

**定义**:

```typescript
isEmpty(): boolean
```

**返回**: `boolean`