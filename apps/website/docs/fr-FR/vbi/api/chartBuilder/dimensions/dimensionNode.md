# DimensionNodeBuilder

Générateur de nœuds de dimension pour configurer des dimensions individuelles

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
getEncoding(): VBIDimension['encoding'] | undefined
```

**Retour** : `VBIDimension['encoding'] \| undefined`

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
setEncoding(encoding: NonNullable<VBIDimension['encoding']>): this
```

**Retour** : `this`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `encoding` | `NonNullable<VBIDimension['encoding']>` | - Position d'encodage des dimensions |

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

Définir la fonction d'agrégation de dates

**définition**:

```typescript
setAggregate(aggregate: NonNullable<VBIDimension['aggregate']>): this
```

**Retour** : `this`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `aggregate` | `NonNullable<VBIDimension['aggregate']>` | - Configuration de l'agrégation de dates |

### clearAggregate

Fonction d'agrégation de date claire

**définition**:

```typescript
clearAggregate(): this
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
toJSON(): VBIDimension
```

**Retour** : `VBIDimension`