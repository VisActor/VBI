# LimitBuilder

Générateur de limite de volume de données pour définir et obtenir le limit actuel

## Propriétés

## Méthodes

### constructor

Builder

**définition**:

```typescript
constructor(_doc: Y.Doc, dsl: Y.Map<any>)
```

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `_doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### observe

Surveiller les changements dans limit et renvoyer une fonction pour annuler la surveillance

**définition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Retour** : `() => void`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `callback` | ObserveCallback | - fonction de rappel |

### setLimit

Paramètres limit

**définition**:

```typescript
setLimit(limit: number)
```

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `limit` | number | - Limite de volume de données |

### getLimit

Obtenez le limit actuel

**définition**:

```typescript
getLimit(): number | undefined
```

**Retour** : `number \| undefined`

### toJSON

Exporter en JSON

**définition**:

```typescript
toJSON(): number | undefined
```

**Retour** : `number \| undefined`