# DimensionsBuilder

Générateur de dimensions, utilisé pour ajouter, modifier et supprimer des configurations de dimensions. Les dimensions sont des champs de classification de données, tels que : heure, région, catégorie de produit.

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

### add

ajouter une dimension

**définition**:

```typescript
add(field: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Retour** : `DimensionsBuilder`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `field` | string | - nom du champ |
| `callback` | (node: DimensionNodeBuilder) => void | - fonction de rappel |

### remove

Supprimer la dimension spécifiée ID

**définition**:

```typescript
remove(id: string): DimensionsBuilder
```

**Retour** : `DimensionsBuilder`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `id` | string | - Cote ID |

### update

Mettre à jour la configuration de la dimension spécifiée ID

**définition**:

```typescript
update(id: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Retour** : `DimensionsBuilder`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `id` | string | - Cote ID |
| `callback` | (node: DimensionNodeBuilder) => void | - fonction de rappel |

### find

Trouver la première dimension par condition de rappel, comportement cohérent avec Array.find

**définition**:

```typescript
find(predicate: (node: DimensionNodeBuilder, index: number) => boolean): DimensionNodeBuilder | undefined
```

**Retour** : `DimensionNodeBuilder \| undefined`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `predicate` | (node: DimensionNodeBuilder, index: number) => boolean | - Critères de recherche |

### findAll

Obtenez toutes les dimensions

**définition**:

```typescript
findAll(): DimensionNodeBuilder[]
```

**Retour** : `DimensionNodeBuilder[]`

### toJSON

Exporter toutes les dimensions sous forme de tableau JSON

**définition**:

```typescript
toJSON(): VBIDimension[]
```

**Retour** : `VBIDimension[]`

### observe

Surveillez les changements de dimension et renvoyez une fonction pour annuler la surveillance.

**définition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Retour** : `() => void`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - fonction de rappel |

### static isDimensionNode

**définition**:

```typescript
static isDimensionNode(node: VBIDimensionTree[0]): node is VBIDimension
```

**Retour** : `node is VBIDimension`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `node` | `VBIDimensionTree[0]` | - |

### static isDimensionGroup

**définition**:

```typescript
static isDimensionGroup(node: VBIDimensionTree[0]): node is VBIDimensionGroup
```

**Retour** : `node is VBIDimensionGroup`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `node` | `VBIDimensionTree[0]` | - |