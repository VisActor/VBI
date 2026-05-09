# HavingFilterBuilder

Having Générateur de filtres, utilisé pour ajouter, modifier et supprimer des conditions de filtre post-groupe. Having Le filtrage prend effet après l'agrégation des données et est utilisé pour filtrer les résultats du regroupement

## Propriétés

## Méthodes

### constructor

**définition**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### getConditions

**définition**:

```typescript
getConditions(): Y.Array<any>
```

**Retour** : `Y.Array<any>`

### add

Ajouter un filtre Having

**définition**:

```typescript
add(field: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Retour** : `HavingFilterBuilder`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `field` | string | - nom du champ |
| `callback` | (node: HavingFilterNodeBuilder) => void | - fonction de rappel |

### addGroup

Ajouter un groupe Having

**définition**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Retour** : `HavingFilterBuilder`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Opérateurs logiques |
| `callback` | (group: HavingGroupBuilder) => void | - fonction de rappel |

### update

Mettre à jour les critères de filtre pour le ID spécifié

**définition**:

```typescript
update(id: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Retour** : `HavingFilterBuilder`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `id` | string | - Filtre ID |
| `callback` | (node: HavingFilterNodeBuilder) => void | - fonction de rappel |

### updateGroup

Mettre à jour le groupe spécifié par ID

**définition**:

```typescript
updateGroup(id: string, callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Retour** : `HavingFilterBuilder`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `id` | string | - Groupe ID |
| `callback` | (group: HavingGroupBuilder) => void | - fonction de rappel |

### remove

Supprimez la condition spécifiant ID ou l'élément à l'index spécifié

**définition**:

```typescript
remove(idOrIndex: string | number): HavingFilterBuilder
```

**Retour** : `HavingFilterBuilder`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID ou index |

### find

Recherche la première condition (filtrage ou regroupement) par condition de rappel, se comporte conformément aux Array.find

**définition**:

```typescript
find(predicate: (entry: HavingFilterNodeBuilder | HavingGroupBuilder, index: number) => boolean): HavingFilterNodeBuilder | HavingGroupBuilder | undefined
```

**Retour** :``HavingFilterNodeBuilder \| HavingGroupBuilder \| undefined` \| HavingGroupBuilder \| undefined`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `predicate` | (entry: HavingFilterNodeBuilder \| HavingGroupBuilder, index: number) => boolean | - Critères de recherche |

### clear

Supprimer tous les filtres Having

**définition**:

```typescript
clear()
```

### toJSON

Exporter la configuration complète du filtrage Having

**définition**:

```typescript
toJSON(): VBIHavingGroup
```

**Retour** : `VBIHavingGroup`

### observe

Surveillez les changements dans les conditions du filtre et renvoyez une fonction pour annuler la surveillance.

**définition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Retour** : `() => void`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - fonction de rappel |

### static isGroup

Déterminer s'il s'agit d'un nœud de groupe

**définition**:

```typescript
static isGroup(yMap: Y.Map<any>): boolean
```

**Retour** : `boolean`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `yMap` | `Y.Map<any>` | - |

### static isNode

Déterminer s'il s'agit d'un nœud feuille

**définition**:

```typescript
static isNode(yMap: Y.Map<any>): boolean
```

**Retour** : `boolean`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `yMap` | `Y.Map<any>` | - |