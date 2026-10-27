# 表格主题与完整结果

宿主页面通过语义 token 契约接入表格，保留自身的强调色与表面层次。色板在 CSS 中定义，Canvas 适配器负责把 CSS 颜色解析为 RGBA，VTable 配置使用适配器解析后的颜色。纯文本、数字和日期的格式仍由业务配置决定。

## 维护入口

- [dashboard-table.css](../assets/dashboard-table.css)：公共语义 token、深色覆盖、表格容器与键盘焦点。
- [dashboard-table.js](../assets/dashboard-table.js)：CSS → Canvas 颜色解析、统一 VTable 主题、模块加载、记录更新与列查询接入。

将上述资源作为样式和脚本接入宿主；交付单文件 HTML 时，把内容分别内联到 `style#dashboard-table-tokens` 与 `script#dashboard-table-runtime`。业务数据、列配置和查询由调用方提供，不需要具体场景模板或其他 package 的源码。维护内联副本时先修改公共资源，再由调用方同步并验证副本一致性。

适配器服务平面 `ListTable`；`PivotTable` / `PivotChart` 保留 VSeed 输出的布局与交互，按对应表类型另行接入。

## Token 契约

| 用途           | Token                                                                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 宿主输入       | `--ink`、`--muted`、`--accent`、可选 `--dashboard-font-family`；可选 `--strong` 和 `data-mode`                                                  |
| 通用排印与焦点 | `--font-ui`、`--text-primary`、`--text-strong`、`--text-secondary`、`--text-faint`、`--focus-ring`                                              |
| 默认阅读面     | `--table-canvas`、`--table-body`、`--table-stripe`、`--table-header`                                                                            |
| 文本与分隔     | `--table-text`、`--table-header-text`、`--table-divider`、`--table-frame`                                                                       |
| 悬停           | `--table-hover`、`--table-hover-row`                                                                                                            |
| 选中           | `--table-selected`、`--table-selected-row`、`--table-selected-border`、`--table-selection-width`                                                |
| 条件格式       | `--table-bar-positive`、`--table-bar-negative`：半透明中性数据条与负值数据条                                                                    |
| 滚动条         | `--table-scroll-thumb`、`--table-scroll-rail`                                                                                                   |
| 尺寸           | `--table-font-size`、`--table-header-font-size`、`--table-row-height`、`--table-header-height`、`--table-radius`、`--table-overview-max-height` |

默认使用弱行分隔，不给每个单元格叠加竖线。表头略高于正文对比，斑马纹仅辅助跟行。悬停跟随整行；选择使用 `highlightMode: 'cell'`，以主题色浅填充及 1px 细框标识选区。表头使用 `headerSelectMode: 'inline'`，点击列标题选中包含表头及全部数据行的整列，覆盖虚拟滚动中未显示的行；正文单元格保持单格选择。键盘焦点与数据选中分别呈现，减少动态效果时关闭数据过渡。

适配器统一启用 VTable 原生 `keyboardOptions.copySelected: true`，保留调用方其他键盘配置。表格获得焦点后，Ctrl+C（macOS 为 Command+C）复制当前单元格、矩形选区或包含表头与全部数据行的整列；正文使用现有格式，复制不改变记录或筛选。主页与 Modal 共用这一配置，不另写全局复制监听。

`DashboardTable.load()` 按需加载固定版本 VTable；`DashboardTable.options(base, host)` 负责表现适配，保留 Builder 输出的列、字段格式与数据。`DashboardTable.overview(Builder, columns, rows, host, formats, summary)` 将主页查询结果映射为表格；`rows` 保留原始数值与 `null`，`formats` 按列提供展示格式。`summary` 指定 VSeed 总计类型与参与列的零基下标，例如 `{ type: 'sum', fields: [1, 2] }`；默认平均首列以外的数值列。

总计显示复用业务格式器时，用只传数值的回调包装，不能把 VTable 附加的列、行参数透传为小数位数。无有效值的平均数显示“—”，不显示 `NaN`。

