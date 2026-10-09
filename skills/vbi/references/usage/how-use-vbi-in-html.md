# 在 HTML 中使用 VBI

用一个 HTML 文件接入 VBI：无需框架或打包工具，使用 Builder 配置分析，再交给 VChart 或 VTable 渲染。VBI、VQuery、VSeed 通过浏览器 ESM 加载，VChart 和 VTable 使用发布包中的浏览器 bundle。本文先给出实践入口，再提供可直接运行的图表与表格教程；状态归属、查询复用和复杂页面组织见[最佳实践](./tips.md)。

**可直接打开或分享的独立 HTML，必须将分析数据内置在 HTML 中。** JSON 使用内联数组，CSV 使用内联文本，再通过 VQuery 的 `rawDataset` 接入。不要在运行时用 `fetch()` 读取旁边的 JSON / CSV 文件或依赖远程数据 URL：通过 `file://` 打开时，本地文件请求可能因 `origin: null` 被浏览器拦截；远程请求也可能受 CORS、网络或预览环境限制，导致 `blocked`、`Failed to fetch` 和图表空白。内置数据不代表完全离线，本文的 CDN 模块仍需联网加载。

## 数据源必须内置在 HTML 中

生成页面前先读取原始数据文件，将完整数据写入 HTML；不要只写数据文件路径，也不要让页面初始化时再下载数据。下方完整教程使用内联 JSON 数组。CSV 可采用以下方式，由 VQuery 解析，避免自行按逗号拆分而破坏带引号的字段：

```html
<!-- prettier-ignore -->
<script type="text/plain" id="csv-data">
region,channel,sales
华东,线上,100
华北,线下,80
</script>
<script type="module">
  // 放在 VQuery 导入后，沿用下方教程的数据集初始化流程。
  const csvText = document.querySelector('#csv-data').textContent.trim()
  const source = {
    type: 'csv',
    rawDataset: new TextEncoder().encode(csvText).buffer,
  }
</script>
```

数据集的 `schema` 应与内置数据字段一致。生成内联数据时还需处理 HTML 的脚本结束标记：如果原始文本包含 `</script>`，应改用安全序列化的 JSON 字符串（将 `<` 转义为 `\u003c`），运行时还原后再传给 VQuery，避免数据截断脚本元素。不要用 `mode: 'no-cors'` 或关闭浏览器安全策略绕过数据加载失败。

交付前用 `file://` 直接打开 HTML，检查筛选、聚合和渲染；在 Network 中确认没有 JSON / CSV 数据请求，在 Console 中确认没有数据加载错误。若业务明确需要实时远程数据，应通过 HTTP(S) 部署并正确配置数据服务的 CORS，同时显示加载失败状态；这类页面需要另行验证部署环境。

## 从参考实现选择起点

先看[可视总览](../../templates/index.html)：二十份独立 HTML 内嵌十个行业的完整 CSV，展示不同分析重点、布局、主题与数据口径。按需组合片段，不默认照搬某一页。配置在 `page-config`，完整数据在 `source-data`；每页的来源、字段映射与单位可追溯。

| 示例                                                                   | 适合学习                                       | 阅读代码时关注                                                     |
| ---------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------ |
| [模板 1：趋势主导](../../templates/template-life-expectancy.html)      | 预期寿命年度趋势；蓝色主辅布局                 | `prepareRows()`、`conditionsFor()`、`buildView()`、`drawPlot()`    |
| [模板 2：指标先行](../../templates/template-heart-failure.html)        | 心衰记录概览与年龄组比较；紫色指标行           | 同一查询范围的核心指标、事件占比与局部查看                         |
| [模板 3：分段叙事](../../templates/template-meal-workout.html)         | 餐食、运动、营养及样本构成；暖橙分段布局       | 汇总比率、不同分组的图表与缓存联动                                 |
| [精简 Dashboard 模板](../../templates/template-business-overview.html) | 新建轻量看板、内置数据与完整必要交互           | `draw()`、`animateMetric()`、`bindMetricHover()`、`bindCardTilt()` |
| [轻量看板](../../templates/example.html)                               | 顶部洞察、汇总指标、周期比较、自定义 HTML 卡片 | `summarizePeriod()`、`rowsOf()`、`layoutDashboard()`               |

新建看板按数据与分析任务从基准模板、行业参考集中选取片段或重组布局，基础模板用于查阅较小的接入实现。完整轻量示例用于参考更丰富的配色、图标与业务数据接入。`templates/` 中的 24 份模板可以单独复制 HTML，浏览器需要联网加载 CDN 模块。完整轻量看板当前仍通过网络加载 CSV，复制为独立交付页面时，必须按上文将 CSV 内置，并将数据初始化改为读取内联文本。

### 三种数据模板的共同机制

三份新模板在 `source-data` 中以原始列名和类型化行数组内嵌完整 CSV，空字符串保留为 `null`，不抽样、不将缺失数值补零。`prepareRows()` 映射查询字段，`conditionsFor()` 定义各查询的筛选范围；Builder 的 `observeDeep()` 合并刷新，查询后经 VSeed 构建 Spec，`drawPlot()` 复用实例调用 `updateSpec()`。`buildView()` 从查询汇总结果计算衍生指标与缓存索引；卡内查看不重新查询，也不改写区间洞察。明细默认展开，国家明细通过分页访问全部结果。

