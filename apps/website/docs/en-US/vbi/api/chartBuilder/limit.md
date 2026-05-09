# LimitBuilder

Data volume limit builder, used to set and get the current limit

## Properties

## Method

### constructor

Constructor

**Definition**:

```typescript
constructor(_doc: Y.Doc, dsl: Y.Map<any>)
```

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `_doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### observe

Monitor limit changes and return a function to cancel monitoring

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `callback` | ObserveCallback | - callback function |

### setLimit

set limit

**Definition**:

```typescript
setLimit(limit: number)
```

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `limit` | number | - data size limit |

### getLimit

Get the current limit

**Definition**:

```typescript
getLimit(): number | undefined
```

**Return**: `() => void`

### toJSON

Export as JSON

**Definition**:

```typescript
toJSON(): number | undefined
```

**Return**: `() => void`