# Dashboard 设计与布局最佳实践

适用于经营概览、轻量看板和指标仪表盘。参考[轻量看板示例](../../examples/dashboard/lightweight-dashboard.html)的主次区域、响应式网格和单向联动；新页面采用本文的宽度、圆角、颜色和动效约束。

## 页面与视觉约束

| 项目     | 约束                                                                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 布局     | 使用 Dashboard 网格布局，支持移动端、桌面和大屏；窄屏纵向排列，宽屏展示主次区域。                                                                 |
| 视图宽度 | 内容区最大宽度为 **1140px**，居中显示；移动端随可用宽度收缩，大屏保留两侧留白。                                                                   |
| 内容容器 | 图表、指标和明细等展示内容均放入卡片，保持一致的间距与内边距。                                                                                    |
| 主区域   | 设置一个主区域，承载主要趋势与核心分析，可以联动其他子区域。                                                                                      |
| 联动方向 | **禁止子区域反向联动主区域，也禁止子区域跨区域联动其他子区域**；子区域可在自身内部独立联动。Header 中的全局过滤器可以统一改变全部区域的分析范围。 |
| 3D 动效  | 主区域禁止倾斜；子区域可选用轻微倾斜，任意时刻的倾斜幅度不超过 **2°**。触屏和减少动态效果模式下关闭倾斜。                                         |
| 卡片入场 | 每张卡片均使用延时入场动画，按当前视觉布局自上而下依次出现；间隔稍长，采用缓和淡入与轻微上移。                                                    |
| 颜色     | 一个 Dashboard 只使用一个强调色，以浅色背景和中性色文字为主；通过明暗、透明度和位置建立层级，避免为每张卡片分配不同颜色。                         |
| 背景     | 根据系列色选择两种低饱和颜色，以大面积柔和模糊渐变自然融合；柔白斜光从左上穿至右下，边缘柔化并带轻微散射，突出卡片内容。                          |
| 圆角     | 使用小圆角，卡片建议 **8px**，控件建议 **4–6px**；避免大圆角卡片和胶囊式页面容器。                                                                |
| 页面结构 | 采用 **Header + Content**，无需 Footer。Header 只保留标题、过滤器等重要内容，不添加 subtitle、导入 DSL 按钮或冗长说明。                           |

单一强调色不能代替信息表达：增减、负值和选中状态同时使用符号、数值、位置或文字表达。卡片保留短标题、指标单位和必要的比较口径；加载、错误等反馈放在 Header 或相关卡片内，不为它们增加 Footer。

## 低饱和渐变与柔白斜光

根据图表系列色选择两种协调的低饱和背景色，形成大面积柔和、模糊的渐变，自然融合；一束柔白光从左上斜穿至右下，像阳光透过毛玻璃，边缘柔化并带轻微散射。整体保持低饱和、轻盈通透，视觉重点落在卡片内容上。两种背景色只作装饰，图表系列、选中控件与重点指标仍使用同一个强调色。

纯 CSS 使用 `body::before` 绘制底层渐变，`body::after` 绘制白色斜光。将以下声明合并到页面样式，保留现有 DOM、网格布局、卡片尺寸和交互处理：

```css
body {
  position: relative;
  min-height: 100svh;
  isolation: isolate;
  margin: 0;
  color: var(--ink);
  background: #edf2f1;
  font-family: Inter, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  -webkit-font-smoothing: antialiased;
}

body::before,
body::after {
  content: '';
  position: fixed;
  pointer-events: none;
}

body::before {
  z-index: -2;
  inset: -18%;
  background:
    radial-gradient(ellipse at 14% 22%, #c7e9df 0%, #c7e9df00 62%),
    radial-gradient(ellipse at 88% 78%, #ddd6ed 0%, #ddd6ed00 64%);
  filter: blur(64px);
}

body::after {
  z-index: -1;
  inset: -10%;
  background:
    radial-gradient(ellipse at 24% 0%, #ffffffb3 0%, #ffffff00 48%),
    linear-gradient(
      52deg,
      #ffffff00 32%,
      #ffffff14 38%,
      #ffffff70 43%,
      #ffffffd9 46%,
      #ffffff80 49%,
      #eee7f833 54%,
      #eee7f800 61%
    );
  filter: blur(18px);
}
```

`isolation: isolate` 将负层级背景留在页面的独立堆叠上下文中；两层伪元素位于内容下方，`pointer-events: none` 保证点击与悬停命中卡片、过滤器和图表。负 `inset` 为模糊边缘预留空间，滚动时背景保持固定。不对卡片或 Content 容器应用 `filter`，保持文字和图表清晰。

## 用 Dashboard DSL 保存布局

组件关系和可恢复的布局归 Dashboard DSL，通过 Builder 修改；UI 将布局转换为 CSS Grid。不要在 DSL 与 CSS 中分别维护两套卡片位置。

下面的片段假定已按[HTML 接入文档](../usage/how-use-vbi-in-html.md)导入 `VBI`，并创建 `trend`、`growth`、`totals`、`profit` 四个 Chart Builder。采用与轻量看板相同的主区域加三个子区域：

