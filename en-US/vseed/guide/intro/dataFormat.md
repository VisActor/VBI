# Number Format

VSeed supports configuring formatting rules for numerical values within `measures`.

- `autoFormat`: Whether to automatically format values.
- `format`: Detailed formatting configuration, including type, ratio, thousand separator, fraction digits, prefix/suffix, etc.

```tsx direction=vertical playground
import { useDark } from '@rspress/core/runtime'

import { useRef, useEffect } from 'react'
import VChart from '@visactor/vchart'
import { registerAll, VSeed, Builder, isPivotChart, isVChart, isVTable } from '@visactor/vseed'
import { ListTable, PivotChart, register } from '@visactor/vtable'

registerAll()
register.chartModule('vchart', VChart)

const Demo = () => {
  const vseed: VSeed = {
    chartType: 'columnParallel',
    measures: [
      {
        id: 'profit',
        alias: 'Profit',
        autoFormat: false,
        format: {
          type: 'number',
          ratio: 1000,
          thousandSeparator: true,
          fractionDigits: 0,
          symbol: 'k',
          prefix: 'Profit',
          suffix: '$',
        },
      },
      {
        id: 'sales',
        alias: 'Sales',
        autoFormat: true,
      },
    ],
    dimensions: [{ id: 'date', alias: 'Date' }],
    dataset: [
      { date: '2019', profit: 10000, sales: 200000, discount: 0.5, rateOfReturn: 0.001 },
      { date: '2020', profit: 20000, sales: 400000, discount: 0.2, rateOfReturn: 0.002 },
      { date: '2021', profit: 30000, sales: 600000, discount: 0.4, rateOfReturn: 0.003 },
      { date: '2022', profit: 40000, sales: 800000, discount: 0.2, rateOfReturn: 0.004 },
      { date: '2023', profit: 50000, sales: 1000000, discount: 0.05, rateOfReturn: 0.005 },
    ],
  }

  return <SimpleVSeedRender vseed={vseed} />
}

const SimpleVSeedRender = (props: { vseed: VSeed }) => {
  const { vseed } = props
  const ref = useRef<HTMLDivElement>(null)
  const dark = useDark()
  useEffect(() => {
    if (!ref.current) {
      return
    }
    const theme = dark ? 'dark' : 'light'
    const spec = Builder.from({ ...vseed, theme }).build()

    if (isPivotChart(vseed)) {
      const tableInstance = new PivotChart(ref.current, spec)
      return () => tableInstance.release()
    } else if (isVChart(vseed)) {
      const vchart = new VChart(spec, { dom: ref.current })
      vchart.renderSync()
      return () => vchart.release()
    } else if (isVTable(vseed)) {
      const tableInstance = new ListTable(ref.current, spec)
      return () => tableInstance.release()
    }
  }, [vseed, dark])

  return <div ref={ref} style={{ height: 300, width: '100%' }}></div>
}

export default Demo
```
