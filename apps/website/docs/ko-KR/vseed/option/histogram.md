# Histogram

:::info{title="인코딩 매핑"}
히스토그램은 다음 시각적 채널을 지원합니다:

`xAxis`  : X축 채널, `하나의 차원`을 지원하며, 차원 값에 따라 구간(bin) 계산 후 X축에 표시됩니다.

:::

:::note{title="설명"}
히스토그램, 데이터 분포를 표시하는 데 적합한 차트로, X축은 값 축(연속 데이터), Y축은 값 축(연속 데이터)이며, 막대가 세로로 배열됩니다.

적용 시나리오:

\- 데이터의 분포 현황 표시(예: 빈도 분포, 확률 분포)

\- 데이터의 집중 경향과 분산 정도 분석

\- 데이터의 이상값 및 패턴 식별

:::


## chartType

**Type:** `"histogram"`

:::note{title="설명"}
히스토그램, 데이터 분포를 표시하는 데 적합합니다.

:::


## dataset

**Type:** `Record[]`

:::note{title="설명"}
TidyData 사양을 따르고 이미 집계된 데이터 세트로, 차트의 데이터 출처와 구조를 정의하는 데 사용됩니다. 사용자가 입력한 데이터 세트는 어떠한 처리도 필요하지 않으며, VSeed는 강력한 데이터 재구성 기능을 갖추고 있어 자체적으로 데이터를 재구성합니다. 막대 차트의 데이터는 최종적으로 2개의 차원, 1개의 측정값으로 변환됩니다.

:::

**예시**
```ts
[{category:'A', value:100}, {category:'B', value:200}]




```
## dimensions

**Type:** `HistogramDimension[] | undefined`

:::note{title="설명"}
히스토그램은 일반적으로 차원이 필요하지 않습니다.

:::

**예시**
```ts
[{id: "category", alias: "카테고리"}]




```
### id

**Type:** `string`

:::note{title="설명"}
차원에 해당하는 필드 id

:::

### alias

**Type:** `string | undefined`

:::note{title="설명"}
차원 별칭

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title="설명"}
차원 시간 형식 구성

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title="설명"}
시간 세분화, 날짜 표시 정밀도 결정

:::

### encoding

**Type:** `"tooltip" | "label" | "row" | "column" | undefined`

:::note{title="설명"}
차원 매핑 채널

\- color: 여러 차원을 색상 채널에 매핑 지원

\- detail: 여러 차원을 상세 채널에 매핑 지원

\- tooltip: 여러 차원을 툴팁 채널에 매핑 지원

\- label: 여러 차원을 레이블 채널에 매핑 지원

\- row: 여러 차원을 행 채널에 매핑 지원

\- column: 여러 차원을 열 채널에 매핑 지원

:::


## measures

**Type:** `HistogramMeasure[] | undefined`

:::note{title="설명"}
히스토그램은 하나의 차원만 지원하며, 데이터는 이산 데이터입니다.

:::

**예시**
```ts
[{id: "value", alias: "값"}]




```
### id

**Type:** `string`

:::note{title="설명"}
측정값 id, 중복 불가

:::

### alias

**Type:** `string | undefined`

:::note{title="설명"}
측정값 별칭, 중복 허용, 미입력 시 alias는 id와 동일

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="설명"}
자동 숫자 서식 지정, 기본 활성화, 최우선 순위

autoFormat=true일 경우 numFormat의 모든 구성을 재정의합니다.

활성화되면 차트의 데이터 레이블 및 툴팁이 측정값과 로케일에 따라 자동으로 적절한 서식 방식을 선택합니다.

서식 규칙: 10진수 표기법, compact notation 활성화, 최소 소수점 0자리, 최대 소수점 2자리, 자동 반올림, 브라우저 제공 Intl.NumberFormat 사용

예시:

\- locale이 zh-CN: 749740.264 → 74.45만

\- locale이 en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="설명"}
사용자 정의 측정값 숫자 서식 지정, label, tooltip에 자동 적용

참고: 사용자 정의 서식을 사용하려면 반드시 autoFormat=false를 명시적으로 설정해야 합니다. 그렇지 않으면 autoFormat이 이 구성을 재정의합니다.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="설명"}
숫자 서식 유형, 숫자(10진수), 백분율(%), 천분율(‰), 과학 표기법 지원

:::

#### ratio

**Type:** `number | undefined`

:::note{title="설명"}
숫자 서식 비율, 0이 될 수 없음

:::

**예시**
```ts
\- 100000 → 10만, ratio:10000, symbol:"만"
\- 100000 → 10K, ratio:1000, symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="설명"}
숫자 서식 기호, 예: %, ‰

:::

**예시**
```ts
\- 100000 → 10만, ratio:10000, symbol:"만"
\- 100000 → 10K, ratio:1000, symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="설명"}
숫자 서식 천 단위 구분 기호

:::

#### suffix

**Type:** `string | undefined`

:::note{title="설명"}
숫자 서식 접미사

:::

#### prefix

**Type:** `string | undefined`

:::note{title="설명"}
숫자 서식 접두사

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="설명"}
숫자 서식 소수 자릿수, 브라우저 제공 Intl.NumberFormat의 minimumFractionDigits와 maximumFractionDigits를 사용하여 서식 지정, significantDigits보다 우선순위가 낮음

:::

**예시**
```ts
\- 1234.5678 → 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 → 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 → 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 → 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 → 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 → 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="설명"}
숫자 서식 유효 자릿수, 브라우저 제공 Intl.NumberFormat의 minimumSignificantDigits와 maximumSignificantDigits를 사용하여 서식 지정, fractionDigits보다 우선순위가 높음

:::

**예시**
```ts
\- 1234.5678 → 1000, significantDigits:1
\- 1234.5678 → 1200, significantDigits:2
\- 1234.5678 → 1230, significantDigits:3
\- 1234.5678 → 1234, significantDigits:4
\- 1234.5678 → 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 → 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 → 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 → 1234.5678, significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="설명"}
숫자 서식 반올림 우선순위, significantDigits와 fractionDigits가 동시에 설정된 경우 반올림 우선순위를 처리하며, 브라우저 제공 Intl.NumberFormat을 사용하여 서식 지정, 규칙은 Intl.NumberFormat의 roundingPriority와 동일

:::

**예시**
```ts
\- 1234.5678 → 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 → 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="설명"}
숫자 서식 반올림 모드, 브라우저 제공 Intl.NumberFormat을 사용하여 서식 지정, 규칙은 Intl.NumberFormat의 roundingMode와 동일

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="설명"}
숫자 서식 유형, 숫자(10진수), 백분율(%), 천분율(‰), 과학 표기법 지원

:::

#### ratio

**Type:** `number | undefined`

:::note{title="설명"}
숫자 서식 비율, 0이 될 수 없음

:::

**예시**
```ts
\- 100000 → 10만, ratio:10000, symbol:"만"
\- 100000 → 10K, ratio:1000, symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="설명"}
숫자 서식 기호, 예: %, ‰

:::

**예시**
```ts
\- 100000 → 10만, ratio:10000, symbol:"만"
\- 100000 → 10K, ratio:1000, symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="설명"}
숫자 서식 천 단위 구분 기호

:::

#### suffix

**Type:** `string | undefined`

:::note{title="설명"}
숫자 서식 접미사

:::

#### prefix

**Type:** `string | undefined`

:::note{title="설명"}
숫자 서식 접두사

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="설명"}
숫자 서식 소수 자릿수, 브라우저 제공 Intl.NumberFormat의 minimumFractionDigits와 maximumFractionDigits를 사용하여 서식 지정, significantDigits보다 우선순위가 낮음

:::

**예시**
```ts
\- 1234.5678 → 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 → 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 → 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 → 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 → 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 → 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="설명"}
숫자 서식 유효 자릿수, 브라우저 제공 Intl.NumberFormat의 minimumSignificantDigits와 maximumSignificantDigits를 사용하여 서식 지정, fractionDigits보다 우선순위가 높음

:::

**예시**
```ts
\- 1234.5678 → 1000, significantDigits:1
\- 1234.5678 → 1200, significantDigits:2
\- 1234.5678 → 1230, significantDigits:3
\- 1234.5678 → 1234, significantDigits:4
\- 1234.5678 → 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 → 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 → 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 → 1234.5678, significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="설명"}
숫자 서식 반올림 우선순위, significantDigits와 fractionDigits가 동시에 설정된 경우 반올림 우선순위를 처리하며, 브라우저 제공 Intl.NumberFormat을 사용하여 서식 지정, 규칙은 Intl.NumberFormat의 roundingPriority와 동일

:::

**예시**
```ts
\- 1234.5678 → 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 → 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="설명"}
숫자 서식 반올림 모드, 브라우저 제공 Intl.NumberFormat을 사용하여 서식 지정, 규칙은 Intl.NumberFormat의 roundingMode와 동일

:::

### encoding

**Type:** `"value" | "color" | "tooltip" | "label" | "x0" | "x1" | undefined`

:::note{title="설명"}
측정값 매핑 채널

\- value: 히스토그램의 값 채널

\- x0: 히스토그램의 x0 채널

\- x1: 히스토그램의 x1 채널

