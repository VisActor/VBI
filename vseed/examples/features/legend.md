# Legend

## border

border

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
    legend: {
      enable: true,
      border: false,
      position: 'rt',
      maxSize: 2,
    },
    dataset: [
      {
        date: '2019',
        region: 'east',
        city: 'A',
        profit: 1,
        sales: 2,
        discount: 0.5,
      },
      {
        date: '2019',
        region: 'east',
        city: 'B',
        profit: 3,
        sales: 6,
        discount: 0.5,
      },
      {
        date: '2019',
        region: 'east',
        city: 'C',
        profit: 3,
        sales: 6,
        discount: 0.5,
      },
      {
        date: '2019',
        region: 'east',
        city: 'D',
        profit: 5,
        sales: 10,
        discount: 0.5,
      },
      {
        date: '2019',
        region: 'east',
        city: 'E',
        profit: 4,
        sales: 8,
        discount: 0.5,
      },
      {
        date: '2020',
        region: 'north of east',
        city: 'A',
        profit: 1,
        sales: 2,
        discount: 0.5,
      },
      {
        date: '2020',
        region: 'north of east',
        city: 'B',
        profit: 3,
        sales: 6,
        discount: 0.5,
      },
      {
        date: '2020',
        region: 'north of east',
        city: 'C',
        profit: 3,
        sales: 6,
        discount: 0.5,
      },
      {
        date: '2020',
        region: 'north of east',
        city: 'D',
        profit: 5,
        sales: 10,
        discount: 0.5,
      },
      {
        date: '2020',
        region: 'north of east',
        city: 'E',
        profit: 4,
        sales: 8,
        discount: 0.5,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## enable

enable

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
    legend: {
      enable: false,
    },
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

## labelColor

labelColor

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
    legend: {
      enable: true,
      position: 'rt',
      labelFontSize: 12,
      labelColor: '#000',
      labelFontWeight: 'bold',
    },
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

## labelFontSize

labelFontSize

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
    legend: {
      enable: true,
      position: 'rt',
      labelFontSize: 12,
      labelColor: '#000',
      labelFontWeight: 'bold',
    },
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

## labelFontWeight

labelFontWeight

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
    legend: {
      enable: true,
      position: 'rt',
      labelFontSize: 12,
      labelColor: '#000',
      labelFontWeight: 'bold',
    },
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

## maxSize

maxSize

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
    legend: {
      enable: true,
      position: 'rt',
      maxSize: 2,
    },
    dataset: [
      {
        date: '2019',
        region: 'east',
        city: 'A',
        profit: 1,
        sales: 2,
        discount: 0.5,
      },
      {
        date: '2019',
        region: 'east',
        city: 'B',
        profit: 3,
        sales: 6,
        discount: 0.5,
      },
      {
        date: '2019',
        region: 'east',
        city: 'C',
        profit: 3,
        sales: 6,
        discount: 0.5,
      },
      {
        date: '2019',
        region: 'east',
        city: 'D',
        profit: 5,
        sales: 10,
        discount: 0.5,
      },
      {
        date: '2019',
        region: 'east',
        city: 'E',
        profit: 4,
        sales: 8,
        discount: 0.5,
      },
      {
        date: '2020',
        region: 'north of east',
        city: 'A',
        profit: 1,
        sales: 2,
        discount: 0.5,
      },
      {
        date: '2020',
        region: 'north of east',
        city: 'B',
        profit: 3,
        sales: 6,
        discount: 0.5,
      },
      {
        date: '2020',
        region: 'north of east',
        city: 'C',
        profit: 3,
        sales: 6,
        discount: 0.5,
      },
      {
        date: '2020',
        region: 'north of east',
        city: 'D',
        profit: 5,
        sales: 10,
        discount: 0.5,
      },
      {
        date: '2020',
        region: 'north of east',
        city: 'E',
        profit: 4,
        sales: 8,
        discount: 0.5,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## position

position

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'columnParallel',
    legend: {
      enable: true,
      position: 'bl',
    },
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
