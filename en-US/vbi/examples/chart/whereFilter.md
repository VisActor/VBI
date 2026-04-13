# whereFilter

import { registerDemoConnector } from '@components'

{registerDemoConnector()}

## between-sales-range-analysis

Sales range analysis: Use 'between' to filter orders between 1000 and 10000, summarized by category profit.

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
        dimensions: [{ field: 'product_type', alias: 'Category' }],
        measures: [{ field: 'profit', alias: 'Profit', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.whereFilter.add('sales', (node) => {
          node.setOperator('between').setValue({ min: 1000, max: 10000 })
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

## clear-and-rebuild-filters

Clear and rebuild filters: Clear old simple filters and rebuild complex conditions with grouping.

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
        dimensions: [{ field: 'province', alias: 'Province' }],
        measures: [{ field: 'profit', alias: 'Profit', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: {
          id: 'root',
          op: 'and',
          conditions: [
            { id: 'f-old1', field: 'product_type', op: 'eq', value: 'Office Supplies' },
            { id: 'f-old2', field: 'area', op: 'eq', value: 'East China' },
          ],
        },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.whereFilter
          .clear()
          .add('profit', (node) => node.setOperator('>').setValue(0))
          .addGroup('or', (group) => {
            group
              .add('area', (n) => n.setOperator('eq').setValue('East China'))
              .add('area', (n) => n.setOperator('eq').setValue('North China'))
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

## date-filter-period-and-range-combo

Date range combined filter: Use 'period' to filter 2024 Q1 data, while using 'range' to limit profit range, cross-analyzed by category and shipping mode.

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
          { field: 'product_type', alias: 'Category' },
          { field: 'delivery_method', alias: 'Shipping Mode' },
        ],
        measures: [
          { field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: 'Profit Rate', encoding: 'yAxis', aggregate: { func: 'avg' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
        limit: 50,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.whereFilter
          .add('order_date', (node) => {
            node.setDate({ type: 'period', unit: 'quarter', year: 2024, quarter: 1 })
          })
          .add('profit', (node) => {
            node.setOperator('between').setValue({ min: 0, max: 5000, leftOp: '<=', rightOp: '<' })
          })
          .add('sales', (node) => node.setOperator('>=').setValue(100))
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

## date-filter-relative-with-nested-conditions

Date filter and nested conditions combo: Filter high-value orders from Consumers or Corporate customers within the last 30 days, statistics by province.

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
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.whereFilter
          .add('order_date', (node) => {
            node.setDate({ type: 'relative', mode: 'last', amount: 30, unit: 'day' })
          })
          .add('sales', (node) => node.setOperator('>').setValue(500))
          .addGroup('or', (group) => {
            group
              .add('customer_type', (n) => n.setOperator('eq').setValue('Consumer'))
              .add('customer_type', (n) => n.setOperator('in').setValue(['Corporate', 'Small Business']))
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

## deeply-nested-or-and-groups

Multi-level nested grouping: High-value orders with Same Day shipping for Consumers or First Class shipping for Corporate customers, three levels of AND/OR nesting.

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
        dimensions: [{ field: 'province', alias: 'Province' }],
        measures: [{ field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.whereFilter
          .add('sales', (node) => node.setOperator('>').setValue(500))
          .addGroup('or', (outerGroup) => {
            outerGroup
              .addGroup('and', (g1) => {
                g1.add('customer_type', (n) => n.setOperator('eq').setValue('Consumer')).add('delivery_method', (n) =>
                  n.setOperator('eq').setValue('Same Day'),
                )
              })
              .addGroup('and', (g2) => {
                g2.add('customer_type', (n) => n.setOperator('in').setValue(['Corporate', 'Small Business'])).add(
                  'delivery_method',
                  (n) => n.setOperator('eq').setValue('First Class'),
                )
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

## high-discount-tech-profit-analysis

High discount Technology product profit analysis: Filter technology category orders with discount > 0.5, comparing profit by region.

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
        dimensions: [{ field: 'area', alias: 'Region' }],
        measures: [{ field: 'profit', alias: 'Profit', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.whereFilter
          .add('product_type', (node) => node.setOperator('eq').setValue('Technology'))
          .add('discount', (node) => node.setOperator('>').setValue(0.5))
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

## in-operator-multi-area-delivery

Multi-region shipping efficiency comparison: Use 'in' to filter East China, North China, and Central South regions, statistics by shipping mode.

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
        dimensions: [{ field: 'delivery_method', alias: 'Shipping Mode' }],
        measures: [{ field: 'amount', alias: 'Order Count', encoding: 'xAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.whereFilter.add('area', (node) => {
          node.setOperator('in').setValue(['East China', 'North China', 'Central South'])
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

## nested-group-region-product-filter

Office Supplies or Furniture sales in East China: Use nested grouping, AND connecting region condition and OR category conditions.

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
        dimensions: [{ field: 'city', alias: 'City' }],
        measures: [{ field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.whereFilter
          .add('area', (node) => node.setOperator('eq').setValue('East China'))
          .addGroup('or', (group) => {
            group
              .add('product_type', (node) => node.setOperator('eq').setValue('Office Supplies'))
              .add('product_type', (node) => node.setOperator('eq').setValue('Furniture'))
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

## not-between-sales-range

Not between filter: exclude sales between 1000~10000

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
        dimensions: [{ field: 'product_type', alias: 'Category' }],
        measures: [{ field: 'profit', alias: 'Profit', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.whereFilter.add('sales', (node) => {
          node.setOperator('not between').setValue({ min: 1000, max: 10000 })
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

## not-between-with-explicit-operators

Not between filter with explicit leftOp/rightOp to test invert functions

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
        dimensions: [{ field: 'product_type', alias: 'Category' }],
        measures: [{ field: 'profit', alias: 'Profit', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.whereFilter.add('sales', (node) => {
          node.setOperator('not between').setValue({ min: 1000, max: 10000, leftOp: '<', rightOp: '<' })
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

## office-supplies-sales-by-province

Office Supplies sales ranking by province: Filter Office Supplies category, summarized by province sales.

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
        dimensions: [{ field: 'province', alias: 'Province' }],
        measures: [{ field: 'sales', alias: 'Sales', encoding: 'xAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.whereFilter.add('product_type', (node) => {
          node.setOperator('eq').setValue('Office Supplies')
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

## or-group-product-category-comparison

Office Supplies vs. Technology category comparison: Use OR grouping to filter two categories, comparing sales by region.

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
        builder.whereFilter.addGroup('or', (group) => {
          group
            .add('product_type', (node) => node.setOperator('eq').setValue('Office Supplies'))
            .add('product_type', (node) => node.setOperator('eq').setValue('Technology'))
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

## remove-condition-from-group

Remove condition from group: Pre-defined OR group with three categories, remove one via updateGroup.

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
        dimensions: [{ field: 'area', alias: 'Region' }],
        measures: [{ field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: {
          id: 'root',
          op: 'and',
          conditions: [
            {
              id: 'g-products',
              op: 'or',
              conditions: [
                { id: 'f-office', field: 'product_type', op: 'eq', value: 'Office Supplies' },
                { id: 'f-tech', field: 'product_type', op: 'eq', value: 'Technology' },
                { id: 'f-furniture', field: 'product_type', op: 'eq', value: 'Furniture' },
              ],
            },
          ],
        },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.whereFilter.updateGroup('g-products', (group) => {
          group.remove('f-furniture')
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

## remove-filter-by-index

Remove filter by index: Remove the first category filter, keeping only the region condition.

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
        dimensions: [{ field: 'province', alias: 'Province' }],
        measures: [{ field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: {
          id: 'root',
          op: 'and',
          conditions: [
            { id: 'f-product', field: 'product_type', op: 'eq', value: 'Office Supplies' },
            { id: 'f-area', field: 'area', op: 'in', value: ['East China', 'North China', 'Central South'] },
          ],
        },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.whereFilter.remove(0)
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

## update-filter-switch-province

Animated filter modification: Update province filter from Zhejiang to Guangdong, observing sales changes.

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
        dimensions: [{ field: 'city', alias: 'City' }],
        measures: [{ field: 'sales', alias: 'Sales', encoding: 'xAxis', aggregate: { func: 'sum' } }],
        whereFilter: {
          id: 'root',
          op: 'and',
          conditions: [
            { id: 'f-province', field: 'province', op: 'eq', value: 'Zhejiang' },
            { id: 'f-product', field: 'product_type', op: 'eq', value: 'Technology' },
          ],
        },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.whereFilter.update('f-province', (node) => {
          node.setValue('Guangdong')
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

## update-group-or-to-and

Modify group logic: Switch pre-defined OR category group to AND, narrowing the filter scope.

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
        dimensions: [{ field: 'area', alias: 'Region' }],
        measures: [{ field: 'sales', alias: 'Sales', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: {
          id: 'root',
          op: 'and',
          conditions: [
            {
              id: 'g-customer',
              op: 'or',
              conditions: [
                { id: 'f-ct1', field: 'customer_type', op: 'eq', value: 'Corporate' },
                { id: 'f-ct2', field: 'customer_type', op: 'eq', value: 'Consumer' },
              ],
            },
          ],
        },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'en-US',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.whereFilter.updateGroup('g-customer', (group) => {
          group.setOperator('and')
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

## where-filter-array-value-converts-to-in

Where filter with array value using '=' operator should convert to 'in'

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
        builder.whereFilter.add('area', (node) => {
          node.setOperator('=').setValue(['East China', 'North China'])
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

## where-filter-array-value-converts-to-not-in

Where filter with array value using '!=' operator should convert to 'not in'

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
        builder.whereFilter.add('area', (node) => {
          node.setOperator('!=').setValue(['East China', 'North China'])
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
