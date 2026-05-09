# pipeline 설계

:::info Pipeline이 필요한 이유?
1. 팀 내 선배들의 선택
2. Pipeline의 장점: `VSeed`가 각 차트 유형의 실행 흐름을 독립적으로 제어할 수 있게 합니다. 좋은 설계를 통해 각 차트 유형의 구현을 분리하면서도 부분적으로 재사용할 수 있으며, 각 차트 유형이 모든 세부 사항을 완벽하게 제어할 수 있습니다. 이것이 Pipeline이 제공하는 것이며, `VSeed`가 가장 필요로 하는 것입니다.
3. 이와 비교할 때, Pipeline 모드의 단점은 설계 시 피할 수 있습니다. `Pipe`를 설계할 때 단일 `Pipe`의 규모를 줄이고 `Pipe` 간의 의존성을 낮추면 이 모드가 가져오는 단점을 크게 피할 수 있습니다.
4. 4세대 Pipeline의 설계와 최적화를 거쳐 VSeed에 이르러서는 이미 다섯 번째 버전이며, 겪어야 할 시행착오는 이미 겪었습니다.

:::

## Pipeline이란?

Pipeline은 복잡한 작업을 상호 연결된 일련의 작은 단계로 분해하여 순차적으로 실행하도록 설계된 강력한 추상화 및 엔지니어링 실천 방법입니다. 그 설계 철학과 구현 방식은 함수형 프로그래밍(FP)의 핵심 사상에 깊은 영향을 받았습니다.

### Pipeline의 장점:
- 모듈화: 원자화된 구현, 원자 조합을 통해 모듈 획득
- 자동화: 입력만 결정하면 내부 구현을 신경 쓰지 않고 자동으로 출력을 얻을 수 있습니다.
- 순수 함수: 지정된 입력에 대해 항상 예상된 출력을 얻는 것은 순수 함수의 특징입니다.
- 병렬성: 본질적으로 동시성을 지원합니다.
- 재사용성: 모든 모듈을 재사용할 수 있습니다.
- 테스트 용이성: 이론적으로 각 모듈은 독립적이므로 개별적으로 테스트하여 품질을 보장할 수 있습니다.
- 추적 가능성: 각 단계의 입력과 출력이 명확하여 문제 파악 및 프로세스 상태 모니터링이 용이합니다.
- 캐싱 가능성: 이론적으로 개별 `Pipe`의 출력을 개별적으로 캐싱할 수 있으므로 중복 계산을 피하고 효율성을 높일 수 있습니다.

### Pipeline의 단점:
- 순서 의존성: Pipe 간에 순서 의존성이 존재하면 이해 비용이 증가합니다. 앞 단계를 이해해야 뒷 단계를 이해할 수 있기 때문입니다. 전체 흐름에 대한 깊은 이해가 있어야 문제를 신속하게 파악할 수 있습니다.
- 디버깅 비용: Pipeline은 순차적으로 실행되므로 특정 단계에서 실패하면 전체 Pipeline이 실패합니다. 이는 실패한 단계를 찾아 수정해야 하므로 디버깅을 어렵게 만듭니다.
- 성능 문제: Pipeline은 순차적으로 실행되므로 각 단계의 출력은 이전 단계가 완료될 때까지 기다려야 하며, 이로 인해 성능 문제가 발생합니다. 특히 특정 단계의 실행 시간이 길면 전체 Pipeline의 실행 효율성에 영향을 미칩니다.
- 함수형 프로그래밍: 새로운 개념을 이해하는 데 일정한 학습 비용이 있습니다. 따라서 설계 원리와 구현 세부 사항을 기여 가이드에 작성하여 다른 개발자가 이해하고 사용하기 쉽게 함으로써 이러한 단점을 보완해야 합니다.

## VSeed에서 Pipeline을 어떻게 작성해야 할까요?

### Pipe 조합 패턴

여러 기능 Pipe를 조합하여 더 큰 기능 Pipe를 만들거나 더 복잡한 Pipeline을 구성할 수 있습니다.

VSeed에서 완전한 Pipeline은 하나의 차트 유형 구현에 해당합니다. Pipe의 조합 관계를 설명함으로써 다양한 차트 유형을 만들 수 있습니다. Pipeline 조합 단계에서는 각 pipe의 구체적인 구현에 대해 신경 쓸 필요가 없습니다.


#### 조합 차이

예를 들어:

꺾은선형 차트와 영역형 차트는 레이블, 범례, 축 등 많은 기능을 재사용할 수 있지만, 꺾은선형 차트에는 면 그래픽 요소 스타일이 없습니다. 따라서 pipeline은 기능 Pipe를 조합하여 위의 차이를 해결하며, 전체 과정에 if 문이 전혀 없습니다.

```ts
const lineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const areaChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,

  // 仅面积图有面图元样式
  areaStyle,
]
```


### Pipe 어댑터 패턴

조합 패턴 외에도 Pipe의 구성에는 일정한 조건이 따릅니다. 다양한 조건에서의 Pipe 조합을 충족시키기 위해 VSeed 내에서는 Pipe 어댑터를 많이 사용합니다.

#### 조합 조건

예를 들어:

꺾은선형 차트에는 피벗 기능이 있습니다. 피벗이 없을 때는 VChart가 렌더링하여 VChart spec을 출력하고, 피벗이 있을 때는 VTable이 렌더링하여 VTable spec을 출력합니다.

