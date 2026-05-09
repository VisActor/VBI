# useVSeed

## インポート

```ts
import { useVSeed } from '@visactor/vbi-react'
```

## シグネチャ

```ts
useVSeed(builder: VBIChartBuilder, options: UseVSeedOptions =
```

## 説明

クエリと VSeed 生成フローを実行し、レンダリングに必要な状態とデータを返します。

## 最小サンプル

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
