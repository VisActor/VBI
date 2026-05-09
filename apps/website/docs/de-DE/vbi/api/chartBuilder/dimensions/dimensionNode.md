# DimensionNodeBuilder

Dimensionsknoten-Generator zum Konfigurieren einer einzelnen Dimension

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

### getEncoding

Diagrammcodierungsposition abrufen

**Definition**:

```typescript
getEncoding(): VBIDimension['encoding'] | undefined
```

**Rückgabe**: `VBIDimension['encoding'] \| undefined`

### getSort

Sortierkonfiguration abrufen

**Definition**:

```typescript
getSort(): VBISort | undefined
```

**Rückgabe**: `VBISort \| undefined`

### setAlias

Anzeigename festlegen

**Definition**:

```typescript
setAlias(alias: string): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `alias` | string | - Anzeigename |

### setEncoding

Position der Diagrammkodierung festlegen

**Definition**:

```typescript
setEncoding(encoding: NonNullable<VBIDimension['encoding']>): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `encoding` | `NonNullable<VBIDimension['encoding']>` | - Dimensionscodierungsposition |

### setSort

Sortierkonfiguration festlegen

**Definition**:

```typescript
setSort(sort: VBISort): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `sort` | `VBISort` | - Sortierkonfiguration |

### setAggregate

Datumsaggregationsfunktion einstellen

**Definition**:

```typescript
setAggregate(aggregate: NonNullable<VBIDimension['aggregate']>): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `aggregate` | `NonNullable<VBIDimension['aggregate']>` | - Datum Aggregationskonfiguration |

### clearAggregate

Datumsaggregationsfunktion löschen

**Definition**:

```typescript
clearAggregate(): this
```

**Rückgabe**: `this`

### clearSort

Sortierkonfiguration löschen

**Definition**:

```typescript
clearSort(): this
```

**Rückgabe**: `this`

### toJSON

Als JSON exportieren

**Definition**:

```typescript
toJSON(): VBIDimension
```

**Rückgabe**: `VBIDimension`