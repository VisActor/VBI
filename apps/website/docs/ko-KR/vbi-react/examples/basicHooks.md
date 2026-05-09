# 기본 Hooks

이 예제는 `useVBI`와 `useVSeed`를 함께 사용하는 방법을 보여줍니다.

## 의존성 참고사항

- 패키지 의존성: `@visactor/vbi-react`, `@visactor/vbi`, `@visactor/vseed`, `react`
- 입력 제약사항: 사용 가능한 커넥터가 바인딩된 초기화된 `VBIChartBuilder`가 필요합니다.

## 코드 스니펫

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVBI, useVSeed } from '@visactor/vbi-react'

export function BasicHooksDemo({ builder }: { builder: VBIChartBuilder }) {
  const { dsl } = useVBI(builder)
  const { vseed, loading, error, refetch } = useVSeed(builder, { debounce: 100 })

  if (error) {
    return <button onClick={() => void refetch()}>Retry: {error.message}</button>
  }

  if (loading || !vseed) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h4>chartType: {dsl.chartType}</h4>
      <pre>{JSON.stringify(vseed, null, 2)}</pre>
    </div>
  )
}
```

## 예상 결과

- 빌더가 변경되면 `dsl`과 `vseed`가 함께 업데이트됩니다.
- 첫 렌더링 또는 진행 중인 업데이트 시 `Loading...`이 표시되며, 실패 시 수동으로 재시도할 수 있습니다.
- 성공 후 현재 `chartType`과 최신 VSeed JSON이 표시됩니다.
