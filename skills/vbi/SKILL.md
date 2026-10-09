---
name: vbi
description: 使用 VBI 的 DSL 和 Builder 构建图表、仪表盘与洞察。适用于 VBI 数据接入、分析配置、渲染集成及配置保存与恢复。
---

# VBI Dashboard 构建指南

## 核心方法论：基于 Dashboard 模板构建

新建 Dashboard 先从[精简模板](examples/dashboard/template.html)复制起步，沿用已验证的视觉骨架、信息密度与交互，再替换数据、指标和业务内容。[完整轻量示例](examples/dashboard/lightweight-dashboard.html)用于查阅扩展实现。已有宿主或用户指定风格时，将模板的模块与交互适配到目标页面；单图和局部修改只执行相关步骤。

模板也是验收参照：保留真实图表、平滑趋势、`updateSpec()` 与指标文本动画、≤2° 小卡倾斜、默认展开明细和卡内联动；减少动态效果模式立即展示最终状态。详细约束统一遵循[轻量看板基线](references/best-practices/layout.md#轻量看板的功能与视觉基线)，不能因精简删去必要能力。

按以下 4 个阶段推进，已有结论直接沿用，局部修改只处理相关内容。按资料索引和阶段内链接查阅当前任务需要的内容。

## 资料索引

| 类别       | 资料                                                                                                                         | 用途与查阅时机                                             |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| 模板与示例 | [精简 Dashboard 模板](examples/dashboard/template.html)                                                                      | 新建看板的起点，包含完整的数据、图表与交互实现。           |
| 模板与示例 | [完整轻量 Dashboard](examples/dashboard/lightweight-dashboard.html)                                                          | 扩展布局、配色与交互时查阅。                               |
| 模板与示例 | [参考图 1](examples/dashboard/demo1.png)、[参考图 2](examples/dashboard/demo2.png)、[参考图 3](examples/dashboard/demo3.png) | 选择视觉风格，比较主辅比例、信息层级与密度。               |
| 模板与示例 | [单图示例](examples/charts/polished-chart.html)、[效果图](examples/charts/polished-chart.png)                                | 构建独立图表时参考。                                       |
| 模板与示例 | [大屏示例](examples/screen/large-screen.html)、[效果图](examples/screen/large-screen.png)                                    | 交付大屏时参考。                                           |
| 最佳实践   | [设计与布局](references/best-practices/layout.md)                                                                            | 适配模板骨架、控制密度、配置布局与卡片动效。               |
| 最佳实践   | [配色与背景](references/best-practices/design.md)                                                                            | 确定页面与图表的颜色层级。                                 |
| 最佳实践   | [指标卡](references/best-practices/metric-card.md)                                                                           | 实现辅助图形、指标动画与卡内联动。                         |
| 最佳实践   | [趋势图](references/best-practices/trend.md)                                                                                 | 实现平滑趋势、渐变面积与图内交互。                         |
| 最佳实践   | [Filter 筛选器](references/best-practices/filter.md)                                                                         | 设计平铺筛选、维护 Builder 条件并联动更新。                |
| 最佳实践   | [核心发现与指标洞察](references/best-practices/insight.md)                                                                   | 选择衍生指标，组织计算口径、结论与证据。                   |
| 最佳实践   | [截图对照验收](references/best-practices/visual-acceptance.md)                                                               | 验证桌面、窄屏的视觉效果与必要交互。                       |
| 接入参考   | [核心能力](references/usage/capabilities.md)                                                                                 | 确认 DSL、Builder、Connector 与 UI 的职责。                |
| 接入参考   | [实践技巧](references/usage/tips.md)                                                                                         | 配置查询、字段映射、资源关联与保存恢复。                   |
| 接入参考   | [HTML 接入](references/usage/how-use-vbi-in-html.md)                                                                         | 使用 HTML / ESM 时查阅加载、渲染与模板关键片段。           |
| API 文档   | [VBI API 索引](references/api/vbi/index.md)                                                                                  | 核对实例、Chart、Dashboard、Insight Builder 的接口与类型。 |
| API 文档   | [VSeed API 索引](references/api/vseed/index.md)                                                                              | 核对 Spec 构建、图表类型、主题、注册与数据工具。           |

## Step1：选定模板与指标

- 明确核心分析问题、数据来源、交付环境及验收范围；阅读[核心能力](references/usage/capabilities.md)，查看[参考图 1](examples/dashboard/demo1.png)、[参考图 2](examples/dashboard/demo2.png)、[参考图 3](examples/dashboard/demo3.png)，从精简模板起步。
- 按[实践技巧](references/usage/tips.md)确认字段、粒度、聚合、去重、单位与比较周期，用已知数据核对口径；按[洞察最佳实践](references/best-practices/insight.md)选择核心与衍生指标，明确公式和分母有效性，从同一范围的汇总结果计算。

产出：模板起点、指标口径与预期数值。

## Step2：适配业务与视觉

- 将分析问题映射到核心发现、主分析区、辅助指标卡和明细。按[布局](references/best-practices/layout.md)、[指标卡](references/best-practices/metric-card.md)与[趋势图](references/best-practices/trend.md)最佳实践突出主次、合并重复信息；图表适配实际数据。核心发现用一句结论连接核心与衍生指标，并提供范围、基准和证据。
- 沿用模板的外壳、主辅比例、字号和留白，按[配色最佳实践](references/best-practices/design.md)统一页面与图表颜色；默认柔和浅蓝（`#A8C7E8`），布局与配色切换仅在用户要求时添加。
- 按[Filter 最佳实践](references/best-practices/filter.md)明确筛选与局部交互的作用范围；全局筛选集中在标题最右侧，优先一行平铺，省略重复标签并保留无障碍名称，避免未经设计的原生 `select` / `input`。确定桌面与窄屏布局。

产出：业务模块、页面骨架与联动范围。

## Step3：接入数据与交互

- 替换模板的数据接入与查询，确保 Connector 执行筛选、分组和聚合；沿 Chart Builder → `buildVSeed()` → VSeed Builder → VChart / VTable 渲染，HTML 指标复用查询结果并保留字段 ID。使用 HTML 时阅读[接入指南](references/usage/how-use-vbi-in-html.md)，按需查阅 [VBI API](references/api/vbi/index.md) 与 [VSeed API](references/api/vseed/index.md)。
- 通过 Builder 维护自身筛选条件，保留其他条件；查询后复用实例调用 `updateSpec()`，同步指标动画与区间洞察。卡内联动复用缓存，防止旧结果覆盖；处理加载、空数据、错误、尺寸变化与资源释放。
- Dashboard、Chart 与 Insight 使用同一 VBI 实例及资源 ID，组件提供 `layouts.lg`；可保存状态归所属 DSL，由 Builder 操作，UI 管理渲染与临时状态。需要恢复时保存 Dashboard 与引用资源，在新实例先注册资源再恢复，并明确外部数据和衍生公式的恢复方式。

产出：数据与交互完整、按需支持保存恢复的页面。

## Step4：验收与交付

- 核对汇总、筛选、比较及衍生指标，覆盖相关的空值、零分母和负值；在浏览器实际检查模板基线、筛选动画、卡内联动、连续操作、减少动态效果模式与控制台。承诺保存的配置须做 JSON 往返及新实例恢复，领域能力须可通过 DSL 与 Builder 独立使用。
- 按[截图对照验收](references/best-practices/visual-acceptance.md)，在图表就绪后以相同视口对照模板的桌面与窄屏截图，修正骨架、密度、控件和图表差异。
- 交付文件、运行入口、必要数据与接入说明，附最终截图、验证结果及限制；明确未验证范围，与 Step1 的交付范围一致。

产出：可运行、可检查的 Dashboard 与验收证据。
