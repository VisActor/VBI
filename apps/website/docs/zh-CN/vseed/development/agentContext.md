# Agent 开发上下文（VSeed）

本文档面向 agent-code 与贡献者，汇总 VSeed 子包的核心架构、数据流与扩展方式，便于在自动化开发时快速建立全局理解。

> 这是为 Agent 使用而设计的“上下文索引”。更详细的工程说明请参考：`packages/vseed/AGENTS.md`。

## 1. 目标与定位

VSeed 是一个 **Spec Builder**，将 `VSeed DSL` 转换为 `VChart` / `VTable` 可渲染 Spec，支撑智能生成与编辑图表的能力。

- 输入：`VSeed DSL`
- 输出：`VChart` / `VTable` Spec
- 核心流程：`AdvancedPipeline` + `SpecPipeline`

## 2. 两段式 Pipeline

1. **AdvancedPipeline**

- 输入：`VSeed DSL`
- 输出：`AdvancedVSeed`（可序列化中间态）
- 负责：数据重塑、默认推断、编码建模、主题与样式、分析配置

2. **SpecPipeline**

- 输入：`AdvancedVSeed`
- 输出：最终 Spec（不可序列化，直接渲染）
- 负责：将中间态映射到具体 VChart / VTable 配置

## 3. Builder 入口

- 使用 `Builder.from(vseed).build()` 生成 Spec
- `prepare()` 执行 dynamicFilter（如需要）

源码入口：
- `packages/vseed/src/builder/builder/builder.ts`
- `packages/vseed/src/builder/builder/build.ts`
- `packages/vseed/src/builder/builder/prepare.ts`

## 4. 数据重塑（核心）

- `foldMeasures`：多指标折叠为单指标，生成 `foldInfo`
- `unfoldDimensions`：按视觉通道合并维度，生成 `unfoldInfo`
- `dataReshapeByEncoding`：组合调用（fold + unfold）

源码入口：
- `packages/vseed/src/dataReshape/foldMeasures.ts`
- `packages/vseed/src/dataReshape/unfoldDimensions.ts`
- `packages/vseed/src/dataReshape/dataReshapeByEncoding.ts`

## 5. 扩展与注册

- `registerAll()`：注册所有图表与主题
- `registerXxx()`：注册单图表类型 pipeline
- `updateAdvanced()` / `updateSpec()`：插入自定义 Pipe

源码入口：
- `packages/vseed/src/builder/register/all.ts`
- `packages/vseed/src/builder/register/chartType/*`
- `packages/vseed/src/builder/register/custom.ts`

## 6. Pipeline 设计原则

- Pipe 尽量原子化，减少 if/else
- 通过 Adapter 组合条件流程
- 图表类型由 Pipe 组合决定

参考：
- `apps/website/docs/zh-CN/vseed/development/designPhilosophy/pipeline/pipelineDesign.md`

## 7. 更完整上下文

- `packages/vseed/AGENTS.md`
- `apps/website/docs/zh-CN/vseed/development/architecture.md`
- `apps/website/docs/zh-CN/vseed/development/designPhilosophy/vseed.md`

