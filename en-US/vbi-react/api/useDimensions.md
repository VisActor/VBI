# useDimensions

## Import

```ts
import { useDimensions } from '@visactor/vbi-react'
```

## Signature

```ts
useDimensions(builder: VBIChartBuilder): UseDimensionsReturn
```

## Description

Reads and updates dimension configuration, providing the ability to add, remove, and modify dimensions.

## Minimal Example

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useDimensions } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useDimensions(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
