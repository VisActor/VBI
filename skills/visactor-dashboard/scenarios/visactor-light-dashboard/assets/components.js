'use strict'

// dashboard-filters-runtime
// Shared by the page and deep analysis. Business values and queries remain with the caller.
window.DashboardFilters = (() => {
  const instances = new WeakMap(),
    selectors = new Set()
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
  let sequence = 0
  const text = (node) => node.textContent.trim()
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)')
  function bindLight(root, { on, add }) {
    let frame = 0,
      active,
      pending
    function clear() {
      cancelAnimationFrame(frame)
      frame = 0
      active?.style.removeProperty('--df-light-x')
      active?.style.removeProperty('--df-light-y')
      active = pending = undefined
    }
    on(
      root,
      'pointermove',
      (event) => {
        if (!finePointer.matches || reducedMotion.matches) return
        const target = event.target.closest('.df-segment button, .df-selector > summary, .df-icon')
        if (!target || !root.contains(target)) return clear()
        pending = { target, x: event.clientX, y: event.clientY }
        if (frame) return
        frame = requestAnimationFrame(() => {
          frame = 0
          const point = pending
          if (!point?.target.isConnected) return clear()
          if (active !== point.target) {
            active?.style.removeProperty('--df-light-x')
            active?.style.removeProperty('--df-light-y')
          }
          active = point.target
          const box = active.getBoundingClientRect()
          if (!box.width || !box.height) return
          active.style.setProperty(
            '--df-light-x',
            `${Math.max(0, Math.min(100, ((point.x - box.left) / box.width) * 100))}%`,
          )
          active.style.setProperty(
            '--df-light-y',
            `${Math.max(0, Math.min(100, ((point.y - box.top) / box.height) * 100))}%`,
          )
        })
      },
      { passive: true },
    )
    on(root, 'pointerleave', clear)
    on(reducedMotion, 'change', clear)
    add(clear)
  }
  function segment(group) {
    const controller = DashboardUI.scope(),
      { on } = controller
    group.classList.add('df-segment', 'ui-control')
    bindLight(group, controller)
    const indicator = document.createElement('span')
    indicator.className = 'segment-indicator'
    indicator.setAttribute('aria-hidden', 'true')
    group.dataset.glass = 'true'
    let animation
    function sync() {
      group.querySelectorAll('button').forEach((node) => node.classList.add('ui-button', 'df-button'))
      const next = group.querySelector('button[aria-pressed="true"]')
      if (indicator.parentElement === next) return
      const from = indicator.isConnected && !reducedMotion.matches && indicator.getBoundingClientRect()
      animation?.cancel()
      if (!next) return indicator.remove()
      const to = next.getBoundingClientRect()
      next.prepend(indicator)
      if (!from?.width || !to.width || !to.height) return
      animation = indicator.animate(
        [
          {
            transform: `translate(${from.x - to.x}px, ${from.y - to.y}px) scale(${from.width / to.width}, ${from.height / to.height})`,
          },
          { transform: 'none' },
        ],
        { duration: 240, easing: 'cubic-bezier(.22,1,.36,1)' },
      )
    }
    const observer = new MutationObserver(sync)
    observer.observe(group, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['aria-pressed'],
    })
    on(reducedMotion, 'change', () => {
      if (reducedMotion.matches) animation?.cancel()
    })
    sync()
    return {
      sync,
      dispose() {
        controller.dispose()
        observer.disconnect()
        animation?.cancel()
        indicator.remove()
        delete group.dataset.glass
        instances.delete(group)
      },
    }
  }
  function selector(source) {
    let root = source
    if (root.tagName !== 'DETAILS') {
      root = document.createElement('details')
      for (const attribute of source.attributes) root.setAttribute(attribute.name, attribute.value)
      const summary = document.createElement('summary'),
        label = document.createElement('span')
      label.dataset.controlLabel = ''
      summary.append(label)
      const options = document.createElement('div')
      options.dataset.controlOptions = ''
      options.append(...source.children)
      root.append(summary, options)
      source.replaceWith(root)
    }
    root.classList.remove('df-segment')
    root.classList.add('df-selector')
    const controller = DashboardUI.scope(),
      { on } = controller
    const trigger = root.querySelector('summary')
    trigger.classList.add('ui-button', 'ui-control', 'df-trigger')
    const label = trigger.querySelector('[data-control-label]')
    const chevron = trigger.querySelector('.df-chevron') || document.createElement('span')
    chevron.className = 'df-chevron'
    chevron.removeAttribute('aria-hidden')
    chevron.innerHTML =
      '<svg viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false"><path d="m3 4.5 3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    const clearButton = document.createElement('button')
    clearButton.type = 'button'
    clearButton.className = 'df-clear'
    clearButton.hidden = true
    clearButton.innerHTML =
      '<svg viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false"><path d="m3 3 6 6m0-6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
    chevron.append(clearButton)
    trigger.append(chevron)
    bindLight(root, controller)
    const options = root.querySelector('[data-control-options]')
    const name = root.getAttribute('aria-label') || options.getAttribute('aria-label') || '筛选'
    clearButton.setAttribute('aria-label', `清除${name}选择`)
    clearButton.title = `清除${name}选择`
    const panel = document.createElement('div'),
      search = document.createElement('input'),
      empty = document.createElement('p')
    panel.className = 'ui-surface ui-surface--overlay df-menu'
    panel.id = `dashboard-filter-menu-${++sequence}`
    panel.setAttribute('popover', 'manual')
    panel.setAttribute('role', 'group')
    panel.setAttribute('aria-label', `${name}选项`)
    panel.hidden = true
    search.type = 'search'
    search.className = 'ui-input df-search'
    search.placeholder = '搜索选项'
    search.setAttribute('aria-label', `搜索${name}`)
    search.autocomplete = 'off'
    empty.className = 'df-empty'
    empty.textContent = '没有匹配的选项'
    empty.setAttribute('role', 'status')
    empty.hidden = true
    options.classList.add('df-options')
    panel.append(search, options, empty)
    root.append(panel)
    trigger.setAttribute('aria-controls', panel.id)
    trigger.setAttribute('aria-expanded', 'false')
    let expanded = false,
      disposed = false,
      closing = false,
      panelMotion,
      motionVersion = 0
    const choices = () => [...options.querySelectorAll('button')]
    const visible = () => choices().filter((button) => !button.hidden && !button.disabled)
    function clearChoice() {
      const buttons = choices()
      const selected = buttons.find((button) => button.getAttribute('aria-pressed') === 'true')
      if (!selected) return
      const reset = buttons.find((button) => button.hasAttribute('data-clear-option'))
      if (reset === selected) return
      const target = reset || (root.hasAttribute('data-clear-selected') ? selected : undefined)
      return target?.disabled ? undefined : target
    }
    function filter() {
      const buttons = choices(),
        searchFocused = document.activeElement === search
      search.hidden = buttons.length < 4
      if (search.hidden) search.value = ''
      const query = search.value.trim().toLocaleLowerCase()
      for (const button of buttons) {
        const value = text(button)
        button.classList.add('ui-button', 'df-option')
        button.title = value
        button.hidden = !value.toLocaleLowerCase().includes(query)
      }
      const available = buttons.filter((button) => !button.hidden && !button.disabled)
      empty.hidden = available.length > 0
      if (expanded && search.hidden && searchFocused)
        (available.find((button) => button.getAttribute('aria-pressed') === 'true') || available[0] || trigger).focus({
          preventScroll: true,
        })
    }
    function position() {
      if (!expanded) return
      const rect = trigger.getBoundingClientRect(),
        gap = 8,
        edge = 12
      const width = Math.min(Math.max(rect.width, Number(root.dataset.menuMinWidth) || 280), innerWidth - edge * 2)
      const below = innerHeight - rect.bottom - edge - gap,
        above = rect.top - edge - gap
      const down = below >= 240 || below >= above
      const height = Math.min(320, Math.max(100, down ? below : above))
      panel.style.width = `${width}px`
      panel.style.maxHeight = `${height}px`
      const preferredLeft = root.dataset.menuAlign === 'start' ? rect.left : rect.right - width
      panel.style.left = `${Math.max(edge, Math.min(preferredLeft, innerWidth - width - edge))}px`
      panel.style.top = `${down ? rect.bottom + gap : Math.max(edge, rect.top - gap - Math.min(panel.scrollHeight, height))}px`
      const left = parseFloat(panel.style.left)
      panel.style.setProperty(
        '--df-menu-origin',
        `${Math.max(12, Math.min(width - 12, rect.left + rect.width / 2 - left))}px ${down ? 'top' : 'bottom'}`,
      )
      panel.style.setProperty('--df-reveal-y', down ? '-4px' : '4px')
    }
    function setOpen(open, restoreFocus = false, immediate = false) {
      if (disposed || (open && root.closest('fieldset[disabled], [inert]'))) return
      if (expanded === open && !closing) return
      const ticket = ++motionVersion
      const showing = panel.matches(':popover-open')
      const current = showing
        ? { opacity: getComputedStyle(panel).opacity, transform: getComputedStyle(panel).transform }
        : undefined
      panelMotion?.cancel()
      panelMotion = undefined
      expanded = open
      closing = !open
      panel.inert = !open
      trigger.setAttribute('aria-expanded', String(open))
      if (open) {
        root.open = true
        delete panel.dataset.closing
        for (const other of selectors) if (other !== api) other.close()
        search.value = ''
        filter()
        panel.hidden = false
        if (!showing) panel.showPopover?.()
        position()
        const target = search.hidden
          ? visible().find((button) => button.getAttribute('aria-pressed') === 'true') || visible()[0] || trigger
          : search
        target.focus({ preventScroll: true })
      } else {
        panel.dataset.closing = 'true'
        if (restoreFocus) trigger.focus({ preventScroll: true })
      }
      function complete() {
        if (ticket !== motionVersion) return
        panelMotion?.cancel()
        panelMotion = undefined
        if (!open) {
          if (panel.matches(':popover-open')) panel.hidePopover()
          panel.hidden = true
          root.open = false
          closing = false
          delete panel.dataset.closing
        }
      }
      if (reducedMotion.matches || immediate || (!open && (!showing || !root.open))) return complete()
      const rest = { opacity: 1, transform: 'none' }
      const folded = {
        opacity: 0,
        transform: `translateY(${panel.style.getPropertyValue('--df-reveal-y') || '-4px'}) scale(.97)`,
      }
      panelMotion = panel.animate([current || (open ? folded : rest), open ? rest : folded], {
        duration: open ? 180 : 110,
        easing: open ? 'cubic-bezier(.2,.85,.25,1)' : 'ease-in',
        fill: 'both',
      })
      panelMotion.finished.then(complete, () => {})
    }
    function sync() {
      const selected = choices().find((button) => button.getAttribute('aria-pressed') === 'true')
      const next = selected ? text(selected) : root.dataset.placeholder || name
      if (label.textContent !== next) label.textContent = next
      trigger.title = `${name}：${next}`
      const disabled = !!root.closest('fieldset[disabled], [inert]')
      trigger.setAttribute('aria-disabled', String(disabled))
      trigger.tabIndex = disabled ? -1 : 0
      const clearable = !disabled && !!clearChoice()
      trigger.dataset.clearable = String(clearable)
      clearButton.hidden = !clearable
      clearButton.disabled = disabled || trigger.dataset.loading === 'true'
      filter()
      if (expanded) position()
    }
    const api = {
      root,
      sync,
      close: () => setOpen(false, false, true),
      dispose() {
        if (disposed) return
        setOpen(false, false, true)
        disposed = true
        controller.dispose()
        observer.disconnect()
        fieldObserver.disconnect()
        clearButton.remove()
        delete trigger.dataset.clearable
        panel.before(options)
        panel.remove()
        selectors.delete(api)
        instances.delete(root)
      },
    }
    selectors.add(api)
    on(clearButton, 'click', (event) => {
      event.preventDefault()
      event.stopPropagation()
      if (clearButton.disabled) return
      const target = clearChoice()
      if (!target) return
      setOpen(false, false, true)
      trigger.focus({ preventScroll: true })
      target.click()
    })
    on(trigger, 'click', (event) => {
      event.preventDefault()
      setOpen(!expanded)
    })
    on(root, 'toggle', () => {
      if (!closing && root.open !== expanded) setOpen(root.open)
    })
    on(search, 'input', () => {
      filter()
      position()
    })
    on(options, 'click', (event) => {
      if (!event.target.closest('button')) return
      sync()
      setOpen(false, true)
    })
    const closeOutside = (event) => {
      if (expanded && !root.contains(event.target)) setOpen(false)
    }
    on(document, 'pointerdown', closeOutside, { capture: true })
    on(document, 'focusin', closeOutside)
    on(
      document,
      'keydown',
      (event) => {
        if (!expanded) {
          if (event.target === trigger && ['ArrowDown', 'ArrowUp'].includes(event.key)) {
            event.preventDefault()
            setOpen(true)
          }
          return
        }
        if (event.key === 'Escape') {
          event.preventDefault()
          event.stopImmediatePropagation()
          setOpen(false, true)
          return
        }
        if (!root.contains(event.target) || event.isComposing) return
        const buttons = visible(),
          index = buttons.indexOf(document.activeElement)
        if (
          ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key) &&
          (index >= 0 || ['ArrowDown', 'ArrowUp'].includes(event.key))
        ) {
          event.preventDefault()
          const next =
            event.key === 'Home'
              ? 0
              : event.key === 'End'
                ? buttons.length - 1
                : event.key === 'ArrowDown'
                  ? (index + 1) % buttons.length
                  : index < 0
                    ? buttons.length - 1
                    : (index - 1 + buttons.length) % buttons.length
          buttons[next]?.focus({ preventScroll: true })
          buttons[next]?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
        } else if (event.target === search && event.key === 'Enter' && search.value.trim() && buttons[0]) {
          event.preventDefault()
          buttons[0].click()
        }
      },
      { capture: true },
    )
    on(reducedMotion, 'change', () => {
      if (reducedMotion.matches) panelMotion?.finish()
    })
    on(window, 'resize', position)
    on(document, 'scroll', position, { capture: true, passive: true })
    const observer = new MutationObserver(sync),
      fieldObserver = new MutationObserver(sync)
    observer.observe(options, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['aria-pressed', 'data-clear-option', 'disabled'],
    })
    fieldObserver.observe(trigger, { attributes: true, attributeFilter: ['data-loading'] })
    const fieldset = root.closest('fieldset')
    if (fieldset) fieldObserver.observe(fieldset, { attributes: true, attributeFilter: ['disabled'] })
    sync()
    instances.set(root, api)
    return api
  }
  function icon(root) {
    root.classList.add('ui-button', 'ui-control', 'ui-icon')
    const controller = DashboardUI.scope()
    bindLight(root, controller)
    return {
      dispose: () => {
        controller.dispose()
        instances.delete(root)
      },
    }
  }
  function portal(root, host) {
    root.getAnimations().forEach((animation) => animation.cancel())
    const placeholder = document.createElement('div')
    placeholder.className = 'df-placeholder'
    placeholder.setAttribute('aria-hidden', 'true')
    placeholder.style.width = `${root.offsetWidth}px`
    placeholder.style.height = `${root.offsetHeight}px`
    for (const api of selectors) if (root.contains(api.root)) api.close()
    root.before(placeholder)
    host.append(root)
    return () => {
      for (const api of selectors) if (root.contains(api.root)) api.close()
      placeholder.replaceWith(root)
      root.dispatchEvent(new Event('dashboardfilterrestore'))
    }
  }
  function dock(root) {
    const heading = root.closest('.heading')
    if (!heading) return () => {}
    const lifetime = DashboardUI.scope(),
      anchor = document.createElement('div')
    anchor.setAttribute('aria-hidden', 'true')
    heading.before(anchor)
    heading.dataset.filterDock = ''
    let frame = 0,
      docked = false,
      animation
    const settle = () => {
      animation?.cancel()
      animation = undefined
    }
    function update(animate = true) {
      frame = 0
      if (!heading.contains(root)) return
      const next = anchor.getBoundingClientRect().top <= parseFloat(getComputedStyle(heading).top)
      if (next === docked) return
      docked = next
      heading.dataset.docked = String(next)
      const current = animation && getComputedStyle(root).transform
      settle()
      if (
        !animate ||
        reducedMotion.matches ||
        document.body.dataset.initialized !== 'true' ||
        root.querySelector('[aria-expanded="true"], :focus-visible')
      )
        return
      animation = root.animate(
        [
          { transform: current || `translateY(${next ? -4 : 3}px) scale(.97)` },
          { transform: 'translateY(1px) scale(1.012)', offset: 0.6 },
          { transform: 'translateY(-.3px) scale(.998)', offset: 0.82 },
          { transform: 'none' },
        ],
        { duration: 420, easing: 'cubic-bezier(.22,.7,.25,1)' },
      )
      const motion = animation
      motion.finished.then(
        () => {
          if (animation === motion) animation = undefined
        },
        () => {},
      )
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(() => update())
    }
    const measure = () => {
      if (!heading.contains(root)) return
      heading.style.setProperty('--filter-dock-offset', `${root.offsetTop}px`)
      schedule()
    }
    const observer = new ResizeObserver(measure)
    observer.observe(heading)
    observer.observe(root)
    lifetime.on(window, 'scroll', schedule, { passive: true })
    lifetime.on(window, 'resize', measure)
    lifetime.on(root, 'pointerdown', settle, { capture: true })
    lifetime.on(root, 'focusin', settle)
    lifetime.on(root, 'dashboardfilterrestore', measure)
    lifetime.on(reducedMotion, 'change', settle)
    measure()
    cancelAnimationFrame(frame)
    update(false)
    return () => {
      lifetime.dispose()
      observer.disconnect()
      cancelAnimationFrame(frame)
      settle()
      anchor.remove()
      delete heading.dataset.filterDock
      delete heading.dataset.docked
      heading.style.removeProperty('--filter-dock-offset')
    }
  }
  function mount(root, { sticky = false } = {}) {
    const controls = root.matches('[data-filter-control]')
      ? [root]
      : [...root.querySelectorAll('[data-filter-control]')]
    const mounted = controls.map((node) => {
      if (instances.has(node)) return instances.get(node)
      if (node.dataset.filterControl === 'selector') return selector(node)
      const api = node.dataset.filterControl === 'icon' ? icon(node) : segment(node)
      instances.set(node, api)
      return api
    })
    const disposeDock = sticky ? dock(root) : () => {}
    return () => {
      disposeDock()
      mounted.forEach((api) => api.dispose())
    }
  }
  return {
    mount,
    portal,
    sync: (root) => instances.get(root)?.sync?.(),
    close: (root) => instances.get(root)?.close?.(),
    trigger: (node) => node?.closest('.df-selector')?.querySelector('summary') || node,
  }
})()

