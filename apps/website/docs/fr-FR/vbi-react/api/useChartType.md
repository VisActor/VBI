# useChartType

## Import

```ts
import { useChartType } from '@visactor/vbi-react'
```

## Signature

```ts
useChartType(builder: VBIChartBuilder): UseChartTypeReturn
```

## Description

Lit et met à jour le type de graphique actuel, tout en exposant une liste de types de graphiques facultatifs.

## Exemple minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useChartType } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useChartType(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
