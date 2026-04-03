# useDimensions

## 导入

```ts
import { useDimensions } from '@visactor/vbi-react'
```

## 签名

```ts
useDimensions(builder: VBIChartBuilder): UseDimensionsReturn
```

## 说明

读取并更新维度配置，提供维度增删改能力。

## 最小示例

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useDimensions } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useDimensions(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
