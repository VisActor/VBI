# ThemeBuilder

Générateur de thèmes pour définir et obtenir le thème actuel

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

Surveiller les changements de sujet et renvoyer une fonction pour annuler la surveillance

**définition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Retour** : `() => void`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `callback` | ObserveCallback | - fonction de rappel |

### setTheme

Définir le thème

**définition**:

```typescript
setTheme(theme: string)
```

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `theme` | string | - nom du thème |

### getTheme

Obtenez le sujet actuel

**définition**:

```typescript
getTheme(): string
```

**Retour** : `string`

### toJSON

Exporter en JSON

**définition**:

```typescript
toJSON(): string
```

**Retour** : `string`