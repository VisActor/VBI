# useMeasures

## Impor

```ts
import { useMeasures } from '@visactor/vbi-react'
```

## tanda

```ts
useMeasures(builder: VBIChartBuilder): UseMeasuresReturn
```

## mengilustrasikan

Membaca dan memperbarui konfigurasi pengukuran, memberikan kemampuan untuk menambah, menghapus, dan mengubah pengukuran.

## Contoh minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useMeasures } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useMeasures(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
