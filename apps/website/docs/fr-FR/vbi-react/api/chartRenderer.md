# ChartRenderer

## Import

```ts
import { ChartRenderer } from '@visactor/vbi-react/components'
```

## Signature

```ts
ChartRenderer(props: ChartRendererProps)
```

## Description

Rend les graphiques basés sur la sortie builder et gère le chargement et l'état d'erreur.

## Exemple minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartRenderer } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <ChartRenderer builder={builder} />
}
```
