# Dataset

## Single Measure Single Dimension

Single Measure Single Dimension

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
    dataset: [
      {
        date: '2019',
        profit: 10,
      },
      {
        date: '2020',
        profit: 30,
      },
      {
        date: '2021',
        profit: 30,
      },
      {
        date: '2022',
        profit: 50,
      },
      {
        date: '2023',
        profit: 40,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Single Measure Multiple Dimensions

Single Measure Multiple Dimensions

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
    dataset: [
      {
        date: '2019',
        region: 'east',
        city: 'A',
        profit: 10,
      },
      {
        date: '2019',
        region: 'east',
        city: 'B',
        profit: 30,
      },
      {
        date: '2019',
        region: 'east',
        city: 'C',
        profit: 30,
      },
      {
        date: '2019',
        region: 'east',
        city: 'D',
        profit: 50,
      },
      {
        date: '2019',
        region: 'east',
        city: 'E',
        profit: 40,
      },
      {
        date: '2020',
        region: 'north of east',
        city: 'A',
        profit: 10,
      },
      {
        date: '2020',
        region: 'north of east',
        city: 'B',
        profit: 30,
      },
      {
        date: '2020',
        region: 'north of east',
        city: 'C',
        profit: 30,
      },
      {
        date: '2020',
        region: 'north of east',
        city: 'D',
        profit: 50,
      },
      {
        date: '2020',
        region: 'north of east',
        city: 'E',
        profit: 40,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Single Measure Zero Dimensions

Single Measure Zero Dimensions

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
    dataset: [
      {
        profit: 10,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Multiple Measures Single Dimension

Multiple Measures Single Dimension

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
        discount: 0.1,
      },
      {
        date: '2020',
        profit: 30,
        sales: 60,
        discount: 0.1,
      },
      {
        date: '2021',
        profit: 30,
        sales: 60,
        discount: 0.1,
      },
      {
        date: '2022',
        profit: 50,
        sales: 100,
        discount: 0.1,
      },
      {
        date: '2023',
        profit: 40,
        sales: 80,
        discount: 0.1,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Multiple Measures Multiple Dimensions

Multiple Measures Multiple Dimensions

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
    dataset: [
      {
        date: '2019',
        region: 'east',
        city: 'A',
        profit: 10,
        sales: 20,
        discount: 0.1,
      },
      {
        date: '2019',
        region: 'east',
        city: 'B',
        profit: 30,
        sales: 60,
        discount: 0.1,
      },
      {
        date: '2019',
        region: 'east',
        city: 'C',
        profit: 30,
        sales: 60,
        discount: 0.1,
      },
      {
        date: '2019',
        region: 'east',
        city: 'D',
        profit: 50,
        sales: 100,
        discount: 0.1,
      },
      {
        date: '2019',
        region: 'east',
        city: 'E',
        profit: 40,
        sales: 80,
        discount: 0.1,
      },
      {
        date: '2020',
        region: 'north of east',
        city: 'A',
        profit: 10,
        sales: 20,
        discount: 0.1,
      },
      {
        date: '2020',
        region: 'north of east',
        city: 'B',
        profit: 30,
        sales: 60,
        discount: 0.1,
      },
      {
        date: '2020',
        region: 'north of east',
        city: 'C',
        profit: 30,
        sales: 60,
        discount: 0.1,
      },
      {
        date: '2020',
        region: 'north of east',
        city: 'D',
        profit: 50,
        sales: 100,
        discount: 0.1,
      },
      {
        date: '2020',
        region: 'north of east',
        city: 'E',
        profit: 40,
        sales: 80,
        discount: 0.1,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Multiple Measures Zero Dimensions

Multiple Measures Zero Dimensions

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
    dataset: [
      {
        profit: 1,
        sales: 2,
        discount: 0.1,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Data Dimension and Measure Configuration

Data Dimension and Measure Configuration

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
    dataset: [
      {
        date: '2019',
        region: 'east',
        profit: 10,
        sales: 20,
      },
      {
        date: '2020',
        region: 'east',
        profit: 30,
        sales: 60,
      },
      {
        date: '2021',
        region: 'east',
        profit: 30,
        sales: 60,
      },
      {
        date: '2022',
        region: 'east',
        profit: 50,
        sales: 100,
      },
      {
        date: '2023',
        region: 'east',
        profit: 40,
        sales: 80,
      },
      {
        date: '2019',
        region: 'north of east',
        profit: 10,
        sales: 20,
      },
      {
        date: '2020',
        region: 'north of east',
        profit: 30,
        sales: 60,
      },
      {
        date: '2021',
        region: 'north of east',
        profit: 30,
        sales: 60,
      },
      {
        date: '2022',
        region: 'north of east',
        profit: 50,
        sales: 100,
      },
      {
        date: '2023',
        region: 'north of east',
        profit: 40,
        sales: 80,
      },
    ],
    measures: [
      {
        id: 'profit',
        alias: 'Profit',
      },
      {
        id: 'sales',
        alias: 'Sales Volume',
      },
    ],
    dimensions: [
      {
        id: 'date',
        alias: 'Date',
      },
      {
        id: 'region',
        alias: 'Region',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Automatic Selection

Automatic Selection

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
    dataset: [
      {
        date: '2019',
        region: 'east',
        profit: 10,
        sales: 20,
      },
      {
        date: '2020',
        region: 'east',
        profit: 30,
        sales: 60,
      },
      {
        date: '2021',
        region: 'east',
        profit: 30,
        sales: 60,
      },
      {
        date: '2022',
        region: 'east',
        profit: 50,
        sales: 100,
      },
      {
        date: '2023',
        region: 'east',
        profit: 40,
        sales: 80,
      },
      {
        date: '2019',
        region: 'north of east',
        profit: 10,
        sales: 20,
      },
      {
        date: '2020',
        region: 'north of east',
        profit: 30,
        sales: 60,
      },
      {
        date: '2021',
        region: 'north of east',
        profit: 30,
        sales: 60,
      },
      {
        date: '2022',
        region: 'north of east',
        profit: 50,
        sales: 100,
      },
      {
        date: '2023',
        region: 'north of east',
        profit: 40,
        sales: 80,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```
