# UndoManager

Gestionnaire d'annulation/rétablissement, fournissant des fonctions d'annulation et de rétablissement basées sur YJS, prenant en charge les opérations de gestion de la pile et d'effacement de l'historique

## Propriétés

## Méthodes

### constructor

Builder

**définition**:

```typescript
constructor(scope: any)
```

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `scope` | any | - YJS portée du document ou du type, utilisé pour définir la portée du suivi d'annulation/rétablissement |

### undo

Annuler la dernière modification

**définition**:

```typescript
undo(): boolean
```

**Retour** : `boolean`

### redo

Refaire les modifications annulées

**définition**:

```typescript
redo(): boolean
```

**Retour** : `boolean`

### canUndo

Vérifiez s'il y a des opérations annulables

**définition**:

```typescript
canUndo(): boolean
```

**Retour** : `boolean`

### canRedo

Vérifiez s'il existe des opérations répétables

**définition**:

```typescript
canRedo(): boolean
```

**Retour** : `boolean`

### clear

effacer l'historique

**définition**:

```typescript
clear(clearUndoStack: boolean, clearRedoStack: boolean): void
```

**Retour** : `void`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `clearUndoStack` | boolean | - S'il faut effacer la pile d'annulation, par défaut true |
| `clearRedoStack` | boolean | - S'il faut effacer la pile de rétablissement, par défaut true |