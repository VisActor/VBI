# DashboardInsightCollectionBuilder

## 方法

### constructor

**定义**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>, dashboardBuilder: TDashboardBuilder)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |
| `dashboardBuilder` | TDashboardBuilder | - |

### add

新增洞察组件，回调必须设置 layouts.lg。组件与各断点布局在同一个 Yjs 事务中写入，可一起撤销。

**定义**:

```typescript
add(callback: (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**返回**: `TDashboardBuilder`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `callback` | (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void | - |

### update

在同一个 Yjs 事务中更新洞察组件及布局；未找到组件时抛出错误。

**定义**:

```typescript
update(widgetId: string, callback: (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**返回**: `TDashboardBuilder`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `widgetId` | string | - |
| `callback` | (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void | - |

### remove

在同一个 Yjs 事务中删除洞察组件及全部断点布局，可一起恢复；引用资源不会删除。

**定义**:

```typescript
remove(widgetId: string): TDashboardBuilder
```

**返回**: `TDashboardBuilder`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `widgetId` | string | - |

### get

通过组件 ID 或引用资源 ID 获取组件构建器，未找到时返回 undefined。

**定义**:

```typescript
get(widgetId: string): DashboardInsightBuilder<TQueryDSL, TSeedDSL> | undefined
```

**返回**: `DashboardInsightBuilder<TQueryDSL, TSeedDSL> \| undefined`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `widgetId` | string | - |

### find

通过组件 ID 或引用资源 ID 查找第一个匹配的组件。

**定义**:

```typescript
find(id: string): DashboardInsightBuilder<TQueryDSL, TSeedDSL> | undefined
```

**返回**: `DashboardInsightBuilder<TQueryDSL, TSeedDSL> \| undefined`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | - |

### findAll

按仪表盘顺序获取全部洞察组件构建器。

**定义**:

```typescript
findAll(): DashboardInsightBuilder<TQueryDSL, TSeedDSL>[]
```

**返回**: `DashboardInsightBuilder<TQueryDSL, TSeedDSL>[]`

### toJSON

导出全部洞察组件的纯 JSON 配置。

**定义**:

```typescript
toJSON(): VBIDashboardWidget[]
```

**返回**: `VBIDashboardWidget[]`