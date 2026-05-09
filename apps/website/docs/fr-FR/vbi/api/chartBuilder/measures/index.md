# MeasuresBuilder

Générateur de métriques pour ajouter, modifier et supprimer des configurations de métriques. Les mesures sont des champs de données numériques, tels que : ventes, bénéfices, quantité

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

Ajouter une métrique

**définition**:

```typescript
add(field: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Retour** : `MeasuresBuilder`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `field` | string | - nom du champ |
| `callback` | (node: MeasureNodeBuilder) => void | - fonction de rappel |

### remove

Supprimer la métrique pour le ID spécifié

**définition**:

```typescript
remove(id: string): MeasuresBuilder
```

**Retour** : `MeasuresBuilder`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `id` | string | - Métrique ID |

### update

Mettre à jour la configuration des mesures

**définition**:

```typescript
update(id: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Retour** : `MeasuresBuilder`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `id` | string | - Métrique ID |
| `callback` | (node: MeasureNodeBuilder) => void | - fonction de rappel |

### find

Trouve la première métrique par condition de rappel, comportement cohérent avec Array.find

**définition**:

```typescript
find(predicate: (node: MeasureNodeBuilder, index: number) => boolean): MeasureNodeBuilder | undefined
```

**Retour** : `MeasureNodeBuilder \| undefined`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `predicate` | (node: MeasureNodeBuilder, index: number) => boolean | - Critères de recherche |

### findAll

Obtenez toutes les mesures

**définition**:

```typescript
findAll(): MeasureNodeBuilder[]
```

**Retour** : `MeasureNodeBuilder[]`

### toJSON

Exporter toutes les métriques sous forme de tableau JSON

**définition**:

```typescript
toJSON(): VBIMeasure[]
```

**Retour** : `VBIMeasure[]`

### observe

Écoutez les changements de métriques

**définition**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Retour** : `() => void`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - fonction de rappel |

### static isMeasureNode

**définition**:

```typescript
static isMeasureNode(node: VBIMeasureTree[0]): node is VBIMeasure
```

**Retour** : `node is VBIMeasure`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `node` | `VBIMeasureTree[0]` | - |

### static isMeasureGroup

**définition**:

```typescript
static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup
```

**Retour** : `node is VBIMeasureGroup`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `node` | `VBIMeasureTree[0]` | - |