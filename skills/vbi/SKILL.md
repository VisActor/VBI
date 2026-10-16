---
name: vbi
description: 创建和修改交互式 Dashboard 看板，适用于经营指标分析和地理分析，支持数据接入、图表组合、筛选联动及可运行的 HTML 页面。
---

# Dashboard 看板

根据用户需求选择看板类型。

## 场景

用户明确指定类型时，按用户要求选择。

| 用户需求                                         | 子技能                                          |
| ------------------------------------------------ | ----------------------------------------------- |
| 存在地图数据需要地图 或 存在地图数据进行复杂分析 | [地图看板](references/map-dashboard/SKILL.md)   |
| 其余看板需求                                     | [轻量看板](references/light-dashboard/SKILL.md) |

修改已有页面时，优先复用已有内容。

## 通用能力

两种看板共用 visual-query 的查询、渲染和联动流程。

| 任务                                    | 子技能                                               |
| --------------------------------------- | ---------------------------------------------------- |
| 指标深入分析、渐进展开与明细核对        | [指标深入分析](references/metric-analysis/SKILL.md)  |
| 查询、渲染、页面组合、筛选联动与刷新    | [visual-query](references/visual-query/SKILL.md)     |
| 选择数据内嵌或服务端接入                | [server-runtime](references/server-runtime/SKILL.md) |
| 分析配置、DSL / Builder、资源与保存恢复 | [vbi](references/vbi/SKILL.md)                       |
| 数据集、查询、聚合筛选与 SQL 编译       | [vquery](references/vquery/SKILL.md)                 |
| 图表配置、主题、编码与 Spec 构建        | [vseed](references/vseed/SKILL.md)                   |

单图、指标卡或表格直接读取 visual-query；为指标提供主动探索入口时补读 metric-analysis，保持主页简约，按用户动线展开分析；独立 API 任务直接读取对应能力。

仅加载当前任务需要的资料，细化路由见 [activation-map.yaml](references/activation-map.yaml)。
