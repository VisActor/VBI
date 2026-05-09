# useMeasures

## Import

```ts
import { useMeasures } from '@visactor/vbi-react'
```

## Signature

```ts
useMeasures(builder: VBIChartBuilder): UseMeasuresReturn
```

## Description

Read and update measurement configurations, providing the ability to add, delete, and modify measurements.

## Minimal example

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useMeasures } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useMeasures(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
