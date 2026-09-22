# Dashboard 主题方案

状态：已实现。下文保留实现前的问题与设计依据；公开用法见 `practices/dashboard/README.md`。

## 实现前的能力与缺口

- `packages/vbi/src/types/dashboardDSL/meta.ts` 已有 `meta.theme`，但只接受 `light | dark`。
- `VBIDashboardBuilder` 没有主题子构建器，无法通过公开的 Builder API 修改主题。
- `practices/dashboard/src/DashboardRenderer.tsx` 接受外部 `theme`，默认浅色；目前完全不读取 `meta.theme`。现有测试明确约定了这个行为，接入文档主题时需要同步调整。
- Dashboard 的页面、卡片依赖 Ant Design token，工具栏另有写死的浅深色渐变，间距和字体等散落在 CSS 中。
- 图表预览和编辑器复用 Standard，并接收同一个外部主题。Standard 的 `useConfiguredVSeed` 已经通过生成新的 VSeed 对象覆盖展示主题，不修改图表 DSL，这条路径可以保留。
- Standard 的主题类型和界面算法目前也只支持浅深色；自定义主题不能仅靠放宽 Dashboard 的一个类型完成。

## VSeed 可复用的机制

1. **主题名称与配置分离**：`VSeed.theme` 是字符串；`Builder.registerTheme/getTheme` 用名称查找配置。
2. **内置主题提供完整默认值**：`lightTheme()`、`darkTheme()` 返回各图表类型的配置；`registerCustomTheme()` 支持基于内置主题构建自定义配置。
3. **语义 token 转换**：`packages/vseed/src/theme/tokenTheme.ts` 已有 `TokenThemeDefinition`，包含 `baseTheme`、字体、文字色、边框色、背景色、分类色板、连续色板等。`createTokenThemeConfig()` 将其展开到图表、表格、坐标轴、图例、提示和标注；`registerTokenTheme()` 完成注册。
4. **图表显式配置优先**：advanced pipeline 的 theme pipe 先取主题配置，再合并图表配置。数组有额外处理，不能简单套用普通对象合并。

因此无需再写一套图表主题生成逻辑。Dashboard 应补充页面与卡片样式，并复用 VSeed 的 token 转换和注册。

## 实现边界与接口

### VBI 只保存选择

保留现有 `meta.theme` 路径，改为非空字符串并继续默认 `light`。增加 `dashboardBuilder.theme.setTheme(name)`、`getTheme()`、`observe()`，保持与 Chart Builder 的调用习惯一致。

主题名称进入 DSL，跟随保存、撤销和协同同步；具体颜色、CSS、Ant Design 算法和主题注册留在渲染层。Builder 不依赖 Ant Design，也不导入 practice。

当前 `meta` 以普通对象存入 Yjs。主题子构建器必须替换完整的 meta 值并保留 title、description，不能原地修改对象。此方案沿用现有 meta 粒度；并发修改标题和主题仍是整个 meta 值的冲突粒度，不能声称已支持字段级合并。如需字段级协同，再统一迁移 meta 的 Y.Map 表示和历史更新兼容。

### Dashboard 管理展示主题

先由 `practices/dashboard/src/theme/` 维护纯数据定义、内置主题、解析函数和 UI 适配。出现第二个实际消费者时，再提取到共享组件层。

已实现的公开接口：

```ts
interface DashboardThemeDefinition {
  label?: string
  tokens: TokenThemeDefinition
  dashboard?: {
    backgroundColor?: string
    widgetBackgroundColor?: string
    widgetBorderColor?: string
    widgetBorderRadius?: number
    toolbarBackground?: string
    padding?: number
    gap?: number
  }
}

registerDashboardTheme('brand-light', {
  tokens: brandTokens, // 完整的 VSeed TokenThemeDefinition
  dashboard: { widgetBorderRadius: 12, gap: 16 },
})

dashboardBuilder.theme.setTheme('brand-light')
```

`registerDashboardTheme` 保存 Dashboard 定义，同时调用 VSeed 的 `registerTokenTheme` 注册同名图表主题。内置浅深色的 Dashboard 样式映射应与 VSeed 内置主题协调，避免重新注册时覆盖现有的 `light`、`dark` 图表配置。

Dashboard 默认值由 `baseTheme` 与语义 token 推导，`dashboard` 只覆盖页面专有项。文字和字体尽量共享，避免页面和图表分别维护两份同义 token。布局坐标、断点、列数和行高继续由布局系统负责，主题只控制视觉间距。

### 明确主题优先级

主题名称解析顺序：

```text
DashboardRenderer 的显式 theme
  → dashboard DSL 的 meta.theme
  → light
```

宿主传入主题属于临时展示覆盖，不写回 DSL；用户保存主题选择时才调用 Builder。网站示例默认跟随 Dashboard 文档主题，保证工具栏选择能够生效。注册表内找不到名称时，页面和图表一起回退浅色，保留原 DSL 名称，避免图表和容器各自回退成不同结果。

同一主题内先应用默认样式，再应用语义 token，最后应用 Dashboard 专有覆盖；图表局部显式样式继续遵循 VSeed 原有的高优先级合并规则。

### Standard 区分主题名称与明暗模式

`brand-dark` 是主题名称，`dark` 是 `baseTheme`。Standard 不能再用 `theme === 'dark'` 推断所有主题的界面模式。

Standard 的公开展示配置分别提供：

