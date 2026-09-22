# DashboardThemeBuilder

仪表盘主题构建器。保存主题名称，具体样式由渲染层注册和解析。

## 方法

### constructor

**定义**:

```typescript
constructor(dsl: Y.Map<any>)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `dsl` | Y.Map<any> | - |

### observe

监听本地、撤销和协同同步引起的主题变化，返回取消监听的函数。

**定义**:

```typescript
observe(callback: ObserveCallback): () => void
```

**返回**: `() => void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `callback` | ObserveCallback | - 主题变化回调 |

### setTheme

设置主题名称，支持 light、dark 或已注册的自定义主题，不修改引用的图表资源。

**定义**:

```typescript
setTheme(theme: string): void
```

**返回**: `void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `theme` | string | - 非空主题名称 |

### getTheme

获取主题名称，默认 light。

**定义**:

```typescript
getTheme(): string
```

**返回**: `string`

### toJSON

导出主题名称。

**定义**:

```typescript
toJSON(): string
```

**返回**: `string`