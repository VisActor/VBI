# ChartTypeSelector

## Import

```ts
import { ChartTypeSelector } from '@visactor/vbi-react/components'
```

## Signature

```ts
ChartTypeSelector(props: ChartTypeSelectorProps)
```

## Description

Provides a chart type drop-down selector.

## Minimal example

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartTypeSelector } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <ChartTypeSelector builder={builder} />
}
```
