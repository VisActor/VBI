# ThemeBuilder

Theme builder for setting and getting the current theme

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

Monitor topic changes and return a function to cancel monitoring

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `callback` | ObserveCallback | - callback function |

### setTheme

Set theme

**Definition**:

```typescript
setTheme(theme: string)
```

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `theme` | string | - topic name |

### getTheme

Get the current topic

**Definition**:

```typescript
getTheme(): string
```

**Return**: `() => void`

### toJSON

Export as JSON

**Definition**:

```typescript
toJSON(): string
```

**Return**: `() => void`