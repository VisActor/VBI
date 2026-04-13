# report

import { registerDemoConnector } from '@components'

{registerDemoConnector()}

## basic-page

Link chart and insight resources with the report builder to generate a single-page report.

> Label: `basic`

```tsx preview
import { createVBI, VBIChartBuilder, VBIInsightBuilder, VBIReportBuilder } from '@visactor/vbi'
import { JsonRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const LocalVBI = createVBI()
      const resources = {
        charts: {
          salesChart: LocalVBI.chart.create({
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
                encoding: 'xAxis',
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
          }),
        },
        insights: {
          salesInsight: LocalVBI.insight.create({
            content: 'Sales are concentrated in East China, with Shanghai and Zhejiang contributing the most.',
            version: 0,
          }),
        },
      }
      const builder = LocalVBI.report.create({
        pages: [],
        version: 0,
      })
      const applyBuilder = (builder: VBIReportBuilder, resources: any) => {
        builder.page.add('Sales Overview', (page) => {
          page.setChartId(resources.charts.salesChart)
          page.setInsightId(resources.insights.salesInsight)
        })
      }
      applyBuilder(builder, resources)
      setResult(builder.snapshot())
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }, [])

  if (error) return <JsonRender value={{ error }} />
  if (!result) return <div>Loading...</div>

  return <JsonRender value={result} />
}
```
