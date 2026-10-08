# 配色与背景最佳实践

适用于轻量 Dashboard、指标卡和趋势图。以[轻量看板示例](../../examples/dashboard/lightweight-dashboard.html)的八种配色、颜色选择器和玻璃透光背景为参考。本文集中维护色板、颜色变量和背景实现；布局与入场动效见[设计与布局最佳实践](./design-and-layout.md)，迷你图与指标联动见[指标卡最佳实践](./metric-card.md)。

## 参考色板

保留默认薄荷绿，另提供七种柔和参考色。色号作为强调色的输入，浅背景、图标底色和辅助色由它派生；无需为每个预设分别维护整套样式。这些颜色是参考起点，可按品牌和用户要求替换。

| 配色           | 色号      | 适合的视觉气质                       |
| -------------- | --------- | ------------------------------------ |
| 薄荷绿（默认） | `#16C99E` | 清爽、轻盈，强调趋势与选中状态。     |
| 雾玫粉         | `#D8B4B6` | 温柔、安静，适合柔和的经营概览。     |
| 海盐蓝         | `#AFCBDA` | 清透、宁静，适合信息密度较低的看板。 |
| 森雾青         | `#7FA69A` | 自然、沉稳，带森林与雾气的感觉。     |
| 薰衣紫         | `#B9AFD8` | 柔软、静谧，适合轻盈通透的界面。     |
| 杏桃橙         | `#F0C4A8` | 温暖、明亮，适合带日光感的界面。     |
| 竹月青         | `#89A8A0` | 清雅、平和，适合克制的中性界面。     |
| 晴空蓝         | `#A8C7E8` | 清朗、开阔，适合轻快的趋势展示。     |

一个 Dashboard 每次选择一个强调色，统一用于主要系列、选中控件和重点图标；通过明暗和透明度建立层级。两种背景色负责营造氛围，不为每张卡片另分配一种系列色。辅助图标和环图的浅色部分来自同一套派生规则。

颜色不能单独承担信息表达。下降、亏损和选中状态同时通过箭头、数值、位置或文字表达；本示例的下降指标与亏损柱保留语义红 `#D47C6A`，不会跟随强调色切换。

## 统一颜色变量

页面使用 CSS 变量，图表使用同一次选择生成的 `palette`。避免只更新 DOM 样式而遗漏 Canvas 图表，也避免在折线、面积、柱体和环图中各自写死主色。

以下为默认颜色变量。中性色供布局文档复用；`--background-end` 与 `--light-edge` 保留淡紫与白光边缘，切换预设时只改变背景的主色端，保持两色自然融合。

```css
:root {
  --ink: #28333e;
  --muted: #64717e;
  --surface: #fff;
  --border: #e5eaee;
  --accent: #16c99e;
  --accent-ink: #16c99e;
  --accent-soft: #e0f9f1;
  --secondary: #5c90d6;
  --secondary-soft: #e7effc;
  --brand-color: #283d3a;
  --background-base: #edf2f1;
  --background-start: #c7e9df;
  --background-end: #ddd6ed;
  --light-edge: #eee7f833;
}
```

下面将示例 `selectPalette()` 内的派生逻辑提取为纯函数。`mixColor()` 接收六位十六进制色号，`weight` 表示目标色的混合比例：文字强调色略混入深色，图标底色与环图底色混入白色，页面背景只保留少量主色。参考色较浅时，应复核细线、重点文字和选中边框的可读性，可调整其深浅，而不是把整个背景加深。

```javascript
function mixColor(color, target, weight) {
  return (
    '#' +
    [1, 3, 5]
      .map((offset) => {
        const from = parseInt(color.slice(offset, offset + 2), 16)
        const to = parseInt(target.slice(offset, offset + 2), 16)
        return Math.round(from + (to - from) * weight)
          .toString(16)
          .padStart(2, '0')
      })
      .join('')
  )
}

function createPalette(color) {
  const secondary = mixColor(color, '#B9AFD8', 0.6)
  return {
    accent: color,
    ring: mixColor(color, '#FFFFFF', 0.25),
    ringTrack: mixColor(color, '#FFFFFF', 0.75),
    tokens: {
      '--accent': color,
      '--accent-ink': mixColor(color, '#28333E', 0.22),
      '--accent-soft': mixColor(color, '#FFFFFF', 0.88),
      '--secondary': mixColor(secondary, '#28333E', 0.1),
      '--secondary-soft': mixColor(secondary, '#FFFFFF', 0.88),
      '--brand-color': mixColor(color, '#28333E', 0.8),
      '--background-base': mixColor(color, '#F3F4F6', 0.96),
      '--background-start': mixColor(color, '#EDF2F1', 0.74),
    },
  }
}
```

