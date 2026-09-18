# DashboardChartBuilder

## Methods

### constructor

**Definition**:

```typescript
constructor(widget: Y.Map<any>, options?: DashboardChartBuilderOptions<TQueryDSL, TSeedDSL>)
```

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `widget` | Y.Map<any> | - |
| `options?` = {} | DashboardChartBuilderOptions<TQueryDSL, TSeedDSL> | - |

### getId

**Definition**:

```typescript
getId(): string
```

**Returns**: `string`

### getBuilder

**Definition**:

```typescript
getBuilder(): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Returns**: `VBIChartBuilder<TQueryDSL, TSeedDSL> \| undefined`

### setTitle

**Definition**:

```typescript
setTitle(title: string): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `title` | string | - |

### setDescription

**Definition**:

```typescript
setDescription(description: string): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `description` | string | - |

### setChart

**Definition**:

```typescript
setChart(chart: ResourceReference): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `chart` | ResourceReference | - |

### setLayouts

**Definition**:

```typescript
setLayouts(layouts: DashboardWidgetLayouts): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `layouts` | DashboardWidgetLayouts | - |

### getLayouts

**Definition**:

```typescript
getLayouts(): DashboardWidgetLayouts
```

**Returns**: `DashboardWidgetLayouts`

### toJSON

**Definition**:

```typescript
toJSON(): VBIDashboardWidget
```

**Returns**: `VBIDashboardWidget`
