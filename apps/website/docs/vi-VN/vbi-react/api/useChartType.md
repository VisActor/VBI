# useChartType

## Nhập khẩu

```ts
import { useChartType } from '@visactor/vbi-react'
```

## Chữ ký

```ts
useChartType(builder: VBIChartBuilder): UseChartTypeReturn
```

## Mô tả

Đọc và cập nhật loại biểu đồ hiện tại, đồng thời hiển thị danh sách các loại biểu đồ tùy chọn.

## Ví dụ tối thiểu

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useChartType } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useChartType(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
