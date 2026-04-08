# measures

import { registerDemoConnector } from '@components'

{registerDemoConnector()}

## add-measure

添加度量

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
          dimensions: [],
          measures: [],
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
          limit: 20,
        },
        connectorId: DEMO_CONNECTOR_ID,
      })
      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.measures.add('sales', (node) => {
          node.setAlias('原销售额')
        })
        const measureId = builder.measures.find((node) => node.getField() === 'sales')?.getId()
        if (measureId) {
          builder.measures.update(measureId, (node) => {
            node.setAlias('销售额').setAggregate({ func: 'sum' })
          })
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

## add-measure-encoding

添加度量并设置编码

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
          dimensions: [],
          measures: [],
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
          limit: 20,
        },
        connectorId: DEMO_CONNECTOR_ID,
      })
      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.measures.add('sales', (n) => n.setAlias('销售额'))
        const measureId = builder.measures.find((node) => node.getField() === 'sales')?.getId()
        if (measureId) {
          builder.measures.update(measureId, (n) => n.setEncoding('yAxis').setAggregate({ func: 'sum' }))
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

## measure-with-custom-and-auto-format

度量格式化：销售额使用万元自定义格式（¥前缀、保留2位小数），利润率使用自动格式化，折扣使用百分比格式

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
              field: 'product_type',
              alias: '品类',
            },
          ],
          measures: [],
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
          limit: 20,
        },
        connectorId: DEMO_CONNECTOR_ID,
      })
      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.measures
          .add('sales', (node) => {
            node.setAlias('销售额（万元）').setAggregate({ func: 'sum' }).setEncoding('column').setFormat({
              type: 'number',
              ratio: 10000,
              symbol: '万',
              prefix: '¥',
              fractionDigits: 2,
            })
          })
          .add('profit', (node) => {
            node.setAlias('利润').setAggregate({ func: 'sum' }).setEncoding('column').setFormat({ autoFormat: true })
          })
          .add('discount', (node) => {
            node.setAlias('平均折扣').setAggregate({ func: 'avg' }).setEncoding('column').setFormat({
              type: 'percent',
              fractionDigits: 1,
            })
          })
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

## remove-measure

删除度量

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
          dimensions: [],
          measures: [
            {
              field: 'sales',
              alias: '销售额',
              aggregate: {
                func: 'sum',
              },
              encoding: 'yAxis',
            },
            {
              field: 'profit',
              alias: '利润',
              aggregate: {
                func: 'sum',
              },
              encoding: 'yAxis',
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
          limit: 20,
        },
        connectorId: DEMO_CONNECTOR_ID,
      })
      const applyBuilder = (builder: VBIChartBuilder) => {
        const measureId = builder.measures.toJSON().find((item) => item.field === 'sales')?.id
        if (measureId) {
          builder.measures.update(measureId, (n) => n.setAlias('待移除的销售额'))
          builder.measures.remove(measureId)
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

## update-measure

更新度量

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
          dimensions: [],
          measures: [
            {
              field: 'sales',
              alias: '原销售额',
              aggregate: {
                func: 'sum',
              },
              encoding: 'yAxis',
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
          limit: 20,
        },
        connectorId: DEMO_CONNECTOR_ID,
      })
      const applyBuilder = (builder: VBIChartBuilder) => {
        const measureId = builder.measures.toJSON().find((item) => item.field === 'sales')?.id
        if (measureId) {
          const measure = builder.measures.find((node) => node.getId() === measureId)
          if (measure) {
            measure.setAlias('待调整销售额').setEncoding('yAxis')
          }
          builder.measures.update(measureId, (n) => n.setAlias('新销售额').setAggregate({ func: 'avg' }))
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
