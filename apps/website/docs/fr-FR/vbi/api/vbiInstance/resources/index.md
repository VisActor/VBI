# VBI.resources

L'espace de noms des ressources sur une instance VBI, utilisé pour enregistrer des ressources partagées pouvant être référencées par dashboard.

## Propriétés

| Propriété | Type | Description |
| --- | --- | --- |
| **chart** | `VBIChartResourceNamespace` | API de gestion des ressources chart. |
| **insight** | `VBIInsightResourceNamespace` | API de gestion des ressources Insight. |


## Méthodes

### register

Enregistre en lot des ressources chart et insight.

**Définition**:

```typescript
register(resources: VBIResourceRegisterInput): VBIResourceRegisterResult
```

**Retour**: `VBIResourceRegisterResult`

**Paramètres**:

| Paramètre | Type | Description |
| --- | --- | --- |
| `resources` | VBIResourceRegisterInput | - |

### clear

Vide toutes les ressources chart et insight de l'instance VBI actuelle.

**Définition**:

```typescript
clear(): void
```

**Retour**: `void`

### snapshot

Exporte un instantané DSL des ressources référencables par l'instance VBI actuelle.

**Définition**:

```typescript
snapshot(): VBIResourceSnapshot
```

**Retour**: `VBIResourceSnapshot`
