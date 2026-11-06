import { assertionError } from '../assertions.mjs'
export { createSpec } from './column.mjs'

/** 通过同一公开 Builder 生成新配置并更新已有实例。 */
export async function exercise(page) {
  await page.evaluate(async () => {
    const dsl = { ...window.__visualDsl, dataset: [{ category: 'Updated', amount: 80 }] }
    const spec = window.VSeed.Builder.from(dsl).build()
    await window.__visualStage.updateSpec({ ...spec, animation: false, width: 800, height: 600 })
    window.__visualSpec = spec
  })
}
/** 更新后实际图表只保留新的一条记录。 */
export async function verify(page) {
  const ok = await page.evaluate(() => {
    const values = window.__visualStage.getChart().getAllSeries()[0].getViewData().latestData
    return values.length === 1 && Object.values(values[0]).includes('Updated') && Object.values(values[0]).includes(80)
  })
  if (!ok) throw assertionError('图表更新仍使用旧数据')
}
