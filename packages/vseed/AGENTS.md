# VSeed Agent Context (vseed 子包综述)

本文档面向后续 agent-code 与开发者，提供 VSeed 子包的架构、流程与关键模块的一页式上下文。

## 1. 目标与定位

VSeed 的目标是让 LLM 生成的 `VSeed DSL` 在上下文驱动下稳定落地为可渲染的 `VChart` / `VTable` Spec，从而支持智能生成与编辑图表。它本质是一个 **Spec Builder**：

- 输入：语义化 DSL（`VSeed DSL`）
- 输出：`VChart` 或 `VTable` 可渲染 Spec
- 核心过程：`AdvancedPipeline` + `SpecPipeline`

参考：

- `apps/website/docs/zh-CN/vseed/development/architecture.md`
- `apps/website/docs/zh-CN/vseed/development/designPhilosophy/vseed.md`

## 2. 核心流程（两段式 Pipeline）

### 2.1 Pipeline 总览

VSeed 将构建过程拆成两段，保证“可序列化中间态”和“不可序列化渲染态”分离：

1. **AdvancedPipeline**
   - 输入：`VSeed DSL`
   - 输出：`AdvancedVSeed`（中间态 DSL，可序列化）
   - 负责：数据重塑、默认推断、主题/样式、分析配置、编码建模

2. **SpecPipeline**
   - 输入：`AdvancedVSeed`
   - 输出：`Spec`（VChart / VTable 直接渲染配置，不可序列化）
   - 负责：将中间态细化为具体图表/表格 Spec

入口流程：

- `Builder.build()` → `buildAdvanced()` → `buildSpec()`
- 源码：
  - `packages/vseed/src/builder/builder/build.ts`
  - `packages/vseed/src/builder/builder/buildAdvanced.ts`
  - `packages/vseed/src/builder/builder/buildSpec.ts`

### 2.2 Pipeline 执行机制

- `execPipeline(pipeline, context, initialValue)`：按顺序 reduce 执行，每个 Pipe 返回 Partial 结果。
- Pipe 类型：`(result, context) => result`，无共享状态，依赖 context。
- 源码：`packages/vseed/src/pipeline/utils/pipeline.ts`

## 3. Builder 机制

`Builder` 是核心协调器：

- 管理 `vseed`、`advancedVSeed`、`spec`、`performance`、`locale`
- 支持：`prepare()`（执行 dynamicFilter）、`buildAdvanced()`、`buildSpec()`、`build()`
- 通过注册表选择不同 chartType 对应的 pipelines

源码：

- `packages/vseed/src/builder/builder/builder.ts`

### 3.1 注册与扩展

- **注册所有内置类型与主题**：`registerAll()`
  - `packages/vseed/src/builder/register/all.ts`
- **注册特定图表类型**：`registerLine()` 等
  - `packages/vseed/src/builder/register/chartType/*`
- **扩展 Pipe**：`updateAdvanced()` / `updateSpec()`
  - `packages/vseed/src/builder/register/custom.ts`
- **主题注册**：`registerLightTheme()` / `registerDarkTheme()` / `registerCustomTheme()`
  - `packages/vseed/src/builder/register/theme/*`

## 4. DSL / 类型体系

### 4.1 VSeed DSL

- `VSeed` 是 union 类型，覆盖所有图表/表格 chartType。
- 入口类型：`packages/vseed/src/types/vseed.ts`

### 4.2 AdvancedVSeed

`AdvancedVSeed` 是中间态 DSL，字段更丰富，含 encoding、reshape 信息、主题/样式/分析信息：

- 源码：`packages/vseed/src/types/advancedVSeed.ts`

### 4.3 Spec Pipeline 类型

Spec pipeline 支持多种输出：

- `VChartSpecPipeline`
- `PivotChartSpecPipeline`
- `ListTableSpecPipeline`
- `PivotTableSpecPipeline`

源码：`packages/vseed/src/types/pipeline/spec/spec.ts`

## 5. 数据重塑（Data Reshape）

核心模块：将任意维度/指标组合转换为适配图表的可视化编码结构。

### 5.1 foldMeasures（指标折叠）

