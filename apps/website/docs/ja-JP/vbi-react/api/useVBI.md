# useVBI

## インポート

```ts
import { useVBI } from '@visactor/vbi-react'
```

## シグネチャ

```ts
useVBI(builder: VBIChartBuilder): UseVBIReturn
```

## 説明

builder の DSL スナップショット変更を購読し、最新の `dsl` と元の `builder` を返します。

## 最小サンプル

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVBI } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useVBI(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
