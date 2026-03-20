# whereFilter

import { registerDemoConnector } from '@components'

{registerDemoConnector()}

## between-sales-range-analysis

销售额区间分析：使用 between 筛选单笔 1000~10000 元的订单，按品类汇总利润

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
        dimensions: [{ field: 'product_type', alias: '品类' }],
        measures: [{ field: 'profit', alias: '利润', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIBuilder) => {
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

清空并重建过滤条件：清除旧的简单筛选，重建为包含分组的复杂条件

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
        dimensions: [{ field: 'province', alias: '省份' }],
        measures: [{ field: 'profit', alias: '利润', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: {
          id: 'root',
          op: 'and',
          conditions: [
            { id: 'f-old1', field: 'product_type', op: 'eq', value: '办公用品' },
            { id: 'f-old2', field: 'area', op: 'eq', value: '华东' },
          ],
        },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.whereFilter
          .clear()
          .add('profit', (node) => node.setOperator('>').setValue(0))
          .addGroup('or', (group) => {
            group
              .add('area', (n) => n.setOperator('eq').setValue('华东'))
              .add('area', (n) => n.setOperator('eq').setValue('华北'))
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

日期区间组合过滤：使用 period 筛选2024年Q1数据，同时用 range 限定利润区间，按品类和配送方式交叉分析

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
        dimensions: [
          { field: 'product_type', alias: '品类' },
          { field: 'delivery_method', alias: '配送方式' },
        ],
        measures: [
          { field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } },
          { field: 'profit', alias: '利润率', encoding: 'yAxis', aggregate: { func: 'avg' } },
        ],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 50,
      })

      const applyBuilder = (builder: VBIBuilder) => {
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

日期过滤与嵌套条件组合：筛选近30天内消费者或企业客户的高额订单，按省份统计销售额与利润

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
        limit: 20,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.whereFilter
          .add('order_date', (node) => {
            node.setDate({ type: 'relative', mode: 'last', amount: 30, unit: 'day' })
          })
          .add('sales', (node) => node.setOperator('>').setValue(500))
          .addGroup('or', (group) => {
            group
              .add('customer_type', (n) => n.setOperator('eq').setValue('消费者'))
              .add('customer_type', (n) => n.setOperator('in').setValue(['公司', '小型企业']))
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

多层嵌套分组：消费者当日达或企业客户一级配送的高额订单，三层 AND/OR 嵌套

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
        dimensions: [{ field: 'province', alias: '省份' }],
        measures: [{ field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.whereFilter
          .add('sales', (node) => node.setOperator('>').setValue(500))
          .addGroup('or', (outerGroup) => {
            outerGroup
              .addGroup('and', (g1) => {
                g1.add('customer_type', (n) => n.setOperator('eq').setValue('消费者')).add('delivery_method', (n) =>
                  n.setOperator('eq').setValue('当日'),
                )
              })
              .addGroup('and', (g2) => {
                g2.add('customer_type', (n) => n.setOperator('in').setValue(['公司', '小型企业'])).add(
                  'delivery_method',
                  (n) => n.setOperator('eq').setValue('一级'),
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

高折扣技术类产品利润分析：筛选技术品类且折扣大于0.5的订单，按区域对比利润

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
        measures: [{ field: 'profit', alias: '利润', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.whereFilter
          .add('product_type', (node) => node.setOperator('eq').setValue('技术'))
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

多区域配送效率对比：使用 in 筛选华东、华北、中南三大区域，按配送方式统计订单量

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
        dimensions: [{ field: 'delivery_method', alias: '配送方式' }],
        measures: [{ field: 'amount', alias: '订单量', encoding: 'xAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.whereFilter.add('area', (node) => {
          node.setOperator('in').setValue(['华东', '华北', '中南'])
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

华东区域办公用品或家具销售额：使用嵌套分组，AND 连接区域条件与 OR 品类条件

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
        dimensions: [{ field: 'city', alias: '城市' }],
        measures: [{ field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.whereFilter
          .add('area', (node) => node.setOperator('eq').setValue('华东'))
          .addGroup('or', (group) => {
            group
              .add('product_type', (node) => node.setOperator('eq').setValue('办公用品'))
              .add('product_type', (node) => node.setOperator('eq').setValue('家具'))
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
      const builder = VBI.from({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'column',
        dimensions: [{ field: 'product_type', alias: '品类' }],
        measures: [{ field: 'profit', alias: '利润', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIBuilder) => {
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
      const builder = VBI.from({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'column',
        dimensions: [{ field: 'product_type', alias: '品类' }],
        measures: [{ field: 'profit', alias: '利润', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIBuilder) => {
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

各省份办公用品销售额排名：筛选办公用品品类，按省份汇总销售额

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
        dimensions: [{ field: 'province', alias: '省份' }],
        measures: [{ field: 'sales', alias: '销售额', encoding: 'xAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.whereFilter.add('product_type', (node) => {
          node.setOperator('eq').setValue('办公用品')
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

办公用品与技术类品类对比：使用 OR 分组筛选两个品类，按区域对比销售额

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
        limit: 20,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.whereFilter.addGroup('or', (group) => {
          group
            .add('product_type', (node) => node.setOperator('eq').setValue('办公用品'))
            .add('product_type', (node) => node.setOperator('eq').setValue('技术'))
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

从分组中移除条件：预设 OR 分组含三个品类，通过 updateGroup 移除其中一个

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
        whereFilter: {
          id: 'root',
          op: 'and',
          conditions: [
            {
              id: 'g-products',
              op: 'or',
              conditions: [
                { id: 'f-office', field: 'product_type', op: 'eq', value: '办公用品' },
                { id: 'f-tech', field: 'product_type', op: 'eq', value: '技术' },
                { id: 'f-furniture', field: 'product_type', op: 'eq', value: '家具' },
              ],
            },
          ],
        },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIBuilder) => {
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

按索引移除过滤条件：移除第一个品类筛选，只保留区域条件

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
        dimensions: [{ field: 'province', alias: '省份' }],
        measures: [{ field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: {
          id: 'root',
          op: 'and',
          conditions: [
            { id: 'f-product', field: 'product_type', op: 'eq', value: '办公用品' },
            { id: 'f-area', field: 'area', op: 'in', value: ['华东', '华北', '中南'] },
          ],
        },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIBuilder) => {
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

动态修改过滤条件：将省份筛选从浙江更新为广东，观察销售额变化

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
        dimensions: [{ field: 'city', alias: '城市' }],
        measures: [{ field: 'sales', alias: '销售额', encoding: 'xAxis', aggregate: { func: 'sum' } }],
        whereFilter: {
          id: 'root',
          op: 'and',
          conditions: [
            { id: 'f-province', field: 'province', op: 'eq', value: '浙江' },
            { id: 'f-product', field: 'product_type', op: 'eq', value: '技术' },
          ],
        },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.whereFilter.update('f-province', (node) => {
          node.setValue('广东')
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

修改分组逻辑：将预设的 OR 品类分组切换为 AND，收窄筛选范围

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
        whereFilter: {
          id: 'root',
          op: 'and',
          conditions: [
            {
              id: 'g-customer',
              op: 'or',
              conditions: [
                { id: 'f-ct1', field: 'customer_type', op: 'eq', value: '公司' },
                { id: 'f-ct2', field: 'customer_type', op: 'eq', value: '消费者' },
              ],
            },
          ],
        },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 20,
      })

      const applyBuilder = (builder: VBIBuilder) => {
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
        limit: 20,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.whereFilter.add('area', (node) => {
          node.setOperator('=').setValue(['华东', '华北'])
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
        limit: 20,
      })

      const applyBuilder = (builder: VBIBuilder) => {
        builder.whereFilter.add('area', (node) => {
          node.setOperator('!=').setValue(['华东', '华北'])
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