这些比例服务于当前参考效果，不是所有主题的固定标准。初始化和切回默认色都使用同一派生函数，避免首次显示与再次选中默认色时得到两套不同的颜色。

## 大面积模糊渐变与柔白斜光

背景采用两种协调的低饱和色，大面积模糊、自然融合；柔白光从左上斜穿至右下，像阳光透过毛玻璃，边缘柔化并带轻微散射。默认组合为薄荷与淡紫，不再叠加大面积暖黄、雾蓝等第三种色块。光束保持柔白，不随强调色染色。

使用 `body::before` 绘制底层渐变，`body::after` 绘制白色斜光。以下样式与颜色变量组合使用：

```css
body {
  position: relative;
  min-height: 100svh;
  isolation: isolate;
  margin: 0;
  color: var(--ink);
  background: var(--background-base);
}

body::before,
body::after {
  content: '';
  position: fixed;
  pointer-events: none;
}

body::before {
  z-index: -2;
  inset: -18%;
  background:
    radial-gradient(ellipse at 14% 22%, var(--background-start) 0%, transparent 62%),
    radial-gradient(ellipse at 88% 78%, var(--background-end) 0%, transparent 64%);
  filter: blur(64px);
}

body::after {
  z-index: -1;
  inset: -10%;
  background:
    radial-gradient(ellipse at 24% 0%, #ffffffb3 0%, #ffffff00 48%),
    linear-gradient(
      52deg,
      #ffffff00 32%,
      #ffffff14 38%,
      #ffffff70 43%,
      #ffffffd9 46%,
      #ffffff80 49%,
      var(--light-edge) 54%,
      transparent 61%
    );
  filter: blur(18px);
}
```

`isolation: isolate` 将负层级背景留在页面的独立堆叠上下文中；两层伪元素位于内容下方，`pointer-events: none` 保证点击与悬停命中控件和图表。负 `inset` 为模糊边缘预留空间，滚动时背景保持固定。只模糊背景层，不对卡片或 Content 应用 `filter`，保持文字和图表清晰。渐变位置、带宽与模糊半径可按容器比例调整，最终检查光束确实从左上延伸到右下。

## 图表配色与页面同步

在 VBI 的 `buildVSeed()` 返回结果上补充视觉属性，再经 VSeed `Builder` 构建 Spec。保持查询结果、字段 ID、统计周期和实例绑定，按图表类型消费同一个 `palette`：

| 图形       | VSeed 配置                                                  | 颜色来源                                              |
| ---------- | ----------------------------------------------------------- | ----------------------------------------------------- |
| 系列与折线 | `color.colorScheme`、需要显式覆盖时的 `lineStyle.lineColor` | `palette.accent`                                      |
| 面积填充   | `areaStyle.areaColor` 与 `areaColorOpacity`                 | 强调色与低透明度，渐变可按图形需要开启。              |
| 正值柱体   | `barStyle.barColor` 与 `barColorOpacity`                    | 强调色与适度透明度。                                  |
| 亏损柱体   | 负值 selector 的 `barColor`                                 | 固定语义红，不跟随预设变化。                          |
| 两分类环图 | `color.colorScheme`                                         | `palette.ring` 与 `palette.ringTrack`，保持分类顺序。 |

例如利润柱图，`seed` 为已有查询结果，保留零基线与负值：

```javascript
const valueId = seed.measures[0].id
seed.backgroundColor = 'transparent'
seed.color = { colorScheme: [palette.accent] }
seed.barStyle = [
  { barRadius: 2, barColor: palette.accent, barColorOpacity: 0.68, barGradient: false, barBorderWidth: 0 },
  {
    selector: { field: valueId, operator: '<', value: 0 },
    barColor: '#D47C6A',
    barGradient: false,
    barBorderWidth: 0,
  },
]
const spec = Builder.from(seed).build()
await instance.updateSpec(spec)
```

