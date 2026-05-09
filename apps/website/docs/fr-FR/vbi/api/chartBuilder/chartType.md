# ChartTypeBuilder

Générateur de types de graphiques pour changer et obtenir des types de graphiques. Prend en charge divers types de graphiques tels que les tableaux, les graphiques à barres, les graphiques linéaires, les diagrammes circulaires, les graphiques à nuages ​​de points, etc.

## Propriétés

## Méthodes

### constructor

Builder

**définition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### observe

Surveiller les modifications du type de graphique

**définition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Retour** : `() => void`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `callback` | ObserveCallback | - fonction de rappel |

### changeChartType

Définir le type de graphique

**définition**:

```typescript
changeChartType(chartType: string)
```

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `chartType` | string | - Type de graphique |

### getChartType

Obtenir le type de graphique actuel

**définition**:

```typescript
getChartType(): string
```

**Retour** : `string`

### getSupportedDimensionEncodings

Obtenir les encodages de dimensions pris en charge par le type de graphique actuel

**définition**:

```typescript
getSupportedDimensionEncodings()
```

### getRecommendedDimensionEncodings

Renvoie les codes de dimension recommandés dans l’ordre des dimensions en fonction du type de graphique actuel.

**définition**:

```typescript
getRecommendedDimensionEncodings(dimensionCount: number)
```

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `dimensionCount` | number | - Nombre de dimensions, par défaut le nombre de dimensions dans le `dimensionCount` actuel |

### getSupportedMeasureEncodings

Obtenir les encodages de mesures pris en charge par le type de graphique actuel

**définition**:

```typescript
getSupportedMeasureEncodings()
```

### getRecommendedMeasureEncodings

Renvoie les codes d’mesure recommandés dans l’ordre des mesures en fonction du type de graphique actuel.

**définition**:

```typescript
getRecommendedMeasureEncodings(measureCount: number)
```

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `measureCount` | number | - Nombre d'mesures, par défaut le nombre d'mesures dans le `measureCount` actuel est utilisé |

### toJSON

Exporter en JSON

**définition**:

```typescript
toJSON(): string
```

**Retour** : `string`

### getAvailableChartTypes

Obtenez tous les types de graphiques pris en charge

**définition**:

```typescript
getAvailableChartTypes(): string[]
```

**Retour** : `string[]`