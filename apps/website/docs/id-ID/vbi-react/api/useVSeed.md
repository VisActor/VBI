# useVSeed

## Impor

```ts
import { useVSeed } from '@visactor/vbi-react'
```

## tanda

```ts
useVSeed(builder: VBIChartBuilder, options: UseVSeedOptions =
```

## mengilustrasikan

Jalankan proses pembuatan kueri dan VSeed untuk mengembalikan status dan data yang diperlukan untuk rendering.

## Contoh minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVSeed } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const { vseed, loading } = useVSeed(builder, { debounce: 100 })
  if (loading || !vseed) {
    return <div>Loading...</div>
  }
  return <pre>{JSON.stringify(vseed, null, 2)}</pre>
}
```
