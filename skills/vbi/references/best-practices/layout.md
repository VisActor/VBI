# Dashboard 布局最佳实践

适用于经营概览、轻量看板和指标仪表盘。先根据分析任务选择阅读路径，再决定模块大小、分组与响应式排列。本文仅维护[轻量看板示例](../../examples/dashboard/lightweight-dashboard.html)中已有的三种参考布局：趋势主导、指标先行、分段叙事。可在查阅示例后根据当前任务组合、调整或设计新的布局，遵循下方共同原则。配色与背景实现见[配色与背景最佳实践](./design.md)。

## 共同原则与可调参数

| 项目     | 约束                                                                                                                                                                   |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 布局     | 用 Dashboard DSL 管理可恢复的模块位置，UI 转换为网格；桌面按阅读路径组织，窄屏按业务顺序重排。                                                                         |
| 视图宽度 | 示例中的三种布局统一使用最大 **1140px** 的外壳，切换时只调整内部排列；新页面按内容与宿主空间调整，嵌入页面按容器可用宽度适配。                                         |
| 内容容器 | 独立模块可使用卡片；连续分析可用章节标题、留白和分隔线分组。避免卡片套卡片，以及每个数字都加独立边框。                                                                 |
| 内容高度 | 洞察、长文本与明细随内容自动撑高，下方区域随网格行高增长顺延；图表保留最小高度。不用固定高度裁切内容，也不依靠溢出到相邻区域展示。                                     |
| 主次关系 | 趋势主导突出主图；指标先行先展示核心指标；分段叙事按段落建立层次。主次关系由分析任务决定。                                                                             |
| AI 洞察  | 三种布局均在顶部标明指标数量、统计周期与比较周期，再用列表逐项展示波动；每项一句，增长用绿色、下跌用红色。洞察文本通过 Insight Builder 保存。                          |
| 联动方向 | 主区域向下联动，子区域只更新自身；布局切换保留已声明的模块关系。Header 全局过滤器可统一改变全部区域的分析范围。                                                        |
| 3D 动效  | 主区域禁止倾斜；子区域可选用轻微倾斜，任意时刻的倾斜幅度不超过 **2°**。触屏和减少动态效果模式下关闭倾斜。                                                              |
| 卡片入场 | 按阅读顺序缓和淡入与轻微上移；少量卡片可逐张延时，模块较多或长叙事按可见行或章节分批，避免累积等待。                                                                   |
| 圆角     | 根据卡片尺寸与页面留白调整，宽松布局建议 **16–24px**，允许使用 **24px**；窄屏、小容器或小卡片可减至 **8–16px**。控件按自身尺寸调整，同层级保持一致，避免圆角挤占内容。 |
| 页面结构 | 按分析任务与宿主约定组织标题、过滤器、内容和必要说明；**Header + Content** 可作为轻量看板的起点。                                                                      |

卡片保留短标题、指标单位和必要的比较口径；加载、错误等反馈放在 Header 或相关卡片内。

数据口径说明应反映真实的统计范围、聚合或去重规则与比较基准，随筛选更新。说明的位置与样式按页面需要设置，窄屏允许换行，不遮挡图表或控件。

## 顶部 AI 洞察

洞察的重点是完整呈现已选指标在明确周期内的波动。先确定分析范围，再逐项形成列表：

1. 确定指标清单与数量。示例分析销售额、去重订单数、利润 3 项独立指标；“销售增长”属于销售额的变化率，不重复计数。
2. 确定统计周期与比较周期。在列表上方显示指标数量、当前起止日期及比较基准，例如“3 项指标 · 2019-12-01 — 2019-12-30 · 对比前 30 天”。
3. 逐项列出指标的本期值、变化方向与幅度。每项指标对应一个列表项，每项一句话，允许多行；覆盖清单中的每个指标。
4. 用绿色标注增长、红色标注下跌，并同时保留箭头及“增长 / 下跌”文字。持平、缺失数据或无法比较时使用中性色；方向颜色在切换页面配色后保持一致。

