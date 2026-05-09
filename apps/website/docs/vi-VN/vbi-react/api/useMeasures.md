# useMeasures

## Nhập khẩu

```ts
import { useMeasures } from '@visactor/vbi-react'
```

## Chữ ký

```ts
useMeasures(builder: VBIChartBuilder): UseMeasuresReturn
```

## Mô tả

Đọc và cập nhật cấu hình đo lường, cung cấp khả năng thêm, xóa và sửa đổi các phép đo.

## Ví dụ tối thiểu

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useMeasures } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useMeasures(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
