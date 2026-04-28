# MeasuresBuilder

Measure builder for adding, modifying, and removing measure configuration. Measures are the numeric fields in data, such as: sales, profit, quantity.

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

Adds a measure.

**Definition**:

```typescript
add(field: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Returns**: `MeasuresBuilder`

**Parameters**:

| Parameter  | Type                               | Description         |
| ---------- | ---------------------------------- | ------------------- |
| `field`    | string                             | - Field name        |
| `callback` | (node: MeasureNodeBuilder) => void | - Callback function |

### remove

Removes the measure with the specified ID.

**Definition**:

```typescript
remove(id: string): MeasuresBuilder
```

**Returns**: `MeasuresBuilder`

**Parameters**:

| Parameter | Type   | Description  |
| --------- | ------ | ------------ |
| `id`      | string | - Measure ID |

### update

Updates the measure configuration.

**Definition**:

```typescript
update(id: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Returns**: `MeasuresBuilder`

**Parameters**:

| Parameter  | Type                               | Description         |
| ---------- | ---------------------------------- | ------------------- |
| `id`       | string                             | - Measure ID        |
| `callback` | (node: MeasureNodeBuilder) => void | - Callback function |

### find

Finds the first measure matching the callback condition, behaves like `Array.find`.

**Definition**:

```typescript
find(predicate: (node: MeasureNodeBuilder, index: number) => boolean): MeasureNodeBuilder | undefined
```

**Returns**: `MeasureNodeBuilder \| undefined`

**Parameters**:

| Parameter   | Type                                                 | Description        |
| ----------- | ---------------------------------------------------- | ------------------ |
| `predicate` | (node: MeasureNodeBuilder, index: number) => boolean | - Search condition |

### findAll

Gets all measures.

**Definition**:

```typescript
findAll(): MeasureNodeBuilder[]
```

**Returns**: `MeasureNodeBuilder[]`

### toJSON

Exports all measures as a JSON array.

**Definition**:

```typescript
toJSON(): VBIMeasure[]
```

**Returns**: `VBIMeasure[]`

### observe

Listens for measure changes.

**Definition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Returns**: `() => void`

**Parameters**:

| Parameter  | Type                | Description         |
| ---------- | ------------------- | ------------------- |
| `callback` | ObserveDeepCallback | - Callback function |

### static isMeasureNode

**Definition**:

```typescript
static isMeasureNode(node: VBIMeasureTree[0]): node is VBIMeasure
```

**Returns**: `node is VBIMeasure`

**Parameters**:

| Parameter | Type               | Description |
| --------- | ------------------ | ----------- |
| `node`    | VBIMeasureTree\[0] | -           |

### static isMeasureGroup

**Definition**:

```typescript
static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup
```

**Returns**: `node is VBIMeasureGroup`

**Parameters**:

| Parameter | Type               | Description |
| --------- | ------------------ | ----------- |
| `node`    | VBIMeasureTree\[0] | -           |
