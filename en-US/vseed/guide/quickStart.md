import { PackageManagerTabs, Steps } from '@rspress/core/theme'

# Quick Start

**VSeed** is a standardized DSL (Domain Specific Language) for the analytics domain. It makes data visualization simple through elegant data orchestration.

<Steps>
  ### Install

  Install the core library `vseed` along with the underlying rendering engines `vchart` and `vtable`.

  <PackageManagerTabs command="install @visactor/vseed @visactor/vchart @visactor/vtable" />

  ### Register

  Register chart capabilities and themes at the application entry point (only needs to run once).

  ```tsx pure title="App.tsx"
  import { registerAll } from '@visactor/vseed'

  // Register all built-in chart types and themes
  registerAll()
  ```

  ### Build

  Use `Builder` to convert a VSeed DSL into a renderable Spec configuration.

  ```tsx pure title="logic.ts"
  import { VSeed, Builder } from '@visactor/vseed'

  // 1. Define the analysis intent (DSL)
  const vseed: VSeed = {
    chartType: 'line', // chart type
    dataset: [
      // data source
      { date: '2019', profit: 10, sales: 100 },
      { date: '2020', profit: 30, sales: 200 },
      { date: '2021', profit: 30, sales: 300 },
      /* ... */
    ],
  }

  // 2. Generate render config (Spec)
  const spec = Builder.from(vseed).build()
  ```

  ### Render

  Pass the generated Spec to the VChart component for rendering.

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

## Core Concepts

VSeed's design philosophy is to separate **"what you want to analyze"** (DSL) from **"how to draw the chart"** (Spec).

### 1. VSeed DSL

The core configuration object, focused on **data** and **business semantics**. You don't need to worry about visual details like axis or legend layout — VSeed provides out-of-the-box visual specifications based on chart type.

```typescript
const vseed: VSeed = {
  chartType: 'line',
  dataset: [
    { date: '2019', profit: 10, sales: 100 },
    { date: '2020', profit: 30, sales: 200 },
  ],
  dimensions: [{ id: 'date', alias: 'Date' }],
}
```

### 2. Builder

The transformation engine responsible for translating the concise DSL into a detailed VChart/VTable Spec. It contains extensive built-in data processing and visual specifications.

```typescript
// Builder pattern supports method chaining; more intermediate processing will be supported in the future
const spec = Builder.from(vseed).build()
```

***

## Advanced: Pivot Analysis

The power of VSeed lies in **multi-dimensional analysis**. Simply add Dimensions and Measures definitions to generate complex pivot charts or combination charts.

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
      // Define dimensions and measures
      dimensions: [{ id: 'date', alias: 'Date' }],
      measures: [
        { id: 'profit', alias: 'Profit', parentId: 'profit-group' },
        { id: 'sales', alias: 'Sales', parentId: 'sales-group' },
      ],
    }

    const spec = Builder.from(vseed).build()
    const tableInstance = new PivotChart(containerRef.current, spec)

    // Example: interactive filtering
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
