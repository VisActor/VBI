# 模板接入与维护

模板 HTML 是可运行基座，按[模板列表](templates.md)与[可视总览](../templates/index.html)选择。先按[分析设计](insight.md)确定业务问题，再复用合适的实现；现有页面优先沿用宿主。

## 从参考实现选择起点

寿命、心衰、餐食运动与经营概览四份基础模板，均内嵌完整数据，可单独复制 HTML；CDN 模块仍需要联网加载。新建时先运行选定基座，确认默认值、筛选与分析返回，再替换数据、资源 ID、字段映射、口径和文案。布局与图形可按问题重组，沿用适用的视觉和交互机制。

外部 CSV 的类型、缺失与完整性按[静态数据内置](../../../references/visual-query/references/html-integration.md#静态独立-html-的数据内置)处理，其他来源见[数据接入](../../../references/server-runtime/guide.md)。模板例值仅用于核对基座，新业务使用自己的核对基准。

## 数据与配置

三份专题页在模块中定义 `PAGE`；经营概览在模块中建立查询与布局，没有 `PAGE`。主题颜色从 CSS 读取，默认主题和玻璃强度通过 HTML 根元素属性配置，见[外观设置](design.md#外观设置)。

`prepareRows()` 映射原始字段和类型，`conditionsFor()` 定义范围，`buildView()` 消费查询结果并建立展示和 hover 索引。聚合通过 VBI / VQuery 完成，衍生值使用未格式化结果，不在 DOM 中重算分组统计。图形、衍生公式和临时 hover 由页面集成；承诺跨宿主重算时，另按[派生计算与状态](../../../references/visual-query/references/query-and-render.md)保存公式与依赖。

`analysis` 配置当前问题、结果指标、记录量和两个交叉维度，`DashboardAnalysis` 只消费 Builder 聚合结果，生成带范围基准与核查路径的发现。弹窗仅在 `analysis.relation` 明确配置有业务含义的维度、横纵指标与说明时提供关系图；寿命按末年国家比较教育与寿命，心衰按射血分数与肌酐配对，餐食按真实热量与蛋白质坐标配对；相同坐标由 VBI 计数，点选保留全部对应原始记录。记录数仅作为 Tooltip 与明细依据，不自动映射为散点横轴。“交叉定位”同时筛选两个真实字段并联动完整明细；矩阵最多展示 12 × 8 个分类，完整组合保留在菜单，选中项会回到图中。它们是可选方法，按当前问题适配。

专题口径需随适配核对：寿命页主指标取末年国家等权均值，首尾配对分析仅比较两端都有有效记录的国家；心衰页的死亡事件占比不等同于统一随访时点的死亡率；餐食页的热效应占比与单件热量均先汇总再相除。缺失值保留为 `null`，不补成零或将样本关系写成因果。

## 复用边界与入口

| 职责             | HTML 中的入口                                                                              | 适配重点                                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| 配置、查询与视图 | `PAGE`、`prepareRows()`、`conditionsFor()`、`buildView()`；经营概览按各查询 Builder 查找。 | 业务口径、粒度、资源 ID 与缓存映射。                                                                                   |
| 图形构建与更新   | `buildChartSpec()` / `buildSpec()`、`draw()` / `drawPlot()`                                | 稳定字段与系列含义、实例复用、[绘图表面](design.md#图表配色与页面同步)。                                               |
| 布局与尺寸       | Dashboard Builder、`layoutDashboard()`、ResizeObserver                                     | [DSL 布局](layout.md#用-dashboard-dsl-保存布局)、DOM 顺序与焦点、按实际尺寸 resize。                                   |
| 数字与临时查看   | `DashboardMotion`、`bindMetricHover()` / `bindPlotInteraction()`                           | [指标语义](metric-card.md#指标与图形的语义)、缓存索引及已声明作用域。                                                  |
| 筛选与刷新       | `applyFilters()`、`requestRender()`、刷新队列、`DashboardLoading`                          | 条件归属、过期保护、就绪提交、错误恢复；规则见[组合指南](../../../references/visual-query/references/composition.md)。 |
| 指标分析         | `bindMetricAnalysis()`、`metricAnalysisContext()`                                          | 当前范围、默认问题、分组与明细配置，见[指标深入分析](../../../references/deep-analysis/interaction.md)。               |
| 表格             | `DashboardTable`、`overviewTable`、`overviewObserver`                                      | [统一适配器](../../../references/visual-query/references/table-theme.md)、完整查询结果、原位记录更新与释放。           |

函数名可能因模板不同而变化，以实际 HTML 为准。扩展分析时检查数据与查询能力，指标数量、分组、图形组合与发现按业务问题和数据条件确定。

`bindMetricAnalysis()` 接收主页现有的 VQuery 实例 `dataQuery`。内部关联明细通过 `updateDetailTable()` 与 `DashboardTable.createView()` 复用列搜索、筛选、排序和复制；字段 ID、类型和表格格式保持原口径，列条件只过滤明细及其底部汇总。菜单位于 dialog 内，结构兼容时保留条件，关闭销毁查询视图；不添加列概况图行。

`bindMetricAnalysis()` 返回分析控制器，通过 `bindTable(table, tableAnalysisContext)` 接入主页表格，通过 `dispose()` 释放入口与 Modal。单元格上下文使用记录业务键和列字段映射指标，`entryConditions` 固定入口范围，`defaultDimension` 选择初始探索维度；查询统一叠加入口条件，表头选择与正文分析分别处理。先解绑入口，再释放主页表格实例。

主页表格的 `tableView` 通过 `DashboardTable.createView()` 管理独立的 VBI 列条件与排序；主页查询完成后调用 `updateRows()`，其回调 `renderTable()` 保留原始数值、按列格式化并更新已有 VTable。表头漏斗复用 `DashboardFilters` 玻璃控件，列查询只改变表格范围，主页条件更新会刷新数据源；退出时先释放 `tableView`，再释放表格。接口与查询边界见[列搜索、过滤与排序](../../../references/visual-query/references/table-theme.md#列搜索过滤与排序)。

主页 `overview()` 的 `summary` 选择原生总计类型与可汇总列；Modal 使用 `DashboardTable.build()`，通过上下文 `tableTotals` 指定 `sum`，默认 `avg`。条件格式与总计均由 VSeed DSL 生成，更新时调用 `DashboardTable.update()` 刷新列配置和记录；保留实例、列宽及动画。口径与边界见[条件格式与总计](../../../references/visual-query/references/table-theme.md#条件格式与总计)。

## 模板运行核对

经营概览内置 60 天演示数据，截止 2026-09-29，共 240 条商品明细、120 个去重订单。同一订单有两条明细；全部地区 30 天消费者订单为 40 单、占比约 66.7%，不能按明细条数计算。

| 全部地区周期 | 销售额   | 去重订单数 | 利润    |
| ------------ | -------- | ---------- | ------- |
| 30 天        | ¥154,400 | 60         | ¥16,494 |
| 14 天        | ¥76,960  | 28         | ¥8,890  |
| 7 天         | ¥39,656  | 14         | ¥4,116  |

华东 30 天为 ¥74,800、30 单、利润 ¥7,977。全部地区 30 天利润率 10.7%、提升 1.4 个百分点、客单价 ¥2,573；7 天利润率约 10.4%、下降 2.4 个百分点。筛选后发现与读数需对应新范围。

## 固定版本与场景回归

- 模板使用 VBI / VQuery / VSeed 0.7.2、VChart 2.1.7 与 VTable 1.23.1。API 参考反映当前仓库能力，升级前核对目标版本并验证最终 Spec 与画面。
- 热力图的数值度量编码到 `label`，同值另以颜色度量编码到 `color`；关闭默认重复值标签，沿用度量的精度和单位。所有分析图开启 tooltip，并挂在 `dialog` 内以显示在顶层。散点、矩阵与条形之间不做跨图元形变，同图型平滑更新。
- 固定版本柱图在生成 Spec 后设置 `spec.stackCornerRadius = 0`，单柱圆角由 `barRadius` 保留，避免组裁剪与更新不同步；升级时复核此覆盖。日期 crosshair 格式化函数保持稳定引用。
- 经营概览的销售主图和增长迷你图复用查询 seed，各自保留实例绑定；利润柱展示完整区间。客户类型环图关闭图例筛选，保持扇区与中心占比同口径。检查 30 → 14 → 7 → 30 天及局部查看恢复。

## 修改模板时同步维护

每份 HTML 直接维护自己的内嵌实现，不在 light-dashboard 中另建 `assets/`、独立 CSS/JS 维护源或生成同步层。

| 内嵌标记                                                      | 职责                                                              |
| ------------------------------------------------------------- | ----------------------------------------------------------------- |
| `dashboard-appearance-runtime` / `dashboard-appearance-style` | `DashboardAppearance`：色板、设置浮窗、材质强度与本地偏好。       |
| `dashboard-material`                                          | 阅读面、弹窗材质与降级 token。                                    |
| `dashboard-controls-style`                                    | 主页及弹窗的 36px 控件、搜索面板与 loading。                      |
| `dashboard-filters-runtime`                                   | `DashboardFilters`：平铺、Selector、搜索、焦点与销毁。            |
| `dashboard-loading-runtime`                                   | 初始化、筛选等待与失败重试。                                      |
| `dashboard-motion-runtime`                                    | 读数、格式器、入场与卡片倾斜；控件挂载委托给 `DashboardFilters`。 |
| `dashboard-analysis-runtime`                                  | 问题配置、衍生比较、发现及矩阵显示窗口。                          |
| `metric-analysis-style` / `metric-analysis-runtime`           | 分析容器、局部查询与生命周期。                                    |
| `dashboard-table-tokens` / `dashboard-table-runtime`          | 公共表格 token 与 Canvas 适配。                                   |

底部 `#records-panel` / `#records-table` 通过 `DashboardTable.createDetails()` 展示原始记录与第二行列概况。`detailTable.updateScope()` 把主页条件映射到原始列下标；列筛选和排序复用 `createView()`，`detailTable.repaint()` 跟随主题，销毁纳入主页订阅。原始行与分析汇总分别保留自己的粒度和记录数，详见[原始记录与列概况](../../../references/visual-query/references/table-theme.md#原始记录与列概况)。

主页和 Modal 复用同一 `DashboardFilters`，不得按筛选字段重复维护 UI 实现；接入见[Selector 与平铺](filter-select.md)。页面把同一 `motion` 传给分析组件。控件、卡片与分析绑定返回的清理函数由各自宿主释放；`disposeMotion()` 负责数字和入场动画，业务订阅仍由宿主管理。分析刷新版本检查保留在异步提交边界，关闭时由 `cancelRefresh()` 取消查询和等待反馈。

主题刷新沿用 `scheduleAppearance()` / `repaintAppearance()` 队列，读取缓存 seed 或图形定义，不调用查询 Builder；主刷新进行中延后重绘。深度分析打开或切换时读取当前主题。外观偏好不进入查询条件，重置外观不重置筛选。

跨模板调整直接修改涉及的 HTML，逐份核对其业务与交互差异；增删模板或改名时同步列表、入口、链接和截图，改变数据时重算例值。验收集中见[验收标准](acceptance.md)。
