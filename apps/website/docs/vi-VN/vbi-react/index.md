# VBI React

`@visactor/vbi-react`là lớp thích ứng React của `@visactor/vbi`, chịu trách nhiệm kết nối `VBIChartBuilder`với cây thành phần React.

Việc xuất khẩu hiện tại được chia thành hai tầng:

- Xuất gốc `@visactor/vbi-react`: `useVBI`, `useVSeed`, `useChartType`, `useDimensions`, `useMeasures`, `useWhereFilter`, `useHavingFilter`
- Xuất đường dẫn phụ `@visactor/vbi-react/components`: `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel`

## Định vị

- Đăng ký trạng thái và đóng gói kết xuất cho React 18+
- Sử dụng `VBIChartBuilder`làm nguồn trạng thái duy nhất (SSOT) và không có bản sao kinh doanh bổ sung nào được duy trì
- Thích hợp để xây dựng bảng cấu hình BI, khu vực xem trước biểu đồ và bảng gỡ lỗi DSL

## Cài đặt

Lắp đặt dự án thường xuyên:

```bash
pnpm add @visactor/vbi-react @visactor/vbi @visactor/vseed react react-dom
```

Khi gỡ lỗi nội tuyến trong kho này, bạn có thể sử dụng phần phụ thuộc không gian làm việc:

```bash
pnpm --filter=<your-app> add @visactor/vbi-react@workspace:* @visactor/vbi@workspace:* @visactor/vseed@workspace:* react react-dom
```

## Bắt đầu nhanh

Ví dụ sau đây minh họa vòng khép kín tối thiểu của `useVBI`+ `useVSeed`:

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

## Điều hướng tài liệu

- [Tổng quan về API](./api/index)
- [Ví dụ](./examples/index)
