# Radar

## Basic Radar

A radar chart for comparing multiple quantitative variables.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'radar',
    dataset: [
      {
        profit: 10,
        sales: 20,
        count: 50,
        rateOfReturn: 1,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Multi-Series Radar Chart

A radar chart with multiple data series.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'radar',
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
        alias: 'sales',
        parentId: 'sales-and-profit',
      },
      {
        id: 'profit',
        alias: 'Profit',
        parentId: 'sales-and-profit',
      },
      {
        id: 'rateOfReturn',
        alias: 'Return Rate',
        parentId: 'ratio',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Pivot Radar Chart

A radar chart with pivot table layout.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'radar',
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
      {
        date: '2021',
        region: 'east',
        category: 'Grocery',
        profit: 10,
        sales: 100,
      },
      {
        date: '2021',
        region: 'east',
        category: 'Beverages',
        profit: 30,
        sales: 3200,
      },
      {
        date: '2021',
        region: 'east',
        category: 'Dairy',
        profit: 30,
        sales: 300,
      },
      {
        date: '2021',
        region: 'east',
        category: 'Household',
        profit: 50,
        sales: 2400,
      },
      {
        date: '2021',
        region: 'east',
        category: 'Personal',
        profit: 40,
        sales: 500,
      },
      {
        date: '2021',
        region: 'west',
        category: 'Grocery',
        profit: 10,
        sales: 100,
      },
      {
        date: '2021',
        region: 'west',
        category: 'Beverages',
        profit: 30,
        sales: 3200,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```
