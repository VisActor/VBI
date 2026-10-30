# VBIChartBuilder

## 属性

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **adapters** | `Required<VBIChartBuilderAdapters<TQueryDSL, TSeedDSL>>` | - |
| **chartType** | `ChartTypeBuilder` | - |
| **instance** | `ChartInstanceBuilder` | 图表运行时实例的绑定、获取与原生事件代理。 |
| **measures** | `MeasuresBuilder` | - |
| **dimensions** | `DimensionsBuilder` | - |
| **havingFilter** | `HavingFilterBuilder` | - |
| **whereFilter** | `WhereFilterBuilder` | - |
| **theme** | `ThemeBuilder` | - |
| **locale** | `LocaleBuilder` | - |
| **limit** | `LimitBuilder` | - |
| **queryMode** | `QueryModeBuilder` | 图表查询粒度，普通表可选择源记录明细；缺省保持聚合查询。 |
| **undoManager** | `UndoManager` | 图表撤销历史，每个 Yjs 事务独立成一步；连续 add / update 不按时间合并，doc.transact 可显式合并多个修改。 |


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
| `options?` | VBIChartBuilderOptions<TQueryDSL, TSeedDSL> | - |
| `dsl?` | Y.Map<any> | - |

### observe

订阅图表 DSL 顶层字段变化，与 dsl.observe 语义一致；不包含嵌套字段修改，也不触发首次渲染。

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

取消指定的图表 DSL 顶层订阅，传入 observe 时使用的同一回调。

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

订阅整个图表 DSL 的深层变化，包括嵌套筛选、字段、本地编辑、撤销重做及协同更新；同一事务通知一次，不包含运行时实例变化，也不触发首次渲染。

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

取消指定的图表 DSL 深层订阅，传入 observeDeep 时使用的同一回调。

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

### buildVSeed

默认通过 query adapter 查询一次并构建 VSeed。自定义 seed adapter 保留原有上下文和取数方式。

**定义**:

```typescript
buildVSeed(options?: BuildVSeedOptions): Promise<TSeedDSL>
```

**返回**: `Promise<TSeedDSL>`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `options?` = {} | BuildVSeedOptions | - |

### buildVQuery

**定义**:

```typescript
buildVQuery(): TQueryDSL
```

**返回**: `TQueryDSL`

### query

根据当前图表配置，通过 query adapter 执行并原样返回查询结果。默认查询保留维度和度量 ID，并将 signal 传给 Connector；独立调用不缓存结果。

**定义**:

```typescript
query(options?: QueryOptions): Promise<VBIQueryResult>
```

**返回**: `Promise<VBIQueryResult>`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `options?` = {} | QueryOptions | - |

### build

**定义**:

```typescript
build(): VBIChartDSL
```

**返回**: `VBIChartDSL`

### isEmpty

**定义**:

```typescript
isEmpty(): boolean
```

**返回**: `boolean`

### getSchema

**定义**:

```typescript
getSchema(): Promise<{ name: string; type: string; }[]>
```

**返回**: `Promise<{ name: string; type: string; }[]>`