# ReportPageBuilder

## Properties

## Method

### constructor

**Definition**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, page: Y.Map<any>)
```

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `parent` | `VBIReportBuilder<TQueryDSL, TSeedDSL>` | - |
| `page` | `Y.Map<any>` | - |

### getId

**Definition**:

```typescript
getId(): string
```

**Return**: `() => void`

### setTitle

**Definition**:

```typescript
setTitle(title: string): this
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `title` | string | - |

### setChartId

**Definition**:

```typescript
setChartId(chart: ResourceReference): this
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `chart` | ResourceReference | - |

### setInsightId

**Definition**:

```typescript
setInsightId(insight: ResourceReference): this
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `insight` | ResourceReference | - |

### toJSON

**Definition**:

```typescript
toJSON(): VBIReportPageDSL
```

**Return**: `() => void`