\- color: 측정값이 매핑되는 색상

\- label: 측정값이 매핑되는 레이블

\- tooltip: 측정값 매핑 힌트

:::

### parentId

**Type:** `string | undefined`

:::note{title="설명"}
평면적인 측정값 구성 형태로 트리 형태의 측정값 그룹을 구축하며, parentId는 상위 측정값 그룹의 id를 가리켜 측정값 트리를 구축하는 데 사용됩니다

:::

:::tip{title="Tip"}
측정값 트리 구성에는 두 가지 형태가 있습니다. 첫 번째 방식은 children이 포함된 측정값 트리를 직접 구성하는 것이고, 두 번째 방식은 parentId가 있는 평면적인 측정값 목록을 구성하는 것입니다. 두 방식을 동시에 구성할 수 없습니다

:::


## page

**Type:** `Page | undefined`

:::note{title="설명"}
페이지 매김 구성

:::


### field

**Type:** `string`

:::note{title="설명"}
페이지네이션 필드로, 페이지네이션 필드명을 지정하는 데 사용되며, 반드시 차원이어야 합니다

:::

### currentValue

**Type:** `string`

:::note{title="설명"}
현재 페이지네이션 값으로, 현재 페이지네이션의 기준 값을 지정하는 데 사용됩니다

:::

**예시**
```ts
'2023\-01\-01'




```
## backgroundColor

**Type:** `BackgroundColor`

:::note{title="설명"}
차트의 배경색, 배경색은 색상 문자열일 수 있으며, 기본값은 투명 배경입니다. 예: 'red', 'blue', 또는 hex, rgb, rgba '#ff0000', 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title="설명"}
색상 구성으로, 차트의 색상 체계를 정의하는 데 사용되며, 색상 목록, 색상 매핑, 색상 그라데이션 등을 포함합니다

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title="설명"}
이산 색상 배색 체계로, 차트 내 서로 다른 요소의 색상을 정의하는 데 사용됩니다

:::

**예시**
```ts
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



```
### linearColorScheme

**Type:** `string[] | undefined`

:::note{title="설명"}
선형 그라데이션 색상 배색 체계로, 차트 내 서로 다른 요소의 색상을 정의하는 데 사용됩니다

:::

**예시**
```ts
['#FFCDD2, #F8BBD0]



```
### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title="설명"}
색상 매핑으로, 데이터 값을 특정 색상에 매핑하는 데 사용됩니다

:::

**예시**
```ts
{
 'profit': 'red',
 'sales': 'blue',
}



```
### positiveColor

**Type:** `string | undefined`

:::note{title="설명"}
양수/음수 색상 구성으로, 차트에서 양수 값의 색상을 정의하는 데 사용됩니다

:::

### negativeColor

**Type:** `string | undefined`

:::note{title="설명"}
양수/음수 색상 구성으로, 차트에서 음수 값의 색상을 정의하는 데 사용됩니다

:::


## label

**Type:** `Label | undefined`

:::note{title="설명"}
레이블 구성으로, 차트의 데이터 레이블을 정의하는 데 사용되며, 데이터 레이블의 위치, 형식, 스타일 등을 포함합니다

:::


### enable

**Type:** `false | true`

:::note{title="설명"}
레이블 기능 활성화 여부

:::

### wrap

**Type:** `boolean | undefined`

:::note{title="설명"}
레이블 줄바꿈 여부

:::

### showValue

**Type:** `boolean | undefined`

:::note{title="설명"}
레이블에 측정값 표시 여부

다중 측정값 시나리오에서는 여러 측정값 간의 충돌을 걱정할 필요가 없습니다. 모든 그리기 관련 측정값은 `foldMeasures` 처리를 거쳐 하나의 측정값으로 병합되어 하나의 데이터 포인트를 나타내므로 충돌이 발생하지 않습니다

참고: encoding의 label 우선순위가 더 높으며, 이 구성은 encoding의 label에 영향을 미치지 않습니다

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title="설명"}
레이블에 측정값의 백분율 표시 여부

다중 측정값 시나리오에서는 여러 측정값 간의 충돌을 걱정할 필요가 없습니다. 모든 그리기 관련 측정값은 `foldMeasures` 처리를 거쳐 하나의 측정값으로 병합되어 하나의 데이터 포인트를 나타내므로 충돌이 발생하지 않습니다

참고: encoding의 label 우선순위가 더 높으며, 이 구성은 encoding의 label에 영향을 미치지 않습니다

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title="설명"}
레이블에 차원 레이블 표시 여부

모든 차원 레이블 표시

참고: encoding의 label 우선순위가 더 높으며, 이 구성은 encoding의 label에 영향을 미치지 않습니다

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="설명"}
레이블 값 자동 포맷 여부, autoFormat이 true일 경우 numFormat 구성이 적용되지 않습니다

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="설명"}
레이블 값 서식 구성으로, `measure`의 `format`과 병합되며, `measure`의 `format` 우선순위가 더 높습니다. numFormat의 우선순위는 autoFormat보다 낮습니다

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="설명"}
숫자 서식 유형, 숫자(10진수), 백분율(%), 천분율(‰), 과학 표기법 지원

:::

#### ratio

**Type:** `number | undefined`

:::note{title="설명"}
숫자 서식 비율, 0이 될 수 없음

:::

**예시**
```ts
\- 100000 → 10만, ratio:10000, symbol:"만"
\- 100000 → 10K, ratio:1000, symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="설명"}
숫자 서식 기호, 예: %, ‰

:::

**예시**
```ts
\- 100000 → 10만, ratio:10000, symbol:"만"
\- 100000 → 10K, ratio:1000, symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="설명"}
숫자 서식 천 단위 구분 기호

:::

#### suffix

**Type:** `string | undefined`

:::note{title="설명"}
숫자 서식 접미사

:::

#### prefix

**Type:** `string | undefined`

:::note{title="설명"}
숫자 서식 접두사

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="설명"}
숫자 서식 소수 자릿수, 브라우저 제공 Intl.NumberFormat의 minimumFractionDigits와 maximumFractionDigits를 사용하여 서식 지정, significantDigits보다 우선순위가 낮음

:::

**예시**
```ts
\- 1234.5678 → 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 → 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 → 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 → 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 → 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 → 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="설명"}
숫자 서식 유효 자릿수, 브라우저 제공 Intl.NumberFormat의 minimumSignificantDigits와 maximumSignificantDigits를 사용하여 서식 지정, fractionDigits보다 우선순위가 높음

:::

**예시**
```ts
\- 1234.5678 → 1000, significantDigits:1
\- 1234.5678 → 1200, significantDigits:2
\- 1234.5678 → 1230, significantDigits:3
\- 1234.5678 → 1234, significantDigits:4
\- 1234.5678 → 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 → 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 → 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 → 1234.5678, significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="설명"}
숫자 서식 반올림 우선순위, significantDigits와 fractionDigits가 동시에 설정된 경우 반올림 우선순위를 처리하며, 브라우저 제공 Intl.NumberFormat을 사용하여 서식 지정, 규칙은 Intl.NumberFormat의 roundingPriority와 동일

:::

**예시**
```ts
\- 1234.5678 → 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 → 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="설명"}
숫자 서식 반올림 모드, 브라우저 제공 Intl.NumberFormat을 사용하여 서식 지정, 규칙은 Intl.NumberFormat의 roundingMode와 동일

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title="설명"}
레이블 글꼴 크기

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title="설명"}
레이블 글꼴 두께

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title="설명"}
레이블 배경색

:::

### labelStroke

**Type:** `string | undefined`

:::note{title="설명"}
레이블 테두리 색상

:::

### labelColor

**Type:** `string | undefined`

:::note{title="설명"}
레이블 글꼴 색상

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title="설명"}
레이블이 그래픽 요소 색상에 따라 자동으로 글꼴 색상을 반전시킬지 여부

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title="설명"}
레이블 위치

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title="설명"}
레이블 중복 방지 기능 활성화 여부

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="설명"}
레이블 필터, 기본적으로 selectors 간 조건 관계는 Or입니다

:::


#### field

**Type:** `string`

:::note{title="설명"}
차원 필드, dimensions 항목의 id

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="설명"}
연산자

\- in: 데이터 항목 중 차원 필드 값이 value에 포함된 데이터 항목을 선택합니다

\- not in: 데이터 항목 중 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="설명"}
연산자

\- in: 데이터 항목 중 차원 필드 값이 value에 포함된 데이터 항목을 선택합니다

\- not in: 데이터 항목 중 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title="설명"}
데이터 항목 중 차원 필드의 값을 선택하며, 배열을 지원합니다

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title="설명"}
동적 필터(AI 생성 코드 실행)



AI로 생성된 JavaScript 코드를 통해 복잡한 데이터 필터링 로직을 구현합니다



핵심 기능:

\- 모든 복잡한 데이터 필터 조건 지원

\- 내장 유틸리티 함수를 사용한 데이터 조작

\- 브라우저 환경에서 안전하게 실행(Web Worker 샌드박스)



환경 요구사항: 브라우저 환경만 지원하며, Node.js 환경에서는 fallback이 사용됩니다



참고: selector와 dynamicFilter는 동시에 사용할 수 없으며, dynamicFilter의 우선순위가 더 높습니다



차트 동적 필터 구성



AI로 생성된 JavaScript 코드를 통해 차트 마크(막대, 점 등)를 필터링합니다

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title="설명"}
사용자의 필터 요구사항 설명(자연어)

:::

**예시**
```ts
"매출이 1000보다 큰 막대를 강조"

