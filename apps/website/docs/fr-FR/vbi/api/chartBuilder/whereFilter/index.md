# WhereFilterBuilder

Where Générateur de filtres, utilisé pour ajouter, modifier et supprimer des conditions de filtre au niveau des lignes. Where Le filtrage prend effet avant la requête de données et est utilisé pour filtrer les données d'origine

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

Ajouter un filtre Where

**définition**:

```typescript
add(field: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**Retour** : `WhereFilterBuilder`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `field` | string | - nom du champ |
| `callback` | (node: WhereFilterNodeBuilder) => void | - fonction de rappel |

### addGroup

Ajouter un groupe Where

**définition**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**Retour** : `WhereFilterBuilder`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Opérateurs logiques |
| `callback` | (group: WhereGroupBuilder) => void | - fonction de rappel |

### update

Mettre à jour les critères de filtre pour le ID spécifié

**définition**:

```typescript
update(id: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**Retour** : `WhereFilterBuilder`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `id` | string | - Filtre ID |
| `callback` | (node: WhereFilterNodeBuilder) => void | - fonction de rappel |

### updateGroup

Mettre à jour le groupe spécifié par ID

**définition**:

```typescript
updateGroup(id: string, callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**Retour** : `WhereFilterBuilder`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `id` | string | - Groupe ID |
| `callback` | (group: WhereGroupBuilder) => void | - fonction de rappel |

### remove

Supprimez la condition spécifiant ID ou l'élément à l'index spécifié

**définition**:

```typescript
remove(idOrIndex: string | number): WhereFilterBuilder
```

**Retour** : `WhereFilterBuilder`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID ou index |

### find

Recherche la première condition (filtrage ou regroupement) par condition de rappel, se comporte conformément aux Array.find

**définition**:

```typescript
find(predicate: (entry: WhereFilterNodeBuilder | WhereGroupBuilder, index: number) => boolean): WhereFilterNodeBuilder | WhereGroupBuilder | undefined
```

**Retour** :``WhereFilterNodeBuilder \| WhereGroupBuilder \| undefined` \| WhereGroupBuilder \| undefined`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `predicate` | (entry: WhereFilterNodeBuilder \| WhereGroupBuilder, index: number) => boolean | - Critères de recherche |

### clear

Supprimer tous les filtres Where

**définition**:

```typescript
clear()
```

### toJSON

Exporter la configuration complète du filtrage Where

**définition**:

```typescript
toJSON(): VBIWhereGroup
```

**Retour** : `VBIWhereGroup`

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