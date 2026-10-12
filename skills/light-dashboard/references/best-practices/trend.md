# 趋势图最佳实践

适用于 Dashboard 中最重要指标的时间趋势。**将主要指标放在独立卡片中，以带渐变填充的面积图展示，并同时提供指标数值、比较基准与统计范围。** 参考[轻量看板示例](../../templates/example.html)的 `#hero-card`、`#trend` 和 `buildChartSpec()`；卡片布局见[布局最佳实践](./layout.md)，配色见[视觉设计最佳实践](./design.md)，小型趋势与数字过渡见[指标卡最佳实践](./metric-card.md)。

## 卡片结构与信息层级

| 区域         | 内容与要求                                                                                                                                           |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 顶部         | 指标短标题及可选图标；保持简约，将空间留给指标与趋势。                                                                                               |
| 主指标       | 按[数值字号规范](./metric-card.md#数值字号规范)的主指标 token 展示真实汇总值，单位独立分级。下方展示变化率与比较基准；数值长度与筛选状态不改变字号。 |
| 趋势主体     | 单个主要指标的渐变面积图，轮廓线清晰、底部逐渐透明；给趋势足够的高度与留白。                                                                         |
| 日期标注     | 默认只显示起始、中间、结束日期；完整日期和当日值通过 Tooltip 查看。                                                                                  |
| 底部辅助指标 | 可展示与主指标相关的利润率、客单价等少量指标，以轻分隔线组织，不再套独立卡片。                                                                       |

卡片使用统一圆角、浅色背景和内边距。指标文本、面积图与辅助指标共享统计范围；利润率用汇总利润除以汇总销售额，客单价用汇总销售额除以去重订单数，不能直接平均每日比率或累加逐日去重数。零分母显示 `—`，没有可比基期时说明“暂无可比数据”。变化方向同时用文字或箭头表达，不能只靠颜色。

窄屏允许辅助指标纵向排列；数值不能溢出卡片。图表容器须有明确高度，可沿用示例的弹性布局与 `min-height: 150px`，根据卡片尺寸增加绘图区高度。主趋势卡保持平面，不应用指标小卡的鼠标倾斜效果。

## 简约坐标轴与渐变面积

默认隐藏轴标题、轴线、刻度、网格线及 Y 轴标签；X 轴也可隐藏，在图下用 HTML 标注三个日期，参考示例的 `.plot-labels`。不要同时显示两套日期标签。若分析任务确需直接比较绝对值，可保留少量 Y 轴标签，仍避免密集网格、常驻数据标签和重复图例。

面积填充使用同一强调色，从轮廓附近的浅色渐变到底部透明；不要用高不透明度遮盖走势，或用多种渐变颜色制造不存在的数值含义。截图中的绿色只是参考，主色沿用页面配色规则。保留零值基准和真实负值，不为制造波动裁掉零基线或把亏损改为零。

以下配置接收 `await trend.buildVSeed()` 得到的面积图 seed，保留其查询结果与字段 ID。假定已导入 VSeed 的 `Builder`、调用 `registerAll()`，并从页面统一配色中取得 `accent`。浏览器依赖与内置数据方式见[HTML 接入](../usage/how-use-vbi-in-html.md)。

```javascript
function buildTrendSpec(seed, accent, reducedMotion = false) {
  const hiddenAxis = () => ({
    visible: false,
    title: { visible: false },
    label: { visible: false },
    line: { visible: false },
    tick: { visible: false },
    grid: { visible: false },
  })
  const spec = Builder.from({
    ...seed,
    backgroundColor: 'transparent',
    color: { colorScheme: [accent] },
    label: { enable: false },
    legend: { enable: false },
    xAxis: hiddenAxis(),
    yAxis: { ...hiddenAxis(), zero: true },
    pointStyle: { pointVisible: false },
    lineStyle: { lineWidth: 2.5, lineColor: accent, lineSmooth: true },
    areaStyle: { areaColor: accent, areaColorOpacity: 0.27, areaGradient: true },
    tooltip: { enable: true },
    crosshairLine: { labelVisible: false },
    animation: {
      enable: !reducedMotion,
      params: { appear: { enable: false }, update: { enable: true, duration: 600, ease: 'cubicInOut' } },
    },
  }).build()
  spec.padding = { top: 8, bottom: 4, left: 3, right: 9 }
  return spec
}
```

`areaGradient: true` 控制面积填充从顶部颜色到底部透明，顶部透明度由 `areaColorOpacity` 控制；轮廓线保持清楚。轻量看板主趋势与迷你趋势默认 `lineSmooth: true`，仅在确有虚假峰谷等误导风险时说明并改用直线，Tooltip 保持真实点值。平滑、渐变与约 600ms 的更新过渡是轻量基线，不因模板精简而删除。

## 数据范围与查询

使用 Chart Builder 创建 `area` 图表，以日期为 X 轴、主要指标为 Y 轴，明确聚合方式与日期升序。指标、趋势、比较基准、日期标注与辅助数值保持同一统计口径；范围变化后一起更新。筛选器的位置、条件维护与刷新链路统一见[Filter 最佳实践](./filter.md)，趋势卡无需重复放置全局筛选。

先按时间粒度整理日期并排序。只有业务确认“当天无记录即为零”时，才参考 `buildChartSpec()` 补齐缺失日期；未知、未采集或尚未同步的数据不能伪装成零。空区间显示空状态，不绘制虚构曲线。数据请求期间显示加载状态，连续变化时丢弃过期结果；复用渲染实例调用 `updateSpec()`。

## 图内独立交互

默认只在当前趋势卡内交互：悬停或触摸可查看日期和真实值，卡内主指标与辅助指标可随日期更新；移出恢复该卡的区间汇总。悬停时显示“当日指标 / 较前一天”，恢复后显示“区间汇总 / 较前 N 天”，避免将单日值误解为周期总额。触屏无法依赖鼠标移出，应支持取消选中或明确的恢复汇总操作。

采用轻量看板风格时，主趋势必须使用 `scope: 'all'` 联动整个看板，增长与利润小图只更新自身；局部悬停不改区间洞察。创建独立趋势卡时将更新函数限定到本卡 DOM、缓存和 Builder；局部逐日查看不应改变其他独立卡片。触屏提供逐日按钮与恢复汇总入口，图表支持左右键 / Esc，见[模板](../../templates/template-business-overview.html)。

实现时参考示例的 `draw()` 首次创建 VChart 后执行 `trend.instance.bind(instance)`，再通过 `trend.instance.on('dimensionHover', handler)` 订阅日期悬停。使用本次查询建立的日期索引读取指标，鼠标移动不触发新查询；同一天去重更新。事件订阅、75ms 延迟与清理方式见[指标卡的悬停实现](./metric-card.md#与图表联动)，将 `showDate()` / `restore()` 限定为当前卡即可。Tooltip 和悬停反馈保留，不因隐藏坐标轴而禁用。

数据范围变化前取消待执行的悬停任务、清除旧选中日期；新结果就绪后恢复区间汇总。减少动态效果模式下停止数值与图表动画。容器变化后调用 `resize()`；销毁时移除监听、定时器与动画帧并释放图表实例。

## 验收

- 主指标以带渐变填充的面积图展示，坐标轴简约，日期标注不重复；卡片具有清楚的主次层级，桌面与窄屏无溢出。
- 数据范围变化后，主指标、比较基准、趋势、日期标注和辅助指标同步更新，符合已声明的作用范围。
- 悬停、触摸与恢复汇总均能读到真实日期和指标；独立模式下不改变其他卡片，悬停不增加查询次数。
- 快速移动与连续更新时，旧结果、旧定时任务和旧动画不会覆盖最新状态。
- 空数据、缺失日期、零分母和负值按确认口径展示；减少动态效果模式及实例清理正常。
