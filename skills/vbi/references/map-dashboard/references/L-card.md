# L-Card

参考[地震](../templates/template-earthquakes.html)、[超市](../templates/supermarket/template-supermarket.html)与[电厂](../templates/template-power-plants.html)的卡片实现。

- 左侧指标、底部分析，右上保留连续地图区；容器使用宿主扣除顶栏、页脚后的高度，底栏位置与窄屏重排见[布局](layout.md)。
- 卡片无边框，以渐变反光、磨砂、柔和投影和内侧柔光建立层次；通过 CSS 变量适配主题，保证内容清晰。
- 数据和图表就绪后调用 `reveal()`，首卡等待 380ms，每卡翻转 1600ms、依次展开；左卡绕左边缘、底卡绕下边缘翻开并扫过反光。刷新不重播，减少动态效果时直接显示。
- 左侧按数据源选取关键指标，突出主指标，其余统一排版，完整显示名称、数值、单位与当前范围。
- 每个指标可点击并支持键盘操作，继承当前筛选，以 240ms 动画打开同一对话框；复用 light-dashboard 共用的 [metric-analysis](../../metric-analysis/SKILL.md)，展示发现、主图与 VTable，支持深入、返回和关闭。
- 底卡按问题展示趋势、对比、占比、排行或明细，以一句结论配图表证据；数据不足时展示口径或聚合依据，不补造趋势或比较。
- 下例字段与文本为占位，按真实指标替换 `data-metric` 并挂载图表。宿主通过 `bindLCards` 提供 `readScope`、`renderMetricAnalysis`；分析渲染需响应取消信号并返回清理函数。
- 弹窗打开后再渲染，局部选择不改主页筛选，关闭时取消请求、释放实例并归还焦点。加载失败调用 `finishEntrance()` 并展示错误，页面销毁调用 `destroy()`。

