# LocaleBuilder

Language Builder zum Festlegen und Abrufen der aktuellen Sprache

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

Hören Sie auf Sprachänderungen und geben Sie die Funktion zurück, um das Hören abzubrechen

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Rückgabe**: `() => void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `callback` | ObserveCallback | - Callback-Funktion |

### setLocale

Sprache einstellen

**Definition**:

```typescript
setLocale(locale: string)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `locale` | string | - Name der Sprache |

### getLocale

Aktuelle Sprache abrufen

**Definition**:

```typescript
getLocale(): string
```

**Rückgabe**: `string`

### toJSON

Als JSON exportieren

**Definition**:

```typescript
toJSON(): string
```

**Rückgabe**: `string`