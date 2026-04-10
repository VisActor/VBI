# combination

import { registerDemoConnector } from '@components'

{registerDemoConnector()}

## chart-dimension-measure

Combination Test: Set chart type, dimensions, and measures

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.createChart({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'table',
        dimensions: [],
        measures: [],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.chartType.changeChartType('bar')
        builder.dimensions.add('province', (node) => node.setAlias('Province'))
        builder.measures.add('sales', (node) =>
          node.setAlias('Sales').setEncoding('xAxis').setAggregate({ func: 'sum' }),
        )
      }
      applyBuilder(builder)

      const result = await builder.buildVSeed()
      setVSeed(result)
    }
    run()
  }, [])

  if (!vseed) return <div>Loading...</div>

  return <VSeedRender vseed={vseed} />
}
```

## column-line-combo

Column-Line Combination Chart

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.createChart({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'table',
        dimensions: [],
        measures: [],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.chartType.changeChartType('dualAxis')
        builder.dimensions.add('product_type', (node) => node.setAlias('Product Type'))
        builder.measures.add('sales', (node) =>
          node.setAlias('Sales').setEncoding('yAxis').setAggregate({ func: 'sum' }),
        )
        builder.measures.add('profit', (node) =>
          node.setAlias('Profit').setEncoding('yAxisEnd').setSeriesType('line').setAggregate({ func: 'avg' }),
        )
      }
      applyBuilder(builder)

      const result = await builder.buildVSeed()
      setVSeed(result)
    }
    run()
  }, [])

  if (!vseed) return <div>Loading...</div>

  return <VSeedRender vseed={vseed} />
}
```

## full-config

Full Configuration: chart type, dimensions, measures, limit, theme, locale

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.createChart({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'table',
        dimensions: [],
        measures: [],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.chartType.changeChartType('line')
        builder.dimensions.add('product_type', (node) => node.setAlias('Product Type'))
        builder.measures.add('sales', (node) =>
          node.setAlias('Sales').setEncoding('yAxis').setAggregate({ func: 'sum' }),
        )
        builder.limit.setLimit(50)
        builder.theme.changeTheme('dark')
        builder.locale.changeLocale('en-US')
      }
      applyBuilder(builder)

      const result = await builder.buildVSeed()
      setVSeed(result)
    }
    run()
  }, [])

  if (!vseed) return <div>Loading...</div>

  return <VSeedRender vseed={vseed} />
}
```
