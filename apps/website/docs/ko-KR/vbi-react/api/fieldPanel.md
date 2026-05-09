# FieldPanel

## 불러오기

```ts
import { FieldPanel } from '@visactor/vbi-react/components'
```

## 시그니처

```ts
FieldPanel(props: FieldPanelProps)
```

## 설명

차원/측정값 필드 패널과 기본 편집 상호작용을 제공합니다.

## 최소 예제

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { FieldPanel } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <FieldPanel builder={builder} />
}
```
