# useVBI

## Import

```ts
import { useVBI } from '@visactor/vbi-react'
```

## Signatur

```ts
useVBI(builder: VBIChartBuilder): UseVBIReturn
```

## Beschreibung

Abonnieren Sie DSL-Snapshot-Änderungen im Builder und kehren Sie zu den neuesten `dsl` mit Original `builder`。

## Minimales Beispiel

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVBI } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useVBI(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
