# useMeasures

## Import

```ts
import { useMeasures } from '@visactor/vbi-react'
```

## Signature

```ts
useMeasures(builder: VBIChartBuilder): UseMeasuresReturn
```

## Description

Lisez et mettez à jour les configurations de mesure, offrant la possibilité d'ajouter, de supprimer et de modifier des mesures.

## Exemple minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useMeasures } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useMeasures(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
