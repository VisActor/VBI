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
setEncoding(encoding: VBIMeasure['encoding']): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `encoding` | VBIMeasure\['encoding'] | - 编码位置（yAxis/xAxis/color/size） |

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

### toJSON

导出为 JSON

**定义**:

```typescript
toJSON(): VBIMeasure
```

**返回**: `VBIMeasure`