通过 `DashboardTable.setRecords(table, records)` 原位替换完整结果并清除过期的单元格选择，默认沿用 VSeed 输出的 `animationAppear`；分析弹窗筛选后使用同一实例呈现逐行过渡。适配器保留动画配置，减少动态效果时关闭播放，恢复偏好后可再次播放；需要立即呈现的场景可传 `{ animate: false }`。主题切换重新解析宿主 token，使用 `updateTheme()`，不为换色重建表格。主页概览与分析明细各自管理实例、ResizeObserver 和释放，不能将 VTable 混入只负责 VChart 的实例集合。

## 条件格式与总计

主页与 Modal 均通过 `DashboardTable.build(Builder, { dataset, dimensions, measures, totals }, host)` 配置 VSeed `bodyCellStyle` 与 `totals`。度量列使用原生半透明数据条，正负值保留方向和颜色，ID、日期、分类编码等维度不应用数据条。数据条不替代真实数字，不把属性高低解释为风险或好坏；表格的玻璃底、斑马纹、hover 和选区保持可见。

总计由 VSeed 生成原生 VTable 汇总行，固定于表格底部，对当前表格的完整记录计算。求和只纳入可加总金额和互斥分组计数；记录属性或等权国家值使用 `avg`，跳过缺失值。ID、年份、比例、分组均值和可能重复的去重计数不能直接相加；不适用的总计格留空，并说明口径。四份模板主页分别为：寿命使用逐列有效国家均值；经营概览合计销售额和订单数；心衰合计样本与事件数；餐食合计份数。Modal 的经营明细使用合计，其他三份按当前来源记录计算均值。

筛选后重新通过 DSL 构建条件格式范围，使用 `DashboardTable.update(table, options)` 更新列样式与记录；复用 VTable 实例、列宽和默认动画，保留列头筛选状态。总计不计入记录数，也不作为真实记录触发单行下钻。空结果保留表头和无数据反馈，恢复记录后由 VTable 恢复总计。检查零值、负值、缺失、空结果、筛选恢复与虚拟滚动；底部汇总不能被截断或出现额外外框。

## 列搜索、过滤与排序

主页与 Modal 表格通过 `DashboardTable.createView({ vbi, query, connectorId, columns, fields, types, host, render })` 接入列查询；宿主提供已有 VBI / VQuery 实例和 `DashboardFilters`。`bind(table)` 绑定表头入口，`updateRows(rows)` 接收主页当前范围的完整、未格式化查询结果，`render(rows, totalCount)` 更新同一 VTable 实例，退出时调用 `dispose()`。

表格视图把已查询的展示粒度注册为独立数据集，通过公开 VBI Builder 配置 `whereFilter` 和维度排序，再由 VQuery 取数；不在浏览器手写聚合或过滤记录，不引入额外筛选插件。`fields` 按列提供与 VSeed 列定义一致的原始字段 ID，省略时使用 `c0`、`c1` 等索引字段；`columns` 为同序标签。`types` 按列提供 `string` / `number`，省略时保持首列文本、其余数值的分析表约定；菜单条件与空值判断读取相应类型。数值按原始精度过滤与排序，首列使用业务键，原始行序用于稳定排序及恢复默认顺序。

列头漏斗通过左键点击或触屏轻点打开玻璃菜单，右键不触发；表头文字仍用于整列选择。菜单复用 `DashboardFilters` 的平铺、Selector、输入框与主题 token。文本提供包含、不包含、等于、不等于、开头是、结尾是、为空、不为空 8 种条件；模式匹配不区分大小写，等值匹配保留原始文本。数值提供等于、不等于、大于、大于等于、小于、小于等于、介于、不在区间、为空、不为空 10 种条件。文本空值包含 `null` 与空字符串，数值空值为 `null`，零值有效。区间包含端点，可只填写一侧边界；不在区间按其补集匹配有效数值。不同列条件取交集，均由 VBI Builder 表达。菜单采用单层玻璃阅读面，宽度为 264px，桌面控件高 28px、触屏控件高 36px，字号、图标和间距同步匹配。恢复排序是独立图标动作，与升降序选项组分开；清除与恢复动作的 hover 只在按钮自身显示均匀内阴影，图标保持居中，选中排序高亮不随之移动。单值条件将运算符和值并排显示，区间按需展开双输入，空值条件隐藏输入。已确认本列条件存在时显示清除入口；需要跨列清除时显示“清除全部筛选”，避免重复操作堆叠。再次点击已选排序方向或使用恢复按钮可返回默认顺序。编辑与选择运算符只改变草稿，点击“筛选”或在输入框 Enter 后查询；关闭不提交草稿，重新打开从 Builder 恢复已确认条件，输入法组合不提前提交。Alt+↓ 打开选中列菜单，Escape 逐层关闭并返回表格焦点。