- `chartTheme`：VSeed 的主题名称，用于 `useConfiguredVSeed`；
- `theme`：UI 的 `light | dark` 模式；`themeToken`：映射后的 Ant Design token，用于控件及编辑器。

两者由同一份已解析的 Dashboard 主题产生，预览和编辑器使用同一结果。保留现有浅深色调用方式，更新 Standard 自己创建的 ConfigProvider，避免它的内层默认配置覆盖 Dashboard 的品牌色和字体。Dashboard 的工具栏渐变、卡片和 CSS 也要统一消费主题值。

Dashboard 切换展示主题时，不遍历调用 `chartBuilder.theme.setTheme()`。同一个 Chart 资源可以被多个不同主题的 Dashboard 引用，持久修改它会影响其他使用方。

VBI Chart DSL 当前也只允许 `light | dark`，虽然它的 ThemeBuilder setter 接受 string。第一阶段通过渲染时的 VSeed 覆盖支持 Dashboard 自定义主题即可；如果以后支持独立图表保存自定义主题，需要一起放宽 Chart DSL schema、类型与示例，不能只调用现有 setter。

## 已完成的实现与验收范围

1. **文档主题选择**：先写测试，再修改 Dashboard DSL 和主题子构建器；验证默认值、非空名称、元数据保留、observe、撤销、Yjs 同步及旧数据。
2. **主题解析与内置主题**：接通显式 prop > 文档 > 默认值，统一页面、卡片、工具栏和 Insight；验证未知名称回退。
3. **自定义主题与 Standard**：复用 VSeed token 注册，分离名称和模式，接通图表、表格、预览和打开中的编辑器。注册放在应用初始化阶段，避免在 React 渲染期间反复改写 VSeed 的全局注册表。同一运行环境中的主题名称必须唯一，不能为不同 Dashboard 用同一个名称注册不同定义。
4. **示例与回归**：补浅色、深色、品牌主题示例并由同一源生成测试和文档。验证两个 Dashboard 共用同一 Chart 时互不污染，切换主题不重建 Builder、不改变资源 DSL，VSeed 的局部样式优先级仍成立。

第一阶段不增加主题编辑器、远程主题加载、每个 widget 的独立主题或自动生成色板。先完成“选择、注册、统一渲染”的闭环。

补充约束：注册时复制主题定义；相同序列化定义重复注册为无操作，不同定义禁止覆盖同名主题，内置名称也不可覆盖。主题示例通过 `preview.themes` 在模块初始化时注册。

## 工具栏预设主题

基于 [VisActor 配色](https://github.com/VisActor/vchart-theme/tree/develop/packages/vchart-theme/src/v-screen) 的 10 套官方分类色板，补充 Dashboard 卡片和控件所需的语义 token；加上默认浅深色，共 12 套主题可通过 Builder 使用。主题名称使用 `volcanoBlue`、`electricGreen` 等简洁的 camelCase 标识。

工具栏保留全部 12 组内置主题和注册的品牌主题，按 `baseTheme` 分为“浅色”“深色”两组。外层只显示当前色板第一个颜色的圆点，展开后左侧圆点同样使用色板首色，右侧为无间隔的连续色板，不常驻显示主题名称、衣服图标或下拉箭头。悬停色板选项或外层圆点时，通过 Tooltip 显示本地化名称或自定义 `label`，并保留无障碍名称。暖白采用浅色模式与柔和暖色背景，墨绿采用绿色背景。启用编辑位于工具栏最左侧，主题入口位于右侧全屏按钮的左边。

主题模块按职责组织：`types.ts` 声明定义，`presets.ts` 使用主题 key 到完整配置的策略映射，每个主题独立声明配色、明暗模式与界面颜色，不合并默认预设或维护特例覆盖；`registry.ts` 负责注册、冲突检查和统一名称回退，`resolve.ts` 将定义适配为 Ant Design 配置及 Dashboard 样式，`index.ts` 只导出入口。主题名称本地化由 `i18n/theme.ts` 管理。`toolbar/ThemePicker` 管理选择器的分组、色板、Tooltip 和样式，`DashboardToolbar` 只负责控件组合；受控模式与 Builder 写入仍由 `DashboardRenderer` 管理。

编辑模式的选择通过 `builder.theme.setTheme()` 持久化，可撤销；关闭编辑后禁用，预览模式不提供修改入口。显式 `theme` 由宿主控制，通过 `onThemeChange` 接收选择，缺少回调时禁用选择器，不修改 DSL。下拉浮层挂载在 Dashboard 内，保证浏览器全屏时仍可使用。

## 工具栏组合与主体解耦

`DashboardRenderer` 通过 `toolbar: ReactNode` 接受工具栏内容，默认使用 `DashboardToolbar`，传 `null` 可隐藏。`DashboardToolbar` 的 children 默认组合编辑开关、主题选择和全屏按钮，也允许调用方选择、重排或插入业务控件。各功能通过 `useDashboard` 读取当前 Dashboard 的展示上下文，不依赖主体组件的内部实现，也不直接修改 DSL。

上下文只包含 locale、已解析主题、mode、有效 editing 状态、编辑和主题回调以及容器 ref。全屏状态、错误、监听和清理由全屏控件拥有，移除该控件时释放其资源。`DashboardGrid` 负责响应式布局与资源渲染，只接收可选编辑回调；`useChartEditor` 管理编辑选择及资源失效后的关闭。新增工具栏功能通过组件组合完成，无需增加事件总线、功能注册表或第二份文档状态。
