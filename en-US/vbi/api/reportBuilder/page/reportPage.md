# ReportPageBuilder

## Properties

| Property | Type | Description |
| --- | --- | --- |
| **chart** | `VBIChartBuilder<TQueryDSL, TSeedDSL>` | - |
| **text** | `ReportTextBuilder` | - |

## Methods

### constructor

**Definition**:

```typescript
constructor(doc: Y.Doc, page: Y.Map<any>, chartOptions: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>)
```

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `page` | Y.Map<any> | - |
| `chartOptions` | VBIChartBuilderOptions\<TQueryDSL, TSeedDSL> | - |

### getId

**Definition**:

```typescript
getId(): string
```

**Returns**: `string`

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

### setChart

**Definition**:

```typescript
setChart(chartBuilder: VBIChartBuilder<TQueryDSL, TSeedDSL> | VBIChartDSLInput): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `chartBuilder` | VBIChartBuilder\<TQueryDSL, TSeedDSL> | VBIChartDSLInput | - |

### setText

**Definition**:

```typescript
setText(content: string): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `content` | string | - |

### toJSON

**Definition**:

```typescript
toJSON(): VBIReportPageDSL
```

**Returns**: `VBIReportPageDSL`
