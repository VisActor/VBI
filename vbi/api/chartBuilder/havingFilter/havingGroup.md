# HavingGroupBuilder

Having 分组构建器，用于配置一组条件的逻辑关系（AND/OR）

## 属性

## 方法

### constructor

**定义**:

```typescript
constructor(yMap: Y.Map<any>)
```

**参数**:

| 参数     | 类型         | 说明 |
| ------ | ---------- | -- |
| `yMap` | Y.Map<any> | -  |

### getConditions

**定义**:

```typescript
getConditions(): Y.Array<any>
```

**返回**: `Y.Array<any>`

### getId

获取分组 ID

**定义**:

```typescript
getId(): string
```

**返回**: `string`

### getOperator

获取逻辑操作符

**定义**:

```typescript
getOperator(): 'and' | 'or'
```

**返回**: `'and' \| 'or'`

### setOperator

设置逻辑操作符

**定义**:

```typescript
setOperator(op: 'and' | 'or'): this
```

**返回**: `this`

**参数**:

| 参数   | 类型            | 说明      |
| ---- | ------------- | ------- |
| `op` | 'and' \| 'or' | - 逻辑操作符 |

### add

添加一个 Having 过滤条件到分组

**定义**:

```typescript
add(field: string, callback: (node: HavingFilterNodeBuilder) => void): this
```

**返回**: `this`

**参数**:

| 参数         | 类型                                      | 说明     |
| ---------- | --------------------------------------- | ------ |
| `field`    | string                                  | - 字段名  |
| `callback` | (node: HavingFilterNodeBuilder) => void | - 回调函数 |

### addGroup

添加一个嵌套分组到当前分组

**定义**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: HavingGroupBuilder) => void): this
```

**返回**: `this`

**参数**:

| 参数         | 类型                                  | 说明      |
| ---------- | ----------------------------------- | ------- |
| `op`       | 'and' \| 'or'                       | - 逻辑操作符 |
| `callback` | (group: HavingGroupBuilder) => void | - 回调函数  |

### remove

删除指定 ID 的条件或指定索引的项

**定义**:

```typescript
remove(idOrIndex: string | number): this
```

**返回**: `this`

**参数**:

| 参数          | 类型               | 说明       |
| ----------- | ---------------- | -------- |
| `idOrIndex` | string \| number | - ID 或索引 |

### clear

清空分组内所有条件

**定义**:

```typescript
clear(): this
```

**返回**: `this`

### toJSON

导出为 JSON

**定义**:

```typescript
toJSON(): VBIHavingGroup
```

**返回**: `VBIHavingGroup`
