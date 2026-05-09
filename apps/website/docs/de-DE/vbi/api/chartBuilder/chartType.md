# ChartTypeBuilder

Diagrammtyp-Generator zum Umschalten und Abrufen von Diagrammtypen.Unterstützt verschiedene Diagrammtypen wie Tabellen, Histogramme, Liniendiagramme, Kreisdiagramme, Streudiagramme usw.

## Eigenschaften

## Methoden

### constructor

Konstruktor

**Definition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### observe

Achten Sie auf Änderungen des Diagrammtyps

**Definition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Rückgabe**: `() => void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `callback` | ObserveCallback | - Callback-Funktion |

### changeChartType

Diagrammtyp festlegen

**Definition**:

```typescript
changeChartType(chartType: string)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `chartType` | string | - Diagrammtyp |

### getChartType

Den aktuellen Diagrammtyp abrufen

**Definition**:

```typescript
getChartType(): string
```

**Rückgabe**: `string`

### getSupportedDimensionEncodings

Abrufen der Dimensionscodierung, die vom aktuellen Diagrammtyp unterstützt wird

**Definition**:

```typescript
getSupportedDimensionEncodings()
```

### getRecommendedDimensionEncodings

Gibt die empfohlenen Dimensionscodes in Dimensionsreihenfolge gemäß dem aktuellen Diagrammtyp zurück

**Definition**:

```typescript
getRecommendedDimensionEncodings(dimensionCount: number)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `dimensionCount` | number | - Anzahl der Dimensionen, Vorgabe zur Anzahl der Dimensionen im aktuellen DSL |

### getSupportedMeasureEncodings

Holen Sie sich die Metrikkodierung, die vom aktuellen Diagrammtyp unterstützt wird

**Definition**:

```typescript
getSupportedMeasureEncodings()
```

### getRecommendedMeasureEncodings

Gibt die empfohlenen metrischen Codes in metrischer Reihenfolge gemäß dem aktuellen Diagrammtyp zurück

**Definition**:

```typescript
getRecommendedMeasureEncodings(measureCount: number)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `measureCount` | number | - Anzahl der Indikatoren, die Anzahl der Indikatoren im aktuellen DSL wird standardmäßig verwendet |

### toJSON

Als JSON exportieren

**Definition**:

```typescript
toJSON(): string
```

**Rückgabe**: `string`

### getAvailableChartTypes

Alle unterstützten Diagrammtypen abrufen

**Definition**:

```typescript
getAvailableChartTypes(): string[]
```

**Rückgabe**: `string[]`