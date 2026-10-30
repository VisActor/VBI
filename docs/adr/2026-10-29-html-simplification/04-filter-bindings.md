# 04 · Dashboard 公共筛选绑定

状态：待评审；API 草案，未实现。基线：`03aa5a8bf3`。

## 解决什么

四份模板用 `filterIds` 管理条件身份，再逐图新增、更新、删除。筛选作用对象、字段和恢复规则缺少统一声明。

## 收益计算

- 实测：四份源模板的 `applyFilters()` 分别为 27、22、22、22 行，共 **93 行 / 3,573 B**。
- [经营](../../../skills/visactor-dashboard/scenarios/light-dashboard/templates/template-business-overview.html) L6273–6299；[心衰](../../../skills/visactor-dashboard/scenarios/light-dashboard/templates/template-heart-failure.html) L6615–6636；[寿命](../../../skills/visactor-dashboard/scenarios/light-dashboard/templates/template-life-expectancy.html) L6646–6667；[餐食](../../../skills/visactor-dashboard/scenarios/light-dashboard/templates/template-meal-workout.html) L6682–6703。
- 绑定声明与调用估计共 48–68 行：净删 `93 − (48…68) = 25…45 行`，按原段密度约 **1.0–1.7 KB/四份合计**。
- 不把 `conditionsFor()` 的业务映射算作删除量。口径含空行/注释；估算不含库代码，与 [07](07-analysis-session.md) 不累加。

## API 如何变化

| 库     | 草案                                                                                  |
| ------ | ------------------------------------------------------------------------------------- |
| VBI    | Dashboard DSL 新增 filters；新增 `dashboard.filters` Builder 和 `dashboard.query()`。 |
| VQuery | 不变，接收组合后的 where。                                                            |
| VSeed  | 不变。                                                                                |

```ts
dashboard.filters.add({
  id: 'region',
  op: 'eq',
  enabled: false,
  bindings: [
    { chartId: salesId, field: 'region' },
    { chartId: ordersId, field: 'region' },
  ],
})
dashboard.filters.setValue('region', '华东')
const results = await dashboard.query({ chartIds: [salesId, ordersId], signal })
```

filters 保存 enabled、参数值、op 及绑定；`setValue()` 激活参数，`clearValue(id)` 停用并保留绑定，null 可作为真实条件值。执行时将公共条件与图表原有条件整体 AND 组合，保留各自内部 OR；共享 Chart 的基础 where 不被修改。单独 `chart.query()` 仍只使用图表自身条件。

## 代价与取舍

- 成本中高：新增持久状态、引用校验和 Dashboard 执行上下文；旧 DSL 缺省 filters 为空。
- 同一 Chart 被两个 Dashboard 引用时，各自筛选独立；恢复状态后应得到同样的有效查询。
- 第一版只支持固定字段/操作符绑定。年龄选项转区间、日期字段换算仍在宿主，避免再引入一套表达式语言。
- `dashboard.query()` 只组织一次请求，不承诺跨 Connector 事务快照；批次过期处理由 [07](07-analysis-session.md) 复用。

**建议：第二批。依赖 [01](01-query-execution.md)；保存恢复和跨视图正确性收益大于字节收益。**

验收：切换/清除公共条件不丢业务条件；共享 Chart 不串范围；缺失目标引用有明确错误。
