# ReportPageBuilder

## 属性

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| **chart** | `VBIChartBuilder<TQueryDSL, TSeedDSL>` | - |
| **text** | `ReportTextBuilder` | - |

## 方法

### constructor

**定义**:

```typescript
constructor(doc: Y.Doc, page: Y.Map<any>, chartOptions: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `page` | Y.Map<any> | - |
| `chartOptions` | VBIChartBuilderOptions\<TQueryDSL, TSeedDSL> | - |

### getId

**定义**:

```typescript
getId(): string
```

**返回**: `string`

### setTitle

**定义**:

```typescript
setTitle(title: string): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `title` | string | - |

### setChart

**定义**:

```typescript
setChart(chartBuilder: VBIChartBuilder<TQueryDSL, TSeedDSL> | VBIChartDSLInput): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `chartBuilder` | VBIChartBuilder\<TQueryDSL, TSeedDSL> | VBIChartDSLInput | - |

### setText

**定义**:

```typescript
setText(content: string): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `content` | string | - |

### toJSON

**定义**:

```typescript
toJSON(): VBIReportPageDSL
```

**返回**: `VBIReportPageDSL`
