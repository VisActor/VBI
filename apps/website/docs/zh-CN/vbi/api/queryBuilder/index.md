# VBIQueryBuilder

独立查询构建器，管理可协同的查询配置，不依赖图表或 VSeed。

## 属性

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| **doc** | `Y.Doc` | - |
| **dsl** | `Y.Map<any>` | - |
| **dimensions** | `QueryDimensionsBuilderBase` | - |
| **measures** | `QueryMeasuresBuilderBase` | - |
| **calculations** | `CalculationsBuilder` | - |
| **whereFilter** | `WhereFilterBuilder` | - |
| **havingFilter** | `HavingFilterBuilder` | - |
| **limit** | `LimitBuilder` | - |
| **queryMode** | `QueryModeBuilder` | - |
| **undoManager** | `UndoManager` | 本地事务的撤销历史，每个事务独立成一步；doc.transact 可合并多项编辑。 |
| **adapters** | `VBIQueryBuilderAdapters<TQueryDSL>` | - |


## 方法

### constructor

**定义**:

```typescript
constructor(doc: Y.Doc, options?: VBIQueryBuilderOptions<TQueryDSL>)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `options?` | VBIQueryBuilderOptions&lt;TQueryDSL> | - |

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
build(): VBIQueryDSL
```

**返回**: `VBIQueryDSL`

### buildVQuery

编译当前查询配置，不执行取数。

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

### query

固定当前查询快照并执行；取数前校验计算表达式，非法时抛错。独立调用不缓存，不写入协同状态。

**定义**:

```typescript
query(options?: QueryOptions): Promise<VBIQueryResult>
```

**返回**: `Promise<VBIQueryResult>`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `options?` = {} | QueryOptions | - |