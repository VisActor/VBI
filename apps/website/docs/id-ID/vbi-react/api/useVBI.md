# useVBI

## Impor

```ts
import { useVBI } from '@visactor/vbi-react'
```

## tanda

```ts
useVBI(builder: VBIChartBuilder): UseVBIReturn
```

## mengilustrasikan

Berlangganan perubahan cuplikan `builder` pembuatnya, yang mengembalikan DSL terbaru dan `dsl` asli.

## Contoh minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVBI } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useVBI(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
