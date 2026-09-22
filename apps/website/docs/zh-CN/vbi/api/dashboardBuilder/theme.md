# DashboardThemeBuilder

仪表盘主题构建器。统一管理主题配置、预设、订阅与 VSeed 注册，组件只消费解析结果。

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

监听本地、撤销和协同同步引起的主题名称或配置变化，返回取消监听的函数。

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

设置主题；传入配置时在同一次变更中保存配置并选中，无需预先注册，不修改引用的图表资源。

**定义**:

```typescript
setTheme(theme: string, definition?: VBIDashboardThemeDefinition): void
```

**返回**: `void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `theme` | string | - 非空主题名称 |
| `definition?` | VBIDashboardThemeDefinition | - 可选的完整主题配置，保存于当前 Dashboard |

### registerTheme

在当前 Dashboard 中注册或更新主题配置，不切换当前主题；配置随文档保存和同步。

**定义**:

```typescript
registerTheme(theme: string, definition: VBIDashboardThemeDefinition): void
```

**返回**: `void`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `theme` | string | - 非空主题名称 |
| `definition` | VBIDashboardThemeDefinition | - 完整主题配置 |

### getThemeConfig

读取主题配置，文档配置优先于内置预设；未定义时返回 undefined，返回副本不会影响原配置。

**定义**:

```typescript
getThemeConfig(theme?: string): VBIDashboardThemeDefinition | undefined
```

**返回**: `VBIDashboardThemeDefinition \| undefined`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `theme?` = this.getTheme() | string | - 主题名称，默认当前主题 |

### getThemeDefinitions

读取文档内全部主题配置的副本，可配合 observe 订阅可选主题列表。

**定义**:

```typescript
getThemeDefinitions(): Record<string, VBIDashboardThemeDefinition>
```

**返回**: `Record<string, VBIDashboardThemeDefinition>`

### getThemeOptions

获取内置与文档主题的名称、明暗模式和色板，文档内同名配置优先。

**定义**:

```typescript
getThemeOptions(): VBIDashboardThemeOption[]
```

**返回**: `VBIDashboardThemeOption[]`

### resolveTheme

解析主题并确保 VSeed 主题可用，返回隔离的运行时名称；未知名称回退 light，不修改文档。

**定义**:

```typescript
resolveTheme(theme?: string): VBIDashboardResolvedTheme
```

**返回**: `VBIDashboardResolvedTheme`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `theme?` = this.getTheme() | string | - 主题名称，默认当前主题；可用于临时预览其他主题 |

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