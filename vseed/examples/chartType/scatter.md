# Scatter

## Basic Scatter

A scatter plot for visualizing the relationship between two variables.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'scatter',
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
        profit: 200,
        sales: 80,
      },
    ],
    measures: [
      {
        id: 'sales',
        alias: '销售额',
        encoding: 'xAxis',
      },
      {
        id: 'profit',
        alias: '利润',
        encoding: 'yAxis',
      },
    ],
    dimensions: [
      {
        id: 'date',
        alias: '日期',
      },
    ],
    label: {
      enable: false,
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 组合散点图

组合散点图

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'scatter',
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
        profit: 200,
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
    measures: [
      {
        id: 'sales',
        alias: '销售额',
        encoding: 'xAxis',
        parentId: '0',
      },
      {
        id: 'profit',
        alias: '利润',
        encoding: 'yAxis',
        parentId: '0',
      },
      {
        id: 'sales',
        alias: '销售额',
        encoding: 'xAxis',
        parentId: '1',
      },
      {
        id: 'rateOfReturn',
        alias: '回报率',
        encoding: 'yAxis',
        parentId: '1',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 透视组合散点图

透视组合散点图

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'scatter',
    dimensions: [
      {
        id: 'category',
        alias: '类别',
        encoding: 'color',
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
        encoding: 'xAxis',
      },
      {
        id: 'profit',
        alias: '利润',
        encoding: 'yAxis',
      },
    ],
    label: {
      enable: false,
    },
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
        sales: 320,
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
        sales: 240,
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
        sales: 320,
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
        sales: 240,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Personal',
        profit: 200,
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
        sales: 320,
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
        sales: 240,
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
        sales: 320,
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
        sales: 200,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Personal',
        profit: 200,
        sales: 500,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```
