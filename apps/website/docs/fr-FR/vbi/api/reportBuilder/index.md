# VBIReportBuilder

## Propriétés

| Propriétés | taper | Description |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **undoManager** | `UndoManager` | - |
| **page** | `ReportPageCollectionBuilder<TQueryDSL, TSeedDSL>` | - |


## Méthodes

### constructor

**définition**:

```typescript
constructor(doc: Y.Doc, options: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>, resourceRegistry: VBIResourceRegistry<TQueryDSL, TSeedDSL>)
```

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `options` | `VBIReportBuilderOptions<TQueryDSL, TSeedDSL>` | - |
| `resourceRegistry` | `VBIResourceRegistry<TQueryDSL, TSeedDSL>` | - |

### applyUpdate

**définition**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin: any): any
```

**Retour** : `any`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `update` | `Uint8Array` | - |
| `transactionOrigin` | any | - |

### encodeStateAsUpdate

**définition**:

```typescript
encodeStateAsUpdate(targetStateVector: Uint8Array): any
```

**Retour** : `any`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `targetStateVector` | `Uint8Array` | - |

### getUUID

**définition**:

```typescript
getUUID(): string
```

**Retour** : `string`

### getChartBuilder

**définition**:

```typescript
getChartBuilder(chartId: string): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Retour** : `VBIChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `chartId` | string | - |

### getInsightBuilder

**définition**:

```typescript
getInsightBuilder(insightId: string): VBIInsightBuilder | undefined
```

**Retour** : `VBIInsightBuilder \| undefined`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `insightId` | string | - |

### build

**définition**:

```typescript
build(): VBIReportDSL
```

**Retour** : `VBIReportDSL`

### snapshot

**définition**:

```typescript
snapshot(): VBIReportSnapshotDSL
```

**Retour** : `VBIReportSnapshotDSL`

### isEmpty

**définition**:

```typescript
isEmpty(): boolean
```

**Retour** : `boolean`