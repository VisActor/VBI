---
name: light-dashboard
description: 创建小而美的交互式 Dashboard，以指标、趋势、排行和构成为主。适用于经营概览、指标监测和专题分析。
---

# 轻量 Dashboard

适合经营概览、指标监测、趋势和专题分析。

新建页面按以下 4 步执行。修改已有页面时，只处理相关步骤。

## Step1：确定指标、布局与配色

1. 明确页面要回答的业务问题。选出北极星指标和衍生指标，确认计算口径、比较基准和预期数值。
2. 根据数据选择图表和布局。有时间字段才画时间趋势；重点多时先展示指标卡，问题多时分段展示。
3. 从[模板列表](references/templates.md)选参考。开始制作前，打开模板的 HTML 和对应截图。
4. 根据业务分别选择布局、背景与主题色，说明选择理由。用户指定或已有页面的风格优先。
5. 模板可以重排、组合或重新设计。图表、文字和交互至少达到参考模板的质量。
6. 为有进一步分析价值的指标规划轻量入口，按 [metric-analysis](../metric-analysis/SKILL.md)选择默认问题与交互动线；24 份模板共用分析规范，各指标按真实数据选择路径。

## Step2：搭建页面

1. 先展示核心发现，再安排主图、指标卡和明细。核心发现用一段总结说明结论，配上北极星指标和衍生指标。主页保持简约，深入分析在用户主动进入后逐步展开，不预铺详情图表、控件和长段说明。
2. 同层级指标使用统一字号，具体尺寸见[数值字号规范](references/metric-card.md#数值字号规范)。长数值通过调整单位和空间完整展示。
3. 筛选器放在标题右侧，按[筛选器标准实践](references/filter.md)选择胶囊平铺或定制 Select：少量短选项平铺，选项多或较长时收进下拉；统一选中态、焦点、弹层与响应式行为。布局和配色切换控件按用户要求添加。
4. 同时适配 PC 和移动端。小卡片添加不超过 2° 的倾斜效果，大图和核心发现保持平面。
5. 明细默认展开，筛选后保留展开状态。
6. 首次入场按[布局动效规范](references/layout.md#卡片按顺序延时入场)组织：数据与图表就绪后，首张等待 480ms、相邻模块间隔 560ms、单次动画 1600ms。24 份模板采用同一节奏；长页面按可见行或章节分批，不把延迟累加到整页末尾。

## Step3：接入数据与交互

1. 按 [visual-query](../visual-query/SKILL.md)接入数据和图表。模板接入方式见[模板接入](references/template-integration.md)。
2. 优先复用已有数据接入，其余情况按[数据接入判断](../server-runtime/SKILL.md#数据接入判断)选择。
3. 筛选后同步更新图表、指标、明细和核心发现。复用图表实例，用 `updateSpec()` 更新，图表和数值都要有过渡动画。
4. hover 主图时更新关联指标，hover 小图时只更新所属卡片。移出后恢复汇总值，核心发现仍展示当前筛选范围的结论。
5. 用 Dashboard DSL 保存布局和资源引用。状态恢复与页面销毁按[组合指南](../visual-query/references/composition.md)处理。
6. 用户开启减少动态效果时，直接显示最终状态。
7. 指标分析入口继承已确认的筛选范围，hover 不隐式成为详情条件；按 [metric-analysis](../metric-analysis/SKILL.md)连接分析、VTable 与返回动线，在宿主中保持局部联动。

## Step4：验收与交付

首次生成 Dashboard 产物时，按[验收标准](references/acceptance.md)检查。

## 参考资料

| 要做什么              | 看哪里                                                                                         |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| 选择模板              | [模板列表](references/templates.md) · [可视总览](templates/index.html)                         |
| 调整布局和动效        | [设计与布局](references/layout.md)                                                             |
| 调整配色和背景        | [配色与背景](references/design.md)                                                             |
| 编写核心发现          | [核心发现与指标洞察](references/insight.md)                                                    |
| 制作指标卡            | [指标卡](references/metric-card.md)                                                            |
| 设计指标深入分析      | [分析内容与用户动线](../metric-analysis/SKILL.md)                                              |
| 制作趋势图            | [趋势图](references/trend.md)                                                                  |
| 制作平铺筛选与 Select | [筛选器标准实践](references/filter.md) · [Select 实现](references/filter-select.md)            |
| 查看模板实现          | [基础模板](templates/template-business-overview.html) · [完整示例](templates/example.html)     |
| 在 HTML 中接入图表    | [HTML 接入](../visual-query/references/html-integration.md)                                    |
| 查 API                | [分析配置](../vbi/SKILL.md) · [数据查询](../vquery/SKILL.md) · [可视化配置](../vseed/SKILL.md) |
