# WhereFilterNodeBuilder

Where filter node builder for configuring a single Where filter condition.

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

### setField

Sets the field name.

**Definition**:

```typescript
setField(field: string): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `field` | string | - Field name |

### getOperator

Gets the filter operator.

**Definition**:

```typescript
getOperator(): string | undefined
```

**Returns**: `string \| undefined`

### setOperator

Sets the filter operator.

**Definition**:

```typescript
setOperator(operator: string): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `operator` | string | - Operator |

### setValue

Sets the filter value.

**Definition**:

```typescript
setValue(value: unknown): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `value` | unknown | - Filter value |

### setDate

Sets the date filter condition.

**Definition**:

```typescript
setDate(predicate: VBIWhereDatePredicate): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `predicate` | VBIWhereDatePredicate | - Date predicate |

### getDate

Gets the date filter condition; returns `undefined` for non-date filters.

**Definition**:

```typescript
getDate(): VBIWhereDatePredicate | undefined
```

**Returns**: `VBIWhereDatePredicate \| undefined`

### toJSON

Exports to JSON.

**Definition**:

```typescript
toJSON(): VBIWhereFilter
```

**Returns**: `VBIWhereFilter`
