# useHavingFilter

## Impor

```ts
import { useHavingFilter } from '@visactor/vbi-react'
```

## tanda

```ts
useHavingFilter(builder: VBIChartBuilder): UseHavingFilterReturn
```

## mengilustrasikan

Kelola pohon filter Having dan berikan entri mutasi.

## Contoh minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useHavingFilter } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useHavingFilter(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
