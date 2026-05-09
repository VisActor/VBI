# ChartTypeBuilder

Chart type builder for switching and getting chart types. Supports various chart types such as tables, bar charts, line charts, pie charts, scatter charts, etc.

## Properties

## Method

### constructor

Constructor

**Definition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### observe

Monitor chart type changes

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `callback` | ObserveCallback | - callback function |

### changeChartType

Set chart type

**Definition**:

```typescript
changeChartType(chartType: string)
```

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `chartType` | string | - chart type |

### getChartType

Get the current chart type

**Definition**:

```typescript
getChartType(): string
```

**Return**: `() => void`

### getSupportedDimensionEncodings

Get the dimension encoding supported by the current chart type

**Definition**:

```typescript
getSupportedDimensionEncodings()
```

### getRecommendedDimensionEncodings

Returns recommended dimension codes in dimension order based on the current chart type.

**Definition**:

```typescript
getRecommendedDimensionEncodings(dimensionCount: number)
```

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `dimensionCount` | number | - the number of dimensions, the default number is the number of dimensions in the current DSL |

### getSupportedMeasureEncodings

Get the measure codes supported by the current chart type

**Definition**:

```typescript
getSupportedMeasureEncodings()
```

### getRecommendedMeasureEncodings

Returns recommended measure codes in measure order based on the current chart type.

**Definition**:

```typescript
getRecommendedMeasureEncodings(measureCount: number)
```

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `measureCount` | number | - the number of measures, the default number is the number of measures in the current DSL |

### toJSON

Export as JSON

**Definition**:

```typescript
toJSON(): string
```

**Return**: `() => void`

### getAvailableChartTypes

Get all supported chart types

**Definition**:

```typescript
getAvailableChartTypes(): string[]
```

**Return**: `() => void`