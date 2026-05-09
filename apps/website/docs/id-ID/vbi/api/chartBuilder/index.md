# VBIChartBuilder

## Properti

| Properti | Ketik | Deskripsi |
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


## metode

### constructor

**definisi**:

```typescript
constructor(doc: Y.Doc, options: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>, dsl: Y.Map<any>)
```

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `options` | `VBIChartBuilderOptions<TQueryDSL, TSeedDSL>` | - |
| `dsl` | `Y.Map<any>` | - |

### applyUpdate

**definisi**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin: any): void
```

**Pengembalian**: `void`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `update` | `Uint8Array` | - |
| `transactionOrigin` | any | - |

### encodeStateAsUpdate

**definisi**:

```typescript
encodeStateAsUpdate(targetStateVector: Uint8Array): Uint8Array<ArrayBufferLike>
```

**Pengembalian**: `Uint8Array<ArrayBufferLike>`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `targetStateVector` | `Uint8Array` | - |

### getUUID

**definisi**:

```typescript
getUUID(): string
```

**Pengembalian**: `string`

### buildVSeed

**definisi**:

```typescript
buildVSeed(options: BuildVSeedOptions): Promise<TSeedDSL>
```

**Pengembalian**: `Promise<TSeedDSL>`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `options` = {} | BuildVSeedOptions | - |

### buildVQuery

**definisi**:

```typescript
buildVQuery(): TQueryDSL
```

**Pengembalian**: `TQueryDSL`

### build

**definisi**:

```typescript
build(): VBIChartDSL
```

**Pengembalian**: `VBIChartDSL`

### isEmpty

**definisi**:

```typescript
isEmpty(): boolean
```

**Pengembalian**: `boolean`

### getSchema

**definisi**:

```typescript
getSchema(): Promise<any>
```

**Pengembalian**: `Promise<any>`