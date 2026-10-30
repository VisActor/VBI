# MeasureNodeBuilder

度量节点构建器，在查询配置上补充图形配置。

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

### getSort

获取排序配置

**定义**:

```typescript
getSort(): VBISort | undefined
```

**返回**: `VBISort \| undefined`

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

### setSort

设置排序配置

**定义**:

```typescript
setSort(sort: VBISort): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `sort` | VBISort | - 排序配置 |

### setAggregate

设置聚合函数

**定义**:

```typescript
setAggregate(aggregate: VBIQueryMeasure['aggregate']): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `aggregate` | VBIQueryMeasure['aggregate'] | - 聚合配置 |

### clearSort

清除排序配置

**定义**:

```typescript
clearSort(): this
```

**返回**: `this`

### toJSON

导出为 JSON

**定义**:

```typescript
toJSON(): VBIMeasure
```

**返回**: `VBIMeasure`

### getEncoding

获取图表编码位置

**定义**:

```typescript
getEncoding(): VBIMeasure['encoding'] | undefined
```

**返回**: `VBIMeasure['encoding'] \| undefined`

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
| `encoding` | NonNullable&lt;VBIMeasure['encoding']> | - 指标编码位置 |

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