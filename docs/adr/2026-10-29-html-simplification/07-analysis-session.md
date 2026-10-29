# 07 · 无 UI 的分析会话与查询批次

状态：待评审；API 草案，未实现。基线：`03aa5a8bf3`。

## 解决什么

分析弹窗自己组织入口范围、分组选择、本期/基期、关联明细及多次查询，并防止过期结果覆盖。确认后的分析状态无法独立于 DOM 保存恢复。

## 收益计算

- 实测：[analysis.js](../../../skills/visactor-dashboard/scenarios/light-dashboard/assets/analysis.js) refresh L605–874 与范围方法 L875–935，共 **331 行 / 16,683 B/份**；四份候选上限 **1,324 行 / 66,732 B**。
- 其中 UI 提交/文案/绘制继续保留。估计领域部分 100–150 行可替换，新会话声明及调用 30–50 行，净删 **50–120 行/份**。
- 按原段密度约净省 **2.5–6.0 KB/份，合计 10–24 KB**。这包含前置能力的收益，不能与 01–06 相加；完成前置后必须重测增量。
- 口径：UTF-8 源码含空行/注释，只计四份源 HTML；估算不含库实现，也未把整份页面 context 声明算作可删代码。

## API 如何变化

| 库     | 草案                                                                                                          |
| ------ | ------------------------------------------------------------------------------------------------------------- |
| VBI    | 新增 `VBIAnalysisDSL`、`vbi.analysis.create()`、分组/选择 Builder、`evaluate()`；资源注册/快照支持 analyses。 |
| VQuery | 不新增公共 API，复用查询与可选列概况。                                                                        |
| VSeed  | 不变，消费会话结果；实例、弹窗与渲染队列仍归 UI。                                                             |

```ts
const analysis = vbi.analysis.create({
  uuid: 'margin-detail',
  metricId: 'margin',
  dashboardId,
  chartId: salesId,
  baseScope,
  dimensions: ['region', 'customer_type'],
  detail: { queryMode: 'detail', fields: ['order_id', 'sales'] },
})
analysis.groupBy.setFields(['region'])
analysis.selection.setValues([{ field: 'region', value: '华东' }])
const result = await analysis.evaluate({ signal })
// { batchId, scope, summary, groups, comparison?, selection, details }
```

定义、分组及已确认选择入 DSL；选择保存字段和原始类型值，不用显示标签拼键。chartId 明确入口图表，继承它在 Dashboard 内的有效范围，再叠加 baseScope。evaluate 固定一份配置、按所需结果组织查询；新批次取代旧批次，过期调用以 AbortError 结束。缓存、计数器、AbortController 和悬停预览不入 DSL。

## 代价与取舍

- 成本高：依赖 [01](01-query-execution.md)、[02](02-record-view.md)、[04](04-filter-bindings.md)、[05](05-metric-definition.md)；启用比较再依赖 [06](06-period-comparison.md)。首版为同一 Connector、默认适配链，外部 adapter 显式检查能力；跨源字段映射留给宿主。
- 同一配置快照不等于数据库事务快照；底层无法中断时丢弃返回。UI 的异步 renderQueue 和 DOM 提交校验仍保留。
- 销毁会话文档须取消执行；恢复 DSL 后能重新 evaluate。旧资源快照缺少 analyses 时保持原行为。

**建议：最后评审实施。先证明前置能力确实删代码，再决定是否承担新的分析状态模型。**

验收：切换分组、连续筛选、关闭/重开无旧结果覆盖；恢复后查询范围一致；无 DOM 环境可完成分析。
