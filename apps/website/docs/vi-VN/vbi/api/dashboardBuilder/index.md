# VBIDashboardBuilder

## Thuộc tính

| Thuộc tính | Kiểu | Mô tả |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |
| **theme** | `DashboardThemeBuilder` | - |
| **chart** | `DashboardChartCollectionBuilder<TQueryDSL, TSeedDSL, VBIDashboardBuilder<TQueryDSL, TSeedDSL>>` | - |
| **insight** | `DashboardInsightCollectionBuilder<TQueryDSL, TSeedDSL, VBIDashboardBuilder<TQueryDSL, TSeedDSL>>` | - |


## Phương thức

### constructor

**Định nghĩa**:

```typescript
constructor(doc: Y.Doc, dependencies?: VBIDashboardBuilderDependencies<TQueryDSL, TSeedDSL>)
```

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dependencies?` = {} | VBIDashboardBuilderDependencies<TQueryDSL, TSeedDSL> | - |

### applyUpdate

**Định nghĩa**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin?: any): any
```

**Trả về**: `any`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `update` | Uint8Array | - |
| `transactionOrigin?` | any | - |

### encodeStateAsUpdate

**Định nghĩa**:

```typescript
encodeStateAsUpdate(targetStateVector?: Uint8Array): any
```

**Trả về**: `any`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `targetStateVector?` | Uint8Array | - |

### getUUID

**Định nghĩa**:

```typescript
getUUID(): string
```

**Trả về**: `string`

### getChartBuilder

**Định nghĩa**:

```typescript
getChartBuilder(chartId: string): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Trả về**: `VBIChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `chartId` | string | - |

### getInsightBuilder

**Định nghĩa**:

```typescript
getInsightBuilder(insightId: string): VBIInsightBuilder | undefined
```

**Trả về**: `VBIInsightBuilder \| undefined`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `insightId` | string | - |

### build

**Định nghĩa**:

```typescript
build(): VBIDashboardDSL
```

**Trả về**: `VBIDashboardDSL`

### isEmpty

**Định nghĩa**:

```typescript
isEmpty(): boolean
```

**Trả về**: `boolean`
