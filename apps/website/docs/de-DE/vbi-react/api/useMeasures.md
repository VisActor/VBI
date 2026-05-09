# useMeasures

## Import

```ts
import { useMeasures } from '@visactor/vbi-react'
```

## Signatur

```ts
useMeasures(builder: VBIChartBuilder): UseMeasuresReturn
```

## Beschreibung

Lesen und aktualisieren Sie die Metrikkonfiguration, um Metriken hinzufügen, löschen und ändern zu können.

## Minimales Beispiel

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useMeasures } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useMeasures(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
