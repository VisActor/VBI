# locale

import { registerDemoConnector } from '@components'

{registerDemoConnector()}

## en-US-locale

英文 locale 测试

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
          chartType: 'bar',
          dimensions: [
            {
              field: 'province',
              alias: 'Province',
            },
          ],
          measures: [
            {
              field: 'sales',
              alias: 'Sales',
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
          locale: 'en-US',
          version: 1,
          limit: 10,
        },
        connectorId: DEMO_CONNECTOR_ID,
      })
      const applyBuilder = (builder: VBIChartBuilder) => {
        const nextLocale = 'en-US'
        if (builder.locale.getLocale() !== nextLocale) {
          builder.locale.setLocale(nextLocale)
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

## zh-CN-locale

中文 locale 测试

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
          chartType: 'bar',
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
        const nextLocale = 'zh-CN'
        if (builder.locale.getLocale() !== nextLocale) {
          builder.locale.setLocale(nextLocale)
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
