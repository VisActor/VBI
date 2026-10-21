---
name: visactor-dashboard
description: 创建和修改交互式 Dashboard 看板与图表编辑器，涵盖经营指标、二维 / Three.js 三维地图、数据接入、图表配置、筛选联动与状态恢复，也支持 VBI、VQuery 和 VSeed 的独立能力集成。
---

# VisActor Dashboard

根据用户需求选择场景。修改已有页面或集成时，优先复用已有数据接入、Builder 与宿主结构。

## 场景

| 用户需求                           | 场景指南                                                     |
| ---------------------------------- | ------------------------------------------------------------ |
| 地图、地理分布、位置关系或地域下钻 | [地图看板](references/visactor-map2d-dashboard/SKILL.md)     |
| 经营概览、指标监测、趋势和专题分析 | [轻量看板](references/visactor-light-dashboard/SKILL.md)     |
| 字段配置、聚合筛选与可视化图表编辑 | [图表编辑器](references/visactor-chart-editor/SKILL.md)      |
| Three.js 三维地图、地球与空间态势  | [三维地图看板](references/visactor-map3d-dashboard/SKILL.md) |

用户明确指定类型时按其要求选择；图表编辑使用编辑器，明确的三维需求使用三维地图，普通地图使用二维地图，其余看板使用轻量看板。

## 通用能力

四个场景技能直接依赖 visual-query 的查询、渲染和联动能力；布局与视觉按对应场景指南处理。场景之间不相互引用，共享能力也不反向依赖场景。

| 任务                                    | 子技能                                               |
| --------------------------------------- | ---------------------------------------------------- |
| 指标深入分析、渐进展开与明细核对        | [指标深入分析](references/metric-analysis/SKILL.md)  |
| 查询、渲染、页面组合、筛选联动与刷新    | [visual-query](references/visual-query/SKILL.md)     |
| 选择数据内嵌或服务端接入                | [server-runtime](references/server-runtime/SKILL.md) |
| 分析配置、DSL / Builder、资源与保存恢复 | [vbi](api/vbi/SKILL.md)                              |
| 数据集、查询、聚合筛选与 SQL 编译       | [vquery](api/vquery/SKILL.md)                        |
| 图表配置、主题、编码与 Spec 构建        | [vseed](api/vseed/SKILL.md)                          |

单图、指标卡或表格直接读取 visual-query；为指标提供主动探索入口时补读 metric-analysis，保持主页简约，按用户动线展开分析；独立 API 任务直接读取对应能力。

仅加载当前任务需要的资料，细化路由见 [activation-map.yaml](references/activation-map.yaml)。
