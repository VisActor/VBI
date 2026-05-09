# useVSeed

## 불러오기

```ts
import { useVSeed } from '@visactor/vbi-react'
```

## 시그니처

```ts
useVSeed(builder: VBIChartBuilder, options: UseVSeedOptions =
```

## 설명

쿼리 및 VSeed 생성 프로세스를 실행하고 렌더링에 필요한 상태와 데이터를 반환합니다.

## 최소 예제

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVSeed } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const { vseed, loading } = useVSeed(builder, { debounce: 100 })
  if (loading || !vseed) {
    return <div>Loading...</div>
  }
  return <pre>{JSON.stringify(vseed, null, 2)}</pre>
}
```
