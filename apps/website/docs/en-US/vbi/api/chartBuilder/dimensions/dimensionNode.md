# DimensionNodeBuilder

Dimension node builder for configuring individual dimensions

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
getEncoding(): VBIDimension['encoding'] | undefined
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
setEncoding(encoding: NonNullable<VBIDimension['encoding']>): this
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `encoding` | `NonNullable<VBIDimension['encoding']>` | - Dimension encoding position |

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

Set date aggregation function

**Definition**:

```typescript
setAggregate(aggregate: NonNullable<VBIDimension['aggregate']>): this
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `aggregate` | `NonNullable<VBIDimension['aggregate']>` | - Date aggregation configuration |

### clearAggregate

Clear date aggregate function

**Definition**:

```typescript
clearAggregate(): this
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
toJSON(): VBIDimension
```

**Return**: `() => void`