预期寿命模板使用真实年份，展示末年国家等权均值、首尾变化与有效寿命覆盖率；心衰模板只描述样本记录，死亡事件占比不等同于统一随访时点的死亡率；餐食模板以总热效应 / 总热量计算占比，以总热量 / 总食物件数计算单件热量。保留原始数据值及其缺失语义，不把样本分组比较写成因果结论。

图形、衍生公式与悬停显示属于这些独立页面的具体集成。若产品承诺跨宿主恢复整页，除 Dashboard 与资源快照外，还须明确保存或重建这些显示与计算规则，不能声称基础 DSL 已自动保存任意 HTML 计算代码。

## 精简模板的重要片段

[template-business-overview.html](../../templates/template-business-overview.html)保留与完整轻量示例一致的必要功能：固定趋势主导布局、柔和浅蓝（`#A8C7E8`）、顶部核心发现、销售主面积图、增长迷你面积图、订单占比环图、利润迷你柱图；标题右侧集中的地区与周期平铺筛选、600ms 图表与指标过渡、小卡 ≤2° 倾斜、默认展开表格、悬停及键盘联动。模板不提供布局和配色选择，地区筛选只显示“全部地区 / 华东 / 华北”选项，分组名称保留在 `aria-label` 中。精简的是数据规模、图标和显示设置，而必要的图表与卡内交互保持完整，逐项要求见[必要基线](../best-practices/layout.md#轻量看板的功能与视觉基线)。原始数据为内置的 60 天确定性演示数据，共 240 条商品明细、120 个订单，截止日为 2026-09-29；同一订单有两条商品明细，用于验证去重。消费者分类属于演示字段，实际数据无该字段时应更换有意义的分组图形。

先替换 `rawDataset`、`schema`、`connectorId` 与指标口径，再调整卡片内容和 Dashboard 坐标。模板的固定日期、地区和色系仅服务于这份演示数据。下列片段摘取关键机制，依赖模板已导入的模块、Builder 与 DOM；完整可运行文件以模板为准，依赖加载及 import map 见下方完整 HTML 教程。

首屏加载状态必须写在静态 HTML 中，不能等 CDN 或模块执行后再隐藏未布局的内容。模板用 `data-initialized="false"` 与 `inert` 暂时收起主体，保留标题、禁用筛选和可见的加载反馈；主体仍参与内部布局，让 Builder 设置坐标后能以真实尺寸绘制图表。首次数据、指标、洞察和图表就绪后再展示并播放入场；之后的筛选仅更新现有内容，不重新收起或重播。初始化失败时保留可见错误，减少动态效果只取消动效，不提前展示半成品。

### 1. 内置数据接入 Connector

VQuery 负责执行 Builder 生成的筛选、分组与聚合。刷新时更新已有 IndexedDB 数据集，每次查询都在 `finally` 中断开连接。

```javascript
const query = new VQuery()
const source = { type: 'json', rawDataset }
if (await query.hasDataset(connectorId)) await query.updateDatasetSource(connectorId, schema, source)
else await query.createDataset(connectorId, schema, source)
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

### 2. Builder 查询与自定义指标映射

模板的 `createChart()` 统一创建图表；`totals` 与 `previous` 查询本期和前期汇总，`trend`、`growth` 与 `profit` 查询每日走势，`regions` 查询地区分组结果，`consumers` 查询消费者去重订单，`dailyTotals` 与 `dailyConsumers` 建立联动日期索引。订单使用 `countDistinct`，销售额和利润使用 `sum`；总订单数不累加每日或地区去重数。

```javascript
const totals = createChart('table', null, ['sales', 'order_id', 'profit'])
const trend = createChart('area', 'order_date', ['sales'])
const seed = await totals.buildVSeed()
function rowsOf(chart, seed) {
  const { dimensions, measures } = chart.build()
  return seed.dataset.map((row) =>
    Object.fromEntries([...dimensions, ...measures].map((field) => [field.field, row[field.id]])),
  )
}
const total = rowsOf(totals, seed)[0]
// HTML 指标读取业务名；传给 VSeed 的 seed 保留原始字段 ID。
```

此映射适用于平铺、每个字段只有一种聚合的模板。多个聚合复用同一字段时，应使用度量 ID 或不同业务键，避免覆盖；空结果、零分母和基期为零的展示见模板 `renderLoop()` 与 `comparison()`。

### 3. 资源与布局交给 Dashboard Builder

Chart、Insight、Dashboard 使用同一 VBI 实例。组件布局在集合回调中提交，UI 读取 `dashboard.build().layout[breakpoint]`，同步 DOM 阅读顺序与 CSS Grid；不要再用另一套 CSS 固定模块位置。

```javascript
dashboard.chart.add((widget) => {
  widget
    .setChart(trend)
    .setTitle('销售总额')
    .setLayouts({
      lg: { x: 0, y: 1, w: 8, h: 9 },
      xs: { x: 0, y: 1, w: 12, h: 9 },
    })
  document.querySelector('#hero-slot').dataset.widget = widget.getId()
})
insight.setContent([finding, scope, ...evidence].join('\n'))
// 模板用 insight.dsl.observeDeep(renderInsight) 将资源内容安全写入 DOM。
```

模板 `layoutDashboard()` 以容器宽度选择断点，主卡数字约 59px、辅助数字约 29px，区域明细默认展开。模板在初始化时通过 Builder 设置固定布局，不保留布局预设、切换控件或相应事件；外层 slot 管布局与入场，内层 card 管倾斜。布局与字号的调整依据见[视觉骨架](../best-practices/layout.md#复用轻量示例的视觉骨架)。核心发现同时展示销售额、订单、利润三项核心指标与利润率、平均客单价两项衍生指标；结论与计算口径见[洞察最佳实践](../best-practices/insight.md)。Insight 内容由真实查询结果生成，没有调用模型服务；需要保存时同时导出 Dashboard DSL 与资源快照，恢复过程见[状态与资源](./tips.md#同时保存-dashboard-和资源)。

### 4. 筛选改 Builder，渲染复用实例

`applyFilters()` 以数据最新日期为截止日，按已保存的条件 ID 更新日期和地区；前期查询使用此前等长区间。控件只调用它，`observeDeep()` 订阅负责刷新。多图同步修改在同一轮微任务合并，`renderLoop()` 串行处理刷新并丢弃过期查询结果，查询期间禁用控件。

```javascript
const updateDate = (node) => node.setOperator('between').setValue({ min: firstDay, max: lastDay })
chart.whereFilter.update(dateConditionId, updateDate)
// dateConditionId 在首次 whereFilter.add() 的回调中通过 node.getId() 保存。
chart.dsl.observeDeep(requestRender)

const seed = await chart.buildVSeed()
const spec = buildChartSpec(seed)
if (instances.has(element)) {
  if (reducedMotion.matches) instances.get(element).stopAnimation()
  await instances.get(element).updateSpec(spec)
} else {
  const instance = new VChart(spec, { dom: element })
  instance.renderSync()
  chart.instance.bind(instance)
  instances.set(element, instance)
}
```

`buildChartSpec()` 定制透明背景、统一强调色、简约坐标与图形样式，不改变查询结果；迷你利润图保留负值，旧版柱图用 `spec.stackCornerRadius = 0` 关闭额外裁剪。平滑线与更新动画是必要配置，不能设置 `animation.enable: false` 后认为已经实现更新动画：

```javascript
const appearance = {
  lineStyle: { lineWidth: mini ? 1.5 : 2.5, lineSmooth: true },
  areaStyle: { areaColorOpacity: 0.27, areaGradient: true },
  animation: {
    enable: !reducedMotion.matches,
    params: { appear: { enable: false }, update: { enable: true, duration: 600, ease: 'cubicInOut' } },
  },
}
// 将 appearance 合入 VBI 返回的 seed，再用 Builder.from(...).build()。
```

`ResizeObserver` 重新应用布局并调整实例尺寸；页面卸载时解除 Builder 订阅、倾斜与悬停监听、断开观察、取消数值动画帧与待执行任务，并释放实例。

### 5. 保留主辅视觉比例

复用结构时同时保留卡间留白、绘图区高度与主辅字体层级。先引入[数值字号规范](../best-practices/metric-card.md#数值字号规范)的角色 token 和窄屏整组切换规则；以下选择器消费这些 token，避免逐卡或按数字长度缩放。卡片位置仍由上面的 Dashboard DSL 提供，窄屏读取 `xs` 坐标重排。

```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-auto-rows: minmax(44px, auto);
  gap: 18px;
}
.hero-value {
  font-size: var(--metric-primary-size);
}
.small-value {
  font-size: var(--metric-secondary-size);
}
.hero-figure {
  position: relative;
  flex: 1;
  min-height: 220px;
}
#trend {
  position: absolute;
  inset: 0 0 24px;
  width: 100%;
}
.mini {
  width: 116px;
  height: 77px;
  flex-shrink: 0;
}
```

图形尺寸可随容器与业务内容调整，指标字号只按已定义的角色与断点切换；单位用独立节点，动画更新数值节点而不改变字号。长数值优先调整单位表达、卡片跨度或 mini 图位置，不按卡宽覆盖字号。核心发现自然撑高，卡内相关指标用分隔线组织；图表 Canvas 不反向撑高网格，长数值不能裁切。单独复制通用接入代码，不会自动获得模板的阅读质量，仍需先查看模板与截图并做最终对照。

### 6. 平铺选择器与默认展开明细

少量互斥选项优先平铺，桌面筛选区域尽量一行，避免重复标签和默认原生 HTML `select` / `input` 外观；大量选项与精确输入采用紧凑的定制入口，窄屏允许必要换行。控件显式表达选中状态，保留 `type="button"` 和键盘焦点。控件回调只更新自身条件，不能清除消费者等其他筛选。控件布局、作用范围、条件 ID 维护及图表与文本的同步动画见[Filter 最佳实践](../best-practices/filter.md)。

```html
<header class="heading">
  <div>
    <h1>经营概览</h1>
    <p class="scope">当前统计范围</p>
  </div>
  <fieldset class="filter-row" aria-label="全局筛选">
    <div class="segment" role="group" aria-label="地区">
      <button type="button" data-region="" aria-pressed="true">全部地区</button>
      <button type="button" data-region="华东" aria-pressed="false">华东</button>
      <button type="button" data-region="华北" aria-pressed="false">华北</button>
    </div>
    <div class="segment" role="group" aria-label="统计周期">
      <button type="button" data-days="7" aria-pressed="false">7 天</button>
      <button type="button" data-days="14" aria-pressed="false">14 天</button>
      <button type="button" data-days="30" aria-pressed="true">30 天</button>
    </div>
  </fieldset>
