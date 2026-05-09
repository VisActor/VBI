# useWhereFilter

## Import

```ts
import { useWhereFilter } from '@visactor/vbi-react'
```

## Signatur

```ts
useWhereFilter(builder: VBIChartBuilder): UseWhereFilterReturn
```

## Beschreibung

Verwalten Sie den Wo-Filterbaum und geben Sie einen Mutationseintrag ein.

## Minimales Beispiel

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useWhereFilter } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useWhereFilter(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
