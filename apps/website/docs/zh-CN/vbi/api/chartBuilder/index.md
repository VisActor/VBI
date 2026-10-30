# VBIChartBuilder

## 属性

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **dimensions** | `DimensionsBuilder` | - |
| **measures** | `MeasuresBuilder` | - |
| **calculations** | `CalculationsBuilder` | - |
| **whereFilter** | `WhereFilterBuilder` | - |
| **havingFilter** | `HavingFilterBuilder` | - |
| **limit** | `LimitBuilder` | - |
| **queryMode** | `QueryModeBuilder` | - |
| **undoManager** | `UndoManager` | 本地事务的撤销历史，每个事务独立成一步；doc.transact 可合并多项编辑。 |
| **adapters** | `Required<VBIChartBuilderAdapters<TQueryDSL, TSeedDSL>>` | - |
| **chartType** | `ChartTypeBuilder` | - |
| **instance** | `ChartInstanceBuilder` | 图表运行时实例的绑定、获取与原生事件代理。 |
| **theme** | `ThemeBuilder` | - |
| **locale** | `LocaleBuilder` | - |


## 方法

### constructor

**定义**:

```typescript
constructor(doc: Y.Doc, options?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>, dsl?: Y.Map<any>)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `options?` | VBIChartBuilderOptions&lt;TQueryDSL, TSeedDSL> | - |
| `dsl?` | Y.Map&lt;any> | - |

### observe

订阅 DSL 顶层字段变化，不包含嵌套修改，也不触发首次通知。

**定义**:

```typescript
observe(callback: ObserveCallback): void
```

**返回**: `void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `callback` | ObserveCallback | - |

### unobserve

取消顶层订阅，传入注册时的同一回调。

**定义**:

```typescript
unobserve(callback: ObserveCallback): void
```

**返回**: `void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `callback` | ObserveCallback | - |

### observeDeep

订阅全部 DSL 变化，同一事务通知一次，不包含执行结果或运行时实例。

**定义**:

```typescript
observeDeep(callback: ObserveDeepCallback): void
```

**返回**: `void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - |

### unobserveDeep

取消深层订阅，传入注册时的同一回调。

**定义**:

```typescript
unobserveDeep(callback: ObserveDeepCallback): void
```

**返回**: `void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - |

### applyUpdate

**定义**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin?: any): void
```

**返回**: `void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `update` | Uint8Array | - |
| `transactionOrigin?` | any | - |

### encodeStateAsUpdate

**定义**:

```typescript
encodeStateAsUpdate(targetStateVector?: Uint8Array): Uint8Array<ArrayBufferLike>
```

**返回**: `Uint8Array<ArrayBufferLike>`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `targetStateVector?` | Uint8Array | - |

### getUUID

**定义**:

```typescript
getUUID(): string
```

**返回**: `string`

### getSchema

发现当前数据连接的字段结构。

**定义**:

```typescript
getSchema(): Promise<{ name: string; type: string; }[]>
```

**返回**: `Promise<{ name: string; type: string; }[]>`

### build

**定义**:

```typescript
build(): VBIChartDSL
```

**返回**: `VBIChartDSL`

### buildVQuery

**定义**:

```typescript
buildVQuery(): TQueryDSL
```

**返回**: `TQueryDSL`

### queryProfile

通过 Query DSL 统计当前查询结果，不写入协同状态或撤销历史。

**定义**:

```typescript
queryProfile(options?: ProfileOptions): Promise<ProfileResult>
```

**返回**: `Promise<ProfileResult>`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `options?` = {} | ProfileOptions | - |

### queryBins

独立查询数值分箱；计数由数据源聚合，不读取明细记录。

**定义**:

```typescript
queryBins(options?: BinsOptions): Promise<BinsResult>
```

**返回**: `Promise<BinsResult>`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `options?` = {} | BinsOptions | - |

### isEmpty

**定义**:

```typescript
isEmpty(): boolean
```

**返回**: `boolean`

### buildVSeed

校验计算表达式后，默认通过 query adapter 查询一次并构建 VSeed；非法表达式抛错。自定义 seed adapter 保留原有上下文和取数方式。

**定义**:

```typescript
buildVSeed(options?: BuildVSeedOptions): Promise<TSeedDSL>
```

**返回**: `Promise<TSeedDSL>`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `options?` = {} | BuildVSeedOptions | - |

### query

根据当前图表配置，取数前校验计算表达式，非法时抛错；通过 query adapter 执行并原样返回查询结果。默认查询保留维度和度量 ID，并将 signal 传给 Connector；独立调用不缓存结果。

**定义**:

```typescript
query(options?: QueryOptions): Promise<VBIQueryResult>
```

**返回**: `Promise<VBIQueryResult>`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `options?` = {} | QueryOptions | - |