# theme

import { registerDemoConnector } from '@components'

{registerDemoConnector()}

## dark-theme

Dark theme charts

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
        dimensions: [{ field: 'province', alias: 'Province' }],
        measures: [{ field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        const nextTheme = 'dark'
        if (builder.theme.getTheme() !== nextTheme) {
          builder.theme.setTheme(nextTheme)
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

## light-theme

Light theme charts

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
        dimensions: [{ field: 'province', alias: 'Province' }],
        measures: [{ field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'dark',
        locale: 'en-US',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        const nextTheme = 'light'
        if (builder.theme.getTheme() !== nextTheme) {
          builder.theme.setTheme(nextTheme)
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
