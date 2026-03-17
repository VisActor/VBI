import { PackageManagerTabs, Steps } from '@rspress/core/theme'

# 快速开始

**VSeed** 是面向分析领域的标准化 DSL（领域特定语言）。通过优雅的数据编排，让数据可视化变得简单。

<Steps>
  ### 安装

  安装核心库 `vseed` 及底层渲染引擎 `vchart`、`vtable`。

  <PackageManagerTabs command="install @visactor/vseed @visactor/vchart @visactor/vtable" />

  ### 注册

  在应用入口处注册图表能力与主题（只需执行一次）。

  ```tsx pure title="App.tsx"
  import { registerAll } from '@visactor/vseed'

  // 注册所有内置图表类型与主题
  registerAll()
  ```

  ### 构建

  通过 `Builder` 将 VSeed DSL 转换为可渲染的 Spec 配置。

  ```tsx pure title="logic.ts"
  import { VSeed, Builder } from '@visactor/vseed'

  // 1. 定义分析意图 (DSL)
  const vseed: VSeed = {
    chartType: 'line', // 图表类型
    dataset: [
      // 数据源
      { date: '2019', profit: 10, sales: 100 },
      { date: '2020', profit: 30, sales: 200 },
      { date: '2021', profit: 30, sales: 300 },
      /* ... */
    ],
  }

  // 2. 生成渲染配置 (Spec)
  const spec = Builder.from(vseed).build()
  ```

  ### 渲染

  将生成的 Spec 传递给 VChart 组件进行渲染。

  ```tsx
  import { useRef, useEffect } from 'react'
  import VChart from '@visactor/vchart'
  import { registerAll, VSeed, Builder } from '@visactor/vseed'

  registerAll()

  const Demo = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (!containerRef.current) return

      const vseed: VSeed = {
        chartType: 'line',
        dataset: [
          { date: '2019', profit: 10, sales: 100 },
          { date: '2020', profit: 30, sales: 200 },
          { date: '2021', profit: 30, sales: 300 },
          { date: '2022', profit: 50, sales: 400 },
          { date: '2023', profit: 40, sales: 500 },
        ],
      }

      const spec = Builder.from(vseed).build()
      const vchart = new VChart(spec, { dom: containerRef.current })

      vchart.renderSync()
      return () => vchart.release()
    }, [])

    return <div ref={containerRef} style={{ height: 300 }} />
  }

  export default Demo
  ```
</Steps>

## 核心概念

VSeed 的设计理念是将 **"想要分析什么"** (DSL) 与 **"如何绘制图表"** (Spec) 分离。

### 1. VSeed DSL

核心配置对象，聚焦于**数据**与**业务语义**。你无需关心坐标轴、图例布局等视觉细节，VSeed 根据图表类型设置了开箱即用的视觉规范

```typescript
const vseed: VSeed = {
  chartType: 'line',
  dataset: [
    { date: '2019', profit: 10, sales: 100 },
    { date: '2020', profit: 30, sales: 200 },
  ],
  dimensions: [{ id: 'date', alias: '日期' }],
}
```

### 2. Builder

转换引擎，负责将简洁的 DSL 翻译为详尽的 VChart/VTable Spec。它内置了大量的数据处理与视觉规范。

```typescript
// Builder 模式允许链式调用，未来支持更多中间处理
const spec = Builder.from(vseed).build()
```

***

## 进阶：透视分析

VSeed 的强大之处在于**多维分析**。只需补充维度（Dimensions）与指标（Measures）定义，即可生成复杂的透视图或组合图。

```tsx
import { useRef, useEffect } from 'react'
import VChart from '@visactor/vchart'
import { register, PivotChart } from '@visactor/vtable'
import { registerAll, VSeed, Builder, ColorIdEncoding } from '@visactor/vseed'

register.chartModule('vchart', VChart)
registerAll()

const Demo = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const vseed: VSeed = {
      chartType: 'line',
      dataset: [
        { date: '2019', profit: 10, sales: 100 },
        { date: '2020', profit: 30, sales: 200 },
        { date: '2021', profit: 30, sales: 300 },
        { date: '2022', profit: 50, sales: 400 },
        { date: '2023', profit: 40, sales: 500 },
      ],
      // 定义维度与指标
      dimensions: [{ id: 'date', alias: '日期' }],
      measures: [
        { id: 'profit', alias: '利润', parentId: 'profit-group' },
        { id: 'sales', alias: '销售额', parentId: 'sales-group' },
      ],
    }

    const spec = Builder.from(vseed).build()
    const tableInstance = new PivotChart(containerRef.current, spec)

    // 示例：交互联动
    tableInstance.on('legend_item_click', (args) => {
      tableInstance.updateFilterRules([
        {
          filterKey: ColorIdEncoding,
          filteredValues: args.value,
        },
      ])
    })

    return () => tableInstance.release()
  }, [])

  return <div ref={containerRef} style={{ height: 300 }} />
}

export default Demo
```
