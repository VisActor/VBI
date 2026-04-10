# Cross-Platform Rendering

:::tip
`vseed` supports lossless serialization, enabling cross-platform transfer, copy-paste, and direct spec generation via `builder` in both Node.js and browser environments
:::

The example below demonstrates serializing a VSeed config to a JSON string (copy simulation) and deserializing the JSON string for rendering (paste simulation).

```tsx direction=vertical playground
import { useRef, useEffect, useState } from 'react'
import VChart from '@visactor/vchart'
import { registerAll, VSeed, Builder } from '@visactor/vseed'
registerAll()

const Demo = () => {
  const [vseed, setVSeed] = useState()
  const ref = useRef()
  const chartRef = useRef()
  const vseed1: VSeed = {
    chartType: 'line',
    dataset: [
      { date: '2019', profit: 10, sales: 100 },
      { date: '2020', profit: 30, sales: 200 },
      { date: '2021', profit: 30, sales: 300 },
      { date: '2022', profit: 50, sales: 400 },
      { date: '2023', profit: 40, sales: 500 },
    ],
  }

  const vseed2: VSeed = {
    chartType: 'bar',
    dataset: [
      { date: '2019', profit: 10, sales: 100 },
      { date: '2020', profit: 30, sales: 200 },
      { date: '2021', profit: 30, sales: 300 },
      { date: '2022', profit: 50, sales: 400 },
      { date: '2023', profit: 40, sales: 500 },
    ],
  }

  const copyVSeed1 = async () => {
    await navigator.clipboard.writeText(JSON.stringify(vseed1))
  }
  const copyVSeed2 = async () => {
    await navigator.clipboard.writeText(JSON.stringify(vseed2))
  }

  const paste = async () => {
    try {
      if (chartRef.current) {
        chartRef.current.release()
      }
      const clipboardText = await navigator.clipboard.readText()
      const parsedVSeed = JSON.parse(clipboardText)

      const builder = Builder.from(parsedVSeed)
      const advancedVSeed = builder.buildAdvanced()
      const spec = builder.buildSpec(advancedVSeed)
      const vchart = new VChart(spec, { dom: ref.current })
      vchart.renderSync()

      chartRef.current = vchart
    } catch (error) {
      console.log('debug', error)
      alert('Error reading from clipboard')
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: 100 }}>
        <button onClick={copyVSeed1} style={{ width: 100, marginBottom: 4 }}>
          copy demo1
        </button>
        <button onClick={copyVSeed2} style={{ width: 100, marginBottom: 4 }}>
          copy demo2
        </button>
        <button onClick={paste} style={{ width: 100 }}>
          paste
        </button>
      </div>

      <div ref={ref} style={{ height: 260, width: 'calc(100% - 100px)' }}></div>
    </div>
  )
}

export default Demo
```
