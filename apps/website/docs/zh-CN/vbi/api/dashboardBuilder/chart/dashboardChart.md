# DashboardChartBuilder

## 方法

### constructor

**定义**:

```typescript
constructor(widget: Y.Map<any>, options?: DashboardChartBuilderOptions<TQueryDSL, TSeedDSL>)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `widget` | Y.Map<any> | - |
| `options?` = {} | DashboardChartBuilderOptions<TQueryDSL, TSeedDSL> | - |

### getId

**定义**:

```typescript
getId(): string
```

**返回**: `string`

### getBuilder

**定义**:

```typescript
getBuilder(): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**返回**: `VBIChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

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

### setDescription

**定义**:

```typescript
setDescription(description: string): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `description` | string | - |

### setChart

**定义**:

```typescript
setChart(chart: ResourceReference): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `chart` | ResourceReference | - |

### setLayouts

**定义**:

```typescript
setLayouts(layouts: DashboardWidgetLayouts): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `layouts` | DashboardWidgetLayouts | - |

### getLayouts

**定义**:

```typescript
getLayouts(): DashboardWidgetLayouts
```

**返回**: `DashboardWidgetLayouts`

### toJSON

**定义**:

```typescript
toJSON(): VBIDashboardWidget
```

**返回**: `VBIDashboardWidget`