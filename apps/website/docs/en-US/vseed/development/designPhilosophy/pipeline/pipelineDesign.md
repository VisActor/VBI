# pipeline design

:::info Why Pipeline?
1. Choice of seniors in the team
2. The advantage of Pipeline is that it allows `VSeed` to independently control the execution process of each chart type. Through good design, the implementation of each chart type can be decoupled and partially reused. Each type of chart type can have perfect control over any details. This is what Pipeline brings and what `VSeed` needs most.
3. In comparison, the shortcomings of the Pipeline mode can be avoided during design. As long as the scale of a single `Pipe` is reduced and the dependence between `Pipe` is reduced when designing `Pipe`, the shortcomings caused by this mode can be greatly avoided.
4. After four generations of Pipeline design and optimization, VSeed is already in its fifth version, and the pitfalls that need to be overcome have been overcome.

:::

## What is Pipeline?

Pipeline is a powerful abstraction and engineering practice that aims to decompose a complex task into a series of smaller steps that are connected and executed in sequence. Its design concept and implementation are deeply influenced by the core ideas of Functional Programming (FP).

### Advantages of Pipeline:
- Modularization: Atomic implementation, modules are obtained by combining atoms
- Automation: Just determine the input and you can automatically get the output without paying attention to the internal implementation.
- Pure function: Specify the input and you will get the expected output, which is a characteristic of a pure function.
- Parallelism: Naturally supports concurrency.
- Reusability: Every module can be reused.
- Testability: In theory, each module is independent and can be tested individually to ensure quality.
- Traceability: The input and output of each stage are clear, making it easy to locate problems and monitor process status.
- Cacheability: In theory, the output of a single `Pipe` can be cached separately, so repeated calculations can be avoided and efficiency improved.

### Disadvantages of Pipeline:
- Sequential dependencies: When there are sequential dependencies between Pipes, it will increase the cost of understanding, because you need to understand the previous stages before you can understand the later stages. A deeper understanding of the overall process is required to quickly locate problems.
- Debugging cost: Since the Pipeline is executed sequentially, once a certain stage fails, the entire Pipeline will fail. This makes debugging difficult because you need to locate the failed stage and fix it.
- Performance issues: Since Pipeline is executed sequentially, the output of each stage needs to wait for the completion of the previous stage, which can cause performance issues. Especially when the execution time of a certain stage is long, it will affect the execution efficiency of the entire Pipeline.
- Functional programming: To understand a new concept, there is a certain learning cost. Therefore, the design principles and implementation details need to be written in the contribution guide to facilitate other developers to understand and use it, and to make up for the disadvantages.

## How to write Pipeline in VSeed?

### Pipe combination mode

Multiple functional Pipes can be combined into a larger functional Pipe or into a more complex Pipeline.

In VSeed, a complete Pipeline corresponds to the implementation of a chart type; by describing the combination relationship of Pipes, different chart types can be made. In the Pipeline combination stage, there is no need to pay attention to the specific implementation of each pipe.


#### Combination differences

For example:

Line charts and area charts have a large number of functions that can be reused, such as labels, legends, coordinate axes, etc., but line charts do not have surface element styles, so the pipeline solves the above differences by combining the function Pipe, without any if statements in the whole process.

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

  // 仅面积图有面图元样式
  areaStyle,
]
```


### Pipe Adapter Pattern

In addition to the combination mode, the construction of Pipe often has certain conditions. In order to meet the Pipe combination under different conditions, a large number of Pipe adapters are used in VSeed

#### Combination conditions

For example:

The line chart has a perspective function. When there is no perspective, it is rendered by VChart and the output is VChart spec. When there is perspective, it is rendered by VTable and the output is VTable spec.

The perspective line chart basically needs to reuse the basic functions of the line chart, such as labels, legends, coordinate axes, etc. Therefore, it is necessary to adapt the Pipe of the line chart to the Pipe of the perspective line chart through the adapter mode.

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

In summary, each adapter is an if else, which can abstract the hidden conditions in the pipeline into an adapter, so the if else is placed at the top level, thereby obtaining a Pipeline with clearer dependencies and reducing maintenance costs.

### The most basic unit of Pipeline: Function Pipe

VSeed expects all chart types to take functions as the most basic unit and provide sufficient reuse and expansion capabilities; build a chart type pipeline from the bottom up; each function Pipe should be an independent, testable, and reusable module;

The most important thing is that different Pipes should be abstracted based on functional differences (that is, write less if else) instead of writing one large and comprehensive Pipe.

#### Flat function Pipe

For example:

Bar charts, column charts, line charts, area charts, and scatter charts all have X-axes and Y-axes. They are similar but slightly different. If you write a large and comprehensive axes pipe, it may become like this

```ts
const lineChartPipeline = [
  axes
]
const barChartPipeline = [
  axes
]
const areaChartPipeline = [
  axes
]
const scatterChartPipeline = [
  axes
]
const axes = (spec, context) => {
  if (isLine || isArea || isColumn){
    // 折线图、面积图、柱状图有一个离散的轴, 一个连续的轴
    return xy(spec, context) 
  }
  if (isScatter){
    // 散点图有2个连续的轴
    return yy(spec, context) 
  }
  if (isBar){
    // 条形图有一个离散的轴, 一个连续的轴, 但与折线图、面积图、柱状图的轴方向不同
    return yx(spec, context) 
  }
}

const xy = (spec, context) => {
  linearAxis(spec, context, {orient: 'left'})
  bandAxis(spec, context, {orient: 'bottom'})
}

const yx = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  bandAxis(spec, context, {orient: 'left'})
}

const yy = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  linearAxis(spec, context, {orient: 'left'})
}
```

The above logic is implemented in a function Pipe to select different sub-function pipes according to the chart type. The problem caused is:
1. How to reuse the repeated functions in xy, yx, and yy? A large number of similar but different sub-functions need to be called repeatedly in different sub-function pipes. Dependencies can easily become complicated, leading to increased maintenance costs.
2. When modifying the functions of line charts and area charts, it is easy to miss bar charts because the logic has bifurcated, so differences must be considered when implementing new functions.

When the scale of the entire spec pipeline expands to hundreds of pipes, writing logic like this will bring very high maintenance costs. Therefore, we need a simpler way to select different sub-function pipes based on the chart type.

Continuing the above example, abstracting the differences into different Pipes, encapsulating the differences in more fine-grained functions, and finally combining them directly within the pipeline can avoid the above problems.

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

const xBandAxis = (spec, context) => {
}
const yBandAxis = (spec, context) => {
}
const xLinearAxis = (spec, context) => {
}
const yLinearAxis = (spec, context) => {
}
```

In the above example, the axes pipe is not implemented, but the four pipes of xBandAxis, yBandAxis, xLinearAxis, and yLinearAxis are directly combined. This avoids the problem of selecting different sub-function pipes according to the chart type in the axes pipe, thereby avoiding making different judgments based on the chart type, thereby reducing the use of if else.

Therefore, the fork of differences in chart types should be on the Pipeline. Unless it is absolutely necessary, there is no need to select different sub-function pipes according to the chart type in the Pipeline.

This combination is in line with the design philosophy of VSeed, which is to use a combination of flatter functional Pipes instead of using if else conditional judgment to make a large and comprehensive functional Pipe.


