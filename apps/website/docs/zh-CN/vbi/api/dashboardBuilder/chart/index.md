# DashboardChartCollectionBuilder

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

新增图表组件，回调必须设置 layouts.lg。组件与各断点布局在同一个 Yjs 事务中写入，可一起撤销。

**定义**:

```typescript
add(callback: (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**返回**: `TDashboardBuilder`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `callback` | (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void | - |

### update

在同一个 Yjs 事务中更新图表组件及布局；未找到组件时抛出错误。

**定义**:

```typescript
update(widgetId: string, callback: (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder
```

**返回**: `TDashboardBuilder`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `widgetId` | string | - |
| `callback` | (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void | - |

### remove

在同一个 Yjs 事务中删除图表组件及全部断点布局，可一起恢复；引用资源不会删除。

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
get(widgetId: string): DashboardChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**返回**: `DashboardChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `widgetId` | string | - |

### find

通过组件 ID 或引用资源 ID 查找第一个匹配的组件。

**定义**:

```typescript
find(id: string): DashboardChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**返回**: `DashboardChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | - |

### findAll

按仪表盘顺序获取全部图表组件构建器。

**定义**:

```typescript
findAll(): DashboardChartBuilder<TQueryDSL, TSeedDSL>[]
```

**返回**: `DashboardChartBuilder<TQueryDSL, TSeedDSL>[]`

### toJSON

导出全部图表组件的纯 JSON 配置。

**定义**:

```typescript
toJSON(): VBIDashboardWidget[]
```

**返回**: `VBIDashboardWidget[]`