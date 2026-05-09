# DimensionsBuilder

Dimension builder, used to add, modify, and delete dimension configurations. Dimensions are classification fields of data, such as: time, region, product category

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

### add

add a dimension

**Definition**:

```typescript
add(field: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `field` | string | - field name |
| `callback` | (node: DimensionNodeBuilder) => void | - callback function |

### remove

Delete the dimension with the specified ID

**Definition**:

```typescript
remove(id: string): DimensionsBuilder
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `id` | string | - Dimension ID |

### update

Update the configuration for the specified dimension ID

**Definition**:

```typescript
update(id: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `id` | string | - Dimension ID |
| `callback` | (node: DimensionNodeBuilder) => void | - callback function |

### find

Find the first dimension according to the callback condition, the behavior is consistent with Array.find

**Definition**:

```typescript
find(predicate: (node: DimensionNodeBuilder, index: number) => boolean): DimensionNodeBuilder | undefined
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `predicate` | (node: DimensionNodeBuilder, index: number) => boolean | - Search conditions |

### findAll

Get all dimensions

**Definition**:

```typescript
findAll(): DimensionNodeBuilder[]
```

**Return**: `() => void`

### toJSON

Export all dimensions as JSON array

**Definition**:

```typescript
toJSON(): VBIDimension[]
```

**Return**: `() => void`

### observe

Monitor dimension changes and return a function to cancel monitoring.

**Definition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - callback function |

### static isDimensionNode

**Definition**:

```typescript
static isDimensionNode(node: VBIDimensionTree[0]): node is VBIDimension
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `node` | `VBIDimensionTree[0]` | - |

### static isDimensionGroup

**Definition**:

```typescript
static isDimensionGroup(node: VBIDimensionTree[0]): node is VBIDimensionGroup
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `node` | `VBIDimensionTree[0]` | - |