# UI 组件

组件负责结构、呈现、临时交互与清理；页面通过公开入口和 token 适配。已有能力不按业务字段复制 HTML、CSS 或事件，新能力扩展所属组件。

模板流程与内嵌同步见 [template](template.md)，计算口径与发现见 [data-analysis](data-analysis.md)，分析上下文与探索动线见 [deep-analysis](deep-analysis.md)。

## 组件边界与维护源

| 职责                      | 结构与公开入口                                                                                                                            | 维护源                                                                   |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 阅读面、布局与基础控件    | `.ui-surface`、`.ui-button`、`.ui-button--filled`、`.ui-icon`、`.ui-input`、`.dashboard`、`.ui-disclosure`。                              | [components.css](../assets/components.css)                               |
| 结构、排印、等待与清理    | `DashboardUI.createAnalysisDialog()` / `createLoading()`、`applyTypography()`、`scope()`、`activity()`、`paint()`、`delay()`、`yield()`。 | [core.js](../assets/core.js)                                             |
| 平铺、Selector 与图标控件 | `DashboardFilters.mount()`、`sync()`、`close()`、`trigger()`。                                                                            | [components.js](../assets/components.js)                                 |
| 排印动效与卡片倾斜        | `DashboardMotion({ reducedMotion })` 返回动效控制器，可选传入 `metricUnit`。                                                              | [components.js](../assets/components.js)                                 |
| 首次加载、刷新与失败恢复  | `DashboardLoading.setTrigger()`、`refresh()`、`paint()`、`reveal()`、`fail()`。                                                           | [components.js](../assets/components.js)                                 |
| 外观设置与本地偏好        | `DashboardAppearance.mount()`、`getState()`、`storageKey`。                                                                               | [appearance.js](../assets/appearance.js)                                 |
| 分析结果与 Modal 控制器   | `DashboardAnalysis()`、`bindMetricAnalysis()`；结构工厂只创建 UI。                                                                        | [analysis.js](../assets/analysis.js)                                     |
| 表格与列菜单              | `DashboardTable.build()`、`update()`、`createView()`、`createDetails()`。                                                                 | [表格适配器](../../../references/visual-query/references/table-theme.md) |

`df-`、`ma-`、`da-` 分别是筛选、分析和外观组件的内部结构，业务层保留其 DOM 与状态管理。按角色类与 token 调整界面，不用具体业务 ID 编写逐卡控件样式。

