# Selector 与平铺组件接入

使用模板内的 `dashboard-filters-runtime`（`DashboardFilters`）和 `dashboard-controls-style`，主页与 deep analysis Modal 共享两段实现。独立交付时组件内嵌在同一 HTML 中，统一维护。

## 挂载与业务边界

`DashboardFilters.mount(container)` 挂载容器内的平铺、Selector 与图标控件，返回销毁函数；`motion.bindControls()` 调用该入口。业务代码响应选项按钮的 click、管理 `aria-pressed` 并通过 Builder 更新条件；组件只处理呈现、搜索、展开、焦点与监听，不执行查询或聚合。

```html
<div id="filters">
  <div class="segment" role="group" aria-label="统计周期">
    <button type="button" data-days="7" aria-pressed="false">7 天</button>
    <button type="button" data-days="30" aria-pressed="true">30 天</button>
  </div>
  <div class="segment" data-filter-control="selector" role="group" aria-label="地区">
    <button type="button" data-region="" aria-pressed="true">全部地区</button>
    <button type="button" data-region="华东" aria-pressed="false">华东</button>
  </div>
</div>
```

Selector 标记使原分组转换为 `details + summary`，原选项按钮及其业务数据属性保留。先挂载再绑定业务按钮；不用选项下标替代稳定业务键。已有 `details` 可提供 `[data-control-label]` 和 `[data-control-options]` 接入相同组件，Modal 的 `.ma-picker` 即采用此方式。

图标按钮使用 `.df-icon` 与 `data-filter-control="icon"`，通过同一 mount 复用玻璃底面、指针光泽、hover、按压与减少动态效果；36px 命中区内使用中性次级图标色。调用方管理点击动作、`aria-label` 和展开状态，组件不持有业务条件。

Selector 可通过 `data-menu-min-width` 指定菜单最小宽度，通过 `data-menu-align="start"` 与触发器左侧对齐；默认最小宽度为 280px、右侧对齐，实际尺寸仍受视口约束。列筛选运算符使用 184px 的紧凑菜单，沿用同一组件的搜索、键盘、hover 和生命周期。

动态列表更新后使用 `DashboardFilters.sync(selectorRoot)` 同步标签、搜索结果和选中态；选项的 `aria-pressed` 与内容变化也会被观察。`DashboardFilters.trigger(option)` 返回其可见触发器，使 loading 留在已收起菜单外；触发器的 loading 与箭头共用固定图标位置，加载时替换箭头，结束后恢复，不追加图标或改变控件宽度。退出时执行 mount 返回的销毁函数，释放监听、观察器、过渡与浮层。

## 搜索与选择

- 完整选项列表少于 4 项时隐藏搜索框，达到 4 项才显示；包括“全部”等选项，不能按搜索后的匹配数判断。按完整选项标签匹配；只过滤候选项，不发起查询、不改变已确认值，不截断 Top N 之外的分组。
- 空搜索恢复完整列表，无匹配时显示明确反馈。长选项内部滚动；完整文本保留在标签或 title 中。
- 点击或 Enter / Space 确认选项，确认后收起并归还触发器焦点。搜索框 Enter 可确认首个匹配项，输入法组合期间不提交。
- 无搜索框时打开后聚焦已选项或首个选项；有搜索框时聚焦搜索。ArrowDown / ArrowUp 在可见选项间移动；搜索框可进入选项，Home / End 在选项间定位。保留真实按钮与输入框语义，不只添加 `listbox` / `combobox` 角色名。

## 关闭与边界

Escape 优先关闭菜单，不同时关闭 Modal；外部点击或焦点离开收起且不抢外部焦点。同页一次只打开一个 Selector；重新打开清空搜索，保留已确认值。

菜单使用当前交互层内的 popover，依据视口选择向上或向下展开，调整尺寸或滚动后重新定位；搜索框固定，选项独立滚动。初始禁用、inert、快速选择与 loading 不得绕过宿主状态。关闭不清除业务条件，销毁时解除事件与观察器。

高度、token 与使用边界见[筛选器](filter.md)，实际检查见[验收标准](acceptance.md#可复用筛选组件)。
