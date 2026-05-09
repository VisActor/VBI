# MeasureNodeBuilder

Metriken-Knoten-Generator zum Konfigurieren einzelner Metriken

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
getEncoding(): VBIMeasure['encoding'] | undefined
```

**Rückgabe**: `VBIMeasure['encoding'] \| undefined`

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
setEncoding(encoding: NonNullable<VBIMeasure['encoding']>): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `encoding` | `NonNullable<VBIMeasure['encoding']>` | - Position des Indikatorcodes |

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

Aggregatfunktion einstellen

**Definition**:

```typescript
setAggregate(aggregate: VBIMeasure['aggregate']): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `aggregate` | `VBIMeasure['aggregate']` | - Aggregationskonfiguration |

### setFormat

Formatwert

**Definition**:

```typescript
setFormat(format: VBIMeasureFormat): this
```

**Rückgabe**: `this`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `format` | `VBIMeasureFormat` | - Formatkonfiguration |

### getFormat

Numerisches Format abrufen

**Definition**:

```typescript
getFormat(): VBIMeasureFormat | undefined
```

**Rückgabe**: `VBIMeasureFormat \| undefined`

### clearFormat

Numerische Formatierung löschen

**Definition**:

```typescript
clearFormat(): this
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
toJSON(): VBIMeasure
```

**Rückgabe**: `VBIMeasure`