`dashboard-ui-core` 与 `dashboard-appearance-runtime` 在 head 中于首次绘制前恢复外观；其余控件在 DOM 就绪后、外部依赖前初始化。共享实现只在所属维护源修改，页面差异留在 `dashboard-page-style` 和业务模块；副本同步与单文件约束按 [template](template.md#维护模板)维护。

## 材质与排印

`--font-ui` 采用 [Ant Design 的系统字体思路](https://ant.design/docs/react/customize-theme/)，补充苹方、微软雅黑、Noto Sans CJK 与 Emoji 回退，不依赖下载字体。宿主可通过 `--dashboard-font-family` 覆盖整套字体。VSeed `registerAll()` 后、首次构建前调用 `DashboardUI.applyTypography(Builder)`，经公开主题配置统一图表字体与表格的正文、表头；DOM、Modal 和 VTable 同时读取这个 token，字号、字重和数字等宽规则分别保留。

`.ui-surface` 统一玻璃阅读面；变体为 `.ui-surface--overlay`（外观设置 / 菜单）、`.ui-surface--modal`（模态对话框）、`.ui-surface--tile`（内层图表 / 明细）、`.ui-surface--static`（等待卡）。玻璃面与控件外壳通过 `--glass-edge` / `--control-edge` 保留 1px 半透明白色轮廓，配合顶部与微弱底部内高光；选中面、菜单 hover、输入框和滑块沿用同一轮廓。普通菜单文字项保持轻量，表格 Canvas 的外框与选区使用独立 token。尺寸与布局归所属组件，不支持模糊或减少透明时保留实底降级。

模态对话框使用原生 `dialog.showModal()`；`.ui-surface--modal` 统一明亮中性的玻璃阅读面、轻遮罩和背景模糊，通过 `--glass-modal-surface`、`--overlay-scrim`、`--overlay-scrim-filter` 适配宿主。外壳通过局部 `--surface-edge` / `--surface-shadow` 调整轮廓，不覆盖子卡的公共材质；内卡与主页 Card 共用 `--glass-edge` 和 `--glass-lip`，控件使用独立 token。减少透明时关闭背景模糊，轮廓与高光随玻璃强度响应；验收同时对照主页、外观设置与 Modal，避免遮罩透入后泛灰或轮廓过亮。

| Token                                                              | 用途与约束                                                                  |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| `--accent`、`--accent-ink`、`--chart-accent-end`、`--background-*` | 图形、重点文字、连续色阶与背景；正文中性，业务语义色独立。                  |
| `--glass-strength`、`--glass-*`                                    | 强度默认 60；阅读面、控件、浮层、反光与降级由组件统一计算。                 |
| `--filter-height`、`--control-*`                                   | 主页与 Modal 控件高 36px；`--control-menu-hover` 控制菜单项浅主题色玻璃底。 |
| `--font-ui`、`--text-*`、`--focus-ring`、`--table-*`               | DOM / Canvas 共用排印、焦点与表格主题；颜色由适配器解析后传给 Canvas。      |

数字用 tabular-nums，同角色字号、字重与行高一致，长读数调整单位或空间；正文对比至少 4.5:1，图形与细线至少 3:1。Canvas 保持透明，融入阅读面。

## 平铺与 Selector

用 `data-filter-control="segment"` / `"selector"` / `"icon"` 声明控件，保留原按钮、业务 data 属性与 `aria-pressed`；已有 `details` 用 `[data-control-label]`、`[data-control-options]` 接入。图标控件使用 `.df-icon`，调用方管理动作及 `aria-label`、`aria-expanded`。

- `DashboardFilters.mount(root, { sticky })` 返回清理函数；主页标题区传入 `sticky: true`，筛选器滚出后吸附右上角，标题隐去，回到原位恢复；吸附与恢复使用可中断的回弹，减少动态效果时直接切换。动态替换选项后调用 `sync(selectorRoot)`，`close(root)` 关闭菜单，`trigger(option)` 取得实际可见的反馈触发器。
- 深度分析打开时通过 `portal(root, host)` 临时借用同一套全局控件，置于 Modal 内容上方；返回函数恢复原位置，保留选择、监听与主页占位。全局控件属于原生 dialog 的可交互区域，外观设置与菜单随所属宿主挂载。
- Selector 的重置选项标 `data-clear-option`；已选项再次点击可取消时，根元素标 `data-clear-selected`。清除图标仅在鼠标 hover 或键盘聚焦清除按钮时替换同尺寸箭头，普通选中和触屏不常驻；点击复用原选项动作，loading 优先显示转圈。
- 少量短选项用平铺，其余用 Selector。四份模板标题区至少一组平铺和一个 Selector，外观入口最右；窄屏按控件换行，主页与 Modal 共用组件。
- 搜索仅过滤候选，完整选项少于 4 项时隐藏搜索框；确认后收起并返回焦点，输入法组合期间不提交。键盘、Escape 层级、外部关闭与浮层定位由组件统一处理。
- 保留白色选中面、主题色菜单 hover、柔和内阴影和可中断的按压回弹；平铺选中面增加轻柔外投影，箭头固定向下。`data-menu-min-width` / `data-menu-align="start"` 可调整局部菜单，默认最小宽度 280px、右对齐，宽度受视口约束。

控件只管理瞬时交互；确认选择后由宿主更新 Builder 条件和刷新，搜索不取数。条件归属见[组合与联动](../../../references/visual-query/references/composition.md)。

## 指标卡与图形

图形宿主用 `.main-plot`、`.mini`、`.ring-plot`，环图中心用 `.ring-reading` 与 `data-caption`；小卡变体为 `.small-body--stack`、`.small-card--compact`。迷你图使用真实 VSeed 配置，每类最多一张；主图和 Modal 不受此配额限制，无合适迷你图时保留读数。

| 迷你图          | 配置约束                                                                                                                            |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 渐变 `column`   | `barStyle: { barGradient: true, barBorderWidth: 0, barBorderOpacity: 0 }`；条件样式同样无边框，保留零基线与正负方向。               |
| 无点渐变 `area` | `areaStyle.areaGradient: true`、`pointStyle.pointVisible: false`、`yAxis.zero: false`；按实际范围显示变化，顺序需有时间或分布含义。 |
| `donut`         | 非负、可加总且同分母的构成；中心读数不遮挡扇区。                                                                                    |

渐变通过同一真实度量的位置与 `color` 编码生成，`linearColorScheme` 读取主题，迷你柱保留色标端点，不用固定 `barColor` 覆盖。折线点沿用系列填色，无白色描边，悬停 / 选中用尺寸或同色光晕区分；版本兼容项见 [template](template.md#固定版本与场景回归)。

`DashboardMotion` 提供 `formatNumber()`、`animateMetric()` / `animateReading()`、`chartAnimation()`、`bindCardTilt()` 与入场控制；主页和 Modal 复用同一实例，宿主退出时调用 `disposeMotion()`。主图 hover 只联动声明范围，小图仅联动所属卡，使用缓存不重查；移出、Escape 或新结果恢复对应汇总，触屏与键盘沿用模板。

## 布局与深入分析

页头用 `.heading-title` 将图形 Logo 与页面标题排在同一行，筛选及外观入口位于右侧；窄屏将控件排到下一行。数据来源说明放在页面末尾左下角，与状态信息一起保留。

`.dashboard` 消费 Dashboard DSL 布局，通过 `setLayouts()` / `layoutDashboard()` 重排并同步 DOM 阅读顺序，按实际尺寸 resize；不另维护 CSS 模块坐标。`.card-slot` 固定命中区，倾斜仅作用于内层小卡，主图与发现保持平面。

`.ui-disclosure` / `.ma-definition` 提供可展开容器，保留折叠状态，内容自然撑高，宽表仅在自身容器滚动。Modal 的结构由 `DashboardUI.createAnalysisDialog()` 生成，业务接入走 `bindMetricAnalysis()`，具体配置见 [deep-analysis](deep-analysis.md)，不重复实现弹窗和控件。

主页、原始记录及 Modal 表格统一使用 `DashboardTable`；表头 `--table-header` 为浅主题色玻璃底、深色文字，换色同步 Canvas。列菜单宽 264px、桌面控件高 28px、触屏高 36px；列查询、总计、复制与更新 API 按[表格适配器](../../../references/visual-query/references/table-theme.md)接入。

## 外观设置

根元素 `data-dashboard` 用于偏好隔离，`data-default-theme` / `data-default-glass` 指定默认值。色板统一维护于 `appearance.js`；脚本自动挂载，`mount()` 可复用并返回清理函数，`getState()` 返回当前状态快照。

偏好键为 `vbi-light-dashboard:<data-dashboard>:appearance`，存储不可用不阻断 UI。监听 `dashboardappearancechange`，从缓存 seed / 图形定义更新已有实例；主题不触发查询，强度只改材质，恢复默认不重置筛选。内置问号提示支持返回对话继续编辑，保留 hover、键盘与触屏操作。

`metricAnimation` 默认 `false`，只控制主页与 Modal 数字过渡；关闭立即结束在途数字动画，开启从当前读数接续，系统减少动态效果优先。偏好随主题、强度保存，恢复默认时关闭；切换不查询、不重绘图表。

## 等待、错误与生命周期

`DashboardLoading` 负责首次占位、刷新和重试：`setTrigger(control)` 指定反馈控件，`refresh(retry)` 开始刷新，长任务前 `await paint()`，数据与图表就绪后 `await reveal(isCurrent)`，失败调用 `fail(message)`；初始化布局保持可测量。

主页、Modal 与表格操作共用 `DashboardUI.activity({ minimum, change })`：`start(control)` 返回任务，长任务前等待 `task.painted`，结束调用 `await task.finish(isCurrent)`，取消或退出调用 `cancel()`；新任务替换反馈，旧任务不能清除新状态。Selector 原位替换箭头，文字按钮右侧反馈，图标按钮原位替换；控件等待图标通过 `--control-loading-size` 统一为含边框 12px 的外径。

初始化至少展示 800ms，控件操作至少 200ms，内部表格更新不叠加最短等待。查询批次和图形构建间 `await DashboardUI.yield(signal)` 让出主线程；`paint(signal)` / `delay(milliseconds, signal)` 提供可取消的绘制与等待边界。

以 `const lifetime = DashboardUI.scope()` 建立宿主作用域，用 `lifetime.on()` 注册监听、`lifetime.add()` 登记清理，退出调用 `lifetime.dispose()`；动态控件监听随其宿主释放。等待反馈与查询取消分别由 activity 和请求的 AbortController 管理；业务条件和计算留在 Builder。

修改组件后按[验收标准](acceptance.md)对照受影响视图与交互；源码或内嵌副本一致不代替实际运行验证。
