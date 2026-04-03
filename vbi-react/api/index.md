# API 总览

`@visactor/vbi-react` 当前导出分为两部分：

| 模块 | 导入路径 | 内容 |
| --- | --- | --- |
| Hooks | `@visactor/vbi-react` | `useChartType`、`useDimensions`、`useHavingFilter`、`useMeasures`、`useVBI`、`useVSeed`、`useWhereFilter` |
| Components | `@visactor/vbi-react/components` | `BuilderLayout`、`ChartRenderer`、`ChartTypeSelector`、`FieldPanel` |

所有 hooks/components 都围绕 `VBIChartBuilder` 工作，不额外维护业务状态源。
