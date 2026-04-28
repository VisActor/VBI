# WhereFilterBuilder

Where filter builder for adding, modifying, and removing row-level filter conditions. Where filters take effect before data querying and are used to filter raw data.

## Properties

## Methods

### constructor

**Definition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Parameters**:

| Parameter | Type       | Description |
| --------- | ---------- | ----------- |
| `doc`     | Y.Doc      | -           |
| `dsl`     | Y.Map<any> | -           |

### getConditions

**Definition**:

```typescript
getConditions(): Y.Array<any>
```

**Returns**: `Y.Array<any>`

### add

Adds a Where filter condition.

**Definition**:

```typescript
add(field: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**Returns**: `WhereFilterBuilder`

**Parameters**:

| Parameter  | Type                                   | Description         |
| ---------- | -------------------------------------- | ------------------- |
| `field`    | string                                 | - Field name        |
| `callback` | (node: WhereFilterNodeBuilder) => void | - Callback function |

### addGroup

Adds a Where group.

**Definition**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**Returns**: `WhereFilterBuilder`

**Parameters**:

| Parameter  | Type                               | Description         |
| ---------- | ---------------------------------- | ------------------- |
| `op`       | 'and' \| 'or'                      | - Logical operator  |
| `callback` | (group: WhereGroupBuilder) => void | - Callback function |

### update

Updates the filter condition with the specified ID.

**Definition**:

```typescript
update(id: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**Returns**: `WhereFilterBuilder`

**Parameters**:

| Parameter  | Type                                   | Description           |
| ---------- | -------------------------------------- | --------------------- |
| `id`       | string                                 | - Filter condition ID |
| `callback` | (node: WhereFilterNodeBuilder) => void | - Callback function   |

### updateGroup

Updates the group with the specified ID.

**Definition**:

```typescript
updateGroup(id: string, callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**Returns**: `WhereFilterBuilder`

**Parameters**:

| Parameter  | Type                               | Description         |
| ---------- | ---------------------------------- | ------------------- |
| `id`       | string                             | - Group ID          |
| `callback` | (group: WhereGroupBuilder) => void | - Callback function |

### remove

Removes the condition with the specified ID or the item at the specified index.

**Definition**:

```typescript
remove(idOrIndex: string | number): WhereFilterBuilder
```

**Returns**: `WhereFilterBuilder`

**Parameters**:

| Parameter   | Type             | Description   |
| ----------- | ---------------- | ------------- |
| `idOrIndex` | string \| number | - ID or index |

### find

Finds the first condition (filter or group) matching the callback condition, behaves like `Array.find`.

**Definition**:

```typescript
find(predicate: (entry: WhereFilterNodeBuilder | WhereGroupBuilder, index: number) => boolean): WhereFilterNodeBuilder | WhereGroupBuilder | undefined
```

**Returns**: `WhereFilterNodeBuilder \| WhereGroupBuilder \| undefined`

**Parameters**:

| Parameter   | Type                                                                           | Description        |
| ----------- | ------------------------------------------------------------------------------ | ------------------ |
| `predicate` | (entry: WhereFilterNodeBuilder \| WhereGroupBuilder, index: number) => boolean | - Search condition |

### clear

Clears all Where filter conditions.

**Definition**:

```typescript
clear()
```

### toJSON

Exports the complete Where filter configuration.

**Definition**:

```typescript
toJSON(): VBIWhereGroup
```

**Returns**: `VBIWhereGroup`

### observe

Listens for filter condition changes, returns an unsubscribe function.

**Definition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Returns**: `() => void`

**Parameters**:

| Parameter  | Type                | Description         |
| ---------- | ------------------- | ------------------- |
| `callback` | ObserveDeepCallback | - Callback function |

### static isGroup

Determines whether the node is a group node.

**Definition**:

```typescript
static isGroup(yMap: Y.Map<any>): boolean
```

**Returns**: `boolean`

**Parameters**:

| Parameter | Type       | Description |
| --------- | ---------- | ----------- |
| `yMap`    | Y.Map<any> | -           |

### static isNode

Determines whether the node is a leaf node.

**Definition**:

```typescript
static isNode(yMap: Y.Map<any>): boolean
```

**Returns**: `boolean`

**Parameters**:

| Parameter | Type       | Description |
| --------- | ---------- | ----------- |
| `yMap`    | Y.Map<any> | -           |