"각 지역에서 수익률이 가장 높은 막대를 강조"



```
#### code

**Type:** `string`

:::note{title="설명"}
AI가 생성한 JavaScript 필터 코드



\- 내장 유틸리티 함수만 사용 가능(_ 또는 R로 접근)

\- 입력 매개변수: data(배열), 각 item은 행 번호를 나타내는 __row_index 필드를 포함합니다

\- 행 인덱스와 필드 조합의 배열을 반환해야 함: ``Array<{ __row_index: number, field: string }>``

\- __row_index는 원본 데이터 항목의 행 번호를 나타내며, field는 강조가 필요한 필드를 나타냅니다

\- 사용 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

:::

**예시**
```ts
매출이 1000보다 큰 데이터 항목의 sales 필드 강조
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

각 지역에서 수익률이 가장 높은 데이터 항목 강조
```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
_.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
_.map(maxItems, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'profit' }
])
);
```

다중 조건 필터링된 데이터 항목 강조
```javascript
const filtered = _.filter(data, item => {
const profitRate = item.profit / item.sales;
return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
_.map(filtered, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'sales' }
])
);
```



```
#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title="설명"}
코드 실행 실패 또는 환경이 지원되지 않을 때의 폴백(fallback) 방안

:::


##### field

**Type:** `string`

:::note{title="설명"}
차원 필드, dimensions 항목의 id

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="설명"}
연산자

\- in: 데이터 항목 중 차원 필드 값이 value에 포함된 데이터 항목을 선택합니다

\- not in: 데이터 항목 중 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title="설명"}
연산자

\- in: 데이터 항목 중 차원 필드 값이 value에 포함된 데이터 항목을 선택합니다

\- not in: 데이터 항목 중 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title="설명"}
데이터 항목 중 차원 필드의 값을 선택하며, 배열을 지원합니다

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title="설명"}
동적 필터 실행 결과(런타임 필드)



`prepare() 단계에서 쓰여지며, 런타임에는 읽기 전용입니다`

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## legend

**Type:** `Legend | undefined`

:::note{title="설명"}
범례 구성으로, 차트의 범례를 정의하는 데 사용되며, 범례의 위치, 형식, 스타일 등을 포함합니다

:::


### enable

**Type:** `boolean | undefined`

:::note{title="설명"}
범례 기능 활성화 여부

:::

**예시**
```ts
enable: true



```
### border

**Type:** `boolean | undefined`

:::note{title="설명"}
범례 테두리 활성화 여부

:::

:::warning{title="Warning"}
이산 범례에만 적용됩니다

:::

**예시**
```ts
border: true



```
### labelColor

**Type:** `string | undefined`

:::note{title="설명"}
범례 글꼴 색상

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title="설명"}
페이지네이터 아이콘 색상

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title="설명"}
페이지네이터 아이콘 비활성화 색상

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title="설명"}
범례 글꼴 크기

:::

**예시**
```ts
labelFontSize: 10



```
### labelFontColor

**Type:** `string | undefined`

:::note{title="설명"}
범례 글꼴 색상

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title="설명"}
범례 글꼴 두께

:::

**예시**
```ts
labelFontWeight: 400



```
### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title="설명"}
범례 모양

:::

:::warning{title="Warning"}
이산 범례에만 적용됩니다

:::

**예시**
```ts
shapeType: 'circle'



```
### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title="설명"}
범례 위치

:::

**예시**
```ts
position: 'rightTop'



```
### maxSize

**Type:** `number | undefined`

:::note{title="설명"}
범례가 많을 경우 최대 열 수 또는 최대 행 수

position이 수평 방향(bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr)인 경우 maxSize는 표시할 열 수를 제어합니다

position이 수직 방향(left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb)인 경우 maxSize는 표시할 행 수를 제어합니다

:::

:::warning{title="Warning"}
이산 범례에만 적용됩니다

:::

**예시**
```ts
maxSize: 2




```
## tooltip

**Type:** `Tooltip | undefined`

:::note{title="설명"}
툴팁 구성으로, 차트의 툴팁을 정의하는 데 사용되며, 툴팁의 위치, 형식, 스타일 등을 포함합니다

:::


### enable

**Type:** `false | true`

:::note{title="설명"}
툴팁 기능 활성화 여부

:::


## brush

**Type:** `Brush | undefined`

:::note{title="설명"}
브러시 선택



브러시 선택 구성으로, brush 선택 기능을 켜거나 끄는 데 사용됩니다



차트 브러시 선택 구성

:::


### enable

**Type:** `boolean | undefined`

:::note{title="설명"}
brush 선택 활성화 여부

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title="설명"}
brush 유형



선택 영역의 모양과 선택 방향을 정의합니다

\- `rect`: 사각형 선택, X축과 Y축 두 방향에서 동시에 선택 가능

\- `polygon`: 다각형 선택, 여러 점을 클릭하여 임의의 다각형을 그려 선택

\- `x`: X축 방향 선택, X축 방향으로만 선택하며 Y축 방향은 제한되지 않음

\- `y`: Y축 방향 선택, Y축 방향으로만 선택하며 X축 방향은 제한되지 않음

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title="설명"}
선택 모드, 단일 선택 또는 다중 선택



선택 모드를 정의합니다

\- `single`: 단일 선택 모드, 한 번에 하나의 선택 영역만 가능

\- `multiple`: 다중 선택 모드, 여러 브러시 선택 상자가 동시에 존재할 수 있습니다

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title="설명"}
브러시 선택 종료 시 선택 상자 지우기 여부

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title="설명"}
브러시 선택된 데이터 스타일



브러시 선택된 데이터 포인트의 스타일 정의

:::


#### opacity

**Type:** `number | undefined`

:::note{title="설명"}
불투명도



브러시 선택된 데이터 포인트의 불투명도, 값 범위 0\-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title="설명"}
테두리 색상

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="설명"}
테두리 너비

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title="설명"}
브러시 선택되지 않은 데이터 스타일



브러시 선택되지 않은 데이터 포인트의 스타일 정의

:::


#### opacity

**Type:** `number | undefined`

:::note{title="설명"}
불투명도



브러시 선택되지 않은 데이터 포인트의 불투명도, 값 범위 0\-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title="설명"}
테두리 색상

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="설명"}
테두리 너비

:::


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title="설명"}
x축, 값 축, x축 구성은 차트의 x축을 정의하는 데 사용되며, x축의 위치, 형식, 스타일 등을 포함합니다.

:::


### visible

**Type:** `boolean | undefined`

:::note{title="설명"}
축 표시 여부

:::

### min

**Type:** `number | undefined`

:::note{title="설명"}
축의 최소값, nice 및 zero보다 우선순위가 높습니다

:::

### max

**Type:** `number | boolean | undefined`

:::note{title="설명"}
축의 최대값, nice 및 zero보다 우선순위가 높으며, true인 경우 데이터 범위에 따라 자동으로 최대값을 계산합니다

:::

### log

**Type:** `boolean | undefined`

:::note{title="설명"}
로그 축 사용 여부, 숫자형 축에만 적용

:::

### logBase

**Type:** `number | undefined`

:::note{title="설명"}
로그 축의 밑, 숫자형 축에만 적용

:::

### nice

**Type:** `boolean | undefined`

:::note{title="설명"}
축의 눈금 간격을 자동으로 조정하여 눈금 레이블을 더 읽기 쉽게 할지 여부, min 및 max가 설정된 경우 이 설정은 적용되지 않으며 숫자형 축에만 적용됩니다

:::

### inverse

**Type:** `boolean | undefined`

:::note{title="설명"}
축 역방향 표시 여부, 숫자형 축에만 적용

:::

### zero

**Type:** `boolean | undefined`

:::note{title="설명"}
축에 0 값을 강제 표시할지 여부, min 및 max가 설정된 경우 이 설정은 적용되지 않으며 숫자형 축에만 적용됩니다.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="설명"}
숫자형 축의 눈금 레이블을 자동으로 포맷할지 여부, 숫자형 축에만 적용되며 autoFormat이 true이면 numFormat 설정이 적용되지 않습니다

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="설명"}
숫자형 축의 숫자 포맷, 숫자형 축에만 적용되며 우선순위는 autoFormat보다 낮습니다

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="설명"}
숫자 서식 유형, 숫자(10진수), 백분율(%), 천분율(‰), 과학 표기법 지원

:::

#### ratio

**Type:** `number | undefined`

:::note{title="설명"}
숫자 서식 비율, 0이 될 수 없음

:::

**예시**
```ts
\- 100000 → 10만, ratio:10000, symbol:"만"
\- 100000 → 10K, ratio:1000, symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="설명"}
숫자 서식 기호, 예: %, ‰

:::

