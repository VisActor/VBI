# MeasureNodeBuilder

Metric node builder for configuring individual metrics

## Properties

## Method

### constructor

**Definition**:

```typescript
constructor(yMap: Y.Map<any>)
```

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `yMap` | `Y.Map<any>` | - |

### getId

Get node ID

**Definition**:

```typescript
getId(): string
```

**Return**: `() => void`

### getField

Get field name

**Definition**:

```typescript
getField(): string
```

**Return**: `() => void`

### getEncoding

Get the chart encoding position

**Definition**:

```typescript
getEncoding(): VBIMeasure['encoding'] | undefined
```

**Return**: `() => void`

### getSort

Get sorting configuration

**Definition**:

```typescript
getSort(): VBISort | undefined
```

**Return**: `() => void`

### setAlias

Set display name

**Definition**:

```typescript
setAlias(alias: string): this
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `alias` | string | - display name |

### setEncoding

Set chart encoding position

**Definition**:

```typescript
setEncoding(encoding: NonNullable<VBIMeasure['encoding']>): this
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `encoding` | `NonNullable<VBIMeasure['encoding']>` | - Measure encoding position |

### setSort

Set sorting configuration

**Definition**:

```typescript
setSort(sort: VBISort): this
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `sort` | `VBISort` | - Sort Configuration |

### setAggregate

Set aggregate function

**Definition**:

```typescript
setAggregate(aggregate: VBIMeasure['aggregate']): this
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `aggregate` | `VBIMeasure['aggregate']` | - Aggregation configuration |

### setFormat

Format a number

**Definition**:

```typescript
setFormat(format: VBIMeasureFormat): this
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `format` | `VBIMeasureFormat` | - format configuration |

### getFormat

Get numeric format

**Definition**:

```typescript
getFormat(): VBIMeasureFormat | undefined
```

**Return**: `() => void`

### clearFormat

Clear numeric format configuration

**Definition**:

```typescript
clearFormat(): this
```

**Return**: `() => void`

### clearSort

Clear sort configuration

**Definition**:

```typescript
clearSort(): this
```

**Return**: `() => void`

### toJSON

Export as JSON

**Definition**:

```typescript
toJSON(): VBIMeasure
```

**Return**: `() => void`