# spec Pipeline

## spec pipeline

`spec pipeline`接收一个advancedVSeed DSL, 输出一个spec

`spec` 是VChart或VTable的输入数据结构, 用于描述图表的配置项


`spec` 本身无法序列化, 因此不能在Node.js环境中构建, 只能用于浏览器环境.

## 配置关闭与重复构建

关闭标签、图例时，pipe 直接返回最小关闭配置，不再创建格式化、筛选回调。普通 VChart 图例使用 `visible: false`，透视图的 VTable 图例使用空数组；后续扩展 pipe 不应重新给关闭的组件添加回调。

轴和 crosshair 共用格式化函数。普通文本使用共享函数，时间格式按语言和粒度复用；只有存在实际别名转换时才生成图例 formatter。别名缓存有容量限制，保存映射快照，不捕获 dataset 或可变的构建上下文。

## 图元样式的组合

`lineStyle`、`areaStyle`、`pointStyle`、`barStyle` 各自负责一种图元的属性映射。共用的 `compileMarkStyles` 只处理样式规则的顺序：数组开头的无条件规则合并为基础 style；从第一个条件规则开始保留有序 state，确保后续全局规则仍可覆盖前面的条件规则。未设置的属性不会抹掉已配置的样式。

全局隐藏点时使用图元级 `visible: false`，避免普通点参与退出动画；`activePoint` 继续提供悬停点。存在条件可见性时保留普通点图元，由条件规则决定每个点是否显示。

曲线差异在 pipeline 组装处决定：直角坐标系使用 `lineStyle` / `areaStyle`，雷达图使用 `radarLineStyle` / `radarAreaStyle`。这些 pipe 由相同的样式编译逻辑与不同的曲线策略组合，不在 pipe 内判断图表类型。
