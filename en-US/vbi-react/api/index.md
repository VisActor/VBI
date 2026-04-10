# API Overview

`@visactor/vbi-react` exports are split into two parts:

| Module | Import Path | Contents |
| --- | --- | --- |
| Hooks | `@visactor/vbi-react` | `useChartType`, `useDimensions`, `useHavingFilter`, `useMeasures`, `useVBI`, `useVSeed`, `useWhereFilter` |
| Components | `@visactor/vbi-react/components` | `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel` |

All hooks and components work around `VBIChartBuilder` without maintaining additional business state.
