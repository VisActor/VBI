# useVSeed

## Import

```ts
import { useVSeed } from '@visactor/vbi-react'
```

## Signature

```ts
useVSeed(builder: VBIChartBuilder, options: UseVSeedOptions =
```

## Description

Execute the query and VSeed generation process to return the status and data required for rendering.

## Minimal example

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVSeed } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const { vseed, loading } = useVSeed(builder, { debounce: 100 })
  if (loading || !vseed) {
    return <div>Loading...</div>
  }
  return <pre>{JSON.stringify(vseed, null, 2)}</pre>
}
```
