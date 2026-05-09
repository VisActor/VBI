# ThemeBuilder

Theme Builder zum Einrichten und Abrufen des aktuellen Themes

## Eigenschaften

## Methoden

### constructor

Konstruktor

**Definition**:

```typescript
constructor(_doc: Y.Doc, dsl: Y.Map<any>)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `_doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### observe

Hören Sie auf Themenänderungen und geben Sie die Funktion zurück, um das Hören abzubrechen

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Rückgabe**: `() => void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `callback` | ObserveCallback | - Callback-Funktion |

### setTheme

Schema festlegen

**Definition**:

```typescript
setTheme(theme: string)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `theme` | string | - Theme-Name |

### getTheme

Holen Sie sich das aktuelle Thema

**Definition**:

```typescript
getTheme(): string
```

**Rückgabe**: `string`

### toJSON

Als JSON exportieren

**Definition**:

```typescript
toJSON(): string
```

**Rückgabe**: `string`