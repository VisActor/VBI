# theme

import { registerDemoConnector } from '@components'

{registerDemoConnector()}

## dark-theme

深色主题图表

```tsx preview
import { VBI, VBIChartBuilder } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.createChart({
        ...{
          connectorId: 'demoSupermarket',
          chartType: 'table',
          dimensions: [
            {
              field: 'province',
              alias: '省份',
            },
          ],
          measures: [
            {
              field: 'sales',
              alias: '销售额',
              encoding: 'yAxis',
              aggregate: {
                func: 'sum',
              },
            },
          ],
          whereFilter: {
            id: 'root',
            op: 'and',
            conditions: [],
          },
          havingFilter: {
            id: 'root',
            op: 'and',
            conditions: [],
          },
          theme: 'light',
          locale: 'zh-CN',
          version: 1,
          limit: 10,
        },
        connectorId: DEMO_CONNECTOR_ID,
      })
      const applyBuilder = (builder: VBIChartBuilder) => {
        const nextTheme = 'dark'
        if (builder.theme.getTheme() !== nextTheme) {
          builder.theme.setTheme(nextTheme)
        }
      }
      applyBuilder(builder)
      setResult(await builder.buildVSeed())
    }
    run()
  }, [])

  if (!result) return <div>Loading...</div>

  return <VSeedRender vseed={result} />
}
```

## light-theme

浅色主题图表

```tsx preview
import { VBI, VBIChartBuilder } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.createChart({
        ...{
          connectorId: 'demoSupermarket',
          chartType: 'table',
          dimensions: [
            {
              field: 'province',
              alias: '省份',
            },
          ],
          measures: [
            {
              field: 'sales',
              alias: '销售额',
              encoding: 'yAxis',
              aggregate: {
                func: 'sum',
              },
            },
          ],
          whereFilter: {
            id: 'root',
            op: 'and',
            conditions: [],
          },
          havingFilter: {
            id: 'root',
            op: 'and',
            conditions: [],
          },
          theme: 'dark',
          locale: 'zh-CN',
          version: 1,
          limit: 10,
        },
        connectorId: DEMO_CONNECTOR_ID,
      })
      const applyBuilder = (builder: VBIChartBuilder) => {
        const nextTheme = 'light'
        if (builder.theme.getTheme() !== nextTheme) {
          builder.theme.setTheme(nextTheme)
        }
      }
      applyBuilder(builder)
      setResult(await builder.buildVSeed())
    }
    run()
  }, [])

  if (!result) return <div>Loading...</div>

  return <VSeedRender vseed={result} />
}
```
