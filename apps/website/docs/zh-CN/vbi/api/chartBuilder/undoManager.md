# UndoManager

撤销/重做管理器，提供基于 YJS 的撤销和重做功能，支持栈管理和历史清除操作

## 方法

### constructor

构造函数

**定义**:

```typescript
constructor(scope: Y.Doc | Y.AbstractType<any> | Y.AbstractType<any>[], options?: UndoManagerOptions)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `scope` | Y.Doc \| Y.AbstractType<any> \| Y.AbstractType<any>[] | - YJS 文档或类型作用域，用于定义撤销/重做的追踪范围 |
| `options?` = {} | UndoManagerOptions | - |

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
clear(clearUndoStack?: boolean, clearRedoStack?: boolean): void
```

**返回**: `void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `clearUndoStack?` | boolean | - 是否清除撤销栈，默认 true |
| `clearRedoStack?` | boolean | - 是否清除重做栈，默认 true |

### stopCapturing

结束当前历史分组，下一次修改作为新的撤销步骤。

**定义**:

```typescript
stopCapturing(): void
```

**返回**: `void`

### addTrackedOrigin

开始追踪指定来源的本地事务。

**定义**:

```typescript
addTrackedOrigin(origin: unknown): void
```

**返回**: `void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `origin` | unknown | - |

### removeTrackedOrigin

停止追踪指定来源的本地事务，不影响已有历史。

**定义**:

```typescript
removeTrackedOrigin(origin: unknown): void
```

**返回**: `void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `origin` | unknown | - |

### observe

订阅历史新增、合并、撤销、重做和清空，返回取消订阅函数；回调中可读取 canUndo / canRedo。

**定义**:

```typescript
observe(callback: () => void): () => void
```

**返回**: `() => void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `callback` | () => void | - |

### destroy

停止追踪并释放监听器；销毁所属 Y.Doc 时也会自动释放。

**定义**:

```typescript
destroy(): void
```

**返回**: `void`