# VBIChartBuilder

## Thuộc tính

| Thuộc tính| loại| Giải thích |
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


## Phương pháp

### constructor

**Định nghĩa**:

```typescript
constructor(doc: Y.Doc, options: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>, dsl: Y.Map<any>)
```

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `options` | `VBIChartBuilderOptions<TQueryDSL, TSeedDSL>` | - |
| `dsl` | `Y.Map<any>` | - |

### applyUpdate

**Định nghĩa**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin: any): void
```

**Trở về**: `void`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `update` | `Uint8Array` | - |
| `transactionOrigin` | any | - |

### encodeStateAsUpdate

**Định nghĩa**:

```typescript
encodeStateAsUpdate(targetStateVector: Uint8Array): Uint8Array<ArrayBufferLike>
```

**Trở về**: `Uint8Array<ArrayBufferLike>`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `targetStateVector` | `Uint8Array` | - |

### getUUID

**Định nghĩa**:

```typescript
getUUID(): string
```

**Trở về**: `string`

### buildVSeed

**Định nghĩa**:

```typescript
buildVSeed(options: BuildVSeedOptions): Promise<TSeedDSL>
```

**Trở về**: `Promise<TSeedDSL>`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `options` = {} | BuildVSeedOptions | - |

### buildVQuery

**Định nghĩa**:

```typescript
buildVQuery(): TQueryDSL
```

**Trở về**: `TQueryDSL`

### build

**Định nghĩa**:

```typescript
build(): VBIChartDSL
```

**Trở về**: `VBIChartDSL`

### isEmpty

**Định nghĩa**:

```typescript
isEmpty(): boolean
```

**Trở về**: `boolean`

### getSchema

**Định nghĩa**:

```typescript
getSchema(): Promise<any>
```

**Trở về**: `Promise<any>`