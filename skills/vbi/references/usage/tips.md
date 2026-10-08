# VBI 使用最佳实践

从三个 HTML 示例提炼的接入与复用技巧，适用于单图、自定义指标卡和仪表盘。先阅读本文确定数据、状态与渲染的分工；浏览器 ESM 入口和完整启动代码见[在 HTML 中使用 VBI](./how-use-vbi-in-html.md)，接口签名见 [API 索引](../api/index.md)。

示例入口：[精致散点图](../../examples/polished-chart.html)、[轻量看板](../../examples/lightweight-dashboard.html)、[业务大屏](../../examples/large-screen.html)。其中的固定日期、配色、标签偏移和图形组合服务于各自场景，不作为其他页面的默认配置。

下面的片段按场景选用，假定已导入 `VBI`、`VQuery`、VSeed 的 `Builder` / `registerAll` 及 `VChart`，并准备好片段使用的图表 Builder 或 DOM 容器。

## 1. 固定构建链路，逐层检查结果

三个示例的默认链路是：`Chart Builder → buildVSeed() → VSeed Builder → VChart`。

| 层次               | 职责                                      | 排查时检查                                 |
| ------------------ | ----------------------------------------- | ------------------------------------------ |
| VBI                | 管理图表 DSL，通过 Builder 配置查询与编码 | `build()` 中的维度、度量、筛选、排序和编码 |
| Connector / VQuery | 执行查询，返回分组、聚合后的结果          | `buildVQuery()` 与实际返回的数据           |
| VSeed              | 将含数据的 VSeed DSL 构建为渲染配置       | `seed.dataset`、字段 ID 与生成的 spec      |
| VChart / UI        | 绘图、DOM、交互与尺寸管理                 | 容器大小、渲染实例及交互反馈               |

```javascript
// chartBuilder 已通过公开 Builder API 配置，连接器已注册。
registerAll()
const chartDSL = chartBuilder.build()
const queryDSL = chartBuilder.buildVQuery()
const seed = await chartBuilder.buildVSeed()
const spec = Builder.from(seed).build()
const chart = new VChart(spec, { dom: document.querySelector('#chart') })
chart.renderSync()
```

`build()` 与 `buildVQuery()` 不执行查询；`buildVSeed()` 会调用连接器。调试时先确认 `chartDSL` 和 `queryDSL` 的语义，再检查数据与视觉配置，避免通过修改图形样式掩盖查询问题。表格使用对应的 VTable 渲染链路，或直接让 HTML 消费查询结果。

**验证：** 用一组可手算的数据检查分组、聚合和筛选，确认结果正确后再增加视觉定制。

## 2. 用 Connector 隔离数据来源

图表通过 `connectorId` 关联数据源。连接器提供 `discoverSchema()`，并执行 `query()` 收到的 `queryDSL`。本地演示可委托 VQuery；更换数据源时，只要字段及查询语义保持一致，就可以保留图表的分析配置。

```javascript
// connectorId、schema、rawDataset 由当前数据源提供。
const query = new VQuery()
const source = { type: 'json', rawDataset }
if (await query.hasDataset(connectorId)) {
  await query.updateDatasetSource(connectorId, schema, source)
} else {
  await query.createDataset(connectorId, schema, source)
}
VBI.connectors.register(connectorId, {
  discoverSchema: async () => schema,
  query: async ({ queryDSL }) => {
    const dataset = await query.connectDataset(connectorId)
    try {
      return await dataset.query(queryDSL)
    } finally {
      await dataset.disconnect()
    }
  },
})
```

VQuery 浏览器数据集会保存在 IndexedDB 中，因此刷新页面也要处理已有数据集。更新时同时传入 `schema` 和 `source`，查询连接在 `finally` 中释放。

业务聚合由查询层执行。页面若还直接读取原始数组计算标签、前沿或参考值，这些依赖也需要随数据源一起处理；仅替换连接器不会自动替换页面闭包中的数据。

**验证：** 检查首次加载、刷新后的更新，以及筛选后返回的数据；确认连接器没有忽略传入的查询条件。

## 3. 用图表 Builder 为自定义 UI 查询数据

指标卡、排行榜、进度条和 HTML 表格可以使用 `table` 类型的 Builder 获取数据，不必为了接入 VBI 将它们全部绘制成图表。

