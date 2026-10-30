# VBI.dashboard

VBI 实例上的仪表盘命名空间，负责创建 Dashboard Builder 和空 dashboard DSL。

## 方法

### create

使用 dashboard DSL 创建 VBIDashboardBuilder。

**定义**:

```typescript
create(dashboard: VBIDashboardDSLInput, builderOptions?: VBIDashboardBuilderOptions<TQueryDSL, TSeedDSL>): VBIDashboardBuilder<TQueryDSL, TSeedDSL>
```

**返回**: `VBIDashboardBuilder<TQueryDSL, TSeedDSL>`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `dashboard` | VBIDashboardDSLInput | - |
| `builderOptions?` | VBIDashboardBuilderOptions&lt;TQueryDSL, TSeedDSL> | - |

### createEmpty

创建一个空 dashboard DSL。

**定义**:

```typescript
createEmpty(uuid?: string): VBIDashboardDSL
```

**返回**: `VBIDashboardDSL`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `uuid?` | string | - |