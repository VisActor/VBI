'use strict'

// dashboard-appearance-runtime
// Appearance preferences are local UI state; filters and query Builders remain with the page.
window.DashboardAppearance = (() => {
  const root = document.documentElement
  const themes = {
    'mist-blue': {
      label: '浅蓝',
      accent: '#9fbfdf',
      ink: '#526f8e',
      base: '#f0f2f5',
      start: '#e2eaf3',
      glow: '#ddd6ed90',
    },
    'glacier-blue': {
      label: '冰蓝',
      accent: '#427fc0',
      ink: '#214d7c',
      base: '#f3f7fc',
      start: '#dce9f8',
      glow: '#dce9f890',
    },
    iris: {
      label: '鸢紫',
      accent: '#7664c3',
      ink: '#4c3c85',
      base: '#f6f4fb',
      start: '#eae3f8',
      glow: '#eae3f8',
    },
    rose: {
      label: '玫粉',
      accent: '#be658b',
      ink: '#853e5c',
      base: '#fbf4f7',
      start: '#f7e3ec',
      glow: '#f7e3ec90',
    },
    sage: {
      label: '草绿',
      accent: '#4f8f76',
      ink: '#2f604d',
      base: '#f2f7f3',
      start: '#dcece1',
      glow: '#e2ece290',
    },
    apricot: {
      label: '杏橙',
      accent: '#d18368',
      ink: '#92513f',
      chartEnd: '#c4755d',
      base: '#fbf7f5',
      start: '#f5e3da',
      glow: '#f5e3da',
    },
    amber: {
      label: '琥珀',
      accent: '#ba914a',
      ink: '#7d6238',
      chartEnd: '#af813f',
      base: '#faf8f4',
      start: '#f1e7d5',
      glow: '#f1e7d590',
    },
    burgundy: {
      label: '酒红',
      accent: '#94506d',
      ink: '#66334b',
      base: '#faf4f7',
      start: '#f3e5eb',
      glow: '#f3e5eb90',
    },
  }
  const defaults = {
    theme: root.dataset.defaultTheme,
    glassStrength: Number(root.dataset.defaultGlass),
    metricAnimation: false,
  }
  const storageKey = `vbi-light-dashboard:${root.dataset.dashboard}:appearance`
  const normalize = (value) => ({
    theme: Object.hasOwn(themes, value?.theme) ? value.theme : defaults.theme,
    glassStrength: Number.isFinite(value?.glassStrength)
      ? Math.round(Math.max(0, Math.min(100, value.glassStrength)))
      : defaults.glassStrength,
    metricAnimation: value?.metricAnimation === true,
  })
  let state = { ...defaults },
    dispose,
    closePanel
  try {
    state = normalize(JSON.parse(localStorage.getItem(storageKey)))
  } catch {}
  const palette = document.createElement('style')
  palette.id = 'dashboard-appearance-palettes'
  palette.textContent = Object.entries(themes)
    .map(
      ([key, theme]) =>
        `:root[data-theme="${key}"]{--accent:${theme.accent};--accent-ink:${theme.ink};--chart-accent-end:${theme.chartEnd || theme.ink};--background-base:${theme.base};--background-start:${theme.start};--background-glow:${theme.glow};--glass-fallback:${theme.base}}`,
    )
    .join('\n')
  document.head.append(palette)
  function apply(next, persist = true) {
    next = normalize(next)
    const themeChanged = next.theme !== state.theme
    const glassChanged = next.glassStrength !== state.glassStrength
    const metricAnimationChanged = next.metricAnimation !== state.metricAnimation
    state = next
    root.dataset.theme = state.theme
    root.dataset.metricAnimation = String(state.metricAnimation)
    root.style.setProperty('--glass-strength', state.glassStrength)
    if (persist) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(state))
      } catch {}
    }
    if (themeChanged || glassChanged || metricAnimationChanged)
      window.dispatchEvent(
        new CustomEvent('dashboardappearancechange', {
          detail: { ...state, themeChanged, glassChanged, metricAnimationChanged },
        }),
      )
  }
  apply(state, false)
  function mount() {
    if (dispose) return dispose
    const trigger = document.querySelector('#appearance-trigger')
    if (!trigger) return () => {}
    const lifetime = DashboardUI.scope(),
      { on } = lifetime
    const panel = document.createElement('dialog')
    panel.id = 'appearance-panel'
    panel.className = 'ui-surface ui-surface--overlay da-panel'
    panel.setAttribute('aria-labelledby', 'appearance-title')
    panel.innerHTML = `<header class="da-heading"><h2 id="appearance-title">外观设置</h2><div class="da-heading-actions"><div class="da-help"><button type="button" class="ui-button ui-control ui-icon da-icon" data-appearance="help" aria-label="如何继续编辑仪表盘" aria-describedby="appearance-help" aria-expanded="false"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="7.25" stroke="currentColor" stroke-width="1.4"/><path d="M7.9 7.5a2.2 2.2 0 0 1 4.2.9c0 1.5-2.1 1.7-2.1 3.1m0 2.5v.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button><div id="appearance-help" class="ui-surface ui-surface--overlay da-help-tip" role="tooltip" hidden><strong>用提示词（Prompt）继续编辑</strong><p>回到生成此仪表盘的对话，描述想调整的内容，继续修改仪表盘、主题、布局和配置。</p><p class="da-help-example">例如：“换成草绿主题，调整指标卡布局，并增加一个筛选项。”</p></div></div><button type="button" class="ui-button ui-control ui-icon da-icon" data-appearance="close" aria-label="关闭外观设置"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button></div></header><div class="da-themes" role="group" aria-label="主题颜色"></div><div class="da-strength"><label for="appearance-strength">玻璃强度<output for="appearance-strength"></output></label><input id="appearance-strength" type="range" min="0" max="100" step="1" aria-label="玻璃强度"><div class="da-scale" aria-hidden="true"><span>通透</span><span>凝实</span></div></div><label class="da-animation" for="appearance-metric-animation"><span><strong id="appearance-animation-label">指标数值动画</strong><small id="appearance-animation-note">关闭时直接显示最新数值</small></span><input id="appearance-metric-animation" type="checkbox" role="switch" aria-labelledby="appearance-animation-label" aria-describedby="appearance-animation-note"><span class="da-switch" aria-hidden="true"></span></label><button type="button" class="ui-button ui-control da-reset">恢复默认外观</button><p class="da-note">设置自动保存，当前筛选范围保持不变。</p>`
    document.body.append(panel)
    const group = panel.querySelector('.da-themes'),
      input = panel.querySelector('#appearance-strength'),
      output = panel.querySelector('output'),
      metricToggle = panel.querySelector('#appearance-metric-animation'),
      help = panel.querySelector('.da-help'),
      helpButton = panel.querySelector('[data-appearance="help"]'),
      helpTip = panel.querySelector('#appearance-help')
    function showHelp(visible) {
      helpTip.hidden = !visible
      helpButton.setAttribute('aria-expanded', String(visible))
    }
    on(help, 'pointerenter', (event) => {
      if (event.pointerType !== 'touch') showHelp(true)
    })
    on(help, 'pointerleave', () => {
      if (!help.contains(document.activeElement)) showHelp(false)
    })
    on(help, 'focusin', () => showHelp(true))
    on(help, 'focusout', (event) => {
      if (!help.contains(event.relatedTarget)) showHelp(false)
    })
    on(helpButton, 'click', () => showHelp(true))
    on(metricToggle, 'change', () => {
      apply({ ...state, metricAnimation: metricToggle.checked })
      sync()
    })
    for (const [key, theme] of Object.entries(themes)) {
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'ui-button da-theme'
      button.dataset.appearanceTheme = key
      button.style.setProperty('--theme-swatch', theme.accent)
      const swatch = document.createElement('i')
      swatch.setAttribute('aria-hidden', 'true')
      button.append(swatch, document.createTextNode(theme.label))
      on(button, 'click', () => {
        apply({ ...state, theme: key })
        sync()
      })
      group.append(button)
    }
    function sync() {
      group
        .querySelectorAll('button')
        .forEach((button) =>
          button.setAttribute('aria-pressed', String(button.dataset.appearanceTheme === state.theme)),
        )
      input.value = state.glassStrength
      input.style.setProperty('--range-progress', `${state.glassStrength}%`)
      input.setAttribute('aria-valuetext', `${state.glassStrength}%，通透到凝实`)
      output.value = `${state.glassStrength}%`
      metricToggle.checked = state.metricAnimation
    }
    function position() {
      if (!panel.open) return
      const anchor = trigger.getBoundingClientRect(),
        box = panel.getBoundingClientRect(),
        edge = 12
      const left = Math.max(edge, Math.min(innerWidth - box.width - edge, anchor.right - box.width))
      const top = Math.max(edge, Math.min(innerHeight - box.height - edge, anchor.bottom + 10))
      panel.style.left = `${left}px`
      panel.style.top = `${top}px`
    }
    function close(restoreFocus = false) {
      if (!panel.open) return
      showHelp(false)
      panel.close()
      document.body.append(panel)
      trigger.setAttribute('aria-expanded', 'false')
      if (restoreFocus) trigger.focus({ preventScroll: true })
    }
    on(trigger, 'click', () => {
      if (panel.open) return close(true)
      document.querySelectorAll('.df-selector').forEach((selector) => window.DashboardFilters?.close(selector))
      sync()
      ;(trigger.closest('dialog') || document.body).append(panel)
      panel.show()
      trigger.setAttribute('aria-expanded', 'true')
      position()
      group.querySelector('[aria-pressed="true"]').focus({ preventScroll: true })
    })
    closePanel = close
    on(panel.querySelector('[data-appearance="close"]'), 'click', () => close(true))
    on(panel, 'cancel', (event) => {
      event.preventDefault()
      close(true)
    })
    on(panel, 'close', () => {
      showHelp(false)
      trigger.setAttribute('aria-expanded', 'false')
    })
    const closeOutside = (event) => {
      if (panel.open && !panel.contains(event.target) && !trigger.contains(event.target)) close()
    }
    on(document, 'pointerdown', closeOutside, { capture: true })
    on(document, 'focusin', closeOutside)
    on(
      document,
      'keydown',
      (event) => {
        if (panel.open && event.key === 'Escape') {
          event.preventDefault()
          event.stopPropagation()
          if (!helpTip.hidden) return showHelp(false)
          close(true)
        }
      },
      { capture: true },
    )
    let frame = 0,
      pendingStrength
    on(input, 'input', () => {
      pendingStrength = Number(input.value)
      output.value = `${pendingStrength}%`
      input.style.setProperty('--range-progress', `${pendingStrength}%`)
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0
          apply({ ...state, glassStrength: pendingStrength }, false)
          sync()
        })
    })
    on(input, 'change', () => {
      cancelAnimationFrame(frame)
      frame = 0
      apply({ ...state, glassStrength: Number(input.value) })
      sync()
    })
    on(panel.querySelector('.da-reset'), 'click', () => {
      cancelAnimationFrame(frame)
      frame = 0
      apply(defaults, false)
      try {
        localStorage.removeItem(storageKey)
      } catch {}
      sync()
    })
    on(window, 'resize', position)
    on(window, 'scroll', position, { capture: true, passive: true })
    const resize = new ResizeObserver(position)
    resize.observe(trigger)
    resize.observe(panel)
    dispose = () => {
      close()
      lifetime.dispose()
      resize.disconnect()
      cancelAnimationFrame(frame)
      panel.remove()
      dispose = undefined
    }
    on(window, 'pagehide', (event) => {
      if (!event.persisted) dispose()
    })
    sync()
    return dispose
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true })
  else mount()
  return { mount, close: () => closePanel?.(), getState: () => ({ ...state }), storageKey }
})()
