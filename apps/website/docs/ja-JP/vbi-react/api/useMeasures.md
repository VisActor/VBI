# useMeasures

## インポート

```ts
import { useMeasures } from '@visactor/vbi-react'
```

## シグネチャ

```ts
useMeasures(builder: VBIChartBuilder): UseMeasuresReturn
```

## 説明

メジャー設定を読み取り、更新します。メジャーの追加、削除、変更機能を提供します。

## 最小サンプル

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useMeasures } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useMeasures(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
