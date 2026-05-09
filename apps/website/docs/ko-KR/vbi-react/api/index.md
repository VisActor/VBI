# API 개요

`@visactor/vbi-react` 현재 내보내기는 두 부분으로 나뉩니다.

| 모듈 | 가져오기 경로 | 내용 |
| --- | --- | --- |
| Hooks | `@visactor/vbi-react` | `useChartType`、`useDimensions`、`useHavingFilter`、`useMeasures`、`useVBI`、`useVSeed`、`useWhereFilter` |
| Components | `@visactor/vbi-react/components` | `BuilderLayout`、`ChartRenderer`、`ChartTypeSelector`、`FieldPanel` |

모든 hooks/components는 `VBIChartBuilder`를 중심으로 작동하며, 추가로 비즈니스 상태 소스를 유지하지 않습니다.
