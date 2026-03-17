# Dimensions

## 列维度

列维度

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
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
        encoding: 'column',
      },
    ],
    measures: [
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
      },
      {
        date: '2019',
        region: 'east',
        category: 'Beverages',
        profit: 30,
      },
      {
        date: '2019',
        region: 'east',
        category: 'Dairy',
        profit: 30,
      },
      {
        date: '2019',
        region: 'east',
        category: 'Household',
        profit: 50,
      },
      {
        date: '2019',
        region: 'east',
        category: 'Personal',
        profit: 40,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Grocery',
        profit: 10,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Beverages',
        profit: 30,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Dairy',
        profit: 30,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Household',
        profit: 50,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Personal',
        profit: 40,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Grocery',
        profit: 10,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Beverages',
        profit: 30,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Dairy',
        profit: 30,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Household',
        profit: 50,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Personal',
        profit: 40,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Grocery',
        profit: 10,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Beverages',
        profit: 30,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Dairy',
        profit: 30,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Household',
        profit: 50,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Personal',
        profit: 40,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 普通维度

普通维度

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
    dimensions: [
      {
        id: 'category',
        alias: '类别',
      },
      {
        id: 'date',
        alias: '日期',
      },
      {
        id: 'region',
        alias: '区域',
      },
    ],
    measures: [
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
      },
      {
        date: '2019',
        region: 'east',
        category: 'Beverages',
        profit: 30,
      },
      {
        date: '2019',
        region: 'east',
        category: 'Dairy',
        profit: 30,
      },
      {
        date: '2019',
        region: 'east',
        category: 'Household',
        profit: 50,
      },
      {
        date: '2019',
        region: 'east',
        category: 'Personal',
        profit: 40,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Grocery',
        profit: 10,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Beverages',
        profit: 30,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Dairy',
        profit: 30,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Household',
        profit: 50,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Personal',
        profit: 40,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Grocery',
        profit: 10,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Beverages',
        profit: 30,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Dairy',
        profit: 30,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Household',
        profit: 50,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Personal',
        profit: 40,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Grocery',
        profit: 10,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Beverages',
        profit: 30,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Dairy',
        profit: 30,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Household',
        profit: 50,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Personal',
        profit: 40,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 透视维度

透视维度

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
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
      },
      {
        date: '2019',
        region: 'east',
        category: 'Beverages',
        profit: 30,
      },
      {
        date: '2019',
        region: 'east',
        category: 'Dairy',
        profit: 30,
      },
      {
        date: '2019',
        region: 'east',
        category: 'Household',
        profit: 50,
      },
      {
        date: '2019',
        region: 'east',
        category: 'Personal',
        profit: 40,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Grocery',
        profit: 10,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Beverages',
        profit: 30,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Dairy',
        profit: 30,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Household',
        profit: 50,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Personal',
        profit: 40,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Grocery',
        profit: 10,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Beverages',
        profit: 30,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Dairy',
        profit: 30,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Household',
        profit: 50,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Personal',
        profit: 40,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Grocery',
        profit: 10,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Beverages',
        profit: 30,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Dairy',
        profit: 30,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Household',
        profit: 50,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Personal',
        profit: 40,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 行维度

行维度

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
    dimensions: [
      {
        id: 'category',
        alias: '类别',
      },
      {
        id: 'date',
        alias: '日期',
        encoding: 'row',
      },
      {
        id: 'region',
        alias: '区域',
        encoding: 'row',
      },
    ],
    measures: [
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
      },
      {
        date: '2019',
        region: 'east',
        category: 'Beverages',
        profit: 30,
      },
      {
        date: '2019',
        region: 'east',
        category: 'Dairy',
        profit: 30,
      },
      {
        date: '2019',
        region: 'east',
        category: 'Household',
        profit: 50,
      },
      {
        date: '2019',
        region: 'east',
        category: 'Personal',
        profit: 40,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Grocery',
        profit: 10,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Beverages',
        profit: 30,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Dairy',
        profit: 30,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Household',
        profit: 50,
      },
      {
        date: '2019',
        region: 'west',
        category: 'Personal',
        profit: 40,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Grocery',
        profit: 10,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Beverages',
        profit: 30,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Dairy',
        profit: 30,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Household',
        profit: 50,
      },
      {
        date: '2020',
        region: 'east',
        category: 'Personal',
        profit: 40,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Grocery',
        profit: 10,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Beverages',
        profit: 30,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Dairy',
        profit: 30,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Household',
        profit: 50,
      },
      {
        date: '2020',
        region: 'west',
        category: 'Personal',
        profit: 40,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```
