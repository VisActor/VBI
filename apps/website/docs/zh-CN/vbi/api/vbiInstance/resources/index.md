# VBI.resources

VBI 实例上的资源命名空间，用于注册可被 dashboard 引用的共享资源。

## 属性

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| **chart** | `VBIChartResourceNamespace` | 图表资源管理 API。 |
| **insight** | `VBIInsightResourceNamespace` | Insight 资源管理 API。 |


## 方法

### register

批量注册图表和 insight 资源。

**定义**:

```typescript
register(resources: VBIResourceRegisterInput): VBIResourceRegisterResult
```

**返回**: `VBIResourceRegisterResult`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `resources` | VBIResourceRegisterInput | - |

### clear

清空当前 VBI 实例的所有图表和 insight 资源。

**定义**:

```typescript
clear(): void
```

**返回**: `void`

### snapshot

导出当前 VBI 实例可引用资源的 DSL 快照。

**定义**:

```typescript
snapshot(): VBIResourceSnapshot
```

**返回**: `VBIResourceSnapshot`