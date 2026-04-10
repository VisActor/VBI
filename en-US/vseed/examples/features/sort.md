# Sort

## Legend Internal Sort

Legend Internal Sort

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
        count: 15,
      },
      {
        date: '2020',
        profit: 30,
        sales: 60,
        count: 33,
      },
      {
        date: '2021',
        profit: 30,
        sales: 60,
        count: 22,
      },
      {
        date: '2022',
        profit: 50,
        sales: 100,
        count: 14,
      },
      {
        date: '2023',
        profit: 40,
        sales: 80,
        count: 30,
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
        id: 'count',
        alias: 'Quantity',
      },
      {
        id: 'sales',
        alias: 'Sales',
      },
      {
        id: 'profit',
        alias: 'Profit',
      },
    ],
    sortLegend: {
      order: 'desc',
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Measure Sort

Measure Sort

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
        count: 15,
      },
      {
        date: '2020',
        profit: 30,
        sales: 60,
        count: 33,
      },
      {
        date: '2021',
        profit: 30,
        sales: 60,
        count: 22,
      },
      {
        date: '2022',
        profit: 50,
        sales: 100,
        count: 14,
      },
      {
        date: '2023',
        profit: 40,
        sales: 80,
        count: 30,
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
        id: 'count',
        alias: 'Quantity',
      },
      {
        id: 'sales',
        alias: 'Sales',
        parentId: 'group',
      },
      {
        id: 'profit',
        alias: 'Profit',
        parentId: 'group',
      },
    ],
    sortLegend: {
      order: 'desc',
      orderBy: 'sales',
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Measuressort

Measuressort

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
        count: 15,
      },
      {
        date: '2020',
        profit: 30,
        sales: 60,
        count: 33,
      },
      {
        date: '2021',
        profit: 30,
        sales: 60,
        count: 22,
      },
      {
        date: '2022',
        profit: 50,
        sales: 100,
        count: 14,
      },
      {
        date: '2023',
        profit: 40,
        sales: 80,
        count: 30,
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
        id: 'count',
        alias: 'Quantity',
      },
      {
        id: 'sales',
        alias: 'Sales',
        parentId: 'group',
      },
      {
        id: 'profit',
        alias: 'Profit',
        parentId: 'group',
      },
    ],
    sort: {
      order: 'desc',
      orderBy: 'sales',
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Dimension Sort

Dimension Sort

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
    sortLegend: {
      order: 'desc',
      orderBy: 'date',
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Dimensionssort

Dimensionssort

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
    sort: {
      order: 'desc',
      orderBy: 'date',
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Custom Sort

Custom Sort

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
    sort: {
      customOrder: ['2022', '2023', '2021', '2020', '2019'],
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Custom Sort (Legend ID)

Custom Sort (Legend ID)

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
    sortLegend: {
      customOrder: ['Quantity-count', 'Sales-sales', 'Profit-profit'],
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Custom Sort (Legend Name)

Custom Sort (Legend Name)

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
    sortLegend: {
      customOrder: ['Sales', 'Quantity', 'Profit'],
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```
