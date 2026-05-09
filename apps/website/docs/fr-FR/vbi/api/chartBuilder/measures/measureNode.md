# MeasureNodeBuilder

Générateur de nœuds de métriques pour configurer des métriques individuelles

## Propriétés

## Méthodes

### constructor

**définition**:

```typescript
constructor(yMap: Y.Map<any>)
```

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `yMap` | `Y.Map<any>` | - |

### getId

Récupérer le nœud ID

**définition**:

```typescript
getId(): string
```

**Retour** : `string`

### getField

Obtenir le nom du champ

**définition**:

```typescript
getField(): string
```

**Retour** : `string`

### getEncoding

Obtenir la position d'encodage du graphique

**définition**:

```typescript
getEncoding(): VBIMeasure['encoding'] | undefined
```

**Retour** : `VBIMeasure['encoding'] \| undefined`

### getSort

Obtenir la configuration du tri

**définition**:

```typescript
getSort(): VBISort | undefined
```

**Retour** : `VBISort \| undefined`

### setAlias

Définir le nom d'affichage

**définition**:

```typescript
setAlias(alias: string): this
```

**Retour** : `this`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `alias` | string | - nom d'affichage |

### setEncoding

Définir la position d'encodage du graphique

**définition**:

```typescript
setEncoding(encoding: NonNullable<VBIMeasure['encoding']>): this
```

**Retour** : `this`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `encoding` | `NonNullable<VBIMeasure['encoding']>` | - Position de codage de l'mesure |

### setSort

Définir la configuration du tri

**définition**:

```typescript
setSort(sort: VBISort): this
```

**Retour** : `this`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `sort` | `VBISort` | - Configuration du tri |

### setAggregate

Définir la fonction d'agrégation

**définition**:

```typescript
setAggregate(aggregate: VBIMeasure['aggregate']): this
```

**Retour** : `this`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `aggregate` | `VBIMeasure['aggregate']` | - Configuration de l'agrégation |

### setFormat

Formater un nombre

**définition**:

```typescript
setFormat(format: VBIMeasureFormat): this
```

**Retour** : `this`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `format` | `VBIMeasureFormat` | -Configuration des formats |

### getFormat

Obtenir le format numérique

**définition**:

```typescript
getFormat(): VBIMeasureFormat | undefined
```

**Retour** : `VBIMeasureFormat \| undefined`

### clearFormat

Configuration du format numérique clair

**définition**:

```typescript
clearFormat(): this
```

**Retour** : `this`

### clearSort

Effacer la configuration du tri

**définition**:

```typescript
clearSort(): this
```

**Retour** : `this`

### toJSON

Exporter en JSON

**définition**:

```typescript
toJSON(): VBIMeasure
```

**Retour** : `VBIMeasure`