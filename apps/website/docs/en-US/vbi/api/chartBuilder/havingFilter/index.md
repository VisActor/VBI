# HavingFilterBuilder

Having a filter builder for adding, modifying, and deleting post-group filter conditions. Having filtering takes effect after data aggregation and is used to filter grouped results.

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

Add a Having filter

**Definition**:

```typescript
add(field: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `field` | string | - field name |
| `callback` | (node: HavingFilterNodeBuilder) => void | - callback function |

### addGroup

Add a Having group

**Definition**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Logical operator |
| `callback` | (group: HavingGroupBuilder) => void | - callback function |

### update

Update filter for specified ID

**Definition**:

```typescript
update(id: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `id` | string | - filter ID |
| `callback` | (node: HavingFilterNodeBuilder) => void | - callback function |

### updateGroup

Update the group with the specified ID

**Definition**:

```typescript
updateGroup(id: string, callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `id` | string | - group ID |
| `callback` | (group: HavingGroupBuilder) => void | - callback function |

### remove

Delete the condition of the specified ID or the item of the specified index

**Definition**:

```typescript
remove(idOrIndex: string | number): HavingFilterBuilder
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
find(predicate: (entry: HavingFilterNodeBuilder | HavingGroupBuilder, index: number) => boolean): HavingFilterNodeBuilder | HavingGroupBuilder | undefined
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `predicate` | (entry: HavingFilterNodeBuilder \| HavingGroupBuilder, index: number) => boolean | - Search conditions |

### clear

Clear all Having filters

**Definition**:

```typescript
clear()
```

### toJSON

Export the complete Having filter configuration

**Definition**:

```typescript
toJSON(): VBIHavingGroup
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