示例中的 30 天洞察列表：

- **销售额**：¥544,539，环比 ↑ 增长 16.2%。
- **订单数**：156 单，环比 ↓ 下跌 1.9%。
- **利润**：¥74,556，环比 ↑ 增长 136.3%。

洞察与当前筛选范围一致，全局筛选变化后同时更新周期和各项波动；局部图表悬停只改变对应指标，不覆盖区间列表。布局与配色切换复用同一 Insight 资源。某项缺少本期值、前期数据或前期基数为零时，在该项中说明，保留其他可比较指标的结果。原因与建议以已有证据为依据。

调用方负责将指标清单、本期值、前期值与统计范围提供给 AI，并通过 `insight.setContent(content)` 保存返回内容。示例用首行保存指标数量与周期说明，其余行采用 Markdown 列表保存逐项结论；UI 将列表渲染为原生 `ul` / `li`，只对箭头对应的变化文本着色。VBI 的 Insight Builder 管理文本，不执行模型推理；轻量看板使用真实查询生成“摘要演示”。实际接入时，AI 返回内容遵循同一逐项格式。

## 按分析任务选择布局

| 模式     | 首先回答的问题               | 桌面组织                               | 窄屏阅读顺序                         |
| -------- | ---------------------------- | -------------------------------------- | ------------------------------------ |
| 趋势主导 | 整体表现如何变化？           | AI 洞察 → 主趋势 + 辅助侧栏。          | AI 洞察 → 主趋势 → 辅助指标。        |
| 指标先行 | 当前结果是否达标？           | AI 洞察 → KPI 横排 → 主趋势 → 明细。   | AI 洞察 → 关键指标 → 主趋势 → 明细。 |
| 分段叙事 | 结果、原因与证据分别是什么？ | AI 洞察 → 结果、原因与证据的连续章节。 | AI 洞察 → 按章节顺序阅读。           |

### 趋势主导

适合一个核心趋势带动少量辅助指标。示例键为 `focus`，顶部 AI 洞察占 12 列，其下主图占 8 列，增长、订单和利润三张卡片占右侧 4 列。新页面可按内容调整跨度；主图保持充分的横向时间跨度，避免侧栏不断增高而主图留下大片空白。

```text
┌────────────────────────────────┐
│          AI 洞察               │
├─────────────────────┬──────────┤
│                     │ 辅助指标 │
│      主趋势         ├──────────┤
│                     │ 辅助指标 │
│                     ├──────────┤
│                     │ 辅助指标 │
└─────────────────────┴──────────┘
```

主图可向下联动辅助指标。窄屏先显示 AI 洞察，再显示主趋势和辅助模块，不等比例缩小桌面的侧栏。

### 指标先行

适合日常经营、目标完成率和运营监控。示例键为 `kpiFirst`，顶部先放 AI 洞察，其下依次放订单数、销售增长和利润三张指标卡，再放通栏销售趋势和区域明细。新页面可根据业务优先级调整 KPI 的数量与排序；指标条也可共享一个容器，通过留白或分隔线区分。

```text
┌───────────────────────────────────┐
│             AI 洞察               │
├───────────┬───────────┬───────────┤
│  订单数   │ 销售增长  │   利润    │
├───────────┴───────────┴───────────┤
│             主趋势               │
├───────────────────────────────────┤
│               明细                │
└───────────────────────────────────┘
```

KPI 的排序体现业务优先级，行数与宽度根据标签、单位和数值长度调整。窄屏可保留两列短 KPI；长标签、复杂比较口径或空间不足时改为单列。

### 分段叙事

适合周报、月报、分析结论与专题复盘。示例键为 `story`，先用顶部 AI 洞察交代结论，再展示通栏销售趋势、并列的增长与利润分析，最后展示订单与区域明细。用章节标题和留白串联“结论 → 结果 → 原因 → 证据”；连续内容可采用开放式分区，只在需要独立边界的模块使用卡片。

