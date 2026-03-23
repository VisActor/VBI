# havingFilter

import { registerDemoConnector } from '@components'

{registerDemoConnector()}

## add-having-filter

按区域分组后筛选销售额超过百万的高业绩区域

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
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: '区域' }],
        measures: [{ field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.havingFilter.add('sales', (node) => {
          node.setAggregate({ func: 'sum' }).setOperator('gt').setValue(1000000)
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

## add-multiple-having-filter

链式添加多个Having条件筛选高销售额且高利润的区域

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
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: '区域' }],
        measures: [
          { field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: '利润', encoding: 'yAxis', aggregate: { func: 'sum' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.havingFilter
          .add('sales', (n) => n.setAggregate({ func: 'sum' }).setOperator('gt').setValue(1000000))
          .add('profit', (n) => n.setAggregate({ func: 'sum' }).setOperator('gt').setValue(200000))
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

## clear-having-filter

清空所有Having过滤条件，展示全量分组聚合结果

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
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: '区域' }],
        measures: [
          { field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: '利润', encoding: 'yAxis', aggregate: { func: 'sum' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: {
          id: 'root',
          op: 'and',
          conditions: [
            { id: 'having-1', field: 'sales', op: 'gt', value: 1000000, aggregate: { func: 'sum' } },
            { id: 'having-2', field: 'profit', op: 'gt', value: 200000, aggregate: { func: 'sum' } },
          ],
        },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.havingFilter.clear()
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

## having-array-value-with-in-operator

Having filter with array value that triggers 'in' operator conversion

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
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: '区域' }],
        measures: [{ field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.havingFilter.add('sales', (node) => {
          node.setOperator('=').setValue([100, 200, 300])
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

## having-array-value-with-not-in-operator

Having filter with array value that triggers 'not in' operator conversion

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
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: '区域' }],
        measures: [{ field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.havingFilter.add('sales', (node) => {
          node.setOperator('!=').setValue([100, 200])
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

## having-clear-and-rebuild

清除已有having条件后重新构建全新的分组筛选，模拟用户重置筛选面板后重新配置

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
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: '区域' }],
        measures: [
          { field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: '利润', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'amount', alias: '数量', encoding: 'yAxis', aggregate: { func: 'sum' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: {
          id: 'root',
          op: 'and',
          conditions: [{ id: 'old-1', field: 'sales', op: 'gt', value: 999999, aggregate: { func: 'sum' } }],
        },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.havingFilter.clear()
        builder.havingFilter.addGroup('and', (g) => {
          g.add('sales', (n) => n.setAggregate({ func: 'sum' }).setOperator('gte').setValue(100000))
          g.addGroup('or', (sub) => {
            sub.add('profit', (n) => n.setAggregate({ func: 'sum' }).setOperator('gt').setValue(20000))
            sub.add('amount', (n) => n.setAggregate({ func: 'sum' }).setOperator('gte').setValue(50))
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

## having-deeply-nested-groups

三层嵌套分组：OR(AND(销售额超50万, 利润超5万), AND(数量超100, 折扣均值低于0.3))，模拟复杂业务筛选

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
        chartType: 'bar',
        dimensions: [{ field: 'province', alias: '省份' }],
        measures: [
          { field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: '利润', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'amount', alias: '数量', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'discount', alias: '平均折扣', encoding: 'yAxis', aggregate: { func: 'avg' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.havingFilter.addGroup('or', (root) => {
          root.addGroup('and', (g1) => {
            g1.add('sales', (n) => n.setAggregate({ func: 'sum' }).setOperator('gt').setValue(500000))
            g1.add('profit', (n) => n.setAggregate({ func: 'sum' }).setOperator('gt').setValue(50000))
          })
          root.addGroup('and', (g2) => {
            g2.add('amount', (n) => n.setAggregate({ func: 'sum' }).setOperator('gt').setValue(100))
            g2.add('discount', (n) => n.setAggregate({ func: 'avg' }).setOperator('lt').setValue(0.3))
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

## having-empty-dsl-compose-target

从空DSL出发，通过builder拼装where/having/measures/dimensions，包含sum与countDistinct聚合的having条件组合

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
        chartType: 'line',
        dimensions: [],
        measures: [],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.chartType.changeChartType('table')
        builder.theme.setTheme('light')
        builder.locale.setLocale('zh-CN')
        builder.whereFilter.add('profit', (n) => n.setOperator('<').setValue(0))
        const whereConds = builder.whereFilter.getConditions()
        whereConds.get(0).set('id', 'c84825ed-547a-48f0-b4d9-55ebe53aab8c')
        builder.havingFilter.clear()
        builder.havingFilter.add('profit', (n) => n.setAggregate({ func: 'sum' }).setOperator('lt').setValue(-100000))
        builder.havingFilter.add('province', (n) =>
          n.setAggregate({ func: 'countDistinct' }).setOperator('gt').setValue(4),
        )
        const havingConds = builder.havingFilter.getConditions()
        havingConds.get(0).set('id', 'a6f2f16a-e0fc-4bdc-9729-bbe3a105cfca')
        havingConds.get(1).set('id', '01c004d2-4041-40ee-a18b-a18fc0cea416')
        builder.measures.add('sales', (n) => n.setAlias('sales').setEncoding('yAxis').setAggregate({ func: 'sum' }))
        builder.measures.add('country_or_region', (n) =>
          n.setAlias('country_or_region').setEncoding('yAxis').setAggregate({ func: 'count' }),
        )
        const measures = builder.dsl.get('measures')
        measures.get(0).set('id', 'a5ba6c4a-31dc-4b2c-a38f-9f23c2bbe850')
        measures.get(1).set('id', '49f3b33d-4ede-436c-8be9-a51619236916')
        builder.dimensions.add('area', (n) => n.setAlias('area'))
        const dimensions = builder.dsl.get('dimensions')
        dimensions.get(0).set('id', 'c3583433-a2cc-4234-85ff-75ae2472b674')
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

## having-field-not-in-measures-and-dimensions

初始化空DSL，仅通过builder添加维度area与指标sales，并在having中使用未出现在measures/dimensions里的profit字段（SUM(profit) > 100000）

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
        chartType: 'line',
        dimensions: [],
        measures: [],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.chartType.changeChartType('bar')
        builder.dimensions.add('area', (n) => n.setAlias('区域'))
        builder.measures.add('sales', (n) => n.setAlias('销售额').setEncoding('yAxis').setAggregate({ func: 'sum' }))
        builder.havingFilter.add('profit', (n) => n.setAggregate({ func: 'sum' }).setOperator('gt').setValue(100000))
        builder.limit.setLimit(20)
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

## having-find-and-update

先添加having条件，然后通过find查找并动态更新阈值和操作符，模拟用户交互式调整筛选条件

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
        chartType: 'column',
        dimensions: [{ field: 'product_type', alias: '品类' }],
        measures: [
          { field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: '利润', encoding: 'yAxis', aggregate: { func: 'sum' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.havingFilter
          .add('sales', (n) => n.setAggregate({ func: 'sum' }).setOperator('gt').setValue(100000))
          .add('profit', (n) => n.setAggregate({ func: 'sum' }).setOperator('gt').setValue(10000))
        const json = builder.havingFilter.toJSON().conditions
        const salesId = json[0].id
        const profitId = json[1].id
        builder.havingFilter.update(salesId, (n) => {
          n.setOperator('gte').setValue(500000)
        })
        builder.havingFilter.update(profitId, (n) => {
          n.setOperator('gte').setValue(50000)
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

## having-group-add-to-existing

向已有的having分组中追加新条件，模拟用户逐步细化筛选规则

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
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: '区域' }],
        measures: [
          { field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: '利润', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'amount', alias: '数量', encoding: 'yAxis', aggregate: { func: 'sum' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: {
          id: 'root',
          op: 'and',
          conditions: [
            {
              id: 'group-1',
              op: 'or',
              conditions: [{ id: 'cond-1', field: 'sales', op: 'gt', value: 500000, aggregate: { func: 'sum' } }],
            },
          ],
        },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.havingFilter.updateGroup('group-1', (group) => {
          group.add('profit', (n) => n.setAggregate({ func: 'sum' }).setOperator('gt').setValue(100000))
          group.add('amount', (n) => n.setAggregate({ func: 'sum' }).setOperator('gte').setValue(200))
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

## having-group-remove-condition

从已有的having分组中移除特定条件，模拟用户取消某个筛选项

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
        chartType: 'column',
        dimensions: [{ field: 'product_type', alias: '品类' }],
        measures: [
          { field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: '利润', encoding: 'yAxis', aggregate: { func: 'sum' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: {
          id: 'root',
          op: 'and',
          conditions: [
            {
              id: 'group-1',
              op: 'and',
              conditions: [
                { id: 'cond-1', field: 'sales', op: 'gt', value: 100000, aggregate: { func: 'sum' } },
                { id: 'cond-2', field: 'profit', op: 'gt', value: 10000, aggregate: { func: 'sum' } },
              ],
            },
          ],
        },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.havingFilter.updateGroup('group-1', (group) => {
          group.remove('cond-1')
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

## having-mix-filters-and-groups

混合使用独立过滤条件和OR分组：销售额超50万 AND (利润超10万 OR 数量不少于30)

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
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: '区域' }],
        measures: [
          { field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: '利润', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'amount', alias: '数量', encoding: 'yAxis', aggregate: { func: 'sum' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.havingFilter
          .add('sales', (n) => n.setAggregate({ func: 'sum' }).setOperator('gt').setValue(500000))
          .addGroup('or', (group) => {
            group.add('profit', (n) => n.setAggregate({ func: 'sum' }).setOperator('gt').setValue(100000))
            group.add('amount', (n) => n.setAggregate({ func: 'sum' }).setOperator('gte').setValue(30))
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

## having-multi-dimension-aggregate

按品类和区域双维度分组，筛选平均折扣低于20%且总销售额超过10万的组合，分析高价值低折扣业务

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
        chartType: 'bar',
        dimensions: [
          { field: 'product_type', alias: '品类' },
          { field: 'area', alias: '区域' },
        ],
        measures: [
          { field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'discount', alias: '平均折扣', encoding: 'yAxis', aggregate: { func: 'avg' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.havingFilter.addGroup('and', (g) => {
          g.add('discount', (n) => n.setAggregate({ func: 'avg' }).setOperator('lt').setValue(0.2))
          g.add('sales', (n) => n.setAggregate({ func: 'sum' }).setOperator('gt').setValue(100000))
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

## having-nested-groups

嵌套分组：AND(销售额超100万, OR(利润超20万, 数量不少于50))

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
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: '区域' }],
        measures: [
          { field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: '利润', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'amount', alias: '数量', encoding: 'yAxis', aggregate: { func: 'sum' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.havingFilter.addGroup('and', (outer) => {
          outer.add('sales', (n) => n.setAggregate({ func: 'sum' }).setOperator('gt').setValue(1000000))
          outer.addGroup('or', (inner) => {
            inner.add('profit', (n) => n.setAggregate({ func: 'sum' }).setOperator('gt').setValue(200000))
            inner.add('amount', (n) => n.setAggregate({ func: 'sum' }).setOperator('gte').setValue(50))
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

## having-or-group

使用OR分组筛选高销售额或高利润的区域

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
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: '区域' }],
        measures: [
          { field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: '利润', encoding: 'yAxis', aggregate: { func: 'sum' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.havingFilter.addGroup('or', (group) => {
          group.add('sales', (n) => n.setAggregate({ func: 'sum' }).setOperator('gt').setValue(1000000))
          group.add('profit', (n) => n.setAggregate({ func: 'sum' }).setOperator('gt').setValue(200000))
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

## having-scatter-profit-analysis

散点图分析：按品类分组筛选高利润率且交易量超20笔的品类，定位优质业务

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
        chartType: 'scatter',
        dimensions: [{ field: 'product_sub_type', alias: '子品类' }],
        measures: [
          { field: 'sales', alias: '销售额', encoding: 'xAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: '利润', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'amount', alias: '数量', encoding: 'size', aggregate: { func: 'sum' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.havingFilter.addGroup('and', (g) => {
          g.add('profit', (n) => n.setAggregate({ func: 'sum' }).setOperator('gt').setValue(0))
          g.add('amount', (n) => n.setAggregate({ func: 'sum' }).setOperator('gt').setValue(20))
          g.add('sales', (n) => n.setAggregate({ func: 'sum' }).setOperator('gt').setValue(10000))
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

## having-update-group-operator

更新已有Having分组的逻辑操作符从AND改为OR

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
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: '区域' }],
        measures: [
          { field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: '利润', encoding: 'yAxis', aggregate: { func: 'sum' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: {
          id: 'root',
          op: 'and',
          conditions: [
            {
              id: 'group-1',
              op: 'and',
              conditions: [
                { id: 'cond-1', field: 'sales', op: 'gt', value: 1000000, aggregate: { func: 'sum' } },
                { id: 'cond-2', field: 'profit', op: 'gt', value: 200000, aggregate: { func: 'sum' } },
              ],
            },
          ],
        },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.havingFilter.updateGroup('group-1', (group) => {
          group.setOperator('or')
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

## having-with-where-combined

where与having联合筛选：先按where筛选办公用品品类，再按having筛选销售额超5万或利润超1万的省份

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
        chartType: 'column',
        dimensions: [{ field: 'province', alias: '省份' }],
        measures: [
          { field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: '利润', encoding: 'yAxis', aggregate: { func: 'sum' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.whereFilter.add('product_type', (n) => n.setOperator('=').setValue('办公用品'))
        builder.havingFilter.addGroup('or', (g) => {
          g.add('sales', (n) => n.setAggregate({ func: 'sum' }).setOperator('gt').setValue(50000))
          g.add('profit', (n) => n.setAggregate({ func: 'sum' }).setOperator('gt').setValue(10000))
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

## remove-having-filter

移除多余的Having过滤条件，只保留利润筛选

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
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: '区域' }],
        measures: [
          { field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: '利润', encoding: 'yAxis', aggregate: { func: 'sum' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: {
          id: 'root',
          op: 'and',
          conditions: [
            { id: 'having-1', field: 'sales', op: 'gt', value: 1000000, aggregate: { func: 'sum' } },
            { id: 'having-2', field: 'profit', op: 'gt', value: 200000, aggregate: { func: 'sum' } },
          ],
        },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.havingFilter.remove('having-1')
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
