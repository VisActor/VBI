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
