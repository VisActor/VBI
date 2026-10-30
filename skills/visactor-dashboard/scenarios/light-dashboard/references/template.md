# 模板选择、接入与维护

选择接近需求的模板，复制完整 HTML，根据用户需求进行最小业务适配，最后验证数据口径、交互和桌面 / 窄屏呈现。

## 选择模板

优先匹配数据粒度、分析结构和交互需求，题材与配色可替换。通过[可视总览](../templates/index.html)比较候选模板，再查看 HTML 和截图；桌面截图同名，窄屏为 `-mobile.png`。

<!-- template-catalog:start -->

| 模板                                                     | 分析重点                                     | 布局与主题                                 |
| -------------------------------------------------------- | -------------------------------------------- | ------------------------------------------ |
| [寿命观察](../templates/template-life-expectancy.html)   | 长期变化、首尾国家配对、发展状态差距与覆盖。 | 左侧主趋势、右侧辅助卡；浅蓝。             |
| [心衰样本](../templates/template-heart-failure.html)     | 事件数与占比、年龄和高血压状态交叉核对。     | 顶部三项指标、下方年龄组条形图；鸢紫。     |
| [餐食与运动](../templates/template-meal-workout.html)    | 热量与蛋白质密度、活动水平分层。             | 热量主区，下方运动、营养与样本三列；杏橙。 |
| [经营概览](../templates/template-business-overview.html) | 销售增量贡献、订单与客单变化、利润质量。     | 左侧辅助卡、右侧销售趋势；草绿。           |

<!-- template-catalog:end -->

## 复制与接入

复制完整 HTML 并先运行，确认默认读数、筛选与分析返回可用。模板内嵌数据与组件；VBI / VQuery / VSeed、VChart 和 VTable 通过固定版本 CDN 加载，需联网。已有页面沿用宿主。

只调整需求涉及的数据、资源 ID、字段、口径、文案和布局；复用[UI 组件](components.md)，用户风格与宿主约束优先。字段变化时，同步筛选、分析上下文、表格下钻与原始明细的字段映射。

| 适配内容       | HTML 中的入口                                                                                                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 数据与查询范围 | 专题页：`source-data`、`prepareRows()`、`conditionsFor()` 与原始列映射 `recordColumns`；经营概览：`rawDataset`、`schema` 与查询 Builder。                                               |
| 指标与发现     | 专题页：`PAGE`、`buildView()`；经营概览直接配置查询与布局；发现由 `analysis` 配置。                                                                                                     |
| 图形与布局     | `buildChartSpec()` / `buildSpec()`、`draw()` / `drawPlot()`、Dashboard Builder 与 `layoutDashboard()`。                                                                                 |
| 深入分析与明细 | `metricAnalysisContext()`、`bindMetricAnalysis()`、`DashboardTable`；接入细则见[深度分析](deep-analysis.md)与[表格适配器](../../../references/visual-query/references/table-theme.md)。 |

函数名以实际 HTML 为准；外观配置见 [UI 组件](components.md#外观设置)。

复用内嵌 `DashboardData` 管理连接与替换，条件、聚合和排序交给公开 Builder。纯数据通过 `query()` 获取，图形通过 `buildVSeed()` 获取；明细 QueryBuilder 使用 `queryMode: 'detail'`，列概况通过 `queryProfile()` 取得。专题页列字典由 `DashboardData.decode()` 在 `prepareRows()` 前还原；新数据可直接使用 `{ columns, rows }` JSON，缺失保留 `null`。静态数据见[内嵌规则](../../../references/visual-query/references/html-integration.md#静态独立-html-的数据内置)，其他来源见[数据接入](../../../references/server-runtime/guide.md)。

沿用示例口径时注意：寿命指标取末年国家等权均值，首尾比较仅用两端有效的配对国家，国家汇总在所选完整范围内按国家平均，原始明细保留逐年记录；心衰事件占比不等于统一随访时点的死亡率；餐食热效应占比与单件热量先汇总再相除。关系图仅在 `analysis.relation` 配置了有业务含义的两轴时启用，不默认以记录数作解释轴。

## 验证

按[验收标准](acceptance.md)核对默认及筛选范围的读数、图形、发现和完整明细，检查筛选、深入、返回、换色及桌面 / 窄屏呈现；局部修改验证受影响部分。

经营概览演示数据截止 2026-09-29，每单两条明细：全部地区 30 天为销售额 ¥154,400、去重订单 60、利润 ¥16,494；7 天为 ¥39,656、14 单、¥4,116。检查 30 → 14 → 7 → 30 天及局部查看恢复；替换数据后使用业务核对基准。

## 维护模板

维护源见 [UI 组件](components.md#组件边界与维护源)、[数据适配器](../../../references/visual-query/assets/dashboard-data.js)和[表格适配器](../../../references/visual-query/references/table-theme.md)。修改维护源时同步所有使用它的模板内嵌块，保留自然缩进与格式化忽略标记；`dashboard-page-style` 和业务模块只放页面差异。

独立 HTML 直接维护内嵌实现，保持单文件可运行，不依赖仓库组件源或维护脚本。增删或改名模板时同步本页列表、可视总览、入口、链接和截图；改变示例数据时重算核对值。

### 固定版本与场景回归

修改相关图形或升级依赖时核对：

- 模板固定 VBI / VQuery / VSeed 0.7.4、VChart 2.1.7、VTable 1.23.1；API 参考对应当前仓库，升级需核对目标版本和最终 Spec、画面。
- 热力图数值度量编码到 `label`，同值以颜色度量编码到 `color`，关闭重复值标签；分析图 tooltip 挂在 `dialog` 内。散点、矩阵与条形之间不做跨图元形变。
- 单柱圆角通过 `barStyle.barRadius` 配置；标签动画、智能反色与描边使用 `label` 配置。日期 crosshair 格式化函数保持稳定引用。
- 经营概览销售主图和增长迷你图复用 seed，各自绑定实例；利润柱展示完整区间，客户类型环图关闭图例筛选，保持中心占比与扇区同口径。
