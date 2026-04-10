# Pivot & Combination

## Measure Grouping

Use the `parentId` property in `measures` to group measures for display.

```tsx direction=vertical playground
import { useRef, useEffect, memo } from 'react'
import VChart from '@visactor/vchart'
import { register, PivotChart, PivotChartConstructorOptions } from '@visactor/vtable'
import { registerAll, VSeed, Builder, ColorIdEncoding } from '@visactor/vseed'

register.chartModule('vchart', VChart)
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
      dimensions: [{ id: 'date', alias: 'Date' }],
      measures: [
        { id: 'profit', alias: 'Profit', parentId: 'profit-group' },
        { id: 'sales', alias: 'Sales', parentId: 'sales-group' },
      ],
    }

    const builder = Builder.from(vseed)
    const spec = builder.build()

    const tableInstance = new PivotChart(ref.current, spec)

    tableInstance.on('legend_item_click', (args) => {
      console.log('LEGEND_ITEM_CLICK', args)
      tableInstance.updateFilterRules([
        {
          filterKey: ColorIdEncoding,
          filteredValues: args.value,
        },
      ])
    })

    return () => tableInstance.release()
  })

  return <div ref={ref} style={{ height: 260, width: '100%' }}></div>
}

export default Demo
```

## Row & Column Pivot

Configure the `encoding` property on dimensions to control their row/column position in the pivot table. Dimensions are placed in rows by default; set `encoding: 'column'` to place them in columns.

```tsx direction=vertical {100-103}
import { useRef, useEffect, memo } from 'react'
import VChart from '@visactor/vchart'
import { register, PivotChart, PivotChartConstructorOptions } from '@visactor/vtable'
import { registerAll, VSeed, Builder, ColorIdEncoding } from '@visactor/vseed'

register.chartModule('vchart', VChart)
registerAll()

const Demo = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const vseed: VSeed = {
      chartType: 'column',
      dataset: [
        { date: '2019', category: 'food', profit: 10, sales: 88 },
        { date: '2019', category: 'book', profit: 33, sales: 210 },
        { date: '2019', category: 'tools', profit: 27, sales: 150 },

        { date: '2020', category: 'food', profit: 10, sales: 100 },
        { date: '2020', category: 'book', profit: 11, sales: 122 },
        { date: '2020', category: 'tools', profit: 23, sales: 150 },

        { date: '2021', category: 'food', profit: 10, sales: 100 },
        { date: '2021', category: 'book', profit: 30, sales: 190 },
        { date: '2021', category: 'tools', profit: 15, sales: 50 },
      ],
      dimensions: [
        { id: 'date', alias: 'Date' },
        { id: 'category', alias: 'Category', encoding: 'column' },
      ],
      measures: [
        { id: 'profit', alias: 'Profit', parentId: 'profit-group' },
        { id: 'sales', alias: 'Sales', parentId: 'sales-group' },
      ],
    }

    const builder = Builder.from(vseed)
    const spec = builder.build()

    const tableInstance = new PivotChart(ref.current, spec)

    tableInstance.on('legend_item_click', (args) => {
      console.log('LEGEND_ITEM_CLICK', args)
      tableInstance.updateFilterRules([
        {
          filterKey: ColorIdEncoding,
          filteredValues: args.value,
        },
      ])
    })

    return () => tableInstance.release()
  })

  return <div ref={ref} style={{ height: 260, width: '100%' }}></div>
}

export default Demo
```
