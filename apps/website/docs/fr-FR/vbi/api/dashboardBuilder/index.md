# VBIDashboardBuilder

## Propriétés

| Propriété | Type | Description |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |
| **theme** | `DashboardThemeBuilder` | - |
| **chart** | `DashboardChartCollectionBuilder<TQueryDSL, TSeedDSL, VBIDashboardBuilder<TQueryDSL, TSeedDSL>>` | - |
| **insight** | `DashboardInsightCollectionBuilder<TQueryDSL, TSeedDSL, VBIDashboardBuilder<TQueryDSL, TSeedDSL>>` | - |


## Méthodes

### constructor

**Définition**:

```typescript
constructor(doc: Y.Doc, dependencies?: VBIDashboardBuilderDependencies<TQueryDSL, TSeedDSL>)
```

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dependencies?` = {} | VBIDashboardBuilderDependencies<TQueryDSL, TSeedDSL> | - |

### applyUpdate

**Définition**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin?: any): any
```

**Retour**: `any`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `update` | Uint8Array | - |
| `transactionOrigin?` | any | - |

### encodeStateAsUpdate

**Définition**:

```typescript
encodeStateAsUpdate(targetStateVector?: Uint8Array): any
```

**Retour**: `any`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `targetStateVector?` | Uint8Array | - |

### getUUID

**Définition**:

```typescript
getUUID(): string
```

**Retour**: `string`

### getChartBuilder

**Définition**:

```typescript
getChartBuilder(chartId: string): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Retour**: `VBIChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `chartId` | string | - |

### getInsightBuilder

**Définition**:

```typescript
getInsightBuilder(insightId: string): VBIInsightBuilder | undefined
```

**Retour**: `VBIInsightBuilder \| undefined`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `insightId` | string | - |

### build

**Définition**:

```typescript
build(): VBIDashboardDSL
```

**Retour**: `VBIDashboardDSL`

### isEmpty

**Définition**:

```typescript
isEmpty(): boolean
```

**Retour**: `boolean`
