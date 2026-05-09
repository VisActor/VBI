# VBI React

`@visactor/vbi-react`는 `@visactor/vbi`의 React 어댑터 레이어로, `VBIChartBuilder`를 React 컴포넌트 트리에 연결합니다.

현재 내보내기는 두 계층으로 나뉩니다:

- 루트 내보내기 `@visactor/vbi-react`: `useVBI`, `useVSeed`, `useChartType`, `useDimensions`, `useMeasures`, `useWhereFilter`, `useHavingFilter`
- 하위 경로 내보내기 `@visactor/vbi-react/components`: `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel`

## 특징

- React 18+ 대상 상태 구독 및 렌더링 캡슐화
- `VBIChartBuilder`를 단일 상태 소스(SSOT)로 사용, 추가 비즈니스 사본 유지 안 함
- BI 구성 패널, 차트 미리보기 영역 및 DSL 디버그 패널 구축에 적합

## 설치

일반 프로젝트 설치:

```bash
pnpm add @visactor/vbi-react @visactor/vbi @visactor/vseed react react-dom
```

이 저장소 내에서 함께 디버깅할 때 workspace 종속성을 사용할 수 있습니다:

```bash
pnpm --filter=<your-app> add @visactor/vbi-react@workspace:* @visactor/vbi@workspace:* @visactor/vseed@workspace:* react react-dom
```

## 빠르게 시작하기

아래 예제는 `useVBI` + `useVSeed`의 최소 폐쇄 루프를 보여줍니다:

```tsx
import { useMemo } from 'react'
import { VBI, type VBIConnector } from '@visactor/vbi'
import { useVBI, useVSeed } from '@visactor/vbi-react'

const connectorId = 'local-demo'

const connector: VBIConnector = {
  discoverSchema: async () => [
    { name: 'region', type: 'string' },
    { name: 'sales', type: 'number' },
  ],
  query: async () => ({
    dataset: [
      { region: 'East', sales: 120 },
      { region: 'West', sales: 90 },
    ],
  }),
}

VBI.registerConnector(connectorId, connector)

export function App() {
  const builder = useMemo(
    () =>
      VBI.chart.create({
        ...VBI.chart.createEmpty(connectorId),
        chartType: 'bar',
      }),
    [],
  )

  const { dsl } = useVBI(builder)
  const { vseed, loading, error } = useVSeed(builder, { debounce: 0 })

  if (error) return <pre>{error.message}</pre>
  if (loading || !vseed) return <div>Loading...</div>

  return (
    <div>
      <h3>{dsl.chartType}</h3>
      <pre>{JSON.stringify(vseed, null, 2)}</pre>
    </div>
  )
}
```

## 문서 탐색

- [API 개요](./api/index)
- [예제](./examples/index)
