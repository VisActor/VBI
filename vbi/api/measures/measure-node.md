# MeasureNodeBuilder

度量节点构建器，用于配置单个度量

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

### getEncoding

获取图表编码位置

**定义**:

```typescript
getEncoding(): VBIMeasure['encoding'] | undefined
```

**返回**: `VBIMeasure['encoding'] \| undefined`

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

### setEncoding

设置图表编码位置

**定义**:

```typescript
setEncoding(encoding: NonNullable<VBIMeasure['encoding']>): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `encoding` | NonNullable\<VBIMeasure\['encoding']> | - 指标编码位置 |

### setAggregate

设置聚合函数

**定义**:

```typescript
setAggregate(aggregate: VBIMeasure['aggregate']): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aggregate` | VBIMeasure\['aggregate'] | - 聚合配置 |

### setFormat

设置数值格式

**定义**:

```typescript
setFormat(format: VBIMeasureFormat): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `format` | VBIMeasureFormat | - 格式配置 |

### getFormat

获取数值格式

**定义**:

```typescript
getFormat(): VBIMeasureFormat | undefined
```

**返回**: `VBIMeasureFormat \| undefined`

### clearFormat

清除数值格式配置

**定义**:

```typescript
clearFormat(): this
```

**返回**: `this`

### toJSON

导出为 JSON

**定义**:

```typescript
toJSON(): VBIMeasure
```

**返回**: `VBIMeasure`
