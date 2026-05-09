# UndoManager

Undo/redo manager, provides undo and redo functions based on YJS, supports stack management and history clearing operations

## Properties

## Method

### constructor

Constructor

**Definition**:

```typescript
constructor(scope: any)
```

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `scope` | any | - YJS document or type scope, used to define the scope of undo/redo tracking |

### undo

Undo last modification

**Definition**:

```typescript
undo(): boolean
```

**Return**: `() => void`

### redo

Redo undone changes

**Definition**:

```typescript
redo(): boolean
```

**Return**: `() => void`

### canUndo

Check if there are any undoable operations

**Definition**:

```typescript
canUndo(): boolean
```

**Return**: `() => void`

### canRedo

Check if there are redoable operations

**Definition**:

```typescript
canRedo(): boolean
```

**Return**: `() => void`

### clear

clear history

**Definition**:

```typescript
clear(clearUndoStack: boolean, clearRedoStack: boolean): void
```

**Return**: `() => void`

**Parameters**:

| Parameters | Type | Description |
| --- | --- | --- |
| `clearUndoStack` | boolean | - Whether to clear the undo stack, default true |
| `clearRedoStack` | boolean | - Whether to clear the redo stack, default true |