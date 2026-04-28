# VBI React

`@visactor/vbi-react` 是 `@visactor/vbi` 的 React 适配层，负责把 `VBIChartBuilder` 接入 React 组件树。

当前导出分为两层：

- 根导出 `@visactor/vbi-react`：`useVBI`、`useVSeed`、`useChartType`、`useDimensions`、`useMeasures`、`useWhereFilter`、`useHavingFilter`
- 子路径导出 `@visactor/vbi-react/components`：`BuilderLayout`、`ChartRenderer`、`ChartTypeSelector`、`FieldPanel`

## 定位

- 面向 React 18+ 的状态订阅与渲染封装
- 以 `VBIChartBuilder` 为单一状态源（SSOT），不额外维护业务副本
- 适合构建 BI 配置面板、图表预览区与 DSL 调试面板

## 安装

常规项目安装：

```bash
pnpm add @visactor/vbi-react @visactor/vbi @visactor/vseed react react-dom
```

在本仓库内联调时，可使用 workspace 依赖：

```bash
pnpm --filter=<your-app> add @visactor/vbi-react@workspace:* @visactor/vbi@workspace:* @visactor/vseed@workspace:* react react-dom
```

## 快速开始

下面示例演示 `useVBI` + `useVSeed` 的最小闭环：

```tsx
import { useMemo } from 'react'
import { VBI, type VBIConnector } from '@visactor/vbi'
import { useVBI, useVSeed } from '@visactor/vbi-react'

const connectorId = 'local-demo'

const connector: VBIConnector = {
  discoverSchema: async () => [
    { name: 'region', type: 'string' },
    { name: 'sales', type: 'number' },
  ],
  query: async () => ({
    dataset: [
      { region: 'East', sales: 120 },
      { region: 'West', sales: 90 },
    ],
  }),
}

VBI.registerConnector(connectorId, connector)

export function App() {
  const builder = useMemo(
    () =>
      VBI.chart.create({
        ...VBI.chart.createEmpty(connectorId),
        chartType: 'bar',
      }),
    [],
  )

  const { dsl } = useVBI(builder)
  const { vseed, loading, error } = useVSeed(builder, { debounce: 0 })

  if (error) return <pre>{error.message}</pre>
  if (loading || !vseed) return <div>Loading...</div>

  return (
    <div>
      <h3>{dsl.chartType}</h3>
      <pre>{JSON.stringify(vseed, null, 2)}</pre>
    </div>
  )
}
```

## 文档导航

- [API 总览](/VBI/vbi-react/api/index.md)
- [示例](/VBI/vbi-react/examples/index.md)
