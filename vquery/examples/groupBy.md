# GroupBy

## basic

Basic GroupBy Example

```tsx preview
import { VQueryResultRender } from '@components'

export default () => {
  const vqueryConfig = {
    datasetId: 'groupBy-basic',
    description: 'Basic GroupBy Example',
    vquery: {
      select: [
        'department',
        {
          field: 'salary',
          alias: 'Average Salary',
          aggr: {
            func: 'avg',
          },
        },
      ],
      groupBy: ['department'],
    },
    dataset: [
      {
        id: 1,
        name: 'Alice',
        age: 25,
        department: 'HR',
        salary: 5000,
      },
      {
        id: 2,
        name: 'Bob',
        age: 30,
        department: 'Engineering',
        salary: 8000,
      },
      {
        id: 3,
        name: 'Charlie',
        age: 35,
        department: 'Engineering',
        salary: 9000,
      },
      {
        id: 4,
        name: 'David',
        age: 40,
        department: 'HR',
        salary: 6000,
      },
      {
        id: 5,
        name: 'Eve',
        age: 22,
        department: 'Marketing',
        salary: 4000,
      },
    ],
    schema: [
      {
        name: 'id',
        type: 'number',
      },
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'age',
        type: 'number',
      },
      {
        name: 'department',
        type: 'string',
      },
      {
        name: 'salary',
        type: 'number',
      },
    ],
  }

  return <VQueryResultRender vqueryConfig={vqueryConfig} />
}
```
