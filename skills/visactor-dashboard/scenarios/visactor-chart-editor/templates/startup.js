// Runs before the embedded libraries. Keep startup feedback independent of React and chart engines.
window.EditorStartup = (() => {
  const layer = document.querySelector('#startup')
  const root = document.querySelector('#root')
  const title = document.querySelector('#startup-title')
  const message = document.querySelector('#startup-message')
  const retry = document.querySelector('#startup-retry')
  const progress = document.querySelector('#startup-progress')
  let phase = 'loading',
    pending,
    frame,
    timer,
    finishWait
  let english = false
  const copy = {
    chart: ['正在准备图表…', 'Preparing charts…'],
    table: ['正在准备表格…', 'Preparing tables…'],
    data: ['正在整理数据…', 'Preparing your data…'],
    render: ['正在绘制首张图表…', 'Drawing your first chart…'],
    done: ['准备就绪', 'Ready'],
    failed: [
      '页面暂时无法加载，请重新打开完整的 HTML 文件。',
      'Unable to load this page. Please reopen the complete HTML file.',
    ],
    timeout: ['准备时间较长，请重新加载后再试。', 'This is taking longer than expected. Please reload to try again.'],
  }
  let saved = {},
    config = {}
  try {
    config = JSON.parse(document.querySelector('#page-config').textContent) || {}
  } catch {
    /* The editor reports invalid page configuration. */
  }
  try {
    saved = JSON.parse(localStorage.getItem('visactor-chart-editor:settings:v1:' + location.pathname) || '{}') || {}
  } catch {
    /* Storage is optional. */
  }
  english = (saved.locale === 'en-US' || saved.locale === 'zh-CN' ? saved.locale : config.chart?.locale) === 'en-US'
  const appearance = saved.appearance ?? config.presentation?.appearance ?? config.appearance
  if (typeof appearance === 'string' ? appearance.endsWith('-dark') : config.chart?.theme === 'dark') {
    document.documentElement.dataset.mode = 'dark'
  }
  const text = (key) => copy[key][english ? 1 : 0]
  title.textContent = english ? 'Preparing your workspace' : '正在准备分析工作台'
  retry.textContent = english ? 'Reload' : '重新加载'
  message.textContent = text('chart')
  const stage = (key, value) => {
    if (phase !== 'loading') return
    message.textContent = text(key)
    progress.style.width = value + '%'
  }
  const cleanup = () => {
    clearTimeout(deadline)
    clearTimeout(timer)
    cancelAnimationFrame(frame)
    finishWait?.()
    window.removeEventListener('error', onError)
    window.removeEventListener('unhandledrejection', onError)
  }
  const fail = (key = 'failed') => {
    if (phase !== 'loading') return
    phase = 'error'
    cleanup()
    document.body.dataset.failed = 'true'
    layer.dataset.state = 'error'
    layer.setAttribute('role', 'alert')
    title.textContent = english ? 'Unable to open this workspace' : '暂时无法打开工作台'
    message.textContent = text(key)
    retry.hidden = false
  }
  const onError = () => fail()
  const deadline = setTimeout(() => fail('timeout'), 45000)
  window.addEventListener('error', onError)
  window.addEventListener('unhandledrejection', onError)
  window.addEventListener('pagehide', (event) => {
    if (event.persisted) return
    phase = 'disposed'
    cleanup()
  })
  retry.onclick = () => location.reload()
  const paint = () =>
    new Promise((resolve) => {
      finishWait = resolve
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(resolve)
      })
    })
  let paintedAt = performance.now()
  const reveal = () => {
    if (phase !== 'loading') return pending
    return (pending ||= (async () => {
      await paint()
      const remaining = matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 0
        : 600 - (performance.now() - paintedAt)
      if (remaining > 0)
        await new Promise((resolve) => {
          finishWait = resolve
          timer = setTimeout(resolve, remaining)
        })
      if (phase !== 'loading') return
      stage('done', 100)
      phase = 'ready'
      cleanup()
      root.inert = false
      root.setAttribute('aria-busy', 'false')
      layer.inert = true
      layer.hidden = true
      document.body.dataset.initialized = 'true'
    })())
  }
  const run = async () => {
    await paint()
    paintedAt = performance.now()
    for (const [id, label, value] of [
      ['vchart-runtime', 'chart', 15],
      ['vtable-runtime', 'table', 35],
      ['editor-runtime', 'data', 60],
    ]) {
      if (phase !== 'loading') return
      stage(label, value)
      await paint()
      if (phase !== 'loading') return
      const source = document.getElementById(id)
      if (!source?.textContent) {
        fail()
        return
      }
      const script = document.createElement('script')
      script.textContent = source.textContent
      document.head.append(script)
      script.remove()
      if ((id === 'vchart-runtime' && !window.VChart?.default) || (id === 'vtable-runtime' && !window.VTable)) {
        fail()
        return
      }
    }
  }
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      run().catch(() => fail())
    },
    { once: true },
  )
  return { stage, fail, reveal }
})()