// dashboard-loading-runtime
// 初始化至少展示 800ms；刷新反馈至少展示 200ms。
window.DashboardLoading = (() => {
  const layer = DashboardUI.createLoading()
  document.body.append(layer)
  const screen = document.querySelector('body > .shell')
  const content = document.querySelector('#dashboard-content')
  const title = document.querySelector('#dashboard-loading-title')
  const retryButton = document.querySelector('#dashboard-loading-retry')
  let refreshing = false,
    retryRefresh,
    refreshTask
  const setRefreshing = (busy) => {
    refreshing = busy
    document.body.dataset.refreshing = String(busy)
    document.querySelector('#filters').setAttribute('aria-busy', String(busy))
    content.inert = busy
    content.setAttribute('aria-busy', String(busy))
  }
  const activity = DashboardUI.activity({ change: setRefreshing })
  const setTrigger = (button) => activity.setTrigger(DashboardFilters.trigger(button))
  const refresh = (retry) => {
    if (phase !== 'ready') return
    retryRefresh = retry
    layer.dataset.mode = 'refresh'
    layer.dataset.state = 'loading'
    title.textContent = '正在更新数据…'
    layer.removeAttribute('title')
    retryButton.hidden = true
    layer.hidden = false
    layer.inert = false
    layer.removeAttribute('aria-hidden')
    refreshTask = activity.start()
  }
  let phase = 'loading'
  const initial = new AbortController()
  const painted = DashboardUI.paint(initial.signal)
  const fail = (message) => {
    if (phase === 'ready') {
      activity.cancel()
      layer.dataset.state = 'error'
      title.textContent = '更新失败，请重试'
      layer.title = message
      retryButton.textContent = '重试'
      retryButton.hidden = false
      return
    }
    if (phase !== 'loading') return
    phase = 'error'
    clearTimeout(deadline)
    initial.abort()
    document.body.dataset.state = 'error'
    title.textContent = '暂时无法打开看板'
    document.querySelector('#dashboard-loading-message').textContent = message
    retryButton.hidden = false
  }
  const onScriptError = (event) => {
    if (event.target?.tagName === 'SCRIPT') fail('页面依赖加载失败，请检查网络后重新加载。')
  }
  const deadline = setTimeout(() => fail('加载时间较长，请检查网络后重新加载。'), 45000)
  window.addEventListener('error', onScriptError, true)
  const dispose = (event) => {
    if (event.persisted) return
    phase = 'disposed'
    activity.cancel()
    layer.hidden = true
    clearTimeout(deadline)
    initial.abort()
    window.removeEventListener('error', onScriptError, true)
    window.removeEventListener('pagehide', dispose)
  }
  window.addEventListener('pagehide', dispose)
  retryButton.onclick = () => (phase === 'ready' ? retryRefresh?.() : location.reload())
  const reveal = async (isCurrent) => {
    if (phase === 'ready') {
      if (refreshing) {
        if (!(await refreshTask.finish(() => phase === 'ready' && isCurrent()))) return false
        if (phase !== 'ready' || !isCurrent()) return false
        layer.hidden = true
        layer.inert = true
        layer.setAttribute('aria-hidden', 'true')
        layer.removeAttribute('title')
      }
      return phase === 'ready' && isCurrent()
    }
    if (phase !== 'loading') return false
    const started = await painted
    if (phase !== 'loading' || !isCurrent()) return false
    await DashboardUI.delay(800 - (performance.now() - started), initial.signal)
    if (phase !== 'loading' || !isCurrent()) return false
    phase = 'ready'
    clearTimeout(deadline)
    window.removeEventListener('error', onScriptError, true)
    screen.inert = false
    screen.setAttribute('aria-busy', 'false')
    layer.hidden = true
    layer.inert = true
    layer.setAttribute('aria-hidden', 'true')
    document.body.dataset.initialized = 'true'
    return true
  }
  return { reveal, fail, refresh, setTrigger, paint: () => (phase === 'loading' ? painted : activity.paint()) }
})()

