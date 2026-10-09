---
name: vbi
description: 使用 VBI 的 DSL 和 Builder 构建图表、仪表盘与洞察。适用于 VBI 数据接入、分析配置、渲染集成及配置保存与恢复。
---

# VBI Dashboard 构建指南

## 核心方法论：基于 Dashboard 模板构建

模板仅作为实现与视觉参考。新建 Dashboard 先根据数据结构、分析任务和业务语境决定布局与主题色，再从下方索引选取适用片段；可重排、组合或重新设计，不默认复制某个模板，也不限于三种布局和配色。布局与颜色独立选择，例如趋势主导布局可以使用暖色，指标先行布局也可以使用蓝色；变化应有业务与阅读依据，不为多样性随机换色。已有宿主或用户指定风格时优先适配其要求。[基础模板](examples/dashboard/template.html)用于查阅最小接入机制，[完整轻量示例](examples/dashboard/lightweight-dashboard.html)用于查阅扩展实现；单图和局部修改只执行相关步骤。

模板也是验收参照：保留真实图表、平滑趋势、`updateSpec()` 与指标文本动画、≤2° 小卡倾斜、默认展开明细和卡内联动；减少动态效果模式立即展示最终状态。详细约束统一遵循[轻量看板基线](references/best-practices/layout.md#轻量看板的功能与视觉基线)，不能因精简删去必要能力。

按以下 4 个阶段推进，已有结论直接沿用，局部修改只处理相关内容。按资料索引和阶段内链接查阅当前任务需要的内容。

## 资料索引

| 类别       | 资料                                                                                                                         | 用途与查阅时机                                                |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 模板与示例 | [模板 1：趋势主导](examples/dashboard/template1.html)                                                                        | 蓝色主辅布局；内嵌预期寿命数据，适合真实时间变化。            |
| 模板与示例 | [模板 2：指标先行](examples/dashboard/template2.html)                                                                        | 紫色指标行 + 主比较区；内嵌心衰记录，适合样本概览与分组比较。 |
| 模板与示例 | [模板 3：分段叙事](examples/dashboard/template3.html)                                                                        | 暖橙色分段布局；内嵌餐食与运动数据，适合分层解释。            |
| 模板与示例 | [基础 Dashboard 模板](examples/dashboard/template.html)                                                                      | 查阅必要交互与最小接入机制，按当前任务调整结构。              |
| 模板与示例 | [完整轻量 Dashboard](examples/dashboard/lightweight-dashboard.html)                                                          | 扩展布局、配色与交互时查阅。                                  |
| 模板与示例 | [参考图 1](examples/dashboard/demo1.png)、[参考图 2](examples/dashboard/demo2.png)、[参考图 3](examples/dashboard/demo3.png) | 选择视觉风格，比较主辅比例、信息层级与密度。                  |
| 模板与示例 | [单图示例](examples/charts/polished-chart.html)、[效果图](examples/charts/polished-chart.png)                                | 构建独立图表时参考。                                          |
| 模板与示例 | [大屏示例](examples/screen/large-screen.html)、[效果图](examples/screen/large-screen.png)                                    | 交付大屏时参考。                                              |
| 最佳实践   | [设计与布局](references/best-practices/layout.md)                                                                            | 适配模板骨架、控制密度、配置布局与卡片动效。                  |
| 最佳实践   | [配色与背景](references/best-practices/design.md)                                                                            | 确定页面与图表的颜色层级。                                    |
| 最佳实践   | [指标卡](references/best-practices/metric-card.md)                                                                           | 实现辅助图形、指标动画与卡内联动。                            |
| 最佳实践   | [趋势图](references/best-practices/trend.md)                                                                                 | 实现平滑趋势、渐变面积与图内交互。                            |
| 最佳实践   | [Filter 筛选器](references/best-practices/filter.md)                                                                         | 设计平铺筛选、维护 Builder 条件并联动更新。                   |
| 最佳实践   | [核心发现与指标洞察](references/best-practices/insight.md)                                                                   | 选择衍生指标，组织计算口径、结论与证据。                      |
| 最佳实践   | [截图对照验收](references/best-practices/visual-acceptance.md)                                                               | 验证桌面、窄屏的视觉效果与必要交互。                          |
| 接入参考   | [核心能力](references/usage/capabilities.md)                                                                                 | 确认 DSL、Builder、Connector 与 UI 的职责。                   |
| 接入参考   | [实践技巧](references/usage/tips.md)                                                                                         | 配置查询、字段映射、资源关联与保存恢复。                      |
| 接入参考   | [HTML 接入](references/usage/how-use-vbi-in-html.md)                                                                         | 使用 HTML / ESM 时查阅加载、渲染与模板关键片段。              |
| API 文档   | [VBI API 索引](references/api/vbi/index.md)                                                                                  | 核对实例、Chart、Dashboard、Insight Builder 的接口与类型。    |
| API 文档   | [VSeed API 索引](references/api/vseed/index.md)                                                                              | 核对 Spec 构建、图表类型、主题、注册与数据工具。              |

## Step1：确定指标、布局与主题色

- 明确核心分析问题、数据来源、交付环境及验收范围；阅读[核心能力](references/usage/capabilities.md)。按[实践技巧](references/usage/tips.md)确认字段、粒度、聚合、去重、单位与比较周期，用已知数据核对口径；按[洞察最佳实践](references/best-practices/insight.md)选择核心与衍生指标，明确公式和分母有效性，从同一范围的汇总结果计算。
- 按阅读任务选择布局：一个主问题与真实时间变化适合主辅布局，多个关键结果需要先概览时适合指标行，多个不同量纲或解释层次适合分段组织。结合三种模板与[参考图 1](examples/dashboard/demo1.png)、[参考图 2](examples/dashboard/demo2.png)、[参考图 3](examples/dashboard/demo3.png)判断主次、面积与阅读顺序；不因模板有趋势图就为无日期数据制造时间轴。
- 按用户要求、品牌与宿主风格优先确定主题色，再结合业务语境、阅读氛围和对比度调整。主题色用于统一页面与图表的视觉强调；类别区分、正负变化和风险状态另按数据语义编码，不让装饰色改变含义。说明本次布局与配色的选择理由，以及参考了模板的哪些部分。

三份模板的选择理由如下，用于参考决策过程，不是数据领域与布局、颜色的固定映射：

| 参考实现                                                    | 数据与分析重点                                                               | 布局选择理由                                                                                                  | 主题色选择理由                                                                                                  |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [模板 1：全球寿命观察](examples/dashboard/template1.html)   | 2000—2015 年真实时间序列，重点看寿命变化，国家覆盖与受教育年限提供补充信息。 | 左侧大趋势承载长期变化，右侧小卡补充变化幅度、覆盖和教育指标，保持一个清晰的视觉中心。                        | 浅蓝 `#9FBFDF` 配中性阅读面，为跨国家的长期数据观察提供平静、轻量的氛围，弱化装饰，让曲线与数字优先。           |
| [模板 2：心衰样本观察](examples/dashboard/template2.html)   | 多个关键指标需要同时概览，再比较年龄组；`time` 是随访天数，没有日历时间轴。  | 顶部并列事件占比、射血分数与肌酐，下方用宽幅条形图比较年龄组样本，形成“先整体、后分组”的阅读顺序。            | 低饱和紫 `#B4A6D5` 在保留克制阅读面的同时区分指标概览风格；紫色仅作统一主题强调，事件状态由标签与真实分组表达。 |
| [模板 3：餐食与运动画像](examples/dashboard/template3.html) | 餐食热量、估算运动时长、营养和样本构成具有不同量纲，需要逐层解释。           | 按餐食 → 活动 → 营养 → 样本分段：热量比较占主区，运动与营养并列，样本构成收尾，避免把不同问题挤入同一排 KPI。 | 暖橙 `#E4B18E` 呼应餐食与日常生活主题，营造温和的阅读氛围；统一各段强调色，减少多指标页面的颜色噪声。           |

产出：指标口径与预期数值、布局与主题色及其理由、参考模板或片段。

## Step2：适配业务与视觉

- 将分析问题映射到核心发现、主分析区、辅助指标卡和明细。按[布局](references/best-practices/layout.md)、[指标卡](references/best-practices/metric-card.md)与[趋势图](references/best-practices/trend.md)最佳实践突出主次、合并重复信息；图表适配实际数据。核心发现用一句结论连接核心与衍生指标，并提供范围、基准和证据。
- 以参考模板的主辅比例、字号和留白为起点，按当前内容量与阅读顺序调整，不强制沿用其卡片数量、排布或配色。按[配色最佳实践](references/best-practices/design.md)落实 Step1 的主题色，统一页面与图表；布局与配色切换控件仅在用户要求时添加。
- 按[Filter 最佳实践](references/best-practices/filter.md)明确筛选与局部交互的作用范围；全局筛选集中在标题最右侧，优先一行平铺，省略重复标签并保留无障碍名称，避免未经设计的原生 `select` / `input`。确定桌面与窄屏布局。

产出：业务模块、页面骨架与联动范围。

## Step3：接入数据与交互

- 替换模板的数据接入与查询，确保 Connector 执行筛选、分组和聚合；沿 Chart Builder → `buildVSeed()` → VSeed Builder → VChart / VTable 渲染，HTML 指标复用查询结果并保留字段 ID。使用 HTML 时阅读[接入指南](references/usage/how-use-vbi-in-html.md)，按需查阅 [VBI API](references/api/vbi/index.md) 与 [VSeed API](references/api/vseed/index.md)。
- 通过 Builder 维护自身筛选条件，保留其他条件；查询后复用实例调用 `updateSpec()`，同步指标动画与区间洞察。卡内联动复用缓存，防止旧结果覆盖；处理加载、空数据、错误、尺寸变化与资源释放。
- Dashboard、Chart 与 Insight 使用同一 VBI 实例及资源 ID，组件提供 `layouts.lg`；可保存状态归所属 DSL，由 Builder 操作，UI 管理渲染与临时状态。需要恢复时保存 Dashboard 与引用资源，在新实例先注册资源再恢复，并明确外部数据和衍生公式的恢复方式。

产出：数据与交互完整、按需支持保存恢复的页面。

## Step4：验收与交付

- 核对汇总、筛选、比较及衍生指标，覆盖相关的空值、零分母和负值；在浏览器实际检查模板基线、筛选动画、卡内联动、连续操作、减少动态效果模式与控制台。承诺保存的配置须做 JSON 往返及新实例恢复，领域能力须可通过 DSL 与 Builder 独立使用。
- 按[截图对照验收](references/best-practices/visual-acceptance.md)，在图表就绪后以相同视口参考模板的桌面与窄屏截图，检查主次、密度、控件和图表。以本次选定的布局与主题色为验收目标，保留有依据的设计差异，不要求复制模板外观。
- 交付文件、运行入口、必要数据与接入说明，附最终截图、验证结果及限制；明确未验证范围，与 Step1 的交付范围一致。

产出：可运行、可检查的 Dashboard 与验收证据。
