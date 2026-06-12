# VBI React

`@visactor/vbi-react` 是 `@visactor/vbi` 的 React 适配层，负责把 `VBIChartBuilder` 接入 React 组件树。

当前导出分为两层：

- 根导出 `@visactor/vbi-react`：`useVBI`、`useVSeed`、`useChartType`、`useDimensions`、`useMeasures`、`useWhereFilter`、`useHavingFilter`
- 子路径导出 `@visactor/vbi-react/components`：`BuilderLayout`、`ChartRenderer`、`ChartTypeSelector`、`FieldPanel`、`FilterPanel`、`ThemeSelector`
- 组件样式入口 `@visactor/vbi-react/components.css`：提供默认视觉样式、稳定 class contract 和可覆盖的 CSS variables

## 定位

- 面向 React 18+ 的状态订阅与渲染封装
- 以 `VBIChartBuilder` 为单一状态源（SSOT），不额外维护业务副本
- 适合构建 BI 配置面板、图表预览区与 DSL 调试面板
- components 层保持轻量、可组合；完整工作台布局建议参考 [vbi-react Starter](./examples/vbi-react-starter)

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

VBI.connectors.register(connectorId, connector)

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

- [vbi-react Starter](./examples/vbi-react-starter)
- [API 总览](./api/index)
- [示例](./examples/index)
