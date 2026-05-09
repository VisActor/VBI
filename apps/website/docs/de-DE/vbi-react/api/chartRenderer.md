# ChartRenderer

## Import

```ts
import { ChartRenderer } from '@visactor/vbi-react/components'
```

## Signatur

```ts
ChartRenderer(props: ChartRendererProps)
```

## Beschreibung

Rendern Sie das Diagramm gemäß der Builder-Ausgabe und den Lade- und Fehlerzuständen des Griffs.

## Minimales Beispiel

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartRenderer } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <ChartRenderer builder={builder} />
}
```
