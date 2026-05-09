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

Read and update dimension configuration, providing the ability to add, delete, and modify dimensions.

## Minimal example

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useDimensions } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useDimensions(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
