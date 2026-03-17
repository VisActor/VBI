# measures

import { registerDemoConnector } from '@components'

{registerDemoConnector()}

## add-measure

添加度量

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

添加度量并设置编码

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
        builder.measures.add('sales', (n) => n.setAlias('销售额'))
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

## remove-measure

删除度量

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
        measures: [
          { field: 'sales', alias: '销售额', aggregate: { func: 'sum' }, encoding: 'yAxis' },
          { field: 'profit', alias: '利润', aggregate: { func: 'sum' }, encoding: 'yAxis' },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        const measureId = builder.measures.toJSON().find((item) => item.field === 'sales')?.id
        if (measureId) {
          builder.measures.update(measureId, (n) => n.setAlias('待移除的销售额'))
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

更新度量

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
        measures: [{ field: 'sales', alias: '原销售额', aggregate: { func: 'sum' }, encoding: 'yAxis' }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIBuilder) => {
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

      const result = await builder.buildVSeed()
      setVSeed(result)
    }
    run()
  }, [])

  if (!vseed) return <div>Loading...</div>

  return <VSeedRender vseed={vseed} />
}
```
