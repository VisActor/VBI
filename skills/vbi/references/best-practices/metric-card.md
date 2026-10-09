# 指标卡最佳实践

指标卡由短标题、指标文本和迷你图组成。参考[轻量看板示例](../../examples/dashboard/lightweight-dashboard.html)的主趋势、销售增长与利润卡片；页面宽度、圆角和联动方向遵循[设计与布局最佳实践](./layout.md)，强调色、填充色与正负值颜色见[配色与背景最佳实践](./design.md)。

用于承载最重要指标的大幅趋势卡，使用渐变面积图并展示统计范围，见[趋势图最佳实践](./trend.md)。下方 mini 图配置用于指标旁的小型图，不替代主趋势图。

## 文本与迷你图配合

| 迷你图      | 适用内容                 | 展示要求                                     |
| ----------- | ------------------------ | -------------------------------------------- |
| Mini line   | 连续趋势、增长走势       | 使用细线，默认隐藏常驻数据点，悬停仍可读数。 |
| Mini area   | 强调趋势的规模或总量     | 在细线下增加面积填充，保留轮廓可读性。       |
| Mini column | 每日利润、订单数等离散值 | 保留零值基准和负值，使用小圆角柱体。         |

迷你图建议宽 80–140px、高 56–80px，与指标文本并排。单卡展示一个主要指标，避免堆叠长说明和装饰图标。

**Mini line、Mini area、Mini column 都必须禁用数据标签、图例和全部坐标轴元素，包括轴标题、轴标签、轴线、刻度与网格线；悬停时也不显示坐标轴上的准星标签。** 只保留折线、面积或柱体表达趋势，不为已隐藏的元素预留空间，不额外添加图表标题、参考线或注释，做到真正的 mini，而不是缩小的完整图表。可以保留按需出现的 Tooltip 与指标文本联动，时间口径放在指标卡文本或 Tooltip 中；HTML 容器通过 `role="img"` 和 `aria-label` 说明趋势含义。柱图保留零值在数值尺度中的基准作用，但不绘制零线。

文本与图表使用同一筛选范围和基础查询结果。汇总文本不依赖对逐日去重订单数再次求和；客单价和利润率使用汇总值计算。日期按顺序排列；只有业务确认“当天无记录即为零”时才补零，未知或缺失数据不要当作零。查询与派生指标的状态归属见[实践技巧](../usage/tips.md)。

## VSeed 配置：mini column、mini line、mini area

以下为 JavaScript 示例，假定已导入 VSeed 的 `Builder`、`registerAll` 和 `VChart`；浏览器导入方式见[HTML 接入](../usage/how-use-vbi-in-html.md)。`mini` 是容器 DOM，容器须有明确尺寸。三种 mini 图使用普通 `column`、`line`、`area` 类型，加紧凑展示配置，不需要新增图表类型。

### 公共配置

示例使用已聚合的每日销售额，页面先按配色文档初始化 `--accent`，以下配置只消费这一颜色变量。三种迷你图都必须复用以下隐藏标签、图例与坐标轴的公共配置，并在各自配置中关闭准星标签。接入 VBI 的 `buildVSeed()` 时保留其 `dataset`、维度和度量 ID，在返回的 seed 上补充以下视觉属性即可。

```javascript
registerAll()
const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
const dailySales = [
  { date: '2026-10-01', value: 120 },
  { date: '2026-10-02', value: 145 },
  { date: '2026-10-03', value: 90 },
  { date: '2026-10-04', value: 160 },
  { date: '2026-10-05', value: 110 },
  { date: '2026-10-06', value: 180 },
  { date: '2026-10-07', value: 165 },
]
function miniAxis() {
  return {
    visible: false,
    title: { visible: false },
    label: { visible: false },
    line: { visible: false },
    tick: { visible: false },
    grid: { visible: false },
  }
}
function miniBase() {
  return {
    theme: 'light',
    dataset: dailySales.map((row) => ({ ...row })),
    dimensions: [{ id: 'date', alias: '日期', encoding: 'xAxis' }],
    measures: [
      { id: 'value', alias: '销售额', encoding: 'yAxis', format: { type: 'number', prefix: '¥', fractionDigits: 0 } },
    ],
    backgroundColor: 'transparent',
    color: { colorScheme: [accent] },
    label: { enable: false },
    legend: { enable: false },
    xAxis: miniAxis(),
    yAxis: { ...miniAxis(), zero: true }, // 保留零值基准，不显示轴线或零线。
    tooltip: { enable: true },
    animation: {
      enable: !reducedMotion.matches,
      params: {
        appear: { enable: false },
        update: { enable: true, duration: 600, ease: 'cubicInOut' },
      },
    },
  }
}
```

### Mini column

