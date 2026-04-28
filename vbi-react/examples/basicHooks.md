# 基础 Hooks

该示例展示 `useVBI` 与 `useVSeed` 的组合使用。

## 依赖说明

- 包依赖：`@visactor/vbi-react`、`@visactor/vbi`、`@visactor/vseed`、`react`
- 入参约束：需要一个已初始化的 `VBIChartBuilder`（已绑定可用 connector）

## 代码片段

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVBI, useVSeed } from '@visactor/vbi-react'

export function BasicHooksDemo({ builder }: { builder: VBIChartBuilder }) {
  const { dsl } = useVBI(builder)
  const { vseed, loading, error, refetch } = useVSeed(builder, { debounce: 100 })

  if (error) {
    return <button onClick={() => void refetch()}>重试：{error.message}</button>
  }

  if (loading || !vseed) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h4>chartType: {dsl.chartType}</h4>
      <pre>{JSON.stringify(vseed, null, 2)}</pre>
    </div>
  )
}
```

## 预期效果

- 当 builder 变化时，`dsl` 与 `vseed` 同步更新。
- 首次或更新中显示 `Loading...`，失败时可手动重试。
- 成功后看到当前 `chartType` 和最新 VSeed JSON。
