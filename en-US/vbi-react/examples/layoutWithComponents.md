# Layout with Components

This example demonstrates `BuilderLayout` + `FieldPanel` + `ChartRenderer` + `ChartTypeSelector`.

## Dependencies

- Packages: `@visactor/vbi-react/components`, `@visactor/vbi`, `react`
- Props: `builder` should have available dimension/measure fields for `FieldPanel` add/remove demos

## Code Snippet

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { BuilderLayout, ChartRenderer, ChartTypeSelector, FieldPanel } from '@visactor/vbi-react/components'

export function LayoutDemo({ builder }: { builder: VBIChartBuilder }) {
  return (
    <BuilderLayout
      topBar={<ChartTypeSelector builder={builder} />}
      leftPanel={
        <FieldPanel
          builder={builder}
          dimensionOptions={[{ label: 'Region', value: 'region' }]}
          measureOptions={[{ label: 'Sales', value: 'sales' }]}
        />
      }
      main={<ChartRenderer builder={builder} debounce={100} />}
    />
  )
}
```

## Expected Behavior

- Top bar: switch chart type; Left panel: add/remove dimensions/measures; Main area: chart DSL preview.
- Main area auto-refreshes after field operations — no manual trigger needed.
- On build failure, `ChartRenderer` shows a default error message and retry button.
