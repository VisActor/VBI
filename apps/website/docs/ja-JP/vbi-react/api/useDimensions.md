# useDimensions

## インポート

```ts
import { useDimensions } from '@visactor/vbi-react'
```

## シグネチャ

```ts
useDimensions(builder: VBIChartBuilder): UseDimensionsReturn
```

## 説明

ディメンション設定を読み取り、更新します。ディメンションの追加、削除、変更機能を提供します。

## 最小サンプル

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useDimensions } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useDimensions(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