```javascript
const summary = VBI.chart.create(VBI.chart.createEmpty(connectorId))
summary.chartType.changeChartType('table')
summary.measures
  .add('sales', (node) => node.setAlias('销售额').setAggregate({ func: 'sum' }))
  .add('orders', (node) => node.setAlias('订单数').setAggregate({ func: 'sum' }))
const summarySeed = await summary.buildVSeed()
// summarySeed.dataset 交给指标卡消费，无需创建 VChart / VTable 实例。
```

不添加维度可获取整体汇总，添加 `region`、`product` 等维度可获取分组结果。排行的排序通过度量 Builder 的 `setSort()` 表达；需要限制查询结果条数时使用图表的 limit 能力。

客单价、毛利率、前周期增长率等计算要明确指标口径，例如 `sum(orders) / sum(viewers)` 与 `avg(orders / viewers)` 含义不同。如果这些公式及其依赖需要作为 VBI 能力保存、恢复和复用，应在所属 DSL 与 Builder 中建模。当前示例中的页面除法和周期比较并未因此自动成为可序列化指标；不要假定现有 DSL 已提供对应公式字段。

**验证：** 在不创建 UI 的情况下运行同一 Builder，仍能得到正确的基础聚合结果；派生指标另外检查计算口径和零分母处理。

## 4. 一次查询，生成多个视图

大屏将同一份数据分别绘制为镜像条图的左右两侧、双层环图的内外环。主趋势、迷你趋势和明细表也可以复用查询结果。

将查询与绘制分开：查询函数返回 seed，绘制函数接收 seed，避免每个视图内部再次调用 `buildVSeed()`。

```javascript
const seed = await trendBuilder.buildVSeed()
function buildTrendSpec(seed, compact) {
  return Builder.from({
    ...seed,
    legend: { enable: false },
    xAxis: { visible: !compact },
    yAxis: { visible: !compact },
  }).build()
}
const mainSpec = buildTrendSpec(seed, false)
const miniSpec = buildTrendSpec(seed, true)
// 分别交给两个容器的渲染实例；数据查询只发生一次。
```

每个视图创建自己的配置。浅拷贝仍共享 `dataset` 及其他嵌套对象；需要排序、截取或修改嵌套属性时创建对应副本，避免一个视图污染另一个视图。独立查询可以通过 `Promise.all` 并发执行，但相同查询优先复用结果。

**验证：** 记录一次刷新中的连接器调用次数；切换紧凑样式等纯视觉选项时，不应无故重新查询。筛选改变后重新获取数据，避免复用过期结果。

## 5. 保留查询字段 ID，在 UI 边界映射名称

VBI 查询结果的列名是维度、度量的生成 ID。传给 VSeed 的数据应保留这些 ID；自定义 UI 可以根据 Builder DSL 显式映射为业务字段。

```javascript
// 接上文的 summary / summarySeed：每个业务字段只有一个度量。
const dsl = summary.build()
const salesId = dsl.measures.find((node) => 'field' in node && node.field === 'sales').id
const ordersId = dsl.measures.find((node) => 'field' in node && node.field === 'orders').id
const rows = summarySeed.dataset.map((row) => ({
  sales: row[salesId],
  orders: row[ordersId],
}))
```

示例中的 `rowsOf()` 适用于平铺且业务字段唯一的维度、度量。对于同一字段的 `sum` / `avg` 等多个度量，按 `field` 生成对象键会覆盖值，应分别保留度量 ID 或映射为 `salesSum`、`salesAvg` 等明确名称。使用维度或度量分组时，还需处理其 `children`，不要直接照搬平铺映射。

**验证：** 自定义 UI 显示的数值与 seed 中对应 ID 的数值一致；适配过程只映射字段，不再次聚合数据。

## 6. 按层次定制视觉，保留分析语义

| 内容                                             | 优先归属           |
| ------------------------------------------------ | ------------------ |
| 维度、度量、聚合、筛选、排序、编码               | VBI DSL 与 Builder |
| 颜色、坐标轴、图例、标签、线点样式               | VSeed 配置         |
| VSeed 尚未覆盖的精细刻度、特殊标记、组合绘制     | VChart spec 定制   |
| 卡片、按钮、页面装饰、入场动画、焦点与无障碍交互 | HTML / CSS / UI    |

优先使用当前层已经支持的配置。对生成的 spec 进行补充时，将代码集中到明确的渲染函数中，例如散点图的 `decorate(seed)`；在升级依赖后检查所依赖的坐标轴、series 和 mark 结构。

