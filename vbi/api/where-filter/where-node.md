# WhereNodeBuilder

Where 过滤节点构建器，用于配置单个 Where 过滤条件

## 方法

### constructor

**定义**:

```typescript
constructor(yMap: Y.Map<any>)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `yMap` | Y.Map<any> | - |

### getId

获取节点 ID

**定义**:

```typescript
getId(): string
```

**返回**: `string`

### getField

获取字段名

**定义**:

```typescript
getField(): string
```

**返回**: `string`

### setField

设置字段名

**定义**:

```typescript
setField(field: string): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `field` | string | - 字段名 |

### getOperator

获取过滤操作符

**定义**:

```typescript
getOperator(): string | undefined
```

**返回**: `string \| undefined`

### setOperator

设置过滤操作符

**定义**:

```typescript
setOperator(operator: string): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `operator` | string | - 操作符 |

### setValue

设置过滤值

**定义**:

```typescript
setValue(value: unknown): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | unknown | - 过滤值 |

### setDate

设置日期过滤条件

**定义**:

```typescript
setDate(predicate: VBIWhereDatePredicate): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `predicate` | VBIWhereDatePredicate | - 日期谓词 |

### getDate

获取日期过滤条件，非日期过滤返回 undefined

**定义**:

```typescript
getDate(): VBIWhereDatePredicate | undefined
```

**返回**: `VBIWhereDatePredicate \| undefined`

### toJSON

导出为 JSON

**定义**:

```typescript
toJSON(): VBIWhereFilter
```

**返回**: `VBIWhereFilter`
