# VBIChartBuilder

## Propriétés

| Propriétés | taper | Description |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **adapters** | `VBIChartBuilderAdapters<TQueryDSL, TSeedDSL>` | - |
| **chartType** | `ChartTypeBuilder` | - |
| **measures** | `MeasuresBuilder` | - |
| **dimensions** | `DimensionsBuilder` | - |
| **havingFilter** | `HavingFilterBuilder` | - |
| **whereFilter** | `WhereFilterBuilder` | - |
| **theme** | `ThemeBuilder` | - |
| **locale** | `LocaleBuilder` | - |
| **limit** | `LimitBuilder` | - |
| **undoManager** | `UndoManager` | - |


## Méthodes

### constructor

**définition**:

```typescript
constructor(doc: Y.Doc, options: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>, dsl: Y.Map<any>)
```

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `options` | `VBIChartBuilderOptions<TQueryDSL, TSeedDSL>` | - |
| `dsl` | `Y.Map<any>` | - |

### applyUpdate

**définition**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin: any): void
```

**Retour** : `void`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `update` | `Uint8Array` | - |
| `transactionOrigin` | any | - |

### encodeStateAsUpdate

**définition**:

```typescript
encodeStateAsUpdate(targetStateVector: Uint8Array): Uint8Array<ArrayBufferLike>
```

**Retour** : `Uint8Array<ArrayBufferLike>`

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

### buildVSeed

**définition**:

```typescript
buildVSeed(options: BuildVSeedOptions): Promise<TSeedDSL>
```

**Retour** : `Promise<TSeedDSL>`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `options` = {} | BuildVSeedOptions | - |

### buildVQuery

**définition**:

```typescript
buildVQuery(): TQueryDSL
```

**Retour** : `TQueryDSL`

### build

**définition**:

```typescript
build(): VBIChartDSL
```

**Retour** : `VBIChartDSL`

### isEmpty

**définition**:

```typescript
isEmpty(): boolean
```

**Retour** : `boolean`

### getSchema

**définition**:

```typescript
getSchema(): Promise<any>
```

**Retour** : `Promise<any>`