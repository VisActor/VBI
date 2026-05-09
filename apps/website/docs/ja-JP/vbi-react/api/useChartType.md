# useChartType

## インポート

```ts
import { useChartType } from '@visactor/vbi-react'
```

## シグネチャ

```ts
useChartType(builder: VBIChartBuilder): UseChartTypeReturn
```

## 説明

現在のチャートタイプを読み取り、更新します。あわせて選択可能なチャートタイプの一覧も公開します。

## 最小サンプル

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useChartType } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useChartType(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
