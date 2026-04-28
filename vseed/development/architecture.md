# 架构设计

VSeed 是一个基于语义化配置的图表生成器，旨在连接用户意图与底层渲染引擎（VChart/VTable）。

> [Deep Wiki](https://deepwiki.com/VisActor/VSeed)

## 核心概念

### 1. 流水线架构 (Pipeline Architecture)

VSeed 采用流水线模式逐步构建图表 Spec。整个过程分为两个主要阶段：

- **AdvancedPipeline**:
  - 输入: 初始 `VSeed` 对象。
  - 职责: 数据重塑 (Data Reshape)、应用主题、推断默认配置。
  - 输出: `AdvancedVSeed` (中间态模版)。

- **SpecPipeline**:
  - 输入: `AdvancedVSeed`。
  - 职责: 将中间态模版转换为具体的 VChart/VTable 配置项。
  - 输出: 最终的可渲染 Spec。

### 2. Builder 模式

`VSeedBuilder` 类是核心协调者，负责管理 Context、注册插件以及执行流水线。

### 3. 插件化扩展 (Extensibility)

VSeed 的核心能力（如支持的图表类型）完全通过插件注册机制实现。

- **Chart Type Registration**: 每种图表类型（如 `bar`, `line`）都是一个注册插件。
- **Theme Registration**: 支持注册自定义主题。
