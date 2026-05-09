# Basic Hooks

This example shows how to use `useVBI` together with `useVSeed`.

## Dependency Notes

- Package dependencies: `@visactor/vbi-react`, `@visactor/vbi`, `@visactor/vseed`, `react`
- Input constraint: requires an initialized `VBIChartBuilder` with an available connector bound to it

## Code Snippet

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVBI, useVSeed } from '@visactor/vbi-react'

export function BasicHooksDemo({ builder }: { builder: VBIChartBuilder }) {
  const { dsl } = useVBI(builder)
  const { vseed, loading, error, refetch } = useVSeed(builder, { debounce: 100 })

  if (error) {
    return <button onClick={() => void refetch()}>Retry: {error.message}</button>
  }

  if (loading || !vseed) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h4>chartType: {dsl.chartType}</h4>
      <pre>{JSON.stringify(vseed, null, 2)}</pre>
    </div>
  )
}
```

## Expected Result

- When the builder changes, `dsl` and `vseed` update together.
- The first render or an in-progress update shows `Loading...`; failures can be retried manually.
- After success, the current `chartType` and latest VSeed JSON are visible.
