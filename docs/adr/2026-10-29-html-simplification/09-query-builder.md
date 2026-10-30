# 09 · 有状态的 QueryBuilder 与 VBIQueryDSL

状态：已实现，待 review。接口基线：`bc8d2ed65a`；统计能力见 [03](03-column-profile.md)。

## 决策与 API

新增 VBIQueryDSL 保存可编辑的查询定义，QueryBuilder 将其绑定到 Yjs，提供撤销重做、协同、保存恢复、执行与统计。VBI 用户无需创建图表或直接调用 VQuery。

VBIQueryDSL 是查询编辑状态；编译后的 VQueryDSL 仍是既有执行协议。profiling 继续通过 Builder 方法获取，不为每种统计新增 DSL。

```ts
const query = vbi.query.create(vbi.query.createEmpty(connectorId))
query.doc.transact(() => {
  query.dimensions.add('region', (node) => node.setAlias('地区'))
  query.measures.add('sales', (node) => node.setAggregate({ func: 'sum' }))
})

const saved = query.build() // VBIQueryDSL，可保存为 JSON
const executable = query.buildVQuery() // VQueryDSL，只编译
const result = await query.query({ signal }) // 既有 VBIQueryResult
const stats = await query.queryProfile({ topK: 3, signal })
const bins = await query.queryBins({ columns: [measureId], maxBins: 12, signal })
query.undoManager.undo() // 一次撤销上述事务
query.undoManager.redo()

const restored = vbi.query.create(saved) // 独立恢复查询状态
```

字段、筛选、排序、limit 与 queryMode 沿用 Chart 的领域术语，通过对应 Builder 编辑。queryProfile 的选列、分箱、topK、缺失规则仍为调用选项；query/queryProfile/queryBins 不修改查询状态或撤销历史，分别调用分别执行，不隐式缓存。

## DSL 如何变化

| VBIQueryDSL 字段           | 含义                                                                                           |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| uuid、connectorId、version | 查询身份、数据连接引用、DSL 格式版本；连接器实例与凭据不保存。                                 |
| dimensions、measures       | 有序的查询字段；保留稳定 id、field、alias、aggregate、sort，不含 encoding、format 或展示分组。 |
| whereFilter、havingFilter  | 复用带稳定节点 ID 的筛选树，保留相对日期等语义条件。                                           |
| queryMode、limit           | aggregate/detail 与结果上限；缺省模式沿用 aggregate。                                          |

QueryBuilder 不含 chartType、theme、locale 或实例；独立查询可使用 detail，该模式下非空 HAVING 仍报不支持。输出列沿用字段 ID，alias 作为显示名称；不自动增加 DISTINCT 或隐藏行键。相对日期在每次编译时解析，不将绝对日期反写 DSL。VQueryDSL 通过 from 显式表达 SQL 子查询，统计执行见 03；VSeed 本次不变。

## Yjs、撤销与保存恢复

- `create(VBIQueryDSL | Y.Doc)`：JSON 创建独立文档，已有 Y.Doc 直接绑定同一个查询根节点。字段和筛选以嵌套 Y.Map/Y.Array 保存，不能整份 JSON 覆盖来模拟协同。
- 复用 Chart 的 doc/dsl、observeDeep/unobserveDeep、undoManager、encodeStateAsUpdate/applyUpdate 约定。每个本地事务一步，doc.transact 可合并操作；初始化及远端更新不进入本地撤销栈。
- build() 导出 JSON 快照；Yjs Update 用于保存/同步同一协作文档。协同恢复先把 Update 应用到空 Y.Doc，再绑定 Builder；不能各端从相同 JSON 重建节点后合并。JSON/Update 不保存当前会话的本地 Undo 栈。
- query/queryProfile/queryBins 固定调用时的查询快照；编辑、撤销或远端更新影响下一次调用，不自动重查。结果、统计 DTO、请求状态与 signal 不进入 Yjs；统计参数暂为调用选项。
- 宿主提供同步传输与 Connector 解析；宿主取消自身订阅并销毁查询文档，不关闭共享 Connector。纯查询入口 `@visactor/vbi/query` 导出同一能力，其类型/Schema 不运行时导入 VSeed；不承诺减少 npm 安装体积。

## ChartBuilder 如何复用

```text
QueryBuilder → VBIQueryDSL ────────────┐
ChartBuilder → 原 Chart DSL → 查询快照 ┴→ 共享编译/执行/统计内核 → 结果
Chart 配置 + 结果 ─────────────────────→ seed adapter → VSeed DSL
```

QueryBuilderBase 管理字段、where/having、查询模式、schema 发现与 Yjs 生命周期；VBIQueryBuilder 和 VBIChartBuilder 均从它派生。查询特性、类型和编译器归 query-builder，禁止反向引用 chart-builder。Chart 层补充编码、格式与图形校验。ChartBuilder 仍以原 Chart DSL/Y.Map 为唯一编辑状态；执行时投影查询快照，保留字段 ID 与顺序，不嵌入或同步第二份 QueryBuilder，也不迁移为嵌套 query 字段。

QueryBuilder 的 buildVQuery/query adapter context 使用查询状态、编译结果与调用选项，不依赖 ChartBuilder 或 TSeedDSL。统计为基座操作，组合通用 Query DSL 并通过 Connector 查询，无专用 profile adapter。执行合同见 03。

## 旧接口兼容

- 原 chart.query()/buildVQuery()/buildVSeed() 与扁平 Chart DSL 保持；旧 JSON/Yjs 文档无需迁移。Chart 的 detail/table 限制、字段 ID、相对日期语义及保存恢复保持。
- 旧 buildVQuery/query/buildVSeed adapter 保留签名、context、顺序与查询次数。普通 query/buildVSeed 继续使用自定义 Chart adapter；SQL 统计要求 buildVQuery 输出标准 VQueryDSL，通过 Connector 执行，不调用自定义原始取数 hook。
- 默认 buildVSeed 仍只查询一次；本次不接入概况呈现。自定义 seed adapter 不被预先取数；查询 Builder 不关闭宿主的共享 Connector。

## 代价与验收

成本中高：新增查询 Schema/Builder/Yjs 生命周期，并从图形字段模型抽取查询能力；共享编译器须保持旧语义。统计/呈现扩展归 03。单独不承诺 HTML 字节收益，也不重复计算 03 的收益。

**建议：以 VBIQueryDSL + Yjs 承载查询编辑状态，以 Builder 方法提供执行与统计；首版不增加共享 queryId、资源注册或缓存系统。**

验收：JSON 保存恢复一致；双端并发编辑收敛，撤销仅作用于本地事务且可 redo；执行/统计不写入 Yjs；编译后的 DSL 可独立执行；两种 Builder 同等查询结果一致；纯查询不加载 VSeed；旧 Chart 文档、自定义 adapter 与查询次数回归通过。
