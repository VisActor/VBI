# PivotTable

:::info{title="권장"}
\- 권장 필드 구성: `1`개 측정값, `1`개 차원

\- 데이터 재구성 지원: 최소 `1`개 측정값, `0`개 차원

:::

:::info{title="인코딩 매핑"}
피벗 테이블은 다음 시각적 채널을 지원합니다:

`row`    : 행 차원, `여러 차원` 지원, 차원 값에 따라 행에서 그룹화

`column` : 열 차원, `여러 차원` 지원, 차원 값에 따라 열에서 그룹화

`detail` : 세분화 채널, `여러 지표` 지원, 셀에 지표 값 표시

:::

:::note{title="설명"}
피벗 테이블, 다차원 데이터 교차 분석 시나리오에 적합하며, 행/열 차원 및 지표 계산 방식을 유연하게 구성 가능

적용 시나리오:

\- 복잡한 다차원 데이터 통계 분석

\- 데이터 드릴다운 및 집계 표시

\- 비즈니스 보고서 생성 및 데이터 탐색

:::

:::warning{title="Warning"}
데이터 요구 사항:

\- 최소 1개의 행 차원 또는 1개의 열 차원 또는 1개의 지표

\- 데이터가 반드시 집계되어야 함

\- 데이터를 그룹화할 수 있음

기본 활성화 기능:

\- 기본적으로 행/열 정렬, 데이터 필터링, 집계 계산, 소계/합계 활성화

:::


## chartType

**Type:** `"pivotTable"`

:::note{title="설명"}
피벗 테이블, 다차원 데이터 교차 분석 시나리오에 적합

:::

**예시**
```ts
'pivotTable'




```
## dataset

**Type:** `Record[]`

:::note{title="설명"}
TidyData 규격을 따르고 이미 집계된 데이터셋으로, 차트의 데이터 소스와 구조를 정의하는 데 사용됩니다. 사용자가 입력한 데이터셋은 별도의 처리가 필요하지 않으며, VSeed는 강력한 데이터 재구성 기능을 통해 자체적으로 데이터를 재구성합니다. 피벗 테이블의 데이터는 최종적으로 해당 트리 구조로 변환되므로 사용자가 수동으로 데이터를 처리할 필요가 없습니다.

:::

**예시**
```ts
[{region:'화동', product:'A', sales:1000}, {region:'화동', product:'B', sales:1500}]




```
## dimensions

**Type:** `TableDimension[] | undefined`

:::note{title="설명"}
피벗 테이블의 행 차원과 열 차원은 자동으로 데이터를 트리 구조로 처리하여 행 축과 열 축에 매핑합니다.

:::

**예시**
```ts
[{id: 'region', alias: '지역', isRow: true}, {id: 'product', alias: '제품', isColumn: true}]




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

**Type:** `"row" | "column" | undefined`

:::note{title="설명"}
차원 매핑 채널

\- row: 여러 차원을 행 채널에 매핑 지원

\- column: 여러 차원을 열 채널에 매핑 지원

:::


## measures

**Type:** `TableMeasure[] | undefined`

:::note{title="설명"}
피벗 테이블은 여러 차원 지표를 지원합니다

:::

**예시**
```ts
[{id: 'sales', alias: '매출', aggregation: 'sum'}]




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

**Type:** `"column" | undefined`

:::note{title="설명"}
측정값 매핑 채널

\- column: 지표 열

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
페이지 매김 구성, 페이지 매김 필드 이름을 지정하는 데 사용되며, 반드시 차원이어야 합니다.

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
배경 색상은 'red', 'blue'와 같은 색상 문자열일 수도 있고, hex, rgb 또는 rgba '#ff0000', 'rgba(255,0,0,0.5)'일 수도 있습니다

:::


## borderColor

**Type:** `string | undefined`

:::note{title="설명"}
테이블의 테두리 색상

:::


## bodyFontSize

**Type:** `number | undefined`

:::note{title="설명"}
테이블 본문의 글꼴 크기

:::


## bodyFontColor

**Type:** `string | undefined`

:::note{title="설명"}
테이블 본문의 글꼴 색상

:::


## bodyBackgroundColor

**Type:** `string | undefined`

:::note{title="설명"}
테이블 본문의 배경 색상

:::


## headerFontSize

**Type:** `number | undefined`

:::note{title="설명"}
행 헤더, 열 헤더의 글꼴 크기

:::


## headerFontColor

**Type:** `string | undefined`

:::note{title="설명"}
행 헤더, 열 헤더의 글꼴 색상

:::


## headerBackgroundColor

**Type:** `string | undefined`

