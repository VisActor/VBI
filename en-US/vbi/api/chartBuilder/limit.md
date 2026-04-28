# LimitBuilder

Data limit builder for setting and getting the current limit.

## Properties

## Methods

### constructor

Constructor

**Definition**:

```typescript
constructor(_doc: Y.Doc, dsl: Y.Map<any>)
```

**Parameters**:

| Parameter | Type       | Description |
| --------- | ---------- | ----------- |
| `_doc`    | Y.Doc      | -           |
| `dsl`     | Y.Map<any> | -           |

### observe

Listens for limit changes, returns an unsubscribe function.

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Returns**: `() => void`

**Parameters**:

| Parameter  | Type            | Description         |
| ---------- | --------------- | ------------------- |
| `callback` | ObserveCallback | - Callback function |

### setLimit

Sets the limit.

**Definition**:

```typescript
setLimit(limit: number)
```

**Parameters**:

| Parameter | Type   | Description  |
| --------- | ------ | ------------ |
| `limit`   | number | - Data limit |

### getLimit

Gets the current limit.

**Definition**:

```typescript
getLimit(): number | undefined
```

**Returns**: `number \| undefined`

### toJSON

Exports to JSON.

**Definition**:

```typescript
toJSON(): number | undefined
```

**Returns**: `number \| undefined`
