# Table

## Basic Table

A basic table for displaying raw data in rows and columns.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'table',
    dataset: [
      {
        date: '2019',
        type: 'A',
        goalProfit: 10,
        profit: 10,
        sales: 100,
        leftCount: 1,
        salesCount: 100,
      },
      {
        date: '2020',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 320,
        leftCount: 2,
        salesCount: 200,
      },
      {
        date: '2021',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 300,
        leftCount: 3,
        salesCount: 300,
      },
      {
        date: '2022',
        type: 'A',
        goalProfit: 50,
        profit: 50,
        sales: 240,
        leftCount: 4,
        salesCount: 400,
      },
      {
        date: '2023',
        type: 'A',
        goalProfit: 40,
        profit: 40,
        sales: 500,
        leftCount: 5,
        salesCount: 500,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 基础表格

基础表格

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'table',
    dataset: [
      {
        date: '2019',
        type: 'A',
        goalProfit: 10,
        profit: 10,
        sales: 100,
        leftCount: 1,
        salesCount: 100,
      },
      {
        date: '2020',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 320,
        leftCount: 2,
        salesCount: 200,
      },
      {
        date: '2021',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 300,
        leftCount: 3,
        salesCount: 300,
      },
      {
        date: '2022',
        type: 'A',
        goalProfit: 50,
        profit: 50,
        sales: 240,
        leftCount: 4,
        salesCount: 400,
      },
      {
        date: '2023',
        type: 'A',
        goalProfit: 40,
        profit: 40,
        sales: 500,
        leftCount: 5,
        salesCount: 500,
      },
    ],
    measures: [
      {
        id: 'goalProfit',
        alias: '利润目标',
      },
      {
        id: 'profit',
        alias: '利润',
      },
      {
        id: 'sales',
        alias: '销售量',
      },
      {
        id: 'leftCount',
        alias: '遗留数量',
      },
      {
        id: 'salesCount',
        alias: '销售数',
      },
    ],
    dimensions: [
      {
        id: 'date',
        alias: '日期',
      },
      {
        id: 'type',
        alias: '类型',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 分组表格

分组表格

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'table',
    dataset: [
      {
        date: '2019',
        type: 'A',
        goalProfit: 10,
        profit: 10,
        sales: 100,
        leftCount: 1,
        salesCount: 100,
      },
      {
        date: '2020',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 320,
        leftCount: 2,
        salesCount: 200,
      },
      {
        date: '2021',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 300,
        leftCount: 3,
        salesCount: 300,
      },
      {
        date: '2022',
        type: 'A',
        goalProfit: 50,
        profit: 50,
        sales: 240,
        leftCount: 4,
        salesCount: 400,
      },
      {
        date: '2023',
        type: 'A',
        goalProfit: 40,
        profit: 40,
        sales: 500,
        leftCount: 5,
        salesCount: 500,
      },
    ],
    measures: [
      {
        id: 'goalProfit',
        alias: '利润目标',
      },
      {
        id: 'profit',
        alias: '利润',
      },
      {
        id: 'table',
        alias: '销售指标',
        children: [
          {
            id: 'countInfo',
            alias: '数量信息',
            children: [
              {
                id: 'leftCount',
                alias: '遗留数量',
              },
              {
                id: 'salesCount',
                alias: '销售数',
              },
            ],
          },
          {
            id: 'saleInfo',
            alias: '销售信息',
            children: [
              {
                id: 'sales',
                alias: '销售量',
              },
            ],
          },
        ],
      },
    ],
    dimensions: [
      {
        id: 'dimensionGroup',
        alias: '维度组',
        children: [
          {
            id: 'date',
            alias: '日期',
          },
          {
            id: 'type',
            alias: '类型',
          },
        ],
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Table with Sum Aggregation

A table with sum aggregation at the bottom.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'table',
    dataset: [
      {
        product: 'Product A',
        sales: 1000,
        profit: 200,
      },
      {
        product: 'Product B',
        sales: 1500,
        profit: 300,
      },
      {
        product: 'Product C',
        sales: 800,
        profit: 150,
      },
    ],
    dimensions: [
      {
        id: 'product',
        alias: '产品名称',
      },
    ],
    measures: [
      {
        id: 'sales',
        alias: '销售额',
      },
      {
        id: 'profit',
        alias: '利润',
        numFormat: {
          type: 'number',
          fractionDigits: 1,
        },
      },
    ],
    totals: 'sum',
  }

  return <VSeedRender vseed={vseedConfig} />
}
```
