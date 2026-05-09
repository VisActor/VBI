# useHavingFilter

## Nhập khẩu

```ts
import { useHavingFilter } from '@visactor/vbi-react'
```

## Chữ ký

```ts
useHavingFilter(builder: VBIChartBuilder): UseHavingFilterReturn
```

## Mô tả

Quản lý Có cây lọc và cung cấp mục nhập đột biến.

## Ví dụ tối thiểu

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useHavingFilter } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useHavingFilter(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
