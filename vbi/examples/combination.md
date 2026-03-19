# combination

import { registerDemoConnector } from '@components'

{registerDemoConnector()}

## chart-dimension-measure

组合测试：设置图表类型、维度和度量

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.from({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'table',
        dimensions: [],
        measures: [],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.chartType.changeChartType('bar')
        builder.dimensions.add('province', (node) => node.setAlias('省份'))
        builder.measures.add('sales', (node) =>
          node.setAlias('销售额').setEncoding('xAxis').setAggregate({ func: 'sum' }),
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

柱线组合图

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.from({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'table',
        dimensions: [],
        measures: [],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.chartType.changeChartType('dualAxis')
        builder.dimensions.add('product_type', (node) => node.setAlias('产品类型'))
        builder.measures.add('sales', (node) =>
          node.setAlias('销售额').setEncoding('yAxis').setAggregate({ func: 'sum' }),
        )
        builder.measures.add('profit', (node) =>
          node.setAlias('利润').setEncoding('yAxisEnd').setSeriesType('line').setAggregate({ func: 'avg' }),
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

完整配置：图表类型、维度、度量、limit、theme、locale

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.from({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'table',
        dimensions: [],
        measures: [],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.chartType.changeChartType('line')
        builder.dimensions.add('product_type', (node) => node.setAlias('产品类型'))
        builder.measures.add('sales', (node) =>
          node.setAlias('销售额').setEncoding('yAxis').setAggregate({ func: 'sum' }),
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
