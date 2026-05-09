# API Overview

`@visactor/vbi-react` The current export is divided into two parts:

| module | import path | content |
| --- | --- | --- |
| Hooks | `@visactor/vbi-react` | `useChartType`、`useDimensions`、`useHavingFilter`、`useMeasures`、`useVBI`、`useVSeed`、`useWhereFilter` |
| Components | `@visactor/vbi-react/components` | `BuilderLayout`、`ChartRenderer`、`ChartTypeSelector`、`FieldPanel` |

All hooks/components work around `VBIChartBuilder` and do not maintain additional business state sources.
