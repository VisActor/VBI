# useHavingFilter

## Import

```ts
import { useHavingFilter } from '@visactor/vbi-react'
```

## Signature

```ts
useHavingFilter(builder: VBIChartBuilder): UseHavingFilterReturn
```

## Description

Gérez l'arborescence de filtres Having et fournissez l'entrée mutation.

## Exemple minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useHavingFilter } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useHavingFilter(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
