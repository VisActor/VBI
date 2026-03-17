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
        利润: 'yellow',
        E: 'green',
        'E-销售额': 'red',
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
        alias: '日期',
      },
      {
        id: 'type',
        alias: '类型',
      },
    ],
    measures: [
      {
        id: 'profit',
        alias: '利润',
      },
      {
        id: 'sales',
        alias: '销售额',
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
        alias: '日期',
      },
      {
        id: 'type',
        alias: '类型',
      },
    ],
    measures: [
      {
        id: 'profit',
        alias: '利润',
      },
      {
        id: 'sales',
        alias: '销售额',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```
