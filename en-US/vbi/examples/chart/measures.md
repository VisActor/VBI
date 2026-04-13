# measures

import { registerDemoConnector } from '@components'

{registerDemoConnector()}

## add-measure

Add measure

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
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.measures.add('sales', (node) => {
          node.setAlias('Original Sales')
        })
        const measureId = builder.measures.find((node) => node.getField() === 'sales')?.getId()
        if (measureId) {
          builder.measures.update(measureId, (node) => {
            node.setAlias('Sales').setAggregate({ func: 'sum' })
          })
        }
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

## add-measure-encoding

Add measure and set encoding

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
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.measures.add('sales', (n) => n.setAlias('Sales'))
        const measureId = builder.measures.find((node) => node.getField() === 'sales')?.getId()
        if (measureId) {
          builder.measures.update(measureId, (n) => n.setEncoding('yAxis').setAggregate({ func: 'sum' }))
        }
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

## measure-with-custom-and-auto-format

Measure formatting: Sales uses 10K (10,000) custom format (¥ prefix, 2 decimal places), profit growth uses auto formatting, and discount uses percentage format.

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
        dimensions: [{ field: 'product_type', alias: 'Category' }],
        measures: [],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.measures
          .add('sales', (node) => {
            node.setAlias('Sales (10K)').setAggregate({ func: 'sum' }).setEncoding('column').setFormat({
              type: 'number',
              ratio: 10000,
              symbol: '10K',
              prefix: '¥',
              fractionDigits: 2,
            })
          })
          .add('profit', (node) => {
            node.setAlias('Profit').setAggregate({ func: 'sum' }).setEncoding('column').setFormat({ autoFormat: true })
          })
          .add('discount', (node) => {
            node.setAlias('Avg Discount').setAggregate({ func: 'avg' }).setEncoding('column').setFormat({
              type: 'percent',
              fractionDigits: 1,
            })
          })
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

## remove-measure

Remove measure

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
        measures: [
          { field: 'sales', alias: 'Sales', aggregate: { func: 'sum' }, encoding: 'yAxis' },
          { field: 'profit', alias: 'Profit', aggregate: { func: 'sum' }, encoding: 'yAxis' },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        const measureId = builder.measures.toJSON().find((item) => item.field === 'sales')?.id
        if (measureId) {
          builder.measures.update(measureId, (n) => n.setAlias('Sales to be removed'))
          builder.measures.remove(measureId)
        }
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

## update-measure

Update measure

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
        measures: [{ field: 'sales', alias: 'Original Sales', aggregate: { func: 'sum' }, encoding: 'yAxis' }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        const measureId = builder.measures.toJSON().find((item) => item.field === 'sales')?.id
        if (measureId) {
          const measure = builder.measures.find((node) => node.getId() === measureId)
          if (measure) {
            measure.setAlias('Sales to be adjusted').setEncoding('yAxis')
          }
          builder.measures.update(measureId, (n) => n.setAlias('New Sales').setAggregate({ func: 'avg' }))
        }
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
