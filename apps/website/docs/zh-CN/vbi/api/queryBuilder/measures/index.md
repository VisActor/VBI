# QueryMeasuresBuilder

独立查询的度量集合，不包含图形编码。

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

添加一个度量

**定义**:

```typescript
add(field: string, callback: (node: QueryMeasureNodeBuilder) => void): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `field` | string | - 字段名 |
| `callback` | (node: QueryMeasureNodeBuilder) => void | - 回调函数 |

### remove

删除指定 ID 的度量

**定义**:

```typescript
remove(id: string): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | - 度量 ID |

### update

更新度量配置

**定义**:

```typescript
update(id: string, callback: (node: QueryMeasureNodeBuilder) => void): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | - 度量 ID |
| `callback` | (node: QueryMeasureNodeBuilder) => void | - 回调函数 |

### find

按回调条件查找第一个度量，行为与 Array.find 一致

**定义**:

```typescript
find(predicate: (node: QueryMeasureNodeBuilder, index: number) => boolean): QueryMeasureNodeBuilder | undefined
```

**返回**: `QueryMeasureNodeBuilder \| undefined`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `predicate` | (node: QueryMeasureNodeBuilder, index: number) => boolean | - 查找条件 |

### findAll

获取所有度量

**定义**:

```typescript
findAll(): QueryMeasureNodeBuilder[]
```

**返回**: `QueryMeasureNodeBuilder[]`

### toJSON

导出所有度量为 JSON 数组

**定义**:

```typescript
toJSON(): VBIQueryMeasure[]
```

**返回**: `VBIQueryMeasure[]`

### observe

监听度量变化，返回取消监听的函数

**定义**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**返回**: `() => void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - 回调函数 |