**예시**
```ts
\- 100000 → 10만, ratio:10000, symbol:"만"
\- 100000 → 10K, ratio:1000, symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="설명"}
숫자 서식 천 단위 구분 기호

:::

#### suffix

**Type:** `string | undefined`

:::note{title="설명"}
숫자 서식 접미사

:::

#### prefix

**Type:** `string | undefined`

:::note{title="설명"}
숫자 서식 접두사

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="설명"}
숫자 서식 소수 자릿수, 브라우저 제공 Intl.NumberFormat의 minimumFractionDigits와 maximumFractionDigits를 사용하여 서식 지정, significantDigits보다 우선순위가 낮음

:::

**예시**
```ts
\- 1234.5678 → 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 → 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 → 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 → 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 → 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 → 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="설명"}
숫자 서식 유효 자릿수, 브라우저 제공 Intl.NumberFormat의 minimumSignificantDigits와 maximumSignificantDigits를 사용하여 서식 지정, fractionDigits보다 우선순위가 높음

:::

**예시**
```ts
\- 1234.5678 → 1000, significantDigits:1
\- 1234.5678 → 1200, significantDigits:2
\- 1234.5678 → 1230, significantDigits:3
\- 1234.5678 → 1234, significantDigits:4
\- 1234.5678 → 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 → 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 → 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 → 1234.5678, significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="설명"}
숫자 서식 반올림 우선순위, significantDigits와 fractionDigits가 동시에 설정된 경우 반올림 우선순위를 처리하며, 브라우저 제공 Intl.NumberFormat을 사용하여 서식 지정, 규칙은 Intl.NumberFormat의 roundingPriority와 동일

:::

**예시**
```ts
\- 1234.5678 → 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 → 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="설명"}
숫자 서식 반올림 모드, 브라우저 제공 Intl.NumberFormat을 사용하여 서식 지정, 규칙은 Intl.NumberFormat의 roundingMode와 동일

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title="설명"}
X축 눈금 레이블

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="설명"}
레이블 표시 여부

:::

#### labelColor

**Type:** `string | undefined`

:::note{title="설명"}
레이블 색상

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title="설명"}
레이블 글꼴 크기

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title="설명"}
레이블 글꼴 두께

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title="설명"}
레이블 회전 각도

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title="설명"}
X축 선

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="설명"}
축선 표시 여부

:::

#### lineColor

**Type:** `string | undefined`

:::note{title="설명"}
축선 색상

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="설명"}
축선 너비

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title="설명"}
X축 눈금

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="설명"}
눈금 표시 여부

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title="설명"}
눈금 안쪽 방향 여부

:::

#### tickColor

**Type:** `string | undefined`

:::note{title="설명"}
눈금 색상

:::

#### tickSize

**Type:** `number | undefined`

:::note{title="설명"}
눈금 크기

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title="설명"}
X축 제목

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="설명"}
제목 표시 여부

:::

#### titleText

**Type:** `string | undefined`

:::note{title="설명"}
제목 텍스트, 기본적으로 필드 설정을 따릅니다

:::

#### titleColor

**Type:** `string | undefined`

:::note{title="설명"}
제목 색상

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title="설명"}
제목 글꼴 크기

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title="설명"}
제목 글꼴 두께

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title="설명"}
X축 그리드선

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title="설명"}
그리드선 색상

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title="설명"}
그리드선 너비

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title="설명"}
그리드선 유형

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title="설명"}
Y축 애니메이션 설정

:::


#### duration

**Type:** `number | undefined`

:::note{title="설명"}
애니메이션 지속 시간

:::

#### easing

**Type:** `string | undefined`

:::note{title="설명"}
애니메이션 easing 함수

:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title="설명"}
y축, 값 축, y축 구성, 차트의 y축을 정의하는 데 사용되며 y축의 위치, 형식, 스타일 등을 포함합니다.

:::


### visible

**Type:** `boolean | undefined`

:::note{title="설명"}
축 표시 여부

:::

### min

**Type:** `number | undefined`

:::note{title="설명"}
축의 최소값, nice 및 zero보다 우선순위가 높습니다

:::

### max

**Type:** `number | boolean | undefined`

:::note{title="설명"}
축의 최대값, nice 및 zero보다 우선순위가 높으며, true인 경우 데이터 범위에 따라 자동으로 최대값을 계산합니다

:::

### log

**Type:** `boolean | undefined`

:::note{title="설명"}
로그 축 사용 여부, 숫자형 축에만 적용

:::

### logBase

**Type:** `number | undefined`

:::note{title="설명"}
로그 축의 밑, 숫자형 축에만 적용

:::

### nice

**Type:** `boolean | undefined`

:::note{title="설명"}
축의 눈금 간격을 자동으로 조정하여 눈금 레이블을 더 읽기 쉽게 할지 여부, min 및 max가 설정된 경우 이 설정은 적용되지 않으며 숫자형 축에만 적용됩니다

:::

### inverse

**Type:** `boolean | undefined`

:::note{title="설명"}
축 역방향 표시 여부, 숫자형 축에만 적용

:::

### zero

**Type:** `boolean | undefined`

:::note{title="설명"}
축에 0 값을 강제 표시할지 여부, min 및 max가 설정된 경우 이 설정은 적용되지 않으며 숫자형 축에만 적용됩니다.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="설명"}
숫자형 축의 눈금 레이블을 자동으로 포맷할지 여부, 숫자형 축에만 적용되며 autoFormat이 true이면 numFormat 설정이 적용되지 않습니다

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="설명"}
숫자형 축의 숫자 포맷, 숫자형 축에만 적용되며 우선순위는 autoFormat보다 낮습니다

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="설명"}
숫자 서식 유형, 숫자(10진수), 백분율(%), 천분율(‰), 과학 표기법 지원

:::

#### ratio

**Type:** `number | undefined`

:::note{title="설명"}
숫자 서식 비율, 0이 될 수 없음

:::

**예시**
```ts
\- 100000 → 10만, ratio:10000, symbol:"만"
\- 100000 → 10K, ratio:1000, symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="설명"}
숫자 서식 기호, 예: %, ‰

:::

**예시**
```ts
\- 100000 → 10만, ratio:10000, symbol:"만"
\- 100000 → 10K, ratio:1000, symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="설명"}
숫자 서식 천 단위 구분 기호

:::

#### suffix

**Type:** `string | undefined`

:::note{title="설명"}
숫자 서식 접미사

:::

#### prefix

**Type:** `string | undefined`

:::note{title="설명"}
숫자 서식 접두사

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="설명"}
숫자 서식 소수 자릿수, 브라우저 제공 Intl.NumberFormat의 minimumFractionDigits와 maximumFractionDigits를 사용하여 서식 지정, significantDigits보다 우선순위가 낮음

:::

**예시**
```ts
\- 1234.5678 → 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 → 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 → 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 → 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 → 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 → 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="설명"}
숫자 서식 유효 자릿수, 브라우저 제공 Intl.NumberFormat의 minimumSignificantDigits와 maximumSignificantDigits를 사용하여 서식 지정, fractionDigits보다 우선순위가 높음

:::

**예시**
```ts
\- 1234.5678 → 1000, significantDigits:1
\- 1234.5678 → 1200, significantDigits:2
\- 1234.5678 → 1230, significantDigits:3
\- 1234.5678 → 1234, significantDigits:4
\- 1234.5678 → 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 → 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 → 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 → 1234.5678, significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="설명"}
숫자 서식 반올림 우선순위, significantDigits와 fractionDigits가 동시에 설정된 경우 반올림 우선순위를 처리하며, 브라우저 제공 Intl.NumberFormat을 사용하여 서식 지정, 규칙은 Intl.NumberFormat의 roundingPriority와 동일

:::

