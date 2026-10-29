# 02 · DSL 查询模式 queryMode

状态：已实现，待 review。基线：`03aa5a8bf3`。

## 解决什么

VBI 当前按维度生成 GROUP BY，缺少明确的明细表语义。将查询粒度保存到图表 DSL，使同一图表的 query、VSeed 构建和保存恢复保持一致；明细记录无需通过额外维度来防止合并。

## 收益计算

- 原方案计入的 **272 行 / 11,372 B** 含连接、替换和释放流程，本案继续保留这些流程，原净省 **4.7–7.2 KB** 的估算作废。
- [表格适配器](../../../skills/visactor-dashboard/references/visual-query/assets/dashboard-table.js) 的两个明细 Builder 可分别声明 detail；按每处一行，四份源 HTML 新增 `2 × 4 = 8 行`，约 **0.3 KB**。
- `__row_order` 还用于默认排序和概况计数，不能据此整段删除。当前 HTML 净减少先按 **接近 0 KB** 评估，迁移后再实测；主要收益是查询语义完整和可恢复。
- 口径：UTF-8 源码含空行/注释，只计四份源 HTML，不含库实现；不与其他 ADR 累加。

## API 如何变化

| 库     | API                                                                                                               |
| ------ | ----------------------------------------------------------------------------------------------------------------- |
| VBI    | VBIChartDSL 新增可选 `queryMode: 'aggregate' \| 'detail'`，缺省等价 aggregate；新增 `chart.queryMode.setMode()`。 |
| VQuery | 公共 API 和 DSL 不变，不新增 `queryDetail()`；两种查询均通过既有 `query()` 执行。                                 |
| VSeed  | 公共 API 和 DSL 不变，接收明细数据生成表格 Spec。                                                                 |

```ts
chart.chartType.changeChartType('table')
chart.queryMode.setMode('detail')

const result = await chart.query({ signal })
const seed = await chart.buildVSeed({ signal })
// 两次独立操作；实际消费按需选择一种，不引入缓存。
```

queryMode 随 `chart.build()` 保存恢复。VBI 的 `buildVQuery()` 根据模式生成聚合或明细两种查询内容，继续使用同一种 VQueryDSL 协议；query 和 buildVSeed 读取固定的图表快照，不增加调用级 mode 参数或第二套明细方法。

## 编译与执行边界

```ts
// queryMode: 'aggregate'
const aggregateQueryDSL = {
  select: [
    { field: 'region', alias: 'regionId' },
    { field: 'sales', alias: 'salesId', aggr: { func: 'sum' } },
  ],
  groupBy: ['region'],
}

// queryMode: 'detail'
const detailQueryDSL = {
  select: [
    { field: 'region', alias: 'regionId' },
    { field: 'sales', alias: 'salesId' },
  ],
}
```

VBI 编译后的 DSL 已包含完整查询语义，统一经 `Connector.query()` 交给 VQuery 的 `query()` 执行。执行器不再根据 VBI queryMode 隐式增删聚合；同一条 DSL 的独立执行、SQL 编译和重放语义一致。

## 明细语义

- 第一版只允许普通 table 使用 detail；aggregate 保持现有行为，旧 DSL 无需迁移。
- SELECT 投影维度/度量的源字段，忽略其聚合配置，保留字段 ID；不生成 GROUP BY、聚合或 DISTINCT，相同行逐条返回。
- WHERE 保留原有语义；现有字段 ID 排序作用于本次投影的源字段值，limit 限制记录条数；非空 HAVING 明确报不支持。
- 格式与别名不改变取数；未指定完整排序时不保证记录原始顺序，也不自动增加隐藏行键。

## 代价与取舍

- 成本较小：类型/Schema、Builder、查询编译与模式校验。自定义 buildVQuery 编译器需根据 context.vbiDSL.queryMode 编译，也可包装默认编译器；query 执行器继续消费编译结果。
- 本案只负责查询粒度，复用现有数据集、Connector 与生命周期；不新增视图创建、Connector 适配或资源托管能力。
- 这是正式明细表配置；从柱图等临时钻取来源记录不纳入本案。

**决策：VBI 通过 DSL queryMode 生成两种查询内容，统一执行 query；VQuery 不新增 queryDetail。复用第一项查询入口。**

验收：两种模式生成预期 DSL；DSL 单独执行与 chart.query 结果一致；明细重复记录不合并；WHERE/源字段排序/limit 正确；query 与 buildVSeed 的数据合同一致；保存恢复保留模式；aggregate 及旧 DSL 行为不变。
