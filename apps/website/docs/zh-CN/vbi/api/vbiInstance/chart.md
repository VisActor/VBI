# VBI.chart

VBI 实例上的图表命名空间，负责创建图表 Builder 和空图表 DSL。

## 方法

### create

使用图表 DSL 创建 VBIChartBuilder。

**定义**:

```typescript
create(vbi: VBIChartDSLInput, builderOptions?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>): VBIChartBuilder<TQueryDSL, TSeedDSL>
```

**返回**: `VBIChartBuilder<TQueryDSL, TSeedDSL>`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `vbi` | VBIChartDSLInput | - |
| `builderOptions?` | VBIChartBuilderOptions&lt;TQueryDSL, TSeedDSL> | - |

### createEmpty

创建一个最小可用的图表 DSL。

**定义**:

```typescript
createEmpty(connectorId: VBIConnectorId, uuid?: string): VBIChartDSL
```

**返回**: `VBIChartDSL`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `connectorId` | VBIConnectorId | - |
| `uuid?` | string | - |