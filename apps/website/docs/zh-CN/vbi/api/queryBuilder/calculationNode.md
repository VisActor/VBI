# CalculationNodeBuilder

计算列节点构建器，配置表达式、名称和排序。

## 方法

### constructor

**定义**:

```typescript
constructor(yMap: Y.Map<any>)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `yMap` | Y.Map&lt;any> | - |

### getId

获取计算列 ID。

**定义**:

```typescript
getId(): string
```

**返回**: `string`

### getExpression

获取局部 SQL 表达式。

**定义**:

```typescript
getExpression(): string
```

**返回**: `string`

### setAlias

设置显示名称。

**定义**:

```typescript
setAlias(alias: string): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `alias` | string | - |

### setExpression

设置数值 SQL 表达式及绑定参数；省略参数时清除旧参数。

**定义**:

```typescript
setExpression(expr: string, parameters?: (number | null)[]): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `expr` | string | - |
| `parameters?` | (number \| null)[] | - |

### getSort

获取排序配置。

**定义**:

```typescript
getSort(): VBISort | undefined
```

**返回**: `VBISort \| undefined`

### setSort

设置排序配置。

**定义**:

```typescript
setSort(sort: VBISort): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `sort` | VBISort | - |

### clearSort

清除排序配置。

**定义**:

```typescript
clearSort(): this
```

**返回**: `this`

### toJSON

导出计算列配置。

**定义**:

```typescript
toJSON(): VBICalculation
```

**返回**: `VBICalculation`