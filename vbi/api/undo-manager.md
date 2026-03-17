# undoManager

撤销/重做管理器，提供基于 YJS 的撤销和重做功能，支持栈管理和历史清除操作

## 属性

## 方法

### constructor

构造函数

**定义**:

```typescript
constructor(scope: any)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `scope` | any | - YJS 文档或类型作用域，用于定义撤销/重做的追踪范围 |

### undo

撤销上一次修改

**定义**:

```typescript
undo(): boolean
```

**返回**: `boolean`

### redo

重做被撤销的修改

**定义**:

```typescript
redo(): boolean
```

**返回**: `boolean`

### canUndo

检查是否有可撤销的操作

**定义**:

```typescript
canUndo(): boolean
```

**返回**: `boolean`

### canRedo

检查是否有可重做的操作

**定义**:

```typescript
canRedo(): boolean
```

**返回**: `boolean`

### clear

清除历史记录

**定义**:

```typescript
clear(clearUndoStack: boolean, clearRedoStack: boolean): void
```

**返回**: `void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `clearUndoStack` | boolean | - 是否清除撤销栈，默认 true |
| `clearRedoStack` | boolean | - 是否清除重做栈，默认 true |
