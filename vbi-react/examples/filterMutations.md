# 过滤条件编辑

该示例展示 `useWhereFilter` 与 `useHavingFilter` 的 mutation 入口。

## 依赖说明

- 包依赖：`@visactor/vbi-react`、`@visactor/vbi`、`react`
- 入参约束：`builder` 至少包含 `region` 和 `sales` 字段，便于演示 Where/Having 变更

## 代码片段

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useHavingFilter, useWhereFilter } from '@visactor/vbi-react'

export function FilterDemo({ builder }: { builder: VBIChartBuilder }) {
  const { whereFilter, mutateWhereFilter, clearWhereFilter } = useWhereFilter(builder)
  const { havingFilter, mutateHavingFilter, clearHavingFilter } = useHavingFilter(builder)

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <button
        onClick={() =>
          mutateWhereFilter((where) => {
            where.add('region', (node) => node.setOperator('eq').setValue('East'))
          })
        }
      >
        添加 Where 条件
      </button>
      <button
        onClick={() =>
          mutateHavingFilter((having) => {
            having.add('sales', (node) => node.setAggregate({ func: 'sum' }).setOperator('gt').setValue(1000))
          })
        }
      >
        添加 Having 条件
      </button>
      <button onClick={clearWhereFilter}>清空 Where</button>
      <button onClick={clearHavingFilter}>清空 Having</button>
      <pre>{JSON.stringify({ whereFilter, havingFilter }, null, 2)}</pre>
    </div>
  )
}
```

## 预期效果

- 点击按钮后，Where/Having 条件分别追加到 builder 的过滤树。
- 清空按钮会立即移除对应过滤条件。
- 页面底部 JSON 可用于确认当前过滤 DSL 结构。
