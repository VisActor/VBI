# Filter 筛选器最佳实践

适用于 visactor-light-dashboard 主页和指标分析面板的地区、周期、类别等筛选组件。**胶囊平铺与定制 Select 是两种标准外观，按选项数量、标签长度和可用空间选择。** UI 负责呈现与操作，用 VBI Builder 修改数据范围，复用图表实例通过 `updateSpec()` 更新，并同步播放指标文本动画。地区与周期组合参考[经营概览模板](../templates/template-business-overview.html)的 `applyFilters()`、`requestRender()`、`draw()`；行业模板的控件配置与条件映射按[模板接入](template-integration.md)查阅。

## 选型与用户动线

| 控件                 | 适用场景                                                                                        | 用户动线                                                                                                             |
| -------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 胶囊平铺 / Segmented | 少量、高频、短标签的互斥选项，通常 2–5 项；例如「全部房贷 / 有 / 无」与「全部个人贷 / 有 / 无」 | 看见当前选项 → 点击整块选项 → 选中态与关联内容更新 → 选择「全部」解除该组限制。                                      |
| 定制 Select          | 选项较多、标签较长，或需要同时展示分组与数值；例如「选择本轮联系次数」                          | 点击文字或右侧箭头 → 展开列表 → 点击整行选项 → 收起列表，显示已选范围并联动内容 → 通过「全部」或可见的清除入口恢复。 |

数量是选型参考，不按固定阈值机械切换。窄屏放不下时优先换行或使用 Select，不能缩小文字与点击区域。多选需明确多选语义和已选数量，不复用单选的自动关闭规则；只有列表确实难以浏览时才增加搜索。

## 视觉标准

24 份模板统一以[仓库履约观察](../templates/template-logistics-fulfillment.html)为基准，实际样式由每份 HTML 的 `dashboard-controls-style` 维护，主页和分析弹窗共用同一套规则。外层为 20px 圆角、3px 内边距和间距、半透明白底及细白边；选中项为 17px 圆角、白底与轻阴影，桌面文字 12px、内边距 7px / 12px。其他模板的业务布局、数据与主题沿用各自配置。

只让本次点击、触发取数的控件在文字右侧显示 loading。图标平时宽度与间距均为 0，点击后用 180ms 平滑展开到 12px 图标及 6px 间距；完成、失败或关闭时收起。连续切换只保留最新控件的状态，菜单选择后的转圈显示在可见触发器上。弹窗不重复显示“正在更新”文字；首次打开、空结果和错误分别提供适合的反馈。减少动态效果时直接切换到最终宽度并停止旋转。

沿用宿主的文字、表面与主题色，以下尺寸为 CSS 像素的起点，不按截图像素直接放大。两种控件在同一工具栏中统一字号、基线和总高度，主标题与指标仍为视觉重心。

| 部位          | 标准外观与尺寸关系                                                                                                                                                                                         |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 平铺容器      | 浅色或半透明白底的整体胶囊，细浅边界；内边距 3–4px，选项间距 3–4px，组间距 8–12px。选项按内容留白，不为「有 / 无」拉出大块空白。                                                                           |
| 平铺选项      | 未选项透明底、次级文字；选中项白色或宿主实色表面、深色文字、轻阴影。整体圆角与内层圆角形成嵌套关系，不给每项重复描边。选中时不改变字重或边框厚度；loading 图标通过短过渡展开和收起，避免突然跳宽。         |
| Select 触发器 | 与胶囊选项一致的 17px 圆角、浅色表面，内边距约 7–10px / 10–14px；短标签加右侧向下图标，间距约 8px。整块可点击，无下划线、无浏览器默认大箭头。                                                              |
| Select 浮层   | 与触发器间隔约 6px，通常右边缘对齐；实色阅读面、1px 浅边框、10–12px 圆角和柔和阴影。起始宽约 280px，按内容调整，不能窄于触发器或超出可用边界。                                                             |
| 选项行        | 整行命中，左对齐，约 8–12px 内边距、7–8px 圆角。可显示「分组 · 数值 单位」，数值来自当前查询范围；无需为每行再加说明或分隔线。hover 用淡灰底，已选项保留稳定底色和选中标记，焦点使用清晰轮廓，三者可区分。 |
| 字号与反馈    | 沿用工具栏字号，通常 12–14px；触屏目标高度至少约 44px。状态切换约 120–180ms，过渡颜色、阴影和轻量透明度；loading 额外平滑展开图标宽度，不缩放工具栏；减少动态效果时关闭过渡。                              |

控件可见高度与命中高度分别处理：桌面紧凑控件可约 30–36px，触屏通过外围留白或独立的内层视觉面提供至少约 44px 的命中区，不必将整块可见底色加高。命中区不能与相邻控件重叠，焦点轮廓和打开浮层的位置仍须清楚。

