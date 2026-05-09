# useChartType

## 불러오기

```ts
import { useChartType } from '@visactor/vbi-react'
```

## 시그니처

```ts
useChartType(builder: VBIChartBuilder): UseChartTypeReturn
```

## 설명

현재 차트 유형을 읽고 업데이트하며, 선택 가능한 차트 유형 목록도 노출합니다.

## 최소 예제

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useChartType } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useChartType(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
