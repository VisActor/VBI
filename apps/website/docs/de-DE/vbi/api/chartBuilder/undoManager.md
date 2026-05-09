# UndoManager

Rückgängig/Redo Manager mit YJS-basiertem Rückgängig und Redo, Stack Management und History Purge

## Eigenschaften

## Methoden

### constructor

Konstruktor

**Definition**:

```typescript
constructor(scope: any)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `scope` | any | - YJS Dokument- oder Typumfang, der den Tracking-Umfang des Undo/Redo definiert |

### undo

Letzte Änderung rückgängig machen

**Definition**:

```typescript
undo(): boolean
```

**Rückgabe**: `boolean`

### redo

Änderungen rückgängig machen

**Definition**:

```typescript
redo(): boolean
```

**Rückgabe**: `boolean`

### canUndo

Überprüfen Sie, ob eine rückgängig zu machende Aktion vorliegt

**Definition**:

```typescript
canUndo(): boolean
```

**Rückgabe**: `boolean`

### canRedo

Überprüfen Sie, ob eine Aktion zum Wiederholen vorhanden ist

**Definition**:

```typescript
canRedo(): boolean
```

**Rückgabe**: `boolean`

### clear

Verlauf löschen

**Definition**:

```typescript
clear(clearUndoStack: boolean, clearRedoStack: boolean): void
```

**Rückgabe**: `void`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `clearUndoStack` | boolean | - Ob der Rückgängig-Stack gelöscht werden soll, die Standardeinstellung ist wahr |
| `clearRedoStack` | boolean | - Ob der Wiederherstellungsstapel gelöscht werden soll, die Standardeinstellung ist wahr |