</header>
<details open>
  <summary>查看区域明细与数据口径</summary>
  <table>
    <tbody id="regions"></tbody>
  </table>
</details>
```

刷新只替换 `tbody`，不重建 `details` 或给 `open` 重新赋值。模板地区与周期按钮合并在“经营概览”标题行最右侧，作用范围均为本看板全局；趋势卡内只保留逐日查看与恢复汇总操作。`.segment` 允许窄屏换行；不默认使用原生 `select`，大量选项再使用搜索或定制下拉。

### 7. 指标文本过渡

使用模板 `animateMetric()` 覆盖全部动态数字。其状态同时保存当前显示值、目标值、格式函数和动画帧；新目标取消旧帧，从当前显示值接续，用 `1 - (1 - progress) ** 3` 在 600ms 内过渡。首次立即显示真实值，不从零开始；空值、无基期与零分母分别显示缺省或说明，减少动态效果模式立即结束动画。

```javascript
animateMetric('#sales', total.sales, money)
animateMetric('#orders', total.order_id, (value) => `${Math.round(value)} 单`)
animateMetric('#profit', total.profit, money)
animateMetric(
  '#margin',
  total.sales ? (total.profit / total.sales) * 100 : undefined,
  (value) => `${value.toFixed(1)}%`,
)
animateMetric('#average', total.order_id ? total.sales / total.order_id : undefined, money)
// setChange() 也用 animateMetric() 更新变化率，并同步方向色。
```

详细数值插值代码见[指标文本更新动画](../best-practices/metric-card.md#指标文本更新动画)。动画只改展示文本，计算、Tooltip、导出和洞察始终用真实查询结果。

### 8. 固定命中区域与 ≤2° 小卡倾斜

```html
<div class="card-slot">
  <section class="card metric-card"><!-- 指标与 mini 图 --></section>