- 把多指标折叠为单指标
- 生成 `foldInfo`（含统计信息）
- 保证“一条数据 = 一个图元”的映射

源码：`packages/vseed/src/dataReshape/foldMeasures.ts`

### 5.2 unfoldDimensions（维度合并）

- 合并多个维度为一个新维度（映射到视觉通道）
- 依赖 fold 后的数据保证无冲突
- 生成 `unfoldInfo`，包含颜色编码映射

源码：`packages/vseed/src/dataReshape/unfoldDimensions.ts`

### 5.3 dataReshapeByEncoding

- 组合调用：`foldMeasures` + `unfoldDimensions`
- 是“任意维度/指标 → 固定编码结构”的关键入口

源码：`packages/vseed/src/dataReshape/dataReshapeByEncoding.ts`

## 6. AdvancedPipeline 结构（示例）

以 line 为例（图表类 advanced pipeline）：

```
page → initAdvancedVSeed → defaultMeasures → defaultDimensions → defaultMeasureId
→ encodingAdapter(...) → pivotAdapter(...) → sortXBandAxis → sortLegend
→ lineConfig → theme → markStyle → annotation
```

源码：`packages/vseed/src/pipeline/advanced/chart/pipeline/line.ts`

表格类（table / pivotTable） advanced pipeline：

```
page → initAdvancedVSeed → defaultMeasures → defaultDimensions → cellStyle
→ records → tableConfig / pivotTableConfig → theme
```

源码：

- `packages/vseed/src/pipeline/advanced/table/pipeline/table.ts`
- `packages/vseed/src/pipeline/advanced/table/pipeline/pivotTable.ts`

## 7. SpecPipeline 结构（示例）

### 7.1 Line Spec Pipeline

- 支持 pivotAdapter：普通图表与透视图表分支
- 通过 pipe 组合实现 feature 复用

源码：`packages/vseed/src/pipeline/spec/chart/pipeline/line.ts`

### 7.2 Table Spec Pipeline

- table：columns / style / theme / cell
- pivotTable：rows / columns / indicators / theme / cell

源码：

- `packages/vseed/src/pipeline/spec/table/pipeline/table.ts`
- `packages/vseed/src/pipeline/spec/table/pipeline/pivotTable.ts`

## 8. 动态过滤（Dynamic Filter）

VSeed 支持在 DSL 中写动态过滤逻辑（code），在 build 前执行。

- `Builder.prepare()` 会：
  - 定位 DSL 中所有 `dynamicFilter`
  - 深拷贝相关路径
  - 注入 `__row_index`
  - 执行 code，写回 `filter.result`

源码：`packages/vseed/src/builder/builder/prepare.ts`

## 9. Pipeline 设计原则（与实现约束）

- 功能拆分为“原子 Pipe”，避免大而全的 if/else
- 组合式 pipeline 构建图表类型
- 适配器模式（如 pivotAdapter）承接条件分支

详见：

- `apps/website/docs/zh-CN/vseed/development/designPhilosophy/pipeline/pipelineDesign.md`
- `apps/website/docs/zh-CN/vseed/development/designPhilosophy/pipeline/advancedPipeline.md`
- `apps/website/docs/zh-CN/vseed/development/designPhilosophy/pipeline/specPipeline.md`

## 10. Agent 开发建议（面向新增功能）

- 新增图表类型：
  - 补齐 `types/chartType/*`
  - 新建 `advanced` pipeline + `spec` pipeline
  - `builder/register/chartType/*` 注册

- 新增功能：
  - 优先设计独立 Pipe
  - 避免在 Pipe 内进行大分支
  - 若存在条件流程，优先用 Adapter 组合

- 新增 DSL 字段：
  - 先更新 `types` 与 zod 校验
  - 在 advanced pipeline 中完成默认推断与 reshape
  - 在 spec pipeline 中映射到具体 spec

## 11. 快速入口参考

- API 入口：`packages/vseed/src/index.ts`
- 注册所有能力：`registerAll()`
- 快速开始：`apps/website/docs/zh-CN/vseed/guide/quickStart.mdx`
