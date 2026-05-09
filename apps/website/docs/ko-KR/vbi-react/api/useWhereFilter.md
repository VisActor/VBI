# useWhereFilter

## 불러오기

```ts
import { useWhereFilter } from '@visactor/vbi-react'
```

## 시그니처

```ts
useWhereFilter(builder: VBIChartBuilder): UseWhereFilterReturn
```

## 설명

Where 필터 트리를 관리하고 mutation 진입점을 제공합니다.

## 최소 예제

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useWhereFilter } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useWhereFilter(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