</div>
```

```css
.metric-card {
  transform: perspective(800px) rotate3d(var(--tilt-x, 0), var(--tilt-y, 1), 0, var(--tilt-angle, 0deg));
}
```

模板 `bindCardTilt()` 在固定外层区域读取鼠标坐标，只变换内层卡片；目标向量归一化后乘 1.5°，弹性插值时按向量长度限制为 2°，不能把两个轴各限制为 2° 后误认为合成角度合规。主趋势与洞察保持平面；移出、取消、滚动、失焦复位，触屏与减少动态效果关闭。模板保留返回的 `dispose()`，卸载时移除监听和帧。完整示例切换布局时还会复位倾斜，叙事布局展开为大图的卡片保持平面。参数与解释见[轻微倾斜](../best-practices/layout.md#按模块关系联动与轻微倾斜)。

### 9. 卡内交互与作用域

```javascript
const byDate = new Map(rowsOf(dailyTotals, dailySeed).map((row) => [row.order_date, row]))
// dailyTotals 的查询包含本期第一天的前一天，用于当日比较；不是从 DOM 数值反算。
hoverSubscriptions.set(trend, bindMetricHover(trend, '#trend', 'all'))
hoverSubscriptions.set(growth, bindMetricHover(growth, '#growth-trend', 'growth'))
hoverSubscriptions.set(profit, bindMetricHover(profit, '#profit-trend', 'profit'))
// 只绑定一次；currentMetrics 在每轮查询后替换为新日期索引与区间汇总。
```

悬停稳定 75ms 后读取日期缓存并更新文本，VChart Tooltip 即时响应；主图更新全部数字与订单环图，小图只更新所属卡片。离开恢复同作用域汇总，查询开始时暂停悬停并取消旧任务；刷新完成后恢复，局部联动不改 Insight。图表容器还支持左右键和 Esc；主卡的前一天 / 后一天 / 区间汇总按钮便于触屏查看。绑定与解除代码见[与图表联动](../best-practices/metric-card.md#与图表联动)，完整生命周期以模板为准。

### 模板运行核对

直接用 `file://` 打开，等待 `body[data-state="ready"][data-entrance="complete"]` 且四张图实际可见，再检查 30 → 14 → 7 → 30 天和地区筛选、默认展开及手动折叠、刷新后的初始化，以及 1440px 桌面与 390px 窄屏。实际检查 `updateSpec()` 复用与过渡、指标文本中间帧、平滑线、≤2° 倾斜、主图 / 小图联动与恢复、减少动态效果模式。确认模板无布局和配色控件、无重复“地区”标签，默认强调色为柔和浅蓝；三种布局与配色切换仅在完整示例或用户要求的扩展中验收。运行期只请求 CDN 依赖，不请求 JSON / CSV 数据。核心发现、汇总、图形和区域表使用同一筛选范围，明细展开状态不因筛选而重置。最终截图按[截图对照验收](../best-practices/visual-acceptance.md)保存并实际查看；截图无法替代动效与交互检查。

