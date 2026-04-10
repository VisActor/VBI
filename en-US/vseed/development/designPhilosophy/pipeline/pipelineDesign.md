# Pipeline Design

:::info Why Pipeline?

1. A choice made by senior team members.
2. Pipeline's advantage: it allows `VSeed` to independently control the execution flow for each chart type. With good design, each chart type's implementation is both decoupled and locally reusable, giving each chart type perfect control over every detail — this is what Pipeline brings, and exactly what `VSeed` needs most.
3. The downsides of the Pipeline pattern can all be avoided at design time — by keeping individual `Pipe` sizes small and minimizing dependencies between `Pipe`s.
4. After four generations of Pipeline design and optimization, this is the fifth version — the pitfalls have already been navigated.
   :::

## What is a Pipeline?

Pipeline is a powerful abstraction and engineering practice that decomposes a complex task into a series of connected, sequentially executed smaller steps. Its design philosophy is deeply influenced by the core ideas of functional programming (FP).

### Pipeline Advantages:

* **Modularity**: Atomic implementation — compose atoms into modules.
* **Automation**: Simply define the input to automatically get the output, without worrying about internal implementation.
* **Pure functions**: Given a specified input, the expected output is always produced — a characteristic of pure functions.
* **Parallelism**: Naturally supports concurrency.
* **Reusability**: Every module can be reused.
* **Testability**: In theory, every module is independent and can be tested individually to ensure quality.
* **Traceability**: Clear inputs and outputs at each stage make it easy to locate issues and monitor process state.
* **Cacheability**: In theory, the output of individual `Pipe`s can be cached, avoiding redundant computation and improving efficiency.

### Pipeline Disadvantages:

* **Sequential dependencies**: When Pipes have ordering dependencies, the cognitive cost increases — you need to understand earlier stages to understand later ones. Deep overall understanding is needed to quickly locate issues.
* **Debugging cost**: Since Pipeline executes sequentially, a failure at any stage causes the entire Pipeline to fail. This makes debugging harder, as you need to locate the failing stage and fix it.
* **Performance**: Since Pipeline executes sequentially, each stage's output must wait for the previous stage to complete, which can cause performance issues — especially when one stage takes a long time.
* **Functional programming**: Requires learning new concepts, which carries some onboarding cost. As a result, design principles and implementation details need to be documented in the contribution guide for other developers.

## How to Write Pipelines in VSeed?

### Pipe Composition Pattern

Multiple functional Pipes can be composed into a larger functional Pipe, or combined into a more complex Pipeline.

In VSeed, a complete Pipeline corresponds to the implementation of one chart type. By describing the composition of Pipes, different chart types can be created. During the Pipeline composition phase, you don't need to worry about each pipe's specific implementation.

#### Composition for Differences

Example:

Line charts and area charts share many reusable features — labels, legends, axes, etc. — but area charts have area mark styles while line charts don't. The pipeline resolves this difference through functional Pipe composition, with no if statements needed.

```ts
const lineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const areaChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,

  // Only area charts have area mark style
  areaStyle,
]
```

### Pipe Adapter Pattern

Beyond composition, building Pipes often involves conditions. To handle different conditional Pipe combinations, VSeed makes heavy use of Pipe adapters.

#### Conditional Composition

Example:

Line charts support pivot mode — without pivot, rendered by VChart (output VChart spec); with pivot, rendered by VTable (output VTable spec).

Pivot line charts need to reuse most basic line chart features (labels, legends, axes, etc.), so the adapter pattern adapts regular line chart Pipes into pivot line chart Pipes.

```ts
const pivotLineChartPipeline = [
  initPivotChart,
  pivotIndicators([
    label,
    xAxis,
    yAxis,
    lineStyle,
    pointStyle,
  ]),
  pivotChartLegend,
] 

const commonLineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const lineChartPipeline = [
  pivotAdapter(commonLineChartPipeline, pivotLineChartPipeline)
]
```

In summary, each adapter is essentially an if-else — hidden conditions inside a pipe are abstracted into an adapter, pushing the if-else to the top level. This results in a Pipeline with clearer dependencies and lower maintenance cost.

### The Most Basic Unit: Functional Pipe

VSeed expects all chart types to use **features** as the most basic unit, providing sufficient reusability and extensibility — building a chart type's pipeline bottom-up. Each functional Pipe should be an independent, testable, and reusable module.

The most critical point: **abstract differences into different Pipes** (write fewer if-else statements), rather than writing one large, all-in-one Pipe.

#### Flat Functional Pipes

Example:

Bar, column, line, area, and scatter charts all have X and Y axes — similar but slightly different. If you write one large `axes` pipe, it might look like this:

```ts
// ... (see zh-CN for full example)
const axes = (spec, context) => {
  if (isLine || isArea || isColumn){
    return xy(spec, context) 
  }
  if (isScatter){
    return yy(spec, context) 
  }
  if (isBar){
    return yx(spec, context) 
  }
}
```

The better approach is to abstract the differences into separate Pipes and compose them at the pipeline level:

```ts
const lineChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const barChartPipeline = [
  yBandAxis,
  xLinearAxis,
]
const areaChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const scatterChartPipeline = [
  xLinearAxis,
  yLinearAxis,
]
```

All chart type divergences should occur **above** the Pipeline level. Unless absolutely necessary, Pipelines should not branch based on chart type.

This composition approach aligns with VSeed's design philosophy: use a flatter composition of functional Pipes instead of if-else conditions in a single large Pipe.
