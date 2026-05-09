# WhereFilterNodeBuilder

Where filter node builder for configuring a single Where filter condition

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

### setField

Set field name

**Definition**:

```typescript
setField(field: string): this
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `field` | string | - field name |

### getOperator

Get filter operator

**Definition**:

```typescript
getOperator(): string | undefined
```

**Return**: `() => void`

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

### setValue

Set filter value

**Definition**:

```typescript
setValue(value: unknown): this
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `value` | unknown | - filter value |

### setDate

Set date filters

**Definition**:

```typescript
setDate(predicate: VBIWhereDatePredicate): this
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `predicate` | `VBIWhereDatePredicate` | - date predicate |

### getDate

Get date filter conditions, non-date filter returns undefined

**Definition**:

```typescript
getDate(): VBIWhereDatePredicate | undefined
```

**Return**: `() => void`

### toJSON

Export as JSON

**Definition**:

```typescript
toJSON(): VBIWhereFilter
```

**Return**: `() => void`