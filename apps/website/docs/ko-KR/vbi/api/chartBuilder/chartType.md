# ChartTypeBuilder

차트 유형 빌더로, 차트 유형을 전환하고 가져오는 데 사용됩니다. 테이블, 막대형 차트, 꺾은선형 차트, 원형 차트, 분산형 차트 등 다양한 차트 유형을 지원합니다.

## 속성

## 메서드

### constructor

생성자

**정의**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### observe

차트 유형 변경 감지

**정의**:

```typescript
observe(callback: ObserveCallback): () => void
```

**반환**: `() => void`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `callback` | ObserveCallback | - 콜백 함수 |

### changeChartType

차트 유형 설정

**정의**:

```typescript
changeChartType(chartType: string)
```

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `chartType` | string | - 차트 유형 |

### getChartType

현재 차트 유형 가져오기

**정의**:

```typescript
getChartType(): string
```

**반환**: `string`

### getSupportedDimensionEncodings

현재 차트 유형이 지원하는 차원 인코딩 가져오기

**정의**:

```typescript
getSupportedDimensionEncodings()
```

### getRecommendedDimensionEncodings

현재 차트 유형에 따라 차원 순서대로 권장 차원 인코딩 반환

**정의**:

```typescript
getRecommendedDimensionEncodings(dimensionCount: number)
```

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `dimensionCount` | number | - 차원 개수, 기본값은 현재 DSL의 차원 개수 사용 |

### getSupportedMeasureEncodings

현재 차트 유형이 지원하는 측정값 인코딩 가져오기

**정의**:

```typescript
getSupportedMeasureEncodings()
```

### getRecommendedMeasureEncodings

현재 차트 유형에 따라 측정값 순서대로 권장 측정값 인코딩 반환

**정의**:

```typescript
getRecommendedMeasureEncodings(measureCount: number)
```

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `measureCount` | number | - 측정값 개수, 기본값은 현재 DSL의 측정값 개수 사용 |

### toJSON

JSON으로 내보내기

**정의**:

```typescript
toJSON(): string
```

**반환**: `string`

### getAvailableChartTypes

지원되는 모든 차트 유형 가져오기

**정의**:

```typescript
getAvailableChartTypes(): string[]
```

**반환**: `string[]`