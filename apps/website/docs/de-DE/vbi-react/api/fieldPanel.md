# FieldPanel

## Import

```ts
import { FieldPanel } from '@visactor/vbi-react/components'
```

## Signatur

```ts
FieldPanel(props: FieldPanelProps)
```

## Beschreibung

Geben Sie ein Dimensions-/Maßfeld an, um mit der zugrunde liegenden Bearbeitung zu interagieren.

## Minimales Beispiel

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { FieldPanel } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <FieldPanel builder={builder} />
}
```
