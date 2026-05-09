# MeasuresBuilder

Metric builder for adding, modifying, and deleting metric configurations. Measures are numeric fields of data, such as: sales, profit, quantity

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

Add a metric

**Definition**:

```typescript
add(field: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `field` | string | - field name |
| `callback` | (node: MeasureNodeBuilder) => void | - callback function |

### remove

Delete the metric with the specified ID

**Definition**:

```typescript
remove(id: string): MeasuresBuilder
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `id` | string | - metric ID |

### update

Update measurement configuration

**Definition**:

```typescript
update(id: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `id` | string | - metric ID |
| `callback` | (node: MeasureNodeBuilder) => void | - callback function |

### find

Finds the first metric by callback criteria, behaves the same as Array.find

**Definition**:

```typescript
find(predicate: (node: MeasureNodeBuilder, index: number) => boolean): MeasureNodeBuilder | undefined
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `predicate` | (node: MeasureNodeBuilder, index: number) => boolean | - Search conditions |

### findAll

Get all metrics

**Definition**:

```typescript
findAll(): MeasureNodeBuilder[]
```

**Return**: `() => void`

### toJSON

Export all metrics as JSON array

**Definition**:

```typescript
toJSON(): VBIMeasure[]
```

**Return**: `() => void`

### observe

Listen for metric changes

**Definition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - callback function |

### static isMeasureNode

**Definition**:

```typescript
static isMeasureNode(node: VBIMeasureTree[0]): node is VBIMeasure
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `node` | `VBIMeasureTree[0]` | - |

### static isMeasureGroup

**Definition**:

```typescript
static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `node` | `VBIMeasureTree[0]` | - |