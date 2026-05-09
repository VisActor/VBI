# HavingFilterNodeBuilder

Having filter node builder for configuring a single Having filter condition

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

### getOperator

Get filter operator

**Definition**:

```typescript
getOperator(): string | undefined
```

**Return**: `() => void`

### getAggregate

Get aggregate configuration

**Definition**:

```typescript
getAggregate(): VBIHavingAggregate | undefined
```

**Return**: `() => void`

### setValue

Set the value of the filter condition

**Definition**:

```typescript
setValue(value: unknown): this
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `value` | unknown | - filter value |

### setOperator

Set filter operator

**Definition**:

```typescript
setOperator(operator: string): this
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `operator` | string | - operator |

### setAggregate

Set aggregation configuration

**Definition**:

```typescript
setAggregate(aggregate: VBIHavingAggregate): this
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `aggregate` | `VBIHavingAggregate` | - Aggregation Configuration |

### toJSON

Export as JSON

**Definition**:

```typescript
toJSON(): VBIHavingFilter
```

**Return**: `() => void`