# 分离式构建

:::tip
通常情况下, 图表的数据处理比较耗时, VSeed支持拆分数据处理与数据渲染, `build`提供`buildAdvanced`和`buildSpec`进行分离式构建
:::

```tsx pure title=分离式构建
const builder = Builder.from(vseed)

// Node.js
const advancedVSeed = builder.buildAdvanced()

// Web Browser
const spec = builder.buildSpec(advancedVSeed)

// spec用于渲染
```

下面的示例展示了如何在 React 组件中使用分离式构建流程。

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
