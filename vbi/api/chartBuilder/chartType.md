# ChartTypeBuilder

图表类型构建器，用于切换和获取图表类型。支持表格、柱状图、折线图、饼图、散点图等多种图表类型

## 属性

## 方法

### constructor

构造函数

**定义**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### observe

监听图表类型变化

**定义**:

```typescript
observe(callback: ObserveCallback): () => void
```

**返回**: `() => void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `callback` | ObserveCallback | - 回调函数 |

### changeChartType

设置图表类型

**定义**:

```typescript
changeChartType(chartType: string)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `chartType` | string | - 图表类型 |

### getChartType

获取当前图表类型

**定义**:

```typescript
getChartType(): string
```

**返回**: `string`

### getSupportedDimensionEncodings

获取当前图表类型支持的维度编码

**定义**:

```typescript
getSupportedDimensionEncodings()
```

### getRecommendedDimensionEncodings

根据当前图表类型，按维度顺序返回推荐的维度编码

**定义**:

```typescript
getRecommendedDimensionEncodings(dimensionCount: number)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `dimensionCount` | number | - 维度数量，默认使用当前 DSL 中的维度数量 |

### getSupportedMeasureEncodings

获取当前图表类型支持的指标编码

**定义**:

```typescript
getSupportedMeasureEncodings()
```

### getRecommendedMeasureEncodings

根据当前图表类型，按指标顺序返回推荐的指标编码

**定义**:

```typescript
getRecommendedMeasureEncodings(measureCount: number)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `measureCount` | number | - 指标数量，默认使用当前 DSL 中的指标数量 |

### toJSON

导出为 JSON

**定义**:

```typescript
toJSON(): string
```

**返回**: `string`

### getAvailableChartTypes

获取所有支持的图表类型

**定义**:

```typescript
getAvailableChartTypes(): string[]
```

**返回**: `string[]`
