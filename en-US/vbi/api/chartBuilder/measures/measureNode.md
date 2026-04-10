# MeasureNodeBuilder

Measure node builder for configuring a single measure.

## Properties

## Methods

### constructor

**Definition**:

```typescript
constructor(yMap: Y.Map<any>)
```

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |

### getId

Gets the node ID.

**Definition**:

```typescript
getId(): string
```

**Returns**: `string`

### getField

Gets the field name.

**Definition**:

```typescript
getField(): string
```

**Returns**: `string`

### getEncoding

Gets the chart encoding position.

**Definition**:

```typescript
getEncoding(): VBIMeasure['encoding'] | undefined
```

**Returns**: `VBIMeasure['encoding'] \| undefined`

### getSort

Gets the sort configuration.

**Definition**:

```typescript
getSort(): VBISort | undefined
```

**Returns**: `VBISort \| undefined`

### setAlias

Sets the display name.

**Definition**:

```typescript
setAlias(alias: string): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `alias` | string | - Display name |

### setEncoding

Sets the chart encoding position.

**Definition**:

```typescript
setEncoding(encoding: NonNullable<VBIMeasure['encoding']>): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `encoding` | NonNullable\<VBIMeasure\['encoding']> | - Measure encoding position |

### setSort

Sets the sort configuration.

**Definition**:

```typescript
setSort(sort: VBISort): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `sort` | VBISort | - Sort configuration |

### setAggregate

Sets the aggregate function.

**Definition**:

```typescript
setAggregate(aggregate: VBIMeasure['aggregate']): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `aggregate` | VBIMeasure\['aggregate'] | - Aggregate configuration |

### setFormat

Sets the number format.

**Definition**:

```typescript
setFormat(format: VBIMeasureFormat): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `format` | VBIMeasureFormat | - Format configuration |

### getFormat

Gets the number format.

**Definition**:

```typescript
getFormat(): VBIMeasureFormat | undefined
```

**Returns**: `VBIMeasureFormat \| undefined`

### clearFormat

Clears the number format configuration.

**Definition**:

```typescript
clearFormat(): this
```

**Returns**: `this`

### clearSort

Clears the sort configuration.

**Definition**:

```typescript
clearSort(): this
```

**Returns**: `this`

### toJSON

Exports to JSON.

**Definition**:

```typescript
toJSON(): VBIMeasure
```

**Returns**: `VBIMeasure`
