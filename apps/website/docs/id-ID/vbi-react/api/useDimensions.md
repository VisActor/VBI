# useDimensions

## Impor

```ts
import { useDimensions } from '@visactor/vbi-react'
```

## tanda

```ts
useDimensions(builder: VBIChartBuilder): UseDimensionsReturn
```

## mengilustrasikan

Membaca dan memperbarui konfigurasi dimensi, memberikan kemampuan untuk menambah, menghapus, dan mengubah dimensi.

## Contoh minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useDimensions } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useDimensions(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
