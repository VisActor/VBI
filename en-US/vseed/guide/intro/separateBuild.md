# Separate Build

:::tip
In most cases, chart data processing is time-consuming. VSeed supports splitting data processing and rendering. Use `buildAdvanced` and `buildSpec` for a separate build workflow.
:::

```tsx pure title="Separate Build"
const builder = Builder.from(vseed)

// Node.js
const advancedVSeed = builder.buildAdvanced()

// Web Browser
const spec = builder.buildSpec(advancedVSeed)

// spec used for rendering
```

The example below demonstrates how to use the separate build flow in a React component.

```tsx direction=vertical playground
import { useRef, useEffect } from 'react'
import VChart from '@visactor/vchart'
import { registerAll, VSeed, Builder } from '@visactor/vseed'
registerAll()

const Demo = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

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
    const builder = Builder.from(vseed)
    const advancedVSeed = builder.buildAdvanced()
    const spec = builder.buildSpec(advancedVSeed)

    const vchart = new VChart(spec, { dom: ref.current })
    vchart.renderSync()

    return () => vchart.release()
  })

  return <div ref={ref} style={{ height: 260, width: '100%' }}></div>
}

export default Demo
```
