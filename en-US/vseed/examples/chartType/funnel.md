# Funnel

## Basic Funnel

A funnel chart showing the progressive reduction of data through stages.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'funnel',
    dataset: [
      {
        date: '2022',
        profit: 100,
        sales: 100,
      },
      {
        date: '2023',
        profit: 80,
        sales: 80,
      },
      {
        date: '2020',
        profit: 60,
        sales: 60,
      },
      {
        date: '2021',
        profit: 40,
        sales: 40,
      },
      {
        date: '2019',
        profit: 20,
        sales: 20,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Multi-Measure Funnel Chart

Multi-Measure Funnel Chart

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'funnel',
    dataset: [
      {
        profit: 10,
        sales: 20,
        profit1: 0.1,
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
      },
      {
        id: 'profit1',
        alias: 'Return Rate',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Combined Funnel Chart

Combined Funnel Chart

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'funnel',
    dataset: [
      {
        date: '2022',
        profit: 100,
        sales: 134,
      },
      {
        date: '2023',
        profit: 80,
        sales: 90,
      },
      {
        date: '2020',
        profit: 60,
        sales: 70,
      },
      {
        date: '2021',
        profit: 40,
        sales: 60,
      },
      {
        date: '2019',
        profit: 20,
        sales: 30,
      },
    ],
    measures: [
      {
        id: 'sales',
        alias: 'Sales',
        parentId: 'left',
      },
      {
        id: 'profit',
        alias: 'Profit',
        parentId: 'right',
      },
    ],
    dimensions: [
      {
        id: 'date',
        alias: 'Date',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Pivot Combined Funnel Chart

Pivot Combined Funnel Chart

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'funnel',
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
