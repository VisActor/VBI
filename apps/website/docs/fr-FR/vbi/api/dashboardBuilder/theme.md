# DashboardThemeBuilder

Le constructeur de thème Dashboard stocke le nom du thème ; le rendu enregistre et résout ses styles.

## Méthodes

### constructor

**Définition**:

```typescript
constructor(dsl: Y.Map<any>)
```

**Paramètres**:

| Paramètres | Type | Description |
| --- | --- | --- |
| `dsl` | Y.Map<any> | - |

### observe

Observe les changements de thème locaux, annulés et collaboratifs et renvoie une fonction de désabonnement.

**Définition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Retour**: `() => void`

**Paramètres**:

| Paramètres | Type | Description |
| --- | --- | --- |
| `callback` | ObserveCallback | - Fonction de rappel du changement de thème |

### setTheme

Définit light, dark ou un thème personnalisé enregistré sans modifier les ressources graphiques référencées.

**Définition**:

```typescript
setTheme(theme: string): void
```

**Retour**: `void`

**Paramètres**:

| Paramètres | Type | Description |
| --- | --- | --- |
| `theme` | string | - Nom de thème non vide |

### getTheme

Obtient le nom du thème, light par défaut.

**Définition**:

```typescript
getTheme(): string
```

**Retour**: `string`

### toJSON

Exporte le nom du thème.

**Définition**:

```typescript
toJSON(): string
```

**Retour**: `string`