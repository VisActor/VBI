# useVSeed

## Nhập khẩu

```ts
import { useVSeed } from '@visactor/vbi-react'
```

## Chữ ký

```ts
useVSeed(builder: VBIChartBuilder, options: UseVSeedOptions =
```

## Mô tả

Thực hiện truy vấn và quy trình tạo VSeed để trả về trạng thái và dữ liệu cần thiết để hiển thị.

## Ví dụ tối thiểu

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVSeed } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const { vseed, loading } = useVSeed(builder, { debounce: 100 })
  if (loading || !vseed) {
    return <div>Loading...</div>
  }
  return <pre>{JSON.stringify(vseed, null, 2)}</pre>
}
```
