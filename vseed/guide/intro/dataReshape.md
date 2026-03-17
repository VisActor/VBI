# 数据重塑

:::info
数据和图表类型是完全解耦的, 无论有多少维度或指标, VSeed 都可以始终重塑它们. 代价可能是图表的语义不佳, 但这是值得的.
:::

下面的示例演示了不同结构的 `dataset` 和不同 `chartType` 之间的自由组合。你可以点击下方的按钮切换数据集和图表类型，观察 VSeed 如何自动适配。

```tsx direction=vertical playground
import { useRef, useEffect, useState } from 'react'
import VChart from '@visactor/vchart'
import { ListTable, PivotTable } from '@visactor/vtable'
import { registerAll, VSeed, Builder, isTable, isPivotTable } from '@visactor/vseed'

registerAll()

const Demo = () => {
  const ref = useRef<HTMLDivElement>(null)
  const datasetList = [
    // 单指标零维度
    [{ profit: 10 }],
    // 单指标单维度
    [
      { date: '2019', profit: 10 },
      { date: '2020', profit: 30 },
      { date: '2021', profit: 30 },
      { date: '2022', profit: 50 },
      { date: '2023', profit: 40 },
    ],
    // 单指标两维度
    [
      { date: '2019', region: 'A', profit: 1 },
      { date: '2019', region: 'B', profit: 2 },
      { date: '2019', region: 'C', profit: 3 },
      { date: '2019', region: 'D', profit: 4 },
      { date: '2019', region: 'E', profit: 5 },

      { date: '2020', region: 'A', profit: 10 },
      { date: '2020', region: 'B', profit: 9 },
      { date: '2020', region: 'C', profit: 8 },
      { date: '2020', region: 'D', profit: 7 },
      { date: '2020', region: 'E', profit: 6 },

      { date: '2021', region: 'A', profit: 11 },
      { date: '2021', region: 'B', profit: 12 },
      { date: '2021', region: 'C', profit: 13 },
      { date: '2021', region: 'D', profit: 14 },
      { date: '2021', region: 'E', profit: 15 },
    ],
    // 单指标多维度
    [
      { date: '2019', region: 'east', city: 'A', profit: 10 },
      { date: '2019', region: 'east', city: 'B', profit: 30 },
      { date: '2019', region: 'west', city: 'A', profit: 30 },
      { date: '2019', region: 'west', city: 'B', profit: 50 },

      { date: '2020', region: 'east', city: 'A', profit: 15 },
      { date: '2020', region: 'east', city: 'B', profit: 35 },
      { date: '2020', region: 'west', city: 'A', profit: 35 },
      { date: '2020', region: 'west', city: 'B', profit: 55 },

      { date: '2021', region: 'east', city: 'A', profit: 20 },
      { date: '2021', region: 'east', city: 'B', profit: 40 },
      { date: '2021', region: 'west', city: 'A', profit: 40 },
      { date: '2021', region: 'west', city: 'B', profit: 60 },
    ],
    // 多指标零维度
    [{ profit: 1, sales: 2, discount: 0.1 }],
    // 多指标单维度
    [
      { date: '2019', profit: 10, sales: 20, discount: 0.1 },
      { date: '2020', profit: 30, sales: 60, discount: 0.1 },
      { date: '2021', profit: 30, sales: 60, discount: 0.1 },
      { date: '2022', profit: 50, sales: 100, discount: 0.1 },
      { date: '2023', profit: 40, sales: 80, discount: 0.1 },
    ],
    // 多指标多维度
    [
      { date: '2019', region: 'east', city: 'A', profit: 10, sales: 100 },
      { date: '2019', region: 'east', city: 'B', profit: 30, sales: 200 },
      { date: '2019', region: 'west', city: 'A', profit: 30, sales: 300 },
      { date: '2019', region: 'west', city: 'B', profit: 50, sales: 500 },

      { date: '2020', region: 'east', city: 'A', profit: 15, sales: 100 },
      { date: '2020', region: 'east', city: 'B', profit: 35, sales: 200 },
      { date: '2020', region: 'west', city: 'A', profit: 35, sales: 300 },
      { date: '2020', region: 'west', city: 'B', profit: 55, sales: 500 },

      { date: '2021', region: 'east', city: 'A', profit: 20, sales: 100 },
      { date: '2021', region: 'east', city: 'B', profit: 40, sales: 200 },
      { date: '2021', region: 'west', city: 'A', profit: 40, sales: 300 },
      { date: '2021', region: 'west', city: 'B', profit: 60, sales: 500 },
    ],
  ]

  const chartTypes = [
    'table',
    'pivotTable',
    // cartesian
    'line',
    'column',
    'columnPercent',
    'columnParallel',
    'bar',
    'barPercent',
    'barParallel',
    'area',
    'areaPercent',
    // polar
    'pie',
    'donut',
    'radar',
    'roseParallel',
    'rose',
    'scatter',
    'dualAxis',
    // other
    'funnel',
    'heatmap',
  ]

  const [chartType, setChartType] = useState('columnParallel')
  const [dataset, setDataset] = useState(datasetList[1])
  const builderRef = useRef(null)
  const changeDataset = (c) => () => {
    setDataset(c)
  }

  const changeChartType = (c) => () => {
    setChartType(c)
  }

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const vseed: VSeed = {
      chartType,
      dataset,
      legend: {
        position: 'bottom',
      },
    }

    const builder = Builder.from(vseed)
    const spec = builder.build()
    builderRef.current = builder
    if (isTable(vseed)) {
      const tableInstance = new ListTable(ref.current, spec)
      return () => tableInstance.release()
    } else if (isPivotTable(vseed)) {
      const tableInstance = new PivotTable(ref.current, spec)
      return () => tableInstance.release()
    } else {
      const vchart = new VChart(spec, { dom: ref.current })
      vchart.renderSync()
      return () => vchart.release()
    }
  }, [dataset, chartType])

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column' }}
      onClick={() => {
        console.group(`selected ${chartType}`)
        console.log('builder', builderRef.current)
        console.log('spec', builderRef.current.spec)
        console.log('vseed', builderRef.current.vseed)
        console.log('advancedVSeed', builderRef.current.advancedVSeed)
        console.groupEnd()
      }}
    >
      <div>
        {datasetList.map((d, index) => {
          return (
            <span key={index} style={{ margin: '0 2px 0 0' }}>
              <button
                onClick={changeDataset(d)}
                style={{ fontSize: 10, padding: '0 2px', border: '1px solid #cccccc' }}
              >
                {`dataset` + (index + 1)}
              </button>
            </span>
          )
        })}
      </div>
      <div>
        {chartTypes.map((d) => {
          return (
            <span key={d} style={{ margin: '0 2px 0 0' }}>
              <button
                onClick={changeChartType(d)}
                style={{ fontSize: 10, padding: '0 2px', border: '1px solid #cccccc' }}
              >
                {d}
              </button>
            </span>
          )
        })}
      </div>

      <div ref={ref} style={{ height: 260, width: '100%' }}></div>
    </div>
  )
}

export default Demo
```
