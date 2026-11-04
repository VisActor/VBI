---
name: visactor-dashboard
description: 创建和修改交互式 Dashboard、分析页面与图表编辑器，支持数据分析、按需深入探索、二维 / Three.js 三维地图及 VBI、VQuery、VSeed 集成。
---

# VisActor Dashboard

先选择场景，再按任务读取通用模块。已有页面、数据接入和 Builder 优先复用，只处理当前需求涉及部分；用户要求与宿主约束优先。

## 场景

| 用户需求                                   | 场景指南                                       |
| ------------------------------------------ | ---------------------------------------------- |
| 经营概览、指标监测、趋势或专题分析         | [轻量看板](scenarios/light-dashboard/SKILL.md) |
| 地图、地理分布、位置关系或地域下钻         | [二维地图](scenarios/map2d-dashboard/SKILL.md) |
| 字段配置、聚合筛选与实时预览               | [图表编辑器](scenarios/chart-editor/SKILL.md)  |
| 明确要求 Three.js 三维地图、地球或空间态势 | [三维地图](scenarios/map3d-dashboard/SKILL.md) |

用户指定类型时按其要求选择；其余看板默认轻量看板。单图、指标卡、普通表格和独立 API 任务可直接使用通用模块，沿用宿主的布局与视觉，不必创建 Dashboard。

## 通用模块

这里按职责列出资料，选择本次涉及的模块即可。指南维护工作流与约束，专题文档维护具体方法与接入细节，API 文档维护公开签名。可保存、重算或跨宿主复用的状态归所属 DSL 与 Builder；适配器负责接入转换，UI 负责临时状态和渲染。

### 数据接入

