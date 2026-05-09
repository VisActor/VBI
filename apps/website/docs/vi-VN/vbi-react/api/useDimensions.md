# useDimensions

## Nhập khẩu

```ts
import { useDimensions } from '@visactor/vbi-react'
```

## Chữ ký

```ts
useDimensions(builder: VBIChartBuilder): UseDimensionsReturn
```

## Mô tả

Đọc và cập nhật cấu hình kích thước, cung cấp khả năng thêm, xóa và sửa đổi kích thước.

## Ví dụ tối thiểu

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useDimensions } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useDimensions(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
