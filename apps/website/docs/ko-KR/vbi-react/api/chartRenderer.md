# ChartRenderer

## 불러오기

```ts
import { ChartRenderer } from '@visactor/vbi-react/components'
```

## 시그니처

```ts
ChartRenderer(props: ChartRendererProps)
```

## 설명

builder 출력에 따라 차트를 렌더링하고 로딩 및 오류 상태를 처리합니다.

## 최소 예제

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartRenderer } from '@visactor/vbi-react/components'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  return <ChartRenderer builder={builder} />
}
```
