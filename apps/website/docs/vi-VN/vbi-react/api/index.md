# Tổng quan API

`@visactor/vbi-react` hiện export hai nhóm:

| Module | Đường dẫn import | Nội dung |
| --- | --- | --- |
| Hooks | `@visactor/vbi-react` | `useChartType`, `useDimensions`, `useHavingFilter`, `useMeasures`, `useVBI`, `useVSeed`, `useWhereFilter` |
| Components | `@visactor/vbi-react/components` | `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel` |

Tất cả hooks và components đều xoay quanh `VBIChartBuilder`; chúng không duy trì nguồn state nghiệp vụ riêng.
