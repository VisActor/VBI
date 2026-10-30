# MeasuresBuilder

度量构建器，在查询字段操作上补充图形编码。

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
add(field: string, callback: (node: MeasureNodeBuilder) => void): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `field` | string | - 字段名 |
| `callback` | (node: MeasureNodeBuilder) => void | - 回调函数 |

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
update(id: string, callback: (node: MeasureNodeBuilder) => void): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | - 度量 ID |
| `callback` | (node: MeasureNodeBuilder) => void | - 回调函数 |

### find

按回调条件查找第一个度量，行为与 Array.find 一致

**定义**:

```typescript
find(predicate: (node: MeasureNodeBuilder, index: number) => boolean): MeasureNodeBuilder | undefined
```

**返回**: `MeasureNodeBuilder \| undefined`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `predicate` | (node: MeasureNodeBuilder, index: number) => boolean | - 查找条件 |

### findAll

获取所有度量

**定义**:

```typescript
findAll(): MeasureNodeBuilder[]
```

**返回**: `MeasureNodeBuilder[]`

### toJSON

导出所有度量为 JSON 数组

**定义**:

```typescript
toJSON(): VBIMeasure[]
```

**返回**: `VBIMeasure[]`

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

### static isMeasureNode

**定义**:

```typescript
static isMeasureNode(node: VBIMeasureTree[0]): node is VBIMeasure
```

**返回**: `node is VBIMeasure`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `node` | VBIMeasureTree[0] | - |

### static isMeasureGroup

**定义**:

```typescript
static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup
```

**返回**: `node is VBIMeasureGroup`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `node` | VBIMeasureTree[0] | - |