内置数据的核对基准如下，金额取整；选择华东、30 天时应为销售额 ¥74,800、30 单、利润 ¥7,977。全部地区 30 天有 40 个消费者订单，占比约 66.7%，中心文本取整为 67%；不得从重复明细条数计算占比。

| 全部地区周期 | 销售额   | 去重订单数 | 利润    |
| ------------ | -------- | ---------- | ------- |
| 30 天        | ¥154,400 | 60         | ¥16,494 |
| 14 天        | ¥76,960  | 28         | ¥8,890  |
| 7 天         | ¥39,656  | 14         | ¥4,116  |

## 完整轻量示例的扩展能力

轻量看板直接加载 [Supermarket CSV](https://visactor.github.io/VBI/dataset/supermarket.csv)，以数据中的最新订单日期为截止日，切换最近 7、14、30 个日历日，并与前一个等长周期比较。VQuery 负责解析 CSV；接入层将订单日期规范为 ISO 日期和 UTC 日序号，VBI Builder 配置日期筛选、销售额与利润求和、订单 ID 去重计数。消费者订单占比使用 `customer_type = 消费者` 的去重订单数除以总订单数；区域订单数也各自去重，同一订单可能涉及多个地区，因此不能直接相加。图表将没有订单的日期显示为零，亏损日期用负向利润柱显示。

轻量看板的指标卡以固定外层区域追踪鼠标位置，常规倾斜幅度为 1.5°，弹性过渡的整体旋转始终不超过 2°；离开卡片、滚动或页面失焦时复位。触屏、减少动态效果模式和展开为大图的卡片关闭倾斜。迷你图表保留悬停提示；销售趋势主体卡片保持平面，所有卡片均无鼠标光效。

指标数值首次加载直接显示查询结果；筛选或悬停更新时用 600ms 缓和过渡，与图表更新节奏一致。连续更新从当前显示值接续，保留金额、整数、百分比和正负值格式；无数据时显示缺省文本，减少动态效果模式下立即更新。

轻量看板提供八种页面配色，包含默认薄荷绿及七种柔和参考色。点击标题旁的色点可同步切换背景、图标与图表颜色，保留左上到右下的柔白光束；配色切换不改变统计周期和指标口径，下降指标与亏损柱保留红色语义。

标题旁的三个布局图标按钮将顶部洞察与四个指标组织为趋势主导、指标先行或分段叙事，选中状态通过按钮和当前布局名称表达。三种布局统一使用最大 1140px 的外壳宽度，窄屏自适应；切换只改变内部排列。切换通过 Dashboard Builder 更新 `lg/xs` 坐标，保留图表、洞察资源、配色、统计周期和区域明细的展开状态；UI 按容器宽度读取布局、同步 DOM 顺序并调整图表尺寸。主趋势联动全部指标，迷你图只联动自身。布局原理见[布局最佳实践](../best-practices/layout.md)。

区域明细表格默认展开，可点击标题折叠或重新展开；筛选、布局与配色切换保留用户当前的展开状态。

三种布局都在图表前展示“核心发现”，以三项核心指标和利润率、平均客单价两项衍生指标共同支撑一句关键结论；比率变化使用百分点，金额变化使用相对增幅。内容、计算、AI 接入边界和 Insight 保存方式统一见[洞察最佳实践](../best-practices/insight.md)。切换周期后重新计算，布局、配色切换与局部悬停保留区间洞察。首次入场采用 420ms 间隔、1400ms 时长，减少动态效果模式下直接显示。

轻量看板的数据核对基准（当前 CSV 最新订单日期为 2019-12-30，共 9,959 条明细；金额显示取整）：

| 周期  | 日期范围                | 销售额   | 去重订单数 | 利润    |
| ----- | ----------------------- | -------- | ---------- | ------- |
| 7 天  | 2019-12-24 — 2019-12-30 | ¥121,872 | 44         | ¥6,133  |
| 14 天 | 2019-12-17 — 2019-12-30 | ¥249,025 | 81         | ¥24,702 |
| 30 天 | 2019-12-01 — 2019-12-30 | ¥544,539 | 156        | ¥74,556 |

业务大屏仍使用固定演示数据，日期基准是 2026 年 9 月；天数切换只影响趋势，地区筛选影响全部数据组件。散点图数据是参考截图的近似转录，其前沿与参考模型保持全局口径。这些页面展示的 HTML 数据表和指标卡由页面绘制；下面补充 VTable 的普通表和透视表接入。

## 先理解五个包的分工

| 包                 | 在本文中的职责                                            |
| ------------------ | --------------------------------------------------------- |
| `@visactor/vbi`    | 通过 Builder 管理图表 DSL，生成查询和 VSeed DSL           |
| `@visactor/vquery` | 执行本地 JSON 数据的分组、聚合、筛选和排序                |
| `@visactor/vseed`  | 将含数据的 VSeed DSL 构建为 VChart spec 或 VTable options |
| `@visactor/vchart` | 渲染柱状图、折线图、散点图等图形                          |
| `@visactor/vtable` | 使用 `ListTable` 渲染普通表，使用 `PivotTable` 渲染透视表 |

核心链路为 `VBI Builder → Connector / VQuery → VSeed → VChart 或 VTable`。图表和表格共享前面的配置与查询机制，最后选择对应渲染器。仅显示图形时可以省略 VTable；仅显示表格时可以省略 VChart。

## 运行一个完整 HTML：柱状图、普通表与透视表

将下面代码保存为 `index.html`，直接用浏览器打开。它使用内置在 HTML 中的同一份销售明细，无需额外数据文件或数据请求，支持切换三种视图、按地区筛选，并显示当前 DSL 和查询结果。为便于核对，数据只有五行。

下面的独立教程与轻量看板固定使用 VBI / VQuery / VSeed `0.6.4`，VChart `2.1.7`；教程另加入 VTable `1.23.1`，无需本地构建。固定版本可避免 `latest` 缓存使依赖版本不一致。

VChart 的 `build/index.min.js` 和 VTable 的 `dist/vtable.min.js` 通过普通 `<script>` 加载，分别提供 `window.VChart.default` 和 `window.VTable`；VBI、VQuery、VSeed 使用 `+esm` 模块导出。VSeed 的动画模块会导入 VChart 的 `StreamLight`，因此还需在 ESM 模块加载前声明 import map，将该导入映射到已加载的 VChart bundle。这样页面与动画使用同一套渲染注册表，避免 jsDelivr `+esm` 拆分底层模块后出现 `applyAnimationState is not a function` 或文本图元未注册。升级版本时应同步检查映射中的 VChart URL。

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="data:," />
    <title>VBI：图表与 VTable</title>
    <style>
      body {
        margin: 24px;
        font-family: sans-serif;
      }
      fieldset {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
      }
      .choices {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        padding: 4px;
        background: #edf1f4;
        border-radius: 18px;
      }
      button {
        border: 0;
        border-radius: 14px;
        padding: 8px 12px;
        font: inherit;
        background: transparent;
        color: #64717e;
        cursor: pointer;
      }
      button[aria-pressed='true'] {
        background: white;
        color: #28333e;
      }
      button:focus-visible {
        outline: 2px solid #81c5ba;
        outline-offset: 2px;
      }
      button:disabled {
        cursor: wait;
        opacity: 0.6;
      }
      #view {
        width: 100%;
        height: 360px;
        margin: 16px 0;
      }
      pre {
        max-height: 360px;
        overflow: auto;
        white-space: pre-wrap;
      }
    </style>
  </head>
  <body>
    <h1>销售分析</h1>
    <fieldset id="controls" disabled>
      <legend>视图与筛选</legend>
      <div class="choices" role="group" aria-label="视图">
        <button type="button" data-type="column" aria-pressed="true">柱状图</button>
        <button type="button" data-type="table" aria-pressed="false">普通表</button>
        <button type="button" data-type="pivotTable" aria-pressed="false">透视表</button>
      </div>
      <div class="choices" role="group" aria-label="地区">
        <button type="button" data-region="" aria-pressed="true">全部地区</button>
        <button type="button" data-region="华东" aria-pressed="false">华东</button>
        <button type="button" data-region="华北" aria-pressed="false">华北</button>
      </div>
    </fieldset>
    <p id="status" role="status">正在加载模块…</p>
    <div id="view"></div>
    <details>
      <summary>查看 DSL 和查询结果</summary>
      <pre id="output"></pre>
    </details>
    <script src="https://cdn.jsdelivr.net/npm/@visactor/vchart@2.1.7/build/index.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@visactor/vtable@1.23.1/dist/vtable.min.js"></script>
    <script type="importmap">
      {
        "imports": {
          "https://cdn.jsdelivr.net/npm/@visactor/vchart@2.1.7/+esm": "data:text/javascript,export default globalThis.VChart.default;export const StreamLight=globalThis.VChart.StreamLight;"
        }
      }
    </script>
    <script type="module">
      const $ = (selector) => document.querySelector(selector)
      const container = $('#view')
      let instance
      let activeType
      try {
        // 动态导入放在 try 内，模块加载失败也能显示错误。
        if (!window.VTable) throw new Error('VTable 模块加载失败，请检查网络后刷新')
        const { ListTable, PivotTable } = window.VTable
        const VChart = window.VChart.default
        const [{ VBI }, { VQuery }, { Builder, registerAll }] = await Promise.all([
          import('https://cdn.jsdelivr.net/npm/@visactor/vbi@0.6.4/+esm'),
          import('https://cdn.jsdelivr.net/npm/@visactor/vquery@0.6.4/dist/browser/esm/browser.js/+esm'),
          import('https://cdn.jsdelivr.net/npm/@visactor/vseed@0.6.4/+esm'),
        ])
        registerAll()

        const connectorId = 'vbi-html-chart-and-table'
        const schema = [
          { name: 'region', type: 'string' },
          { name: 'channel', type: 'string' },
          { name: 'sales', type: 'number' },
        ]
        const source = {
          type: 'json',
          // 数据随 HTML 交付，不通过 fetch() 读取外部 JSON / CSV。
          rawDataset: [
            { region: '华东', channel: '线上', sales: 100 },
            { region: '华东', channel: '线上', sales: 200 },
            { region: '华东', channel: '线下', sales: 50 },
            { region: '华北', channel: '线上', sales: 150 },
            { region: '华北', channel: '线下', sales: 80 },
          ],
        }
        const query = new VQuery()
        if (await query.hasDataset(connectorId)) await query.updateDatasetSource(connectorId, schema, source)
        else await query.createDataset(connectorId, schema, source)
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

        function createBuilder(type, dimensions) {
          const builder = VBI.chart.create(VBI.chart.createEmpty(connectorId))
          builder.chartType.changeChartType(type)
          dimensions.forEach(([field, alias, encoding]) =>
            builder.dimensions.add(field, (node) => node.setAlias(alias).setEncoding(encoding)),
          )
          builder.measures.add('sales', (node) =>
            node.setAlias('销售额').setAggregate({ func: 'sum' }).setFormat({ type: 'number', fractionDigits: 0 }),
          )
          return builder
        }
        const builders = {
          column: createBuilder('column', [['region', '地区', 'xAxis']]),
          table: createBuilder('table', [
            ['region', '地区', 'column'],
            ['channel', '渠道', 'column'],
          ]),
          pivotTable: createBuilder('pivotTable', [
            ['region', '地区', 'row'],
            ['channel', '渠道', 'column'],
          ]),
        }

        async function render() {
          $('#controls').disabled = true
          $('#status').textContent = '正在查询…'
          try {
            const type = $('[data-type][aria-pressed="true"]').dataset.type
            const region = $('[data-region][aria-pressed="true"]').dataset.region
            const builder = builders[type]
            // 本页只有地区筛选，因此可清空后重建；多条件页面按条件 ID 更新。
            builder.whereFilter.clear()
            if (region) {
              builder.whereFilter.add('region', (node) => node.setOperator('eq').setValue(region))
            }
            const seed = await builder.buildVSeed()
            const options = Builder.from(seed).build()
            if (instance && activeType === type) {
              if (type === 'column') await instance.updateSpec(options)
              else await instance.updateOption(options)
            } else {
              // 渲染器类型改变才释放；同一视图的筛选更新复用实例。
              instance?.release()
              instance = undefined
              if (type === 'table') instance = new ListTable(container, options)
              else if (type === 'pivotTable') instance = new PivotTable(container, options)
              else {
                instance = new VChart(options, { dom: container })
                instance.renderSync()
              }
              activeType = type
            }
            $('#output').textContent = JSON.stringify(
              {
                chart: builder.build(),
                query: builder.buildVQuery(),
                dataset: seed.dataset,
              },
              null,
              2,
            )
            $('#status').textContent = `已显示 ${seed.dataset.length} 条查询结果 · ${region || '全部地区'}`
          } catch (error) {
            $('#status').textContent = `渲染失败：${error.message}`
            console.error(error)
          } finally {
            $('#controls').disabled = false
          }
        }
        document.querySelectorAll('[data-type], [data-region]').forEach((button) =>
          button.addEventListener('click', () => {
            const attribute = button.hasAttribute('data-type') ? 'data-type' : 'data-region'
            document
              .querySelectorAll(`[${attribute}]`)
              .forEach((item) => item.setAttribute('aria-pressed', String(item === button)))
            void render()
          }),
        )
        const observer = new ResizeObserver(() => {
          if (!instance) return
          if (activeType === 'column') instance.resize(container.clientWidth, container.clientHeight)
          else instance.resize()
        })
        observer.observe(container)
        window.addEventListener('pagehide', (event) => {
          if (event.persisted) return
          observer.disconnect()
          instance?.release()
        })
        await render()
      } catch (error) {
        $('#status').textContent = `初始化失败：${error.message}`
        console.error(error)
      }
    </script>
  </body>
