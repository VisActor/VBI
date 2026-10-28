'use strict'

// UI primitives own markup and disposable effects; feature controllers own their state.
window.DashboardUI = {
  applyTypography(Builder) {
    const fontFamily = getComputedStyle(document.documentElement).getPropertyValue('--font-ui').trim()
    for (const name of ['light', 'dark']) {
      const theme = Builder.getTheme(name)
      Builder.registerTheme(name, {
        ...theme,
        config: Object.fromEntries(
          Object.entries(theme.config).map(([type, config]) => [
            type,
            {
              ...config,
              ...(type === 'table' || type === 'pivotTable'
                ? { bodyFontFamily: fontFamily, headerFontFamily: fontFamily }
                : { fontFamily }),
            },
          ]),
        ),
      })
    }
  },
  scope() {
    const controller = new AbortController(),
      cleanups = []
    return {
      on: (target, type, handler, options = {}) =>
        target.addEventListener(type, handler, {
          ...(typeof options === 'boolean' ? { capture: options } : options),
          signal: controller.signal,
        }),
      add: (...callbacks) => cleanups.push(...callbacks),
      dispose() {
        controller.abort()
        cleanups.splice(0).forEach((cleanup) => cleanup())
      },
    }
  },
  paint(signal) {
    return new Promise((resolve) => {
      let frame
      const finish = () => {
        cancelAnimationFrame(frame)
        signal?.removeEventListener('abort', finish)
        resolve(performance.now())
      }
      if (signal?.aborted) return finish()
      signal?.addEventListener('abort', finish, { once: true })
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(finish)
      })
    })
  },
  delay(milliseconds, signal) {
    if (milliseconds <= 0 || signal?.aborted) return Promise.resolve()
    return new Promise((resolve) => {
      const finish = () => {
        clearTimeout(timer)
        signal?.removeEventListener('abort', finish)
        resolve()
      }
      const timer = setTimeout(finish, milliseconds)
      signal?.addEventListener('abort', finish, { once: true })
    })
  },
  yield(signal) {
    if (signal?.aborted) return Promise.resolve()
    return globalThis.scheduler?.yield ? scheduler.yield() : DashboardUI.delay(1, signal)
  },
  activity({ minimum = 200, change = () => {} } = {}) {
    let current, trigger
    const mark = () => {
      trigger?.setAttribute('data-loading', 'true')
      trigger?.setAttribute('aria-busy', 'true')
    }
    const setTrigger = (control) => {
      if (control === trigger) return
      trigger?.removeAttribute('data-loading')
      trigger?.removeAttribute('aria-busy')
      trigger = control
      if (current) mark()
    }
    const cancel = () => {
      const task = current
      current = undefined
      task?.controller.abort()
      setTrigger(undefined)
      if (task) change(false)
    }
    return {
      setTrigger,
      cancel,
      paint: () => current?.painted || Promise.resolve(),
      start(control = trigger, duration = minimum) {
        const busy = !!current
        current?.controller.abort()
        setTrigger(control)
        const controller = new AbortController()
        const task = { controller, signal: controller.signal, started: performance.now() }
        current = task
        mark()
        if (!busy) change(true)
        task.painted = DashboardUI.paint(task.signal)
        task.finish = async (isCurrent = () => true) => {
          const valid = () => current === task && !task.signal.aborted && isCurrent()
          await task.painted
          if (!valid()) return false
          await DashboardUI.delay(duration - (performance.now() - task.started), task.signal)
          if (!valid()) return false
          cancel()
          return true
        }
        return task
      },
    }
  },
  createAnalysisDialog() {
    const dialog = document.createElement('dialog')
    dialog.className = 'ui-surface--modal ma-dialog'
    dialog.setAttribute('aria-labelledby', 'ma-title')
    dialog.innerHTML = `<div class="ma-global-filters" data-ma="global-filters" role="group" aria-label="全局筛选"></div><div class="ui-surface ma-shell">
      <header class="ma-header"><div><h2 id="ma-title"></h2><p class="ma-scope" data-ma="scope"></p></div><button type="button" class="ui-button ui-icon ma-close" aria-label="关闭指标分析" data-ma="close"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false"><path d="m3 3 10 10m0-10L3 13" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg></button></header>
      <div class="ma-body">
      <p class="ma-feedback" data-ma="feedback" role="status"></p><button type="button" class="ui-button ui-button--filled" data-ma="retry" hidden>重新加载</button>
      <div class="ma-content" data-ma="content" hidden>
        <section class="ma-summary"><div><p class="ma-eyebrow" data-ma="value-label"></p><strong class="ma-value" data-ma="value"></strong></div><p class="ma-finding" data-ma="finding"></p></section>
        <div class="ma-toolbar"><nav class="ma-modes df-segment" aria-label="分析维度" data-ma="modes" data-filter-control="segment"></nav><details class="ma-picker" data-ma="picker" data-filter-control="selector"><summary data-ma="picker-label"><span data-ma="picker-text" data-control-label>选择分组</span><span class="df-chevron" aria-hidden="true"></span></summary><div class="ma-groups" data-ma="groups" data-control-options role="group" aria-label="选择分组查看记录"></div></details></div>
        <section class="ui-surface ui-surface--tile ma-chart-panel"><div class="ma-panel-heading"><h3 data-ma="chart-title"></h3></div><p class="ma-hint" data-ma="chart-hint"></p><div class="ma-chart" data-ma="chart" role="img"></div></section>
        <section class="ui-surface ui-surface--tile ma-table-panel"><div class="ma-panel-heading"><h3>关联明细</h3><button type="button" class="ui-button ui-button--filled" data-ma="expand" aria-expanded="false">展开表格</button></div><p class="ma-hint" data-ma="table-scope" aria-live="polite"></p><div class="ma-table" data-ma="table" role="region" aria-label="分析明细表" tabindex="0"></div></section>
        <details class="ma-definition"><summary>统计口径与依据</summary><p data-ma="definition"></p><p data-ma="evidence"></p><p data-ma="grain"></p></details>
      </div></div></div>`

    return dialog
  },
  createLoading() {
    const template = document.createElement('template')
    template.innerHTML = `<div id="dashboard-loading" class="dashboard-loading" role="status" aria-live="polite">
      <div class="ui-surface ui-surface--static dashboard-loading-card">
        <div class="dashboard-loading-orbit" aria-hidden="true"></div>
        <h2 id="dashboard-loading-title">正在准备看板</h2>
        <p id="dashboard-loading-message">正在加载数据与图表，请稍候…</p>
        <div class="dashboard-loading-track" aria-hidden="true"></div>
        <button id="dashboard-loading-retry" type="button" hidden>重新加载</button>
      </div>
    </div>`
    return template.content.firstElementChild
  },
}
