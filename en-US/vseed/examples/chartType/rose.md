# Rose

## Basic Rose

A nightingale rose chart (polar area chart) for cyclic data.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'rose',
    dataset: [
      {
        date: '2023',
        profit: 40,
      },
      {
        date: '2022',
        profit: 50,
      },
      {
        date: '2021',
        profit: 25,
      },
      {
        date: '2020',
        profit: 30,
      },
      {
        date: '2019',
        profit: 10,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Rose Chart (Zero Dimensions)

A rose chart without any dimension fields.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'rose',
    dataset: [
      {
        profit: 40,
        sales: 100,
        goalSales: 200,
        count: 20,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Stacked Rose Chart

A stacked rose chart for comparing multiple measures across different categories.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'rose',
    dataset: [
      {
        date: '2019',
        profit: 10,
        sales: 20,
        rateOfReturn: 0.1,
      },
      {
        date: '2020',
        profit: 20,
        sales: 40,
        rateOfReturn: 0.2,
      },
      {
        date: '2021',
        profit: 30,
        sales: 60,
        rateOfReturn: 0.3,
      },
      {
        date: '2022',
        profit: 40,
        sales: 80,
        rateOfReturn: 0.4,
      },
      {
        date: '2023',
        profit: 50,
        sales: 100,
        rateOfReturn: 0.5,
      },
    ],
    dimensions: [
      {
        id: 'date',
        alias: 'Date',
      },
    ],
    measures: [
      {
        id: 'sales',
        alias: 'Sales',
        parentId: 'salesAndProfit',
        location: 'measure',
      },
      {
        id: 'profit',
        alias: 'Profit',
        parentId: 'salesAndProfit',
        location: 'measure',
      },
      {
        id: 'rateOfReturn',
        alias: 'Return Rate',
        parentId: 'ratio',
        location: 'measure',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Pivot Stacked Rose Chart

A stacked rose chart with pivot table layout.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'rose',
    dimensions: [
      {
        id: 'category',
        alias: 'Category',
      },
      {
        id: 'date',
        alias: 'Date',
        encoding: 'column',
      },
      {
        id: 'region',
        alias: 'Region',
        encoding: 'row',
      },
    ],
    measures: [
      {
        id: 'sales',
        alias: 'Sales',
        parentId: 'group-sales',
      },
      {
        id: 'profit',
        alias: 'Profit',
      },
    ],
    dataset: [
      {
        date: '2019',
        region: 'east',
        category: 'Grocery',
        profit: 10,
        sales: 100,
      },
      {
        date: '2019',
        region: 'east',
        category: 'Beverages',
        profit: 30,
        sales: 3200,
      },
      {
        date: '2019',
        region: 'east',
        category: 'Dairy',
        profit: 30,
        sales: 300,
      },
      {
        date: '2019',
        region: 'east',
        category: 'Household',
        profit: 50,
        sales: 2400,
      },
      {
        date: '2019',
        region: 'east',
        category: 'Personal',
        profit: 40,
        sales: 500,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Grocery',
        profit: 10,
        sales: 100,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Beverages',
        profit: 30,
        sales: 3200,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Dairy',
        profit: 30,
        sales: 300,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Household',
        profit: 50,
        sales: 2400,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Personal',
        profit: 40,
        sales: 500,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Grocery',
        profit: 10,
        sales: 100,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Beverages',
        profit: 30,
        sales: 3200,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Dairy',
        profit: 30,
        sales: 300,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Household',
        profit: 50,
        sales: 2400,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Personal',
        profit: 40,
        sales: 500,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Grocery',
        profit: 10,
        sales: 100,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Beverages',
        profit: 30,
        sales: 3200,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Dairy',
        profit: 30,
        sales: 300,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Household',
        profit: 50,
        sales: 2400,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Personal',
        profit: 40,
        sales: 500,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## stackingRose Chart

stackingRose Chart

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'rose',
    dataset: [
      {
        date: '2019',
        profit: 10,
        sales: 20,
      },
      {
        date: '2020',
        profit: 30,
        sales: 60,
      },
      {
        date: '2021',
        profit: 30,
        sales: 60,
      },
      {
        date: '2022',
        profit: 50,
        sales: 100,
      },
      {
        date: '2023',
        profit: 40,
        sales: 80,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```