</html>
```

按以下结果核对，避免只检查“页面有图形”：

| 操作                       | 预期结果                                                           |
| -------------------------- | ------------------------------------------------------------------ |
| 柱状图、全部地区           | 两根柱子：华东 `350`，华北 `230`                                   |
| 普通表、全部地区           | 四行：华东线上 `300`、华东线下 `50`、华北线上 `150`、华北线下 `80` |
| 透视表、全部地区           | 地区作为行、渠道作为列；四个交叉单元格与普通表数值一致             |
| 选择华东，依次切换三个视图 | 柱状图 `350`；普通表两行；透视表只保留华东，线上 `300`、线下 `50`  |
| 刷新页面                   | 重新初始化演示数据，默认显示全部地区柱状图，无重复数据集创建错误   |

这里的普通表展示的是按“地区＋渠道”聚合后的四行，原始五行中的华东线上记录已由 VQuery 合并。`table` 指展示类型，并不代表自动跳过聚合；需要逐条明细时，在查询设计中保留唯一记录维度并核对生成的查询。

## 图形与表格渲染的关键差异

三种视图都使用 `await builder.buildVSeed()` 和 `Builder.from(seed).build()`，后者的结果随 `chartType` 变化：

| `chartType`  | 本例维度编码              | 度量默认编码 | 渲染器                                           |
| ------------ | ------------------------- | ------------ | ------------------------------------------------ |
| `column`     | 地区 `xAxis`              | `yAxis`      | `new VChart(spec, { dom })`，随后 `renderSync()` |
| `table`      | 地区、渠道均为 `column`   | `column`     | `new ListTable(container, options)`              |
| `pivotTable` | 地区 `row`、渠道 `column` | `detail`     | `new PivotTable(container, options)`             |

先设置图表类型再添加字段，Builder 会为度量分配该类型的默认编码。透视表建议显式指定行、列维度，避免添加顺序改变布局。不要把 VBI 的 `row` / `column` 编码手工改造成 VTable 原生的 `rows` / `columns` / `indicators`；这一步由 VSeed 构建。

VTable 的构造函数接收容器和 options，不调用 VChart 的 `renderSync()`；实例也支持 `release()`，容器变化后使用无参 `resize()`。保留明确的容器宽高，否则 Canvas 可能不可见。原生用法可查阅 [VTable 官方入门文档](https://visactor.io/vtable/guide/Getting_Started/Getting_Started)。

## 从教程扩展到自己的页面

### 配置、查询与渲染分别使用对应入口

- `builder.build()` 返回可序列化的 VBI 图表 DSL；`builder.buildVQuery()` 只生成查询，不请求数据。只构建这两种配置时，不必注册连接器或创建渲染器。
- `buildVSeed()` 会调用连接器的 `discoverSchema()` 和 `query()`，此前需要注册对应的 `connectorId`。返回数据以维度、度量 ID 为列名，保留这些 ID 供 VSeed 使用。
- 修改字段、聚合和过滤条件后重新查询。只修改视觉样式时，可以基于已有 seed 构建新 options；同一份查询结果也可以同时提供给图形、指标卡和 HTML 表格。
- VChart 与 VTable 的原生配置不同。先在 VSeed 层设置支持的主题、格式或样式，再按所选渲染器补充特有配置，具体分层见[最佳实践](./tips.md)。

### 保存与恢复

将以下片段放在完整示例的初始化 `try` 块内、`await render()` 之后，可保存当前视图并恢复为新的 Builder：

```javascript
const savedChart = builders[$('#type').value].build()
const json = JSON.stringify(savedChart)
// 数据连接器仍需在恢复环境注册。
const restoredBuilder = VBI.chart.create(JSON.parse(json))
const restoredSeed = await restoredBuilder.buildVSeed()
// 按 restoredSeed.chartType 选择上文的 VChart / ListTable / PivotTable 分支。
```

保存 Dashboard 时同时保存 `dashboard.build()` 和 `VBI.resources.snapshot()`；恢复时先注册资源，再创建 Dashboard Builder。精致散点图和业务大屏示例提供配置导出，完整流程与限制见[接入技巧中的配置恢复说明](./tips.md#8-明确筛选作用域并验证配置恢复)。

DSL 不包含连接器实现、原始数据、外部图片，以及页面后加的精细标注和渲染函数。本文完整 HTML 的刷新行为是重置演示数据和控件，尚未接入持久化读取；需要恢复筛选时，从保存的 DSL 初始化控件，避免首次渲染用默认值覆盖条件。

## 常见问题

| 现象                                              | 检查与处理                                                                                                                                                                                                              |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 数据请求出现 `blocked`、CORS 或 `Failed to fetch` | 检查是否用 `fetch()` 读取本地 JSON / CSV 或远程数据 URL。独立 HTML 必须内置数据并通过 `rawDataset` 接入；同目录文件也可能在 `file://` 下被拦截。实时远程数据需在 HTTP(S) 部署环境验证 CORS。                            |
| 模块加载失败或缺少命名导出                        | VBI、VQuery、VSeed 使用固定版本的 `+esm` 入口；VChart、VTable 使用浏览器 bundle，并保留本文的 import map。普通 `<script src>` 不会提供 ESM 导出；原始 npm ESM 文件还可能包含裸模块名。更换 CDN 或版本后重新验证依赖链。 |
| `VQuery` 引入 Node 依赖                           | 使用本文显式指定的 `dist/browser/esm/browser.js/+esm` 浏览器入口。                                                                                                                                                      |
| 刷新后提示数据集未加载                            | 更新已有数据集时传入完整的 `connectorId, schema, source`，并等待更新结束后再查询。                                                                                                                                      |
| VSeed 无法构建图表类型                            | 在 `Builder.from(seed).build()` 前调用 `registerAll()`；确认使用的是已注册且支持的 `chartType`。                                                                                                                        |
| 图表或表格为空白                                  | 先检查容器尺寸、查询错误和 `seed.dataset`，再确认 `chartType` 与渲染器对应；数据列 ID 应与维度、度量 ID 一致。                                                                                                          |
| 普通表行数少于原始数据                            | 检查 `buildVQuery()` 的分组、聚合、筛选与 limit；表格使用查询结果，不直接展示原始数组。                                                                                                                                 |
| 图表显示但透视表方向不对                          | 显式设置维度的 `row` / `column` 编码；修改后重新构建 VSeed 和表格 options。                                                                                                                                             |
| 页面一直显示加载中                                | 静态导入失败不能由模块主体内的 `try/catch` 捕获；本例用动态 `import()` 捕获加载错误，再区分初始化和查询渲染错误。                                                                                                       |

更多接口见 [VBI 实例](../api/vbi/vbi.md)、[Chart Builder](../api/vbi/chart-builder.md)、[Dashboard Builder](../api/vbi/dashboard-builder.md) 和 [DSL 类型](../api/vbi/types.md)。