```text
结论
┌───────────────────────────────────┐
│             AI 洞察               │
└───────────────────────────────────┘
结果
┌───────────────────────────────────┐
│            核心趋势               │
└───────────────────────────────────┘
原因
┌─────────────────┬─────────────────┐
│    增长分析     │    利润分析     │
└─────────────────┴─────────────────┘
证据
┌───────────────────────────────────┐
│           订单与区域明细           │
└───────────────────────────────────┘
```

每段围绕一个分析问题组织，不用固定的等高卡片把长表格、结论和图表硬压成同一高度。窄屏保留叙事顺序；联动限制在当前段落或明确定义的下游范围。

三种参考布局可以按章节组合，例如先用指标先行概览，再用分段叙事组织趋势与明细。先选阅读路径，再配置具体坐标；模式名称只是组装参考，实际保存的是组件关系与各断点的布局。

## 用 Dashboard DSL 保存布局

组件关系和可恢复的布局归 Dashboard DSL，通过 Builder 修改；UI 将布局转换为 CSS Grid。不要在 DSL 与 CSS 中分别维护两套卡片位置。

### 三种布局的坐标配方

下面以 12 列为基准，元组依次表示 `[角色, x, y, w, h]`。`positions()` 转成 Builder 接受的位置对象，`stack()` 按给定的阅读顺序生成窄屏单列。以下 3 项指标的配方为 `insight` 留出桌面 3 行、窄屏 4 行，容纳周期说明和逐项列表。坐标是起点，行高、跨度和断点按内容调整；`h` 是网格行数，不是固定像素高度。下方渲染采用可增长的网格行，指标数量增加或文本换行时自动撑高对应行并顺延后续模块；调整模块的业务位置与最小跨度时仍通过 Builder 更新布局。

```javascript
const positions = (items) => Object.fromEntries(items.map(([role, x, y, w, h]) => [role, { x, y, w, h }]))
const stack = (items) => {
  let y = 0
  return Object.fromEntries(
    items.map(([role, h]) => {
      const position = { x: 0, y, w: 12, h }
      y += h
      return [role, position]
    }),
  )
}
const layoutPresets = {
  focus: {
    lg: positions([
      ['insight', 0, 0, 12, 3],
      ['main', 0, 3, 8, 9],
      ['growth', 8, 3, 4, 3],
      ['orders', 8, 6, 4, 3],
      ['profit', 8, 9, 4, 3],
    ]),
    xs: stack([
      ['insight', 4],
      ['main', 9],
      ['growth', 3],
      ['orders', 3],
      ['profit', 3],
    ]),
  },
  kpiFirst: {
    lg: positions([
      ['insight', 0, 0, 12, 3],
      ['orders', 0, 3, 4, 3],
      ['growth', 4, 3, 4, 3],
      ['profit', 8, 3, 4, 3],
      ['main', 0, 6, 12, 9],
    ]),
    xs: stack([
      ['insight', 4],
      ['orders', 3],
      ['growth', 3],
      ['profit', 3],
      ['main', 9],
    ]),
  },
  story: {
    lg: positions([
      ['insight', 0, 0, 12, 3],
      ['main', 0, 3, 12, 9],
      ['growth', 0, 12, 6, 6],
      ['profit', 6, 12, 6, 6],
      ['orders', 0, 18, 12, 4],
    ]),
    xs: stack([
      ['insight', 4],
      ['main', 9],
      ['growth', 6],
      ['profit', 6],
      ['orders', 4],
    ]),
  },
}
```

分别对应示例中的趋势主导（`focus`）、指标先行（`kpiFirst`）和分段叙事（`story`），三种配方复用 `insight`、`main`、`growth`、`orders`、`profit` 五个角色；示例 HTML 将 `main` 命名为 `hero`。`insight` 绑定 Insight 资源，其余角色绑定 Chart 资源，切换时保留 widget ID、内容、分析配置与联动关系。区域明细在示例中位于这五个角色的网格之外，章节标题由 UI 组织。

