# DimensionsBuilder

Dimension builder for adding, modifying, and removing dimension configuration. Dimensions are the categorical fields in data, such as: time, region, product category.

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

### add

Adds a dimension.

**Definition**:

```typescript
add(field: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Returns**: `DimensionsBuilder`

**Parameters**:

| Parameter  | Type                                 | Description         |
| ---------- | ------------------------------------ | ------------------- |
| `field`    | string                               | - Field name        |
| `callback` | (node: DimensionNodeBuilder) => void | - Callback function |

### remove

Removes the dimension with the specified ID.

**Definition**:

```typescript
remove(id: string): DimensionsBuilder
```

**Returns**: `DimensionsBuilder`

**Parameters**:

| Parameter | Type   | Description    |
| --------- | ------ | -------------- |
| `id`      | string | - Dimension ID |

### update

Updates the configuration of the dimension with the specified ID.

**Definition**:

```typescript
update(id: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Returns**: `DimensionsBuilder`

**Parameters**:

| Parameter  | Type                                 | Description         |
| ---------- | ------------------------------------ | ------------------- |
| `id`       | string                               | - Dimension ID      |
| `callback` | (node: DimensionNodeBuilder) => void | - Callback function |

### find

Finds the first dimension matching the callback condition, behaves like `Array.find`.

**Definition**:

```typescript
find(predicate: (node: DimensionNodeBuilder, index: number) => boolean): DimensionNodeBuilder | undefined
```

**Returns**: `DimensionNodeBuilder \| undefined`

**Parameters**:

| Parameter   | Type                                                   | Description        |
| ----------- | ------------------------------------------------------ | ------------------ |
| `predicate` | (node: DimensionNodeBuilder, index: number) => boolean | - Search condition |

### findAll

Gets all dimensions.

**Definition**:

```typescript
findAll(): DimensionNodeBuilder[]
```

**Returns**: `DimensionNodeBuilder[]`

### toJSON

Exports all dimensions as a JSON array.

**Definition**:

```typescript
toJSON(): VBIDimension[]
```

**Returns**: `VBIDimension[]`

### observe

Listens for dimension changes, returns an unsubscribe function.

**Definition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Returns**: `() => void`

**Parameters**:

| Parameter  | Type                | Description         |
| ---------- | ------------------- | ------------------- |
| `callback` | ObserveDeepCallback | - Callback function |

### static isDimensionNode

**Definition**:

```typescript
static isDimensionNode(node: VBIDimensionTree[0]): node is VBIDimension
```

**Returns**: `node is VBIDimension`

**Parameters**:

| Parameter | Type                 | Description |
| --------- | -------------------- | ----------- |
| `node`    | VBIDimensionTree\[0] | -           |

### static isDimensionGroup

**Definition**:

```typescript
static isDimensionGroup(node: VBIDimensionTree[0]): node is VBIDimensionGroup
```

**Returns**: `node is VBIDimensionGroup`

**Parameters**:

| Parameter | Type                 | Description |
| --------- | -------------------- | ----------- |
| `node`    | VBIDimensionTree\[0] | -           |
