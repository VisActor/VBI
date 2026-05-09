# ChartTypeSelector

## Impor

```ts
import { ChartTypeSelector } from '@visactor/vbi-react/components'
```

## tanda

```ts
ChartTypeSelector(props: ChartTypeSelectorProps)
```

## mengilustrasikan

Menyediakan pemilih tarik-turun jenis bagan.

## Contoh minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartTypeSelector } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <ChartTypeSelector builder={builder} />
}
```
