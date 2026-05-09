# useHavingFilter

## インポート

```ts
import { useHavingFilter } from '@visactor/vbi-react'
```

## シグネチャ

```ts
useHavingFilter(builder: VBIChartBuilder): UseHavingFilterReturn
```

## 説明

Having フィルターツリーを管理し、mutation の入口を提供します。

## 最小サンプル

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useHavingFilter } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useHavingFilter(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