**예시**
```ts
\- 1234.5678 → 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 → 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="설명"}
숫자 서식 반올림 모드, 브라우저 제공 Intl.NumberFormat을 사용하여 서식 지정, 규칙은 Intl.NumberFormat의 roundingMode와 동일

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title="설명"}
X축 눈금 레이블

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="설명"}
레이블 표시 여부

:::

#### labelColor

**Type:** `string | undefined`

:::note{title="설명"}
레이블 색상

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title="설명"}
레이블 글꼴 크기

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title="설명"}
레이블 글꼴 두께

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title="설명"}
레이블 회전 각도

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title="설명"}
X축 선

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="설명"}
축선 표시 여부

:::

#### lineColor

**Type:** `string | undefined`

:::note{title="설명"}
축선 색상

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="설명"}
축선 너비

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title="설명"}
X축 눈금

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="설명"}
눈금 표시 여부

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title="설명"}
눈금 안쪽 방향 여부

:::

#### tickColor

**Type:** `string | undefined`

:::note{title="설명"}
눈금 색상

:::

#### tickSize

**Type:** `number | undefined`

:::note{title="설명"}
눈금 크기

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title="설명"}
X축 제목

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="설명"}
제목 표시 여부

:::

#### titleText

**Type:** `string | undefined`

:::note{title="설명"}
제목 텍스트, 기본적으로 필드 설정을 따릅니다

:::

#### titleColor

**Type:** `string | undefined`

:::note{title="설명"}
제목 색상

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title="설명"}
제목 글꼴 크기

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title="설명"}
제목 글꼴 두께

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title="설명"}
X축 그리드선

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title="설명"}
그리드선 색상

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title="설명"}
그리드선 너비

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title="설명"}
그리드선 유형

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title="설명"}
Y축 애니메이션 설정

:::


#### duration

**Type:** `number | undefined`

:::note{title="설명"}
애니메이션 지속 시간

:::

#### easing

**Type:** `string | undefined`

:::note{title="설명"}
애니메이션 easing 함수

:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title="설명"}
세로 툴팁 구성, 차트의 세로 툴팁을 정의하는 데 사용되며 세로 툴팁의 색상, 레이블 스타일 등을 포함합니다.



십자선 사각형 영역 구성은 차트에 십자선 사각형 영역을 표시하는 데 사용되는 구성 유형입니다.

:::


### visible

**Type:** `boolean | undefined`

:::note{title="설명"}
십자선 사각형 영역 표시 여부

:::

### rectColor

**Type:** `string | undefined`

:::note{title="설명"}
십자선 사각형 영역 색상

:::

### labelColor

**Type:** `string | undefined`

:::note{title="설명"}
십자선 사각형 영역 레이블 색상

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title="설명"}
십자선 사각형 영역 레이블 표시 여부

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title="설명"}
십자선 직사각형 영역 레이블 배경색

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title="설명"}
막대 차트 누적 둥근 모서리

:::


## binCount

**Type:** `number | undefined`

:::note{title="설명"}
히스토그램 구간(bin) 개수, 히스토그램의 구간 사각형(막대) 개수를 정의하는 데 사용됩니다.

:::


## binStep

**Type:** `number | undefined`

:::note{title="설명"}
구간 간격, 구간 너비를 계산하는 데 사용되며, 최종 히스토그램에서 사각형(막대)의 너비에도 영향을 줍니다. binCount와 binStep이 동시에 설정된 경우 binStep이 우선 적용됩니다.

:::


## binValueType

**Type:** `"count" | "percentage" | undefined`

:::note{title="설명"}
히스토그램 구간 값 유형, 히스토그램의 구간 사각형(막대) 값 유형을 정의하는 데 사용되며, 기본값은 'count'입니다.

:::


## theme

**Type:** `Theme | undefined`

:::note{title="설명"}
차트 테마, 테마는 우선순위가 낮은 기능 구성으로, 모든 차트 유형에 공통으로 사용되는 일반 구성과 단일 차트 유형에 공통으로 사용되는 차트 구성을 포함하며, light와 dark 두 가지 테마가 내장되어 있고, 사용자는 Builder를 통해 테마를 사용자 지정할 수 있습니다



테마



light, dark 두 가지 테마가 내장되어 있으며, 새로운 테마는 registerTheme으로 커스텀 테마를 등록할 수 있습니다.

:::

**예시**
```ts
'dark'

'light'

'customThemeName'




```
### length

**Type:** `number`

### brand

**Type:** `brand`


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title="설명"}
사각형 그래픽 요소 스타일, 막대 차트 스타일 구성으로, 막대 차트의 색상, 테두리, 둥근 모서리 등을 정의하는 데 사용됩니다.

전역 스타일 또는 조건부 스타일 구성을 지원합니다.

데이터 필터

selector를 구성하면, 값 selector, 로컬 데이터 selector, 조건 차원 selector, 조건 지표 selector 총 4가지 데이터 매칭 기능을 제공합니다.

selector를 구성하지 않으면, 스타일이 전역으로 적용됩니다.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="설명"}
데이터 선택기



selector를 구성하면, 값 selector, 로컬 데이터 selector, 조건 차원 selector, 조건 지표 selector 총 4가지 데이터 매칭 기능을 제공합니다.

selector를 구성하지 않으면, 스타일이 전역으로 적용됩니다.

:::

**예시**
```ts
값 선택기
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

로컬 데이터 선택기
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

조건 차원 선택기
selector = {
field: 'category',
operator: 'in',
value: 'tool'
}
selector = {
field: 'category',
operator: 'not in',
value: 'book'
}

조건 지표 선택기
selector = {
field: 'profit',
operator: '>=',
value: 100
}
selector = {
field: 'profit',
operator: 'between'
value: [100, 300]
}




```
#### field

**Type:** `string`

:::note{title="설명"}
차원 필드, dimensions 항목의 id

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="설명"}
연산자

\- in: 데이터 항목 중 차원 필드 값이 value에 포함된 데이터 항목을 선택합니다

\- not in: 데이터 항목 중 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="설명"}
연산자

\- in: 데이터 항목 중 차원 필드 값이 value에 포함된 데이터 항목을 선택합니다

\- not in: 데이터 항목 중 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title="설명"}
데이터 항목 중 차원 필드의 값을 선택하며, 배열을 지원합니다

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title="설명"}
동적 필터(AI 생성 코드 실행)



AI로 생성된 JavaScript 코드를 통해 복잡한 데이터 필터링 로직을 구현합니다

Top N, 통계 분석, 복잡한 조건 등 정적 selector로 표현하기 어려운 시나리오에 적합합니다.



핵심 기능:

\- 모든 복잡한 데이터 필터 조건 지원

\- 내장 유틸리티 함수를 사용한 데이터 조작

\- 브라우저 환경에서 안전하게 실행(Web Worker 샌드박스)



환경 요구사항: 브라우저 환경만 지원하며, Node.js 환경에서는 fallback이 사용됩니다



참고: selector와 dynamicFilter는 동시에 사용할 수 없으며, dynamicFilter의 우선순위가 더 높습니다



차트 동적 필터 구성



AI로 생성된 JavaScript 코드를 통해 차트 마크(막대, 점 등)를 필터링합니다

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title="설명"}
사용자의 필터 요구사항 설명(자연어)

:::

**예시**
```ts
"매출이 1000보다 큰 막대를 강조"

"각 지역에서 수익률이 가장 높은 막대를 강조"



```
#### code

**Type:** `string`

:::note{title="설명"}
AI가 생성한 JavaScript 필터 코드



\- 내장 유틸리티 함수만 사용 가능(_ 또는 R로 접근)

\- 입력 매개변수: data(배열), 각 item은 행 번호를 나타내는 __row_index 필드를 포함합니다

\- 행 인덱스와 필드 조합의 배열을 반환해야 함: ``Array<{ __row_index: number, field: string }>``

\- __row_index는 원본 데이터 항목의 행 번호를 나타내며, field는 강조가 필요한 필드를 나타냅니다

\- 사용 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

:::

**예시**
```ts
매출이 1000보다 큰 데이터 항목의 sales 필드 강조
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

각 지역에서 수익률이 가장 높은 데이터 항목 강조
```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
_.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
_.map(maxItems, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'profit' }
])
);
```

다중 조건 필터링된 데이터 항목 강조
```javascript
const filtered = _.filter(data, item => {
const profitRate = item.profit / item.sales;
return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
_.map(filtered, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'sales' }
])
);
```



```
#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title="설명"}
코드 실행 실패 또는 환경이 지원되지 않을 때의 폴백(fallback) 방안

:::


##### field

**Type:** `string`

:::note{title="설명"}
차원 필드, dimensions 항목의 id

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="설명"}
연산자

\- in: 데이터 항목 중 차원 필드 값이 value에 포함된 데이터 항목을 선택합니다

\- not in: 데이터 항목 중 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title="설명"}
연산자

\- in: 데이터 항목 중 차원 필드 값이 value에 포함된 데이터 항목을 선택합니다

\- not in: 데이터 항목 중 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title="설명"}
데이터 항목 중 차원 필드의 값을 선택하며, 배열을 지원합니다

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title="설명"}
동적 필터 실행 결과(런타임 필드)



`prepare() 단계에서 쓰여지며, 런타임에는 읽기 전용입니다`

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### barVisible

**Type:** `boolean | undefined`

:::note{title="설명"}
막대 그래픽 요소(직사각형 그래픽 요소) 표시 여부

:::

### barColor

**Type:** `string | undefined`

:::note{title="설명"}
막대 그래픽 요소(직사각형 그래픽 요소) 색상

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title="설명"}
막대 그래픽 요소(직사각형 그래픽 요소) 색상 투명도

:::

### barBorderColor

**Type:** `string | undefined`

:::note{title="설명"}
막대 그래픽 요소(직사각형 그래픽 요소) 테두리 색상

:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title="설명"}
막대 그래픽 요소(직사각형 그래픽 요소) 테두리 두께

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="설명"}
막대 그래픽 요소(직사각형 그래픽 요소) 테두리 스타일

:::

**예시**
```ts
solid

dashed

dotted



```
### barBorderOpacity

**Type:** `number | undefined`

:::note{title="설명"}
막대 그래픽 요소(직사각형 그래픽 요소) 둥근 모서리



막대 그래픽 요소(직사각형 그래픽 요소) 선 투명도

:::

**예시**
```ts
4

[0, 0, 10, 10]



