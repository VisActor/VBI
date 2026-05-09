# FieldPanel

## Impor

```ts
import { FieldPanel } from '@visactor/vbi-react/components'
```

## tanda

```ts
FieldPanel(props: FieldPanelProps)
```

## mengilustrasikan

Menyediakan panel field dimensi/ukuran untuk interaksi pengeditan dasar.

## Contoh minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { FieldPanel } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <FieldPanel builder={builder} />
}
```
