# chartType

import { registerDemoConnector } from '@components'

{registerDemoConnector()}

## area-by-order-date

面积图 - 按日期销售额趋势

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
        chartType: 'area',
        dimensions: [{ field: 'order_date', alias: '订单日期' }],
        measures: [{ field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.chartType.changeChartType('line')
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

## bar-by-product-type

柱状图 - 按产品类型销售额

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
        chartType: 'bar',
        dimensions: [{ field: 'product_type', alias: '产品类型' }],
        measures: [{ field: 'sales', alias: '销售额', encoding: 'xAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.chartType.changeChartType('column')
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

## chart-type-switching

Switch between line and bar chart types

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
        chartType: 'line',
        dimensions: [{ field: 'province', alias: '省份' }],
        measures: [{ field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.chartType.changeChartType('columnParallel')
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

## column-by-area

柱形图 - 按区域销售额

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
        chartType: 'column',
        dimensions: [{ field: 'area', alias: '区域' }],
        measures: [{ field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.chartType.changeChartType('bar')
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

## donut-by-customer-type

环形图 - 按客户类型销售占比

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
        chartType: 'donut',
        dimensions: [{ field: 'customer_type', alias: '客户类型' }],
        measures: [{ field: 'sales', alias: '销售额', encoding: 'size', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.chartType.changeChartType('pie')
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

## line-by-province

折线图 - 按省份销售额趋势

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
        chartType: 'line',
        dimensions: [{ field: 'province', alias: '省份' }],
        measures: [{ field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.chartType.changeChartType('area')
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

## line-chart

折线图 - 按省份销售额趋势

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
        chartType: 'line',
        dimensions: [{ field: 'province', alias: '省份' }],
        measures: [{ field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.chartType.changeChartType('area')
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

## pie-by-area

饼图 - 按区域销售占比

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
        chartType: 'pie',
        dimensions: [{ field: 'area', alias: '区域' }],
        measures: [{ field: 'sales', alias: '销售额', encoding: 'size', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.chartType.changeChartType('donut')
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

## pie-chart-measure-encoding

饼图度量编码 - 测试 measure-encoding.ts Pie 图表类型

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
        chartType: 'pie',
        dimensions: [{ field: 'product_type', alias: '产品类型' }],
        measures: [{ field: 'sales', alias: '销售额', encoding: 'angle', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.chartType.changeChartType('pie')
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

## rose-by-city

玫瑰图 - 按城市销售额

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
        chartType: 'rose',
        dimensions: [{ field: 'city', alias: '城市' }],
        measures: [{ field: 'sales', alias: '销售额', encoding: 'size', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.chartType.changeChartType('pie')
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

## scatter-chart-measure-encoding

散点图度量编码 - 测试 measure-encoding.ts Scatter 图表类型

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
        chartType: 'scatter',
        dimensions: [],
        measures: [
          { field: 'sales', alias: '销售额', encoding: 'xAxis' },
          { field: 'profit', alias: '利润', encoding: 'yAxis' },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.chartType.changeChartType('scatter')
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

## scatter-sales-profit

散点图 - 销售额与利润关系

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
        chartType: 'scatter',
        dimensions: [],
        measures: [
          { field: 'sales', alias: '销售额', encoding: 'xAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: '利润', encoding: 'yAxis', aggregate: { func: 'sum' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.chartType.changeChartType('bar')
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