查询后修改 seed 或 spec 不会回写 VBI DSL。因此要区分纯视觉处理与分析范围变化：渐变、标签偏移可以在渲染层处理；“最近七天”若是该图表需要恢复的数据范围，应通过该图表的筛选表达，不能仅依赖 `seed.dataset.slice(-7)`。

Pareto 前沿的计算范围、参考模型选择、派生指标公式属于分析语义；线宽、标记颜色和标签位置属于视觉表达。需要跨集成复用时分别确定归属，避免将领域规则藏在渲染适配器中。

**验证：** 分别检查默认生成结果与定制后的结果；确认样式定制未改变查询语义，导出范围与用户看到的数据范围一致。

## 7. 用 Dashboard 保存资源关系和布局

Dashboard 的组件通过 `chartId` / `insightId` 引用资源。通过同一 VBI 实例创建的 Chart、Insight Builder 会自动注册为资源，组件引用不会复制资源内容。

```javascript
const dashboard = VBI.dashboard.create(VBI.dashboard.createEmpty())
dashboard.chart.add((widget) => {
  widget
    .setChart(trendBuilder)
    .setTitle('销售趋势')
    .setLayouts({
      lg: { x: 0, y: 0, w: 8, h: 4 },
      xs: { x: 0, y: 0, w: 12, h: 4 },
    })
  document.querySelector('#trend-panel').dataset.widget = widget.getId()
})
```

新增组件提供 `lg` 布局；`setLayouts()` 在组件集合的 `add` / `update` 回调中提交。在集合回调外调用它不会写入 Dashboard 布局。完整操作见 [Dashboard Builder API](../api/dashboard-builder.md)。

UI 从 `dashboard.build().layout[breakpoint]` 读取布局，按 `widgetId` 找到容器，将 `x/y/w/h` 映射为 CSS Grid 的列、行和跨度。列数、行高及断点对应的样式由宿主明确配置，CSS 与 DSL 的断点要保持一致；三个示例中的具体网格比例不必照搬。

Insight 中保存的文本或图片引用应由 UI 读取并展示。不要同时在 Insight 和 HTML 中维护相同内容，否则修改资源后画面可能仍显示旧内容。

**验证：** 检查宽屏和窄屏的组件对应关系；修改 Insight 内容后确认展示随资源更新。移除 UI 后，资源引用及布局仍可从 Dashboard DSL 读取。

## 8. 明确筛选作用域，并验证配置恢复

### 筛选规则先于事件回调

先列出交互影响的组件，再调用这些图表的筛选 Builder。三个示例展示了不同的作用域：

| 交互             | 受影响内容               | 保持原口径的内容       |
| ---------------- | ------------------------ | ---------------------- |
| 散点图提供商筛选 | 散点、模型标签、数据表   | 全局前沿、固定参考模型 |
| 大屏地区筛选     | 全部数据组件             | 直播示意内容           |
| 大屏天数切换     | 趋势组件                 | 全月总览和其他组件     |
| 轻量看板天数切换 | 当前周期及等长前周期查询 | 演示数据日期基准       |

全局与局部分析口径不同的场景，在标题、说明或控件附近明确表达。

多个筛选共同存在时，保存所管理条件的 ID，并通过 `whereFilter.update()` / `remove()` 或条件分组维护自己的部分。只有调用方拥有全部筛选条件时才适合 `clear()` 后重建，避免清除恢复配置中的其他条件。控件初始值也应从恢复后的状态读取，不能在首次渲染时用默认值覆盖已保存筛选。

当前 Dashboard DSL 保存组件、资源引用和布局；图表 DSL 保存最终筛选条件。它们不会自动记录“地区控件作用于哪些图表”这样的联动规则。若联动需要成为可恢复的 VBI 能力，应补齐所属 DSL 与 Builder，不能将多份最终条件当作联动定义。

### 同时保存 Dashboard 和资源

```javascript
const saved = {
  dashboard: dashboard.build(),
  resources: VBI.resources.snapshot(),
}
// saved 可经 JSON.stringify 保存，再经 JSON.parse 读取。
// 恢复时，在目标运行环境中先注册所需 connectorId 对应的连接器。
VBI.resources.register({
  charts: Object.values(saved.resources.charts),
  insights: Object.values(saved.resources.insights),
})
const restored = VBI.dashboard.create(saved.dashboard)
```