```html
<div class="l-cards" data-scene="pending">
  <aside class="l-card l-metrics" style="--i:0">
    <h2>关键指标</h2>
    <div class="l-metric-list">
      <button type="button" class="l-primary" data-metric="metric-id" aria-haspopup="dialog">
        <span data-metric-label>指标名称 <span aria-hidden="true">↗</span></span>
        <strong>—</strong><small>单位 · 当前范围</small>
      </button>
      <!-- 按数据源复制指标按钮；仅主指标使用 l-primary。 -->
    </div>
  </aside>
  <div class="l-map-slot" aria-hidden="true"></div>
  <article class="l-card" style="--i:1">
    <h3>趋势 / 对比</h3>
    <p>当前范围的变化结论</p>
    <div class="l-plot" data-view="trend"></div>
  </article>
  <article class="l-card" style="--i:2">
    <h3>结构 / 占比</h3>
    <p>主要贡献与差异</p>
    <div class="l-plot" data-view="mix"></div>
  </article>
  <article class="l-card" style="--i:3">
    <h3>明细</h3>
    <p>支撑结论的记录或聚合依据</p>
    <div class="l-plot" data-view="table"></div>
  </article>
</div>
<!-- 放在 L 布局外；已有宿主对话框时复用该结构与类名。 -->
<dialog class="l-analysis" aria-labelledby="l-analysis-title">
  <header class="l-analysis-head">
    <h2 id="l-analysis-title" data-analysis-title>指标分析</h2>
    <form method="dialog"><button type="submit" aria-label="关闭指标分析" autofocus>关闭</button></form>
  </header>
  <p data-analysis-status role="status"></p>
  <div class="l-analysis-body" data-analysis-body></div>
</dialog>
<style>
  .l-cards {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(280px, 340px) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.4fr);
    grid-template-rows: minmax(0, 1fr) 260px;
    gap: 16px;
    height: 100%;
    min-height: 0;
    pointer-events: none;
  }
  .l-card {
    --from: rotateX(82deg);
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;
    min-height: 0;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
    border: 0;
    border-radius: 22px;
    color: var(--l-ink, #e9edf5);
    font: 14px/1.5 system-ui;
    transform-origin: center bottom;
    backface-visibility: hidden;
    pointer-events: auto;
    isolation: isolate;
  }
  .l-card {
    background:
      radial-gradient(ellipse at 0 0, #e3edff26, transparent 65%),
      radial-gradient(ellipse at 100% 100%, #abbcd51a, transparent 62%),
      linear-gradient(155deg, #d9e5f510, #17253b18 48%, #9caac218), var(--l-surface, #13243ac9);
    box-shadow:
      0 18px 48px #02091638,
      0 4px 12px #02091620,
      inset 0 2px 14px #f5f8ff12,
      inset 0 -8px 22px #09162916;
    backdrop-filter: blur(18px) saturate(0.7) brightness(1.08);
    -webkit-backdrop-filter: blur(18px) saturate(0.7) brightness(1.08);
  }
  .l-card::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: inherit;
    background: linear-gradient(115deg, transparent 15%, #ffffff26 45%, transparent 75%);
    opacity: 0;
    pointer-events: none;
  }
  .l-card.l-metrics {
    grid-row: 1/3;
    --from: rotateY(-84deg);
    transform-origin: left center;
  }
  .l-metric-list {
    display: grid;
    gap: 12px;
    min-height: 0;
    overflow: auto;
  }
  .l-map-slot {
    grid-column: 2/-1;
    grid-row: 1;
  }
  .l-card h2,
  .l-card h3,
  .l-card p {
    margin: 0;
  }
  .l-card h2,
  .l-card h3 {
    font-size: 14px;
    font-weight: 500;
  }
  .l-card p {
    font-size: 12px;
    opacity: 0.8;
  }
  .l-plot {
    flex: 1;
    min-height: 0;
    min-width: 0;
  }
  .l-metrics button {
    display: grid;
    gap: 6px;
    width: 100%;
    box-sizing: border-box;
    padding: 16px;
    text-align: left;
    color: inherit;
    font: inherit;
    background: #ffffff08;
    border: 0;
    border-radius: 16px;
    cursor: pointer;
    transition:
      background 200ms,
      box-shadow 200ms;
  }
  .l-metrics strong {
    font-size: 26px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }
  .l-metrics .l-primary strong {
    font-size: 38px;
  }
  .l-metrics small {
    opacity: 0.75;
  }
  .l-metrics button:hover {
    background: #ffffff14;
    box-shadow: inset 0 4px 20px #ffffff08;
  }
  .l-metrics button:focus-visible {
    outline: 2px solid var(--l-accent, #a8cfff);
    outline-offset: -3px;
  }
  .l-cards[data-scene='pending'] > .l-card {
    visibility: hidden;
  }
  .l-cards[data-scene='ready'] > .l-card {
    animation: l-flip 1600ms cubic-bezier(0.2, 0.65, 0.25, 1) calc(380ms + var(--i, 0) * 1600ms) backwards;
  }
  .l-cards[data-scene='ready'] > .l-card::after {
    animation: l-reflection 1600ms ease-out backwards;
    animation-delay: inherit;
  }
  @keyframes l-flip {
    from {
      opacity: 0;
      visibility: hidden;
      transform: perspective(1400px) var(--from);
      clip-path: inset(0 round 22px);
    }
    20% {
      opacity: 1;
    }
    to {
      opacity: 1;
      visibility: visible;
      transform: none;
      clip-path: inset(0 round 22px);
    }
  }
  @keyframes l-reflection {
    from {
      opacity: 0;
      transform: translateX(-35%);
    }
    25% {
      opacity: 0.7;
    }
    to {
      opacity: 0;
      transform: translateX(35%);
    }
  }
  .l-analysis {
    width: min(1120px, calc(100vw - 32px));
    max-height: 90dvh;
    padding: 0;
    box-sizing: border-box;
    overflow: hidden;
    border: 0;
    border-radius: 24px;
    color: var(--l-ink, #e9edf5);
    background: var(--l-surface, #13243af2);
    box-shadow: 0 30px 100px #0006;
  }
  .l-analysis[open] {
    display: flex;
    flex-direction: column;
    animation: l-dialog 240ms ease-out;
  }
  .l-analysis-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px 24px;
    flex-shrink: 0;
  }
  .l-analysis-head h2,
  .l-analysis-head form {
    margin: 0;
  }
  .l-analysis-head h2 {
    font-size: 18px;
  }
  .l-analysis-head button {
    padding: 8px 14px;
    border: 0;
    border-radius: 10px;
    background: #ffffff14;
    color: inherit;
    font: inherit;
    cursor: pointer;
  }
  .l-analysis [data-analysis-status] {
    margin: 0;
    padding: 0 24px;
  }
  .l-analysis-body {
    min-height: 260px;
    min-width: 0;
    overflow: auto;
    padding: 20px 24px 24px;
  }
  .l-analysis::backdrop {
    background: #07101a70;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }
  @keyframes l-dialog {
    from {
      opacity: 0;
      transform: translateY(12px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  @media (max-width: 1000px), (max-height: 650px) {
    .l-cards {
      display: flex;
      flex-direction: column;
      height: auto;
    }
    .l-map-slot {
      order: -1;
      min-height: 340px;
    }
    .l-card {
      min-height: 240px;
      flex-shrink: 0;
    }
    .l-metric-list {
      overflow: visible;
    }
    .l-plot {
      min-height: 200px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .l-cards[data-scene] > .l-card {
      visibility: visible;
      animation: none;
    }
    .l-cards[data-scene] > .l-card::after {
      animation: none;
    }
    .l-metrics button {
      transition: none;
    }
    .l-analysis[open] {
      animation: none;
    }
  }
</style>
<script>
  // 仅负责容器与生命周期；指标口径、查询和深层分析由宿主接入。
  function bindLCards({ root, dialog, readScope, renderMetricAnalysis }) {
    const events = new AbortController()
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    const body = dialog.querySelector('[data-analysis-body]')
    const status = dialog.querySelector('[data-analysis-status]')
    let request, disposeAnalysis, trigger

    function clearAnalysis() {
      request?.abort()
      disposeAnalysis?.()
      disposeAnalysis = undefined
      body.replaceChildren()
    }
    function finishEntrance() {
      root.dataset.scene = 'complete'
    }
    function onMotionChange() {
      if (motion.matches) finishEntrance()
    }
    motion.addEventListener('change', onMotionChange, { signal: events.signal })

    root.addEventListener(
      'click',
      async (event) => {
        const button = event.target.closest('button[data-metric]')
        if (!button || !root.contains(button)) return
        clearAnalysis()
        trigger = button
        request = new AbortController()
        const { signal } = request
        // 每次打开独立挂载节点；关闭后旧请求即使回写也不会覆盖新视图。
        const container = document.createElement('div')
        body.append(container)
        dialog.querySelector('[data-analysis-title]').textContent = button
          .querySelector('[data-metric-label]')
          .textContent.replace('↗', '')
          .trim()
        status.textContent = '加载分析…'
        body.setAttribute('aria-busy', 'true')
        dialog.showModal()
        try {
          const dispose = await renderMetricAnalysis({
            metricId: button.dataset.metric,
            scope: structuredClone(readScope()),
            container,
            signal,
          })
          if (signal.aborted) {
            dispose?.()
            return
          }
          disposeAnalysis = dispose
          status.textContent = ''
        } catch (error) {
          if (!signal.aborted) status.textContent = '分析暂不可用，请关闭后重试。'
        } finally {
          if (!signal.aborted) body.setAttribute('aria-busy', 'false')
        }
      },
      { signal: events.signal },
    )

    dialog.addEventListener(
      'close',
      () => {
        clearAnalysis()
        trigger?.focus({ preventScroll: true })
      },
      { signal: events.signal },
    )

    return {
      reveal() {
        if (root.dataset.scene !== 'pending') return
        root.dataset.scene = motion.matches ? 'complete' : 'ready'
      },
      finishEntrance,
      destroy() {
        events.abort()
        if (dialog.open) dialog.close()
        clearAnalysis()
        finishEntrance()
      },
    }
  }
  // 宿主接入示意：以下两个回调由当前页面的分析模块提供。
  // const cards = bindLCards({
  //   root: document.querySelector('.l-cards'),
  //   dialog: document.querySelector('.l-analysis'),
  //   readScope,
  //   renderMetricAnalysis,
  // });
  // 首次数据与绘图完成：cards.reveal()；加载失败：cards.finishEntrance()。
  // 后续刷新只更新实例；页面销毁：cards.destroy()。
</script>
```
