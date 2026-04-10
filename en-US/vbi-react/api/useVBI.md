# useVBI

## Import

```ts
import { useVBI } from '@visactor/vbi-react'
```

## Signature

```ts
useVBI(builder: VBIChartBuilder): UseVBIReturn
```

## Description

Subscribes to DSL snapshot changes on the builder, returning the latest `dsl` and the original `builder`.

## Minimal Example

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVBI } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useVBI(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
