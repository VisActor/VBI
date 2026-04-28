# LocaleBuilder

Locale builder for setting and getting the current locale.

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

Listens for locale changes, returns an unsubscribe function.

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Returns**: `() => void`

**Parameters**:

| Parameter  | Type            | Description         |
| ---------- | --------------- | ------------------- |
| `callback` | ObserveCallback | - Callback function |

### setLocale

Sets the locale.

**Definition**:

```typescript
setLocale(locale: string)
```

**Parameters**:

| Parameter | Type   | Description   |
| --------- | ------ | ------------- |
| `locale`  | string | - Locale name |

### getLocale

Gets the current locale.

**Definition**:

```typescript
getLocale(): string
```

**Returns**: `string`

### toJSON

Exports to JSON.

**Definition**:

```typescript
toJSON(): string
```

**Returns**: `string`
