# 05 · VBI 指标定义与计算

状态：待评审；API 草案，未实现。基线：`03aa5a8bf3`。

## 解决什么

利润率、客单价、事件占比在主页、悬停和分析入口重复计算；分母、聚合顺序和缺失规则容易不一致。现有 Measure 主要表达单字段聚合，缺少可复用的派生指标定义。

## 收益计算

- 实测：[经营 deriveMetrics](../../../skills/visactor-dashboard/scenarios/light-dashboard/templates/template-business-overview.html) L6310–6318，加上[心衰](../../../skills/visactor-dashboard/scenarios/light-dashboard/templates/template-heart-failure.html) L6194–6206、[寿命](../../../skills/visactor-dashboard/scenarios/light-dashboard/templates/template-life-expectancy.html) L6219–6242、[餐食](../../../skills/visactor-dashboard/scenarios/light-dashboard/templates/template-meal-workout.html) L6231–6253 的 metrics，共 **69 行 / 2,419 B**。
- 这些函数含文案、环图和视图数据，估计只有 25–40 行纯公式可替换；独立指标声明预计增加 50–90 行。
- 保守净变化：`(50…90) − (25…40) = 增加 10…65 行`，按原段密度约 **增加 0.4–2.3 KB/四份合计**；复用现有度量定义后需重测。
- 口径：UTF-8 源码含空行/注释，只计四份源 HTML，不含库代码；不把 [07](07-analysis-session.md) 的收益计入本案。

## API 如何变化

| 库     | 草案                                                                                                    |
| ------ | ------------------------------------------------------------------------------------------------------- |
| VBI    | 新增 `VBIMetricDSL`、`vbi.metric.create()`、Metric Builder 的 `evaluate()`；资源注册/快照支持 metrics。 |
| VQuery | 不变，执行已有基础聚合；派生公式在 VBI 对聚合结果求值。                                                 |
| VSeed  | 不变，使用计算后的值和已有数字格式。                                                                    |

```ts
const metric = vbi.metric.create({
  uuid: 'margin',
  connectorId: 'orders',
  inputs: {
    profit: { field: 'profit', aggregate: { func: 'sum' } },
    sales: { field: 'sales', aggregate: { func: 'sum' } },
  },
  formula: { op: 'ratio', numerator: 'profit', denominator: 'sales', factor: 100, denominatorPolicy: 'positive' },
})
const result = await metric.evaluate({ scope, signal }) // { value, inputs, reason? }
```

inputs 复用现有 Measure 的字段/聚合类型，省略可视编码。首版 formula 仅支持引用值与比率；先聚合再计算，非法分母返回 null 及原因。指标定义入 DSL；scope 复用 VBIWhereGroup，业务文案和任意 JS 回调留在宿主。

## 代价与取舍

- 成本中高：新增资源种类、公式校验、引用和保存恢复；原 Chart/Measure DSL 保持。
- 不能把平均比例当作总比例，也不能把分组去重计数直接相加。求值应重用指标声明的聚合粒度。
- 当前字节收益可能为负；价值主要是口径复用，并为 [06](06-period-comparison.md)、[07](07-analysis-session.md) 提供声明。

**建议：不为缩 HTML 单独实施；确认分析会话需求后再批。若必须引入通用表达式引擎，先缩小范围。依赖 [01](01-query-execution.md)。**

验收：主页与分组分析复用同一指标；零/负/缺失分母规则明确；聚合后比率与手工核对一致。
