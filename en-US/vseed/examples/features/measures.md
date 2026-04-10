# Measures

## Measure Groups

Measure Groups

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'column',
    measures: [
      {
        id: 'profit',
        alias: 'Profit',
        parentId: 'group1',
      },
      {
        id: 'sales',
        alias: 'Sales',
        parentId: 'group1',
      },
      {
        id: 'discount',
        alias: 'Discount',
        parentId: 'group2',
      },
      {
        id: 'rateOfReturn',
        alias: 'Return Rate',
      },
    ],
    dimensions: [
      {
        id: 'date',
        alias: 'Date',
      },
    ],
    dataset: [
      {
        date: '2019',
        profit: 10,
        sales: 20,
        discount: 0.5,
        rateOfReturn: 0.1,
      },
      {
        date: '2020',
        profit: 20,
        sales: 40,
        discount: 0.2,
        rateOfReturn: 0.2,
      },
      {
        date: '2021',
        profit: 30,
        sales: 60,
        discount: 0.4,
        rateOfReturn: 0.3,
      },
      {
        date: '2022',
        profit: 40,
        sales: 80,
        discount: 0.2,
        rateOfReturn: 0.4,
      },
      {
        date: '2023',
        profit: 50,
        sales: 100,
        discount: 0.05,
        rateOfReturn: 0.5,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```
