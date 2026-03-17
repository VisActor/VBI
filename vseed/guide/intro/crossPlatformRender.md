# 跨平台渲染

:::tip
`vseed`支持无损序列化, 因此可以`跨平台传输`, `复制粘贴`, 在Node环境、浏览器环境, 都可以直接通过`builder`获取到完整的spec
:::

下面的示例展示了如何将 VSeed 配置序列化为 JSON 字符串（模拟复制），以及如何将 JSON 字符串反序列化并渲染（模拟粘贴）。

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
      alert('从剪切板读取内容时出错')
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