浮层覆盖在内容上方，打开不挤动图表和 VTable。靠近底部时向上展开，水平方向限制在宿主与视口内；长列表内部滚动。对话框内浮层留在对话框可交互层，不能因挂到 `body` 而落到模态遮罩后方或被设为不可交互。祖先有 `overflow` 或变换时，使用宿主浮层容器或已有定位组件处理裁剪。

## 简约控件与一行布局

- 少量互斥选项使用平铺按钮或分段选择器，例如“全部地区 / 华东 / 华北”“7 天 / 14 天 / 30 天”。多选使用可切换的标签按钮，明确多选语义。避免把未经设计的原生 HTML `select`、文本或日期 `input` 作为默认筛选外观；预设范围能满足任务时不增加输入框。
- 控件使用短标签、轻底色与清楚的选中态，避免每个字段都套标题、边框卡片、说明和独立一行。选项已能表达含义时，省略重复的可见“地区”“周期”标签，通过 `aria-label` 保留分组名称；有歧义时保留必要的短标签。
- 同一作用域的筛选器集中放置，桌面尽量保持一行。模板将地区与周期合并在“经营概览”标题行最右侧，利用标题旁的空余空间，避免分散在品牌行和趋势卡。全局条件统一更新整个看板；确有独立卡片的局部条件时才放到对应卡片旁，避免与全局条件混淆。
- 单个字段选项多时使用定制 Select；筛选字段本身很多时才保留常用字段与紧凑的“更多筛选”入口。当前生效的条件与重置入口应可发现，避免把大量按钮摊成数排。
- 窄屏优先完整标签与可操作性，可以必要换行或进入紧凑弹层；不强制 `nowrap` 造成横向溢出。组件视觉遵循宿主规范，搜索和精确日期确有需要时保留合适的输入能力。

```html
<header class="heading">
  <div>
    <h1>经营概览</h1>
    <p class="scope">当前统计范围</p>
  </div>
  <fieldset class="filter-row" aria-label="全局筛选">
    <div class="segment" role="group" aria-label="地区">
      <button type="button" data-region="" aria-pressed="true">全部地区</button>
      <button type="button" data-region="华东" aria-pressed="false">华东</button>
      <button type="button" data-region="华北" aria-pressed="false">华北</button>
    </div>
    <div class="segment" role="group" aria-label="统计周期">
      <button type="button" data-days="7" aria-pressed="false">7 天</button>
      <button type="button" data-days="14" aria-pressed="false">14 天</button>
      <button type="button" data-days="30" aria-pressed="true">30 天</button>
    </div>
  </fieldset>
</header>
```

```css
.heading {
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-wrap: wrap;
  gap: 20px;
}
.filter-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  min-width: 0;
  margin: 0 0 0 auto;
  padding: 0;
  border: 0;
}
.segment {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 3px;
  padding: 3px;
  border: 1px solid var(--filter-border, #ffffffa0);
  border-radius: 999px;
  background: var(--filter-surface, #ffffff70);
}
.segment button {
  min-height: 32px;
  padding: 7px 12px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--muted);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
  transition:
    background-color 150ms,
    color 150ms,
    box-shadow 150ms;
}
.segment button:not([aria-pressed='true']):not(:disabled):hover {
  background: #ffffff80;
  color: var(--ink);
}
.segment button[aria-pressed='true'] {
  background: var(--filter-active, #fff);
  color: var(--ink);
  box-shadow: 0 2px 5px #2436440a;
}
.segment button:focus-visible {
  outline: 2px solid #6c8eb5;
  outline-offset: 3px;
}
.segment button:disabled {
  cursor: wait;
  opacity: 0.6;
}
@media (pointer: coarse) {
  .segment button {
    min-height: 44px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .segment button {
    transition: none;
  }
}
```

此片段沿用模板的颜色变量，将两个全局筛选分组放在同一标题行右侧；空间不足时整个筛选区换到下一行，仍尽量让两个分组并排。按钮保留 `type="button"`、`aria-pressed`、Tab / Enter 操作与可见焦点，首次初始化时可禁用所在 `fieldset`，后续筛选等待保留操作并显示更新状态。每个单选分组切换后只有一个按钮选中；默认选项从当前 DSL 读取，只有新建配置才采用演示默认值。

## Select 实现与状态

轻量单文件 HTML 使用 `details + summary + button` 实现紧凑选择浮层，参考 [Select 实现](filter-select.md)；已有宿主组件时优先复用同等视觉与交互的可访问组件。`summary` 负责展开，选项是真实按钮，用 `aria-pressed` 表达已选状态。这个方案是披露式选择器，不伪装为缺少完整键盘行为的 `combobox` / `listbox`。

