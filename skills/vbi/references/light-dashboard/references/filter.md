# Filter 筛选器最佳实践

适用于 VBI Dashboard 的地区、周期、类别等筛选组件。**保持简约，少量选项优先平铺，桌面尽量一行完成；用 VBI Builder 修改数据范围，复用图表实例通过 `updateSpec()` 更新，并同步播放指标文本动画。** 参考[完整轻量看板](../templates/example.html)的周期按钮、`setPeriod()`、`applyPeriod()`、`requestRender()` 和 `draw()`；地区与周期组合见[精简模板](../templates/template-business-overview.html)的 `applyFilters()`。

## 简约控件与一行布局

- 少量互斥选项使用平铺按钮或分段选择器，例如“全部地区 / 华东 / 华北”“7 天 / 14 天 / 30 天”。多选使用可切换的标签按钮，明确多选语义。避免把未经设计的原生 HTML `select`、文本或日期 `input` 作为默认筛选外观；预设范围能满足任务时不增加输入框。
- 控件使用短标签、轻底色与清楚的选中态，避免每个字段都套标题、边框卡片、说明和独立一行。选项已能表达含义时，省略重复的可见“地区”“周期”标签，通过 `aria-label` 保留分组名称；有歧义时保留必要的短标签。
- 同一作用域的筛选器集中放置，桌面尽量保持一行。模板将地区与周期合并在“经营概览”标题行最右侧，利用标题旁的空余空间，避免分散在品牌行和趋势卡。全局条件统一更新整个看板；确有独立卡片的局部条件时才放到对应卡片旁，避免与全局条件混淆。
- 选项多时，保留常用选项与紧凑的“更多筛选”入口，展开后提供经过设计的搜索、多选或日期范围组件；当前生效的条件与重置入口应可发现。避免把大量按钮摊成数排，也不为凑一行缩小文字、压缩点击区域或隐藏当前选择。
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
  border-radius: 20px;
  background: #edf1f4;
}
.segment button {
  padding: 7px 12px;
  border: 0;
  border-radius: 17px;
  background: transparent;
  color: var(--muted);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}
.segment button[aria-pressed='true'] {
  background: #fff;
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
```

此片段沿用模板的颜色变量，将两个全局筛选分组放在同一标题行右侧；空间不足时整个筛选区换到下一行，仍尽量让两个分组并排。按钮保留 `type="button"`、`aria-pressed`、Tab / Enter 操作与可见焦点，加载时可禁用所在 `fieldset`。每个单选分组切换后只有一个按钮选中；默认选项从当前 DSL 读取，只有新建配置才采用演示默认值。

## 轻量筛选的作用范围

条件 ID、`whereFilter` / `havingFilter`、事务与恢复后的控件初始化统一按 [visual-query 的筛选规则](../../visual-query/references/composition.md#筛选规则先于事件回调)。本场景的地区控件只拥有地区条件，“全部地区”解除该条件，保留消费者占比等查询自有条件。

全局筛选需更新其作用域内的汇总、趋势、分组明细、占比分子与分母，以及比较周期查询。地区等条件在本期与前期保持一致；日期分别使用本期和此前等长区间，不能把同一日期范围直接套给前期查询。历史数据以已确认的数据最新日期为默认截止日，N 天范围包含首尾；模板的每日联动索引额外查询前一天，用于单日比较，不计入本期汇总。

| 交互               | 更新范围与状态归属                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| 全局筛选           | 更新相关 Chart Builder，汇总、图形、明细与 Insight 使用一致口径；可恢复条件保存在 DSL。                                  |
| 独立卡片局部筛选   | 只修改该卡拥有的 Builder 与比较查询，不影响无关卡片。                                                                    |
| 图表悬停或逐日查看 | 从已查询的日期索引读取临时值，主图联动全部指标、小图只联动自身；不逐次查询、不覆盖区间 Insight，退出恢复相同作用域汇总。 |

## 联动更新与双重动画

刷新订阅、请求版本、取消与实例复用按 [共享刷新流程](../../visual-query/references/composition.md#刷新订阅与生命周期)执行，模板函数入口为 `requestRender()` / `renderLoop()` / `draw()`。生成 Spec 时开启约 **600ms** 的更新过渡，不能调用了 `updateSpec()` 却关闭动画。

以下为传入 VSeed `Builder.from()` 的更新动画配置，完整构建与复用实例代码见[HTML 接入](../../visual-query/references/query-and-render.md#渲染实例与空结果)及示例 `draw()`：

```javascript
const animation = {
  enable: !reducedMotion.matches,
  params: {
    appear: { enable: false },
    update: { enable: true, duration: 600, ease: 'cubicInOut' },
  },
}
```

**图表与指标文本都必须更新动画。** 同一轮有效查询结果同时驱动图形与销售额、增长率、订单、利润、占比及辅助数字。文本使用示例 `animateMetric()`，约 600ms 缓和插值，保留金额、整数、百分比与正负号；连续更新取消旧帧，从当前显示值接续，最终精确落到真实值。首次显示直接使用真实结果；空值、零分母和无可比基期展示缺省或说明，不从虚构零值动画。数值插值仅影响展示，计算、Tooltip、导出与 Insight 使用查询结果，详见[指标文本更新动画](./metric-card.md#指标文本更新动画)。

本场景在查询期间保持卡片尺寸与明细展开状态，刷新完成后恢复区间汇总；不重播首次入场。加载、失败、空结果与清理按共享流程执行，减少动态效果模式立即呈现真实数值并关闭图表动画。

## 验收

- 桌面同一作用域的筛选集中在页面标题最右侧，尽量一行，标题和主指标仍是视觉重心；无重复标签、默认原生 `select` / `input` 外观或多排表单。390px 下标签、点击区域与焦点完整，没有横向溢出。
- 切换周期和地区，相关汇总、图表、明细、比较基准与 Insight 口径一致；选择“全部”只解除自身限制，消费者等其他条件仍存在。恢复 DSL 后控件与查询一致。
- 确认 VChart 实例与 Canvas 复用、调用 `updateSpec()`；记录更新前、更新中与稳定后的图形或数值，证明图表和文本都有过渡，稳定值符合预期。截图不能单独证明动画。
- 连续变更、加载失败、空结果、零基期及减少动态效果模式符合上述行为；筛选后无旧悬停值回写，局部交互不增加查询次数，明细展开状态保持。

布局对照与证据记录沿用[截图对照验收](./visual-acceptance.md)，无需额外增加常驻调试面板。
