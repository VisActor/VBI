# FieldPanel

## インポート

```ts
import { FieldPanel } from '@visactor/vbi-react/components'
```

## シグネチャ

```ts
FieldPanel(props: FieldPanelProps)
```

## 説明

ディメンション/メジャーフィールドのパネルと基本的な編集操作を提供します。

## 最小サンプル

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { FieldPanel } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <FieldPanel builder={builder} />
}
```
