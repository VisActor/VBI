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
    try {
      return {
        color,
        number: (name) => parseFloat(style.getPropertyValue(name)),
        fontFamily: style.getPropertyValue('--font-ui').trim(),
        dispose: () => probe.remove(),
      }
    } catch (error) {
      probe.remove()
      throw error
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
  function build(Builder, { dataset, dimensions, measures, totals = 'avg' }, host) {
    const tokens = readTokens(host)
    try {
      const spec = Builder.from({
        chartType: 'table',
        dataset,
        dimensions,
        measures,
        totals,
        locale: 'zh-CN',
        theme: 'light',
        bodyCellStyle: {
          selector: { field: measures.map(({ id }) => id) },
          enableProgressBar: true,
          barPositiveColor: tokens.color('--table-bar-positive'),
          barNegativeColor: tokens.color('--table-bar-negative'),
        },
      }).build()
      spec.columns = spec.columns.map((column) => {
        const textAlign = measures.some(({ id }) => id === column.field) ? 'right' : 'left'
        const style = column.style
        const aggregation = column.aggregation
        return {
          ...column,
          ...(aggregation?.aggregationType !== 'NONE' && aggregation?.formatFun
            ? {
                aggregation: {
                  ...aggregation,
                  formatFun: (value, ...args) => (Number.isFinite(value) ? aggregation.formatFun(value, ...args) : '—'),
                },
              }
            : {}),
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
    const fields = columns.map((alias, index) => ({ id: `c${index}`, alias, encoding: 'column' }))
    const base = build(
      Builder,
      {
        dataset: records,
        dimensions: fields.filter((_, index) => !summary.fields.includes(index)),
        measures: fields.filter((_, index) => summary.fields.includes(index)),
        totals: summary.type,
      },
      host,
    )
    base.columns = columns.map((title, index) => {
      const column = base.columns.find((column) => column.field === `c${index}`)
      const textAlign = index === 0 ? 'left' : 'right'
      const style = column.style
      return {
        ...column,
        headerIcon: filterIcon(),
        fieldFormat: (record) =>
          record[`c${index}`] == null
            ? '—'
            : formats[index]
              ? formats[index](record[`c${index}`])
              : record[`c${index}`],
        ...(formats[index] && summary.fields.includes(index)
          ? {
              aggregation: {
                ...column.aggregation,
                formatFun: (value) => (Number.isFinite(value) ? formats[index](value) : '—'),
              },
            }
          : {}),
        width: index === 0 ? 170 : Math.max(130, Math.min(210, title.length * 12 + 24)),
        headerStyle: { ...column.headerStyle, textAlign },
        style: (datum) => ({ ...(typeof style === 'function' ? style(datum) : style), textAlign }),
      }
    })
    base.widthMode = 'standard'
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
        ...(column.headerIcon
          ? {
              headerIcon:
                table.options.columns.find(({ field }) => field === column.field)?.headerIcon || column.headerIcon,
            }
          : {}),
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
    const source = { type: 'json', rawDataset: [] }
    if (await query.hasDataset(id)) await query.updateDatasetSource(id, schema, source)
    else await query.createDataset(id, schema, source)
    vbi.connectors.register(id, {
      discoverSchema: async () => schema,
      query: async ({ queryDSL }) => {
        const dataset = await query.connectDataset(id)
        try {
          return await dataset.query(queryDSL)
        } finally {
          await dataset.disconnect()
        }
      },
    })
    const builder = vbi.chart.create(vbi.chart.createEmpty(id))
    builder.chartType.changeChartType('table')
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
    panel.className = 'df-menu dashboard-table-menu'
    panel.setAttribute('popover', 'auto')
    panel.setAttribute('role', 'dialog')
    panel.innerHTML = `<header class="dashboard-table-menu-heading"><strong data-dt="title"></strong><button type="button" data-dt="clear" title="清除本列筛选" aria-label="清除本列筛选">清除</button></header>
      <div class="dashboard-table-sort-row"><div class="segment dashboard-table-sort" role="group" aria-label="列排序"><button type="button" data-sort="asc"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 13V3m-2 2 2-2 2 2m3-1h5M9 8h4m-4 4h2"/></svg>升序</button><button type="button" data-sort="desc"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 3v10m-2-2 2 2 2-2m3-7h2M9 8h4m-4 4h5"/></svg>降序</button></div><button type="button" class="df-icon dashboard-table-icon" data-filter-control="icon" data-sort="normal" title="恢复默认顺序" aria-label="恢复默认顺序"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 6a5 5 0 1 1 0 5M3 2v4h4"/></svg></button></div>
      <div class="dashboard-table-rule" data-dt="rule"><details data-filter-control="selector" data-menu-min-width="184" data-menu-align="start" aria-label="筛选条件"><summary><span data-control-label></span></summary><div data-control-options role="group" aria-label="筛选条件"></div></details><div class="dashboard-table-values" data-dt="values"><input class="df-search" data-dt="low" autocomplete="off" spellcheck="false"><span data-dt="separator" aria-hidden="true">—</span><input class="df-search" data-dt="high" type="number" step="any" autocomplete="off"></div></div>
      <p class="dashboard-table-feedback" data-dt="feedback" role="status"></p>
      <footer class="dashboard-table-actions"><button type="button" data-dt="reset">清除全部筛选</button><button type="button" data-dt="apply">筛选</button></footer>`
    ;(host.closest('dialog') || document.body).append(panel)
    const nodes = Object.fromEntries([...panel.querySelectorAll('[data-dt]')].map((node) => [node.dataset.dt, node]))
    const picker = panel.querySelector('details')
    const operatorList = picker.querySelector('[data-control-options]')
    const unmount = DashboardFilters.mount(panel)
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
    function refresh() {
      const ticket = ++revision
      pending?.abort()
      const task = queue
        .catch(() => {})
        .then(async () => {
          if (disposed || ticket !== revision) return false
          pending = new AbortController()
          host.setAttribute('aria-busy', 'true')
          try {
            if (loadedVersion !== sourceVersion) {
              const version = sourceVersion
              await query.updateDatasetSource(id, schema, { type: 'json', rawDataset: rows })
              loadedVersion = version
            }
            if (disposed || ticket !== revision) return false
            const seed = await builder.buildVSeed({ signal: pending.signal })
            if (disposed || ticket !== revision) return false
            const dimensions = builder.build().dimensions
            const ids = fields.map((field) => dimensions.find((dim) => dim.field === field).id)
            await render(
              seed.dataset.map((record) => ids.map((key) => record[key] ?? null)),
              rows.length,
              { signal: pending.signal, isCurrent: () => !disposed && ticket === revision },
            )
            if (disposed || ticket !== revision) return false
            headers()
            return true
          } catch (error) {
            if (disposed || ticket !== revision || error.name === 'AbortError') return false
            throw error
          } finally {
            if (!disposed && ticket === revision) host.setAttribute('aria-busy', 'false')
          }
        })
      queue = task
      return task
    }
    async function submit(action) {
      const field = activeField
      nodes.feedback.textContent = ''
      try {
        action()
        if ((await refresh()) && activeField === field) hide(true)
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
          }),
        { signal },
      ),
    )
    const clear = (field) => predicates(field).forEach((condition) => builder.whereFilter.remove(condition.id))
    nodes.clear.addEventListener('click', () => void submit(() => clear(activeField)), { signal })
    nodes.reset.addEventListener('click', () => void submit(() => builder.whereFilter.clear()), { signal })
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
        void submit(() =>
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
        hide()
        events.abort()
        unmount()
        panel.remove()
        table?.off('icon_click', iconClick)
        void queue
          .catch(() => {})
          .then(async () => {
            vbi.resources.chart.unregister(builder.getUUID())
            builder.undoManager?.destroy()
            builder.doc.destroy()
            vbi.connectors.unregister(id)
            await query.dropDataset(id)
          })
          .catch(() => {})
      },
    }
  }
  async function createDetails({ vbi, query, Builder, VChart, connectorId, columns, rows, host, count }) {
    const library = await load()
    const id = `${connectorId}-records`,
      profileId = `${id}-profiles`
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
    const register = async (name, dataSchema, rawDataset) => {
      if (await query.hasDataset(name)) await query.updateDatasetSource(name, dataSchema, { type: 'json', rawDataset })
      else await query.createDataset(name, dataSchema, { type: 'json', rawDataset })
      vbi.connectors.register(name, {
        discoverSchema: async () => dataSchema,
        query: async ({ queryDSL }) => {
          const dataset = await query.connectDataset(name)
          try {
            return await dataset.query(queryDSL)
          } finally {
            await dataset.disconnect()
          }
        },
      })
    }
    await register(id, schema, records(rows))
    const profileSchema = [
      ...schema,
      ...fields.flatMap((_, i) => (types[i] === 'number' ? [{ name: `b${i}`, type: 'number' }] : [])),
    ]
    await register(profileId, profileSchema, [])
    const builders = []
    const make = (name) => {
      const chart = vbi.chart.create(vbi.chart.createEmpty(name))
      chart.chartType.changeChartType('table')
      chart.limit.setLimit(Math.max(rows.length, 1))
      builders.push(chart)
      return chart
    }
    const source = make(id)
    fields.forEach((field, i) => source.dimensions.add(field, (node) => node.setAlias(columns[i])))
    source.dimensions.add('__row_order', (node) => node.setSort({ order: 'asc' }))
    const bounds = make(profileId)
    bounds.measures.add('__row_order', (node) => node.setAlias('total').setAggregate({ func: 'count' }))
    fields.forEach((field, i) => {
      if (types[i] !== 'number') return
      for (const func of ['min', 'max'])
        bounds.measures.add(field, (node) => node.setAlias(`${func}${i}`).setAggregate({ func }))
    })
    const frequencies = fields.map((field, i) => {
      const chart = make(profileId)
      chart.dimensions.add(types[i] === 'number' ? `b${i}` : field, (node) => node.setSort({ order: 'asc' }))
      chart.measures.add('__row_order', (node) => node.setAggregate({ func: 'count' }))
      return chart
    })
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
      const data = records(values).map((record) => ({
        ...record,
        ...Object.fromEntries(
          fields.map((field, i) => [field, types[i] === 'string' && record[field] === '' ? null : record[field]]),
        ),
        ...Object.fromEntries(fields.flatMap((_, i) => (types[i] === 'number' ? [[`b${i}`, null]] : []))),
      }))
      await query.updateDatasetSource(profileId, profileSchema, { type: 'json', rawDataset: data })
      const seed = await bounds.buildVSeed({ signal })
      if (!isCurrent()) return
      const summary = Object.fromEntries(bounds.build().measures.map((m) => [m.alias, seed.dataset[0]?.[m.id]]))
      const ranges = fields.map((_, i) => {
        if (types[i] !== 'number' || !Number.isFinite(summary[`min${i}`])) return
        const min = summary[`min${i}`],
          max = summary[`max${i}`]
        const discrete = Number.isInteger(min) && Number.isInteger(max) && max - min <= 20
        const size = min === max ? 1 : discrete ? max - min + 1 : 12
        return { min, max, size, step: min === max || discrete ? 1 : (max - min) / size }
      })
      // Binning is a per-record encoding; all frequencies are counted by VBI below.
      const binned = data.map((record) => ({
        ...record,
        ...Object.fromEntries(
          fields
            .map((field, i) => {
              const range = ranges[i],
                value = record[field]
              return [
                `b${i}`,
                range && Number.isFinite(value)
                  ? Math.min(range.size - 1, Math.max(0, Math.floor((value - range.min) / range.step)))
                  : -1,
              ]
            })
            .filter((_, i) => types[i] === 'number'),
        ),
      }))
      await query.updateDatasetSource(profileId, profileSchema, { type: 'json', rawDataset: binned })
      const seeds = await Promise.all(frequencies.map((chart) => chart.buildVSeed({ signal })))
      if (!isCurrent()) return
      const total = Number(summary.total) || 0
      const next = seeds.map((result, i) => {
        const dsl = frequencies[i].build(),
          dimension = dsl.dimensions[0].id,
          measure = dsl.measures[0].id
        const entries = result.dataset.map((row) => ({ key: row[dimension], count: Number(row[measure]) }))
        const missing =
          entries.find((row) => row.key == null || row.key === '' || (types[i] === 'number' && row.key === -1))
            ?.count || 0
        const percentage = (n) => (total ? `${((n / total) * 100).toFixed(2)}%` : '0.0%')
        if (types[i] === 'number') {
          const range = ranges[i],
            counts = new Map(entries.map((row) => [Number(row.key), row.count]))
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
        const valid = entries
          .filter((row) => row.key != null && row.key !== '')
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
          dimensions: fields.map((field, i) => ({ id: field, alias: columns[i], encoding: 'column' })),
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
            field,
            title: columns[i],
            width: numeric
              ? Math.max(164, Math.min(220, columns[i].length * 8 + 34))
              : Math.max(230, Math.min(280, columns[i].length * 8 + 34)),
            headerIcon: filterIcon(),
            headerStyle: { textAlign: numeric ? 'right' : 'left' },
            style: (args) => ({ padding: args.row === 1 ? 6 : [10, 12], textAlign: numeric ? 'right' : 'left' }),
            fieldFormat: (record) => (record[field] == null ? '—' : record[field]),
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
        resolved.widthMode = 'standard'
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
            const seed = await source.buildVSeed({ signal: scopePending.signal })
            if (disposed || ticket !== scopeRequest) return
            scopeVersion++
            const dimensions = source.build().dimensions
            const ids = fields.map((field) => dimensions.find((dim) => dim.field === field).id)
            await view.updateRows(seed.dataset.map((row) => ids.map((field) => row[field] ?? null)))
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
            for (const chart of builders) {
              vbi.resources.chart.unregister(chart.getUUID())
              chart.undoManager?.destroy()
              chart.doc.destroy()
            }
            for (const name of [id, profileId]) {
              vbi.connectors.unregister(name)
              await query.dropDataset(name)
            }
          })
          .catch(() => {})
      },
    }
  }

  return { load, options, build, overview, update, setRecords, createView, createDetails }
})()