```javascript
const miniColumnSeed = {
  ...miniBase(),
  chartType: 'column',
  crosshairRect: { labelVisible: false },
  barMaxWidth: 12,
  barStyle: { barRadius: 2, barColor: accent, barColorOpacity: 0.75, barGradient: false, barBorderWidth: 0 },
}
```

展示利润时替换为已查询的每日利润数据和度量别名，负值保留在零值基准下方；语义色配置统一见[配色与背景最佳实践](./design.md#图表配色与页面同步)。

### Mini line

```javascript
const miniLineSeed = {
  ...miniBase(),
  chartType: 'line',
  crosshairLine: { labelVisible: false },
  pointStyle: { pointVisible: false },
  lineStyle: { lineWidth: 1.5, lineColor: accent, lineSmooth: true },
}
```

### Mini area

```javascript
const miniAreaSeed = {
  ...miniBase(),
  chartType: 'area',
  crosshairLine: { labelVisible: false },
  pointStyle: { pointVisible: false },
  lineStyle: { lineWidth: 1.5, lineColor: accent, lineSmooth: true },
  areaStyle: { areaColor: accent, areaColorOpacity: 0.18, areaGradient: false },
}
```

轻量看板的 Mini line、Mini area 与主趋势默认使用平滑曲线，保持视觉一致。若数据点少、突变明显或曲线产生不存在的峰谷，再改用直线并说明原因；Tooltip 始终显示真实查询点值。

### 构建与更新实例

```javascript
function buildMiniSpec(seed) {
  const spec = Builder.from(seed).build()
  spec.padding = { top: 4, right: 4, bottom: 4, left: 4 }
  // 轻量看板固定使用 0.6.4；关闭旧版整组圆角裁剪，圆角由 barStyle 绘制。
  if (seed.chartType === 'column') spec.stackCornerRadius = 0
  return spec
}
let activeSeed = miniLineSeed // 也可使用 miniColumnSeed / miniAreaSeed。
const spec = buildMiniSpec(activeSeed)
const instance = new VChart(spec, { dom: mini })
instance.renderSync()
// 来源是 VBI Chart Builder 时，首次渲染后执行 chartBuilder.instance.bind(instance)。

async function updateMini(nextSeed) {
  activeSeed = nextSeed
  if (reducedMotion.matches) instance.stopAnimation()
  await instance.updateSpec(
    buildMiniSpec({
      ...nextSeed,
      animation: { ...nextSeed.animation, enable: !reducedMotion.matches },
    }),
  )
}
const onMotionChange = () => updateMini(activeSeed).catch((error) => console.error(error))
reducedMotion.addEventListener('change', onMotionChange)
// 容器改变大小时调用 instance.resize(width, height)。
// 销毁时移除 onMotionChange 监听，再调用 instance.release()。
```

更新时保持日期、字段 ID 和系列含义稳定，并复用实例。`stackCornerRadius` 的覆盖用于上述固定版本的兼容处理，升级时按当前 VSeed API 检查是否仍需覆盖。

## 指标文本更新动画

统计范围切换、日期悬停和恢复汇总时，指标文本必须有数值过渡。轻量看板统一采用约 600ms，与图表更新节奏一致；首次显示直接展示真实值，避免从虚构的零值开始。销售额、订单、利润、增长率、变化率、占比、利润率与客单价都覆盖，不能只让主数字动起来。连续更新从当前显示值继续，取消上一次动画，不能等旧动画结束后覆盖新值。

```javascript
const metricAnimations = new Map()
function updateMetric(element, target, format = String, duration = 600) {
  const previous = metricAnimations.get(element)
  if (previous) cancelAnimationFrame(previous.frame)
  if (!Number.isFinite(target)) {
    metricAnimations.delete(element)
    element.textContent = '—'
    return
  }
  const state = { value: previous?.value ?? target, frame: 0 }
  metricAnimations.set(element, state)
  const from = state.value
  const started = performance.now()
  function tick(now) {
    const progress =
      from === target || reducedMotion.matches || duration <= 0 ? 1 : Math.min(1, (now - started) / duration)
    const eased = 1 - (1 - progress) ** 3
    state.value = from + (target - from) * eased
    element.textContent = format(state.value)
    state.frame = progress < 1 ? requestAnimationFrame(tick) : 0
  }
  tick(started)
}
const money = (value) =>
  new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', maximumFractionDigits: 0 }).format(value)
const number = (value) => new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 0 }).format(value)
// total 是 VBI 汇总查询结果经字段映射后的业务对象。
updateMetric(document.querySelector('#sales'), total.sales, money)
updateMetric(document.querySelector('#orders'), total.order_id, number)
updateMetric(document.querySelector('#profit'), total.profit, money)
```

数字使用 `font-variant-numeric: tabular-nums` 保持字符宽度稳定。图表 Tooltip 显示真实查询值，动画只用于展示，不参与计算或导出。减少动态效果模式下直接显示目标值；空值显示 `—`，不要转换成零。销毁时取消全部 `metricAnimations` 中的帧并清空 Map。

## 与图表联动

轻量看板的主图联动全部指标，增长小图只更新增长卡，利润小图只更新利润卡。悬停显示当日值与前一天比较，移出恢复对应卡片的区间汇总与前一个等长周期比较。这里的“较前一天 / 较前 N 天”是必要的指标口径，可以放在卡片内短标签或 Tooltip 中，无需页面 subtitle。

沿用示例的查询方式：一次刷新得到 `dailyTotals` 和 `dailyConsumers`，建立日期索引，悬停时读取缓存；不要每次鼠标移动都重新查询。把示例 `showMetrics()` 中对数值文本的直接赋值替换为 `updateMetric()`，并保留它的 `scope` 判断与零分母处理。增长率、利润率等目标值先由真实聚合结果计算，再执行文本动画。

以下片段假定已经创建并绑定 `trend`、`growth`、`profit` Builder，`showDate(date, scope)` / `restore(scope)` 读取本次查询的日期索引和汇总，调用上述动画更新相应卡片。每次刷新替换 `currentMetrics`，事件只订阅一次，避免监听器引用旧数据。[模板](../../examples/dashboard/template.html)还保留消费者占比环图：占比用范围内去重消费者订单数除以去重总订单数，固定分类与字段供 `updateSpec()` 匹配；主图逐日联动时同步更新环图与占比文本，环图 Tooltip 显示真实分类占比。

```javascript
let currentMetrics = { showDate, restore }
let metricsReady = true
function bindMetricHover(chart, scope, delay = 75) {
  let timer, pendingDate, shownDate
  function reset() {
    clearTimeout(timer)
    pendingDate = shownDate = undefined
  }
  const reportError = (error) => console.error(error)
  function onHover({ action, dimensionInfo }) {
    if (!metricsReady) return reset()
    if (action === 'leave') {
      const shouldRestore = shownDate !== undefined
      reset()
      if (shouldRestore) Promise.resolve(currentMetrics.restore(scope)).catch(reportError)
      return
    }
    const date = dimensionInfo?.[0]?.value
    if (typeof date !== 'string' || date === pendingDate) return
    clearTimeout(timer)
    pendingDate = undefined
    if (date === shownDate) return
    pendingDate = date
    timer = setTimeout(() => {
      pendingDate = undefined
      if (!metricsReady) return
      shownDate = date
      Promise.resolve(currentMetrics.showDate(date, scope)).catch(reportError)
    }, delay)
  }
  chart.instance.on('dimensionHover', onHover)
  return {
    reset,
    dispose() {
      reset()
      chart.instance.off('dimensionHover', onHover)
    },
  }
}
const hoverSubscriptions = [
  bindMetricHover(trend, 'all'),
  bindMetricHover(growth, 'growth'),
  bindMetricHover(profit, 'profit'),
]
function pauseMetricHover() {
  metricsReady = false
  hoverSubscriptions.forEach((subscription) => subscription.reset())
}
async function resumeMetricHover(nextMetrics) {
  currentMetrics = nextMetrics
  await currentMetrics.restore('all')
  metricsReady = true
}
// 刷新开始时 pauseMetricHover()；数据与图表就绪后 await resumeMetricHover(nextMetrics)。
// 页面销毁时调用各订阅的 dispose()。
```

默认延迟 75ms 与当前轻量看板实现一致，只延迟指标联动，原生 Tooltip 和悬停点即时响应。刷新、离开或销毁时取消待执行任务；禁止子图更新主区域或其他子区域。加载中的事件拦截、查询过期检查与刷新队列沿用示例的 `run()` 和 `requestRender()`。

## 验收

- 三种迷你图均不显示数据标签、图例、坐标轴及其标题、标签、轴线、刻度、网格线，也不为这些元素预留空间；悬停不出现准星标签，Tooltip 与指标文本联动正常。
- 切换 30 → 14 → 7 → 30 天，指标文本和迷你图使用一致范围，复用同一渲染实例。
- 悬停主图时全部指标更新，悬停小图时只有所属卡片更新，移出后恢复相同作用域的汇总。
- 快速移动鼠标或切换周期，旧定时任务和旧数值动画不会覆盖最新值；悬停不增加查询次数。
- 零分母、空值和负利润正确显示，柱图负值位于零值基准下方且不绘制零线；移动端无文字与图表重叠。
- 减少动态效果模式下停止数值过渡与图表动画；销毁后无残留监听、定时器和动画帧。
