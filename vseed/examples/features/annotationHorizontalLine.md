# AnnotationHorizontalLine

## fixed y value

fixed y value

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'area',
    dataset: [
      {
        date: '2019',
        profit: 100,
        sales: 200,
        count: 500,
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
    annotationHorizontalLine: [
      {
        yValue: 220.5,
        text: '数值 220.5',
      },
      {
        yValue: [300, 30],
        text: '参考线',
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

## selector

selector

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'line',
    dataset: [
      {
        date: '2019',
        profit: 100,
        sales: 200,
        count: 500,
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
    annotationHorizontalLine: {
      selector: 200,
      text: '销售额最大值',
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
