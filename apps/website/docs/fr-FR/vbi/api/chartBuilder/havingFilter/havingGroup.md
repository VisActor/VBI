# HavingGroupBuilder

Builder de groupe Having, utilisé pour configurer la relation logique d'un ensemble de conditions (AND/OR)

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

### getConditions

**définition**:

```typescript
getConditions(): Y.Array<any>
```

**Retour** : `Y.Array<any>`

### getId

Obtenir le groupe ID

**définition**:

```typescript
getId(): string
```

**Retour** : `string`

### getOperator

Obtenir l'opérateur logique

**définition**:

```typescript
getOperator(): 'and' | 'or'
```

**Retour** : `'and' \| 'or'`

### setOperator

Définir des opérateurs logiques

**définition**:

```typescript
setOperator(op: 'and' | 'or'): this
```

**Retour** : `this`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Opérateurs logiques |

### add

Ajouter un filtre Having au groupe

**définition**:

```typescript
add(field: string, callback: (node: HavingFilterNodeBuilder) => void): this
```

**Retour** : `this`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `field` | string | - nom du champ |
| `callback` | (node: HavingFilterNodeBuilder) => void | - fonction de rappel |

### addGroup

Ajouter un groupe imbriqué au groupe actuel

**définition**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: HavingGroupBuilder) => void): this
```

**Retour** : `this`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Opérateurs logiques |
| `callback` | (group: HavingGroupBuilder) => void | - fonction de rappel |

### remove

Supprimez la condition spécifiant ID ou l'élément à l'index spécifié

**définition**:

```typescript
remove(idOrIndex: string | number): this
```

**Retour** : `this`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID ou index |

### clear

Effacer toutes les conditions du groupe

**définition**:

```typescript
clear(): this
```

**Retour** : `this`

### toJSON

Exporter en JSON

**définition**:

```typescript
toJSON(): VBIHavingGroup
```

**Retour** : `VBIHavingGroup`
