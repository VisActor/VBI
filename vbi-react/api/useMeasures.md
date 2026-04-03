# useMeasures

## 导入

```ts
import { useMeasures } from '@visactor/vbi-react'
```

## 签名

```ts
useMeasures(builder: VBIChartBuilder): UseMeasuresReturn
```

## 说明

读取并更新度量配置，提供度量增删改能力。

## 最小示例

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useMeasures } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useMeasures(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
