# ChartTypeSelector

## 导入

```ts
import { ChartTypeSelector } from '@visactor/vbi-react/components'
```

## 签名

```ts
ChartTypeSelector(props: ChartTypeSelectorProps)
```

## 说明

提供图表类型下拉选择器。

## 最小示例

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartTypeSelector } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <ChartTypeSelector builder={builder} />
}
```
