# report

import { registerDemoConnector } from '@components'

{registerDemoConnector()}

## basic-page

通过 report builder 关联 chart 与 insight 资源，生成单页报告

> 标签: `basic`

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
          salesChart: LocalVBI.createChart({
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
            locale: 'zh-CN',
            version: 1,
          }),
        },
        insights: {
          salesInsight: LocalVBI.createInsight({
            content: '销售额集中在华东区域，上海与浙江贡献最高。',
            version: 0,
          }),
        },
      }
      const builder = LocalVBI.createReport({
        pages: [],
        version: 0,
      })
      const applyBuilder = (builder: VBIReportBuilder, resources: any) => {
        builder.page.add('销售概览', (page) => {
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
