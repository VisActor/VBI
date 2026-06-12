# API 总览

`@visactor/vbi-react` 当前导出分为三部分：

| 模块 | 导入路径 | 内容 |
| --- | --- | --- |
| Hooks | `@visactor/vbi-react` | `useChartType`、`useDimensions`、`useHavingFilter`、`useMeasures`、`useTheme`、`useVBI`、`useVSeed`、`useWhereFilter` |
| Components | `@visactor/vbi-react/components` | `BuilderLayout`、`ChartRenderer`、`ChartTypeSelector`、`FieldPanel`、`FilterPanel`、`ThemeSelector` |
| Styles | `@visactor/vbi-react/components.css` | 默认组件样式、稳定 class names、可覆盖 CSS variables |

所有 hooks/components 都围绕 `VBIChartBuilder` 工作，不额外维护业务状态源。
业务页面可以通过 wrapper 覆盖 CSS variables；完整页面结构建议放在应用或 starter 层，而不是塞进 package 组件内部。

## 建议阅读顺序

1. 先看 [示例总览](../examples/index)，确定你是从 hooks 还是从组件进入。
2. 单个组件页已经内嵌 live demo，可以直接在对应 API 页面里操作。
3. 想看完整拼装方式时，再看 [vbi-react Starter](../examples/vbi-react-starter)。
