---
name: visactor-light-dashboard
description: 创建小而美的交互式 Dashboard，以指标、趋势、排行和构成为主。适用于经营概览、指标监测和专题分析。Powered by VisActor。
---

# 轻量 Dashboard

适合经营概览、指标监测、趋势和专题分析。

新建默认复制完整模板，先运行，再做最小业务适配。继承适用的排版、图表样式、筛选联动、动效和生命周期。用户指定风格或宿主约束优先；移除或重写能力时，记录原因及替代行为，并验证其余体验没有退化。

按以下 4 步执行。修改已有页面时沿用宿主，只处理和验收受影响的部分。

仅按当前任务读取所需参考，模板、公共查询与 API 资料见下方入口。

## Step1：确定指标、布局与配色

1. 明确页面要回答的业务问题，选择主指标与必要的辅助指标，确认计算口径、比较基准和预期数值。
2. 根据数据选择图表和布局。有时间字段才画时间趋势；重点多时先展示指标卡，问题多时分段展示。
3. 从[模板列表](references/templates.md)选择最接近任务的模板，查看 HTML 和截图，按[模板接入](references/template-integration.md)复制完整 HTML，先运行并核对默认态、筛选、悬停和分析返回（如有），作为适配后的对照基线。
4. 根据业务分别选择布局、背景与主题色，说明选择理由。用户指定或已有页面的风格优先。
5. 先替换数据与业务配置，再按业务需要局部调整布局与图形。每张卡明确问题、主读数、图形编码和悬停范围，遵守[指标语义](references/metric-card.md#指标与图形的语义)；一次调整一个模块，并核对已有交互仍可用。
6. 为有进一步分析价值的指标规划轻量入口，按 [metric-analysis](../metric-analysis/SKILL.md)选择默认问题与交互动线；24 份模板共用分析规范，各指标按真实数据选择路径。

## Step2：搭建页面

1. 先展示[核心发现](references/insight.md)：一个主要判断和必要证据，不逐项复述全部指标。主页保留概览，深入分析与完整口径按需展开，制作与验收日志不进入业务正文。
2. 沿用整套[排版与尺寸 token](references/layout.md#排版与尺寸-token)，同层级指标字号一致；长数值通过调整单位和空间完整展示。图表统一应用[背景、轴线与标签样式](references/design.md#图表配色与页面同步)。
3. 筛选器放在标题右侧，按[筛选器标准实践](references/filter.md)选择胶囊平铺或定制 Select：少量短选项平铺，选项多或较长时收进下拉；统一选中态、焦点、弹层与响应式行为。布局和配色切换控件按用户要求添加。
4. 同时适配 PC 和移动端。小卡片添加不超过 2° 的倾斜效果，大图和核心发现保持平面。
5. 明细默认展开，筛选后保留展开状态。主页与分析明细复用[统一表格 token 与适配器](../visual-query/references/table-theme.md)，将完整查询结果交给 VTable 虚拟滚动，不加手工分页器；底部明细容器比上方指标卡更透明。
6. 复用模板的[玻璃阅读面](references/design.md#玻璃阅读面)、首次入场与清理机制；主页时序见[卡片入场](references/layout.md#卡片按顺序延时入场)，分析弹窗整体展开与内容逐项出现见[弹窗入场](references/layout.md#弹窗与内容分批入场)。

## Step3：接入数据与交互

1. 按 [visual-query](../visual-query/SKILL.md)接入数据和图表。模板接入方式见[模板接入](references/template-integration.md)。
2. 优先复用已有数据接入，其余情况按[数据接入判断](../server-runtime/SKILL.md#数据接入判断)选择。
3. 筛选后同步更新图表、指标、明细和核心发现。复用图表实例，用 `updateSpec()` 更新，图表和数值都要有过渡动画。
4. hover 主图时更新已声明的关联指标，hover 小图时只更新所属卡片；标题、数值、单位与范围保持一致。移出后恢复汇总，核心发现仍展示当前筛选范围的结论。
5. 用 Dashboard DSL 保存布局和资源引用。状态恢复与页面销毁按[组合指南](../visual-query/references/composition.md)处理。
6. 用户开启减少动态效果时，直接显示最终状态。
7. 指标分析入口继承已确认的筛选范围，hover 不隐式成为详情条件；按 [metric-analysis](../metric-analysis/SKILL.md)连接分析、VTable 与返回动线，在宿主中保持局部联动。

## Step4：验收与交付

按[验收标准](references/acceptance.md)检查语义、视觉和运行结果。模板与产物在相同视口、缩放和动效结束状态下对照；自动检查通过不能代替视觉验收。修改已有页面时检查受影响部分。

## 参考资料

| 要做什么               | 看哪里                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 选择模板               | [模板列表](references/templates.md) · [可视总览](templates/index.html)                                              |
| 调整布局和动效         | [设计与布局](references/layout.md)                                                                                  |
| 调整配色和背景         | [配色与背景](references/design.md)                                                                                  |
| 编写核心发现           | [核心发现与指标洞察](references/insight.md)                                                                         |
| 制作指标卡             | [指标卡](references/metric-card.md)                                                                                 |
| 设计指标深入分析       | [分析内容与用户动线](../metric-analysis/SKILL.md)                                                                   |
| 制作趋势图             | [趋势图](references/trend.md)                                                                                       |
| 制作平铺筛选与 Select  | [筛选器标准实践](references/filter.md) · [Select 实现](references/filter-select.md)                                 |
| 查看模板实现与维护入口 | [模板接入](references/template-integration.md) · [经营概览模板](templates/template-business-overview.html)          |
| 调整表格主题与选中态   | [表格 token 与适配器](../visual-query/references/table-theme.md)                                                    |
| 在 HTML 中接入图表     | [HTML 接入](../visual-query/references/html-integration.md)                                                         |
| 查 API                 | [分析配置](../../api/vbi/SKILL.md) · [数据查询](../../api/vquery/SKILL.md) · [可视化配置](../../api/vseed/SKILL.md) |