피벗 꺾은선형 차트는 기본적으로 꺾은선형 차트의 기본 기능(레이블, 범례, 축 등)을 재사용해야 하므로, 어댑터 패턴을 통해 꺾은선형 차트의 Pipe를 피벗 꺾은선형 차트의 Pipe로 적응시켜야 합니다.

```ts
const pivotLineChartPipeline = [
  initPivotChart,
  pivotIndicators([
    label,
    xAxis,
    yAxis,
    lineStyle,
    pointStyle,
  ]),
  pivotChartLegend,
] 

const commonLineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const lineChartPipeline = [
  pivotAdapter(commonLineChartPipeline, pivotLineChartPipeline)
]
```

종합하면, 각 adapter는 하나의 if else 문입니다. pipe 내에 숨겨진 조건을 adapter로 추상화함으로써 if else를 최상위로 앞당길 수 있으며, 이를 통해 의존 관계가 더 명확한 Pipeline을 얻고 유지보수 비용을 줄일 수 있습니다.

### Pipeline의 가장 기본 단위: 기능 Pipe

VSeed는 모든 차트 유형이 기능을 가장 기본적인 단위로 하여 충분한 재사용 및 확장 능력을 제공하고, 하향식(bottom-up)으로 차트 유형의 pipeline을 구축하기를 기대합니다. 각 기능 Pipe는 독립적이고 테스트 가능하며 재사용 가능한 모듈이어야 합니다.

가장 중요한 점은 기능 차이에 따라 서로 다른 Pipe를 추상화(즉, if else를 적게 작성)해야 하지, 하나의 크고 포괄적인 Pipe를 작성해서는 안 된다는 것입니다.

#### 평탄화된 기능 Pipe

예를 들어:

막대형 차트, 세로 막대형 차트, 꺾은선형 차트, 영역형 차트, 분산형 차트 모두 X축과 Y축을 가지고 있으며, 서로 유사하면서도 약간씩 다릅니다. 하나의 크고 포괄적인 axes pipe를 작성하면 다음과 같이 될 수 있습니다.

```ts
const lineChartPipeline = [
  axes
]
const barChartPipeline = [
  axes
]
const areaChartPipeline = [
  axes
]
const scatterChartPipeline = [
  axes
]
const axes = (spec, context) => {
  if (isLine || isArea || isColumn){
    // 折线图、面积图、柱状图有一个离散的轴, 一个连续的轴
    return xy(spec, context) 
  }
  if (isScatter){
    // 散点图有2个连续的轴
    return yy(spec, context) 
  }
  if (isBar){
    // 条形图有一个离散的轴, 一个连续的轴, 但与折线图、面积图、柱状图的轴方向不同
    return yx(spec, context) 
  }
}

const xy = (spec, context) => {
  linearAxis(spec, context, {orient: 'left'})
  bandAxis(spec, context, {orient: 'bottom'})
}

const yx = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  bandAxis(spec, context, {orient: 'left'})
}

const yy = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  linearAxis(spec, context, {orient: 'left'})
}
```

위 논리는 하나의 기능 Pipe 내에서 차트 유형에 따라 서로 다른 하위 기능 pipe를 선택하도록 구현되어 있으며, 다음과 같은 문제를 야기합니다.
1. xy, yx, yy 내에서 중복되는 기능은 어떻게 재사용할까요? 유사하면서도 다른 수많은 하위 함수들이 서로 다른 하위 기능 pipe에서 반복적으로 호출되어야 합니다. 의존 관계가 쉽게 복잡해져 유지보수 비용이 증가합니다.
2. 꺾은선형 차트, 영역형 차트의 기능을 수정할 때 막대형 차트를 누락하기 쉽습니다. 로직에 분기가 생겼기 때문에 새로운 기능을 구현할 때 차이를 고려해야 합니다.

전체 spec pipeline의 규모가 수백 개의 pipe로 확장되면 이러한 작성 로직은 매우 높은 유지보수 비용을 초래합니다. 따라서 차트 유형에 따라 다른 하위 기능 pipe를 선택하는 더 간단한 방식이 필요합니다.

위 예를 계속해서, 차이를 서로 다른 Pipe로 추상화하고, 더 세분화된 기능에 차이를 캡슐화한 후 pipeline 내에서 직접 조합하면 위와 같은 문제를 피할 수 있습니다.

```ts
const lineChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const barChartPipeline = [
  yBandAxis,
  xLinearAxis,
]
const areaChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const scatterChartPipeline = [
  xLinearAxis,
  yLinearAxis,
]

const xBandAxis = (spec, context) => {
}
const yBandAxis = (spec, context) => {
}
const xLinearAxis = (spec, context) => {
}
const yLinearAxis = (spec, context) => {
}
```

위 예에서는 axes pipe를 구현하지 않고 xBandAxis, yBandAxis, xLinearAxis, yLinearAxis 4개의 pipe를 직접 조합했습니다. 이렇게 하면 axes pipe 내에서 차트 유형에 따라 다른 하위 기능 pipe를 선택하는 문제를 피할 수 있으며, 차트 유형에 따라 다른 판단을 내릴 필요가 없어져 if else의 사용을 줄일 수 있습니다.

모든 차트 유형 차이의 분기는 Pipeline 위에 있어야 합니다. 불가피한 경우가 아니라면 Pipeline 내에서 차트 유형에 따라 다른 하위 기능 pipe를 선택할 필요가 없습니다.

이러한 조합 방식은 VSeed의 설계 철학, 즉 if else 조건 판단으로 크고 포괄적인 기능 Pipe를 만드는 대신 더 평탄화된 기능 Pipe의 조합을 사용하는 것에 부합합니다.


