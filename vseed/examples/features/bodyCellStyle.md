# BodyCellStyle

## 表格条件样式 - 多个条件

表格条件样式 - 多个条件

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'table',
    dataset: [
      {
        date: '2019',
        type: 'A',
        goalProfit: 10,
        profit: 10,
        sales: 100,
        leftCount: 1,
        salesCount: 100,
      },
      {
        date: '2020',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 320,
        leftCount: 2,
        salesCount: 200,
      },
      {
        date: '2021',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 300,
        leftCount: 3,
        salesCount: 300,
      },
      {
        date: '2022',
        type: 'A',
        goalProfit: 50,
        profit: 50,
        sales: 240,
        leftCount: 4,
        salesCount: 400,
      },
      {
        date: '2023',
        type: 'A',
        goalProfit: 40,
        profit: 40,
        sales: 500,
        leftCount: 5,
        salesCount: 500,
      },
    ],
    bodyCellStyle: [
      {
        backgroundColor: 'pink',
      },
      {
        selector: {
          type: 'A',
        },
        backgroundColor: 'red',
      },
      {
        selector: {
          field: 'sales',
          operator: 'between',
          value: [200, 400],
        },
        backgroundColor: '#e6fcf5',
        textColor: '#0b7285',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 表格条件样式 - 根据度量值设置

表格条件样式 - 根据度量值设置

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'table',
    dataset: [
      {
        date: '2019',
        type: 'A',
        goalProfit: 10,
        profit: 10,
        sales: 100,
        leftCount: 1,
        salesCount: 100,
      },
      {
        date: '2020',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 320,
        leftCount: 2,
        salesCount: 200,
      },
      {
        date: '2021',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 300,
        leftCount: 3,
        salesCount: 300,
      },
      {
        date: '2022',
        type: 'A',
        goalProfit: 50,
        profit: 50,
        sales: 240,
        leftCount: 4,
        salesCount: 400,
      },
      {
        date: '2023',
        type: 'A',
        goalProfit: 40,
        profit: 40,
        sales: 500,
        leftCount: 5,
        salesCount: 500,
      },
    ],
    bodyCellStyle: [
      {
        selector: {
          field: 'sales',
          operator: '>=',
          value: 300,
        },
        backgroundColor: '#fff3cd',
        textColor: '#a15c00',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 表格条件样式 - 全局样式

表格条件样式 - 全局样式

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'table',
    dataset: [
      {
        date: '2019',
        type: 'A',
        goalProfit: 10,
        profit: 10,
        sales: 100,
        leftCount: 1,
        salesCount: 100,
      },
      {
        date: '2020',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 320,
        leftCount: 2,
        salesCount: 200,
      },
      {
        date: '2021',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 300,
        leftCount: 3,
        salesCount: 300,
      },
      {
        date: '2022',
        type: 'A',
        goalProfit: 50,
        profit: 50,
        sales: 240,
        leftCount: 4,
        salesCount: 400,
      },
      {
        date: '2023',
        type: 'A',
        goalProfit: 40,
        profit: 40,
        sales: 500,
        leftCount: 5,
        salesCount: 500,
      },
    ],
    bodyCellStyle: {
      backgroundColor: '#f8f9fa',
      textColor: '#333',
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 表格条件样式

表格条件样式

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'table',
    dataset: [
      {
        date: '2019',
        type: 'A',
        goalProfit: 10,
        profit: 10,
        sales: 100,
        leftCount: 1,
        salesCount: 100,
      },
      {
        date: '2020',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 320,
        leftCount: 2,
        salesCount: 200,
      },
      {
        date: '2021',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 300,
        leftCount: 3,
        salesCount: 300,
      },
      {
        date: '2022',
        type: 'A',
        goalProfit: 50,
        profit: 50,
        sales: 240,
        leftCount: 4,
        salesCount: 400,
      },
      {
        date: '2023',
        type: 'A',
        goalProfit: 40,
        profit: 40,
        sales: 500,
        leftCount: 5,
        salesCount: 500,
      },
    ],
    bodyCellStyle: [
      {
        selector: {
          type: 'A',
        },
        backgroundColor: 'pink',
      },
      {
        selector: {
          field: 'sales',
          operator: '>=',
          value: 150,
        },
        textColor: 'red',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 透视表条件样式 - 符合条件

透视表条件样式 - 符合条件

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'pivotTable',
    dataset: [
      {
        date: '2019',
        type: 'A',
        goalProfit: 10,
        profit: 10,
        sales: 100,
        leftCount: 1,
        salesCount: 100,
      },
      {
        date: '2020',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 320,
        leftCount: 2,
        salesCount: 200,
      },
      {
        date: '2021',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 300,
        leftCount: 3,
        salesCount: 300,
      },
      {
        date: '2022',
        type: 'A',
        goalProfit: 50,
        profit: 50,
        sales: 240,
        leftCount: 4,
        salesCount: 400,
      },
      {
        date: '2023',
        type: 'A',
        goalProfit: 40,
        profit: 40,
        sales: 500,
        leftCount: 5,
        salesCount: 500,
      },
    ],
    bodyCellStyle: [
      {
        selector: {
          type: 'A',
        },
        backgroundColor: 'pink',
      },
      {
        selector: {
          field: 'date',
          operator: 'in',
          value: ['2019', '2023'],
        },
        textColor: 'green',
      },
    ],
    dimensions: [
      {
        id: 'date',
        alias: '日期',
        encoding: 'column',
      },
      {
        id: 'type',
        alias: '类型',
        encoding: 'row',
      },
    ],
    measures: [
      {
        id: 'profit',
        alias: '利润',
      },
      {
        id: 'sales',
        alias: '销售量',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 透视表条件样式 - 根据度量值设置

透视表条件样式 - 根据度量值设置

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'pivotTable',
    dataset: [
      {
        date: '2019',
        type: 'A',
        goalProfit: 10,
        profit: 10,
        sales: 100,
        leftCount: 1,
        salesCount: 100,
      },
      {
        date: '2020',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 320,
        leftCount: 2,
        salesCount: 200,
      },
      {
        date: '2021',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 300,
        leftCount: 3,
        salesCount: 300,
      },
      {
        date: '2022',
        type: 'A',
        goalProfit: 50,
        profit: 50,
        sales: 240,
        leftCount: 4,
        salesCount: 400,
      },
      {
        date: '2023',
        type: 'A',
        goalProfit: 40,
        profit: 40,
        sales: 500,
        leftCount: 5,
        salesCount: 500,
      },
    ],
    bodyCellStyle: [
      {
        selector: {
          field: 'sales',
          operator: '>=',
          value: 300,
        },
        backgroundColor: '#e3f2fd',
        textColor: '#0d47a1',
      },
    ],
    dimensions: [
      {
        id: 'date',
        alias: '日期',
        encoding: 'column',
      },
      {
        id: 'type',
        alias: '类型',
        encoding: 'row',
      },
    ],
    measures: [
      {
        id: 'profit',
        alias: '利润',
      },
      {
        id: 'sales',
        alias: '销售量',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 透视表条件样式 - 全局样式

透视表条件样式 - 全局样式

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'pivotTable',
    dataset: [
      {
        date: '2019',
        type: 'A',
        goalProfit: 10,
        profit: 10,
        sales: 100,
        leftCount: 1,
        salesCount: 100,
      },
      {
        date: '2020',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 320,
        leftCount: 2,
        salesCount: 200,
      },
      {
        date: '2021',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 300,
        leftCount: 3,
        salesCount: 300,
      },
      {
        date: '2022',
        type: 'A',
        goalProfit: 50,
        profit: 50,
        sales: 240,
        leftCount: 4,
        salesCount: 400,
      },
      {
        date: '2023',
        type: 'A',
        goalProfit: 40,
        profit: 40,
        sales: 500,
        leftCount: 5,
        salesCount: 500,
      },
    ],
    bodyCellStyle: {
      backgroundColor: '#faf0e6',
      textColor: '#4d342e',
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 透视表条件样式 - 色阶

透视表条件样式 - 色阶

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'pivotTable',
    dataset: [
      {
        date: '2019',
        type: 'A',
        goalProfit: -10,
        profit: 10,
        leftCount: 1,
        salesCount: 100,
      },
      {
        date: '2020',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 320,
        leftCount: 2,
        salesCount: 200,
      },
      {
        date: '2021',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 300,
        leftCount: 3,
        salesCount: 300,
      },
      {
        date: '2022',
        type: 'A',
        goalProfit: 50,
        profit: 50,
        sales: 240,
        leftCount: 4,
        salesCount: 400,
      },
      {
        date: '2023',
        type: 'A',
        goalProfit: 40,
        profit: 40,
        sales: 500,
        leftCount: 5,
        salesCount: 500,
      },
    ],
    bodyCellStyle: [
      {
        selector: {
          field: 'goalProfit',
        },
        enableProgressBar: true,
        barPositiveColor: 'green',
      },
      {
        selector: {
          field: 'profit',
        },
        enableBackgroundColorScale: true,
        backgroundColorScale: {
          minColor: 'rgba(210,128,128, 0.8)',
          maxColor: 'rgba(255,10,10, 0.8)',
        },
      },
      {
        selector: {
          field: 'sales',
        },
        enableBackgroundColorScale: true,
        enableProgressBar: true,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 表格条件样式 - 色阶

表格条件样式 - 色阶

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'table',
    dataset: [
      {
        date: '2019',
        type: 'A',
        goalProfit: -10,
        profit: 10,
        leftCount: 1,
        salesCount: 100,
      },
      {
        date: '2020',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 320,
        leftCount: 2,
        salesCount: 200,
      },
      {
        date: '2021',
        type: 'A',
        goalProfit: 30,
        profit: 30,
        sales: 300,
        leftCount: 3,
        salesCount: 300,
      },
      {
        date: '2022',
        type: 'A',
        goalProfit: 50,
        profit: 50,
        sales: 240,
        leftCount: 4,
        salesCount: 400,
      },
      {
        date: '2023',
        type: 'A',
        goalProfit: 40,
        profit: 40,
        sales: 500,
        leftCount: 5,
        salesCount: 500,
      },
    ],
    bodyCellStyle: [
      {
        selector: {
          field: 'goalProfit',
        },
        enableProgressBar: true,
        barPositiveColor: 'green',
      },
      {
        selector: {
          field: 'profit',
        },
        enableBackgroundColorScale: true,
        backgroundColorScale: {
          minColor: 'rgba(210,128,128, 0.8)',
          maxColor: 'rgba(255,10,10, 0.8)',
        },
      },
      {
        selector: {
          field: 'sales',
        },
        enableBackgroundColorScale: true,
        enableProgressBar: true,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 表格条件样式 - 进度条 + 总计

表格总计下，进度条展示范围

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    animation: false,
    bodyCellStyle: [
      {
        selector: {
          field: 'co_20260317135234_7152',
        },
        enableProgressBar: true,
        barPositiveColor: 'rgba(188,220,194, 0.5)',
        barNegativeColor: 'rgba(241,188,191, 0.5)',
      },
      {
        selector: {
          field: 'co_20260317135245_5701',
        },
        enableBackgroundColorScale: true,
        backgroundColorScale: {
          minColor: '#D6E4FF',
          maxColor: '#1A56CC',
        },
      },
    ],
    totals: 'sum',
    measures: [
      {
        id: 'co_20260317135234_7152',
        alias: 'amount',
        encoding: 'column',
        format: {
          auto: true,
          thousandSeparator: true,
          type: 'number',
        },
        autoFormat: true,
      },
      {
        id: 'co_20260317135245_5701',
        alias: 'profit',
        encoding: 'column',
        format: {
          auto: true,
          fractionDigits: 2,
          thousandSeparator: true,
          type: 'number',
        },
        autoFormat: true,
      },
    ],
    dimensions: [
      {
        id: 'co_20260317135518_92a3',
        alias: 'order_date',
        encoding: 'column',
        timeFormat: {
          type: 'quarter',
        },
      },
    ],
    dataset: [
      {
        co_20260317135234_7152: '1095',
        co_20260317135245_5701: '75816.47499999993',
        co_20260317135518_92a3: '2016-01-01',
      },
      {
        co_20260317135234_7152: '1597',
        co_20260317135245_5701: '79795.17700000005',
        co_20260317135518_92a3: '2016-04-01',
      },
      {
        co_20260317135234_7152: '1728',
        co_20260317135245_5701: '102451.97199999997',
        co_20260317135518_92a3: '2016-07-01',
      },
      {
        co_20260317135234_7152: '2290',
        co_20260317135245_5701: '114947.65100000004',
        co_20260317135518_92a3: '2016-10-01',
      },
      {
        co_20260317135234_7152: '1268',
        co_20260317135245_5701: '68170.42400000003',
        co_20260317135518_92a3: '2017-01-01',
      },
      {
        co_20260317135234_7152: '2044',
        co_20260317135245_5701: '134577.30300000013',
        co_20260317135518_92a3: '2017-04-01',
      },
      {
        co_20260317135234_7152: '1992',
        co_20260317135245_5701: '127990.91900000005',
        co_20260317135518_92a3: '2017-07-01',
      },
      {
        co_20260317135234_7152: '2708',
        co_20260317135245_5701: '140731.57699999987',
        co_20260317135518_92a3: '2017-10-01',
      },
      {
        co_20260317135234_7152: '1287',
        co_20260317135245_5701: '84916.25100000008',
        co_20260317135518_92a3: '2018-01-01',
      },
      {
        co_20260317135234_7152: '2448',
        co_20260317135245_5701: '145672.99599999996',
        co_20260317135518_92a3: '2018-04-01',
      },
      {
        co_20260317135234_7152: '2723',
        co_20260317135245_5701: '168042.973',
        co_20260317135518_92a3: '2018-07-01',
      },
      {
        co_20260317135234_7152: '3443',
        co_20260317135245_5701: '223310.77999999985',
        co_20260317135518_92a3: '2018-10-01',
      },
      {
        co_20260317135234_7152: '2196',
        co_20260317135245_5701: '124535.69800000005',
        co_20260317135518_92a3: '2019-01-01',
      },
      {
        co_20260317135234_7152: '3629',
        co_20260317135245_5701: '182764.69399999987',
        co_20260317135518_92a3: '2019-04-01',
      },
      {
        co_20260317135234_7152: '3232',
        co_20260317135245_5701: '195016.59100000001',
        co_20260317135518_92a3: '2019-07-01',
      },
      {
        co_20260317135234_7152: '3854',
        co_20260317135245_5701: '178797.44399999993',
        co_20260317135518_92a3: '2019-10-01',
      },
    ],
    chartType: 'table',
    theme: 'light',
    locale: 'zh-CN',
  }

  return <VSeedRender vseed={vseedConfig} />
}
```