```javascript
const dashboard = VBI.dashboard.create(VBI.dashboard.createEmpty())
const widgets = [
  {
    chart: trend,
    title: '销售总额',
    slot: '#main-slot',
    lg: { x: 0, y: 0, w: 8, h: 9 },
    xs: { x: 0, y: 0, w: 12, h: 6 },
  },
  {
    chart: growth,
    title: '销售增长',
    slot: '#growth-slot',
    lg: { x: 8, y: 0, w: 4, h: 3 },
    xs: { x: 0, y: 6, w: 12, h: 3 },
  },
  {
    chart: totals,
    title: '订单总数',
    slot: '#orders-slot',
    lg: { x: 8, y: 3, w: 4, h: 3 },
    xs: { x: 0, y: 9, w: 12, h: 3 },
  },
  {
    chart: profit,
    title: '利润',
    slot: '#profit-slot',
    lg: { x: 8, y: 6, w: 4, h: 3 },
    xs: { x: 0, y: 12, w: 12, h: 3 },
  },
]
for (const { chart, title, slot, lg, xs } of widgets) {
  dashboard.chart.add((widget) => {
    widget.setChart(chart).setTitle(title).setLayouts({ lg, xs })
    document.querySelector(slot).dataset.widget = widget.getId()
  })
}
```

`setLayouts()` 在 `dashboard.chart.add()` / `update()` 的回调中提交。布局使用 12 列，新增组件必须提供 `lg`；本例主动选择 `lg/xs` 两种布局，移动端不通过等比例缩小桌面卡片实现。

## Header + Content 示例

将下面的结构与上述 Builder 片段组合。过滤器的选中值应由当前分析配置初始化，点击只修改相关 Builder；具体刷新与指标绘制沿用轻量看板的 `applyPeriod()`、`requestRender()` 和 `draw()`。

```html
<div class="dashboard-view">
  <header class="dashboard-header">
    <h1>经营概览</h1>
    <fieldset class="filters" aria-label="统计周期">
      <button data-days="7" aria-pressed="false">7 天</button>
      <button data-days="12" aria-pressed="false">12 天</button>
      <button data-days="30" aria-pressed="true">30 天</button>
    </fieldset>
  </header>
  <main class="dashboard-grid" aria-label="经营指标">
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
</div>
```

```css
* {
  box-sizing: border-box;
}
:root {
  --accent: #16c99e;
  --ink: #28333e;
  --muted: #64717e;
}
body {
  margin: 0;
  background: #edf2f1;
  color: var(--ink);
  font-family: Inter, 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
.dashboard-view {
  width: min(1140px, calc(100% - 32px));
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
  border: 1px solid #dce2e7;
  border-radius: 6px;
  background: #fff;
  color: var(--ink);
  font: inherit;
  cursor: pointer;
}
.filters button[aria-pressed='true'] {
  border-color: var(--accent);
  background: #e7faf4;
}
.filters button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-auto-rows: 44px;
  gap: 16px;
}
.card-slot {
  min-width: 0;
  perspective: 800px;
}
.card {
  height: 100%;
  padding: 20px;
  border: 1px solid #e5eaee;
  border-radius: 8px;
  background: #fff;
}
.main-card {
  display: flex;
  flex-direction: column;
  transform: none;
}
.main-plot {
  flex: 1;
  min-height: 0;
  margin-top: 16px;
}
.sub-card {
  transform: rotate3d(var(--tilt-x, 0), var(--tilt-y, 1), 0, var(--tilt-angle, 0deg));
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

```javascript
const grid = document.querySelector('.dashboard-grid')
function layoutDashboard() {
  const dsl = dashboard.build()
  const breakpoint = grid.clientWidth >= dsl.breakpoints.lg ? 'lg' : 'xs'
  for (const item of dsl.layout[breakpoint]) {
    const slot = grid.querySelector(`[data-widget="${item.widgetId}"]`)
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

这里以内容容器宽度选择断点，适用于看板嵌入侧栏或其他宿主。CSS 的媒体查询只调整 Header 和内边距，不覆盖 DSL 中的卡片位置。1440px、1920px 或更宽屏幕仍保持最大 1140px 内容区。

## 单向联动与轻微倾斜

沿用示例的 `bindMetricHover()`，主图使用 `all` 作用域，增长图和利润图分别使用 `growth`、`profit`。移出时恢复相同作用域的区间汇总；子图不能调用 `all`。具体指标更新示例见[指标卡最佳实践](./metric-card.md)。

倾斜绑定到固定外层 `.card-slot`，仅变换内层 `.sub-card`，避免图表 Canvas 或卡片自身的变换改变命中边界。下面使用单个 `rotate3d()` 角度，整体旋转被限制为 2°，避免两个轴各 2° 时合成倾斜超过上限。

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

每张卡片都设置入场延时，按当前网格布局自上而下依次出现，同一行从左到右。建议卡片间隔 **240–320ms**、单卡时长 **700–900ms**；下面采用首张延时 **120ms**、卡片间隔 **280ms**、单卡时长 **800ms**，结合透明度和 10px 上移形成缓和的出现效果。

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

轻量看板提供 `bindWidget()`、`layoutDashboard()`、`bindMetricHover()` 与实例更新的完整参考。其现有 1120px 外壳、26px 卡片圆角、多种装饰颜色、较大倾斜角、subtitle 和 Footer 是旧页面的设计选择；新页面按本文调整。

验收覆盖移动端 375px / 390px、桌面 1440px、大屏 1920px：无横向溢出，大屏内容不超过 1140px；所有展示内容位于卡片内；主图能联动子卡片，子图只更新自身且移出恢复；主区域保持平面，子区域倾斜始终不超过 2°；卡片按实际位置自上而下依次缓和入场，筛选时不重复入场；减少动态效果模式下关闭倾斜与入场；渐变与斜光柔和，背景不影响文字清晰度，也不拦截点击、Tooltip 或悬停联动。保存恢复与查询口径另见[实践技巧](../usage/tips.md)。
