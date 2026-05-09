# Componentized Layout

This example shows `BuilderLayout` + `FieldPanel` + `ChartRenderer` + `ChartTypeSelector`.

## Dependency Notes

- Package dependencies: `@visactor/vbi-react/components`, `@visactor/vbi`, `react`
- Input constraint: `builder` should contain selectable dimension/measure fields so `FieldPanel` can demonstrate add/remove operations.

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

## Expected Result

- The top area can switch chart type, the left side can add/remove dimensions and measures, and the main area shows a chart DSL preview.
- After field operations, the main-area content refreshes automatically without a manual trigger.
- When build fails, `ChartRenderer` shows the default error and retry button.
