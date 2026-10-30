# QueryDimensionsBuilder

独立查询的维度集合，不包含图形编码。

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
| `dsl` | Y.Map&lt;any> | - |

### add

添加一个维度

**定义**:

```typescript
add(field: string, callback: (node: QueryDimensionNodeBuilder) => void): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `field` | string | - 字段名 |
| `callback` | (node: QueryDimensionNodeBuilder) => void | - 回调函数 |

### remove

删除指定 ID 的维度

**定义**:

```typescript
remove(id: string): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | - 维度 ID |

### update

更新指定维度 ID 的配置

**定义**:

```typescript
update(id: string, callback: (node: QueryDimensionNodeBuilder) => void): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | - 维度 ID |
| `callback` | (node: QueryDimensionNodeBuilder) => void | - 回调函数 |

### find

按回调条件查找第一个维度，行为与 Array.find 一致

**定义**:

```typescript
find(predicate: (node: QueryDimensionNodeBuilder, index: number) => boolean): QueryDimensionNodeBuilder | undefined
```

**返回**: `QueryDimensionNodeBuilder \| undefined`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `predicate` | (node: QueryDimensionNodeBuilder, index: number) => boolean | - 查找条件 |

### findAll

获取所有维度

**定义**:

```typescript
findAll(): QueryDimensionNodeBuilder[]
```

**返回**: `QueryDimensionNodeBuilder[]`

### toJSON

导出所有维度为 JSON 数组

**定义**:

```typescript
toJSON(): VBIQueryDimension[]
```

**返回**: `VBIQueryDimension[]`

### observe

监听维度变化，返回取消监听的函数

**定义**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**返回**: `() => void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - 回调函数 |