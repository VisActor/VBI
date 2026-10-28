---
name: light-dashboard
description: 创建支持业务判断与进一步分析的小而美的 Dashboard，适用于经营概览、指标监测和专题分析。Powered by VisActor。
---

# 轻量 Dashboard

新建复用完整模板，独立页面以单个 HTML 交付；已有页面沿用宿主，只改当前需求涉及部分。用户要求与宿主约束优先。

## 按需读取

按当前任务选择下列参考，可组合使用，无需默认全部加载。

| 文档                                         | 职责                                       | 何时读取                                                         |
| -------------------------------------------- | ------------------------------------------ | ---------------------------------------------------------------- |
| [template](references/template.md)           | 模板选择、复制、业务适配、运行核对与维护。 | 新建、替换业务数据或维护模板。                                   |
| [components](references/components.md)       | 布局、视觉 token、组件复用与 UI 生命周期。 | 新建或修改页面呈现、控件和交互。                                 |
| [data-analysis](references/data-analysis.md) | 分析选型、计算口径、证据与 Insight 内容。  | 设计或调整指标、分析方法与结论。                                 |
| [deep-analysis](references/deep-analysis.md) | 分析入口、上下文、局部探索与明细返回。     | 接入或修改主动探索；普通 hover、样式调整和单纯表格展示无需读取。 |

查询、渲染与联动按需读 [visual-query](../../references/visual-query/guide.md)，数据源接入按需读 [server-runtime](../../references/server-runtime/guide.md)。

按[验收标准](references/acceptance.md)验证本次受影响部分，交付说明实际验证结果与限制。