`lg/xs` 是最小示例。需要平板两列短 KPI 等排列时，用同样的配方补充 `md/sm` 坐标，并让 UI 选择已配置的断点。窄屏重排后让 DOM 顺序与当前阅读顺序一致；仅改变 CSS Grid 的视觉位置不会改变键盘和读屏顺序。

### 将配方绑定到资源

下面假定已按[HTML 接入文档](../usage/how-use-vbi-in-html.md)导入 `VBI`，并创建 `trend`、`growth`、`totals`、`profit` 四个 Chart Builder。`insightContent` 的首行说明指标数量与周期，后续每行以 `- ` 开头保存一个指标的波动结论；`renderInsightContent()` 沿用轻量看板的列表渲染函数。以趋势主导模式演示绑定，其他两种模式复用这些资源，仅替换坐标配方：

```javascript
const dashboard = VBI.dashboard.create(VBI.dashboard.createEmpty())
const preset = layoutPresets.focus
const insight = VBI.insight.create(VBI.insight.createEmpty()).setContent(insightContent)
dashboard.insight.add((widget) => {
  widget.setInsightId(insight).setTitle('AI 洞察').setLayouts({
    lg: preset.lg.insight,
    xs: preset.xs.insight,
  })
  document.querySelector('#insight-slot').dataset.widget = widget.getId()
})
const renderInsight = () => {
  renderInsightContent(insight.build().content)
}
insight.dsl.observeDeep(renderInsight)
renderInsight()
// 筛选后将新结论传给 insight.setContent(nextContent)；页面销毁时 unobserveDeep(renderInsight)。
const widgets = [
  {
    role: 'main',
    chart: trend,
    title: '销售总额',
    slot: '#main-slot',
  },
  {
    role: 'growth',
    chart: growth,
    title: '销售增长',
    slot: '#growth-slot',
  },
  {
    role: 'orders',
    chart: totals,
    title: '订单总数',
    slot: '#orders-slot',
  },
  {
    role: 'profit',
    chart: profit,
    title: '利润',
    slot: '#profit-slot',
  },
]
for (const { role, chart, title, slot } of widgets) {
  dashboard.chart.add((widget) => {
    widget.setChart(chart).setTitle(title).setLayouts({ lg: preset.lg[role], xs: preset.xs[role] })
    document.querySelector(slot).dataset.widget = widget.getId()
  })
}
```

`setLayouts()` 在 `dashboard.chart` 或 `dashboard.insight` 集合的 `add()` / `update()` 回调中提交，新增组件必须提供 `lg`。角色名只用于组装，不新增 DSL 字段；保存与恢复使用真实的 widget ID 和坐标。已有资源只改布局时，按 widget ID 调用对应集合的 `update()` 中的 `setLayouts()`，保留资源身份与分析配置。上述三种配方使用相同的五个资源，先匹配角色，再调整布局。保存时同时导出 Dashboard 和资源快照，确保洞察文本随资源恢复。

## Header + Content 示例

