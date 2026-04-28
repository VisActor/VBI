# VBIChartBuilder

## Properties

| Property         | Type                                           | Description |
| ---------------- | ---------------------------------------------- | ----------- |
| **doc**          | `Y.Doc`                                        | -           |
| **dsl**          | `Y.Map<any>`                                   | -           |
| **adapters**     | `VBIChartBuilderAdapters<TQueryDSL, TSeedDSL>` | -           |
| **chartType**    | `ChartTypeBuilder`                             | -           |
| **measures**     | `MeasuresBuilder`                              | -           |
| **dimensions**   | `DimensionsBuilder`                            | -           |
| **havingFilter** | `HavingFilterBuilder`                          | -           |
| **whereFilter**  | `WhereFilterBuilder`                           | -           |
| **theme**        | `ThemeBuilder`                                 | -           |
| **locale**       | `LocaleBuilder`                                | -           |
| **limit**        | `LimitBuilder`                                 | -           |
| **undoManager**  | `UndoManager`                                  | -           |

## Methods

### constructor

**Definition**:

```typescript
constructor(doc: Y.Doc, options: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>, dsl: Y.Map<any>)
```

**Parameters**:

| Parameter | Type                                         | Description |
| --------- | -------------------------------------------- | ----------- |
| `doc`     | Y.Doc                                        | -           |
| `options` | VBIChartBuilderOptions\<TQueryDSL, TSeedDSL> | -           |
| `dsl`     | Y.Map<any>                                   | -           |

### applyUpdate

**Definition**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin: any): void
```

**Returns**: `void`

**Parameters**:

| Parameter           | Type       | Description |
| ------------------- | ---------- | ----------- |
| `update`            | Uint8Array | -           |
| `transactionOrigin` | any        | -           |

### encodeStateAsUpdate

**Definition**:

```typescript
encodeStateAsUpdate(targetStateVector: Uint8Array): Uint8Array<ArrayBufferLike>
```

**Returns**: `Uint8Array<ArrayBufferLike>`

**Parameters**:

| Parameter           | Type       | Description |
| ------------------- | ---------- | ----------- |
| `targetStateVector` | Uint8Array | -           |

### buildVSeed

**Definition**:

```typescript
buildVSeed(options: BuildVSeedOptions): Promise<TSeedDSL>
```

**Returns**: `Promise<TSeedDSL>`

**Parameters**:

| Parameter       | Type              | Description |
| --------------- | ----------------- | ----------- |
| `options` = \{} | BuildVSeedOptions | -           |

### buildVQuery

**Definition**:

```typescript
buildVQuery(): TQueryDSL
```

**Returns**: `TQueryDSL`

### build

**Definition**:

```typescript
build(): VBIChartDSL
```

**Returns**: `VBIChartDSL`

### isEmpty

**Definition**:

```typescript
isEmpty(): boolean
```

**Returns**: `boolean`

### getSchema

**Definition**:

```typescript
getSchema(): Promise<any>
```

**Returns**: `Promise<any>`
