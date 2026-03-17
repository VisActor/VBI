# dimensions

维度构建器，用于添加、修改、删除维度配置。维度是数据的分类字段，如：时间、地区、产品类别

## 属性

## 方法

### constructor

**定义**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### add

添加一个维度

**定义**:

```typescript
add(field: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**返回**: `DimensionsBuilder`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `field` | string | - 字段名 |
| `callback` | (node: DimensionNodeBuilder) => void | - 回调函数 |

### remove

删除指定 ID 的维度

**定义**:

```typescript
remove(id: string): DimensionsBuilder
```

**返回**: `DimensionsBuilder`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | - 维度 ID |

### update

更新指定维度 ID 的配置

**定义**:

```typescript
update(id: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**返回**: `DimensionsBuilder`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | - 维度 ID |
| `callback` | (node: DimensionNodeBuilder) => void | - 回调函数 |

### find

按回调条件查找第一个维度，行为与 Array.find 一致

**定义**:

```typescript
find(predicate: (node: DimensionNodeBuilder, index: number) => boolean): DimensionNodeBuilder | undefined
```

**返回**: `DimensionNodeBuilder \| undefined`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `predicate` | (node: DimensionNodeBuilder, index: number) => boolean | - 查找条件 |

### findAll

获取所有维度

**定义**:

```typescript
findAll(): DimensionNodeBuilder[]
```

**返回**: `DimensionNodeBuilder[]`

### toJSON

导出所有维度为 JSON 数组

**定义**:

```typescript
toJSON(): VBIDimension[]
```

**返回**: `VBIDimension[]`

### observe

监听维度变化，返回取消监听的函数

**定义**:

```typescript
observe(callback: ObserveCallback): () => void
```

**返回**: `() => void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `callback` | ObserveCallback | - 回调函数 |

### static isDimensionNode

**定义**:

```typescript
static isDimensionNode(node: VBIDimensionTree[0]): node is VBIDimension
```

**返回**: `node is VBIDimension`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `node` | VBIDimensionTree\[0] | - |

### static isDimensionGroup

**定义**:

```typescript
static isDimensionGroup(node: VBIDimensionTree[0]): node is VBIDimensionGroup
```

**返回**: `node is VBIDimensionGroup`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `node` | VBIDimensionTree\[0] | - |