下面继续演示趋势主导模式，其他模式按角色与阅读顺序调整 Content 结构，共用 Header 和 DSL 到网格的映射。下方的数据说明与署名展示一种排布方式，按实际页面要求调整。样式中的颜色变量由[配色与背景最佳实践](./design.md#统一颜色变量)初始化；此处只定义布局与控件结构。过滤器的选中值应由当前分析配置初始化，点击只修改相关 Builder；具体刷新与指标绘制沿用轻量看板的 `applyPeriod()`、`requestRender()` 和 `draw()`。

```html
<div class="dashboard-view">
  <header class="dashboard-header">
    <h1>经营概览</h1>
    <fieldset class="filters" aria-label="统计周期">
      <button data-days="7" aria-pressed="false">7 天</button>
      <button data-days="14" aria-pressed="false">14 天</button>
      <button data-days="30" aria-pressed="true">30 天</button>
    </fieldset>
  </header>
  <main class="dashboard-grid" aria-label="经营指标">
    <div id="insight-slot" class="card-slot">
      <section class="card insight-card" aria-labelledby="insight-title">
        <h2 id="insight-title">AI 洞察</h2>
        <div class="insight-body" aria-live="polite" aria-atomic="true">
          <p id="insight-scope" class="insight-scope"></p>
          <ul id="insight-list" class="insight-list"></ul>
        </div>
      </section>
    </div>
    <div id="main-slot" class="card-slot">
      <section class="card main-card" aria-labelledby="sales-title">
        <h2 id="sales-title">销售总额</h2>
        <strong id="sales" class="metric-value">—</strong>
        <div id="trend" class="main-plot" role="img" aria-label="每日销售额趋势"></div>
      </section>
    </div>
    <div id="growth-slot" class="card-slot">
      <section class="card sub-card" aria-labelledby="growth-title">
        <h2 id="growth-title">销售增长</h2>
        <div class="metric-body">
          <strong id="growth" class="metric-value">—</strong>
          <div id="growth-trend" class="mini-plot" role="img" aria-label="销售额走势"></div>
        </div>
      </section>
    </div>
    <div id="orders-slot" class="card-slot">
      <section class="card sub-card" aria-labelledby="orders-title">
        <h2 id="orders-title">订单总数</h2>
        <strong id="orders" class="metric-value">—</strong>
      </section>
    </div>
    <div id="profit-slot" class="card-slot">
      <section class="card sub-card" aria-labelledby="profit-title">
        <h2 id="profit-title">利润</h2>
        <div class="metric-body">
          <strong id="profit" class="metric-value">—</strong>
          <div id="profit-trend" class="mini-plot" role="img" aria-label="每日利润"></div>
        </div>
      </section>
    </div>
  </main>
  <p class="dashboard-attribution">
    <span id="data-scope">数据口径：当前筛选范围内销售额与利润求和，订单数去重；环比前一等长周期。</span>
    <span>Powered By VisActor</span>
  </p>
</div>
```

下方示例卡片默认使用 24px 圆角，窄屏降为 16px；紧凑卡片或窄幅嵌入容器可按实际尺寸覆盖 `--card-radius`。

```css
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  background: var(--background-base);
  color: var(--ink);
  font-family: Inter, 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
.dashboard-view {
  width: min(var(--content-width, 1140px), calc(100% - 32px));
  margin: 32px auto;
}
.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}
h1 {
  margin: 0;
  font-size: 24px;
}
h2 {
  margin: 0 0 12px;
  color: var(--muted);
  font-size: 13px;
  font-weight: 500;
}
.filters {
  display: flex;
  gap: 4px;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}
.filters button {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  color: var(--ink);
  font: inherit;
  cursor: pointer;
}
.filters button[aria-pressed='true'] {
  border-color: var(--accent);
  background: var(--accent-soft);
}
.filters button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-auto-rows: minmax(44px, auto);
  gap: 16px;
}
.dashboard-attribution {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 4px 12px;
  margin: 16px 0 0;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.5;
  text-align: right;
  overflow-wrap: anywhere;
}
.card-slot {
  min-width: 0;
  min-height: min-content;
  display: flex;
  flex-direction: column;
}
.card {
  flex: 1;
  min-height: min-content;
  height: auto;
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: var(--card-radius, 24px);
  background: var(--surface);
}
.insight-card {
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}
.insight-card h2 {
  margin: 0;
  color: var(--accent-ink);
}
.insight-body {
  display: grid;
  gap: 8px;
}
.insight-scope {
  margin: 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.6;
}
.insight-list {
  display: grid;
  gap: 6px;
  margin: 0;
  padding-left: 20px;
  font-size: 14px;
  line-height: 1.65;
  overflow-wrap: anywhere;
}
.insight-change {
  font-weight: 600;
  white-space: nowrap;
}
.insight-change[data-direction='up'] {
  color: var(--insight-up, #12815e);
}
.insight-change[data-direction='down'] {
  color: var(--insight-down, #c64a3f);
}
.main-card {
  display: flex;
  flex-direction: column;
  transform: none;
}
.main-plot {
  flex: 1;
  min-height: 150px;
  contain: size;
  margin-top: 16px;
}
.sub-card {
  transform: perspective(800px) rotate3d(var(--tilt-x, 0), var(--tilt-y, 1), 0, var(--tilt-angle, 0deg));
}
.metric-value {
  font-size: 32px;
  font-variant-numeric: tabular-nums;
}
.main-card > .metric-value {
  font-size: 44px;
}
.metric-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.mini-plot {
  width: clamp(72px, 28vw, 132px);
  height: 72px;
  flex-shrink: 0;
  contain: size;
}
@media (max-width: 991px) {
  .dashboard-header {
    align-items: flex-start;
    flex-wrap: wrap;
  }
}
@media (max-width: 540px) {
  .dashboard-view {
    margin: 20px auto;
  }
  .card {
    --card-radius: 16px;
    padding: 16px;
  }
}
@media (prefers-reduced-motion: reduce), (hover: none) {
  .sub-card {
    transform: none;
  }
}
```

从 DSL 读取位置，布局应用后再调整 VChart 尺寸。`renderedCharts` 是沿用示例的 `Map<DOM容器, VChart实例>`；初次绘图后也调用一次布局函数。

`minmax(44px, auto)` 将行高设为最小值，卡片按内容撑高；同一行的并列模块共享行高，下方模块自然顺延，不需把浏览器测得的像素高度写回 DSL。图表容器使用 `contain: size` 与明确尺寸或 `min-height`，避免 Canvas 内部尺寸反过来撑高网格，造成反复扩张；只对图表绘图区使用尺寸包含，不对洞察和文本容器使用。内容更新、字体加载或窄屏换行后的容器变化仍需触发图表 `resize()`。

```javascript
const grid = document.querySelector('.dashboard-grid')
function layoutDashboard() {
  const dsl = dashboard.build()
  const breakpoint = grid.clientWidth >= dsl.breakpoints.lg ? 'lg' : 'xs'
  const ordered = [...dsl.layout[breakpoint]].sort((a, b) => a.y - b.y || a.x - b.x)
  for (const [index, item] of ordered.entries()) {
    const slot = grid.querySelector(`[data-widget="${item.widgetId}"]`)
    if (grid.children[index] !== slot) grid.insertBefore(slot, grid.children[index] ?? null)
    slot.style.gridColumn = `${item.x + 1} / span ${item.w}`
    slot.style.gridRow = `${item.y + 1} / span ${item.h}`
  }
  renderedCharts.forEach((instance, element) => instance.resize(element.clientWidth, element.clientHeight))
}
const resizeObserver = new ResizeObserver(layoutDashboard)
resizeObserver.observe(grid)
layoutDashboard()
// 页面销毁时执行 resizeObserver.disconnect()，并释放图表实例。
```

这里以内容容器宽度选择断点，适用于看板嵌入侧栏或其他宿主。布局按 `y`、`x` 排序，再按该顺序移动容器，确保视觉、键盘与读屏顺序一致。CSS 的媒体查询调整 Header、内边距与圆角，不覆盖 DSL 中的卡片位置。示例三种布局共享最大 1140px 的外壳；新页面可通过 `.dashboard-view` 的 `--content-width` 按图表标签与宿主空间调整内容宽度。

最大内容宽度与 DSL 断点要配套设置。叙事页面若最大 960px，却仍使用默认 `lg: 992`，就始终只能选中窄屏布局；可根据并列模块的最小宽度，在创建 Dashboard 时把 `breakpoints.lg` 改为 800 等适合的阈值。重排时只移动位置确实变化的容器；若容器中存在已聚焦控件，保留并恢复焦点，避免键盘操作被响应式重排打断。

## 按模块关系联动与轻微倾斜

三种布局沿用示例的 `bindMetricHover()`：主图使用 `all` 作用域，增长图和利润图分别使用 `growth`、`profit`。移出时恢复相同作用域的区间汇总，子图不调用 `all`。切换布局不改变联动作用域，不因某个模块变大或排在左侧就让它控制全部指标。新页面按分析任务定义下游范围。具体指标更新示例见[指标卡最佳实践](./metric-card.md)。

倾斜绑定到固定外层 `.card-slot`，仅变换内层 `.sub-card`，避免图表 Canvas 或卡片自身的变换改变命中边界。透视与倾斜都放在内层卡片的 `transform` 中，外层不设置 `perspective`，内容保持在同一卡片平面上，避免父容器拦截图表悬停。下面使用单个 `rotate3d()` 角度，整体旋转被限制为 2°，避免两个轴各 2° 时合成倾斜超过上限。

```javascript
function bindSubCardTilt(slot) {
  const card = slot.querySelector('.sub-card')
  const motion = matchMedia('(prefers-reduced-motion: reduce)')
  const mouse = matchMedia('(hover: hover) and (pointer: fine)')
  const reset = () => card.style.setProperty('--tilt-angle', '0deg')
  function move(event) {
    if (motion.matches || !mouse.matches || event.pointerType !== 'mouse') return reset()
    const rect = slot.getBoundingClientRect()
    const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2))
    const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2))
    card.style.setProperty('--tilt-x', String(-y))
    card.style.setProperty('--tilt-y', String(x))
    card.style.setProperty('--tilt-angle', `${Math.min(1, Math.hypot(x, y)) * 2}deg`)
  }
  slot.addEventListener('pointermove', move, { capture: true, passive: true })
  slot.addEventListener('pointerleave', reset)
  slot.addEventListener('pointercancel', reset)
  window.addEventListener('blur', reset)
  window.addEventListener('scroll', reset, { capture: true, passive: true })
  motion.addEventListener('change', reset)
  mouse.addEventListener('change', reset)
  return () => {
    slot.removeEventListener('pointermove', move, true)
    slot.removeEventListener('pointerleave', reset)
    slot.removeEventListener('pointercancel', reset)
    window.removeEventListener('blur', reset)
    window.removeEventListener('scroll', reset, true)
    motion.removeEventListener('change', reset)
    mouse.removeEventListener('change', reset)
    reset()
  }
}
const disposeTilts = [...document.querySelectorAll('.sub-card')].map((card) => bindSubCardTilt(card.parentElement))
// 页面销毁时执行 disposeTilts.forEach((dispose) => dispose())。
```

## 卡片按顺序延时入场

卡片按当前阅读顺序依次入场，同一行从左到右。少量卡片可采用间隔 **240–320ms**、单卡时长 **700–900ms**；下面采用首张延时 **120ms**、卡片间隔 **280ms**、单卡时长 **800ms**，结合透明度和 10px 上移形成缓和的出现效果。模块较多或长叙事按可见行或章节分批播放，避免大量模块累积出数秒等待；开放式分区无需套用卡片动效。

动画施加到外层 `.card-slot`，内层 `.sub-card` 保留独立的轻微倾斜。页面首次数据与图表就绪后统一入场；过滤、悬停和响应式重排只更新内容及位置，不重复播放整页入场。HTML 默认保持可见，初始化进入等待状态后才隐藏卡片，加载失败时立即恢复可见并展示错误反馈。

```css
.dashboard-grid[data-entrance='pending'] .card-slot {
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .dashboard-grid[data-entrance='pending'] .card-slot {
    opacity: 1;
  }
}
```

使用上述 `grid`、`dashboard` 和布局断点，按 DSL 位置计算入场顺序。不要仅依赖 DOM 顺序，以免移动端重排后动画顺序与实际位置不一致。

```javascript
const entranceMotion = matchMedia('(prefers-reduced-motion: reduce)')
let entranceAnimations = []
let entranceStarted = false
function finishCardEntrance() {
  entranceStarted = true
  grid.dataset.entrance = 'complete'
  entranceAnimations.forEach((animation) => animation.cancel())
  entranceAnimations = []
}
function prepareCardEntrance() {
  if (entranceMotion.matches) finishCardEntrance()
  else grid.dataset.entrance = 'pending'
}
function revealCards() {
  if (entranceStarted) return
  entranceStarted = true
  if (entranceMotion.matches) return finishCardEntrance()
  const dsl = dashboard.build()
  const breakpoint = grid.clientWidth >= dsl.breakpoints.lg ? 'lg' : 'xs'
  const ordered = [...dsl.layout[breakpoint]].sort((a, b) => a.y - b.y || a.x - b.x)
  grid.dataset.entrance = 'playing'
  entranceAnimations = ordered.map((item, index) => {
    const slot = grid.querySelector(`[data-widget="${item.widgetId}"]`)
    return slot.animate(
      [
        { opacity: 0, transform: 'translateY(10px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      { delay: 120 + index * 280, duration: 800, easing: 'cubic-bezier(.2,.75,.25,1)', fill: 'both' },
    )
  })
  Promise.all(entranceAnimations.map((animation) => animation.finished.catch(() => {}))).then(finishCardEntrance)
}
const onEntranceMotionChange = () => {
  if (entranceMotion.matches) finishCardEntrance()
}
entranceMotion.addEventListener('change', onEntranceMotionChange)
// 初始化、异步加载前调用 prepareCardEntrance()；首次布局和绘图完成后调用 revealCards()。
// 加载失败时调用 finishCardEntrance()。
// 销毁时移除 onEntranceMotionChange 监听，并调用 finishCardEntrance() 取消剩余动画。
```

减少动态效果模式下所有卡片直接可见，立即取消剩余入场动画。数值过渡与图表数据更新另按[指标卡最佳实践](./metric-card.md)处理。

## 示例参考与验收

轻量看板提供三种布局的 `layoutPresets`、`bindWidget()`、`layoutDashboard()`、`bindMetricHover()` 与实例更新的完整参考。三种布局共享最大 1140px 的外壳，复用相同指标与顶部洞察资源，支持数值更新动画与最大 2° 的轻微倾斜。洞察保持平面，文本随周期筛选更新。

验收覆盖移动端 375px / 390px、桌面 1440px、大屏 1920px，以及窄于窗口的嵌入容器：

- 布局与分析任务匹配；内容宽度、列数和高度适合标签、指标与图表，没有横向溢出或大片无意义留白。
- 增加洞察条目、延长文本、放大字号及切换窄屏后，卡片自动撑高，后续模块顺延，无裁切、重叠或内部纵向滚动条；内容缩短后高度回落，图表尺寸稳定，无持续扩张。
- 三种布局在桌面与窄屏都先呈现顶部 AI 洞察；指标数量与周期明确，每项指标一句并使用列表，增长为绿、下跌为红。筛选后更新周期与所有指标项，布局、配色切换和局部悬停保留区间列表及方向颜色；文字完整可读，缺失或无法比较的指标单独说明。
- 圆角与卡片尺寸、留白相称；宽松布局可使用 24px，窄屏、小容器和小卡片适当减小，不挤压文字或图表。
- 数据口径说明准确并随筛选更新，窄屏不溢出，不遮挡图表与控件。
- 同一断点中所有模块坐标不越界、不重叠；桌面与窄屏角色完整，DOM、键盘与读屏顺序符合当前阅读路径。
- 趋势主导突出主趋势；指标先行先展示核心指标；分段叙事的章节与证据顺序清楚。卡片或开放分区按内容选用。
- 联动按声明的模块关系发生，独立模块不意外更新其他区域，移出时恢复对应范围的汇总。
- 大型交互图表保持平面；启用倾斜的小卡片始终不超过 2°。入场不会因模块较多造成长时间等待，筛选时不重复播放；减少动态效果模式下关闭倾斜与入场。
- 保存恢复后资源身份、分析配置与各断点坐标一致。具体方法见[实践技巧](../usage/tips.md)。
