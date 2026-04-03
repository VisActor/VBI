# ChartRenderer

## 导入

```ts
import { ChartRenderer } from '@visactor/vbi-react/components'
```

## 签名

```ts
ChartRenderer(props: ChartRendererProps)
```

## 说明

根据 builder 输出渲染图表，并处理加载与错误状态。

## 最小示例

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartRenderer } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <ChartRenderer builder={builder} />
}
```
