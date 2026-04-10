# ThemeBuilder

Theme builder for setting and getting the current theme.

## Properties

## Methods

### constructor

Constructor

**Definition**:

```typescript
constructor(_doc: Y.Doc, dsl: Y.Map<any>)
```

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `_doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### observe

Listens for theme changes, returns an unsubscribe function.

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Returns**: `() => void`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `callback` | ObserveCallback | - Callback function |

### setTheme

Sets the theme.

**Definition**:

```typescript
setTheme(theme: string)
```

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `theme` | string | - Theme name |

### getTheme

Gets the current theme.

**Definition**:

```typescript
getTheme(): string
```

**Returns**: `string`

### toJSON

Exports to JSON.

**Definition**:

```typescript
toJSON(): string
```

**Returns**: `string`
