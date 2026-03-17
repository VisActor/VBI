# Date

## toDay

toDay

```tsx preview
import { VQueryResultRender } from '@components'

export default () => {
  const vqueryConfig = {
    datasetId: 'vquery-demo',
    description: 'toDay',
    dataset: [
      {
        area: 'BEI JING',
        date: '2025-01-01',
        sales: 100,
      },
      {
        area: 'BEI JING',
        date: '2025-01-02',
        sales: 200,
      },
      {
        area: 'BEI JING',
        date: '2025-01-03',
        sales: 300,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-01-01',
        sales: 100,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-01-02',
        sales: 200,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-01-03',
        sales: 500,
      },
      {
        area: 'SHANG HAI',
        date: '2025-11-01',
        sales: 600,
      },
      {
        area: 'SHANG HAI',
        date: '2025-11-02',
        sales: 400,
      },
      {
        area: 'SHANG HAI',
        date: '2025-11-03',
        sales: 300,
      },
    ],
    schema: [
      {
        name: 'area',
        type: 'string',
      },
      {
        name: 'date',
        type: 'date',
      },
      {
        name: 'sales',
        type: 'number',
      },
    ],
    vquery: {
      select: [
        'area',
        {
          field: 'sales',
          alias: 'Sum(sales)',
          aggr: {
            func: 'sum',
          },
        },
        {
          field: 'date',
          alias: 'day',
          aggr: {
            func: 'to_day',
          },
        },
      ],
      groupBy: ['day', 'area'],
      orderBy: [
        {
          field: 'Sum(sales)',
          order: 'desc',
        },
      ],
      limit: 100,
    },
  }

  return <VQueryResultRender vqueryConfig={vqueryConfig} />
}
```

## toHour

toHour

```tsx preview
import { VQueryResultRender } from '@components'

export default () => {
  const vqueryConfig = {
    datasetId: 'vquery-demo',
    description: 'toHour',
    dataset: [
      {
        area: 'BEI JING',
        date: '2025-01-01 10:00:00',
        sales: 100,
      },
      {
        area: 'BEI JING',
        date: '2025-01-01 11:30:30',
        sales: 200,
      },
      {
        area: 'BEI JING',
        date: '2025-01-01 12:15:45',
        sales: 300,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-01-01 10:00:00',
        sales: 100,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-01-01 11:30:30',
        sales: 200,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-01-01 12:15:45',
        sales: 500,
      },
      {
        area: 'SHANG HAI',
        date: '2025-11-01 10:00:00',
        sales: 600,
      },
      {
        area: 'SHANG HAI',
        date: '2025-11-01 11:30:30',
        sales: 400,
      },
      {
        area: 'SHANG HAI',
        date: '2025-11-01 12:15:45',
        sales: 300,
      },
    ],
    schema: [
      {
        name: 'area',
        type: 'string',
      },
      {
        name: 'date',
        type: 'datetime',
      },
      {
        name: 'sales',
        type: 'number',
      },
    ],
    vquery: {
      select: [
        'area',
        {
          field: 'sales',
          alias: 'Sum(sales)',
          aggr: {
            func: 'sum',
          },
        },
        {
          field: 'date',
          alias: 'hour',
          aggr: {
            func: 'to_hour',
          },
        },
      ],
      groupBy: ['hour', 'area'],
      orderBy: [
        {
          field: 'Sum(sales)',
          order: 'desc',
        },
      ],
      limit: 100,
    },
  }

  return <VQueryResultRender vqueryConfig={vqueryConfig} />
}
```

## toMinute

toMinute

```tsx preview
import { VQueryResultRender } from '@components'

export default () => {
  const vqueryConfig = {
    datasetId: 'vquery-demo',
    description: 'toMinute',
    dataset: [
      {
        area: 'BEI JING',
        date: '2025-01-01 10:00:00',
        sales: 100,
      },
      {
        area: 'BEI JING',
        date: '2025-01-01 10:30:30',
        sales: 200,
      },
      {
        area: 'BEI JING',
        date: '2025-01-01 10:45:45',
        sales: 300,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-01-01 10:00:00',
        sales: 100,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-01-01 10:30:30',
        sales: 200,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-01-01 10:45:45',
        sales: 500,
      },
      {
        area: 'SHANG HAI',
        date: '2025-11-01 10:00:00',
        sales: 600,
      },
      {
        area: 'SHANG HAI',
        date: '2025-11-01 10:30:30',
        sales: 400,
      },
      {
        area: 'SHANG HAI',
        date: '2025-11-01 10:45:45',
        sales: 300,
      },
    ],
    schema: [
      {
        name: 'area',
        type: 'string',
      },
      {
        name: 'date',
        type: 'datetime',
      },
      {
        name: 'sales',
        type: 'number',
      },
    ],
    vquery: {
      select: [
        'area',
        {
          field: 'sales',
          alias: 'Sum(sales)',
          aggr: {
            func: 'sum',
          },
        },
        {
          field: 'date',
          alias: 'minute',
          aggr: {
            func: 'to_minute',
          },
        },
      ],
      groupBy: ['minute', 'area'],
      orderBy: [
        {
          field: 'Sum(sales)',
          order: 'desc',
        },
      ],
      limit: 100,
    },
  }

  return <VQueryResultRender vqueryConfig={vqueryConfig} />
}
```

