# Sort

## 图例自身排序

图例自身排序

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
        alias: '日期',
      },
    ],
    measures: [
      {
        id: 'count',
        alias: '数量',
      },
      {
        id: 'sales',
        alias: '销售额',
      },
      {
        id: 'profit',
        alias: '利润',
      },
    ],
    sortLegend: {
      order: 'desc',
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 指标排序

指标排序

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
        alias: '日期',
      },
    ],
    measures: [
      {
        id: 'count',
        alias: '数量',
      },
      {
        id: 'sales',
        alias: '销售额',
        parentId: 'group',
      },
      {
        id: 'profit',
        alias: '利润',
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

## 指标排序

指标排序

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
        alias: '日期',
      },
    ],
    measures: [
      {
        id: 'count',
        alias: '数量',
      },
      {
        id: 'sales',
        alias: '销售额',
        parentId: 'group',
      },
      {
        id: 'profit',
        alias: '利润',
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

## 维度排序

维度排序

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
    sortLegend: {
      order: 'desc',
      orderBy: 'date',
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 维度排序

维度排序

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
    sort: {
      order: 'desc',
      orderBy: 'date',
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 自定义排序

自定义排序

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
    sort: {
      customOrder: ['2022', '2023', '2021', '2020', '2019'],
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 自定义排序(图例Id)

自定义排序(图例Id)

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
    sortLegend: {
      customOrder: ['数量-count', '销售额-sales', '利润-profit'],
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 自定义排序(图例名称)

自定义排序(图例名称)

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
    sortLegend: {
      customOrder: ['销售额', '数量', '利润'],
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```
