# FieldPanel

## Import

```ts
import { FieldPanel } from '@visactor/vbi-react/components'
```

## Signature

```ts
FieldPanel(props: FieldPanelProps)
```

## Description

Provides dimension/measure field panels for basic editing interaction.

## Minimal example

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { FieldPanel } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <FieldPanel builder={builder} />
}
```
