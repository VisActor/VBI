# VBI React

`@visactor/vbi-react` là lớp adapter React cho `@visactor/vbi`. Gói này kết nối `VBIChartBuilder` với cây component React.

Các export hiện tại được chia thành hai lớp:

- Export gốc `@visactor/vbi-react`: `useVBI`, `useVSeed`, `useChartType`, `useDimensions`, `useMeasures`, `useWhereFilter`, `useHavingFilter`
- Export qua subpath `@visactor/vbi-react/components`: `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel`

## Định vị

- Wrapper cho state subscription và rendering trong React 18+
- Sử dụng `VBIChartBuilder` làm single source of truth (SSOT), không duy trì bản sao state nghiệp vụ riêng
- Phù hợp để xây dựng bảng cấu hình BI, khu vực xem trước biểu đồ và bảng debug DSL

## Cài đặt

Cài đặt trong dự án thông thường:

```bash
pnpm add @visactor/vbi-react @visactor/vbi @visactor/vseed react react-dom
```

Khi debug trong repository này, bạn có thể dùng dependency workspace:

```bash
pnpm --filter=<your-app> add @visactor/vbi-react@workspace:* @visactor/vbi@workspace:* @visactor/vseed@workspace:* react react-dom
```

## Bắt đầu nhanh

Ví dụ sau minh họa luồng tối thiểu với `useVBI` + `useVSeed`:

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
