# createVBI

创建一个独立的 VBI 实例。

每个实例都有自己的资源注册表，适合在同一应用中隔离不同仪表盘或测试上下文。

## 函数签名

```typescript
function createVBI(): VBIInstance<DefaultVBIQueryDSL, DefaultVBISeedDSL>
function createVBI<TQueryDSL, TSeedDSL>(defaultBuilderOptions: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>): VBIInstance<TQueryDSL, TSeedDSL>
```

## 参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `defaultBuilderOptions` | VBIChartBuilderOptions<TQueryDSL, TSeedDSL> | 默认图表 Builder 配置，会传递给 chart 和 dashboard 中创建的图表 Builder。 |

---

# VBI

默认 VBI 实例，适合直接使用全局共享的 Builder 与资源能力。

**类型**: `VBIInstance`

**定义**:

```typescript
const VBI: VBIInstance = createVBI()
```

---

# VBIInstance

createVBI 返回的 VBI 实例，是访问 chart、insight、dashboard 等能力的统一入口。

## 属性

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| **connectors** | `VBIConnectorNamespace` | 连接器注册、获取和释放 API。 |
| **resources** | `VBIResourceNamespace` | 图表和 insight 资源注册 API，用于 dashboard 引用共享资源。 |
| **chart** | `VBIChartNamespace<TQueryDSL, TSeedDSL>` | 图表 Builder 创建 API。 |
| **insight** | `VBIInsightNamespace` | Insight Builder 创建 API。 |
| **dashboard** | `VBIDashboardNamespace<TQueryDSL, TSeedDSL>` | Dashboard Builder 创建 API。 |
