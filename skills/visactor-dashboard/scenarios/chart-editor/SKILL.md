---
name: chart-editor
description: 创建轻巧易用的图表编辑器，拖拽字段、切换图型，即时查看数据。适用于自助制图和数据探索。Powered by VisActor。
---

# 图表编辑器

创建用于字段配置与实时数据探索的自助制图工作台。分析状态由 VBI DSL / Builder 管理，界面负责搜索、展开、弹层和渲染实例。

新建默认复制完整模板，先运行，再做最小业务适配。继承适用的排版、图表样式、筛选联动、动效和生命周期。用户指定风格或宿主约束优先；移除或重写能力时，记录原因及替代行为，并验证其余体验没有退化。

## 运行与适配

从[完整模板](templates/template.html)起步，先运行默认图、拖拽、筛选和撤销恢复，再按[适配指南](references/template-adaptation.md)修改 `page-config`、`source-data` 和样式。交付单个离线可运行的 HTML，包含编辑器、数据、CSS 与所需运行时；版本及加载机制见[内嵌运行时](references/runtime-loading.md)。

工作台由字段区、四个配置槽、工具栏、绘图区和设置面板组成，布局与主题见[视觉规范](references/design.md)。支持字段搜索、跨槽拖拽与重排、聚合、编码、排序、格式、WHERE / HAVING、31 种图型、limit、撤销重做、中英双语与主题。工具栏提供查询结果的 CSV / Excel 下载、数据复制及绘图区 PNG 下载 / 复制，完整能力见[功能矩阵](references/standard-parity.md)。

## 查询、渲染与状态

- 数据源使用完整内嵌数据或宿主连接器，接入规则见 [server-runtime](../../references/server-runtime/guide.md)。
- 查询与呈现按 [visual-query](../../references/visual-query/guide.md)，业务编辑调用公开 Builder；WHERE 在聚合前执行，HAVING 在聚合后执行。
- VChart 使用同一实例 `updateSpec` 并启用 morph；ListTable / PivotTable / PivotChart 使用各自的渲染与图例事件。渲染器切换、动画边界和资源清理见[渲染适配](references/standard-reference.md)与 [Morph 指南](references/morph-analysis.md)。
- 图表 DSL 保存字段、编码、聚合、条件、limit、语言与主题；`presentation` 保存标题、品牌色和外观。`serialize()` 导出状态包，`applyDSL(dsl)` 验证并应用图表 DSL，失败保留有效配置。数据源和连接器由宿主提供。

业务结果解释按需读取[数据分析方法](../../references/data-analysis/guide.md)，主动探索入口按[深度分析交互](../../references/deep-analysis/interaction.md)设计。

## 验收

按[功能矩阵](references/standard-parity.md)与[验收要点](references/acceptance.md)验证适用用例，覆盖真实操作、独立数据核对、动画中间态、桌面与窄屏及单文件离线运行。已有页面修改覆盖受影响路径，交付说明实际验证结果。

## 公共 API

[VBI](../../references/api/vbi/guide.md) · [VQuery](../../references/api/vquery/guide.md) · [VSeed](../../references/api/vseed/guide.md)
