# LocaleBuilder

语言构建器，用于设置和获取当前语言

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

监听语言变化，返回取消监听的函数

**定义**:

```typescript
observe(callback: ObserveCallback): () => void
```

**返回**: `() => void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `callback` | ObserveCallback | - 回调函数 |

### setLocale

设置语言

**定义**:

```typescript
setLocale(locale: string)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `locale` | string | - 语言名称 |

### getLocale

获取当前语言

**定义**:

```typescript
getLocale(): string
```

**返回**: `string`

### toJSON

导出为 JSON

**定义**:

```typescript
toJSON(): string
```

**返回**: `string`