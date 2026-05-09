# VBIChartBuilder

## 속성

| 속성 | 타입 | 설명 |
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


## 메서드

### constructor

**정의**:

```typescript
constructor(doc: Y.Doc, options: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>, dsl: Y.Map<any>)
```

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `options` | `VBIChartBuilderOptions<TQueryDSL, TSeedDSL>` | - |
| `dsl` | `Y.Map<any>` | - |

### applyUpdate

**정의**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin: any): void
```

**반환**: `void`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `update` | `Uint8Array` | - |
| `transactionOrigin` | any | - |

### encodeStateAsUpdate

**정의**:

```typescript
encodeStateAsUpdate(targetStateVector: Uint8Array): Uint8Array<ArrayBufferLike>
```

**반환**: `Uint8Array<ArrayBufferLike>`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `targetStateVector` | `Uint8Array` | - |

### getUUID

**정의**:

```typescript
getUUID(): string
```

**반환**: `string`

### buildVSeed

**정의**:

```typescript
buildVSeed(options: BuildVSeedOptions): Promise<TSeedDSL>
```

**반환**: `Promise<TSeedDSL>`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `options` = {} | BuildVSeedOptions | - |

### buildVQuery

**정의**:

```typescript
buildVQuery(): TQueryDSL
```

**반환**: `TQueryDSL`

### build

**정의**:

```typescript
build(): VBIChartDSL
```

**반환**: `VBIChartDSL`

### isEmpty

**정의**:

```typescript
isEmpty(): boolean
```

**반환**: `boolean`

### getSchema

**정의**:

```typescript
getSchema(): Promise<any>
```

**반환**: `Promise<any>`