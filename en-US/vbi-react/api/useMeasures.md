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

Reads and updates measure configuration, providing the ability to add, remove, and modify measures.

## Minimal Example

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useMeasures } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useMeasures(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
