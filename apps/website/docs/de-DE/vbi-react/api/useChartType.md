# useChartType

## Import

```ts
import { useChartType } from '@visactor/vbi-react'
```

## Signatur

```ts
useChartType(builder: VBIChartBuilder): UseChartTypeReturn
```

## Beschreibung

Liest und aktualisiert den aktuellen Diagrammtyp, während die Liste der optionalen Diagrammtypen angezeigt wird.

## Minimales Beispiel

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useChartType } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useChartType(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
