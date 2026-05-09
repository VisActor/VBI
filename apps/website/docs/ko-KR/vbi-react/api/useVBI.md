# useVBI

## 불러오기

```ts
import { useVBI } from '@visactor/vbi-react'
```

## 시그니처

```ts
useVBI(builder: VBIChartBuilder): UseVBIReturn
```

## 설명

builder의 DSL 스냅샷 변경을 구독하고 최신 `dsl`과 원본 `builder`를 반환합니다.

## 최소 예제

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVBI } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useVBI(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
