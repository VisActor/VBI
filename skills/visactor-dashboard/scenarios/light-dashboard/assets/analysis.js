'use strict'

// 只消费 Builder 查询结果；统计口径、问题和可核查的下一步由页面配置。
window.DashboardAnalysis = function DashboardAnalysis(config, number) {
  const count = (row) => (Number.isFinite(row?.[config.countField]) ? row[config.countField] : 0)
  const value = (row) => {
    const numerator = row?.[config.field]
    if (!Number.isFinite(numerator)) return undefined
    if (!config.denominator) return numerator
    const denominator = row[config.denominator]
    if (!(denominator > 0)) return undefined
    return ((config.complement ? denominator - numerator : numerator) / denominator) * (config.factor || 1)
  }
  const format = (value) =>
    Number.isFinite(value) ? `${number(value / (config.scale || 1), config.digits ?? 1)}${config.unit || ''}` : '—'
  const dimensionLabel = (field, value) => config.valueLabels?.[field]?.[value] ?? String(value ?? '未记录')
  const rows = (data, dimensions) =>
    data
      .map((source) => {
        const values = dimensions.map(([field]) => source[field])
        const labels = dimensions.map(([field], index) => dimensionLabel(field, values[index]))
        return {
          key: JSON.stringify(values),
          label: labels.join(' / '),
          x: labels[1],
          y: labels[0],
          values,
          source,
          count: count(source),
          value: value(source),
        }
      })
      .filter((row) => row.count > 0 && Number.isFinite(row.value))
  const gap = (current, baseline) => {
    if (!Number.isFinite(current) || !Number.isFinite(baseline)) return '暂无可比基准'
    const delta = current - baseline
    if (Math.abs(delta / (config.scale || 1)) < 10 ** -(config.digits ?? 1) / 2) return '与当前范围基本持平'
    return `较当前范围${delta > 0 ? '高' : '低'} ${config.factor === 100 && config.unit === '%' ? `${number(Math.abs(delta), 1)} 个百分点` : format(Math.abs(delta))}`
  }
  const observation = (row, baseline) =>
    `${row.label}：${config.label} ${format(row.value)}，${gap(row.value, baseline)}；${config.countLabel || '来源记录'} ${number(row.count, 0)}`
  const summary = (groups, cross, total) => {
    const baseline = value(total)
    const totalCount = count(total)
    if (!totalCount || !Number.isFinite(baseline))
      return {
        conclusion: '当前筛选没有足够的有效记录支持这项分析。',
        evidence: ['可调整筛选范围，或核对缺失字段与分母。'],
      }
    const segments = rows(groups, [config.dimensions[0]])
    const cells = rows(cross, config.dimensions)
    const weight = (row) =>
      config.kind === 'rate'
        ? (row.count * row.value) / (config.factor || 100)
        : Math.abs(row.value - baseline) * row.count
    const focus = [...segments].sort((a, b) => weight(b) - weight(a) || b.count - a.count)[0]
    const contrast = cells.sort(
      (a, b) => Math.abs(b.value - baseline) * b.count - Math.abs(a.value - baseline) * a.count,
    )[0]
    const ranked = segments.sort((a, b) => a.value - b.value)
    const spread =
      ranked.length > 1
        ? `分组范围 ${format(ranked[0].value)}—${format(ranked.at(-1).value)}；分别涉及 ${number(ranked[0].count, 0)} 与 ${number(ranked.at(-1).count, 0)} 条来源记录。`
        : '当前筛选仅有一个有效分组，不能据此比较组间差异。'
    return {
      conclusion:
        config.kind === 'rate' && baseline === 0
          ? `当前范围${config.label}为 ${format(0)}，${config.countLabel || '来源记录'} ${number(totalCount, 0)}；没有已记录的事件差异支持分组排序。`
          : focus
            ? `${config.kind === 'rate' ? '事件记录较集中的分组为' : '结合差异与记录量，可先核对'} ${focus.label}，${config.label} ${format(focus.value)}，${gap(focus.value, baseline)}${config.kind === 'rate' ? `；该组占当前事件记录的 ${number((weight(focus) / ((totalCount * baseline) / (config.factor || 100))) * 100, 1)}%` : `；涉及 ${number(focus.count, 0)} 条来源记录`}。`
            : `当前范围${config.label} ${format(baseline)}。`,
      evidence: [
        `当前范围${config.label} ${format(baseline)}，${config.countLabel || '来源记录'} ${number(totalCount, 0)}。${spread}`,
        contrast && cells.length > 1
          ? `按差异与记录量联合定位，可先核对 ${observation(contrast, baseline)}。`
          : '当前范围的交叉分组不足，可扩大筛选后继续比较。',
        `下一步：${config.action}`,
      ],
    }
  }
  const finding = (current, total, selectedLabel) => {
    const baseline = value(total),
      currentValue = value(current)
    return selectedLabel
      ? `${config.label} ${format(currentValue)}，${gap(currentValue, baseline)}；${config.countLabel || '来源记录'} ${number(count(current), 0)}。分组差异用于核查，不表示因果。`
      : `当前范围${config.label} ${format(baseline)}；${config.countLabel || '来源记录'} ${number(count(total), 0)}。${config.action}`
  }
  const chartRows = (data, selected) => {
    const x = [...new Set(data.map((row) => row.x))].slice(0, 8)
    const allY = [...new Set(data.map((row) => row.y))]
    const y = config.dimensions[0][2] ? allY.slice(-12) : allY.slice(0, 12)
    const chosen = data.find((row) => row.key === selected)
    if (chosen) {
      if (!x.includes(chosen.x)) x.splice(Math.max(0, x.length - 1), 1, chosen.x)
      if (!y.includes(chosen.y)) y.splice(Math.max(0, y.length - 1), 1, chosen.y)
    }
    return data.filter((row) => x.includes(row.x) && y.includes(row.y))
  }
  return { ...config, count, value, format, dimensionLabel, rows, gap, summary, finding, chartRows }
}

