# Color

## colorMapping

colorMapping

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
    color: {
      colorMapping: {
        Profit: 'yellow',
        E: 'green',
        'E-Sales': 'red',
      },
    },
    dataset: [
      {
        date: '2019',
        type: 'A',
        profit: 10,
        sales: 20,
      },
      {
        date: '2019',
        type: 'B',
        profit: 30,
        sales: 60,
      },
      {
        date: '2019',
        type: 'C',
        profit: 30,
        sales: 60,
      },
      {
        date: '2019',
        type: 'D',
        profit: 50,
        sales: 100,
      },
      {
        date: '2019',
        type: 'E',
        profit: 40,
        sales: 80,
      },
      {
        date: '2020',
        type: 'A',
        profit: 10,
        sales: 20,
      },
      {
        date: '2020',
        type: 'B',
        profit: 30,
        sales: 60,
      },
      {
        date: '2020',
        type: 'C',
        profit: 30,
        sales: 60,
      },
      {
        date: '2020',
        type: 'D',
        profit: 50,
        sales: 100,
      },
      {
        date: '2020',
        type: 'E',
        profit: 40,
        sales: 80,
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
    measures: [
      {
        id: 'profit',
        alias: 'Profit',
      },
      {
        id: 'sales',
        alias: 'Sales',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## colorScheme

colorScheme

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
    color: {
      colorScheme: ['#cdb4db', '#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff'],
    },
    dataset: [
      {
        date: '2019',
        type: 'A',
        profit: 10,
        sales: 20,
      },
      {
        date: '2019',
        type: 'B',
        profit: 30,
        sales: 60,
      },
      {
        date: '2019',
        type: 'C',
        profit: 30,
        sales: 60,
      },
      {
        date: '2019',
        type: 'D',
        profit: 50,
        sales: 100,
      },
      {
        date: '2019',
        type: 'E',
        profit: 40,
        sales: 80,
      },
      {
        date: '2020',
        type: 'A',
        profit: 10,
        sales: 20,
      },
      {
        date: '2020',
        type: 'B',
        profit: 30,
        sales: 60,
      },
      {
        date: '2020',
        type: 'C',
        profit: 30,
        sales: 60,
      },
      {
        date: '2020',
        type: 'D',
        profit: 50,
        sales: 100,
      },
      {
        date: '2020',
        type: 'E',
        profit: 40,
        sales: 80,
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
    measures: [
      {
        id: 'profit',
        alias: 'Profit',
      },
      {
        id: 'sales',
        alias: 'Sales',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```
