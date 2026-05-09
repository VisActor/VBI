# useDimensions

## Import

```ts
import { useDimensions } from '@visactor/vbi-react'
```

## Signature

```ts
useDimensions(builder: VBIChartBuilder): UseDimensionsReturn
```

## Description

Lisez et mettez à jour la configuration des dimensions, offrant la possibilité d'ajouter, de supprimer et de modifier des dimensions.

## Exemple minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useDimensions } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useDimensions(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
