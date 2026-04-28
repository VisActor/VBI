# Basic Hooks

This example demonstrates combining `useVBI` with `useVSeed`.

## Dependencies

- Packages: `@visactor/vbi-react`, `@visactor/vbi`, `@visactor/vseed`, `react`
- Props: requires an initialized `VBIChartBuilder` (with a bound connector)

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

## Expected Behavior

- When the builder changes, `dsl` and `vseed` update in sync.
- Shows `Loading...` on first load or when updating; allows manual retry on failure.
- On success, displays the current `chartType` and the latest VSeed JSON.