- 触发器可显示当前选项；指标分析面板若旁边已有稳定的「维度：选项」与清除入口，可保留「选择维度」短标签，避免重复信息。列表内仍标出已选项。
- hover 与键盘移动焦点只定位，不提交筛选。点击或 Enter / Space 确认后收起并归还触发器焦点；Escape 只关闭当前浮层，不能同时关闭外层分析对话框。点外部或焦点离开时收起，不抢回外部目标的焦点。同一作用域一次只开一个选择浮层。
- 平铺与 Select 读写同一状态，图表点选后也同步选项和范围。普通单选重复选择当前项不重复查询；分析场景若约定再次选择取消，应与图表行为一致，并保留明确清除入口。
- 加载时保留原有内容，控件仅为右侧 loading 图标平滑展开；失败不把旧数据标成新选择。空列表保留短状态，失效选项按当前范围重置并同步查询，不能留一个已不存在的值。动态选项用 `textContent` 写入标签；选项数值来自完整有效范围，不由可见行估算。

## 轻量筛选的作用范围

条件 ID、`whereFilter` / `havingFilter`、事务与恢复后的控件初始化统一按 [visual-query 的筛选规则](../../../references/visual-query/references/composition.md#筛选规则先于事件回调)。本场景的地区控件只拥有地区条件，“全部地区”解除该条件，保留消费者占比等查询自有条件。

全局筛选需更新其作用域内的汇总、趋势、分组明细、占比分子与分母，以及比较周期查询。地区等条件在本期与前期保持一致；日期分别使用本期和此前等长区间，不能把同一日期范围直接套给前期查询。历史数据以已确认的数据最新日期为默认截止日，N 天范围包含首尾；模板的每日联动索引额外查询前一天，用于单日比较，不计入本期汇总。

| 交互               | 更新范围与状态归属                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| 全局筛选           | 更新相关 Chart Builder，汇总、图形、明细与 Insight 使用一致口径；可恢复条件保存在 DSL。                                  |
| 独立卡片局部筛选   | 只修改该卡拥有的 Builder 与比较查询，不影响无关卡片。                                                                    |
| 图表悬停或逐日查看 | 从已查询的日期索引读取临时值，主图联动全部指标、小图只联动自身；不逐次查询、不覆盖区间 Insight，退出恢复相同作用域汇总。 |

## 联动更新与双重动画

刷新订阅、请求版本、取消与实例复用按 [共享刷新流程](../../../references/visual-query/references/composition.md#刷新订阅与生命周期)执行，模板函数入口为 `requestRender()` / `renderLoop()` / `draw()`。生成 Spec 时开启约 **600ms** 的更新过渡，不能调用了 `updateSpec()` 却关闭动画。

以下为传入 VSeed `Builder.from()` 的更新动画配置，完整构建与复用实例代码见[HTML 接入](../../../references/visual-query/references/query-and-render.md#渲染实例与空结果)及示例 `draw()`：

```javascript
const animation = {
  enable: !reducedMotion.matches,
  params: {
    appear: { enable: false },
    update: { enable: true, duration: 600, ease: 'cubicInOut' },
  },
}
```

**图表与指标文本都必须更新动画。** 同一轮有效查询结果同时驱动图形与销售额、增长率、订单、利润、占比及辅助数字。文本使用示例 `animateMetric()`，约 600ms 缓和插值，保留金额、整数、百分比与正负号；连续更新取消旧帧，从当前显示值接续，最终精确落到真实值。首次显示直接使用真实结果；空值、零分母和无可比基期展示缺省或说明，不从虚构零值动画。数值插值仅影响展示，计算、Tooltip、导出与 Insight 使用查询结果，详见[指标文本更新动画](metric-card.md#指标文本更新动画)。

本场景在查询期间保持卡片尺寸与明细展开状态，刷新完成后恢复区间汇总；不重播首次入场。加载、失败、空结果与清理按共享流程执行，减少动态效果模式立即呈现真实数值并关闭图表动画。

## 验收

- 桌面同一作用域的筛选集中在页面标题最右侧，尽量一行；平铺与 Select 符合上述视觉关系，无重复标签或默认原生表单外观。390px 下标签、点击区域与焦点完整，没有横向溢出。
- 验证 Select 整行选择、hover 不提交、已选状态、外部点击、Escape、Tab 与触屏；浮层靠近边缘时不裁切、不挤动内容，长列表内部滚动。键盘关闭列表不误关外层对话框。
- 切换周期和地区，相关汇总、图表、明细、比较基准与 Insight 口径一致；选择“全部”只解除自身限制，消费者等其他条件仍存在。恢复 DSL 后控件与查询一致。
- 确认 VChart 实例与 Canvas 复用、调用 `updateSpec()`；记录更新前、更新中与稳定后的图形或数值，证明图表和文本都有过渡，稳定值符合预期。截图不能单独证明动画。
- 连续变更、加载失败、空结果、零基期及减少动态效果模式符合上述行为；筛选后无旧悬停值回写，局部交互不增加查询次数，明细展开状态保持。

首次生成时按[验收标准](acceptance.md)核对筛选器展示与交互，无需额外增加常驻调试面板。
