# DimensionNodeBuilder

维度节点构建器，用于配置单个维度

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

### setAlias

设置显示名称

**定义**:

```typescript
setAlias(alias: string): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `alias` | string | - 显示名称 |

### setAggregate

设置日期聚合函数

**定义**:

```typescript
setAggregate(aggregate: NonNullable<VBIDimension['aggregate']>): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aggregate` | NonNullable\<VBIDimension\['aggregate']> | - 日期聚合配置 |

### clearAggregate

清除日期聚合函数

**定义**:

```typescript
clearAggregate(): this
```

**返回**: `this`

### toJSON

导出为 JSON

**定义**:

```typescript
toJSON(): VBIDimension
```

**返回**: `VBIDimension`
