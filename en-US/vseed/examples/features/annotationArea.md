# AnnotationArea

## bar

bar

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
    annotationArea: {
      selector: ['2021'],
      text: 'Region',
      textPosition: 'topRight',
      textAlign: 'right',
    },
    dimensions: [
      {
        id: 'date',
        alias: 'Date',
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
      {
        id: 'count',
        alias: 'Quantity',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## column

column

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
    annotationArea: {
      selector: ['2021'],
      text: 'Region',
    },
    dimensions: [
      {
        id: 'date',
        alias: 'Date',
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
      {
        id: 'count',
        alias: 'Quantity',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## line

line

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'line',
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
    annotationArea: {
      selector: ['2021'],
      text: 'Region',
    },
    dimensions: [
      {
        id: 'date',
        alias: 'Date',
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
      {
        id: 'count',
        alias: 'Quantity',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```
