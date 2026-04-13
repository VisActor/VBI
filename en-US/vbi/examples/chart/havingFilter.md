# havingFilter

import { registerDemoConnector } from '@components'

{registerDemoConnector()}

## add-having-filter

Filter high-performing regions with sales over 1M after grouping by region

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.chart.create({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: 'Region' }],
        measures: [{ field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
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

Chain multiple Having conditions to filter regions with high sales and high profit

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.chart.create({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: 'Region' }],
        measures: [
          { field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: 'Profit', encoding: 'yAxis', aggregate: { func: 'sum' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
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

Clear all Having filter conditions to display full grouped aggregation results

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.chart.create({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: 'Region' }],
        measures: [
          { field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: 'Profit', encoding: 'yAxis', aggregate: { func: 'sum' } },
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
        locale: 'en-US',
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
      const builder = VBI.chart.create({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: 'Region' }],
        measures: [{ field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
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
      const builder = VBI.chart.create({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: 'Region' }],
        measures: [{ field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
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

Clear existing having conditions and rebuild new group filters, simulating user resetting the filter panel and reconfiguring

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.chart.create({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: 'Region' }],
        measures: [
          { field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: 'Profit', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'amount', alias: 'Quantity', encoding: 'yAxis', aggregate: { func: 'sum' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: {
          id: 'root',
          op: 'and',
          conditions: [{ id: 'old-1', field: 'sales', op: 'gt', value: 999999, aggregate: { func: 'sum' } }],
        },
        theme: 'light',
        locale: 'en-US',
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

Three-level nested grouping: OR(AND(Sales > 500K, Profit > 50K), AND(Quantity > 100, Avg Discount \< 0.3)), simulating complex business filtering

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.chart.create({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'bar',
        dimensions: [{ field: 'province', alias: 'Province' }],
        measures: [
          { field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: 'Profit', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'amount', alias: 'Quantity', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'discount', alias: 'Avg Discount', encoding: 'yAxis', aggregate: { func: 'avg' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
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

Starting from an empty DSL, use builder to assemble where/having/measures/dimensions, including having conditions combining sum and countDistinct aggregations

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.chart.create({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'line',
        dimensions: [],
        measures: [],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.chartType.changeChartType('table')
        builder.theme.setTheme('light')
        builder.locale.setLocale('en-US')
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

Initialize empty DSL, only add dimension area and measure sales via builder, and use the profit field (SUM(profit) > 100000) in having that does not appear in measures/dimensions

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.chart.create({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'line',
        dimensions: [],
        measures: [],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.chartType.changeChartType('bar')
        builder.dimensions.add('area', (n) => n.setAlias('Region'))
        builder.measures.add('sales', (n) => n.setAlias('Sales').setEncoding('yAxis').setAggregate({ func: 'sum' }))
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

Add having conditions first, then use find to locate and dynamically update thresholds and operators, simulating interactive user filter adjustment

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.chart.create({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'column',
        dimensions: [{ field: 'product_type', alias: 'Category' }],
        measures: [
          { field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: 'Profit', encoding: 'yAxis', aggregate: { func: 'sum' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
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

Append new conditions to an existing having group, simulating a user progressively refining filter rules

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.chart.create({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: 'Region' }],
        measures: [
          { field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: 'Profit', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'amount', alias: 'Quantity', encoding: 'yAxis', aggregate: { func: 'sum' } },
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
        locale: 'en-US',
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

Remove a specific condition from an existing having group, simulating a user canceling a filter

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.chart.create({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'column',
        dimensions: [{ field: 'product_type', alias: 'Category' }],
        measures: [
          { field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: 'Profit', encoding: 'yAxis', aggregate: { func: 'sum' } },
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
        locale: 'en-US',
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

Mix standalone filter conditions with OR groups: Sales > 500K AND (Profit > 100K OR Quantity >= 30)

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.chart.create({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: 'Region' }],
        measures: [
          { field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: 'Profit', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'amount', alias: 'Quantity', encoding: 'yAxis', aggregate: { func: 'sum' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
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

Group by two dimensions (category and region), filter combinations where avg discount \< 20% and total sales > 100K, analyzing high-value low-discount business

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.chart.create({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'bar',
        dimensions: [
          { field: 'product_type', alias: 'Category' },
          { field: 'area', alias: 'Region' },
        ],
        measures: [
          { field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'discount', alias: 'Avg Discount', encoding: 'yAxis', aggregate: { func: 'avg' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
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

Nested grouping: AND(Sales > 1M, OR(Profit > 200K, Quantity >= 50))

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.chart.create({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: 'Region' }],
        measures: [
          { field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: 'Profit', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'amount', alias: 'Quantity', encoding: 'yAxis', aggregate: { func: 'sum' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
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

Use OR grouping to filter regions with high sales or high profit

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.chart.create({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: 'Region' }],
        measures: [
          { field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: 'Profit', encoding: 'yAxis', aggregate: { func: 'sum' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
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

Scatter chart analysis: Group by category to filter categories with high profit rate and transaction count > 20, identifying high-quality business

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.chart.create({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'scatter',
        dimensions: [{ field: 'product_sub_type', alias: 'Sub-Category' }],
        measures: [
          { field: 'sales', alias: 'Sales', encoding: 'xAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: 'Profit', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'amount', alias: 'Quantity', encoding: 'size', aggregate: { func: 'sum' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
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

Update the logical operator of an existing Having group from AND to OR

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.chart.create({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: 'Region' }],
        measures: [
          { field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: 'Profit', encoding: 'yAxis', aggregate: { func: 'sum' } },
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
        locale: 'en-US',
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

Combined where and having filtering: first filter office products category with where, then filter provinces with sales > 50K or profit > 10K with having

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.chart.create({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'column',
        dimensions: [{ field: 'province', alias: 'Province' }],
        measures: [
          { field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: 'Profit', encoding: 'yAxis', aggregate: { func: 'sum' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.whereFilter.add('product_type', (n) => n.setOperator('=').setValue('Office Supplies'))
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

Remove redundant Having filter conditions, keeping only the profit filter

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.chart.create({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'bar',
        dimensions: [{ field: 'area', alias: 'Region' }],
        measures: [
          { field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: 'Profit', encoding: 'yAxis', aggregate: { func: 'sum' } },
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
        locale: 'en-US',
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