// dashboard-motion-runtime

// 只管理呈现状态；查询、业务口径和布局配置仍由页面负责。
window.DashboardMotion = function createDashboardMotion({ reducedMotion, metricUnit }) {
  const $ = (selector) => document.querySelector(selector)
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)')
  const metricAnimations = new Map(),
    numberFormats = new Map()
  let metricFrame = 0
  const easeOut = (p) => 1 - (1 - p) ** 3
  function formatNumber(value, digits = 1, minimum = digits) {
    if (!Number.isFinite(value)) return '—'
    const key = `${minimum}:${digits}`
    if (!numberFormats.has(key))
      numberFormats.set(
        key,
        new Intl.NumberFormat('zh-CN', { minimumFractionDigits: minimum, maximumFractionDigits: digits }),
      )
    return numberFormats.get(key).format(value)
  }
  // 按页面位置轻微错峰，整组约两秒。
  const entranceTiming = {
    total: 2000,
    stagger: 60,
    chartLead: 100,
    header: 1000,
    surface: 1100,
    insight: 1200,
    hero: 1500,
    chart: 1480,
    footer: 800,
    easing: 'cubic-bezier(.16,1,.3,1)',
    chartEasing: 'cubic-bezier(.22,1,.36,1)',
  }
  let entrances = [],
    hasEntered = false
  function finishEntrance() {
    document.body.dataset.entrance = 'complete'
    entrances.forEach((animation) => animation.cancel())
    entrances = []
  }
  function revealComponents() {
    if (hasEntered) return
    hasEntered = true
    if (reducedMotion.matches) return finishEntrance()
    document.body.dataset.entrance = 'playing'
    const compact = matchMedia('(max-width: 760px)').matches
    // 统一测量静态布局后再写动画，避免 transform 影响后续位置排序。
    const stages = [...document.querySelectorAll('.heading, [data-enter], .shell > footer')]
      .map((element) => ({ element, bounds: element.getBoundingClientRect() }))
      .sort((a, b) => a.bounds.top - b.bounds.top || a.bounds.left - b.bounds.left)
    const stagger = Math.min(
      entranceTiming.stagger,
      (entranceTiming.total - entranceTiming.chart - entranceTiming.chartLead) / Math.max(1, stages.length - 1),
    )
    const delays = new Map(stages.map(({ element }, index) => [element, index * stagger]))
    const startTime = document.timeline.currentTime
    entrances = stages.map(({ element }) => {
      const chrome = !element.hasAttribute('data-enter')
      const footer = element.tagName === 'FOOTER'
      const lead = element.id === 'insight-slot'
      const hero = element.id === 'hero-slot'
      const duration = footer
        ? entranceTiming.footer
        : chrome
          ? entranceTiming.header
          : lead
            ? entranceTiming.insight
            : hero
              ? entranceTiming.hero
              : entranceTiming.surface
      const distance = (footer ? 0 : chrome ? -14 : hero ? 44 : 22) * (compact ? 0.65 : 1)
      const scale = chrome ? 1 : hero ? (compact ? 0.98 : 0.965) : 0.99
      const animation = element.animate(
        [
          {
            opacity: 0,
            transform: `translate3d(0, ${distance}px, 0) scale(${scale})`,
            transformOrigin: 'center top',
          },
          { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)', transformOrigin: 'center top' },
        ],
        {
          duration,
          delay: delays.get(element),
          easing: footer ? 'ease-out' : entranceTiming.easing,
          fill: 'both',
        },
      )
      animation.startTime = startTime
      return animation
    })
    // Canvas 随外层面板进入，并从下向上展开；动画不触发图表重绘。
    for (const plot of document.querySelectorAll('.shell .plot')) {
      const animation = plot.animate(
        [
          {
            opacity: 0,
            clipPath: 'inset(100% 0 0 0 round 10px)',
            transform: `translateY(${compact ? 16 : 24}px)`,
            offset: 0,
          },
          { opacity: 1, offset: 0.55 },
          { opacity: 1, clipPath: 'inset(0% 0 0 0 round 0px)', transform: 'translateY(0)', offset: 1 },
        ],
        {
          duration: entranceTiming.chart,
          delay: (delays.get(plot.closest('[data-enter]')) ?? 0) + entranceTiming.chartLead,
          easing: entranceTiming.chartEasing,
          fill: 'both',
        },
      )
      animation.startTime = startTime
      entrances.push(animation)
    }
    Promise.all(entrances.map((animation) => animation.finished.catch(() => {}))).then(finishEntrance)
  }
  const metricTextNodes = new WeakMap()
  function writeMetricText(element, text, busy = false) {
    if (metricUnit && element.getAttribute('aria-busy') !== String(busy))
      element.setAttribute('aria-busy', String(busy))
    const unit = metricUnit?.(element)
    if (!unit || text === '—') {
      if (element.textContent !== text) element.textContent = text
      metricTextNodes.delete(element)
      return
    }
    let nodes = metricTextNodes.get(element)
    if (!nodes) {
      nodes = [document.createElement('span'), document.createElement('span')]
      nodes[0].className = 'metric-number'
      nodes[1].className = 'metric-unit'
      element.replaceChildren(...nodes)
      metricTextNodes.set(element, nodes)
    }
    const value = text.slice(0, -unit.length)
    if (nodes[0].textContent !== value) nodes[0].textContent = value
    if (nodes[1].textContent !== unit) nodes[1].textContent = unit
  }
  // 同一页面的读数共用一帧，保留各自的时长、缓动和连续更新起点。
  function tickMetrics(now) {
    metricFrame = 0
    let running = false
    metricAnimations.forEach((state) => {
      if (state.tick && !state.tick(now)) state.tick = undefined
      running ||= !!state.tick
    })
    if (running) metricFrame = requestAnimationFrame(tickMetrics)
  }
  function animateMetric(selector, target, format = String, emptyText = '—', duration = 600, ease = easeOut) {
    const element = typeof selector === 'string' ? $(selector) : selector
    const previous = metricAnimations.get(element)
    if (previous && previous.target === target) return
    if (!Number.isFinite(target)) {
      metricAnimations.delete(element)
      writeMetricText(element, emptyText)
      return
    }
    const from = previous?.value ?? target
    const state = { value: from, target, format }
    metricAnimations.set(element, state)
    const write = (value, busy = false) => {
      state.value = value
      writeMetricText(element, format(value), busy)
    }
    if (
      !previous ||
      reducedMotion.matches ||
      document.documentElement.dataset.metricAnimation !== 'true' ||
      from === target
    )
      return write(target)
    const started = performance.now()
    state.tick = (now) => {
      const progress = Math.min(1, (now - started) / duration)
      write(from + (target - from) * ease(progress), progress < 1)
      return progress < 1
    }
    write(from, true)
    if (!metricFrame) metricFrame = requestAnimationFrame(tickMetrics)
  }
  function animateReading(element, target, format) {
    animateMetric(element, target, format, Number.isFinite(target) ? '—' : format(target), 550, (p) =>
      p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2,
    )
  }
  function cancelMetric(element) {
    metricAnimations.delete(element)
  }
  function finishMetricAnimations() {
    cancelAnimationFrame(metricFrame)
    metricFrame = 0
    metricAnimations.forEach((state, element) => {
      state.tick = undefined
      state.value = state.target
      writeMetricText(element, state.format(state.target))
    })
  }
  const lifetime = DashboardUI.scope()
  lifetime.on(window, 'dashboardappearancechange', ({ detail }) => {
    if (detail.metricAnimationChanged && !detail.metricAnimation) finishMetricAnimations()
  })
  // 固定外层命中区域，内层旋转；弹性过渡的合成角度始终限制在 2°。
  function bindCardTilt(card) {
    const slot = card.parentElement
    let x = 0,
      y = 0,
      vx = 0,
      vy = 0,
      targetX = 0,
      targetY = 0,
      frame = 0,
      last = 0
    function apply() {
      const length = Math.hypot(x, y)
      card.style.setProperty('--tilt-x', String(length ? x / length : 0))
      card.style.setProperty('--tilt-y', String(length ? y / length : 1))
      card.style.setProperty('--tilt-angle', `${Math.min(2, length)}deg`)
    }
    function tick(now) {
      const dt = last ? Math.min((now - last) / 16.667, 2) : 1
      last = now
      const damping = Math.pow(0.78, dt)
      vx = (vx + (targetX - x) * 0.1 * dt) * damping
      vy = (vy + (targetY - y) * 0.1 * dt) * damping
      x += vx * dt
      y += vy * dt
      apply()
      frame = 0
      if (Math.abs(targetX - x) + Math.abs(targetY - y) + Math.abs(vx) + Math.abs(vy) > 0.008) start()
      else {
        x = targetX
        y = targetY
        last = 0
        apply()
      }
    }
    function start() {
      if (!frame) frame = requestAnimationFrame(tick)
    }
    function reset() {
      targetX = targetY = 0
      if (reducedMotion.matches || !finePointer.matches) {
        cancelAnimationFrame(frame)
        frame = last = x = y = vx = vy = 0
        apply()
      } else start()
    }
    function move(event) {
      if (reducedMotion.matches || !finePointer.matches || event.pointerType !== 'mouse') return reset()
      const rect = slot.getBoundingClientRect()
      const px = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      const py = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      if (Math.abs(px) > 1 || Math.abs(py) > 1) {
        if (targetX || targetY) reset()
        return
      }
      const length = Math.max(1, Math.hypot(px, py))
      targetX = (-py / length) * 1.5
      targetY = (px / length) * 1.5
      start()
    }
    const events = [
      [slot, 'pointermove', move, { capture: true, passive: true }],
      [slot, 'pointerleave', reset],
      [document, 'pointercancel', reset, true],
      [window, 'blur', reset],
      [window, 'scroll', reset, { capture: true, passive: true }],
      [reducedMotion, 'change', reset],
      [finePointer, 'change', reset],
    ]
    const lifetime = DashboardUI.scope()
    events.forEach((args) => lifetime.on(...args))
    lifetime.add(() => cancelAnimationFrame(frame))
    return lifetime.dispose
  }
  function chartAnimation(duration = 600, appear = false) {
    const update = { enable: true, duration, ease: 'cubicInOut' }
    return {
      enable: !reducedMotion.matches,
      params: { appear: appear ? { ...update, effects: ['growth'] } : { enable: false }, update },
    }
  }
  function disposeMotion() {
    lifetime.dispose()
    entrances.forEach((animation) => animation.cancel())
    cancelAnimationFrame(metricFrame)
    metricAnimations.clear()
  }
  return {
    revealComponents,
    finishEntrance,
    animateMetric,
    animateReading,
    cancelMetric,
    finishMetricAnimations,
    formatNumber,
    bindCardTilt,
    chartAnimation,
    disposeMotion,
  }
}
