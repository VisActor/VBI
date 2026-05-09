# 필터 변경(Mutations)

이 예제는 `useWhereFilter`와 `useHavingFilter`의 변경 진입점을 보여줍니다.

## 의존성 참고사항

- 패키지 의존성: `@visactor/vbi-react`, `@visactor/vbi`, `react`
- 입력 제약사항: `builder`는 Where/Having 변경을 시연할 수 있도록 최소한 `region`과 `sales` 필드를 포함해야 합니다.

## 코드 스니펫

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useHavingFilter, useWhereFilter } from '@visactor/vbi-react'

export function FilterDemo({ builder }: { builder: VBIChartBuilder }) {
  const { whereFilter, mutateWhereFilter, clearWhereFilter } = useWhereFilter(builder)
  const { havingFilter, mutateHavingFilter, clearHavingFilter } = useHavingFilter(builder)

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <button
        onClick={() =>
          mutateWhereFilter((where) => {
            where.add('region', (node) => node.setOperator('eq').setValue('East'))
          })
        }
      >
        Add Where Condition
      </button>
      <button
        onClick={() =>
          mutateHavingFilter((having) => {
            having.add('sales', (node) => node.setAggregate({ func: 'sum' }).setOperator('gt').setValue(1000))
          })
        }
      >
        Add Having Condition
      </button>
      <button onClick={clearWhereFilter}>Clear Where</button>
      <button onClick={clearHavingFilter}>Clear Having</button>
      <pre>{JSON.stringify({ whereFilter, havingFilter }, null, 2)}</pre>
    </div>
  )
}
```

## 예상 결과

- 버튼 클릭 후 Where/Having 조건이 빌더의 필터 트리에 추가됩니다.
- 지우기 버튼은 해당 필터 조건을 즉시 제거합니다.
- 페이지 하단의 JSON을 통해 현재 필터 DSL 구조를 확인할 수 있습니다.
