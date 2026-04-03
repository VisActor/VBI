# useHavingFilter

## 导入

```ts
import { useHavingFilter } from '@visactor/vbi-react'
```

## 签名

```ts
useHavingFilter(builder: VBIChartBuilder): UseHavingFilterReturn
```

## 说明

管理 Having 过滤树，并提供 mutation 入口。

## 最小示例

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useHavingFilter } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useHavingFilter(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
