# DashboardThemeBuilder

Dashboard theme builder. Stores a theme name; the renderer registers and resolves its styles.

## Methods

### constructor

**Definition**:

```typescript
constructor(dsl: Y.Map<any>)
```

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `dsl` | Y.Map<any> | - |

### observe

Listens for local, undo and collaborative theme changes. Returns an unsubscribe function.

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Returns**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `callback` | ObserveCallback | - Theme change callback |

### setTheme

Sets light, dark or a registered custom theme without changing referenced chart resources.

**Definition**:

```typescript
setTheme(theme: string): void
```

**Returns**: `void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `theme` | string | - Nonempty theme name |

### getTheme

Gets the theme name, defaulting to light.

**Definition**:

```typescript
getTheme(): string
```

**Returns**: `string`

### toJSON

Exports the theme name.

**Definition**:

```typescript
toJSON(): string
```

**Returns**: `string`