# HavingFilterNodeBuilder

Having filter node builder for configuring a single Having filter condition.

## Properties

## Methods

### constructor

**Definition**:

```typescript
constructor(yMap: Y.Map<any>)
```

**Parameters**:

| Parameter | Type       | Description |
| --------- | ---------- | ----------- |
| `yMap`    | Y.Map<any> | -           |

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

### getOperator

Gets the filter operator.

**Definition**:

```typescript
getOperator(): string | undefined
```

**Returns**: `string \| undefined`

### getAggregate

Gets the aggregate configuration.

**Definition**:

```typescript
getAggregate(): VBIHavingAggregate | undefined
```

**Returns**: `VBIHavingAggregate \| undefined`

### setValue

Sets the value for the filter condition.

**Definition**:

```typescript
setValue(value: unknown): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type    | Description    |
| --------- | ------- | -------------- |
| `value`   | unknown | - Filter value |

### setOperator

Sets the filter operator.

**Definition**:

```typescript
setOperator(operator: string): this
```

**Returns**: `this`

**Parameters**:

| Parameter  | Type   | Description |
| ---------- | ------ | ----------- |
| `operator` | string | - Operator  |

### setAggregate

Sets the aggregate configuration.

**Definition**:

```typescript
setAggregate(aggregate: VBIHavingAggregate): this
```

**Returns**: `this`

**Parameters**:

| Parameter   | Type               | Description               |
| ----------- | ------------------ | ------------------------- |
| `aggregate` | VBIHavingAggregate | - Aggregate configuration |

### toJSON

Exports to JSON.

**Definition**:

```typescript
toJSON(): VBIHavingFilter
```

**Returns**: `VBIHavingFilter`