:::note{title="설명"}
행 헤더, 열 헤더의 배경 색상

:::


## hoverHeaderBackgroundColor

**Type:** `string | undefined`

:::note{title="설명"}
마우스를 행/열 헤더 셀에 올렸을 때의 배경 색상으로, 마우스가 위치한 행과 열이 교차하는 셀을 강조 표시하는 데 사용됩니다.

:::


## hoverHeaderInlineBackgroundColor

**Type:** `string | undefined`

:::note{title="설명"}
마우스를 행/열 헤더 셀에 올렸을 때, 마우스가 위치한 행과 열의 모든 셀을 강조 표시하는 데 사용됩니다.

:::


## selectedBorderColor

**Type:** `string | undefined`

:::note{title="설명"}
선택한 셀의 테두리 색상으로, 선택한 셀을 강조 표시하는 데 사용됩니다.

:::


## selectedBackgroundColor

**Type:** `string | undefined`

:::note{title="설명"}
선택한 셀의 배경 색상으로, 선택한 셀을 강조 표시하는 데 사용됩니다.

:::


## bodyCellStyle

**Type:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note{title="설명"}
테이블 본문 부분 셀의 특수 스타일 설정

:::


### selector

**Type:** `Selector | Selectors | FieldSelector | undefined`

:::note{title="설명"}
데이터 선택기



selector를 구성하면, 값 selector, 로컬 데이터 selector, 조건 차원 selector, 조건 지표 selector 총 4가지 데이터 매칭 기능을 제공합니다.

selector를 구성하지 않으면, 스타일이 전역으로 적용됩니다.



참고: selector와 dynamicFilter는 동시에 사용할 수 없으며, dynamicFilter의 우선순위가 더 높습니다

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

필드 열 필터링
selector = {
field: 'category'
}
selector = {
field: ['category', 'profit']
}




```
#### field

**Type:** `string | string[]`

:::note{title="설명"}
필드 이름, 단일 필드 또는 여러 필드의 배열일 수 있음

:::

**예시**
```ts
단일 필드
field: 'sales'

여러 필드
field: ['sales', 'profit', 'revenue']



```
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

**Type:** `TableDynamicFilter | undefined`

:::note{title="설명"}
동적 필터(코드 기반)



AI로 생성된 JavaScript 코드를 통해 복잡한 데이터 필터링 로직을 구현합니다

Top N, 통계 분석, 복잡한 조건 등 정적 selector로 표현하기 어려운 시나리오에 적합합니다.



핵심 기능:

\- 모든 복잡한 데이터 필터 조건 지원

\- 내장 유틸리티 함수를 사용한 데이터 조작

\- 브라우저 환경에서 안전하게 실행(Web Worker 샌드박스)



환경 요구사항: 브라우저 환경만 지원하며, Node.js 환경에서는 fallback이 사용됩니다



참고: selector와 dynamicFilter는 동시에 사용할 수 없으며, dynamicFilter의 우선순위가 더 높습니다



테이블 동적 필터 구성



AI가 생성한 JavaScript 코드를 통해 테이블 셀 수준의 정밀 필터링 구현

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
"매출가 1000보다 큰 셀 강조"

"각 행의 최대값이 위치한 셀 강조"



```
#### code

**Type:** `string`

:::note{title="설명"}
AI가 생성한 JavaScript 필터 코드



\- 내장 유틸리티 함수만 사용 가능(_ 또는 R로 접근)

\- 입력 매개변수: data (배열), 각 item은 행 번호를 나타내는 _index 필드를 포함

\- 반드시 셀 선택기 배열 반환: ``Array<{ __row_index: number, field: string }>``

\- field가 "*"이면 전체 행 강조를 의미

\- 사용 금지: eval, Function, 비동기 작업, DOM API, 네트워크 요청

:::

