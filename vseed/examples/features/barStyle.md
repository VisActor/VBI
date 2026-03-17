# BarStyle

## barStyle array

barStyle array

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'barParallel',
    dataset: [
      {
        date: '2019',
        profit: 10,
        sales: 20,
        count: 50,
      },
      {
        date: '2020',
        profit: 30,
        sales: 60,
        count: 50,
      },
      {
        date: '2021',
        profit: 30,
        sales: 60,
        count: 50,
      },
      {
        date: '2022',
        profit: 50,
        sales: 100,
        count: 50,
      },
      {
        date: '2023',
        profit: 40,
        sales: 80,
        count: 50,
      },
    ],
    barStyle: [
      {
        barColorOpacity: 0.8,
        barRadius: 10,
      },
      {
        selector: [40],
        barColor: 'lightgreen',
        barColorOpacity: 0.8,
      },
      {
        selector: [80],
        barColor: 'red',
        barColorOpacity: 0.8,
      },
    ],
    dimensions: [
      {
        id: 'date',
        alias: '日期',
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
      {
        id: 'count',
        alias: '数量',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## dimension condition

dimension condition

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
    dataset: [
      {
        date: '2019',
        profit: 10,
        sales: 20,
        count: 50,
      },
      {
        date: '2020',
        profit: 30,
        sales: 60,
        count: 50,
      },
      {
        date: '2021',
        profit: 30,
        sales: 60,
        count: 50,
      },
      {
        date: '2022',
        profit: 50,
        sales: 100,
        count: 50,
      },
      {
        date: '2023',
        profit: 40,
        sales: 80,
        count: 50,
      },
    ],
    barStyle: {
      selector: [
        {
          field: 'date',
          operator: 'in',
          value: ['2019', '2023'],
        },
      ],
      barColor: 'gray',
      barColorOpacity: 0.8,
      barBorderColor: 'gray',
      barBorderWidth: 4,
      barBorderStyle: 'dashed',
      barRadius: [8, 8, 0, 0],
    },
    dimensions: [
      {
        id: 'date',
        alias: '日期',
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
      {
        id: 'count',
        alias: '数量',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## partial datum

partial datum

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'bar',
    dataset: [
      {
        date: '2019',
        profit: 10,
        sales: 20,
        count: 50,
      },
      {
        date: '2020',
        profit: 30,
        sales: 60,
        count: 50,
      },
      {
        date: '2021',
        profit: 30,
        sales: 60,
        count: 50,
      },
      {
        date: '2022',
        profit: 50,
        sales: 100,
        count: 50,
      },
      {
        date: '2023',
        profit: 40,
        sales: 80,
        count: 50,
      },
    ],
    barStyle: {
      selector: [
        {
          sales: 60,
        },
      ],
      barColor: 'lightblue',
      barColorOpacity: 0.8,
      barBorderColor: 'lightblue',
      barBorderWidth: 4,
      barBorderStyle: 'dashed',
      barRadius: [8, 8, 0, 0],
    },
    dimensions: [
      {
        id: 'date',
        alias: '日期',
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
      {
        id: 'count',
        alias: '数量',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## value

value

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'column',
    dataset: [
      {
        date: '2019',
        profit: 10,
        sales: 20,
        count: 50,
      },
      {
        date: '2020',
        profit: 30,
        sales: 60,
        count: 50,
      },
      {
        date: '2021',
        profit: 30,
        sales: 60,
        count: 50,
      },
      {
        date: '2022',
        profit: 50,
        sales: 100,
        count: 50,
      },
      {
        date: '2023',
        profit: 40,
        sales: 80,
        count: 50,
      },
    ],
    barStyle: {
      selector: ['2019'],
      barColor: 'lightpink',
      barColorOpacity: 0.8,
      barBorderColor: 'lightpink',
      barBorderWidth: 4,
      barBorderStyle: 'dashed',
      barRadius: [8, 8, 0, 0],
    },
    dimensions: [
      {
        id: 'date',
        alias: '日期',
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
      {
        id: 'count',
        alias: '数量',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```
