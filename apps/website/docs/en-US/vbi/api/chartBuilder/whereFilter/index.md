# WhereFilterBuilder

Where filter builder, used to add, modify, and delete row-level filter conditions. Where filtering takes effect before data query and is used to filter original data

## Properties

## Method

### constructor

**Definition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### getConditions

**Definition**:

```typescript
getConditions(): Y.Array<any>
```

**Return**: `() => void`

### add

Add a Where filter

**Definition**:

```typescript
add(field: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `field` | string | - field name |
| `callback` | (node: WhereFilterNodeBuilder) => void | - callback function |

### addGroup

Add a Where group

**Definition**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Logical operator |
| `callback` | (group: WhereGroupBuilder) => void | - callback function |

### update

Update filter for specified ID

**Definition**:

```typescript
update(id: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `id` | string | - filter ID |
| `callback` | (node: WhereFilterNodeBuilder) => void | - callback function |

### updateGroup

Update the group with the specified ID

**Definition**:

```typescript
updateGroup(id: string, callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `id` | string | - group ID |
| `callback` | (group: WhereGroupBuilder) => void | - callback function |

### remove

Delete the condition of the specified ID or the item of the specified index

**Definition**:

```typescript
remove(idOrIndex: string | number): WhereFilterBuilder
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID or index |

### find

Find the first condition (filtering or grouping) by callback condition, behaves the same as Array.find

**Definition**:

```typescript
find(predicate: (entry: WhereFilterNodeBuilder | WhereGroupBuilder, index: number) => boolean): WhereFilterNodeBuilder | WhereGroupBuilder | undefined
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `predicate` | (entry: WhereFilterNodeBuilder \| WhereGroupBuilder, index: number) => boolean | - Search conditions |

### clear

Clear all Where filters

**Definition**:

```typescript
clear()
```

### toJSON

Export complete Where filtering configuration

**Definition**:

```typescript
toJSON(): VBIWhereGroup
```

**Return**: `() => void`

### observe

Monitor changes in filter conditions and return a function to cancel monitoring.

**Definition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - callback function |

### static isGroup

Determine whether it is a group node

**Definition**:

```typescript
static isGroup(yMap: Y.Map<any>): boolean
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `yMap` | `Y.Map<any>` | - |

### static isNode

Determine whether it is a leaf node

**Definition**:

```typescript
static isNode(yMap: Y.Map<any>): boolean
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `yMap` | `Y.Map<any>` | - |