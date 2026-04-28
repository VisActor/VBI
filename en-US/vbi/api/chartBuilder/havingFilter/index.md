# HavingFilterBuilder

Having filter builder for adding, modifying, and removing post-aggregation filter conditions. Having filters take effect after data aggregation and are used to filter grouped results.

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

Adds a Having filter condition.

**Definition**:

```typescript
add(field: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Returns**: `HavingFilterBuilder`

**Parameters**:

| Parameter  | Type                                    | Description         |
| ---------- | --------------------------------------- | ------------------- |
| `field`    | string                                  | - Field name        |
| `callback` | (node: HavingFilterNodeBuilder) => void | - Callback function |

### addGroup

Adds a Having group.

**Definition**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Returns**: `HavingFilterBuilder`

**Parameters**:

| Parameter  | Type                                | Description         |
| ---------- | ----------------------------------- | ------------------- |
| `op`       | 'and' \| 'or'                       | - Logical operator  |
| `callback` | (group: HavingGroupBuilder) => void | - Callback function |

### update

Updates the filter condition with the specified ID.

**Definition**:

```typescript
update(id: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Returns**: `HavingFilterBuilder`

**Parameters**:

| Parameter  | Type                                    | Description           |
| ---------- | --------------------------------------- | --------------------- |
| `id`       | string                                  | - Filter condition ID |
| `callback` | (node: HavingFilterNodeBuilder) => void | - Callback function   |

### updateGroup

Updates the group with the specified ID.

**Definition**:

```typescript
updateGroup(id: string, callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Returns**: `HavingFilterBuilder`

**Parameters**:

| Parameter  | Type                                | Description         |
| ---------- | ----------------------------------- | ------------------- |
| `id`       | string                              | - Group ID          |
| `callback` | (group: HavingGroupBuilder) => void | - Callback function |

### remove

Removes the condition with the specified ID or the item at the specified index.

**Definition**:

```typescript
remove(idOrIndex: string | number): HavingFilterBuilder
```

**Returns**: `HavingFilterBuilder`

**Parameters**:

| Parameter   | Type             | Description   |
| ----------- | ---------------- | ------------- |
| `idOrIndex` | string \| number | - ID or index |

### find

Finds the first condition (filter or group) matching the callback condition, behaves like `Array.find`.

**Definition**:

```typescript
find(predicate: (entry: HavingFilterNodeBuilder | HavingGroupBuilder, index: number) => boolean): HavingFilterNodeBuilder | HavingGroupBuilder | undefined
```

**Returns**: `HavingFilterNodeBuilder \| HavingGroupBuilder \| undefined`

**Parameters**:

| Parameter   | Type                                                                             | Description        |
| ----------- | -------------------------------------------------------------------------------- | ------------------ |
| `predicate` | (entry: HavingFilterNodeBuilder \| HavingGroupBuilder, index: number) => boolean | - Search condition |

### clear

Clears all Having filter conditions.

**Definition**:

```typescript
clear()
```

### toJSON

Exports the complete Having filter configuration.

**Definition**:

```typescript
toJSON(): VBIHavingGroup
```

**Returns**: `VBIHavingGroup`

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
