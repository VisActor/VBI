# VBIChartBuilder

## Eigenschaften

| Eigenschaften | Typ | Beschreibung |
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


## Methoden

### constructor

**Definition**:

```typescript
constructor(doc: Y.Doc, options: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>, dsl: Y.Map<any>)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `options` | `VBIChartBuilderOptions<TQueryDSL, TSeedDSL>` | - |
| `dsl` | `Y.Map<any>` | - |

### applyUpdate

**Definition**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin: any): void
```

**Rückgabe**: `void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `update` | `Uint8Array` | - |
| `transactionOrigin` | any | - |

### encodeStateAsUpdate

**Definition**:

```typescript
encodeStateAsUpdate(targetStateVector: Uint8Array): Uint8Array<ArrayBufferLike>
```

**Rückgabe**: `Uint8Array<ArrayBufferLike>`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `targetStateVector` | `Uint8Array` | - |

### getUUID

**Definition**:

```typescript
getUUID(): string
```

**Rückgabe**: `string`

### buildVSeed

**Definition**:

```typescript
buildVSeed(options: BuildVSeedOptions): Promise<TSeedDSL>
```

**Rückgabe**: `Promise<TSeedDSL>`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `options` = {} | BuildVSeedOptions | - |

### buildVQuery

**Definition**:

```typescript
buildVQuery(): TQueryDSL
```

**Rückgabe**: `TQueryDSL`

### build

**Definition**:

```typescript
build(): VBIChartDSL
```

**Rückgabe**: `VBIChartDSL`

### isEmpty

**Definition**:

```typescript
isEmpty(): boolean
```

**Rückgabe**: `boolean`

### getSchema

**Definition**:

```typescript
getSchema(): Promise<any>
```

**Rückgabe**: `Promise<any>`