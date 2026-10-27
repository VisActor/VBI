# Standard 职责对照

模板内嵌从 `practices/standard/src` 编译的原始组件；没有手写另一套简化编辑器。React / Ant Design / DnD Kit / Zustand 与当前仓库的 VBI / VQuery / VSeed 已内嵌；VChart / VTable 的完整 JS 也已内嵌，独立 HTML 不需要源码仓库和开发服务。完整能力、入口和通过条件见[验收矩阵](standard-parity.md)。

| Standard 源码（相对 practices/standard）                       | 模板采用的职责                                                         |
| -------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `src/App/components/FieldsPanel.tsx`、`src/components/Fields/` | 完整字段、搜索、分组、类型 / 角色过滤、展开收起                        |
| `src/App/components/ShelfPanel.tsx`、`src/components/Shelves/` | 四槽、多字段、聚合、别名、编码、排序、格式、过滤编辑                   |
| `src/components/Shelves/dnd/`                                  | 真正的字段拖拽、插入、重排、跨槽语义转换                               |
| `src/components/Filter/`                                       | 字符串、数值、日期 WHERE 与独立聚合的 HAVING                           |
| `src/components/Toolbar/`、`src/components/ChartType/`         | 全部 31 种图型、limit、undo / redo、全屏入口；语言与主题由外壳设置管理 |
| `src/utils/`                                                   | 完整 CSV 解析、类型映射和本地连接器；模板不提供上传入口                |
| `src/hooks/`、`src/model/`、`src/i18n/`                        | 公开 Builder 操作、文档订阅、查询缓存、过期结果保护和翻译              |

外壳和渲染适配已内嵌在完整 HTML 中。渲染适配复用 VChart 实例并启用 morph，支持 ListTable / PivotTable / PivotChart、原生 tooltip / 图例 / 选择 / player 及透视图图例过滤。查询和领域规则由 Builder 管理。模板查询订阅使用公开 `builder.observeDeep` / `unobserveDeep`，替换 Builder 时释放原订阅；首次查询显式执行，过期请求无法覆盖最新结果或缓存。

VBI 的 `instance.bind` 当前只允许 table / pivotTable DSL 绑定 VTable；分面图的 DSL 仍为 column 等 VChart 类型，因此 PivotChart 组合实例通过 `EditorDemo.runtime.instance` 暴露，不误绑为 VChart。普通图与表格均绑定公开 `builder.instance`，释放前解绑。这个限制不影响透视图本身的渲染和原生事件。

`standard-source-manifest` 标识内嵌 Standard 源文件的 SHA256 与三个核心包版本。更新运行时时同步更新来源清单，并运行对应验收用例。

透视图图例在适配层合并连续更新，原生调用间隔至少 220ms，并在切换配置或释放前取消待执行项。原因是固定 VTable 1.23.1 的 200ms 尾随过滤回调不会随 release 清理；保持相同过滤规则与最新选择，避免快速切图后访问已释放的数据。验收包含离散 / 连续图例事件和紧接着的渲染器切换。

工具栏使用 `allowSourceChange={false}`，数据由内嵌源或宿主连接器提供。业务标题、品牌色和状态通过配置及宿主接口管理。提示文案由共用翻译维护，中文过滤和聚合菜单使用业务名称。

设置面板位于工具栏全屏按钮右侧，提供中文 / English 与浅色 6 套、深色 4 套主题，通过 `locale.setLocale` / `theme.setTheme` 同步 CSS、Ant token 和 VSeed colorScheme。`VBIStoreProvider hideLocale hideTheme` 使语言与主题集中在此面板。默认外观为 VSeed 原生浅色，业务标题由 `presentation` 保存。绘图区呈现图形及原生图例、坐标和 tooltip；查询期间保留已有图形并置灰，通过 `aria-busy` 与状态区域反馈加载、空态和错误。页脚署名紧凑右对齐。

柱 / 条（含堆叠与分面）通过 VSeed `barStyle.barBorderWidth: 0` 设置无描边样式；线图、坐标、tooltip、选中与图例事件使用原生实现。外壳边界使用中性明暗色。

资源加载适配见[内嵌运行时](runtime-loading.md)。React / Ant Design 保持仓库构建的版本与实例一致。VBI / VQuery / VSeed 固定为 0.7.2，所有 JS 内嵌在 HTML 中，默认演示可离线打开。

模板的控件适配只作用于呈现层：共用 CSS 统一浮层 / 菜单和触控尺寸；图型面板及配置槽添加样式类名；拖拽落点使用固定尺寸的透明度 / 缩放过渡。设置弹层通过 `useEditorSettings` 管理定位、可中断的双向动画与焦点恢复。Ant Design 菜单的定位、选择、关闭、键盘操作以及 DnD 的字段语义、排序和落点计算继续沿用原实现。