```
### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title="설명"}
레이블 포인트 구성, 선택한 데이터를 기반으로 차트의 레이블 포인트를 정의하며, 레이블 포인트의 위치, 형식, 스타일 등을 포함합니다.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="설명"}
레이블 포인트의 선택기, 데이터 포인트를 선택하는 데 사용됩니다.

:::


#### field

**Type:** `string`

:::note{title="설명"}
차원 필드, dimensions 항목의 id

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="설명"}
연산자

\- in: 데이터 항목 중 차원 필드 값이 value에 포함된 데이터 항목을 선택합니다

\- not in: 데이터 항목 중 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="설명"}
연산자

\- in: 데이터 항목 중 차원 필드 값이 value에 포함된 데이터 항목을 선택합니다

\- not in: 데이터 항목 중 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title="설명"}
데이터 항목 중 차원 필드의 값을 선택하며, 배열을 지원합니다

:::

### measureId

**Type:** `string | undefined`

:::note{title="설명"}
레이블 포인트가 속한 지표 id를 지정합니다. 다중 measure 시나리오에서 selector와 조합하여 대상 지표에 해당하는 레이블 포인트를 고유하게 지정할 수 있습니다.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title="설명"}
동적 필터(AI 생성 코드 실행)



AI로 생성된 JavaScript 코드를 통해 복잡한 데이터 필터링 로직을 구현합니다

Top N, 통계 분석, 복잡한 조건 등 정적 selector로 표현하기 어려운 시나리오에 적합합니다.



핵심 기능:

\- 모든 복잡한 데이터 필터 조건 지원

\- 내장 유틸리티 함수를 사용한 데이터 조작

\- 브라우저 환경에서 안전하게 실행(Web Worker 샌드박스)



환경 요구사항: 브라우저 환경만 지원하며, Node.js 환경에서는 fallback이 사용됩니다



참고: selector와 dynamicFilter는 동시에 사용할 수 없으며, dynamicFilter의 우선순위가 더 높습니다



차트 동적 필터 구성



AI로 생성된 JavaScript 코드를 통해 차트 마크(막대, 점 등)를 필터링합니다

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title="설명"}
사용자의 필터 요구사항 설명(자연어)

:::

**예시**
```ts
"매출이 1000보다 큰 막대를 강조"

"각 지역에서 수익률이 가장 높은 막대를 강조"



```
#### code

**Type:** `string`

:::note{title="설명"}
AI가 생성한 JavaScript 필터 코드



\- 내장 유틸리티 함수만 사용 가능(_ 또는 R로 접근)

\- 입력 매개변수: data(배열), 각 item은 행 번호를 나타내는 __row_index 필드를 포함합니다

\- 행 인덱스와 필드 조합의 배열을 반환해야 함: ``Array<{ __row_index: number, field: string }>``

\- __row_index는 원본 데이터 항목의 행 번호를 나타내며, field는 강조가 필요한 필드를 나타냅니다

\- 사용 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

:::

**예시**
```ts
매출이 1000보다 큰 데이터 항목의 sales 필드 강조
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

각 지역에서 수익률이 가장 높은 데이터 항목 강조
```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
_.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
_.map(maxItems, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'profit' }
])
);
```

다중 조건 필터링된 데이터 항목 강조
```javascript
const filtered = _.filter(data, item => {
const profitRate = item.profit / item.sales;
return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
_.map(filtered, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'sales' }
])
);
```



```
#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title="설명"}
코드 실행 실패 또는 환경이 지원되지 않을 때의 폴백(fallback) 방안

:::


##### field

**Type:** `string`

:::note{title="설명"}
차원 필드, dimensions 항목의 id

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="설명"}
연산자

\- in: 데이터 항목 중 차원 필드 값이 value에 포함된 데이터 항목을 선택합니다

\- not in: 데이터 항목 중 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title="설명"}
연산자

\- in: 데이터 항목 중 차원 필드 값이 value에 포함된 데이터 항목을 선택합니다

\- not in: 데이터 항목 중 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title="설명"}
데이터 항목 중 차원 필드의 값을 선택하며, 배열을 지원합니다

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title="설명"}
동적 필터 실행 결과(런타임 필드)



`prepare() 단계에서 쓰여지며, 런타임에는 읽기 전용입니다`

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title="설명"}
레이블 텍스트

:::

**예시**
```ts
'레이블 텍스트'



```
### textColor

**Type:** `string | undefined`

:::note{title="설명"}
텍스트 색상

:::

**예시**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="설명"}
텍스트 글꼴 크기

:::

**예시**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="설명"}
텍스트 글꼴 두께

:::

**예시**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="설명"}
텍스트 정렬 방식, 일반적으로 right로 설정하면 텍스트가 레이블 포인트 왼쪽에 표시되어 차트의 가시 영역에 표시되도록 합니다.

'right'로 설정하는 것이 좋습니다. 이렇게 하면 텍스트가 레이블 포인트의 왼쪽에 표시됩니다.

right: 텍스트가 레이블 포인트의 왼쪽에 위치하며, 텍스트의 오른쪽 가장자리가 레이블 포인트에 정렬됩니다.

left: 텍스트가 레이블 포인트의 오른쪽에 위치하며, 텍스트의 왼쪽 가장자리가 레이블 포인트에 정렬됩니다.

center: 텍스트가 레이블 포인트의 중앙에 위치하며, 텍스트의 중심이 레이블 포인트에 정렬됩니다.

:::

**예시**
```ts
'right' 텍스트가 레이블 포인트의 왼쪽에 위치합니다.



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="설명"}
텍스트 수직 정렬 방식, 일반적으로 top으로 설정하면 텍스트가 레이블 포인트 하단에 표시되어 차트의 가시 영역에 표시되도록 합니다.

'top'으로 설정하는 것이 좋습니다. 이렇게 하면 텍스트가 차트의 가시 영역에 완전히 표시됩니다.

top: 텍스트가 레이블 포인트의 하단에 위치하며, 텍스트의 상단 가장자리가 레이블 포인트에 정렬됩니다.

middle: 텍스트가 레이블 포인트의 중앙에 위치하며, 텍스트의 중심이 레이블 포인트에 정렬됩니다.

bottom: 텍스트가 레이블 포인트의 상단에 위치하며, 텍스트의 하단 가장자리가 레이블 포인트에 정렬됩니다.

:::

**예시**
```ts
'top' 텍스트가 레이블 포인트의 하단에 위치합니다.



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="설명"}
배경 표시 여부

:::

**예시**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="설명"}
배경 색상

:::

**예시**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="설명"}
배경 테두리 색상

:::

**예시**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="설명"}
배경 테두리 너비

:::

**예시**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="설명"}
배경 테두리 둥글기

:::

**예시**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="설명"}
배경 내부 여백

:::

**예시**
```ts
4



```
### offsetY

**Type:** `number | undefined`

:::note{title="설명"}
레이블 포인트 전체의 Y 방향 오프셋 픽셀 거리, 레이블 포인트가 차트 위(값이 큰 경우)에 있을 때는 양수 값을 설정하는 것이 좋고, 레이블 포인트가 차트 아래(값이 작은 경우)에 있을 때는 음수 값을 설정하는 것이 좋습니다.

음수 값은 전체적으로 위로 오프셋됩니다. 예를 들어 \-10으로 설정하면 전체 레이블 포인트 구성요소(텍스트, 텍스트 배경 포함)가 함께 10픽셀 위로 오프셋됩니다.

양수 값은 전체적으로 아래로 오프셋됩니다. 예를 들어 10으로 설정하면 전체 레이블 포인트 구성요소(텍스트, 텍스트 배경 포함)가 함께 10픽셀 아래로 오프셋됩니다.

:::

**예시**
```ts
offsetY: 5, 레이블 포인트 전체가 5픽셀 아래로 오프셋됩니다.



```
### offsetX

**Type:** `number | undefined`

:::note{title="설명"}
레이블 포인트 전체의 X 방향 오프셋 픽셀 거리, 레이블 포인트가 차트 왼쪽(카테고리 축 시작점)에 있을 때는 양수 값을 설정하는 것이 좋고, 레이블 포인트가 차트 오른쪽(카테고리 축 끝점)에 있을 때는 음수 값을 설정하는 것이 좋습니다.

음수 값은 전체적으로 왼쪽으로 오프셋됩니다. 예를 들어 \-10으로 설정하면 전체 레이블 포인트 구성요소(텍스트, 텍스트 배경 포함)가 함께 10픽셀 왼쪽으로 오프셋됩니다.

양수 값은 전체적으로 오른쪽으로 오프셋됩니다. 예를 들어 10으로 설정하면 전체 레이블 포인트 구성요소(텍스트, 텍스트 배경 포함)가 함께 10픽셀 오른쪽으로 오프셋됩니다.

:::

**예시**
```ts
offsetX: 5, 레이블 포인트 전체가 5픽셀 오른쪽으로 오프셋됩니다.




```
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title="설명"}
값 기준선(구간 값), 세로 방향으로 표시되며, 기준선의 위치, 스타일 등을 설정할 수 있습니다. 구간 값에 해당하는 기준선이 필요한 경우 이 구성을 사용할 수 있습니다.

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title="설명"}
고정된 x 값으로, 수직선을 레이블하는 데 사용됩니다. x 방향이 카테고리 축인 경우 차원 값을 입력할 수 있고, x 방향이 숫자 축인 경우 구체적인 숫자 값을 입력할 수 있습니다.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title="설명"}
동적 필터(AI 생성 코드 실행)



AI로 생성된 JavaScript 코드를 통해 레이블 선의 값을 동적으로 계산합니다.

평균값, 최대값, 분위수, 비즈니스 라인 등과 같이 데이터에 따라 레이블 선 위치를 동적으로 결정해야 하는 경우에 적합합니다.



브라우저 환경만 지원합니다(Web Worker 필요).

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title="설명"}
사용자의 필터 요구사항 설명(자연어)

:::

**예시**
```ts
"판매액이 가장 높은 값을 레이블 선 참조로 가져옵니다"

