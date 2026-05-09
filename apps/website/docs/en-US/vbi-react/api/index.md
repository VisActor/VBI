# API Overview

`@visactor/vbi-react` currently exports two groups:

| Module | Import path | Contents |
| --- | --- | --- |
| Hooks | `@visactor/vbi-react` | `useChartType`, `useDimensions`, `useHavingFilter`, `useMeasures`, `useVBI`, `useVSeed`, `useWhereFilter` |
| Components | `@visactor/vbi-react/components` | `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel` |

All hooks and components work around `VBIChartBuilder`; they do not maintain a separate business-state source.
