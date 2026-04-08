# dimensions

import { registerDemoConnector } from '@components'

{registerDemoConnector()}

## add-date-dimension-year

添加按年聚合的日期维度

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
          limit: 20,
        },
        connectorId: DEMO_CONNECTOR_ID,
      })
      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.dimensions.add('order_date', (node) => {
          node.setAlias('订单日期')
        })
        const dimensionId = builder.dimensions.find((node) => node.getField() === 'order_date')?.getId()
        if (dimensionId) {
          builder.dimensions.update(dimensionId, (node) => {
            node.setAlias('年份').setAggregate({ func: 'toYear' })
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

## add-dimension

添加维度

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
        builder.dimensions.add('product_type', (node) => {
          node.setAlias('商品类型')
        })
        const dimensionId = builder.dimensions.find((node) => node.getField() === 'product_type')?.getId()
        if (dimensionId) {
          builder.dimensions.update(dimensionId, (node) => {
            node.setAlias('产品类型')
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

## add-multiple-dimensions

添加多个维度（链式调用）

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
        builder.dimensions.add('product_type', (n) => n.setAlias('产品类型')).add('province', (n) => n.setAlias('省份'))
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

## mixed-date-and-normal-dimensions

普通维度与按季度聚合的日期维度混合分组

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
          limit: 20,
        },
        connectorId: DEMO_CONNECTOR_ID,
      })
      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.dimensions
          .add('area', (node) => {
            node.setAlias('区域')
          })
          .add('order_date', (node) => {
            node.setAlias('季度').setAggregate({ func: 'toQuarter' })
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

## remove-dimension

删除维度

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
              alias: '产品类型',
            },
            {
              field: 'province',
              alias: '省份',
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
        const dimensionId = builder.dimensions.toJSON().find((item) => item.field === 'product_type')?.id
        if (dimensionId) {
          builder.dimensions.update(dimensionId, (node) => {
            node.setAlias('待删除的产品类型')
          })
          builder.dimensions.remove(dimensionId)
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

## update-date-dimension-month

将已有日期维度更新为按月聚合

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
              field: 'order_date',
              alias: '原订单日期',
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
          limit: 20,
        },
        connectorId: DEMO_CONNECTOR_ID,
      })
      const applyBuilder = (builder: VBIChartBuilder) => {
        const dimensionId = builder.dimensions.toJSON().find((item) => item.field === 'order_date')?.id
        if (dimensionId) {
          const dimension = builder.dimensions.find((node) => node.getId() === dimensionId)
          if (dimension) {
            dimension.setAlias('待调整的订单日期')
          }
          builder.dimensions.update(dimensionId, (node) => {
            node.setAlias('月份').setAggregate({ func: 'toMonth' })
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

## update-dimension

更新维度

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
              alias: '原产品类型',
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
        const dimensionId = builder.dimensions.toJSON().find((item) => item.field === 'product_type')?.id
        if (dimensionId) {
          const dimension = builder.dimensions.find((node) => node.getId() === dimensionId)
          if (dimension) {
            dimension.setAlias('待调整的产品类型')
          }
          builder.dimensions.update(dimensionId, (n) => n.setAlias('新产品类型'))
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
