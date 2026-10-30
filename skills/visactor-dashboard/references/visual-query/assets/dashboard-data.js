// VBI owns query semantics; each VQuery dataset has one ordered connection lifetime.
window.DashboardData = {
  decode(source) {
    for (const [column, values] of Object.entries(source.dictionaries || {}))
      for (const row of source.rows) if (row[column] != null) row[column] = values[row[column]]
    delete source.dictionaries
    return source
  },
  async connect(vbi, query, id, columns, rawDataset) {
    const source = { type: 'json', rawDataset }
    if (await query.hasDataset(id)) await query.updateDatasetSource(id, columns, source)
    else await query.createDataset(id, columns, source)
    const dataset = await query.connectDataset(id)
    let pending = Promise.resolve(),
      closed = false
    const run = (action) => {
      if (closed) return Promise.reject(new DOMException('数据源已释放', 'AbortError'))
      const task = pending.then(action)
      pending = task.catch(() => {})
      return task
    }
    vbi.connectors.register(id, {
      discoverSchema: async () => columns,
      query: ({ queryDSL }) => run(() => dataset.query(queryDSL)),
    })
    return {
      replace(rawDataset) {
        return run(() => dataset.replaceSource(columns, { type: 'json', rawDataset }))
      },
      dispose() {
        if (closed) return pending
        const task = run(async () => {
          await dataset.disconnect()
          await query.dropDataset(id)
        })
        closed = true
        vbi.connectors.unregister(id)
        return task
      },
    }
  },
  async rows(chart, signal) {
    const seed = await chart.buildVSeed({ signal })
    const { dimensions, measures } = chart.build()
    return seed.dataset.map((row) =>
      Object.fromEntries([...dimensions, ...measures].map(({ field, id }) => [field, row[id]])),
    )
  },
  release(vbi, chart) {
    vbi.resources.chart.unregister(chart.getUUID())
    chart.doc.destroy()
  },
}
