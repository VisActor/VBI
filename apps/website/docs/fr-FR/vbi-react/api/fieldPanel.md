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

Fournit des panneaux de champs de dimension/mesure pour une interaction d’édition de base.

## Exemple minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { FieldPanel } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <FieldPanel builder={builder} />
}
```
