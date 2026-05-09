# ChartRenderer

## Impor

```ts
import { ChartRenderer } from '@visactor/vbi-react/components'
```

## tanda

```ts
ChartRenderer(props: ChartRendererProps)
```

## mengilustrasikan

Render diagram berdasarkan keluaran pembuat dan tangani status pemuatan dan kefalsean.

## Contoh minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartRenderer } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <ChartRenderer builder={builder} />
}
```
