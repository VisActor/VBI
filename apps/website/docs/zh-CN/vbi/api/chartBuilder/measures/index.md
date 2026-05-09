# MeasuresBuilder

度量构建器，用于添加、修改、删除度量配置。度量是数据的数值字段，如：销售额、利润、数量

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
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### add

添加一个度量

**定义**:

```typescript
add(field: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**返回**: `MeasuresBuilder`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `field` | string | - 字段名 |
| `callback` | (node: MeasureNodeBuilder) => void | - 回调函数 |

### remove

删除指定 ID 的度量

**定义**:

```typescript
remove(id: string): MeasuresBuilder
```

**返回**: `MeasuresBuilder`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | - 度量 ID |

### update

更新度量配置

**定义**:

```typescript
update(id: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**返回**: `MeasuresBuilder`

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

监听度量变化

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
| `node` | `VBIMeasureTree[0]` | - |

### static isMeasureGroup

**定义**:

```typescript
static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup
```

**返回**: `node is VBIMeasureGroup`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `node` | `VBIMeasureTree[0]` | - |