主题切换复用已有 VChart 实例，通过 `updateSpec()` 更新；不要通过 CSS 给 Canvas 加滤镜来替代真实系列色。数值过渡、图表动画和悬停联动继续按指标卡文档处理。

示例中的色点属于当前页面的配色预览状态。需要保存、恢复或跨集成复用的主题配置，应由拥有它的 DSL 与公开 Builder 管理，不能只保存在 DOM 或浏览器本地存储中；相关接口见 [VBI ThemeBuilder](../api/vbi/chart-builder.md#themebuilder) 与 [VSeed 主题](../api/vseed/theme.md)。页面背景、控件样式和具体绘制仍由 UI 消费这些配置。

## 简洁的颜色选择器

使用一排小色点，选中项显示外圈与中心标记，旁边或下方显示色名和色号。桌面可放在标题旁，窄屏换到标题下方。保留可见的键盘焦点；每个按钮提供 `aria-label`，选中状态使用 `aria-pressed`，同一时刻只有一个预设处于选中状态。

下面展示两个预设的结构；完整八色按钮及 `.color-picker` 样式见轻量看板示例。色号与名称由按钮数据提供，事件读取这些值，不另外维护一份选项映射。

```html
<fieldset class="color-picker" aria-label="选择页面配色">
  <button
    type="button"
    data-color="#16C99E"
    data-name="薄荷绿"
    style="--swatch: #16c99e"
    aria-label="薄荷绿 #16C99E"
    title="薄荷绿 #16C99E"
    aria-pressed="true"
  ></button>
  <button
    type="button"
    data-color="#D8B4B6"
    data-name="雾玫粉"
    style="--swatch: #d8b4b6"
    aria-label="雾玫粉 #D8B4B6"
    title="雾玫粉 #D8B4B6"
    aria-pressed="false"
  ></button>
</fieldset>
<output id="palette-label" aria-live="polite">薄荷绿 · #16C99E</output>
```

沿用示例的 `requestRender()` 刷新队列，避免切换配色与统计周期时出现旧结果覆盖。初始化先应用选中预设，再构建图表；点击已选中的颜色无需重复刷新。

```javascript
const picker = document.querySelector('.color-picker')
const paletteLabel = document.querySelector('#palette-label')
let palette
function selectPalette(button) {
  palette = createPalette(button.dataset.color)
  for (const [name, value] of Object.entries(palette.tokens)) {
    document.documentElement.style.setProperty(name, value)
  }
  picker.querySelectorAll('[data-color]').forEach((option) => {
    option.setAttribute('aria-pressed', String(option === button))
  })
  paletteLabel.textContent = `${button.dataset.name} · ${button.dataset.color}`
}
selectPalette(picker.querySelector('[aria-pressed="true"]'))
picker.querySelectorAll('[data-color]').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.getAttribute('aria-pressed') === 'true') return
    selectPalette(button)
    requestRender()
  })
})
```

页面使用多个 `fieldset` 时，加载和恢复控件状态应覆盖全部相关控件，不依赖 `querySelector('fieldset')` 恰好命中统计周期。配色刷新不修改日期筛选、汇总算法、环图分类含义或区域明细口径。

## 可复用 Prompt 与验收

> 优化仪表盘配色与背景：使用一个统一强调色，参考薄荷绿、雾玫粉、海盐蓝、森雾青、薰衣紫、杏桃橙、竹月青或晴空蓝。以两种协调的低饱和色做大面积柔和模糊渐变；一束柔白光从左上穿至右下，像阳光透过毛玻璃。用简洁色点同步切换背景、图标和图表，显示色名与色号，保留现有布局、统计口径与交互。

- 逐一切换八种预设，色名、色号、背景、图标、系列色和环图同时对应当前选择；配色动画结束后检查最终颜色。
- 相同统计周期下切换配色，销售额、订单数、利润、环图占比与区域明细保持一致；再切换 30 → 12 → 7 → 30 天核对数据范围。
- 仅一项选中，Tab 能到达色点，Enter / Space 可选择；焦点可见，加载结束后全部相关控件恢复可用。
- 检查 375px / 390px 窄屏与桌面，选择器不横向溢出，不挤压标题和卡片；文字、细线与选中状态可辨认。
- 柔白光从左上到右下，只有背景被模糊；装饰层不遮挡点击、Tooltip、悬停联动或卡片倾斜。
