---
name: vbi
description: 创建和修改交互式 Dashboard 看板，适用于经营概览、指标监测、趋势分析和地图大屏，支持数据接入、图表组合、筛选联动及可运行的 HTML 页面。
---

# Dashboard 看板

按场景选择实践，按职责补读通用能力。

## 场景

| 场景                               | 子技能                                          |
| ---------------------------------- | ----------------------------------------------- |
| 经营概览、指标监测、趋势与专题分析 | [轻量看板](references/light-dashboard/SKILL.md) |
| 地图主屏、地理下钻与实时监测       | [地图看板](references/map-dashboard/SKILL.md)   |

用户指定优先；修改已有页面沿用其场景，未指定类型的新建看板默认选轻量看板。两种场景均读取 visual-query，数据来源不决定场景。

## 通用能力

| 任务                                    | 子技能                                               |
| --------------------------------------- | ---------------------------------------------------- |
| 查询、渲染、页面组合、筛选联动与刷新    | [visual-query](references/visual-query/SKILL.md)     |
| 分析配置、DSL / Builder、资源与保存恢复 | [vbi](references/vbi/SKILL.md)                       |
| 数据集、查询、聚合筛选与 SQL 编译       | [vquery](references/vquery/SKILL.md)                 |
| 图表配置、主题、编码与 Spec 构建        | [vseed](references/vseed/SKILL.md)                   |
| 服务端连接数据库、本地文件与 HTTP 接口  | [server-runtime](references/server-runtime/SKILL.md) |

单图、指标卡或表格直接读取 visual-query；独立 API 任务直接读取对应能力。仅加载当前任务需要的资料，细化路由见 [activation-map.yaml](references/activation-map.yaml)。
