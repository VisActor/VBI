# VBIDashboardBuilder

基于 Yjs 的仪表盘构建器。管理组件、布局与主题；引用的图表和洞察资源拥有独立的文档及撤销历史。

## 属性

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| **doc** | `Y.Doc` | 所属 Yjs 文档；可对接同步提供者，通过 doc.destroy() 释放文档及撤销监听器。 |
| **dsl** | `Y.Map<any>` | 仪表盘根共享类型；嵌套组件与布局的本地事务均在撤销追踪范围内。 |
| **undoManager** | `UndoManager` | 仪表盘本地撤销历史，深度追踪 DSL 子类型，默认每个事务独立成一步；远端更新不进入历史。 |
| **theme** | `DashboardThemeBuilder` | 主题配置、预设与主题变化订阅。 |
| **chart** | `DashboardChartCollectionBuilder<TQueryDSL, TSeedDSL, VBIDashboardBuilder<TQueryDSL, TSeedDSL>>` | 图表组件的增删改查及布局提交。 |
| **insight** | `DashboardInsightCollectionBuilder<TQueryDSL, TSeedDSL, VBIDashboardBuilder<TQueryDSL, TSeedDSL>>` | 洞察组件的增删改查及布局提交。 |


## 方法

### constructor

**定义**:

```typescript
constructor(doc: Y.Doc, dependencies?: VBIDashboardBuilderDependencies<TQueryDSL, TSeedDSL>)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dependencies?` = {} | VBIDashboardBuilderDependencies<TQueryDSL, TSeedDSL> | - |

### applyUpdate

合并远端 Yjs 更新，不记录到本地撤销历史。origin 可用于同步提供者识别和防止回传。

**定义**:

```typescript
applyUpdate(update: Uint8Array, transactionOrigin?: unknown): void
```

**返回**: `void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `update` | Uint8Array | - |
| `transactionOrigin?` | unknown | - |

### encodeStateAsUpdate

导出 Yjs 更新；传入对端状态向量可仅导出增量。包含撤销/重做产生的文档变更，不包含本地历史栈。

**定义**:

```typescript
encodeStateAsUpdate(targetStateVector?: Uint8Array): Uint8Array
```

**返回**: `Uint8Array`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `targetStateVector?` | Uint8Array | - |

### transact

将多个同步修改合并为一个 Yjs 事务和撤销步骤。自定义 origin 需加入 undoManager 的 trackedOrigins；事务不会自动回滚异常。

**定义**:

```typescript
transact(callback: () => void, origin?: unknown): void
```

**返回**: `void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `callback` | () => void | - |
| `origin?` | unknown | - |

### getUUID

获取仪表盘资源 UUID。

**定义**:

```typescript
getUUID(): string
```

**返回**: `string`

### getChartBuilder

从当前 VBI 资源注册表解析图表构建器；资源修改使用图表自身的撤销历史。

**定义**:

```typescript
getChartBuilder(chartId: string): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**返回**: `VBIChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `chartId` | string | - |

### getInsightBuilder

从当前 VBI 资源注册表解析洞察构建器；资源修改使用洞察自身的撤销历史。

**定义**:

```typescript
getInsightBuilder(insightId: string): VBIInsightBuilder | undefined
```

**返回**: `VBIInsightBuilder \| undefined`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `insightId` | string | - |

### build

校验并导出纯 JSON DSL，Yjs 内部类型不会出现在结果中。

**定义**:

```typescript
build(): VBIDashboardDSL
```

**返回**: `VBIDashboardDSL`

### isEmpty

判断仪表盘是否不包含组件。

**定义**:

```typescript
isEmpty(): boolean
```

**返回**: `boolean`

---

# VBIDashboardBuilderDependencies

## 属性

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| **builderOptions?** | `VBIDashboardBuilderOptions<TQueryDSL, TSeedDSL>` | - |
| **resourceRegistry?** | `VBIResourceRegistry<TQueryDSL, TSeedDSL>` | - |


---

# VBIDashboardBuilderOptions

## 属性

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| **chart?** | `VBIChartBuilderOptions<TQueryDSL, TSeedDSL>` | - |
| **undoManager?** | `UndoManagerOptions` | 本地撤销配置；默认每个事务独立成一步，不记录远端同步。 |
