# WhereGroupBuilder

Where group builder, used to configure the logical relationship (AND/OR) of a set of conditions

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

### getConditions

**Definition**:

```typescript
getConditions(): Y.Array<any>
```

**Return**: `() => void`

### getId

Get group ID

**Definition**:

```typescript
getId(): string
```

**Return**: `() => void`

### getOperator

Get logical operator

**Definition**:

```typescript
getOperator(): 'and' | 'or'
```

**Return**: `() => void`

### setOperator

Set logical operators

**Definition**:

```typescript
setOperator(op: 'and' | 'or'): this
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Logical operator |

### add

Add a Where filter to the group

**Definition**:

```typescript
add(field: string, callback: (node: WhereFilterNodeBuilder) => void): this
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `field` | string | - field name |
| `callback` | (node: WhereFilterNodeBuilder) => void | - callback function |

### addGroup

Add a nested group to the current group

**Definition**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: WhereGroupBuilder) => void): this
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Logical operator |
| `callback` | (group: WhereGroupBuilder) => void | - callback function |

### remove

Delete the condition of the specified ID or the item of the specified index

**Definition**:

```typescript
remove(idOrIndex: string | number): this
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID or index |

### clear

Clear all conditions in the group

**Definition**:

```typescript
clear(): this
```

**Return**: `() => void`

### toJSON

Export as JSON

**Definition**:

```typescript
toJSON(): VBIWhereGroup
```

**Return**: `() => void`