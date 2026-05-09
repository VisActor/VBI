# VBIChartBuilder

## プロパティ

| プロパティ | 型 | 説明 |
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


## メソッド

### constructor

**定義**:

```typescript
constructor(doc: Y.Doc, options: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>, dsl: Y.Map<any>)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `options` | `VBIChartBuilderOptions<TQueryDSL, TSeedDSL>` | - |
| `dsl` | `Y.Map<any>` | - |

### applyUpdate

**定義**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin: any): void
```

**戻り値**: `void`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `update` | `Uint8Array` | - |
| `transactionOrigin` | any | - |

### encodeStateAsUpdate

**定義**:

```typescript
encodeStateAsUpdate(targetStateVector: Uint8Array): Uint8Array<ArrayBufferLike>
```

**戻り値**: `Uint8Array<ArrayBufferLike>`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `targetStateVector` | `Uint8Array` | - |

### getUUID

**定義**:

```typescript
getUUID(): string
```

**戻り値**: `string`

### buildVSeed

**定義**:

```typescript
buildVSeed(options: BuildVSeedOptions): Promise<TSeedDSL>
```

**戻り値**: `Promise<TSeedDSL>`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `options` = {} | BuildVSeedOptions | - |

### buildVQuery

**定義**:

```typescript
buildVQuery(): TQueryDSL
```

**戻り値**: `TQueryDSL`

### build

**定義**:

```typescript
build(): VBIChartDSL
```

**戻り値**: `VBIChartDSL`

### isEmpty

**定義**:

```typescript
isEmpty(): boolean
```

**戻り値**: `boolean`

### getSchema

**定義**:

```typescript
getSchema(): Promise<any>
```

**戻り値**: `Promise<any>`