单图保存 `chartBuilder.build()`，使用 `VBI.chart.create(savedChartDSL)` 恢复。资源快照涵盖当前实例的全部已注册 Chart 和 Insight，可能包含辅助查询；它不自动表达这些查询与指标卡之间的计算关系。需要隔离多个看板的资源时，可使用 `createVBI()` 创建各自的资源实例。

导出文件不包含数据连接器实现、原始数据、外部图片文件，以及页面临时补充的 seed / spec 配置。Insight 的相对图片地址在新环境中也需要可解析。明确产品要求恢复哪些分析与展示设置，并保存相应配置；仅有基础 DSL 不能保证整张页面被完整复现。

**验证：** 将配置经过一次 JSON 序列化往返，在没有原页面 Builder 和闭包数据的新资源实例中恢复。注册连接器与资源后，检查资源引用、查询结果、筛选值及布局，再验证自定义指标和特殊图形是否也能按承诺恢复。

## HTML 示例的运行检查

- 使用已验证的固定版本 ESM 入口，并选择 VQuery 的浏览器入口；具体 URL 维护在[接入文档](./how-use-vbi-in-html.md)中。更换版本或 CDN 后验证整条依赖链路。
- 加载和查询错误分别处理。静态 `import` 失败发生在模块主体执行之前，内部 `run()` 的 `try/catch` 无法捕获；需要页面内反馈模块加载失败时，使用可捕获的动态导入初始化流程。
- 单次操作可像示例一样在查询期间禁用相关控件；允许连续交互时，由调用方处理过期请求结果，避免旧结果覆盖新筛选。
- 首次创建 VChart 并绑定到 `chart.instance`，后续使用已有实例的 `updateSpec(spec)` 更新。保留 `spec.animation`，通过 `animationUpdate` 设置更新动画；只关闭入场动画时使用 `animationAppear: false`，并尊重减少动态效果的系统偏好。
- 更新 spec 时保持语义未变的回调引用稳定。轻量看板复用日期 crosshair 的格式化函数，避免 VChart 将新闭包识别为十字线配置变化而内部重建图表；验收时检查实际过渡帧，不能只确认调用了 `updateSpec()`。
- 轻量看板的利润柱图展示完整所选区间；环形图将已有查询结果转换为 VSeed `donut`，复用 VChart 实例更新扇区。回归检查应覆盖 30 → 12 → 7 → 30 天，确认柱体数量、位置和扇区角度都随数据改变，折线退出动画也不会出现多余的点。
- 悬停联动按来源限定范围：轻量看板主图更新全部四张卡片，右侧小图仅更新所属卡片；移出时恢复相同范围的区间汇总。日期按钮统一改变所有卡片的统计区间。
- 高频 `dimensionHover` 只在日期稳定 150ms 后联动指标，同一日期不重复更新；原生 Tooltip 和悬停点仍即时响应。移出、筛选刷新和页面卸载时取消待执行任务，防止旧日期在稍后覆盖汇总。
- 环形图保留分类图例与 Tooltip，标明客户类型和订单占比；中心指标说明对应“消费者”。图例关闭筛选，避免隐藏类别后扇区重新归一化、与中心占比口径不一致。
- 控件仅修改 Builder，轻量看板通过现有的 `chart.dsl.observeDeep(callback)` 订阅整个图表 DSL，无需等待新增 Builder 便捷接口发布。回调合并同轮变更，再执行 `buildVSeed()` 和 `updateSpec()`，首次渲染由页面主动执行。筛选的多步修改用 `chart.doc.transact()` 合并，避免查询中间状态。浅层 `observe()` 只监听顶层键，嵌套筛选必须使用 `observeDeep()`；分别用 `unobserve(callback)` / `unobserveDeep(callback)` 传入同一回调解除订阅。Builder 上的四个同名接口保留这些 Yjs 语义。
- 容器尺寸改变后调用 `resize()`；页面卸载时取消 Builder 订阅、移除原生事件监听并释放实例。复用实例时不要重复注册 hover 监听，回调应读取最新数据。仅更新视觉时避免重复查询。
- 提供加载、错误与空结果反馈；用实际筛选、配置恢复、窄屏和键盘操作验证页面。演示数据中的非空结果不能代替空数据及零分母检查。
