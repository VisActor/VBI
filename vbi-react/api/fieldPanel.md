# FieldPanel

## 导入

```ts
import { FieldPanel } from '@visactor/vbi-react/components'
```

## 签名

```ts
FieldPanel(props: FieldPanelProps)
```

## 说明

提供维度/度量字段面板与基础编辑交互。

## 最小示例

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { FieldPanel } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <FieldPanel builder={builder} />
}
```
