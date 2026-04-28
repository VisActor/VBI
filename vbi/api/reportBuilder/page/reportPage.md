# ReportPageBuilder

## 属性

## 方法

### constructor

**定义**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, page: Y.Map<any>)
```

**参数**:

| 参数       | 类型                                     | 说明 |
| -------- | -------------------------------------- | -- |
| `parent` | VBIReportBuilder\<TQueryDSL, TSeedDSL> | -  |
| `page`   | Y.Map<any>                             | -  |

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

| 参数      | 类型     | 说明 |
| ------- | ------ | -- |
| `title` | string | -  |

### setChartId

**定义**:

```typescript
setChartId(chart: ResourceReference): this
```

**返回**: `this`

**参数**:

| 参数      | 类型                | 说明 |
| ------- | ----------------- | -- |
| `chart` | ResourceReference | -  |

### setInsightId

**定义**:

```typescript
setInsightId(insight: ResourceReference): this
```

**返回**: `this`

**参数**:

| 参数        | 类型                | 说明 |
| --------- | ----------------- | -- |
| `insight` | ResourceReference | -  |

### toJSON

**定义**:

```typescript
toJSON(): VBIReportPageDSL
```

**返回**: `VBIReportPageDSL`