**예시**
```ts
Top N 필터링
dynamicFilter = {
type: 'row\-with\-field',
description: '매출가 가장 높은 상위 3개 제품 강조',
code: `
const sorted = _.sortBy(data, 'sales');
const reversed = [...sorted].reverse();
const result = _.take(reversed, 3);
return _.flatten(
`_.map(result, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

다중 조건 필터링
dynamicFilter = {
type: 'row\-with\-field',
description: '이익률가 20% 초과이고 매출가 5000을 초과하는 제품 강조',
code: `
const matched = _.filter(data, item => {
const profitRate = (item.profit / item.sales) * 100;
return profitRate > 20 && item.sales > 5000;
});
return _.flatten(
`_.map(matched, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

상대값 필터링
dynamicFilter = {   *
type: 'row\-with\-field',
description: '평균보다 매출가 높은 제품 강조',
code: `
const avgSales = _.meanBy(data, 'sales');
const matched = _.filter(data, item => item.sales > avgSales);
return _.flatten(
`_.map(matched, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

그룹별 필터링
dynamicFilter = {
type: 'row\-with\-field',
description: '각 지역에서 매출가 가장 높은 제품',
code: `
const grouped = _.groupBy(data, 'region');
const topByRegion = _.map(_.values(grouped), group => _.maxBy(group, 'sales'));
return _.flatten(
`_.map(topByRegion, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

전체 행 강조
dynamicFilter = {
description: '매출가 이익보다 큰 전체 행 강조',
code: `
const matched = _.filter(data, item => item.sales > item.profit);
`return matched.map(item => ({`
__row_index: item._index,
field: '*'
}));
`,
enabled: true
}



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

### backgroundColor

**Type:** `string | undefined`

:::note{title="설명"}
셀 배경색

:::

### enableBackgroundColorScale

**Type:** `boolean | undefined`

:::note{title="설명"}
배경색의 색상 척도(color scale) 구성 활성화 여부

:::

### backgroundColorScale

**Type:** `{ minValue?: number; maxValue?: number; minColor: string; maxColor: string; } | undefined`

:::note{title="설명"}
셀 배경색 scale 매핑, backgroundColor보다 우선 순위가 높음

:::


#### minValue

**Type:** `number | undefined`

:::note{title="설명"}
최소값, 구성하지 않을 경우 현재 데이터 열의 최소값으로 기본 설정

:::

#### maxValue

**Type:** `number | undefined`

:::note{title="설명"}
최대값, 구성하지 않을 경우 현재 데이터 열의 최대값으로 기본 설정

:::

#### minColor

**Type:** `string`

:::note{title="설명"}
최소값에 해당하는 색상

:::

#### maxColor

**Type:** `string`

:::note{title="설명"}
최대값에 해당하는 색상

:::

### enableProgressBar

**Type:** `boolean | undefined`

:::note{title="설명"}
배경 데이터 막대(현재 셀의 크기를 표시하는 막대) 기능 활성화 여부, 기본적으로 비활성화

:::

### barPositiveColor

**Type:** `string | undefined`

:::note{title="설명"}
현재 셀 값이 양수일 때의 배경 데이터 막대 색상

:::

### barNegativeColor

**Type:** `string | undefined`

:::note{title="설명"}
값이 음수일 때의 배경 데이터 막대 색상

:::

### barMin

**Type:** `number | undefined`

:::note{title="설명"}
진행률 막대 최소값



구성하지 않을 경우 열의 최소값 자동 계산

:::

### barMax

**Type:** `number | undefined`

:::note{title="설명"}
진행률 막대 최대값



구성하지 않을 경우 열의 최대값 자동 계산

:::

### textColor

**Type:** `string | undefined`

:::note{title="설명"}
셀 텍스트 색상

:::

### textFontSize

**Type:** `number | undefined`

:::note{title="설명"}
셀 텍스트 크기

:::

### borderColor

**Type:** `string | undefined`

:::note{title="설명"}
셀 테두리 색상

:::

### borderLineWidth

**Type:** `number | undefined`

:::note{title="설명"}
셀 테두리 선 두께

:::


## indicatorsAsCol

**Type:** `boolean | undefined`

:::note{title="설명"}
지표를 열로 표시할지 여부, true일 경우 지표가 열 방향으로 펼쳐지고, false일 경우 행 방향으로 펼쳐짐

:::

**예시**
```ts
true




```
## totals

**Type:** `PivotTableTotals | undefined`

:::note{title="설명"}
피벗 테이블의 합계 및 소계 구성



피벗 테이블의 합계/소계 구성

:::

**예시**
```ts
{ row: { showGrandTotals: true, showSubTotals: true, subTotalsDimensions: ['category'] } }




```
### row

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title="설명"}
행의 합계/소계 구성



행 또는 열의 합계/소계 구성

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title="설명"}
합계(합계 행/열) 표시 여부

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title="설명"}
소계 표시 여부

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title="설명"}
소계 차원, 어떤 차원을 기준으로 소계 그룹화할지

:::

**예시**
```ts
['category', 'region']



```
### column

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title="설명"}
열의 합계/소계 구성



행 또는 열의 합계/소계 구성

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title="설명"}
합계(합계 행/열) 표시 여부

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title="설명"}
소계 표시 여부

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title="설명"}
소계 차원, 어떤 차원을 기준으로 소계 그룹화할지

:::

**예시**
```ts
['category', 'region']




```
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

