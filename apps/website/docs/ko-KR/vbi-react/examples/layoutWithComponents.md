# 컴포넌트화된 레이아웃

이 예제는 `BuilderLayout` + `FieldPanel` + `ChartRenderer` + `ChartTypeSelector`를 보여줍니다.

## 의존성 참고사항

- 패키지 의존성: `@visactor/vbi-react/components`, `@visactor/vbi`, `react`
- 입력 제약사항: `builder`는 선택 가능한 차원/측정값 필드를 포함하여 `FieldPanel`이 추가/제거 작업을 시연할 수 있어야 합니다.

## 코드 스니펫

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { BuilderLayout, ChartRenderer, ChartTypeSelector, FieldPanel } from '@visactor/vbi-react/components'

export function LayoutDemo({ builder }: { builder: VBIChartBuilder }) {
  return (
    <BuilderLayout
      topBar={<ChartTypeSelector builder={builder} />}
      leftPanel={
        <FieldPanel
          builder={builder}
          dimensionOptions={[{ label: 'Region', value: 'region' }]}
          measureOptions={[{ label: 'Sales', value: 'sales' }]}
        />
      }
      main={<ChartRenderer builder={builder} debounce={100} />}
    />
  )
}
```

## 예상 결과

- 상단 영역에서 차트 유형을 전환할 수 있고, 왼쪽에서 차원과 측정값을 추가/제거할 수 있으며, 메인 영역에 차트 DSL 미리보기가 표시됩니다.
- 필드 작업 후 메인 영역 콘텐츠는 수동 트리거 없이 자동으로 새로고침됩니다.
- 빌드 실패 시 `ChartRenderer`는 기본 오류와 재시도 버튼을 표시합니다.
