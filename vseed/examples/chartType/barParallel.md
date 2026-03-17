# BarParallel

## Basic BarParallel

A parallel bar chart for comparing multiple measures across categories.

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

## 组合并列条形图

组合并列条形图

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'barParallel',
    measures: [
      {
        id: 'sales',
        alias: 'sales',
        parentId: 'sales-and-profit',
      },
      {
        id: 'profit',
        alias: '利润',
        parentId: 'sales-and-profit',
      },
      {
        id: 'rateOfReturn',
        alias: '回报率',
        parentId: 'ratio',
      },
    ],
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
        alias: '日期',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 透视组合并列条形图

透视组合并列条形图

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'barParallel',
    dimensions: [
      {
        id: 'category',
        alias: '类别',
      },
      {
        id: 'date',
        alias: '日期',
        encoding: 'column',
      },
      {
        id: 'region',
        alias: '区域',
        encoding: 'row',
      },
    ],
    measures: [
      {
        id: 'sales',
        alias: '销售额',
        parentId: 'group-sales',
      },
      {
        id: 'profit',
        alias: '利润',
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
