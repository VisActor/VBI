# useChartType

## Impor

```ts
import { useChartType } from '@visactor/vbi-react'
```

## tanda

```ts
useChartType(builder: VBIChartBuilder): UseChartTypeReturn
```

## mengilustrasikan

Membaca dan memperbarui tipe bagan saat ini, sekaligus menampilkan daftar tipe bagan opsional.

## Contoh minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useChartType } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useChartType(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
