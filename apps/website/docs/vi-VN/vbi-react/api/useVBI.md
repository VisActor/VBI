# useVBI

## Nhập khẩu

```ts
import { useVBI } from '@visactor/vbi-react'
```

## Chữ ký

```ts
useVBI(builder: VBIChartBuilder): UseVBIReturn
```

## Mô tả

Đăng ký các thay đổi về ảnh chụp nhanh DSL của người xây dựng, trả về `dsl`mới nhất so với `builder`ban đầu.

## Ví dụ tối thiểu

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVBI } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useVBI(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
