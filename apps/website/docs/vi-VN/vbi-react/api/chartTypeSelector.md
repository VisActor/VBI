# ChartTypeSelector

## Nhập khẩu

```ts
import { ChartTypeSelector } from '@visactor/vbi-react/components'
```

## Chữ ký

```ts
ChartTypeSelector(props: ChartTypeSelectorProps)
```

## Mô tả

Cung cấp bộ chọn thả xuống loại biểu đồ.

## Ví dụ tối thiểu

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartTypeSelector } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <ChartTypeSelector builder={builder} />
}
```
