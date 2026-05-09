# useHavingFilter

## 불러오기

```ts
import { useHavingFilter } from '@visactor/vbi-react'
```

## 시그니처

```ts
useHavingFilter(builder: VBIChartBuilder): UseHavingFilterReturn
```

## 설명

Having 필터 트리를 관리하고 mutation 진입점을 제공합니다.

## 최소 예제

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useHavingFilter } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useHavingFilter(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
