# CalculationsBuilder

管理查询结果上的计算列，所有修改参与 Yjs 事务。协同各端从同一初始化更新恢复，容器初始化应在分发前完成。

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

添加计算列；表达式引用基础查询的维度或度量 ID。

**定义**:

```typescript
add(expr: string, callback: (node: CalculationNodeBuilder) => void): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `expr` | string | - |
| `callback` | (node: CalculationNodeBuilder) => void | - |

### remove

删除指定 ID 的计算列。

**定义**:

```typescript
remove(id: string): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | - |

### update

更新指定 ID 的计算列。

**定义**:

```typescript
update(id: string, callback: (node: CalculationNodeBuilder) => void): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | - |
| `callback` | (node: CalculationNodeBuilder) => void | - |

### find

按条件查找第一个计算列。

**定义**:

```typescript
find(predicate: (node: CalculationNodeBuilder, index: number) => boolean): CalculationNodeBuilder | undefined
```

**返回**: `CalculationNodeBuilder \| undefined`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `predicate` | (node: CalculationNodeBuilder, index: number) => boolean | - |

### findAll

获取全部计算列。

**定义**:

```typescript
findAll(): CalculationNodeBuilder[]
```

**返回**: `CalculationNodeBuilder[]`

### toJSON

导出计算列配置。

**定义**:

```typescript
toJSON(): VBICalculation[]
```

**返回**: `VBICalculation[]`