## toMonth

toMonth

```tsx preview
import { VQueryResultRender } from '@components'

export default () => {
  const vqueryConfig = {
    datasetId: 'vquery-demo',
    description: 'toMonth',
    dataset: [
      {
        area: 'BEI JING',
        date: '2025-01-01',
        sales: 100,
      },
      {
        area: 'BEI JING',
        date: '2025-01-02',
        sales: 200,
      },
      {
        area: 'BEI JING',
        date: '2025-01-03',
        sales: 300,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-01-01',
        sales: 100,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-01-02',
        sales: 200,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-01-03',
        sales: 500,
      },
      {
        area: 'SHANG HAI',
        date: '2025-11-01',
        sales: 600,
      },
      {
        area: 'SHANG HAI',
        date: '2025-11-02',
        sales: 400,
      },
      {
        area: 'SHANG HAI',
        date: '2025-11-03',
        sales: 300,
      },
    ],
    schema: [
      {
        name: 'area',
        type: 'string',
      },
      {
        name: 'date',
        type: 'date',
      },
      {
        name: 'sales',
        type: 'number',
      },
    ],
    vquery: {
      select: [
        'area',
        {
          field: 'sales',
          alias: 'Sum(sales)',
          aggr: {
            func: 'sum',
          },
        },
        {
          field: 'date',
          alias: 'month',
          aggr: {
            func: 'to_month',
          },
        },
      ],
      groupBy: ['month', 'area'],
      orderBy: [
        {
          field: 'Sum(sales)',
          order: 'desc',
        },
      ],
      where: {
        op: 'and',
        conditions: [
          {
            op: 'or',
            conditions: [
              {
                field: 'area',
                op: 'in',
                value: ['BEI JING'],
              },
              {
                field: 'sales',
                op: '>=',
                value: 400,
              },
            ],
          },
        ],
      },
      limit: 100,
    },
  }

  return <VQueryResultRender vqueryConfig={vqueryConfig} />
}
```

## toQuarter

toQuarter

```tsx preview
import { VQueryResultRender } from '@components'

export default () => {
  const vqueryConfig = {
    datasetId: 'vquery-demo',
    description: 'toQuarter',
    dataset: [
      {
        area: 'BEI JING',
        date: '2025-01-01',
        sales: 100,
      },
      {
        area: 'BEI JING',
        date: '2025-04-02',
        sales: 200,
      },
      {
        area: 'BEI JING',
        date: '2025-07-03',
        sales: 300,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-01-01',
        sales: 100,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-04-02',
        sales: 200,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-07-03',
        sales: 500,
      },
      {
        area: 'SHANG HAI',
        date: '2025-10-01',
        sales: 600,
      },
      {
        area: 'SHANG HAI',
        date: '2025-10-02',
        sales: 400,
      },
      {
        area: 'SHANG HAI',
        date: '2025-10-03',
        sales: 300,
      },
    ],
    schema: [
      {
        name: 'area',
        type: 'string',
      },
      {
        name: 'date',
        type: 'date',
      },
      {
        name: 'sales',
        type: 'number',
      },
    ],
    vquery: {
      select: [
        'area',
        {
          field: 'sales',
          alias: 'Sum(sales)',
          aggr: {
            func: 'sum',
          },
        },
        {
          field: 'date',
          alias: 'quarter',
          aggr: {
            func: 'to_quarter',
          },
        },
      ],
      groupBy: ['quarter', 'area'],
      orderBy: [
        {
          field: 'Sum(sales)',
          order: 'desc',
        },
      ],
      limit: 100,
    },
  }

  return <VQueryResultRender vqueryConfig={vqueryConfig} />
}
```

## toSecond

toSecond

