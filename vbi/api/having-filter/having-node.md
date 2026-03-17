# HavingFilterNodeBuilder

Having 过滤节点构建器，用于配置单个 Having 过滤条件

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

### getOperator

获取过滤操作符

**定义**:

```typescript
getOperator(): string | undefined
```

**返回**: `string \| undefined`

### getAggregate

获取聚合配置

**定义**:

```typescript
getAggregate(): VBIHavingAggregate | undefined
```

**返回**: `VBIHavingAggregate \| undefined`

### setValue

设置过滤条件的值

**定义**:

```typescript
setValue(value: unknown): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | unknown | - 过滤值 |

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

### setAggregate

设置聚合配置

**定义**:

```typescript
setAggregate(aggregate: VBIHavingAggregate): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aggregate` | VBIHavingAggregate | - 聚合配置 |

### toJSON

导出为 JSON

**定义**:

```typescript
toJSON(): VBIHavingFilter
```

**返回**: `VBIHavingFilter`
