# VBIReportBuilder

## 속성

| 속성 | 타입 | 설명 |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |
| **page** | `ReportPageCollectionBuilder<TQueryDSL, TSeedDSL>` | - |


## 메서드

### constructor

**정의**:

```typescript
constructor(doc: Y.Doc, options: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>, resourceRegistry: VBIResourceRegistry<TQueryDSL, TSeedDSL>)
```

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `options` | `VBIReportBuilderOptions<TQueryDSL, TSeedDSL>` | - |
| `resourceRegistry` | `VBIResourceRegistry<TQueryDSL, TSeedDSL>` | - |

### applyUpdate

**정의**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin: any): any
```

**반환**: `any`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `update` | `Uint8Array` | - |
| `transactionOrigin` | any | - |

### encodeStateAsUpdate

**정의**:

```typescript
encodeStateAsUpdate(targetStateVector: Uint8Array): any
```

**반환**: `any`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `targetStateVector` | `Uint8Array` | - |

### getUUID

**정의**:

```typescript
getUUID(): string
```

**반환**: `string`

### getChartBuilder

**정의**:

```typescript
getChartBuilder(chartId: string): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**반환**: `VBIChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `chartId` | string | - |

### getInsightBuilder

**정의**:

```typescript
getInsightBuilder(insightId: string): VBIInsightBuilder | undefined
```

**반환**: `VBIInsightBuilder \| undefined`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `insightId` | string | - |

### build

**정의**:

```typescript
build(): VBIReportDSL
```

**반환**: `VBIReportDSL`

### snapshot

**정의**:

```typescript
snapshot(): VBIReportSnapshotDSL
```

**반환**: `VBIReportSnapshotDSL`

### isEmpty

**정의**:

```typescript
isEmpty(): boolean
```

**반환**: `boolean`