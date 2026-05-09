# useDimensions

## Import

```ts
import { useDimensions } from '@visactor/vbi-react'
```

## Signatur

```ts
useDimensions(builder: VBIChartBuilder): UseDimensionsReturn
```

## Beschreibung

Lesen und aktualisieren Sie die Dimensionskonfiguration, um die Möglichkeit zum Hinzufügen, Löschen und Ändern von Dimensionen zu bieten.

## Minimales Beispiel

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useDimensions } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useDimensions(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
