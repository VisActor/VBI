# Heatmap

:::info{title="권장"}
\- 권장 필드 구성: `1`개 측정값, `2`개 차원

\- 데이터 재구성 지원: 최소 `1`개 측정값, `0`개 차원

:::

:::info{title="인코딩 매핑"}
히트맵은 다음 시각적 채널을 지원합니다:

`xAxis`      : X축 채널, `여러 차원`을 지원하며, 차원 값에 따라 X축에 매핑됩니다.

`yAxis`      : Y축 채널, `여러 차원`을 지원하며, 차원 값에 따라 Y축에 매핑됩니다.

`detail` : 세분화 채널, `여러 차원`을 지원하며, 동일한 색상 계열에서 더 세분화된 데이터를 표시할 때 사용합니다.

`color`  : 색상 채널, `하나의 지표`를 지원하며, 지표 값에 따라 색상에 매핑됩니다.

`tooltip`: 툴팁 채널, `여러 차원`과 `여러 측정값` 지원, 데이터 포인트에 마우스를 올리면 표시

`label`  : 레이블 채널, `여러 차원`과 `여러 측정값` 지원, 데이터 포인트에 데이터 레이블 표시

:::

:::note{title="설명"}
히트맵, 2차원 매트릭스의 색상 농담을 통해 데이터의 분포와 강약 관계를 표시합니다.

적용 시나리오:

\- 대규모 2차원 데이터의 밀도 및 강도 표시

\- 분류와 수치의 연관 분석

\- 시계열과 카테고리의 교차 비교

:::

:::warning{title="Warning"}
데이터 요구 사항:

\- 최소 2개의 차원 필드, 히트맵의 행과 열을 결정하는 데 사용됩니다.

\- 최소 1개의 숫자 필드(측정값), 색상 농담 매핑에 사용됩니다.

\- 여러 지표를 지원하는 경우, 일반적으로 하나의 지표를 선택하여 색상 매핑을 수행합니다.

기본 활성화 기능:

\- 기본적으로 범례, 축, 데이터 레이블, 툴팁, 값 스케일링이 활성화됩니다.

:::


## chartType

**Type:** `"heatmap"`

:::note{title="설명"}
히트맵



히트맵, 2차원 매트릭스의 색상 농담을 통해 데이터의 분포와 강약 관계를 표시합니다.

:::

**예시**
```ts
'heatmap'




```
## dataset

**Type:** `Record[]`

:::note{title="설명"}
데이터셋



TidyData 규격을 준수하고 이미 집계된 데이터셋으로, 차트의 데이터 소스와 구조를 정의하는 데 사용됩니다. 사용자가 입력한 데이터셋은 별도의 처리가 필요하지 않으며, VSeed는 강력한 데이터 리쉐이핑 기능을 갖추고 있어 자체적으로 데이터를 재구성합니다. 히트맵의 데이터는 최종적으로 2개의 차원, 1개의 지표로 변환됩니다.

:::

**예시**
```ts
[{month:'1월', value:100}, {month:'2월', value:150}, {month:'3월', value:120}]




```
## dimensions

**Type:** `HeatmapDimension[] | undefined`

:::note{title="설명"}
차원



히트맵의 첫 번째 차원은 각도 축에 매핑되고, 나머지 차원은 지표 이름(여러 지표가 있는 경우)과 병합되어 범례 항목으로 표시됩니다.

:::

**예시**
```ts
[{id: 'category', alias: '카테고리'}]




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

**Type:** `"xAxis" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title="설명"}
차원 매핑 채널

\- xAxis: 여러 차원을 x축에 매핑 지원

\- yAxis: 여러 차원을 y축에 매핑하는 것을 지원합니다.

\- tooltip: 여러 차원을 툴팁 채널에 매핑 지원

\- label: 여러 차원을 레이블 채널에 매핑 지원

\- row: 여러 차원을 행 채널에 매핑 지원

\- column: 여러 차원을 열 채널에 매핑 지원

:::


## measures

**Type:** `HeatmapMeasure[] | undefined`

:::note{title="설명"}
측정값



히트맵의 지표는 자동으로 하나의 지표로 병합되어 반경 축에 매핑되며, 여러 지표가 있는 경우 지표 이름이 나머지 차원과 병합되어 범례 항목으로 표시됩니다.

:::

**예시**
```ts
[{id: 'value', alias: '값'}]




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

**Type:** `"color" | "tooltip" | "label" | undefined`

:::note{title="설명"}
측정값 매핑 채널

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
차트의 배경 색상



배경 색상은 'red', 'blue'와 같은 색상 문자열일 수도 있고, hex, rgb 또는 rgba '#ff0000', 'rgba(255,0,0,0.5)'일 수도 있습니다

:::


## color

**Type:** `Color | undefined`

:::note{title="설명"}
색상



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
히트맵 레이블 구성, 차트의 데이터 레이블을 정의하는 데 사용되며, 레이블 반전 색상이 자동으로 활성화되어 레이블 가독성을 보장합니다.

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

**Type:** `ColorLegend | undefined`

:::note{title="설명"}
범례



히트맵의 색상 범례 구성, 차트의 범례를 정의하는 데 사용되며, 범례의 위치, 형식, 스타일 등을 포함합니다.

:::


### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title="설명"}
범례 위치

:::

**예시**
```ts
position: 'rightTop'



```
### enable

**Type:** `boolean | undefined`

:::note{title="설명"}
범례 기능 활성화 여부

:::

**예시**
```ts
enable: true



```
### labelColor

**Type:** `string | undefined`

:::note{title="설명"}
범례 글꼴 색상

:::

### labelFontColor

**Type:** `string | undefined`

:::note{title="설명"}
범례 글꼴 색상

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
### labelFontWeight

**Type:** `string | number | undefined`

:::note{title="설명"}
범례 글꼴 두께

:::

**예시**
```ts
labelFontWeight: 400



```
### railBackgroundColor

**Type:** `string | undefined`

### handlerBorderColor

**Type:** `string | undefined`


## tooltip

**Type:** `Tooltip | undefined`

:::note{title="설명"}
툴팁



히트맵의 툴팁 구성, 차트의 툴팁을 정의하는 데 사용되며, 툴팁의 위치, 형식, 스타일 등을 포함합니다.

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


## theme

**Type:** `Theme | undefined`

:::note{title="설명"}
차트의 테마, 테마는 우선순위가 낮은 기능 설정으로, 모든 차트 유형에 공통되는 일반 설정과 단일 차트 유형에 공통되는 차트 설정을 포함합니다



light와 dark 두 가지 테마가 내장되어 있으며, 사용자는 Builder를 통해 테마를 사용자 정의할 수 있습니다



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


## locale

**Type:** `Locale | undefined`

:::note{title="설명"}
언어



차트 언어 구성, 'zh\-CN'과 'en\-US' 두 가지 언어를 지원하며, intl.setLocale('zh\-CN') 메서드를 호출하여 언어를 설정할 수도 있습니다.

:::

