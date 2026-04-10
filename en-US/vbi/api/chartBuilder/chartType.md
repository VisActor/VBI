# ChartTypeBuilder

Chart type builder for switching and retrieving the chart type. Supports various chart types including table, bar, line, pie, scatter, and more.

## Properties

## Methods

### constructor

Constructor

**Definition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### observe

Listens for chart type changes.

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Returns**: `() => void`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `callback` | ObserveCallback | - Callback function |

### changeChartType

Sets the chart type.

**Definition**:

```typescript
changeChartType(chartType: string)
```

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `chartType` | string | - Chart type |

### getChartType

Gets the current chart type.

**Definition**:

```typescript
getChartType(): string
```

**Returns**: `string`

### getSupportedDimensionEncodings

Gets the dimension encodings supported by the current chart type.

**Definition**:

```typescript
getSupportedDimensionEncodings()
```

### getRecommendedDimensionEncodings

Returns recommended dimension encodings in order based on the current chart type.

**Definition**:

```typescript
getRecommendedDimensionEncodings(dimensionCount: number)
```

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `dimensionCount` | number | - Number of dimensions; defaults to the dimension count in the current DSL |

### getSupportedMeasureEncodings

Gets the measure encodings supported by the current chart type.

**Definition**:

```typescript
getSupportedMeasureEncodings()
```

### getRecommendedMeasureEncodings

Returns recommended measure encodings in order based on the current chart type.

**Definition**:

```typescript
getRecommendedMeasureEncodings(measureCount: number)
```

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `measureCount` | number | - Number of measures; defaults to the measure count in the current DSL |

### toJSON

Exports to JSON.

**Definition**:

```typescript
toJSON(): string
```

**Returns**: `string`

### getAvailableChartTypes

Gets all supported chart types.

**Definition**:

```typescript
getAvailableChartTypes(): string[]
```

**Returns**: `string[]`
