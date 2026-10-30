/* CSS is the palette authority; this adapter resolves its tokens for Canvas. */
window.DashboardTable = (() => {
  let library
  function load() {
    if (window.VTable?.ListTable) return Promise.resolve(window.VTable)
    if (!library)
      library = new Promise((resolve, reject) => {
        const script = document.createElement('script')
        const fail = () => {
          clearTimeout(timer)
          script.remove()
          library = undefined
          reject(new Error('明细模块加载失败，请重试'))
        }
        const timer = setTimeout(fail, 30000)
        script.src = 'https://cdn.jsdelivr.net/npm/@visactor/vtable@1.23.1/dist/vtable.min.js'
        script.onload = () => {
          clearTimeout(timer)
          if (window.VTable?.ListTable) resolve(window.VTable)
          else fail()
        }
        script.onerror = fail
        document.head.append(script)
      })
    return library
  }
  function readTokens(host) {
    const style = getComputedStyle(host)
    const probe = document.createElement('span')
    probe.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none'
    host.append(probe)
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 1
    const context = canvas.getContext('2d', { willReadFrequently: true })
    const color = (name) => {
      // Resolve var()/color-mix() in the host, then normalize to VRender-compatible RGBA.
      probe.style.color = `var(${name})`
      context.clearRect(0, 0, 1, 1)
      context.fillStyle = getComputedStyle(probe).color
      context.fillRect(0, 0, 1, 1)
      const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data
      return `rgba(${r}, ${g}, ${b}, ${a / 255})`
    }
    return {
      color,
      number: (name) => parseFloat(style.getPropertyValue(name)),
      fontFamily: style.getPropertyValue('--font-ui').trim(),
      dispose: () => probe.remove(),
    }
  }
  const appearances = new WeakMap()
  const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches
  function options(base, host) {
    const tokens = readTokens(host)
    try {
      const color = tokens.color
      const normal = color('--table-body')
      const stripe = color('--table-stripe')
      const divider = color('--table-divider')
      const hover = {
        cellBgColor: color('--table-hover'),
        inlineRowBgColor: color('--table-hover-row'),
        inlineColumnBgColor: color('--table-canvas'),
      }
      const common = {
        fontFamily: tokens.fontFamily,
        fontSize: tokens.number('--table-font-size'),
        color: color('--table-text'),
        padding: [10, 12, 10, 12],
        borderColor: divider,
        borderLineWidth: [0, 0, 1, 0],
      }
      const resolved = {
        ...base,
        columns: base.columns.map((column) => ({
          ...column,
          headerStyle: {
            ...column.headerStyle,
            textAlign: column.headerStyle?.textAlign || column.style?.textAlign || 'left',
          },
        })),
        autoFillWidth: true,
        autoWrapText: false,
        heightMode: 'standard',
        defaultRowHeight: tokens.number('--table-row-height'),
        defaultHeaderRowHeight: tokens.number('--table-header-height'),
        hover: { highlightMode: 'row' },
        select: { highlightMode: 'cell', headerSelectMode: 'inline' },
        keyboardOptions: { ...base.keyboardOptions, copySelected: true },
        animationAppear: reducedMotion() ? false : base.animationAppear,
        theme: {
          underlayBackgroundColor: color('--table-canvas'),
          defaultStyle: common,
          bodyStyle: {
            ...common,
            bgColor: ({ row, table }) => ((row - table.columnHeaderLevelCount) % 2 ? stripe : normal),
            hover,
          },
          headerStyle: {
            ...common,
            fontSize: tokens.number('--table-header-font-size'),
            fontWeight: 600,
            color: color('--table-header-text'),
            bgColor: color('--table-header'),
            hover,
          },
          bottomFrozenStyle: {
            ...common,
            bgColor: color('--table-header'),
            color: color('--table-header-text'),
            fontWeight: 600,
            hover,
          },
          selectionStyle: {
            cellBorderLineWidth: tokens.number('--table-selection-width'),
            cellBorderColor: color('--table-selected-border'),
            cellBgColor: color('--table-selected'),
            inlineRowBgColor: color('--table-selected-row'),
            inlineColumnBgColor: color('--table-canvas'),
            selectionFillMode: 'overlay',
          },
          frameStyle: {
            borderColor: color('--table-frame'),
            borderLineWidth: 1,
            cornerRadius: tokens.number('--table-radius'),
          },
          scrollStyle: {
            visible: 'scrolling',
            hoverOn: true,
            width: 5,
            scrollSliderCornerRadius: 3,
            scrollSliderColor: color('--table-scroll-thumb'),
            scrollRailColor: color('--table-scroll-rail'),
          },
          columnResize: { lineColor: color('--table-selected-border'), lineWidth: 1 },
        },
      }
      appearances.set(resolved, base.animationAppear)
      return resolved
    } finally {
      tokens.dispose()
    }
  }
  function build(Builder, seed, host) {
    const tokens = readTokens(host)
    try {
      const spec = Builder.from({
        chartType: 'table',
        ...seed,
        totals: seed.totals || 'avg',
        widthMode: 'standard',
        emptyCellText: '—',
        locale: 'zh-CN',
        theme: 'light',
        bodyCellStyle: {
          selector: { field: seed.measures.map(({ id }) => id) },
          enableProgressBar: true,
          barPositiveColor: tokens.color('--table-bar-positive'),
          barNegativeColor: tokens.color('--table-bar-negative'),
          ...seed.bodyCellStyle,
        },
      }).build()
      spec.columns = spec.columns.map((column) => {
        const textAlign = seed.measures.some(({ id }) => id === column.field) ? 'right' : 'left'
        const style = column.style
        return {
          ...column,
          headerStyle: { ...column.headerStyle, textAlign },
          style: (datum) => ({ ...(typeof style === 'function' ? style(datum) : style), textAlign }),
        }
      })
      return spec
    } finally {
      tokens.dispose()
    }
  }
  function overview(
    Builder,
    columns,
    rows,
    host,
    formats = [],
    summary = { type: 'avg', fields: columns.slice(1).map((_, i) => i + 1) },
  ) {
    const records = rows.map((values) => Object.fromEntries(values.map((value, index) => [`c${index}`, value ?? null])))
    const fields = columns.map((alias, index) => ({
      id: `c${index}`,
      alias,
      encoding: 'column',
      width: index === 0 ? 170 : Math.max(130, Math.min(210, alias.length * 12 + 24)),
      format: formats[index] && { thousandSeparator: true, roundingMode: 'halfExpand', ...formats[index] },
    }))
    const base = build(
      Builder,
      {
        dataset: records,
        dimensions: fields.slice(0, 1),
        measures: fields.slice(1),
        totals: summary.type,
        bodyCellStyle: { selector: { field: summary.fields.map((index) => `c${index}`) } },
      },
      host,
    )
    base.columns = base.columns.map((column, index) => ({
      ...column,
      headerIcon: filterIcon(),
      ...(index && !formats[index] ? { fieldFormat: (record) => record[column.field] ?? '—' } : {}),
      ...(index && !summary.fields.includes(index)
        ? { aggregation: { aggregationType: 'NONE', formatFun: () => '' } }
        : {}),
    }))
    const resolved = options(base, host)
    const summaryRows = rows.length ? resolved.bottomFrozenRowCount : 0
    host.style.height = `${Math.min(
      parseFloat(getComputedStyle(host).getPropertyValue('--table-overview-max-height')),
      resolved.defaultHeaderRowHeight + (Math.max(1, rows.length) + summaryRows) * resolved.defaultRowHeight + 2,
    )}px`
    host.style.setProperty('--table-summary-height', `${summaryRows * resolved.defaultRowHeight}px`)
    return resolved
  }
  function update(table, next, { records = true } = {}) {
    table.updateColumns(
      next.columns.map((column) => ({
        ...column,
        // Column-query icons belong to the view, not regenerated VSeed options.
        headerIcon: table.options.columns.find(({ field }) => field === column.field)?.headerIcon || column.headerIcon,
      })),
      { clearColWidthCache: false, clearRowHeightCache: false },
    )
    if (records) setRecords(table, next.records)
  }
  function setRecords(table, records, { animate = true } = {}) {
    if (table.records !== records) table.clearSelected()
    if (!appearances.has(table.options)) appearances.set(table.options, table.options.animationAppear)
    table.options.animationAppear = animate && !reducedMotion() ? appearances.get(table.options) : false
    table.setRecords(records)
  }
  const filterIcon = (active = false) => ({
    name: 'dashboard-table-filter',
    type: 'svg',
    width: 14,
    height: 14,
    positionType: 'right',
    marginLeft: 5,
    cursor: 'pointer',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M2 3h12L9.5 8v5l-3-1.5V8Z" fill="${active ? '#64717e' : 'none'}" stroke="#64717e" stroke-width="1.3" stroke-linejoin="round"/></svg>`,
  })
  const blankOperators = [
    { id: 'empty', label: '为空', op: 'is null', inputs: 0 },
    { id: 'filled', label: '不为空', op: 'is not null', inputs: 0 },
  ]
  const equalityOperators = [
    { id: 'eq', label: '等于', op: '=' },
    { id: 'ne', label: '不等于', op: '!=' },
  ]
  const columnOperators = {
    text: [
      { id: 'contains', label: '包含', op: 'ilike', prefix: '%', suffix: '%' },
      { id: 'excludes', label: '不包含', op: 'not ilike', prefix: '%', suffix: '%' },
      ...equalityOperators,
      { id: 'starts', label: '开头是', op: 'ilike', suffix: '%' },
      { id: 'ends', label: '结尾是', op: 'ilike', prefix: '%' },
      ...blankOperators,
    ],
    number: [
      ...equalityOperators,
      { id: 'gt', label: '大于', op: '>' },
      { id: 'gte', label: '大于等于', op: '>=' },
      { id: 'lt', label: '小于', op: '<' },
      { id: 'lte', label: '小于等于', op: '<=' },
      { id: 'between', label: '介于', op: 'between', inputs: 2 },
      { id: 'outside', label: '不在区间', op: 'not between', inputs: 2 },
      ...blankOperators,
    ],
  }
  async function createView({
    vbi,
    query,
    connectorId,
    columns,
    fields = columns.map((_, index) => `c${index}`),
    types = columns.map((_, i) => (i === 0 ? 'string' : 'number')),
    host,
    render,
  }) {
    // Query the displayed grain without regrouping its already aggregated measures.
    const id = `${connectorId}-table-view`
    const schema = [
      ...fields.map((name, index) => ({ name, type: types[index] })),
      { name: '__row_order', type: 'number' },
    ]
    const source = await DashboardData.connect(vbi, query, id, schema, [])
    const builder = vbi.query.create(vbi.query.createEmpty(id))
    builder.queryMode.setMode('detail')
    fields.forEach((field, index) => builder.dimensions.add(field, (node) => node.setAlias(columns[index])))
    builder.dimensions.add('__row_order', (node) => node.setSort({ order: 'asc' }))
    const events = new AbortController(),
      { signal } = events
    let table,
      rows = [],
      sourceVersion = 0,
      loadedVersion = -1,
      revision = 0,
      pending,
      disposed = false
    let queue = Promise.resolve(),
      activeField,
      mode,
      operatorType,
      anchor,
      iconState,
      openFrame = 0
    const panel = document.createElement('div')
    panel.className = 'ui-surface ui-surface--overlay df-menu dashboard-table-menu'
    panel.setAttribute('popover', 'auto')
    panel.setAttribute('role', 'dialog')
    panel.innerHTML = `<header class="dashboard-table-menu-heading"><strong data-dt="title"></strong><button type="button" class="ui-button" data-dt="clear" title="清除本列筛选" aria-label="清除本列筛选">清除</button></header>
      <div class="dashboard-table-sort-row"><div class="dashboard-table-sort" data-filter-control="segment" role="group" aria-label="列排序"><button type="button" data-sort="asc"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 13V3m-2 2 2-2 2 2m3-1h5M9 8h4m-4 4h2"/></svg>升序</button><button type="button" data-sort="desc"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 3v10m-2-2 2 2 2-2m3-7h2M9 8h4m-4 4h5"/></svg>降序</button></div><button type="button" class="ui-button ui-icon df-icon dashboard-table-icon" data-filter-control="icon" data-sort="normal" title="恢复默认顺序" aria-label="恢复默认顺序"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 6a5 5 0 1 1 0 5M3 2v4h4"/></svg></button></div>
      <div class="dashboard-table-rule" data-dt="rule"><details data-filter-control="selector" data-menu-min-width="184" data-menu-align="start" aria-label="筛选条件"><summary><span data-control-label></span></summary><div data-control-options role="group" aria-label="筛选条件"></div></details><div class="dashboard-table-values" data-dt="values"><input class="ui-input df-search" data-dt="low" autocomplete="off" spellcheck="false"><span data-dt="separator" aria-hidden="true">—</span><input class="ui-input df-search" data-dt="high" type="number" step="any" autocomplete="off"></div></div>
      <p class="dashboard-table-feedback" data-dt="feedback" role="status"></p>
      <footer class="dashboard-table-actions"><button type="button" class="ui-button" data-dt="reset">清除全部筛选</button><button type="button" class="ui-button" data-dt="apply">筛选</button></footer>`
    ;(host.closest('dialog') || document.body).append(panel)
    const nodes = Object.fromEntries([...panel.querySelectorAll('[data-dt]')].map((node) => [node.dataset.dt, node]))
    const picker = panel.querySelector('details')
    const operatorList = picker.querySelector('[data-control-options]')
    const unmount = DashboardFilters.mount(panel)
    const activity = window.DashboardUI?.activity?.({
      minimum: 0,
      change: (busy) => host.setAttribute('aria-busy', String(busy)),
    })
    const operators = () => columnOperators[types[fields.indexOf(activeField)] === 'number' ? 'number' : 'text']
    const currentOperator = () => operators().find(({ id }) => id === mode)
    const predicates = (field) =>
      builder.whereFilter.toJSON().conditions.filter((condition) => condition.field === field)
    const hide = (focus = false) => {
      cancelAnimationFrame(openFrame)
      openFrame = 0
      DashboardFilters.close(picker)
      if (panel.matches(':popover-open')) panel.hidePopover()
      if (focus && !disposed) (table?.getElement() || host).focus({ preventScroll: true })
    }
    function headers() {
      const dimensions = builder.build().dimensions
      const state = JSON.stringify([builder.whereFilter.toJSON(), dimensions.map(({ field, sort }) => [field, sort])])
      if (!table || state === iconState) return
      iconState = state
      table.updateColumns(
        table.options.columns.map((column) => ({
          ...column,
          headerIcon: filterIcon(
            predicates(column.field).length > 0 || !!dimensions.find((dim) => dim.field === column.field)?.sort,
          ),
        })),
        { clearColWidthCache: false, clearRowHeightCache: false },
      )
    }
    function refresh(control) {
      const ticket = ++revision
      pending?.abort()
      const feedback = activity?.start(DashboardFilters.trigger(control) || null, control ? 200 : 0)
      const task = queue
        .catch(() => {})
        .then(async () => {
          if (disposed || ticket !== revision) return false
          pending = new AbortController()
          host.setAttribute('aria-busy', 'true')
          try {
            await feedback?.painted
            if (disposed || ticket !== revision) return false
            if (loadedVersion !== sourceVersion) {
              const version = sourceVersion
              await source.replace(rows)
              loadedVersion = version
            }
            if (disposed || ticket !== revision) return false
            const result = await builder.query({ signal: pending.signal })
            if (disposed || ticket !== revision) return false
            const dimensions = builder.build().dimensions
            const ids = fields.map((field) => dimensions.find((dim) => dim.field === field).id)
            await render(
              result.dataset.map((record) => ids.map((key) => record[key] ?? null)),
              rows.length,
              { signal: pending.signal, isCurrent: () => !disposed && ticket === revision },
            )
            if (disposed || ticket !== revision) return false
            headers()
          } catch (error) {
            if (disposed || ticket !== revision || error.name === 'AbortError') return false
            throw error
          } finally {
            if (feedback) await feedback.finish(() => !disposed && ticket === revision)
            else if (!disposed && ticket === revision) host.setAttribute('aria-busy', 'false')
          }
          return !disposed && ticket === revision
        })
      queue = task
      return task
    }
    async function submit(action, control) {
      const field = activeField
      nodes.feedback.textContent = ''
      try {
        action()
        if ((await refresh(control)) && activeField === field) hide(true)
      } catch (error) {
        nodes.feedback.textContent = `表格更新失败：${error.message}`
        position()
      }
    }
    function position() {
      if (!anchor || !panel.matches(':popover-open')) return
      const cell = table.getCellRelativeRect(anchor.col, anchor.row)
      const canvas = table.canvas.getBoundingClientRect(),
        rect = panel.getBoundingClientRect()
      const below = canvas.top + cell.bottom + 6,
        above = canvas.top + cell.top - rect.height - 6
      panel.style.left = `${Math.max(12, Math.min(canvas.left + cell.right - rect.width, innerWidth - rect.width - 12))}px`
      panel.style.top = `${Math.max(12, Math.min(below + rect.height <= innerHeight - 12 ? below : above, innerHeight - rect.height - 12))}px`
    }
    function controls() {
      const numeric = types[fields.indexOf(activeField)] === 'number',
        type = numeric ? 'number' : 'text'
      if (operatorType !== type) {
        operatorList.replaceChildren(
          ...operators().map(({ id, label }) => {
            const button = document.createElement('button')
            button.type = 'button'
            button.dataset.op = id
            button.textContent = label
            return button
          }),
        )
        operatorType = type
      }
      const inputs = currentOperator().inputs ?? 1
      nodes.low.type = numeric ? 'number' : 'search'
      nodes.low.step = 'any'
      nodes.values.hidden = inputs === 0
      nodes.high.hidden = nodes.separator.hidden = inputs !== 2
      nodes.rule.dataset.range = String(inputs === 2)
      nodes.rule.dataset.valueless = String(inputs === 0)
      nodes.low.placeholder = inputs === 2 ? '最小值' : numeric ? '输入数值' : '输入文本'
      nodes.high.placeholder = '最大值'
      nodes.low.setAttribute('aria-label', `${nodes.title.textContent}${inputs === 2 ? '下限' : '筛选值'}`)
      nodes.high.setAttribute('aria-label', `${nodes.title.textContent}上限`)
      operatorList
        .querySelectorAll('[data-op]')
        .forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.op === mode)))
      DashboardFilters.sync(picker)
      position()
    }
    function show(field, col, row) {
      if (!fields.includes(field) || disposed || host.closest('[inert]')) return
      activeField = field
      anchor = { col, row }
      nodes.title.textContent = nodes.title.title = columns[fields.indexOf(field)]
      panel.setAttribute('aria-label', `${nodes.title.textContent}列筛选与排序`)
      const condition = predicates(field)[0]
      const op = { eq: '=', ne: '!=', gt: '>', gte: '>=', lt: '<', lte: '<=' }[condition?.op] || condition?.op
      let option
      if (op === 'ilike' || op === 'not ilike') {
        const pattern = String(condition.value)
        const id =
          op === 'not ilike'
            ? 'excludes'
            : pattern.startsWith('%') && pattern.endsWith('%')
              ? 'contains'
              : pattern.endsWith('%')
                ? 'starts'
                : 'ends'
        option = operators().find((item) => item.id === id)
      } else option = operators().find((item) => item.op === op)
      option ||= operators()[0]
      mode = option.id
      controls()
      const bounds = option.inputs === 2 ? condition?.value : undefined
      nodes.low.value = bounds
        ? (bounds.min ?? bounds[0] ?? '')
        : option.inputs === 0
          ? ''
          : option.prefix || option.suffix
            ? String(condition?.value ?? '').slice(
                option.prefix?.length || 0,
                option.suffix ? -option.suffix.length : undefined,
              )
            : (condition?.value ?? '')
      nodes.high.value = bounds?.max ?? bounds?.[1] ?? ''
      nodes.feedback.textContent = ''
      const conditions = builder.whereFilter.toJSON().conditions
      nodes.clear.hidden = !condition
      nodes.reset.hidden = !conditions.length || (conditions.length === 1 && !!condition)
      const sort = builder.build().dimensions.find((dim) => dim.field !== '__row_order' && dim.sort)
      panel.querySelectorAll('[data-sort]').forEach((button) => {
        button.hidden = button.dataset.sort === 'normal' && !sort
        if (button.dataset.sort === 'normal') button.removeAttribute('aria-pressed')
        else
          button.setAttribute('aria-pressed', String(sort?.field === field && sort.sort.order === button.dataset.sort))
      })
      if (!panel.matches(':popover-open')) panel.showPopover()
      position()
      requestAnimationFrame(() => {
        if (!disposed && panel.matches(':popover-open'))
          (option.inputs === 0 ? nodes.apply : nodes.low).focus({ preventScroll: true })
      })
    }
    operatorList.addEventListener(
      'click',
      (event) => {
        const button = event.target.closest('[data-op]')
        if (!button) return
        mode = button.dataset.op
        nodes.feedback.textContent = ''
        controls()
        ;(currentOperator().inputs === 0 ? nodes.apply : nodes.low).focus({ preventScroll: true })
      },
      { signal },
    )
    panel.querySelectorAll('[data-sort]').forEach((button) =>
      button.addEventListener(
        'click',
        () =>
          void submit(() => {
            builder.doc.transact(() => {
              builder.build().dimensions.forEach((dim) => builder.dimensions.update(dim.id, (node) => node.clearSort()))
              if (button.dataset.sort !== 'normal' && button.getAttribute('aria-pressed') !== 'true') {
                const dim = builder.build().dimensions.find((item) => item.field === activeField)
                builder.dimensions.update(dim.id, (node) => node.setSort({ order: button.dataset.sort }))
              }
              const original = builder.build().dimensions.find((item) => item.field === '__row_order')
              builder.dimensions.update(original.id, (node) => node.setSort({ order: 'asc' }))
            })
          }, button),
        { signal },
      ),
    )
    const clear = (field) => predicates(field).forEach((condition) => builder.whereFilter.remove(condition.id))
    nodes.clear.addEventListener('click', () => void submit(() => clear(activeField), nodes.clear), { signal })
    nodes.reset.addEventListener('click', () => void submit(() => builder.whereFilter.clear(), nodes.reset), { signal })
    nodes.apply.addEventListener(
      'click',
      () => {
        const numeric = types[fields.indexOf(activeField)] === 'number',
          option = currentOperator()
        const low = nodes.low.value.trim(),
          high = nodes.high.value.trim(),
          inputs = option.inputs ?? 1
        if (
          inputs &&
          ((!low && (inputs !== 2 || !high)) ||
            (numeric && (!nodes.low.checkValidity() || (inputs === 2 && !nodes.high.checkValidity()))))
        ) {
          nodes.feedback.textContent = numeric ? '请输入有效数值。' : '请输入筛选文本。'
          position()
          return
        }
        if (inputs === 2 && low !== '' && high !== '' && Number(low) > Number(high)) {
          nodes.feedback.textContent = '下限不能大于上限。'
          position()
          return
        }
        void submit(
          () =>
            builder.doc.transact(() => {
              clear(activeField)
              const add = (group, op, value) => group.add(activeField, (node) => node.setOperator(op).setValue(value))
              if (inputs === 0) add(builder.whereFilter, option.op)
              else if (inputs === 2)
                add(builder.whereFilter, option.op, {
                  min: low === '' ? undefined : Number(low),
                  max: high === '' ? undefined : Number(high),
                })
              else
                add(
                  builder.whereFilter,
                  option.op,
                  numeric ? Number(low) : `${option.prefix || ''}${low}${option.suffix || ''}`,
                )
            }),
          nodes.apply,
        )
      },
      { signal },
    )
    panel.addEventListener(
      'keydown',
      (event) => {
        if (event.isComposing || event.keyCode === 229) return
        if (event.key === 'Escape') {
          event.preventDefault()
          event.stopPropagation()
          hide(true)
        } else if (event.key === 'Enter' && (event.target === nodes.low || event.target === nodes.high)) {
          event.preventDefault()
          nodes.apply.click()
        }
      },
      { signal },
    )
    panel.addEventListener(
      'beforetoggle',
      (event) => {
        if (event.newState === 'closed') DashboardFilters.close(picker)
      },
      { signal },
    )
    panel.addEventListener(
      'focusout',
      (event) => {
        if (event.relatedTarget && !panel.contains(event.relatedTarget)) hide()
      },
      { signal },
    )
    window.addEventListener('resize', () => hide(), { signal })
    window.addEventListener(
      'scroll',
      (event) => {
        if (!panel.contains(event.target)) hide()
      },
      { signal, capture: true },
    )
    const iconClick = ({ name, col, row, event }) => {
      const native = event?.nativeEvent || event
      if (name !== 'dashboard-table-filter' || (native?.button ?? event?.button ?? 0) !== 0) return
      cancelAnimationFrame(openFrame)
      // Open after the pointer gesture so native light-dismiss cannot consume it.
      openFrame = requestAnimationFrame(() => {
        openFrame = 0
        show(table.getHeaderField(col, row), col, row)
      })
    }
    const keyboard = (event) => {
      if (!event.altKey || event.key !== 'ArrowDown') return
      const range = table.getSelectedCellRanges()[0]
      if (!range) return
      event.preventDefault()
      event.stopPropagation()
      show(table.getHeaderField(range.start.col, 0), range.start.col, 0)
    }
    return {
      builder,
      bind(instance) {
        table = instance
        table.on('icon_click', iconClick)
        host.addEventListener('keydown', keyboard, { signal, capture: true })
      },
      updateRows(values) {
        rows = values.map((row, index) =>
          Object.fromEntries([
            ...fields.map((field, col) => [
              field,
              types[col] === 'string' ? (row[col] ?? null) : Number.isFinite(row[col]) ? row[col] : null,
            ]),
            ['__row_order', index],
          ]),
        )
        sourceVersion++
        builder.limit.setLimit(Math.max(rows.length, 1))
        return refresh()
      },
      refresh,
      dispose() {
        disposed = true
        revision++
        pending?.abort()
        activity?.cancel()
        hide()
        events.abort()
        unmount()
        panel.remove()
        table?.off('icon_click', iconClick)
        void queue
          .catch(() => {})
          .then(async () => {
            DashboardData.release(vbi, builder)
            await source.dispose()
          })
          .catch(() => {})
      },
    }
  }
  async function createDetails({ vbi, query, Builder, VChart, connectorId, columns, rows, host, count }) {
    const library = await load()
    const id = `${connectorId}-records`
    const fields = columns.map((_, i) => `c${i}`)
    const types = fields.map((_, i) => {
      const value = rows.find((row) => row[i] != null)?.[i]
      return typeof value === 'number' ? 'number' : 'string'
    })
    const schema = [...fields.map((name, i) => ({ name, type: types[i] })), { name: '__row_order', type: 'number' }]
    const records = (values) =>
      values.map((row, index) =>
        Object.fromEntries([...fields.map((field, i) => [field, row[i] ?? null]), ['__row_order', index]]),
      )
    const connection = await DashboardData.connect(vbi, query, id, schema, records(rows))
    const source = vbi.query.create(vbi.query.createEmpty(id))
    source.queryMode.setMode('detail')
    source.limit.setLimit(Math.max(rows.length, 1))
    fields.forEach((field, i) => source.dimensions.add(field, (node) => node.setAlias(columns[i])))
    source.dimensions.add('__row_order', (node) => node.setSort({ order: 'asc' }))
    const number = (value) => new Intl.NumberFormat('zh-CN', { maximumSignificantDigits: 4 }).format(value)
    let table,
      profiles = [],
      currentRows = [],
      totalCount = 0,
      disposed = false,
      scopeVersion = 0,
      profileKey,
      scopeKey,
      scopeRequest = 0,
      scopePending,
      scopeJob = Promise.resolve(),
      renderJob = Promise.resolve()
    library.register.chartModule('vchart', VChart)
    async function profile(values, signal, isCurrent) {
      const key = JSON.stringify([scopeVersion, view.builder.whereFilter.toJSON()])
      if (key === profileKey) return profiles
      const dimensions = view.builder.build().dimensions
      const ids = fields.map((field) => dimensions.find((dimension) => dimension.field === field).id)
      const statistics = await view.builder.queryProfile({
        columns: ids,
        bins: { discreteMax: Math.max(values.length, 1) },
        topK: Math.max(values.length, 1),
        emptyString: 'missing',
        signal,
      })
      if (!isCurrent()) return
      const total = statistics.rowCount
      const next = fields.map((_, i) => {
        const info = statistics.columns[ids[i]]
        const missing = info.missingCount
        const percentage = (n) => (total ? `${((n / total) * 100).toFixed(2)}%` : '0.0%')
        if (types[i] === 'number') {
          const range = Number.isFinite(info.min) ? { min: info.min, max: info.max } : undefined
          if (range) {
            const discrete = Number.isInteger(range.min) && Number.isInteger(range.max) && range.max - range.min <= 20
            range.size = range.min === range.max ? 1 : discrete ? range.max - range.min + 1 : 12
            range.step = range.min === range.max || discrete ? 1 : (range.max - range.min) / range.size
          }
          const counts = new Map()
          // Place SQL value frequencies in the existing display intervals without re-encoding source rows.
          for (const bin of info.bins || []) {
            const slot = Math.min(range.size - 1, Math.max(0, Math.floor((bin.min - range.min) / range.step)))
            counts.set(slot, (counts.get(slot) || 0) + bin.count)
          }
          const bins = range
            ? Array.from({ length: range.size }, (_, bin) => {
                const low = range.min + bin * range.step,
                  high = bin === range.size - 1 && range.size === 12 ? range.max : low + range.step
                return {
                  bin: range.min === range.max ? number(low) : `${number(low)}–${number(high)}`,
                  count: counts.get(bin) || 0,
                  kind: '有效值',
                }
              })
            : []
          if (missing) bins.push({ bin: '缺失值', count: missing, kind: '缺失值' })
          return {
            total,
            missing,
            bins: bins.map((bin) => ({ ...bin, share: total ? (bin.count / total) * 100 : 0 })),
            text: total
              ? `${range ? `${number(range.min)}–${number(range.max)}` : '无有效数值'}；缺失 ${missing} 行（${percentage(missing)}）`
              : '暂无记录',
          }
        }
        const valid = (info.top || [])
          .map(({ value: key, count }) => ({ key, count }))
          .sort((a, b) => b.count - a.count || String(a.key).localeCompare(String(b.key)))
        const take = valid.length <= (missing ? 2 : 3) ? valid.length : missing ? 1 : 2
        const visible = valid.slice(0, take).map((row) => ({ label: String(row.key), count: row.count }))
        if (take < valid.length)
          visible.push({
            label: `其他 ${valid.length - take} 项`,
            count: total - missing - visible.reduce((sum, row) => sum + row.count, 0),
          })
        if (missing) visible.push({ label: '缺失值', count: missing, missing: true })
        if (!visible.length) visible.push({ label: '暂无记录', count: 0 })
        const lines = visible.map((row) => ({
          ...row,
          value: `${row.count.toLocaleString('zh-CN')} 行 · ${percentage(row.count)}`,
        }))
        return { total, missing, lines, text: lines.map((row) => `${row.label}：${row.value}`).join('\n') }
      })
      profiles = next
      profileKey = key
      return next
    }
    function draw(appearanceOnly = false) {
      if (disposed || !profiles.length) return
      const tokens = readTokens(host),
        css = getComputedStyle(host)
      const accent = css.getPropertyValue('--accent').trim(),
        down = css.getPropertyValue('--down').trim()
      try {
        const text = tokens.color('--table-text'),
          muted = tokens.color('--text-secondary'),
          missing = down || '#c64a3f'
        const seed = Builder.from({
          chartType: 'table',
          dataset: records(currentRows),
          dimensions: fields.map((id, i) => ({
            id,
            alias: columns[i],
            encoding: 'column',
            width:
              types[i] === 'number'
                ? Math.max(164, Math.min(220, columns[i].length * 8 + 34))
                : Math.max(230, Math.min(280, columns[i].length * 8 + 34)),
          })),
          widthMode: 'standard',
          emptyCellText: '—',
          backgroundColor: 'transparent',
          animation: { enable: !reducedMotion() },
        }).build()
        seed.columns = fields.map((field, i) => {
          const info = profiles[i]
          const numeric = types[i] === 'number'
          const chartSpec =
            numeric && info.total
              ? Builder.from({
                  chartType: 'column',
                  dataset: info.bins.map((bin) => ({ ...bin, bin: `${bin.bin} · ${bin.share.toFixed(2)}%` })),
                  dimensions: [
                    { id: 'bin', alias: columns[i], encoding: 'xAxis' },
                    { id: 'kind', alias: '数据状态', encoding: 'color' },
                  ],
                  measures: [
                    { id: 'count', alias: '记录数', encoding: 'yAxis', format: { type: 'number', fractionDigits: 0 } },
                  ],
                  color: {
                    colorScheme: info.bins.some((bin) => bin.kind === '有效值') ? [accent, missing] : [missing],
                  },
                  backgroundColor: 'transparent',
                  xAxis: { visible: false },
                  yAxis: { visible: false, zero: true },
                  legend: { enable: false },
                  label: { enable: false },
                  tooltip: { enable: true },
                  animation: { enable: false },
                  barStyle: { barRadius: 2, barGradient: true, barBorderWidth: 0, barBorderOpacity: 0 },
                }).build()
              : undefined
          if (chartSpec) chartSpec.padding = { top: 4, right: 4, bottom: 4, left: 4 }
          return {
            ...seed.columns.find((column) => column.field === field),
            headerIcon: filterIcon(),
            headerStyle: { textAlign: numeric ? 'right' : 'left' },
            style: (args) => ({ padding: args.row === 1 ? 6 : [10, 12], textAlign: numeric ? 'right' : 'left' }),
            aggregation: {
              aggregationType: 'CUSTOM',
              aggregationFun: () => (numeric ? (info.total ? chartSpec.data.values : '暂无记录') : info.text),
              showOnTop: true,
            },
            cellType: numeric ? (args) => (args.row === 1 && info.total ? 'chart' : 'text') : 'text',
            ...(numeric
              ? { chartModule: 'vchart', chartSpec }
              : {
                  customRender: (args) => {
                    if (args.row !== 1)
                      return { elements: [], expectedHeight: 0, expectedWidth: 0, renderDefault: true }
                    const width = (args.rect || args.table.getCellRect(args.col, args.row)).width
                    return {
                      renderDefault: false,
                      expectedHeight: 86,
                      expectedWidth: width,
                      elements: info.lines.flatMap((line, index) => [
                        {
                          type: 'text',
                          x: 6,
                          y: 16 + index * 22,
                          text: line.label,
                          fontSize: 11,
                          fontFamily: tokens.fontFamily,
                          fill: line.missing ? missing : text,
                          textBaseline: 'middle',
                          maxLineWidth: Math.max(28, width - 132),
                        },
                        {
                          type: 'text',
                          x: width - 6,
                          y: 16 + index * 22,
                          text: line.value,
                          fontSize: 11,
                          fontFamily: tokens.fontFamily,
                          fill: line.missing ? missing : muted,
                          textBaseline: 'middle',
                          textAlign: 'right',
                        },
                      ]),
                    }
                  },
                }),
          }
        })
        const resolved = options(seed, host)
        resolved.autoFillWidth = false
        resolved.frozenRowCount = 2
        resolved.customComputeRowHeight = (args) => (args.row === 1 ? 86 : undefined)
        resolved.keyboardOptions = {
          ...resolved.keyboardOptions,
          getCopyCellValue: {
            value: (col, row) => (row === 1 ? profiles[col].text.replace(/\n/g, '；') : table.getCellValue(col, row)),
          },
        }
        resolved.tooltip = { isShowOverflowTextTooltip: true, parentElement: document.body }
        host.style.height = `${Math.min(560, 86 + resolved.defaultHeaderRowHeight + Math.max(1, Math.min(currentRows.length, 9)) * resolved.defaultRowHeight + 14)}px`
        host.dataset.recordCount = String(currentRows.length)
        host.setAttribute('aria-label', `原始记录明细表，${currentRows.length} 条记录；第二行为列概况`)
        count.textContent =
          currentRows.length === totalCount
            ? `${currentRows.length.toLocaleString('zh-CN')} 条记录`
            : `${currentRows.length.toLocaleString('zh-CN')} / ${totalCount.toLocaleString('zh-CN')} 条记录`
        if (table) {
          update(table, resolved, { records: !appearanceOnly })
          if (appearanceOnly) table.updateTheme(resolved.theme)
        } else {
          table = new library.ListTable(host, resolved)
          view.bind(table)
        }
      } finally {
        tokens.dispose()
      }
    }
    const view = await createView({
      vbi,
      query,
      connectorId: id,
      columns,
      types,
      host,
      render(values, total, context) {
        renderJob = (async () => {
          const result = await profile(values, context.signal, context.isCurrent)
          if (!result || !context.isCurrent() || disposed) return
          currentRows = values
          totalCount = total
          draw()
        })()
        return renderJob
      },
    })
    const observer = new ResizeObserver(() => {
      if (host.clientWidth && host.clientHeight) table?.resize()
    })
    observer.observe(host)
    return {
      view,
      get table() {
        return table
      },
      get profiles() {
        return profiles
      },
      repaint: () => draw(true),
      updateScope(conditions) {
        const key = JSON.stringify(conditions)
        if (key === scopeKey) return scopeJob
        scopeKey = key
        const ticket = ++scopeRequest
        scopePending?.abort()
        scopePending = new AbortController()
        source.doc.transact(() => {
          source.whereFilter.clear()
          conditions.forEach((condition) =>
            source.whereFilter.add(`c${condition.column}`, (node) =>
              node.setOperator(condition.operator || 'eq').setValue(condition.value),
            ),
          )
        })
        scopeJob = (async () => {
          try {
            const result = await source.query({ signal: scopePending.signal })
            if (disposed || ticket !== scopeRequest) return
            scopeVersion++
            const dimensions = source.build().dimensions
            const ids = fields.map((field) => dimensions.find((dim) => dim.field === field).id)
            await view.updateRows(result.dataset.map((row) => ids.map((field) => row[field] ?? null)))
          } catch (error) {
            if (!disposed && ticket === scopeRequest && error.name !== 'AbortError') {
              scopeKey = undefined
              throw error
            }
          }
        })()
        return scopeJob
      },
      dispose() {
        if (disposed) return
        disposed = true
        scopeRequest++
        scopePending?.abort()
        observer.disconnect()
        view.dispose()
        table?.release()
        void Promise.allSettled([scopeJob, renderJob])
          .then(async () => {
            DashboardData.release(vbi, source)
            await connection.dispose()
          })
          .catch(() => {})
      },
    }
  }

  return { load, options, build, overview, update, setRecords, createView, createDetails }
})()
