# PivotTable

## Basic PivotTable

A pivot table for summarizing and analyzing large datasets.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'pivotTable',
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

## Row Dimension Pivot

Row dimension pivot.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'pivotTable',
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
        alias: 'Left Count',
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
        encoding: 'row',
      },
      {
        id: 'type',
        alias: 'Type',
        encoding: 'row',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Column Dimension Pivot

Column dimension pivot.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'pivotTable',
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
        id: 'leftCount',
        alias: 'Left Count',
      },
      {
        id: 'salesCount',
        alias: 'Sales Count',
      },
      {
        id: 'sales',
        alias: 'Sales Volume',
      },
    ],
    dimensions: [
      {
        id: 'date',
        alias: 'Date',
        encoding: 'column',
      },
      {
        id: 'type',
        alias: 'Type',
        encoding: 'column',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```
