# ThemeBuilder

主题构建器，用于设置和获取当前主题

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
| `_doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### observe

监听主题变化，返回取消监听的函数

**定义**:

```typescript
observe(callback: ObserveCallback): () => void
```

**返回**: `() => void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `callback` | ObserveCallback | - 回调函数 |

### setTheme

设置主题

**定义**:

```typescript
setTheme(theme: string)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `theme` | string | - 主题名称 |

### getTheme

获取当前主题

**定义**:

```typescript
getTheme(): string
```

**返回**: `string`

### toJSON

导出为 JSON

**定义**:

```typescript
toJSON(): string
```

**返回**: `string`