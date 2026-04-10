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

## Standard Table

A standard table with dimension and measure definitions.

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
        alias: 'Profit Goal',
      },
      {
        id: 'profit',
        alias: 'Profit',
      },
      {
        id: 'sales',
        alias: 'Sales Volume',
      },
      {
        id: 'leftCount',
        alias: 'Remaining Quantity',
      },
      {
        id: 'salesCount',
        alias: 'Sales Count',
      },
    ],
    dimensions: [
      {
        id: 'date',
        alias: 'Date',
      },
      {
        id: 'type',
        alias: 'Type',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Grouped Table

A table with grouped dimensions and measures for hierarchical display.

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
        alias: 'Profit Goal',
      },
      {
        id: 'profit',
        alias: 'Profit',
      },
      {
        id: 'table',
        alias: 'Sales Measures',
        children: [
          {
            id: 'countInfo',
            alias: 'Quantity Information',
            children: [
              {
                id: 'leftCount',
                alias: 'Remaining Quantity',
              },
              {
                id: 'salesCount',
                alias: 'Sales Count',
              },
            ],
          },
          {
            id: 'saleInfo',
            alias: 'Sales Information',
            children: [
              {
                id: 'sales',
                alias: 'Sales Volume',
              },
            ],
          },
        ],
      },
    ],
    dimensions: [
      {
        id: 'dimensionGroup',
        alias: 'Dimension Group',
        children: [
          {
            id: 'date',
            alias: 'Date',
          },
          {
            id: 'type',
            alias: 'Type',
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
        alias: 'Product Name',
      },
    ],
    measures: [
      {
        id: 'sales',
        alias: 'Sales',
      },
      {
        id: 'profit',
        alias: 'Profit',
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
