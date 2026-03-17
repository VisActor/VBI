# limit

数据量限制构建器，用于设置和获取当前 limit

## 属性

## 方法

### constructor

构造函数

**定义**:

```typescript
constructor(_doc: Y.Doc, dsl: Y.Map<any>)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `_doc` | Y.Doc | - |
| `dsl` | Y.Map<any> | - |

### observe

监听 limit 变化，返回取消监听的函数

**定义**:

```typescript
observe(callback: ObserveCallback): () => void
```

**返回**: `() => void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `callback` | ObserveCallback | - 回调函数 |

### setLimit

设置 limit

**定义**:

```typescript
setLimit(limit: number)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `limit` | number | - 数据量限制 |

### getLimit

获取当前 limit

**定义**:

```typescript
getLimit(): number | undefined
```

**返回**: `number \| undefined`

### toJSON

导出为 JSON

**定义**:

```typescript
toJSON(): number | undefined
```

**返回**: `number \| undefined`
