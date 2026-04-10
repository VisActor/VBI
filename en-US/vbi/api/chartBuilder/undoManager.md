# UndoManager

Undo/redo manager providing YJS-based undo and redo functionality, with support for stack management and history clearing.

## Properties

## Methods

### constructor

Constructor

**Definition**:

```typescript
constructor(scope: any)
```

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `scope` | any | - YJS document or type scope, used to define the tracking range for undo/redo |

### undo

Undoes the last modification.

**Definition**:

```typescript
undo(): boolean
```

**Returns**: `boolean`

### redo

Redoes an undone modification.

**Definition**:

```typescript
redo(): boolean
```

**Returns**: `boolean`

### canUndo

Checks whether there are operations that can be undone.

**Definition**:

```typescript
canUndo(): boolean
```

**Returns**: `boolean`

### canRedo

Checks whether there are operations that can be redone.

**Definition**:

```typescript
canRedo(): boolean
```

**Returns**: `boolean`

### clear

Clears the history.

**Definition**:

```typescript
clear(clearUndoStack: boolean, clearRedoStack: boolean): void
```

**Returns**: `void`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `clearUndoStack` | boolean | - Whether to clear the undo stack, defaults to true |
| `clearRedoStack` | boolean | - Whether to clear the redo stack, defaults to true |
