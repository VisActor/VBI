# WhereGroupBuilder

Where group builder for configuring the logical relationship (AND/OR) of a condition group.

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

### getConditions

**Definition**:

```typescript
getConditions(): Y.Array<any>
```

**Returns**: `Y.Array<any>`

### getId

Gets the group ID.

**Definition**:

```typescript
getId(): string
```

**Returns**: `string`

### getOperator

Gets the logical operator.

**Definition**:

```typescript
getOperator(): 'and' | 'or'
```

**Returns**: `'and' \| 'or'`

### setOperator

Sets the logical operator.

**Definition**:

```typescript
setOperator(op: 'and' | 'or'): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `op` | 'and' | 'or' | - Logical operator |

### add

Adds a Where filter condition to the group.

**Definition**:

```typescript
add(field: string, callback: (node: WhereFilterNodeBuilder) => void): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `field` | string | - Field name |
| `callback` | (node: WhereFilterNodeBuilder) => void | - Callback function |

### addGroup

Adds a nested group to the current group.

**Definition**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: WhereGroupBuilder) => void): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `op` | 'and' | 'or' | - Logical operator |
| `callback` | (group: WhereGroupBuilder) => void | - Callback function |

### remove

Removes the condition with the specified ID or the item at the specified index.

**Definition**:

```typescript
remove(idOrIndex: string | number): this
```

**Returns**: `this`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `idOrIndex` | string | number | - ID or index |

### clear

Clears all conditions in the group.

**Definition**:

```typescript
clear(): this
```

**Returns**: `this`

### toJSON

Exports to JSON.

**Definition**:

```typescript
toJSON(): VBIWhereGroup
```

**Returns**: `VBIWhereGroup`
