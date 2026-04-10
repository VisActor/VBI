# Dimensions

## Column Dimensions

Column Dimensions

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
    dimensions: [
      {
        id: 'category',
        alias: 'Category',
      },
      {
        id: 'date',
        alias: 'Date',
        encoding: 'column',
      },
      {
        id: 'region',
        alias: 'Region',
        encoding: 'column',
      },
    ],
    measures: [
      {
        id: 'profit',
        alias: 'Profit',
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

## Standard Dimensions

Standard Dimensions

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
    dimensions: [
      {
        id: 'category',
        alias: 'Category',
      },
      {
        id: 'date',
        alias: 'Date',
      },
      {
        id: 'region',
        alias: 'Region',
      },
    ],
    measures: [
      {
        id: 'profit',
        alias: 'Profit',
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

## Row Dimensions

Row Dimensions

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
    dimensions: [
      {
        id: 'category',
        alias: 'Category',
      },
      {
        id: 'date',
        alias: 'Date',
        encoding: 'row',
      },
      {
        id: 'region',
        alias: 'Region',
        encoding: 'row',
      },
    ],
    measures: [
      {
        id: 'profit',
        alias: 'Profit',
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

## Pivot Dimensions

Pivot Dimensions

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
    dimensions: [
      {
        id: 'category',
        alias: 'Category',
      },
      {
        id: 'date',
        alias: 'Date',
        encoding: 'column',
      },
      {
        id: 'region',
        alias: 'Region',
        encoding: 'row',
      },
    ],
    measures: [
      {
        id: 'profit',
        alias: 'Profit',
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
