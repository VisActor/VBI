# Dashboard 主题方案

状态：已实现，主题注册统一收敛到 Builder。公开用法见 `practices/dashboard/README.md`。

## Builder 拥有主题状态

`VBIDashboardBuilder.theme` 负责选择、配置与订阅主题。`meta.theme` 保存主题名称，默认 `light`；`meta.themes` 按名称保存文档内的完整配置，类型为 `VBIDashboardThemeDefinition`。配置复用 VSeed 的 `TokenThemeDefinition` 及其 schema，并补充可选的 Dashboard 页面、卡片、工具栏和间距配置。Builder 不依赖 React、Ant Design 或 practice。

- `setTheme(name, definition?)`：选择主题；传入配置时，一次变更完成配置保存和选择，无需预先注册。
- `registerTheme(name, definition)`：在文档内新增或更新主题，不切换当前选择。
- `getTheme()`、`toJSON()`：读取当前名称。
- `getThemeConfig(name?)`：读取文档配置或内置预设的副本；`getThemeDefinitions()` 读取全部文档配置的副本。
- `getThemeOptions()`：提供内置和文档主题的名称、label、明暗模式与色板。
- `resolveTheme(name?)`：负责名称回退和 VSeed 注册，返回主题定义及可直接使用的 chartTheme 运行时名称，不修改选择。
- `observe(callback)`：订阅主题名称与配置变化，返回取消订阅函数。

主题定义切换后仍保留，可以重新选择。配置随 `builder.build()` 导出，支持重新创建文档、撤销/重做和 Yjs 同步。写入前统一校验，读取时返回副本，避免外部修改绕开 Builder 和订阅机制。

当前 `meta` 以普通对象存入 Yjs。主题修改替换完整 meta 值并保留其他字段；并发修改标题和主题仍沿用整个 meta 值的冲突粒度。此方案不引入字段级协同迁移。

## 订阅与渲染职责

`theme.observe()` 通知名称和任意文档主题配置的变化，覆盖本地修改、撤销/重做和远端更新；相同配置重复写入、标题等无关元数据变化不触发通知。

`useDashboardTheme` 通过 `useSyncExternalStore` 订阅此接口，从 Builder 的 resolveTheme 和 getThemeOptions 读取快照，再将结果适配为组件样式。组件卸载或 Builder 更换时释放订阅。主题解析不依赖整个 Dashboard 文档的更新通知。

展示优先级如下：

1. 名称：显式 `DashboardRenderer.theme` → 文档 `meta.theme` → `light`。
2. 定义：文档 `meta.themes[name]` → 内置预设。
3. 未知名称：页面与图表统一回退浅色，保留原文档名称。

显式 theme 是宿主的临时展示覆盖，通过 `onThemeChange` 接收选择；默认模式通过 Builder 保存选择。组件负责将语义 token 适配成 Ant Design 配置与 Dashboard 样式。

## 图表与多实例隔离

VSeed 通过全局名称查找图表主题。Builder 为主题分配按 token 内容缓存的内部运行时名称，避免两个 Dashboard 的同名配置互相覆盖。相同 token 复用运行时主题；更新配置不会改写其他 Dashboard 正在使用的主题。

Standard 分别接收 `chartTheme`（VSeed 运行时名称）、`theme`（浅深色模式）和 `themeToken`（控件样式）。预览与编辑器使用同一份解析结果。Dashboard 主题切换不修改引用的 Chart DSL，同一个图表资源可以在不同主题的 Dashboard 中展示。图表显式样式继续遵循 VSeed 的优先级规则。

组件侧的注册入口和全局主题目录已删除。所有自定义主题通过 Builder 的 `registerTheme` 或 `setTheme` 配置；跨文档复用时传入同一份定义。`resolveTheme` 在首次使用时注册 VSeed 主题并缓存运行时名称，因此文档恢复、协同同步和撤销后的配置也能由任意消费者直接使用，不依赖 React 渲染。

## 预设与工具栏

保留 VisActor 的 10 套分类色板，加上默认浅深色共 12 套内置主题。`packages/vbi/src/dashboard-builder/features/theme/presets.ts` 是主题 key 到完整配置的策略映射，每套独立声明配色、明暗模式和界面颜色，不维护特例覆盖或合并预设配置。

工具栏按 `baseTheme` 分浅色、深色两组。外层仅显示色板首色圆点；选项为首色圆点和连续色板，悬停显示本地化主题名或自定义 label。启用编辑位于左侧，主题选择位于右侧全屏按钮前。浮层挂载在 Dashboard 内，以支持浏览器全屏。

`DashboardRenderer` 接受 `toolbar: ReactNode`，默认组合编辑、主题和全屏控件，也可重排、插入业务控件或传 null 隐藏。控件通过 `useDashboard` 读取展示上下文和回调，主题选择器不负责注册或持有文档状态。`DashboardGrid` 负责布局与资源渲染，`useChartEditor` 管理编辑选择，全屏控件拥有其监听与清理。

主题职责由 Builder 内的 `theme-builder.ts`、`presets.ts` 和 `vseed-theme.ts` 分担。Dashboard 的 `theme.ts` 仅将 Builder 输出映射为 Ant Design 与页面样式，不查找预设、不注册 VSeed、不维护主题缓存。

## 验证与示例

测试覆盖 Builder 配置校验、导出恢复、主题订阅、无关修改过滤、撤销/重做、远端同步、取消订阅，以及组件更新和同名主题隔离。

示例源位于 `packages/vbi/tests/examples`。品牌主题直接通过示例中的 `dashboardBuilder.theme.setTheme(name, definition)` 构建；同一份代码生成文档和测试，主题定义包含在 DSL 快照中，无需 `preview.themes` 或模块级注册。
