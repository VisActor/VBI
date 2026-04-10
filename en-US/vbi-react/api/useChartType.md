# useChartType

## Import

```ts
import { useChartType } from '@visactor/vbi-react'
```

## Signature

```ts
useChartType(builder: VBIChartBuilder): UseChartTypeReturn
```

## Description

Reads and updates the current chart type, while exposing the list of available chart types.

## Minimal Example

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useChartType } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useChartType(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
