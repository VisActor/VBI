# LimitBuilder

Data Limit Builder zum Festlegen und Abrufen des aktuellen Limits

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

Hören Sie auf Grenzwertänderungen und geben Sie die Funktion zurück, um das Hören abzubrechen

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Rückgabe**: `() => void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `callback` | ObserveCallback | - Callback-Funktion |

### setLimit

Limit festlegen

**Definition**:

```typescript
setLimit(limit: number)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `limit` | number | - Datenvolumenbegrenzung |

### getLimit

Aktuelles Limit abrufen

**Definition**:

```typescript
getLimit(): number | undefined
```

**Rückgabe**: `number \| undefined`

### toJSON

Als JSON exportieren

**Definition**:

```typescript
toJSON(): number | undefined
```

**Rückgabe**: `number \| undefined`