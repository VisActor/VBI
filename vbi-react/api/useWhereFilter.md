# useWhereFilter

## 导入

```ts
import { useWhereFilter } from '@visactor/vbi-react'
```

## 签名

```ts
useWhereFilter(builder: VBIChartBuilder): UseWhereFilterReturn
```

## 说明

管理 Where 过滤树，并提供 mutation 入口。

## 最小示例

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useWhereFilter } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useWhereFilter(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
