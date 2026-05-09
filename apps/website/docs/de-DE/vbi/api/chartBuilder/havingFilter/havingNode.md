# HavingFilterNodeBuilder

Having Filterknoten-Generator zum Konfigurieren einer einzelnen Having-Filterbedingung

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

### getOperator

Filteroperatoren abrufen

**Definition**:

```typescript
getOperator(): string | undefined
```

**Rückgabe**: `string \| undefined`

### getAggregate

Aggregationskonfiguration abrufen

**Definition**:

```typescript
getAggregate(): VBIHavingAggregate | undefined
```

**Rückgabe**: `VBIHavingAggregate \| undefined`

### setValue

Stellen Sie den Wert der Filterbedingung ein

**Definition**:

```typescript
setValue(value: unknown): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `value` | unknown | - Filterwerte |

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

### setAggregate

Aggregationskonfiguration festlegen

**Definition**:

```typescript
setAggregate(aggregate: VBIHavingAggregate): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `aggregate` | `VBIHavingAggregate` | - Aggregationskonfiguration |

### toJSON

Als JSON exportieren

**Definition**:

```typescript
toJSON(): VBIHavingFilter
```

**Rückgabe**: `VBIHavingFilter`