```tsx preview
import { VQueryResultRender } from '@components'

export default () => {
  const vqueryConfig = {
    datasetId: 'vquery-demo',
    description: 'toSecond',
    dataset: [
      {
        area: 'BEI JING',
        date: '2025-01-01 10:00:00',
        sales: 100,
      },
      {
        area: 'BEI JING',
        date: '2025-01-01 10:00:30',
        sales: 200,
      },
      {
        area: 'BEI JING',
        date: '2025-01-01 10:00:45',
        sales: 300,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-01-01 10:00:00',
        sales: 100,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-01-01 10:00:30',
        sales: 200,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-01-01 10:00:45',
        sales: 500,
      },
      {
        area: 'SHANG HAI',
        date: '2025-11-01 10:00:00',
        sales: 600,
      },
      {
        area: 'SHANG HAI',
        date: '2025-11-01 10:00:30',
        sales: 400,
      },
      {
        area: 'SHANG HAI',
        date: '2025-11-01 10:00:45',
        sales: 300,
      },
    ],
    schema: [
      {
        name: 'area',
        type: 'string',
      },
      {
        name: 'date',
        type: 'datetime',
      },
      {
        name: 'sales',
        type: 'number',
      },
    ],
    vquery: {
      select: [
        'area',
        {
          field: 'sales',
          alias: 'Sum(sales)',
          aggr: {
            func: 'sum',
          },
        },
        {
          field: 'date',
          alias: 'second',
          aggr: {
            func: 'to_second',
          },
        },
      ],
      groupBy: ['second', 'area'],
      orderBy: [
        {
          field: 'Sum(sales)',
          order: 'desc',
        },
      ],
      limit: 100,
    },
  }

  return <VQueryResultRender vqueryConfig={vqueryConfig} />
}
```

## toWeek

toWeek

```tsx preview
import { VQueryResultRender } from '@components'

export default () => {
  const vqueryConfig = {
    datasetId: 'vquery-demo',
    description: 'toWeek',
    dataset: [
      {
        area: 'BEI JING',
        date: '2025-01-01',
        sales: 100,
      },
      {
        area: 'BEI JING',
        date: '2025-01-08',
        sales: 200,
      },
      {
        area: 'BEI JING',
        date: '2025-01-15',
        sales: 300,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-01-01',
        sales: 100,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-01-08',
        sales: 200,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-01-15',
        sales: 500,
      },
      {
        area: 'SHANG HAI',
        date: '2025-11-01',
        sales: 600,
      },
      {
        area: 'SHANG HAI',
        date: '2025-11-08',
        sales: 400,
      },
      {
        area: 'SHANG HAI',
        date: '2025-11-15',
        sales: 300,
      },
    ],
    schema: [
      {
        name: 'area',
        type: 'string',
      },
      {
        name: 'date',
        type: 'date',
      },
      {
        name: 'sales',
        type: 'number',
      },
    ],
    vquery: {
      select: [
        'area',
        {
          field: 'sales',
          alias: 'Sum(sales)',
          aggr: {
            func: 'sum',
          },
        },
        {
          field: 'date',
          alias: 'week',
          aggr: {
            func: 'to_week',
          },
        },
      ],
      groupBy: ['week', 'area'],
      orderBy: [
        {
          field: 'Sum(sales)',
          order: 'desc',
        },
      ],
      limit: 100,
    },
  }

  return <VQueryResultRender vqueryConfig={vqueryConfig} />
}
```

## toYear

toYear

```tsx preview
import { VQueryResultRender } from '@components'

export default () => {
  const vqueryConfig = {
    datasetId: 'vquery-demo',
    description: 'toYear',
    dataset: [
      {
        area: 'BEI JING',
        date: '2025-01-01',
        sales: 100,
      },
      {
        area: 'BEI JING',
        date: '2025-01-02',
        sales: 200,
      },
      {
        area: 'BEI JING',
        date: '2025-01-03',
        sales: 300,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-01-01',
        sales: 100,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-01-02',
        sales: 200,
      },
      {
        area: 'HANG ZHOU',
        date: '2025-01-03',
        sales: 500,
      },
      {
        area: 'SHANG HAI',
        date: '2025-11-01',
        sales: 600,
      },
      {
        area: 'SHANG HAI',
        date: '2025-11-02',
        sales: 400,
      },
      {
        area: 'SHANG HAI',
        date: '2025-11-03',
        sales: 300,
      },
    ],
    schema: [
      {
        name: 'area',
        type: 'string',
      },
      {
        name: 'date',
        type: 'date',
      },
      {
        name: 'sales',
        type: 'number',
      },
    ],
    vquery: {
      select: [
        'area',
        {
          field: 'sales',
          alias: 'Sum(sales)',
          aggr: {
            func: 'sum',
          },
        },
        {
          field: 'date',
          alias: 'year',
          aggr: {
            func: 'to_year',
          },
        },
      ],
      groupBy: ['year', 'area'],
      orderBy: [
        {
          field: 'Sum(sales)',
          order: 'desc',
        },
      ],
      where: {
        op: 'and',
        conditions: [
          {
            op: 'or',
            conditions: [
              {
                field: 'area',
                op: 'in',
                value: ['BEI JING'],
              },
              {
                field: 'sales',
                op: '>=',
                value: 400,
              },
            ],
          },
        ],
      },
      limit: 100,
    },
  }

  return <VQueryResultRender vqueryConfig={vqueryConfig} />
}
```
