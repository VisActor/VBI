# QueryModeBuilder

查询模式构建器。未配置时按 aggregate 查询；detail 仅用于普通表。

## 方法

### constructor

**定义**:

```typescript
constructor(dsl: Y.Map<any>)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `dsl` | Y.Map&lt;any> | - |

### setMode

设置查询模式，保留已有字段和筛选配置。

**定义**:

```typescript
setMode(mode: VBIQueryMode): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `mode` | VBIQueryMode | - |

### getMode

获取查询模式，未配置时返回 aggregate。

**定义**:

```typescript
getMode(): VBIQueryMode
```

**返回**: `VBIQueryMode`

### observe

监听查询模式变化，返回取消监听的函数。

**定义**:

```typescript
observe(callback: ObserveCallback): () => void
```

**返回**: `() => void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `callback` | ObserveCallback | - |

### toJSON

导出当前查询模式。

**定义**:

```typescript
toJSON(): VBIQueryMode
```

**返回**: `VBIQueryMode`