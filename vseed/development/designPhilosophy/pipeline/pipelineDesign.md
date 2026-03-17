# pipeline 设计

:::info Why Pipeline?

1. 团队内前辈们的选择
2. Pipeline的优势, 可以让`VSeed`独立控制每一个图表类型的执行流程, 通过良好的设计, 让每个图表类型的实现解耦的同时又可以局部复用, 每一类图表类型都可以对任何细节的进行完美掌控, 这是 Pipeline 带来的, 也是`VSeed`最需要的.
3. 与之比起来, Pipeline模式的缺点都是可以在设计时避免的, 只要在设计`Pipe`时, 降低单个`Pipe`的规模, 减少`Pipe`之间的依赖, 就可以极大的避免这套模式带来的缺点
4. 经过四代的Pipeline的设计与优化, 到VSeed这里已经是第五个版本, 该踩的坑已经踩过了.

:::

## 什么是 Pipeline？

Pipeline 是一种强大的抽象和工程实践， 旨在将一项复杂任务分解为一系列相互连接、按顺序执行的较小步骤， 其设计理念和实现方式深受函数式编程（FP）核心思想的深刻影响。

### Pipeline 的优势:

* 模块化： 原子化实现， 通过组合原子得到模块
* 自动化： 只需确定输入， 即可自动得到输出， 而无需关注内部实现。
* 纯函数： 指定输入， 一定得到预期输出， 是纯函数的特征。
* 并行性： 天然支持并发。
* 可重用性： 每一个模块， 均可复用。
* 可测试性： 理论上, 每个模块都是独立的， 可以单独测试， 确保质量。
* 可追踪性： 每个阶段的输入输出清晰，便于定位问题和监控流程状态。
* 可缓存性： 理论上, 可以单独缓存单个`Pipe`的输出, 所以可以避免重复计算， 提高效率。

### Pipeline 的缺点:

* 先后依赖： 当Pipe之间存在先后依赖时, 会使得理解成本增加, 因为你需要先理解前面的阶段， 才能理解后面的阶段。需要对整体流程有较深入的理解， 才能快速定位问题。
* 调试成本： 由于 Pipeline 是按顺序执行的， 一旦某个阶段失败， 就会导致整个 Pipeline 失败。 这使得调试变得困难， 因为你需要定位失败的阶段， 并修复它。
* 性能问题： 由于 Pipeline 是按顺序执行的， 每个阶段的输出都需要等待前一个阶段完成， 这会导致性能问题。 特别是当某个阶段的执行时间较长时， 会影响整个 Pipeline 的执行效率。
* 函数式编程：  要理解全新的概念, 有一定的学习成本. 也是因此, 设计原理和实现细节需要写在贡献指南里, 方便其他开发者理解和使用, 弥补劣势.

## VSeed内应该如何编写Pipeline?

### Pipe 组合模式

多个功能Pipe, 可以组合成一个更大的功能Pipe, 也可以组合成一个更复杂的Pipeline.

在VSeed中, 一个完整的Pipeline, 对应着一个图表类型的实现；通过描述Pipe的组合关系, 就能做出不同的图表类型. 在Pipeline组合阶段, 无需关注每个pipe的具体实现.

#### 组合差异

举个例子:

折线图和面积图有大量功能可以复用, 例如标签、图例、坐标轴等, 但折线图没有面图元样式, 因此pipeline就通过组合功能Pipe, 解决上述差异, 整个过程中没有任何if语句.

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

### Pipe 适配器模式

除了组合模式外, Pipe的构建往往有一定的条件, 为了满足不同条件下的Pipe组合, VSeed内大量使用了Pipe适配器

#### 组合条件

举个例子:

折线图有透视功能, 无透视时由VChart渲染, 输出VChart spec, 有透视时由VTable渲染, 输出VTable spec.

透视折线图有基本上需要复用折线图的基本功能, 例如标签、图例、坐标轴等, 因此需要通过适配器模式, 将折线图的Pipe, 适配成透视折线图的Pipe.

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

综上, 每一个adapter就是一条if else, 可以将pipe内隐藏的条件, 抽象成一个adapter, 因此if else前置到了最顶层, 从而获得依赖关系更清晰的Pipeline, 减少维护成本.

### Pipeline 的最基本单元： 功能 Pipe

VSeed期望所有的图表类型, 都以功能为最基本的单元， 提供足够的复用与扩展能力； 自底向上构建一个图表类型的 pipeline； 每个功能Pipe, 都应该是一个独立的、 可测试的、 可复用的模块；

其中最关键的是, 应该以功能差异抽象出不同的Pipe(即少写if else), 而非写一个大而全的Pipe.

#### 扁平化功能Pipe

举个例子:

条形图、柱状图、折线图、面积图、散点图都有X轴与Y轴, 它们相似而又略有不同, 如果写一个大而全的 axes pipe, 可能会变成这样

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

上述逻辑, 在一个功能Pipe内实现了根据图表类型, 选择不同的子功能pipe, 引发的问题是

1. xy、yx、yy内重复的功能又该如何复用? 大量的相似而又不同的子函数, 需要在不同的子功能pipe中, 被重复调用. 依赖关系容易变得错综复杂, 导致维护成本增加.
2. 修改折线图、面积图的功能, 容易遗漏条形图, 因为逻辑出现了分叉, 因此实现新功能时要考虑差异.

当整个spec pipeline的规模扩大到几百个pipe时, 这样的编写逻辑会带来非常高昂的维护成本, 因此, 我们需要一种更简单的方式, 来实现根据图表类型, 选择不同的子功能pipe.

继续上述的例子, 将差异抽象成不同的Pipe, 在更细粒度的功能上封装的差异, 最后在pipeline内直接组合, 就可以避免上述问题

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

上述例子中, 没有实现axes pipe, 而是直接组合了xBandAxis、yBandAxis、xLinearAxis、yLinearAxis这4个pipe, 这样就避免了在axes pipe内根据图表类型, 选择不同的子功能pipe的问题, 从而避免了根据图表类型, 做出不同的判断, 从而减少了if else的使用.

所以的图表类型差异的分叉, 应该是在Pipeline之上, 除非迫不得已, Pipeline内无需根据图表类型, 选择不同的子功能pipe.

这样的组合方式, 符合VSeed的设计哲学, 即使用更扁平的功能Pipe的组合, 而不是if else条件判断做一个大而全的功能Pipe.
