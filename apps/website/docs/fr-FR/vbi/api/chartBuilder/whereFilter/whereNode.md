# WhereFilterNodeBuilder

Générateur de nœuds de filtre Where pour configurer une seule condition de filtre Where

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

### setField

Définir le nom du champ

**définition**:

```typescript
setField(field: string): this
```

**Retour** : `this`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `field` | string | - nom du champ |

### getOperator

Obtenir l'opérateur de filtre

**définition**:

```typescript
getOperator(): string | undefined
```

**Retour** : `string \| undefined`

### setOperator

Définir l'opérateur de filtre

**définition**:

```typescript
setOperator(operator: string): this
```

**Retour** : `this`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `operator` | string | - opérateur |

### setValue

Définir la valeur du filtre

**définition**:

```typescript
setValue(value: unknown): this
```

**Retour** : `this`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `value` | unknown | - valeur du filtre |

### setDate

Définir des filtres de date

**définition**:

```typescript
setDate(predicate: VBIWhereDatePredicate): this
```

**Retour** : `this`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `predicate` | `VBIWhereDatePredicate` | - prédicat de date |

### getDate

Obtenez les conditions de filtre de date, le filtre sans date renvoie undefined

**définition**:

```typescript
getDate(): VBIWhereDatePredicate | undefined
```

**Retour** : `VBIWhereDatePredicate \| undefined`

### toJSON

Exporter en JSON

**définition**:

```typescript
toJSON(): VBIWhereFilter
```

**Retour** : `VBIWhereFilter`