"평균 판매액을 계산하여 레이블 선에 사용합니다"



```
#### code

**Type:** `string`

:::note{title="설명"}
AI가 생성한 JavaScript 필터 코드



\- 내장 유틸리티 함수만 사용 가능(_ 또는 R로 접근)

\- 입력 매개변수: data (배열)

\- 단일 숫자 또는 문자열을 반환해야 함: number | string

\- 적용 시나리오: 레이블 선(수평선, 수직선)에 필요한 동적 값

\- 사용 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

:::

**예시**
```ts
판매액 최대값을 레이블 선 값으로 가져오기
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

평균값을 계산하여 레이블 선에 사용
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

분위수를 레이블 선으로 가져오기
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

조건에 따라 목표 값 계산
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```



```
#### fallback

**Type:** `string | number | undefined`

:::note{title="설명"}
코드 실행 실패 또는 환경이 지원되지 않을 때의 폴백(fallback) 방안

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title="설명"}
동적 필터 실행 결과(런타임 필드)



`prepare() 단계에서 쓰여지며, 런타임에는 읽기 전용입니다`

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title="설명"}
레이블 텍스트

:::

**예시**
```ts
'레이블 텍스트'



```
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title="설명"}
텍스트 위치, 레이블 선의 레이블 위치(레이블의 선에 대한 상대적 위치)입니다.

:::

**예시**
```ts
'outsideEnd'



```
### textColor

**Type:** `string | undefined`

:::note{title="설명"}
텍스트 색상

:::

**예시**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="설명"}
텍스트 글꼴 크기

:::

**예시**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="설명"}
텍스트 글꼴 두께

:::

**예시**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="설명"}
텍스트 정렬 방식, 일반적으로 설정할 필요가 없습니다.

'right'로 설정하는 것이 좋습니다. 이렇게 하면 텍스트가 레이블 선의 왼쪽에 표시됩니다.

right: 텍스트가 참조선의 왼쪽에 위치하며, 텍스트의 오른쪽 가장자리가 (수직) 레이블 선에 정렬됩니다.

left: 텍스트가 참조선의 오른쪽에 위치하며, 텍스트의 왼쪽 가장자리가 (수직) 레이블 선에 정렬됩니다.

center: 텍스트가 참조선의 중앙에 위치하며, 텍스트의 중심이 (수직) 레이블 선에 정렬됩니다.

:::

**예시**
```ts
'right'



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="설명"}
텍스트 수직 정렬 방식, 일반적으로 설정할 필요가 없습니다.

'top'으로 설정하는 것이 좋습니다. 이렇게 하면 텍스트가 차트의 가시 영역에 완전히 표시됩니다.

top: 텍스트가 참조선의 하단에 위치하며, 텍스트의 상단 가장자리가 (수직) 레이블 선의 끝점에 정렬됩니다.

middle: 텍스트가 참조선의 중앙에 위치하며, 텍스트의 중심이 (수직) 레이블 선의 끝점에 정렬됩니다.

bottom: 텍스트가 참조선의 상단에 위치하며, 텍스트의 하단 가장자리가 (수직) 레이블 선의 끝점에 정렬됩니다.

:::

**예시**
```ts
'top'



```
### lineVisible

**Type:** `boolean | undefined`

:::note{title="설명"}
선 표시 여부

:::

**예시**
```ts
true



```
### lineColor

**Type:** `string | undefined`

:::note{title="설명"}
선 색상

:::

**예시**
```ts
'red'



```
### lineWidth

**Type:** `number | undefined`

:::note{title="설명"}
선 너비

:::

**예시**
```ts
2



```
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="설명"}
선 스타일

:::

**예시**
```ts
'solid'



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="설명"}
배경 표시 여부

:::

**예시**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="설명"}
배경 색상

:::

**예시**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="설명"}
배경 테두리 색상

:::

**예시**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="설명"}
배경 테두리 너비

:::

**예시**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="설명"}
배경 테두리 둥글기

:::

**예시**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="설명"}
배경 내부 여백

:::

**예시**
```ts
4




```
## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title="설명"}
값 기준선(평균선, 최대값선, 최소값선 등 포함), 가로 방향으로 표시되며, 기준선의 위치, 스타일 등을 설정할 수 있습니다. 구간 값에 해당하는 기준선을 그리려면 이 구성을 사용하세요. 구간 값은 `binValueType`의 영향을 받습니다.

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title="설명"}
고정된 y 값으로, 수평선을 레이블하는 데 사용됩니다. y 방향이 카테고리 축인 경우 차원 값을 입력할 수 있고, y 방향이 숫자 축인 경우 구체적인 숫자 값을 입력할 수 있습니다.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title="설명"}
동적 필터(AI 생성 코드 실행)



AI로 생성된 JavaScript 코드를 통해 레이블 선의 값을 동적으로 계산합니다.

평균값, 최대값, 분위수, 비즈니스 라인 등과 같이 데이터에 따라 레이블 선 위치를 동적으로 결정해야 하는 경우에 적합합니다.



브라우저 환경만 지원합니다(Web Worker 필요).

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title="설명"}
사용자의 필터 요구사항 설명(자연어)

:::

**예시**
```ts
"판매액이 가장 높은 값을 레이블 선 참조로 가져옵니다"

"평균 판매액을 계산하여 레이블 선에 사용합니다"



```
#### code

**Type:** `string`

:::note{title="설명"}
AI가 생성한 JavaScript 필터 코드



\- 내장 유틸리티 함수만 사용 가능(_ 또는 R로 접근)

\- 입력 매개변수: data (배열)

\- 단일 숫자 또는 문자열을 반환해야 함: number | string

\- 적용 시나리오: 레이블 선(수평선, 수직선)에 필요한 동적 값

\- 사용 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

:::

**예시**
```ts
판매액 최대값을 레이블 선 값으로 가져오기
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

평균값을 계산하여 레이블 선에 사용
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

분위수를 레이블 선으로 가져오기
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

조건에 따라 목표 값 계산
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```



```
#### fallback

**Type:** `string | number | undefined`

:::note{title="설명"}
코드 실행 실패 또는 환경이 지원되지 않을 때의 폴백(fallback) 방안

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title="설명"}
동적 필터 실행 결과(런타임 필드)



`prepare() 단계에서 쓰여지며, 런타임에는 읽기 전용입니다`

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title="설명"}
레이블 텍스트

:::

**예시**
```ts
'레이블 텍스트'



```
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title="설명"}
텍스트 위치



레이블 선의 레이블 위치(레이블의 선에 대한 상대적 위치)입니다.

:::

**예시**
```ts
'outsideEnd'



```
### textColor

**Type:** `string | undefined`

:::note{title="설명"}
텍스트 색상

:::

**예시**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="설명"}
텍스트 글꼴 크기

:::

**예시**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="설명"}
텍스트 글꼴 두께

:::

**예시**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="설명"}
텍스트 정렬 방식, 일반적으로 설정할 필요가 없습니다.

'right'로 설정하는 것이 좋습니다. 이렇게 하면 텍스트가 레이블 선의 왼쪽에 표시됩니다.

right: 텍스트가 참조선의 왼쪽에 위치하며, 텍스트의 오른쪽 가장자리가 (수평) 레이블 선의 끝점에 정렬됩니다.

left: 텍스트가 참조선의 오른쪽에 위치하며, 텍스트의 왼쪽 가장자리가 (수평) 레이블 선의 끝점에 정렬됩니다.

center: 텍스트가 참조선의 중앙에 위치하며, 텍스트의 중심이 (수평) 레이블 선의 끝점에 정렬됩니다.

:::

**예시**
```ts
'right'



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="설명"}
텍스트 수직 정렬 방식, 일반적으로 설정할 필요가 없습니다.

'top'으로 설정하는 것이 좋습니다. 이렇게 하면 텍스트가 차트의 가시 영역에 완전히 표시됩니다.

top: 텍스트가 참조선의 하단에 위치하며, 텍스트의 상단 가장자리가 (수평) 레이블 선에 정렬됩니다.

middle: 텍스트가 기준선의 중앙에 위치, 텍스트의 중앙이 (수평) 주석선에 정렬됨

bottom: 텍스트가 기준선의 상단에 위치, 텍스트의 하단 가장자리가 (수평) 주석선에 정렬됨

:::

**예시**
```ts
'top'



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="설명"}
배경 표시 여부

:::

**예시**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="설명"}
배경 색상

:::

**예시**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="설명"}
배경 테두리 색상

:::

**예시**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="설명"}
배경 테두리 너비



배경 테두리 너비

:::

**예시**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="설명"}
배경 테두리 둥글기

:::

**예시**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="설명"}
배경 내부 여백

:::

**예시**
```ts
4



