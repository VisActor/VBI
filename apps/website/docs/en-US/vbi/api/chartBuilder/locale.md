# LocaleBuilder

Language builder for setting and getting the current language

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

Monitor language changes and return a function to cancel monitoring

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `callback` | ObserveCallback | - callback function |

### setLocale

Set language

**Definition**:

```typescript
setLocale(locale: string)
```

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `locale` | string | - language name |

### getLocale

Get current language

**Definition**:

```typescript
getLocale(): string
```

**Return**: `() => void`

### toJSON

Export as JSON

**Definition**:

```typescript
toJSON(): string
```

**Return**: `() => void`