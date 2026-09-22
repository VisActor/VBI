# DashboardThemeBuilder

Dashboard theme builder. Owns definitions, presets, observation and VSeed registration; components consume the resolved result.

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

Observes local, undo/redo and collaborative changes to theme names or definitions. Returns an unsubscribe function.

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

Selects a theme. An optional definition is saved and selected in one change, without prior registration or changes to chart resources.

**Definition**:

```typescript
setTheme(theme: string, definition?: VBIDashboardThemeDefinition): void
```

**Returns**: `void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `theme` | string | - Nonempty theme name |
| `definition?` | VBIDashboardThemeDefinition | - Optional complete definition saved in this Dashboard |

### registerTheme

Registers or updates a document theme without selecting it. Definitions are saved and synchronized with the document.

**Definition**:

```typescript
registerTheme(theme: string, definition: VBIDashboardThemeDefinition): void
```

**Returns**: `void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `theme` | string | - Nonempty theme name |
| `definition` | VBIDashboardThemeDefinition | - Complete theme definition |

### getThemeConfig

Returns a copy of the theme definition, checking the document before built-in presets. Returns undefined if absent.

**Definition**:

```typescript
getThemeConfig(theme?: string): VBIDashboardThemeDefinition | undefined
```

**Returns**: `VBIDashboardThemeDefinition \| undefined`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `theme?` = this.getTheme() | string | - Theme name, defaulting to the current theme |

### getThemeDefinitions

Returns copies of all document theme definitions. Use observe to subscribe to available themes.

**Definition**:

```typescript
getThemeDefinitions(): Record<string, VBIDashboardThemeDefinition>
```

**Returns**: `Record<string, VBIDashboardThemeDefinition>`

### getThemeOptions

Lists built-in and document theme names, modes and palettes. Document definitions take precedence for matching names.

**Definition**:

```typescript
getThemeOptions(): VBIDashboardThemeOption[]
```

**Returns**: `VBIDashboardThemeOption[]`

### resolveTheme

Resolves a theme and ensures VSeed registration with an isolated runtime name. Unknown names fall back to light without changing the document.

**Definition**:

```typescript
resolveTheme(theme?: string): VBIDashboardResolvedTheme
```

**Returns**: `VBIDashboardResolvedTheme`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `theme?` = this.getTheme() | string | - Theme name, defaulting to the selected theme; can preview another theme temporarily |

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
