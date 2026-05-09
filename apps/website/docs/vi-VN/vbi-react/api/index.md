#Tổng quan về API

`@visactor/vbi-react`Việc xuất khẩu hiện tại được chia làm 2 phần:

| mô-đun| đường dẫn nhập khẩu| nội dung|
| --- | --- | --- |
| Hooks | `@visactor/vbi-react` | `useChartType`、`useDimensions`、`useHavingFilter`、`useMeasures`、`useVBI`、`useVSeed`、`useWhereFilter` |
| Components | `@visactor/vbi-react/components` | `BuilderLayout`、`ChartRenderer`、`ChartTypeSelector`、`FieldPanel` |

Tất cả các móc/thành phần hoạt động xung quanh `VBIChartBuilder`và không duy trì các nguồn trạng thái kinh doanh bổ sung.
