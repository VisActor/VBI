# VBI React

`@visactor/vbi-react` is the React adapter layer for `@visactor/vbi`, responsible for integrating `VBIChartBuilder` into the React component tree.

Current exports are split into two layers:

* Root export `@visactor/vbi-react`: `useVBI`, `useVSeed`, `useChartType`, `useDimensions`, `useMeasures`, `useWhereFilter`, `useHavingFilter`
* Sub-path export `@visactor/vbi-react/components`: `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel`

## Purpose

* State subscription and rendering encapsulation for React 18+
* Uses `VBIChartBuilder` as the Single Source of Truth (SSOT) — no additional business state copies
* Ideal for building BI configuration panels, chart preview areas, and DSL debug panels

## Installation

Standard installation:

```bash
pnpm add @visactor/vbi-react @visactor/vbi @visactor/vseed react react-dom
```

For local development within this monorepo, use workspace dependencies:

```bash
pnpm --filter=<your-app> add @visactor/vbi-react@workspace:* @visactor/vbi@workspace:* @visactor/vseed@workspace:* react react-dom
```

## Quick Start

The example below demonstrates the minimal closed loop with `useVBI` + `useVSeed`:

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

* [API Overview](/VBI/en-US/vbi-react/api/index.md)
* [Examples](/VBI/en-US/vbi-react/examples/index.md)
