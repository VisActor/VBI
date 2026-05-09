# useWhereFilter

## Impor

```ts
import { useWhereFilter } from '@visactor/vbi-react'
```

## tanda

```ts
useWhereFilter(builder: VBIChartBuilder): UseWhereFilterReturn
```

## mengilustrasikan

Kelola pohon filter Where dan berikan entri mutasi.

## Contoh minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useWhereFilter } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useWhereFilter(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