```
### lineVisible

**Type:** `boolean | undefined`

:::note{title="설명"}
선 표시 여부



선 표시 여부

:::

**예시**
```ts
true



```
### lineColor

**Type:** `string | undefined`

:::note{title="설명"}
선 색상

:::

**예시**
```ts
'red'



```
### lineWidth

**Type:** `number | undefined`

:::note{title="설명"}
선 너비

:::

**예시**
```ts
2



```
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="설명"}
선 스타일

:::

**예시**
```ts
'solid'



```
### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title="설명"}
주선을 두 구간으로 분리하는 기능 활성화 여부

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title="설명"}
주석 값보다 큰 부분에 해당하는 주 색상

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title="설명"}
주석 값보다 작은 부분에 해당하는 주 색상

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title="설명"}
주석 영역 구성, 선택한 데이터에 따라 차트의 주석 영역(위치, 스타일 등)을 정의합니다.

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title="설명"}
선택한 데이터를 기반으로 데이터 마킹을 수행합니다.

:::


#### field

**Type:** `string`

:::note{title="설명"}
차원 필드, dimensions 항목의 id

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="설명"}
연산자

\- in: 데이터 항목 중 차원 필드 값이 value에 포함된 데이터 항목을 선택합니다

\- not in: 데이터 항목 중 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="설명"}
연산자

\- in: 데이터 항목 중 차원 필드 값이 value에 포함된 데이터 항목을 선택합니다

\- not in: 데이터 항목 중 차원 필드 값이 value에 포함되지 않은 데이터 항목을 선택합니다

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title="설명"}
데이터 항목 중 차원 필드의 값을 선택하며, 배열을 지원합니다

:::

### text

**Type:** `string | string[] | undefined`

:::note{title="설명"}
레이블 텍스트

:::

**예시**
```ts
'레이블 텍스트'



```
### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title="설명"}
텍스트 위치

:::

**예시**
```ts
'top'



```
### textColor

**Type:** `string | undefined`

:::note{title="설명"}
텍스트 색상

:::

**예시**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="설명"}
텍스트 글꼴 크기

:::

**예시**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="설명"}
텍스트 글꼴 두께

:::

**예시**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="설명"}
텍스트 정렬 방식, 일반적으로 right로 설정하면 텍스트가 주석 영역 중간에 표시되어 차트의 가시 영역에 표시되도록 합니다.

'center'로 설정하는 것을 권장합니다. 이렇게 하면 텍스트가 주석 영역의 중앙에 위치합니다.

right: 텍스트가 주석 영역의 왼쪽에 위치, 텍스트의 오른쪽 가장자리가 주석 영역에 정렬됨

left: 텍스트가 주석 영역의 오른쪽에 위치, 텍스트의 왼쪽 가장자리가 주석 영역에 정렬됨

center: 텍스트가 주석 영역의 중앙에 위치, 텍스트의 중심이 주석 영역에 정렬됨

:::

**예시**
```ts
'center' 텍스트가 주석 영역의 중간에 위치



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="설명"}
텍스트 수직 정렬 방식, 일반적으로 top으로 설정하면 텍스트가 주석 영역 하단에 표시되어 차트의 가시 영역에 표시되도록 합니다.

'top'으로 설정하는 것이 좋습니다. 이렇게 하면 텍스트가 차트의 가시 영역에 완전히 표시됩니다.

top: 텍스트가 주석 영역의 하단에 위치, 텍스트의 상단 가장자리가 주석 영역에 정렬됨

middle: 텍스트가 주석 영역의 중앙에 위치, 텍스트의 중심이 주석 영역에 정렬됨

bottom: 텍스트가 주석 영역의 상단에 위치, 텍스트의 하단 가장자리가 주석 영역에 정렬됨

:::

**예시**
```ts
'top' 텍스트가 주석 영역의 하단에 위치



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="설명"}
배경 표시 여부

:::

**예시**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="설명"}
배경 색상

:::

**예시**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="설명"}
배경 테두리 색상



배경 테두리 색상

:::

**예시**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="설명"}
배경 테두리 너비

:::

**예시**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="설명"}
배경 테두리 둥글기



배경 테두리 둥글기

:::

**예시**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="설명"}
배경 내부 여백

:::

**예시**
```ts
4



```
### areaColor

**Type:** `string | undefined`

:::note{title="설명"}
주석 영역 색상

:::

**예시**
```ts
'red'



```
### areaColorOpacity

**Type:** `number | undefined`

:::note{title="설명"}
주석 영역 색상 투명도

:::

**예시**
```ts
0.5



```
### areaBorderColor

**Type:** `string | undefined`

:::note{title="설명"}
주석 영역 테두리 색상

:::

**예시**
```ts
'red'



```
### areaBorderWidth

**Type:** `number | undefined`

:::note{title="설명"}
주석 영역 테두리 너비

:::

**예시**
```ts
2



```
### areaBorderRadius

**Type:** `number | undefined`

:::note{title="설명"}
주석 영역 테두리 둥글기

:::

**예시**
```ts
4



```
### areaLineDash

**Type:** `number[] | undefined`

:::note{title="설명"}
주석 영역 테두리 선 스타일

:::

**예시**
```ts
[2, 2]



```
### outerPadding

**Type:** `number | undefined`

:::note{title="설명"}
주석 영역 여백

:::

**예시**
```ts
0




```
## kdeRegressionLine

**Type:** `KdeRegressionLine | KdeRegressionLine[] | undefined`

:::note{title="설명"}
커널 밀도 회귀선 구성, 데이터의 추세와 분포를 표시하는 데 사용됩니다.

:::


### enable

**Type:** `boolean | undefined`

:::note{title="설명"}
회귀선 기능 활성화 여부

:::

### color

**Type:** `string | undefined`

:::note{title="설명"}
회귀선 색상

회귀선 색상을 설정하는 데 사용되며, 설정하지 않으면 기본적으로 차트의 주 색상이 사용됩니다

:::

### lineWidth

**Type:** `number | undefined`

:::note{title="설명"}
회귀선 너비

회귀선 너비를 설정하는 데 사용되며, 단위는 픽셀이고 기본값은 1입니다

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title="설명"}
회귀선 스타일

회귀선 스타일을 설정하는 데 사용되며, 예를 들어 실선, 점선 등이 있고 기본값은 실선입니다

:::

### text

**Type:** `string | undefined`

:::note{title="설명"}
회귀선 레이블 텍스트

회귀선의 레이블 텍스트를 설정하는 데 사용되며, 빈 문자열은 레이블을 표시하지 않음을 의미합니다

:::

### textColor

**Type:** `string | undefined`

:::note{title="설명"}
텍스트 색상

:::

**예시**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="설명"}
텍스트 글꼴 크기

:::

**예시**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="설명"}
텍스트 글꼴 두께

:::

**예시**
```ts
400




```
## ecdfRegressionLine

**Type:** `EcdfRegressionLine | EcdfRegressionLine[] | undefined`

:::note{title="설명"}
경험적 누적 분포 함수 회귀선 구성, 데이터의 누적 분포를 표시하는 데 사용됩니다.

:::


### enable

**Type:** `boolean | undefined`

:::note{title="설명"}
활성화 여부

:::

### color

**Type:** `string | undefined`

:::note{title="설명"}
회귀선 색상

회귀선 색상을 설정하는 데 사용되며, 설정하지 않으면 기본적으로 차트의 주 색상이 사용됩니다

:::

### lineWidth

**Type:** `number | undefined`

:::note{title="설명"}
회귀선 너비

회귀선 너비를 설정하는 데 사용되며, 단위는 픽셀이고 기본값은 1입니다

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title="설명"}
회귀선 스타일

회귀선 스타일을 설정하는 데 사용되며, 예를 들어 실선, 점선 등이 있고 기본값은 실선입니다

:::

### text

**Type:** `string | undefined`

:::note{title="설명"}
회귀선 레이블 텍스트

회귀선의 레이블 텍스트를 설정하는 데 사용되며, 빈 문자열은 레이블을 표시하지 않음을 의미합니다

:::

### textColor

**Type:** `string | undefined`

:::note{title="설명"}
텍스트 색상

:::

**예시**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="설명"}
텍스트 글꼴 크기

:::

**예시**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="설명"}
텍스트 글꼴 두께

:::

**예시**
```ts
400




```
## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title="설명"}
차트에서 피벗 기능이나 지표 조합이 활성화된 경우, 차원 연결 기능을 활성화할지 여부

특정 차원 값을 hover할 때, 다른 차트에서 동일한 차원 값의 데이터를 연결하여 강조 표시합니다.



피벗 차트 차원 연결 구성

:::


### enable

**Type:** `false | true`

:::note{title="설명"}
피벗 차트 차원 연결 활성화 여부

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title="설명"}
모든 차원에 해당하는 서브 차트의 Tooltip 정보 표시 여부

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title="설명"}
crosshair에 해당하는 레이블 표시 여부

:::


## locale

**Type:** `Locale | undefined`

:::note{title="설명"}
차트 언어 구성, 'zh\-CN'과 'en\-US' 두 가지 언어를 지원하며, intl.setLocale('zh\-CN') 메서드를 호출하여 언어를 설정할 수도 있습니다.

:::

