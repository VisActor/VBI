# FieldPanel

## Nhập khẩu

```ts
import { FieldPanel } from '@visactor/vbi-react/components'
```

## Chữ ký

```ts
FieldPanel(props: FieldPanelProps)
```

## Mô tả

Cung cấp bảng trường chiều/đo lường để tương tác chỉnh sửa cơ bản.

## Ví dụ tối thiểu

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { FieldPanel } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <FieldPanel builder={builder} />
}
```