优先复用已有接入。数据独立、规模小、无需实时刷新时，按 [HTML 数据内置](references/visual-query-html-integration.md#静态独立-html-的数据内置)直接内嵌。需要实时刷新、服务端数据库查询、运行时 HTTP 请求或数据不适合内嵌时，使用同源 server-runtime；其余情况按数据来源与运行环境判断。

- [安装、启动与生命周期](server-runtime/doc-guide.md)：选择来源，配置运行环境，启动和停止服务。
- [MySQL](server-runtime/doc-mysql.md)：连接、只读事务与参数化 SQL。
- [文件、HTTP 与自定义适配器](server-runtime/doc-data-sources.md)：来源配置、快照、读取限制与分页边界。
- [页面与服务协议](server-runtime/doc-protocol.md)：Connector、令牌、请求响应及 JSON 注入。

### 查询与呈现

[查询工作流](references/visual-query-guide.md)串联 Chart Builder → `buildVSeed()` → Connector / VQuery → VSeed Builder → VChart / VTable 或 HTML 视图。已有接入只补读当前任务需要的部分。

| 当前任务                                                      | 参考                                                             |
| ------------------------------------------------------------- | ---------------------------------------------------------------- |
| 数据接入、统一查询、字段映射、结果复用、Spec 与实例更新       | [查询与渲染](references/visual-query-query-and-render.md)        |
| 图型切换、Morph、reuse、过渡异常与中间帧验收                  | [Morph 与更新策略](references/visual-query-morph-transitions.md) |
| 页面资源关系、筛选作用域、联动、自动刷新、取消、保存恢复      | [组合与联动](references/visual-query-composition.md)             |
| 单文件 HTML、浏览器依赖、内置数据、图表 / 普通表 / 透视表教程 | [HTML 接入](references/visual-query-html-integration.md)         |
| 主页与分析明细的表格 token、Canvas 主题、选中态与完整结果滚动 | [表格主题与适配器](references/visual-query-table-theme.md)       |

### 数据分析

先按[分析契约与验收](references/data-analysis-guide.md)明确问题、粒度、比较口径和证据，再按问题选方法。普通趋势与两期比较不必套用专门方法；九种方法不是页面必须凑齐的模块。

| 问题                                 | 方法与数据条件                                                                                      |
| ------------------------------------ | --------------------------------------------------------------------------------------------------- |
| 哪些维度组合存在差异，总计代表什么？ | [多维透视](references/data-analysis-pivot-explorer.md)：事实键、行列维度、合法聚合及可加性          |
| 哪一步流失，转化是否已成熟？         | [有序转化](references/data-analysis-conversion-funnel.md)：真实阶段顺序、实体键、转化窗口           |
| 哪些批次持续回来，观察期是否充分？   | [同期群留存](references/data-analysis-cohort-retention.md)：入群规则、后续事件、队列分母与成熟期    |
| 方案与对照差异有多大，证据是否充分？ | [实验比较](references/data-analysis-experiment-comparison.md)：分配单位、组内计数、指标与检验假设   |
| 距目标多远，缺口被哪些超额抵消？     | [目标完成度](references/data-analysis-target-attainment.md)：真实目标、共同粒度、期间与版本         |
| 增减来自哪些部分？                   | [变化贡献](references/data-analysis-contribution-analysis.md)：可比两期、互斥可加分组               |
| 均值是否掩盖内部差异或少量尾部？     | [分布分析](references/data-analysis-distribution-analysis.md)：记录级数值、有效样本、分位与异常规则 |
| 用户实际经过哪些节点，在哪里退出？   | [路径分析](references/data-analysis-path-analysis.md)：有序事件、会话与节点身份                     |
| 活跃规模如何由新增、回流和流失组成？ | [生命周期](references/data-analysis-lifecycle-analysis.md)：成员身份、活动定义、时间窗口及观测边界  |

地域、位置或空间尺度影响判断时补读[空间分析](references/data-analysis-map.md)。分析可独立于 UI；数据条件不足时说明边界，不生成无依据的趋势、目标、下钻或因果解释。

### 深入探索

用户要求围绕指标继续分析，或指标有值得核查的问题时，读取[入口、上下文与返回](references/deep-analysis-interaction.md)。组织趋势、比较、结构、下钻和明细，每次深入增加证据。普通悬停、样式调整和单纯表格展示沿用现有交互，无需加载此模块。

### VBI

[工作流与状态边界](api/vbi-guide.md)说明实例、资源、分析配置及保存恢复；[完整 API 索引](api/vbi-index.md)列出公开导出。

| 任务                             | 文档                                              |
| -------------------------------- | ------------------------------------------------- |
| 实例、Connector 与资源管理       | [vbi](api/vbi-vbi.md)                             |
| 指标、维度、筛选、聚合与图表配置 | [chart-builder](api/vbi-chart-builder.md)         |
| 组件、响应式布局、主题与撤销     | [dashboard-builder](api/vbi-dashboard-builder.md) |
| 洞察内容与状态操作               | [insight-builder](api/vbi-insight-builder.md)     |
| DSL 与公共类型                   | [types](api/vbi-types.md)                         |

### VQuery

[查询工作流](api/vquery-guide.md)说明内存数据集与外部数据库的执行方式、查询口径和生命周期；[完整 API 索引](api/vquery-index.md)区分 Node、浏览器与默认入口。

| 任务                                | 文档                                       |
| ----------------------------------- | ------------------------------------------ |
| VQuery 初始化、数据集管理与继承成员 | [runtime](api/vquery-runtime.md)           |
| Dataset 与数据源 Builder            | [dataset](api/vquery-dataset.md)           |
| SQL 编译、方言和参数化结果          | [sql-compiler](api/vquery-sql-compiler.md) |
| 存储与查询适配器                    | [adapters](api/vquery-adapters.md)         |
| DSL、schema 与查询类型              | [types](api/vquery-types.md)               |
| URL 与数据来源工具                  | [utils](api/vquery-utils.md)               |

### VSeed

[构建工作流](api/vseed-guide.md)说明注册、DSL → Spec、异步准备、中间态及扩展；[完整 API 索引](api/vseed-index.md)列出公开导出。

| 任务                           | 文档                                                                                                                    |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Builder、构建与准备流程        | [builder](api/vseed-builder.md)                                                                                         |
| 图表类型、主题及 Pipeline 注册 | [register](api/vseed-register.md)                                                                                       |
| 图表 / 表格 DSL                | [chart-types](api/vseed-chart-types.md)                                                                                 |
| 公共配置、编码与类型           | [types](api/vseed-types.md)                                                                                             |
| 构建管线、数据重塑、主题与语言 | [pipeline](api/vseed-pipeline.md) · [data](api/vseed-data.md) · [theme](api/vseed-theme.md) · [i18n](api/vseed-i18n.md) |

### 交付约定

页面标题、控件、加载提示与交付说明使用业务语言，默认不添加技术品牌、库名、Logo 或 “Powered by”；占位品牌替换为用户业务名称，保留数据来源、统计口径和必需的第三方署名。技术名称用于实现、API 查阅和必要的安装启动说明；用户询问技术栈或集成要求时如实说明。

按所选场景和实际使用的模块验收，核对真实查询结果与用户操作；查询链路的通用检查见[验证与交付](references/visual-query-guide.md#验证与交付)。交付必要文件、启动与停止方式，以及本次验证结果和限制。
