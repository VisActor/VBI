# 06 · 两期比较与分组对齐

状态：待评审；API 草案，未实现。基线：`03aa5a8bf3`。

## 解决什么

经营模板手动查询两期、对齐分组、补齐新增/消失组，再计算差额、变化率和贡献。日期偏移与缺失补零规则混在 UI 内。

## 收益计算

- 实测：[经营模板](../../../skills/visactor-dashboard/scenarios/light-dashboard/templates/template-business-overview.html) comparison L6300–6308、pointChange L6319–6324、分组对齐 L6644–6657：**29 行 / 1,521 B**。
- 声明与结果展示预计保留 10–18 行：净删 `29 − (10…18) = 11…19 行`，按原段密度约 **0.6–1.0 KB，仅经营模板**。
- 未把其他三页的首尾比较算作可直接迁移；寿命的配对国家口径并不等价于通用等长前期。
- 口径：源码含空行/注释；估算不含库代码；日期配置的新旧改写尚未计入，与 [05](05-metric-definition.md)、[07](07-analysis-session.md) 不累加。

## API 如何变化

| 库     | 草案                                                                                   |
| ------ | -------------------------------------------------------------------------------------- |
| VBI    | Metric DSL 新增可选 comparison；新增 `metric.comparison.set()` 和 `metric.compare()`。 |
| VQuery | 不变，执行两期已有聚合；VBI 对聚合结果按明确业务键对齐。                               |
| VSeed  | 不变，接收对齐后的数据。                                                               |

```ts
metric.comparison.set({
  periodField: 'order_date',
  baseline: 'previousPeriod',
  timeZone: 'UTC',
  missingGroup: 'null',
})
const result = await metric.compare({
  scope,
  currentPeriod: { type: 'range', start: '2026-09-23', end: '2026-09-30', bounds: '[)' },
  groupBy: ['region', 'customer_type'],
  signal,
})
// { current, baseline, delta, rate, groups: [{ key, current, baseline, delta, contribution }] }
```

comparison 策略入指标 DSL；当前期间作为输入，需要恢复时由筛选 DSL 保存。scope 表示两期共同的业务范围，期间条件分别加入；检测到相冲突的期间约束时报错，不静默删业务条件。

## 代价与取舍

- 成本中高，依赖 [05](05-metric-definition.md)：时区、半开边界、月末及组键类型均成为公开合同。
- `delta = current − baseline`，`rate = delta / abs(baseline)`（0.1 表示 10%）；零基期、零净增量的 rate/contribution 返回 null。百分比指标的 delta 单位为百分点。
- missingGroup 支持 null/zero；补零只允许明确可加总的指标，平均值/比率不得自动补零。贡献可超过 100%，文案由宿主说明。

**建议：后置。当前单页字节收益有限，至少有第二个真实比较场景再优先投入；配对样本分析另行设计。**

验收：两期粒度一致；新增/消失组正确；负数、零基期和时间边界均有确定结果。
