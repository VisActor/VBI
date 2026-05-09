# useWhereFilter

## インポート

```ts
import { useWhereFilter } from '@visactor/vbi-react'
```

## シグネチャ

```ts
useWhereFilter(builder: VBIChartBuilder): UseWhereFilterReturn
```

## 説明

Where フィルターツリーを管理し、mutation の入口を提供します。

## 最小サンプル

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useWhereFilter } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useWhereFilter(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
