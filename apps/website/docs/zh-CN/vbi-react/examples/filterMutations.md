# Filter Mutations

This example shows the mutation entry points for `useWhereFilter` and `useHavingFilter`.

## Dependency Notes

- Package dependencies: `@visactor/vbi-react`, `@visactor/vbi`, `react`
- Input constraint: `builder` should contain at least the `region` and `sales` fields to demonstrate Where/Having changes.

## Code Snippet

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useHavingFilter, useWhereFilter } from '@visactor/vbi-react'

export function FilterDemo({ builder }: { builder: VBIChartBuilder }) {
  const { whereFilter, mutateWhereFilter, clearWhereFilter } = useWhereFilter(builder)
  const { havingFilter, mutateHavingFilter, clearHavingFilter } = useHavingFilter(builder)

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <button
        onClick={() =>
          mutateWhereFilter((where) => {
            where.add('region', (node) => node.setOperator('eq').setValue('East'))
          })
        }
      >
        Add Where Condition
      </button>
      <button
        onClick={() =>
          mutateHavingFilter((having) => {
            having.add('sales', (node) => node.setAggregate({ func: 'sum' }).setOperator('gt').setValue(1000))
          })
        }
      >
        Add Having Condition
      </button>
      <button onClick={clearWhereFilter}>Clear Where</button>
      <button onClick={clearHavingFilter}>Clear Having</button>
      <pre>{JSON.stringify({ whereFilter, havingFilter }, null, 2)}</pre>
    </div>
  )
}
```

## Expected Result

- After the buttons are clicked, Where/Having conditions are appended to the builder's filter tree.
- Clear buttons immediately remove the corresponding filter conditions.
- The JSON at the bottom of the page can be used to confirm the current filter DSL structure.
