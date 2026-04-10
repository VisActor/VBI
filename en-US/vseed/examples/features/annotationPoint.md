# AnnotationPoint

## condition

condition

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'area',
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
    annotationPoint: [
      {
        selector: [
          {
            field: 'sales',
            operator: '<=',
            value: 80,
          },
        ],
        text: 'Sales <= 80',
        textAlign: 'right',
        offsetX: -15,
      },
      {
        selector: [
          {
            field: 'date',
            operator: 'in',
            value: '2023',
          },
        ],
        text: 'Year 2023',
        textAlign: 'left',
        offsetX: 0,
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

## partial datum

partial datum

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
    annotationPoint: [
      {
        selector: [
          {
            sales: 20,
          },
        ],
        text: ['Sales', 'Min 20'],
        textAlign: 'right',
        offsetX: -15,
      },
      {
        selector: [100],
        text: ['Sales', 'Max 100'],
        textAlign: 'right',
        offsetY: 15,
        offsetX: -20,
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

## value point

value point

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
    annotationPoint: {
      selector: 10,
      text: 'Minimum',
      textFontWeight: 600,
      textBaseline: 'bottom',
      textAlign: 'center',
      textColor: '#fff',
      backgroundColor: 'gray',
      backgroundBorderRadius: 10,
      backgroundPadding: 10,
      offsetY: -5,
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
