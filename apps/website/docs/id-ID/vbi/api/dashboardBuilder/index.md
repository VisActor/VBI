# VBIDashboardBuilder

## Properti

| Properti | Tipe | Deskripsi |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |
| **theme** | `DashboardThemeBuilder` | - |
| **chart** | `DashboardChartCollectionBuilder<TQueryDSL, TSeedDSL, VBIDashboardBuilder<TQueryDSL, TSeedDSL>>` | - |
| **insight** | `DashboardInsightCollectionBuilder<TQueryDSL, TSeedDSL, VBIDashboardBuilder<TQueryDSL, TSeedDSL>>` | - |


## Metode

### constructor

**Definisi**:

```typescript
constructor(doc: Y.Doc, dependencies?: VBIDashboardBuilderDependencies<TQueryDSL, TSeedDSL>)
```

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dependencies?` = {} | VBIDashboardBuilderDependencies<TQueryDSL, TSeedDSL> | - |

### applyUpdate

**Definisi**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin?: any): any
```

**Mengembalikan**: `any`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `update` | Uint8Array | - |
| `transactionOrigin?` | any | - |

### encodeStateAsUpdate

**Definisi**:

```typescript
encodeStateAsUpdate(targetStateVector?: Uint8Array): any
```

**Mengembalikan**: `any`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `targetStateVector?` | Uint8Array | - |

### getUUID

**Definisi**:

```typescript
getUUID(): string
```

**Mengembalikan**: `string`

### getChartBuilder

**Definisi**:

```typescript
getChartBuilder(chartId: string): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Mengembalikan**: `VBIChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `chartId` | string | - |

### getInsightBuilder

**Definisi**:

```typescript
getInsightBuilder(insightId: string): VBIInsightBuilder | undefined
```

**Mengembalikan**: `VBIInsightBuilder \| undefined`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `insightId` | string | - |

### build

**Definisi**:

```typescript
build(): VBIDashboardDSL
```

**Mengembalikan**: `VBIDashboardDSL`

### isEmpty

**Definisi**:

```typescript
isEmpty(): boolean
```

**Mengembalikan**: `boolean`