Modal 的列菜单挂在所属 dialog 内，复用同一筛选与排序组件，不增加第二行列概况；保留原有底部合计或平均值，并按过滤后的完整记录重新计算。列条件只影响关联明细和该表汇总，不改变 Modal 分析图或指标。切换 Modal 分组时保留结构兼容的列条件，关闭后销毁本地视图及菜单，重开从当前入口范围开始。

列条件只影响该表的可见记录，不改变主页指标和图形；主页范围改变后更新表格数据源并继续应用列条件。显示筛选后与范围内的记录数，无结果仍可操作表头清除条件；单元格下钻从当前记录读取业务键，不依赖过滤前的行下标。快速操作只呈现最新查询，销毁释放菜单、事件、查询资源与派生数据集。

## 原始记录与列概况

`DashboardTable.createDetails({ vbi, query, Builder, VChart, connectorId, columns, rows, host, count })` 创建独立的原始记录表。`columns` 为列名，`rows` 保持原始值与完整记录；`updateScope([{ column, operator, value }])` 将全局条件映射到零基列下标。返回的 `view` 复用 `createView()` 的列搜索、条件、排序与清理；`repaint()` 更新当前主题，`dispose()` 释放表格、查询和数据集。

列概况使用 VTable 顶部自定义汇总行，位于表头后的第二行，固定高度并随表头保留；它不是原始记录，不计入记录数。数值列通过 VSeed column 生成分布图，文本列显示高频值、其他项与缺失占比；缺失值单独标识，零值保持有效。图表使用 VSeed 编码后的数据接入 VTable chart 单元格，不把未编码记录直接覆盖到生成的图表数据中。复制概况行输出可读摘要。

原始范围、数值边界和频数均由 VBI Builder / VQuery 查询。分箱只将每条记录映射到区间，再由查询层计数；不在渲染回调里分组统计。分箱基于当前表内的完整记录，排序复用概况缓存，筛选重新查询；常量列、空结果和全部缺失列有明确呈现。高频项之外的“其他”通过总体与已展示项的查询计数相减，不能截断整体记录。

四份 light-dashboard 的原始记录表与上方分析表共用透明的 `--table-frame` / `--table-divider`，保留独立的选区与焦点 token。此表位于现有分析表之后、页面内容最下方：寿命保留全局年份范围内的原始国家年度记录，心衰与餐食保留来源样本，经营概览保留订单商品明细。全局筛选同时更新原始范围；列条件独立作用于本表，不改变概览或分析表。表格使用虚拟滚动，宽列在自身容器内滚动，图表 Tooltip、列筛选和复制沿用同一套组件与主题。

## 完整数据与布局

主页与分析表格直接消费当前范围的完整查询结果，使用 VTable 虚拟滚动，不做固定 50 行切片或添加上一页、下一页。主页短表按实际行数收缩，长表在限定高度内滚动；分析表保持可展开的固定阅读区域。宽表在自己的容器内横向滚动。

记录数、当前筛选范围与统计粒度保持可见。业务指标汇总由完整范围的 VBI 查询计算；表格底部汇总由 VSeed / VTable 对已取得的完整表格记录计算，均不能只按屏幕可见行估算。服务端需要游标分批取数时说明已加载范围，不能把尚未加载的部分标为完整结果。

验收默认态、行悬停、单元格和表头选中、滚动到末条、筛选清除、窄屏与展开布局。检查 Tab / Shift+Tab 可按顺序进入和离开表格，不能被全量单元格导航困住；对话框内仍能到达关闭与其他控件。切换主题时检查正文、表头、选中和滚动条同步变化；无结果也保留表头与明确反馈。同步检查通过只代表内联副本一致，仍须运行上述交互与视觉验收。配置依据见 [VTable 主题](https://www.visactor.io/vtable/guide/theme_and_style/theme)与[选择样式](https://www.visactor.io/vtable/guide/interaction/select)。
