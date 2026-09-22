# VBIDashboardBuilder

## Properties

| Property | Type | Description |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |
| **theme** | `DashboardThemeBuilder` | - |
| **chart** | `DashboardChartCollectionBuilder<TQueryDSL, TSeedDSL, VBIDashboardBuilder<TQueryDSL, TSeedDSL>>` | - |
| **insight** | `DashboardInsightCollectionBuilder<TQueryDSL, TSeedDSL, VBIDashboardBuilder<TQueryDSL, TSeedDSL>>` | - |


## Methods

### constructor

**Definition**:

```typescript
constructor(doc: Y.Doc, dependencies?: VBIDashboardBuilderDependencies<TQueryDSL, TSeedDSL>)
```

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dependencies?` = {} | VBIDashboardBuilderDependencies<TQueryDSL, TSeedDSL> | - |

### applyUpdate

**Definition**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin?: any): any
```

**Returns**: `any`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `update` | Uint8Array | - |
| `transactionOrigin?` | any | - |

### encodeStateAsUpdate

**Definition**:

```typescript
encodeStateAsUpdate(targetStateVector?: Uint8Array): any
```

**Returns**: `any`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `targetStateVector?` | Uint8Array | - |

### getUUID

**Definition**:

```typescript
getUUID(): string
```

**Returns**: `string`

### getChartBuilder

**Definition**:

```typescript
getChartBuilder(chartId: string): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Returns**: `VBIChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `chartId` | string | - |

### getInsightBuilder

**Definition**:

```typescript
getInsightBuilder(insightId: string): VBIInsightBuilder | undefined
```

**Returns**: `VBIInsightBuilder \| undefined`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `insightId` | string | - |

### build

**Definition**:

```typescript
build(): VBIDashboardDSL
```

**Returns**: `VBIDashboardDSL`

### isEmpty

**Definition**:

```typescript
isEmpty(): boolean
```

**Returns**: `boolean`
