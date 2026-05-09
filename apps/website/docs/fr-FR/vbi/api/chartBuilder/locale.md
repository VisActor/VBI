# LocaleBuilder

Générateur de langue pour définir et obtenir la langue actuelle

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

Surveiller les changements de langue et renvoyer une fonction pour annuler la surveillance

**définition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Retour** : `() => void`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `callback` | ObserveCallback | - fonction de rappel |

### setLocale

Définir la langue

**définition**:

```typescript
setLocale(locale: string)
```

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `locale` | string | - nom de la langue |

### getLocale

Obtenir la langue actuelle

**définition**:

```typescript
getLocale(): string
```

**Retour** : `string`

### toJSON

Exporter en JSON

**définition**:

```typescript
toJSON(): string
```

**Retour** : `string`