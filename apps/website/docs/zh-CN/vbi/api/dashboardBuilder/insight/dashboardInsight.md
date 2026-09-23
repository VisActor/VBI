# DashboardInsightBuilder

## 方法

### constructor

**定义**:

```typescript
constructor(widget: Y.Map<any>, options?: DashboardInsightBuilderOptions)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `widget` | Y.Map<any> | - |
| `options?` = {} | DashboardInsightBuilderOptions | - |

### getId

获取仪表盘组件 ID。

**定义**:

```typescript
getId(): string
```

**返回**: `string`

### getBuilder

解析组件引用的资源构建器；其文档与撤销历史独立于仪表盘。

**定义**:

```typescript
getBuilder(): VBIInsightBuilder | undefined
```

**返回**: `VBIInsightBuilder \| undefined`

### setTitle

设置组件标题，修改由所属仪表盘的 undoManager 追踪。

**定义**:

```typescript
setTitle(title: string): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `title` | string | - |

### setDescription

设置组件描述。

**定义**:

```typescript
setDescription(description: string): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `description` | string | - |

### setInsightId

设置引用的洞察资源或 UUID，不复制或修改资源内容。

**定义**:

```typescript
setInsightId(insight: ResourceReference): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `insight` | ResourceReference | - |

### setLayouts

设置本次 add / update 回调提交的断点布局；在 collection 回调外调用不会写入仪表盘。

**定义**:

```typescript
setLayouts(layouts: DashboardWidgetLayouts): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `layouts` | DashboardWidgetLayouts | - |

### toJSON

导出组件的纯 JSON 配置。

**定义**:

```typescript
toJSON(): VBIDashboardWidget
```

**返回**: `VBIDashboardWidget`