# DimensionNodeBuilder

Dimension node builder for configuring a single dimension.

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
getEncoding(): VBIDimension['encoding'] | undefined
```

**Returns**: `VBIDimension['encoding'] \| undefined`

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
setEncoding(encoding: NonNullable<VBIDimension['encoding']>): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `encoding` | NonNullable\<VBIDimension\['encoding']> | - Dimension encoding position |

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

Sets the date aggregation function.

**Definition**:

```typescript
setAggregate(aggregate: NonNullable<VBIDimension['aggregate']>): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `aggregate` | NonNullable\<VBIDimension\['aggregate']> | - Date aggregation configuration |

### clearAggregate

Clears the date aggregation function.

**Definition**:

```typescript
clearAggregate(): this
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
toJSON(): VBIDimension
```

**Returns**: `VBIDimension`
