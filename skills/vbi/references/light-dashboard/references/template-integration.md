# 轻量模板接入与场景核对

本篇维护轻量模板的函数入口、视觉参数、数据口径和核对基准。查询、渲染、组合与联动先按 [visual-query](../../visual-query/SKILL.md)执行；浏览器模块加载、静态数据内置和图表 / 表格接入统一见 [HTML 接入](../../visual-query/references/html-integration.md)。

## 从参考实现选择起点

先看[可视总览](../templates/index.html)：共 24 份模板，包括 20 份行业模板、3 份专题数据模板和 1 份经营概览模板。行业模板内嵌十个行业的完整 CSV，配置在 `page-config`，完整数据在 `source-data`；专题数据与经营概览模板的接入方式见下表。各模板展示不同分析重点、布局、主题与数据口径，按需组合片段，不默认照搬某一页。

| 示例                                                                | 适合学习                                       | 阅读代码时关注                                                     |
| ------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------ |
| [模板 1：趋势主导](../templates/template-life-expectancy.html)      | 预期寿命年度趋势；蓝色主辅布局                 | `prepareRows()`、`conditionsFor()`、`buildView()`、`drawPlot()`    |
| [模板 2：指标先行](../templates/template-heart-failure.html)        | 心衰记录概览与年龄组比较；紫色指标行           | 同一查询范围的核心指标、事件占比与局部查看                         |
| [模板 3：分段叙事](../templates/template-meal-workout.html)         | 餐食、运动、营养及样本构成；暖橙分段布局       | 汇总比率、不同分组的图表与缓存联动                                 |
| [精简 Dashboard 模板](../templates/template-business-overview.html) | 新建轻量看板、内置数据与完整必要交互           | `draw()`、`animateMetric()`、`bindMetricHover()`、`bindCardTilt()` |
| [轻量看板](../templates/example.html)                               | 顶部洞察、汇总指标、周期比较、自定义 HTML 卡片 | `summarizePeriod()`、`rowsOf()`、`layoutDashboard()`               |

