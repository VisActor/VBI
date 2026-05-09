# VBI React

`@visactor/vbi-react` is the React adapter layer for `@visactor/vbi`. It connects `VBIChartBuilder` to the React component tree.

The current exports are organized into two layers:

- Root export `@visactor/vbi-react`: `useVBI`, `useVSeed`, `useChartType`, `useDimensions`, `useMeasures`, `useWhereFilter`, `useHavingFilter`
- Sub-path export `@visactor/vbi-react/components`: `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel`

## Positioning

- State subscription and rendering wrappers for React 18+
- Uses `VBIChartBuilder` as the single source of truth (SSOT), without keeping a separate business-state copy
- Suitable for BI configuration panels, chart preview areas, and DSL debugging panels

## Installation

Regular project installation:

```bash
pnpm add @visactor/vbi-react @visactor/vbi @visactor/vseed react react-dom
```

When debugging inside this repository, you can use workspace dependencies:

```bash
pnpm --filter=<your-app> add @visactor/vbi-react@workspace:* @visactor/vbi@workspace:* @visactor/vseed@workspace:* react react-dom
```

## Quick Start

The following example demonstrates the minimal `useVBI` + `useVSeed` loop:

```tsx
import { useMemo } from 'react'
import { VBI, type VBIConnector } from '@visactor/vbi'
import { useVBI, useVSeed } from '@visactor/vbi-react'

const connectorId = 'local-demo'

const connector: VBIConnector = {
  discoverSchema: async () => [
    { name: 'region', type: 'string' },
    { name: 'sales', type: 'number' },
  ],
  query: async () => ({
    dataset: [
      { region: 'East', sales: 120 },
      { region: 'West', sales: 90 },
    ],
  }),
}

VBI.registerConnector(connectorId, connector)

export function App() {
  const builder = useMemo(
    () =>
      VBI.chart.create({
        ...VBI.chart.createEmpty(connectorId),
        chartType: 'bar',
      }),
    [],
  )

  const { dsl } = useVBI(builder)
  const { vseed, loading, error } = useVSeed(builder, { debounce: 0 })

  if (error) return <pre>{error.message}</pre>
  if (loading || !vseed) return <div>Loading...</div>

  return (
    <div>
      <h3>{dsl.chartType}</h3>
      <pre>{JSON.stringify(vseed, null, 2)}</pre>
    </div>
  )
}
```

## Documentation

- [API Overview](./api/index)
- [Examples](./examples/index)
