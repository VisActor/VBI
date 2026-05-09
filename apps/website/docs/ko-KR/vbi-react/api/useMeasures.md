# useMeasures

## 불러오기

```ts
import { useMeasures } from '@visactor/vbi-react'
```

## 시그니처

```ts
useMeasures(builder: VBIChartBuilder): UseMeasuresReturn
```

## 설명

측정값 구성을 읽고 업데이트하며, 측정값 추가/삭제/수정 기능을 제공합니다.

## 최소 예제

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useMeasures } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useMeasures(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