新建看板按数据与分析任务从基准模板、行业参考集中选取片段或重组布局，基础模板用于查阅较小的接入实现。完整轻量示例用于参考更丰富的配色、图标与业务数据接入。`templates/` 中的 24 份模板可以单独复制 HTML，浏览器需要联网加载 CDN 模块。完整轻量看板当前仍通过网络加载 CSV，复制为独立交付页面时，必须按[静态数据内置指南](../../visual-query/references/html-integration.md#静态独立-html-的数据内置)将 CSV 内置，并将数据初始化改为读取内联文本。

### 三种数据模板的共同机制

三份新模板在 `source-data` 中以原始列名和类型化行数组内嵌完整 CSV，空字符串保留为 `null`，不抽样、不将缺失数值补零。`prepareRows()` 映射查询字段，`conditionsFor()` 定义各查询的筛选范围；Builder 的 `observeDeep()` 合并刷新，查询后经 VSeed 构建 Spec，`drawPlot()` 复用实例调用 `updateSpec()`。`buildView()` 从查询汇总结果计算衍生指标与缓存索引；卡内查看不重新查询，也不改写区间洞察。明细默认展开，国家明细通过分页访问全部结果。

预期寿命模板使用真实年份，展示末年国家等权均值、首尾变化与有效寿命覆盖率；心衰模板只描述样本记录，死亡事件占比不等同于统一随访时点的死亡率；餐食模板以总热效应 / 总热量计算占比，以总热量 / 总食物件数计算单件热量。保留原始数据值及其缺失语义，不把样本分组比较写成因果结论。

图形、衍生公式与悬停显示属于这些独立页面的具体集成。若产品承诺跨宿主恢复整页，除 Dashboard 与资源快照外，还须明确保存或重建这些显示与计算规则，不能声称基础 DSL 已自动保存任意 HTML 计算代码。

## 精简模板的重要片段

[template-business-overview.html](../templates/template-business-overview.html)保留与完整轻量示例一致的必要功能：固定趋势主导布局、柔和浅蓝（`#A8C7E8`）、顶部核心发现、销售主面积图、增长迷你面积图、订单占比环图、利润迷你柱图；标题右侧集中的地区与周期平铺筛选、600ms 图表与指标过渡、小卡 ≤2° 倾斜、默认展开表格、悬停及键盘联动。模板不提供布局和配色选择，地区筛选只显示“全部地区 / 华东 / 华北”选项，分组名称保留在 `aria-label` 中。精简的是数据规模、图标和显示设置，而必要的图表与卡内交互保持完整，逐项要求见[必要基线](layout.md#轻量看板的功能与视觉基线)。原始数据为内置的 60 天确定性演示数据，共 240 条商品明细、120 个订单，截止日为 2026-09-29；同一订单有两条商品明细，用于验证去重。消费者分类属于演示字段，实际数据无该字段时应更换有意义的分组图形。

先替换 `rawDataset`、`schema`、`connectorId` 与指标口径，再调整卡片内容和 Dashboard 坐标。模板的固定日期、地区和色系仅服务于这份演示数据。下列片段摘取关键机制，依赖模板已导入的模块、Builder 与 DOM；完整可运行文件以模板为准，依赖加载及 import map 见 [visual-query 的完整 HTML 教程](../../visual-query/references/html-integration.md#运行一个完整-html柱状图普通表与透视表)。

首屏加载状态必须写在静态 HTML 中，不能等 CDN 或模块执行后再隐藏未布局的内容。模板用 `data-initialized="false"` 与 `inert` 暂时收起主体，保留标题、禁用筛选和可见的加载反馈；主体仍参与内部布局，让 Builder 设置坐标后能以真实尺寸绘制图表。首次数据、指标、洞察和图表就绪后再展示并播放入场；之后的筛选仅更新现有内容，不重新收起或重播。初始化失败时保留可见错误，减少动态效果只取消动效，不提前展示半成品。

### 分析接入与模板对应

通用接入按 [visual-query](../../visual-query/SKILL.md)执行；模板中的具体角色如下，字段和口径按业务替换：

| 模板入口                                              | 场景职责                             | 共享方法                                                                      |
| ----------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------- |
| Connector、`totals` / `previous` / `trend` / `profit` | 内置销售数据、汇总和同期比较         | [查询与字段映射](../../visual-query/references/query-and-render.md)           |
| `layoutDashboard()`、Insight                          | 固定趋势主导布局、核心发现及资源对应 | [资源关系与布局](../../visual-query/references/composition.md#资源关系与布局) |
| `applyFilters()`、`requestRender()`、`draw()`         | 地区与周期筛选、卡片同步更新         | [筛选与刷新](../../visual-query/references/composition.md#刷新订阅与生命周期) |

模板通过 Builder 设置固定布局；外层 slot 管布局与入场，内层 card 管倾斜。核心发现展示销售额、订单、利润三项核心指标与利润率、平均客单价两项衍生指标，口径见 [洞察最佳实践](insight.md)。需要保存时按 [资源恢复](../../visual-query/references/composition.md#同时保存-dashboard-和资源)处理；字号使用[指标卡的统一 token](metric-card.md#数值字号规范)。

### 1. 保留主辅视觉比例

复用结构时同时保留卡间留白、绘图区高度与主辅字体层级。先引入[数值字号规范](metric-card.md#数值字号规范)的角色 token 和窄屏整组切换规则；以下选择器消费这些 token，避免逐卡或按数字长度缩放。卡片位置仍由上面的 Dashboard DSL 提供，窄屏读取 `xs` 坐标重排。

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

### 2. 平铺选择器与默认展开明细

少量互斥选项优先平铺，桌面筛选区域尽量一行，避免重复标签和默认原生 HTML `select` / `input` 外观；大量选项与精确输入采用紧凑的定制入口，窄屏允许必要换行。控件显式表达选中状态，保留 `type="button"` 和键盘焦点。控件回调只更新自身条件，不能清除消费者等其他筛选。控件布局、作用范围、条件 ID 维护及图表与文本的同步动画见[Filter 最佳实践](filter.md)。

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

### 3. 指标文本过渡

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

详细数值插值代码见[指标文本更新动画](metric-card.md#指标文本更新动画)。动画只改展示文本，计算、Tooltip、导出和洞察始终用真实查询结果。

### 4. 固定命中区域与 ≤2° 小卡倾斜

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

模板 `bindCardTilt()` 在固定外层区域读取鼠标坐标，只变换内层卡片；目标向量归一化后乘 1.5°，弹性插值时按向量长度限制为 2°，不能把两个轴各限制为 2° 后误认为合成角度合规。主趋势与洞察保持平面；移出、取消、滚动、失焦复位，触屏与减少动态效果关闭。模板保留返回的 `dispose()`，卸载时移除监听和帧。完整示例切换布局时还会复位倾斜，叙事布局展开为大图的卡片保持平面。参数与解释见[轻微倾斜](layout.md#按模块关系联动与轻微倾斜)。

### 5. 卡内交互与作用域

```javascript
const byDate = new Map(rowsOf(dailyTotals, dailySeed).map((row) => [row.order_date, row]))
// dailyTotals 的查询包含本期第一天的前一天，用于当日比较；不是从 DOM 数值反算。
hoverSubscriptions.set(trend, bindMetricHover(trend, '#trend', 'all'))
hoverSubscriptions.set(growth, bindMetricHover(growth, '#growth-trend', 'growth'))
hoverSubscriptions.set(profit, bindMetricHover(profit, '#profit-trend', 'profit'))
// 只绑定一次；currentMetrics 在每轮查询后替换为新日期索引与区间汇总。
```

悬停稳定 75ms 后读取日期缓存并更新文本，VChart Tooltip 即时响应；主图更新全部数字与订单环图，小图只更新所属卡片。离开恢复同作用域汇总，查询开始时暂停悬停并取消旧任务；刷新完成后恢复，局部联动不改 Insight。图表容器还支持左右键和 Esc；主卡的前一天 / 后一天 / 区间汇总按钮便于触屏查看。绑定与解除代码见[与图表联动](metric-card.md#与图表联动)，完整生命周期以模板为准。

### 模板运行核对

直接用 `file://` 打开，等待 `body[data-state="ready"][data-entrance="complete"]` 且四张图实际可见，再检查 30 → 14 → 7 → 30 天和地区筛选、默认展开及手动折叠、刷新后的初始化，以及 1440px 桌面与 390px 窄屏。实际检查 `updateSpec()` 复用与过渡、指标文本中间帧、平滑线、≤2° 倾斜、主图 / 小图联动与恢复、减少动态效果模式。确认模板无布局和配色控件、无重复“地区”标签，默认强调色为柔和浅蓝；三种布局与配色切换仅在完整示例或用户要求的扩展中验收。运行期只请求 CDN 依赖，不请求 JSON / CSV 数据。核心发现、汇总、图形和区域表使用同一筛选范围，明细展开状态不因筛选而重置。最终截图按[截图对照验收](visual-acceptance.md)保存并实际查看；截图无法替代动效与交互检查。

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

标题旁的三个布局图标按钮将顶部洞察与四个指标组织为趋势主导、指标先行或分段叙事，选中状态通过按钮和当前布局名称表达。三种布局统一使用最大 1140px 的外壳宽度，窄屏自适应；切换只改变内部排列。切换通过 Dashboard Builder 更新 `lg/xs` 坐标，保留图表、洞察资源、配色、统计周期和区域明细的展开状态；UI 按容器宽度读取布局、同步 DOM 顺序并调整图表尺寸。主趋势联动全部指标，迷你图只联动自身。布局原理见[布局最佳实践](layout.md)。

区域明细表格默认展开，可点击标题折叠或重新展开；筛选、布局与配色切换保留用户当前的展开状态。

三种布局都在图表前展示“核心发现”，以三项核心指标和利润率、平均客单价两项衍生指标共同支撑一句关键结论；比率变化使用百分点，金额变化使用相对增幅。内容、计算、AI 接入边界和 Insight 保存方式统一见[洞察最佳实践](insight.md)。切换周期后重新计算，布局、配色切换与局部悬停保留区间洞察。首次入场采用 420ms 间隔、1400ms 时长，减少动态效果模式下直接显示。

轻量看板的数据核对基准（当前 CSV 最新订单日期为 2019-12-30，共 9,959 条明细；金额显示取整）：

| 周期  | 日期范围                | 销售额   | 去重订单数 | 利润    |
| ----- | ----------------------- | -------- | ---------- | ------- |
| 7 天  | 2019-12-24 — 2019-12-30 | ¥121,872 | 44         | ¥6,133  |
| 14 天 | 2019-12-17 — 2019-12-30 | ¥249,025 | 81         | ¥24,702 |
| 30 天 | 2019-12-01 — 2019-12-30 | ¥544,539 | 156        | ¥74,556 |

普通表与透视表的独立接入示例见 [共享 HTML 教程](../../visual-query/references/html-integration.md)。

## 固定版本与场景回归

模板固定使用 VBI / VQuery / VSeed 0.6.4。该版本的柱图在生成 Spec 后设置 `spec.stackCornerRadius = 0`，通过 `barRadius` 保留单柱圆角，避免整组裁剪与更新动画不同步；升级依赖时按新版本的圆角能力复核此覆盖。日期 crosshair 格式化函数保持稳定引用，验收实际过渡帧。

完整示例的利润柱图展示所选完整区间，订单环图显示客户类型占比；图例关闭筛选，避免扇区重新归一化后与消费者中心占比不一致。检查 30 → 14 → 7 → 30 天时柱体、折线与环形扇区均正确更新。当前模板悬停联动延迟为 75ms，主趋势更新全部指标，小图仅更新自身；这些参数与图形选择属于轻量场景。

## 查询与视图复用

经营概览和完整示例的销售主图、增长迷你图共用同一 Chart Builder 与查询 seed，分别生成 VSeed 配置和 VChart 实例。悬停订阅按视图容器保存，避免迷你图覆盖主图的实例绑定。完整示例切换配色只重绘缓存结果；日期筛选才重新查询。

最新日期也由 VBI 的 `max` 度量查询。HTML 卡片与区域表只映射查询字段、格式化数字和计算明确的比率，不重新分组、求和或计数。
