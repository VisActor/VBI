# DashboardThemeBuilder

Builder de thèmes Dashboard. Gère les définitions, préréglages, abonnements et inscriptions VSeed ; les composants utilisent le résultat résolu.

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

Observe les changements de nom ou de configuration, y compris les modifications locales, annulations, rétablissements et synchronisations. Renvoie une fonction de désabonnement.

**Définition**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Retour**: `() => void`

**Paramètres**:

| Paramètres | Type | Description |
| --- | --- | --- |
| `callback` | ObserveCallback | - Rappel de changement de thème |

### setTheme

Sélectionne un thème. Une définition facultative est enregistrée et sélectionnée en une seule modification, sans inscription préalable ni modification des graphiques référencés.

**Définition**:

```typescript
setTheme(theme: string, definition?: VBIDashboardThemeDefinition): void
```

**Retour**: `void`

**Paramètres**:

| Paramètres | Type | Description |
| --- | --- | --- |
| `theme` | string | - Nom de thème non vide |
| `definition?` | VBIDashboardThemeDefinition | - Définition complète facultative enregistrée dans ce Dashboard |

### registerTheme

Enregistre ou actualise un thème dans le document sans le sélectionner. Les définitions sont sauvegardées et synchronisées avec le document.

**Définition**:

```typescript
registerTheme(theme: string, definition: VBIDashboardThemeDefinition): void
```

**Retour**: `void`

**Paramètres**:

| Paramètres | Type | Description |
| --- | --- | --- |
| `theme` | string | - Nom de thème non vide |
| `definition` | VBIDashboardThemeDefinition | - Définition complète du thème |

### getThemeConfig

Renvoie une copie de la définition, en donnant priorité au document sur les préréglages intégrés. Renvoie undefined si elle est absente.

**Définition**:

```typescript
getThemeConfig(theme?: string): VBIDashboardThemeDefinition | undefined
```

**Retour**: `VBIDashboardThemeDefinition \| undefined`

**Paramètres**:

| Paramètres | Type | Description |
| --- | --- | --- |
| `theme?` = this.getTheme() | string | - Nom du thème, thème actuel par défaut |

### getThemeDefinitions

Renvoie des copies de toutes les définitions du document. observe permet de suivre les thèmes disponibles.

**Définition**:

```typescript
getThemeDefinitions(): Record<string, VBIDashboardThemeDefinition>
```

**Retour**: `Record<string, VBIDashboardThemeDefinition>`

### getThemeOptions

Liste les noms, modes et palettes des thèmes intégrés et du document. Les définitions du document priment à nom égal.

**Définition**:

```typescript
getThemeOptions(): VBIDashboardThemeOption[]
```

**Retour**: `VBIDashboardThemeOption[]`

### resolveTheme

Résout le thème et garantit son inscription VSeed sous un nom interne isolé. Un nom inconnu revient à light sans modifier le document.

**Définition**:

```typescript
resolveTheme(theme?: string): VBIDashboardResolvedTheme
```

**Retour**: `VBIDashboardResolvedTheme`

**Paramètres**:

| Paramètres | Type | Description |
| --- | --- | --- |
| `theme?` = this.getTheme() | string | - Nom du thème, sélection actuelle par défaut ; permet un aperçu temporaire d’un autre thème |

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
