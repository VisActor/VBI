# WhereFilterNodeBuilder

Where Filterknoten-Generator zum Konfigurieren individueller Where-Filterbedingungen

## Eigenschaften

## Methoden

### constructor

**Definition**:

```typescript
constructor(yMap: Y.Map<any>)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `yMap` | `Y.Map<any>` | - |

### getId

Knoten-ID abrufen

**Definition**:

```typescript
getId(): string
```

**Rückgabe**: `string`

### getField

Feldname abrufen

**Definition**:

```typescript
getField(): string
```

**Rückgabe**: `string`

### setField

Feldname festlegen

**Definition**:

```typescript
setField(field: string): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `field` | string | - Feldname |

### getOperator

Filteroperatoren abrufen

**Definition**:

```typescript
getOperator(): string | undefined
```

**Rückgabe**: `string \| undefined`

### setOperator

Filterbediener einstellen

**Definition**:

```typescript
setOperator(operator: string): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `operator` | string | - Bediener |

### setValue

Filterwert einstellen

**Definition**:

```typescript
setValue(value: unknown): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `value` | unknown | - Filterwerte |

### setDate

Datumsfilter einstellen

**Definition**:

```typescript
setDate(predicate: VBIWhereDatePredicate): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `predicate` | `VBIWhereDatePredicate` | - Datumsverb |

### getDate

Datumsfilter abrufen, Nicht-Datumsfilter geben undefiniert zurück

**Definition**:

```typescript
getDate(): VBIWhereDatePredicate | undefined
```

**Rückgabe**: `VBIWhereDatePredicate \| undefined`

### toJSON

Als JSON exportieren

**Definition**:

```typescript
toJSON(): VBIWhereFilter
```

**Rückgabe**: `VBIWhereFilter`