// 指标分析的共享实现；随模板内嵌，保持单 HTML 交付。
window.bindMetricAnalysis = function bindMetricAnalysis({
  vbi,
  dataQuery,
  Builder,
  VChart,
  labelColor,
  motion,
  entries,
  getContext,
  ready,
  retryScope,
}) {
  let dialog, context, dimension, selection, chart, table, observer, activity
  let resolveContext,
    restoreFilters,
    scopePending = false,
    scopeError = false
  const globalFilters = document.querySelector('#filters')
  let tableView,
    tableViewKey,
    tableScope,
    tableDataVersion,
    tableFields = [],
    tableTypes = [],
    tableSequence = 0
  let version = 0,
    opener,
    previousOverflow,
    chartType,
    menuRows,
    analysisSpec,
    analysisKey,
    renderQueue = Promise.resolve()
  const lifetime = DashboardUI.scope()
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const sizes = new WeakMap()
  const resize = (instance, node) => {
    if (!instance) return
    const { clientWidth: width, clientHeight: height } = node
    const size = `${width}:${height}`
    if (width && height && sizes.get(instance) !== size) {
      sizes.set(instance, size)
      if (instance === chart) instance.resize(width, height)
      else instance.resize()
    }
  }
  const number = (value, digits = 1) => motion.formatNumber(value, digits, 0)
  const measure = (id, alias, encoding, metric = {}) => ({
    id,
    alias,
    encoding,
    format: { type: 'number', fractionDigits: metric.digits ?? 1, suffix: metric.unit || '' },
  })
  const nodes = {}
  const button = (label, action) => {
    const node = document.createElement('button')
    node.textContent = label
    node.type = 'button'
    node.addEventListener('click', action)
    return node
  }
  function createDialog() {
    if (dialog) return
    dialog = DashboardUI.createAnalysisDialog()
    for (const node of dialog.querySelectorAll('[data-ma]')) nodes[node.dataset.ma] = node
    activity = DashboardUI.activity({
      change(busy) {
        nodes.content.setAttribute('aria-busy', String(busy))
        nodes.groups.inert = busy
      },
    })
    document.body.append(dialog)
    nodes.picker.setAttribute('data-clear-selected', '')
    lifetime.add(DashboardFilters.mount(nodes.modes), DashboardFilters.mount(nodes.picker))
    lifetime.on(nodes.close, 'click', closeDialog)
    lifetime.on(nodes.retry, 'click', (event) => {
      if (scopeError) {
        beginScopeUpdate()
        retryScope()
      } else void refresh(true, event.currentTarget)
    })
    lifetime.on(nodes.expand, 'click', () => {
      const expanded = dialog.classList.toggle('ma-expanded')
      nodes.expand.setAttribute('aria-expanded', String(expanded))
      nodes.expand.textContent = expanded ? '返回分析布局' : '展开表格'
      resize(table, nodes.table)
      resize(chart, nodes.chart)
    })
    lifetime.on(dialog, 'cancel', (event) => {
      event.preventDefault()
      closeDialog()
    })
    let backdropPress = false
    const isBackdrop = (event) => {
      const { left, right, top, bottom } = dialog.querySelector('.ma-shell').getBoundingClientRect()
      return (
        event.target === dialog &&
        (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom)
      )
    }
    lifetime.on(
      dialog,
      'pointerdown',
      (event) => {
        backdropPress = event.isPrimary && event.button === 0 && isBackdrop(event)
      },
      { capture: true },
    )
    lifetime.on(dialog, 'pointercancel', () => {
      backdropPress = false
    })
    lifetime.on(dialog, 'click', (event) => {
      const dismiss = backdropPress && event.button === 0 && isBackdrop(event)
      backdropPress = false
      if (dismiss) closeDialog()
    })
    lifetime.on(dialog, 'close', () => {
      backdropPress = false
      if (!dialog.open && context) cleanup()
    })
    observer = new ResizeObserver(() => {
      if (dialog.open) {
        resize(chart, nodes.chart)
        resize(table, nodes.table)
      }
    })
    observer.observe(nodes.chart)
    observer.observe(nodes.table)
  }
  function selectGroup(key) {
    selection = selection === key ? undefined : key
    void refresh(false, nodes['picker-label'])
  }
  function selectDimension(event) {
    if (!dialog?.open || nodes.groups.inert || dimension?.[0].startsWith('__')) return
    // 与原生 crosshair 使用同一维度命中，不要求鼠标或手指落在线条上。
    const datum = event.dimensionInfo
      ?.flatMap((info) => info.data || [])
      .flatMap((data) => data.datum || [])
      .find((row) => row.key !== undefined)
    if (datum && groupRows?.some((row) => row.key === String(datum.key))) selectGroup(String(datum.key))
  }
  function selectDiagnostic(event) {
    if (!dialog?.open || nodes.groups.inert || !dimension?.[0].startsWith('__')) return
    const key = event.datum?.key
    if (key !== undefined && groupRows?.some((row) => row.key === key)) selectGroup(key)
  }
  function completeClose() {
    if (dialog?.open) dialog.close()
    cleanup()
  }
  function closeDialog() {
    DashboardFilters.close(nodes.picker)
    if (!dialog?.open || dialog.dataset.closing === 'true') return
    // 退场开始就让旧查询失效，但保留当前 Canvas 直到画面退场完成。
    cancelRefresh()
    if (reducedMotion.matches) return completeClose()
    const panel = dialog.querySelector('.ma-shell')
    const current = getComputedStyle(panel)
    const from = { opacity: current.opacity, transform: current.transform }
    panel.getAnimations().forEach((animation) => animation.cancel())
    dialog.dataset.closing = 'true'
    nodes['global-filters'].inert = true
    const exit = panel.animate([from, { opacity: 0, transform: 'translate3d(0, 24px, 0) scale(0.96)' }], {
      duration: 220,
      easing: 'cubic-bezier(.4,0,1,1)',
      fill: 'forwards',
    })
    exit.finished
      .then(() => {
        if (dialog.dataset.closing === 'true') completeClose()
      })
      .catch(() => {})
  }
  function cancelRefresh() {
    version++
    activity?.cancel()
    if (dialog) motion.cancelMetric(nodes.value)
  }
  function cleanup() {
    cancelRefresh()
    renderQueue = Promise.resolve()
    if (dialog) {
      delete dialog.dataset.contentEnter
      delete dialog.dataset.closing
    }
    dialog?.getAnimations({ subtree: true }).forEach((animation) => animation.cancel())
    chart?.release()
    chart = undefined
    tableView?.dispose()
    tableView = tableViewKey = undefined
    tableFields = tableTypes = []
    table?.release()
    table = undefined
    chartType = undefined
    menuRows = analysisSpec = analysisKey = undefined
    context = resolveContext = undefined
    scopePending = scopeError = false
    if (restoreFilters) {
      DashboardAppearance.close()
      restoreFilters()
      restoreFilters = undefined
    }
    if (dialog) {
      nodes['global-filters'].inert = false
      nodes.content.inert = false
    }
    if (previousOverflow !== undefined) {
      document.body.style.overflow = previousOverflow
      previousOverflow = undefined
    }
    opener?.focus({ preventScroll: true })
  }
  async function query(dimensions, conditions, measures, signal) {
    const builder = vbi.query.create(vbi.query.createEmpty(context.connectorId))
    builder.limit.setLimit(context.rowLimit)
    for (const [field, label] of dimensions)
      builder.dimensions.add(field, (node) => node.setAlias(label).setSort({ order: 'asc' }))
    for (const [field, label, func] of measures)
      builder.measures.add(field, (node) => node.setAlias(label).setAggregate({ func }))
    for (const condition of [...(context.entryConditions || []), ...conditions])
      builder.whereFilter.add(condition.field, (node) =>
        node.setOperator(condition.operator || 'eq').setValue(condition.value),
      )
    try {
      return await DashboardData.rows(builder, signal)
    } finally {
      DashboardData.release(vbi, builder)
    }
  }
  function buildDiagnosticSpec(group, chartRows, selected) {
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
    const analysis = context.analysis
    const matrix = group[0] === '__cross'
    const relation = matrix ? undefined : analysis.relation
    const yAxis = relation?.y || analysis
    const xMean = matrix ? undefined : totalRow[relation.x.field]
    const yMean =
      matrix || !Number.isFinite(totalRow[relation.y.field])
        ? undefined
        : totalRow[relation.y.field] / (yAxis.scale || 1)
    const key = JSON.stringify([group[0], chartRows, xMean, yMean, reducedMotion.matches, accent])
    if (key !== analysisKey) {
      const axis = (titleText) => ({
        visible: true,
        zero: true,
        label: { labelColor: labelColor || '#64717e', labelFontSize: 11 },
        title: { visible: !!titleText, titleText, titleColor: labelColor || '#64717e', titleFontSize: 11 },
      })
      const meanLine = {
        textPosition: 'insideEnd',
        textColor: labelColor || '#64717e',
        textFontSize: 10,
        textBackgroundColor: 'rgba(255, 255, 255, 0.8)',
        textBackgroundBorderWidth: 0,
        textBackgroundBorderRadius: 3,
        textBackgroundPadding: 3,
        lineColor: accent,
        lineVisible: true,
        lineStyle: 'dashed',
        lineWidth: 1,
      }
      analysisSpec = Builder.from({
        chartType: matrix ? 'heatmap' : 'scatter',
        dataset: chartRows.map((row) => ({
          ...row,
          value: row.value / (yAxis.scale || 1),
          colorValue: row.value / (analysis.scale || 1),
        })),
        dimensions: matrix
          ? [
              { id: 'x', alias: analysis.dimensions[1][1], encoding: 'xAxis' },
              { id: 'y', alias: analysis.dimensions[0][1], encoding: 'yAxis' },
            ]
          : [{ id: 'label', alias: relation.pointLabel, encoding: 'detail' }],
        measures: [
          matrix
            ? measure('colorValue', analysis.label, 'color', analysis)
            : measure('xValue', relation.x.label, 'xAxis', relation.x),
          measure('value', yAxis.label, matrix ? 'label' : 'yAxis', yAxis),
          measure('count', matrix ? analysis.countLabel || '来源记录数' : relation.countLabel, 'tooltip', {
            digits: 0,
          }),
        ],
        backgroundColor: 'transparent',
        color: { colorScheme: [accent], linearColorScheme: ['#f1f4f8', accent] },
        legend: { enable: false },
        label: {
          enable: matrix,
          showValue: false,
          showDimension: false,
          labelFontSize: 11,
          labelStroke: false,
          labelColorSmartInvert: true,
          labelOverlap: true,
        },
        tooltip: { enable: true },
        xAxis: axis(relation?.x.label),
        yAxis: axis(relation?.y.label),
        size: matrix ? 10 : relation.size || 6,
        annotationHorizontalLine: Number.isFinite(yMean)
          ? {
              ...meanLine,
              yValue: yMean,
              text: `Y 均值 ${number(yMean, yAxis.digits ?? 1)}${yAxis.unit || ''}`,
              textAlign: 'right',
              textBaseline: 'bottom',
            }
          : undefined,
        annotationVerticalLine: Number.isFinite(xMean)
          ? {
              ...meanLine,
              xValue: xMean,
              text: `X 均值 ${number(xMean, relation.x.digits ?? 1)}${relation.x.unit || ''}`,
              textAlign: 'left',
              textBaseline: 'top',
            }
          : undefined,
        animation: motion.chartAnimation(550),
      }).build()
      // label 编码补进 tooltip 时会重复颜色指标，只保留一次指标值。
      if (matrix)
        analysisSpec.tooltip.mark.content = analysisSpec.tooltip.mark.content.filter(
          (item) => item.key !== analysis.label,
        )
      analysisSpec.padding = { top: 16, right: 22, bottom: 10, left: 6 }
      analysisKey = key
    }
    const mark = matrix ? 'cell' : 'point'
    return {
      ...analysisSpec,
      [mark]: {
        ...analysisSpec[mark],
        style: {
          ...analysisSpec[mark]?.style,
          fillOpacity: (datum) => (selected === undefined ? relation?.opacity || 1 : datum.key === selected ? 1 : 0.16),
        },
      },
    }
  }
  function buildAnalysisSpec(group, metric, chartRows, chartTitle, selected) {
    if (group[0].startsWith('__') && context.analysis) return buildDiagnosticSpec(group, chartRows, selected)
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
    const key = JSON.stringify([group[0], chartRows, reducedMotion.matches, accent])
    if (key !== analysisKey) {
      const valueMeasure = measure('value', chartTitle, group[2] ? 'yAxis' : 'xAxis', metric)
      analysisSpec = Builder.from({
        chartType: group[2] ? 'line' : 'bar',
        dataset: chartRows.map((row) => ({ ...row, value: row.value / (metric.scale || 1) })),
        dimensions: [{ id: 'key', alias: group[1], encoding: group[2] ? 'xAxis' : 'yAxis' }],
        measures: group[2] ? [valueMeasure] : [valueMeasure, { ...valueMeasure, encoding: 'color' }],
        backgroundColor: 'transparent',
        color: {
          colorScheme: [accent],
          linearColorScheme: [
            accent,
            getComputedStyle(document.documentElement).getPropertyValue('--chart-accent-end').trim(),
          ],
        },
        legend: { enable: false },
        label: { enable: false },
        tooltip: { enable: true },
        xAxis: { visible: true, zero: !group[2], ...(labelColor ? { label: { labelColor } } : {}) },
        yAxis: { visible: true, zero: !group[2], ...(labelColor ? { label: { labelColor } } : {}) },
        pointStyle: { pointVisible: true, pointBorderWidth: 0 },
        lineStyle: { lineSmooth: false },
        animation: motion.chartAnimation(550, true),
        barStyle: { barRadius: 3, barGradient: false },
      }).build()
      analysisKey = key
    }
    const spec = { ...analysisSpec }
    spec.padding = { top: 12, right: 20, bottom: 10, left: 4 }
    const mark = group[2] ? 'point' : 'bar'
    const opacity = (datum) => (selected === undefined || String(datum.key) === selected ? 1 : 0.24)
    spec[mark] = {
      ...spec[mark],
      style: {
        ...spec[mark]?.style,
        fillOpacity: opacity,
        strokeOpacity: opacity,
        ...(group[2]
          ? { size: (datum) => (String(datum.key) === selected ? 10 : 6), stroke: false, lineWidth: 0 }
          : {}),
      },
    }
    return spec
  }
  function buildTableOptions(detailDimensions, detailMeasures, records) {
    const field = ([id, alias]) => ({
      id,
      alias,
      encoding: 'column',
      width: Math.max(
        { country: 156, year: 72, id: 96, order_id: 110, order_date: 128, date: 128 }[id] || 96,
        Math.min(220, alias.length * 11 + 44),
      ),
    })
    const dimensions = detailDimensions.map(field)
    const measures = detailMeasures.map(([id, alias]) => ({
      ...field([id, alias]),
      format: { type: 'number', fractionDigits: 3 },
    }))
    const options = DashboardTable.build(
      Builder,
      {
        dataset: records,
        dimensions,
        measures,
        totals: context.tableTotals || 'avg',
      },
      nodes.table,
    )
    options.tooltip = { ...options.tooltip, parentElement: dialog, confine: true }
    options.defaultColWidth = 130
    return DashboardTable.options(options, nodes.table)
  }
  async function updateDetailTable(detailDimensions, detailMeasures, records, scope, library, isCurrent) {
    const definitions = [...detailDimensions, ...detailMeasures]
    const fields = definitions.map(([field]) => field)
    const columns = definitions.map(([, label]) => label)
    const types = fields.map((field, index) => {
      if (detailMeasures.some(([key]) => key === field)) return 'number'
      const value = records.find((record) => record[field] != null)?.[field]
      return value == null && tableFields[index] === field
        ? tableTypes[index]
        : typeof value === 'number'
          ? 'number'
          : 'string'
    })
    const key = JSON.stringify([fields, columns, types, context.tableTotals])
    if (key !== tableViewKey) {
      tableView?.dispose()
      tableView = undefined
      const model = context
      let nextView
      nextView = await DashboardTable.createView({
        vbi,
        query: dataQuery,
        connectorId: `${model.connectorId}-modal-${++tableSequence}`,
        fields,
        columns,
        types,
        host: nodes.table,
        render(values, totalCount, request) {
          if (!request.isCurrent() || context !== model || tableView !== nextView || tableDataVersion !== version)
            return
          const rows = values.map((values) => Object.fromEntries(fields.map((field, index) => [field, values[index]])))
          const options = buildTableOptions(detailDimensions, detailMeasures, rows)
          nodes.table.dataset.empty = String(!rows.length)
          const amount =
            rows.length === totalCount ? number(rows.length, 0) : `${number(rows.length, 0)} / ${number(totalCount, 0)}`
          nodes['table-scope'].textContent =
            `${tableScope} · ${amount} 条记录 · ${model.tableTotals === 'sum' ? '数值列合计' : '数值列平均（空值不计）'}`
          nodes['table-scope'].title = nodes['table-scope'].textContent
          nodes.table.setAttribute('aria-label', `关联明细，${tableScope}，${rows.length} 条记录`)
          if (table) DashboardTable.update(table, options)
          else {
            table = new library.ListTable(nodes.table, options)
            nextView.bind(table)
            sizes.set(table, `${nodes.table.clientWidth}:${nodes.table.clientHeight}`)
          }
        },
      })
      if (!isCurrent()) {
        nextView.dispose()
        return
      }
      tableView = nextView
      tableViewKey = key
      tableFields = fields
      tableTypes = types
      if (table) tableView.bind(table)
    }
    if (!isCurrent()) return
    tableDataVersion = version
    tableScope = scope
    await tableView.updateRows(records.map((record) => fields.map((field) => record[field] ?? null)))
  }
  function renderGroupPicker(group, metric, rows, selected) {
    nodes.picker.dataset.placeholder =
      group[0] === '__cross' ? '选择组合' : group[0] === '__relation' ? '选择观测' : `选择${group[1]}`
    nodes.picker.hidden = !rows.length
    if (rows !== menuRows) {
      nodes.groups.replaceChildren(
        ...rows.map((row) => {
          const choice = button(
            `${row.label || row.key} · ${(metric.groupFormat || metric.format)(row.value)}${row.count === undefined ? '' : ` · ${context.analysis?.countLabel || '来源记录数'} ${number(row.count, 0)}`}`,
            () => selectGroup(row.key),
          )
          choice.dataset.key = row.key
          return choice
        }),
      )
      menuRows = rows
    }
    for (const choice of nodes.groups.children)
      choice.setAttribute('aria-pressed', String(selected === choice.dataset.key))
    DashboardFilters.sync(nodes.picker)
  }
  let groupRows, totalRow, priorRow
  async function refresh(reload, control) {
    if (!dialog?.open || dialog.dataset.closing === 'true' || scopePending || scopeError) return
    const ticket = ++version
    const isCurrent = () => dialog.open && ticket === version
    const task = activity.start(DashboardFilters.trigger(control) || null, control ? 200 : 0)
    const hadContent = !nodes.content.hidden
    const { signal } = task
    dialog.dataset.state = 'loading'
    const model = context,
      group = dimension,
      selected = selection
    const analysis = model.analysis
    const diagnostic = !!analysis && group[0].startsWith('__')
    const metric =
      diagnostic && model.analysisConditions
        ? {
            ...model.metric,
            conditions: model.analysisConditions,
            groupConditions: model.analysisConditions,
            selectionConditions: undefined,
            previous: undefined,
            previousSelectionConditions: undefined,
            value: analysis.value,
            format: analysis.format,
            definition: model.analysisDefinition || model.metric.definition,
            evidence: undefined,
          }
        : model.metric
    const scopeLabel = diagnostic ? model.analysisScope || model.detailScope : model.detailScope
    const relation = group[0] === '__relation' ? analysis.relation : undefined
    const dimensions = relation ? relation.dimensions : diagnostic ? analysis.dimensions : [group]
    const plotMetric = diagnostic
      ? {
          ...metric,
          title: relation?.y.label || analysis.label,
          format: relation?.format || analysis.format,
          groupFormat: relation?.format || analysis.format,
          scale: relation?.y.scale || analysis.scale,
          digits: relation?.y.digits ?? analysis.digits,
          unit: relation?.y.unit ?? analysis.unit,
        }
      : metric
    const measures = [
      ...new Map(
        [...metric.measures, ...(analysis?.measures || []), ...(relation?.measures || [])].map((measure) => [
          measure[0],
          measure,
        ]),
      ).values(),
    ]
    const selectedLabel = groupRows?.find((row) => row.key === selected)?.label || selected
    nodes.feedback.textContent = ''
    nodes.feedback.dataset.loading = String(!hadContent)
    nodes.feedback.setAttribute('aria-label', hadContent ? '' : '正在加载分析')
    nodes.retry.hidden = control !== nodes.retry
    try {
      await task.painted
      if (!isCurrent()) return
      const base = metric.conditions
      const selectedValues = diagnostic && selected !== undefined ? JSON.parse(selected) : [selected]
      const extra =
        selected === undefined
          ? []
          : dimensions.map(([field], index) => ({
              field,
              value: diagnostic ? selectedValues[index] : group[3] === 'number' ? Number(selected) : selected,
            }))
      const selectionScope = (conditions, resolve) =>
        selected !== undefined && resolve
          ? [...resolve(dimensions[0], selectedValues[0]), ...extra.slice(1)]
          : [...conditions, ...extra]
      const selectedConditions = selectionScope(base, metric.selectionConditions)
      const previousConditions = selectionScope(metric.previous || [], metric.previousSelectionConditions)
      const detailDimensions = [
        ...new Map(
          [...model.detailDimensions, ...(analysis?.dimensions || [])].map((item) => [item[0], item]),
        ).values(),
      ].filter(([field]) => !metric.detailExclude?.includes(field))
      const detailMeasures = measures.filter(([field]) => !detailDimensions.some(([key]) => field === key))
      const [library, details, groups, total, prior, selectedTotal, selectedPrior] = await Promise.all([
        DashboardTable.load(),
        query(detailDimensions, selectedConditions, detailMeasures, signal),
        reload
          ? query(
              dimensions,
              typeof metric.groupConditions === 'function'
                ? metric.groupConditions(dimensions[0])
                : metric.groupConditions || base,
              relation ? measures.filter(([field]) => !dimensions.some(([key]) => field === key)) : measures,
              signal,
            )
          : undefined,
        reload ? query([], base, measures, signal) : undefined,
        reload && metric.previous ? query([], metric.previous, measures, signal) : undefined,
        selected !== undefined ? query([], selectedConditions, measures, signal) : undefined,
        selected !== undefined && metric.previous ? query([], previousConditions, measures, signal) : undefined,
      ])
      await DashboardUI.yield(signal)
      if (!isCurrent()) return
      if (reload) {
        totalRow = total[0] || {}
        priorRow = prior?.[0] || {}
        groupRows = relation
          ? groups
              .map((source) => ({
                source,
                values: dimensions.map(([field]) => source[field]),
                key: JSON.stringify(dimensions.map(([field]) => source[field])),
                label: dimensions.map(([field]) => analysis.dimensionLabel(field, source[field])).join(' / '),
                xValue: source[relation.x.field],
                value: source[relation.y.field],
                count: source[relation.countField],
              }))
              .filter((row) => Number.isFinite(row.xValue) && Number.isFinite(row.value))
          : diagnostic
            ? analysis.rows(groups, dimensions)
            : groups
                .map((row) => ({
                  source: row,
                  count: analysis?.count(row),
                  key: String(row[group[0]]),
                  value: metric.groupValue ? metric.groupValue(row, priorRow) : metric.value(row, priorRow),
                }))
                .filter((row) => Number.isFinite(row.value))
        if (!diagnostic)
          groupRows.sort(
            (a, b) => (group[2] ? 0 : b.value - a.value) || a.key.localeCompare(b.key, 'zh-CN', { numeric: true }),
          )
      }
      const current = selectedTotal?.[0] || totalRow
      const baseline = selectedPrior?.[0] || priorRow
      const value = metric.value(current, baseline)
      const overall = metric.value(totalRow, priorRow)
      const plotRows = groupRows
      // 提交串行化，切换或关闭后的旧查询与旧渲染都不能覆盖当前结果。
      renderQueue = renderQueue
        .catch(() => {})
        .then(async () => {
          if (!isCurrent()) return
          nodes.content.hidden = false
          const detailScope = selected === undefined ? scopeLabel || '当前范围' : `${group[1]}：${selectedLabel}`
          nodes['value-label'].textContent = selected === undefined && metric.previous ? '当前比较范围' : detailScope
          nodes['value-label'].title = nodes['value-label'].textContent
          motion.animateReading(nodes.value, value, metric.format)
          if (relation) nodes.finding.textContent = relation.description
          else if (analysis && (diagnostic || (!metric.finding && !context.entryConditions)))
            nodes.finding.textContent = analysis.finding(current, totalRow, selectedLabel)
          else if (selected !== undefined) nodes.finding.textContent = `总体 ${metric.format(overall)}`
          else if (metric.finding) nodes.finding.textContent = metric.finding(current, baseline, plotRows)
          else {
            const ranked = [...plotRows].sort((a, b) => b.value - a.value)
            nodes.finding.textContent =
              ranked.length > 1 && ranked.every((row) => row.value === ranked[0].value)
                ? `各${group[1]}的${metric.title}均为 ${metric.format(ranked[0].value)}。`
                : ranked.length
                  ? `${ranked[0].key}的${metric.title}最高（${metric.format(ranked[0].value)}）${ranked.length > 1 ? `，${ranked.at(-1).key}最低（${metric.format(ranked.at(-1).value)}）` : ''}。`
                  : '当前范围没有可分析的有效值。可返回看板调整筛选。'
          }
          nodes.definition.textContent = metric.definition
          nodes.evidence.textContent = metric.evidence
            ? metric.evidence(current, baseline)
            : '汇总由当前范围内的完整记录计算；表格滚动不改变汇总值。'
          if (analysis)
            nodes.evidence.textContent += ` 分析问题：${analysis.question}。交叉组合按所显示的两个字段同时筛选；首页的交叉核查候选按“差异绝对值 × 来源记录量”定位，不表示收益或统计显著性。各均值使用字段自身有效值，记录量不代表每个字段均有效。`
          nodes.grain.textContent = `${model.grain} · ${selected === undefined ? '当前筛选范围' : `${group[1]}：${selectedLabel}`} · 表格包含当前范围的完整结果`
          nodes['table-scope'].textContent =
            `${detailScope} · ${number(details.length, 0)} 条记录 · ${model.tableTotals === 'sum' ? '数值列合计' : '数值列平均（空值不计）'}`
          nodes['table-scope'].title = nodes['table-scope'].textContent
          nodes.table.setAttribute('aria-label', `关联明细，${detailScope}，${details.length} 条记录`)
          const chartTitle = diagnostic ? analysis.label : metric.groupTitle || metric.title
          nodes['chart-title'].textContent = diagnostic
            ? relation
              ? relation.title
              : `${analysis.dimensions.map((item) => item[1]).join(' × ')} · ${analysis.label}`
            : metric.groupTitle || (group[2] ? `${group[1]}趋势` : `${group[1]}比较`)
          nodes['chart-hint'].textContent = !group[2] && plotRows.length > 12 ? '前 12 组' : ''
          renderGroupPicker(group, plotMetric, plotRows, selected)
          let chartRows = diagnostic
            ? relation
              ? plotRows
              : analysis.chartRows(plotRows, selected)
            : group[2]
              ? plotRows
              : plotRows.slice(0, 12)
          // 菜单可选择 Top N 以外的分组；选中项仍须能在图中定位。
          if (!diagnostic && selected !== undefined && !chartRows.some((row) => row.key === selected)) {
            const row = plotRows.find((row) => row.key === selected)
            if (row) {
              chartRows.splice(Math.max(0, chartRows.length - 1), 1, row)
              nodes['chart-hint'].textContent = '前 11 组及已选项'
            }
          }
          if (relation) {
            const varying =
              new Set(chartRows.map((row) => row.xValue)).size > 1 &&
              new Set(chartRows.map((row) => row.value)).size > 1
            nodes['chart-hint'].textContent = varying
              ? `${relation.hint} 有效配对 ${chartRows.length} 个。`
              : '当前范围缺少有效配对，或至少一个指标没有变化，不展示关系散点；仍可通过菜单核对明细。'
            if (!varying) chartRows = []
          } else if (diagnostic)
            nodes['chart-hint'].textContent =
              `颜色越深表示${analysis.label}越高；显示 ${chartRows.length}/${plotRows.length} 个有效组合，完整组合见菜单。`
          nodes.chart.dataset.empty = String(!chartRows.length)
          await DashboardUI.yield(signal)
          if (!isCurrent()) return
          if (!chartRows.length) {
            chart?.release()
            chart = undefined
          } else {
            const spec = buildAnalysisSpec(group, plotMetric, chartRows, chartTitle, selected)
            // 原生 HTML tooltip 必须挂在 dialog 顶层内，才能显示在遮罩上。
            spec.tooltip = { ...spec.tooltip, parentElement: dialog, confine: true }
            if (chart) {
              const changedType = chartType !== spec.type
              // 点、矩形与矩阵单元不做跨图元形变，避免无效路径；同图型仍平滑更新。
              const crossMarks =
                changedType && [chartType, spec.type].some((type) => type === 'scatter' || type === 'heatmap')
              const morph = !reducedMotion.matches && !crossMarks
              await chart.updateSpec(
                spec,
                false,
                {
                  morph,
                  ...(morph && changedType ? { reuse: false } : {}),
                },
                changedType ? { change: true, reMake: true } : undefined,
              )
              if (isCurrent() && crossMarks && !reducedMotion.matches)
                nodes.chart.animate([{ opacity: 0.75 }, { opacity: 1 }], { duration: 220, easing: 'ease-out' })
            } else {
              chart = new VChart(spec, { dom: nodes.chart })
              chart.renderSync()
            }
            chartType = spec.type
            if (!isCurrent()) return
            // 切换图型后重新绑定到当前坐标系；同一次点击只走维度事件，避免二次切换。
            chart.off('dimensionClick', selectDimension)
            chart.on('dimensionClick', selectDimension)
            chart.off('click', selectDiagnostic)
            chart.on('click', selectDiagnostic)
          }
          nodes.chart.setAttribute(
            'aria-label',
            `${chartTitle}，${selected === undefined ? '未选择分组' : `已选择${selectedLabel}`}，也可通过选择${group[1]}菜单联动明细`,
          )
          await DashboardUI.yield(signal)
          if (!isCurrent()) return
          await updateDetailTable(detailDimensions, detailMeasures, details, detailScope, library, isCurrent)
          if (!isCurrent()) return
          resize(chart, nodes.chart)
          nodes.feedback.textContent = details.length ? '' : '当前范围暂无明细记录。'
          dialog.dataset.state = details.length ? 'ready' : 'empty'
          if (dialog.dataset.contentEnter !== 'true') dialog.dataset.contentEnter = 'true'
        })
      await renderQueue
    } catch (error) {
      if (!isCurrent()) return
      nodes.feedback.textContent = `分析未完成：${error.message}`
      nodes.retry.hidden = false
      nodes.content.hidden = !hadContent
      dialog.dataset.state = 'error'
    } finally {
      if ((await task.finish(isCurrent)) && isCurrent()) {
        delete nodes.feedback.dataset.loading
        nodes.feedback.removeAttribute('aria-label')
        if (dialog.dataset.state !== 'error') nodes.retry.hidden = true
      }
    }
  }
  function setContext(next, preferredField) {
    context = Object.assign(context || {}, next)
    if (context.analysis)
      context.dimensions = [
        ...context.dimensions,
        ...(context.analysis.relation ? [['__relation', context.analysis.relation.title]] : []),
        ['__cross', '交叉定位'],
      ]
    dimension =
      context.dimensions.find(([field]) => field === (preferredField || context.defaultDimension)) ||
      context.dimensions[0]
    selection = undefined
    groupRows = undefined
    nodes.picker.open = false
    dialog.querySelector('#ma-title').textContent = context.metric.title
    nodes.scope.textContent = context.scope
    nodes.modes.replaceChildren(
      ...context.dimensions.map((group) => {
        const choice = button(group[1], () => {
          if (dimension === group) return
          dimension = group
          selection = undefined
          for (const sibling of nodes.modes.children) sibling.setAttribute('aria-pressed', String(sibling === choice))
          void refresh(true, choice)
        })
        choice.setAttribute('aria-pressed', String(group === dimension))
        return choice
      }),
    )
  }
  function beginScopeUpdate() {
    if (!dialog?.open || dialog.dataset.closing === 'true') return
    scopePending = true
    scopeError = false
    cancelRefresh()
    activity.start(null, 0)
    DashboardFilters.close(nodes.picker)
    nodes.content.inert = true
    dialog.dataset.state = 'loading'
    nodes.feedback.textContent = ''
    nodes.feedback.dataset.loading = 'true'
    nodes.feedback.setAttribute('aria-label', '正在更新分析范围')
  }
  function updateScope(error) {
    if (!dialog?.open || dialog.dataset.closing === 'true') return
    scopePending = false
    scopeError = !!error
    nodes.content.inert = !!error
    if (error) {
      cancelRefresh()
      dialog.dataset.state = 'error'
      delete nodes.feedback.dataset.loading
      nodes.feedback.removeAttribute('aria-label')
      nodes.feedback.textContent = `范围更新失败：${error.message}`
      nodes.retry.hidden = false
      return
    }
    cancelRefresh()
    setContext(resolveContext(), dimension?.[0])
    void refresh(true)
  }
  if (globalFilters)
    lifetime.on(
      globalFilters,
      'click',
      (event) => {
        if (event.target.closest('button[aria-pressed="false"]')) beginScopeUpdate()
      },
      { capture: true },
    )
  function open(index, trigger) {
    openContext(() => getContext(index), trigger)
  }
  function openContext(resolve, trigger) {
    if (!ready() || dialog?.open) return
    const next = resolve()
    if (!next) return
    createDialog()
    delete dialog.dataset.contentEnter
    resolveContext = resolve
    setContext(next)
    opener = trigger
    dialog.classList.remove('ma-expanded')
    nodes.expand.textContent = '展开表格'
    nodes.expand.setAttribute('aria-expanded', 'false')
    nodes.content.hidden = true
    dialog.querySelector('.ma-definition').open = false
    if (globalFilters) restoreFilters = DashboardFilters.portal(globalFilters, nodes['global-filters'])
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // 用触发指标在屏幕上的位置确定展开支点；键盘触发沿用同一个入口。
    const origin = trigger.getBoundingClientRect()
    dialog.showModal()
    const panel = dialog.querySelector('.ma-shell')
    const x = Math.max(
      12,
      Math.min(88, ((origin.left + origin.width / 2 - panel.offsetLeft) / panel.offsetWidth) * 100),
    )
    const y = Math.max(
      12,
      Math.min(88, ((origin.top + origin.height / 2 - panel.offsetTop) / panel.offsetHeight) * 100),
    )
    dialog.style.setProperty('--overlay-origin', `${x}% ${y}%`)
    dialog.querySelector('.ma-body').scrollTop = 0
    nodes.close.focus()
    void refresh(true)
  }
  const onOverlayMotionChange = () => {
    if (!reducedMotion.matches || !dialog?.open) return
    if (dialog.dataset.closing === 'true') completeClose()
    else {
      dialog.getAnimations({ subtree: true }).forEach((animation) => animation.cancel())
      if (table) DashboardTable.setRecords(table, table.records, { animate: false })
    }
  }
  lifetime.on(reducedMotion, 'change', onOverlayMotionChange)
  const cards = new Set()
  entries.forEach((entry, index) => {
    const value = document.querySelector(entry.value)
    if (!value) return
    const heading = entry.heading ? document.querySelector(entry.heading) : value.previousElementSibling
    for (const trigger of [heading, value].filter(Boolean)) {
      trigger.classList.add('ma-entry')
      trigger.dataset.maEntry = String(index)
      trigger.title = '查看指标分析'
      if (trigger === heading) {
        trigger.tabIndex = 0
        trigger.setAttribute('role', 'button')
        trigger.setAttribute('aria-haspopup', 'dialog')
        const key = (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            event.stopPropagation()
            open(index, trigger)
          }
        }
        lifetime.on(trigger, 'keydown', key)
      }
      const click = (event) => {
        event.stopPropagation()
        open(index, heading || trigger)
      }
      lifetime.on(trigger, 'click', click)
    }
    if (entry.card) {
      const card = value.closest('section')
      if (!card || cards.has(card)) return
      cards.add(card)
      card.classList.add('ma-card')
      const click = (event) => {
        if (event.target.closest('button, a, input, [data-ma-entry], .plot, .mini, figure, fieldset, [role="img"]'))
          return
        open(index, heading)
      }
      lifetime.on(card, 'click', click)
    }
  })
  return {
    updateScope,
    bindTable(table, resolve) {
      const host = table.getContainer()
      const description = host.getAttribute('aria-description')
      host.setAttribute('aria-description', '点击数据单元格，或选中后按 Enter 或空格打开分析；表头用于整列选择。')
      const activate = ({ col, row }) => {
        if (col < 0 || row < 0 || row >= table.rowCount || table.isHeader(col, row) || table.isAggregation(col, row))
          return
        const record = table.getCellOriginRecord(col, row)
        if (!record) return
        openContext(() => resolve(record, table.getCellInfo(col, row).field), host)
      }
      const keydown = (event) => {
        if (!['Enter', ' '].includes(event.key) || event.repeat || event.ctrlKey || event.metaKey || event.altKey)
          return
        const ranges = table.getSelectedCellRanges()
        if (ranges.length !== 1) return
        const { start, end } = ranges[0]
        if (
          start.col !== end.col ||
          start.row !== end.row ||
          table.isHeader(start.col, start.row) ||
          table.isAggregation(start.col, start.row)
        )
          return
        event.preventDefault()
        event.stopPropagation()
        activate(start)
      }
      table.on('click_cell', activate)
      lifetime.on(host, 'keydown', keydown, { capture: true })
      lifetime.add(() => {
        table.off('click_cell', activate)
        if (description === null) host.removeAttribute('aria-description')
        else host.setAttribute('aria-description', description)
      })
    },
    dispose() {
      completeClose()
      observer?.disconnect()
      dialog?.remove()
      lifetime.dispose()
    },
  }
}
