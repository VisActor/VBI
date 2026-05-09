# useHavingFilter

## Import

```ts
import { useHavingFilter } from '@visactor/vbi-react'
```

## Signatur

```ts
useHavingFilter(builder: VBIChartBuilder): UseHavingFilterReturn
```

## Beschreibung

Verwalten Sie den Filterbaum und geben Sie den Mutationseintrag ein.

## Minimales Beispiel

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useHavingFilter } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useHavingFilter(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
