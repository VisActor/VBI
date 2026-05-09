# HavingFilterNodeBuilder

Générateur de nœuds de filtre Having pour configurer une seule condition de filtre Having

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

### getOperator

Obtenir l'opérateur de filtre

**définition**:

```typescript
getOperator(): string | undefined
```

**Retour** : `string \| undefined`

### getAggregate

Obtenir la configuration globale

**définition**:

```typescript
getAggregate(): VBIHavingAggregate | undefined
```

**Retour** : `VBIHavingAggregate \| undefined`

### setValue

Définir la valeur de la condition de filtre

**définition**:

```typescript
setValue(value: unknown): this
```

**Retour** : `this`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `value` | unknown | - valeur du filtre |

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

### setAggregate

Définir la configuration de l'agrégation

**définition**:

```typescript
setAggregate(aggregate: VBIHavingAggregate): this
```

**Retour** : `this`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `aggregate` | `VBIHavingAggregate` | - Configuration de l'agrégation |

### toJSON

Exporter en JSON

**définition**:

```typescript
toJSON(): VBIHavingFilter
```

**Retour** : `VBIHavingFilter`